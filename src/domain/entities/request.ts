// domain/entities/request.ts
import { User } from "./user";
import { Payment } from "./payment";
import { Car } from "./car";

export enum StateCar {
    REQUEST = "req",
    CONFIRM = "con",
    CANCEL = "can",
}

export class Request {
    constructor(
        public amount: number,
        public initialDate: Date,
        public finalDate: Date,
        public state: StateCar,
        public user: User,
        public car: Car,
        public payments: Payment[] = []
    ) { }

    // Ejemplo de lógica de dominio
    isActive(): boolean {
        return this.state === StateCar.CONFIRM;
    }

    cancel() {
        if (this.state === StateCar.CONFIRM) {
            throw new Error("No se puede cancelar una solicitud confirmada");
        }
        this.state = StateCar.CANCEL;
    }
}
