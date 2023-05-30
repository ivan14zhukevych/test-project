import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ERROR_MESSAGE,
  WARNING_MESSAGE,
} from 'src/app/_core/constants/constants';
import { AlertType } from 'src/app/_core/enums/alert-type.enum';
import { AlertService } from '../../../../_core/services/global/alert.service';

@Component({
  selector: 'app-modal-create-row',
  templateUrl: './modal-create-row.component.html',
  styleUrls: ['./modal-create-row.component.scss'],
})
export class ModalCreateRowComponent implements OnInit {
  isLoading: boolean = false;

  constructor(
    public alertService: AlertService,
    public dialogRef: MatDialogRef<ModalCreateRowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onSave() {
    this.data.row.id = 0;
    const createdRowKeys = Object.keys(this.data.row);
    const existedRowKeys = Object.keys(this.data.dataArray[0]);
    this.checkPermissionToSave(createdRowKeys, existedRowKeys);
  }

  checkPermissionToSave(
    createdRowKeys: string[],
    existedRowKeys: string[]
  ): void {
    if (createdRowKeys.length === existedRowKeys.length) {
      this.checkIfCorrectPriority();
    } else {
      this.alertService.showAlert({
        message: WARNING_MESSAGE.createTableElement,
        type: AlertType.Warning,
      });
    }
  }

  checkIfCorrectPriority(): void {
    const existedPriorities = this.data.dataArray.map(
      (row: any) => row.priority
    );
    const isCreatedPriorityExist = existedPriorities.includes(
      this.data.row.priority
    );
    if (this.data.row.priority < 1 || isCreatedPriorityExist) {
      this.alertService.showAlert({
        message: ERROR_MESSAGE.priorityTableElement,
        type: AlertType.Error,
      });
    } else {
      this.dialogRef.close(this.data.row);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
