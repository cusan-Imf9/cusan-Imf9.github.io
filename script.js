// 1. Get the necessary HTML elements
const menuToggle = document.getElementById('menu-toggle');
const mainMenu = document.getElementById('main-menu');

// 2. Define the action to run when the menu toggle is 'clicked'
menuToggle.addEventListener('click', function() {
    // Toggles the 'is-active' class on the mainMenu element
    mainMenu.classList.toggle('is-active');
});
