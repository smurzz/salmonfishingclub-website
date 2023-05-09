const navbar = document.querySelector('.navbar');
const dropdown = document.querySelector('.dropdown');
const menu = document.querySelector('.menu');
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

