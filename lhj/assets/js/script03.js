document.addEventListener('DOMContentLoaded', function () {
  const textContainer = document.getElementById('textContainer');
  const textWrapper = document.querySelector('.text-wrapper');
  const frontText = document.getElementById('frontText');
  const backText = document.getElementById('backText');

  if (textContainer) {
    textContainer.addEventListener('mouseenter', () => {
      gsap.to(textWrapper, {
        duration: 0.3,
        rotateX: 180,
        ease: 'power2.inOut',
      });
    });

    textContainer.addEventListener('mouseleave', () => {
      gsap.to(textWrapper, {
        duration: 0.3,
        rotateX: 0,
        ease: 'power2.inOut',
      });
    });

    textContainer.addEventListener('click', () => {
      window.location.href = 'mailto:lhj3672@gmail.com';
    });
  }
});
