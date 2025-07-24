import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';

declare var M: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {

  constructor(public usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  agregarUsuario(form: NgForm) {
    if (form.value._id) {
      // Actualizar
      this.usuarioService.putUsuario(form.value).subscribe(res => {
        this.resetForm(form);
        this.getUsuarios();
        M.toast({ html: 'Usuario actualizado' });
      });
    } else {
      // Crear nuevo
      this.usuarioService.postUsuario(form.value).subscribe(res => {
        this.resetForm(form);
        this.getUsuarios();
        M.toast({ html: 'Usuario guardado' });
      });
    }
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe(res => {
      this.usuarioService.usuarios = res as Usuario[];
    });
  }

  editarUsuario(usuario: Usuario) {
    this.usuarioService.selectedUsuario = { ...usuario };
  }

  eliminarUsuario(id: string) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuarioService.deleteUsuario(id).subscribe(res => {
        this.getUsuarios();
        M.toast({ html: 'Usuario eliminado' });
      });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.usuarioService.selectedUsuario = new Usuario();
    }
  }
}
