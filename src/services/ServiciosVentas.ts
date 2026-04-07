async function obtenerVenta(id){
    const rest = await fetch(`https://apioper.legumfrutsa.com/Api/Venta/${id}`);
    if(!rest.ok) throw new Error('Error al obtener venta.');
    return rest.json();
}


async function obtenerCliente(id){
    const rest = await fetch(`https://apioper.legumfrutsa.com/Api/Cliente/${id}`);
    if(!rest.ok) throw new Error('Error al obtenerCliente');
    return rest.json();
}

async function actualizarVenta(data){
    const rest = await fetch(`https://apioper.legumfrutsa.com/Api/Venta?ventaId=${data.id_venta}`,
        {
            method: 'PUT',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify(data)
        }
    );

    if(!rest.ok) throw new Error(await rest.text());
    return rest.json();
}