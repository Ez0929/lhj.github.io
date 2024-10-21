// GSAP 애니메이션 스크립트
document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger);

  // 모든 섹션에 대해 스크롤 애니메이션 적용
  gsap.utils.toArray('section').forEach((section, index) => {
    const wrapper = section.querySelector('.wrapper');

    // wrapper 요소가 존재하는 경우에만 애니메이션 적용
    if (wrapper) {
      const [x, xEnd] =
        index % 2 === 0
          ? [wrapper.scrollWidth * -1, 0] // 첫 번째 섹션: 왼쪽에서 오른쪽으로
          : ['100%', (wrapper.scrollWidth - section.offsetWidth) * -1]; // 두 번째 섹션: 오른쪽에서 왼쪽으로

      gsap.fromTo(
        wrapper,
        { x },
        {
          x: xEnd,
          scrollTrigger: {
            trigger: section,
            scrub: 5, // 스크롤에 맞춰 최대한 천천히 애니메이션 진행
            start: 'top bottom', // 애니메이션 시작 위치를 조정 (섹션이 뷰포트 하단에 도달하면 시작)
            end: 'bottom top', // 섹션이 화면을 완전히 벗어날 때까지 지속
          },
          ease: 'power1.inOut', // 부드럽게 가속 및 감속
          duration: 5, // 애니메이션 지속 시간을 크게 설정하여 천천히 진행
        }
      );
    }
  });
});
