import React from 'react';

const TarjetaProducto = ({ producto, cantidad, alCambiar }) => {

    // Función restar
    const handleRestar = () => {
        // Si la cantidad no existe, es 0. Si existe, le restamos 1.
        const nuevaCantidad = Math.max(0, (cantidad || 0) - 1);
        alCambiar(producto.id, nuevaCantidad);
    };

    // Función sumar
    const handleSumar = () => {
        const nuevaCantidad = (cantidad || 0) + 1;
        alCambiar(producto.id, nuevaCantidad);
    };

    // Función para cuando el usuario escribe manualmente por si no es tactil la cosa
    const handleInput = (e) => {
        const valor = parseInt(e.target.value);
        if (!isNaN(valor) && valor >= 0) {
            alCambiar(producto.id, valor);
        }
    };

    return (
        <div className="col-12 col-md-6 col-lg-4 mb-3">
            <div className="card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="card-title m-0 text-truncate pe-2">{producto.nombre}</h5>
                        <span className="badge bg-primary fs-6 flex-shrink-0">
                            {producto.precio.toFixed(2)}€
                        </span>
                    </div>

                    <div className="mt-auto">
                        <label className="form-label text-muted small fw-bold">Cantidad:</label>

                        {/* Componente para el tema del tactil */}
                        <div className="input-group input-group-lg shadow-sm">
                            <button
                                className="btn btn-outline-secondary fw-bold"
                                type="button"
                                onClick={handleRestar}
                                style={{ borderRadius: '8px 0 0 8px' }}
                            >
                                <i className="bi bi-dash-lg"></i>
                            </button>

                            <input
                                type="text"
                                className="form-control text-center fw-bold fs-5"
                                value={cantidad || ""}
                                onChange={handleInput}
                                placeholder="0"
                                style={{ backgroundColor: '#f8f9fa' }}
                            />

                            <button
                                className="btn btn-outline-success fw-bold"
                                type="button"
                                onClick={handleSumar}
                                style={{ borderRadius: '0 8px 8px 0' }}
                            >
                                <i className="bi bi-plus-lg"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TarjetaProducto;