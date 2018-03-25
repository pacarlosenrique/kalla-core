/*'use strict';
module.exports = (function() {
  function Path() {
  }
  Path.route = function(route) {
  	console.log(__dirname);
    return   './'+route.replace(/\./gi, (r) => {
        return '/';
      });
  }
  return Path;
})();
*/