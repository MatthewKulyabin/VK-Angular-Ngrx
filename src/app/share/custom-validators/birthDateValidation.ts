import { AbstractControl, ValidationErrors } from '@angular/forms';

export const birthDateValidation = (
  control: AbstractControl
): ValidationErrors | null => {
  if (!control.value) {
    return { required: true };
  }
  const birthDate = new Date(control.value);
  const age = calculateAge(birthDate);

  return isNaN(birthDate.getTime()) || age < 14
    ? { invalidBirthDate: true }
    : null;
};

const calculateAge = (birthDate: Date): number => {
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
