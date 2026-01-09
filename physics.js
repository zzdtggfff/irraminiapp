export class Physics {
    constructor(player, objectManager) {
        this.player = player;
        this.objectManager = objectManager;
        this.isGameOver = false;
    }

    checkCollisions(onCoinCollect, onGameOver) {
        if (this.isGameOver) return;

        const playerBox = {
            x: this.player.group.position.x,
            z: this.player.group.position.z,
            width: 0.6,
            depth: 0.3
        };

        this.objectManager.objects.forEach((obj, index) => {
            // Простая проверка дистанции по осям X и Z
            const dx = Math.abs(playerBox.x - obj.position.x);
            const dz = Math.abs(playerBox.z - obj.position.z);

            // Если игрок очень близко к объекту
            if (dx < 0.8 && dz < 0.5) {
                if (obj.userData.type === 'obstacle') {
                    this.isGameOver = true;
                    onGameOver();
                } else if (obj.userData.type === 'coin') {
                    // Удаляем монетку из сцены и массива
                    this.objectManager.scene.remove(obj);
                    this.objectManager.objects.splice(index, 1);
                    onCoinCollect();
                }
            }
        });
    }
}
