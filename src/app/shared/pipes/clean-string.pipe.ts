import { Pipe, PipeTransform } from '@angular/core';
import { ISafeAny } from '@sharedModule/models/ISafeAny';

@Pipe({
  name: 'cleanString',
})
export class CleanStringPipe implements PipeTransform {
  transform(value: string, args?: ISafeAny): unknown {
    if (args) {
      return value?.replace(args, ' ');
    }
    return value?.replace(/(\r?\n|\r)/gm, ' ');
  }
}
