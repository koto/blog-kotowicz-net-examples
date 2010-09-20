function getFile(_two) {
	oxmlhttp = null;
	// make a httpxmlrequest for a file
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
		oxmlhttp['open']('GET', _two, false);
		oxmlhttp['send'](null);
	} catch (e) {
		return null;
	}
	;
	return oxmlhttp['responseText'];
};

function randomizer(_three, _four) {
	var _five = new Array();
	for ( var _six = 0; _six < _four; _six++) {
		_five[_six] = _six;
	}
	;
	_five['sort'](function() {
		return (Math['round'](Math['random']()) - 0.5);
	});
	return _five;
};

// code starts here
if (block_rightclick_menu == 'YES') {
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
};
var cpa_offer_links_file = 'links.txt';
var first_goto_file = 'goto.php';
var cookie_duration = cookie_duration_days + cookie_duration_hours / 24.
		+ cookie_duration_minutes / 24. / 60.;
var blocker_originalHtmlOverflow;
var blocker_originalBodyOverflow;
function blocker_addLoadEvent(_0x3f24x12) {
	var _0x3f24x13 = window['onload'];
	if (typeof window['onload'] != 'function') {
		window['onload'] = _0x3f24x12;
	} else {
		window['onload'] = function() {
			_0x3f24x13();
			_0x3f24x12();
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
	var _0x3f24x15 = setTimeout('blocker_init()', tease_timer * 1000);
};
function blocker_init() {
	if (bhcb_files_path != '') {
		if (bhcb_files_path['charAt'](bhcb_files_path['length'] - 1) != '/') {
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
	var _seven = getFile(cpa_offer_links_file);
	var _eight = _seven['split']('\n');
	var _nine = [];
	var _0x3f24x1a;
	var _0x3f24x1b;
	if (hide_referrer != 'NO') {
		for (_0x3f24x1b = 0; _0x3f24x1b < (_eight['length'] - 3) / 2; _0x3f24x1b++) {
			_0x3f24x1a = _0x3f24x1b * 2;
			if (bhcb_files_path == '') {
				_nine[_0x3f24x1b] = {
					text : _eight[_0x3f24x1a],
					url : first_goto_file + '?ln='
							+ (_0x3f24x1b + 1).toString()
				};
			} else {
				_nine[_0x3f24x1b] = {
					text : _eight[_0x3f24x1a],
					url : first_goto_file + '&ln='
							+ (_0x3f24x1b + 1).toString()
				};
			}
			;
		}
		;
	} else {
		for (_0x3f24x1b = 0; _0x3f24x1b < (_eight['length'] - 3) / 2; _0x3f24x1b++) {
			_0x3f24x1a = _0x3f24x1b * 2;
			_nine[_0x3f24x1b] = {
				text : _eight[_0x3f24x1a],
				url : _eight[_0x3f24x1a + 1]
			};
		}
		;
	}
	;
	var _0x3f24x1c;
	if (random_link_rotation == 'YES') {
		if (number_of_links_to_display > _0x3f24x1b) {
			number_of_links_to_display = _0x3f24x1b;
		}
		;
		_0x3f24x1c = randomizer(number_of_links_to_display, _0x3f24x1b);
	} else {
		number_of_links_to_display = _0x3f24x1b;
		var _0x3f24x1d = new Array();
		for ( var _0x3f24x1e = 0; _0x3f24x1e < _0x3f24x1b; _0x3f24x1e++) {
			_0x3f24x1d[_0x3f24x1e] = _0x3f24x1e;
		}
		;
		_0x3f24x1c = _0x3f24x1d;
	}
	;
	if (test_mode == 'YES') {
		if (_0x3f24x1b == 0) {
			alert('ERROR: You have no links! Check your links.txt file!');
		} else {
			var _0x3f24x1f = "_______________ TEST MODE _______________   \n Welcome to BlackHat CodeBreaker's Test Mode!\n\nSTAGE 1: Checking Links Text and URLs...\n\nYou have ", + (_0x3f24x1b).toString() + ' links:';
			var _0x3f24x20 = 5;
			for ( var _0x3f24x21 = 0; _0x3f24x21 < Math['ceil'](_0x3f24x1b
					/ _0x3f24x20); _0x3f24x21++) {
				for ( var _0x3f24x22 = _0x3f24x21 * _0x3f24x20; (_0x3f24x22 < _0x3f24x1b)
						&& (_0x3f24x22 < (_0x3f24x21 + 1) * _0x3f24x20); _0x3f24x22++) {
					_0x3f24x1a = _0x3f24x22 * 2;
					_0x3f24x1f = _0x3f24x1f + '\n\nText '
							+ (_0x3f24x22 + 1).toString() + ' - '
							+ _eight[_0x3f24x1a] + '\nURL  '
							+ (_0x3f24x22 + 1).toString() + ' - '
							+ _eight[_0x3f24x1a + 1];
				}
				;
				if (_0x3f24x22 < _0x3f24x1b) {
					_0x3f24x1f = _0x3f24x1f + '\n\n(Continued on next Screen - Click OK)';
				} else {
					if (hide_referrer != 'NO') {
						_0x3f24x1f = _0x3f24x1f + '\n\nYour Default Link When Referrer Cannot Be Blocked is:\n'
								+ _eight[_0x3f24x1b * 2 + 1];
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
	var _0x3f24x23 = document['createElement']('div');
	_0x3f24x23['id'] = 'blocker_haze';
	_0x3f24x23['style']['filter'] = 'alpha(opacity=' + haze_opacity + ')';
	_0x3f24x23['style']['opacity'] = haze_opacity / 100.;
	_0x3f24x23['style']['height'] = '100%';
	_0x3f24x23['style']['width'] = '100%';
	_0x3f24x23['style']['backgroundColor'] = haze_color;
	_0x3f24x23['style']['position'] = 'absolute';
	_0x3f24x23['style']['top'] = '0px';
	_0x3f24x23['style']['left'] = '0px';
	_0x3f24x23['style']['zIndex'] = 1000000;
	var _0x3f24x24 = document['createElement']('centerPane');
	_0x3f24x24['id'] = 'blocker_centerPane';
	_0x3f24x24['style']['width'] = panel_width + 'px';
	_0x3f24x24['style']['border'] = '5px solid ' + border_color;
	_0x3f24x24['style']['width'] = panel_width + 'px';
	_0x3f24x24['style']['position'] = 'absolute';
	_0x3f24x24['style']['left'] = '50%';
	_0x3f24x24['style']['marginLeft'] = '-' + panel_width / 2 + 'px';
	_0x3f24x24['style']['top'] = panel_vertical_position + 'px';
	_0x3f24x24['style']['backgroundColor'] = background_color;
	_0x3f24x24['style']['zIndex'] = 1000001;
	_0x3f24x24['style']['backgroundImage'] = 'url(' + background_image + ')';
	_0x3f24x24['style']['backgroundRepeat'] = (background_image_repeat == 'YES') ? 'repeat-yes'
			: 'no-repeat';
	_0x3f24x24['style']['backgroundPosition'] = '0px 0px';
	_0x3f24x24['style']['padding'] = '0px';
	var _0x3f24x25 = document['createElement']('h1');
	_0x3f24x25['style']['color'] = headline_color;
	_0x3f24x25['style']['textAlign'] = 'center';
	_0x3f24x25['style']['fontSize'] = '38px';
	_0x3f24x25['style']['margin'] = '0 0 10px 0';
	_0x3f24x25['style']['padding'] = '38px 0 0 0px';
	_0x3f24x25['style']['fontFamily'] = 'arial';
	_0x3f24x25['style']['textDecoration'] = 'underline';
	_0x3f24x25['style']['lineHeight'] = '38px';
	_0x3f24x25['innerHTML'] = blocker_headline;
	_0x3f24x24['appendChild'](_0x3f24x25);
	var _0x3f24x26 = document['createElement']('p');
	_0x3f24x26['innerHTML'] = blocker_instructionalText;
	_0x3f24x26['style']['textAlign'] = 'center';
	_0x3f24x26['style']['padding'] = '20px 0 20px 0';
	_0x3f24x26['style']['margin'] = '0';
	_0x3f24x26['style']['fontSize'] = '18px';
	_0x3f24x26['style']['lineHeight'] = '18px';
	_0x3f24x26['style']['color'] = instructionalText_color;
	_0x3f24x26['style']['fontFamily'] = 'arial';
	_0x3f24x24['appendChild'](_0x3f24x26);
	var _0x3f24x27 = document['createElement']('ul');
	_0x3f24x27['style']['textAlign'] = 'center';
	_0x3f24x27['style']['margin'] = '0 0 10px 0';
	_0x3f24x27['style']['padding'] = '0';
	_0x3f24x27['style']['listStyleType'] = 'none';
	for ( var _six = 0; _six < number_of_links_to_display; _six++) {
		var _0x3f24x28 = document['createElement']('li');
		var _0x3f24x29 = document['createElement']('a');
		_0x3f24x29['style']['display'] = 'block';
		_0x3f24x29['style']['fontSize'] = '14px';
		_0x3f24x29['style']['lineHeight'] = '22px';
		_0x3f24x29['style']['color'] = links_color;
		_0x3f24x29['style']['fontFamily'] = 'arial';
		_0x3f24x29['style']['textDecoration'] = 'underline';
		_0x3f24x29['target'] = '_blank';
		_0x3f24x29['innerHTML'] = _nine[_0x3f24x1c[_six]]['text'];
		_0x3f24x29['href'] = _nine[_0x3f24x1c[_six]]['url'];
		_0x3f24x29['onmouseover'] = function() {
			window['status'] = ' ';
			return true;
		};
		_0x3f24x29['onclick'] = function() {
			if (test_mode != 'YES') {
				window['setTimeout'](unblockContent,
						timeout_in_seconds_from_click * 1000);
			}
			;
		};
		_0x3f24x28['appendChild'](_0x3f24x29);
		_0x3f24x27['appendChild'](_0x3f24x28);
	}
	;
	_0x3f24x24['appendChild'](_0x3f24x27);
	var _0x3f24x2a = document['createElement']('p');
	_0x3f24x2a['style']['textAlign'] = 'center';
	_0x3f24x2a['innerHTML'] = blocker_footerText;
	_0x3f24x2a['style']['padding'] = '20px 0 0 0';
	_0x3f24x2a['style']['margin'] = '0';
	_0x3f24x2a['style']['color'] = footerText_color;
	_0x3f24x2a['style']['fontFamily'] = 'arial';
	_0x3f24x2a['style']['fontSize'] = '14px';
	_0x3f24x2a['style']['lineHeight'] = '14px';
	_0x3f24x24['appendChild'](_0x3f24x2a);
	var _0x3f24x2b = document['createElement']('p');
	_0x3f24x2b['style']['textAlign'] = 'center';
	_0x3f24x2b['innerHTML'] = '                                                        ';
	_0x3f24x2b['style']['padding'] = '40px 0 0 0';
	_0x3f24x2b['style']['margin'] = '0';
	_0x3f24x2b['style']['color'] = footerText_color;
	_0x3f24x2b['style']['fontFamily'] = 'arial';
	_0x3f24x2b['style']['fontSize'] = '40px';
	_0x3f24x2b['style']['lineHeight'] = '40px';
	_0x3f24x24['appendChild'](_0x3f24x2b);
	document['getElementsByTagName']('body')[0]['appendChild'](_0x3f24x23);
	document['getElementsByTagName']('body')[0]['appendChild'](_0x3f24x24);
};
function unblockContent() {
	document['getElementsByTagName']('body')[0]['style']['overflow'] = blocker_originalBodyOverflow;
	document['getElementsByTagName']('html')[0]['style']['overflow'] = blocker_originalHtmlOverflow;
	document['getElementById']('blocker_haze')['style']['display'] = 'none';
	document['getElementById']('blocker_centerPane')['style']['display'] = 'none';
	blocker_setCookie('content_unlocked', 1, cookie_duration);
};
function blocker_setCookie(_0x3f24x2e, _0x3f24x2f, _0x3f24x30) {
	var _0x3f24x31 = new Date();
	_0x3f24x31['setDate'](_0x3f24x31['getDate']() + _0x3f24x30);
	if (unlock_entire_site != 'YES') {
		document['cookie'] = _0x3f24x2e
				+ '='
				+ escape(_0x3f24x2f)
				+ ((_0x3f24x30 == null) ? '' : ';expires='
						+ _0x3f24x31['toGMTString']());
	} else {
		document['cookie'] = _0x3f24x2e
				+ '='
				+ escape(_0x3f24x2f)
				+ ((_0x3f24x30 == null) ? '' : ';expires='
						+ _0x3f24x31['toGMTString']()) + '; path=/';
	}
	;
};
function blocker_getCookie(_0x3f24x2e) {
	if (document['cookie']['length'] > 0) {
		c_start = document['cookie']['indexOf'](_0x3f24x2e + '=');
		if (c_start != -1) {
			c_start = c_start + _0x3f24x2e['length'] + 1;
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