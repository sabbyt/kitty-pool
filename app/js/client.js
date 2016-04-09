const angular = require('angular');
const kittyApp = angular.module('kittyApp', []);

require('./services')(kittyApp);
require('./controllers/kitty-ctrl')(kittyApp);
require('./controllers/user-ctrl')(kittyApp);
