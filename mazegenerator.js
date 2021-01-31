const generate = (width, height) => {
  const grid = Array(height)
    .fill(null)
    .map(() => Array(width).fill(false));

  const verticals = Array(height)
    .fill(null)
    .map(() => Array(width - 1).fill(false));

  const horizontals = Array(height - 1)
    .fill(null)
    .map(() => Array(width).fill(false));

  const startRow = Math.floor(Math.random() * height);
  const startColumn = Math.floor(Math.random() * width);

  const shuffle = (arr) => {
    let counter = arr.length;

    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);
      counter--;
      const temp = arr[counter];
      arr[counter] = arr[index];
      arr[index] = temp;
    }

    return arr;
  };

  const traverse = (row, column) => {
    if (grid[row][column]) {
      return;
    }
    grid[row][column] = true;

    const cellNeighbors = shuffle([
      [row - 1, column, "up"],
      [row, column + 1, "right"],
      [row + 1, column, "down"],
      [row, column - 1, "left"],
    ]);

    for (let neightbor of cellNeighbors) {
      const [nextRow, nextColumn, direction] = neightbor;
      if (
        nextRow < 0 ||
        nextRow >= height ||
        nextColumn < 0 ||
        nextColumn >= width
      ) {
        continue;
      }

      if (grid[nextRow][nextColumn]) {
        continue;
      }

      switch (direction) {
        case "left":
          verticals[row][column - 1] = true;
          break;
        case "right":
          verticals[row][column] = true;
          break;
        case "up":
          horizontals[row - 1][column] = true;
          break;
        case "down":
          horizontals[row][column] = true;
          break;
      }

      traverse(nextRow, nextColumn);
    }
  };

  traverse(startRow, startColumn);

  return {
    verticals,
    horizontals,
  };
};
