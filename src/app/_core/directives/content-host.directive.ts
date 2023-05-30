import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[content-host]',
})
export class ContentHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}

  clear(): void {
    if (this.viewContainerRef) {
      this.viewContainerRef.clear();
    }
  }
}
