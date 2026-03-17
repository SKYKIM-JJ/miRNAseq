# miRNAseq Data Analysis Pipeline

## 파이프라인 조사 결과 및 제안

---

## 1. 주요 miRNA-seq 분석 파이프라인 비교

| 파이프라인 | 특징 | 언어 | 장점 | 단점 |
|-----------|------|------|------|------|
| **nf-core/smrnaseq** | Nextflow 기반 end-to-end 파이프라인 | Nextflow/Groovy | 재현성, 컨테이너 지원, 커뮤니티 활발 | Nextflow 설치 필요 |
| **miRDeep2** | 가장 널리 인용된 도구 | Perl | novel miRNA 발견, 높은 정확도 | 속도 느림, 설치 복잡 |
| **miRge3.0** | 빠른 정량 + tRF 분석 | Python | 속도 빠름, SVM 기반 novel miRNA 예측 | novel miRNA 발견은 miRDeep2보다 약함 |
| **sRNAbench** | 웹 기반 + 로컬 설치 가능 | Java | 다양한 small RNA 분석, 시각화 | 대용량 데이터 처리 제한 |
| **Chimira** | 웹 기반 | Web | 사용 편리 | 커스터마이징 제한 |
| **OASIS2** | 웹 기반 통합 파이프라인 | Web | DE 분석 포함 | 로컬 실행 불가 |

---

## 2. 추천 파이프라인: 2가지 옵션

### Option A: nf-core/smrnaseq (추천 - 대규모/재현성 중시)

nf-core 커뮤니티에서 관리하는 best-practice 파이프라인으로, 가장 체계적이고 재현 가능한 분석을 제공합니다.

**워크플로우:**
1. FastQC → QC
2. UMI-tools → UMI 추출 (해당 시)
3. FastP → 어댑터 트리밍
4. Bowtie2 → 오염 필터링 (rRNA, tRNA 등)
5. Bowtie → miRBase 정렬 (mature + hairpin)
6. SAMtools → 정량화
7. miRDeep2 → novel miRNA 발견
8. miRTop → isomiR 분석
9. DESeq2/edgeR → 차등 발현 분석
10. MultiQC → 종합 QC 보고서

**설치:**
```bash
# Nextflow 설치
curl -s https://get.nextflow.io | bash

# 실행
nextflow run nf-core/smrnaseq \
  --input samplesheet.csv \
  --genome GRCh38 \
  --protocol illumina \
  -profile docker
```

---

### Option B: Custom Python/R Pipeline (추천 - 유연성/학습 중시)

개별 도구를 조합한 커스텀 파이프라인으로, 각 단계를 세밀하게 제어할 수 있습니다.

**워크플로우:**

```
FASTQ → QC → Trimming → Alignment → Quantification → DE Analysis → Visualization
  │        │        │          │            │              │
FastQC   FastP   Bowtie    miRDeep2     DESeq2/       Volcano
MultiQC  Cutadapt          miRge3.0    edgeR/         Heatmap
                                       PyDESeq2       PCA
```

**Step 1: QC & Preprocessing**
- FastQC: 원시 리드 품질 확인
- FastP/Cutadapt: 어댑터 제거 + 길이 필터링 (18-30nt)

**Step 2: Alignment & Quantification**
- Bowtie: miRBase에 정렬 (mature miRNA)
- miRDeep2: novel miRNA 발견 + 정량화
- 또는 miRge3.0: 빠른 정량화 + tRF 분석

**Step 3: Differential Expression**
- DESeq2 (R) 또는 PyDESeq2 (Python): 차등 발현 분석
- edgeR: 대안적 DE 분석

**Step 4: Downstream Analysis**
- Target prediction: TargetScan, miRDB
- Pathway analysis: KEGG, GO enrichment
- Network analysis: miRNA-mRNA interaction

---

## 3. 최종 추천

| 상황 | 추천 |
|------|------|
| 대규모 샘플, 재현성 중요 | **nf-core/smrnaseq** |
| 커스텀 분석, Python 선호 | **miRge3.0 + PyDESeq2** |
| novel miRNA 발견 중요 | **miRDeep2** |
| 빠른 탐색적 분석 | **miRge3.0** |

---

## 4. 필요한 참조 데이터

- **miRBase** (v22.1): mature/hairpin miRNA 서열
- **Reference genome**: GRCh38 (human)
- **Bowtie/Bowtie2 index**: 게놈 인덱스
- **Adapter sequence**: 라이브러리 프렙 키트에 따라 다름

---

## 참고 자료

- [nf-core/smrnaseq](https://nf-co.re/smrnaseq)
- [miRDeep2](https://github.com/rajewsky-lab/mirdeep2)
- [miRge3.0](https://github.com/mhalushka/miRge3.0)
- [miRBase](https://www.mirbase.org/)
- [DESeq2](https://bioconductor.org/packages/DESeq2/)
