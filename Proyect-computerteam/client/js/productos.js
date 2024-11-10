const productos = [
    {
        id: 1,
        productName: "Pelota champions",
        price: 55000,
        quanty: 1,
        img: "./img-products/pelotafutbol.png",
        categoria:"Futbol",
    },
    {
        id: 2,
        productName: "Pelota NBA",
        price: 40000,
        quanty: 1,
        img: "./img-products/pelotabasquet.png",
        categoria:"Basquet"
    },
    {
        id: 3,
        productName: "Remera deportiva Adidas hombre",
        price: 40999,
        quanty: 1,
        img: "./img-products/remera-adidas.jpg",
        categoria:"Indumentaria",
    },
    {
        id: 4,
        productName: "Pelotas de tenis x3",
        price: 13500,
        quanty: 1,
        img: "./img-products/pelotastenis.png",
        categoria:"Tenis",
    },
    {
        id: 5,
        productName: "Raqueta de tenis babolat",
        price: 272500,
        quanty: 1,
        img: "./img-products/raqueta.png",
        categoria:"Tenis",
    },
    {
        id: 6,
        productName: "Gorra dama rosada",
        price: 31299,
        quanty: 1,
        img: "./img-products/gorra.jpeg",
        categoria:"Accesorios",
    },
    {
        id: 7,
        productName: "Paleta de padel Wilson Bela Pro",
        price: 459000,
        quanty: 1,
        img: "./img-products/paleta.png",
        categoria: "Padel",
    },
    {
        id: 8,
        productName: "Short Wilson hombre",
        price: 31299,
        quanty: 1,
        img: "./img-products/short.png",
        categoria:"Indumentaria",
    },

];

const productContainer = document.getElementById('productContainer');

// Función para mostrar los productos en la página
function mostrarProductos() {
    productos.forEach(producto => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${producto.img}" alt="${producto.productName}" class="product-img">
            <div class="product-info">
                <h3>${producto.productName}</h3>
                <p>Categoría: ${producto.categoria}</p>
                <p>Precio: $${producto.price}</p>
                <p>Cantidad: ${producto.quanty}</p>
            </div>
    `;

        productContainer.appendChild(productCard);
}
)};

// Llamamos a la función para mostrar los productos cuando se cargue la página
document.addEventListener('DOMContentLoaded', mostrarProductos);
