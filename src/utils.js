"use strict";

/**
 * @namespace utils
 */

// CONSTANTS
const kObjectPrototype = Object.getPrototypeOf({});

/**
 * @function canItBePrimitive
 * @description check whenever a given object can be transformed into a String primitive
 * @memberof utils#
 * @param {!object} object any JavaScript object
 * @returns {boolean}
 */
function canItBePrimitive(object) {
    // Note: RegExp and Error overwrite the default Object.prototype.toString() method
    if (object instanceof RegExp || object instanceof Error) {
        return true;
    }

    return Reflect.has(object, Symbol.toPrimitive);
}

/**
 * @function isPlainObject
 * @description check if a given value is a valid JavaScript plain Object
 * @param {!any} value any value
 * @returns {boolean}
 */
function isPlainObject(value) {
    if (Object.prototype.toString.call(value).slice(8, -1) !== "Object") {
        return false;
    }
    const prototype = Object.getPrototypeOf(value);

    return prototype === null || prototype === kObjectPrototype;
}

/**
 * @function toNullable
 * @param {() => any} predicate
 * @returns {any}
 */
function toNullable(predicate) {
    return (value) => {
        if (typeof value === "undefined" || value === null) {
            return null;
        }

        return predicate(value);
    };
}

module.exports = {
    canItBePrimitive,
    isPlainObject,
    toNullable
};
