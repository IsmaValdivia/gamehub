export interface Producto {
    id?: string;
    nombre: string;
    precio: number;
    plataforma: string;
    imagen?: string;
    stock: number;
    genero: string[];
    recomendado: boolean;
    descuento?: number;
    desarrollador?: string; 
    publisher?: string;
}