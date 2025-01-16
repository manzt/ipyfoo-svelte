import pathlib

import anywidget
import traitlets


class Widget(anywidget.AnyWidget):
    _esm = pathlib.Path(__file__).parent / "static" / "index.js"
    _css = pathlib.Path(__file__).parent / "static" / "index.css"
    value = traitlets.Int(0).tag(sync=True)
