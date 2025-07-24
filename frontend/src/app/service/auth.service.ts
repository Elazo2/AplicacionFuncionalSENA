import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioAuth } from '../models/usuario-auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:3000/api/auth'; // tu backend

  constructor(private http: HttpClient) {}

  register(usuario: UsuarioAuth): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, usuario);
  }

  login(usuario: UsuarioAuth): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, usuario);
  }
}
