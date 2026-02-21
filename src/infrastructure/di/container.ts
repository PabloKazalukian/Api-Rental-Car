// export class Container {
//     private static instances: Map<string, any> = new Map();
//     private static factories: Map<string, () => any> = new Map();

//     // Registrar una implementación concreta para una interfaz
//     static register<T>(interfaceName: string, implementation: new (...args: any[]) => T) {
//         this.factories.set(interfaceName, () => new implementation());
//     }

//     // Registrar un singleton
//     static registerSingleton<T>(interfaceName: string, implementation: new (...args: any[]) => T) {
//         this.factories.set(interfaceName, () => {
//             if (!this.instances.has(interfaceName)) {
//                 this.instances.set(interfaceName, new implementation());
//             }
//             return this.instances.get(interfaceName);
//         });
//     }

//     // Obtener una instancia
//     static resolve<T>(interfaceName: string): T {
//         const factory = this.factories.get(interfaceName);
//         if (!factory) {
//             throw new Error(`No registration for interface: ${interfaceName}`);
//         }
//         return factory();
//     }

//     // Para tests: permitir reemplazar implementaciones
//     static registerMock<T>(interfaceName: string, mockInstance: T) {
//         this.instances.set(interfaceName, mockInstance);
//         this.factories.set(interfaceName, () => mockInstance);
//     }

//     // Reset para tests
//     static clear() {
//         this.instances.clear();
//         this.factories.clear();
//     }
// }

// infrastructure/di/container.ts
export class Container {
    private static instances: Map<string, any> = new Map();
    // Cambiamos el tipo para aceptar tanto clases como factories
    private static factories: Map<string, () => any> = new Map();

    // Para registrar clases (con new)
    static register<T>(interfaceName: string, implementation: new (...args: any[]) => T) {
        this.factories.set(interfaceName, () => new implementation());
    }

    // NUEVO: Para registrar factories (funciones que devuelven la instancia)
    static registerFactory<T>(interfaceName: string, factory: () => T) {
        this.factories.set(interfaceName, factory);
    }

    // Registrar singleton (con clase)
    static registerSingleton<T>(interfaceName: string, implementation: new (...args: any[]) => T) {
        this.factories.set(interfaceName, () => {
            if (!this.instances.has(interfaceName)) {
                this.instances.set(interfaceName, new implementation());
            }
            return this.instances.get(interfaceName);
        });
    }

    // NUEVO: Registrar singleton factory
    static registerSingletonFactory<T>(interfaceName: string, factory: () => T) {
        this.factories.set(interfaceName, () => {
            if (!this.instances.has(interfaceName)) {
                this.instances.set(interfaceName, factory());
            }
            return this.instances.get(interfaceName);
        });
    }

    // Resolver mantiene la misma firma
    static resolve<T>(interfaceName: string): T {
        const factory = this.factories.get(interfaceName);
        if (!factory) {
            throw new Error(`No registration for interface: ${interfaceName}`);
        }
        return factory();
    }

    // Para tests
    static registerMock<T>(interfaceName: string, mockInstance: T) {
        this.instances.set(interfaceName, mockInstance);
        this.factories.set(interfaceName, () => mockInstance);
    }

    static clear() {
        this.instances.clear();
        this.factories.clear();
    }
}
