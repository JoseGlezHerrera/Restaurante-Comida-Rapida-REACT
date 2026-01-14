import React from 'react';
// Recibimos las propiedades desde el componente padre App.jsx
const TarjetaProducto = ({ producto, cantidad, alCambiar }) => {
    return (
        <div className="col-12 col-md-6 col-lg-4 mb-3">
            <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="card-title m-0">{producto.nombre}</h5>
                        <span className="badge bg-primary fs-6">
                            {producto.precio.toFixed(2)}€
                        </span>
                    </div>
                    <div className="mt-auto">
                        <label className="form-label text-muted small">Cantidad:</label>
                        <input
                            type="number"
                            className="form-control form-control-lg text-center fw-bold"
                            min="0"
                            placeholder="0"
                            value={cantidad}
                            // Llamamos a la función que vino de App pasando el ID y el valor
                            onChange={(e) => alCambiar(producto.id, e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TarjetaProducto;