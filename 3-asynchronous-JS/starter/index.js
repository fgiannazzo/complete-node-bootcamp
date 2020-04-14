const fs = require('fs');
const superagent = require('superagent');

// using promises and async await

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file');
      resolve(data);
    });
  });
};

const writeFilePromise = (filename, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, (err) => {
      if (err) reject('Could not write file');
      resolve('Success');
    });
  });
};

const getDogPix = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);
    await writeFilePromise('dog-img.txt', imgs.join('\n'));
    console.log('Random ass dog image saved to file');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2: Ready!';
};

(async () => {
  try {
    console.log('1: Will get dog pics!');
    const result = await getDogPix();
    console.log(result);
    console.log('3: Done getting dog pics!');
  } catch (err) {
    console.log(err);
  }
})();

// console.log('1: Will get dog pics!');
// getDogPix()
//   .then((x) => {
//     console.log(x);
//     console.log('3: Done getting dog pics!');
//   })
//   .catch((err) => {
//     console.log('ERROR');
//   });

/* Without async await (consuming promises)
// readFilePromise(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePromise('dog-img.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('Random ass dog image saved to file');
//   })
//   .catch((err) => {
//     console.log(err);
//   });
*/

/* Callback Hell
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(err.message);
//       console.log(res.body);

//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         console.log('Random dog image saved to file!');
//       });
//     });
// });
*/
