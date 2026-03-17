# External Integrations

All integrations described below are referenced in `README.md` as part of the planned/recommended analysis workflows. The Python package layer (mirge3, cutadapt, biopython) wraps or coordinates with several of these tools. External command-line tools must be installed independently in the WSL/Linux environment.

---

## External Bioinformatics Tools

### Alignment and Mapping

| Tool | Version Referenced | Role | Install Method |
|---|---|---|---|
| **Bowtie** | unspecified | Short-read aligner; maps trimmed reads to miRBase mature/hairpin sequences | Conda (`bioconda`) or apt |
| **Bowtie2** | unspecified | Alignment for contamination filtering (rRNA, tRNA removal) | Conda (`bioconda`) or apt |
| **SAMtools** | unspecified | BAM/SAM file manipulation and read quantification | Conda (`bioconda`) or apt |

### Quality Control

| Tool | Version Referenced | Role | Install Method |
|---|---|---|---|
| **FastQC** | unspecified | Raw read quality assessment | Conda or apt |
| **MultiQC** | unspecified | Aggregated QC reporting across samples | pip / Conda |
| **FastP** | unspecified | Adapter trimming and length filtering (alternative to cutadapt) | Conda (`bioconda`) |

### miRNA Analysis

| Tool | Version Referenced | Role | Install Method |
|---|---|---|---|
| **miRge3.0** | 0.1.4 (installed as Python package) | miRNA quantification, isomiR analysis, tRF detection, A-to-I editing, novel miRNA prediction (SVM), UMI processing, IGV visualization | `pip install mirge3` (included in `pyproject.toml`) |
| **miRDeep2** | unspecified | Novel miRNA discovery, hairpin-based miRNA detection and quantification | Perl-based; Conda (`bioconda`) |
| **miRTop** | unspecified | isomiR analysis and standardised miRNA annotation | Conda or pip |
| **UMI-tools** | unspecified | UMI extraction prior to alignment | pip / Conda |

### Differential Expression Analysis

| Tool | Version Referenced | Role | Install Method |
|---|---|---|---|
| **DESeq2** | unspecified | Differential expression analysis (R/Bioconductor) | R: `BiocManager::install("DESeq2")` |
| **edgeR** | unspecified | Alternative DE analysis (R/Bioconductor) | R: `BiocManager::install("edgeR")` |
| **PyDESeq2** | unspecified | Python port of DESeq2 for differential expression | `pip install pydeseq2` |

### Workflow Orchestration

| Tool | Version Referenced | Role |
|---|---|---|
| **Nextflow** | unspecified | Workflow engine for nf-core/smrnaseq pipeline option |
| **Docker** | unspecified | Container runtime for nf-core pipeline (`-profile docker`) |
| **nf-core/smrnaseq** | unspecified | End-to-end Nextflow-based smRNA-seq pipeline (recommended for large-scale reproducible runs) |

---

## Data Sources and Reference Databases

| Resource | Version Referenced | Contents | URL |
|---|---|---|---|
| **miRBase** | v22.1 | Mature miRNA sequences, hairpin precursor sequences | https://www.mirbase.org/ |
| **GRCh38** | current | Human reference genome (hg38) | Ensembl / UCSC / NCBI |
| **TargetScan** | unspecified | miRNA target gene prediction | https://www.targetscan.org/ |
| **miRDB** | unspecified | miRNA target gene prediction | https://mirdb.org/ |
| **KEGG** | unspecified | Pathway enrichment database | https://www.kegg.jp/ |
| **Gene Ontology (GO)** | unspecified | GO term enrichment analysis | https://geneontology.org/ |

### Genome Indexes

- Bowtie/Bowtie2 indexes must be pre-built from GRCh38 reference FASTA
- miRge3.0 requires its own miRge3.0 libraries (species-specific data packages, downloaded separately from https://mirge3.readthedocs.io/en/latest/quick_start.html#mirge3-0-libraries)

---

## File Format Dependencies

| Format | Extension(s) | Stage |
|---|---|---|
| FASTQ | `.fastq`, `.fastq.gz`, `.fq.gz` | Raw sequencing input |
| BAM / SAM | `.bam`, `.sam` | Aligned reads |
| FASTA | `.fa`, `.fasta` | Reference genome and miRNA sequences |
| BED | `.bed` | Genomic feature coordinates |
| CSV / TSV | `.csv`, `.tsv` | Count matrices and sample sheets |
| PDF | `.pdf` | miRge3.0 graphical reports (via reportlab) |
| GFF / GFF3 | `.gff`, `.gff3` | miRNA annotation (miRTop output) |

Compressed file handling is supported transparently via `xopen` + `isal`/`zlib-ng` (installed as transitive dependencies of cutadapt).

---

## External Services and APIs

No external HTTP APIs or cloud services are directly integrated in the current codebase. All analysis is designed for local or HPC execution.

### Potential downstream web tools (referenced in README, not integrated in code)

| Service | Purpose |
|---|---|
| **Chimira** (web) | Web-based miRNA quantification |
| **OASIS2** (web) | Web-based integrated miRNA analysis including DE |
| **sRNAbench** (web/local) | Web-based and locally installable small RNA analysis |

---

## Notes on Integration Architecture

The current code (`main.py`) is a scaffold only (`print("Hello from mirnaseq!")`). The `README.md` documents two recommended pipeline options:

1. **nf-core/smrnaseq** — Nextflow-orchestrated, Docker-containerised, community-maintained pipeline. All tool dependencies are managed inside containers.
2. **Custom Python pipeline** — Direct invocation of individual tools (cutadapt, Bowtie, miRDeep2 or miRge3.0, DESeq2/PyDESeq2) coordinated via Python scripts. The installed Python packages (`mirge3`, `cutadapt`, `biopython`) support this approach.
