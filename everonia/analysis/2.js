var _one = [
		'text/xml',
		'overrideMimeType',
		'Msxml2.XMLHTTP',
		'GET',
		'open',
		'send',
		'responseText',
		'random',
		'round',
		'sort',
		'YES',
		'',
		'all',
		'layers',
		'getElementById',
		'which',
		'captureEvents',
		'onmousedown',
		'onmouseup',
		'oncontextmenu',
		'return false',
		'links.txt',
		'goto.php',
		'onload',
		'function',
		'content_unlocked',
		'1',
		'blocker_init()',
		'length',
		'charAt',
		'/',
		'?fp=',
		'http://',
		'match',
		'https://',
		'\n',
		'split',
		'NO',
		'?ln=',
		'&ln=',
		'ERROR: You have no links! Check your links.txt file!',
		"_______________ TEST MODE _______________   \n Welcome to BlackHat CodeBreaker's Test Mode!\n\nSTAGE 1: Checking Links Text and URLs...\n\nYou have ",
		' links:',
		'ceil',
		'\n\nText ',
		' - ',
		'\nURL  ',
		'\n\n(Continued on next Screen - Click OK)',
		'\n\nYour Default Link When Referrer Cannot Be Blocked is:\n',
		'\n\n(End of Stage 1 - Click OK)',
		'\n ',
		'_______________ TEST MODE _______________   \n\nSTAGE 1: Checking Links Text and URLs... (Continued)',
		'_______________ TEST MODE _______________   \n\nSTAGE 2: Timing Parameters...',
		'\n\nLocker appears ',
		' Seconds after page loads\n(Parameter: tease_timer)',
		'\n\nPages Unlock ',
		' Seconds after link is clicked\n(Parameter: timeout_in_seconds_from_click)',
		'\n\nPages Stay Unlocked for\n     ',
		' Days,  ',
		' Hours and  ',
		' Minutes\n(Parameters:\n     cookie_duration_days,\n     cookie_duration_hours,\n     cookie_duration_minutes)',
		'_______________ TEST MODE _______________   \n\nSTAGE 3: Basic Setup Parameters...',
		'\n\nReferrer Hiding is: ON\n(Parameter: hide_referrer)',
		'\n\nReferrer Hiding is: OFF\n(Parameter: hide_referrer)',
		'\n\nClicking Links Unlocks Entire Site\n(Parameter: unlock_entire_site)',
		'\n\nClicking Links Unlocks Current Directory\n(Parameter: unlock_entire_site)',
		'\n\nRandom Link Rotation is ON\n(Parameter: random_link_rotation)',
		'\n\nDisplaying only ',
		' links\n(Parameter: number_of_links_to_display)',
		'\n\nRandom Link Rotation is OFF\n(Parameter: random_link_rotation)',
		'\n\nRight-Click Menu is Blocked\n(Parameter: block_rightclick_menu)',
		'_______________ TEST MODE _______________   \n\nSTAGE 4: Look and Feel Parameters...',
		'\n\nLock Panel Position is ',
		' pixels Beneath Top Of Page\n(Parameter: panel_vertical_position)',
		'\n\nLock Panel Width is ',
		' pixels\n(Parameter: panel_width)',
		'\n\nPanel Background Color is ',
		' \n(Parameter: background_color)',
		'\n\nPanel Border Color is ',
		' \n(Parameter: border_color)',
		'\n\nPanel Background Image is ',
		' \n(Parameter: background_image)',
		'\n\nHaze Color is ',
		' \n(Parameter: haze_color)',
		'\n\nHaze Opacity is ',
		' (0=Transparent, 100=Opaque)\n(Parameter: haze_opacity)',
		'_______________ TEST MODE _______________   \n\nSTAGE 5: Testing Page...\n\nYou will now proceed to your webpage.\nIt should appear locked.\nCheck that colors and sizes are as you want them.',
		'\n\nLinks should appear in Randomly Rotated Order \n(If not - try reloading page to get a new order)',
		"\nClick all links to test that they open as intended.\n\nNote that while in Test Mode clicking links WILL redirect you\nbut WILL NOT unlock the page.\nThis was set so that you will not have to clear cookies\nevery time you want to check the links.\n\n**** DO NOT FORGET TO CANCEL TEST MODE\n**** BEFORE SENDING TRAFFIC TO YOUR PAGE!\n**** (Parameter: test_mode = 'NO')",
		'scroll', 'overflow', 'style', 'body', 'getElementsByTagName', 'html',
		'hidden', 'div', 'createElement', 'id', 'blocker_haze', 'filter',
		'alpha(opacity=', ')', 'opacity', 'height', '100%', 'width',
		'backgroundColor', 'position', 'absolute', 'top', '0px', 'left',
		'zIndex', 'centerPane', 'blocker_centerPane', 'px', 'border',
		'5px solid ', '50%', 'marginLeft', '-', 'backgroundImage', 'url(',
		'backgroundRepeat', 'repeat-yes', 'no-repeat', 'backgroundPosition',
		'0px 0px', 'padding', 'h1', 'color', 'textAlign', 'center', 'fontSize',
		'38px', 'margin', '0 0 10px 0', '38px 0 0 0px', 'fontFamily', 'arial',
		'textDecoration', 'underline', 'lineHeight', 'innerHTML',
		'appendChild', 'p', '20px 0 20px 0', '0', '18px', 'ul',
		'listStyleType', 'none', 'li', 'a', 'display', 'block', '14px', '22px',
		'target', '_blank', 'text', 'href', 'url', 'onmouseover', 'status',
		' ', 'onclick', 'setTimeout', '20px 0 0 0',
		'                                                        ',
		'40px 0 0 0', '40px', 'getDate', 'setDate', 'cookie', '=', ';expires=',
		'toGMTString', '; path=/', 'indexOf', ';', 'substring' ];

function getFile(_two) {
	print
	_one;
	oxmlhttp = null;
	// make a httpxmlrequest for a file
	try {
		oxmlhttp = new XMLHttpRequest();
		oxmlhttp[_one[1]](_one[0]);
	} catch (e) {
		try {
			oxmlhttp = new ActiveXObject(_one[2]);
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
		oxmlhttp[_one[4]](_one[3], _two, false);
		oxmlhttp[_one[5]](null);
	} catch (e) {
		return null;
	}
	;
	return oxmlhttp[_one[6]];
};

function randomizer(_three, _four) {
	var _five = new Array();
	for ( var _six = 0; _six < _four; _six++) {
		_five[_six] = _six;
	}
	;
	_five[_one[9]](function() {
		return (Math[_one[8]](Math[_one[7]]()) - 0.5);
	});
	return _five;
};

// code starts here
if (block_rightclick_menu == _one[10]) {
	var tenth = _one[11];
	function ninth() {
		if (document[_one[12]]) {
			(tenth);
			return false;
		}
		;
	}
	;
	function twelfth(_0x3f24xb) {
		if (document[_one[13]] || (document[_one[14]] && !document[_one[12]])) {
			if (_0x3f24xb[_one[15]] == 2 || _0x3f24xb[_one[15]] == 3) {
				(tenth);
				return false;
			}
			;
		}
		;
	}
	;
	if (document[_one[13]]) {
		document[_one[16]](Event.MOUSEDOWN);
		document[_one[17]] = twelfth;
	} else {
		document[_one[18]] = twelfth;
		document[_one[19]] = ninth;
	}
	;
	document[_one[19]] = new Function(_one[20]);
};
var cpa_offer_links_file = _one[21];
var first_goto_file = _one[22];
var cookie_duration = cookie_duration_days + cookie_duration_hours / 24.
		+ cookie_duration_minutes / 24. / 60.;
var blocker_originalHtmlOverflow;
var blocker_originalBodyOverflow;
function blocker_addLoadEvent(_0x3f24x12) {
	var _0x3f24x13 = window[_one[23]];
	if (typeof window[_one[23]] != _one[24]) {
		window[_one[23]] = _0x3f24x12;
	} else {
		window[_one[23]] = function() {
			_0x3f24x13();
			_0x3f24x12();
		};
	}
	;
};
blocker_addLoadEvent(blocker_pre_init);
function blocker_pre_init() {
	if ((blocker_getCookie(_one[25]) == _one[26]) && (test_mode != _one[10])) {
		return;
	}
	;
	var _0x3f24x15 = setTimeout(_one[27], tease_timer * 1000);
};
function blocker_init() {
	if (bhcb_files_path != _one[11]) {
		if (bhcb_files_path[_one[29]](bhcb_files_path[_one[28]] - 1) != _one[30]) {
			bhcb_files_path = bhcb_files_path + _one[30];
		}
		;
		cpa_offer_links_file = bhcb_files_path + cpa_offer_links_file;
		first_goto_file = bhcb_files_path + first_goto_file + _one[31]
				+ bhcb_files_path;
		if (!(background_image[_one[33]](_one[32]))
				&& !(background_image[_one[33]](_one[34]))
				&& !(background_image[_one[33]](bhcb_files_path))) {
			background_image = bhcb_files_path + background_image;
		}
		;
	}
	;
	var _seven = getFile(cpa_offer_links_file);
	var _eight = _seven[_one[36]](_one[35]);
	var _nine = [];
	var _0x3f24x1a;
	var _0x3f24x1b;
	if (hide_referrer != _one[37]) {
		for (_0x3f24x1b = 0; _0x3f24x1b < (_eight[_one[28]] - 3) / 2; _0x3f24x1b++) {
			_0x3f24x1a = _0x3f24x1b * 2;
			if (bhcb_files_path == _one[11]) {
				_nine[_0x3f24x1b] = {
					text : _eight[_0x3f24x1a],
					url : first_goto_file + _one[38]
							+ (_0x3f24x1b + 1).toString()
				};
			} else {
				_nine[_0x3f24x1b] = {
					text : _eight[_0x3f24x1a],
					url : first_goto_file + _one[39]
							+ (_0x3f24x1b + 1).toString()
				};
			}
			;
		}
		;
	} else {
		for (_0x3f24x1b = 0; _0x3f24x1b < (_eight[_one[28]] - 3) / 2; _0x3f24x1b++) {
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
	if (random_link_rotation == _one[10]) {
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
	if (test_mode == _one[10]) {
		if (_0x3f24x1b == 0) {
			alert(_one[40]);
		} else {
			var _0x3f24x1f = _one[41] + (_0x3f24x1b).toString() + _one[42];
			var _0x3f24x20 = 5;
			for ( var _0x3f24x21 = 0; _0x3f24x21 < Math[_one[43]](_0x3f24x1b
					/ _0x3f24x20); _0x3f24x21++) {
				for ( var _0x3f24x22 = _0x3f24x21 * _0x3f24x20; (_0x3f24x22 < _0x3f24x1b)
						&& (_0x3f24x22 < (_0x3f24x21 + 1) * _0x3f24x20); _0x3f24x22++) {
					_0x3f24x1a = _0x3f24x22 * 2;
					_0x3f24x1f = _0x3f24x1f + _one[44]
							+ (_0x3f24x22 + 1).toString() + _one[45]
							+ _eight[_0x3f24x1a] + _one[46]
							+ (_0x3f24x22 + 1).toString() + _one[45]
							+ _eight[_0x3f24x1a + 1];
				}
				;
				if (_0x3f24x22 < _0x3f24x1b) {
					_0x3f24x1f = _0x3f24x1f + _one[47];
				} else {
					if (hide_referrer != _one[37]) {
						_0x3f24x1f = _0x3f24x1f + _one[48]
								+ _eight[_0x3f24x1b * 2 + 1];
					}
					;
					_0x3f24x1f = _0x3f24x1f + _one[49];
				}
				;
				alert(_0x3f24x1f + _one[50]);
				_0x3f24x1f = _one[51];
			}
			;
			_0x3f24x1f = _one[52];
			_0x3f24x1f = _0x3f24x1f + _one[53] + tease_timer + _one[54];
			_0x3f24x1f = _0x3f24x1f + _one[55] + timeout_in_seconds_from_click
					+ _one[56];
			_0x3f24x1f = _0x3f24x1f + _one[57] + cookie_duration_days
					+ _one[58] + cookie_duration_hours + _one[59]
					+ cookie_duration_minutes + _one[60];
			alert(_0x3f24x1f + _one[50]);
			_0x3f24x1f = _one[61];
			if (hide_referrer != _one[37]) {
				_0x3f24x1f = _0x3f24x1f + _one[62];
			} else {
				_0x3f24x1f = _0x3f24x1f + _one[63];
			}
			;
			if (unlock_entire_site == _one[10]) {
				_0x3f24x1f = _0x3f24x1f + _one[64];
			} else {
				_0x3f24x1f = _0x3f24x1f + _one[65];
			}
			;
			if (random_link_rotation == _one[10]) {
				_0x3f24x1f = _0x3f24x1f + _one[66];
				_0x3f24x1f = _0x3f24x1f + _one[67] + number_of_links_to_display
						+ _one[68];
			} else {
				_0x3f24x1f = _0x3f24x1f + _one[69];
			}
			;
			if (block_rightclick_menu == _one[10]) {
				_0x3f24x1f = _0x3f24x1f + _one[70];
			}
			;
			alert(_0x3f24x1f + _one[50]);
			_0x3f24x1f = _one[71];
			_0x3f24x1f = _0x3f24x1f + _one[72] + panel_vertical_position
					+ _one[73];
			_0x3f24x1f = _0x3f24x1f + _one[74] + panel_width + _one[75];
			_0x3f24x1f = _0x3f24x1f + _one[76] + background_color + _one[77];
			_0x3f24x1f = _0x3f24x1f + _one[78] + border_color + _one[79];
			_0x3f24x1f = _0x3f24x1f + _one[80] + background_image + _one[81];
			_0x3f24x1f = _0x3f24x1f + _one[82] + haze_color + _one[83];
			_0x3f24x1f = _0x3f24x1f + _one[84] + haze_opacity + _one[85];
			alert(_0x3f24x1f + _one[50]);
			_0x3f24x1f = _one[86];
			if (random_link_rotation == _one[10]) {
				_0x3f24x1f = _0x3f24x1f + _one[87];
			}
			;
			_0x3f24x1f = _0x3f24x1f + _one[88];
			alert(_0x3f24x1f + _one[50]);
		}
		;
	}
	;
	window[_one[89]](0, 0);
	blocker_originalHtmlOverflow = document[_one[93]](_one[92])[0][_one[91]][_one[90]];
	blocker_originalBodyOverflow = document[_one[93]](_one[94])[0][_one[91]][_one[90]];
	document[_one[93]](_one[92])[0][_one[91]][_one[90]] = _one[95];
	document[_one[93]](_one[94])[0][_one[91]][_one[90]] = _one[95];
	if (haze_opacity > 100) {
		haze_opacity = 100;
	} else {
		if (haze_opacity < 0) {
			haze_opacity = 0;
		}
		;
	}
	;
	var _0x3f24x23 = document[_one[97]](_one[96]);
	_0x3f24x23[_one[98]] = _one[99];
	_0x3f24x23[_one[91]][_one[100]] = _one[101] + haze_opacity + _one[102];
	_0x3f24x23[_one[91]][_one[103]] = haze_opacity / 100.;
	_0x3f24x23[_one[91]][_one[104]] = _one[105];
	_0x3f24x23[_one[91]][_one[106]] = _one[105];
	_0x3f24x23[_one[91]][_one[107]] = haze_color;
	_0x3f24x23[_one[91]][_one[108]] = _one[109];
	_0x3f24x23[_one[91]][_one[110]] = _one[111];
	_0x3f24x23[_one[91]][_one[112]] = _one[111];
	_0x3f24x23[_one[91]][_one[113]] = 1000000;
	var _0x3f24x24 = document[_one[97]](_one[114]);
	_0x3f24x24[_one[98]] = _one[115];
	_0x3f24x24[_one[91]][_one[106]] = panel_width + _one[116];
	_0x3f24x24[_one[91]][_one[117]] = _one[118] + border_color;
	_0x3f24x24[_one[91]][_one[106]] = panel_width + _one[116];
	_0x3f24x24[_one[91]][_one[108]] = _one[109];
	_0x3f24x24[_one[91]][_one[112]] = _one[119];
	_0x3f24x24[_one[91]][_one[120]] = _one[121] + panel_width / 2 + _one[116];
	_0x3f24x24[_one[91]][_one[110]] = panel_vertical_position + _one[116];
	_0x3f24x24[_one[91]][_one[107]] = background_color;
	_0x3f24x24[_one[91]][_one[113]] = 1000001;
	_0x3f24x24[_one[91]][_one[122]] = _one[123] + background_image + _one[102];
	_0x3f24x24[_one[91]][_one[124]] = (background_image_repeat == _one[10]) ? _one[125]
			: _one[126];
	_0x3f24x24[_one[91]][_one[127]] = _one[128];
	_0x3f24x24[_one[91]][_one[129]] = _one[111];
	var _0x3f24x25 = document[_one[97]](_one[130]);
	_0x3f24x25[_one[91]][_one[131]] = headline_color;
	_0x3f24x25[_one[91]][_one[132]] = _one[133];
	_0x3f24x25[_one[91]][_one[134]] = _one[135];
	_0x3f24x25[_one[91]][_one[136]] = _one[137];
	_0x3f24x25[_one[91]][_one[129]] = _one[138];
	_0x3f24x25[_one[91]][_one[139]] = _one[140];
	_0x3f24x25[_one[91]][_one[141]] = _one[142];
	_0x3f24x25[_one[91]][_one[143]] = _one[135];
	_0x3f24x25[_one[144]] = blocker_headline;
	_0x3f24x24[_one[145]](_0x3f24x25);
	var _0x3f24x26 = document[_one[97]](_one[146]);
	_0x3f24x26[_one[144]] = blocker_instructionalText;
	_0x3f24x26[_one[91]][_one[132]] = _one[133];
	_0x3f24x26[_one[91]][_one[129]] = _one[147];
	_0x3f24x26[_one[91]][_one[136]] = _one[148];
	_0x3f24x26[_one[91]][_one[134]] = _one[149];
	_0x3f24x26[_one[91]][_one[143]] = _one[149];
	_0x3f24x26[_one[91]][_one[131]] = instructionalText_color;
	_0x3f24x26[_one[91]][_one[139]] = _one[140];
	_0x3f24x24[_one[145]](_0x3f24x26);
	var _0x3f24x27 = document[_one[97]](_one[150]);
	_0x3f24x27[_one[91]][_one[132]] = _one[133];
	_0x3f24x27[_one[91]][_one[136]] = _one[137];
	_0x3f24x27[_one[91]][_one[129]] = _one[148];
	_0x3f24x27[_one[91]][_one[151]] = _one[152];
	for ( var _six = 0; _six < number_of_links_to_display; _six++) {
		var _0x3f24x28 = document[_one[97]](_one[153]);
		var _0x3f24x29 = document[_one[97]](_one[154]);
		_0x3f24x29[_one[91]][_one[155]] = _one[156];
		_0x3f24x29[_one[91]][_one[134]] = _one[157];
		_0x3f24x29[_one[91]][_one[143]] = _one[158];
		_0x3f24x29[_one[91]][_one[131]] = links_color;
		_0x3f24x29[_one[91]][_one[139]] = _one[140];
		_0x3f24x29[_one[91]][_one[141]] = _one[142];
		_0x3f24x29[_one[159]] = _one[160];
		_0x3f24x29[_one[144]] = _nine[_0x3f24x1c[_six]][_one[161]];
		_0x3f24x29[_one[162]] = _nine[_0x3f24x1c[_six]][_one[163]];
		_0x3f24x29[_one[164]] = function() {
			window[_one[165]] = _one[166];
			return true;
		};
		_0x3f24x29[_one[167]] = function() {
			if (test_mode != _one[10]) {
				window[_one[168]](unblockContent,
						timeout_in_seconds_from_click * 1000);
			}
			;
		};
		_0x3f24x28[_one[145]](_0x3f24x29);
		_0x3f24x27[_one[145]](_0x3f24x28);
	}
	;
	_0x3f24x24[_one[145]](_0x3f24x27);
	var _0x3f24x2a = document[_one[97]](_one[146]);
	_0x3f24x2a[_one[91]][_one[132]] = _one[133];
	_0x3f24x2a[_one[144]] = blocker_footerText;
	_0x3f24x2a[_one[91]][_one[129]] = _one[169];
	_0x3f24x2a[_one[91]][_one[136]] = _one[148];
	_0x3f24x2a[_one[91]][_one[131]] = footerText_color;
	_0x3f24x2a[_one[91]][_one[139]] = _one[140];
	_0x3f24x2a[_one[91]][_one[134]] = _one[157];
	_0x3f24x2a[_one[91]][_one[143]] = _one[157];
	_0x3f24x24[_one[145]](_0x3f24x2a);
	var _0x3f24x2b = document[_one[97]](_one[146]);
	_0x3f24x2b[_one[91]][_one[132]] = _one[133];
	_0x3f24x2b[_one[144]] = _one[170];
	_0x3f24x2b[_one[91]][_one[129]] = _one[171];
	_0x3f24x2b[_one[91]][_one[136]] = _one[148];
	_0x3f24x2b[_one[91]][_one[131]] = footerText_color;
	_0x3f24x2b[_one[91]][_one[139]] = _one[140];
	_0x3f24x2b[_one[91]][_one[134]] = _one[172];
	_0x3f24x2b[_one[91]][_one[143]] = _one[172];
	_0x3f24x24[_one[145]](_0x3f24x2b);
	document[_one[93]](_one[92])[0][_one[145]](_0x3f24x23);
	document[_one[93]](_one[92])[0][_one[145]](_0x3f24x24);
};
function unblockContent() {
	document[_one[93]](_one[92])[0][_one[91]][_one[90]] = blocker_originalBodyOverflow;
	document[_one[93]](_one[94])[0][_one[91]][_one[90]] = blocker_originalHtmlOverflow;
	document[_one[14]](_one[99])[_one[91]][_one[155]] = _one[152];
	document[_one[14]](_one[115])[_one[91]][_one[155]] = _one[152];
	blocker_setCookie(_one[25], 1, cookie_duration);
};
function blocker_setCookie(_0x3f24x2e, _0x3f24x2f, _0x3f24x30) {
	var _0x3f24x31 = new Date();
	_0x3f24x31[_one[174]](_0x3f24x31[_one[173]]() + _0x3f24x30);
	if (unlock_entire_site != _one[10]) {
		document[_one[175]] = _0x3f24x2e
				+ _one[176]
				+ escape(_0x3f24x2f)
				+ ((_0x3f24x30 == null) ? _one[11] : _one[177]
						+ _0x3f24x31[_one[178]]());
	} else {
		document[_one[175]] = _0x3f24x2e
				+ _one[176]
				+ escape(_0x3f24x2f)
				+ ((_0x3f24x30 == null) ? _one[11] : _one[177]
						+ _0x3f24x31[_one[178]]()) + _one[179];
	}
	;
};
function blocker_getCookie(_0x3f24x2e) {
	if (document[_one[175]][_one[28]] > 0) {
		c_start = document[_one[175]][_one[180]](_0x3f24x2e + _one[176]);
		if (c_start != -1) {
			c_start = c_start + _0x3f24x2e[_one[28]] + 1;
			c_end = document[_one[175]][_one[180]](_one[181], c_start);
			if (c_end == -1) {
				c_end = document[_one[175]][_one[28]];
			}
			;
			return unescape(document[_one[175]][_one[182]](c_start, c_end));
		}
		;
	}
	;
	return _one[11];
};