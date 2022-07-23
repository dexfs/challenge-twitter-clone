export type FieldErrors = {
  [field: string]: string[];
};

export default interface ValidatorFieldsInterface<PropsValidated> {
  errors: FieldErrors;
  validatedDate: PropsValidated;

  validate(data: any): boolean;
}
