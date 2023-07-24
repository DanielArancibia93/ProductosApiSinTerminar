namespace ProductosApi.Models;

public class ProductosItem
{
    public long Id { get; set; }
    public string? Nombre { get; set; }
    public string? Descripcion { get; set; }

    public long? CantidadIni { get; set; }

    public long? Precio{ get; set; }
}

