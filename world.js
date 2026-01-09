import * as THREE from 'three';

export class World {
    constructor(scene) {
        this.scene = scene;
        this.roadGroup = new THREE.Group();
        this.scene.add(this.roadGroup);
        
        this.roadLength = 100; // Длина одного сегмента дороги
        this.segmentCount = 3; // Сколько сегментов в памяти одновременно
        this.segments = [];
        
        this.createRoad();
    }

    createRoad() {
        for (let i = 0; i < this.segmentCount; i++) {
            this.addSegment(i * this.roadLength);
        }
    }

    addSegment(zOffset) {
        // Геометрия дороги (ширина 10, длина roadLength)
        const geometry = new THREE.PlaneGeometry(10, this.roadLength);
        
        // Материал дороги (темный металл с неоновыми полосками)
        const material = new THREE.MeshStandardMaterial({ 
            color: 0x111111, 
            roughness: 0.1, 
            metalness: 0.5 
        });
        
        const road = new THREE.Mesh(geometry, material);
        road.rotation.x = -Math.PI / 2; // Кладем на пол
        road.position.z = -zOffset;
        
        // Добавляем "рельсы" или разметку (светящиеся линии)
        this.addRails(road);
        
        this.roadGroup.add(road);
        this.segments.push(road);
    }

    addRails(parentRoad) {
        const railGeo = new THREE.BoxGeometry(0.2, this.roadLength, 0.1);
        const railMat = new THREE.MeshBasicMaterial({ color: 0x00ffff }); // Циановый неон

        const leftRail = new THREE.Mesh(railGeo, railMat);
        leftRail.position.set(-3, 0, 0.05);
        
        const rightRail = new THREE.Mesh(railGeo, railMat);
        rightRail.position.set(3, 0, 0.05);

        parentRoad.add(leftRail, rightRail);
    }

    update(speed) {
        // Двигаем каждый сегмент дороги на игрока
        this.segments.forEach(segment => {
            segment.position.z += speed;

            // Если сегмент ушел далеко за спину, перекидываем его вперед
            if (segment.position.z > 20) {
                segment.position.z -= this.roadLength * this.segmentCount;
            }
        });
    }
}
