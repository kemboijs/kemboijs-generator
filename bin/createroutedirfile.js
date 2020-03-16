/**
 * creating routes directory files
 * @param {*} name
 */
const fs = require("fs");

const openAppendFile = require("./openandappendfile");
const {
  packageJson,
  gitIgnore,
  readMe,
  babel,
  envExample
} = require("../tasks");

const createRouteDirFiles = (name, database) => {
  // Create different files such as packages, readme etc.
  const packageFile = fs.createWriteStream(`${name}/package.json`);
  const gitignoreFile = fs.createWriteStream(`${name}/.gitignore`);
  const envFile = fs.createWriteStream(`${name}/.env`);
  const readmeFile = fs.createWriteStream(`${name}/README.md`);
  const babelFile = fs.createWriteStream(`${name}/.babelrc`);
  const envExampleFile = fs.createWriteStream(`${name}/.envexample`);

  // Create data var for all the
  const packageJsonData = JSON.stringify(packageJson(name), null, "\t");
  const readMeData = readMe(name);

  // Create an array for all files needed [pathname, data]
  const fileDataArr = [
    { pathname: packageFile.path, data: packageJsonData },
    { pathname: gitignoreFile.path, data: gitIgnore },
    { pathname: readmeFile.path, data: readMeData },
    { pathname: babelFile.path, data: babel },
    { pathname: envFile.path, data: envExample(database) },
    { pathname: envExampleFile.path, data: envExample(database) }
  ];

  // For each file, append data using fn openAppendFile
  fileDataArr.forEach(file => {
    openAppendFile(file.pathname, file.data);
  });
};

module.exports = createRouteDirFiles;
