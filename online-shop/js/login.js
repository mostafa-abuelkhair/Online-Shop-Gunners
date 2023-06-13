const log = document.getElementById("login");

class Login {
  email;
  password;
  user;
  constructor() {
    this.user = {};
    this.eventListener();
  }

  validation = () => {
    this.email = document.getElementById("email").value;
    this.password = document.getElementById("password").value;

    this.user = {
      email: this.email,
      password: this.password,
    };
    if (this.email.trim() == "" || this.password == "") {
      alert("fill the form please");
    } else {
      this.get();
    }
  };

  async get() {
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(this.user),
      });
      if (response.ok) { 
        const data = await response.json();
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.first_name+" "+data.last_name);
        window.location.href = "index.html";
      } else {
        alert("Invalid email or password"); // show an alert message
        console.log(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  eventListener = () => {
    log.addEventListener("click", this.validation);
  };
}

const login = new Login();


