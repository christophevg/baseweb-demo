"""Tests for baseweb-demo main entry point migration."""

from pathlib import Path


class TestMainEntryPoint:
  """Test the main entry point migration from Flask to Quart."""

  def test_server_can_be_imported(self):
    """Server instance can be imported without errors."""
    from app import server

    assert server is not None
    assert server.name == "baseweb-demo"

  def test_no_flask_imports_in_app_init(self):
    """Verify no Flask imports remain in app/__init__.py."""
    init_file = Path(__file__).parent.parent / "app" / "__init__.py"
    content = init_file.read_text()

    # Check that there are no direct Flask imports
    assert "from flask import" not in content
    assert "import flask" not in content

    # Check that baseweb is imported (which now uses Quart)
    assert "from baseweb import Baseweb" in content

  def test_authenticator_is_set(self):
    """Verify the authenticator is configured."""
    from app import server

    assert server.authenticator is not None
    assert callable(server.authenticator)

  def test_socketio_handlers_enabled(self):
    """Verify SocketIO handlers are enabled with async pattern."""
    init_file = Path(__file__).parent.parent / "app" / "__init__.py"
    content = init_file.read_text()

    # Check that socketio decorators are NOT commented out
    assert '@server.socketio.on("connect")' in content
    assert '@server.socketio.on("disconnect")' in content

    # Verify async handlers
    assert "async def on_connect" in content
    assert "async def on_disconnect" in content
    assert "sid" in content  # sid parameter present
