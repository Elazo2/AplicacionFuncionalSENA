export class Producto {
  constructor(
    public nombre: string = "",
    public descripcion: string = "",
    public precio: number = 0,
    public _id?: string  // ahora es opcional, importante
  ) {}
}
