import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export class SpecificationsCar {

    @Column({ type: "varchar", length: 80, default: "V10 a 90º atmosférico de 5204 cm³ (5,2 L; 317,6 plg³)" })
    engine!: string;

    @Column({ type: "varchar", length: 80, default: "580 a 640 CV (572 a 631 HP) (427 a 471 kW)" })
    power!: string;

    @Column({ type: "varchar", length: 80, default: "540 a 600 N·m (398 a 443 lb·pie)" })
    torque!: string;

    @Column({ type: "varchar", length: 80, default: "1339 a 1509 kg (2952 a 3327 lb)" })
    weight!: string;

    @Column({ default: "325 km/h (202 mph)" })
    max_speed!: string;

    @Column({ type: "varchar", length: 80, default: "De 0 a 100 km/h (62 mph) en 2,9 segundos (Performante)" })
    acceleration!: string;

    @Column({ type: "varchar", length: 80, default: "12,5 L/100 km (8 km/L; 18,8 mpgAm) (medio)" })
    consumption!: string;
}