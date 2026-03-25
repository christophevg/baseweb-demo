from pathlib import Path
import logging

from baseweb import Baseweb

logger = logging.getLogger(__name__)

server = Baseweb("app")
server.log_config()

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

HERE = Path(__file__).resolve().parent

# register global application javascript and stylesheet
server.register_component("app.js",  HERE)
server.register_stylesheet("style.css", HERE / "static")

# setup the static folder
server.app_static_folder = HERE / "static"

# load all pages, which will register javascript Vue+Vuetify components and
# server-side endpoints
from .pages import index # noqa: F401, E402

# log all registered routes
server.log_routes()

logger.info("✅ app is ready")
