import SpriteDTO from '../sprite';

class LevelDTO extends SpriteDTO {
    constructor(
        {
            position, 
            imageSrc
        },
        {
            levelNumber,
            bossRoom=false,
            startingPosition={
                x: 0,
                y: 0
            },
            collisionBlocks=[],
            doors=[],
            itens=[]
        }
    ) {
        super({ position, imageSrc });

        this.levelNumber = levelNumber;
        this.bossRoom = bossRoom;
        this.startingPosition = startingPosition;
        this.collisionBlocks = collisionBlocks;
        this.doors = doors;
        this.itens = itens;
    }

    drawCollisions() {
        this.collisionBlocks.forEach((block) => {
            block.draw();
        });
    }

    drawDoors() {
        this.doors.forEach((door) => {
            door.draw();
        });
    }

    drawItens() {
        this.itens.forEach((item) => {
            item.draw();
        });
    }
};

export default LevelDTO;
