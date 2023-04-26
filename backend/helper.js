const getRandomImageName = (name) => {
    return new Date().getTime() + "" + Math.floor(Math.random() * 1000) + name;
}

const getImageDest = (module) => {
    return __dirname + "/public/uploads/" + module + "/";
}

module.exports = { getRandomImageName, getImageDest };