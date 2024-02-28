import os

# register the Vue component for the UI

from baseweb.interface import register_component

register_component("LineChart.js", os.path.dirname(__file__))
