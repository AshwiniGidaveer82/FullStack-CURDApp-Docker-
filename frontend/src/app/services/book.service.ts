import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BookService {

  constructor(private http: HttpClient) {}

  getBooks(page: number, limit: number) {
    return this.http.get(`${environment.apiUrl}/books?page=${page}&limit=${limit}`);
  }

  createBook(data: any) {
    return this.http.post(`${environment.apiUrl}/books`, data);
  }

  updateBook(id: string, data: any) {
    return this.http.put(`${environment.apiUrl}/books/${id}`, data);
  }

  deleteBook(id: string) {
    return this.http.delete(`${environment.apiUrl}/books/${id}`);
  }
}