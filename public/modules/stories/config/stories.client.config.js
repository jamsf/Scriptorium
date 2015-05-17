'use strict';

// Stories module config
angular.module('stories').run(['Menus',
	function(Menus) {
        Menus.addMenuItem('topbar', 'Stories', 'stories', 'dropdown', '/stories(/create)?');
        Menus.addSubMenuItem('topbar', 'stories', 'List Stories', 'stories');
        Menus.addSubMenuItem('topbar', 'stories', 'New Story', 'stories/create');
	}
]);