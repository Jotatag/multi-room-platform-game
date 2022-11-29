import levels from '../levels';

class GlobalContext {
    constructor(
        currentLevel = 3,
        currentLevelInstance = levels['3'],
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
