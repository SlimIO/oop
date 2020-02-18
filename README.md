# Oop
![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/SlimIO/oop/master/package.json&query=$.version&label=version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/SlimIO/oop/commit-activity)
![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)
![dep](https://img.shields.io/david/SlimIO/oop)
![size](https://img.shields.io/github/languages/code-size/SlimIO/oop)
![known vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/SlimIO/oop)
[![Build Status](https://travis-ci.com/SlimIO/oop.svg?branch=master)](https://travis-ci.com/SlimIO/oop)
[![Greenkeeper badge](https://badges.greenkeeper.io/SlimIO/oop.svg)](https://greenkeeper.io/)

JavaScript OOP library crafted to help crafting code with an autognosis and protocol-based design.

## Requirements
- [Node.js](https://nodejs.org/en/) v12 or higher

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @slimio/oop
# or
$ yarn add @slimio/oop
```


## Usage example
TBC

## API

```ts
declare namespace oop {
    export function toNumber(value: bigint): bigint;
    export function toNumber(value: any): number;
    export function toString(value: any): string;
    export function toSymString(value: symbol): symbol;
    export function toSymString(value: any): string;
    export function toBigInt(value: any): bigint;
    export function toIterable(value: Iterable<any>): Iterable<any>
    export function toIterable(value: Array<any> | ArrayLike<any>): Array<any>;
    export function toPlainObject(value: Iterable<any> | null | undefined | object, handleNullAndUndefined?: boolean): object;
    export function toNullableString(value: any): string;
    export function toNullableString(value: null | undefined): null;
    export function toNullableNumber(value: bigint): bigint;
    export function toNullableNumber(value: null | undefined): null;
    export function toNullableNumber(value: any): number;
    export function toNullableBoolean(value: any): boolean;
    export function toNullableBoolean(value: null | undefined): null;

    export namespace utils {
        export function toNullable(predicate: (value: any) => any): Function;
    }
}

export = oop;
export as namespace oop;
```

## Dependencies
This project have no dependencies.

## License
MIT
