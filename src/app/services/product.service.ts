import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) { 
    this.myAppUrl=enviroment.endpoint;
    this.myApiUrl='api/product/';
  }

  /**
   * name
   */
  getListProductService():Observable<Product[]> {
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  getProductService(id:Number):Observable<Product> {
    return this.http.get<Product>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
  deleteProductService(id:Number):Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
  createProductService(product:Product):Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,product);
  }
  updateProductService(id:Number,product:Product):Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`,product);
  }
}
