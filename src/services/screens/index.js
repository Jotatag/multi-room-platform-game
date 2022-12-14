import globalContext from '../context';

import ScreenDTO from '../../dtos/screen';

import InitialScreen from '../../assets/sprites/screens/initial.png';
import PauseScreen from '../../assets/sprites/screens/pause.png';

import { togglePreventInput } from '../player/actions';

import { keyDown } from '../../services/eventListeners';
import switchCase from '../../utils/switchCase';

const initialScreenKeys = () => {
    const keyActions = {
        'Enter': {
            'action': 'enter',
            'down': () => {
                if(!globalContext.currentScreen || globalContext.currentScreen.name !== 'initial') return;

                globalContext.currentScreen = null;
                togglePreventInput();
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

const initialScreen = {
    name: 'initial',
    instance: new ScreenDTO({
        position: {
            x: 0,
            y: 0
        },
        imageSrc: InitialScreen,
        frameRate: 2,
        frameBuffer: 250,
        loop: true,
        autoplay: true,
        actions: initialScreenKeys
    })
};

const pauseScreen = {
    name: 'pause',
    instance: new ScreenDTO({
        position: {
            x: 0,
            y: 0
        },
        imageSrc: PauseScreen,
        frameRate: 2,
        frameBuffer: 250,
        loop: true,
        autoplay: true,
        actions: initialScreenKeys
    })
};

const generalScreens = () => {
    const keyActions = {
        'Escape': {
            'action': 'pause',
            'down': () => {
                if(globalContext.currentScreen && globalContext.currentScreen.name !== 'pause') return;

                if(globalContext.currentScreen) globalContext.currentScreen = null;
                else globalContext.currentScreen = pauseScreen;
                togglePreventInput();
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

generalScreens();

const screens = {
    initial: initialScreen
}

export default screens;
