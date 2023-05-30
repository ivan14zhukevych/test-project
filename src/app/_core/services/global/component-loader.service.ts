import { Injectable, ComponentFactoryResolver, ViewContainerRef, Type, ComponentRef } from '@angular/core';

@Injectable()
export class ComponentLoaderService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  loadComponent(hostViewContainerRef: ViewContainerRef, component: any, data: any): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

    if (!componentFactory) {
      throw new Error('Component factory is not resolved.');
    }

    const componentRef = hostViewContainerRef.createComponent(componentFactory);

    for (const prop in data) {
      if (data.hasOwnProperty(prop)) {
        (<any>componentRef.instance)[prop] = data[prop];
      }
    }
  }

  loadTypeComponent<T>(hostViewContainerRef: ViewContainerRef, component: Type<T>, data: any): ComponentRef<T> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory<T>(component);

    if (!componentFactory) {
      throw new Error('Component factory is not resolved.');
    }

    const componentRef = hostViewContainerRef.createComponent<T>(componentFactory);

    for (const prop in data) {
      if (data.hasOwnProperty(prop)) {
        (<any>componentRef.instance)[prop] = data[prop];
      }
    }

    return componentRef;
  }
}
