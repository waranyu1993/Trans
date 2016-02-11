(function() {
  'use strict';

  angular
    .module('trans')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment) {
      var self = this;

      // "vm.creation" is avaible by directive option "bindToController: true"
      self.relativeDate = moment(self.creationDate).fromNow();
    }
  }

})();
