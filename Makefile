-include ~/.claude/Makefile

.PHONY: env-dev env-run install-pythons test test-cov test-all format lint typecheck check run run-dev clean clean-all help

## Environment

env-dev: ## Install all dependencies (dev)
	uv sync --extra dev

env-run: ## Install runtime dependencies only
	uv sync

install-pythons: ## Install Python 3.10, 3.11, 3.12
	uv python install 3.10 3.11 3.12

## Testing

test: env-dev ## Run tests (usage: make test / optional: TEST=file|file:test_name)
	uv run pytest -v $(TEST)

test-cov: env-dev ## Run tests with coverage
	uv run pytest --cov=. --cov-report=term-missing $(TEST)

test-all: env-dev ## Run tests on all Python versions
	uv run tox

## Code Quality

format: env-dev ## Format code and fix linting issues
	uv run ruff format .
	uv run ruff check --fix .

lint: env-dev ## Check code for linting issues
	uv run ruff check .

typecheck: env-dev ## Run type checking
	uv run mypy .

check: format lint typecheck test ## Run all quality checks

## Running

run: env-run ## Run the production server
	uv run gunicorn "app:asgi_app" -w 1 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000

run-dev: env-run ## Run the development server with auto-reload
	uv run uvicorn "app:asgi_app" --reload --host 0.0.0.0 --port 8000

## Cleanup

clean: ## Remove build artifacts
	rm -rf dist/ build/ *.egg-info .pytest_cache .coverage .mypy_cache .ruff_cache
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true

clean-all: clean ## Remove virtualenv and lock file
	rm -rf .venv uv.lock

## Help

help: ## Show this help message
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' Makefile | grep -v "install-pythons\|sync" | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

# Project-specific targets (review and integrate)
# - run: Production server (gunicorn)
# - run-dev: Development server with auto-reload (uvicorn)
# Note: This is a demo app, not published to PyPI