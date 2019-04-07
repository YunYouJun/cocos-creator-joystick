window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  JoystickCommon: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "29753pvkBhLc5rN/SCpZBwE", "JoystickCommon");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      TouchType: cc.Enum({
        DEFAULT: 0,
        FOLLOW: 1
      }),
      DirectionType: cc.Enum({
        FOUR: 4,
        EIGHT: 8,
        ALL: 0
      }),
      SpeedType: cc.Enum({
        STOP: 0,
        NORMAL: 1,
        FAST: 2
      })
    };
    module.exports = exports["default"];
    cc._RF.pop();
  }, {} ],
  Joystick: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "965d6+vAp1OAajGemdUBWK+", "Joystick");
    "use strict";
    var _JoystickCommon = require("JoystickCommon");
    var _JoystickCommon2 = _interopRequireDefault(_JoystickCommon);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        dot: {
          default: null,
          type: cc.Node,
          displayName: "Dot",
          tooltip: "\u6447\u6746\u64cd\u7eb5\u70b9"
        },
        ring: {
          default: null,
          type: cc.Node,
          displayName: "Ring",
          tooltip: "\u6447\u6746\u80cc\u666f\u8282\u70b9"
        },
        player: {
          default: null,
          type: cc.Node,
          displayName: "Player",
          tooltip: "\u64cd\u63a7\u89d2\u8272"
        },
        touchType: {
          default: _JoystickCommon2.default.TouchType.DEFAULT,
          type: _JoystickCommon2.default.TouchType,
          displayName: "Touch Type",
          tooltip: "\u89e6\u6478\u7c7b\u578b"
        },
        directionType: {
          default: _JoystickCommon2.default.DirectionType.ALL,
          type: _JoystickCommon2.default.DirectionType,
          displayName: "Direction Type",
          tooltip: "\u65b9\u5411\u7c7b\u578b"
        },
        _stickPos: {
          default: null,
          type: cc.Node,
          tooltip: "\u6447\u6746\u6240\u5728\u4f4d\u7f6e"
        },
        _touchLocation: {
          default: null,
          type: cc.Node,
          tooltip: "\u89e6\u6478\u4f4d\u7f6e"
        }
      },
      onLoad: function onLoad() {
        this._radius = this.ring.width / 2;
        this._initTouchEvent();
        this.touchType == _JoystickCommon2.default.TouchType.FOLLOW && (this.node.opacity = 0);
      },
      _initTouchEvent: function _initTouchEvent() {
        var self = this;
        self.node.on(cc.Node.EventType.TOUCH_START, self._touchStartEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_MOVE, self._touchMoveEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_END, self._touchEndEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_CANCEL, self._touchEndEvent, self);
      },
      _touchStartEvent: function _touchStartEvent(event) {
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        if (this.touchType === _JoystickCommon2.default.TouchType.DEFAULT) {
          this._stickPos = this.ring.getPosition();
          var distance = touchPos.sub(this.ring.getPosition()).mag();
          this._radius > distance && this.dot.setPosition(touchPos);
        } else if (this.touchType === _JoystickCommon2.default.TouchType.FOLLOW) {
          this._stickPos = touchPos;
          this.node.opacity = 255;
          this._touchLocation = event.getLocation();
          this.ring.setPosition(touchPos);
          this.dot.setPosition(touchPos);
        }
      },
      _touchMoveEvent: function _touchMoveEvent(event) {
        if (this.touchType === _JoystickCommon2.default.TouchType.FOLLOW && this._touchLocation === event.getLocation()) return false;
        var touchPos = this.ring.convertToNodeSpaceAR(event.getLocation());
        var distance = touchPos.mag();
        var posX = this._stickPos.x + touchPos.x;
        var posY = this._stickPos.y + touchPos.y;
        var p = cc.v2(posX, posY).sub(this.ring.getPosition()).normalize();
        var r = Math.atan2(p.y, p.x);
        if (this._radius > distance) {
          this.dot.setPosition(cc.v2(posX, posY));
          this.player._speedType = _JoystickCommon2.default.SpeedType.NORMAL;
        } else {
          var x = this._stickPos.x + Math.cos(r) * this._radius;
          var y = this._stickPos.y + Math.sin(r) * this._radius;
          this.dot.setPosition(cc.v2(x, y));
          this.player._speedType = _JoystickCommon2.default.SpeedType.FAST;
        }
        this.player = this.player.getComponent("Player");
        this.player.moveDir = p;
      },
      _touchEndEvent: function _touchEndEvent() {
        this.dot.setPosition(this.ring.getPosition());
        this.touchType == _JoystickCommon2.default.TouchType.FOLLOW && (this.node.opacity = 0);
        this.player._speedType = _JoystickCommon2.default.SpeedType.STOP;
      },
      setPlayerSpeed: function setPlayerSpeed() {
        this.player = this.player.getComponent("Player");
        this.player.moveDir = p;
        this.player.speedType = _JoystickCommon2.default.SpeedType.NORMAL;
      }
    });
    cc._RF.pop();
  }, {
    JoystickCommon: "JoystickCommon"
  } ],
  Player: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8dd32uLvGJJ6b6GLXsJqGwx", "Player");
    "use strict";
    var _JoystickCommon = require("JoystickCommon");
    cc.Class({
      extends: cc.Component,
      properties: {
        moveDir: {
          default: cc.v2(0, 1),
          displayName: "Move Dir",
          tooltip: "\u79fb\u52a8\u65b9\u5411"
        },
        _speedType: {
          default: _JoystickCommon.SpeedType.STOP,
          displayName: "Speed Type",
          type: _JoystickCommon.SpeedType,
          tooltip: "\u901f\u5ea6\u7ea7\u522b"
        },
        _moveSpeed: {
          default: 0,
          displayName: "Move Speed",
          tooltip: "\u79fb\u52a8\u901f\u5ea6"
        },
        stopSpeed: {
          default: 0,
          type: cc.Integer,
          tooltip: "\u505c\u6b62\u65f6\u901f\u5ea6"
        },
        normalSpeed: {
          default: 100,
          type: cc.Integer,
          tooltip: "\u6b63\u5e38\u901f\u5ea6"
        },
        fastSpeed: {
          default: 200,
          type: cc.Integer,
          tooltip: "\u6700\u5feb\u901f\u5ea6"
        }
      },
      move: function move() {
        this.node.rotation = 90 - cc.misc.radiansToDegrees(Math.atan2(this.moveDir.y, this.moveDir.x));
        var newPos = this.node.position.add(this.moveDir.mul(this._moveSpeed / 60));
        this.node.setPosition(newPos);
      },
      update: function update(dt) {
        switch (this._speedType) {
         case _JoystickCommon.SpeedType.STOP:
          this._moveSpeed = this.stopSpeed;
          break;

         case _JoystickCommon.SpeedType.NORMAL:
          this._moveSpeed = this.normalSpeed;
          break;

         case _JoystickCommon.SpeedType.FAST:
          this._moveSpeed = this.fastSpeed;
        }
        this.move();
      }
    });
    cc._RF.pop();
  }, {
    JoystickCommon: "JoystickCommon"
  } ]
}, {}, [ "Joystick", "JoystickCommon", "Player" ]);