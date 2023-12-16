function refreshLabel(theme: string): void {
    const themeLabel = document.getElementById("theme-label")
    if (themeLabel === null) {
        return
    }
    if (theme === "light") {
        themeLabel.innerText = "Sötét"
    } else {
        themeLabel.innerText = "Világos"
    }
}

function changeTheme(): void {
    if (localStorage.getItem("theme") === "light") {
        localStorage.setItem("theme", "dark")
    } else {
        localStorage.setItem("theme", "light")
    }
    const theme = localStorage.getItem("theme") || "dark"
    document.documentElement.className = `theme-${theme}`
    refreshLabel(theme)
}

window.addEventListener("load", () => {
    let theme: string = localStorage.getItem("theme") || "dark"
    if (!["light", "dark"].includes(theme)) {
        theme = "dark"
    }
    document.documentElement.className = `theme-${theme}`
    refreshLabel(theme)
})