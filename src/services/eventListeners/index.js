export const keyDown = (action) => {
    window.addEventListener('keydown', (event) => {
        action(event.key);
    });
};

export const keyUp = (action) => {
    window.addEventListener('keyup', (event) => {
        action(event.key);
    });
};
