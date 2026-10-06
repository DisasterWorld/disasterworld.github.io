"""Build the local DisasterWorld documentation with Sphinx and Furo."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

project = "DisasterWorld"
author = "DisasterWorld"
extensions = ["myst_parser", "sphinx_copybutton"]
source_suffix = {".md": "markdown"}
root_doc = "index"
exclude_patterns = ["licenses/**", "stylesheets/**", "_templates/**"]
myst_heading_anchors = 3

html_theme = "furo"
pygments_style = "_pygments.DisasterWorldLight"
pygments_dark_style = "_pygments.DisasterWorldDark"
html_title = "DisasterWorld Documentation"
html_baseurl = "https://disasterworld.github.io/docs/"
templates_path = ["_templates"]
html_static_path = ["stylesheets", "licenses"]
html_css_files = ["extra.css"]
html_copy_source = False
html_show_sourcelink = False
html_show_copyright = False
html_theme_options = {
    "source_repository": "https://github.com/DisasterWorld/disasterworld.github.io/",
    "source_branch": "main",
    "source_directory": "docs-src/",
    "light_css_variables": {
        "color-brand-primary": "#32617b",
        "color-brand-content": "#32617b",
        "color-brand-visited": "#32617b",
        "color-admonition-title": "#32617b",
        "color-admonition-title-background": "rgba(50, 97, 123, .12)",
        "color-topic-title": "#32617b",
        "color-topic-title-background": "rgba(50, 97, 123, .12)",
        "color-foreground-primary": "#202c36",
        "color-foreground-secondary": "#556371",
        "color-foreground-muted": "#556371",
        "color-background-primary": "#ffffff",
        "color-sidebar-background": "#f7f9fa",
        "color-background-secondary": "#f7f9fa",
        "color-background-hover": "#e9f0f5",
        "color-background-hover--transparent": "#e9f0f500",
        "color-background-border": "#dfe5e9",
        "font-stack": 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        "font-stack--headings": 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    "dark_css_variables": {
        "color-brand-primary": "#91c1d8",
        "color-brand-content": "#91c1d8",
        "color-brand-visited": "#91c1d8",
        "color-admonition-title": "#91c1d8",
        "color-admonition-title-background": "rgba(145, 193, 216, .14)",
        "color-topic-title": "#91c1d8",
        "color-topic-title-background": "rgba(145, 193, 216, .14)",
        "color-background-primary": "#16232c",
        "color-sidebar-background": "#18212b",
        "color-background-secondary": "#1c2631",
        "color-background-hover": "#263b4a",
        "color-background-hover--transparent": "#263b4a00",
        "color-background-border": "#344b5a",
    },
}
