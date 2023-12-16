function randInt(lim) {
    return Math.floor(Math.random() * lim);
}
function randUniqueInts(lim, amount) {
    if (lim < amount) {
        throw new RangeError("Nem lehets\u00E9ges ".concat(amount, " k\u00FCl\u00F6nb\u00F6z\u0151 eg\u00E9szt v\u00E1lasztani a [0, ").concat(lim, ") intervallumb\u00F3l."));
    }
    var chosen = new Set();
    while (chosen.size < amount) {
        var int = randInt(lim);
        if (!chosen.has(int)) {
            chosen.add(int);
        }
    }
    return Array.from(chosen.values());
}
function chooseRandomStrings(arr) {
    try {
        var indices = randUniqueInts(arr.length, 3);
        return indices.map(function (item) { return arr[item]; });
    }
    catch (e) {
        throw e;
    }
}
var stringIDs = new Set();
function addString() {
    var _a;
    var newItem = document.createElement("div");
    newItem.setAttribute("id", "item-".concat(currentStringID));
    newItem.setAttribute("style", "margin-top: 0.5rem; display: flex;");
    var newInputProduct = document.createElement("input");
    newInputProduct.setAttribute("type", "text");
    newInputProduct.setAttribute("placeholder", "Tétel neve");
    newInputProduct.setAttribute("style", "width: 100%; min-width: 0; box-sizing: border-box;");
    var newDeleteButton = document.createElement("button");
    var id = currentStringID;
    newDeleteButton.innerText = "Törlés";
    newDeleteButton.className = "secondary";
    newDeleteButton.setAttribute("style", "margin-left: 0.5rem");
    newDeleteButton.onclick = function () { return deleteString(id); };
    newItem.appendChild(newInputProduct);
    newItem.appendChild(newDeleteButton);
    (_a = document.getElementById("items")) === null || _a === void 0 ? void 0 : _a.appendChild(newItem);
    stringIDs.add(currentStringID++);
}
function deleteString(id) {
    var _a;
    if (stringIDs.size >= 4) {
        stringIDs["delete"](id);
        (_a = document.getElementById("item-".concat(id))) === null || _a === void 0 ? void 0 : _a.remove();
    }
}
function getString(id) {
    var parent = document.getElementById("item-".concat(id));
    var name = parent.querySelector("input").value;
    if (name === "") {
        return;
    }
    return name;
}
function choose(id) {
    var strings = Array.from(stringIDs.values()).map(function (id) { return getString(id); });
    if (strings.includes(undefined)) {
        alert("Hibás vagy hiányzó adatok!");
        return;
    }
    var chosen = chooseRandomStrings(strings);
    var list = document.getElementById("chosen");
    list.innerHTML = "";
    chosen.forEach(function (string) {
        var elem = document.createElement("li");
        elem.innerText = string;
        list.appendChild(elem);
    });
}
var currentStringID = 1;
