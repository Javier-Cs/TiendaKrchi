import {atom} from 'nanostores';

// fila seleccionada
export const selectedRow = atom<{
    entity: 'venta' | 'cliente' | null;
    data: any;
}>({
    entity: null,
    data: null
});


// modal activo
export const activedModal = atom<{
    type: 'venta' | 'cliente' | null;
}>({
    type: null
});