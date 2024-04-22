function insertionSort(arr) {
  const steps = [];

  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i - 1;
    steps.push({
      algo: "insertion",
      barValues: [...arr],
      currBlue: i,
      currYellow: j,
    });
    while (j > -1 && current < arr[j]) {
      arr[j + 1] = arr[j];
      j--;
      steps.push({
        algo: "insertion",
        barValues: [...arr],
        currBlue: i,
        currYellow: j,
      });
    }
    arr[j + 1] = current;
    steps.push({
      algo: "insertion",
      barValues: [...arr],
      currBlue: i,
    });
  }

  steps.push({
    algo: "insertion",
    barValues: [...arr],
    allGreen: true,
  });

  return steps;
}

export default insertionSort;
