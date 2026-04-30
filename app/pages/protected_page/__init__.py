import os

import oatk.js
from baseweb import Resource
from oatk import OAuthToolkit
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

if oauth_provider and oauth_client_id:
  oauth = OAuthToolkit()
  oauth.using_provider(oauth_provider)
  oauth.with_client_id(oauth_client_id)

  class HelloWorld(Resource):
    @oauth.authenticated
    async def get(self):
      return {
        "message": "hello protected world"
      }

  server.add_resource(HelloWorld, "/api/protected/hello")
else:
  # OAuth not configured - create a placeholder resource
  class HelloWorld(Resource):
    async def get(self):
      return {
        "message": "OAuth not configured",
        "hint": "Set OAUTH_PROVIDER and OAUTH_CLIENT_ID environment variables"
      }

  server.add_resource(HelloWorld, "/api/protected/hello")
