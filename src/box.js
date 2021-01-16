/* eslint-disable no-param-reassign */
/* eslint-disable jsdoc/require-jsdoc */
"use strict";

// Require Node.js Dependencies
const { inspect } = require("util");

// Require Internal Dependencies
const { getObjectType } = require("./utils");

// CONSTANTS
const kSymBox = Symbol.for("BoxedValue");
const kBoxType = Symbol("boxtype");

// Absolute Null Object
const NilBox = Object.freeze(Object.create(null));

/**
 * @function localCreateBox
 * @param {*} value
 * @param {object} [options]
 * @param {boolean} [options.writable=true] allow to update the Box value later
 * @param {boolean} [options.enumerable=true] allow enumeration of the value property
 * @param {boolean} [options.silent=false] do not throw any error
 * @returns {object}
 */
function localCreateBox(value, options = {}) {
    if (isBox(value)) {
        value = value.value;
    }

    const isNilBox = value === NilBox;
    let type = isNilBox ? "nil" : getObjectType(value);

    // Box properties
    const writable = isNilBox ? true : (options?.writable ?? true);
    const enumerable = isNilBox ? false : (options?.enumerable ?? true);
    const silent = options?.silent ?? false;

    const box = Object.create(null);
    Object.defineProperty(box, inspect.custom, {
        value() {
            const base = this.const ? { type, const: this.const } : { type };

            return type === "nil" || type === "lazy" ? base : { ...base, value };
        }
    });
    Object.defineProperty(box, kSymBox, { value: true });

    function setValue(newValue) {
        if (newValue === NilBox) {
            if (silent) {
                return;
            }
            throw new TypeError("Cannot assign a NilBox to a NilBox!");
        }
        const newValueType = getObjectType(newValue);

        if (type === "nil") {
            Object.defineProperty(box, kBoxType, { value: newValueType });
            type = newValueType;
        }
        else if (newValueType !== type) {
            if (silent) {
                return;
            }
            throw new TypeError(`Cannot assign type '${newValueType}' to type '${type}'`);
        }
        value = newValue;
    }

    if (type === "function") {
        if (!writable) {
            throw new TypeError("Unable to initialize a ConstBox with a Lazy value!");
        }

        type = "lazy";
        Object.defineProperty(box, kBoxType, { value: "lazy", configurable: true });
        Object.defineProperty(box, "value", {
            configurable: true,
            get() {
                const computedValue = value();
                if (computedValue === NilBox) {
                    throw new Error("Unable to transform a LazyBox with a NilBox");
                }

                type = getObjectType(computedValue);
                value = computedValue;
                Object.defineProperty(box, kBoxType, { value: type });
                Object.defineProperty(this, "value", { enumerable, value });

                return computedValue;
            }
        });
    }
    else {
        Object.defineProperty(box, kBoxType, { value: type, configurable: isNilBox });
        Object.defineProperty(box, "value", { enumerable, get: () => value, set: setValue });
    }

    return box;
}

function Box(value) {
    return Object.preventExtensions(localCreateBox(value));
}

function SilentBox(value) {
    return Object.preventExtensions(localCreateBox(value, { silent: true }));
}

function ConstBox(value) {
    if (value === NilBox) {
        throw new TypeError("Unable to initialize a ConstBox with a NilBox");
    }

    const box = localCreateBox(value, { writable: false });
    Object.defineProperty(box, "const", { value: true, enumerable: true });

    return Object.seal(box);
}

function EphemeralBox(value) {
    // a Box who become a ConstBox
    console.log(value);
}

function isBox(value) {
    return Boolean(value[kSymBox]);
}

function getBoxType(boxValue) {
    if (!isBox(boxValue)) {
        throw new TypeError("value must be a Box!");
    }

    return boxValue[kBoxType];
}

module.exports = { NilBox, Box, ConstBox, SilentBox, getBoxType, isBox };
