import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsuarioService } from './usuario.service';

describe('UsuarioService - CRUD', () => {
  let service: UsuarioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsuarioService]
    });
    service = TestBed.inject(UsuarioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('POST crear usuario', () => {
    const nuevo = { nombre: 'Ana', cargo: 'Dev', oficina: 'Bogotá', salario: 3000 };

    service.postUsuario(nuevo).subscribe(data => {
      expect(data.nombre).toBe('Ana');
    });

    const req = httpMock.expectOne('http://localhost:3000/api/usuarios');
    expect(req.request.method).toBe('POST');
    req.flush({ ...nuevo, _id: '123' });
  });

  it('GET listar usuarios', () => {
    const lista = [{ _id: '1', nombre: 'Juan' }];

    service.getUsuarios().subscribe(data => {
      expect(data.length).toBe(1);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/usuarios');
    expect(req.request.method).toBe('GET');
    req.flush(lista);
  });

  it('PUT actualizar usuario', () => {
    const actualizado = { _id: '1', nombre: 'Pedro', cargo: 'Dev', oficina: 'Bogotá', salario: 3000 };

    service.putUsuario(actualizado).subscribe(data => {
      expect(data.nombre).toBe('Pedro');
    });

    const req = httpMock.expectOne('http://localhost:3000/api/usuarios/1');
    expect(req.request.method).toBe('PUT');
    req.flush(actualizado);
  });

  it('DELETE eliminar usuario', () => {
    service.deleteUsuario('1').subscribe(data => {
      expect(data).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:3000/api/usuarios/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
