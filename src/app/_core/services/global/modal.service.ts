import { ViewContainerRef, ComponentRef, Type, Injectable, EventEmitter} from '@angular/core';
import { ComponentLoaderService } from './component-loader.service';
import { take } from 'rxjs/operators';
import { ModalPlaceholderComponent } from '../../../_shared/components/modal-placeholder/modal-placeholder.component';

export interface IModalContainer {
  destroy: Function;
  close: EventEmitter<any>;
  closeModal(): void;
}

export class ModalContainer implements IModalContainer {
  close: EventEmitter<any> = new EventEmitter<any>();
  destroy: Function;

  closeModal(): void {
    this.close.emit();
  }
}

@Injectable()
export class ModalService {

  /**
   * Container where all the modal placeholders will be rendering
   */
  private modalPlaceholdersContainerRef: ViewContainerRef;
  public counter: number = 0;
  public hasOpenedModal: boolean = false;

  constructor(
    private componentLoaderService: ComponentLoaderService
  ) {
  }

  registerModalPlaceholdersContainerRef(viewContainerRef: ViewContainerRef): void {
    this.modalPlaceholdersContainerRef = viewContainerRef;
  }

  create<T extends ModalContainer>(
    componentType: Type<T>,
    parameters?: Object,
    closableByBackdrop: boolean = true
  ): Promise<ComponentRef<T>> {
    return new Promise<ComponentRef<T>>((resolve, reject) => {
      const modalPlaceholderParameters = {
        modalComponentType: componentType,
        modalParameters: parameters,
        closableByBackdrop: closableByBackdrop
      };

      const modalPlaceholderRef: ComponentRef<ModalPlaceholderComponent> = this.componentLoaderService
        .loadTypeComponent<ModalPlaceholderComponent>(
          this.modalPlaceholdersContainerRef,
          ModalPlaceholderComponent,
          modalPlaceholderParameters
        );

      this.changeCounter(1);

      modalPlaceholderRef.instance.hideEmitter
        .pipe(take(1))
        .subscribe(() => {
          modalPlaceholderRef.destroy();
          this.changeCounter(-1);
        });

      modalPlaceholderRef.instance.modalComponentRef.subscribe((ref: ComponentRef<any>) => {
        if (ref !== null) {
          resolve(ref);
        }
      });
    });
  }

  changeCounter(value: 1 | -1) {
    const lastValue = this.counter;
    const newValue = lastValue + value;

    if (newValue < 0) {
      throw new Error('Number of modals cannot be negative');
    }

    if (lastValue === 0 && newValue === 1) {
      this.hasOpenedModal = true;
    } else if (lastValue === 1 && newValue === 0) {
      this.hasOpenedModal = false;
    }

    this.counter = newValue;
  }
}
