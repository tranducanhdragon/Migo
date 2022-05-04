import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[adHost]',
})
export class InputDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}