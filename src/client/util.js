let connected = false;
let disconnected = false;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.lineJoin = 'round';
ctx.imageSmoothingEnabled = false;

const ref = {
  gui: document.querySelector('.gui'),
  chatDiv: document.querySelector('.chatDiv'),
  chatInput: document.querySelector('.chat'),
  chatMessages: document.querySelector('.chat-div'),
  canvas: canvas,
  mobile: document.querySelector('.mobile'),
  defendButton: document.querySelector('.defendButton'),
  attackButton: document.querySelector('.attackButton'),
};

const difficultyFileNames = ['Peaceful','Moderate','Difficult','Hardcore','Exhausting','Agonizing','Terrorizing','Cataclysmic','Grass','Undefined'];
const difficultyImages = {};
for(let i = 0; i < difficultyFileNames.length; i++){
  const key = difficultyFileNames[i];
  difficultyImages[key] = new Image();
  difficultyImages[key].src = `../client/gfx/difficultyimages/${difficultyFileNames[i]}.png`;
}

const arrowImg = new Image();
arrowImg.src = '../client/gfx/arrow.png';

// // TODO: fix this! really janky on both chrome and firefox lmao
// window.toggleFullScreen = (elem=document.body) => {
//   // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
//   if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
//     if (elem.requestFullScreen) {
//       elem.requestFullScreen();
//     } else if (elem.mozRequestFullScreen) {
//       elem.mozRequestFullScreen();
//     } else if (elem.webkitRequestFullScreen) {
//       elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
//     } else if (elem.msRequestFullscreen) {
//       elem.msRequestFullscreen();
//     }
//   } else {
//     if (document.cancelFullScreen) {
//       document.cancelFullScreen();
//     } else if (document.mozCancelFullScreen) {
//       document.mozCancelFullScreen();
//     } else if (document.webkitCancelFullScreen) {
//       document.webkitCancelFullScreen();
//     } else if (document.msExitFullscreen) {
//       document.msExitFullscreen();
//     }
//   }
// }
// window._isFullScreen = false;
// Object.defineProperty(window, 'isFullScreen', {
//   set(value){
//     if(value !== window._isFullScreen){
//       window.toggleFullScreen();
//       window._isFullScreen = value;
//     }
//   },
//   get(){
//     return window._isFullScreen;
//   }
// })

// window.onresize = function (event) {
//   var maxHeight = window.screen.height,
//     maxWidth = window.screen.width,
//     curHeight = window.innerHeight,
//     curWidth = window.innerWidth;

//   if (maxHeight == curHeight) {
//     window._isFullScreen = true;
//   } else {
//     window._isFullScreen = false;
//   }
// }

window.structuredCloneWithoutKey = (o, keyNames=[]) => {
  if(typeof o === 'object'){
      if(Array.isArray(o) === true){
          // array
          const clone = [];
          for(let i = 0; i < o.length; i++){
              if(keyNames.includes(i) === true){
                  clone[i] = undefined;
                  continue;
              }
              clone[i] = window.structuredCloneWithoutKey(o[i], keyNames);
          }
          return clone;
      } else {
          // object
          const clone = {};
          for(let key in o){
              if(keyNames.includes(key) === true){
                  continue;
              }
              clone[key] = window.structuredCloneWithoutKey(o[key], keyNames);
          }
          return clone;
      }
  } else {
      // primitive
      return o;
  }
}

// fallback for performance.now on older browsers
window.performance = window.performance || {}; performance.now = (function() {return performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function() { return new Date().getTime();};})();

window.hashDistance = 250;

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.moveTo(x+r, y);
  this.arcTo(x+w, y,   x+w, y+h, r);
  this.arcTo(x+w, y+h, x,   y+h, r);
  this.arcTo(x,   y+h, x,   y,   r);
  this.arcTo(x,   y,   x+w, y,   r);
};

SAT.Circle.prototype['translate'] = function (x, y) {
  this.pos.x += x;
  this.pos.y += y;
}

SAT.Circle.prototype['rotate'] = function (angle) {
  this.pos.rotate(angle);
}

SAT.Circle.prototype['setAngle'] = function (angle) {
  this.pos.rotate(angle-this.angle);
  this.angle = angle;
}

SAT.Polygon.prototype['getBoundingBox'] = function () {
  var points = this['calcPoints'];
  var len = points.length;
  var xMin = points[0]['x'];
  var yMin = points[0]['y'];
  var xMax = points[0]['x'];
  var yMax = points[0]['y'];
  for (var i = 1; i < len; i++) {
    var point = points[i];
    if (point['x'] < xMin) {
      xMin = point['x'];
    }
    else if (point['x'] > xMax) {
      xMax = point['x'];
    }
    if (point['y'] < yMin) {
      yMin = point['y'];
    }
    else if (point['y'] > yMax) {
      yMax = point['y'];
    }
  }
  return new SAT.Box(this['pos'].clone().add(new SAT.Vector(xMin, yMin)), xMax - xMin, yMax - yMin);
};

SAT.Circle.prototype['getBoundingBox'] = function () {
  var r = this['r'];
  var corner = this['pos'].clone().add(this['offset']).sub(new SAT.Vector(r, r));
  return new SAT.Box(corner, r * 2, r * 2);
};

// CanvasRenderingContext2D.prototype.fill = function(a) {
//     return function(a,b) {
//         if(this.globalAlpha !== 1){
//             console.log(this.fillStyle, this.strokeStyle);
//         }
//         a.call(this,a,b);
//     };
// }(CanvasRenderingContext2D.prototype.fill);

// CanvasRenderingContext2D.prototype.roundRect = function(a) {
//     return function(x, y, w, h, r) {
//         // this.globalAlpha = 0.1;
//         a.call(this, x, y, w, h, r);
//     };
// }(CanvasRenderingContext2D.prototype.roundRect);

// window.portalGradient = ctx.createLinearGradient(0, 0, 100, 0);
// window.portalGradient.addColorStop(0, "rgba(247, 207, 47, 0)");
// window.portalGradient.addColorStop(1, "rgba(247, 207, 47, 1)");

let mobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i);

export default {
  mobile,
  ref,
  connected,
  disconnected,
  difficultyImages,
  arrowImg
}