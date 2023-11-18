window.addEventListener('load', () => {
    
    let buttonsFav = Array.from(document.querySelectorAll('.button-fav'));
    
    let pelisId = [];
    
    buttonsFav.forEach(button => {
        button.addEventListener('click', e => {
            button.classList.toggle('like');
            if(button.classList.contains('like')) {
                button.innerHTML = '<i class="fa-solid fa-heart"></i>'
            } else {
                button.innerHTML = '<i class="fa-regular fa-heart"></i>'
            }
            
            if(button.classList.contains('like')) {
                pelisId.push(button.nextElementSibling.innerText);
            }
            
            if(!button.classList.contains('like')) {
                if(pelisId.includes(button.nextElementSibling.innerText)) {
                    let pelisString = pelisId.join(',').replace(button.nextElementSibling.innerText, '');
                    pelisId = pelisString.split(',')
                    /* let pelisString2 = pelisId.join('');
                    pelisId = pelisString2.split(' '); */
                }
            }
            console.log(pelisId);
            localStorage.setItem('favorites', JSON.stringify(pelisId));
            
            console.log((localStorage.getItem('favorites')));
            
        });
        
        
    })
    /* setTimeout(function(){
        buttonsFav.forEach(button => {
        if(localStorage.getItem('favorites').includes(button.nextElementSibling.innerText)) {
                button.innerHTML = '<i class="fa-solid fa-heart"></i>'
            } else {
                button.innerHTML = '<i class="fa-regular fa-heart"></i>'
            }
        })
    }, 1000); */
});