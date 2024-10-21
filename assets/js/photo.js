document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger);

  // 이미지 등장 애니메이션 (이미지 감싸는 div를 대상으로 설정)
  gsap.fromTo(
    '.project-image-wrapper',
    {
      opacity: 0,
      y: 50, // 아래에서 위로 등장
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.project-image-wrapper',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  );

  // PED 텍스트 등장 애니메이션
  const pedText = document.querySelector('.title');
  if (pedText) {
    pedText.innerHTML = pedText.textContent
      .split('')
      .map((char) => `<span class="char">${char}</span>`)
      .join('');

    gsap.fromTo(
      pedText.querySelectorAll('.char'),
      {
        y: 0, // 초기 y 위치
        opacity: 0, // 처음에는 보이지 않음
      },
      {
        y: 0,
        opacity: 1, // 빠르게 등장
        duration: 0.3,
        ease: 'power1.out', // 더 부드럽게
        stagger: 0.05, // 각 글자마다 약간의 지연 시간
        scrollTrigger: {
          trigger: pedText,
          start: 'top 100%', // 화면에 빨리 등장
          toggleActions: 'play none none reset',
        },
      }
    );
  }

  // 라인 애니메이션 (왼쪽에서 오른쪽으로 등장)
  gsap.fromTo(
    '.line',
    { width: '0%' }, // 처음에는 너비가 0
    {
      width: '100%', // 오른쪽으로 너비가 채워짐
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.line', // 라인이 화면에 보일 때 시작
        start: 'top 100%', // 화면의 80% 지점에 도달하면 애니메이션 시작
        toggleActions: 'play none none reset',
      },
    }
  );

  // 태그 텍스트 등장 애니메이션 (#html, #UI/UX, #영상제작)
  const tagText = document.querySelectorAll('.tag');
  tagText.forEach((tag) => {
    tag.innerHTML = tag.textContent
      .split('')
      .map((char) => `<span class="char">${char}</span>`)
      .join('');

    gsap.fromTo(
      tag.querySelectorAll('.char'),
      {
        y: 0,
        opacity: 0, // 처음에는 보이지 않음
      },
      {
        y: 0,
        opacity: 1, // 바로 나타남
        duration: 0.3, // 빠르게 등장
        ease: 'power1.out', // 부드럽게
        stagger: 0.05, // 각 글자마다 약간의 지연 시간
        scrollTrigger: {
          trigger: tag,
          start: 'top 100%', // 태그가 보일 때 등장
          toggleActions: 'play none none reset',
        },
      }
    );
  });
});

let currentIndex = 0;
const images = document.querySelectorAll('#imageSlider img');
const totalImages = images.length;
const imageSlider = document.getElementById('imageSlider');
const nextButton = document.getElementById('nextButton');

// 오른쪽 버튼 클릭 이벤트
nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalImages; // 다음 이미지로 넘어가며, 마지막 이미지일 경우 처음으로 돌아감
  const offset = currentIndex * -100; // 현재 인덱스에 맞는 슬라이드 이동
  imageSlider.style.transform = `translateX(${offset}%)`; // 이미지 이동
});
