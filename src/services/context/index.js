import levels from '../levels';

class GlobalContext {
    constructor(
        currentLevel = 2,
        currentLevelInstance = levels['2'],
        currentMoney = 0,
        currentPlayer = null
    ) {
        this.currentLevel = currentLevel;
        this.currentLevelInstance = currentLevelInstance;
        this.currentMoney = currentMoney;
        this.currentPlayer = currentPlayer;
    }
}

const globalContext = new GlobalContext();

export default globalContext;
