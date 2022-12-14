import globalContext from '../../services/context';
import C from '../../services/canvas';

import SpriteDTO from '../sprite';

class AttackDTO extends SpriteDTO {
    constructor(
        { 
            position,
            dimensions,
            collisionBlocks=[],
            currentLevel,
            imageSrc,
            verticalSrc=false,
            frameBuffer,
            frameRate,
            animations,
            loop,
            player=null,
            hitBox,
            speed=0
        }
    ) {
        super({ position, imageSrc, frameBuffer, frameRate, animations, loop, verticalSrc });

        this.dimensions = dimensions;
        this.attackSpeed = speed;

        this.lastDirection = 'right';

        this.collisionBlocks = collisionBlocks;
        this.currentLevel = currentLevel;

        this.player = player;

        this.hitBox = hitBox;
        this.originalHitbox = { ...this.hitBox };

        this.animationIsActive = true;
    }

    onLoadSprite() {
        this.loaded = true;
        this.width = this.verticalSrc ? 
                     this.dimensions.width : 
                     this.image.width / this.frameRate;
        this.height = this.verticalSrc ? 
                      this.image.height / this.frameRate : 
                      this.dimensions.height;
    }

    updateCropBox() {
        this.cropBox = {
            position: {
                x: this.verticalSrc ? 
                   0 : 
                   this.width * this.currentFrame,
                y: this.verticalSrc ? 
                   this.height * this.currentFrame : 
                   0
            },
            width: this.width,
            height: this.height
        }
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
        this.checkForPlayerHorizontalCollision();
        this.updateHitBox();
    }

    updateHitBox() {
        C.getCanvasContext().fillStyle = 'rgb(0, 255, 0, 0.5)';
        C.getCanvasContext().fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height);
    }

    updateFrames() {
        if(globalContext?.currentScreen?.name === 'pause') return;
        if (!this.autoplay) return;
        this.elapsedFrames++;

        if(this.elapsedFrames % this.frameBuffer === 0) {
            if(this.currentFrame < this.frameRate - 1 
                || this.checkVerticalSrc()) {
                this.animationCompleted = false;
                this.animationIsActive = true;

                if(this.currentFrame >= this.frameRate - 1) {
                    if(this.verticalSrc) {
                        this.width += this.attackSpeed;
                        this.hitBox.width += this.attackSpeed;
                    } else {
                        this.height += this.attackSpeed;
                        this.hitBox.height += this.attackSpeed;
                    }
                } else this.currentFrame++;
                
            } else if(this.loop) { 
                this.currentFrame = 0; 
            } else {
                this.currentFrame = 0; 
                this.animationCompleted = true;
                this.animationIsActive = false;
                this.width = this.dimensions.width;
                this.hitBox.width = this.originalHitbox.width;
            }
        }

        if(this.currentAnimation?.onComplete) {
            if(this.currentFrame === this.frameRate - 1 
                && !this.currentAnimation.isActive) {
                    this.currentAnimation.onComplete();
                    this.currentAnimation.isActive = true;
            }
        }
    }

    checkVerticalSrc() {
        if(this.verticalSrc) return this.width <= this.image.width;
        return this.height <= this.image.height;
    }

    checkForPlayerHorizontalCollision() {
        if(!this.player) return;
        if(
            this.hitBox.position.x <= this.player.hitBox.position.x + this.player.hitBox.width &&
            this.hitBox.position.x + this.hitBox.width >= this.player.hitBox.position.x &&
            this.hitBox.position.y + this.hitBox.height >= this.player.hitBox.position.y &&
            this.hitBox.position.y <= this.player.hitBox.position.y + this.player.hitBox.height 
        ) {
            if(this.player.invunerable) return;
            this.player.lostHealth(1);
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

export default AttackDTO;
