import os

# register the Vue component for the UI

from baseweb.interface import register_component

register_component("PageWithStatus.js", os.path.dirname(__file__))
