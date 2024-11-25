export interface iDeseados {
    id?: string; // ID generado por Firebase
    usuarioId: string; // ID del usuario que añadió el juego
    nombre: string;
    imagen: string;
    precio: number;
}