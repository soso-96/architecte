document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
  
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      function loginUser(username, password) {
        return fetch("http://localhost:5678/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        })
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            } else {
              throw new Error('Identifiant ou mot de passe incorrect.');
            }
          });
      }
      loginUser(username, password)
        .then((data) => {
          document.location.href = 'index.html';
          console.log('Données de connexion :', data);
        })
        .catch((error) => {
          alert(error.message);
          console.error('Erreur de connexion :', error);
        });
    });
  });