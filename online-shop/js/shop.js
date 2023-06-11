class categories {
  constructor() {}

  get = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/categories/");

      const result = await response.json();

      const data = result.data;
      localStorage.setItem("categories", JSON.stringify(data));
      console.log(data);
      this.renderCategories(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  renderCategories = (categoriesData) => {
    let cathtml = ``;
    for (let i = 0; i < categoriesData.length; i++) {
      const category = categoriesData[i];

      cathtml += `
            <a href="" class="nav-item nav-link">${category.name}</a>
            `;
    }
    document.getElementById("cat-menu").innerHTML = cathtml;
  };
}

const asas = new categories();

asas.get();

// fetch("http://localhost:5000/api/categories/")
//   .then((res) => res.json())
//   .then((body) => body.data)
//   .then((data) => {
//     localStorage.setItem("categories", JSON.stringify(data));
//   });

// // console.log(localStorage.getItem("categories"));

// const categories = localStorage.getItem("categories");

// const cat = JSON.parse(categories);

// function renderCategories(categoriesData) {
//   let cathtml = ``;
//   for (let i = 0; i < categoriesData.length; i++) {
//     const category = categoriesData[i];

//     cathtml += `
//             <a href="" class="nav-item nav-link">${category.name}</a>
//             `;
//   }
//   document.getElementById("cat-menu").innerHTML = cathtml;
// }

// renderCategories(cat);
const sortPrice = document.getElementById("sort-price");
const sortRating = document.getElementById("sort-rating");
const sortPopularity = document.getElementById("sort-Popularity");
// products = localStorage.getItem("products");
// aaa = JSON.parse(products);

class Shop {
  aaa;
  cartItems;
  lovedItems;
  constructor() {
    const products = localStorage.getItem("products");
    this.lovedItems = [];
    this.cartItems = [];

    this.aaa = JSON.parse(products);
  }

  get = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");

      const result = await response.json();

      const data = result.data;
      localStorage.setItem("products", JSON.stringify(data));
      this.renderProducts(this.aaa);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  renderProducts = (productsData) => {
    let productHTML = "";
    for (let i = 0; i < productsData.length; i++) {
      const product = productsData[i];
      // console.log(product);
      productHTML += `
        <div class="col-lg-4 col-md-6 col-sm-6 pb-1">
          <div class="product-item bg-light mb-4">
            <div class="product-img position-relative overflow-hidden">
              <img class="img-fluid w-100" src="${product.image}" alt="${
        product.name
      }">
              <div class="product-action">
                <a class="btn btn-outline-dark btn-square" id="btn-cart" onclick="shop.addToCart('${
                  product._id
                }')"><i class="fa fa-shopping-cart"></i></a>
                <a class="btn btn-outline-dark btn-square" id="btn-love" onclick="shop.addToLove('${
                  product._id
                }')"><i class="far fa-heart"></i></a>
                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
              </div>
            </div>
            <div class="text-center py-4">
              <a class="h6 text-decoration-none text-truncate" href="">${
                product.name
              }</a>
              <div class="d-flex align-items-center justify-content-center mt-2">
                <h5>$${product.price}</h5>
                <h6 class="text-muted ml-2"><del>$${
                  product.price + product.price * product.discount
                }</del></h6>
              </div>
              <div class="d-flex align-items-center justify-content-center mb-1">
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small>${product.rating_count}</small>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    document.getElementById("products").innerHTML = productHTML;
  };

  sortByPrice = () => {
    const sorted = this.aaa.sort((a, b) => {
      return a.price - b.price;
    });
    this.renderProducts(sorted);
  };

  sortByPopularity = () => {
    const sorted = this.aaa.sort((a, b) => {
      return a.rating_count - b.rating_count;
    });
    this.renderProducts(sorted);
  };

  sortByRating = () => {
    const sorted = this.aaa.sort((a, b) => {
      return a.rating - b.rating;
    });
    this.renderProducts(sorted);
  };

  addToCart = (product) => {
    const cart = document.getElementById("btn-cart");

    if (!this.cartItems.includes(product)) {
      this.cartItems.push(product);
      cart.classList.add("bbb");
    } else if (this.cartItems.includes(product)) {
      this.cartItems.splice(this.cartItems.indexOf(product), 1);
      cart.classList.remove("bbb");
    }
    document.getElementById("shoped-count").innerHTML = this.cartItems.length;
    console.log(this.cartItems);
  };

  addToLove = (product) => {
    const love = document.getElementById("btn-love");
    if (!this.lovedItems.includes(product)) {
      this.lovedItems.push(product);
      love.classList.add("bbb");
    } else if (this.lovedItems.includes(product)) {
      this.lovedItems.splice(this.lovedItems.indexOf(product), 1);
      love.classList.remove("bbb");
    }
    document.getElementById("love-count").innerHTML = this.lovedItems.length;

    console.log(this.lovedItems);
  };
}
const shop = new Shop();
shop.get();

// fetch("http://localhost:5000/api/products")
//   .then((res) => res.json())
//   .then((body) => body.data)
//   .then((data) => {
//     localStorage.setItem("products", JSON.stringify(data));
//   });

// const renderProducts = (productsData) => {
//   let productHTML = "";
//   for (let i = 0; i < productsData.length; i++) {
//     const product = productsData[i];
//     // console.log(product);
//     productHTML += `
//         <div class="col-lg-4 col-md-6 col-sm-6 pb-1">
//           <div class="product-item bg-light mb-4">
//             <div class="product-img position-relative overflow-hidden">
//               <img class="img-fluid w-100" src="${product.image}" alt="${
//       product.name
//     }">
//               <div class="product-action">
//                 <a class="btn btn-outline-dark btn-square" id="btn-cart" onclick="addToCart('${
//                   product._id
//                 }')"><i class="fa fa-shopping-cart"></i></a>
//                 <a class="btn btn-outline-dark btn-square" id="btn-love" onclick="addToLove('${
//                   product._id
//                 }')"><i class="far fa-heart"></i></a>
//                 <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
//                 <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
//               </div>
//             </div>
//             <div class="text-center py-4">
//               <a class="h6 text-decoration-none text-truncate" href="">${
//                 product.name
//               }</a>
//               <div class="d-flex align-items-center justify-content-center mt-2">
//                 <h5>$${product.price}</h5>
//                 <h6 class="text-muted ml-2"><del>$${
//                   product.price + product.price * product.discount
//                 }</del></h6>
//               </div>
//               <div class="d-flex align-items-center justify-content-center mb-1">
//                 <small class="fa fa-star text-primary mr-1"></small>
//                 <small class="fa fa-star text-primary mr-1"></small>
//                 <small class="fa fa-star text-primary mr-1"></small>
//                 <small class="fa fa-star text-primary mr-1"></small>
//                 <small class="fa fa-star text-primary mr-1"></small>
//                 <small>${product.rating_count}</small>
//               </div>
//             </div>
//           </div>
//         </div>
//       `;
//   }
//   document.getElementById("products").innerHTML = productHTML;
// const addToCart = (product) => {
//   const cart = document.getElementById("btn-cart");

//   if (!cartItems.includes(product)) {
//     cartItems.push(product);
//     cart.classList.add("bbb");
//   } else if (cartItems.includes(product)) {
//     cartItems.splice(cartItems.indexOf(product), 1);
//     cart.classList.remove("bbb");
//   }
//   document.getElementById("shoped-count").innerHTML = cartItems.length;
//   console.log(cartItems);
// };

// const lovedItems = [];

// const addToLove = (product) => {
//   const love = document.getElementById("btn-love");
//   if (!lovedItems.includes(product)) {
//     lovedItems.push(product);
//     love.classList.add("bbb");
//   } else if (lovedItems.includes(product)) {
//     lovedItems.splice(lovedItems.indexOf(product), 1);
//     love.classList.remove("bbb");
//   }
//   document.getElementById("love-count").innerHTML = lovedItems.length;

//   console.log(lovedItems);
// };
// };
// renderProducts(aaa);

// SORTING

// const sortByPrice = () => {
//   const sorted = aaa.sort((a, b) => {
//     return a.price - b.price;
//   });
//   renderProducts(sorted);
// };

// const sortByPopularity = () => {
//   const sorted = aaa.sort((a, b) => {
//     return a.rating_count - b.rating_count;
//   });
//   renderProducts(sorted);
// };

// const sortByRating = () => {
//   const sorted = aaa.sort((a, b) => {
//     return a.rating - b.rating;
//   });
//   renderProducts(sorted);
// };

sortPrice.addEventListener("click", shop.sortByPrice);
sortPopularity.addEventListener("click", shop.sortByPopularity);
sortRating.addEventListener("click", shop.sortByRating);

//filter

class Filter extends Shop {
  priceCheckboxes;
  colorCheckboxes;
  sizeCheckboxes;
  constructor() {
    super();
    this.priceCheckboxes = {
      all: document.getElementById("price-all"),
      range1: document.getElementById("price-1"),
      range2: document.getElementById("price-2"),
      range3: document.getElementById("price-3"),
      range4: document.getElementById("price-4"),
      range5: document.getElementById("price-5"),
    };
    this.colorCheckboxes = {
      all: document.getElementById("color-all"),
      color1: document.getElementById("color-1"),
      color2: document.getElementById("color-2"),
      color3: document.getElementById("color-3"),
      color4: document.getElementById("color-4"),
      color5: document.getElementById("color-5"),
    };
    this.sizeCheckboxes = {
      all: document.getElementById("size-all"),
      size1: document.getElementById("size-1"),
      size2: document.getElementById("size-2"),
      size3: document.getElementById("size-3"),
      size4: document.getElementById("size-4"),
      size5: document.getElementById("size-5"),
    };
    this.eventListener();
  }

  eventListener = () => {
    for (let range in this.priceCheckboxes) {
      this.priceCheckboxes[range].addEventListener(
        "change",
        this.updateFilteredProducts
      );
    }

    for (let color in this.colorCheckboxes) {
      this.colorCheckboxes[color].addEventListener(
        "change",
        this.updateFilteredProducts
      );
    }

    for (let size in this.sizeCheckboxes) {
      this.sizeCheckboxes[size].addEventListener(
        "change",
        this.updateFilteredProducts
      );
    }
  };

  updateFilteredProducts = () => {
    // filter by price
    let selectedPriceRanges = [];

    if (this.priceCheckboxes.all.checked) {
      selectedPriceRanges.push([0, 1000000000000]);
    } else {
      if (this.priceCheckboxes.range1.checked) {
        selectedPriceRanges.push([0, 100]);
      }
      if (this.priceCheckboxes.range2.checked) {
        selectedPriceRanges.push([100, 200]);
      }
      if (this.priceCheckboxes.range3.checked) {
        selectedPriceRanges.push([200, 300]);
      }
      if (this.priceCheckboxes.range4.checked) {
        selectedPriceRanges.push([300, 400]);
      }
      if (this.priceCheckboxes.range5.checked) {
        selectedPriceRanges.push([400, 500]);
      }
    }

    // by color
    const selectedColors = [];

    if (this.colorCheckboxes.all.checked) {
      selectedColors.push("black", "white", "red", "green", "blue");
    } else {
      if (this.colorCheckboxes.color1.checked) {
        selectedColors.push("black");
      }
      if (this.colorCheckboxes.color2.checked) {
        selectedColors.push("white");
      }
      if (this.colorCheckboxes.color3.checked) {
        selectedColors.push("red");
      }
      if (this.colorCheckboxes.color4.checked) {
        selectedColors.push("blue");
      }
      if (this.colorCheckboxes.color5.checked) {
        selectedColors.push("green");
      }
    }

    //by size
    const selectedSizes = [];

    if (this.sizeCheckboxes.all.checked) {
      selectedSizes.push("xs", "s", "m", "l", "xl");
    } else {
      if (this.sizeCheckboxes.size1.checked) {
        selectedSizes.push("xs");
      }
      if (this.sizeCheckboxes.size2.checked) {
        selectedSizes.push("s");
      }
      if (this.sizeCheckboxes.size3.checked) {
        selectedSizes.push("m");
      }
      if (this.sizeCheckboxes.size4.checked) {
        selectedSizes.push("l");
      }
      if (this.sizeCheckboxes.size5.checked) {
        selectedSizes.push("xl");
      }
    }

    const filteredProducts1 = this.aaa.filter((product) => {
      const price = product.price;

      for (let i = 0; i < selectedPriceRanges.length; i++) {
        const lowerBound = selectedPriceRanges[i][0];
        const upperBound = selectedPriceRanges[i][1];
        if (price >= parseInt(lowerBound) && price <= parseInt(upperBound)) {
          return true;
        }
      }
    });

    const filteredProducts = [];

    filteredProducts1.forEach((product) => {
      selectedColors.forEach((color2) => {
        const color = product.color;
        if (color == color2) {
          selectedSizes.forEach((size2) => {
            const size = product.size;
            if (size == size2) {
              filteredProducts.push(product);
            }
          });
        }
      });
    });

    this.renderProducts(filteredProducts);
  };
}

const filter = new Filter();

// console.log(arrProducts);
// console.log(typeof arrProducts);
