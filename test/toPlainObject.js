"use strict";

// Require Internal Dependencies
const oop = require("..");

test("toPlainObject(Map) must return a key-value Object", () => {
    const iterable = new Map([
        ["foo", "bar"]
    ]);
    const result = oop.toPlainObject(iterable);
    expect(result).toEqual({ foo: "bar" });
});

test("toPlainObject({ foo: 'bar' }) must return the same object", () => {
    const obj = { foo: "bar" };
    const result = oop.toPlainObject(obj);
    expect(result).toEqual(obj);
});

test("toPlainObject(null, true) must return an empty null-prototype object", () => {
    const result = oop.toPlainObject(null, true);
    expect(Reflect.getPrototypeOf(result)).toStrictEqual(null);
    expect(result).toEqual({});
});

test("toPlainObject(undefined, true) must return an empty null-prototype object", () => {
    const result = oop.toPlainObject(undefined, true);
    expect(Reflect.getPrototypeOf(result)).toStrictEqual(null);
    expect(result).toEqual({});
});

test("toPlainObject(null) must throw a TypeError", () => {
    expect.assertions(1);

    try {
        oop.toPlainObject(null);
    }
    catch (error) {
        expect(error.name).toStrictEqual("TypeError");
    }
});
