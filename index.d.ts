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
