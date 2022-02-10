const basicInfo = require('./basicInfo');
const paths = require('./paths/index');
const components = require('./components');

module.exports = {
    ...basicInfo,
    ...components,
    ...paths
};
