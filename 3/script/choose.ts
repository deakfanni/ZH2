function randInt(lim: number): number {
    return Math.floor(Math.random() * lim)
}

function randUniqueInts(lim: number, amount: number): number[] {
    if (lim < amount) {
        throw new RangeError(`Nem lehetséges ${amount} különböző egészt választani a [0, ${lim}) intervallumból.`)
    }
    const chosen: Set<number> = new Set<number>()

    while (chosen.size < amount) {
        const int = randInt(lim)
        if (!chosen.has(int)) {
            chosen.add(int)
        }
    }
    return Array.from(chosen.values())
}

function chooseRandomStrings(arr: string[]): string[] {
    try {
        const indices: number[] = randUniqueInts(arr.length, 3)
        return indices.map(item => arr[item])
    } catch(e) {
        throw e
    }
}

const stringIDs: Set<number> = new Set<number>()

function addString(): void {
    const newItem: HTMLDivElement = document.createElement("div")
    newItem.setAttribute("id", `item-${currentStringID}`)
    newItem.setAttribute("style", "margin-top: 0.5rem; display: flex;")

    const newInputProduct: HTMLInputElement = document.createElement("input")
    newInputProduct.setAttribute("type", "text")
    newInputProduct.setAttribute("placeholder", "Tétel neve")
    newInputProduct.setAttribute("style", "width: 100%; min-width: 0; box-sizing: border-box;")

    const newDeleteButton: HTMLButtonElement = document.createElement("button")
    const id: number = currentStringID
    newDeleteButton.innerText = "Törlés"
    newDeleteButton.className = "secondary"
    newDeleteButton.setAttribute("style", "margin-left: 0.5rem")
    newDeleteButton.onclick = () => deleteString(id)

    newItem.appendChild(newInputProduct)
    newItem.appendChild(newDeleteButton)

    document.getElementById("items")?.appendChild(newItem)
    stringIDs.add(currentStringID++)
}

function deleteString(id: number): void {
    if (stringIDs.size >= 4) {
        stringIDs.delete(id)
        document.getElementById(`item-${id}`)?.remove()
    }
}

function getString(id: number): string | undefined {
    const parent = document.getElementById(`item-${id}`)
    const name = parent!.querySelector("input")!.value

    if (name === "") {
        return
    }
    return name
}

function choose(id: number): void {
    const strings = Array.from(stringIDs.values()).map(id => getString(id))
    if (strings.includes(undefined)) {
        alert("Hibás vagy hiányzó adatok!")
        return
    }
    const chosen = chooseRandomStrings(strings as string[])
    const list = document.getElementById("chosen")!

    list.innerHTML = ""
    chosen.forEach(string => {
        const elem = document.createElement("li")
        elem.innerText = string
        list.appendChild(elem)
    })
}

let currentStringID: number = 1