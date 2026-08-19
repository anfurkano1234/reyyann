const music = document.getElementById("music");

const welcome = document.getElementById("welcome");
const furkan = document.getElementById("furkan");
const gallery = document.getElementById("gallery");
const final = document.getElementById("final");

const photoContainer = document.getElementById("photoContainer");
const counter = document.getElementById("counter");


let stage = 0;
let photoIndex = 2;


/*
    FOTOĞRAFLAR

    foto1 başlangıçta kullanılıyor.
    Burada 2'den 20'ye kadar fotoğraflar gelecek.
*/

const photos = [];

for (let i = 2; i <= 20; i++) {
    photos.push(`photos/foto${i}.jpg`);
}


/*
    FARKLI GİRİŞ YÖNLERİ
*/

const animations = [
    "from-left",
    "from-right",
    "from-top",
    "from-bottom"
];


/*
    EKRANA TIKLAMA
*/

document.addEventListener("click", () => {

    /*
        İlk tıklamada müziği başlat.
    */

    music.play().catch(() => {});


    /*
        AŞAMA 0

        "İyi ki doğdun sevgilim"
        gider.
    */

    if (stage === 0) {

        welcome.classList.add("hidden");

        furkan.classList.remove("hidden");

        stage = 1;

        return;
    }


    /*
        AŞAMA 1

        Furkan yazısı gider,
        fotoğraflar başlar.
    */

    if (stage === 1) {

        furkan.classList.add("hidden");

        gallery.classList.remove("hidden");

        stage = 2;

        showNextPhoto();

        return;
    }


    /*
        AŞAMA 2

        Her tıklamada yeni fotoğraf.
    */

    if (stage === 2) {

        if (photoIndex <= 20) {

            showNextPhoto();

        } else {

            gallery.classList.add("hidden");

            final.classList.remove("hidden");

            stage = 3;

            createFinalHearts();
        }

        return;
    }

});


/*
    YENİ FOTOĞRAF GÖSTER
*/

function showNextPhoto() {

    if (photoIndex > 20) {
        return;
    }


    const card = document.createElement("div");

    card.className =
        "memory-photo " +
        animations[(photoIndex - 2) % animations.length];


    const img = document.createElement("img");

    img.src = photos[photoIndex - 2];

    img.alt = `Anımız ${photoIndex - 1}`;


    card.appendChild(img);

    photoContainer.appendChild(card);


    counter.textContent =
        `${photoIndex - 1} / 19`;


    photoIndex++;
}


/*
    SONDA UÇUŞAN KALPLER
*/

function createFinalHearts() {

    for (let i = 0; i < 30; i++) {

        setTimeout(() => {

            const heart = document.createElement("div");

            heart.className = "heart";

            heart.textContent =
                Math.random() > .5
                ? "❤️"
                : "💗";


            heart.style.left =
                Math.random() * 100 + "%";


            heart.style.animationDuration =
                (3 + Math.random() * 4) + "s";


            document.body.appendChild(heart);


            setTimeout(() => {
                heart.remove();
            }, 7000);

        }, i * 180);
    }
}
