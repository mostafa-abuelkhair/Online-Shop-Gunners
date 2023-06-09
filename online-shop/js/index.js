
async function getCategories(render) {

    try {
        const response = await fetch("http://localhost:5000/api/categories/");
  
        const result = await response.json();

        render(result.data);

    } catch (error) {
      console.error("Error:", error);
    }
  }

function render_categories_menu(d){

    document.getElementById("categories-menu");
    let htm=``;
        for(product of d ){
            htm+=`
            <a data-id="${product._id}" onclick="getCities(${product._id})" href="products.php?cat_id=${product._id}" class="nav-item nav-link">${product.name}</a>
            `;
        }
    document.getElementById("categories-menu").innerHTML=htm;
}

function render_categories_section(d){
    console.log(d);
    d.sort(function(a, b){return b.productCount - a.productCount});
    document.getElementById("categories-menu");
    let htm=``;
        for(product of d ){
            htm+=`
            <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
            <a class="text-decoration-none" href="">
              <div class="cat-item d-flex align-items-center mb-4">
                <div class="overflow-hidden" style="width: 100px; height: 100px">
                  <img class="img-fluid" src="${product.image}" alt="" />
                </div>
                <div class="flex-fill pl-3">
                  <h6>${product.name}</h6>
                  <small class="text-body">100 Products</small>
                </div>
              </div>
            </a>
          </div>            
          `;
        }
    document.getElementById("categories-section").innerHTML=htm;
}


    getCategories(render_categories_menu);

    getCategories(render_categories_section);


