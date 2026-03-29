import { useState, useEffect } from "react";
import AutoCompletarCliente from "./AutoCompletarCliente"

export default function FormularioVentaPorFecha({onBuscar}){
    const [fecha, setFecha] = useState("");
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
    const [tipoVenta, setTipoVenta] = useState("");

    useEffect(() => {
        console.log(" FORMULARIO MONTADO");
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!fecha && !clienteSeleccionado && !tipoVenta){
            alert("Debe de ingresar al menus un filtro");
            return;
        }

        onBuscar({
            fecha,
            id_cliente: clienteSeleccionado?.id_cliente ?? 0,
            tipo: tipoVenta
        });
    };

    const handleReset = () => {
            setFecha("");
            setClienteSeleccionado(null);
            setTipoVenta("");
        };

    return(
        <form onSubmit={handleSubmit}>
            <div className="form">
                <div className="form-grid" >

                    <label >Fecha Busqueda
                        <input 
                            type="date" 
                            value={fecha} 
                            className="colorinput"
                            onChange={(e) => setFecha(e.target.value)}/>
                    </label>

                    <label >
                        Incluir Cliente a la busqueda
                        <AutoCompletarCliente onSelect={setClienteSeleccionado} />
                    </label>

                    <label>
                        Incluir Tipo venta
                        <select 
                            value={tipoVenta} 
                            className="colorinput2"
                            onChange={(e) => setTipoVenta(e.target.value)}
                            >
                            <option value="">Elegir</option>
                            <option value="CONTADO">Contado</option>
                            <option value="CREDITO">Crédito</option>
                        </select>
                    </label>

                    <div className="actions-left">
                        <button 
                            type="button" 
                            className="btn cancel"
                            onClick={handleReset}>
                            CANCELAR
                        </button>

                        <button type="submit" className="btn buscar">
                            BUSCAR VENTAS
                        </button>
                    </div>
                    
                </div>
            </div>
        </form>
    );
}