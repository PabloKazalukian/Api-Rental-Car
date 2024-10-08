import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { SpecificationsCar } from "./specificationsCar";
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

    @OneToMany(() => RequestEntity, (request) => request.requestedCar)
    requests!: RequestEntity[];

}