// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserlist" field in package.json
    "autoprefixer": {browsers: ['> 1%', 'ie >= 9', 'iOS >= 6', 'Android >= 2.1']},
    "postcss-plugins-px2rem": {remUnit: 75}
  }
}
