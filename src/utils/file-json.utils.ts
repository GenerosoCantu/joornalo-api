import * as fs from 'fs';

export const createJsonFile = (path, fileName, obj) => {
  fs.writeFile(path + fileName + '.json', JSON.stringify(obj), function (err) {
    if (err) throw err;
  });
}

export const createStoryJsonFile = (path, fileName, obj) => {
  const folders = fileName.split('');
  const newPath = path + folders[0] + '/' + folders[1] + '/'
  console.log(newPath);
  fs.exists(newPath, (exists) => {
    if (!exists) {
      const newPath2 = path + folders[0] + '/'
      fs.exists(newPath2, (exists) => {
        if (!exists) {
          createDir(newPath2);
          createDir(newPath);
          writeJsonFile(newPath, fileName, obj)
        } else {
          createDir(newPath);
          writeJsonFile(newPath, fileName, obj)
        };
      });
    }
  });
}

const createDir = (path) => {
  fs.mkdir(path, (err) => {
    if (err) {
      return console.error(err);
    }
    // console.log('Directory ', path, ' created successfully!');
  });
}

const writeJsonFile = (path, fileName, obj) => {
  fs.writeFile(path + fileName + '.json', JSON.stringify(obj), function (err) {
    if (err) throw err;
  });
}
