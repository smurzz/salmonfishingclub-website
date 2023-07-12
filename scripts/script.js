const navbar = document.querySelector('.navbar');
const dropdown = document.querySelector('.navbar__dropdown-list');
const menu = document.querySelector('.navbar__menu-list');
const bannerContainer = document.querySelector('header');
const heading = document.querySelector('header h1');
let prevScrollPos = window.pageYOffset;

window.addEventListener('scroll', () => {
    const currentScrollPos = window.pageYOffset;
    if (currentScrollPos > prevScrollPos) {
        // User is scrolling down
        navbar.classList.add('colored');
        dropdown.classList.add('colored');
        menu.classList.add('colored');
    } else {
        if (currentScrollPos === 0) {
            // User is at the top of the page
            navbar.classList.remove('colored');
            dropdown.classList.remove('colored');
            menu.classList.remove('colored');
        }
    }
    prevScrollPos = currentScrollPos;
});

function adjustHeadingSize() {
    const ratio = 0.04;

    const bannerWidth = bannerContainer.offsetWidth;
    const headingSize = bannerWidth * ratio;
    heading.style.fontSize = headingSize + 'px';
}

window.addEventListener('DOMContentLoaded', adjustHeadingSize);
window.addEventListener('resize', adjustHeadingSize);

lightbox.option({
    resizeDuration: 200,
    wrapAround: true,
    disableScrolling: true,
});



(function init(){
    "use strict";
    const articles = Array.from(document.getElementsByClassName("article__description"));
    // console.log(articles);

    // data-attributes auslesen
    articles.forEach(article => {
        console.log(article.dataset);
        console.log(article.dataset.section);
    });
    console.clear();

    // callback deklarieren
    function loadArticles(entries){
        console.log("is visible");
        console.log(entries);
        const[entry] = entries;

        if(entry.isIntersecting){
            entry.target.classList.add("loadVisible");
        }
        else
            entry.target.classList.remove("loadVisible");
    }

    const options = {
        root : null,
        rootMargin: "0px",
        threshold: [.2,.5,1]

    };

    const observer = new IntersectionObserver(loadArticles, options);

    articles.forEach(article => {
        observer.observe(article);
    });

})();