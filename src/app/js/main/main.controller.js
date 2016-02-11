;(function() {
	'use strict';

	angular
		.module('main.controller', [])
		.controller('MainController', MainController);

	/** @ngInject */
	MainController.$inject = ['$scope', '$timeout', 'webDevTec', 'toastr', '$http', '$log', 'VideosService'];
	function MainController($scope, $timeout, webDevTec, toastr, $http, $log, VideosService) {
		init();
		var tabClasses;
  
	  function initTabs() {
	    tabClasses = ["","","",""];
	  }
	  
	  $scope.getTabClass = function (tabNum) {
	    return tabClasses[tabNum];
	  };
	  
	  $scope.getTabPaneClass = function (tabNum) {
	    return "tab-pane " + tabClasses[tabNum];
	  }
	  
	  $scope.setActiveTab = function (tabNum) {
	    initTabs();
	    tabClasses[tabNum] = "active";
	  };
	  
	  $scope.tab1 = "This is first section";
	  $scope.tab2 = "This is SECOND section";
	  $scope.tab3 = "This is THIRD section";
	  $scope.tab4 = "This is FOUTRH section";
	  
	  //Initialize 
	  initTabs();
	  $scope.setActiveTab(1);
    function init() {
      $scope.youtube = VideosService.getYoutube();
      $scope.results = VideosService.getResults();
      $scope.upcoming = VideosService.getUpcoming();
      $scope.history = VideosService.getHistory();
      $scope.playlist = true;
    }

    $scope.launch = function (id, title) {
      VideosService.launchPlayer(id, title);
      VideosService.archiveVideo(id, title);
      $log.info('Launched id:' + id + ' and title:' + title);
    };

    $scope.queue = function (id, title) {
      VideosService.queueVideo(id, title);
      $log.info('Queued id:' + id + ' and title:' + title);
    };

    $scope.search = function () {
      $http.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: 'AIzaSyD2K6OooNWMPgEWlkAkgAIRctksFyKk1vY',
          type: 'video',
          maxResults: '8',
          part: 'id,snippet',
          fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
          q: this.query
        }
      })
      .success( function (data) {
        VideosService.listResults(data);
        $log.info(data);
      })
      .error( function () {
        $log.info('Search error');
      });
    }

    $scope.tabulate = function (state) {
      $scope.playlist = state;
    }
	}

})();
