/*
  Problem discovered on codeacademy.com (pro trial):
  https://www.codecademy.com/paths/pass-the-technical-interview-with-javascript/tracks/javascript-interview-prep-and-algorithm-practice/modules/javascript-algorithm-practice/articles/the-knapsack-problem
*/

const Matrix = require('./matrix.js')

const dynamicKnapsack = function (weightCap, weights, values, itemNum = weights.length, memo = new Matrix()) {
  const numItems = weights.length

  if (itemNum === 0 || numItems === 0 || weightCap === 0) return 0 // The result is 0 when we take no item OR there's no item to take OR we don't have any weight allowance (cannot carry anything)

  if (memo.get(itemNum, weightCap) !== undefined) return memo.get(itemNum, weightCap) // return the memoized result if it exists
  // else compute the result:

  const weight = weights[itemNum - 1] // current item weight
  const value = values[itemNum - 1] // current item value

  const bestValueWithoutCurrentItem = dynamicKnapsack(weightCap, weights, values, itemNum - 1, memo) // we don't take the item: no value is added and the weightCap is left unchanged

  const result =
    weight > weightCap
      ? bestValueWithoutCurrentItem // we can't take the item (the item alone is already too heavy for the current weightCap)
      : Math.max(
          // find the best value (max) between the case when we don't take the item and the case when we do
          bestValueWithoutCurrentItem, // we don't take the item
          value + dynamicKnapsack(weightCap - weight, weights, values, itemNum - 1, memo) // we take the item: we add its value to the result but decrease the weightCap by its weight
        )

  memo.set(itemNum, weightCap, result) // save the result

  // memo.print()
  return result
}

// Example
const weightCap = 50
const weights = [31, 10, 20, 19, 4, 3, 6]
const values = [70, 20, 39, 37, 7, 5, 10]
console.log(dynamicKnapsack(weightCap, weights, values)) // 107
// See memo.txt for the resulting memo matrix

// Export
module.exports = dynamicKnapsack
