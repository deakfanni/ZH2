"use strict";
exports.__esModule = true;
exports.toPosNum = void 0;
function toPosNum(input) {
    if (input === "") {
        return NaN;
    }
    var converted = +input;
    return converted >= 0 ? converted : NaN;
}
exports.toPosNum = toPosNum;
