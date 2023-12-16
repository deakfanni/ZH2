var productIDs = new Set();
function toPosNum(input) {
    if (input === "") {
        return NaN;
    }
    var converted = +input;
    return converted >= 0 ? converted : NaN;
}
function addProduct() {
    var _a;
    var newItem = document.createElement("div");
    newItem.setAttribute("id", "item-".concat(currentProductID));
    newItem.setAttribute("style", "margin-top: 0.5rem; display: flex;");
    var newInputProduct = document.createElement("input");
    newInputProduct.setAttribute("type", "text");
    newInputProduct.setAttribute("placeholder", "Termék neve");
    newInputProduct.setAttribute("name", "product");
    newInputProduct.setAttribute("style", "width: 100%; min-width: 0; box-sizing: border-box;");
    var newInputPrice = document.createElement("input");
    newInputPrice.setAttribute("type", "text");
    newInputPrice.setAttribute("placeholder", "Termék ára");
    newInputPrice.setAttribute("name", "price");
    newInputPrice.setAttribute("style", "width: 100%; min-width: 0; box-sizing: border-box; margin-left: 0.5rem");
    var newDeleteButton = document.createElement("button");
    var id = currentProductID;
    newDeleteButton.innerText = "Törlés";
    newDeleteButton.className = "secondary";
    newDeleteButton.setAttribute("style", "margin-left: 0.5rem");
    newDeleteButton.onclick = function () { return deleteProduct(id); };
    newItem.appendChild(newInputProduct);
    newItem.appendChild(newInputPrice);
    newItem.appendChild(newDeleteButton);
    (_a = document.getElementById("items")) === null || _a === void 0 ? void 0 : _a.appendChild(newItem);
    productIDs.add(currentProductID++);
}
function deleteProduct(id) {
    var _a;
    if (productIDs.size >= 2) {
        productIDs["delete"](id);
        (_a = document.getElementById("item-".concat(id))) === null || _a === void 0 ? void 0 : _a.remove();
    }
}
function getProduct(id) {
    var parent = document.getElementById("item-".concat(id));
    var name = (parent === null || parent === void 0 ? void 0 : parent.querySelector("input[name='product']")).value;
    var price = toPosNum((parent === null || parent === void 0 ? void 0 : parent.querySelector("input[name='price']")).value);
    if (name === "" || Number.isNaN(price)) {
        return;
    }
    return { name: name, price: price };
}
function calcCheapestProduct(products) {
    var minPrice = Math.min.apply(Math, products.map(function (item) { return item.price; }));
    var cheapestProduct = products.find(function (item) { return item.price == minPrice; }).name;
    document.getElementById("cheapest-product").innerText = cheapestProduct;
}
function calcPriceStats(products) {
    var avgPrice = products.reduce(function (sum, curr) { return sum + curr.price; }, 0) / products.length;
    var varPrice = products.reduce(function (sum, curr) { return sum + Math.pow((curr.price - avgPrice), 2); }, 0) / products.length;
    var stdPrice = Math.sqrt(varPrice);
    document.getElementById("price-avg").innerText = "".concat(avgPrice.toFixed(2));
    document.getElementById("price-std").innerText = "".concat(stdPrice.toFixed(2));
}
function calculate() {
    var products = Array.from(productIDs.values()).map(function (id) { return getProduct(id); });
    if (products.includes(undefined)) {
        alert("Hibás vagy hiányzó adatok!");
        return;
    }
    calcCheapestProduct(products);
    calcPriceStats(products);
}
var currentProductID = 1;
