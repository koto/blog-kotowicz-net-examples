// @author Krzysztof Kotowicz <kkotowicz@gmail.com>
// @see http://blog.kotowicz.net

$(function() {
	// Turns all commet texts to upper case and replaces "." with "!"
	$('<button>shout</button>').click(function() {
		$('.comment-text').text(function(index,old) {
			return old.toUpperCase().replace(/\./g, '!');
		});
        }).appendTo('#container');

});
