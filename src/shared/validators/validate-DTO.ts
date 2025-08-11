import { validate, ValidationError } from "class-validator";
import { formatValidationErrors } from "./error-formatter";

export async function validateDTO(dto: object): Promise<{ isValid: boolean, errors: { property: string, messages: string[] }[] }> {
    const errors: ValidationError[] = await validate(dto);
    if (errors.length > 0) {
        return {
            isValid: false,
            errors: formatValidationErrors(errors)
        };
    }
    return {
        isValid: true,
        errors: []
    };
}
