function fakeMerge(arr, start, mid, end, steps) {
  let left = arr.slice(start, mid + 1);
  let right = arr.slice(mid + 1, end + 1);
  let leftIndex = 0,
    rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    steps.push({
      algo: "merge",
      barValues: [...arr],
      currLeftComp: start + leftIndex,
      currRightComp: mid + rightIndex,
      currStart: start,
      currEnd: end,
    });
    if (left[leftIndex] <= right[rightIndex]) {
      leftIndex++;
    } else {
      rightIndex++;
    }
  }

  while (leftIndex < left.length) {
    steps.push({
      algo: "merge",
      barValues: [...arr],
      currLeftComp: start + leftIndex,
      currStart: start,
      currEnd: end,
    });
    leftIndex++;
  }

  // copy the remaining elements of right[], if there are any
  while (rightIndex < right.length) {
    steps.push({
      algo: "merge",
      barValues: [...arr],
      currRightComp: mid + rightIndex,
      currStart: start,
      currEnd: end,
    });
    rightIndex++;
  }
}

function merge(arr, start, mid, end, steps) {
  let left = arr.slice(start, mid + 1);
  let right = arr.slice(mid + 1, end + 1);
  let leftIndex = 0,
    rightIndex = 0,
    arrayIndex = start;

  // merge the temp arrays back into array[start..end]
  while (leftIndex < left.length && rightIndex < right.length) {
    steps.push({
      algo: "merge",
      barValues: [...arr],
      currBlue: arrayIndex,
      currStart: start,
      currEnd: end,
    });
    if (left[leftIndex] <= right[rightIndex]) {
      arr[arrayIndex++] = left[leftIndex++];
    } else {
      arr[arrayIndex++] = right[rightIndex++];
    }
  }

  // copy the remaining elements of left[], if there are any
  while (leftIndex < left.length) {
    steps.push({
      algo: "merge",
      barValues: [...arr],
      currBlue: arrayIndex,
      currStart: start,
      currEnd: end,
    });
    arr[arrayIndex++] = left[leftIndex++];
  }

  // copy the remaining elements of right[], if there are any
  while (rightIndex < right.length) {
    steps.push({
      algo: "merge",
      barValues: [...arr],
      currBlue: arrayIndex,
      currStart: start,
      currEnd: end,
    });
    arr[arrayIndex++] = right[rightIndex++];
  }
}

function mergeSortRec(arr, start, end, steps) {
  if (start < end) {
    let mid = Math.floor((start + end) / 2);

    // recursively sort the left and right halves
    mergeSortRec(arr, start, mid, steps);
    mergeSortRec(arr, mid + 1, end, steps);

    // do a fake merge in order to capture the merge animation
    // without actually editing the array
    fakeMerge(arr, start, mid, end, steps);
    // actually edit the array during the merge
    merge(arr, start, mid, end, steps);
  }
}

function mergeSort(arr) {
  const steps = [];
  mergeSortRec(arr, 0, arr.length - 1, steps);

  steps.push({ algo: "merge", barValues: [...arr], allGreen: true });

  return steps;
}

export default mergeSort;
