import { EntityTarget, Repository } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ConfigServer } from "./config";

export class BaseService<T extends BaseEntity> extends ConfigServer {
    private repository: Repository<T> | null = null;

    constructor(private getEntity: EntityTarget<T>) {
        super();
    }

    protected async execRepository(): Promise<Repository<T>> {
        if (!this.repository) {
            const conn = await this.initConnect;
            this.repository = conn.getRepository(this.getEntity);
        }
        return this.repository;
    }
}
