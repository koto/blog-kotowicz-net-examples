$(function() {
	$('<button>zoom in</button>').click(function() {
		$('.comment-text').animate({'font-size': "+=3"});
        }).appendTo('body');

	$('<button>zoom out</button>').click(function() {
		$('.comment-text').animate({'font-size': "-=3"});
        }).appendTo('body');

});
