import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  selectedUsuario: Usuario = new Usuario();
  usuarios: Usuario[] = [];
  readonly URL_API = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.URL_API);
  }

  postUsuario(usuario: Usuario): Observable<Usuario> {
    const { _id, ...usuarioSinId } = usuario;
    return this.http.post<Usuario>(this.URL_API, usuarioSinId);
  }

  putUsuario(usuario: Usuario): Observable<Usuario> {
    if (!usuario._id) throw new Error('El usuario no tiene _id definido');
    return this.http.put<Usuario>(`${this.URL_API}/${usuario._id}`, usuario);
  }

  deleteUsuario(_id: string): Observable<void> {
    return this.http.delete<void>(`${this.URL_API}/${_id}`);
  }
}
