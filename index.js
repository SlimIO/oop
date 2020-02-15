/* eslint-disable no-extra-boolean-cast */
"use strict";

/**
 * @function canItBePrimitive
 * @param {*} object
 * @returns {boolean}
 */
function canItBePrimitive(object) {
    if (object instanceof RegExp || object instanceof Error) {
        return true;
    }

    return Reflect.has(object, Symbol.toPrimitive);
}

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

    const expectedNumberValue = Number(value);
    if (Number.isNaN(expectedNumberValue)) {
        throw new TypeError("value must be a valid Number representation");
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
 * @param {boolean} [options.returnSymbol=false] dont handle symbol primitive
 * @returns {string}
 *
 * @throws {TypeError}
 */
function toString(value, options = Object.create(null)) {
    const type = typeof value;
    if (type === "symbol") {
        return Boolean(options.returnSymbol) ? value : value.description;
    }
    if (type === "object" && !canItBePrimitive(value)) {
        throw new TypeError("value must be a valid string representation");
    }

    return String(value);
}

/**
 * @function toBoolean
 * @param {!any} value
 * @param {boolean} [defaultValue=null]
 * @returns {boolean}
 */
function toBoolean(value, defaultValue = null) {
    if (defaultValue !== null && (typeof value === "undefined" || value === null)) {
        return Boolean(defaultValue);
    }

    return Boolean(value);
}

/**
 * @function toNullableString
 * @param {!any} value
 * @returns {string|null}
 */
function toNullableString(value) {
    if (typeof value === "undefined" || value === null) {
        return null;
    }

    return toString(value);
}
