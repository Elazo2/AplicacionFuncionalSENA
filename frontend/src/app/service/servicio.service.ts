import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Servicio } from '../models/servicio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  selectedServicio: Servicio = new Servicio();
  servicios: Servicio[] = [];
  private URL = 'http://localhost:3000/api/servicios';

  constructor(private http: HttpClient) {}

  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.URL);
  }

  getServicio(id: string): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.URL}/${id}`);
  }

  createServicio(servicio: Servicio): Observable<any> {
    // Asegúrate de no enviar el _id al backend al crear
    const { _id, ...servicioSinId } = servicio;
    return this.http.post(this.URL, servicioSinId);
  }

  updateServicio(servicio: Servicio): Observable<any> {
    if (!servicio._id) throw new Error('El servicio no tiene _id definido');
    return this.http.put(`${this.URL}/${servicio._id}`, servicio);
  }

  deleteServicio(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
