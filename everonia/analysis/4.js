// 1. TEXT FIELDS (see section 3.3.1 in the manual)
      // HEADLINE
      var blocker_headline = 'Human Verification Process';

      // INSTRUCTIONAL TEXT ABOVE THE LINKS
      var blocker_instructionalText = 'This window will close once you have completed one of the following tasks.';

      // FOOTER TEXT BELOW THE LINKS
      var blocker_footerText = 'This is to prevent Bots from entering into our site';

// 2. TIMERS (see section 3.3.2 in the manual)
      // UNLOCKING TIMER, in Seconds
      var timeout_in_seconds_from_click = 300;

      // TEASE TIMER, in Seconds
      var tease_timer = 0;

      // COOKIE DURATION, in Days, Hours and Minutes
      var cookie_duration_days = 1000;
      var cookie_duration_hours = 0;
      var cookie_duration_minutes = 0;

// 3. BASIC CONFIGURATION (see section 3.3.3 in the manual)
      // BHCB FILES PATH
         // The path to the directory holding all Blackhat Codebreaker files (lock.js, links.txt, goto.php, goto2.php, lock.png etc.)
         // The path must not have more than 90 characters
         // If the files are at the same place as the locked page, use:
         //    var bhcb_files_path = '';
         // If they are at another directory, provide its path
         // For WordPress blogs I recommend using:
         //    var bhcb_files_path = '/wp-content/plugins/bhcb/';
      var bhcb_files_path = '';

      // HIDE REFERRER ('YES' Hides Referrer, 'NO' Does not hide the referrer)
      var hide_referrer = 'YES';

      // UNLOCK ENTIRE SITE ('YES') OR JUST THIS DIRECTORY ('NO')
      var unlock_entire_site = 'NO';

      // RANDOMIZE CPA OFFERS ('YES'), and how many offer links to display when randomizing
      var random_link_rotation = 'YES';
      var number_of_links_to_display = 4;

      // TEST MODE ('NO' for operational pages, 'YES' when testing your setup, always return to 'NO' when you finish testing)
      var test_mode = 'NO';

      // BLOCK RIGHT CLICK MENU ('YES' disables right-click menu, 'NO' doesn't disable)
      var block_rightclick_menu = 'YES';

// 4. LOOK AND FEEL (see section 3.3.4 in the manual)
      // POSITION AND WIDTH OF LOCK PANEL, in Pixels
      var panel_vertical_position = 200;
      var panel_width = 500;

      // BACKGROUND COLOR AND IMAGE
         // * background_color controls the background color of the lock panel. Value is given in Hex RGB.
         //   For example, background_color = '#FFFF00' Will result in a Yellow background. Default is '#FFFFFF' (White)
         // * border_color controls the color of the lock panel's border. Value is given in Hex RGB. Default is '#CCCCCC' (Light Gray)
         // * background_image is the name of the background image to use in the lock panel. Default is 'lock.png' (the green padlock image)
         // * background_image_repeat specifies (images smaller than the lock panel) whether to repeat the image ('YES') or show it only once ('NO'). Default is 'NO'.
      var background_color = '#FFFFFF';
      var border_color = '#CCCCCC';
      var background_image = 'lock.png';
      var background_image_repeat = 'NO';

      // HAZE COLOR AND OPACITY
         // haze_color controls the haze covering your page content, in Hex RGB. Default is '#000000' (Black)
         // haze_opacity controls the opacity of the haze.
         //    0 is completely transparent, 100 is completely opaque. Default is 50
      var haze_color = '#000000';
      var haze_opacity = 50;

      // TEXT COLORS, in Hex RGB.
         // Defaults are: headline_color = '#466805' (GREENISH), instructionalText_color = '#000000' (BLACK),
         //    footerText_color = '#000000' (BLACK) and links_color = '#0000FF' (BLUE)
      var headline_color = '#466805';
      var instructionalText_color = '#000000';
      var footerText_color = '#000000';
      var links_color = '#0000FF';


// make a httpxmlrequest for a file
// and return response
function getFile(url) {
	oxmlhttp = null;
	try {
		oxmlhttp = new XMLHttpRequest();
		oxmlhttp['overrideMimeType']('text/xml');
	} catch (e) {
		try {
			oxmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
		} catch (e) {
			return null;
		}
		;
	}
	;
	if (!oxmlhttp) {
		return null;
	}
	;
	try {
		oxmlhttp['open']('GET', url, false);
		oxmlhttp['send'](null);
	} catch (e) {
		return null;
	}
	;
	return oxmlhttp['responseText'];
};

// return randomized array of size 'size' (numbers from 0 to size)
function randomizer(_three, size) {
	var a = new Array();
	for ( var i = 0; i < size; i++) {
		a[i] = i;
	}
	;
	a.sort(function() {
		return (Math.round(Math.random()) - 0.5);
	});
	return a;
};

// code starts here
if (block_rightclick_menu == 'YES') {

	// will block rightclick menu
	var tenth = '';

	function ninth() {
		if (document['all']) {
			(tenth);
			return false;
		}
		;
	}
	;

	function twelfth(_0x3f24xb) {
		if (document['layers'] || (document['getElementById'] && !document['all'])) {
			if (_0x3f24xb['which'] == 2 || _0x3f24xb['which'] == 3) {
				(tenth);
				return false;
			}
			;
		}
		;
	}
	;

	if (document['layers']) {
		document['captureEvents'](Event.MOUSEDOWN);
		document['onmousedown'] = twelfth;
	} else {
		document['onmouseup'] = twelfth;
		document['oncontextmenu'] = ninth;
	}
	;
	document['oncontextmenu'] = new Function('return false');
	// end blocking

};

var cpa_offer_links_file = 'links.txt';
var first_goto_file = 'goto.php';
var cookie_duration = cookie_duration_days + cookie_duration_hours / 24.
		+ cookie_duration_minutes / 24. / 60.;
var blocker_originalHtmlOverflow;
var blocker_originalBodyOverflow;

function blocker_addLoadEvent(fun) {
	var oldonload = window['onload'];
	if (typeof window['onload'] != 'function') {
		window['onload'] = fun;
	} else {
		window['onload'] = function() {
			oldonload();
			fun();
		};
	}
	;
};

blocker_addLoadEvent(blocker_pre_init);

function blocker_pre_init() {
	if ((blocker_getCookie('content_unlocked') == '1') && (test_mode != 'YES')) {
		return;
	}
	;
	var timeout = setTimeout('blocker_init()', tease_timer * 1000);
};

function blocker_init() {
	if (bhcb_files_path != '') {
		if (bhcb_files_path.charAt(bhcb_files_path.length - 1) != '/') {
			bhcb_files_path = bhcb_files_path + '/';
		}
		;
		cpa_offer_links_file = bhcb_files_path + cpa_offer_links_file;
		first_goto_file = bhcb_files_path + first_goto_file + '?fp='
				+ bhcb_files_path;
		if (!(background_image['match']('http://'))
				&& !(background_image['match']('https://'))
				&& !(background_image['match'](bhcb_files_path))) {
			background_image = bhcb_files_path + background_image;
		}
		;
	}
	;

	var links_text = getFile(cpa_offer_links_file);
	var links_array = links_text['split']('\n');
	var all_links = [];
	var line_no;
	var i;
	if (hide_referrer != 'NO') {
		for (i = 0; i < (links_array['length'] - 3) / 2; i++) {
			line_no = i * 2;
			if (bhcb_files_path == '') {
				all_links[i] = {
					text : links_array[line_no],
					url : first_goto_file + '?ln='
							+ (i + 1).toString()
				};
			} else {
				all_links[i] = {
					text : links_array[line_no],
					url : first_goto_file + '&ln='
							+ (i + 1).toString()
				};
			}
			;
		}
		;
	} else {
		for (i = 0; i < (links_array['length'] - 3) / 2; i++) {
			line_no = i * 2;
			all_links[i] = {
				text : links_array[line_no],
				url : links_array[line_no + 1]
			};
		}
		;
	}
	;
	var links_to_show;
	if (random_link_rotation == 'YES') {
		if (number_of_links_to_display > i) {
			number_of_links_to_display = i;
		}
		;
		links_to_show = randomizer(number_of_links_to_display, i);
	} else {
		number_of_links_to_display = i;
		var _0x3f24x1d = new Array();
		for ( var _0x3f24x1e = 0; _0x3f24x1e < i; _0x3f24x1e++) {
			_0x3f24x1d[_0x3f24x1e] = _0x3f24x1e;
		}
		;
		links_to_show = _0x3f24x1d;
	}
	;
	if (test_mode == 'YES') {
		if (i == 0) {
			alert('ERROR: You have no links! Check your links.txt file!');
		} else {
			var _0x3f24x1f = "_______________ TEST MODE _______________   \n Welcome to BlackHat CodeBreaker's Test Mode!\n\nSTAGE 1: Checking Links Text and URLs...\n\nYou have " + (i).toString() + ' links:';
			var _0x3f24x20 = 5;
			for ( var _0x3f24x21 = 0; _0x3f24x21 < Math['ceil'](i
					/ _0x3f24x20); _0x3f24x21++) {
				for ( var _0x3f24x22 = _0x3f24x21 * _0x3f24x20; (_0x3f24x22 < i)
						&& (_0x3f24x22 < (_0x3f24x21 + 1) * _0x3f24x20); _0x3f24x22++) {
					line_no = _0x3f24x22 * 2;
					_0x3f24x1f = _0x3f24x1f + '\n\nText '
							+ (_0x3f24x22 + 1).toString() + ' - '
							+ links_array[line_no] + '\nURL  '
							+ (_0x3f24x22 + 1).toString() + ' - '
							+ links_array[line_no + 1];
				}
				;
				if (_0x3f24x22 < i) {
					_0x3f24x1f = _0x3f24x1f + '\n\n(Continued on next Screen - Click OK)';
				} else {
					if (hide_referrer != 'NO') {
						_0x3f24x1f = _0x3f24x1f + '\n\nYour Default Link When Referrer Cannot Be Blocked is:\n'
								+ links_array[i * 2 + 1];
					}
					;
					_0x3f24x1f = _0x3f24x1f + '\n\n(End of Stage 1 - Click OK)';
				}
				;
				alert(_0x3f24x1f + '\n ');
				_0x3f24x1f = '_______________ TEST MODE _______________   \n\nSTAGE 1: Checking Links Text and URLs... (Continued)';
			}
			;
			_0x3f24x1f = '_______________ TEST MODE _______________   \n\nSTAGE 2: Timing Parameters...';
			_0x3f24x1f = _0x3f24x1f + '\n\nLocker appears ' + tease_timer + ' Seconds after page loads\n(Parameter: tease_timer)';
			_0x3f24x1f = _0x3f24x1f + '\n\nPages Unlock ' + timeout_in_seconds_from_click
					+ ' Seconds after link is clicked\n(Parameter: timeout_in_seconds_from_click)';
			_0x3f24x1f = _0x3f24x1f + '\n\nPages Stay Unlocked for\n     ' + cookie_duration_days
					+ ' Days,  ' + cookie_duration_hours + ' Hours and  '
					+ cookie_duration_minutes + ' Minutes\n(Parameters:\n     cookie_duration_days,\n     cookie_duration_hours,\n     cookie_duration_minutes)';
			alert(_0x3f24x1f + '\n ');
			_0x3f24x1f = '_______________ TEST MODE _______________   \n\nSTAGE 3: Basic Setup Parameters...';
			if (hide_referrer != 'NO') {
				_0x3f24x1f = _0x3f24x1f + '\n\nReferrer Hiding is: ON\n(Parameter: hide_referrer)';
			} else {
				_0x3f24x1f = _0x3f24x1f + '\n\nReferrer Hiding is: OFF\n(Parameter: hide_referrer)';
			}
			;
			if (unlock_entire_site == 'YES') {
				_0x3f24x1f = _0x3f24x1f + '\n\nClicking Links Unlocks Entire Site\n(Parameter: unlock_entire_site)';
			} else {
				_0x3f24x1f = _0x3f24x1f + '\n\nClicking Links Unlocks Current Directory\n(Parameter: unlock_entire_site)';
			}
			;
			if (random_link_rotation == 'YES') {
				_0x3f24x1f = _0x3f24x1f + '\n\nRandom Link Rotation is ON\n(Parameter: random_link_rotation)';
				_0x3f24x1f = _0x3f24x1f + '\n\nDisplaying only ' + number_of_links_to_display
						+ ' links\n(Parameter: number_of_links_to_display)';
			} else {
				_0x3f24x1f = _0x3f24x1f + '\n\nRandom Link Rotation is OFF\n(Parameter: random_link_rotation)';
			}
			;
			if (block_rightclick_menu == 'YES') {
				_0x3f24x1f = _0x3f24x1f + '\n\nRight-Click Menu is Blocked\n(Parameter: block_rightclick_menu)';
			}
			;
			alert(_0x3f24x1f + '\n ');
			_0x3f24x1f = '_______________ TEST MODE _______________   \n\nSTAGE 4: Look and Feel Parameters...';
			_0x3f24x1f = _0x3f24x1f + '\n\nLock Panel Position is ' + panel_vertical_position
					+ ' pixels Beneath Top Of Page\n(Parameter: panel_vertical_position)';
			_0x3f24x1f = _0x3f24x1f + '\n\nLock Panel Width is ' + panel_width + ' pixels\n(Parameter: panel_width)';
			_0x3f24x1f = _0x3f24x1f + '\n\nPanel Background Color is ' + background_color + ' \n(Parameter: background_color)';
			_0x3f24x1f = _0x3f24x1f + '\n\nPanel Border Color is ' + border_color + ' \n(Parameter: border_color)';
			_0x3f24x1f = _0x3f24x1f + '\n\nPanel Background Image is ' + background_image + ' \n(Parameter: background_image)';
			_0x3f24x1f = _0x3f24x1f + '\n\nHaze Color is ' + haze_color + ' \n(Parameter: haze_color)';
			_0x3f24x1f = _0x3f24x1f + '\n\nHaze Opacity is ' + haze_opacity + ' (0=Transparent, 100=Opaque)\n(Parameter: haze_opacity)';
			alert(_0x3f24x1f + '\n ');
			_0x3f24x1f = '_______________ TEST MODE _______________   \n\nSTAGE 5: Testing Page...\n\nYou will now proceed to your webpage.\nIt should appear locked.\nCheck that colors and sizes are as you want them.';
			if (random_link_rotation == 'YES') {
				_0x3f24x1f = _0x3f24x1f + '\n\nLinks should appear in Randomly Rotated Order \n(If not - try reloading page to get a new order)';
			}
			;
			_0x3f24x1f = _0x3f24x1f + "\nClick all links to test that they open as intended.\n\nNote that while in Test Mode clicking links WILL redirect you\nbut WILL NOT unlock the page.\nThis was set so that you will not have to clear cookies\nevery time you want to check the links.\n\n**** DO NOT FORGET TO CANCEL TEST MODE\n**** BEFORE SENDING TRAFFIC TO YOUR PAGE!\n**** (Parameter: test_mode = 'NO')";
			alert(_0x3f24x1f + '\n ');
		}
		;
	}
	;
	window['scroll'](0, 0);
	blocker_originalHtmlOverflow = document['getElementsByTagName']('body')[0]['style']['overflow'];
	blocker_originalBodyOverflow = document['getElementsByTagName']('html')[0]['style']['overflow'];
	document['getElementsByTagName']('body')[0]['style']['overflow'] = 'hidden';
	document['getElementsByTagName']('html')[0]['style']['overflow'] = 'hidden';
	if (haze_opacity > 100) {
		haze_opacity = 100;
	} else {
		if (haze_opacity < 0) {
			haze_opacity = 0;
		}
		;
	}
	;
	var blocker_haze = document['createElement']('div');
	blocker_haze['id'] = 'blocker_haze';
	blocker_haze['style']['filter'] = 'alpha(opacity=' + haze_opacity + ')';
	blocker_haze['style']['opacity'] = haze_opacity / 100.;
	blocker_haze['style']['height'] = '100%';
	blocker_haze['style']['width'] = '100%';
	blocker_haze['style']['backgroundColor'] = haze_color;
	blocker_haze['style']['position'] = 'absolute';
	blocker_haze['style']['top'] = '0px';
	blocker_haze['style']['left'] = '0px';
	blocker_haze['style']['zIndex'] = 1000000;
	var centerPane = document['createElement']('centerPane');
	centerPane['id'] = 'blocker_centerPane';
	centerPane['style']['width'] = panel_width + 'px';
	centerPane['style']['border'] = '5px solid ' + border_color;
	centerPane['style']['width'] = panel_width + 'px';
	centerPane['style']['position'] = 'absolute';
	centerPane['style']['left'] = '50%';
	centerPane['style']['marginLeft'] = '-' + panel_width / 2 + 'px';
	centerPane['style']['top'] = panel_vertical_position + 'px';
	centerPane['style']['backgroundColor'] = background_color;
	centerPane['style']['zIndex'] = 1000001;
	centerPane['style']['backgroundImage'] = 'url(' + background_image + ')';
	centerPane['style']['backgroundRepeat'] = (background_image_repeat == 'YES') ? 'repeat-yes'
			: 'no-repeat';
	centerPane['style']['backgroundPosition'] = '0px 0px';
	centerPane['style']['padding'] = '0px';
	var h1 = document['createElement']('h1');
	h1['style']['color'] = headline_color;
	h1['style']['textAlign'] = 'center';
	h1['style']['fontSize'] = '38px';
	h1['style']['margin'] = '0 0 10px 0';
	h1['style']['padding'] = '38px 0 0 0px';
	h1['style']['fontFamily'] = 'arial';
	h1['style']['textDecoration'] = 'underline';
	h1['style']['lineHeight'] = '38px';
	h1['innerHTML'] = blocker_headline;
	centerPane['appendChild'](h1);
	var para = document['createElement']('p');
	para['innerHTML'] = blocker_instructionalText;
	para['style']['textAlign'] = 'center';
	para['style']['padding'] = '20px 0 20px 0';
	para['style']['margin'] = '0';
	para['style']['fontSize'] = '18px';
	para['style']['lineHeight'] = '18px';
	para['style']['color'] = instructionalText_color;
	para['style']['fontFamily'] = 'arial';
	centerPane['appendChild'](para);
	var ul = document['createElement']('ul');
	ul['style']['textAlign'] = 'center';
	ul['style']['margin'] = '0 0 10px 0';
	ul['style']['padding'] = '0';
	ul['style']['listStyleType'] = 'none';
	for ( var link_number = 0; link_number < number_of_links_to_display; link_number++) {
		var li = document['createElement']('li');
		var anchor = document['createElement']('a');
		anchor['style']['display'] = 'block';
		anchor['style']['fontSize'] = '14px';
		anchor['style']['lineHeight'] = '22px';
		anchor['style']['color'] = links_color;
		anchor['style']['fontFamily'] = 'arial';
		anchor['style']['textDecoration'] = 'underline';
		anchor['target'] = '_blank';
		anchor['innerHTML'] = all_links[links_to_show[link_number]]['text'];
		anchor['href'] = all_links[links_to_show[link_number]]['url'];
		anchor['onmouseover'] = function() {
			window['status'] = ' ';
			return true;
		};
		anchor['onclick'] = function() {
			if (test_mode != 'YES') {
				window['setTimeout'](unblockContent,
						timeout_in_seconds_from_click * 1000);
			}
			;
		};
		li['appendChild'](anchor);
		ul['appendChild'](li);
	}
	;
	centerPane['appendChild'](ul);
	var para2 = document['createElement']('p');
	para2['style']['textAlign'] = 'center';
	para2['innerHTML'] = blocker_footerText;
	para2['style']['padding'] = '20px 0 0 0';
	para2['style']['margin'] = '0';
	para2['style']['color'] = footerText_color;
	para2['style']['fontFamily'] = 'arial';
	para2['style']['fontSize'] = '14px';
	para2['style']['lineHeight'] = '14px';
	centerPane['appendChild'](para2);
	var para3 = document['createElement']('p');
	para3['style']['textAlign'] = 'center';
	para3['innerHTML'] = '                                                        ';
	para3['style']['padding'] = '40px 0 0 0';
	para3['style']['margin'] = '0';
	para3['style']['color'] = footerText_color;
	para3['style']['fontFamily'] = 'arial';
	para3['style']['fontSize'] = '40px';
	para3['style']['lineHeight'] = '40px';
	centerPane['appendChild'](para3);
	document['getElementsByTagName']('body')[0]['appendChild'](blocker_haze);
	document['getElementsByTagName']('body')[0]['appendChild'](centerPane);
};

function unblockContent() {
	document['getElementsByTagName']('body')[0]['style']['overflow'] = blocker_originalBodyOverflow;
	document['getElementsByTagName']('html')[0]['style']['overflow'] = blocker_originalHtmlOverflow;
	document['getElementById']('blocker_haze')['style']['display'] = 'none';
	document['getElementById']('blocker_centerPane')['style']['display'] = 'none';
	blocker_setCookie('content_unlocked', 1, cookie_duration);
};

function blocker_setCookie(cookie_name, cookie_value, time) {
	var cookie_date = new Date();
	cookie_date['setDate'](cookie_date['getDate']() + time);
	if (unlock_entire_site != 'YES') {
		document['cookie'] = cookie_name
				+ '='
				+ escape(cookie_value)
				+ ((time == null) ? '' : ';expires='
						+ cookie_date['toGMTString']());
	} else {
		document['cookie'] = cookie_name
				+ '='
				+ escape(cookie_value)
				+ ((time == null) ? '' : ';expires='
						+ cookie_date['toGMTString']()) + '; path=/';
	}
	;
};

function blocker_getCookie(cookie_name) {
	if (document['cookie']['length'] > 0) {
		c_start = document['cookie']['indexOf'](cookie_name + '=');
		if (c_start != -1) {
			c_start = c_start + cookie_name['length'] + 1;
			c_end = document['cookie']['indexOf'](';', c_start);
			if (c_end == -1) {
				c_end = document['cookie']['length'];
			}
			;
			return unescape(document['cookie']['substring'](c_start, c_end));
		}
		;
	}
	;
	return '';
};