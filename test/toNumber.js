"use strict";

// Require Internal Dependencies
const oop = require("..");

class NumberLike {
    constructor(value) {
        this.internalRepresentation = value;
    }

    [Symbol.toPrimitive]() {
        return this.internalRepresentation;
    }
}

test("toNumber('10') must return primitive number 10", () => {
    const result = oop.toNumber("10");
    expect(typeof result).toStrictEqual("number");
    expect(result).toStrictEqual(10);
});

test("toNumber(10n) must return primitive bigint 10", () => {
    const result = oop.toNumber(10n);
    expect(typeof result).toStrictEqual("bigint");
    expect(result).toStrictEqual(10n);
});

test("toNumber(new NumberLike(10)) must return primitive number 10", () => {
    const result = oop.toNumber(new NumberLike(10));
    expect(typeof result).toStrictEqual("number");
    expect(result).toStrictEqual(10);
});

test("toNumber('hello') must throw a TypeError", () => {
    expect.assertions(1);

    try {
        oop.toNumber("hello");
    }
    catch (error) {
        expect(error.name).toStrictEqual("TypeError");
    }
});

test("toNullableNumber(null) must return primitive null", () => {
    const result = oop.toNullableNumber(null);
    expect(result).toStrictEqual(null);
});

test("toNullableNumber(void 0) must return primitive null", () => {
    const result = oop.toNullableNumber(void 0);
    expect(result).toStrictEqual(null);
});
