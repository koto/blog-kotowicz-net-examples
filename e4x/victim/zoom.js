// @author Krzysztof Kotowicz <kkotowicz@gmail.com>
// @see http://blog.kotowicz.net

$(function() {
	// Make comment text bigger
	$('<button>zoom in</button>').click(function() {
		$('.comment-text').animate({'font-size': "+=3"});
        }).appendTo('#container');

	// Make comment text bigger
	$('<button>zoom out</button>').click(function() {
		$('.comment-text').animate({'font-size': "-=3"});
        }).appendTo('#container');

});
