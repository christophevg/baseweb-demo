.PHONY: lint test coverage install run clean

lint:
	uv run ruff check .

test:
	uv run pytest tests/ -v

coverage:
	uv run pytest tests/ --cov=. --cov-report=term-missing

install:
	uv sync --all-extras

run:
	uv run gunicorn app:server -w 1 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000

run-dev:
	uv run uvicorn app:server --reload --host 0.0.0.0 --port 8000

clean:
	rm -rf .venv __pycache__ .pytest_cache .coverage *.egg-info