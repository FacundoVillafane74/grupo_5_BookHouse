window.addEventListener('load', () => {
    let form = document.querySelector('form');
    let inputs = Array.from(document.querySelectorAll('form input'));
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
    
    form.addEventListener('submit', e => {
        inputs.forEach(input => {
            if(input.value.length == 0) {
                e.preventDefault();
                input.nextElementSibling.innerText = 'El campo es obligatorio'
            }
        });

        password.addEventListener('input', () => {
            if(password.value.length <= 3) {
                e.preventDefault();
                password.nextElementSibling.innerText = 'La contraseña es muy corta'
            } else if (password.value.length <= 5) {
                e.preventDefault();
                password.nextElementSibling.innerText = 'La contraseña no es del todo segura'
            } else if (password.value.length <= 7) {
                e.preventDefault();
                password.nextElementSibling.innerText = 'ya casi lo tenemos! Debemos tener al menos 8 caracteres'
            } else {
                password.nextElementSibling.innerText = ''
            }
        });

    });

});