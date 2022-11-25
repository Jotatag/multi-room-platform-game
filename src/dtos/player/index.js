import C from '../../services/canvas';
import { keyDown, keyUp } from '../../services/eventListeners';

class PlayerDTO {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }

        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravity = 0.2;
        this.runSpeed = 2;

        this.width = 100;
        this.height = 100;
        this.sides = {
            bottom: this.position.y + this.height
        }

        this.switchCase =
            (obj) =>
            (value) => {
                return obj[value] || obj['_default'];
            }

        this.movements = {
            'w': {
                'action': 'jump',
                'down': () => {
                    if (this.velocity.y !== 0) return;
                    this.velocity.y = -10;
                },
                'up': () => {}
            },
            'a': {
                'action': 'left',
                'pressed': false,
                'down': () => { this.movements.a.pressed = true },
                'up': () => { this.movements.a.pressed = false }
            },
            'd': {
                'action': 'right',
                'pressed': false,
                'down': () => { this.movements.d.pressed = true },
                'up': () => { this.movements.d.pressed = false }
            },
            '_default': {
                'down': () => {},
                'up': () => {}
            }
        }
        this.bindMovements();
    }

    draw() {
        this.velocity.x = 0;
        if(this.movements.d.pressed) this.velocity.x = Math.abs(this.runSpeed);
        else if(this.movements.a.pressed) this.velocity.x = -Math.abs(this.runSpeed);

        C.getCanvasContext().fillStyle = 'red';
        C.getCanvasContext().fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.sides.bottom = this.position.y + this.height;

        if(this.sides.bottom + this.velocity.y < C.getCanvasInstance().height) {
            this.velocity.y += this.gravity;
        } else this.velocity.y = 0;
    }

    bindMovements() {
        const getKey = this.switchCase(this.movements);

        keyDown((key) => {
            getKey(key).down();
        });

        keyUp((key) => {
            getKey(key).up();
        });
    }
}

export default PlayerDTO;
