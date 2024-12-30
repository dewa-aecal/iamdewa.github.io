    const sentences = ["Hello!", "Welcome to my site","ようこそ", "Swipe to see more"];
    let currentIndex = 0;
    const scrambleElement = document.getElementById("scramble");
    const scrambleSpeed = 50; // Time per scramble iteration (ms)
    const transitionSpeed = 1000; // Time to transition to the target sentence (ms)
    const loopDelay = 2000; // Delay before switching to the next sentence (ms)

    function scrambleText(targetText, callback) {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()あいうえおかきくけこさしすせそなにぬねのまみむめもたちつてとやゆよわを";
      const scrambleLength = targetText.length;
      let iterations = 0;
      const maxIterations = 20; // Number of scrambling iterations

      const interval = setInterval(() => {
        let scrambled = "";
        for (let i = 0; i < scrambleLength; i++) {
          scrambled += Math.random() > iterations / maxIterations
            ? characters[Math.floor(Math.random() * characters.length)]
            : targetText[i];
        }
        scrambleElement.textContent = scrambled;

        iterations++;
        if (iterations > maxIterations) {
          clearInterval(interval);
          scrambleElement.textContent = targetText;
          callback();
        }
      }, scrambleSpeed);
    }

    function startAnimationLoop() {
      scrambleText(sentences[currentIndex], () => {
        setTimeout(() => {
          currentIndex = (currentIndex + 1) % sentences.length;
          startAnimationLoop();
        }, loopDelay);
      });
    }

    // Start the animation loop
    startAnimationLoop();