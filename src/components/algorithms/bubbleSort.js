const bubbleSort = (arr) => {
  const steps = [];
  let swapped;
  let sortedPortion = arr.length - 1;

  while (sortedPortion >= 0) {
    for (let i = 0; i < sortedPortion; i++) {
      if (arr[i] > arr[i + 1]) {
        steps.push({
          algo: "bubble",
          barValues: [...arr],
          greaterSorted: sortedPortion,
          currBlue: [i, i + 1],
        });
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
        steps.push({
          algo: "bubble",
          barValues: [...arr],
          greaterSorted: sortedPortion,
          currBlue: [i, i + 1],
        });
      } else {
        steps.push({
          algo: "bubble",
          barValues: [...arr],
          greaterSorted: sortedPortion,
          currBlue: [i],
          newYellow: i + 1,
        });
      }
    }
    sortedPortion -= 1;
  }

  steps.push({
    algo: "bubble",
    barValues: [...arr],
    greaterSorted: -1,
  });
  return steps;
};

export default bubbleSort;
