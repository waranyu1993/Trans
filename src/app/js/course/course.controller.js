(function() {
  'use strict';

  angular
    .module('course.controller', [])
    .controller('CourseController', CourseController);

  /** @ngInject */
	CourseController.$inject = ['$scope', '$timeout', 'webDevTec', 'toastr'];
  function CourseController($scope, $timeout, webDevTec, toastr) {
    var self = this;

    self.awesomeThings = [];
    self.classAnimation = '';
    self.creationDate = 1454687654763;
    self.showToastr = showToastr;

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        self.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      self.classAnimation = '';
    }

    function getWebDevTec() {
      self.awesomeThings = webDevTec.getTec();

      angular.forEach(self.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
