export class Usuario {
constructor(
    public nombre = "",
    public cargo = "",
    public oficina = "",
    public salario = 0,
    public _id?: string  // ahora es opcional, importante
) {}
}
