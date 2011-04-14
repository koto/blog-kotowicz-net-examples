var ProgressBar = function() {}
ProgressBar.prototype.start = function() {
	var self = this;
    $("#progress").show();
    $('#p').animate({left: '500px'}, 10000, 'linear',ProgressBar.prototype.reset);
}
ProgressBar.prototype.reset = function() { 
	$('#p').css('left',  '-100px');
	setTimeout(ProgressBar.prototype.start, 100);
}
