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

## Unsorted

- bug: apparent off-by-one selection highlight in CollectionView component
- add warning when OAUTH_PROVIDER/OAUTH_CLIENT_ID aren't configured and disable login button
- bug: accessing protected API endpoint fails. probably oatk needs to be upgraded to support async?
```
[2026-05-01 09:15:45 +0200] [baseweb-demo] [76906] [ERROR] Exception on request GET /api/protected/hello
Traceback (most recent call last):
  File "/Users/xtof/Workspace/agentic/baseweb-demo/.venv/lib/python3.12/site-packages/quart/app.py", line 1464, in handle_request
    return await self.full_dispatch_request(request_context)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/xtof/Workspace/agentic/baseweb-demo/.venv/lib/python3.12/site-packages/quart/app.py", line 1502, in full_dispatch_request
    result = await self.handle_user_exception(error)
             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/xtof/Workspace/agentic/baseweb-demo/.venv/lib/python3.12/site-packages/quart/app.py", line 1059, in handle_user_exception
    raise error
  File "/Users/xtof/Workspace/agentic/baseweb-demo/.venv/lib/python3.12/site-packages/quart/app.py", line 1500, in full_dispatch_request
    result = await self.dispatch_request(request_context)
             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/xtof/Workspace/agentic/baseweb-demo/.venv/lib/python3.12/site-packages/quart/app.py", line 1597, in dispatch_request
    return await self.ensure_async(handler)(**request_.view_args)  # type: ignore[return-value]
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/xtof/Workspace/agentic/baseweb/src/baseweb/__init__.py", line 366, in handler
    result = await method_func(*args, **kwargs)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/xtof/Workspace/agentic/baseweb-demo/.venv/lib/python3.12/site-packages/oatk/__init__.py", line 218, in wrapper
    return self.execute_authenticated(f, None, *args, **kwargs)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/xtof/Workspace/agentic/baseweb-demo/.venv/lib/python3.12/site-packages/oatk/__init__.py", line 182, in execute_authenticated
    if "Authorization" not in request.headers:
                              ^^^^^^^^^^^^^^^
  File "/Users/xtof/Workspace/agentic/baseweb-demo/.venv/lib/python3.12/site-packages/werkzeug/local.py", line 318, in __get__
    obj = instance._get_current_object()
          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/xtof/Workspace/agentic/baseweb-demo/.venv/lib/python3.12/site-packages/werkzeug/local.py", line 519, in _get_current_object
    raise RuntimeError(unbound_message) from None
RuntimeError: Working outside of request context.

This typically means that you attempted to use functionality that needed
an active HTTP request. Consult the documentation on testing for
information about how to avoid this problem.
```

## Backlog

(currently none)

## Done

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
