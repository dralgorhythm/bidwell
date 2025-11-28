declare module '@strudel/core' {
    export interface Pattern {
        query(start: number, end: number): any[];
    }
    export function evaluate(code: string): any;
}

declare module '@strudel/mini' {
    import { Pattern } from '@strudel/core';
    export function mini(code: string): Pattern;
}
