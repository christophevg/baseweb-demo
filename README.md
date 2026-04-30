# baseweb demo

This repository is a small demo application for baseweb. See [https://github.com/christophevg/baseweb](https://github.com/christophevg/baseweb) for more information on baseweb.

## Requirements

- Python 3.11+
- [uv](https://docs.astral.sh/uv/) package manager

## Running the Demo

Clone the repository and install dependencies:

```console
% git clone https://github.com/christophevg/baseweb-demo
% cd baseweb-demo
% uv sync --all-extras
```

Run the server:

```console
% make run
```

Or manually:

```console
% uv run gunicorn app:server -w 1 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

For development with auto-reload:

```console
% make run-dev
```

Now visit [http://localhost:8000](http://localhost:8000).

![baseweb demo](baseweb-server.png)

## Development

Run tests:

```console
% make test
```

Run linting:

```console
% make lint
```

## Project Structure

```
baseweb-demo/
├── app/                    # Application code
│   ├── __init__.py         # Main entry point
│   ├── pages/              # Page modules
│   ├── components/         # Vue components
│   └── static/             # Static files
├── tests/                  # Test suite
├── pyproject.toml          # Project configuration
└── Makefile                # Development commands
```

## Migrating from Flask to Quart

This demo has been migrated from Flask to Quart for async support. Key changes:

- Flask → Quart imports
- Flask-RESTful → Baseweb Resource class
- Sync methods → Async methods
- SocketIO handlers disabled (pending WebSocket migration)

See [baseweb migration guide](https://github.com/christophevg/baseweb/blob/master/docs/migration-guide.md) for details.