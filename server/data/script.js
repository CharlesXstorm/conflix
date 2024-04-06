const fs = require("fs");

const file = `${__dirname}/movieData.json`;

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err);
      }
      if (data) {
        resolve(JSON.parse(data));
      }
    });
  });
};

const readFile = async (file) => {
  try {
    const res = await readFilePro(file);
    // console.log("hello");
    console.log(`The length is ${res.data.mainSearch.edges.length}`);
  } catch (err) {
    console.log(err);
  }
};

readFile(file);
