
/*const response = fetch("http://localhost:5000/api/categories/");
response.then((data) => {
    console.log(data.json());
  data.json().then((d) => {
    let list = "";
    d.data.forEach((element) => {
      list =
        list +
        `<a data-id="${element._id}" onclick="getCities(${element._id})" href="products.php?cat_id=${element._id}" class="nav-item nav-link">${element.name}</a>`;
    });
    document.getElementById("categories-menu").innerHTML = list;
    console.log(d.data);
  });
});
*/

async function get(data) {
    try {
      const response = await fetch("http://localhost:5000/api/categordsdies/");
  
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  get();
  //

