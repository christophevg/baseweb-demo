# Baseweb-Demo Functional Analysis

**Created:** 2026-04-30
**Status:** Draft
**Version:** 0.4.3 → 1.0.0 migration

---

## Project Overview

Baseweb-demo is a demonstration application showcasing baseweb's capabilities. It provides example pages and components that exercise baseweb's features including routing, authentication, real-time communication, and data management.

### Purpose

- End-to-end test case for baseweb
- Visual demonstration of baseweb features
- Reference implementation for baseweb users

### Technology Stack

| Layer | Current | Target |
|-------|---------|--------|
| Backend Framework | Flask (sync) | Quart (async) |
| REST API | Flask-RESTful | Baseweb Resource |
| WebSocket | Flask-SocketIO | Disabled (pending baseweb task-3.3) |
| Frontend | Vue 2 + Vuetify 2 | Unchanged |
| Python | 3.9+ | 3.11+ |

---

## Migration Requirements

### Phase 1: Project Setup

#### 1.1 Modern Python Project Setup

**Rationale:** The demo uses legacy `requirements.txt` and PyEnv-based setup. Need to migrate to modern uv-based workflow.

**Scope:**
- Create `pyproject.toml` with project metadata
- Configure editable install pointing to local baseweb
- Set up Python 3.11+ requirement
- Create `.python-version` file

**Acceptance Criteria:**
- [ ] `uv sync` works
- [ ] `uv run python -m baseweb_demo` works
- [ ] Local baseweb is imported (editable install)

**Dependencies:** None

---

### Phase 2: Flask to Quart Migration

#### 2.1 Main Entry Point Migration

**Rationale:** The main `__init__.py` creates and configures the baseweb server instance.

**Changes Required:**
- Remove/comment SocketIO handlers temporarily
- Ensure async compatibility

**Files Affected:**
- `__init__.py`

**Acceptance Criteria:**
- [ ] Application starts without errors
- [ ] No Flask imports remain
- [ ] SocketIO handlers disabled (not removed)

**Dependencies:** 1.1

#### 2.2 Index Page Migration

**Rationale:** The index page demonstrates REST API and WebSocket functionality.

**Changes Required:**
- `from flask import request` → `from quart import request`
- `from flask_restful import Resource` → `from baseweb import Resource`
- Convert `Hello` Resource methods to async
- Add `await` to `request.get_json()` if used
- Disable SocketIO handlers temporarily

**Files Affected:**
- `pages/index/__init__.py`

**Current Code:**
```python
from flask import request
from flask_restful import Resource

class Hello(Resource):
    def get(self):
        name = request.args["name"]
        return "Hello {0} from REST/GET".format(name)
    
    def post(self):
        name = request.get_json()["name"]
        return "Hello {0} from REST/POST".format(name)

server.api.add_resource(Hello, "/api/hello")
```

**Target Code:**
```python
from quart import request
from baseweb import server, Resource

class Hello(Resource):
    async def get(self):
        name = request.args["name"]
        return "Hello {0} from REST/GET".format(name)
    
    async def post(self):
        name = await request.get_json()
        return "Hello {0} from REST/POST".format(name["name"])

server.add_resource(Hello, "/api/hello")
```

**Acceptance Criteria:**
- [ ] Index page loads
- [ ] REST GET endpoint works
- [ ] REST POST endpoint works
- [ ] SocketIO handlers disabled

**Dependencies:** 1.1, 2.1

#### 2.3 Protected Page Migration

**Rationale:** The protected page demonstrates OAuth integration with baseweb.

**Changes Required:**
- `from flask import Response` → `from quart import Response`
- `from flask_restful import Resource` → `from baseweb import Resource`
- Convert `HelloWorld` Resource methods to async

**Files Affected:**
- `pages/protected_page/__init__.py`

**Current Code:**
```python
from flask import Response
from flask_restful import Resource

class HelloWorld(Resource):
    @oauth.authenticated
    def get(self):
        return {"message": "hello protected world"}

server.api.add_resource(HelloWorld, "/api/protected/hello")
```

**Target Code:**
```python
from quart import Response
from baseweb import server, Resource

class HelloWorld(Resource):
    @oauth.authenticated
    async def get(self):
        return {"message": "hello protected world"}

server.add_resource(HelloWorld, "/api/protected/hello")
```

**Acceptance Criteria:**
- [ ] Protected page loads
- [ ] OAuth flow works
- [ ] Protected endpoint returns expected response

**Dependencies:** 1.1, 2.1

#### 2.4 CollectionView Component Migration

**Rationale:** The CollectionView demonstrates data table functionality with CRUD operations.

**Changes Required:**
- `from flask import request, abort` → `from quart import request, abort`
- `from flask_restful import Resource` → `from baseweb import Resource`
- Convert `Collection` Resource methods to async

**Files Affected:**
- `pages/components/CollectionView/__init__.py`

**Current Code:**
```python
from flask import request, abort
from flask_restful import Resource

class Collection(Resource):
    @server.authenticated("app.collection.get")
    def get(self):
        start = int(request.args.get("start", 0))
        # ...
        return {"content": selection[start:start+limit], ...}
    
    @server.authenticated("app.collection.delete")
    def delete(self):
        id = request.args["id"]
        # ...

server.api.add_resource(Collection, "/api/collection")
```

**Target Code:**
```python
from quart import request, abort
from baseweb import server, Resource

class Collection(Resource):
    @server.authenticated("app.collection.get")
    async def get(self):
        start = int(request.args.get("start", 0))
        # ...
        return {"content": selection[start:start+limit], ...}
    
    @server.authenticated("app.collection.delete")
    async def delete(self):
        id = request.args["id"]
        # ...

server.add_resource(Collection, "/api/collection")
```

**Acceptance Criteria:**
- [ ] CollectionView page loads
- [ ] GET endpoint returns paginated data
- [ ] POST endpoint works
- [ ] DELETE endpoint works

**Dependencies:** 1.1, 2.1

---

### Phase 3: WebSocket Re-enablement (Blocked)

#### 3.1 SocketIO Handler Migration

**Rationale:** Real-time communication needs to be restored once baseweb supports async WebSocket.

**Blocking Dependency:** baseweb task-3.3 (WebSocket migration)

**Changes Required:**
- Migrate Flask-SocketIO handlers to Quart native WebSocket
- Update frontend Socket.IO client if needed
- Re-enable event handlers

**Files Affected:**
- `__init__.py` (main)
- `pages/index/__init__.py`

**Acceptance Criteria:**
- [ ] WebSocket connection established
- [ ] Event handlers work
- [ ] Frontend receives real-time messages

**Dependencies:** baseweb task-3.3 completion

---

## File Migration Summary

| File | Changes | Status |
|------|---------|--------|
| `__init__.py` | Disable SocketIO | Pending |
| `pages/index/__init__.py` | Flask→Quart, Flask-RESTful→Resource, disable SocketIO | Pending |
| `pages/protected_page/__init__.py` | Flask→Quart, Flask-RESTful→Resource | Pending |
| `pages/components/CollectionView/__init__.py` | Flask→Quart, Flask-RESTful→Resource | Pending |
| `pages/page2/__init__.py` | None (simple registration) | No changes needed |
| `pages/page3/__init__.py` | None (simple registration) | No changes needed |
| `pages/page4/__init__.py` | None (simple registration) | No changes needed |
| `pages/page5/__init__.py` | None (simple registration) | No changes needed |
| `pages/page6/__init__.py` | None (simple registration) | No changes needed |
| `pages/page7/__init__.py` | None (simple registration) | No changes needed |

---

## Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| oatk OAuth compatibility | Medium | Low | Test OAuth flow early |
| SocketIO feature loss | Medium | Certain | Document as temporary, track in task-3.1 |
| Frontend compatibility | Low | Low | Vue frontend should work unchanged |

---

## Success Metrics

1. **Functionality**
   - All pages load correctly
   - REST endpoints respond properly
   - OAuth flow works
   - Data operations (CRUD) work

2. **Code Quality**
   - No Flask imports remain (except for oatk if needed)
   - All Resource methods are async
   - Code follows baseweb migration guide

---

## Estimated Migration Time

**Phase 1-2:** 1-2 hours (straightforward migration following the guide)

**Phase 3:** Blocked until baseweb task-3.3 complete