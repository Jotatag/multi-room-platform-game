import { keyDown, keyUp } from '../../services/eventListeners';

class PlayerDTO {
    constructor(canvasInstance) {
        this.position = {
            x: 100,
            y: 100
        }

        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravity = 0.2;

        this.width = 100;
        this.height = 100;
        this.sides = {
            bottom: this.position.y + this.height
        }
        
        this.canvasInstance = canvasInstance;
        this.canvasContext = this.canvasInstance.getContext('2d');

        this.switchCase =
            (obj) =>
            (value) => {
                return obj[value] || obj['_default'];
            }

        this.movements = {
            'w': {
                'action': 'jump',
                'start': () => {
                    if (this.velocity.y !== 0) return;
                    this.velocity.y = -10;
                },
                'stop': () => {}
            },
            'a': {
                'action': 'left',
                'pressed': false,
                'start': () => { this.movements.a.pressed = true },
                'stop': () => { this.movements.a.pressed = false }
            },
            'd': {
                'action': 'right',
                'pressed': false,
                'start': () => { this.movements.d.pressed = true },
                'stop': () => { this.movements.d.pressed = false }
            },
            '_default': {
                'start': () => {},
                'stop': () => {}
            }
        }
        this.bindMovements();
    }

    draw() {
        this.velocity.x = 0;
        if(this.movements.d.pressed) this.velocity.x = 2;
        else if(this.movements.a.pressed) this.velocity.x = -2;

        this.canvasContext.fillStyle = 'red';
        this.canvasContext.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.sides.bottom = this.position.y + this.height;

        if(this.sides.bottom + this.velocity.y < this.canvasInstance.height) {
            this.velocity.y += this.gravity;
        } else this.velocity.y = 0;
    }

    bindMovements() {
        const getKey = this.switchCase(this.movements);

        keyDown((key) => {
            getKey(key).start();
        });

        keyUp((key) => {
            getKey(key).stop();
        });
    }
}

export default PlayerDTO;
