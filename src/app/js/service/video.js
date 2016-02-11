// Service
;(function () {
  angular
    .module('service.video', [])
    .run(function() {
			var tag = document.createElement('script');
			tag.src = "http://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		})
    .service('VideosService', VideosService)
    
	VideosService.$inject = ['$window', '$rootScope', '$log']
	function VideosService($window, $rootScope, $log) {
		var service = this;
		var youtube = {
			ready : false,
			player : null,
			playerId : null,
			videoId : null,
			videoTitle : null,
			playerHeight : '480',
			playerWidth : '640',
			state : 'stopped'
		};
		var results = [];
		var upcoming = [{
			id : 'iX82PbnfbYc',
			title : 'Days part 1'
		}, {
			id : 'nA1pi1rOP_k',
			title : 'Days Part2'
		}, {
			id : 'gcqkdCn5_E0',
			title : 'Months in Thai'
		}, {
			id : 'jFBU1OSzOrE',
			title : 'Numbers in Thai'
		}];
		var history = [{
			id : 'iX82PbnfbYc',
			title : 'Days part 1'
		}];

		$window.onYouTubeIframeAPIReady = function() {
			$log.info('Youtube API is ready');
			youtube.ready = true;
			service.bindPlayer('placeholder');
			service.loadPlayer();
			$rootScope.$apply();
		};

		function onYoutubeReady(event) {
			$log.info('YouTube Player is ready');
			youtube.player.cueVideoById(history[0].id);
			youtube.videoId = history[0].id;
			youtube.videoTitle = history[0].title;
		}

		function onYoutubeStateChange(event) {
			if (event.data == YT.PlayerState.PLAYING) {
				youtube.state = 'playing';
			} else if (event.data == YT.PlayerState.PAUSED) {
				youtube.state = 'paused';
			} else if (event.data == YT.PlayerState.ENDED) {
				youtube.state = 'ended';
				service.launchPlayer(upcoming[0].id, upcoming[0].title);
				service.archiveVideo(upcoming[0].id, upcoming[0].title);
			}
			$rootScope.$apply();
		}


		this.bindPlayer = function(elementId) {
			$log.info('Binding to ' + elementId);
			youtube.playerId = elementId;
		};

		this.createPlayer = function() {
			$log.info('Creating a new Youtube player for DOM id ' + youtube.playerId + ' and video ' + youtube.videoId);
			return new YT.Player(youtube.playerId, {
				height : youtube.playerHeight,
				width : youtube.playerWidth,
				playerVars : {
					rel : 0,
					showinfo : 0
				},
				events : {
					'onReady' : onYoutubeReady,
					'onStateChange' : onYoutubeStateChange
				}
			});
		};

		this.loadPlayer = function() {
			if (youtube.ready && youtube.playerId) {
				if (youtube.player) {
					youtube.player.destroy();
				}
				youtube.player = service.createPlayer();
			}
		};

		this.launchPlayer = function(id, title) {
			youtube.player.loadVideoById(id);
			youtube.videoId = id;
			youtube.videoTitle = title;
			return youtube;
		}

		this.listResults = function(data) {
			results.length = 0;
			for (var i = data.items.length - 1; i >= 0; i--) {
				results.push({
					id : data.items[i].id.videoId,
					title : data.items[i].snippet.title,
					description : data.items[i].snippet.description,
					thumbnail : data.items[i].snippet.thumbnails.default.url,
					author : data.items[i].snippet.channelTitle
				});
			}
			return results;
		}

		this.queueVideo = function(id, title) {
			upcoming.push({
				id : id,
				title : title
			});
			return upcoming;
		};

		this.archiveVideo = function(id, title) {
			history.unshift({
				id : id,
				title : title
			});
			return history;
		};

		this.getYoutube = function() {
			return youtube;
		};

		this.getResults = function() {
			return results;
		};

		this.getUpcoming = function() {
			return upcoming;
		};

		this.getHistory = function() {
			return history;
		};

	}
})()