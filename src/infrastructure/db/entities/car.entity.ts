import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { SpecificationsCar } from "./specifications-car";
import { RequestEntity } from "./request.entity";
import { BaseEntity } from "../../config/base.entity";

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
    @JoinColumn({ name: "user_discount_id" })
    requests!: RequestEntity[];
}