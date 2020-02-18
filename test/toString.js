"use strict";

// Require Internal Dependencies
const oop = require("..");

test("toString(10) must return primitive string '10'", () => {
    const result = oop.toString(10);
    expect(typeof result).toStrictEqual("string");
    expect(result).toStrictEqual("10");
});

test("toString(Symbol('foo')) must return primitive string 'foo'", () => {
    const result = oop.toString(Symbol("foo"));
    expect(typeof result).toStrictEqual("string");
    expect(result).toStrictEqual("foo");
});

test("toString(new Error('foo')) must return primitive string 'Error: foo'", () => {
    const result = oop.toString(new Error("foo"));
    expect(typeof result).toStrictEqual("string");
    expect(result).toStrictEqual("Error: foo");
});

test("toString({}) must throw a TypeError", () => {
    expect.assertions(1);

    try {
        oop.toString({});
    }
    catch (error) {
        expect(error.name).toStrictEqual("TypeError");
    }
});

test("toNullableString(null) must return primitive null", () => {
    const result = oop.toNullableString(null);
    expect(result).toStrictEqual(null);
});

test("toNullableString(void 0) must return primitive null", () => {
    const result = oop.toNullableString(void 0);
    expect(result).toStrictEqual(null);
});

test("toSymString(Symbol('foo')) must return the symbol", () => {
    const localSym = Symbol("foo");
    const result = oop.toSymString(localSym);
    expect(typeof result).toStrictEqual("symbol");
    expect(result).toStrictEqual(localSym);
});

test("toSymString('foo') must return the primitive string 'foo'", () => {
    const result = oop.toSymString("foo");
    expect(typeof result).toStrictEqual("string");
    expect(result).toStrictEqual("foo");
});

