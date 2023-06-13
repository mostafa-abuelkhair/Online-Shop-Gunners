import { getAndRender, productStorage } from "./modules.js";

let cart = new productStorage("cart");
window.cart = cart;

let fav = new productStorage("fav");
window.fav = fav;

let categories_menu = new getAndRender("http://localhost:5000/api/categories/");

categories_menu.render = (d) => {
  let htm = ``;
  for (let product of d) {
    htm += `
          <a data-id="${product._id}" onclick="getCities(${product._id})" href="products.php?cat_id=${product._id}" class="nav-item nav-link">${product.name}</a>
          `;
  }
  document.getElementById("categories-menu").innerHTML = htm;
};

categories_menu.get();

let categories_section = new getAndRender(categories_menu.url);

categories_section.render = (d) => {
  d.sort(function (a, b) {
    return b.productCount - a.productCount;
  });
  let htm = ``;
  for (let product of d.slice(0, 4)) {
    htm += `
          <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
          <a class="text-decoration-none" href="">
            <div class="cat-item d-flex align-items-center mb-4">
              <div class="overflow-hidden" style="width: 100px; height: 100px">
                <img class="img-fluid" src="${product.image}" alt="" />
              </div>
              <div class="flex-fill pl-3">
                <h6>${product.name}</h6>
                <small class="text-body">${product.productCount} products</small>
              </div>
            </div>
          </a>
        </div>            
        `;
  }
  document.getElementById("categories-section").innerHTML = htm;
};

categories_section.get();

let featured_products = new getAndRender(
  "http://localhost:5000/api/products/getFeatured"
);

featured_products.render = function (d) {
  let htm = ``;
  for (let product of d.slice(0, 8)) {
    htm += `
          <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
          <div class="product-item bg-light mb-4">
            <div class="product-img position-relative overflow-hidden">
              <img class="img-fluid w-100" src="${product.image}" alt="" />
              <div class="product-action">
                <a
                  class="btn btn-outline-dark btn-square"
                  
                  onclick="cart.add('${product._id}')"
                  ><i class="fa fa-shopping-cart"></i
                ></a>
                <a class="btn btn-outline-dark btn-square"  onclick="fav.add('${
                  product._id
                }')"
                  ><i class="far fa-heart"></i
                ></a>
                <a class="btn btn-outline-dark btn-square"  
                  ><i class="fa fa-sync-alt"></i
                ></a>
                <a class="btn btn-outline-dark btn-square" 
                  ><i class="fa fa-search"></i
                ></a>
              </div>
            </div>
            <div class="text-center py-4">
              <a class="h6 text-decoration-none text-truncate" href=""
                >${product.name}</a
              >
              <div
                class="d-flex align-items-center justify-content-center mt-2"
              >
                <h5>$${product.price - product.price * product.discount}</h5>
                <h6 class="text-muted ml-2"><del>$${product.price}</del></h6>
              </div>
              <div
                class="d-flex align-items-center justify-content-center mb-1"
              >
                ${(() => {
                  let r = ``;
                  for (let i = 1; i <= 5; i++) {
                    r += `
                        <small class="fa${
                          product.rating - i >= -0.6 ? "" : "r"
                        } fa-star${
                      i - product.rating == 0.5 ? "-half-alt" : ""
                    } text-primary mr-1"></small>
                      `;
                  }
                  return r;
                })()}
                <small>(${product.rating_count})</small>
              </div>
            </div>
          </div>
        </div> 
        `;
  }

  this.element.innerHTML = htm;
};

featured_products.element = document.getElementById("featured-products");
featured_products.get();

let recent_products = new getAndRender(
  "http://localhost:5000/api/products/getRecent"
);

recent_products.render = featured_products.render;
recent_products.element = document.getElementById("recent-products");

recent_products.get();

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
