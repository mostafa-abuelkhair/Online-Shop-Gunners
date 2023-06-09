const log = document.getElementById("login");

const login = async () => {
  const username = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const data = { email: username, password: password };

  if (username.trim() == "" && password == "") {
    alert("wrong email or password");
  } else {
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    localStorage.setItem("token", json.token);
    console.log(`Welcome ${json.first_name} ${json.last_name}`);
  }
};

log.addEventListener("click", login);
