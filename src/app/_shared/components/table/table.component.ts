import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalCreateRowComponent } from './modal-create-row/modal-create-row.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, AfterViewInit {
  tableDataSource = new MatTableDataSource([]);
  displayedColumns: string[];
  tableColumns: string[];
  editMode: boolean = false;
  isLoading: boolean = false;

  editedRowId!: number;
  editedRow!: any;
  dataArray: any[] = [];
  keysObject!: any;

  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort: MatSort;

  @Input() isCreable = false;
  @Input() isDeletable = false;
  @Input() isEditable = false;

  @Input() isFilterable = false;

  @Input() isPageable: boolean;
  fromIsPageable: boolean;
  @Input() paginationSizes: number[] = [5, 10, 20, 50, 100];
  @Input() defaultPageSize = this.paginationSizes[2];

  @Input() set setKeysObject(data: any) {
    this.keysObject = data;
  }
  @Input() set tableData(data: any[]) {
    // ! Temporary solution
    this.dataArray = data?.filter(
      (item) => item.isActive || this.keysObject.priority
    );
    // this.dataArray = data;
    this.initializeColumns(this.dataArray);
  }
  @Input() tableName: string = '';

  @Output() rowActionSaveCreated: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowActionSaveEdited: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowActionDelete: EventEmitter<any> = new EventEmitter<any>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
    this.initializeColumns(this.dataArray);
  }

  initializeColumns(data: any[]): void {
    if (!data || data.length === 0) {
      this.setTableDataSource(data);
      return;
    }
    let tableColumsData = Object.keys(data[0]).filter(
      (item) => this.keysObject[item]?.key
    );

    this.displayedColumns = tableColumsData;
    this.tableColumns = tableColumsData;

    if (this.isEditable) {
      this.displayedColumns = [...this.displayedColumns, 'edit'];
    }
    if (this.isDeletable) {
      this.displayedColumns = [...this.displayedColumns, 'delete'];
    }
    this.setTableDataSource(data);
  }

  setTableDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource(data);
    this.tableDataSource.sort = this.matSort;
    this.fromIsPageable =
      this.isPageable === undefined
        ? this.dataArray?.length > 5
        : this.isPageable;
    this.tableDataSource.paginator = this.matPaginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
  }

  onCreate() {
    const createdRowObject = {};
    const dialogRef = this.dialog.open(ModalCreateRowComponent, {
      width: '550px',
      data: {
        keysObjectData: this.keysObject,
        rowKeys: Object.keys(this.keysObject),
        row: createdRowObject,
        dataArray: this.dataArray,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.rowActionSaveCreated.emit(result);
      }
    });
  }

  onEdit(row: any) {
    if (this.tableName === 'users-list') {
      this.rowActionSaveEdited.emit(row);
    } else {
      this.editedRow = { ...row };
      this.editedRowId = row.id;
      this.editMode = true;
    }
  }

  onSaveEdited(row: any) {
    this.isLoading = true;
    this.rowActionSaveEdited.emit(row);
    this.editedRowId = -1;
    this.editMode = false;
    this.isLoading = false;
  }

  onCancelEdited() {
    const canceledRowId = this.dataArray.findIndex(
      (item: any) => item.id === this.editedRow.id
    );
    this.dataArray.splice(canceledRowId, 1, this.editedRow);
    this.setTableDataSource(this.dataArray);
    this.editedRowId = -1;
    this.editMode = false;
  }

  onDelete(row: any) {
    if (confirm('Deactivate?')) {
      this.rowActionDelete.emit(row);
    }
  }
}
