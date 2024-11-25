export interface ICarrito {
    id: string; // ID del producto
    nombre: string; // Nombre del producto
    imagen: string; // URL de la imagen del producto
    precio: number; // Precio del producto
    cantidad: number; // Cantidad del producto en el carrito
    plataforma?: string; // Agregar plataforma como opcional
}