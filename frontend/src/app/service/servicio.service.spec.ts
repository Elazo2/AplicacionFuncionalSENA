import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServicioService } from './servicio.service';

describe('ServicioService - CRUD', () => {
  let service: ServicioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServicioService]
    });
    service = TestBed.inject(ServicioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('POST crear servicio', () => {
    const nuevo = { nombre: 'Instalación', descripcion: 'Básica', precio: 100 };

    service.createServicio(nuevo).subscribe(data => {
      expect(data.nombre).toBe('Instalación');
    });

    const req = httpMock.expectOne('http://localhost:3000/api/servicios');
    expect(req.request.method).toBe('POST');
    req.flush({ ...nuevo, id: 1 });
  });

  it('GET listar servicios', () => {
    const lista = [{ id: 1, nombre: 'Reparación' }];

    service.getServicios().subscribe(data => {
      expect(data.length).toBe(1);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/servicios');
    expect(req.request.method).toBe('GET');
    req.flush(lista);
  });

  it('PUT actualizar servicio', () => {
    const actualizado = { _id: '1', nombre: 'Soporte', descripcion: 'Actualizado', precio: 150 };

    service.updateServicio(actualizado).subscribe(data => {
      expect(data.nombre).toBe('Soporte');
    });

    const req = httpMock.expectOne('http://localhost:3000/api/servicios/1');
    expect(req.request.method).toBe('PUT');
    req.flush(actualizado);
  });

  it('DELETE eliminar servicio', () => {
    service.deleteServicio("1").subscribe(data => {
      expect(data).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:3000/api/servicios/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
