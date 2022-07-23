import ValidatorFieldsInterface, {
  FieldErrors,
} from '#core/@shared/validators/validator-fields-interface';
import { validateSync } from 'class-validator';

export default abstract class ClassValidatorFields<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated>
{
  errors: FieldErrors = null;
  validatedDate: PropsValidated = null;

  validate(data: any): boolean {
    const errors = validateSync(data);
    if (errors.length) {
      this.errors = {};
      for (const error of errors) {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints);
      }
    } else {
      this.validatedDate = data;
    }
    return !errors.length;
  }
}
