const shopContent = document.getElementById("shopContent");
const cart = [];


productos.forEach((product) =>{
    const content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img class "imagenes" src="${product.img}">
    <h3>${product.productName}</h3>
    <h3>${product.categoria}</h3>
    <p class "price">${product.price} $</p></>
    `;
    shopContent.append(content);

    const buyButton = document.createElement("button")
    buyButton.innerText = "Agregar al carrito";

    content.append(buyButton);

    buyButton.addEventListener("click", ()=>{
        const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);

        if(repeat){
            cart.map((prod) => {
                if(prod.id === product.id){
                    prod.quanty++;
                    displayCartCounter();
                }
            });
        }else{
            cart.push({
                id:product.id,
                productName: product.productName,
                categoria : product.categoria,
                price: product.price,
                quanty: product.quanty,
                img : product.img,
            });
            displayCartCounter();
        }
    });
});