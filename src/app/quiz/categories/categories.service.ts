import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  categories: any[] = [];

  constructor(private http: HttpClient) { }

  getCategories(search: string | null) {
    if (search) {
      return this.http.get(`http://localhost:3000/categories?categoryLabel_like=${search}`);
    }

    return this.http.get('http://localhost:3000/categories');
  }
}
