import os

# register the Vue component for the UI

from baseweb.interface import register_component

register_component("protected_page.js", os.path.dirname(__file__))

# setup OATK infrastructure

import oatk.js
from flask import Response
from baseweb.web import server
from baseweb.interface import register_external_script

# route for oatk.js from the oatk package
@server.route("/oatk.js", methods=["GET"])
def oatk_script():
  return Response(oatk.js.as_src(), mimetype="application/javascript")

register_external_script("/oatk.js")
