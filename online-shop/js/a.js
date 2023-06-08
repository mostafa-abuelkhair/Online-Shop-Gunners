let dropCategories;
async function getCategories() {
  const res = await fetch("http://localhost:5000/api/categories/");
  const data = await res.json();
  let c = " ";
  data.data.forEach((element) => {
    c += `<a data-id="${element._id}" onclick="getCities(${element._id})" href="products.php?cat_id=${element._id}" class="nav-item nav-link" >
        ${element.name}
        </a>`;
  });
  document.getElementById("categories-menu").innerHTML = c;
  localStorage.setItem(dropCategories, JSON.stringify(data.data));
}
getCategories();
const b = localStorage.getItem(dropCategories);
console.log(JSON.parse(b));

async function login() {
  let obj = { email: "marawanmagdy91@gmail.com", password: "123321" };
  const response = await fetch("http://localhost:5000/api/users/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  // localStorage.setItem("token", json.token);

  console.log(json);
}
login();

async function regiser() {
  let obj = {
    first_name: "ahmed",
    last_name: "elhaggar",
    email: "ahmed@gmail.com",
    password: "123321",
  };
  const res = await fetch("http://localhost:5000/api/users/register", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res.statusText);
  if (res.statusText === "Conflict") {
    console.log("assasa");
  } else {
    const json = await res.json();
  }
  // try {
  //   // console.log(json.token);
  // } catch (error) {
  //   console.log(error);
  // }
}
regiser();
console.log(localStorage.getItem("token"));
