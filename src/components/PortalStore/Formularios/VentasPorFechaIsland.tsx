import { useState, useEffect} from "react";
import Formulario from "./FormVentasPorFecha";
import Tabla from "./Tabla";

export default function VentasPorFechaIsland(){
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        console.log(" FACHADA MONTADA");
    },[]);

    const buscarVentas = async (filtros) => {
        try{
            setLoading(true);
            setError(null);
            

            const rest = await fetch("https://apioper.legumfrutsa.com/FechaVenta", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(filtros)
            });

            if(!rest.ok) throw new Error("Error al obtener ventas");
            const data = await rest.json();

            setVentas(data);
            

        }catch(err){
            setError(err.message);
        }finally{
            setLoading(false);
        }
    };
    

    return (
        <>
        <Formulario onBuscar={buscarVentas} />

        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Tabla ventas={ventas} />

        </>
    );

}