'use strict';

angular.module('stories').controller('StoriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Stories',
	function($scope, $stateParams, $location, Authentication, Stories) {
        $scope.authentication = Authentication;
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.offset = 0;

       // Page changed handler
       $scope.pageChanged = function() {
            $scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
       };

		$scope.create = function() {
			// Clear form
			var story = new Stories({
				title: this.title,
				pageOne: this.pageOne,
				pageTwo: this.pageTwo,
				pageThree: this.pageThree,
				pageFour : this.pageFour
			});
			// Redirect after save
            story.$save(function(response) {
                $location.path('stories/' + response._id);

                // Clear form fields
                $scope.title = '';
                $scope.pageOne = '';
                $scope.pageTwo = '';
                $scope.pageThree = '';
                $scope.pageFour = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
		};

		$scope.remove = function(story) {
			if (story) {
				story.$remove();
				for (var i in $scope.stories) {
					if ($scope.stories[i] === story) {
						$scope.stories.splice(i, 1);
					}
				}
			} else {
				$scope.story.$remove(function() {
					$location.path('stories');
				});
			}
		};

		$scope.update = function() {
			var story = $scope.story;
			story.$update(function() {
				$location.path('stories/' + story._id);
			}, function(errorResponse) {
				console.log(errorResponse.data.message);
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function(){
			$scope.stories = Stories.query();
		};
 
		// Find existing story
		$scope.findOne = function() {
			$scope.story = Stories.get({ 
				storyId: $stateParams.storyId
			});
		};

        // Search for a story
        $scope.storySearch = function(story) {
            $location.path('stories/' + story._id);
        };
	}
]);