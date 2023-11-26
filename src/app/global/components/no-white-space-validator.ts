import { FormControl, ValidationErrors } from '@angular/forms';

export function noWhitespaceValidator(control: FormControl): ValidationErrors | null {
  const isWhitespace = String(control.value || '').indexOf(' ') !== -1;
  const isValid = !isWhitespace;

  if (control.value === '') {
    return null; // No error for an empty value
  }

  return isValid ? null : { whitespace: true }; // Return 'whitespace' error if the value contains whitespace
}

