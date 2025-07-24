import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  selectedProducto: Producto = new Producto();
  productos: Producto[] = [];
  private URL = 'http://localhost:3000/api/productos';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.URL);
  }

  getProducto(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.URL}/${id}`);
  }

  createProducto(producto: Producto): Observable<any> {
    // Asegúrate de no enviar _id al crear
    const { _id, ...productoSinId } = producto;
    return this.http.post(this.URL, productoSinId);
  }

  updateProducto(producto: Producto): Observable<any> {
    return this.http.put(`${this.URL}/${producto._id}`, producto);
  }

  deleteProducto(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
