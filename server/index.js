const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

const productos = [
    {
        id: "libro1",
        cover: "./client/assets/libro1.webp",
        alt: "Portada libro fourth wing de Rebecca Yarros",
        title: "fourth wing",
        writer: "rebecca yarros",
        price: 42000,
        genre: "#Fantasía"
    },
    {
        id: "libro2",
        cover: "./client/assets/libro2.webp",
        alt: "Portada libro Me Before You de Jojo Moyes",
        title: "Me Before You",
        writer: "Jojo Moyes",
        price: 33000,
        genre: "#Romance"
    },
    {
        id: "libro3",
        cover: "./client/assets/libro3.webp",
        alt: "Portada libro Three-Inch Teeth de C.J. Box",
        title: "three-inch teeth",
        writer: "C.J. Box",
        price: 17150,
        genre: "#Policial"
    },
    {
        id: "libro4",
        cover: "./client/assets/libro4.webp",
        alt: "Portada libro It Ends with Us de Colleen Hoover",
        title: "It Ends with Us",
        writer: "Colleen Hoover",
        price: 25850,
        genre: "#Romance"
    },
    {
        id: "libro5",
        cover: "./client/assets/libro5.webp",
        alt: "Portada libro It de Stephen King",
        title: "It",
        writer: "Stephen King",
        price: 35695,
        genre: "#Terror"
    },
    {
        id: "libro6",
        cover: "./client/assets/libro6.webp",
        alt: "Portada libro From Blood and Ash de Jennifer L. Armentrout",
        title: "From Blood and Ash",
        writer: "Jennifer L. Armentrout",
        price: 101550,
        genre: "#Fantasía"
    },
    {
        id: "libro7",
        cover: "./client/assets/libro7.webp",
        alt: "Portada libro White Out de Danielle Girard",
        title: "White Out",
        writer: "Danielle Girard",
        price: 23678,
        genre: "#Policial"
    },
    {
        id: "libro8",
        cover: "./client/assets/libro8.webp",
        alt: "Portada libro The Cruel Prince de Holly Black",
        title: "The Cruel Prince",
        writer: "Holly Black",
        price: 41730,
        genre: "#Fantasía"
    },
    {
        id: "libro9",
        cover: "./client/assets/libro9.webp",
        alt: "Portada libro Girl, Alone de Blake Pierce",
        title: "Girl, Alone",
        writer: "Blake Pierce",
        price: 62922,
        genre: "#Suspenso"
    },
    {
        id: "libro10",
        cover: "./client/assets/libro10.webp",
        alt: "Portada libro Think of a Number de John Verdon",
        title: "Think of a Number",
        writer: "John Verdon",
        price: 23780,
        genre: "#Suspenso"
    },
    {
        id: "libro11",
        cover: "./client/assets/libro11.webp",
        alt: "Portada libro A Game of Thrones de George R.R. Martin",
        title: "A Game of Thrones",
        writer: "George R.R. Martin",
        price: 38600,
        genre: "#Fantasía"
    },
    {
        id: "libro12",
        cover: "./client/assets/libro12.webp",
        alt: "Portada libro Pride And Prejudice de Jane Austen",
        title: "Pride And Prejudice",
        writer: "Jane Austen",
        price: 31200,
        genre: "#Romance Histórico"
    },
    {
        id: "libro13",
        cover: "./client/assets/libro13.webp",
        alt: "Portada libro Crave de Tracy Wolff",
        title: "Crave",
        writer: "Tracy Wolff",
        price: 19834,
        genre: "#Fantasía"
    },
    {
        id: "libro14",
        cover: "./client/assets/libro14.webp",
        alt: "Portada libro Stray Witch de Eva Alton",
        title: "Stray Witch",
        writer: "Eva Alton",
        price: 15630,
        genre: "#Fantasía"
    },
    {
        id: "libro15",
        cover: "./client/assets/libro15.webp",
        alt: "Portada libro Un cuento perfecto de Elísabet Benavent",
        title: "Un cuento perfecto",
        writer: "Elísabet Benavent",
        price: 39800,
        genre: "#Romance"
    }
]

app.get('/productos', (req, res) => {

    res.json(productos);

});

app.listen(PORT, () => {

    console.log(`Servidor escuchando en el puerto ${PORT}`);
})