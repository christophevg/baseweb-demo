import os

import oatk.js
from baseweb import Resource
from oatk import AsyncOAuthToolkit
from quart import Response

from ... import server

# register the Vue component for the UI
server.register_component("protected_page.js", os.path.dirname(__file__), route="/protected_page")

# expose discovery url and client_id settings loaded from from env
server.settings["oauth"] = {
  "provider" : os.environ.get("OAUTH_PROVIDER"),
  "client_id": os.environ.get("OAUTH_CLIENT_ID")
}

# route for oatk.js from the oatk package
@server.route("/oatk.js")
async def oatk_script():
  return Response(oatk.js.as_src(), mimetype="application/javascript")

# and have it included in the HTML
server.register_external_script("/oatk.js")

# create an oauth protected API endpoint (optional - requires OAUTH_PROVIDER and OAUTH_CLIENT_ID)
oauth_provider = os.environ.get("OAUTH_PROVIDER")
oauth_client_id = os.environ.get("OAUTH_CLIENT_ID")

# Create oauth toolkit at module level (configured during startup)
oauth = AsyncOAuthToolkit()


async def init_oauth():
  """Initialize OAuth toolkit during app startup."""
  if oauth_provider and oauth_client_id:
    oauth.with_client_id(oauth_client_id)
    await oauth.using_provider(oauth_provider)


class HelloWorld(Resource):
  @oauth.authenticated
  async def get(self):
    return {"message": "hello protected world"}


if oauth_provider and oauth_client_id:
  server.add_resource(HelloWorld, "/api/protected/hello")
else:
  # OAuth not configured - create a placeholder resource
  class HelloWorldPlaceholder(Resource):
    async def get(self):
      return {
        "message": "OAuth not configured",
        "hint": "Set OAUTH_PROVIDER and OAUTH_CLIENT_ID environment variables"
      }

  server.add_resource(HelloWorldPlaceholder, "/api/protected/hello")


# Register startup hook to initialize OAuth
@server.before_serving
async def setup_oauth():
  await init_oauth()