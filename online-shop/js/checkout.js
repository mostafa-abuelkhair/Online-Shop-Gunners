import {getAndRender,productStorage} from "./modules.js";


let cart = new productStorage("cart");
window.cart = cart;
let fav = new productStorage("fav");
window.fav = fav;


class Order {
    user={
    first_name:'',
    last_name:'',
    email:'',
    mobile_number:'',
    address1:'',
    address2:'',
    country:'Egypt',
    city:'',
    state:'',
    zip_code:'',
    }

    valid=true;
    order_details;
    order_subTotal;
    tax=10;

    constructor(){
        this.getOrderDetails();
    }

    update(k,element){

        order.user[k] = element.value;
        if(!this.user[k]){document.getElementById(k+'-v').classList.remove("d-none")}
        else{document.getElementById(k+'-v').classList.add("d-none");}
    }

    placeOrder(){

        this.valid=true;

        for (let k in this.user){

            if(!this.user[k]){
                this.valid=false;
                document.getElementById(k+'-v').classList.remove("d-none");
             }
             
        }

        if(this.valid){ this.postOrder();}
        else{alert("Please fill the empty fileds")}
    }

    postOrder(){

        let token = localStorage.getItem("token");
        

        if (token) {
            
            (async () => {
                const rawResponse = await fetch('http://localhost:5000/api/orders/', {
                  method: 'POST',
                  headers: {
                    "Content-Type": "application/json",
                    'x-access-token': token
                  },
                  body: JSON.stringify({ 
                    "shipping_info": this.user,
                    "sub_total_price": this.subTotal,
                    "shipping": 10,
                    "total_price": this.total,
                    "user_id": "6346ac23bb862e01fe4b6535",
                    "order_date": new Date(),
                    "order_details": this.order_details
                  })
                });
                const content = await rawResponse.json();

                console.log(content);
                alert("Order Placed");
              })();

        }
        else{
            alert("You need to login first");
            window.location.href = "login.html";
        }
        
    }

    renderProducts(){

        let htm=``;

        let htm_products=``
            for(let product of this.order_details ){
                htm_products+=`
                <div class="d-flex justify-content-between">
                    <p> ${product.name}   x (${product.qty})</p>
                    <p>$${product.price}</p>
                </div>          
              `;
            }

            htm+=`
            <div class="border-bottom">
                <h6 class="mb-3">Products</h6>
                ${htm_products}
            </div>
            <div class="border-bottom pt-3 pb-2">
                <div class="d-flex justify-content-between mb-3">
                        <h6>Subtotal</h6>
                        <h6>$${this.subTotal}</h6>
                </div>
                <div class="d-flex justify-content-between">
                    <h6 class="font-weight-medium">Tax</h6>
                    <h6 class="font-weight-medium">$${this.subTotal*this.tax/100}</h6> 
                </div>
                <div class="d-flex justify-content-between">
                    <h6 class="font-weight-medium">Shipping</h6>
                    <h6 class="font-weight-medium">$10</h6> 
                </div>
                
            </div>
            <div class="pt-2">
                <div class="d-flex justify-content-between mt-2">
                    <h5>Total</h5>
                    <h5>$${this.total}</h5> 
                </div>
            </div>
            `
        document.getElementById("order-total").innerHTML=htm;
    }

    getOrderDetails(){
       this.order_details = JSON.parse( localStorage.getItem("order_details") );
       this.subTotal = localStorage.getItem("order_subTotal");
       this.total = Number(this.subTotal)+ 10 + Number(this.subTotal*this.tax/100);
       this.renderProducts()
    }

    updateTax(e,v){
        this.tax= e.checked? v:this.tax;
        this.total = Number(this.subTotal)+ 10 + Number(this.subTotal*this.tax/100);
        this.renderProducts();
    }

    
}

class Sign {
    constructor() {
      this.getToken();
    }
  
    getToken() {
      let token = localStorage.getItem("token");
      if (token) {
        let name = localStorage.getItem("name");
        document.getElementById("sign").innerHTML = `${name}`;
  
        document.getElementById("signout-btn").innerHTML = `
      <i class="fas fa-arrow-right text-primary " style="font-size: 2rem;"></i> `;
        document.getElementById("signin").setAttribute("href", "#");
      }
    }
  
    signout = () => {
      localStorage.removeItem("token");
      window.location.href = "index.html";
      // console.log("token")
    };
  }
  
  const sign = new Sign();
  
  document.getElementById("signout-btn").addEventListener("click", sign.signout);
  


const order = new Order();

window.order = order;




