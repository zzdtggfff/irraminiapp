import * as THREE from 'three';

// ОСНОВНЫЕ ПЕРЕМЕННЫЕ
let scene, camera, renderer;
let score = 0;
const uiElement = document.getElementById('ui');

function init() {
    // 1. СОЗДАНИЕ СЦЕНЫ
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505); // Очень темный серый (почти черный)
    scene.fog = new THREE.Fog(0x050505, 10, 50); // Туман, чтобы дорога уходила в темноту

    // 2. КАМЕРА (вид от третьего лица)
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 3, 5); // Поднимаем камеру чуть выше и назад
    camera.lookAt(0, 0, 0);

    // 3. РЕНДЕРЕР (отрисовка)
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    // 4. ОСВЕЩЕНИЕ (Киберпанк стиль)
    const ambientLight = new THREE.AmbientLight(0x404040, 2); // Мягкий общий свет
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x00ffff, 10, 50); // Синий неон
    blueLight.position.set(-5, 5, 2);
    scene.add(blueLight);

    const pinkLight = new THREE.PointLight(0xff00ff, 10, 50); // Розовый неон
    pinkLight.position.set(5, 5, 2);
    scene.add(pinkLight);

    // Запуск цикла анимации
    animate();
}

// ГЛАВНЫЙ ЦИКЛ ИГРЫ
function animate() {
    requestAnimationFrame(animate);

    // Здесь позже будет логика движения
    
    renderer.render(scene, camera);
}

// ОБРАБОТКА ИЗМЕНЕНИЯ РАЗМЕРА ОКНА
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Запуск
init();
