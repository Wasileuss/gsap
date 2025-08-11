// document.addEventListener('DOMContentLoaded', function () {
//     const body = document.querySelector('body');
//     const menu = document.querySelector('.menu');
//     if (!menu) return;
//     const menuBody = menu.querySelector('.menu__body');
//     if (!menuBody) return;
//     const menuIcon = menu.querySelector('.menu-icon');
//     if (!menuIcon) return;

//     menuIcon.addEventListener('click', function () {
//         this.classList.toggle('is-open');
//         menuBody.classList.toggle('is-open');
//         body.classList.toggle('lock');
//     });
// });

document.addEventListener('DOMContentLoaded', function () {
   window.lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const body = document.body;
    const menu = document.querySelector('.menu');
    if (!menu) return;

    const menuBody = menu.querySelector('.menu__body');
    const menuIcon = menu.querySelector('.menu-icon');
    const menuOverlay = menu.querySelector('.menu__overlay');

    if (!menuBody || !menuIcon) return;

    function disableScroll() {
        body.classList.add('lock');
        if (window.lenis) window.lenis.stop();
    }

    function enableScroll() {
        body.classList.remove('lock');
        if (window.lenis) window.lenis.start();
    }

    menuIcon.addEventListener('click', function () {
        const isOpen = this.classList.toggle('is-open');
        menuBody.classList.toggle('is-open', isOpen);
        if (menuOverlay) menuOverlay.classList.toggle('is-open', isOpen);

        if (isOpen) {
            disableScroll();
        } else {
            enableScroll();
        }
    });

    if (menuOverlay) {
        menuOverlay.addEventListener('click', function () {
            menuIcon.classList.remove('is-open');
            menuBody.classList.remove('is-open');
            menuOverlay.classList.remove('is-open');
            enableScroll();
        });
    }
});
