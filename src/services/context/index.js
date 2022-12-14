import levels from '../levels';

import screens from '../screens';

class GlobalContext {
    constructor(
        currentLevel=1,
        currentLevelInstance=levels['1'],
        currentMoney=0,
        currentPlayer=null,
        currentScreen=screens.initial
    ) {
        this.currentLevel = currentLevel;
        this.currentLevelInstance = currentLevelInstance;
        this.currentMoney = currentMoney;
        this.currentPlayer = currentPlayer;
        this.currentScreen = currentScreen;
    }
}

const globalContext = new GlobalContext();

export default globalContext;
