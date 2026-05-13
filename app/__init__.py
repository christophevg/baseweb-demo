import logging
import os
from pathlib import Path

from dotenv import find_dotenv, load_dotenv

logger = logging.getLogger(__name__)

# load the environment variables for this setup
load_dotenv(find_dotenv())
load_dotenv(find_dotenv(".env.local"))

# create a baseweb instance
from baseweb import Baseweb
server = Baseweb("baseweb-demo")

def authenticator(scope, request, *args, **kwargs):
  logger.debug(f"👀 scope:{scope} / request:{str(request)} / args:{str(args)} / kwargs:{str(kwargs)}")
  return True

server.authenticator = authenticator

# Socket.IO event handlers (python-socketio with ASGI)
@server.socketio.on("connect")
async def on_connect(sid, environ):
  logger.info(f"connect: {sid}")

@server.socketio.on("disconnect")
async def on_disconnect(sid):
  logger.info(f"disconnect: {sid}")

HERE       = Path(__file__).resolve().parent
COMPONENTS = HERE / "components"

server.register_component("app.js",        HERE)
server.register_component("SourceView.js", COMPONENTS)
server.register_component("logo.js",       COMPONENTS)

server.register_stylesheet("demo.css", HERE / "static")

server.app_static_folder = HERE / "static"

from .pages import index, page1, page2, page3, page4, page5, page6, page7, protected_page
from .pages.components import (
  CollectionView,
  LineChart,
  PageWithBanner,
  PageWithStatus,
  ProcessDiagram,
)

server.log_routes()
logger.info("✅ demo is ready")

# ASGI app entry point (wraps Quart + Socket.IO)
asgi_app = server._asgi_app

server.log_config()
