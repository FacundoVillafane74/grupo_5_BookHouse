function setCarritoVacio() {
    cartRows.innerHTML = `
      <tr>     
          <td colspan="5"><div class="alert alert-warning my-2 text-center">No tienes products en el carrito</div></td>
      </tr>            
      `;
}
function vaciarCarrito() {
    localStorage.removeItem("carrito");
}

function calcularTotal(products) {
    return products.reduce((acum, product) => (acum += Number(product.price) * Number(product.quantity)), 0 );
};

function removeItem(index) {
  let carrito = JSON.parse(localStorage.getItem('carrito'));
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  location.reload();
};

function sumQuantity(index) {
  let carrito = JSON.parse(localStorage.getItem('carrito'));
  carrito[index].quantity++
  localStorage.setItem('carrito', JSON.stringify(carrito));
  location.reload();
};

function resQuantity(index) {
  let carrito = JSON.parse(localStorage.getItem('carrito'));
  carrito[index].quantity == 1 ?  carrito[index].quantity = 1 : carrito[index].quantity--
  localStorage.setItem('carrito', JSON.stringify(carrito));
  location.reload();
};

let cartRows = document.querySelector('.cartRows');
let totalAmount = document.querySelector('.totalAmount');

let products = [];

let fetchProducts = async (item, index) => {
    try{
      let response = await fetch('/product/api/' + item.id + '/detail');
      let data = await response.json();
      let product = data.product
      if(product) {
        cartRows.innerHTML += ` 
        <button class="cerrar-2" onclick=removeItem(${index})>
                <i class="fa-sharp fa-regular fa-circle-xmark fa-2x""></i>
        </button>
        <section class="caja">
                <div class="imagen"> <img src="/images/products/${product.image}" alt="Nombre del Libro" width="150vw"></div>
                <ul class="texto">
                    <li class="nombre">${product.name}</li>
                    <li class="autor">${product.author}</li>
                    <li class="cantidad">
                        <button class="botoncarrito margin-top" onclick=resQuantity(${index})>-</button>
                        <span class="inputCantidad margin-top">${item.quantity}</span>
                        <button class="botoncarrito margin-top" onclick=sumQuantity(${index})>+</button>
                        <button class='btn btn-danger btn-sm' onclick=removeItem(${index})><i class="fa-solid fa-trash"></i></button>
                    <li class="botonesFyD">
                    <button class="Fisico">Fisico</button>
                    <button class="Digital">Digital</button></li></li>
                    <li class="precio">$${parseFloat(product.price * item.quantity, 2).toFixed(2)}</li>
                </ul>
            </section>
        `;
        products.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: item.quantity
        });
      } else {
        let carrito = JSON.parse(localStorage.carrito);
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
      }
    } catch {
      console.log(error);
    }
    totalAmount.innerText = `$${calcularTotal(products)}`
  }

if(localStorage.carrito) {
    let carrito = JSON.parse(localStorage.carrito);
    carrito.forEach((item, index) => {
        fetchProducts(item, index)
})
};

let checkoutCart = document.querySelector('#checkoutCart');

let postFetch = async (formData) => {
  try {
    let response = await fetch('/product/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData)
    });
    let data = await response.json();
    console.log(data);
    console.log(products);
    if(data.ok) {
      vaciarCarrito()
      location.href = '/product/order/' + data.order.id
    }
  } catch (error) {
    console.log(error);
  }
}

checkoutCart.addEventListener('submit', e => {
  e.preventDefault();
  const formData = {
    orderItems: products,
    shippingMethod: checkoutCart.shippingMethod.value,
    paymentMethod: checkoutCart.paymentMethod.value,
    total: calcularTotal(products)
  }

  console.log(formData);

  postFetch(formData);
  });