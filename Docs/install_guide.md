# miRge3.0 & miRDeep2 Linux 설치 가이드

> 대상 환경: Ubuntu 20.04+ / WSL2 Ubuntu
> 작성일: 2026-03-18

---

## 사전 준비

```bash
# 시스템 패키지 업데이트
sudo apt update && sudo apt upgrade -y

# 필수 빌드 도구
sudo apt install -y build-essential gcc g++ make cmake \
    zlib1g-dev libbz2-dev liblzma-dev libncurses5-dev \
    libcurl4-openssl-dev libssl-dev wget curl git unzip \
    perl default-jre pkg-config autoconf
```

---

## Part 1: Miniconda 설치 (공통)

miRge3.0과 miRDeep2 모두 conda 환경을 사용하면 의존성 관리가 편합니다.

```bash
# Miniconda 설치
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh -b -p $HOME/miniconda3

# PATH 설정
echo 'export PATH="$HOME/miniconda3/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# conda 초기화
conda init bash
source ~/.bashrc

# bioconda 채널 설정 (순서 중요!)
conda config --add channels defaults
conda config --add channels bioconda
conda config --add channels conda-forge
conda config --set channel_priority strict
```

---

## Part 2: miRge3.0 설치

### 2-1. conda 환경 생성 및 설치

```bash
# miRge3.0 전용 환경 생성
conda create -n mirge3 python=3.9 -y
conda activate mirge3

# miRge3.0 설치 (pip)
pip install mirge3

# 또는 conda로 설치 (대안)
# conda install -c bioconda mirge3 -y

# 필수 의존성 설치 (conda가 더 안정적)
conda install -c bioconda bowtie samtools -y
conda install -c bioconda cutadapt -y
```

### 2-2. 참조 라이브러리 다운로드

miRge3.0은 분석할 종(species)에 맞는 참조 라이브러리가 필요합니다.

```bash
# 작업 디렉토리 생성
mkdir -p ~/mirge3_libs && cd ~/mirge3_libs

# miRge3.0 참조 라이브러리 다운로드 (human)
# GitHub에서 다운로드
miRge3.0 --build human \
    --mir-DB miRBase \
    --genome-dir ~/mirge3_libs

# 또는 수동 다운로드 (SourceForge)
# https://sourceforge.net/projects/mirge3/files/miRge3_Lib/
# human.tar.gz 다운로드 후:
# tar -xzf human.tar.gz -C ~/mirge3_libs/
```

> **참고**: 라이브러리 빌드 시 bowtie index 생성에 시간이 걸릴 수 있습니다.

### 2-3. miRge3.0 설치 확인 및 테스트

```bash
# 버전 확인
miRge3.0 --version

# 도움말 확인
miRge3.0 --help

# 테스트 실행 (FASTQ 파일이 있는 경우)
# miRge3.0 annotate \
#     -s sample1.fastq.gz \
#     -lib ~/mirge3_libs \
#     -on human \
#     -db miRBase \
#     -o ./mirge3_output \
#     -a illumina \
#     --threads 4
```

### 2-4. miRge3.0 주요 옵션 설명

| 옵션 | 설명 | 예시 |
|------|------|------|
| `-s` | 입력 FASTQ 파일 (여러 개 가능) | `-s s1.fq s2.fq` |
| `-lib` | 참조 라이브러리 경로 | `-lib ~/mirge3_libs` |
| `-on` | 생물종 | `-on human` |
| `-db` | miRNA DB (miRBase 또는 miRGeneDB) | `-db miRBase` |
| `-o` | 출력 디렉토리 | `-o ./output` |
| `-a` | 어댑터 유형 | `-a illumina` |
| `--threads` | 스레드 수 | `--threads 8` |
| `--novel-miRNA` | novel miRNA 예측 (SVM) | `--novel-miRNA` |
| `--trf-analysis` | tRF 분석 | `--trf-analysis` |
| `-gff` | GFF 파일 출력 | `-gff` |

---

## Part 3: miRDeep2 설치

### 3-1. conda 환경 생성

```bash
# miRDeep2 전용 환경 생성
conda create -n mirdeep2 python=3.9 perl=5.32 -y
conda activate mirdeep2
```

### 3-2. 의존성 설치

```bash
# bioconda에서 설치 (가장 간단한 방법)
conda install -c bioconda mirdeep2 -y

# 핵심 의존성도 함께 설치
conda install -c bioconda bowtie samtools viennarna randfold -y
conda install -c bioconda squid -y
```

### 3-3. 수동 설치 (conda 설치 실패 시)

conda 설치가 안 될 경우 수동으로 설치합니다.

```bash
# 작업 디렉토리
mkdir -p ~/tools && cd ~/tools

# --- 1) Bowtie (v1) ---
conda install -c bioconda bowtie -y
# 또는 수동:
# wget https://github.com/BenLangmead/bowtie/releases/download/v1.3.1/bowtie-1.3.1-linux-x86_64.zip
# unzip bowtie-1.3.1-linux-x86_64.zip
# export PATH=$HOME/tools/bowtie-1.3.1-linux-x86_64:$PATH

# --- 2) SAMtools ---
conda install -c bioconda samtools -y

# --- 3) ViennaRNA (RNAfold) ---
conda install -c bioconda viennarna -y
# 확인: RNAfold --version

# --- 4) randfold ---
conda install -c bioconda randfold -y
# 확인: randfold -h

# --- 5) Perl 모듈 (PDF::API2) ---
cpan PDF::API2
# 또는: conda install -c bioconda perl-pdf-api2 -y

# --- 6) miRDeep2 설치 ---
cd ~/tools
git clone https://github.com/rajewsky-lab/mirdeep2.git
cd mirdeep2

# 설치 스크립트 실행
perl install.pl

# PATH에 추가
echo 'export PATH="$HOME/tools/mirdeep2/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### 3-4. miRDeep2 설치 확인

```bash
# 의존성 체크
miRDeep2.pl --help 2>&1 | head -5

# 개별 도구 확인
mapper.pl --help 2>&1 | head -3
quantifier.pl --help 2>&1 | head -3

# 전체 의존성 테스트
cd ~/tools/mirdeep2
perl install.pl  # 모든 의존성이 OK인지 확인
```

### 3-5. miRDeep2 참조 데이터 준비

```bash
mkdir -p ~/mirdeep2_refs && cd ~/mirdeep2_refs

# --- miRBase 데이터 다운로드 ---
# mature miRNA 서열
wget https://www.mirbase.org/download/mature.fa
# hairpin(precursor) miRNA 서열
wget https://www.mirbase.org/download/hairpin.fa

# human만 추출
# mature
grep -A 1 "Homo sapiens" mature.fa | grep -v "^--$" > mature_hsa.fa
# hairpin
grep -A 1 "Homo sapiens" hairpin.fa | grep -v "^--$" > hairpin_hsa.fa

# 서열에서 U → T 변환 (DNA로)
sed -i 's/U/T/g' mature_hsa.fa
sed -i 's/U/T/g' hairpin_hsa.fa

# --- Reference Genome ---
# GRCh38 다운로드 (시간 오래 걸림)
# wget https://ftp.ensembl.org/pub/release-110/fasta/homo_sapiens/dna/Homo_sapiens.GRCh38.dna.primary_assembly.fa.gz
# gunzip Homo_sapiens.GRCh38.dna.primary_assembly.fa.gz

# --- Bowtie Index 생성 ---
# bowtie-build Homo_sapiens.GRCh38.dna.primary_assembly.fa hg38_index
```

---

## Part 4: 테스트 데이터로 실행

### 4-1. 테스트 FASTQ 다운로드

```bash
mkdir -p ~/mirna_test && cd ~/mirna_test

# SRA에서 소규모 테스트 데이터 다운로드 (예시)
# conda install -c bioconda sra-tools -y
# fastq-dump --split-files SRR1646467 --gzip

# 또는 간단한 테스트 파일 생성
cat > test_reads.fa << 'EOF'
>read1
TAAAGTGCTTATAGTGCAGGTAG
>read2
TAGCTTATCAGACTGATGTTGA
>read3
TGTAAACATCCTACACTCTCAGC
EOF
```

### 4-2. miRge3.0 테스트 실행

```bash
conda activate mirge3

# annotate 모드로 실행
miRge3.0 annotate \
    -s ~/mirna_test/test_reads.fa \
    -lib ~/mirge3_libs \
    -on human \
    -db miRBase \
    -o ~/mirna_test/mirge3_output \
    -a illumina

# 결과 확인
ls ~/mirna_test/mirge3_output/
cat ~/mirna_test/mirge3_output/miR.Counts.csv | head -20
```

### 4-3. miRDeep2 테스트 실행

```bash
conda activate mirdeep2

cd ~/mirna_test

# Step 1: 리드 전처리 및 매핑
mapper.pl test_reads.fa -e -h \
    -m -s reads_collapsed.fa \
    -t reads_vs_genome.arf \
    -p ~/mirdeep2_refs/hg38_index \
    -v

# Step 2: miRDeep2 실행 (novel miRNA 발견)
miRDeep2.pl \
    reads_collapsed.fa \
    ~/mirdeep2_refs/Homo_sapiens.GRCh38.dna.primary_assembly.fa \
    reads_vs_genome.arf \
    ~/mirdeep2_refs/mature_hsa.fa \
    none \
    ~/mirdeep2_refs/hairpin_hsa.fa \
    2> report.log

# Step 3: 결과 확인
ls result*.html result*.csv
```

---

## Part 5: 문제 해결 (Troubleshooting)

### 일반적인 오류

| 오류 | 해결 방법 |
|------|-----------|
| `bowtie: command not found` | `conda install -c bioconda bowtie` |
| `samtools: command not found` | `conda install -c bioconda samtools` |
| `RNAfold: command not found` | `conda install -c bioconda viennarna` |
| `Can't locate PDF/API2.pm` | `cpan PDF::API2` 또는 conda로 설치 |
| miRge3.0 라이브러리 오류 | 라이브러리 경로 확인, 재다운로드 |
| Permission denied | `chmod +x` 또는 `sudo` 사용 |
| Python 버전 충돌 | conda 환경 분리 확인 |

### conda 환경 충돌 시

```bash
# 환경 완전 삭제 후 재생성
conda deactivate
conda env remove -n mirge3
conda env remove -n mirdeep2

# mamba 사용 (더 빠른 의존성 해결)
conda install -n base -c conda-forge mamba -y
mamba create -n mirge3 python=3.9 -y
mamba create -n mirdeep2 python=3.9 perl=5.32 -y
```

### WSL2 특이사항

```bash
# Windows 파일시스템(/mnt/c/)에서 작업하면 느림
# → Linux 파일시스템(~/  또는 /home/)에서 작업 권장

# 메모리 제한 설정 (필요시)
# Windows에서 %USERPROFILE%/.wslconfig 파일:
# [wsl2]
# memory=16GB
# processors=8
```

---

## Part 6: Claude Code를 리눅스에서 사용하기

```bash
# Node.js 설치 (Claude Code 실행에 필요)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Claude Code 설치
npm install -g @anthropic-ai/claude-code

# 실행
cd ~/your_project
claude

# API 키 설정 (첫 실행 시 브라우저 인증 또는 API 키 입력)
# export ANTHROPIC_API_KEY="your-key-here"
```

---

## 권장 설치 순서 요약

```
1. 시스템 패키지 설치 (apt)
2. Miniconda 설치
3. miRge3.0 환경 생성 + 설치 + 라이브러리 다운로드
4. miRge3.0 테스트 실행
5. miRDeep2 환경 생성 + 설치
6. 참조 데이터 다운로드 (miRBase, genome)
7. miRDeep2 테스트 실행
```

> **Tip**: 각 도구를 별도 conda 환경에 설치하면 의존성 충돌을 방지할 수 있습니다.
