import DoorDTO from '../../dtos/door';
import DoorSprite from '../../assets/sprites/doorOpen.png'

const levelDoors = {
    1: [
        new DoorDTO(
            {
                position: {
                    x: 767,
                    y: 270
                },
                imageSrc: DoorSprite,
                frameRate: 5,
                frameBuffer: 20,
                loop: false,
                autoplay: false
            }
        )
    ],
    2: [
        new DoorDTO(
            {
                position: {
                    x: 772,
                    y: 336
                },
                imageSrc: DoorSprite,
                frameRate: 5,
                frameBuffer: 20,
                loop: false,
                autoplay: false
            }
        )
    ],
    3: [
        new DoorDTO(
            {
                position: {
                    x: 772,
                    y: 336
                },
                imageSrc: DoorSprite,
                frameRate: 5,
                frameBuffer: 20,
                loop: false,
                autoplay: false
            }
        )
    ]
};

export default levelDoors;
