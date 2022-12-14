import globalContext from '../../services/context';

import SpriteDTO from '../sprite';

import { keyDown, keyUp } from '../../services/eventListeners';
import switchCase from '../../utils/switchCase';

import { gameOverTrigger } from '../../services/screens/triggers';
class PlayerDTO extends SpriteDTO {
    constructor(
        { 
            collisionBlocks=[],
            currentLevel,
            imageSrc,
            frameRate,
            animations,
            loop,
            itens=[],
            gui=null,
            maxHealth=1,
            currentHealth=1
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
        this.gravity = 0.042;
        this.runSpeed = 1.2;

        this.sides = {
            bottom: this.position.y + this.height
        }

        this.lastDirection = 'right';

        this.movements = {
            'arrowup': {
                'action': 'jump',
                'down': () => {
                    if (this.dead) return;
                    if (this.velocity.y !== 0) return;
                    if (this.preventInput) return;
                    if (this.checkForDoorCollision()) return;
                    this.velocity.y = -2.6;
                },
                'up': () => {}
            },
            'arrowleft': {
                'action': 'left',
                'pressed': false,
                'down': () => { this.movements.arrowleft.pressed = true },
                'up': () => { this.movements.arrowleft.pressed = false }
            },
            'arrowright': {
                'action': 'right',
                'pressed': false,
                'down': () => { this.movements.arrowright.pressed = true },
                'up': () => { this.movements.arrowright.pressed = false }
            },
            'x': {
                'action': 'grab-item',
                'down': () => {
                    if (this.dead) return;
                    if(!this.currentAnimation || this.currentAnimation.isActive || this.preventInput) return;
                    this.checkForItemCollision();
                },
                'up': () => {}
            },
            'z': {
                'action': 'attack',
                'down': () => {
                    if (this.dead) return;
                    if(!this.currentAnimation || this.currentAnimation.isActive || this.preventInput) return;
                    this.doAttack();
                    if(this.checkForAttackCollision()) {
                        this.currentBoss?.lostHealth(1);
                    }
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

        this.hitBox = null;
        this.attackHitBox = null;

        this.collisionBlocks = collisionBlocks;
        this.currentLevel = currentLevel;
        this.itens = itens;

        this.currentBoss = null;

        this.invunerable = false;

        this.maxHealth = maxHealth;
        this.currentHealth = currentHealth;

        this.gui = gui;
        this.gui.currentFrame = this.currentHealth - 1;

        this.dead = false;
    }

    checkMovement() {
        if(this.dead) return;
        if(globalContext?.currentScreen?.name === 'pause') {
            this.velocity.x = 0;
            return;
        }
        if(this.preventInput) return;
        this.velocity.x = 0;
        if(this.movements.arrowright.pressed) {
            this.switchSprite('runRight');
            this.velocity.x = Math.abs(this.runSpeed);
            this.lastDirection = 'right';
        } else if(this.movements.arrowleft.pressed) {
            this.switchSprite('runLeft');
            this.velocity.x = -Math.abs(this.runSpeed);
            this.lastDirection = 'left';
        } else {
            if(this.lastDirection === 'left') this.switchSprite('idleLeft');
            else this.switchSprite('idleRight');
        }
    }

    update() {
        if(globalContext?.currentScreen?.name === 'pause') return;
        this.position.x += this.velocity.x;
        this.updateHitBox();
        this.checkForHorizontalCollision();
        this.applyGravity();

        this.updateHitBox();
        this.checkForVerticalCollision();

        if(this.currentLevel.bossRoom && this.currentBoss) {
            this.updateHitBox();
            this.checkForBossHorizontalCollision();
            this.checkForBossAttackCollision();
        }
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

    updateAttackHitBox() {
        this.attackHitBox = {
            position: {
                x: this.lastDirection === 'left' ? 
                   this.hitBox.position.x - 45 : 
                   this.hitBox.position.x + this.hitBox.width,
                y: this.hitBox.position.y - 20
            },
            width: 45,
            height: this.hitBox.height + 20
        }
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
                if(itemGrabbed[0]?.type === 'life') this.gainHealth(1);
                else this.itens.push(itemGrabbed[0]);
                this.currentLevel.frame = itemGrabbed[0].frames[0];
                return true;
            }
        }

        return false;
    }

    checkForAttackCollision() {
        if(!this.attackHitBox || !this.currentLevel.bossRoom || !this.currentBoss) return false;

        const boss = this.currentBoss.hitBox;
        if(
            this.attackHitBox.position.x <= boss.position.x + boss.width &&
            this.attackHitBox.position.x + this.attackHitBox.width >= boss.position.x &&
            this.attackHitBox.position.y + this.attackHitBox.height >= boss.position.y &&
            this.attackHitBox.position.y <= boss.position.y + boss.height 
        ) {
            return true;
        }

        return false;
    }

    checkForBossHorizontalCollision() {
        if(!this.currentLevel.bossRoom || !this.currentBoss) return;

        const collisionBlock = this.currentBoss.hitBox;
        if(
            this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width &&
            this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x &&
            this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
            this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height
        ) {
            if(this.velocity.x < 0) {
                const offSet = this.hitBox.position.x - this.position.x;
                this.position.x = collisionBlock.position.x + collisionBlock.width - offSet + 0.01;
                if(!this.currentBoss.dead) this.lostHealth(1);
            }

            if(this.velocity.x > 0) {
                const offSet = this.hitBox.position.x - this.position.x + this.hitBox.width;
                this.position.x = collisionBlock.position.x - offSet - 0.01;
                if(!this.currentBoss.dead) this.lostHealth(1);
            }
        }
    }

    checkForBossAttackCollision() {
        if(!this.currentLevel.bossRoom || !this.currentBoss || !this.currentBoss?.attackHitBox) return;

        const collisionBlock = this.currentBoss?.attackHitBox;
        if(
            this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width &&
            this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x &&
            this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
            this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height
        ) {
            const offSet = this.hitBox.position.x - this.position.x;
            this.position.x = collisionBlock.position.x + collisionBlock.width - offSet + 0.01;
            this.lostHealth(1);
        }
    }

    doAttack() {
        if(this.velocity.y === 0) this.velocity.x = 0;
        this.preventInput = true;
        this.updateAttackHitBox();
        if(this.lastDirection === 'left') this.switchSprite('attackLeft');
        else this.switchSprite('attackRight');
    }

    beInvunerable(invunerable) {
        this.invunerable = invunerable;
        if(!this.invunerable) {
            this.preventInput = false;
            return;
        }

        this.velocity.x = 0;
        this.velocity.y = 0;
        this.preventInput = true;
        this.switchSprite('invunerableRight');
    }

    lostHealth(value) {
        if(this.invunerable) return;
        this.currentHealth -= value;
        this.gui.currentFrame = this.currentHealth - 1;

        if(this.currentHealth === 0) {
            this.dead = true;
            gameOverTrigger();
        }
        this.beInvunerable(true);
    }

    gainHealth(value) {
        this.currentHealth += value;
        this.gui.currentFrame = this.currentHealth - 1;
    }

    bindMovements() {
        const getKey = switchCase(this.movements);

        keyDown((key) => {
            getKey(key.toLowerCase()).down();
        });

        keyUp((key) => {
            getKey(key.toLowerCase()).up();
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
        if(name !== 'invunerableRight') this.invunerable = false;
    }
};

export default PlayerDTO;
