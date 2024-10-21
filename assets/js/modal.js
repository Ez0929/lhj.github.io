const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');

// 모달 열기
openModal.addEventListener('click', function (event) {
  event.preventDefault(); // 기본 링크 동작 막기
  videoModal.classList.add('active');
  modalVideo.play(); // 모달 열리면 동영상 재생
});

// 모달 닫기
closeModal.addEventListener('click', function () {
  videoModal.classList.remove('active');
  modalVideo.pause(); // 모달 닫으면 동영상 일시정지
  modalVideo.currentTime = 0; // 동영상 시간 초기화
});

// 모달 외부 클릭 시 닫기
videoModal.addEventListener('click', function (event) {
  if (event.target === videoModal) {
    videoModal.classList.remove('active');
    modalVideo.pause();
    modalVideo.currentTime = 0;
  }
});
