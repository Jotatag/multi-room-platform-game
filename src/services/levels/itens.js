import ItemDTO from '../../dtos/item';
import HammerSprite from '../../assets/sprites/hammer.png'

const levelItens = {
    1: [],
    2: [
        new ItemDTO(
            {
                position: {
                    x: 120,
                    y: 400
                },
                imageSrc: HammerSprite,
                frameRate: 2,
                frameBuffer: 180,
                loop: true,
                autoplay: true
            }
        )
    ]
};

export default levelItens;
