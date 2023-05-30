import {
  Component,
  ViewChild,
  ViewContainerRef,
  EventEmitter,
  Input,
  Type,
  ComponentRef,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import {ModalContainer} from '../../../_core/services/global/modal.service';
import {ComponentLoaderService} from '../../../_core/services/global/component-loader.service';
import {BehaviorSubject, Subscription} from "rxjs";

@Component({
  selector: 'app-modal-placeholder',
  templateUrl: './modal-placeholder.component.html',
  styleUrls: ['./modal-placeholder.component.scss']
})
export class ModalPlaceholderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('modalplaceholder', {read: ViewContainerRef}) viewContainerRef: any;

  @Input() modalComponentType: Type<any>;
  @Input() modalParameters: any;
  @Input() closableByBackdrop: boolean = true;

  modalComponentRef: BehaviorSubject<ComponentRef<ModalContainer>> = new BehaviorSubject<any>(null);

  public hideEmitter: EventEmitter<any> = new EventEmitter<any>();

  private subscriptions: Subscription[] = [];

  constructor(private componentLoaderService: ComponentLoaderService) {}

  ngAfterViewInit() {
    this.loadComponent();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  loadComponent() {
    this.viewContainerRef.clear();

    const modalComponentRef = this.componentLoaderService.loadTypeComponent<any>(
      this.viewContainerRef,
      this.modalComponentType,
      this.modalParameters
    );

    modalComponentRef.changeDetectorRef.detectChanges();

    modalComponentRef.instance.close.subscribe(() => {
      this.hideEmitter.emit();
    });

    this.modalComponentRef.next(modalComponentRef);
  }

  hide(): void {
    if (!this.closableByBackdrop) {
      return;
    }

    const modalComponentRef = this.modalComponentRef.getValue();

    if (modalComponentRef && modalComponentRef.instance) {
      modalComponentRef.instance.closeModal();
    }
  }
}
