import C from '../../services/canvas';

import SpriteDTO from '../sprite';

class BossDTO extends SpriteDTO {
    constructor(
        { 
            position,
            collisionBlocks=[],
            currentLevel,
            imageSrc,
            frameBuffer,
            frameRate,
            animations,
            loop,
            player=null
        }
    ) {
        super({ position, imageSrc, frameBuffer, frameRate, animations, loop });

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

        this.hitBox = null;
        this.attackHitBox = null;

        this.collisionBlocks = collisionBlocks;
        this.currentLevel = currentLevel;

        this.player = player;
    }

    checkMovement() {
        if(!this.player) return;
        this.velocity.x = 0;
        if(this.player.position.x >= (this.position.x + this.width / 2)) {
            this.switchSprite('idleRight');
            this.lastDirection = 'right';
        } else if(this.player.position.x < (this.position.x + this.width / 2)) {
            this.switchSprite('idleLeft');
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

    applyGravity() {
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
    }

    updateHitBox() {
        this.hitBox = {
            position: {
                x: this.position.x + 45,
                y: this.position.y + 12
            },
            width: 185,
            height: 150
        };
        C.getCanvasContext().fillStyle = 'rgb(0, 255, 0, 0.5)';
        C.getCanvasContext().fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height);
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
}

export default BossDTO;
