import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import { take } from "rxjs/operators";
import { Subscription } from "rxjs";
import { MetricsService } from "./_core/services/global/metrics.service";
import { ModalService } from "./_core/services/global/modal.service";
import { ContentHostDirective } from "./_core/directives/content-host.directive";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {

  constructor(
    private metricsService: MetricsService,
    private modalService: ModalService,
  ) {}

  @ViewChild(ContentHostDirective) contentHost: ContentHostDirective;

  subscription: Subscription = new Subscription();

  ngAfterViewInit() {
    console.log(this.contentHost);
    this.modalService.registerModalPlaceholdersContainerRef(this.contentHost.viewContainerRef);

    this.subscription.add(
      this.metricsService.loadLevels().pipe(take(1)).subscribe()
    );
  }

  title = 'radar';

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
