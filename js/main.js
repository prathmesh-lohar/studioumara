document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.querySelector('.cursor');
  const cursorF = document.querySelector('.cursor-f');

  if (!cursor || !cursorF) return; // safety check

  let cursorX = 0;
  let cursorY = 0;
  let pageX = 0;
  let pageY = 0;
  const followSpeed = 0.16;

  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    cursorF.style.display = 'none';
  }

  window.addEventListener('mousemove', (e) => {
    pageX = e.clientX;
    pageY = e.clientY;
    cursor.style.left = pageX - 4 + 'px';
    cursor.style.top = pageY - 4 + 'px';
  });

  function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }

  function loop() {
    cursorX = lerp(cursorX, pageX, followSpeed);
    cursorY = lerp(cursorY, pageY, followSpeed);
    cursorF.style.top = cursorY - 18 + 'px';
    cursorF.style.left = cursorX - 18 + 'px';
    requestAnimationFrame(loop);
  }
  loop();

  window.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(4.5)';
    cursorF.style.transform = 'scale(0.4)';
  });

  window.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
    cursorF.style.transform = 'scale(1)';
  });
});

// mobile menu 


document.addEventListener('DOMContentLoaded', function() {
  const toggler = document.querySelector('.navbar-toggler');
  const offcanvas = document.querySelector('.offcanvas-menu');
  const overlay = document.querySelector('.offcanvas-overlay');
  const closeBtn = document.querySelector('.close-btn');

  if (toggler && offcanvas && overlay && closeBtn) {
    toggler.addEventListener('click', () => {
      offcanvas.classList.add('active');
      overlay.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
      offcanvas.classList.remove('active');
      overlay.classList.remove('active');
    });

    overlay.addEventListener('click', () => {
      offcanvas.classList.remove('active');
      overlay.classList.remove('active');
    });
  }
});



//services tabs

 document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".btn-filter");
    const serviceItems = document.querySelectorAll(".service-item");

    function applyFilter(filterValue) {
      serviceItems.forEach(item => {
        const cat = item.getAttribute("data-category");
        if (filterValue === "all" || cat === filterValue) {
          item.classList.remove("d-none"); // show
        } else {
          item.classList.add("d-none");    // hide
        }
      });
    }

    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        // toggle active button
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const value = button.getAttribute("data-filter");
        applyFilter(value);
      });
    });
  });


  // hero patter loading

document.addEventListener("DOMContentLoaded", function () {
    const bgElements = document.querySelectorAll(".hero-pattern");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const lowRes = el.dataset.bgLow;
                    const highRes = el.dataset.bgHigh;

                    // Step 1: Load low-res instantly
                    el.style.backgroundImage = `url('${lowRes}')`;

                    // Step 2: Preload high-res image
                    const img = new Image();
                    img.src = highRes;
                    img.onload = () => {
                        // Step 3: Replace once loaded
                        el.style.backgroundImage = `url('${highRes}')`;
                        el.classList.add("loaded");
                    };

                    obs.unobserve(el);
                }
            });
        });
        bgElements.forEach(el => observer.observe(el));
    } else {
        // Fallback (no IntersectionObserver)
        bgElements.forEach(el => {
            el.style.backgroundImage = `url('${el.dataset.bgHigh}')`;
            el.classList.add("loaded");
        });
    }
});
