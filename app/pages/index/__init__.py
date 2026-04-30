import logging
import os

from baseweb import Resource
from quart import request

from ... import server

logger = logging.getLogger(__name__)

# register the Vue component for the UI
server.register_component("index.js", os.path.dirname(__file__))

# log all messages both to logging infrastructure and connected clients
async def log(msg):
  logger.info(msg)
  await server.socketio.emit("log", msg)

# Socket.IO event handlers (python-socketio with ASGI)
@server.socketio.on("hello")
@server.authenticated("app.io.hello")
async def on_hello(sid, name):
  await log(f"received hello from {name} ({sid}) via socketio")
  return f"Hello {name} from socketio!"

# REST resource to handle requests from the UI
class Hello(Resource):
  @server.authenticated("app.hello.get")
  async def get(self):
    """Simple text response - returns plain string."""
    name = request.args["name"]
    await log(f"received hello from {name} via rest/get")
    return f"Hello {name} from REST/GET"

  @server.authenticated("app.hello.post")
  async def post(self):
    """JSON response - returns structured data."""
    json_data = await request.get_json()
    name = json_data["name"]
    await log(f"received hello from {name} via rest/post")
    return {"message": f"Hello {name} from REST/POST"}

server.add_resource(Hello, "/api/hello")
