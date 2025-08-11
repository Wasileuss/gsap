document.addEventListener("DOMContentLoaded", function () {

    // Text Animation

    const words = ["Vasyl.", "A Developer."]

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

  const cards = document.querySelectorAll(".card");
  
  gsap.set(cards, {position: 'absolute'})
  
  gsap.to(".card", {
    yPercent: -100,
    stagger: 0.5,
    scrollTrigger: {
      trigger: ".cards",
      pin: true,
      scrub: true,
      start: "top top",
      end: "bottom 20%",
    //   markers: true,
      snap: {
          snapTo: 0.33,
          duration: {min: 0.1, max: 0.4},
          ease: "power1.inOut"
        }
    }
  });
  
  

});
