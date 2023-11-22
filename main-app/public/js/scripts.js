window.addEventListener('load', () => {
    let buttonsBuy = Array.from(document.querySelectorAll('.agregar_carrito'));
    let cartNumber = document.querySelector('.cart-number');
    cartNumber.innerText = localStorage.carrito ? JSON.parse(localStorage.carrito).length : 0;

    buttonsBuy.forEach(button => {
        button.addEventListener('click', e => {
            if (localStorage.carrito) {
                let carrito = JSON.parse(localStorage.carrito);

                let index = carrito.findIndex(prod => prod.id == e.target.dataset.id);

                if(index != -1) {
                    carrito[index].quantity++;
                } else {
                    carrito.push({id: e.target.dataset.id, quantity: 1})
                }
                localStorage.setItem('carrito', JSON.stringify(carrito));
            } else {
                localStorage.setItem('carrito', JSON.stringify([{id: e.target.dataset.id, quantity: 1}]));
            }
            cartNumber.innerText = localStorage.carrito ? JSON.parse(localStorage.carrito).length : 0;
        });
    });
});