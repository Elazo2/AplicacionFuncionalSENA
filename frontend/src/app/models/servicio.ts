export class Servicio {
    constructor(
    public nombre = "",
    public descripcion = "",
    public precio = 0,
    public _id?: string  // ahora es opcional, importante
) {}
}
