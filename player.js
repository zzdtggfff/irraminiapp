import * as THREE from 'three';

export class Player {
    constructor(scene) {
        this.scene = scene;
        this.group = new THREE.Group();
        
        // Параметры персонажа
        this.height = 1.8;
        this.runSpeed = 0;
        this.lane = 0; // -1: лево, 0: центр, 1: право
        this.laneWidth = 3;

        this.createModel();
        this.scene.add(this.group);
    }

    createModel() {
        // МАТЕРИАЛЫ
        const clothesMat = new THREE.MeshStandardMaterial({ color: 0x222222 }); // Темная куртка
        const skinMat = new THREE.MeshStandardMaterial({ color: 0xffdbac });   // Кожа
        const neonMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });      // Неон на маске/одежде
        const bootMat = new THREE.MeshStandardMaterial({ color: 0x111111 });   // Обувь

        // ТУЛОВИЩЕ
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.7, 0.3), clothesMat);
        body.position.y = 1.1;
        this.group.add(body);

        // ГОЛОВА (В маске киберпанка)
        const headGroup = new THREE.Group();
        const head = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.25, 0.25), skinMat);
        const mask = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.15, 0.15), neonMat);
        mask.position.set(0, -0.05, 0.1); // Маска закрывает лицо
        headGroup.add(head, mask);
        headGroup.position.y = 1.6;
        this.group.add(headGroup);

        // НОГИ
        this.leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.6, 0.2), clothesMat);
        this.leftLeg.position.set(-0.15, 0.5, 0);
        this.group.add(this.leftLeg);

        this.rightLeg = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.6, 0.2), clothesMat);
        this.rightLeg.position.set(0.15, 0.5, 0);
        this.group.add(this.rightLeg);

        // РУКИ (В одной руке баллончик)
        this.leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.6, 0.15), clothesMat);
        this.leftArm.position.set(-0.4, 1.1, 0);
        this.group.add(this.leftArm);

        this.rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.6, 0.15), clothesMat);
        this.rightArm.position.set(0.4, 1.1, 0);
        
        // Баллончик с краской (неоновый)
        const can = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.2), neonMat);
        can.rotation.x = Math.PI / 2;
        can.position.y = -0.3;
        this.rightArm.add(can);
        
        this.group.add(this.rightArm);
    }

    animateRun(time) {
        // Логика бега: махи ногами и руками
        const angle = Math.sin(time * 10) * 0.5;
        
        this.leftLeg.rotation.x = angle;
        this.rightLeg.rotation.x = -angle;
        
        this.leftArm.rotation.x = -angle;
        this.rightArm.rotation.x = angle;

        // Легкое покачивание тела при беге
        this.group.position.y = Math.abs(Math.cos(time * 10) * 0.1);
        
        // Плавный переход между линиями
        const targetX = this.lane * this.laneWidth;
        this.group.position.x += (targetX - this.group.position.x) * 0.1;
    }
}
