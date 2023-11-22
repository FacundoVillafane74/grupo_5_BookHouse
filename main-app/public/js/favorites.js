window.onload = () => {
    let section = document.querySelector('.products');
    let buttonsFav = Array.from(document.querySelectorAll('.button-fav'));
  
    // Aqui debemos agregar nuestro fetch
  
    /* * Codigo que debemos usar para mostrar los datos en el frontend */
    let moviesFavorites = async () => {
      try {
        let response = await fetch('http://localhost:3001/product/api');
        let books = await response.json();
  
        let data = books.products;
        console.log(data);
      
        data.forEach((book) => {
        
          if(localStorage.getItem('favorites').includes(book.id)) {
  
            const article = document.createElement("article");
            article.setAttribute("class", "product-book-end");
            
            const a = document.createElement("a");
            a.setAttribute("href", `/product/${book.id}/detail`);
            a.setAttribute('class', 'productLink');

            const divBook = document.createElement('div');
            divBook.setAttribute('class', 'book');

            const img = document.createElement('img');
            img.setAttribute('src', book.image);

            const divInfoBook = document.createElement('div');
            divInfoBook.setAttribute('class', 'info-book');
            
            const h3Name = document.createElement("h3");
            h3Name.textContent = book.name;    
            
            const h3Price = document.createElement("h3");
            h3Price.textContent = `$${book.price}`;

            const divAdd = document.createElement('div');
            divAdd.setAttribute('class', 'add');
            
            const agregar = document.createElement("button");
            agregar.textContent = 'AGREGAR';
            agregar.setAttribute('class', 'agregar_carrito');
            agregar.setAttribute('data-id', book.id);

            const icon = document.createElement("i");
            icon.setAttribute("class", 'fa-regular fa-heart');
            
            section.appendChild(article);
            article.appendChild(a);
            a.appendChild(divBook);
            divBook.appendChild(img);
            a.appendChild(divInfoBook);
            divInfoBook.appendChild(h3Name);
            divInfoBook.appendChild(h3Price);
            article.appendChild(divAdd);
            divAdd.appendChild(agregar);
            divAdd.appendChild(icon);
          
          console.log(localStorage.getItem('favorites'));
        }; 
       })
      } catch (error) {
        console.log(error);
      };
    }
    
    moviesFavorites();
};
