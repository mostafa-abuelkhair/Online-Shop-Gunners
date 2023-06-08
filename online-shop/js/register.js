

async function register(user) {
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
      });
  
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.error(error);
    }
    console.log(localStorage.getItem("token"));
  };
  
  const registerForm = document.getElementById("register-form");
  const submitBtn = document.querySelector('button[type="submit"]');
  
  submitBtn.addEventListener("click", async (event) => {
    event.preventDefault();
  
    const first_name = document.getElementById("first-name").value
    const last_name = document.getElementById("last-name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const user = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password
    };
  
    await register(user);
  });
  
 






