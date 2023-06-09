const reg = document.getElementById("register");

async function register() {
  const first_name = document.getElementById("fname").value;
  const last_name = document.getElementById("lname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const user = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
  };

  if (
    first_name.trim() == "" ||
    last_name.trim() == "" ||
    email.trim() == "" ||
    password == ""
  ) {
    alert("invalid Data");
  } else {
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.statusText === "Conflict") {
        alert("DUBLICATED EMAIL");
      } else {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  }
  // console.log(localStorage.getItem("token"));
}

reg.addEventListener("click", register);
