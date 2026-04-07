export async function apiFetch<T>(url: string, options?: RequestInit): Promise<T>{
    const rest = await fetch(url, options);
    if(!rest.ok){
        const msg = await rest.text();
        throw new Error(msg || 'Error en la peticion');
    }
    return rest.json();
}