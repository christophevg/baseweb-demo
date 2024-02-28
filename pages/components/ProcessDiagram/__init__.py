import os

# register the Vue component for the UI

from baseweb.interface import register_component

register_component("ProcessDiagramDemoBody.js", os.path.dirname(__file__))
register_component("ProcessDiagram.js", os.path.dirname(__file__))
