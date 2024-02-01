// Calculate the sum from 1 to a million
function calculateSum() {
    let sum = 0;
  
    for (let i = 1; i <= 100; i++) {
      sum += i;
    }
  
    return sum;
  }
  
  // Call the function and log the result
  const result = calculateSum();
  console.log('The sum from 1 to a million is:', result);
  