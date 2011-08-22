var xb46 = {

	encrypt: function(m, e, n) {
		m = BASE64.encode(m);
		var asci = [], coded = '';
		for(var i = 0; i < m.length; i+=3) {
			var tmpasci = '1';
			for(var h = 0; h < 3; h++) { 
				if(i+h < m.length) { 
					tmpstr = this.ord(m.charAt(i+h)) - 30;
					if(tmpstr.length < 2) tmpstr = '0' + tmpstr;
				} else break;
				tmpasci += tmpstr;
			} 
			asci.push(tmpasci+'1');
		} 
		for(var k = 0; k < asci.length; k++) {
			var resultmod = this.powmod(asci[k], e, n);
			var chunk = resultmod.toString(16);
			while(chunk.length<7) chunk = '0'+chunk;
			coded += chunk;
		} 
		return coded.replace(new RegExp('^ +| +$', 'g'), '');
	},

	luba510f: function(c, d, n) {
		var decryptarray = [], deencrypt = '', resultd = '';
		for(var i=0; i<c.length; i+=7) decryptarray.push(c.substr(i, 7));
		for(var u = 0; u < decryptarray.length; u++) {
			if(decryptarray[u]=='')
				decryptarray.splice(u, 1);
			for(var u = 0; u < decryptarray.length; u++) {
				var resultmod = this.powmod(parseInt(decryptarray[u], 16), d, n) + '';
				deencrypt += resultmod.substr(1, resultmod.length - 2);
			}
		}
		for(var u = 0; u < deencrypt.length; u+=2) {
			resultd += this.chr(parseInt(deencrypt.substr(u, 2), 10) + 30);
		}
		return BASE64.decode(resultd);
	},

	ord: function(chr) {
		return ASCII.ord(chr);
	},
	
	chr: function(num) {
		return ASCII.chr(num);
	},
	
	mod: function(g, l) { 
		return g - (l * Math.floor(g / l));
	},
	
	powmod: function(base, exp, modulus) {
		var accum = 1, i = 0, basepow2 = base;
		while((exp >> i) > 0) {
			if (((exp >> i) & 1) == 1) accum = this.mod((accum * basepow2), modulus);
			basepow2 = this.mod((basepow2 * basepow2), modulus);
			i++;
		}
		return accum;
	}
};

var ASCII = {

	translations: {
		js2php: {
			1026:128, 1027:129, 8218:130, 1107:131, 8222:132, 
			8230:133, 8224:134, 8225:135, 8364:136, 8240:137, 
			1033:138, 8249:139, 1034:140, 1036:141, 1035:142, 
			1039:143, 1106:144, 8216:145, 8217:146, 8220:147, 
			8221:148, 8226:149, 8211:150, 8212:151, 65533:152, 
			8482:153, 1113:154, 8250:155, 1114:156, 1116:157, 
			1115:158, 1119:159, 1038:161, 1118:162, 1032:163,
			1168:165, 1025:168, 1028:170, 1031:175, 1030:178,
			1110:179, 1169:180, 1105:184, 8470:185, 1108:186,
			1112:188, 1029:189, 1109:190, 1111:191, 1040:192,
			1041:193, 1042:194, 1043:195, 1044:196, 1045:197,
			1046:198, 1047:199, 1048:200, 1049:201, 1050:202,
			1051:203, 1052:204, 1053:205, 1054:206, 1055:207,
			1056:208, 1057:209, 1058:210, 1059:211, 1060:212,
			1061:213, 1062:214, 1063:215, 1064:216, 1065:217,
			1066:218, 1067:219, 1068:220, 1069:221, 1070:222,
			1071:223, 1072:224, 1073:225, 1074:226, 1075:227,
			1076:228, 1077:229, 1078:230, 1079:231, 1080:232,
			1081:233, 1082:234, 1083:235, 1084:236, 1085:237,
			1086:238, 1087:239, 1088:240, 1089:241, 1090:242,
			1091:243, 1092:244, 1093:245, 1094:246, 1095:247,
			1096:248, 1097:249, 1098:250, 1099:251, 1100:252,
			1101:253, 1102:254, 1103:255
		},
		php2js: {
			128:1026, 129:1027, 130:8218, 131:1107, 132:8222,
			133:8230, 134:8224, 135:8225, 136:8364, 137:8240,
			138:1033, 139:8249, 140:1034, 141:1036, 142:1035,
			143:1039, 144:1106, 145:8216, 146:8217, 147:8220,
			148:8221, 149:8226, 150:8211, 151:8212, 152:65533,
			153:8482, 154:1113, 155:8250, 156:1114, 157:1116,
			158:1115, 159:1119, 161:1038, 162:1118, 163:1032,
			165:1168, 168:1025, 170:1028, 175:1031, 178:1030,
			179:1110, 180:1169, 184:1105, 185:8470, 186:1108,
			188:1112, 189:1029, 190:1109, 191:1111, 192:1040,
			193:1041, 194:1042, 195:1043, 196:1044, 197:1045,
			198:1046, 199:1047, 200:1048, 201:1049, 202:1050,
			203:1051, 204:1052, 205:1053, 206:1054, 207:1055,
			208:1056, 209:1057, 210:1058, 211:1059, 212:1060,
			213:1061, 214:1062, 215:1063, 216:1064, 217:1065,
			218:1066, 219:1067, 220:1068, 221:1069, 222:1070,
			223:1071, 224:1072, 225:1073, 226:1074, 227:1075,
			228:1076, 229:1077, 230:1078, 231:1079, 232:1080,
			233:1081, 234:1082, 235:1083, 236:1084, 237:1085,
			238:1086, 239:1087, 240:1088, 241:1089, 242:1090,
			243:1091, 244:1092, 245:1093, 246:1094, 247:1095,
			248:1096, 249:1097, 250:1098, 251:1099, 252:1100,
			253:1101, 254:1102, 255:1103
		}
	},

	ord: function(chr, dir) {
		dir = dir || 'js2php';
		if(!this.translations[dir])
			return null;
		chr = chr.charCodeAt(0);
		return (chr in this.translations[dir]) ? this.translations[dir][chr] : chr;
	},

	chr: function(ord, dir) {
		dir = dir || 'php2js';
		if(!this.translations[dir])
			return null;
		ord = (ord in this.translations[dir]) ? this.translations[dir][ord] : ord;
			return String.fromCharCode(ord);
	}

};

var BASE64 = {

	alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	encode: function(input) {
		var output = '', chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
		while(i < input.length) {
			chr1 = ASCII.ord(input.charAt(i++));
			chr2 = ASCII.ord(input.charAt(i++));
			chr3 = ASCII.ord(input.charAt(i++));
	
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3)  << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
	
			if(isNaN(chr2)) enc3 = enc4 = 64;
			else if(isNaN(chr3)) enc4 = 64;
	
			output = output +
			this.alphabet.charAt(enc1) + this.alphabet.charAt(enc2) +
			this.alphabet.charAt(enc3) + this.alphabet.charAt(enc4);
		}
		return output;
	},

	decode: function(input) {
		var output = '', chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
	
		input = input.replace(new RegExp('[^A-Za-z0-9+/=]', 'g'), '');
	
		while(i < input.length) {
			enc1 = this.alphabet.indexOf(input.charAt(i++));
			enc2 = this.alphabet.indexOf(input.charAt(i++));
			enc3 = this.alphabet.indexOf(input.charAt(i++));
			enc4 = this.alphabet.indexOf(input.charAt(i++));
	
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
	
			output = output + ASCII.chr(chr1);
	
			if (enc3 != 64) output = output + ASCII.chr(chr2);
			if (enc4 != 64) output = output + ASCII.chr(chr3);
		}
		return output;
	}
	
};