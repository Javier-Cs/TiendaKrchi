export const formatoFechaEC = (fecha: string) =>
    new Date(fecha).toLocaleString('es-EC',{
        timeZone: 'America/Guayaquil',
        hour: '2-digit',
        minute: '2-digit',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

export const formatoDeDinero = (value: number) =>
    `$${value.toFixed(2)}`;