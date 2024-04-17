let cart = [];

async function addProducts() {
    try {
        const $productsContainer = document.getElementById('productsContainer'),
            res = await fetch('http://localhost:3000/productos'),
            data = await res.json();


        data.forEach(product => {
            const $container = document.createElement('div');
            $container.classList.add('cardBook');

            const $coverBook = document.createElement('img');
            $coverBook.src = product.cover,
                $coverBook.alt = product.alt,
                $coverBook.classList.add('coverBook');

            const $titleBook = document.createElement('p');
            $titleBook.textContent = product.title;
            $titleBook.classList.add('titleBook');

            const $detailsBook = document.createElement('div');
            $detailsBook.classList.add('detailsBook');

            const $writerBook = document.createElement('p');
            $writerBook.textContent = `${product.writer}`;
            $writerBook.classList.add('writerBook');

            const $genreBook = document.createElement('p');
            $genreBook.textContent = `${product.genre}`;
            $genreBook.classList.add('genreBook');

            const $priceBuyContainer = document.createElement('div');
            $priceBuyContainer.classList.add('priceBuyContainer');

            const $priceBook = document.createElement('p');
            $priceBook.textContent = `$${product.price}`;
            $priceBook.classList.add('priceBook');

            const $buyBtn = document.createElement('button');
            $buyBtn.textContent = 'Comprar';
            $buyBtn.classList.add('buyBtn');

            $container.appendChild($coverBook);
            $detailsBook.appendChild($titleBook);
            $detailsBook.appendChild($writerBook);
            $detailsBook.appendChild($genreBook);
            $priceBuyContainer.appendChild($priceBook);
            $priceBuyContainer.appendChild($buyBtn);
            $detailsBook.appendChild($priceBuyContainer);
            $container.appendChild($detailsBook);

            $productsContainer.appendChild($container);

            $buyBtn.addEventListener('click', addToCartItem);
        });


    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
    }
}

function addToCartItem(e) {
    const button = e.target,
        $item = button.closest('.cardBook'),
        $itemWriter = $item.querySelector('.writerBook').textContent,
        $itemTitle = $item.querySelector('.titleBook').textContent,
        $itemPrice = $item.querySelector('.priceBook').textContent,
        $itemCover = $item.querySelector('.coverBook').src,
        $itemAlt = $item.querySelector('.coverBook').alt;



    const newItem = {
        title: $itemTitle,
        writer: $itemWriter,
        price: $itemPrice,
        cover: $itemCover,
        alt: $itemAlt,
        qty: 1
    };

    let found = false;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].title.trim() === newItem.title.trim()) {
            cart[i].qty++;
            found = true;
            break;
        }
    }

    if (!found) {
        cart.push(newItem);
    }

    renderCart();
    updateCartIcon();
    localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
    const $tbody = document.querySelector('#carritoBody');
    $tbody.innerHTML = '';

    cart.forEach(item => {
        const $row = document.createElement('tr')
        $row.classList.add('rowCart');
        const subtotal = (parseFloat(item.price.replace(/[^\d.]/g, '')) * item.qty).toFixed(2);
        const Content = `
            <td class="productCell">
                <img class="productCover" src="${item.cover}"  alt="${item.alt}">
                <div>
                    <h3 class="productTitle">${item.title}</h3>
                    <h4 class="productWriter">${item.writer}</h4>
                </div>
            </td>
            <td class="productQty">
                <div>
                    <button class="plus">+</button>
                    <span class="qty">${item.qty}</span>
                    <button class="minus">—</button>
                </div>
            </td>
            <td class="productPrice"><p>${item.price}.00</p></td>
            <td class="productSubtotal"><p>$${subtotal}</p></td>
            <td>
                <button class="delete btn btn-danger"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;

        $row.innerHTML = Content;
        $tbody.appendChild($row);

        $row.querySelector(".delete").addEventListener('click', removeItemcart);
        $row.querySelector(".plus").addEventListener('click', aumentarCantidad);
        $row.querySelector(".minus").addEventListener('click', disminuirCantidad);
    });
    cartTotal();
}


document.addEventListener('DOMContentLoaded', () => {
    addProducts();

    const storage = JSON.parse(localStorage.getItem('cart'));
    if (storage) {
        cart = storage;
        renderCart();
    }

    const $homeBtn = document.getElementById('homeBtn'),
        $productsBtn = document.getElementById('productsBtn'),
        $cartBtn = document.getElementById('cartBtn'),
        $emptyCartButton = document.getElementById('emptyCartButton'),
        $keepBuyingBtn = document.getElementById('keepBuyingBtn'),
        $confirmButton = document.querySelector('.confirmCart'),
        $currentPage = sessionStorage.getItem('currentPage') || 'homePage';

    showPage($currentPage);

    $homeBtn.addEventListener('click', () => {
        showPage('homePage');
    });

    $keepBuyingBtn.addEventListener('click', () => {
        showPage('productsPage');
    });

    $productsBtn.addEventListener('click', () => {
        showPage('productsPage');
    });

    $cartBtn.addEventListener('click', () => {
        showPage('cartPage');
        renderCart();
    });

    document.querySelector('.fa-cart-shopping').addEventListener('click', () => {
        showPage('cartPage');
        renderCart();
    });

    $emptyCartButton.addEventListener('click', () => {
        cart = [];
        localStorage.removeItem('cart');
        renderCart();
        updateCartIcon()
    });

    $confirmButton.addEventListener('click', () => {
        cart = [];
        localStorage.removeItem('cart');
        renderCart();
        updateCartIcon()
    })


    updateCartIcon();
});

function aumentarCantidad(e) {
    const buttonPlus = e.target;
    const $row = buttonPlus.closest(".rowCart");
    const $title = $row.querySelector('.productTitle').textContent;
    cart.forEach(item => {
        if (item.title.trim() === $title) {
            item.qty++;
            $row.querySelector(".qty").textContent = item.qty;
            const subtotal = (parseFloat(item.price.replace(/[^\d.]/g, '')) * item.qty).toFixed(2);
            $row.querySelector(".productSubtotal p").textContent = '$' + subtotal;
            cartTotal();
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    });
    updateCartIcon();
}

function disminuirCantidad(e) {
    const buttonMinus = e.target;
    const $row = buttonMinus.closest(".rowCart");
    const $title = $row.querySelector('.productTitle').textContent;
    cart.forEach(item => {
        if (item.title.trim() === $title) {
            item.qty = Math.max(1, item.qty - 1);
            $row.querySelector(".qty").textContent = item.qty;
            const subtotal = (parseFloat(item.price.replace(/[^\d.]/g, '')) * item.qty).toFixed(2);
            $row.querySelector(".productSubtotal p").textContent = '$' + subtotal;
            cartTotal();
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    });
    updateCartIcon();
}

function removeItemcart(e) {
    const button = e.target;
    const $row = button.closest(".rowCart");
    const $title = $row.querySelector('.productTitle').textContent;
    cart = cart.filter(item => item.title.trim() !== $title.trim());
    $row.remove();
    localStorage.setItem('cart', JSON.stringify(cart));
    cartTotal();
    updateCartIcon();
}

function calculateTotalQuantity() {
    let totalQuantity = 0;
    cart.forEach(item => {
        totalQuantity += item.qty;
    });
    return totalQuantity;
}

function updateCartIcon() {
    const $cartCountP = document.getElementById('productCartCount'),
        $cartCountC = document.getElementById('cartCartCount');

    const totalQuantity = calculateTotalQuantity();

    $cartCountC.textContent = totalQuantity;
    $cartCountP.textContent = totalQuantity;
}

function cartTotal() {
    let total = 0;
    const totalElement = document.getElementById('itemCartTotal');
    cart.forEach(item => {
        const precioNumerico = parseFloat(item.price.replace(/[^\d.]/g, ''));
        if (!isNaN(precioNumerico)) {
            total += item.qty * precioNumerico;
        } else {
            console.error('Precio inválido:', item.price);
        }
    });

    totalElement.textContent = `Total: $ ${total.toFixed(2)}`;
}

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        if (page.id === pageId) {
            page.style.display = 'block';
        } else {
            page.style.display = 'none';
        }
    });

    sessionStorage.setItem('currentPage', pageId);
}

