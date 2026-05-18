"""Frontend integration tests for task-3.4.

These tests verify the frontend works correctly with the async Quart backend.
"""

import pytest
import socketio


class TestFrontendStaticFiles:
  """Tests for frontend static file serving."""

  @pytest.fixture
  def app(self):
    """Create test app."""
    from app import server
    server.config["TESTING"] = True
    return server

  @pytest.mark.asyncio
  async def test_vendor_js_files_served(self, app):
    """
    Given: A running baseweb app
    When: Requesting vendor JS files
    Then: Files should be served with correct content-type
    """
    async with app.test_app() as test_app:
      client = test_app.test_client()

      # Test socket.io client library
      response = await client.get("/static/vendor/js/socket.io.slim.js")
      assert response.status_code == 200
      content_type = response.headers.get("content-type", "")
      assert "javascript" in content_type or "application/octet-stream" in content_type

  @pytest.mark.asyncio
  async def test_vue_js_served(self, app):
    """
    Given: A running baseweb app
    When: Requesting Vue.js library
    Then: File should be served
    """
    async with app.test_app() as test_app:
      client = test_app.test_client()
      response = await client.get("/static/vendor/js/vue.js")
      assert response.status_code == 200

  @pytest.mark.asyncio
  async def test_vuetify_css_served(self, app):
    """
    Given: A running baseweb app
    When: Requesting Vuetify CSS
    Then: File should be served
    """
    async with app.test_app() as test_app:
      client = test_app.test_client()
      # Vue 3 migration: vuetify.min.css -> vuetify-labs.v3.css
      response = await client.get("/static/vendor/css/vuetify-labs.v3.css")
      assert response.status_code == 200


class TestFrontendStoreAndRoutes:
  """Tests for frontend store and route initialization."""

  @pytest.fixture
  def app(self):
    """Create test app."""
    from app import server
    server.config["TESTING"] = True
    return server

  @pytest.mark.asyncio
  async def test_store_js_served(self, app):
    """
    Given: A running baseweb app
    When: Requesting /static/js/store.js
    Then: Vuex store should be generated with app config
    """
    async with app.test_app() as test_app:
      client = test_app.test_client()
      response = await client.get("/static/js/store.js")
      assert response.status_code == 200
      content = await response.get_data()
      # Store should contain Vuex.createStore initialization (Vue 3)
      assert b"Vuex.createStore" in content

  @pytest.mark.asyncio
  async def test_landing_page_renders(self, app):
    """
    Given: A running baseweb app
    When: Requesting /
    Then: HTML page with Vue app should be rendered
    """
    async with app.test_app() as test_app:
      client = test_app.test_client()
      response = await client.get("/")
      assert response.status_code == 200
      content = await response.get_data()
      # Check for Vue app mount point
      assert b'id="app"' in content
      # Check for socket.io script
      assert b"socket.io.slim.js" in content

  @pytest.mark.asyncio
  async def test_socketio_enabled_in_page(self, app):
    """
    Given: A running baseweb app with socketio enabled
    When: Rendering the landing page
    Then: socketio should be configured
    """
    async with app.test_app() as test_app:
      client = test_app.test_client()
      response = await client.get("/")
      content = await response.get_data()
      # Check that socketio is enabled (Vue 3 pattern)
      assert b"$socketio" in content or b"socketio" in content
      # Check for socket.io client library
      assert b"socket.io.slim.js" in content


class TestRestApiIntegration:
  """Tests for REST API integration with frontend."""

  @pytest.fixture
  def app(self):
    """Create test app."""
    from app import server
    server.config["TESTING"] = True
    return server

  @pytest.mark.asyncio
  async def test_hello_get_endpoint(self, app):
    """
    Given: A running baseweb-demo app
    When: GET /api/hello?name=Test
    Then: Plain text response should be returned
    """
    async with app.test_app() as test_app:
      client = test_app.test_client()
      response = await client.get("/api/hello?name=Test")
      assert response.status_code == 200
      content = await response.get_data()
      assert b"Hello Test from REST/GET" in content

  @pytest.mark.asyncio
  async def test_hello_post_endpoint(self, app):
    """
    Given: A running baseweb-demo app
    When: POST /api/hello with JSON {"name": "Test"}
    Then: JSON response should be returned
    """
    async with app.test_app() as test_app:
      client = test_app.test_client()
      response = await client.post(
        "/api/hello",
        json={"name": "Test"},
        headers={"Content-Type": "application/json"}
      )
      assert response.status_code == 200
      data = await response.get_json()
      assert data["message"] == "Hello Test from REST/POST"

  @pytest.mark.asyncio
  async def test_api_returns_json_content_type(self, app):
    """
    Given: A running baseweb-demo app
    When: POST to API endpoint
    Then: Response should have application/json content-type
    """
    async with app.test_app() as test_app:
      client = test_app.test_client()
      response = await client.post(
        "/api/hello",
        json={"name": "Test"},
        headers={"Content-Type": "application/json"}
      )
      assert response.status_code == 200
      content_type = response.headers.get("content-type", "")
      assert "application/json" in content_type


class TestSocketIOIntegration:
  """Tests for Socket.IO integration with frontend."""

  @pytest.fixture
  def app(self):
    """Create test app."""
    from app import server
    server.config["TESTING"] = True
    return server

  @pytest.mark.asyncio
  async def test_socketio_server_enabled(self, app):
    """
    Given: A baseweb app with socketio
    When: Checking server attributes
    Then: socketio server should be configured
    """
    assert app.socketio is not None
    assert app._asgi_app is not None

  @pytest.mark.asyncio
  async def test_socketio_asgi_app_structure(self, app):
    """
    Given: A baseweb app
    When: Checking ASGI app
    Then: Should be socketio.ASGIApp wrapping Quart
    """
    import socketio
    assert isinstance(app._asgi_app, socketio.ASGIApp)
    # ASGIApp wraps the socketio server internally
    assert app._sio is not None


class TestComponentRegistration:
  """Tests for Vue component registration."""

  @pytest.fixture
  def app(self):
    """Create test app."""
    from app import server
    server.config["TESTING"] = True
    return server

  @pytest.mark.asyncio
  async def test_registered_components_served(self, app):
    """
    Given: A baseweb-demo app with registered components
    When: Requesting component files
    Then: Files should be served
    """
    async with app.test_app() as test_app:
      client = test_app.test_client()

      # Check index.js component
      response = await client.get("/app/index.js")
      assert response.status_code == 200
      content = await response.get_data()
      assert b"Index" in content  # Component name

  @pytest.mark.asyncio
  async def test_registered_stylesheets_served(self, app):
    """
    Given: A baseweb-demo app with registered stylesheets
    When: Requesting stylesheet
    Then: File should be served
    """
    async with app.test_app() as test_app:
      client = test_app.test_client()

      response = await client.get("/app/style/demo.css")
      assert response.status_code == 200