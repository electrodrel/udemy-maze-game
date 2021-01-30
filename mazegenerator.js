const generate = (width, height) => {
    const cells = new Array(height);
    for (i = 0; i < width; i++) {
        cells[i] = new Array(width).map((value, index));
    }
}