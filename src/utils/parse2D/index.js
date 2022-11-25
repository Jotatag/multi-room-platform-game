const parseArray2D = (data) => {
    const rows = [];
    for(let i = 0; i < data.length; i+=16) {
        rows.push(data.slice(i, i + 16));
    }

    return rows;
}

export default parseArray2D;
