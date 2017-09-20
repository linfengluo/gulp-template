/**
 * Created by linfengluo@gmail.com on 2017/9/19.
 */

var prod = require('./build/gulpfile.prod.js');
var dev = require('./build/gulpfile.dev.js');

prod();
dev();