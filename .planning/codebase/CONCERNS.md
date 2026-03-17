# Codebase Concerns: miRNAseq

This document captures technical debt, known issues, and areas of concern for the
miRNAseq analysis pipeline project as of 2026-03-18.

---

## 1. Technical Debt

### 1.1 Placeholder Entry Point
`main.py` contains only a stub `main()` function that prints `"Hello from mirnaseq!"`.
The project was initialized with `uv` but no actual pipeline logic has been written. The
entire analytical design exists only in `README.md` as a planning document, not as
working code. This means there is effectively zero implemented functionality.

**File:** `/mnt/c/Users/Genomics/AI_OMICS/miRNAseq/main.py`

### 1.2 Empty Setup Script
`setup_wsl.sh` is a 0-byte file. It is executable and tracked in the repo but contains
no content. Any user relying on it for WSL environment setup would encounter a silent
no-op. There are no installation steps, no PATH configuration, and no external tool
installation documented in any runnable script.

**File:** `/mnt/c/Users/Genomics/AI_OMICS/miRNAseq/setup_wsl.sh`

### 1.3 No Project Description
`pyproject.toml` contains `description = "Add your description here"` — the default
uv/pip placeholder text has never been replaced. The project has no version strategy
beyond `0.1.0` and no metadata such as authors, license, or homepage.

**File:** `/mnt/c/Users/Genomics/AI_OMICS/miRNAseq/pyproject.toml`

### 1.4 No Source Package Structure
There is no `src/` layout, no package `__init__.py`, no modules, no tests, and no
configuration files beyond `pyproject.toml`. The project is a bare scaffold with
dependencies declared but never used by any code in the repository.

### 1.5 README Written in Korean with No English Summary
The `README.md` is entirely in Korean. While informative as a planning/comparison
document, it functions as a design note rather than operational documentation. There is
no quickstart, no usage guide, no sample invocation, and no description of what the
project currently does (since it does nothing). International collaborators or tools
expecting English documentation will find it inaccessible.

---

## 2. Potential Bugs and Issues

### 2.1 mirge3 Version Lock vs. Active Maintenance
The `pyproject.toml` pins `mirge3>=0.1.4`, and the lock file resolves to exactly
`0.1.4` (released 2023-02-20). This is the only published wheel. miRge3 upstream
development appears to have stopped; the version `0.1.4` is the sole release on PyPI.
Any bugs in that release are unresolvable through version upgrades.

### 2.2 mirge3 Internal Naming Inconsistency
The installed package name is `mirge3` (PyPI) but the actual importable module is
`mirge` (i.e., `from mirge.__main__ import main`). The binary installed is `miRge3.0`.
This triple naming split (package name, import name, binary name) will cause confusion
for anyone trying to import or reference the library programmatically.

### 2.3 cutadapt Version Compatibility Risk in mirge3
`mirge3`'s `check_dependencies()` function in `miRgeEssential.py` applies a
`ValueError` catch when parsing the cutadapt version number, falling back to
`ca.__version__`. The project locks `cutadapt>=5.2`, which is a significantly newer
release than what `mirge3 0.1.4` was originally tested against (it references
`cutadapt >=2.6` internally). Version parsing logic in `miRgeEssential.py` uses
string splits on stdout, which could silently fail or produce wrong version tuples with
newer cutadapt output formatting.

### 2.4 External Binary Dependencies Not Verified
`miRge3.0` at runtime requires the following system binaries that are NOT installed by
pip and are not configured by `setup_wsl.sh` (which is empty):
- `bowtie` (version 1.2.1–1.3.2 specifically; newer versions untested)
- `samtools` (>=1.5)
- `RNAfold` from ViennaRNA (only if novel miRNA prediction is used)

There is no check, no installation script, and no documentation in any runnable form
that guides the user to install these. The pipeline will fail at runtime with an error
message and `exit()` if bowtie is not found. Samtools and RNAfold failures print
warnings but may continue silently, producing incomplete output.

### 2.5 bowtie Version Whitelist May Be Too Narrow
`miRgeEssential.py` validates bowtie against an explicit whitelist:
`["1.0.0","1.2.1","1.2.2","1.2.3","1.3.0","1.3.1","1.3.2"]`. Any system bowtie
version outside this list will cause `miRge3.0` to exit immediately. This is a fragile
hard dependency that is not surfaced to the user until runtime.

### 2.6 tRF Analysis Restricted to Human Only
The `miRge3.0` tRNA fragment analysis (`-trf` flag) is hard-coded to human only
(`args.organism_name != "human"`). If non-human samples are processed with tRF
enabled, the pipeline exits with an error. This constraint is not documented in the
project README or any user-facing file.

---

## 3. Security Concerns

### 3.1 No .gitignore
There is no `.gitignore` file in the repository. In a bioinformatics project, this
creates material risk of accidentally committing:
- FASTQ files or other large genomic data files
- Patient or sample metadata (PHI risk in clinical contexts)
- Credentials or API tokens (e.g., for cloud storage, HPC systems)
- Large binary index files (Bowtie indexes, reference genomes)
- Output directories with intermediate results

The existing `git status` output from a sibling directory (`../ctDNAseq/`) already
shows a pattern of many untracked analysis scripts and results directories, suggesting
loose file management practices across the AI_OMICS workspace.

### 3.2 No Data Handling Policy
The project has no documented data classification, handling, or retention policy. In
clinical or translational genomics, sequencing data (FASTQ, alignment files, count
matrices) may be subject to IRB, HIPAA, or GDPR constraints. The absence of any
guidance is a governance risk.

### 3.3 Shell Script with Executable Permissions but No Content
`setup_wsl.sh` is `chmod +x` and tracked in version control as 0 bytes. If this script
is ever populated and pushed without review, it could execute arbitrary system commands
in privileged WSL contexts with no audit trail.

### 3.4 Dependencies Fetched from PyPI Without Signature Verification
The `uv.lock` uses SHA-256 hashes for all wheels and sdists, which provides integrity
verification. However, there is no Sigstore or GPG signature check for packages.
For a pipeline processing potentially sensitive genomic data, this is an acceptable but
notable limitation in the supply chain.

---

## 4. Performance Considerations

### 4.1 No Parallelism Strategy Defined
The README mentions multi-threading options in `miRge3.0` (`-cpu` flag), but there is
no project-level configuration for HPC/cluster job scheduling (no Snakemake, no
Nextflow, no SLURM submission scripts). For large cohorts of samples (>10), wall-clock
time will scale linearly without a workflow manager.

### 4.2 pandas 3.0.1 Breaking Changes Risk
The lock file resolves `pandas` to `3.0.1`, which introduced significant breaking
changes from the 1.x/2.x API (e.g., `DataFrame.append()` removed, copy-on-write
semantics changed). Any downstream analysis code written against older pandas
conventions will fail at runtime. Since no analysis code exists yet, this is a latent
risk for when code is eventually written.

### 4.3 numpy 2.x Compatibility
The lock resolves `numpy` to `2.4.3`. NumPy 2.0 introduced breaking C-API and Python
API changes. `mirge3 0.1.4` was developed against much older NumPy (likely 1.x). While
the pure-Python parts of mirge may work, any C-extension code in dependencies
(biopython, scipy, sklearn) must be compiled against NumPy 2.x ABI. The lock file
shows wheels for the installed packages, so binary compatibility should hold, but
testing this combination has not been done.

### 4.4 No Memory Budget or Resource Limits
Bowtie alignment and miRge3's clustering/quantification steps can be memory-intensive
for large FASTQ files. There is no documentation of expected resource requirements
(RAM, disk, CPU), no warnings about file size limits, and no guidance on chunking
large datasets.

---

## 5. Fragile or Incomplete Areas

### 5.1 Entire Pipeline Is Unimplemented
As documented in section 1.1, the codebase is entirely pre-implementation. The
`README.md` describes two candidate pipeline architectures (nf-core/smrnaseq and a
custom Python pipeline), but no architectural decision has been committed to code. The
project is in a design/scaffolding phase only.

### 5.2 No Test Infrastructure
There are no unit tests, integration tests, or test fixtures of any kind. No testing
framework is declared in `pyproject.toml` (no `pytest`, no `hypothesis`). When pipeline
code is eventually written, there is no safety net.

### 5.3 No CI/CD Configuration
There is no `.github/workflows/`, no `Makefile`, no `tox.ini`, and no other automation.
The repository has no mechanism to verify that the environment builds correctly or that
any future code changes do not break the pipeline.

### 5.4 No Input Validation Framework
The planned pipeline will ingest FASTQ files, reference databases, and samplesheet
CSVs. There is no validation layer designed or stubbed. Common failure modes in
bioinformatics pipelines include malformed FASTQs, incorrect adapter sequences,
mismatched sample IDs, and corrupted reference databases — none of which have any
error-handling strategy defined.

### 5.5 uv.lock Covers Python but Not System Packages
The `uv.lock` ensures reproducible Python environments, but `bowtie`, `samtools`, and
`RNAfold` are system-level binaries with no version pinning mechanism. The pipeline's
reproducibility guarantee therefore extends only to the Python layer; the C/C++ tooling
layer is entirely unmanaged.

---

## 6. Missing Functionality

### 6.1 No Sample Sheet Handling
The README describes sample-sheet-based input (e.g., nf-core style CSV), but there is
no code to parse, validate, or route samples.

### 6.2 No QC Step Implementation
FastQC/MultiQC integration is mentioned in the README but not implemented. There is no
quality control checkpoint before or after alignment.

### 6.3 No Differential Expression Analysis Code
DESeq2/PyDESeq2/edgeR integration is described in the README but does not exist in any
code. The `mirge3` package includes an R-based DESeq2 wrapper (`-dex` flag), but this
requires R to be installed on the system — another undocumented external dependency.

### 6.4 No Output Handling or Report Generation
There is no code to collect, format, or archive pipeline outputs. The README mentions
volcano plots, heatmaps, and PCA — none of which are implemented or templated.

### 6.5 No Logging Framework
There is no structured logging in the project code. The stub `main.py` uses `print()`.
For a bioinformatics pipeline where provenance and auditability of results matter,
the absence of a logging strategy (e.g., Python `logging` module with configurable
levels and file handlers) is a significant gap.

### 6.6 No Configuration File Support
The pipeline has no configuration system (no YAML, TOML, or INI config). Parameters
such as adapter sequences, organism names, thread counts, and reference paths would
need to be hard-coded or passed exclusively via CLI arguments with no persistent
configuration.

---

## 7. Environment and Dependency Risks

### 7.1 WSL-Specific Development Environment
The project is explicitly designed for WSL (Windows Subsystem for Linux) based on the
presence of `setup_wsl.sh`. WSL2 introduces filesystem performance overhead for I/O
on Windows-mounted paths (`/mnt/c/...`). Genomics pipelines processing large FASTQ
files on `/mnt/c/` paths will be significantly slower than native Linux due to the
NTFS-to-ext4 translation layer. All pipeline data should be kept under the Linux
filesystem (`~/` or `/tmp/`) rather than the Windows mount.

### 7.2 Python Version Pinned to 3.11 Only
`.python-version` pins `3.11`. The `pyproject.toml` specifies `requires-python >=3.11`,
which is correct. However, `mirge3 0.1.4` publishes no Python version classifiers on
PyPI and predates Python 3.12/3.13. Compatibility with Python 3.12+ has not been
verified, which limits upgrade paths.

### 7.3 mirge3 Is an Unmaintained Package
`mirge3 0.1.4` was released on 2023-02-20 with no subsequent updates. The upstream
GitHub repository (`mhalushka/miRge3.0`) shows limited recent activity. This means:
- Security patches will not be issued
- Compatibility with newer Python/NumPy/pandas will not be fixed upstream
- Bug reports have no resolution path through the package maintainer

### 7.4 R Runtime Dependency Not Declared
`mirge3` supports differential expression via DESeq2 (`-dex` flag), which calls R
scripts (`mirge/rScripts/` is present in the package). R is not declared as a
dependency anywhere in `pyproject.toml`, `setup_wsl.sh`, or the README setup
instructions. A user could install all Python dependencies successfully and encounter
a runtime failure only when attempting differential expression analysis.

### 7.5 miRge Libraries Path Required at Runtime
`miRge3.0` requires a `--libraries-path` argument pointing to pre-built Bowtie index
files and annotation libraries for the target organism. These library archives are
several gigabytes in size and must be downloaded separately from the miRge3 GitHub
releases. There is no download script, no documentation of where to get them, and no
version pinning for the library files themselves. A mismatch between the library version
and the software version can produce silently incorrect results.

### 7.6 No Virtual Environment Activation in Any Script
The `.venv` directory is present and the packages are installed, but there is no script
or `Makefile` target that activates the virtual environment before running the pipeline.
A user invoking `python main.py` from the shell without activating `.venv` first will
use the system Python, which lacks all project dependencies.

### 7.7 scipy 1.17.1 and sklearn Pulled in Transitively
`scipy` and `scikit-learn` are pulled in as transitive dependencies of `mirge3` (for
SVM-based novel miRNA prediction). These are large packages (~50 MB each as wheels)
that increase environment size and install time. They are not declared in
`pyproject.toml` as direct dependencies, making their presence invisible to someone
reading the project's stated requirements. If `mirge3` is ever replaced with a
different quantification tool, these may become orphaned but remain installed.
