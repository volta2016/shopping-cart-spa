const openCart = document.querySelector('.cart__icon');
const closeCart = document.querySelector('.close__cart');
const productDOM = document.querySelector('.product__center');
const cartDOM = document.querySelector('.cart_center');

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
}
// Storage
class Storage {

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
  ui.displayProducts(productsOject)
});