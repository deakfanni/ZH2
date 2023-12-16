export function toPosNum(input: string): number {
    if (input === "") {
        return NaN
    }
    const converted = +input
    return converted >= 0? converted: NaN
}