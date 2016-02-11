(function() {
  'use strict';

  angular
    .module('trans')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
