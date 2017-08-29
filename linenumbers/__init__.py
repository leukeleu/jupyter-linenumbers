def _jupyter_server_extension_paths():
    return [{
        "module": "linenumbers"
    }]


# Jupyter Extension points
def _jupyter_nbextension_paths():
    return [dict(
        section="notebook",
        # the path is relative to the `linenumbers` directory
        src="static",
        # directory in the `nbextension/` namespace
        dest="linenumbers",
        # _also_ in the `nbextension/` namespace
        require="linenumbers/linenumbers")]


def load_jupyter_server_extension(nbapp):
    nbapp.log.info("linenumbers module enabled!")
