window.onload = function () {
  setTimeout(showAlert, 500); // 0.5초 후에 showAlert 함수 실행
};

function showAlert() {
  const alertBox = document.getElementById('alertBox');
  alertBox.style.display = 'block';
}

// 소리측정;

async function startSoundMeasurement() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    const scriptProcessor = audioContext.createScriptProcessor(256, 1, 1);

    analyser.smoothingTimeConstant = 0.8;
    analyser.fftSize = 1024;

    microphone.connect(analyser);
    analyser.connect(scriptProcessor);
    scriptProcessor.connect(audioContext.destination);

    scriptProcessor.onaudioprocess = function () {
      const array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);

      let values = 0;
      const length = array.length;
      for (let i = 0; i < length; i++) {
        values += array[i];
      }

      const average = values / length;
      const dbValue = Math.round(20 * Math.log10(average / 255));

      document.querySelector('.db').innerText = `${dbValue}dB`;

      // 현재 페이지 경로
      const currentPage = window.location.pathname;
      console.log(currentPage);

      if (dbValue <= -50) {
        if (currentPage !== 'main.html') {
          window.location.href = 'main.html';
        }
      } else if (dbValue > -30 && dbValue <= -20) {
        if (currentPage !== 'main02.html') {
          window.location.href = 'main02.html';
        }
      } else if (dbValue > -20) {
        if (currentPage !== 'main03.html') {
          window.location.href = 'main03.html';
        }
      }
    };
  } catch (err) {
    console.error(err);
    alert('마이크 권한을 허용해주세요.');
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  startSoundMeasurement();
});

//움직이는 애니메이션
document.addEventListener('DOMContentLoaded', () => {
  const waveGroups = document.querySelectorAll('.wave-group');
  const waves = [...waveGroups[0].children, ...waveGroups[1].children];

  const minHeight = 5; // 최소 높이 (vw)
  const maxHeight = 20; // 최대 높이 (vw)
  const baseFrequency = 0.002; // 기본 주파수
  const amplitudeVariation = 5; // 진폭 변화

  function animateWaves(timestamp) {
    waves.forEach((wave, index) => {
      const groupIndex = Math.floor(index / 5); // 5개씩 그룹화
      const withinGroupIndex = index % 5;

      // 그룹별로 다른 주파수와 위상 사용
      const frequency = baseFrequency * (groupIndex + 1);
      const phase = withinGroupIndex / 5;

      // 사인파를 사용하여 높이 계산
      const height =
        Math.sin(timestamp * frequency + phase * Math.PI * 2) *
          amplitudeVariation +
        (maxHeight + minHeight) / 2;

      wave.style.height = `${height}vw`;
    });

    requestAnimationFrame(animateWaves);
  }

  requestAnimationFrame(animateWaves);
});

// 주기적으로 서버에 현재 페이지 확인
setInterval(checkPageUpdate, 200);
