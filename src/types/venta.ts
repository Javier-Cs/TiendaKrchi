// representa la venta resumida 
export type VentaDto = {
  id_venta: number;
  id_cliente: number;
  nombre_cliente:  string;
  nombre_vendedor: string;
  tipo_venta: string;
  estado_venta: string;
  monto_total_venta: number;
  fecha_venta: string;
};

