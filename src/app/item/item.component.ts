import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RenameDialogComponent } from '../rename-dialog/rename-dialog.component';
import { ToDoItem } from '../to-do-item'
import { ToDoItemService } from '../to-do-item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: ToDoItem;

  @Output() outputDelete = new EventEmitter();
  @Output() outputRename = new EventEmitter();

  constructor(private itemService: ToDoItemService,
    private dialog: MatDialog) { }

  delete(): void {
    this.itemService.deleteItem(this.item.id).subscribe(mutation =>
      this.outputDelete.emit(this.item.id)
    );
  }

  getCreatedDisplay(): string {
    let parsedTime = Date.parse(this.item.created + "z");
    let currentTime = new Date().getTime();

    return currentTime - parsedTime > 60000 ? new Date(this.item.created + "z").toLocaleString() : "less than a minute ago";
  }

  openRenameDialog(): void {
    const dialogRef = this.dialog.open(RenameDialogComponent, {
      data: {name: this.item.name}
    });

    dialogRef.afterClosed().subscribe(rename => {
      this.item.name = rename;
      this.save();
    });
  }

  save(): void {
    this.itemService.updateItem(this.item).subscribe();
  }

  ngOnInit(): void {

  }

}
