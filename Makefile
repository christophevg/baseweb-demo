.PHONY: lint test coverage install run clean

env-test:
	uv sync --extra dev

env-run:
	uv sync

lint: env-test
	uv run ruff check .

test: env-test
	uv run pytest tests/ -v

coverage: env-test
	uv run pytest tests/ --cov=. --cov-report=term-missing

run: env-run
	uv run gunicorn "app:asgi_app" -w 1 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000

run-dev: env-run
	uv run uvicorn "app:asgi_app" --reload --host 0.0.0.0 --port 8000

clean:
	rm -rf .venv __pycache__ .pytest_cache .coverage *.egg-info
