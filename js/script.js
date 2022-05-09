//Milestone 1: create an array of objects 
const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Giovanni Formicola",
            "image": null
        },  
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

//Milestone 2: print the posts on the feed
const containerPost = document.getElementById("container");

posts.forEach(post => {
    // Create a DOM element
    const createdPost = createPostElement(post);

    // append to the container
    containerPost.innerHTML += createdPost;
});

//Milestone 3: if we click the "like button", it changes colour to blue and we let grow the like counter, save in asecond array the post's ID we already liked
const likedPosts = [];
const likeButtons = document.querySelectorAll(".js-like-button");

likeButtons.forEach( (button, index) => {
    button.addEventListener("click", function(event) {
        event.preventDefault();

        // esempio dataset        console.log(this.dataset.postid);

        // preleviamo il post cliccato dall'array di oggetti tramite l'indice del bottone nell'array
        const clickedPost = posts[index];
        // preleviamo l'id dell'oggetto cliccato
        const clickedPostId = clickedPost.id;
        // preleviamo dall'html l'elmento che contiene il numero di likes        const likeCounter = document.getElementById(`like-counter-${clickedPostId}`);
        // da questo elmento preleviamo il numero dei likes e lo trasformiamo un number
        const likeCounter = document.getElementById(`like-counter-${clickedPostId}`); 
        let likesNumber = parseInt(likeCounter.textContent);

        // Se il post cliccato non è presente nell'array
        if ( !likedPosts.includes(clickedPostId)) {
            //  - cambiare il colore al bottone
            this.classList.add("like-button--liked");
                    
            // incrementiamo il numero di likes
            likesNumber = likesNumber + 1;
            //  - salvare in un array separato gli id dei post ai quali l'utente mette mi piace
            likedPosts.push(clickedPostId);
        } else {
            // togliere il colore dal bottone
            this.classList.remove("like-button--liked");

            // decrementare il numero di likes
            likesNumber = likesNumber - 1;

            // togliere l'id del post dall'array likedPosts
            const idIndexInLikedPosts =  likedPosts.indexOf(clickedPostId);
            likedPosts.splice(idIndexInLikedPosts, 1);
        }   

        // riscriviamo il contenuto dell'elmento HTML
        likeCounter.innerHTML = likesNumber;
        // salviamo il nuovo numero di likes all'interno dell'array
        clickedPost.likes = likesNumber;
    });
});

// FUNCTIONS
/**
 * Description -> The function that create an element for the post in the DOM 
 * @param {Object} postObject -> object with data
 * @returns {any} HTML element
 */
 function createPostElement(postObject) {
    const {id, content, author, media, likes, created} = postObject;
    const postElement = `
    <div class="post">
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    ${ (author.image) ?  createAuthorImage(author) : createPlaceholderAuthorImage(author.name)}             
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${author.name}</div>
                    <div class="post-meta__time">${formatDate(created)}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${content}</div>
        <div class="post__image">
            <img src="${media}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" href="#" data-postid="${id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
                </div>
            </div> 
        </div>            
    </div>
    `;

    return postElement;
}

//Utilities functions 
function formatDate(originalDate) {
    const italianDateString = originalDate.split("-").reverse().join("/");
    return italianDateString;
}


/**
 * Description gives the image
 * @param {Object} authorObject -> object with author's data
 * @returns {String} -> string who represents the author of image
 */
 function createAuthorImage(authorObject) {
    const {image, name} = authorObject;
    const authorImage = `<img class="profile-pic" src="${image}" alt="${name}">`
    return authorImage;
}


// gives back the placeholder element
function createPlaceholderAuthorImage(authorName) {
    console.log(authorName);
    // string of initials author's name
    const nameParts = authorName.split(" ");
    console.log(nameParts);
    // create the variable who'll contain it
    let initials = "";
    // For eevry element of the array 
    //  - we take the first letter
    //  - we join it all together
    nameParts.forEach(name => {
        const firstLetter = name[0];
        initials += firstLetter;
    });

    console.log(initials);

    // create the string of the DOM element
    const placeholder = `
        <div class="profile-pic-default">
            <span>${initials}</span>
        </div>
    `;

    return placeholder;
}