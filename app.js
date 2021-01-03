const openCart = document.querySelector('.cart__icon');
const closeCart = document.querySelector('.close__cart');
const productDOM = document.querySelector('.product__center');
const cartDOM = document.querySelector('.cart__center');
const itemsTotal = document.querySelector('.item__total');
const cartTotal = document.querySelector('.cart__total')

let cart = [];

let buttonDOM = []


// UI
class UI {
  displayProducts(obj) {
    console.log(obj)
    let results = '';
    obj.forEach(({id, title, price, image }) => {
      results += `
      <div class="product">
      <div class="image__container">
        <img src="${image}" alt="" />
      </div>
      <div class="product__footer">
        <h1>${title}</h1>
        <div class="rating">
          <span>
            <svg>
              <use xlink:href="./images/sprite.svg#icon-star-full"></use>
            </svg>
          </span>
          <span>
            <svg>
              <use xlink:href="./images/sprite.svg#icon-star-full"></use>
            </svg>
          </span>
          <span>
            <svg>
              <use xlink:href="./images/sprite.svg#icon-star-full"></use>
            </svg>
          </span>
          <span>
            <svg>
              <use xlink:href="./images/sprite.svg#icon-star-full"></use>
            </svg>
          </span>
          <span>
            <svg>
              <use xlink:href="./images/sprite.svg#icon-star-empty"></use>
            </svg>
          </span>
        </div>
        <div class="bottom">
          <div class="btn__group">
            <a href="#" class="btn addToCart" data-id=${id}>Add to Cart</a>
            <a href="#" class="btn view">View</a>
          </div>
          <div class="price">$${price}</div>
        </div>
      </div>
    </div>
      `
    });

    productDOM.innerHTML = results;
  }
  getButtons() {
    const buttons = [...document.querySelectorAll('.addToCart')];
    // console.log(buttons);
    buttonDOM = buttons;
    buttons.forEach(button => {
      const id = button.dataset.id
      const inCart = cart.find(item => item.id === id)

      if(inCart) {
        button.innerText = 'In Cart';
        button.disable = false;
      }

      button.addEventListener('click', e => {
        e.preventDefault;
        e.target.innerText = 'In Cart';
        e.target.disable = false;
        // Get product from product
        const cartItem = {...Storage.getProducts(id), amount: 1};
        console.log(cartItem);
        // Add the product to cart
        cart = [...cart, cartItem]
        // Store the product in local Storage
        Storage.saveCart(cart);
        // setItemValues
        this.setItemValues(cart);
        // display the item in the cart
        this.addToCart(cartItem);
      });
      console.log(button)
    });
  }

  setItemValues(cart) {
    let temTotal = 0;
    let itemTotal = 0;

    cart.map(item => {
      temTotal += item.price * item.amount;
      itemTotal += item.amount;
    });
    itemsTotal.innerText = itemTotal;
    cartTotal.innerText = parseFloat(temTotal.toFixed(2));
  }

  addToCart({title, price, image, id}) {
    let modal = document.createElement('div');
    modal.classList.add('cart__item')
    modal.innerHTML = `
      <img src=${image}>
      <div>
        <h3>${title}</h3>
        <h3 class="price">$${price}</h3>
      </div>
      <div>
        <span class="increase" data-id=${id}>
          <svg>
            <use xlink:href="./images/sprite.svg#icon-angle-up"></use>
          </svg>
        </span>
        <p class="item__amount">1</p>
        <span class="decrease" data-id=${id}>
          <svg>
            <use xlink:href="./images/sprite.svg#icon-angle-down"></use>
          </svg>
        </span>
      </div>
        <span class="remove__item" data-id=${id}>
          <svg>
            <use xlink:href="./images/sprite.svg#icon-trash"></use>
          </svg>
        </span>
      </div>
    `

    cartDOM.appendChild(modal);

  }
}
// Storage
class Storage {
  static saveProducts(obj) {
    localStorage.setItem('products', JSON.stringify(obj));
  }

  static saveCart(cart) {
    localStorage.setItem('carts', JSON.stringify(cart));
  } 

  static getProducts(id) {
    const products = JSON.parse(localStorage.getItem('products'));
    return products.find(item => item.id === parseInt(id));
  }
}
// Products
class Products {
  // fetch API link
  async getProduct(){
    try {
      const results = await fetch('products.json')
      const data = await results.json();
      const products = data.items;
      // console.log(products);
      return products;
    } catch(err) {
      console.log(err);
    }
  }
}

document.addEventListener('DOMContentLoaded', async() => {
  const ui = new UI();
  const products = new Products();
  const productsOject = await products.getProduct();
  ui.displayProducts(productsOject);
  ui.getButtons();
  Storage.saveProducts(productsOject);
});