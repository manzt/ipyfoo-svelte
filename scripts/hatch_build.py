"""A Hatchling plugin to build the widget frontend."""

import os
import pathlib
import subprocess

from hatchling.builders.hooks.plugin.interface import BuildHookInterface

ROOT = pathlib.Path(__file__).parent / ".."


class BuildHook(BuildHookInterface):
    """Hatchling plugin to build the quak frontend."""

    PLUGIN_NAME = "anywidget-svelte"

    def initialize(self, version: str, build_data: dict) -> None:
        """Initialize the plugin."""
        if os.getenv("SKIP_DENO_BUILD", "0") == "1":
            # Skip the build if the environment variable is set
            # Useful in CI/CD pipelines
            return

        if not (ROOT / "src/ipyfoo/static/widget.js").exists():
            subprocess.check_call(["deno", "task", "build"], cwd=ROOT)