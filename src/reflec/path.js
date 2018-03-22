'use strict';
module.exports = (function() {
  function Path() {
  }
  Path.route = function(route) {
    return './' + route.replace(/\./gi, (r) => {
        return '/';
      });
  }
  return Path;
})();
