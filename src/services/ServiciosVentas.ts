import type { VentaDto } from "@/types/venta";
import { apiFetch } from '../utils/helper.ts'; 
import type { ClienteDto } from "@/types/cliente.ts";
import { API_BASE } from "../../config.ts";

//const API_BASE = 'https://apioper.legumfrutsa.com';

export async function obtenerVenta(id: number): Promise<VentaDto>{
    return apiFetch<VentaDto>(`${API_BASE}/Api/Venta/${id}`);
    /*const rest = await fetch(;
    if(!rest.ok) throw new Error('Error al obtener venta.');
    return rest.json();*/
}


export async function obtenerCliente(id: number): Promise<ClienteDto>{
    return apiFetch<ClienteDto>(`${API_BASE}/Api/Cliente/${id}`);
    /*const rest = await fetch();
    if(!rest.ok) throw new Error('Error al obtenerCliente');
    return rest.json();*/
}

export async function actualizarVenta(data: VentaDto): Promise<VentaDto>{
    return apiFetch<VentaDto>(`${API_BASE}/Api/Venta?ventaId=${data.id_venta}`,
        {
            method: 'PUT',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }
    );
    /*const rest = await fetch(`https://apioper.legumfrutsa.com/Api/Venta?ventaId=${data.id_venta}`,
        {
            method: 'PUT',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify(data)
        }
    );

    if(!rest.ok){
        const message = await rest.text();
        throw new Error(message || 'Error al actualizar venta..');
    }
    return rest.json();*/
}