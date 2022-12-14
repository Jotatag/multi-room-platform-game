import globalContext from '../context';

import ScreenDTO from '../../dtos/screen';

import GameOverScreen from '../../assets/sprites/screens/gameOver.png';
import ClearScreen from '../../assets/sprites/screens/clear.png';

import { togglePreventInput } from '../player/actions';

import { keyDown } from '../../services/eventListeners';
import switchCase from '../../utils/switchCase';

const restartKeys = () => {
    const keyActions = {
        'Enter': {
            'action': 'restart',
            'down': () => {
                if(!globalContext.currentScreen) return;
                if(globalContext?.currentScreen?.name !== 'gameOver' 
                    && globalContext?.currentScreen?.name !== 'clear') return;
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
        autoplay: true,
        actions: restartKeys
    })
};

const clear = {
    name: 'clear',
    instance: new ScreenDTO({
        position: {
            x: 0,
            y: 0
        },
        imageSrc: ClearScreen,
        frameRate: 2,
        frameBuffer: 250,
        loop: true,
        autoplay: true,
        actions: restartKeys
    })
};

export const gameOverTrigger = () => {
    globalContext.currentScreen = gameOver;
}

export const clearTrigger = () => {
    globalContext.currentScreen = clear;
}
