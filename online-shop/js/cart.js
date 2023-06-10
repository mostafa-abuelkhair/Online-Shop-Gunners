
import {getAndRender,productStorage} from "./modules.js";

class cart_productStorage extends productStorage{

  products_arr=[];

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
        <td class="align-middle">$${product.quantity*(product.price-(product.price*product.discount))}</td>
        <td class="align-middle">
          <button class="btn btn-sm btn-danger" type="button" onclick="cart.removeAndRender('${product._id}')">
            <i class="fa fa-times"></i>
          </button>
        </td>
        </tr>
        `;
    }
  document.getElementById("products").innerHTML=htm;

  let total= this.products_arr.reduce( (t,p)=>{return t+p.quantity*(p.price-(p.price*p.discount))},0 );
  document.getElementById("sub-total").innerHTML = "$"+total;
  
  }


}



let cart = new cart_productStorage("cart");
window.cart = cart;
let fav = new productStorage("fav");
window.fav = fav;


let cart_products = new getAndRender("http://localhost:5000/api/products/");

cart_products.render= function(d){

  cart.products_arr = d.filter(p=>cart.productSet.has(p._id));
  cart.products_arr.forEach((e)=>{e.quantity=0});
  cart.render();
}

cart_products.get();