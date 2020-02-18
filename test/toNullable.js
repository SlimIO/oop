"use strict";

// Require Internal Dependencies
const oop = require("..");

test("toNullableBoolean(null) must return primitive null", () => {
    const result = oop.toNullableBoolean(null);
    expect(result).toStrictEqual(null);
});

test("toNullableBoolean(void 0) must return primitive null", () => {
    const result = oop.toNullableBoolean(void 0);
    expect(result).toStrictEqual(null);
});

test("toNullableBoolean(true) must return primitive boolean true", () => {
    const result = oop.toNullableBoolean(true);
    expect(typeof result).toStrictEqual("boolean");
    expect(result).toStrictEqual(true);
});

test("utils.toNullable", () => {
    const nullablePredicate = oop.utils.toNullable((value) => 10);
    {
        const result = nullablePredicate(void 0);
        expect(result).toStrictEqual(null);
    }

    const result = nullablePredicate("yo");
    expect(result).toStrictEqual(10);
});
