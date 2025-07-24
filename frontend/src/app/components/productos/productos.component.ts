import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/service/producto.service';
import { NgForm } from '@angular/forms';
import { Producto } from 'src/app/models/producto';

declare var M: any;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {

  constructor(public productoService: ProductoService) {}

  ngOnInit(): void {
    this.getProductos();
  }

  agregarProducto(form: NgForm) {
    if (form.value._id) {
      this.productoService.updateProducto(form.value).subscribe(res => {
        this.resetForm(form);
        this.getProductos();
        M.toast({ html: 'Producto actualizado' });
      });
    } else {
      this.productoService.createProducto(form.value).subscribe(res => {
        this.resetForm(form);
        this.getProductos();
        M.toast({ html: 'Producto guardado' });
      });
    }
  }

  getProductos() {
    this.productoService.getProductos().subscribe(res => {
      this.productoService.productos = res as Producto[];
    });
  }

  editarProducto(producto: Producto) {
    this.productoService.selectedProducto = { ...producto };
  }

  eliminarProducto(id: string) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.deleteProducto(id).subscribe(res => {
        this.getProductos();
        M.toast({ html: 'Producto eliminado' });
      });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.productoService.selectedProducto = new Producto();
    }
  }
}
