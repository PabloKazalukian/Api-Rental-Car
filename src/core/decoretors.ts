// core/decorators.ts

import { container } from "./cotainer";

export function Controller(token?: string) {
    return function <T extends { new(...args: any[]): {} }>(target: T) {
        const key = token || target.name;
        container.register(key, target);
    };
}
