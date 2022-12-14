import globalContext from '../context';

import ScreenDTO from '../../dtos/screen';

import GameOverScreen from '../../assets/sprites/screens/gameOver.png';

import { togglePreventInput } from '../player/actions';

import { keyDown } from '../../services/eventListeners';
import switchCase from '../../utils/switchCase';

const gameOver = {
    name: 'gameOver',
    instance: new ScreenDTO({
        position: {
            x: 0,
            y: 0
        },
        imageSrc: GameOverScreen,
        frameRate: 2,
        frameBuffer: 250,
        loop: true,
        autoplay: true
    })
};

export const gameOverTrigger = () => {
    globalContext.currentScreen = gameOver;

    const keyActions = {
        'Enter': {
            'action': 'restart',
            'down': () => {
                if(globalContext.currentScreen && globalContext.currentScreen.name !== 'gameOver') return;
                document.location.reload(true);
            }
        },
        '_default': {
            'down': () => {},
            'up': () => {}
        }
    }

    const getKey = switchCase(keyActions);

    keyDown((key) => {
        getKey(key).down();
    });
}
