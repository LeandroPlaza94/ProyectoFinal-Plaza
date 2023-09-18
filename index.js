// Obtener elementos de comida y agregar eventos
const items = document.querySelectorAll('.item');
const itemsCarritoElement = document.getElementById("itemsCarrito");
const totalCompraElement = document.getElementById("totalCompra");
const tipoPagoEfectivo = document.getElementById("pagoEfectivo");
const tipoPagoTarjeta = document.getElementById("pagoTarjeta");

let totalCompra = 0;

// Función para actualizar el total
function actualizarTotal() {
    if (tipoPagoEfectivo.checked) {
        totalCompraElement.value = totalCompra.toFixed(2);
    } else if (tipoPagoTarjeta.checked) {
        const totalConRecargo = totalCompra * 1.1; // Aplicar un recargo del 10%
        totalCompraElement.value = totalConRecargo.toFixed(2);
    }
}

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
            listItem.textContent = `${cantidad} ${comida}(s) - $${(precio * cantidad).toFixed(2)}`;
            itemsCarritoElement.appendChild(listItem);

            // Actualizar el total al agregar al carrito
            totalCompra += precio * cantidad;
            actualizarTotal();
        }
    });
});

// Actualizar el total cuando cambia la opción de pago
tipoPagoEfectivo.addEventListener("change", actualizarTotal);
tipoPagoTarjeta.addEventListener("change", actualizarTotal);
