test("1 + 1 = 2", () => {
    expect(add(1,1)).toBe(2);
})

function add(x, y) {
    return x+y;
}