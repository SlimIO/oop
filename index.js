/* eslint-disable no-extra-boolean-cast */
"use strict";

// Require Internal Dependencies
const { canItBePrimitive, isPlainObject, toNullable, isValueIterable } = require("./src/utils");

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
 * @param {!any} params
 * @returns {string}
 *
 * @throws {TypeError}
 */
function toString(value, params) {
    const type = typeof value;
    if (type === "symbol") {
        return value.description;
    }
    if (type === "object" && !canItBePrimitive(value)) {
        throw new TypeError("value must be a valid string representation");
    }
    if (type === "string" && !params.allowEmptyString && !value.length) {
        throw new TypeError("Empty strings are forbidden");
    }

    return String(value);
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
    toNullableString: toNullable(toString),
    toNullableNumber: toNullable(toNumber),
    toNullableBoolean: toNullable((value) => Boolean(value)),
    toIterable,
    toPlainObject,
    utils: {
        toNullable
    }
};
