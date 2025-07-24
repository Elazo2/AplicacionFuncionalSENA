import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioAuth } from 'src/app/models/usuario-auth';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  usuario: UsuarioAuth = new UsuarioAuth();

  constructor(private authService: AuthService, private router: Router) {}

  iniciarSesion() {
    this.authService.login(this.usuario).subscribe(
      res => {
        alert('Login exitoso');
        this.router.navigate(['/usuarios']);
      },
      err => {
        alert('Credenciales inválidas');
      }
    );
  }
}
