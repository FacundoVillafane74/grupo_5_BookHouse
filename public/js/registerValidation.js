window.addEventListener('load', () => {
    let form = document.querySelector('form');
    let inputs = Array.from(document.querySelectorAll('form input'));
    let name = document.querySelector('#name');
    let lastName = document.querySelector('#last_name');
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
    
    
    
    form.addEventListener('submit', e => {
        e.preventDefault();
        inputs.forEach(input => {
            if(input.value.length == 0) {
                e.preventDefault();
                input.nextElementSibling.innerText = 'El campo es obligatorio'
            }
        });
        
        name.addEventListener('input', () => {
            if(name.value.length < 2) {
                e.preventDefault();
                name.nextElementSibling.innerText = 'El nombre debe tener al menos 2 caracteres'
            } else {
                name.nextElementSibling.innerText = ''
            }
        });

        lastName.addEventListener('input', () => {
            if(lastName.value.length < 2) {
                e.preventDefault();
                lastName.nextElementSibling.innerText = 'El apellido debe tener al menos 2 caracteres'
            } else {
                lastName.nextElementSibling.innerText = ''
            }
        });

    });

});