import * as fs from 'fs';

export const createJsonFile = async (path, fileName, obj) => {
  const folders = fileName.split('');
  const newPath = path + folders[0] + '/' + folders[1] + '/'
  fs.access(newPath, (err) => {
    if (err) {
      const newPath2 = path + folders[0] + '/'
      fs.access(newPath2, (err) => {
        if (err) {
          createDir(newPath2);
          createDir(newPath);
          writeJsonFile(newPath, fileName, obj)
        } else {
          createDir(newPath);
          writeJsonFile(newPath, fileName, obj)
        };
      });
    } else {
      writeJsonFile(newPath, fileName, obj)
    }
  });
}

const createDir = async (path) => {
  fs.mkdir(path, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('Directory ', path, ' created successfully!');
  });
}

const writeJsonFile = async (path, fileName, obj) => {
  fs.writeFile(path + fileName + '.json', JSON.stringify(obj), { flag: 'w' }, function (err) {
    if (err) console.log(err);
  });
}

const moveFile = async (oldPath, newPath) => {
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("File successfully moved...", newPath);
    return {};
  });
}

export const deleteFile = async (fileName) => {
  console.log('deleteImage:', fileName)
  // fs.unlink(path.join(__dirname, '/' + fileName), (err) => {
  fs.unlink(fileName, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Delete File successfully...", fileName);
    return {};
  });
}

export const moveImages = async (id, oldImages, newImages) => {
  const folders = id.split('');
  const path = 'data/story/'
  const newPath = path + folders[0] + '/' + folders[1] + '/'

  const oldFilename = oldImages.map((img) => img.filename)
  const newFilename = newImages.map((img) => img.filename)
  const removedImages = oldFilename.filter((filename) => !newFilename.includes(filename));
  const moveImages = newFilename.filter((filename) => !oldFilename.includes(filename));

  const moveRemove = () => {
    // Move tmp images that are in newImages but not in oldImages
    console.log('moveImages:', moveImages)
    moveImages.forEach(filename => moveFile(`data/tmp/${filename}`, `${newPath}${filename}`));
    // Delete images that are in oldImages but not in newImages
    console.log('removedImages:', removedImages)
    removedImages.forEach(filename => deleteFile(`${newPath}${filename}`));
  }

  fs.access(newPath, (err) => {
    if (err) {
      const newPath2 = path + folders[0] + '/'
      fs.access(newPath2, (err) => {
        if (err) {
          createDir(newPath2);
          createDir(newPath);
          moveRemove()
        } else {
          createDir(newPath);
          moveRemove()
        };
      });
    } else {
      moveRemove()
    }
  });
}
