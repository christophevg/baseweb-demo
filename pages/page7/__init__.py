import os

from ... import server

# register the Vue component for the UI
server.register_component("page7.js", os.path.dirname(__file__), route="/page7/<id?>")