document.addEventListener('DOMContentLoaded', function () {
  // GSAP ScrollTrigger 플러그인 등록
  gsap.registerPlugin(ScrollTrigger);

  // 타이핑 효과 함수 (화면 시작 시 타이핑 효과로 텍스트 생성)
  function typeWriter(element, text, delay = 100, callback = null) {
    let index = 0;
    element.innerHTML = ''; // 기존 텍스트 지우기

    function type() {
      if (index < text.length) {
        if (text.charAt(index) === '\n') {
          element.innerHTML += '<br>'; // 개행 처리
        } else {
          element.innerHTML += text.charAt(index); // 한 글자씩 추가
        }
        index++;
        setTimeout(type, delay); // 각 문자마다 지연 시간 설정
      } else {
        if (callback) callback();
      }
    }
    type();
  }

  // 스크롤에 따라 텍스트 삭제
  function scrollBasedBackspace(element, totalSteps, progress) {
    const stepsToRemove = Math.round(totalSteps * progress); // 스크롤 진행도에 따라 지울 글자 수 계산
    let displayedText = fullText.substring(0, totalSteps - stepsToRemove);
    displayedText = displayedText.replace(/\n/g, '<br>'); // 개행을 <br>로 변환하여 유지
    element.innerHTML = displayedText;
  }

  // 스크롤에 따라 텍스트 타이핑 효과
  function typeWriterByScroll(element, totalSteps, progress) {
    const stepsToShow = Math.round(totalSteps * progress);
    let displayedText = fullText.substring(0, stepsToShow);
    displayedText = displayedText.replace(/\n/g, '<br>');
    element.innerHTML = displayedText;
  }

  const titleElement = document.getElementById('portfolio-title');
  const fullText = 'HYUNJUN\nPORTFOLIO';

  // 처음 타이핑 효과 적용
  typeWriter(titleElement, fullText, 80, () => {
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalSteps = fullText.length;
        if (progress > 0 && progress < 1) {
          scrollBasedBackspace(titleElement, totalSteps, progress);
        } else if (progress === 1) {
          titleElement.innerHTML = '';
        }
      },
    });
  });

  // 라인 애니메이션
  gsap.to('#line', {
    duration: 2,
    width: '100%',
    ease: 'power4.out',
  });

  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      gsap.to('#line', { width: `${100 - progress * 100}%` });
    },
  });

  // 상단 텍스트 애니메이션 (p -> .hero-text로 변경)
  const texts = [
    { selector: '.hero-text', delay: 0.2 }, // 특정 클래스만 선택
    { selector: 'h2', delay: 0.3 },
    { selector: 'h3', delay: 0.5 },
  ];

  texts.forEach((text) => {
    const elements = document.querySelectorAll(text.selector);
    gsap.fromTo(
      elements,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'back.out(1.7)',
        stagger: 0.2,
        delay: text.delay,
        scrollTrigger: {
          trigger: elements,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  // // "이력서 보기" 텍스트 애니메이션
  // const resumeButton = document.getElementById('resume-button');

  // if (resumeButton) {
  //   gsap.fromTo(
  //     resumeButton,
  //     { x: 200, opacity: 0 },
  //     {
  //       x: 0,
  //       opacity: 1,
  //       duration: 1.5,
  //       ease: 'power3.out',
  //       scrollTrigger: {
  //         trigger: resumeButton,
  //         start: 'top 80%',
  //         toggleActions: 'play none none reset',
  //       },
  //     }
  //   );
  // } else {
  //   console.error('이력서 보기 요소를 찾을 수 없습니다.');
  // }

  // 아이콘 애니메이션
  gsap.fromTo(
    '#skill-icons img',
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: '#skill-icons',
        start: 'top 60%',
        toggleActions: 'play none none reset',
      },
    }
  );
});
