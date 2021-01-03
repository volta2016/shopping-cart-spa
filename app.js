const openCart = document.querySelector('.cart__icon')
const closeCart = document.querySelector('.close__cart')
const productDOM = document.querySelector('.product__center')
const cartDOM = document.querySelector('.cart_center')

let cart = [];

let buttonDOM = []


// UI
class UI {

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
      const data = await results.json()
      console.log(data)
    } catch(err) {
      console.log(err)
    }
  }
}

document.addEventListener('DOMContentLoaded', async() => {
  const ui = new UI();
  const products = new Products();
  const productsOject = await products.getProduct();
  
});