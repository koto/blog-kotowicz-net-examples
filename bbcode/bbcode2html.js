function BBC2HTML(S) {
if (S.indexOf('[') < 0) return S;

function X(p, f) {return new RegExp(p, f)}
function D(s) {return rD.exec(s)}
function R(s) {return s.replace(rB, P)}
function A(s, p) {for (var i in p) s = s.replace(X(i, 'g'), p[i]); return s;}

function P($0, $1, $2, $3) {
  if ($3 && $3.indexOf('[') > -1) $3 = R($3);
  switch ($1) {
    case 'url':case 'anchor':case 'email': return '<a '+ L[$1] + ($2||$3) +'">'+ $3 +'</a>';
    case 'img': var d = D($2); return '<img src="'+ $3 +'"'+ (d ? ' width="'+ d[1] +'" height="'+ d[2] +'"' : '') +' alt="'+ (d ? '' : $2) +'" />';
    case 'flash':case 'youtube': var d = D($2)||[0, 425, 366]; return '<object type="application/x-shockwave-flash" data="'+ Y[$1] + $3 +'" width="'+ d[1] +'" height="'+ d[2] +'"><param name="movie" value="'+ Y[$1] + $3 +'" /></object>';
    case 'float': return '<span style="float: '+ $2 +'">'+ $3 +'</span>';
    case 'left':case 'right':case 'center':case 'justify': return '<div style="text-align: '+ $1 +'">'+ $3 +'</div>';
    case 'google':case 'wikipedia': return '<a href="'+ G[$1] + $3 +'">'+ $3 +'</a>';
    case 'b':case 'i':case 'u':case 's':case 'sup':case 'sub':case 'h1':case 'h2':case 'h3':case 'h4':case 'h5':case 'h6':case 'table':case 'tr':case 'th':case 'td': return '<'+ $1 +'>'+ $3 +'</'+ $1 +'>';
    case 'row': case 'r':case 'header':case 'head':case 'h':case 'col':case 'c': return '<'+ T[$1] +'>'+ $3 +'</'+ T[$1] +'>';
    case 'acronym':case 'abbr': return '<'+ $1 +' title="'+ $2 +'">'+ $3 +'</'+ $1 +'>';
  }
  return '['+ $1 + ($2 ? '='+ $2 : '') +']'+ $3 +'[/'+ $1 +']';
}

var rB = X('\\[([a-z][a-z0-9]*)(?:=([^\\]]+))?]((?:.|[\r\n])*?)\\[/\\1]', 'g'), rD = X('^(\\d+)x(\\d+)$');
var L = {url: 'href="', 'anchor': 'name="', email: 'href="mailto: '};
var G = {google: 'http://www.google.com/search?q=', wikipedia: 'http://www.wikipedia.org/wiki/'};
var Y = {youtube: 'http://www.youtube.com/v/', flash: ''};
var T = {row: 'tr', r: 'tr', header: 'th', head: 'th', h: 'th', col: 'td', c: 'td'};
var C = {notag: [{'\\[': '&#91;', ']': '&#93;'}, '', ''], code: [{'<': '&lt;'}, '<code><pre>', '</pre></code>']};
C.php = [C.code[0], C.code[1]+ '&lt;?php ', '?>'+ C.code[2]];
var F = {font: 'font-family:$1', size: 'font-size:$1px', color: 'color:$1'};
var U = {c: 'circle', d: 'disc', s: 'square', '1': 'decimal', a: 'lower-alpha', A: 'upper-alpha', i: 'lower-roman', I: 'upper-roman'};
var I = {}, B = {};

for (var i in C) I['\\[('+ i +')]((?:.|[\r\n])*?)\\[/\\1]'] = function($0, $1, $2) {return C[$1][1] + A($2, C[$1][0]) + C[$1][2]};
for (var i in F) {B['\\['+ i +'=([^\\]]+)]'] = '<span style="'+ F[i] +'">'; B['\\[/'+ i +']'] = '</span>';}
B['\\[list]'] = '<ul>'; B['\\[list=(\\w)]'] = function($0, $1) {return '<ul style="list-style-type: '+ (U[$1]||'disc') +'">'}; B['\\[/list]'] = '</ul>'; B['\\[\\*]'] = '<li>';
B['\\[quote(?:=([^\\]]+))?]'] = function($0, $1) {return '<div class="bb-quote">'+ ($1 ? $1 +' wrote' : 'Quote') +':<blockquote>'}; B['\\[/quote]'] = '</blockquote></div>';
B['\\[(hr|br)]'] = '<$1 />'; B['\\[sp]'] = '&nbsp;';
return R(A(A(S, I), B));
}
