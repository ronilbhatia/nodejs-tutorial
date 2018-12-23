let asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a+b);
      } else {
        reject("Arguments must be numbers");
      }
    }, 2000);
  });
};

asyncAdd(1, '3').then((res) => {
  console.log(res);
  return asyncAdd(res, 33);
}).then(res => {
  console.log("Should be 37");
  console.log(res);
}).catch(errorMessage => {
  console.log(errorMessage);
});

let somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Unable to resolve promise!");
  }, 2500)
});

somePromise.then(
  (message) => console.log(`Success: ${message}`),
  (error) => console.log(`Error: ${error}`)
);
