import logging
import os
from pathlib import Path

from dotenv import load_dotenv, find_dotenv

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

# adjust other loggers to global level and formatting 
logging.getLogger("gunicorn.error").handlers[0].setFormatter(formatter)
logging.getLogger("gunicorn.error").setLevel(logging.INFO)
logging.getLogger("engineio.client").setLevel(logging.WARN)
logging.getLogger("engineio.server").setLevel(logging.WARN)
logging.getLogger("socketio.client").setLevel(logging.WARN)
logging.getLogger("socketio.server").setLevel(logging.WARN)
logging.getLogger("urllib3").setLevel(logging.WARN)

logging.getLogger().handlers[0].setFormatter(formatter)

# all set up, now get our server

from baseweb import server

def authenticator(scope, request, *args, **kwargs):
  logger.debug("👀 scope:{} / request:{} / args:{} / kwargs:{}".format(
    scope, str(request), str(args), str(kwargs)
  ))
  return True

server.authenticator = authenticator

@server.socketio.on("connect")
def on_connect():
  logger.info("connect: {0}".format(server.request.sid))

@server.socketio.on("disconnect")
def on_disconnect():
  logger.info("disconnect: {0}".format(server.request.sid))

HERE       = Path(__file__).resolve().parent
COMPONENTS = HERE / "components"

server.register_component("app.js",        HERE)
server.register_component("SourceView.js", COMPONENTS)
server.register_component("logo.js",       COMPONENTS)

server.app_static_folder = HERE / "static"

from .pages            import index, page1, page2, page3, page4, page5
from .pages            import protected_page
from .pages.components import PageWithStatus, PageWithBanner, CollectionView
from .pages.components import LineChart, ProcessDiagram

logger.info("✅ demo is ready")
