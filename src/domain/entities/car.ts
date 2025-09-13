// domain/entities/car.ts
import { Request } from './request';

export class SpecificationsCar {
    constructor(
        public engine: string,
        public power: string,
        public torque: string,
        public weight: string,
        public maxSpeed: string,
        public acceleration: string,
        public consumption: string
    ) {}
}

export class Car {
    constructor(
        public id: string,
        public image: string,
        public brand: string,
        public model: string,
        public year: number,
        public price: number,
        public specifications: SpecificationsCar,
        public requests: Request[] = []
    ) {}
}
