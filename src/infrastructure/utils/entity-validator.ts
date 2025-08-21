import { validate as classValidate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";
import { formatValidationErrors } from "../../shared/validators/error-formatter";

export class EntityValidator<TDomain, TDTO> {
    private dtoClass: new () => TDTO;

    constructor(dtoClass: new () => TDTO) {
        this.dtoClass = dtoClass;
    }

    /**
     * Valida la entidad de dominio.
     * @param entity Entidad de dominio (ej: User)
     * @returns DTO validado
     * @throws Error si falla la validación
     */
    async validate(entity: TDomain): Promise<TDTO> {
        // Convertimos dominio a DTO (mapeo simple de propiedades)
        const dto: TDTO = plainToClass(this.dtoClass, entity);

        // Validamos usando class-validator
        const errors: ValidationError[] = await classValidate(dto as any);

        if (errors.length > 0) {
            const formatted = formatValidationErrors(errors);
            console.log(formatted)
            throw new Error(JSON.stringify(formatted));
        }

        return dto;
    }

}
