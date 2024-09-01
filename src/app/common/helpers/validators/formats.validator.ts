import { AbstractControl } from '@angular/forms';

export function numberValidator({ value }: AbstractControl) {
  if (value && isNaN(+value)) {
    return { isNaN: true };
  }
  return null;
}

export function emailValidator({ value }: AbstractControl) {
  const emailUnicode =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  return !emailUnicode.test(value) ? { email: true } : null;
}

export function onlyNumbers({ value }: AbstractControl) {
  return !/^\d*$/.test(value) ? { onlyNumbers: true } : null;
}

export function onlyLetters({ value }: AbstractControl) {
  return !/^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$/.test(value) ? { onlyLetters: true } : null;
}

export function alphanumeric({ value }: AbstractControl) {
  return !/^[a-zA-Z0-9-]+$/.test(value) ? { alphanumeric: true } : null;
}
