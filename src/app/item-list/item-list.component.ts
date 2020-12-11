import { Component, OnInit } from '@angular/core';
import { ToDoItem } from '../to-do-item';
import { ToDoItemService } from '../to-do-item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  constructor(private itemService: ToDoItemService) { }
  items: ToDoItem[];

  createNameField: string;

  onCreateSubmit(): void {
    if (this.createNameField.trim()) {
      this.itemService.createItem(this.createNameField).subscribe(item =>
        this.items.push(item));
      this.createNameField = "";
    }
  }

  getItems(): void {
    this.itemService.getAllItems()
      .subscribe(items => this.items = items);
  }

  handleDelete(id: number) {
    let index = this.items.findIndex(i => i.id == id);
    this.items.splice(index, 1);
  }

  ngOnInit(): void {
    this.getItems();
  }

}
