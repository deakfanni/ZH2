const productIDs: Set<number> = new Set<number>()

type Product = {
    name: string,
    price: number
}

function toPosNum(input: string): number {
    if (input === "") {
        return NaN
    }
    const converted = +input
    return converted >= 0? converted: NaN
}

function addProduct(): void {
    const newItem: HTMLDivElement = document.createElement("div")
    newItem.setAttribute("id", `item-${currentProductID}`)
    newItem.setAttribute("style", "margin-top: 0.5rem; display: flex;")

    const newInputProduct: HTMLInputElement = document.createElement("input")
    newInputProduct.setAttribute("type", "text")
    newInputProduct.setAttribute("placeholder", "Termék neve")
    newInputProduct.setAttribute("name", "product")
    newInputProduct.setAttribute("style", "width: 100%; min-width: 0; box-sizing: border-box;")

    const newInputPrice: HTMLInputElement = document.createElement("input")
    newInputPrice.setAttribute("type", "text")
    newInputPrice.setAttribute("placeholder", "Termék ára")
    newInputPrice.setAttribute("name", "price")
    newInputPrice.setAttribute("style", "width: 100%; min-width: 0; box-sizing: border-box; margin-left: 0.5rem")

    const newDeleteButton: HTMLButtonElement = document.createElement("button")
    const id: number = currentProductID
    newDeleteButton.innerText = "Törlés"
    newDeleteButton.className = "secondary"
    newDeleteButton.setAttribute("style", "margin-left: 0.5rem")
    newDeleteButton.onclick = () => deleteProduct(id)

    newItem.appendChild(newInputProduct)
    newItem.appendChild(newInputPrice)
    newItem.appendChild(newDeleteButton)

    document.getElementById("items")?.appendChild(newItem)
    productIDs.add(currentProductID++)
}

function deleteProduct(id: number): void {
    if (productIDs.size >= 2) {
        productIDs.delete(id)
        document.getElementById(`item-${id}`)?.remove()
    }
}

function getProduct(id: number): Product | undefined {
    const parent = document.getElementById(`item-${id}`)
    const name = (parent?.querySelector("input[name='product']") as HTMLInputElement).value
    const price = toPosNum((parent?.querySelector("input[name='price']") as HTMLInputElement).value)

    if (name === "" || Number.isNaN(price)) {
        return
    }
    return {name: name, price: price}
}

function calcCheapestProduct(products: Product[]): void {
    const minPrice = Math.min.apply(Math, products.map(item => item.price))
    const cheapestProduct = products.find(item => item.price == minPrice)!.name

    document.getElementById("cheapest-product")!.innerText = cheapestProduct
}

function calcPriceStats(products: Product[]): void {
    const avgPrice = products.reduce((sum, curr) => sum + curr.price, 0) / products.length
    const varPrice = products.reduce((sum, curr) => sum + (curr.price - avgPrice) ** 2, 0) / products.length
    const stdPrice = Math.sqrt(varPrice)
    document.getElementById("price-avg")!.innerText = `${avgPrice.toFixed(2)}`
    document.getElementById("price-std")!.innerText = `${stdPrice.toFixed(2)}`
}

function calculate(): void {
    const products = Array.from(productIDs.values()).map(id => getProduct(id))
    if (products.includes(undefined)) {
        alert("Hibás vagy hiányzó adatok!")
        return
    }
    calcCheapestProduct(products as Product[])
    calcPriceStats(products as Product[])
}

let currentProductID: number = 1