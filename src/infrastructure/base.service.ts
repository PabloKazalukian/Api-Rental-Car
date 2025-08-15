import { EntityTarget, Repository } from "typeorm";
import { BaseEntity } from "./config/base.entity";
import { ConfigServer } from "./config/config";

export class BaseService<T extends BaseEntity> extends ConfigServer {
    private repository: Repository<T> | null = null;

    constructor(private getEntity: EntityTarget<T>) {
        super();
    }

    protected async execRepository(): Promise<Repository<T>> {
        if (!this.repository) {
            try {
                const conn = await this.initConnect;
                this.repository = conn.getRepository(this.getEntity);
            } catch (error: any) {
                console.error('Repository initialization error:', error);
                throw new Error('Failed to initialize repository');
            }
        }
        return this.repository;
    }
}
