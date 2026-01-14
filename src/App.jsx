import React, { useState } from 'react';
import TarjetaProducto from './componentes/TarjetaProducto.jsx';
import { listaMenu, tasaImpuesto } from './datos.js';

function App() {
    // pedidos: Lo que el cliente lleva ahora mismo en la pantalla
    const [pedidos, setPedidos] = useState({});
    // cajaDelDia: dinero total acumulado
    const [cajaDelDia, setCajaDelDia] = useState(0);
    const [modoOscuro, setModoOscuro] = useState(false);
    // Calcular ticket actual
    const calcularTotales = () => {
        let baseImponible = 0;

        listaMenu.forEach(prod => {
            const cant = pedidos[prod.id] || 0;
            baseImponible += (prod.precio * cant);
        });

        const impuesto = baseImponible * tasaImpuesto;
        const totalTicket = baseImponible + impuesto;

        return { baseImponible, impuesto, totalTicket };
    };

    const { baseImponible, impuesto, totalTicket } = calcularTotales();
   // Función para cobrar el pedido actual
    const aceptar = () => {
        if (totalTicket === 0) {
            alert("El pedido está vacío.");
            return;
        }
        // Aquí sumamos a la caja del día
        const nuevoTotalDia = cajaDelDia + totalTicket;
        setCajaDelDia(nuevoTotalDia);
        alert(`Pedido cobrado con éxito.\nTicket actual: ${totalTicket.toFixed(2)}€\nVentas totales del día: ${nuevoTotalDia.toFixed(2)}€`);
        // Y dejo pedidos limpio de cara a uno nuevo
        setPedidos({});
    };

    const limpiar = () => {
        if (Object.keys(pedidos).length === 0) return;
        if (window.confirm("¿Seguro que quieres borrar este pedido?")) {
            setPedidos({});
        }
    };

    const salir = () => {
        if (window.confirm("¿Quieres cerrar la aplicación?")) {
            window.close();
        }
    };

    const manejarCambio = (id, valor) => {
        const nuevaCantidad = parseInt(valor);
        if (!isNaN(nuevaCantidad) && nuevaCantidad >= 0) {
            setPedidos({ ...pedidos, [id]: nuevaCantidad });
        }
    };

    // Componente que hace todo el renderizado para la app para que se vea bien y ordenado
    return (
        <div className={modoOscuro ? "bg-dark text-white min-vh-100 p-4" : "bg-light min-vh-100 p-4"}>

            {/* Cabecera */}
            <div className="container mb-4 d-flex justify-content-between align-items-center border-bottom pb-3">
                <h2><img src="https://pepechiringo.es/wp-content/uploads/2019/01/Diseños-Web-Peoe-Chiringo-04.png" alt="Cafetería" height="50" className="me-2"/> Cafetería I.E.S Lomo de La Herradura</h2>
                <button
                    className={`btn ${modoOscuro ? "btn-outline-light" : "btn-outline-dark"}`}
                    onClick={() => setModoOscuro(!modoOscuro)}
                >
                    {modoOscuro ? "Claro" : "Oscuro"}
                </button>
            </div>

            <div className="container">
                <div className="row">

                    {/* Columna iz, productos */}
                    <div className="col-lg-7 col-md-12">
                        <div className="row">
                            {listaMenu.map(prod => (
                                <TarjetaProducto
                                    key={prod.id}
                                    producto={prod}
                                    cantidad={pedidos[prod.id] || ""}
                                    alCambiar={manejarCambio}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Columna derecha, resumen y la caja */}
                    <div className="col-lg-5 col-md-12 mt-4 mt-lg-0">

                        {/* Caja del dia */}
                        <div className={`card shadow mb-3 border-warning border-2 ${modoOscuro ? "bg-dark text-white border-warning" : ""}`}>
                            <div className="card-body py-2">
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="fw-bold text-warning">Ventas Totales del Día:</span>
                                    <span className="fs-4 fw-bold">{cajaDelDia.toFixed(2)}€</span>
                                </div>
                            </div>
                        </div>

                        {/* Resumen del ticket */}
                        <div className={`card shadow ${modoOscuro ? "bg-secondary text-white border-light" : ""}`}>
                            <div className="card-header bg-success text-white fw-bold">
                                Ticket Actual
                            </div>
                            <div className="card-body">
                                {totalTicket === 0 ? (
                                    <p className="text-center text-muted mt-3">No hay productos seleccionados.</p>
                                ) : (
                                    <ul className="list-group list-group-flush mb-3">
                                        {listaMenu
                                            .filter(p => pedidos[p.id] > 0)
                                            .map(p => (
                                                <li key={p.id} className={`list-group-item d-flex justify-content-between ${modoOscuro ? "bg-secondary text-white border-light" : ""}`}>
                                                    <span>{pedidos[p.id]}x {p.nombre}</span>
                                                    <span>{(p.precio * pedidos[p.id]).toFixed(2)}€</span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                )}
                                <hr/>

                                {/* Detalles impositivos */}
                                <div className="d-flex justify-content-between mb-1">
                                    <span>Base Imponible:</span>
                                    <span>{baseImponible.toFixed(2)}€</span>
                                </div>
                                <div className="d-flex justify-content-between mb-1 text-danger">
                                    <span>IGIC (7%):</span>
                                    <span>{impuesto.toFixed(2)}€</span>
                                </div>

                                {/* Total del ticket */}
                                <div className="d-flex justify-content-between align-items-center fs-3 fw-bold text-primary mt-2">
                                    <span>Venta Total:</span>
                                    <span>{totalTicket.toFixed(2)}€</span>
                                </div>
                            </div>

                            {/* Los botones */}
                            <div className="card-footer d-grid gap-2 bg-white border-0 p-3">
                                <button className="btn btn-success btn-lg fw-bold" onClick={aceptar}>
                                    Aceptar
                                </button>
                                <div className="d-flex gap-2">
                                    <button className="btn btn-outline-danger flex-grow-1" onClick={limpiar}>
                                        Limpiar
                                    </button>
                                    <button className="btn btn-outline-secondary flex-grow-1" onClick={salir}>
                                        Salir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default App;