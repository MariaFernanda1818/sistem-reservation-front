import { Pipe, PipeTransform } from '@angular/core';
import { ISafeAny } from '@sharedModule/models/ISafeAny';

// Definición del Pipe personalizado
@Pipe({
  name: 'accesoSeguro', // Nombre del Pipe que se usará en las plantillas HTML
})
export class SafeAccessPipe implements PipeTransform {
  /**
   * Método transform, que implementa PipeTransform
   * @param obj el objeto sobre el que se realizará el acceso seguro
   * @param path la cadena de acceso a la propiedad dentro del objeto
   * @param defaultValue valor por defecto a devolver si la propiedad no existe o es undefined
   * @returns
   */
  transform(obj: ISafeAny, path: string, defaultValue: ISafeAny = ''): ISafeAny {
    // Manejo del caso donde el objeto es null o undefined
    if (!obj) return defaultValue;

    // Dividir la cadena de acceso en un array de claves
    return path.split('.').reduce((acc, key) => {
      // Verificar si la propiedad actual existe en el objeto y tiene un valor definido
      if (acc && typeof acc === 'object' && key in acc && acc[key] !== undefined) {
        return acc[key]; // Acceder a la propiedad
      } else {
        return defaultValue; // Devolver el valor por defecto si no se puede acceder a la propiedad
      }
    }, obj); // Inicializar el acumulador con el objeto original
  }
}
