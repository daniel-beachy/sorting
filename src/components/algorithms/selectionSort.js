const selectionSort = (arr) => {
  const steps = [];
  let minIndex;

  for (let i = 0; i < arr.length; i++) {
    minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      steps.push({
        algo: "selection",
        barValues: [...arr],
        lessSorted: i,
        currYellow: minIndex,
        currBlue: j,
      });
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
    }
  }
  steps.push({
    algo: "selection",
    barValues: [...arr],
    lessSorted: arr.length,
  });
  return steps;
};

export default selectionSort;
