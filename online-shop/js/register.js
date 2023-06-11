const reg = document.getElementById("register");

class Register {
  first_name;
  last_name;
  email;
  password;
  user;
  constructor() {
    this.user = {};
  }

  validation = () => {
    this.first_name = document.getElementById("fname").value;
    this.last_name = document.getElementById("lname").value;
    this.email = document.getElementById("email").value;
    this.password = document.getElementById("password").value;

    this.user = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password,
    };
    console.log(this.first_name);
    if (
      this.first_name.trim() == "" ||
      this.last_name.trim() == "" ||
      this.email.trim() == "" ||
      this.password == ""
    ) {
      alert("invalid Data");
    } else {
      this.get();
    }
  };

  async get() {
    console.log(this.user);
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.user),
      });
      if (response.statusText === "Conflict") {
        alert("DUPLICATED EMAIL");
        
      } else {
        const data = await response.json();
        window.location.href = "index.html"

        console.log(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  eventListener = () => {
    reg.addEventListener("click", this.validation);
  };
}

const register = new Register();
register.eventListener();
