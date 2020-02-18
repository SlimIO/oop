"use strict";

// Require Internal Dependencies
const oop = require("..");

test("toIterable(iterable) must return the iterable reference", () => {
    const set = new Set(["foo"]);
    const result = oop.toIterable(set);
    expect(result).toStrictEqual(set);
});

test("toIterable({ 0: 'foo', length: 1 }) must return the iterable reference", () => {
    const result = oop.toIterable({ 0: "foo", length: 1 });
    expect(result).toEqual(["foo"]);
});
