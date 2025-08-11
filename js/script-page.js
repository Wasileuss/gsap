document.addEventListener("DOMContentLoaded", function () {

    // Text Animation

    const words = ["Vasyl.", "A Developer.", "Wodpress Developer."]

    let cursor = gsap.to('.cursor', {opacity:0, ease: "power2.inOut", repeat:-1})
    let masterTl = gsap.timeline({repeat: -1}).pause()
    let boxTl = gsap.timeline()

    boxTl.to('.box', {duration:1, width:"12vw", delay: 0.5, ease: "power4.inOut"})
    .from('.start', {duration:1, y:"7vw", ease: "power3.out"})
    .to('.box', {duration:1, height:"7vw", ease: "elastic.out", onComplete: () => masterTl.play() })
    .to('.box', {duration:2, autoAlpha:0.7, yoyo: true, repeat: -1, ease:"rough({ template: none.out, strength:  1, points: 20, taper: 'none', randomize: true, clamp: false})"})
    words.forEach(word => {
    let tl = gsap.timeline({repeat: 1, yoyo: true, repeatDelay:1})
    tl.to('.text', {duration: 1, text: word})
    masterTl.add(tl)
    })

    // Grid Animation

    gsap.registerPlugin(Flip);
  
    const imgs = gsap.utils.toArray("figure");
    let bigImg = imgs[0];
  
    imgs.forEach((img) => {
      img.addEventListener("click", () => changeGrid(img));
    });
  
    function changeGrid(img) {
      if (img === bigImg) return;
  
      const state = Flip.getState(imgs);
  
      bigImg.dataset.grid = img.dataset.grid;
      img.dataset.grid = "img-1";
      bigImg = img;
  
      Flip.from(state, {
        absolute: true,
        ease: "power1.inOut",
      });
    }
  
  // Split text

  gsap.registerPlugin(SplitText, ScrollTrigger);

  const splitText = new SplitText(".split", { type: "chars" });
  gsap.from(splitText.chars, {
    opacity: 0,
    yPercent: 150,
    stagger: 0.05,
    ease: "back.out",
    duration: 1,
    scrollTrigger: {
      trigger: ".split",
      start: "top 80%"
    }
  });

  // match media
  let mm = gsap.matchMedia();
  mm.add("(max-width: 992px)", () => {
    gsap.to(".split", {fontSize: "30px", duration: 0.3});
  });
  mm.add("(max-width: 768px)", () => {
    gsap.to(".split", {fontSize: "24px", duration: 0.3});
  });
  mm.add("(max-width: 576px)", () => {
    gsap.to(".split", {fontSize: "20px", duration: 0.3});
  });

  // Scroll Trigger
  gsap.registerPlugin(ScrollTrigger);

  const cards = document.querySelectorAll(".card-text");
  
  gsap.set(cards, {position: 'absolute'})
  
  gsap.to(".card-text", {
    yPercent: -100,
    stagger: 0.5,
    scrollTrigger: {
      trigger: ".cards-text",
      pin: true,
      scrub: true,
      start: "top 10%",
      end: "bottom 70%",
    //   markers: true,
      snap: {
          snapTo: 0.7,
          duration: {min: 0.1, max: 0.4},
          ease: "power1.inOut"
        }
    }
  });

//   const cardContainer = document.querySelector(".card-container");
//   const card = document.querySelector(".card-body");
//   const cardItems = document.querySelectorAll(".card-item");

//   // Початкові значення для анімації
//   const maxRotation = 25; // Максимальний кут нахилу (градуси)
//   const perspective = 1000; // Перспектива (аналогічно CSS perspective)

//   cardContainer.addEventListener("mousemove", (e) => {
//     // Отримуємо розміри контейнера
//     const rect = cardContainer.getBoundingClientRect();
//     const centerX = rect.width / 2;
//     const centerY = rect.height / 2;

//     // Обчислюємо позицію курсору відносно центру картки
//     const mouseX = e.clientX - rect.left - centerX;
//     const mouseY = e.clientY - rect.top - centerY;

//     // Обчислюємо кути обертання
//     const rotateX = -(mouseY / centerY) * maxRotation; // Нахил по осі X
//     const rotateY = (mouseX / centerX) * maxRotation; // Нахил по осі Y

//     // Анімуємо картку
//     gsap.to(card, {
//       duration: 0.3,
//       rotateX: rotateX,
//       rotateY: rotateY,
//       ease: "power2.out",
//       transformPerspective: perspective,
//     });

//     // Анімуємо дочірні елементи з ефектом "підйому"
//     cardItems.forEach((item) => {
//       const translateZ = item.dataset.translateZ || 0;
//       gsap.to(item, {
//         duration: 0.3,
//         translateZ: translateZ,
//         ease: "power2.out",
//       });
//     });
//   });

//   // Повернення картки до початкового стану при виході курсору
//   cardContainer.addEventListener("mouseleave", () => {
//     gsap.to(card, {
//       duration: 0.5,
//       rotateX: 0,
//       rotateY: 0,
//       ease: "power2.out",
//     });

//     cardItems.forEach((item) => {
//       gsap.to(item, {
//         duration: 0.5,
//         translateZ: 0,
//         ease: "power2.out",
//       });
//     });
//   });

// Select all card containers
    const containers = document.querySelectorAll('.card-container');

    containers.forEach(container => {
      const body = container.querySelector('.card-body');
      const items = container.querySelectorAll('.card-item');

      // Reset transforms
      gsap.set(items, { x: 0, y: 0, z: 0 });
      gsap.set(body, { rotationX: 0, rotationY: 0 });

      // Mouse enter: Elevate items
      container.addEventListener('mouseenter', () => {
        gsap.to(items, {
          z: (index, target) => parseFloat(target.dataset.translateZ) || 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1
        });
      });

      // Mouse move: Tilt card
      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const tiltX = (e.clientY - centerY) / (rect.height / 2);
        const tiltY = (e.clientX - centerX) / (rect.width / 2);
        gsap.to(body, {
          rotationX: tiltX * -15,
          rotationY: tiltY * 15,
          duration: 0.1,
          ease: 'none'
        });
      });

      // Mouse leave: Reset
      container.addEventListener('mouseleave', () => {
        gsap.to(body, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
        gsap.to(items, {
          z: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    });
});
