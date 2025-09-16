import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductoService } from './producto.service';

describe('ProductoService - CRUD', () => {
  let service: ProductoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductoService]
    });
    service = TestBed.inject(ProductoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('POST crear producto', () => {
    const nuevo = { nombre: 'Teclado', descripcion: 'Mecánico', precio: 120 };

    service.createProducto(nuevo).subscribe(data => {
      expect(data.nombre).toBe('Teclado');
    });

    const req = httpMock.expectOne('http://localhost:3000/api/productos');
    expect(req.request.method).toBe('POST');
    req.flush({ ...nuevo, id: 1 });
  });

  it('GET listar productos', () => {
    const lista = [{ id: 1, nombre: 'Mouse' }];

    service.getProductos().subscribe(data => {
      expect(data.length).toBe(1);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/productos');
    expect(req.request.method).toBe('GET');
    req.flush(lista);
  });

  it('PUT actualizar producto', () => {
    const actualizado = { _id: '1', nombre: 'Pantalla', descripcion: 'Monitor LED', precio: 250 };

    service.updateProducto(actualizado).subscribe(data => {
      expect(data.nombre).toBe('Pantalla');
    });

    const req = httpMock.expectOne('http://localhost:3000/api/productos/1');
    expect(req.request.method).toBe('PUT');
    req.flush(actualizado);
  });

  it('DELETE eliminar producto', () => {
    service.deleteProducto("1").subscribe(data => {
      expect(data).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:3000/api/productos/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
