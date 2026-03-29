import { useState, useEffect, useRef } from "react";

export default function AutoCompletarCliente({onSelect}){
    const[texto, setTexto] = useState("");
    const[clientes, setClientes] = useState([]);
    const[loading, setLoading] = useState(false);

    const controllerRef = useRef(null);
    const ref = useRef();

    useEffect(() => {
        console.log(" AUTOCOMPLETE MONTADO");
    }, []);

    useEffect(() => {
        if(texto.length < 1){
            console.log(" React montado correctamente");
            setClientes([]);
            return;
        }

        const timeout = setTimeout(() =>{
            buscarClientes(texto);
        }, 300);

        return () => clearTimeout(timeout);
    }, [texto]);


    
    const buscarClientes = async(text) => {
        let controller;
        try{
            if(controllerRef.current) {
                controllerRef.current.abort();
            }

            controller = new AbortController();
            controllerRef.current = controller;

            setLoading(true);

            const res = await fetch(
                `https://apioper.legumfrutsa.com/Api/Cliente/buscar?nombre=${text}`,
                {signal: controller.signal}
            );
            if(!res.ok) throw new Error("Error al buscar Cliente");


            const data = await res.json();
            console.log("DATA API:", data);
            setClientes(Array.isArray(data) ? data :[]);
        }catch(err){
            if(err.name !== "AbortError"){
                console.error(err);
                setClientes([]);
            }
        }finally{
            if(controllerRef.current === controller){
                setLoading(false);
            }
        }
    };

    const seleccionarCliente = (cliente) =>{
        setTexto(cliente.nombre);
        setClientes([]);
        onSelect(cliente);
    };

    useEffect(() => {
        console.log("React funcionando");
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setClientes([]);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return(
        <div 
            ref={ref} 
            style={{ position: "relative" }} 
            className="autocompletardeudores">
                <input
                    type="text"
                    value={texto}
                    onChange={(e) =>{
                        console.log("INPUT:", e.target.value);
                        setTexto(e.target.value);
                        onSelect(null);
                    }}
                    placeholder="Escriba el nombre del cliente..."
                />

            {loading && <div>Cargando...</div>}

            {!loading && clientes.length > 0 &&(
                <div 
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        background: "white",
                        border: "1px solid #ccc",
                        zIndex: 10,
                        maxHeight: "200px",
                        overflowY: "auto",
                    }}
                >
                    
                {clientes.map((c) => (
                    <div
                        key={c.id_cliente}
                        onClick={() => seleccionarCliente(c)}
                        style={{padding: "8px", cursor: "pointer"}}
                    >
                        {c.nombre}
                    </div> 
                ))}
                </div>
            )}
            {!loading && texto.length >= 2 && clientes.length === 0 &&(
                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        background: "white",
                        border: "1px solid #ccc",
                        padding: "8px",
                    }}
                >
                    No se encontraron clientes
                </div>
            )}

        </div>
    );
}