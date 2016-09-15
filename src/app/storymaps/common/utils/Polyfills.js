define([], 
	function()
	{
		return {
			/* jshint -W033 */
			/* jshint -W004 */
			/* jshint -W084 */
			/* jshint -W058 */
			/* jshint -W117 */
			apply: function(){
				if(typeof String.prototype.trim !== 'function') {
					String.prototype.trim = function() {
						return this.replace(/^\s+|\s+$/g, '');
					};
				}

				if (!Date.now) {
					Date.now = function() {
						return new Date().valueOf();
					};
				}

				/*
				 * AddEventListener IE8
				 */
				/*
				(function(win, doc){
					if(win.addEventListener)return;		//No need to polyfill

					function docHijack(p){var old = doc[p];doc[p] = function(v){return addListen(old(v))}}
					function addEvent(on, fn, self){
						return (self = this).attachEvent('on' + on, function(e){
							var e = e || win.event;
							e.preventDefault  = e.preventDefault  || function(){e.returnValue = false}
							e.stopPropagation = e.stopPropagation || function(){e.cancelBubble = true}
							fn.call(self, e);
						});
					}
					function addListen(obj, i){
						if(i = obj.length)while(i--)obj[i].addEventListener = addEvent;
						else obj.addEventListener = addEvent;
						return obj;
					}

					addListen([doc, win]);
					if('Element' in win)win.Element.prototype.addEventListener = addEvent;			//IE8
					else{		//IE < 8
						doc.attachEvent('onreadystatechange', function(){addListen(doc.all)});		//Make sure we also init at domReady
						docHijack('getElementsByTagName');
						docHijack('getElementById');
						docHijack('createElement');
						addListen(doc.all);
					}
				})(window, document);
				*/

				Object.keys = Object.keys ||
					function (
						o, // object
						k, // key
						r  // result array
					){
						// initialize object and result
						r=[];
						// iterate over object keys
						for (k in o)
							// fill result array with non-prototypical keys
							r.hasOwnProperty.call(o, k) && r.push(k);
						// return result
						return r
					};

				// btoa and atob
				;(function () {
					var object = typeof exports != 'undefined' ? exports : this; // #8: web workers
					var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

					function InvalidCharacterError(message) {
						this.message = message;
					}
					InvalidCharacterError.prototype = new Error;
					InvalidCharacterError.prototype.name = 'InvalidCharacterError';

					// encoder
					// [https://gist.github.com/999166] by [https://github.com/nignag]
					object.btoa || (
					object.btoa = function (input) {
						var str = String(input);
						for (
							// initialize result and counter
							var block, charCode, idx = 0, map = chars, output = '';
							// if the next str index does not exist:
							//   change the mapping table to "="
							//   check if d has no fractional digits
							str.charAt(idx | 0) || (map = '=', idx % 1);
							// "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
							output += map.charAt(63 & block >> 8 - idx % 1 * 8)
						) {
							charCode = str.charCodeAt(idx += 3/4);
							if (charCode > 0xFF) {
								throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
							}
							block = block << 8 | charCode;
						}
						return output;
					});

					// decoder
					// [https://gist.github.com/1020396] by [https://github.com/atk]
					object.atob || (
					object.atob = function (input) {
						var str = String(input).replace(/=+$/, '');
						if (str.length % 4 == 1) {
							throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
						}
						for (
							// initialize result and counters
							var bc = 0, bs, buffer, idx = 0, output = '';
							// get next character
							buffer = str.charAt(idx++);
							// character found in table? initialize bit storage and add its ascii value;
							~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
									// and if not first of each 4 characters,
									// convert the first 8 bits to one ascii character
									bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
						) {
							// try to find character in table (0-63, not found => -1)
							buffer = chars.indexOf(buffer);
						}
						return output;
					});
				}());
			}
		};
	}
);
