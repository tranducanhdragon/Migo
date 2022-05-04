import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDescription'
})
export class ShortDescriptionPipe implements PipeTransform {

  transform(value?: string, ...args: unknown[]): unknown {
    return value?.substr(0, 10) + '...';
  }

}

@Pipe({
  name: 'mediumDescription'
})
export class MediumDescriptionPipe implements PipeTransform {

  transform(value?: string, ...args: unknown[]): unknown {
    return value?.substr(0, 100) + '...';
  }

}