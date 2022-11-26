import levels from '../levels';

class GlobalContext {
    constructor(
        currentLevel = 1,
        currentLevelInstance = levels['1'],
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
