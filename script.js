document.addEventListener("DOMContentLoaded", () => {

  
  // 1. GET WEBSITE ELEMENTS
  

  const envelope = document.getElementById("envelope-container");
  const letter = document.getElementById("letter-container");
  const letterWindow = document.querySelector(".letter-window");

  const noBtn = document.querySelector(".no-btn");
  const yesBtn = document.querySelector(".btn[alt='Yes']");

  const title = document.getElementById("letter-title");
  const catImg = document.getElementById("letter-cat");
  const buttons = document.getElementById("letter-buttons");
  const clickHereBtn = document.getElementById("click-here-btn");
  const finalText = document.getElementById("final-text");

  const loveLetter = document.getElementById("love-letter");
  const moreLoveBtn = document.getElementById("more-love-btn");
  const memoriesScreen = document.getElementById("memories-screen");
  const music = document.getElementById("background-music");

  const ticketRain = document.getElementById("ticket-rain");

  const messageScreen =
    document.getElementById("ticket-message-screen");

  const messageTitle =
    document.getElementById("ticket-message-title");

  const messageText =
    document.getElementById("ticket-message-text");

  const closeMessageBtn =
    document.getElementById("close-ticket-message");



  // 2. OPEN THE ENVELOPE

  if (envelope && letter) {
    envelope.addEventListener("click", () => {
      envelope.style.display = "none";
      letter.style.display = "flex";

      setTimeout(() => {
        if (letterWindow) {
          letterWindow.classList.add("open");
        }
      }, 50);
    });
  }



  // 3. MAKE THE NO BUTTON MOVE
  

  if (noBtn) {
    noBtn.addEventListener("mouseover", () => {
      const distance = 200;
      const angle = Math.random() * Math.PI * 2;

      const moveX = Math.cos(angle) * distance;
      const moveY = Math.sin(angle) * distance;

      noBtn.style.transition = "transform 0.3s ease";
      noBtn.style.transform =
        `translate(${moveX}px, ${moveY}px)`;
    });
  }


  
  // 4. YES BUTTON AND MUSIC
  

  if (yesBtn) {
    yesBtn.addEventListener("click", () => {

      if (music) {
        music.play().catch(error => {
          console.log("Music playback error:", error);
        });
      }

      if (title) {
        title.textContent = "Yeeeeeee!";
      }

      if (catImg) {
        catImg.src = "cat_dance.gif";
      }

      if (letterWindow) {
        letterWindow.classList.add("final");
      }

      if (buttons) {
        buttons.style.display = "none";
      }

      if (finalText) {
        finalText.style.display = "block";
      }

      if (clickHereBtn) {
        clickHereBtn.style.display = "inline-block";
      }
    });
  }


  
  // 5. SHOW THE PAPER LETTER

  if (clickHereBtn) {
    clickHereBtn.addEventListener("click", () => {

      document.body.style.backgroundImage = 'url("paper.jpeg")';
      document.body.style.backgroundSize = "95% auto";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center";

      if (letterWindow) {
        letterWindow.style.backgroundImage = "none";
        letterWindow.style.position = "static";
      }

      if (title) title.style.display = "none";
      if (catImg) catImg.style.display = "none";
      if (finalText) finalText.style.display = "none";
      if (clickHereBtn) clickHereBtn.style.display = "none";
      if (buttons) buttons.style.display = "none";

      if (loveLetter) {
        loveLetter.style.display = "block";
        loveLetter.style.position = "relative";
        loveLetter.style.zIndex = "10";
      }

      if (moreLoveBtn) {
        moreLoveBtn.style.display = "block";
      }
    });
  }



  // 6. OPEN THE MEMORY SCREEN
  

  if (moreLoveBtn && memoriesScreen) {
    moreLoveBtn.addEventListener("click", () => {

      if (letter) {
        letter.style.display = "none";
      }

      if (loveLetter) {
        loveLetter.style.display = "none";
      }

      moreLoveBtn.style.display = "none";
      document.body.style.backgroundImage = "none";

      memoriesScreen.style.display = "block";
      memoriesScreen.style.position = "fixed";
      memoriesScreen.style.inset = "0";
      memoriesScreen.style.width = "100vw";
      memoriesScreen.style.height = "100vh";
      memoriesScreen.style.zIndex = "1000";
    });
  }



  // 7. CREATE 10 FALLING TICKETS


  if (
    ticketRain &&
    ticketRain.querySelectorAll(".falling-ticket").length === 0
  ) {

    for (let i = 1; i <= 10; i++) {

      const ticket = document.createElement("img");

      ticket.src = `ticket${i}.png`;
      ticket.alt = `Memory ticket ${i}`;
      ticket.className = "falling-ticket";
      ticket.dataset.ticketIndex = i - 1;

      const column = (i - 1) % 10;

      ticket.style.left = `${column * 10 + Math.random() * 4}%`;

      ticket.style.width =
        `${250 + Math.random() * 100}px`;

      ticket.style.height = "auto";
      ticket.style.top = "-100px";

      ticket.style.animationDuration =
        `${35 + Math.random() * 10}s`;

      ticket.style.animationDelay =
        `${-Math.random() * 30}s`;

      ticket.style.cursor = "pointer";
      ticket.style.pointerEvents = "auto";

      ticketRain.appendChild(ticket);
    }
  }


  
  // 8. TICKET MESSAGES
  // EDIT THESE MESSAGES LATER
  

  const ticketMessages = [
    "you'll always be my Mr.perfect 💗",
    "pratik,i might not be perfect but i want to show you the best version of mine and i will always be best just like you i will also make you feel loved 💌",
    "i love bringing you flowers because i really want to do with you what spring does with garden hehe🌷",
    "i care about you what you do really mattered and thats when i first realised that im in loveeeeeey",
    "yk you are in my heart and you shall be there forever and i wish you are happy when you think of me because i am when i think of you 💕",,
    "you know you'll be the last dream of this soul of mine ✨",
    "i love you, yk you really showed me what type of love i always dreamed of and i hope i showed you too",
    "if i die someday you'll be my last 7 minutes🧸",
    "i never hoped that i could find everything in one person yet here i am, whenever i hear the word 'love' all my mind gets filled of your thoughts💖",
    "sad,we are not together physically, but atleast we are looking at the same moon ♡"
  ];

  const openedTickets = new Set();

  let allTicketsOpened = false;
  let heartFormed = false;


  // =========================
  // 9. OPEN A TICKET WHEN CLICKED
  // =========================

  if (ticketRain && messageScreen) {

    ticketRain.addEventListener("click", (event) => {

      const ticket = event.target.closest(".falling-ticket");

      if (!ticket || !ticketRain.contains(ticket)) {
        return;
      }

      if (heartFormed) {
        return;
      }

      const index = Number(ticket.dataset.ticketIndex);

      if (
        Number.isNaN(index) ||
        index < 0 ||
        index >= ticketMessages.length
      ) {
        return;
      }

      openedTickets.add(index);

      if (messageTitle) {
        messageTitle.textContent = `Ticket ${index + 1} ♡`;
      }

      if (messageText) {
        messageText.textContent = ticketMessages[index];
      }

      messageScreen.style.display = "flex";

      // All 10 DIFFERENT tickets must be opened.
      if (openedTickets.size === 10) {
        allTicketsOpened = true;
      }
    });
  }

  // 10. FORM A HEART WITH TICKETS
  

  function formTicketHeart() {

    if (heartFormed || !ticketRain) {
      return;
    }

    heartFormed = true;

    // Get the original 10 tickets.
    const originalTickets = Array.from(
      ticketRain.querySelectorAll(".falling-ticket")
    );

    const allTickets = [...originalTickets];

    // Add 10 extra copies to make the heart fuller.
    for (let i = 0; i < 10; i++) {

      const copy = document.createElement("img");

      copy.src = `ticket${i + 1}.png`;
      copy.alt = "Our memory";
      copy.className = "heart-ticket-copy";

      ticketRain.appendChild(copy);
      allTickets.push(copy);
    }

    // Remove any old heart layer.
    const oldHeart = document.getElementById("ticket-heart");

    if (oldHeart) {
      oldHeart.remove();
    }

    // Create the heart container.
    const heartLayer = document.createElement("div");

    heartLayer.id = "ticket-heart";

    Object.assign(heartLayer.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      zIndex: "6",
      pointerEvents: "none",
      overflow: "visible"
    });

    ticketRain.appendChild(heartLayer);

    // Stop the rain and prepare the tickets.
    allTickets.forEach(ticket => {

      ticket.style.animation = "none";
      ticket.style.display = "block";
      ticket.style.position = "absolute";
      ticket.style.width = "clamp(150px, 22vw, 280px)";
      ticket.style.height = "auto";
      ticket.style.padding = "0";
      ticket.style.margin = "0";
      ticket.style.boxSizing = "border-box";
      ticket.style.pointerEvents = "none";
      ticket.style.zIndex = "6";

      heartLayer.appendChild(ticket);
    });

    // Positions for the tickets.
    const heartPositions = [
      // Left upper curve
      [18, 27],
      [21, 19],
      [28, 14],
      [36, 14],
      [43, 19],

      // Top centre dip
      [50, 26],

      // Right upper curve
      [57, 19],
      [64, 14],
      [72, 14],
      [79, 19],
      [82, 27],

      // Heart sides narrowing down
      [76, 36],
      [69, 44],
      [62, 51],
      [56, 57],

      // Extra tickets along the left outline
      [24, 35],
      [31, 43],
      [38, 50],
      [44, 56],

      // SHARP BOTTOM POINT
      [50, 68]
    ];

    // Put all tickets together in the centre.
    allTickets.forEach(ticket => {

      ticket.style.transition = "none";
      ticket.style.left = "50%";
      ticket.style.top = "40%";

      ticket.style.transform =
        "translate(-50%, -50%) scale(0.2)";
    });

    // Spread out to form the heart.
    requestAnimationFrame(() => {

      allTickets.forEach((ticket, index) => {

        const [x, y] = heartPositions[index];

        ticket.style.transition =
          `left 1.3s ease ${index * 0.09}s, ` +
          `top 1.3s ease ${index * 0.09}s, ` +
          `transform 1.3s ease ${index * 0.09}s`;

        ticket.style.left = `${x}%`;
        ticket.style.top = `${y}%`;

        ticket.style.transform =
          `translate(-50%, -50%) rotate(${index % 2 ? 4 : -4}deg) scale(1)`;
      });
    });

    // FINAL SURPRISE HEART — IN THE MIDDLE
    setTimeout(() => {

      const surpriseHeart = document.createElement("div");

      surpriseHeart.id = "surprise-heart";
      surpriseHeart.innerHTML = "💗";
      surpriseHeart.title = "One last surprise ♡";

      Object.assign(surpriseHeart.style, {
        position: "fixed",
        left: "50%",
        top: "40%",
        transform: "translate(-50%, -50%)",
        width: "75px",
        height: "75px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "55px",
        cursor: "pointer",
        zIndex: "10000",
        filter: "drop-shadow(0 0 12px #440a0a)",
        animation: "surprisePulse 1s ease-in-out infinite alternate",
        userSelect: "none"
      });

      document.body.appendChild(surpriseHeart);

      // CLICK THE PINK HEART TO OPEN THE FINAL VIDEO PAGE
      surpriseHeart.addEventListener("click", () => {

        // Stop the background song
        if (music) {
          music.pause();
          music.currentTime = 0;
        }

        // Hide the memories screen and pink heart
        if (memoriesScreen) {
          memoriesScreen.style.display = "none";
        }

        surpriseHeart.style.display = "none";

        // Background image (works with page.jpeg OR page.png)
        document.body.style.backgroundImage =
          'url("page.jpeg"), url("page.png")';
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundColor = "#240b16";
        document.body.style.margin = "0";
        document.body.style.minHeight = "100vh";
        document.body.style.overflow = "auto";

        // Create the final video page (Canva / music player style)
        const videoPage = document.createElement("div");
        videoPage.id = "final-video-page";

        videoPage.innerHTML = `
          <div class="cute-browser-window">
            <div class="bunny-sticker">🐰</div>

            <div class="browser-top-bar">
              <span class="browser-star">☆</span>
              <div class="browser-url">🔒 our-special-song.love</div>
            </div>

            <div class="browser-content">
              <video id="apocalypse-video" playsinline preload="metadata">
                <source src="video.mp4" type="video/mp4">
                Your browser does not support this video.
              </video>

              <div class="video-info">
                <h2 class="video-title">Apocalypse &lt;3</h2>
<p class="video-artist">Cigarettes After Sex</p>
              </div>

              <input id="seek-bar" class="seek-bar" type="range" min="0" max="100" value="0" step="0.1">

              <div class="player-controls">
                <button id="like-btn" class="ctrl-btn" aria-label="Like">♡</button>
                <button id="prev-btn" class="ctrl-btn" aria-label="Restart">⏮</button>
                <button id="play-btn" class="ctrl-btn play" aria-label="Play">▶</button>
                <button id="next-btn" class="ctrl-btn" aria-label="Forward 10s">⏭</button>
                <button id="plus-btn" class="ctrl-btn" aria-label="More">⊕</button>
              </div>

              <p class="video-caption">HAPPYYYY BIRTHDAYYYYY BABY ♡</p>
            </div>
          </div>
        `;

        document.body.appendChild(videoPage);

        // ---- Custom player controls ----
        const vid = videoPage.querySelector("#apocalypse-video");
        const playBtn = videoPage.querySelector("#play-btn");
        const prevBtn = videoPage.querySelector("#prev-btn");
        const nextBtn = videoPage.querySelector("#next-btn");
        const likeBtn = videoPage.querySelector("#like-btn");
        const seekBar = videoPage.querySelector("#seek-bar");

        function togglePlay() {
          if (vid.paused) {
            vid.play();
          } else {
            vid.pause();
          }
        }

        playBtn.addEventListener("click", togglePlay);
        vid.addEventListener("click", togglePlay);
        vid.addEventListener("play", () => (playBtn.textContent = "⏸"));
        vid.addEventListener("pause", () => (playBtn.textContent = "▶"));
        vid.addEventListener("ended", () => (playBtn.textContent = "▶"));

        prevBtn.addEventListener("click", () => {
          vid.currentTime = 0;
        });

        nextBtn.addEventListener("click", () => {
          vid.currentTime = Math.min(
            vid.currentTime + 10,
            vid.duration || vid.currentTime
          );
        });

        likeBtn.addEventListener("click", () => {
          const liked = likeBtn.classList.toggle("liked");
          likeBtn.textContent = liked ? "♥" : "♡";
        });

        vid.addEventListener("timeupdate", () => {
          if (!vid.duration) return;
          const percent = (vid.currentTime / vid.duration) * 100;
          seekBar.value = percent;
          seekBar.style.setProperty("--p", percent + "%");
        });

        seekBar.addEventListener("input", () => {
          if (!vid.duration) return;
          vid.currentTime = (seekBar.value / 100) * vid.duration;
          seekBar.style.setProperty("--p", seekBar.value + "%");
        });

      });

    }, 3000);

  }


   // 11. CLOSE MESSAGE
  // FORM HEART AFTER ALL 10

  if (closeMessageBtn && messageScreen) {

    closeMessageBtn.addEventListener("click", () => {

      messageScreen.style.display = "none";

      if (allTicketsOpened) {
        formTicketHeart();
      }
    });
  }

});