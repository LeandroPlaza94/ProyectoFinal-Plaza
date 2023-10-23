
const productos = [
    {
        "nombre": "Hamburguesa Clásica",
        "precio": 5.99,
        "imagen": "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "disponible": true,
        "categoria": "Hamburguesa"
    },
    {
        "nombre": "Hamburguesa BBQ",
        "precio": 6.99,
        "imagen": "https://images.pexels.com/photos/3764353/pexels-photo-3764353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "disponible": true,
        "categoria": "Hamburguesa"
    },
    {
        "nombre": "Hamburguesa Vegana",
        "precio": 7.49,
        "imagen": "https://images.pexels.com/photos/6546021/pexels-photo-6546021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "disponible": false,
        "categoria": "Hamburguesa"
    },
    {
        "nombre": "Papas cheddar-bacon",
        "precio": 4.49,
        "imagen": "https://images.pexels.com/photos/17035133/pexels-photo-17035133/free-photo-of-fries-in-melted-cheese.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "disponible": true,
        "categoria": "Papas"
    },
    {
        "nombre": "Papas Clasicas",
        "precio": 3.49,
        "imagen": "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "disponible": true,
        "categoria": "Papas"
    },
    {
        "nombre": "Gaseosa Sprite",
        "precio": 7.49,
        "imagen": "https://images.pexels.com/photos/17650220/pexels-photo-17650220/free-photo-of-can-of-sprite-on-white-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "disponible": true,
        "categoria": "Gaseosa"
    },
    {
        "nombre": "Gaseosa Coca Cola",
        "precio": 2.49,
        "imagen": "https://images.pexels.com/photos/17650224/pexels-photo-17650224/free-photo-of-can-of-coca-cola.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "disponible": true,
        "categoria": "Gaseosa"
    }
];




document.addEventListener("DOMContentLoaded", function() {


    const productosContainer = document.getElementById("productosContainer");
    const itemsCarritoElement = document.getElementById("itemsCarrito");
    const totalCompraElement = document.getElementById("totalCompra");
    const metodoPagoSelect = document.getElementById("metodoPago");

    let totalCompra = 0;
    let cantidadTotalItems = 0;

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Función para guardar el carrito en localStorage
    function carritoStorage() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    // Función para cargar imágenes usando Fetch
    function cargarImagenes() {
        const promesasImagenes = productos.map(producto => {
            return fetch(producto.imagen)
                .then(response => response.blob())
                .then(blob => {
                    return URL.createObjectURL(blob);
                });
        });

        return Promise.all(promesasImagenes);
    }

    // Función para crear elementos de productos
    function crearProductoElement(producto, imagenUrl) {
        const { nombre, precio, imagen, disponible, categoria } = producto;

        const div = document.createElement("div");
        div.classList.add("item", categoria);

        const imagenElement = document.createElement("img");
        imagenElement.src = imagenUrl;

        const nombreP = document.createElement("p");
        nombreP.textContent = ` ${nombre}`;

        const precioP = document.createElement("p");
        precioP.textContent = `Precio: $${precio.toFixed(2)}`;

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

        div.appendChild(imagenElement);
        div.appendChild(nombreP);
        div.appendChild(precioP);
        div.appendChild(sumarBtn);
        div.appendChild(restarBtn);
        div.appendChild(cantidadInput);
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
            if (cantidad > 0 && disponible) {
                const metodoPago = metodoPagoSelect.value;
                let precioProducto = precio;

                if (metodoPago === "tarjeta") {
                    precioProducto += precioProducto * 0.10;
                }

                const totalProducto = precioProducto * cantidad;

                const comida = nombre;
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

                const carritoItem = { ...producto, cantidad, metodoPago };

                const carritoCopia = [...carrito];
                carritoCopia.push(carritoItem);

                carrito = carritoCopia;
                carritoStorage();
            } else {
                alert("No se puede agregar el producto al carrito. Verifica la cantidad y la disponibilidad.");
            }
        });

        return div;
    }

    cargarImagenes().then(imagenes => {
        productos.forEach((producto, index) => {
            const productoElement = crearProductoElement(producto, imagenes[index]);
            productosContainer.appendChild(productoElement);
        });
    });

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
        if ((cantidadTotalItems >= 5 && metodoPagoSelect.value === "efectivo") || (cantidadTotalItems >= 10 && metodoPagoSelect.value === "tarjeta")) {
            descuento = totalCompra * 0.05;
        }

        let recargo = 0;
        if (metodoPagoSelect.value === "tarjeta") {
            recargo = totalCompra * 0.10;
        }

        const resumenCompra = obtenerResumenCompra();
        const totalConDescuento = (totalCompra - descuento + recargo).toFixed(2);
        const costoEnvío = cantidadTotalItems >= 10 ? "Gratis" : "$5.00";

        // Mostrar el resumen de compra en un modal SweetAlert
        Swal.fire({
            icon: "info",
            title: "Resumen de Compra",
            html: resumenCompra + `<p>Descuento: $${descuento.toFixed(2)}</p><p>Recargo: $${recargo.toFixed(2)}</p><p>Total con Descuento: $${totalConDescuento}</p><p>Costo de Envío: ${costoEnvío}</p>`,
        });
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

    // Botones de filtro
    const btnHamburguesa = document.getElementById("btnHamburguesa");
    const btnGaseosa = document.getElementById("btnGaseosa");
    const btnPapas = document.getElementById("btnPapas");
    const btnTodos = document.getElementById("btnTodos");


    btnHamburguesa.addEventListener("click", () => filtrarProductos("Hamburguesa"));
    btnGaseosa.addEventListener("click", () => filtrarProductos("Gaseosa"));
    btnPapas.addEventListener("click", () => filtrarProductos("Papas"));
    btnTodos.addEventListener("click", () => filtrarProductos("Todos"));

    function filtrarProductos(categoria) {
        // Muestra u oculta elementos según la categoría seleccionada
        const items = productosContainer.querySelectorAll(".item");
        items.forEach(item => {
            if (categoria === "Todos" || item.classList.contains(categoria)) {
                item.style.display = "block";
            } else {item.style.display = "none";
            }
        });
    }
});
