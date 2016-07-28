/*! asynquence
    v0.9.0 (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
!function UMD(e,n,t){"function"==typeof define&&define.amd?define(t):"undefined"!=typeof module&&module.exports?module.exports=t():n[e]=t(e,n)}("ASQ",this,function DEF(e,n){"use strict";function Queue(){function Item(e){this.fn=e,this.next=void 0}var e,n,r;return{add:function $$add(t){r=new Item(t),n?n.next=r:e=r,n=r,r=void 0},drain:function $$drain(){var r=e;for(e=n=t=null;r;)r.fn(),r=r.next}}}function schedule(e){r.add(e),t||(t=u(r.drain))}function tapSequence(e){function trigger(){e.seq=createSequence.apply(h,arguments).defer()}trigger.fail=function $$trigger$fail(){var n=f.call(arguments);e.seq=createSequence(function $$create$sequence(e){e.fail.apply(h,n)}).defer()},e.seq.val(function $$val(){return trigger.apply(h,arguments),c.apply(h,arguments)}).or(function $$or(){trigger.fail.apply(h,arguments)}),e.seq=createSequence(function $$create$sequence(e){trigger=e}).defer()}function createSequence(){function scheduleSequenceTick(){r?sequenceTick():e||(e=schedule(sequenceTick))}function throwSequenceErrors(){throw 1===$.length?$[0]:$}function sequenceTick(){var a,c;if(e=null,delete d.unpause,r)clearTimeout(e),e=null,s.length=p.length=g.length=$.length=0;else if(n)for(0!==p.length||t||(t=!0,throwSequenceErrors());p.length;){t=!0,a=p.shift();try{a.apply(h,$)}catch(i){l(i)?$=$.concat(i):($.push(i),i.stack&&$.push(i.stack)),0===p.length&&throwSequenceErrors()}}else if(u&&s.length>0){u=!1,a=s.shift(),c=g.slice(),g.length=0,c.unshift(createStepCompletion());try{a.apply(h,c)}catch(i){l(i)?$=$.concat(i):$.push(i),n=!0,scheduleSequenceTick()}}}function createStepCompletion(){function done(){n||r||u||(u=!0,g.push.apply(g,arguments),$.length=0,scheduleSequenceTick())}return done.fail=function $$step$fail(){n||r||u||(n=!0,g.length=0,$.push.apply($,arguments),scheduleSequenceTick())},done.abort=function $$step$abort(){n||r||(u=!1,r=!0,g.length=$.length=0,scheduleSequenceTick())},done.errfcb=function $$step$errfcb(e){e?done.fail(e):done.apply(h,f.call(arguments,1))},done}function createGate(e,t,u){function resetGate(){clearTimeout(s),s=d=m=o=null}function scheduleGateTick(){return g?gateTick():void(s||(s=schedule(gateTick)))}function gateTick(){if(!(n||r||$)){var t=[];s=null,p?(e.fail.apply(h,o),resetGate()):g?(e.abort(),resetGate()):checkGate()&&($=!0,d.forEach(function $$each(e,n){t.push(m["s"+n])}),e.apply(h,t),resetGate())}}function checkGate(){if(0!==d.length){var e=!0;return d.some(function $$some(n){return null===n?(e=!1,!0):void 0}),e}}function createSegmentCompletion(){function done(){if(!(n||r||p||g||$||d[e])){var t=c.apply(h,arguments);m["s"+e]=t.length>1?t:t[0],d[e]=!0,scheduleGateTick()}}var e=d.length;return done.fail=function $$segment$fail(){n||r||p||g||$||d[e]||(p=!0,o=f.call(arguments),scheduleGateTick())},done.abort=function $$segment$abort(){n||r||p||g||$||(g=!0,gateTick())},done.errfcb=function $$segment$errfcb(e){e?done.fail(e):done.apply(h,f.call(arguments,1))},d[e]=null,done}var a,i,o,s,p=!1,g=!1,$=!1,d=[],m={};t.some(function $$some(e){if(p||g)return!0;a=u.slice(),a.unshift(createSegmentCompletion());try{e.apply(h,a)}catch(n){return i=n,p=!0,!0}}),i&&(l(i)?e.fail.apply(h,i):e.fail(i))}function then(){return n||r||0===arguments.length?d:(wrapArgs(arguments,thenWrapper).forEach(function $$each(e){i(e)?seq(e):s.push(e)}),scheduleSequenceTick(),d)}function or(){return r||0===arguments.length?d:(p.push.apply(p,arguments),scheduleSequenceTick(),d)}function gate(){if(n||r||0===arguments.length)return d;var e=f.call(arguments).map(function $$map(e){var n;return i(e)?(n={seq:e},tapSequence(n),function $$segment(e){n.seq.pipe(e)}):e});return then(function $$then(n){var t=f.call(arguments,1);createGate(n,e,t)}),d}function pipe(){return r||0===arguments.length?d:(f.call(arguments).forEach(function $$each(e){then(function $$then(n){e.apply(h,f.call(arguments,1)),n()}).or(e.fail)}),d)}function seq(){return n||r||0===arguments.length?d:(f.call(arguments).forEach(function $$each(e){var n={seq:e};i(e)&&tapSequence(n),then(function $$then(e){var t=n.seq;i(t)||(t=n.seq.apply(h,f.call(arguments,1))),t.pipe(e)})}),d)}function val(){return n||r||0===arguments.length?d:(f.call(wrapArgs(arguments,valWrapper)).forEach(function $$each(e){then(function $$then(n){var t=e.apply(h,f.call(arguments,1));l(t)||(t=c(t)),n.apply(h,t)})}),d)}function promise(){function wrap(e){return function $$fn(){e.apply(h,l(arguments[0])?arguments[0]:arguments)}}return n||r||0===arguments.length?d:(f.call(arguments).forEach(function $$each(e){then(function $$then(n){var t=e;"function"==typeof e&&"function"!=typeof e.then&&(t=e.apply(h,f.call(arguments,1))),t.then(wrap(n),wrap(n.fail))})}),d)}function fork(){var e;return val(function $$val(){return e?e.apply(h,arguments):e=createSequence.apply(h,arguments).defer(),c.apply(h,arguments)}),or(function $$or(){if(e)e.fail.apply(h,arguments);else{var n=f.call(arguments);e=createSequence().then(function $$then(e){e.fail.apply(h,n)}).defer()}}),createSequence().then(function $$then(n){e?e.pipe(n):e=n}).defer()}function abort(){return n?d:(r=!0,sequenceTick(),d)}function duplicate(){var e;return a={then_queue:s.slice(),or_queue:p.slice()},e=createSequence(),a=null,e}function unpause(){g.push.apply(g,arguments),e===!0&&(e=null),scheduleSequenceTick()}function defer(){return p.push(function ignored(){}),d}function internals(e,t){var a=arguments.length>1;switch(e){case"seq_error":if(!a)return n;n=t;break;case"seq_aborted":if(!a)return r;r=t;break;case"then_ready":if(!a)return u;u=t;break;case"then_queue":return s;case"or_queue":return p;case"sequence_messages":return g;case"sequence_errors":return $}}function includeExtensions(){Object.keys(o).forEach(function $$each(e){d[e]=d[e]||o[e](d,internals)})}var e,n=!1,t=!1,r=!1,u=!0,s=[],p=[],g=[],$=[],d=brandIt({then:then,or:or,onerror:or,gate:gate,all:gate,pipe:pipe,seq:seq,val:val,promise:promise,fork:fork,abort:abort,duplicate:duplicate,defer:defer});return includeExtensions(),a&&(s=a.then_queue.slice(),p=a.or_queue.slice(),d.unpause=unpause,e=!0),d.then.apply(h,arguments),d}function brandIt(e){return Object.defineProperty(e,p,{enumerable:!1,value:!0})}function checkBranding(e){return!(null==e||"object"!=typeof e||!e[p])}function valWrapper(e){return c.apply(h,f.call(arguments).slice(1,e+1))}function thenWrapper(e){arguments[e+1].apply(h,f.call(arguments).slice(1,e+1))}function wrapArgs(e,n){var t,r;for(e=f.call(e),t=0;t<e.length;t++)if(l(e[t]))e[t]=n.bind.apply(n,[null,e[t].length].concat(e[t]));else if("function"!=typeof e[t]&&(n===valWrapper||!i(e[t]))){for(r=t+1;r<e.length&&("function"!=typeof e[r]&&!checkBranding(e[r]));r++);e.splice(t,r-t,n.bind.apply(n,[null,r-t].concat(e.slice(t,r))))}return e}var t,r,u="undefined"!=typeof setImmediate?function $$timer(e){return setImmediate(e)}:setTimeout;r=Queue();var a,c,i,l,o={},s=(n||{})[e],f=[].slice,p="__ASQ__",h=Object.create(null);return createSequence.failed=function $$public$failed(){var e=c.apply(h,arguments);return createSequence(function $$failed(){throw e}).defer()},createSequence.extend=function $$public$extend(e,n){return o[e]=n,createSequence},createSequence.messages=c=function $$public$messages(){var e=f.call(arguments);return brandIt(e)},createSequence.isSequence=i=function $$public$isSequence(e){return checkBranding(e)&&!Array.isArray(e)},createSequence.isMessageWrapper=l=function $$public$isMessageWrapper(e){return checkBranding(e)&&Array.isArray(e)},createSequence.unpause=function $$public$unpause(e){return e.unpause&&e.unpause(),e},createSequence.noConflict=function $$public$noConflict(){return n&&(n[e]=s),createSequence},createSequence.clone=function $$public$clone(){return DEF(e,n)},createSequence.__schedule=schedule,createSequence.__tapSequence=tapSequence,createSequence});
/*! asynquence-contrib
    v0.27.0 (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
!function UMD(e,n){"undefined"!=typeof module&&module.exports?(module.exports=function $$inject$dependency(e){if("string"==typeof e)try{e=require(e)}catch(t){return $$inject$dependency}return n(e)},"string"==typeof e&&(module.exports=module.exports(require("path").join("..",e)))):"function"==typeof define&&define.amd?define([e],n):n(e)}(this.ASQ||"asynquence",function DEF(e){"use strict";function wrapGate(r,a,l,c,s){a=a.map(function $$map(r,a){var o;return e.isSequence(r)?(o={seq:r},u(o),function $$fn(e){o.seq.val(function $$val(){l(e,a,n.call(arguments))}).or(function $$or(){c(e,a,n.call(arguments))})}):function $$fn(e){var u=n.call(arguments);u[0]=function $$next(){l(e,a,n.call(arguments))},u[0].fail=function $$fail(){c(e,a,n.call(arguments))},u[0].abort=function $$abort(){s()},u[0].errfcb=function $$errfcb(t){t?c(e,a,[t]):l(e,a,n.call(arguments,1))},r.apply(t,u)}}),r.then(function $$then(){var e=n.call(arguments);a.forEach(function $$each(n){n.apply(t,e)})})}function isPromise(n){var t=typeof n;return null!==n&&("object"==t||"function"==t)&&!e.isSequence(n)&&"function"==typeof n.then}var n=Array.prototype.slice,t=Object.create(null),r="__ASQ__",a=e.__schedule,u=e.__tapSequence;return e.extend("after",function $$extend(e,r){return function $$after(r){var a=arguments.length>1?n.call(arguments,1):void 0;return r=+r||0,e.then(function $$then(e){var u=a||n.call(arguments,1);setTimeout(function $$set$timeout(){e.apply(t,u)},r)}),e}}),e.after=function $$after(){return e().after.apply(t,arguments)},e.extend("any",function $$extend(r,a){return function $$any(){if(a("seq_error")||a("seq_aborted")||0===arguments.length)return r;var u=n.call(arguments);return r.then(function $$then(r){function reset(){c=!0,l.length=0,s.length=0}function complete(e){s.length>0?(s.length=u.length,e.apply(t,s)):(l.length=u.length,e.fail.apply(t,l)),reset()}function success(n,r,l){c||(a++,s[r]=l.length>1?e.messages.apply(t,l):l[0],a===u.length&&(c=!0,complete(n)))}function failure(n,r,s){c||r in l||(a++,l[r]=s.length>1?e.messages.apply(t,s):s[0]),c||a!==u.length||(c=!0,complete(n))}var a=0,l=[],c=!1,s=[],o=e.apply(t,n.call(arguments,1));wrapGate(o,u,success,failure,reset),o.pipe(r)}),r}}),e.extend("errfcb",function $$extend(e,a){return function $$errfcb(){var a={val:function $$then(e){return a.val_cb=e,a},or:function $$or(e){return a.or_cb=e,a}};return a[r]=!0,e.seq(a),function $$errorfirst$callback(e){e?a.or_cb(e):a.val_cb.apply(t,n.call(arguments,1))}}}),e.extend("failAfter",function $$extend(e,r){return function $$failAfter(r){var a=arguments.length>1?n.call(arguments,1):void 0;return r=+r||0,e.then(function $$then(e){setTimeout(function $$set$timeout(){e.fail.apply(t,a)},r)}),e}}),e.failAfter=function $$fail$after(){return e().failAfter.apply(t,arguments)},e.extend("first",function $$extend(r,a){return function $$first(){if(a("seq_error")||a("seq_aborted")||0===arguments.length)return r;var u=n.call(arguments);return r.then(function $$then(r){function reset(){l.length=0}function success(n,r,a){c||(c=!0,n(a.length>1?e.messages.apply(t,a):a[0]),reset())}function failure(n,r,s){c||r in l||(a++,l[r]=s.length>1?e.messages.apply(t,s):s[0],a===u.length&&(c=!0,l.length=u.length,n.fail.apply(t,l),reset()))}var a=0,l=[],c=!1,s=e.apply(t,n.call(arguments,1));wrapGate(s,u,success,failure,reset),s.pipe(r)}),r}}),function IIFE(){function filterResolved(e){return e.filter(function $$filter(e){return!e.resolved})}function closeQueue(e,n){e.forEach(function $$each(e){e.resolved||(e.next(),e.next(n))}),e.length=0}function channel(n){var t={close:function $$close(){t.closed=!0,closeQueue(t.put_queue,!1),closeQueue(t.take_queue,e.csp.CLOSED)},closed:!1,messages:[],put_queue:[],take_queue:[],buffer_size:+n||0};return t}function unblock(e){e&&!e.resolved&&e.next(e.next().value)}function put(n,t){var r;return n.closed?!1:(n.put_queue=filterResolved(n.put_queue),n.take_queue=filterResolved(n.take_queue),n.messages.length<n.buffer_size?(n.messages.push(t),unblock(n.take_queue.shift()),!0):(n.put_queue.push(e.iterable().then(function $$then(){return n.closed?!1:(n.messages.push(t),!0)})),r=e(n.put_queue[n.put_queue.length-1]),n.take_queue.length>0&&(unblock(n.put_queue.shift()),unblock(n.take_queue.shift())),r))}function putAsync(n,t,r){var a=e(put(n,t));return r&&"function"==typeof r?void a.val(r):a}function take(n){var t;try{t=takem(n)}catch(r){t=r}return e.isSequence(t)&&t.pCatch(function $$pcatch(e){return e}),t}function takeAsync(n,t){var r=e(take(n));return t&&"function"==typeof t?void r.val(t):r}function takem(n){var t;if(n.closed)return e.csp.CLOSED;if(n.put_queue=filterResolved(n.put_queue),n.take_queue=filterResolved(n.take_queue),n.messages.length>0){if(t=n.messages.shift(),unblock(n.put_queue.shift()),t instanceof Error)throw t;return t}return n.take_queue.push(e.iterable().then(function $$then(){if(n.closed)return e.csp.CLOSED;var t=n.messages.shift();if(t instanceof Error)throw t;return t})),t=e(n.take_queue[n.take_queue.length-1]),n.put_queue.length>0&&(unblock(n.put_queue.shift()),unblock(n.take_queue.shift())),t}function takemAsync(n,t){var r=e(takem(n));return t&&"function"==typeof t?void r.pThen(t,t):r.val(function $$val(e){if(e instanceof Error)throw e;return e})}function alts(n){var t,r,u,l,c,s,o=!1;if(!Array.isArray(n)||0==n.length)throw Error("Invalid usage");if(t=[],r=[],u=[],n.forEach(function $$each(e){var n=Array.isArray(e)?e[0]:e;n.put_queue=filterResolved(n.put_queue),n.take_queue=filterResolved(n.take_queue),n.closed?t.push(n):r.push(e)}),0==r.length)return{value:e.csp.CLOSED,channel:t};for(l=0;l<r.length;l++)if(Array.isArray(r[l])){if(r[l][0].messages.length<r[l][0].buffer_size)return{value:put(r[l][0],r[l][1]),channel:r[l][0]}}else if(r[l].messages.length>0)return{value:take(r[l]),channel:r[l]};c=e.iterable();var s=e(c);for(l=0;l<r.length;l++)!function iteration(n,t,r){Array.isArray(n)?(t=n[0],r=n[1],u.push(e.iterable().then(function $$then(){o=!0,u=u.filter(function $$filter(e){return!(e.resolved=!0)}),t.closed?c.next({value:!1,channel:t}):(t.messages.push(r),c.next({value:!0,channel:t}))})),t.put_queue.push(u[u.length-1]),t.take_queue.length>0&&a(function handleUnblocking(){o||(unblock(t.put_queue.shift()),unblock(t.take_queue.shift()))},0)):(t=n,u.push(e.iterable().then(function $$then(){o=!0,u=u.filter(function $$filter(e){return!(e.resolved=!0)}),t.closed?c.next({value:e.csp.CLOSED,channel:t}):c.next({value:t.messages.shift(),channel:t})})),t.take_queue.push(u[u.length-1]),t.put_queue.length>0&&a(function handleUnblocking(){o||(unblock(t.put_queue.shift()),unblock(t.take_queue.shift()))}))}(r[l]);return s}function altsAsync(n,t){var r=e(alts(n));return t&&"function"==typeof t?void r.pThen(t,t):r}function timeout(e){var n=channel();return setTimeout(n.close,e),n}function go(n,r){return arguments.length>1?r&&Array.isArray(r)||(r=[r]):r=[],regeneratorRuntime.mark(function $$go(a){var u,l,c,s,o,i,f;return regeneratorRuntime.wrap(function $$go$(p){for(;;)switch(p.prev=p.next){case 0:u=function unblock(){a.unblock_count++,a.block&&!a.block.marked&&(a.block.marked=!0,a.block.next())},i=!1,a.unblock_count=a.unblock_count||0,a.go_count=(a.go_count||0)+1,1===a.go_count&&(a.channel=channel(),a.channel.messages=a.messages,a.channel.go=function $$go(){a.add(go.apply(t,arguments)),u()},a.channel.messages.length>0&&(a.channel.put_queue=a.channel.messages.map(function $$map(){return e.iterable().then(function $$then(){return u(a.channel.take_queue.shift()),!a.channel.closed})}))),f=n.apply(t,[a.channel].concat(r)),function iterate(){function next(){i?u():iterate()}if(!l){try{s?(l=f["throw"](s),s=null):l=f.next(c)}catch(n){return i=!0,s=n,c=null,void u()}i=l.done,l=l.value,o=typeof l,i&&u(),isPromise(l)&&(l=e().promise(l)),e.isSequence(l)?l.val(function $$val(){l=null,c=arguments.length>1?e.messages.apply(t,arguments):arguments[0],next()}).or(function $$or(){l=null,c=arguments.length>1?e.messages.apply(t,arguments):arguments[0],c instanceof Error&&(s=c,c=null),next()}):(c=l,l=null,next())}}();case 7:if(i){p.next=17;break}return p.next=10,a;case 10:if(i||a.block||0!==a.unblock_count){p.next=14;break}return p.next=13,a.block=e.iterable();case 13:a.block=!1;case 14:a.unblock_count>0&&a.unblock_count--,p.next=7;break;case 17:if(a.go_count--,0===a.go_count&&(u(),c=e.messages.apply(t,a.messages),a.channel&&!a.channel.closed&&(a.channel.closed=!0,a.channel.put_queue.length=a.channel.take_queue.length=0,a.channel.close=a.channel.go=a.channel.messages=null),a.channel=null),!s){p.next=23;break}throw s;case 23:if(0!==a.go_count){p.next=27;break}return p.abrupt("return",c);case 27:return p.abrupt("return",a);case 28:case"end":return p.stop()}},$$go,this)})}e.csp={chan:channel,put:put,putAsync:putAsync,take:take,takeAsync:takeAsync,takem:takem,takemAsync:takemAsync,alts:alts,altsAsync:altsAsync,timeout:timeout,go:go,CLOSED:{}}}(),function IIFE(){var u;e.iterable=function $$iterable(){function throwSequenceErrors(){throw 1===$.length?$[0]:$}function notifyErrors(){var e;if(c=null,s)for(0!==p.length||o||(o=!0,throwSequenceErrors());p.length>0;){o=!0,e=p.shift();try{e.apply(t,$)}catch(n){checkBranding(n)?$=$.concat(n):$.push(n),0===p.length&&throwSequenceErrors()}}}function val(){if(s||i||0===arguments.length)return l;var e=n.call(arguments).map(function mapper(e){return"function"!=typeof e?function $$val(){return e}:e});return f.push.apply(f,e),l}function or(){return i||0===arguments.length?l:(p.push.apply(p,arguments),c||(c=a(notifyErrors)),l)}function pipe(){return i||0===arguments.length?l:(n.call(arguments).forEach(function $$each(e){val(e).or(e.fail)}),l)}function next(){if(s||i||0===f.length)return f.length>0&&$throw$("Sequence cannot be iterated"),{done:!0};try{return{value:f.shift().apply(t,arguments)}}catch(n){return e.isMessageWrapper(n)?$throw$.apply(t,n):$throw$(n),{}}}function $throw$(){return s||i?l:($.push.apply($,arguments),s=!0,c||(c=a(notifyErrors)),l)}function $return$(e){return(s||i)&&(e=void 0),abort(),{done:!0,value:e}}function abort(){s||i||(i=!0,clearTimeout(c),c=null,f.length=p.length=$.length=0)}function duplicate(){var n;return u={val_queue:f.slice(),or_queue:p.slice()},n=e.iterable(),u=null,n}function defer(){return p.push(function $$ignored(){}),l}function brandIt(e){return Object.defineProperty(e,r,{enumerable:!1,value:!0}),e}var l,c,s=!1,o=!1,i=!1,f=[],p=[],$=[];return l=brandIt({val:val,then:val,or:or,pipe:pipe,next:next,"throw":$throw$,"return":$return$,abort:abort,duplicate:duplicate,defer:defer}),l["function"==typeof Symbol&&Symbol.iterator||"@@iterator"]=function $$iter(){return l},u&&(f=u.val_queue.slice(0),p=u.or_queue.slice(0)),l.val.apply(t,arguments),l}}(),e.extend("last",function $$extend(r,a){return function $$last(){if(a("seq_error")||a("seq_aborted")||0===arguments.length)return r;var u=n.call(arguments);return r.then(function $$then(r){function reset(){s=!0,c.length=0,a=null}function complete(n){null!=a?n(a.length>1?e.messages.apply(t,a):a[0]):(c.length=u.length,n.fail.apply(t,c)),reset()}function success(e,n,t){s||(l++,a=t,l===u.length&&(s=!0,complete(e)))}function failure(n,r,a){s||r in c||(l++,c[r]=a.length>1?e.messages.apply(t,a):a[0]),s||l!==u.length||(s=!0,complete(n))}var a,l=0,c=[],s=!1,o=e.apply(t,n.call(arguments,1));wrapGate(o,u,success,failure,reset),o.pipe(r)}),r}}),e.extend("map",function $$extend(r,a){return function $$map(u,l){return a("seq_error")||a("seq_aborted")?r:(r.seq(function $$seq(){var r,a=n.call(arguments),c=u,s=l;return s||(s=a.shift()),c||(c=a.shift()),"function"==typeof c&&Array.isArray(s)&&(r=c,c=s,s=r),e.apply(t,a).gate.apply(t,c.map(function $$map(e){return function $$segment(){s.apply(t,[e].concat(n.call(arguments)))}}))}).val(function $$val(){return n.call(arguments)}),r)}}),e.extend("none",function $$extend(r,a){return function $$none(){if(a("seq_error")||a("seq_aborted")||0===arguments.length)return r;var u=n.call(arguments);return r.then(function $$then(r){function reset(){c=!0,l.length=0,o.length=0}function complete(e){o.length>0?(o.length=u.length,e.fail.apply(t,o)):(l.length=u.length,e.apply(t,l)),reset()}function success(n,r,l){c||(a++,o[r]=l.length>1?e.messages.apply(t,l):l[0],a===u.length&&(c=!0,complete(n)))}function failure(n,r,s){c||r in l||(a++,l[r]=s.length>1?e.messages.apply(t,s):s[0]),c||a!==u.length||(c=!0,complete(n))}var a=0,l=[],c=!1,s=e.apply(t,n.call(arguments,1)),o=[];wrapGate(s,u,success,failure,reset),s.pipe(r)}),r}}),e.extend("pThen",function $$extend(r,u){return function $$pthen(l,c){if(u("seq_aborted"))return r;var s=!1,o=!1;return"function"==typeof l&&r.then(function $$then(r){if(s)r.apply(t,n.call(arguments,1));else{var a,u=e.messages.apply(t,arguments);u.shift(),1===u.length&&(u=u[0]),o=!0;try{a=l(u)}catch(c){return e.isMessageWrapper(c)||(c=[c]),void r.fail.apply(t,c)}e.isSequence(a)?a.pipe(r):e.isMessageWrapper(a)?r.apply(t,a):isPromise(a)?a.then(r,r.fail):r(a)}}),"function"==typeof c&&r.or(function $$or(){if(!o){var l,i,f=e.messages.apply(t,arguments),p=n.call(u("or_queue"));1===f.length&&(f=f[0]),s=!0,l=c(f),i=u("sequence_messages"),i.length=0,"undefined"!=typeof l&&(e.isMessageWrapper(l)||(l=[l]),i.push.apply(i,l)),u("sequence_errors").length=0,u("seq_error",!1),u("then_ready",!0),u("or_queue").length=0,r.val(function $$val(){return e.messages.apply(t,arguments)}),p.length>0&&a(function $$schedule(){r.or.apply(t,p)})}}),r}}),e.extend("pCatch",function $$extend(e,n){return function $$pcatch(t){return n("seq_aborted")?e:(e.pThen(void 0,t),e)}}),e.extend("race",function $$extend(r,a){return function $$race(){if(a("seq_error")||a("seq_aborted")||0===arguments.length)return r;var l=n.call(arguments).map(function $$map(n){var t;return e.isSequence(n)?(t={seq:n},u(t),function $$fn(e){t.seq.pipe(e)}):n});return r.then(function $$then(e){var r=n.call(arguments);l.forEach(function $$each(e){e.apply(t,r)})}),r}}),function IIFE(){var r={};e.react=function $$react(a){function next(){if(!c){if(u){var n=u.duplicate();return n.unpause.apply(t,arguments),n}return e(function $$asq(){throw"Disabled Sequence"})}}function registerTeardown(e){u&&"function"==typeof e&&l.push(e)}var u=e().duplicate(),l=[],c=!1;return u.stop=function $$stop(){u&&(u=null,l.forEach(Function.call,Function.call),l.length=0)},u.pause=function $$pause(){!c&&u&&(c=!0,l.forEach(Function.call,Function.call),l.length=0)},u.resume=function $$resume(){c&&u&&(c=!1,a.call(u,next,registerTeardown))},u.push=next,next.onStream=function $$onStream(){n.call(arguments).forEach(function $$each(e){e.on("data",next),e.on("error",next)})},next.unStream=function $$unStream(){n.call(arguments).forEach(function $$each(e){e.removeListener("data",next),e.removeListener("error",next)})},Object.keys(r).forEach(function $$each(e){u[e]=u[e]||r[e](u)}),["pipe","fork","errfcb","pThen","pCatch","toPromise"].forEach(function $$each(e){delete u[e]}),e.__schedule(function $$schedule(){a.call(u,next,registerTeardown)}),u},e.react.extend=function $$extend(n,t){return r[n]=t,e.react}}(),function IIFE(){function tapSequences(){function tapSequence(a){function trigger(){var e=n.call(arguments);u.seq=r(function $$react(n){n.apply(t,e)})}if(e.isSequence(a)){var u={seq:a};return a.val(function $$val(){return trigger.apply(t,arguments),e.messages.apply(t,arguments)}),u.seq=r(function $$react(e){trigger=e}),u}}return n.call(arguments).map(tapSequence).filter(Boolean)}function makeReactOperator(n,a){return function $$react$operator(){function reactor(r,c){function processSequence(c){function trigger(){var c=e.messages.apply(t,arguments);if(l&&l.length>0){u[s]=(n?u[s]:[]).concat(c.length>0?c.length>1?[c]:c[0]:void 0);var o=u.reduce(function reducer(e,n,t){return n.length>0&&e.push(n[0]),e},[]);o.length==u.length&&(1==o.length&&(o=o[0]),r.apply(t,o),a||u.forEach(function $$each(e){e.shift()}))}return c}var s=u.length;u.push([]),c.seq.val(trigger)}l.forEach(processSequence),c(function $$teardown(){l=u=null})}var u=[],l=tapSequences.apply(null,arguments);if(0!=l.length)return r(reactor)}}function makeDistinctFilterer(n){function filterer(){function isDuplicate(e){return e.length==a.length&&e.every(function $$every(e,n){return e===a[n]})}var a=e.messages.apply(t,arguments);if(a.length>0){if(r.some(isDuplicate))return!1;n?r.push(a):r[0]=a}return!0}var r=[];return filterer}var r=e.react;r.of=function $$react$of(){function reactor(e){a||(a=!0,u.length>0&&u.shift().val(function val(){e.apply(t,arguments),u.length>0&&u.shift().val(val)}))}var a,u=n.call(arguments).map(function wrapper(n){return e.isSequence(n)||(n=e(n)),n});return r(reactor)},r.all=r.zip=makeReactOperator(!0),r.allLatest=makeReactOperator(),r.latest=r.combineLatest=makeReactOperator(!1,!0),r.any=r.merge=function $$react$any(){function reactor(r,a){function processSequence(a){function trigger(){var a=e.messages.apply(t,arguments);return n&&n.length>0&&r.apply(t,a),a}a.seq.val(trigger)}n.forEach(processSequence),a(function $$teardown(){n=null})}var n=tapSequences.apply(null,arguments);if(0!=n.length)return r(reactor)},r.distinct=function $$react$distinct(e){return r.filter(e,makeDistinctFilterer(!0))},r.distinctConsecutive=r.distinctUntilChanged=function $$react$distinct$consecutive(e){return r.filter(e,makeDistinctFilterer(!1))},r.filter=function $$react$filter(n,a){function reactor(n,r){function trigger(){var r=e.messages.apply(t,arguments);return a&&a.apply(t,r)&&n.apply(t,r),r}u.seq.val(trigger),r(function $$teardown(){u=a=null})}var u=tapSequences(n)[0];if(u)return r(reactor)},r.fromObservable=function $$react$from$observable(e){function reactor(t,r){n.forEach(t),n.length=0,n.complete||(notify=t),r(function $$teardown(){e.dispose()})}function notify(e){n.push(e)}var n=[];return e.subscribe(function $$on$next(e){notify(e)},function $$on$error(){},function $$on$complete(){n.complete=!0,e.dispose()}),r(reactor)},e.extend("toObservable",function $$extend(n,r){return function $$to$observable(){function init(r){function define(a){function listen(){var n=e.messages.apply(t,arguments);return r[a[1]].apply(r,1==n.length?[n[0]]:n),n}n[a[0]](listen)}[["val","onNext"],["or","onError"]].forEach(define)}return Rx.Observable.create(init)}})}(),e.extend("runner",function $$extend(r,u){return function $$runner(){if(u("seq_error")||u("seq_aborted")||0===arguments.length)return r;var l=n.call(arguments);return r.then(function $$then(r){function wrap(n){return"function"==typeof n?(n=n.call(t,f),isPromise(n)&&(n=e.iterable(n))):n=e.isSequence(n)&&"next"in n?n.duplicate():e.iterable(n),e.isSequence(n)&&n.or(function $$or(){r.fail.apply(t,arguments)}),n}function addWrapped(){i.push.apply(i,n.call(arguments).map(wrap))}function iterateOrQuit(n,u){i.length>0?u?n():a(n):("undefined"!=typeof p?e.isMessageWrapper(p)||(p=[p]):p=[],r.apply(t,p))}var c,s,o,i=l,f={messages:n.call(arguments,1),add:addWrapped},p=f;i=i.map(wrap),function iterate(n){s=n?"throw":"next",c=i.shift();try{o=e.isMessageWrapper(p)&&e.isSequence(c)?c[s].apply(c,p):c[s](p)}catch(a){return r.fail(a)}if(!u("seq_aborted"))if(o.value===f)o.done||i.push(c),p=f,iterateOrQuit(iterate,!1);else{if(!e.isSequence(o.value))if(isPromise(o.value))o.value=e().promise(o.value);else if("function"==typeof o.value){var l=o.value;o.value=e(function $$ASQ(e){l(e.errfcb)})}else e.isMessageWrapper(o.value)?o.value=e.apply(t,o.value.length>0?o.value:e.messages(void 0)):"undefined"!=typeof o.value?o.value=e(o.value):o.value=e();o.value.val(function $$val(){u("seq_aborted")||(arguments.length>0&&(p=arguments.length>1?e.messages.apply(t,arguments):arguments[0]),o.done||(p===f?i.push(c):i.unshift(c)),iterateOrQuit(iterate,!0))}).or(function $$or(){u("seq_aborted")||(o.done?r.fail.apply(t,arguments):(i.unshift(c),p=arguments.length>1?e.messages.apply(t,arguments):arguments[0],iterate(!0)))})}}()}),r}}),e.extend("toPromise",function $$extend(r,a){return function $$to$promise(){return new Promise(function $$executor(a,u){r.val(function $$val(){var r=n.call(arguments);return a.call(t,r.length>1?r:r[0]),e.messages.apply(t,r)}).or(function $$or(){var e=n.call(arguments);u.call(t,e.length>1?e:e[0])})})}}),e.extend("try",function $$extend(r,a){return function $$try(){if(a("seq_error")||a("seq_aborted")||0===arguments.length)return r;var u=n.call(arguments).map(function $$map(r){return function $$then(a){var u=n.call(arguments),l=e.apply(t,u.slice(1));l.then(function $$inner$then(){r.apply(t,arguments)}).val(function $$val(){a.apply(t,arguments)}).or(function $$inner$or(){var n=e.messages.apply(t,arguments);a({"catch":n.length>1?n:n[0]})})}});return r.then.apply(t,u),r}}),e.extend("until",function $$extend(r,a){return function $$until(){if(a("seq_error")||a("seq_aborted")||0===arguments.length)return r;var u=n.call(arguments).map(function $$map(r){return function $$then(a){var u=n.call(arguments),l=e.apply(t,u.slice(1));l.then(function $$inner$then(){var e=n.call(arguments);e[0]["break"]=function $$break(){a.fail.apply(t,arguments),l.abort()},r.apply(t,e)}).val(function $$val(){a.apply(t,arguments)}).or(function $$inner$or(){$$then.apply(t,u)})}});return r.then.apply(t,u),r}}),e.extend("waterfall",function $$extend(r,a){return function $$waterfall(){if(a("seq_error")||a("seq_aborted")||0===arguments.length)return r;var u=n.call(arguments);return r.then(function $$then(r){var a=e.messages(),l=e.apply(t,n.call(arguments,1));u.forEach(function $$each(n){l.then(n).val(function $$val(){var n=e.messages.apply(t,arguments);return a.push(n.length>1?n:n[0]),a})}),l.pipe(r)}),r}}),e.wrap=function $$wrap(r,a){function checkThis(e,n){return!e||"undefined"!=typeof window&&e===window||"undefined"!=typeof global&&e===global?n:e}function paramSpread(e){return regeneratorRuntime.mark(function paramSpread(n){return regeneratorRuntime.wrap(function paramSpread$(t){for(;;)switch(t.prev=t.next){case 0:return t.delegateYield(e.apply(this,n.messages),"t0",1);case 1:case"end":return t.stop()}},paramSpread,this)})}var u,l,c,s,o;if(a=a&&"object"==typeof a?a:{},a.errfcb&&a.splitcb||a.errfcb&&a.simplecb||a.splitcb&&a.simplecb||"errfcb"in a&&!a.errfcb&&!a.splitcb&&!a.simplecb||a.params_first&&a.params_last||a.spread&&!a.gen)throw Error("Invalid options");return s=a["this"]&&"object"==typeof a["this"]?a["this"]:t,u=a.errfcb||!(a.splitcb||a.simplecb),l=!!a.params_first||!a.params_last&&!("params_first"in a||a.params_first)||"params_last"in a&&!a.params_first&&!a.params_last,o=!(!a.spread&&"spread"in a),c=l?"push":"unshift",a.gen?(o&&(r=paramSpread(r)),function $$wrapped$gen(){return e(e.messages.apply(t,arguments)).runner(r)}):u?function $$wrapped$errfcb(){var t=n.call(arguments),a=checkThis(this,s);return e(function $$asq(e){t[c](e.errfcb),r.apply(a,t)})}:a.splitcb?function $$wrapped$splitcb(){var t=n.call(arguments),a=checkThis(this,s);return e(function $$asq(e){t[c](e,e.fail),r.apply(a,t)})}:a.simplecb?function $$wrapped$simplecb(){var t=n.call(arguments),a=checkThis(this,s);return e(function $$asq(e){t[c](e),r.apply(a,t)})}:void 0},e});