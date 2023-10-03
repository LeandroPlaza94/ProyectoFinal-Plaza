// Obtener elementos de comida y agregar eventos
const items = document.querySelectorAll('.item');
const itemsCarritoElement = document.getElementById("itemsCarrito");
const totalCompraElement = document.getElementById("totalCompra");

let totalCompra = 0;

items.forEach(item => {
    const precio = parseFloat(item.querySelector('p:nth-child(2)').textContent.split("$")[1]);
    const sumarBtn = item.querySelector('.sumarBtn');
    const restarBtn = item.querySelector('.restarBtn');
    const agregarCarritoBtn = item.querySelector('.agregarCarritoBtn');
    const cantidadElement = item.querySelector('.cantidadElement');
    let cantidad = 0;

    sumarBtn.addEventListener("click", () => {
        cantidad++;
        cantidadElement.value = cantidad;
    });

    restarBtn.addEventListener("click", () => {
        if (cantidad > 0) {
            cantidad--;
            cantidadElement.value = cantidad;
        }
    });

    agregarCarritoBtn.addEventListener("click", () => {
        if (cantidad > 0) {
            const comida = item.querySelector('p:nth-child(1)').textContent.split(": ")[1];
            const listItem = document.createElement("li");
            const cantidadItem = document.createElement("span");
            cantidadItem.textContent = `${cantidad} ${comida}(s) - $${(precio * cantidad).toFixed(2)}`;
            
            // Botones para modificar la cantidad en el carrito
            const aumentarCantidadBtn = document.createElement("button");
            aumentarCantidadBtn.textContent = "+";
            const disminuirCantidadBtn = document.createElement("button");
            disminuirCantidadBtn.textContent = "-";

            // Eventos para aumentar y disminuir la cantidad en el carrito
            aumentarCantidadBtn.addEventListener("click", () => {
                cantidad++;
                cantidadElement.value = cantidad;
                cantidadItem.textContent = `${cantidad} ${comida}(s) - $${(precio * cantidad).toFixed(2)}`;
                totalCompra = calcularTotalCompra();
                actualizarTotal();
            });

            disminuirCantidadBtn.addEventListener("click", () => {
                if (cantidad > 1) {
                    cantidad--;
                    cantidadElement.value = cantidad;
                    cantidadItem.textContent = `${cantidad} ${comida}(s) - $${(precio * cantidad).toFixed(2)}`;
                    totalCompra = calcularTotalCompra();
                    actualizarTotal();
                }
            });

            listItem.appendChild(cantidadItem);
            listItem.appendChild(aumentarCantidadBtn);
            listItem.appendChild(disminuirCantidadBtn);
            itemsCarritoElement.appendChild(listItem);

            totalCompra += precio * cantidad;
            actualizarTotal();
            cantidadElement.value = 0;
        }
    });
});

// Función para calcular el total de la compra
function calcularTotalCompra() {
    let total = 0;
    const itemsCarrito = itemsCarritoElement.querySelectorAll("li");
    itemsCarrito.forEach(item => {
        const precio = parseFloat(item.textContent.split("$")[1]);
        total += precio;
    });
    return total;
}

// Función para actualizar el total en la interfaz
function actualizarTotal() {
    totalCompraElement.textContent = totalCompra.toFixed(2);
}

// Obtén el botón "Finalizar Compra"
const finalizarCompraBtn = document.getElementById("finalizarCompraBtn");

// Maneja el clic en el botón "Finalizar Compra"
finalizarCompraBtn.addEventListener("click", () => {
    // Crea una ventana emergente con el resumen de la compra
    const resumenCompra = obtenerResumenCompra();
    const ventanaEmergente = window.open("", "Resumen de Compra", "width=400,height=300");
    ventanaEmergente.document.write("<h1>Resumen de Compra</h1>");
    ventanaEmergente.document.write(resumenCompra);
    ventanaEmergente.document.close();
});

// Función para obtener el resumen de compra
function obtenerResumenCompra() {
    const itemsCarrito = itemsCarritoElement.querySelectorAll("li");
    let resumen = "Resumen de Compra:\n\n";
    let total = 0;

    itemsCarrito.forEach(item => {
        const textoItem = item.textContent.replace(/\+|\-/g, ""); // Elimina + y -
        const precioItem = parseFloat(textoItem.split("$")[1]);
        total += precioItem;
        resumen += `${textoItem}\n`;
    });

    resumen += `\nTotal: $${total.toFixed(2)}`;
    return resumen;
}



