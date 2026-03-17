# Coding Conventions

## Status

This project is in its **initial scaffolding phase**. The only project-authored Python file is `main.py` (7 lines), which contains a stub entry point. No application logic, modules, or meaningful source code has been written yet. All observations below are drawn from the existing stub and project configuration files.

---

## Code Style and Formatting

- **Language**: Python 3.11 (pinned via `.python-version`)
- **Package manager**: `uv` (evidenced by `uv.lock` and `pyproject.toml` using PEP 517/518 layout)
- **No formatter or linter is configured** — `pyproject.toml` has no `[tool.ruff]`, `[tool.black]`, `[tool.isort]`, or similar sections
- The stub `main.py` uses 4-space indentation (PEP 8 standard)
- No type annotations are present yet

### Inferred intent (from README)

The README describes a bioinformatics pipeline in Korean, suggesting the developer intends to build a Python-based miRNA-seq analysis pipeline. The preferred style going forward should align with PEP 8 and the scientific Python ecosystem (pandas, matplotlib, seaborn, biopython).

---

## Naming Conventions

### Observed (from existing code)

| Construct | Convention | Example |
|-----------|-----------|---------|
| Functions | `snake_case` | `main()` |
| Module/file | `snake_case` | `main.py` |
| Project name | `snake_case` (lowercase) | `mirnaseq` |

### No examples yet of:
- Class names (expected: `PascalCase` per PEP 8)
- Constants (expected: `UPPER_SNAKE_CASE`)
- Variable names within business logic

---

## Common Patterns

- **Entry point pattern**: Standard Python idiom used:
  ```python
  if __name__ == "__main__":
      main()
  ```
- **`main()` function**: A top-level `main()` function wraps the program entry. This is the only structural pattern currently present.
- No classes, modules, or packages defined yet beyond the single `main.py` file.

---

## Error Handling

- **No error handling exists** in the current codebase.
- No `try/except` blocks, logging setup, or custom exception classes are present.
- Given the bioinformatics domain (file I/O, subprocess calls, large data), explicit error handling will be important when implementation begins.

---

## Documentation Style

### README.md

- Written primarily in **Korean** with technical terms in English
- Uses Markdown formatting: tables, headers, code blocks, bullet lists
- Documents pipeline options (nf-core/smrnaseq vs. custom Python/R), comparison tables, installation snippets, and reference links
- No inline prose in English except for technical tool names and commands

### Source code comments / docstrings

- **None present** in `main.py` — the stub has no comments or docstrings
- No documentation conventions are established yet

---

## Language Preferences

- **Korean** is used for narrative/documentation text (README headings, descriptions, table content)
- **English** is used for:
  - All code (function names, variable names, project identifiers)
  - Technical tool names (FastQC, Bowtie, miRDeep2, DESeq2, etc.)
  - Command-line examples and code blocks
- Mixed Korean/English (Konglish) is common in comments within the README (e.g., "FastQC: 원시 리드 품질 확인")

---

## Dependencies (from `pyproject.toml`)

```
biopython >= 1.86
cutadapt >= 5.2
matplotlib >= 3.10.8
mirge3 >= 0.1.4
pandas >= 3.0.1
seaborn >= 0.13.2
```

These reflect a scientific Python / bioinformatics workflow. No web framework, CLI framework (e.g., Click, Typer), or task runner is included yet.

---

## Summary

The project has essentially no established conventions beyond the bare Python project skeleton. Conventions should be defined before implementation begins. Recommended actions:

1. Add a linter/formatter (e.g., `ruff`) to `pyproject.toml`
2. Define type annotation policy
3. Establish a docstring format (NumPy style is common in scientific Python)
4. Decide on Korean vs. English for inline code comments
