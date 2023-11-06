const gallery = document.querySelector('.gallery');
const works = document.querySelectorAll('.gallery figure');

const categoryFilter = document.getElementById('category-filter');

categoryFilter.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const selectedCategory = event.target.getAttribute('butoton-categorie');

    works.forEach((work) => {
      const workCategory = work.getAttribute('butoton-categorie');
      if (selectedCategory === 'all' || selectedCategory === workCategory) {
        work.style.display = 'block';
      } else {
        work.style.display = 'none';
      }
    });
  }
});

while (gallery.firstChild) {
  gallery.removeChild(gallery.firstChild);
}

fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    data.forEach(work => {
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      const figcaption = document.createElement('figcaption');

      img.src = work.imageUrl;
      img.alt = work.title;
      figcaption.textContent = work.title;
      figure.setAttribute('data-category', work.category);

      figure.appendChild(img);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
    });
  })
  .catch(error => {
    console.error('Une erreur s\'est produite :', error);
  });

fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(categories => {
    const categoryFilter = document.getElementById('category-filter');
    const gallery = document.querySelector('.gallery');
    const works = document.querySelectorAll('.gallery figure');

    console.log(categories);

  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors de la récupération des catégories :', error);
  });


const categories = ['Tous', 'Objets', 'Appartements', 'Hotels & Restaurants'];

document.addEventListener('DOMContentLoaded', function () {
  const categories = ['Tous', 'Objets', 'Appartements', 'Hotels & Restaurants'];

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const categoryButton = document.createElement('button');
    categoryButton.textContent = category;
    categoryButton.setAttribute('data-category', category);
    categoryButton.classList.add('button');
    categoryFilter.appendChild(categoryButton);
  }
});

const categoryButton = document.createElement('button');
categoryButton.textContent = category;
categoryButton.setAttribute('data-category', category);
categoryButton.classList.add('button');


categoryFilter.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const selectedCategory = event.target.getAttribute('data-category');

    works.forEach((work) => {
      const workCategory = work.getAttribute('data-category');
      if (selectedCategory === 'all' || selectedCategory === workCategory) {
        work.style.display = 'block';
      } else {
        work.style.display = 'none';
      }
    });
  }
});


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
