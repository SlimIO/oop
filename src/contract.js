/* eslint-disable func-style */
/* eslint-disable jsdoc/require-jsdoc */
"use strict";

// Require Internal Dependencies
const { getObjectType } = require("./utils");

// CONSTANTS
const kSymContract = Symbol("contract");

class RequireViolation extends Error {}
class EnsureViolation extends Error {}

function yellow(text) {
    return `\x1b[33m${text}\x1b[0m`;
}

function Contract(options = {}) {
    const name = options?.name ?? "anonymous";
    const enabled = options?.enabled ?? Contract.ALL_ENABLED;
    const asynchronous = options?.asynchronous ?? false;
    const maxRetries = options?.maxRetries ?? 3;

    let requirePredicate = null;
    let ensurePredicate = null;
    let rescueHanler = null;

    const local = {
        require(predicate = null) {
            if (getObjectType(predicate) !== "function") {
                throw new TypeError("predicate must be a function");
            }
            requirePredicate = predicate;

            return this;
        },
        ensure(predicate = null) {
            if (getObjectType(predicate) !== "function") {
                throw new TypeError("predicate must be a function");
            }
            ensurePredicate = predicate;

            return this;
        },
        rescue(action = null) {
            if (getObjectType(action) !== "asyncfunction") {
                throw new TypeError("action must be an AsyncFunction");
            }
            rescueHanler = action;

            return this;
        },
        sign() {
            if (!enabled) {
                return (method) => method;
            }

            const checkRequire = (...args) => {
                if (requirePredicate(...args) === false) {
                    throw new RequireViolation(
                        `Contract '${yellow(name)}' violation :: ${yellow(requirePredicate.toString())}`
                    );
                }
            };

            const checkEnsure = (methodResult) => {
                if (ensurePredicate(methodResult) === false) {
                    throw new EnsureViolation(
                        `Contract '${yellow(name)}' violation :: ${yellow(ensurePredicate.toString())}`
                    );
                }
            };

            return function call(method) {
                if (asynchronous) {
                    return async(...args) => {
                        requirePredicate !== null && checkRequire(...args);

                        let methodResult;
                        if (rescueHanler === null) {
                            methodResult = await method(...args);
                        }
                        else {
                            let currentRetries = 0;
                            let retry = true;

                            while (retry) {
                                try {
                                    methodResult = await method(...args);
                                    break;
                                }
                                catch (error) {
                                    // eslint-disable-next-line no-loop-func
                                    await rescueHanler(() => {
                                        retry = !(++currentRetries >= maxRetries);
                                    }, error);
                                }
                            }
                        }

                        ensurePredicate !== null && checkEnsure(methodResult);

                        return methodResult;
                    };
                }

                return (...args) => {
                    requirePredicate !== null && checkRequire(...args);

                    const methodResult = method(...args);
                    ensurePredicate !== null && checkEnsure(methodResult);

                    return methodResult;
                };
            };
        }
    };
    Object.defineProperty(local, kSymContract, { value: true });

    return local;
}

Contract.ALL_ENABLED = true;

module.exports = { Contract };
