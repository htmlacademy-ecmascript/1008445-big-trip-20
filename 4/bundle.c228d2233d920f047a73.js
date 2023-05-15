(()=>{var e={484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",l="week",o="month",u="quarter",p="year",c="date",d="Invalid Date",v=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,m=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,f={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},_=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},h={s:_,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+_(i,2,"0")+":"+_(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(i,o),r=n-s<0,a=t.clone().add(i+(r?-1:1),o);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:o,y:p,w:l,d:a,D:c,h:r,m:s,s:i,ms:n,Q:u}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},y="en",g={};g[y]=f;var b=function(e){return e instanceof D},$=function e(t,n,i){var s;if(!t)return y;if("string"==typeof t){var r=t.toLowerCase();g[r]&&(s=r),n&&(g[r]=n,s=r);var a=t.split("-");if(!s&&a.length>1)return e(a[0])}else{var l=t.name;g[l]=t,s=l}return!i&&s&&(y=s),s||!i&&y},M=function(e,t){if(b(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new D(n)},T=h;T.l=$,T.i=b,T.w=function(e,t){return M(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var D=function(){function f(e){this.$L=$(e.locale,null,!0),this.parse(e)}var _=f.prototype;return _.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(T.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(v);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},_.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},_.$utils=function(){return T},_.isValid=function(){return!(this.$d.toString()===d)},_.isSame=function(e,t){var n=M(e);return this.startOf(t)<=n&&n<=this.endOf(t)},_.isAfter=function(e,t){return M(e)<this.startOf(t)},_.isBefore=function(e,t){return this.endOf(t)<M(e)},_.$g=function(e,t,n){return T.u(e)?this[t]:this.set(n,e)},_.unix=function(){return Math.floor(this.valueOf()/1e3)},_.valueOf=function(){return this.$d.getTime()},_.startOf=function(e,t){var n=this,u=!!T.u(t)||t,d=T.p(e),v=function(e,t){var i=T.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return u?i:i.endOf(a)},m=function(e,t){return T.w(n.toDate()[e].apply(n.toDate("s"),(u?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},f=this.$W,_=this.$M,h=this.$D,y="set"+(this.$u?"UTC":"");switch(d){case p:return u?v(1,0):v(31,11);case o:return u?v(1,_):v(0,_+1);case l:var g=this.$locale().weekStart||0,b=(f<g?f+7:f)-g;return v(u?h-b:h+(6-b),_);case a:case c:return m(y+"Hours",0);case r:return m(y+"Minutes",1);case s:return m(y+"Seconds",2);case i:return m(y+"Milliseconds",3);default:return this.clone()}},_.endOf=function(e){return this.startOf(e,!1)},_.$set=function(e,t){var l,u=T.p(e),d="set"+(this.$u?"UTC":""),v=(l={},l[a]=d+"Date",l[c]=d+"Date",l[o]=d+"Month",l[p]=d+"FullYear",l[r]=d+"Hours",l[s]=d+"Minutes",l[i]=d+"Seconds",l[n]=d+"Milliseconds",l)[u],m=u===a?this.$D+(t-this.$W):t;if(u===o||u===p){var f=this.clone().set(c,1);f.$d[v](m),f.init(),this.$d=f.set(c,Math.min(this.$D,f.daysInMonth())).$d}else v&&this.$d[v](m);return this.init(),this},_.set=function(e,t){return this.clone().$set(e,t)},_.get=function(e){return this[T.p(e)]()},_.add=function(n,u){var c,d=this;n=Number(n);var v=T.p(u),m=function(e){var t=M(d);return T.w(t.date(t.date()+Math.round(e*n)),d)};if(v===o)return this.set(o,this.$M+n);if(v===p)return this.set(p,this.$y+n);if(v===a)return m(1);if(v===l)return m(7);var f=(c={},c[s]=e,c[r]=t,c[i]=1e3,c)[v]||1,_=this.$d.getTime()+n*f;return T.w(_,this)},_.subtract=function(e,t){return this.add(-1*e,t)},_.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||d;var i=e||"YYYY-MM-DDTHH:mm:ssZ",s=T.z(this),r=this.$H,a=this.$m,l=this.$M,o=n.weekdays,u=n.months,p=function(e,n,s,r){return e&&(e[n]||e(t,i))||s[n].slice(0,r)},c=function(e){return T.s(r%12||12,e,"0")},v=n.meridiem||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i},f={YY:String(this.$y).slice(-2),YYYY:this.$y,M:l+1,MM:T.s(l+1,2,"0"),MMM:p(n.monthsShort,l,u,3),MMMM:p(u,l),D:this.$D,DD:T.s(this.$D,2,"0"),d:String(this.$W),dd:p(n.weekdaysMin,this.$W,o,2),ddd:p(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(r),HH:T.s(r,2,"0"),h:c(1),hh:c(2),a:v(r,a,!0),A:v(r,a,!1),m:String(a),mm:T.s(a,2,"0"),s:String(this.$s),ss:T.s(this.$s,2,"0"),SSS:T.s(this.$ms,3,"0"),Z:s};return i.replace(m,(function(e,t){return t||f[e]||s.replace(":","")}))},_.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},_.diff=function(n,c,d){var v,m=T.p(c),f=M(n),_=(f.utcOffset()-this.utcOffset())*e,h=this-f,y=T.m(this,f);return y=(v={},v[p]=y/12,v[o]=y,v[u]=y/3,v[l]=(h-_)/6048e5,v[a]=(h-_)/864e5,v[r]=h/t,v[s]=h/e,v[i]=h/1e3,v)[m]||h,d?y:T.a(y)},_.daysInMonth=function(){return this.endOf(o).$D},_.$locale=function(){return g[this.$L]},_.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=$(e,t,!0);return i&&(n.$L=i),n},_.clone=function(){return T.w(this.$d,this)},_.toDate=function(){return new Date(this.valueOf())},_.toJSON=function(){return this.isValid()?this.toISOString():null},_.toISOString=function(){return this.$d.toISOString()},_.toString=function(){return this.$d.toUTCString()},f}(),E=D.prototype;return M.prototype=E,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",o],["$y",p],["$D",c]].forEach((function(e){E[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),M.extend=function(e,t){return e.$i||(e(t,D,M),e.$i=!0),M},M.locale=$,M.isDayjs=b,M.unix=function(e){return M(1e3*e)},M.en=g[y],M.Ls=g,M.p={},M}()}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var r=t[i]={exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}(()=>{"use strict";const e={BEFOREBEGIN:"beforebegin",AFTERBEGIN:"afterbegin",BEFOREEND:"beforeend",AFTEREND:"afterend"};function t(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function i(t,n){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e.BEFOREEND;n.insertAdjacentElement(i,t.getElement())}var s=n(484);const r=e=>e[Math.floor(Math.random()*e.length)],a=e=>e?s(e).format("HH:mm"):"",l=e=>e?s(e).format("DD/MM/YY HH:mm"):"",o=e=>e.at(0).toUpperCase()+e.slice(1),u=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],p={type:u[5],destanation:{name:"Las Vegas",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.",pictures:[{src:"https://loremflickr.com/248/152?random=4",description:"Lorem ipsum dolor sit amet,"},{src:"https://loremflickr.com/248/152?random=5",description:"Lorem ipsum dolor sit amet,"}]},dateFrom:"2023-03-19T19:00:00",dateTo:"2023-03-19T20:20:00",isFavorite:!1,price:100,offers:[{title:"Add luggage",price:30},{title:"Switch to comfort class",price:100},{title:"Add meal",price:15}]};class c{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p;this.point=e}getTemplate(){return function(e){let{type:t,destanation:n,dateFrom:i,dateTo:s,price:r,offers:a}=e;const u=o(t),p=`<div class="event__photos-container">\n    <div class="event__photos-tape">\n      ${(e=>{let{pictures:t}=e;return t.map((e=>(e=>{let{src:t}=e;return`<img class="event__photo" src="${t}" alt="Event photo">`})(e))).join("")})(n)}\n    </div>\n  </div>`,c=`<div class="event__available-offers">\n    ${(e=>e.map((e=>(e=>{let{title:t,price:n}=e;return`<div class="event__offer-selector">\n    <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">\n    <label class="event__offer-label" for="event-offer-seats-1">\n      <span class="event__offer-title">${t}</span>\n      &plus;&euro;&nbsp;\n      <span class="event__offer-price">${n}</span>\n    </label>\n  </div>`})(e))).join(""))(a)}\n    </div>`;return`<li class="trip-events__item">\n    <form class="event event--edit" action="#" method="post">\n      <header class="event__header">\n        <div class="event__type-wrapper">\n          <label class="event__type  event__type-btn" for="event-type-toggle-1">\n            <span class="visually-hidden">Choose event type</span>\n            <img class="event__type-icon" width="17" height="17" src="img/icons/${t}.png" alt="Event type icon">\n          </label>\n          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n          <div class="event__type-list">\n            <fieldset class="event__type-group">\n              <legend class="visually-hidden">Event type</legend>\n\n              <div class="event__type-item">\n                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">\n                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">\n                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">\n                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">\n                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">\n                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>\n                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">\n                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">\n                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">\n                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>\n              </div>\n            </fieldset>\n          </div>\n        </div>\n\n        <div class="event__field-group  event__field-group--destination">\n          <label class="event__label  event__type-output" for="event-destination-1">\n            ${u}\n          </label>\n          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${n.name}" list="destination-list-1">\n          <datalist id="destination-list-1">\n            <option value="Amsterdam"></option>\n            <option value="Geneva"></option>\n            <option value="Chamonix"></option>\n          </datalist>\n        </div>\n\n        <div class="event__field-group  event__field-group--time">\n          <label class="visually-hidden" for="event-start-time-1">From</label>\n          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${l(i)}">\n          &mdash;\n          <label class="visually-hidden" for="event-end-time-1">To</label>\n          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${l(s)}">\n        </div>\n\n        <div class="event__field-group  event__field-group--price">\n          <label class="event__label" for="event-price-1">\n            <span class="visually-hidden">Price</span>\n            &euro;\n          </label>\n          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${r}">\n        </div>\n\n        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n        <button class="event__reset-btn" type="reset">Delete</button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </header>\n      <section class="event__details">\n        <section class="event__section  event__section--offers">\n          <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n          ${c}\n        </section>\n\n        <section class="event__section  event__section--destination">\n          <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n          <p class="event__destination-description">${n.description}</p>\n\n          ${p}\n        </section>\n      </section>\n    </form>\n    </li>`}(this.point)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class d{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class v{constructor(e){let{point:t}=e;this.point=t}getTemplate(){return function(e){let{type:t,destanation:n,dateFrom:i,dateTo:r,price:l,offers:u,isFavorite:p}=e;const c=o(t),d=(e=>e?s(e).format("MMM D"):"")(i),v=a(i),m=a(r),f=s(r).diff(s(i),"minute"),_=parseInt(f/60,10),h=`${_?`${_}H`:""} ${s().minute(f).$m}M`,y=p?"event__favorite-btn--active":"",g=u?function(e){return`<ul class="event__selected-offers">\n    ${(e=>e.map((e=>function(e){let{title:t,price:n}=e;return`<li class="event__offer">\n    <span class="event__offer-title">${t}</span>\n    &plus;&euro;&nbsp;\n    <span class="event__offer-price">${n}</span>\n    </li>`}(e))).join(""))(e)}\n    </ul>`}(u):"";return`<li class="trip-events__item">\n  <div class="event">\n    <time class="event__date" datetime="2019-03-18">${d}</time>\n    <div class="event__type">\n      <img class="event__type-icon" width="42" height="42" src='img/icons/${t}.png' alt="Event type icon">\n    </div>\n    <h3 class="event__title">${c} ${n.name}</h3>\n    <div class="event__schedule">\n      <p class="event__time">\n        <time class="event__start-time" datetime='${i}'>${v}</time>\n        &mdash;\n        <time class="event__end-time" datetime='${r}'>${m}</time>\n      </p>\n      <p class="event__duration">${h}</p>\n    </div>\n    <p class="event__price">\n      &euro;&nbsp;<span class="event__price-value">${l}</span>\n    </p>\n    <h4 class="visually-hidden">Offers:</h4>\n    ${g}\n    <button class="event__favorite-btn ${y}" type="button">\n      <span class="visually-hidden">Add to favorite</span>\n      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n      </svg>\n    </button>\n    <button class="event__rollup-btn" type="button">\n      <span class="visually-hidden">Open event</span>\n    </button>\n  </div>\n</li>`}(this.point)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class m{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n    <div class="trip-sort__item  trip-sort__item--day">\n      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n      <label class="trip-sort__btn" for="sort-day">Day</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--event">\n      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n      <label class="trip-sort__btn" for="sort-event">Event</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--time">\n      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n      <label class="trip-sort__btn" for="sort-time">Time</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--price">\n      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n      <label class="trip-sort__btn" for="sort-price">Price</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--offer">\n      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n      <label class="trip-sort__btn" for="sort-offer">Offers</label>\n    </div>\n  </form>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}const f=[{type:r(u),destanation:{name:"Amsterdam",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.",pictures:[{src:"https://loremflickr.com/248/152?random=1",description:"Lorem ipsum dolor sit amet,"}]},dateFrom:"2023-03-18T10:30:00",dateTo:"2023-03-18T11:00:00",isFavorite:!0,price:20,offers:[{title:"Order Uber",price:20}]},{type:r(u),destanation:{name:"Chamonix",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.",pictures:[{src:"https://loremflickr.com/248/152?random=2",description:"Lorem ipsum dolor sit amet,"}]},dateFrom:"2023-03-18T12:25:00",dateTo:"2023-03-18T13:35:00",isFavorite:!1,price:160,offers:[{title:"Add luggage",price:50},{title:"Add meal",price:15}]},{type:r(u),destanation:{name:"Chamonix",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.",pictures:[{src:"https://loremflickr.com/248/152?random=3",description:"Lorem ipsum dolor sit amet,"}]},dateFrom:"2023-03-18T14:30:00",dateTo:"2023-03-18T16:05:00",isFavorite:!1,price:160,offers:[{title:"Rent a car",price:200}]},{type:r(u),destanation:{name:"Chamonix",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.",pictures:[{src:"https://loremflickr.com/248/152?random=3",description:"Lorem ipsum dolor sit amet,"}]},dateFrom:"2023-03-18T16:20:00",dateTo:"2023-03-18T17:00:00",isFavorite:!0,price:600,offers:[{title:"Add breakfast",price:50}]},{type:r(u),destanation:{name:"Chamonix",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.",pictures:[{src:"https://loremflickr.com/248/152?random=3",description:"Lorem ipsum dolor sit amet,"}]},dateFrom:"2023-03-19T13:00:00",dateTo:"2023-03-19T14:20:00",isFavorite:!1,price:50,offers:[{title:"Book tickets",price:40},{title:"Lunch in city",price:30}]}],_=()=>r(f),h=document.querySelector(".page-main"),y=document.querySelector(".page-header").querySelector(".trip-main"),g=y.querySelector(".trip-controls__filters"),b=h.querySelector(".trip-events"),$=new class{points=Array.from({length:5},_);getPoints(){return this.points}},M=new class{pointListComponent=new d;sortComponent=new m;constructor(e){let{container:t,pointModel:n}=e;this.container=t,this.pointModel=n}init(){i(this.sortComponent,this.container),i(this.pointListComponent,this.container),this.points=[...this.pointModel.getPoints()],i(new c(this.points[0]),this.pointListComponent.getElement());for(let e=1;e<this.points.length;e++)i(new v({point:this.points[e]}),this.pointListComponent.getElement())}}({container:b,pointModel:$});i(new class{getTemplate(){return'<section class="trip-main__trip-info  trip-info">\n  <div class="trip-info__main">\n    <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n    <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>\n  </div>\n\n  <p class="trip-info__cost">\n    Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n  </p>\n</section>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}},y,e.AFTERBEGIN),i(new class{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n      <div class="trip-filters__filter">\n        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n        <label class="trip-filters__filter-label" for="filter-future">Future</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n        <label class="trip-filters__filter-label" for="filter-present">Present</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n        <label class="trip-filters__filter-label" for="filter-past">Past</label>\n      </div>\n\n      <button class="visually-hidden" type="submit">Accept filter</button>\n    </form>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}},g,e.AFTERBEGIN),M.init()})()})();
//# sourceMappingURL=bundle.c228d2233d920f047a73.js.map