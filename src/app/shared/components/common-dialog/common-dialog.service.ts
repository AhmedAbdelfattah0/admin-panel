import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonDialogComponent } from './common-dialog.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonDialogService {
  confirmButtonEmitter: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CommonDialogComponent>
  ) {}

  ngOnInit(): void {}

  public open(config: any) {
    this.close();

    return (this.dialogRef = this.dialog.open(CommonDialogComponent, config));
  }

  public close() {
    if (this.dialog) {
      this.dialog.closeAll();
    }
    return Object.keys(this.dialogRef).length ? this.dialogRef.close() : null;
  }

  confirmButtonEvent() {
    debugger
    this.confirmButtonEmitter.next(true);

    this.close();
  }
}
