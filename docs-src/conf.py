"""Build the local DisasterWorld documentation with Sphinx and Furo."""

project = "DisasterWorld"
author = "DisasterWorld"
extensions = ["myst_parser", "sphinx_copybutton"]
source_suffix = {".md": "markdown"}
root_doc = "index"
exclude_patterns = ["licenses/**", "stylesheets/**", "_templates/**"]
myst_heading_anchors = 3

html_theme = "furo"
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
        "color-sidebar-background": "#f5f7f9",
        "color-background-secondary": "#f5f7f9",
        "font-stack": 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        "font-stack--headings": 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    "dark_css_variables": {
        "color-brand-primary": "#91c1d8",
        "color-brand-content": "#91c1d8",
        "color-sidebar-background": "#18212b",
        "color-background-secondary": "#1c2631",
    },
}
