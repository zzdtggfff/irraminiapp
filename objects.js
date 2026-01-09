import * as THREE from 'three';

export class ObjectManager {
    constructor(scene) {
        this.scene = scene;
        this.objects = [];
        this.lanes = [-3, 0, 3]; // Координаты линий
        this.timer = 0;
    }

    spawnObstacle(zPos) {
        const type = Math.random();
        let obj;

        if (type > 0.3) {
            // ПРЕПЯТСТВИЕ (Красный неоновый блок)
            const geometry = new THREE.BoxGeometry(2, 1, 1);
            const material = new THREE.MeshStandardMaterial({ 
                color: 0xff0000, 
                emissive: 0xff0000, 
                emissiveIntensity: 0.5 
            });
            obj = new THREE.Mesh(geometry, material);
            obj.userData = { type: 'obstacle' };
        } else {
            // МОНЕТКА (Желтый светящийся диск)
            const geometry = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 16);
            const material = new THREE.MeshStandardMaterial({ 
                color: 0xffff00, 
                emissive: 0xffff00, 
                emissiveIntensity: 1 
            });
            obj = new THREE.Mesh(geometry, material);
            obj.rotation.x = Math.PI / 2;
            obj.userData = { type: 'coin' };
        }

        // Выбираем случайную линию
        obj.position.set(this.lanes[Math.floor(Math.random() * 3)], 0.5, zPos);
        this.scene.add(obj);
        this.objects.push(obj);
    }

    update(speed, player) {
        this.timer++;

        // Генерируем новый объект каждые 60 кадров (примерно раз в секунду)
        if (this.timer % 60 === 0) {
            this.spawnObstacle(-50); // Спавним далеко впереди
        }

        // Двигаем объекты на игрока и удаляем те, что улетели назад
        for (let i = this.objects.length - 1; i >= 0; i--) {
            const obj = this.objects[i];
            obj.position.z += speed;

            // Если объект пролетел мимо игрока
            if (obj.position.z > 10) {
                this.scene.remove(obj);
                this.objects.splice(i, 1);
            }

            // Вращение монеток для красоты
            if (obj.userData.type === 'coin') {
                obj.rotation.z += 0.05;
            }
        }
    }
}
