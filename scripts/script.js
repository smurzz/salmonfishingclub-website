(function init(){
    "use strict";
    //Navigation
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

    // const bannerWidth = bannerContainer.offsetWidth;
    // const headingSize = bannerWidth * ratio;
    //
    // heading.classList.add('heading-font-size');

    //Observer
    const articles = Array.from(document.getElementsByClassName("article__description"));

    // callback deklarieren
    function loadArticles(entries){
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

    //Header-Title
    document.addEventListener('DOMContentLoaded', function() {
        const text = heading.textContent;
        heading.textContent = '';

        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');

            if (text[i] === text[i].toUpperCase()) {
                const space = document.createTextNode(' ');
                heading.appendChild(space);
            }

            span.textContent = text[i];
            span.style.setProperty('--index', i);
            heading.appendChild(span);
        }
    });
})();




// (function init(){
//     "use strict";
// // Navigation
//     const navbar = document.querySelector('.navbar');
//     const dropdown = document.querySelector('.navbar__dropdown-list');
//     const menu = document.querySelector('.navbar__menu-list');
//     const bannerContainer = document.querySelector('header');
//     const heading = document.querySelector('header h1');
//     let prevScrollPos = window.pageYOffset;
//
//     function handleScroll() {
//         const currentScrollPos = window.pageYOffset;
//         if (currentScrollPos > prevScrollPos) {
//             // User is scrolling down
//             navbar.classList.add('colored');
//             dropdown.classList.add('colored');
//             menu.classList.add('colored');
//         } else {
//             if (currentScrollPos === 0) {
//                 // User is at the top of the page
//                 navbar.classList.remove('colored');
//                 dropdown.classList.remove('colored');
//                 menu.classList.remove('colored');
//             }
//         }
//         prevScrollPos = currentScrollPos;
//     }
//
//     window.addEventListener('scroll', handleScroll);
//
//     function adjustHeadingSize() {
//         const ratio = 0.04;
//         const bannerWidth = bannerContainer.offsetWidth;
//         const headingSize = bannerWidth * ratio;
//         heading.style.fontSize = headingSize + 'px';
//     }
//
//     window.addEventListener('DOMContentLoaded', adjustHeadingSize);
//     window.addEventListener('resize', adjustHeadingSize);
//
//     lightbox.option({
//         resizeDuration: 200,
//         wrapAround: true,
//         disableScrolling: true,
//     });
//
//
//     // Article Intersection Observer
//     const articles = Array.from(document.getElementsByClassName("article__description"));
//
//     // callback deklarieren
//     function loadArticles(entries){
//         const[entry] = entries;
//
//         if(entry.isIntersecting){
//             entry.target.classList.add("loadVisible");
//         }
//         else
//             entry.target.classList.remove("loadVisible");
//     }
//
//     const options = {
//         root : null,
//         rootMargin: "0px",
//         threshold: [.2,.5,1]
//
//     };
//
//     const observer = new IntersectionObserver(loadArticles, options);
//
//     articles.forEach(article => {
//         observer.observe(article);
//     });
//
// // Header-Title Animation
//
//     // Getting the heading's text content
//     const text = heading.textContent;
//
//     // Function for animating the header title
//     function animateHeaderTitle() {
//         heading.textContent = '';
//
//         // Loop through each character in the text content
//         for (let i = 0; i < text.length; i++) {
//             const span = document.createElement('span');
//             span.textContent = text[i];
//             span.style.setProperty('--index', i);
//
//             // Add a space before uppercase letters
//             if (text[i] === text[i].toUpperCase()) {
//                 const space = document.createTextNode(' ');
//                 heading.appendChild(space);
//             }
//             heading.appendChild(span);
//         }
//     }
//
//     // Call the function to animate the header title after the DOM is fully loaded
//     document.addEventListener('DOMContentLoaded', function() {
//         animateHeaderTitle();
//     });
//
//
// })();