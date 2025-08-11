import { ValidationError } from "class-validator";

export function formatValidationErrors(errors: ValidationError[]) {
    return errors.map(error => ({
        property: error.property,
        messages: Object.values(error.constraints || {})
    }));
}