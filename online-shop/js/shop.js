fetch("http://localhost:5000/api/products")
  .then((res) => res.json())
  .then((body) => body.data)
  .then((data) => {
    localStorage.setItem("products", JSON.stringify(data));
  });
const products = localStorage.getItem("products");
const aaa = JSON.parse(products);
console.log(aaa);

function renderProducts(productsData) {
  let productHTML = "";
  for (let i = 0; i < productsData.length; i++) {
    const product = productsData[i];
    productHTML += `
        <div class="col-lg-4 col-md-6 col-sm-6 pb-1">
          <div class="product-item bg-light mb-4">
            <div class="product-img position-relative overflow-hidden">
              <img class="img-fluid w-100" src="${product.image}" alt="${
      product.name
    }">
              <div class="product-action">
                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-shopping-cart"></i></a>
                <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
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
                  product.price + product.discount * 0.1
                }</del></h6>
              </div>
              <div class="d-flex align-items-center justify-content-center mb-1">
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small>(99)</small>
              </div>
            </div>
          </div>
        </div>
      `;
  }
  document.getElementById("products").innerHTML = productHTML;
}
renderProducts(aaa);

const sortPrice = document.getElementById("sort-price");
const sortRating = document.getElementById("sort-rating");
const sortPopularity = document.getElementById("sort-Popularity");

const sortByPrice = () => {
  const sorted = aaa.sort((a, b) => {
    return a.price - b.price;
  });
  renderProducts(sorted);
};

const sortByPopularity = () => {
  const sorted = aaa.sort((a, b) => {
    return a.rating_count - b.rating_count;
  });
  renderProducts(sorted);
};

const sortByRating = () => {
  const sorted = aaa.sort((a, b) => {
    return a.rating - b.rating;
  });
  renderProducts(sorted);
};
if (sortPrice) {
  sortPrice.addEventListener("click", sortByPrice);
}
if (sortPopularity) {
  sortPopularity.addEventListener("click", sortByPopularity);
}
if (sortRating) {
  sortRating.addEventListener("click", sortByRating);
}
