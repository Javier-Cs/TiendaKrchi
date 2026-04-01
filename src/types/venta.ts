// representa la venta resumida 
export type VentaDto = {
  id_venta: number;
  id_cliente: number;
  nombre:  string;
  nombre_vendedor: string;
  tipo_venta: string;
  estado_venta: string;
  monto_total_Venta: number;
  fecha_venta: string;
};

