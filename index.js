document.addEventListener("DOMContentLoaded", () => {
    // Define los productos en formato JSON y guárdalos en la constante "productos"
    const productos = [
        {
            "nombre": "Hamburguesa Clásica",
            "precio": 5.99,
            "imagen": "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "disponible": true
        },
        {
            "nombre": "Hamburguesa BBQ",
            "precio": 6.99,
            "imagen": "https://images.pexels.com/photos/3764353/pexels-photo-3764353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "disponible": true
        },
        {
            "nombre": "Hamburguesa Vegana",
            "precio": 7.49,
            "imagen": "https://images.pexels.com/photos/6546021/pexels-photo-6546021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "disponible": false
        },
        {
            "nombre": "Papas cheddar-bacon",
            "precio": 4.49,
            "imagen": "https://images.pexels.com/photos/17035133/pexels-photo-17035133/free-photo-of-fries-in-melted-cheese.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "disponible": true
        },
        {
            "nombre": "Papas Clasicas",
            "precio": 3.49,
            "imagen": "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "disponible": true
        },
        {
            "nombre": "Gaseosa Sprite",
            "precio": 7.49,
            "imagen": "https://images.pexels.com/photos/17650220/pexels-photo-17650220/free-photo-of-can-of-sprite-on-white-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "disponible": true
        },
        {
            "nombre": "Gaseosa Coca Cola",
            "precio": 2.49,
            "imagen": "https://images.pexels.com/photos/17650224/pexels-photo-17650224/free-photo-of-can-of-coca-cola.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "disponible": true
        },
        // Agrega otros productos aquí
    ];

    const productosContainer = document.getElementById("productosContainer");
    const itemsCarritoElement = document.getElementById("itemsCarrito");
    const totalCompraElement = document.getElementById("totalCompra");
    const metodoPagoSelect = document.getElementById("metodoPago");

    let totalCompra = 0;
    let cantidadTotalItems = 0;

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Función para guardar el carrito en localStorage
    function guardarCarritoEnLocalStorage() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    productos.forEach(producto => {
        const productoElement = crearProductoElement(producto);
        productosContainer.appendChild(productoElement);
    });

    function crearProductoElement(producto) {
        const div = document.createElement("div");
        div.classList.add("item");

        const imagen = document.createElement("img");
        imagen.src = producto.imagen;

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

        div.appendChild(imagen);
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
            if (cantidad > 0 && producto.disponible) {
                const metodoPago = metodoPagoSelect.value;
                let precioProducto = producto.precio;

                if (metodoPago === "tarjeta") {
                    precioProducto += precioProducto * 0.10;
                }

                const totalProducto = precioProducto * cantidad;

                const comida = producto.nombre;
                const listItem = document.createElement("li");
                const cantidadItem = document.createElement("span");
                cantidadItem.textContent = `${cantidad} ${comida}(s) - $${totalProducto.toFixed(2)}`;

                const aumentarCantidadBtn = document.createElement("button");
                aumentarCantidadBtn.textContent = "+";
                const disminuirCantidadBtn = document.createElement("button");
                disminuirCantidadBtn.textContent = "-";
                const eliminarBtn = document.createElement("button");
                eliminarBtn.textContent = "x";

                aumentarCantidadBtn.addEventListener("click", () => {
                    cantidadInput.value = parseInt(cantidadInput.value) + 1;
                    cantidadItem.textContent = `${cantidadInput.value} ${comida}(s) - $${(precioProducto * parseInt(cantidadInput.value)).toFixed(2)}`;
                    totalCompra = calcularTotalCompra();
                    actualizarTotal();
                });

                disminuirCantidadBtn.addEventListener("click", () => {
                    const cantidad = parseInt(cantidadInput.value);
                    if (cantidad > 1) {
                        cantidadInput.value = cantidad - 1;
                        cantidadItem.textContent = `${cantidadInput.value} ${comida}(s) - $${(precioProducto * parseInt(cantidadInput.value)).toFixed(2)}`;
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

                totalCompra += totalProducto;
                cantidadTotalItems += cantidad;
                actualizarTotal();
                cantidadInput.value = "0";

                const carritoItem = { producto, cantidad, metodoPago };
                carrito.push(carritoItem);
                guardarCarritoEnLocalStorage();
            } else {
                alert("No se puede agregar el producto al carrito. Verifica la cantidad y la disponibilidad.");
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
        if (cantidadTotalItems > 5 && metodoPagoSelect.value === "efectivo") {
            descuento = totalCompra * 0.10;
        }

        let recargo = 0;
        if (metodoPagoSelect.value === "tarjeta") {
            recargo = totalCompra * 0.10;
        }

        const resumenCompra = obtenerResumenCompra();
        const totalConDescuento = (totalCompra - descuento + recargo).toFixed(2);
        const costoEnvío = cantidadTotalItems >= 10 ? "Gratis" : "$5.00";

        const ventanaEmergente = window.open("", "Resumen de Compra", "width=400,height=300");
        ventanaEmergente.document.write("<h1 style='color: blue;'>Resumen de Compra</h1>");
        ventanaEmergente.document.write(resumenCompra);
        ventanaEmergente.document.write(`<p>Descuento: $${descuento.toFixed(2)}</p>`);
        ventanaEmergente.document.write(`<p>Recargo: $${recargo.toFixed(2)}</p>`);
        ventanaEmergente.document.write(`<p>Total con Descuento: $${totalConDescuento}</p>`);
        ventanaEmergente.document.write(`<p> Costo de Envío: ${costoEnvío}</p>`);
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

    function mostrarProductos(productosMostrados) {
        productosContainer.innerHTML = ""; // Elimina productos anteriores
        productosMostrados.forEach(producto => {
            const productoElement = crearProductoElement(producto);
            productosContainer.appendChild(productoElement);
        });
    }

    mostrarProductos(productos);

    function filtrarProductosPorNombre(nombre) {
        const productosMostrados = productos.filter(producto =>
            producto.nombre.toLowerCase().includes(nombre.toLowerCase())
        );
        mostrarProductos(productosMostrados);
    }

    // Botones de filtrado
    const btnHamburguesa = document.getElementById("btnHamburguesa");
    const btnGaseosa = document.getElementById("btnGaseosa");
    const btnPapas = document.getElementById("btnPapas");
    const btnTodos = document.getElementById("btnTodos");

    btnHamburguesa.addEventListener("click", () => {
        filtrarProductosPorNombre("Hamburguesa");
    });

    btnGaseosa.addEventListener("click", () => {
        filtrarProductosPorNombre("Gaseosa");
    });

    btnPapas.addEventListener("click", () => {
        filtrarProductosPorNombre("Papas");
    });

    btnTodos.addEventListener("click", () => {
        mostrarProductos(productos);
    });
});
