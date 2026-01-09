export class Controls {
    constructor(player) {
        this.player = player;
        this.init();
    }

    init() {
        window.addEventListener('keydown', (e) => {
            switch(e.code) {
                case 'ArrowLeft':
                case 'KeyA':
                    this.moveLeft();
                    break;
                case 'ArrowRight':
                case 'KeyD':
                    this.moveRight();
                    break;
                case 'ArrowUp':
                case 'KeyW':
                case 'Space':
                    this.jump();
                    break;
            }
        });

        // Поддержка свайпов для мобилок (на будущее)
        let touchStartX = 0;
        window.addEventListener('touchstart', (e) => touchStartX = e.touches[0].clientX);
        window.addEventListener('touchend', (e) => {
            let touchEndX = e.changedTouches[0].clientX;
            if (touchStartX - touchEndX > 50) this.moveLeft();
            if (touchEndX - touchStartX > 50) this.moveRight();
        });
    }

    moveLeft() {
        if (this.player.lane > -1) {
            this.player.lane--;
        }
    }

    moveRight() {
        if (this.player.lane < 1) {
            this.player.lane++;
        }
    }

    jump() {
        // Логику прыжка добавим чуть позже в player.js, 
        // когда внедрим гравитацию
        console.log("Jump!"); 
    }
}
