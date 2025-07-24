import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/service/servicio.service';
import { NgForm } from '@angular/forms';
import { Servicio } from 'src/app/models/servicio';

declare var M: any;

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
})
export class ServiciosComponent implements OnInit {

  constructor(public servicioService: ServicioService) {}

  ngOnInit(): void {
    this.getServicios();
  }

  agregarServicio(form: NgForm) {
    if (form.value._id) {
      this.servicioService.updateServicio(form.value).subscribe(res => {
        this.resetForm(form);
        this.getServicios();
        M.toast({ html: 'Servicio actualizado' });
      });
    } else {
      this.servicioService.createServicio(form.value).subscribe(res => {
        this.resetForm(form);
        this.getServicios();
        M.toast({ html: 'Servicio guardado' });
      });
    }
  }

  getServicios() {
    this.servicioService.getServicios().subscribe(res => {
      this.servicioService.servicios = res as Servicio[];
    });
  }

  editarServicio(servicio: Servicio) {
    this.servicioService.selectedServicio = { ...servicio };
  }

  eliminarServicio(id: string) {
    if (confirm('¿Estás seguro de eliminar este servicio?')) {
      this.servicioService.deleteServicio(id).subscribe(res => {
        this.getServicios();
        M.toast({ html: 'Servicio eliminado' });
      });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.servicioService.selectedServicio = new Servicio();
    }
  }
}
