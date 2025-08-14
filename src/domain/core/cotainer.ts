// core/container.ts
import "reflect-metadata";

type Class<T = any> = { new(...args: any[]): T };

export class Container {
    private registrations = new Map<string, Class>();
    private singletons = new Map<string, any>();

    register(token: string, clazz: Class) {
        this.registrations.set(token, clazz);
    }

    resolve<T>(token: string): T {
        const clazz = this.registrations.get(token);
        if (!clazz) throw new Error(`No registration for ${token}`);

        // Resolución recursiva de dependencias según metadata
        const paramTypes: Class[] = Reflect.getMetadata("design:paramtypes", clazz) || [];
        const params = paramTypes.map(paramType => this.resolve(paramType.name));

        return new clazz(...params);
    }
}

export const container = new Container();
