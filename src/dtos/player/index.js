import SpriteDTO from '../sprite';
import { keyDown, keyUp } from '../../services/eventListeners';
import switchCase from '../../utils/switchCase';

class PlayerDTO extends SpriteDTO {
    constructor(
        { 
            collisionBlocks=[],
            currentLevel,
            imageSrc,
            frameRate,
            animations,
            loop,
            itens=[]
        }
    ) {
        super({ imageSrc, frameRate, animations, loop });
        this.position = {
            x: currentLevel.startingPosition.x,
            y: currentLevel.startingPosition.y
        }

        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravity = 0.028;
        this.runSpeed = 0.7;

        this.sides = {
            bottom: this.position.y + this.height
        }

        this.lastDirection = 'right';

        this.movements = {
            'ArrowUp': {
                'action': 'jump',
                'down': () => {
                    if (this.velocity.y !== 0) return;
                    if (this.preventInput) return;
                    if (this.checkForDoorCollision()) return;
                    this.velocity.y = -2.2;
                },
                'up': () => {}
            },
            'ArrowLeft': {
                'action': 'left',
                'pressed': false,
                'down': () => { this.movements.ArrowLeft.pressed = true },
                'up': () => { this.movements.ArrowLeft.pressed = false }
            },
            'ArrowRight': {
                'action': 'right',
                'pressed': false,
                'down': () => { this.movements.ArrowRight.pressed = true },
                'up': () => { this.movements.ArrowRight.pressed = false }
            },
            'x': {
                'action': 'grab-item',
                'down': () => {
                    this.checkForItemCollision();
                },
                'up': () => {}
            },
            '_default': {
                'down': () => {},
                'up': () => {}
            }
        }
        this.bindMovements();
        this.preventInput = false;

        this.collisionBlocks = collisionBlocks;
        this.currentLevel = currentLevel;
        this.itens = itens;
    }

    checkMovement() {
        if(this.preventInput) return;
        this.velocity.x = 0;
        if(this.movements.ArrowRight.pressed) {
            this.switchSprite('runRight');
            this.velocity.x = Math.abs(this.runSpeed);
            this.lastDirection = 'right';
        } else if(this.movements.ArrowLeft.pressed) {
            this.switchSprite('runLeft');
            this.velocity.x = -Math.abs(this.runSpeed);
            this.lastDirection = 'left';
        } else {
            if(this.lastDirection === 'left') this.switchSprite('idleLeft');
            else this.switchSprite('idleRight');
        }
    }

    update() {
        this.position.x += this.velocity.x;
        this.updateHitBox();
        this.checkForHorizontalCollision();
        this.applyGravity();

        this.updateHitBox();
        this.checkForVerticalCollision();
    }

    updateHitBox() {
        this.hitBox = {
            position: {
                x: this.position.x + 58,
                y: this.position.y + 33
            },
            width: 50,
            height: 55
        };
    }

    applyGravity() {
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
    }

    checkForHorizontalCollision() {
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i];
            if(
                this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x &&
                this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
                this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                if(this.velocity.x < 0) {
                    const offSet = this.hitBox.position.x - this.position.x;
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offSet + 0.01;
                    break;
                }

                if(this.velocity.x > 0) {
                    const offSet = this.hitBox.position.x - this.position.x + this.hitBox.width;
                    this.position.x = collisionBlock.position.x - offSet - 0.01;
                    break;
                }
            }
        }
    }

    checkForVerticalCollision() {
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i];
            if(
                this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x &&
                this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
                this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height 
            ) {
                if(this.velocity.y < 0) {
                    this.velocity.y = 0;
                    const offSet = this.hitBox.position.y - this.position.y;
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offSet + 0.01;
                    break;
                }

                if(this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offSet = this.hitBox.position.y - this.position.y + this.hitBox.height;
                    this.position.y = collisionBlock.position.y - offSet - 0.01;
                    break;
                }
            }
        }
    }

    checkForDoorCollision() {
        for(let i = 0; i < this.currentLevel.doors.length; i++) {
            const door = this.currentLevel.doors[i];
            if(
                this.hitBox.position.x + this.hitBox.width <= door.position.x + door.width &&
                this.hitBox.position.x >= door.position.x &&
                this.hitBox.position.y + this.hitBox.height >= door.position.y &&
                this.hitBox.position.y <= door.position.y + door.height
            ) {
                this.velocity.x = 0;
                this.velocity.y = 0;
                this.preventInput = true;
                this.switchSprite('enterDoor');
                door.play();
                return true;
            }
        };

        return false;
    }

    checkForItemCollision() {
        for(let i = 0; i < this.currentLevel.itens.length; i++){
            const item = this.currentLevel.itens[i];
            if(
                this.hitBox.position.x <= item.position.x + item.width &&
                this.hitBox.position.x + this.hitBox.width >= item.position.x &&
                this.hitBox.position.y + this.hitBox.height >= item.position.y &&
                this.hitBox.position.y <= item.position.y + item.height 
            ) {
                const itemGrabbed = this.currentLevel.itens.splice(i, 1);
                this.itens.push(itemGrabbed[0]);
                this.currentLevel.frame = itemGrabbed[0].frames[0];
                return true;
            }
        }

        return false;
    }

    bindMovements() {
        const getKey = switchCase(this.movements);

        keyDown((key) => {
            getKey(key).down();
        });

        keyUp((key) => {
            getKey(key).up();
        });
    }

    switchSprite(name) {
        if(this.image === this.animations[name].image) return;

        this.currentFrame = 0;
        this.image = this.animations[name].image;
        this.frameRate = this.animations[name].frameRate;
        this.frameBuffer = this.animations[name].frameBuffer;
        this.loop = this.animations[name].loop;
        this.currentAnimation = this.animations[name];
        this.currentAnimation.isActive = false;
    }
};

export default PlayerDTO;
