
import {getAndRender,productStorage} from "./modules.js";


class cart_productStorage extends productStorage{

  products_arr=[];
  subTotal = 0;

  removeAndRender(p){
    this.remove(p);
    this.products_arr = this.products_arr.filter(p=>this.productSet.has(p._id));
    this.render();
  }

  increment(i){
    this.products_arr[i].quantity++;
    this.render();
  }

  decrement(i){
    if(this.products_arr[i].quantity){this.products_arr[i].quantity--;}
    this.render();
  }

  setQuantity(v,i){
    this.products_arr[i].quantity= v;
    this.render();
  }

  render(){
    let htm=``;
    for(let [i, product] of this.products_arr.entries()){
        htm+=`
        <tr>
        <td class="align-middle">
          <img src="${product.image}" alt="" style="width: 50px" />
          ${product.name}
        </td>
        <td class="align-middle">$${product.price-(product.price*product.discount)}</td>
        <td class="align-middle">
          <div
            class="input-group quantity mx-auto"
            style="width: 100px"
          >
            <div class="input-group-btn">
              <button
                type="button"
                class="decBtn btn btn-sm btn-primary btn-minus"
                onclick="cart.decrement(${i})"
              >
                <i class="fa fa-minus"></i>
              </button>
            </div>
            <input
              type="text"
              class="quantityVal form-control form-control-sm bg-secondary border-0 text-center"
              value="${product.quantity}"
              onchange="cart.setQuantity(this.value,${i})"
            />
            <div class="input-group-btn">
              <button
                type="button"
                class="incBtn btn btn-sm btn-primary btn-plus"
                onclick="cart.increment(${i})"
              >
                <i class="fa fa-plus"></i>
              </button>
            </div>
          </div>
        </td>
        <td class="align-middle">$${(product.quantity*(product.price-(product.price*product.discount))).toFixed(2)}</td>
        <td class="align-middle">
          <button class="btn btn-sm btn-danger" type="button" onclick="cart.removeAndRender('${product._id}')">
            <i class="fa fa-times"></i>
          </button>
        </td>
        </tr>
        `;
    }
  document.getElementById("products").innerHTML=htm;

  this.subTotal= this.products_arr.reduce( (t,p)=>{return t+p.quantity*(p.price-(p.price*p.discount))},0 ).toFixed(2);
  document.getElementById("sub-total").innerHTML = "$"+this.subTotal;
  
  }

  order(){

    let order_details = this.products_arr.map( (p)=> { return { name:p.name ,product_id:p._id, qty:p.quantity, price:p.price-(p.price*p.discount)} } )

    localStorage.setItem("order_details", JSON.stringify(order_details));

    localStorage.setItem("order_subTotal", this.subTotal);

    window.location.href = 'checkout.html';
  }


}

let cart = new cart_productStorage("cart");
window.cart = cart;

let fav = new productStorage("fav");
window.fav = fav;



let cart_products = new getAndRender("http://localhost:5000/api/products/");

cart_products.render= function(d){

  cart.products_arr = d.filter(p=>cart.productSet.has(p._id));
  cart.products_arr.forEach((e)=>{e.quantity=1});
  cart.render();
}

cart_products.get();



let categories_menu = new getAndRender("http://localhost:5000/api/categories/");

categories_menu.render= (d)=>{
  let htm=``;
      for(let product of d ){
          htm+=`
          <a data-id="${product._id}" onclick="getCities(${product._id})" href="products.php?cat_id=${product._id}" class="nav-item nav-link">${product.name}</a>
          `;
      }
  document.getElementById("categories-menu").innerHTML=htm;
}

categories_menu.get();

let token = localStorage.getItem("token");
if(token){
  let name = localStorage.getItem("name");
  document.getElementById("sign").innerHTML = `${name}`;

  document.getElementById("signout-btn").innerHTML =`
    <i class="fas fa-arrow-right text-primary " style="font-size: 2rem;"></i> `
    document.getElementById("signin").setAttribute("href", "#");

};

const signout = function() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
  // console.log("token")
};
document.getElementById("signout-btn").addEventListener("click", signout);
