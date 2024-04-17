(() => {
    const $template = document.querySelector(".product-template").content,
        $fragmnet = document.createDocumentFragment(),
        $container = document.querySelector(".product-section");

    async function getData() {
        try { 
            let res = await fetch('http://localhost:3000/productos'),
            json = await (res.ok ? res.json() : Promise.reject(res));

            json.forEach((el) => {
                
                $template.querySelector("img").setAttribute("src", el.cover);
                $template.querySelector("img").setAttribute("alt", el.alt);
                $template.querySelector("h3").textContent = `${el.title}`;
                $template.querySelectorAll("p")[0].textContent = `${el.writer}`;
                $template.querySelectorAll("p")[1].textContent = `${el.genre}`;
                $template.querySelector("h4").textContent = `$ ${el.price}`;
                $template.querySelector("button").textContent = "Comprar";

                let $clone = document.importNode($template, true);
                $fragmnet.appendChild($clone);

            });

            $container.appendChild($fragmnet);

        } catch (err) {
            console.log(err);

        }
    }

    getData();

})();