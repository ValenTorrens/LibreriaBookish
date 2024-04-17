function showCheckoutForm() {
    const $checkoutForm = document.querySelector('.containerCheckout');
    $checkoutForm.classList.toggle('visible');
}

function hiddenCart() {
    const $cart = document.querySelector(".containerCart");
    $cart.style.display = "none"
}

document.addEventListener('DOMContentLoaded', () => {
    const $confirmButton = document.querySelector('.confirmCart'),
    $confirmBuyButton = document.querySelector('form button'),
    form = document.querySelector('form');

    let formValidated = false;

    $confirmButton.addEventListener('click', () => {
        if (cartIsEmpty()) {
            Swal.fire({
                title: 'El carrito está vacío',
                text: 'Agrega productos antes de confirmar',
                icon: 'warning',
                
            })
        } else {
                showCheckoutForm();
                hiddenCart();
            }
    });

    $confirmBuyButton.addEventListener('click',()=>{
        if (formValidated) {
                showCheckoutForm();
        }
        
    });

    
    form.addEventListener('submit', (event) => {
        formValidated = validateForm();
        if(!formValidated){
            event.preventDefault();
        } else {
            Swal.fire({
                title: '¡Gracias por tu compra!',
                text: 'Tu pedido ha sido realizado con éxito.',
                icon: 'success',
            })
        }
    
    });

});

function validateName(name) {
    return /^[a-zA-Z\s]+$/.test(name.trim());
}

function validatePhone(phone) {
    return /^\d{10}$/.test(phone);
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function validateAddress(address) {
    return address.trim() !== '';
}

function validateForm() {
    const $name = document.getElementById('name').value,
        $phone = document.getElementById('phone').value,
        $email = document.getElementById('email').value,
        $address = document.getElementById('address').value;

    if (!validateName($name)) {
        Swal.fire({
            title: 'Nombre Inválido',
            text: 'Por favor, introduce un nombre válido.',
            icon: 'error',
        });
        return false;
    }

    if (!validatePhone($phone)) {
        Swal.fire({
            title: 'Teléfono Inválido',
            text: 'Por favor, introduce un número de teléfono válido.',
            icon: 'error',
        });
        return false;
    }

    if (!validateEmail($email)) {
        Swal.fire({
            title: 'Correo Electrónico Inválido',
            text: 'Por favor, introduce un correo electrónico válido.',
            icon: 'error',
        });
        return false;
    }

    if (!validateAddress($address)) {
        Swal.fire({
            title: 'Dirección Inválida',
            text: 'Por favor, introduce una dirección válida.',
            icon: 'error',
        });
        return false;
    }

    return true;
}


function cartIsEmpty() {
    const $cartItemCount = parseInt(document.getElementById('cartCartCount').textContent);
    return $cartItemCount === 0;
}

