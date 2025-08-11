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
    
      let gridContainer = document.querySelector(".box-grid-container");

      function createBoxes() {
        let gridBox = document.createElement("div");
        gridBox.classList.add("box-grid");
        gridContainer.appendChild(gridBox);
      }

      for (let i = 0; i < 150; i++) {
        createBoxes();
      }

      // repeat and yoyo with grid
      gsap.to(".box-grid", {
        duration: 1,
        scale: 0.1,
        borderRadius: 50,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.1,
          from: "edges",
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

    const slider = document.querySelector('.slider');
    const progress = document.querySelector('.progress');
    const percent = document.querySelector('.label');
    
    slider.addEventListener('input', () => {

        percent.textContent = `${slider.value}%`;
        // percent.innerText =`${gsap.utils.snap(5, slider.value)}%`;

        let clampedValue = gsap.utils.clamp(0, 70, slider.value);
        percent.innerText = `${clampedValue}%`;

        if (slider.value > clampedValue) {
            slider.value = clampedValue;
        }
        
        gsap.to(progress, {
            width: `${slider.value}%`,
            duration: 0.2,
            ease: 'power1.inOut'
        });
    });

    let circleContainer = document.querySelector(".circle-container");

    function createCircle() {
      let circle = document.createElement("div");
      circle.classList.add("circle");
      circleContainer.appendChild(circle);
    }

    for (let i = 0; i < 100; i++) {
      createCircle();
    }

    // Circle blue
    let circleBlueContainer = document.querySelector(".circle-blue-container");
    function createCircleBlue() {
        let circleBlue = document.createElement("div");
        circleBlue.classList.add("circle-blue");
        circleBlueContainer.appendChild(circleBlue);
      }
  
      for (let i = 0; i < 100; i++) {
        createCircleBlue();
      }

      // Circle green
    let circleGreenContainer = document.querySelector(".circle-green-container");
    function createCircleGreen() {
        let circleGreen = document.createElement("div");
        circleGreen.classList.add("circle-green");
        circleGreenContainer.appendChild(circleGreen);
      }
  
      for (let i = 0; i < 100; i++) {
        createCircleGreen();
      }

    // Custom ease
    // function parametric(progress) {
    //     let sqt = Math.sqrt(progress);
    //     return sqt / (2.0 * (sqt - progress) + 1.0);
    // }

    let context = gsap.context(() => {
        gsap.to(".circle", {
            opacity: 0,
            duration: 1,
            scale: 0.1,
            y: 50,
            lazy: true,
            // ease: parametric,
            ease: "power1.inOut",
            repeat: -1,
            stagger: {
                // each: 0.1,
                amount: 3,
                from: 'random',
                grid: [10, 10],
                yoyo: true,
                repeat: -1,
                // axis: "y",
                ease: "power3.in"
            }
        });
    
        gsap.to(".circle-blue", {
            opacity: 0,
            duration: 1.5,
            scale: 0.1,
            x: 50,
            lazy: true,
            // ease: parametric,
            ease: "power1.inOut",
            repeat: -1,
            stagger: {
                // each: 0.1,
                amount: 3,
                from: 1,
                grid: [10, 10],
                yoyo: true,
                repeat: -1,
                // axis: "y",
                ease: "power3.in"
            }
        });
    });

    let contextGreen = gsap.to(".circle-green", {
        opacity: 0,
        duration: 1.5,
        scale: 0.1,
        y: 50,
        lazy: true,
        // ease: parametric,
        ease: "power1.inOut",
        repeat: -1,
        stagger: {
            // each: 0.1,
            amount: 3,
            from: 'edges',
            grid: [10, 10],
            yoyo: true,
            repeat: -1,
            // axis: "y",
            ease: "power3.in"
        }
    });

    // Revert
    let revertBtn = document.querySelector(".revert-btn");

    revertBtn.addEventListener("click", () => {
        contextGreen.revert();
    });

    // Kill
    let killBtn = document.querySelector(".kill-btn");

    killBtn.addEventListener("click", () => {
        contextGreen.kill();
    });

    // start
    let playBtn = document.querySelector(".play-btn");

    playBtn.addEventListener("click", () => {
        contextGreen.play();
    });

    // pause
    let pauseBtn = document.querySelector(".pause-btn");

    pauseBtn.addEventListener("click", () => {
        contextGreen.pause();
    });

    // resume
    let resumeBtn = document.querySelector(".resume-btn");

    resumeBtn.addEventListener("click", () => {
        contextGreen.resume();
    });

    // reverse
    let reverseBtn = document.querySelector(".reverse-btn");

    reverseBtn.addEventListener("click", () => {
        contextGreen.reverse();
    });

    // restart
    let restartBtn = document.querySelector(".restart-btn");

    restartBtn.addEventListener("click", () => {
        contextGreen.restart();
    });

    // Timeline
    let circlePurple = document.querySelector(".circle-purple");
    let label = document.querySelector(".repeat-value");

    // let tl = gsap.timeline();
    // tl.to(circlePurple, { y: 300, duration: 1, ease: "power1.inOut" });
    // tl.to(circlePurple, { x: 300, duration: 1, ease: "power1.inOut" });
    // tl.to(circlePurple, { y: 0, duration: 1, ease: "power1.inOut" });
    // tl.to(circlePurple, { x: 0, duration: 1, ease: "power1.inOut" });
    // tl.repeat(-1);

    function intro() {
        let tl = gsap.timeline();
        tl.to(circlePurple, { y: 300, duration: 1, ease: "power1.inOut" });
        tl.to(circlePurple, { x: 300, duration: 1, ease: "power1.inOut" });
        tl.to(circlePurple, { y: 0, duration: 1, ease: "power1.inOut" });
        tl.to(circlePurple, { x: 0, duration: 1, ease: "power1.inOut" });
        return tl;
    }

    function middle() {
        let tl = gsap.timeline();
        tl.to(circlePurple, { y: 300, duration: 1, borderRadius: 0, backgroundColor: "red", ease: "power1.inOut" });
        tl.to(circlePurple, { x: 300, duration: 1, borderRadius: 0, backgroundColor: "red", ease: "power1.inOut" });
        tl.to(circlePurple, { y: 0, duration: 1, borderRadius: 0, backgroundColor: "red", ease: "power1.inOut" });
        tl.to(circlePurple, { x: 0, duration: 1, borderRadius: 0, backgroundColor: "red", ease: "power1.inOut" });
        return tl;
    }

    function outtro() {
        let tl = gsap.timeline(
            {
                defaults: { 
                    duration: 1, 
                    ease: "power1.inOut", 
                    borderRadius: 25, 
                    backgroundColor: "green",
                    ease: "steps(5)",
                    yoyo: true, 
                    }
            }
        );
        tl.to(circlePurple, { y: 300 });
        tl.to(circlePurple, { x: 300 });
        tl.to(circlePurple, { y: 0 });
        tl.to(circlePurple, { x: 0 });
        return tl;
    }

    let play = gsap.timeline(
        {
            paused: true,
            // yoyo: true,
            repeat: 2,
            onRepeat: () => {
                label.innerText = parseInt(label.innerText) + 1;
            },
            onComplete: () => {
                label.innerText = 0;
            }
        }
    );
    play.add(intro(), "intro")
        .add(middle(), "middle")
        .add(outtro(), "outtro");
    // play.repeat(-1);


    let currentSeekValue = 0;
    let currentScaleValue = 1;

//   const seekButton = document.querySelector(".seek-button");
  const seekValueSpan = document.querySelector(".seek-value");
  const minusButton = document.querySelector(".seek-button-minus");
  const plusButton = document.querySelector(".seek-button-plus");

  // функція для оновлення відображення та виклику seek
  function updateSeekDisplay() {
    seekValueSpan.textContent = currentSeekValue;
  }

  minusButton.addEventListener("click", () => {
    if (currentSeekValue > 0) {
      currentSeekValue -= 1;
      updateSeekDisplay();
    }
  });

  plusButton.addEventListener("click", () => {
    currentSeekValue += 1;
    updateSeekDisplay();
  });

  // seek
  let seekButton = document.querySelector(".seek-button");

  seekButton.addEventListener("click", () => {
      play.seek(currentSeekValue);
  });

//   const seekButton = document.querySelector(".seek-button");
const scaleValueSpan = document.querySelector(".scale-value");
const minusBtn = document.querySelector(".scale-button-minus");
const plusBtn = document.querySelector(".scale-button-plus");

// функція для оновлення відображення та виклику seek
function updateScaleDisplay() {
  scaleValueSpan.textContent = currentScaleValue;
}

minusBtn.addEventListener("click", () => {
  if (currentScaleValue > 0) {
    currentScaleValue -= 0.5;
    updateScaleDisplay();
  }
});

plusBtn.addEventListener("click", () => {
  currentScaleValue += 0.5;
  updateScaleDisplay();
});

// seek
let scaleButton = document.querySelector(".scale-button");

scaleButton.addEventListener("click", () => {
    play.timeScale(currentScaleValue);
});

    // Revert
    let revertButton = document.querySelector(".revert-button");

    revertButton.addEventListener("click", () => {
        play.revert();
    });

    // Kill
    let killButton = document.querySelector(".kill-button");

    killButton.addEventListener("click", () => {
        play.kill();
    });

    // start
    let playButton = document.querySelector(".play-button");

    playButton.addEventListener("click", () => {
        play.play();
    });

    // pause
    let pauseButton = document.querySelector(".pause-button");

    pauseButton.addEventListener("click", () => {
        play.pause();
    });

    // resume
    let resumeButton = document.querySelector(".resume-button");

    resumeButton.addEventListener("click", () => {
        play.resume();
    });

    // reverse
    let reverseButton = document.querySelector(".reverse-button");

    reverseButton.addEventListener("click", () => {
        play.reverse();
    });

    // restart
    let restartButton = document.querySelector(".restart-button");

    restartButton.addEventListener("click", () => {
        play.restart();
    });

    // Middle button
    let middleButton = document.querySelector(".middle-button");

    middleButton.addEventListener("click", () => {
        play.play("middle");
    });

//   function updateLabelName() {
//     let currentLabel = play.currentLabel();
//     label.innerText = currentLabel;
//   }

//   play.eventCallback("onUpdate", updateLabelName);


// selector() & toArray()
// let x = gsap.utils.selector(document);
// let squares = x(".square");

let squares = gsap.utils.toArray(".square");
// let shuffleBtn = document.querySelector(".shuffle");

// gsap.to(squares, {
//     backgroundColor: gsap.utils.interpolate(["#ff0000", "#00ff00", "#0000ff"], 0.5),
//     x: gsap.utils.interpolate([50, 100, 150], 0),
// });
    let colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#00ffff", "#ff00ff"];
    // shuffleBtn.addEventListener("click", () => {
    //     colors = gsap.utils.shuffle(colors);
    //     Array.from(squares).forEach((square, i) => {
    //         gsap.to(square, {
    //             backgroundColor: colors[i]
    //         });
    //     });
    // })

    gsap.to(squares, {
        backgroundColor: gsap.utils.wrap(colors),
    })

    // let random = gsap.utils.random(0,500);
    // label.innerText = `${random.toFixed(2)}`

    let mappedValue = gsap.utils.mapRange(0, 100, 0, 5, 50);
    label.innerText = `${mappedValue.toFixed(2)}`
});