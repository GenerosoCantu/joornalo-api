import * as fs from 'fs';

export const createFolders = async (basePath, uuid) => {
  const folders = uuid.substr(0, 3).split('');
  folders.push(uuid);
  let newPath = basePath
  folders.forEach((folder) => {
    newPath = newPath + folder + '/'
    const currPath = newPath
    try {
      fs.accessSync(currPath);
    } catch (err) {
      try {
        fs.mkdirSync(currPath);
      } catch (err) {
        return console.error(err);
      }
    }
  })
  return newPath;
}

export const deleteFolders = async (basePath, uuid) => {
  const folders = uuid.substr(0, 3).split('');
  folders.push(uuid);
  let currPath = basePath;
  folders.forEach((folder) => {
    currPath = currPath + folder + '/';
  })

  const revFolders = folders.reverse();

  revFolders.forEach((folder) => {
    try {
      const filesOnDir = fs.readdirSync(currPath);
      // console.log('deleteFolder:', currPath);
      // console.log('filesOnDir:', filesOnDir);
      if (filesOnDir.length === 0) {
        try {
          // console.log('rmdirSync:', currPath);
          fs.rmdirSync(currPath);
          currPath = currPath.replace('/' + folder, '')
        } catch (err) {
          return console.error('Fail to delete Dir: ', currPath, err);
        }
      }
    } catch (err) {
      return console.error(err);
    }
  })
  return;
}

// Depracated
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

// may be removed after createJsonFile is removed
const createDir = async (path) => {
  await fs.mkdir(path, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('Directory ', path, ' created successfully!');
  });
}

export const writeJsonFile = async (path, fileName, obj) => {
  await fs.writeFile(path + fileName + '.json', JSON.stringify(obj), { flag: 'w' }, function (err) {
    if (err) console.log(err);
  });
}

const moveFile = async (oldPath, newPath) => {
  await fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("File successfully moved...", newPath);
    return {};
  });
}

export const deleteFile = async (fileName) => {
  console.log('deleteFile:', fileName);

  try {
    fs.unlinkSync(fileName);
    console.log("Delete File successfully...", fileName);
  } catch (err) {
    return console.error('Fail to delete file: ', fileName, err);
  }

}

export const moveImages = async (path, oldImages, newImages) => {
  const oldFilename = oldImages.map((img) => img.filename)
  const newFilename = newImages.map((img) => img.filename)
  const removedImages = oldFilename.filter((filename) => !newFilename.includes(filename));
  const moveImages = newFilename.filter((filename) => !oldFilename.includes(filename));

  // Move tmp images that are in newImages but not in oldImages
  moveImages.forEach(filename => moveFile(`data/tmp/${filename}`, `${path}${filename}`));
  // Delete images that are in oldImages but not in newImages
  removedImages.forEach(filename => deleteFile(`${path}${filename}`));
}
