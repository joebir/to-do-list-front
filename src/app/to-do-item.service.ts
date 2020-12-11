import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'

import { ToDoItem } from './to-do-item';

@Injectable({
  providedIn: 'root'
})
export class ToDoItemService {

  constructor(
    private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  private baseUrl = 'https://todolist-apideploy.azurewebsites.net/'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getAllItems(): Observable<ToDoItem[]> {
    return this.http.get<ToDoItem[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError<ToDoItem[]>('getAllItems', []))
      );
  }

  getItemById(id: number): Observable<ToDoItem> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<ToDoItem>(url).pipe(
      catchError(this.handleError<ToDoItem>(`getItemById id=${id}`))
    );
  }

  updateItem(toDoItem: ToDoItem): Observable<any> {
    return this.http.put(`${this.baseUrl}/${toDoItem.id}`, toDoItem, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateHero'))
    );
  }

  createItem(taskName: string): Observable<ToDoItem> {
    return this.http.post<ToDoItem>(this.baseUrl, {name: taskName}, this.httpOptions).pipe(
      catchError(this.handleError<ToDoItem>('createItem'))
    );
  }

  deleteItem(toDoItem: ToDoItem | number): Observable<ToDoItem> {
    const id = typeof toDoItem === 'number' ? toDoItem : toDoItem.id;
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<ToDoItem>(url).pipe(
      catchError(this.handleError<ToDoItem>('deleteItem'))
    );
  }
}
