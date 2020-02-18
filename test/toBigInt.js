"use strict";

// Require Internal Dependencies
const oop = require("..");

test("toBigInt(10) must return primitive bigint 10", () => {
    const result = oop.toBigInt(10);
    expect(typeof result).toStrictEqual("bigint");
    expect(result).toStrictEqual(10n);
});

test("toBigInt('10') must return primitive bigint 10", () => {
    const result = oop.toBigInt("10");
    expect(typeof result).toStrictEqual("bigint");
    expect(result).toStrictEqual(10n);
});

test("toBigInt(10n) must return primitive bigint 10", () => {
    const result = oop.toBigInt(10n);
    expect(typeof result).toStrictEqual("bigint");
    expect(result).toStrictEqual(10n);
});
