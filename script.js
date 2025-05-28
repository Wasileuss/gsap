document.addEventListener("DOMContentLoaded", function() {
    
    gsap.registerPlugin(ScrollTrigger);
    
        const box1 = document.querySelector('.box-1');
        const box2 = document.querySelector('.box-2');
        const box3 = document.querySelector('.box-3');
        const box4 = document.querySelector('.box-4');
        const allBoxes = document.querySelectorAll('.box');
        const animateBtn = document.querySelector('.animate-btn');
    
        gsap.to(box1, {
            x: 200,
            duration: 1,
            ease: "power2.out"
        });
    
        gsap.from(box3, {
            y: -20,
            opacity: 0.5,
            duration: 0.8,
            ease: "power2.out"
        })
    
        gsap.from(box4, {
            y: -100,
            opacity: 0,
            duration: 0.8,
            delay: 1.5,
            ease: "back.out(1.7)"
        });
    
        gsap.fromTo(box2,
            { scale: 0, rotation: 360, opacity: 0 },
            { scale: 1, rotation: 0, opacity: 1, duration: 1, delay: 2, ease: "elastic.out(1, 0.3)" }
        );
    
        animateBtn.addEventListener('click', function() {
    
            gsap.set(box1, { x: 0 });
    
            gsap.to(allBoxes, {
                 y: 0,
                 x: 0,
                 rotation: 0,
                 scale: 1, 
                 opacity: 1,
                 duration: 0.5,
                 ease: "power1.inOut",
                 stagger: 0.2
            });
        });
    
        
    
    // repeat and yoyo OUTSIDE stagger object
    // gsap.to(".box-small", {
    //     y: 100,
    //     duration: 0.5,
    //     repeat: -1,
    //     yoyo: true,
    //     stagger: {
    //       from: "center",
    //       each: 0.1,
    //     }
    //   });
      
      // repeat and yoyo INSIDE stagger object
      gsap.to(".box-small", {
        y: 100,
        duration: 0.5,
        ease: "power1.inOut",
        stagger: {
          from: "center",
          each: 0.1,
          repeat: -1,
          yoyo: true,
        }
      });
    
      // repeat and yoyo with grid
      gsap.to(".box-grid", {
        duration: 1,
        scale: 0.1,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.1,
          from: "center",
          grid: "auto"
          // axis: "y"
        }
      });
    
    
    // Click to start and stop animation
    let clickCount = 0;
    boxes = gsap.utils.toArray(".box-grid");
    
    // Click to start
    // document.addEventListener('click', () =>
    // gsap.to(gsap.utils.shuffle(boxes), { duration: 0.3, scale: 0, ease: "power1.inOut", repeat: -1, yoyo: true, stagger: { each: 0.1, from: "center", grid: "auto" } 
    // }) )
    
    // Click to stop
    // document.addEventListener('click', () => {
    //   if (clickCount % 2 === 0) {
    //     gsap.killTweensOf(boxes);
    //   } else {
    //     gsap.to(boxes, { duration: 0.3, scale: 0, ease: "power1.inOut", repeat: -1, yoyo: true, stagger: { each: 0.1, from: "center", grid: "auto" } });
    //   }
    //   clickCount++;
    // });
    
    // ScrollTrigger
    gsap.utils.toArray('.box-big').forEach((box, i) => {
        gsap.fromTo(box, 
          { opacity: 0 },
          { 
            opacity: 1,
            scrollTrigger: {
              trigger: box,
              start: "top 80%",
              toggleActions: "play none none none"
            },
            delay: i * 0.1,
            stagger: 0.2
          }
        );
      });
    
    // ScrollTrigger timeline for bar
    const tlBar = gsap.timeline({
      scrollTrigger: {
        scrub: true,
      }
    });
    
    tlBar.to('.bar', {
      width: '100%'
    });
    
    });