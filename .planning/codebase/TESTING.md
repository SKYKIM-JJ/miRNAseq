# Testing

## Status

**No tests exist in this project.**

The codebase consists of a single 7-line stub (`main.py`) with no application logic. There are no test files, no test directories, and no testing framework is configured.

---

## Test Framework

- **None configured**
- `pyproject.toml` has no `[tool.pytest.ini_options]`, no `pytest` dependency, no `unittest` usage, and no `[tool.coverage]` section
- `pytest` is not listed in the project dependencies

---

## Test Structure and Organization

- No `tests/` or `test/` directory exists
- No `test_*.py` or `*_test.py` files exist in the project root
- No `conftest.py` or fixtures are defined

---

## Testing Patterns

- No testing patterns are established
- No mocking, parameterization, or fixture usage observed

---

## Coverage

- **0% coverage** — no tests exist and no coverage tooling is configured
- No `.coveragerc`, `coverage.xml`, or `htmlcov/` artifacts are present

---

## Notes on Test Files in `.venv`

The `.venv` directory (excluded from project source) contains test files from installed third-party packages, such as:

- `.venv/lib/python3.11/site-packages/sklearn/frozen/tests/test_frozen.py`
- `.venv/lib/python3.11/site-packages/sklearn/ensemble/tests/test_gradient_boosting.py`
- `.venv/lib/python3.11/site-packages/sklearn/ensemble/tests/test_base.py`

These are **not project tests** — they belong to the `scikit-learn` package bundled inside the virtual environment.

---

## Recommendations

Given this is a bioinformatics pipeline project, the following testing approach is suggested when implementation begins:

1. **Framework**: Add `pytest` (and optionally `pytest-cov`) to dev dependencies in `pyproject.toml`
2. **Structure**: Create a `tests/` directory at the project root
3. **Unit tests**: Test individual processing functions (adapter trimming, count parsing, normalization)
4. **Integration tests**: Use small synthetic FASTQ files to test pipeline steps end-to-end
5. **Fixtures**: Use `conftest.py` with `tmp_path` fixtures for file I/O tests
6. **Mocking**: Mock subprocess calls (e.g., Bowtie, miRge3) using `unittest.mock` or `pytest-mock`
7. **Coverage target**: Aim for ≥ 80% coverage on core pipeline logic
