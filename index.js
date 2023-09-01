
const burguerCh = 12.5;
const burguerCl = 7.5;
const burguerVe = 8.5;
let cantidad = 0;
let algoMas = 1;
let total = 0;
function sumarProductos(cantidad, precioUnitario) {
	return cantidad * precioUnitario;
}

alert("Bienvenido a Burger Company. Elija un producto para agregar al carrito:");

do {
	const menu = parseInt(
		prompt(
			"1: Hamburguesa Cheddar y bacon - 12.50 USD\n" +
				"2: Hamburguesa clásica - 7.50 USD\n" +
				"3: Hamburguesa Veggie - 8.50 USD\n" +
				"Ingrese el número de su elección:",
		),
	);

	if (menu === 1 || menu === 2 || menu === 3) {
		cantidad = parseInt(prompt("¿Cuántas hamburguesas desea?"));

		let precioTotal = 0;
    

		if (menu === 1) {
			precioTotal = sumarProductos(cantidad, burguerCh);
		} else if (menu === 2) {
			precioTotal = sumarProductos(cantidad, burguerCl);
		} else if (menu === 3) {
			precioTotal = sumarProductos(cantidad, burguerVe);
		}
		total += precioTotal;
		alert("El precio total es: " + precioTotal + " USD");
	} else {
		alert("Opción no válida. Por favor, elija una opción del menú.");
	}

	algoMas = parseInt(prompt("¿Desea agregar algo más? (1 = sí, 2 = no)"));
} while (algoMas === 1);

alert(`Su compra es de USD${total}`);