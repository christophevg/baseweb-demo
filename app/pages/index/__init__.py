import logging
import os

from baseweb import Resource
from quart import request

from ... import server

logger = logging.getLogger(__name__)

# register the Vue component for the UI
server.register_component("index.js", os.path.dirname(__file__))

# TODO: task-3.3 - Re-enable SocketIO handlers after WebSocket migration
# Flask-SocketIO is not compatible with Quart (ASGI)
# WebSocket support will be re-enabled in task-3.3

# log all messages both to logging infrastructure and connected clients

def log(msg):
  logger.info(msg)
  # server.socketio.emit("log", msg)

# set up socketio event handlers to handle events from the UI

# @server.socketio.on("hello")
# @server.authenticated("app.io.hello")
# def on_hello(name):
#   log("received hello from {0} ({1}) via socketio".format(name, request.sid))
#   return "Hello {0} from socketio!".format(name)

# set up a REST resource to handle requests from the UI

class Hello(Resource):
  @server.authenticated("app.hello.get")
  async def get(self):
    """Simple text response - returns plain string."""
    name = request.args["name"]
    log(f"received hello from {name} via rest/get")
    return f"Hello {name} from REST/GET"

  @server.authenticated("app.hello.post")
  async def post(self):
    """JSON response - returns structured data."""
    json_data = await request.get_json()
    name = json_data["name"]
    log(f"received hello from {name} via rest/post")
    return {"message": f"Hello {name} from REST/POST"}

server.add_resource(Hello, "/api/hello")
