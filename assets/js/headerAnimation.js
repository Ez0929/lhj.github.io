document.addEventListener('DOMContentLoaded', function () {
  // GSAP animation for the header (fade in and slide up)
  gsap.from('header', {
    duration: 1, // Animation duration
    y: -100, // Starts from above the viewport
    opacity: 0, // Initially transparent
    ease: 'power2.out', // Smooth easing effect
    delay: 0.5, // Delay before the header animation starts
  });
});

// 부드럽게 스크롤 이동
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});
