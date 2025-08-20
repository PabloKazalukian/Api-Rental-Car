import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../infrastructure/config/base.entity";
import { SpecificationsCar } from "./specifications-car";
import { RequestEntity } from "./request.entity";

@Entity({ name: "car" })
export class CarEntity extends BaseEntity {

    @Column()
    image!: string;

    @Column()
    brand!: string;

    @Column()
    model!: string;

    @Column()
    year!: number;

    @Column()
    price!: number;

    @Column(() => SpecificationsCar)
    specificationsCar!: SpecificationsCar;

    @OneToMany(() => RequestEntity, (request) => request.car_id)
    requests!: RequestEntity[];
}