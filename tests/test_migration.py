"""Tests for Flask to Quart migration."""
import inspect
from pathlib import Path

import pytest


class TestMigration:
  """Tests for Flask to Quart migration."""

  def test_app_imports_successfully(self):
    """Test that the app imports without errors."""
    try:
      from app import server
      assert server is not None
      assert server.name == "baseweb-demo"
    except ImportError as e:
      pytest.fail(f"Failed to import app: {e}")

  def test_index_page_uses_quart(self):
    """Test that index page uses Quart instead of Flask."""
    from app.pages.index import Hello

    # Check that Hello resource has async methods
    assert inspect.iscoroutinefunction(Hello.get)
    assert inspect.iscoroutinefunction(Hello.post)

  def test_protected_page_uses_quart(self):
    """Test that protected_page uses Quart instead of Flask."""
    from app.pages.protected_page import HelloWorld

    # Check that HelloWorld resource has async methods
    assert inspect.iscoroutinefunction(HelloWorld.get)

  def test_collection_view_uses_quart(self):
    """Test that CollectionView uses Quart instead of Flask."""
    from app.pages.components.CollectionView import Collection

    # Check that Collection resource has async methods
    assert inspect.iscoroutinefunction(Collection.get)
    assert inspect.iscoroutinefunction(Collection.post)
    assert inspect.iscoroutinefunction(Collection.delete)

  def test_index_imports_quart_request(self):
    """Test that index page imports from Quart, not Flask."""
    # Check source file for imports
    index_file = Path(__file__).parent.parent / "app" / "pages" / "index" / "__init__.py"
    content = index_file.read_text()

    assert "from quart import request" in content
    assert "from flask import" not in content

  def test_protected_page_imports_quart_response(self):
    """Test that protected_page imports from Quart, not Flask."""
    # Check source file for imports
    protected_file = Path(__file__).parent.parent / "app" / "pages" / "protected_page" / "__init__.py"
    content = protected_file.read_text()

    assert "from quart import Response" in content
    assert "from flask import" not in content

  def test_collection_view_imports_quart(self):
    """Test that CollectionView imports from Quart, not Flask."""
    # Check source file for imports
    collection_file = Path(__file__).parent.parent / "app" / "pages" / "components" / "CollectionView" / "__init__.py"
    content = collection_file.read_text()

    assert "from quart import" in content
    assert "from flask import" not in content

  def test_resources_import_from_baseweb(self):
    """Test that Resource classes import from baseweb, not flask_restful."""
    # Check source files for imports
    index_file = Path(__file__).parent.parent / "app" / "pages" / "index" / "__init__.py"
    protected_file = Path(__file__).parent.parent / "app" / "pages" / "protected_page" / "__init__.py"
    collection_file = Path(__file__).parent.parent / "app" / "pages" / "components" / "CollectionView" / "__init__.py"

    for file in [index_file, protected_file, collection_file]:
      content = file.read_text()
      assert "flask_restful" not in content, f"flask_restful found in {file}"

  def test_socketio_handlers_commented_out(self):
    """Test that SocketIO handlers are commented out in index page."""
    # Check source file for commented handlers
    index_file = Path(__file__).parent.parent / "app" / "pages" / "index" / "__init__.py"
    content = index_file.read_text()

    # SocketIO handlers should be commented out
    assert "# @server.socketio.on" in content, "SocketIO handlers should be commented out"
    assert "# server.socketio.emit" in content or "server.socketio.emit" not in content, "SocketIO emit should be commented out or removed"
