import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RenameDialogData } from './rename-dialong-data';

@Component({
  selector: 'app-rename-dialog',
  templateUrl: './rename-dialog.component.html',
  styleUrls: ['./rename-dialog.component.css']
})
export class RenameDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RenameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RenameDialogData) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
