// danger 모션
window.onload = function() {
    setTimeout(showAlert, 500); // 0.5초 후에 showAlert 함수 실행
};

function showAlert() {
    const alertBox = document.getElementById('alertBox');
    alertBox.style.display = 'block';
}

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
            const height = Math.sin(timestamp * frequency + phase * Math.PI * 2) * amplitudeVariation + (maxHeight + minHeight) / 2;

            wave.style.height = `${height}vw`;
        });

        requestAnimationFrame(animateWaves);
    }

    requestAnimationFrame(animateWaves);
});
