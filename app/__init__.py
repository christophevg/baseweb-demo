import logging
import os
from pathlib import Path

from dotenv import find_dotenv, load_dotenv

logger = logging.getLogger(__name__)

# load the environment variables for this setup
load_dotenv(find_dotenv())
load_dotenv(find_dotenv(".env.local"))

# setup logging infrastructure

LOG_LEVEL = os.environ.get("LOG_LEVEL") or "INFO"
FORMAT  = "[%(asctime)s] [%(name)s] [%(process)d] [%(levelname)s] %(message)s"
DATEFMT = "%Y-%m-%d %H:%M:%S %z"

logging.basicConfig(level=LOG_LEVEL, format=FORMAT, datefmt=DATEFMT)
formatter = logging.Formatter(FORMAT, DATEFMT)
logging.getLogger().handlers[0].setFormatter(formatter)

# "silence" lower-level modules
for module in [
  "gunicorn.error",
  "pymongo.serverSelection",
  "engineio.client", "engineio.server", "socketio.client", "socketio.server",
  "urllib3"
]:
  module_logger = logging.getLogger(module)
  module_logger.setLevel(logging.WARN)
  if len(module_logger.handlers) > 0:
    module_logger.handlers[0].setFormatter(formatter)

# all set up, now get our server

# you can simply use the default, shared baseweb server instance
# from baseweb import server

# or create a personal instance
from baseweb import Baseweb

server = Baseweb("baseweb-demo")
server.log_config()

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
