export async function apiFetch<T>(url: string, options?: RequestInit): Promise<T>{
    const rest = await fetch(url, options);

    const text = await rest.text();
    if(!rest.ok){
        throw new Error(text || 'Error en la peticion');
    }
    return text ? JSON.parse(text) : (null as T);
}