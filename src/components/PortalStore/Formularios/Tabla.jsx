export default function Tabla({ ventas }) {
  if (!ventas.length) return <p>No hay resultados</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Vendedor</th>
          <th>Monto</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {ventas.map((v) => (
          <tr key={v.id_venta}>
            <td>{v.id_venta}</td>
            <td>{v.id_cliente}</td>
            <td>{v.nombre_vendedor}</td>
            <td>{v.monto_total_Venta}</td>
            <td>{new Date(v.fecha_venta).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}