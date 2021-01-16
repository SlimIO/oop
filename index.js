
/* eslint-disable no-extra-boolean-cast */
"use strict";

// Require Internal Dependencies
const { canItBePrimitive, isPlainObject, toNullable, isValueIterable } = require("./src/utils");

const toNullableString = toNullable(toString);
const toNullableNumber = toNullable(toNumber);
const toNullableBoolean = toNullable((value) => Boolean(value));

/**
 * @function toNumber
 * @description convert any JavaScript value to a Number (if not possible it will throw a TypeError);
 * @param {!any} value
 * @returns {number}
 *
 * @throws {TypeError}
 */
function toNumber(value) {
    if (typeof value === "bigint") {
        return value;
    }

    const expectedNumberValue = Number.parseInt(value, 10);
    if (Number.isNaN(expectedNumberValue)) {
        throw new TypeError("value must be a valid number representation");
    }

    return expectedNumberValue;
}

/**
 * @function toBigInt
 * @param {!any} value
 * @returns {bigint}
 */
function toBigInt(value) {
    return typeof value === "bigint" ? value : BigInt(toNumber(value));
}

/**
 * @function toString
 * @param {!any} value
 * @param {object} [options]
 * @param {boolean} [options.allowEmptyString=true]
 * @returns {string}
 *
 * @throws {TypeError}
 */
function toString(value, options) {
    const localOptions = toPlainObject(options, true);
    const allowEmptyString = toNullableBoolean(localOptions.allowEmptyString) ?? true;
    const type = typeof value;

    if (type === "symbol") {
        return value.description;
    }
    if (type === "object" && !canItBePrimitive(value)) {
        throw new TypeError("value must be a valid string representation");
    }

    const resultStr = String(value);
    if (!allowEmptyString && resultStr.trimStart().length === 0) {
        throw new TypeError("value can not be an empty string");
    }

    return resultStr;
}

/**
 * @function toSymString
 * @param {!any} value
 * @returns {string|symbol}
 */
function toSymString(value) {
    if (typeof value === "symbol") {
        return value;
    }

    return toString(value);
}

/**
 * @function toIterable
 * @param {!any} value
 * @returns {IterableIterator<any>}
 */
function toIterable(value) {
    return isValueIterable(value) ? value : Array.from(value);
}

/**
 * @function toPlainObject
 * @param {!any} value
 * @param {boolean} [handleNullAndUndefined=false]
 * @returns {object}
 *
 * @throws {TypeError}
 */
function toPlainObject(value, handleNullAndUndefined = false) {
    if (handleNullAndUndefined && (value === null || typeof value === "undefined")) {
        return Object.create(null);
    }

    if (isValueIterable(value)) {
        return Object.fromEntries(value);
    }

    // Note: this is a bad pattern to handle cross-realm objects!
    if (!isPlainObject(value)) {
        throw new TypeError("value must be an object");
    }

    return value;
}

module.exports = {
    toNumber,
    toBigInt,
    toString,
    toSymString,
    toNullableString,
    toNullableNumber,
    toNullableBoolean,
    toIterable,
    toPlainObject,
    utils: {
        toNullable
    }
};
