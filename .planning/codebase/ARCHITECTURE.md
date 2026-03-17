# Architecture — miRNAseq Analysis Pipeline

## Overall System Design

This project is a **Python-based miRNA-seq data analysis pipeline** at the scaffold/initialization stage. The codebase defines the package structure and dependency environment for a small RNA sequencing (smRNA-seq) analysis workflow. No domain-specific analysis code has been implemented yet; the repository represents a bootstrapped project ready to be built out.

The intended architecture (documented in `README.md`) is a **linear, staged pipeline** that maps raw sequencing reads through quality control, alignment, quantification, differential expression analysis, and visualization. Two high-level design options are identified in the documentation:

- **Option A**: Orchestrated via nf-core/smrnaseq (Nextflow-based, externally managed)
- **Option B**: Custom Python/R pipeline composing individual bioinformatics tools

The current code scaffolds **Option B** — a fully Python-driven pipeline using `uv` for dependency management.

---

## Data Flow

```
Raw FASTQ reads
      |
      v
[QC & Preprocessing]
  - FastQC / MultiQC    (quality metrics)
  - Cutadapt / FastP    (adapter trimming, length filter 18–30 nt)
      |
      v
[Alignment & Quantification]
  - Bowtie              (align to miRBase mature + hairpin sequences)
  - miRDeep2            (novel miRNA discovery)
  - miRge3.0            (fast quantification + tRNA fragment analysis)
      |
      v
[Differential Expression]
  - DESeq2 (R) or PyDESeq2 (Python)
  - edgeR
      |
      v
[Downstream / Visualization]
  - Target prediction   (TargetScan, miRDB)
  - Pathway analysis    (KEGG, GO enrichment)
  - Network analysis    (miRNA–mRNA interaction)
  - Plots: Volcano, Heatmap, PCA
      |
      v
Reports / Output files
```

**Inputs expected:**
- Raw FASTQ files from Illumina small-RNA library preparation
- A sample sheet (CSV) listing sample identities, conditions, and file paths
- Reference data: miRBase v22.1 (mature/hairpin FASTA), GRCh38 genome, Bowtie/Bowtie2 indices, adapter sequences

**Outputs expected:**
- Per-sample and multi-sample QC reports (MultiQC HTML)
- Aligned BAM files
- miRNA count matrices
- Differential expression tables
- Visualization plots (volcano, heatmap, PCA)

---

## Entry Points

| File | Role |
|------|------|
| `main.py` | Package entry point (currently a stub printing "Hello from mirnaseq!") |
| `pyproject.toml` | Project metadata and dependency declarations; `uv` uses this to build the environment |

`main.py` is the only executable Python file. It defines a `main()` function with a standard `if __name__ == "__main__"` guard, making it usable both as a module import and as a direct script.

The project is managed with **uv** (a fast Python package manager). The environment is activated from `.venv/` and Python 3.11 is pinned via `.python-version`.

---

## Key Abstractions and Patterns

### Current State (Scaffold)
- **Single-module entry point**: `main.py` acts as the root callable; all future pipeline logic is expected to be organized under this or additional modules imported here.
- **Dependency-first setup**: All required libraries are declared in `pyproject.toml` and resolved in `uv.lock` before any pipeline logic is written. This ensures a reproducible environment from day one.

### Intended Patterns (from README design)
- **Staged / Linear Pipeline**: Each analysis stage is a discrete step with well-defined inputs and outputs. Steps are meant to run in sequence, with intermediate files written to disk between stages.
- **Tool Composition**: Individual best-of-breed CLI tools (Cutadapt, Bowtie, miRDeep2, miRge3.0, DESeq2) are wrapped or called from Python rather than reimplementing their functionality.
- **Python-as-Glue**: Python (via BioPython, pandas) orchestrates external tools, handles file I/O, and performs visualization (matplotlib, seaborn), while specialized bioinformatics tools do the heavy computation.

---

## Component Interactions

```
main.py
  |
  +-- [future] preprocessing module
  |     uses: cutadapt (CLI subprocess), BioPython (FASTQ I/O)
  |
  +-- [future] alignment module
  |     uses: Bowtie (CLI subprocess)
  |
  +-- [future] quantification module
  |     uses: miRge3.0 (Python library or CLI), miRDeep2 (CLI subprocess)
  |
  +-- [future] differential_expression module
  |     uses: PyDESeq2 (Python library) or R via subprocess
  |
  +-- [future] visualization module
        uses: matplotlib, seaborn, pandas
```

### Installed Dependencies and Their Roles

| Package | Version | Role |
|---------|---------|------|
| `biopython` | >=1.86 | FASTQ/FASTA parsing, sequence manipulation |
| `cutadapt` | >=5.2 | Adapter trimming of raw reads (also callable as CLI) |
| `mirge3` | >=0.1.4 | Fast miRNA quantification, tRNA fragment detection |
| `pandas` | >=3.0.1 | Tabular data handling (count matrices, sample sheets) |
| `matplotlib` | >=3.10.8 | Plotting (volcano, PCA, heatmap) |
| `seaborn` | >=0.13.2 | Statistical visualization layer over matplotlib |

---

## Reference Data Requirements

The pipeline assumes the following external resources are available (not tracked in the repository):

- **miRBase v22.1**: mature.fa and hairpin.fa (miRNA reference sequences)
- **GRCh38**: Human reference genome assembly
- **Bowtie / Bowtie2 index**: Pre-built genome and miRNA reference indices
- **Adapter sequences**: Library kit-specific (e.g., Illumina TruSeq small RNA adapter)
