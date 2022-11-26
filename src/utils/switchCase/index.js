const switchCase = (obj) =>
    (value) => {
        return obj[value] || obj['_default'];
    };

export default switchCase;
