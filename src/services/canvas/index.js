class CanvasSingleton {
    constructor() {
        this.canvasInstance = null;
        this.canvasContext = null;
    }

    setCanvasInstance(canvasInstance) {
        this.canvasInstance = canvasInstance;
        this.setCanvasContext(canvasInstance.getContext('2d'));
    }

    getCanvasInstance() {
        return this.canvasInstance;
    }

    setCanvasContext(canvasContext) {
        this.canvasContext = canvasContext;
    }

    getCanvasContext() {
        return this.canvasContext;
    }
}

const singleton = new CanvasSingleton();

export default singleton;
