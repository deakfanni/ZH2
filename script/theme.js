function refreshLabel(theme) {
    var themeLabel = document.getElementById("theme-label");
    if (themeLabel === null) {
        return;
    }
    if (theme === "light") {
        themeLabel.innerText = "Sötét";
    }
    else {
        themeLabel.innerText = "Világos";
    }
}
function changeTheme() {
    if (localStorage.getItem("theme") === "light") {
        localStorage.setItem("theme", "dark");
    }
    else {
        localStorage.setItem("theme", "light");
    }
    var theme = localStorage.getItem("theme") || "dark";
    document.documentElement.className = "theme-".concat(theme);
    refreshLabel(theme);
}
window.addEventListener("load", function () {
    var theme = localStorage.getItem("theme") || "dark";
    if (!["light", "dark"].includes(theme)) {
        theme = "dark";
    }
    document.documentElement.className = "theme-".concat(theme);
    refreshLabel(theme);
});
