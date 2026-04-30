# TODO

## Coordination with baseweb

This demo project validates baseweb migrations. Every baseweb migration task should be tested here.

### Workflow

1. **Sync baseweb**: `cd ../baseweb && git pull && uv sync`
2. **Update demo**: `cd ../baseweb-demo && uv sync`
3. **Run tests**: `make test`
4. **Run app**: `make run` and manually verify
5. **Commit both**: Related changes should be committed together

### Validation Checklist

After each baseweb migration task:
- [ ] `uv sync` works in both projects
- [ ] `make test` passes in both projects
- [ ] `make run` starts the demo without errors
- [ ] Manual testing of affected features

---

## Backlog

### Phase 1: Project Setup

- [ ] **task-1.1: Modern Python Project Setup**
  - Create pyproject.toml with uv-compatible configuration
  - Configure editable install to local baseweb
  - Set up Python 3.11+ requirement
  - Create .python-version file
  - Acceptance: `uv sync` works, baseweb imported from local source

### Phase 2: Flask to Quart Migration

- [ ] **task-2.1: Migrate Main Entry Point**
  - Update `__init__.py` for Quart compatibility
  - Disable SocketIO handlers (pending baseweb task-3.3)
  - Convert sync operations to async where needed
  - Acceptance: Application starts without errors

- [ ] **task-2.2: Migrate Index Page**
  - `from flask import request` → `from quart import request`
  - `from flask_restful import Resource` → `from baseweb import Resource`
  - Convert Resource methods to async
  - Add `await` to `request.get_json()` calls
  - Disable SocketIO handlers temporarily
  - Acceptance: Index page loads, REST endpoints work

- [ ] **task-2.3: Migrate Protected Page**
  - `from flask import Response` → `from quart import Response`
  - `from flask_restful import Resource` → `from baseweb import Resource`
  - Convert Resource methods to async
  - Verify oatk integration still works
  - Acceptance: Protected page and OAuth flow work

- [ ] **task-2.4: Migrate CollectionView Component**
  - `from flask import request, abort` → `from quart import request, abort`
  - `from flask_restful import Resource` → `from baseweb import Resource`
  - Convert Resource methods to async
  - Add `await` to `request.args` access if needed
  - Acceptance: CollectionView API endpoints work

### Phase 3: WebSocket Re-enablement

- [x] **task-3.1: Re-enable SocketIO Handlers** (2026-04-30)
  - Re-enabled SocketIO handlers with python-socketio ASGI pattern
  - Updated handlers to async with `sid` parameter
  - Added `asgi_app` entry point for running with uvicorn
  - Updated Makefile to use `app:asgi_app`
  - Acceptance: WebSocket/SocketIO functionality works

- [x] **task-3.2: Frontend Verification** (2026-05-01)
  - Added comprehensive frontend integration tests
  - Verified REST API endpoints work with async handlers
  - Verified Socket.IO client connectivity
  - All 26 tests pass
  - Acceptance: Frontend works correctly with async backend

## In Progress

(none)

## Done

### Phase 2: Flask to Quart Migration

- [x] **task-2.1: Migrate Main Entry Point** (2026-04-30)
  - Updated `app/__init__.py` for Quart compatibility
  - Disabled SocketIO handlers (pending baseweb task-3.3)
  - Added TODO comment for WebSocket migration
  - Acceptance: Application starts without errors, all tests pass

- [x] **task-2.2: Migrate Index Page** (2026-04-30)
  - Changed `from flask import request` → `from quart import request`
  - Changed `from flask_restful import Resource` → `from baseweb import Resource`
  - Converted `Hello` Resource methods to async
  - Disabled SocketIO handlers and emit calls
  - Changed `server.api.add_resource()` → `server.add_resource()`
  - Acceptance: Index page loads, REST endpoints work

- [x] **task-2.3: Migrate Protected Page** (2026-04-30)
  - Changed `from flask import Response` → `from quart import Response`
  - Changed `from flask_restful import Resource` → `from baseweb import Resource`
  - Converted `HelloWorld` Resource methods to async
  - Made OAuth configuration optional (graceful degradation)
  - Acceptance: Protected page loads, OAuth flow works when configured

- [x] **task-2.4: Migrate CollectionView Component** (2026-04-30)
  - Changed `from flask import request, abort` → `from quart import request, abort`
  - Changed `from flask_restful import Resource` → `from baseweb import Resource`
  - Converted `Collection` Resource methods to async
  - Changed `server.api.add_resource()` → `server.add_resource()`
  - Acceptance: CollectionView API endpoints work

### Phase 1: Project Setup

- [x] **task-1.1: Modern Python Project Setup** (2026-04-30)
  - Created pyproject.toml with uv-compatible configuration
  - Configured editable install to local baseweb via `[tool.uv.sources]`
  - Set Python 3.11+ requirement
  - Created .python-version file (3.12)
  - Updated .gitignore for Python/uv patterns
  - Restructured to app/ folder for proper imports
  - Added comprehensive test suite
  - Acceptance: `uv sync` works, baseweb imported from local source, app structure ready