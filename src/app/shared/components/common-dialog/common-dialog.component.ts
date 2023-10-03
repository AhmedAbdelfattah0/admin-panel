import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonDialogService } from './common-dialog.service';

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.scss'],
})
export class CommonDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonDialogService: CommonDialogService
  ) {}

  ngOnInit(): void {}
  submit() {
    this.commonDialogService.confirmButtonEvent();
  }
}
