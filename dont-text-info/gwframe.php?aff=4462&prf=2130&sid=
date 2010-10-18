<html>
<head><script type="text/javascript">
  
  var closing = false;
  var http = getHTTPObject();
  var tab = '';
  var check = 1;
	
	function doauth() {
		if (closing == false) {
			setTimeout("doauth();", 25000);
			http.open("GET", "http://adscendmedia.com/gwchecker.php?aff=4462&sid=&prf=2130", true);
			http.onreadystatechange = handleHttpResponse;
			http.send(null);
		}
	}
	
	function handleHttpResponse() {
		if (http.readyState == 4) {
      if (http.responseText != '') {
        rslt = http.responseText;
        arr = rslt.split("||");
        if (arr[0] == '4462_2130'){
          closing = true;
          if (arr[1] == '0'){
            top.location.href = document.referrer;
          } else{
                          top.location.href = arr[1];
                        }
        }
			}
			// http.onreadystatechange = function(){};
      // http.abort();
		}
	}
	
	function getHTTPObject() {
		var xmlhttp;
		/*@cc_on
		@if (@_jscript_version >= 5)
			try {
				xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (E) {
					xmlhttp = false;
				}
			}
		@else
		xmlhttp = false;
		@end @*/
		if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
			try {
				xmlhttp = new XMLHttpRequest();
			} catch (e) {
				xmlhttp = false;
			}
		}
		return xmlhttp;
	}
	
	

  function openoffer(offerid,fromtab) {
        document.getElementById(fromtab).style.display = 'none';
    document.getElementById('spnChecking').innerHTML = 'Checking for completion...';
    document.getElementById('divWait').style.display = 'block';
    tab = fromtab;
    check = 1;
    changeCheck();
    if (window.focus) {newwindow.focus();}
  }
  
  function openpp() {
    newwindow = window.open("https://adscendmedia.com/pp_click.php?aff=4462&gate=2130&sid=&p=", '_blank');
  }
  
  function closeWait() {
    document.getElementById('divWait').style.display = 'none';
    if(tab!=''){document.getElementById(tab).style.display = 'block';}
    check = -1;
  }
  
  function changeCheck() {
    if (check == 1){
      document.getElementById('spnChecking').innerHTML = 'Checking for completion...';
      check = 2;
      setTimeout("changeCheck();", 3000);
    } else if (check == 2){
      document.getElementById('spnChecking').innerHTML = 'Offer not yet completed.';
      check = 1;
      setTimeout("changeCheck();", 1600);
    }
  }
  
    function ChangeTab(whichtab) {
    closeWait();
		if (whichtab == "survey") {
      		  		  		  			document.getElementById('gw_offers').style.display = 'block';												tab='gw_offers';
		} else if (whichtab == "cell") {
      		  		  		  			document.getElementById('gw_offers').style.display = 'none';												tab='divCell';
		} else if (whichtab == "paypal") {
      		  		  		  			document.getElementById('gw_offers').style.display = 'none';												tab='divPayPal';
		} else if (whichtab == "try") {
      		  		  		  			document.getElementById('gw_offers').style.display = 'none';												tab='divTry';
		}
  }  	
</script>

<style type="text/css">
  a {text-decoration:none; color:#010A40;}
  a:hover {text-decoration:underline; color:#010A40;}
  
  body {
    margin-top:10px;
    margin-left:0px;
    margin-right:0px;
    padding:0px;
    overflow:hidden;
    color:#0C0345;
    background-color:transparent;        background-image: url('http://i1214.photobucket.com/albums/cc499/kengaime/24ce9o5.jpg');  }
    
  #gw_frame_main {
    width: 539px;
    height: 254px;
  }
  #gw_header {
    padding-bottom:22px;    padding-top:22px;    color:#0C0345;
    font-size:18px;
    font-family:Verdana;
    font-weight:bold;
  }
  .instructions {
    padding-top:20px;    padding-top:7px;    margin-left:30px;    margin-right:30px;
    font-family:Tahoma;
    font-size:13px;
    text-align:left;
  }
  #divWait {
    margin-top:10px;
    font-family:Tahoma;
    font-size:13px;
  }
  #gw_content {
    padding:15px;
    padding-bottom:20px;
  }
  #offer_container, #divCell, #divPayPal, #divTry {
        padding-top:10px;  }
  .gw_offer {
    font-family:Verdana;
    font-size:14px;
    margin-bottom:14px;
  }
  .offerlink {
    font-family:Verdana;
    font-size:14px;
    font-weight:bold;  }
  #gw_offertable {
    border-style: none;
    margin-right:15px;
  }
  #gw_offertable td {
    vertical-align: top;
    padding-left:15px;
  }
  #gw_powered {
    font-family:Verdana;
    font-size:10px;
    margin-left:10px;
    margin-bottom:10px;
    z-index:1999008;
    position:absolute; left:10px; bottom:5px; /*5+left*/
  }
    
</style>



</head>
<body onload="doauth();">
<script type="text/javascript" src="wz_tooltip.js"></script>
<script type="text/javascript" src="tip_balloon.js"></script>


<div id="gw_frame_main">
<div style="margin:0px;" align="center">
  
    
    
  <div id="gw_instructions" class="instructions" style="margin-left:45px; margin-right:45px;">Please Complete a SHORT TEST (30-60 seconds) to Confirm Your Account <br />(Then you can watch the exclusive video and have full access on our web site) </div>

	<div id="gw_content">
      		<div id="gw_offers">
  		  <div id="offer_container">
  		          <br /><b>There doesn't appear to be any offers available for your country.</b>        </div>
  		</div>
						<div id="divWait" style="display:none;">
		  <div style="height:190px;width:420px;z-index:1999007;text-align:left;overflow:hidden;padding-top:20px;">
        Waiting for you to complete the offer...<br />
        <div style="margin-top:9px;margin-bottom:12px;margin-left:20px;"><img src="gwi/wheel-throb.gif" style="width:32px;height:32px;vertical-align:middle;margin-right:15px;margin-bottom:6px;"><span style="margin-top:12px;" id="spnChecking">Checking for completion...</span></div>
        If you believe you finished the offer and this page is still not unlocking,
        please <a href="http://" onClick="javascript:closeWait(); return false;" style="text-decoration:underline;"><b>Return to the Offer List</b></a> and try a different one.
        		  </div>
		</div>
  </div>

  <!--div id="gw_powered" align="left">
    <a href="http://adscendmedia.com/gwhelp.php?p=4462" target="_blank">Need Help?</a>
  </div-->
    
</div>
</div>

<script type="text/javascript">
  ChangeTab('survey');    function addEvent(obj, evType, fn){
      if (obj.addEventListener) {
        obj.addEventListener(evType, fn, false);
      } else if (obj.attachEvent) {
        obj.attachEvent("on"+evType, fn);
      }
    }
    //not_exiting = false;
    addEvent(window, "beforeunload", ConfirmLeave);
    window.onbeforeunload = ConfirmLeave;
    
    function ConfirmLeave(){
      if(!closing){
        return "";
      }
    }
    
    
</script>

</body>
</html>