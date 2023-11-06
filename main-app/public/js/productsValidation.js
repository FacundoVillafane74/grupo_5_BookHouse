window.addEventListener('load', () => {
    let form = document.querySelector('#importantForm');
    let inputs = Array.from(document.querySelectorAll('#importantForm input'));
    let name = document.querySelector('#name');
    let description = document.querySelector('#description');
    let image = document.querySelector('#image');
    let author = document.querySelector('#author');
    let age = document.querySelector('#age');
    let price = document.querySelector('#price');

    console.log('estamos en el add product');
    console.log(form);
    
    form.addEventListener('submit', e => {
        inputs.forEach(input => {
            if(input.value.length == 0) {
                if(!input.classList.contains('image-edit')) {
                    e.preventDefault();
                    input.nextElementSibling.innerText = 'El campo es obligatorio'
                }
            }
        });

        name.addEventListener('input', () => {
            if(name.value.length < 5) {
                e.preventDefault();
                name.nextElementSibling.innerText = 'El nombre del producto debe tener al menos 5 caracteres';
            } else {
                name.nextElementSibling.innerText = '';
            }
        });

        description.addEventListener('input', () => {
            if(description.value.length < 20) {
                e.preventDefault();
                description.nextElementSibling.innerText = 'El nombre de la descrición debe tener al menos 20 caracteres';
            } else {
                description.nextElementSibling.innerText = '';
            }
        });

        author.addEventListener('input', () => {
            if(author.value.length < 4) {
                e.preventDefault();
                author.nextElementSibling.innerText = 'El nombre del autor debe tener al menos 4 caracteres';
            } else {
                author.nextElementSibling.innerText = '';
            }
        });

        age.addEventListener('input', () => {
            if(age.value.length < 4) {
                e.preventDefault();
                age.nextElementSibling.innerText = 'El año debe tener al menos 4 digitos (ej: 2000)';
            } else if (age.value.length > 4) {
                e.preventDefault();
                age.nextElementSibling.innerText = 'El año debe tener solamente 4 digitos (ej: 2000)';
            } else {
                age.nextElementSibling.innerText = '';
            }
        });

    });

});