"""Code highlighting using the project page's blue and neutral colors."""

from pygments.style import Style
from pygments.token import Comment, Error, Keyword, Name, Number, String, Token


class DisasterWorldLight(Style):
    background_color = "#f7f9fa"
    highlight_color = "#e9f0f5"
    styles = {
        Token: "#202c36",
        Comment: "italic #556371",
        Keyword: "bold #32617b",
        Name.Builtin: "#32617b",
        Name.Class: "bold #32617b",
        Name.Function: "#32617b",
        Number: "#32617b",
        String: "#254c62",
        Error: "#b30000",
    }


class DisasterWorldDark(DisasterWorldLight):
    background_color = "#1c2631"
    highlight_color = "#263b4a"
    styles = {
        Token: "#e2edf4",
        Comment: "italic #9caebc",
        Keyword: "bold #91c1d8",
        Name.Builtin: "#91c1d8",
        Name.Class: "bold #91c1d8",
        Name.Function: "#91c1d8",
        Number: "#91c1d8",
        String: "#b7d5e8",
        Error: "#ff7575",
    }
