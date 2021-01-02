const openCart = document.querySelector('.cart__icon')
const openCart = document.querySelector('.close__cart')
const productDOM = document.querySelector('.product__center')
const cartDOM = document.querySelector('.cart_center')


// UI
class Ui {

}
// Storage
class Storage {

}
// Products
class Products {
  // fetch API link
  async getProduct(){
    try{
      const results = await fetch('products.json')
      const data = results.json()
      console.log(data)
    } catch {
      console.log(error)
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI()
  const products = new Products()
  const productsOject
  
}