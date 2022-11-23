class Player {
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
    }

    draw() {
        this.canvasContext.fillStyle = 'red';
        this.canvasContext.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.position.y += this.velocity.y;
        if(this.sides.bottom + this.velocity.y < this.canvasInstance.height) {
            this.velocity.y += this.gravity;
            this.sides.bottom = this.position.y + this.height;
        } else this.velocity.y = 0;
    }
}

export default Player;
