const $booksSlides = document.querySelectorAll(".booksSlides");


if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

function addAnimation() {
    
    $booksSlides.forEach((scroller) => {
        
        scroller.setAttribute("data-animated", true);

        const $slidesBooks = scroller.querySelector(".slidesBooks"),
            scrollerContent = Array.from($slidesBooks.children);

    
        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            $slidesBooks.appendChild(duplicatedItem);
        });
    });
}


document.addEventListener("DOMContentLoaded", function() {
    const $homePage = document.getElementById("homePage"),
        $productsPage = document.getElementById("productsPage"),
        $seeProductsBtns = document.querySelectorAll(".seeProductsBtn"),
        $header = document.querySelector('header');


    function showProductsPage() {
        $homePage.style.display = "none";
        $productsPage.style.display = "block";

        window.scrollTo(0, $header.offsetTop);
    }

    
    $seeProductsBtns.forEach(btn => {
        btn.addEventListener("click", showProductsPage);
    });
});