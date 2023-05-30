import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalContainer} from "../../../_core/services/global/modal.service";
import {GoalTitlesEnum} from "../../../_core/enums/goal-titles.enum";

@Component({
  selector: 'app-goals-modal',
  templateUrl: './goals-modal.component.html',
  styleUrls: ['./goals-modal.component.scss']
})
export class GoalsModalComponent extends ModalContainer implements OnInit {

  _settings: any = {};

  titles: any = GoalTitlesEnum;
  fields: string[] = Object.keys(this.titles);

  constructor() {
    super();
  }

  @Output() result: EventEmitter<any> = new EventEmitter<any>();

  @Input() settings: any;

  ngOnInit() {
    this.setSettings(this.settings);
  }

  setSettings(settings: any) {
    this._settings = settings;
  }

  cancel() {
    this.result.emit(null);
  }
}
