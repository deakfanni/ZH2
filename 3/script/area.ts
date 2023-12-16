function toPosNum(input: string): number {
    if (input === "") {
        return NaN
    }
    const converted = +input
    return converted >= 0? converted: NaN
}

function calcArea1(): void {
    const base = toPosNum((document.getElementById("base") as HTMLInputElement).value)
    const height = toPosNum((document.getElementById("height") as HTMLInputElement).value)

    if (Number.isNaN(base) || Number.isNaN(height)) {
        alert("Hibás vagy hiányzó adatok!")
        return
    }
    document.getElementById("area")!.innerText = `${(base * height).toFixed(2)}`
}

function calcArea2(): void {
    const side1 = toPosNum((document.getElementById("side-1") as HTMLInputElement).value)
    const side2 = toPosNum((document.getElementById("side-2") as HTMLInputElement).value)
    const angle = toPosNum((document.getElementById("angle") as HTMLInputElement).value)

    if (Number.isNaN(side1) || Number.isNaN(side2) || Number.isNaN(angle)) {
        alert("Hibás vagy hiányzó adatok!")
        return
    }
    if (angle > 180) {
        alert("A megadott szögértéknek a [0, 180] intervallumba kell esnie!");
        return;
    }
    document.getElementById("area")!.innerText = `${(side1 * side2 * Math.sin(angle / 180 * Math.PI)).toFixed(2)}`
}

function calcArea(): void {
    const method = (document.querySelector("input[name='method']:checked") as HTMLInputElement).value
    switch (method) {
        case "method-1": calcArea1(); break;
        case "method-2": calcArea2(); break;
    }
}

function changeDisabled1(value: boolean): void {
    const base = document.getElementById("base") as HTMLInputElement
    const height = document.getElementById("height") as HTMLInputElement
    base.disabled = value
    height.disabled = value

    const card = document.getElementById("card-method-1")!
    if (value) {
        card.classList.add("card-disabled")
    } else {
        card.classList.remove("card-disabled")
    }
}

function changeDisabled2(value: boolean): void {
    const side1 = document.getElementById("side-1") as HTMLInputElement
    const side2 = document.getElementById("side-2") as HTMLInputElement
    const angle = document.getElementById("angle") as HTMLInputElement
    side1.disabled = value
    side2.disabled = value
    angle.disabled = value

    const card = document.getElementById("card-method-2")!
    if (value) {
        card.classList.add("card-disabled")
    } else {
        card.classList.remove("card-disabled")
    }
}

function onMethodChanged(): void {
    const method1 = document.getElementById("method-1") as HTMLInputElement
    if (method1.checked) {
        changeDisabled1(false)
        changeDisabled2(true)
    } else {
        changeDisabled1(true)
        changeDisabled2(false)
    }
}