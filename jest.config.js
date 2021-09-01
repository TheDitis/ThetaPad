const esModules = ['react-images-upload', 'konva', 'react-konva'].join('|');

module.exports = {
    transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
};


