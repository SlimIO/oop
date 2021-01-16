"use strict";

/**
 * @namespace utils
 */

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
    if (Object.prototype.toString.call(value) !== "[object Object]") {
        return false;
    }
    const prototype = Reflect.getPrototypeOf(value);

    return prototype === null || prototype === Reflect.getPrototypeOf({});
}

/**
 * @function isValueIterable
 * @description check if a given value is iterable
 * @param {!any} value any value
 * @returns {boolean}
 */
function isValueIterable(value) {
    if (value === null) {
        return false;
    }
    const objValue = Object(value);

    return Symbol.iterator in objValue || Symbol.asyncIterator in objValue;
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

/**
 * @function getObjectType
 * @memberof utils#
 * @description Known the name of a given JavaScript Object
 * @param {*} value any Object value
 * @returns {string | null}
 *
 * @example
 * getObjectType({}); // object
 * getObjectType(new Map()); // map
 * getObjectType(new Set()); // set
 */
function getObjectType(value) {
    // Object.prototype.toString.call will return object like [object Map], [object Set] etc
    // Slice from index 8 to value.length - 1
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

module.exports = {
    canItBePrimitive,
    isPlainObject,
    isValueIterable,
    toNullable,
    getObjectType
};
