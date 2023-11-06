window.addEventListener('load', () => {
    let form = document.querySelector('form');
    let inputs = Array.from(document.querySelectorAll('form input'));
    let name = document.querySelector('#name');
    let lastName = document.querySelector('#last_name');
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
    
    form.addEventListener('submit', e => {
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

        let validaremail = /^\w+([.-_+]?\w+)@\w+([.-]?\w+)(.\w{2,10})+$/;
        if (validaremail.test(email.value)) {
            email.nextElementSibling.innerText = '';
        } else {
            email.nextElementSibling.innerText = 'Deberá ser un formato de e-mail válido';
        }

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