document.addEventListener("DOMContentLoaded", () => {
    const productos = [
        { nombre: "Hamburguesa Clásica", precio: 5.99, imagen: "URL_de_la_imagen_1.jpg" },
        { nombre: "Hamburguesa BBQ", precio: 6.99, imagen: "URL_de_la_imagen_2.jpg" },
        { nombre: "Hamburguesa Vegana", precio: 7.49, imagen: "URL_de_la_imagen_3.jpg" }
    ];

    const productosContainer = document.getElementById("productosContainer");
    const itemsCarritoElement = document.getElementById("itemsCarrito");
    const totalCompraElement = document.getElementById("totalCompra");

    let totalCompra = 0;
    let cantidadTotalItems = 0;

    productos.forEach(producto => {
        const productoElement = crearProductoElement(producto);
        productosContainer.appendChild(productoElement);
    });

    function crearProductoElement(producto) {
        const div = document.createElement("div");
        div.classList.add("item");

        div.style.backgroundImage = `url('${producto.imagen}')`;

        const nombreP = document.createElement("p");
        nombreP.textContent = `Comida: ${producto.nombre}`;

        const precioP = document.createElement("p");
        precioP.textContent = `Precio: $${producto.precio.toFixed(2)}`;

        const sumarBtn = document.createElement("button");
        sumarBtn.textContent = "+";

        const cantidadInput = document.createElement("input");
        cantidadInput.type = "text";
        cantidadInput.classList.add("cantidadElement");
        cantidadInput.value = "0";

        const restarBtn = document.createElement("button");
        restarBtn.textContent = "-";

        const agregarCarritoBtn = document.createElement("button");
        agregarCarritoBtn.textContent = "Agregar al carrito";

        div.appendChild(nombreP);
        div.appendChild(precioP);
        div.appendChild(sumarBtn);
        div.appendChild(cantidadInput);
        div.appendChild(restarBtn);
        div.appendChild(agregarCarritoBtn);

        sumarBtn.addEventListener("click", () => {
            cantidadInput.value = parseInt(cantidadInput.value) + 1;
        });

        restarBtn.addEventListener("click", () => {
            const cantidad = parseInt(cantidadInput.value);
            if (cantidad > 0) {
                cantidadInput.value = cantidad - 1;
            }
        });

        agregarCarritoBtn.addEventListener("click", () => {
            const cantidad = parseInt(cantidadInput.value);
            if (cantidad > 0) {
                const comida = producto.nombre;
                const listItem = document.createElement("li");
                const cantidadItem = document.createElement("span");
                cantidadItem.textContent = `${cantidad} ${comida}(s) - $${(producto.precio * cantidad).toFixed(2)}`;

                // Botones para modificar la cantidad en el carrito
                const aumentarCantidadBtn = document.createElement("button");
                aumentarCantidadBtn.textContent = "+";
                const disminuirCantidadBtn = document.createElement("button");
                disminuirCantidadBtn.textContent = "-";
                const eliminarBtn = document.createElement("button");
                eliminarBtn.textContent = "x";

                // Eventos para aumentar y disminuir la cantidad en el carrito
                aumentarCantidadBtn.addEventListener("click", () => {
                    cantidadInput.value = parseInt(cantidadInput.value) + 1;
                    cantidadItem.textContent = `${cantidadInput.value} ${comida}(s) - $${(producto.precio * parseInt(cantidadInput.value)).toFixed(2)}`;
                    totalCompra = calcularTotalCompra();
                    actualizarTotal();
                });

                disminuirCantidadBtn.addEventListener("click", () => {
                    const cantidad = parseInt(cantidadInput.value);
                    if (cantidad > 1) {
                        cantidadInput.value = cantidad - 1;
                        cantidadItem.textContent = `${cantidadInput.value} ${comida}(s) - $${(producto.precio * parseInt(cantidadInput.value)).toFixed(2)}`;
                        totalCompra = calcularTotalCompra();
                        actualizarTotal();
                    }
                });

                eliminarBtn.addEventListener("click", () => {
                    itemsCarritoElement.removeChild(listItem);
                    totalCompra = calcularTotalCompra();
                    actualizarTotal();
                });

                listItem.appendChild(cantidadItem);
                listItem.appendChild(aumentarCantidadBtn);
                listItem.appendChild(disminuirCantidadBtn);
                listItem.appendChild(eliminarBtn);
                itemsCarritoElement.appendChild(listItem);

                totalCompra += producto.precio * cantidad;
                cantidadTotalItems += cantidad;
                actualizarTotal();
                cantidadInput.value = "0";
            }
        });

        return div;
    }

    function calcularTotalCompra() {
        let total = 0;
        const itemsCarrito = itemsCarritoElement.querySelectorAll("li");
        itemsCarrito.forEach(item => {
            const precio = parseFloat(item.textContent.split("$")[1]);
            total += precio;
        });
        return total;
    }

    function actualizarTotal() {
        totalCompraElement.textContent = totalCompra.toFixed(2);
    }

    const finalizarCompraBtn = document.getElementById("finalizarCompraBtn");
    finalizarCompraBtn.addEventListener("click", mostrarResumenCompra);

    function mostrarResumenCompra() {
        let descuento = 0;
        if (cantidadTotalItems >= 10) {
            descuento = totalCompra * 0.10;
        }

        const resumenCompra = obtenerResumenCompra();
        const totalConDescuento = (totalCompra - descuento).toFixed(2);
        const costoEnvío = cantidadTotalItems >= 10 ? "Gratis" : "$5.00";

        const ventanaEmergente = window.open("", "Resumen de Compra", "width=400,height=300");
        ventanaEmergente.document.write("<h1>Resumen de Compra</h1>");
        ventanaEmergente.document.write(resumenCompra);
        ventanaEmergente.document.write(`<p>Descuento: $${descuento.toFixed(2)}</p>`);
        ventanaEmergente.document.write(`<p>Total con Descuento: $${totalConDescuento}</p>`);
        ventanaEmergente.document.write(`<p>Costo de Envío: ${costoEnvío}</p>`);
        ventanaEmergente.document.close();
    }

    function obtenerResumenCompra() {
        const itemsCarrito = itemsCarritoElement.querySelectorAll("li");
        let resumen = "Resumen de Compra:\n\n";
        itemsCarrito.forEach(item => {
            const textoItem = item.textContent.replace(/\+|\-/g, "");
            resumen += `${textoItem}\n`;
        });
        resumen += `\nTotal: $${totalCompra.toFixed(2)}`;
        return resumen;
    }
});
