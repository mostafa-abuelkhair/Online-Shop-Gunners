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
    mobile:'',
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

    constructor(){
        getOrderDetails();
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
        else{alert("Please fill empty fileds")}
    }

    postOrder(){
        alert("ok");
    }

    renderProducts(){

        let htm=``;

            for(let product of d ){
                htm+=`
                <h6 class="mb-3">Products</h6>
                <div class="d-flex justify-content-between">
                    <p>Product Name 1   x (2)</p>
                    <p>$150</p>
                </div>
                <div class="d-flex justify-content-between">
                    <p>Product Name 2   x (1)</p>
                    <p>$150</p>
                </div>
                <div class="d-flex justify-content-between">
                    <p>Product Name 3 x (3)</p>
                    <p>$150</p>
                </div>           
              `;
            }
        document.getElementById("products").innerHTML=htm;
    }

    getOrderDetails(){
       this.order_details = JSON.stringify( localStorage.getItem("order_details") );
       this.subTotal = localStorage.getItem("subTotal");
    }

}



const order = new Order(cart);

window.order = order;




