# Technology Stack

## Primary Language

- **Python 3.11** (pinned via `.python-version`)
- `requires-python = ">=3.11"` enforced in `pyproject.toml` and `uv.lock`

## Package Manager

- **uv** — modern Python package and virtual environment manager
  - Lock file: `uv.lock` (revision 3, format version 1)
  - Virtual environment: `.venv/` (Python 3.11)
  - Registry: PyPI (`https://pypi.org/simple`)

## Project Metadata

Defined in `pyproject.toml`:

| Field | Value |
|---|---|
| Name | `mirnaseq` |
| Version | `0.1.0` |
| Description | *(placeholder — not yet set)* |
| Entry point | `main.py` (`main()` function) |

## Direct Dependencies

Declared in `pyproject.toml` `[project].dependencies`:

| Package | Version Constraint | Installed Version | Purpose |
|---|---|---|---|
| `biopython` | `>=1.86` | 1.86 | Biological sequence I/O and analysis |
| `cutadapt` | `>=5.2` | 5.2 | Adapter trimming for sequencing reads |
| `matplotlib` | `>=3.10.8` | 3.10.8 | Plotting and visualization |
| `mirge3` | `>=0.1.4` | 0.1.4 | miRNA quantification and small RNA analysis pipeline |
| `pandas` | `>=3.0.1` | 3.0.1 | Tabular data manipulation |
| `seaborn` | `>=0.13.2` | 0.13.2 | Statistical data visualization |

## Transitive Dependencies (installed in .venv)

| Package | Version | Role |
|---|---|---|
| `numpy` | 2.4.3 | Array computing (biopython/scipy dependency) |
| `scipy` | 1.17.1 | Scientific computing (mirge3 dependency) |
| `scikit-learn` | 1.8.0 | Machine learning — SVM-based novel miRNA prediction in mirge3 |
| `joblib` | 1.5.3 | Parallelism (scikit-learn dependency) |
| `threadpoolctl` | 3.6.0 | Thread pool control (scikit-learn dependency) |
| `future` | 1.0.0 | Python 2/3 compatibility shim (mirge3 dependency) |
| `reportlab` | 4.4.10 | PDF report generation (mirge3 dependency) |
| `dnaio` | 1.2.4 | Fast FASTQ/FASTA I/O (cutadapt dependency) |
| `xopen` | 2.0.2 | Transparent compressed file handling (cutadapt dependency) |
| `isal` | 1.8.0 | ISA-L accelerated compression (xopen dependency) |
| `zlib-ng` | 1.0.0 | High-performance zlib replacement |
| `pillow` | 12.1.1 | Image processing (matplotlib dependency) |
| `fonttools` | 4.62.1 | Font handling (matplotlib dependency) |
| `contourpy` | 1.3.3 | Contour computation (matplotlib dependency) |
| `cycler` | 0.12.1 | Composable cycles (matplotlib dependency) |
| `kiwisolver` | 1.5.0 | Constraint solver (matplotlib dependency) |
| `pyparsing` | 3.3.2 | Parsing (matplotlib dependency) |
| `python-dateutil` | 2.9.0.post0 | Date utilities (pandas dependency) |
| `packaging` | 26.0 | Version specifier parsing |
| `six` | 1.17.0 | Python 2/3 compatibility (dateutil dependency) |
| `charset-normalizer` | 3.4.6 | Character encoding detection |

## Build Tools and Scripts

- **`setup_wsl.sh`** — WSL (Windows Subsystem for Linux) environment setup script (currently empty/minimal — 1 line)
- No additional build system (no Makefile, no Dockerfile, no CI configuration detected)

## Configuration Files

| File | Purpose |
|---|---|
| `pyproject.toml` | Project metadata and direct dependency declarations (PEP 517/518) |
| `uv.lock` | Fully resolved, pinned dependency tree with hashes for reproducibility |
| `.python-version` | Python version pin (`3.11`) read by uv and pyenv-compatible tools |
| `.venv/pyvenv.cfg` | Virtual environment configuration |
| `.venv/.gitignore` | Excludes venv contents from git |

## Runtime Requirements

- Python 3.11 (minimum)
- uv installed on the host for environment management
- WSL2 (Linux) as the execution environment (the project lives under a Windows path but runs in WSL2)
- External bioinformatics tools must be installed separately in the WSL environment (see `INTEGRATIONS.md`); they are not Python packages and are not managed by uv
- Platform targets in lock file: Linux (primary), Windows, macOS (all covered by wheel variants)
