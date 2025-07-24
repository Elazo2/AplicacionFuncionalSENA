import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioAuth } from 'src/app/models/usuario-auth';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  usuario: UsuarioAuth = new UsuarioAuth();

  constructor(private authService: AuthService, private router: Router) {}

  registrar() {
    this.authService.register(this.usuario).subscribe(
      res => {
        alert('Registro exitoso. Ahora inicia sesión.');
        this.router.navigate(['/login']);
      },
      err => {
        alert('Error al registrar usuario.');
      }
    );
  }
}
