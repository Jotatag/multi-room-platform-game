import C from '../../services/canvas';

import SpriteDTO from '../sprite';

import { clearTrigger } from '../../services/screens/triggers';

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
            player=null,
            attackDelay=0,
            maxHealth=1,
            currentHealth=1,
            gui=null
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
        this.attackHitBoxFrames = [];

        this.collisionBlocks = collisionBlocks;
        this.currentLevel = currentLevel;

        this.player = player;

        this.elapsedAttackFrame = 0;
        this.elapsedFinishAttackFrame = 0;
        this.attackDelay = attackDelay;

        this.attackAnimationIsActive = false;
        this.animationType = 'neutral';

        this.maxHealth = maxHealth;
        this.currentHealth = currentHealth;

        this.gui = gui;
        this.gui.currentFrame = this.currentHealth - 2;
        this.dead = false;
    }

    checkMovement() {
        if(this.dead && this.animationCompleted) return clearTrigger();
        if(this.dead) return;
        if(!this.player) return;
        this.velocity.x = 0;

        if(!this.checkFinishAttack()) return;

        if(this.player.position.y > 250) return this.doAttack();

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

        if(this.attackHitBoxFrames?.includes(this.currentFrame)) this.updateAttackHitBox();
        else this.attackHitBox = null;
    }

    updateAttackHitBox() {
        this.attackHitBox = {
            position: {
                x: this.lastDirection === 'left' ? 
                   this.hitBox.position.x - 45 : 
                   this.hitBox.position.x + this.hitBox.width - 20,
                y: this.hitBox.position.y + 50
            },
            width: 50,
            height: this.hitBox.height - 50
        }
    }

    drawAttackHitBox() {
        if(!this.attackHitBox) return;
        C.getCanvasContext().fillStyle = 'rgb(0, 0, 255, 0.5)';
        C.getCanvasContext().fillRect(this.attackHitBox.position.x, this.attackHitBox.position.y, this.attackHitBox.width, this.attackHitBox.height);
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
            width: 170,
            height: 150
        };
        /* C.getCanvasContext().fillStyle = 'rgb(0, 255, 0, 0.5)';
        C.getCanvasContext().fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height); */
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

    doAttack() {
        if(!this.player) return;
        this.elapsedAttackFrame++;

        if(this.elapsedAttackFrame < this.attackDelay) return;

        if(this.attackAnimationIsActive) {
            this.doRangeAttack();
            return;
        }

        const randomAttack = Math.floor(Math.random() * 2);

        if(randomAttack === 0) this.doRangeAttack();
        else this.doMeeleAttack();
    }

    doRangeAttack() {
        this.switchSprite('laserRight');
        this.attackAnimationIsActive = true;
        
        if(this.animationCompleted) {
            if(this.currentAttack?.animationCompleted) {
                this.attackAnimationIsActive = false;
                return;
            }

            if(!this.currentAttack?.animationIsActive) {
                this.currentAttack = this.animations.laserRight.attack;
                if(!this.currentAttack.player) this.currentAttack.player = this.player;
                this.currentAttack.play();
            }
        }
    }

    doMeeleAttack() {
        this.velocity.x = 0;
        this.switchSprite('meeleRight');
    }

    checkFinishAttack() {
        if(this.animationType !== 'attack') return true;
        if(this.attackAnimationIsActive) return true;
        if(this.currentAttack?.animationIsActive)
            return false;
        if(this.animationCompleted) {
            this.switchSprite('idleRight');
            this.currentAttack = null;
            this.attackHitBox = null;
            this.elapsedAttackFrame = 0;
            return true;
        }

        return false;
    }

    lostHealth(value) {
        this.currentHealth -= value;
        this.gui.currentFrame = this.currentHealth - 2;

        if(this.currentHealth === 1) {
            this.switchSprite('dead');
            this.dead = true;
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
        this.animationCompleted = false;
        this.animationIsActive = true;
        this.attackHitBoxFrames = this.animations[name]?.hitBoxFrames;
        this.animationType = this.animations[name]?.type;
    }
}

export default BossDTO;
