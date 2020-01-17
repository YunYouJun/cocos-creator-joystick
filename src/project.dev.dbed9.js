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
  JoystickEnum: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "29753pvkBhLc5rN/SCpZBwE", "JoystickEnum");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      JoystickType: cc.Enum({
        FIXED: 0,
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
      }),
      JoystickEventType: cc.Enum({
        TOUCH_START: "touchStart",
        TOUCH_MOVE: "touchMove",
        TOUCH_END: "touchEnd",
        CHANGE_JOYSTICK_TYPE: "changeJoystickType"
      })
    };
    module.exports = exports["default"];
    cc._RF.pop();
  }, {} ],
  JoystickEvent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "96bc3M2TwxGabIeDD4rOmQc", "JoystickEvent");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
        return arr2;
      }
      return Array.from(arr);
    }
    var JoystickEvent = cc.Class({
      properties: {
        _event: null
      },
      ctor: function ctor() {
        this._event = new cc.EventTarget();
      },
      on: function on(eventType, callFunc, target) {
        this._event.on(eventType, callFunc, target);
      },
      off: function off(eventType, callFunc, target) {
        this._event.off(eventType, callFunc, target);
      },
      emit: function emit(eventType) {
        var _event;
        for (var _len = arguments.length, arg = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) arg[_key - 1] = arguments[_key];
        (_event = this._event).emit.apply(_event, [ eventType ].concat(_toConsumableArray(arg)));
      }
    });
    var _instance = null;
    JoystickEvent.getInstance = function() {
      !_instance && (_instance = new JoystickEvent());
      return _instance;
    };
    exports.default = JoystickEvent;
    module.exports = exports["default"];
    cc._RF.pop();
  }, {} ],
  Joystick: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "965d6+vAp1OAajGemdUBWK+", "Joystick");
    "use strict";
    var _JoystickEnum = require("JoystickEnum");
    var _JoystickEnum2 = _interopRequireDefault(_JoystickEnum);
    var _JoystickEvent = require("JoystickEvent");
    var _JoystickEvent2 = _interopRequireDefault(_JoystickEvent);
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
        joystickType: {
          default: _JoystickEnum2.default.JoystickType.FIXED,
          type: _JoystickEnum2.default.JoystickType,
          displayName: "Touch Type",
          tooltip: "\u89e6\u6478\u7c7b\u578b"
        },
        directionType: {
          default: _JoystickEnum2.default.DirectionType.ALL,
          type: _JoystickEnum2.default.DirectionType,
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
        this.joystickType === _JoystickEnum2.default.JoystickType.FOLLOW && (this.node.opacity = 0);
      },
      onEnable: function onEnable() {
        _JoystickEvent2.default.getInstance().on(_JoystickEnum2.default.JoystickEventType.CHANGE_JOYSTICK_TYPE, this._onChangeJoystickType, this);
      },
      onDisable: function onDisable() {
        _JoystickEvent2.default.getInstance().off(_JoystickEnum2.default.JoystickEventType.CHANGE_JOYSTICK_TYPE, this._onChangeJoystickType, this);
      },
      _onChangeJoystickType: function _onChangeJoystickType(type) {
        this.joystickType = type;
        this.node.opacity = type === _JoystickEnum2.default.JoystickType.FIXED ? 255 : 0;
      },
      _initTouchEvent: function _initTouchEvent() {
        this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this);
      },
      _touchStartEvent: function _touchStartEvent(event) {
        _JoystickEvent2.default.getInstance().emit(_JoystickEnum2.default.JoystickEventType.TOUCH_START, "joystick touch start", 10);
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        if (this.joystickType === _JoystickEnum2.default.JoystickType.FIXED) {
          this._stickPos = this.ring.getPosition();
          var distance = touchPos.sub(this.ring.getPosition()).mag();
          this._radius > distance && this.dot.setPosition(touchPos);
        } else if (this.joystickType === _JoystickEnum2.default.JoystickType.FOLLOW) {
          this._stickPos = touchPos;
          this.node.opacity = 255;
          this._touchLocation = event.getLocation();
          this.ring.setPosition(touchPos);
          this.dot.setPosition(touchPos);
        }
      },
      _touchMoveEvent: function _touchMoveEvent(event) {
        if (this.joystickType === _JoystickEnum2.default.JoystickType.FOLLOW && this._touchLocation === event.getLocation()) return false;
        var touchPos = this.ring.convertToNodeSpaceAR(event.getLocation());
        var distance = touchPos.mag();
        var posX = this._stickPos.x + touchPos.x;
        var posY = this._stickPos.y + touchPos.y;
        var p = cc.v2(posX, posY).sub(this.ring.getPosition()).normalize();
        var speedType = void 0;
        if (this._radius > distance) {
          this.dot.setPosition(cc.v2(posX, posY));
          speedType = _JoystickEnum2.default.SpeedType.NORMAL;
        } else {
          var x = this._stickPos.x + p.x * this._radius;
          var y = this._stickPos.y + p.y * this._radius;
          this.dot.setPosition(cc.v2(x, y));
          speedType = _JoystickEnum2.default.SpeedType.FAST;
        }
        _JoystickEvent2.default.getInstance().emit(_JoystickEnum2.default.JoystickEventType.TOUCH_MOVE, event, {
          speedType: speedType,
          moveDistance: p
        });
      },
      _touchEndEvent: function _touchEndEvent(event) {
        this.dot.setPosition(this.ring.getPosition());
        this.joystickType === _JoystickEnum2.default.JoystickType.FOLLOW && (this.node.opacity = 0);
        _JoystickEvent2.default.getInstance().emit(_JoystickEnum2.default.JoystickEventType.TOUCH_END, event, {
          speedType: _JoystickEnum2.default.SpeedType.STOP
        });
      }
    });
    cc._RF.pop();
  }, {
    JoystickEnum: "JoystickEnum",
    JoystickEvent: "JoystickEvent"
  } ],
  PlayerPhysics: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f20adps2YtC7JOk73yL40dO", "PlayerPhysics");
    "use strict";
    var _JoystickEnum = require("./joystick/JoystickEnum");
    var _JoystickEnum2 = _interopRequireDefault(_JoystickEnum);
    var _JoystickEvent = require("./joystick/JoystickEvent");
    var _JoystickEvent2 = _interopRequireDefault(_JoystickEvent);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        moveDir: {
          default: cc.v2(0, 1),
          displayName: "Move Dir",
          tooltip: "\u79fb\u52a8\u65b9\u5411"
        },
        _speedType: {
          default: _JoystickEnum2.default.SpeedType.STOP,
          displayName: "Speed Type",
          type: _JoystickEnum2.default.SpeedType,
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
        },
        _body: cc.RigidBody
      },
      onLoad: function onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        this._body = this.node.getComponent(cc.RigidBody);
        _JoystickEvent2.default.getInstance().on(_JoystickEnum2.default.JoystickEventType.TOUCH_START, this.onTouchStart, this);
        _JoystickEvent2.default.getInstance().on(_JoystickEnum2.default.JoystickEventType.TOUCH_MOVE, this.onTouchMove, this);
        _JoystickEvent2.default.getInstance().on(_JoystickEnum2.default.JoystickEventType.TOUCH_END, this.onTouchEnd, this);
      },
      onTouchStart: function onTouchStart() {},
      onTouchMove: function onTouchMove(event, data) {
        this._speedType = data.speedType;
        this.moveDir = data.moveDistance;
      },
      onTouchEnd: function onTouchEnd(event, data) {
        this._speedType = data.speedType;
      },
      move: function move() {
        this.node.angle = cc.misc.radiansToDegrees(Math.atan2(this.moveDir.y, this.moveDir.x)) - 90;
        this._body.applyForceToCenter(cc.v2(200 * this.moveDir.x, 200 * this.moveDir.y), true);
      },
      update: function update(dt) {
        switch (this._speedType) {
         case _JoystickEnum2.default.SpeedType.STOP:
          this._body.linearVelocity = cc.v2(0, 0);
          this._moveSpeed = this.stopSpeed;
          break;

         case _JoystickEnum2.default.SpeedType.NORMAL:
          this._moveSpeed = this.normalSpeed;
          break;

         case _JoystickEnum2.default.SpeedType.FAST:
          this._moveSpeed = this.fastSpeed;
        }
        this._speedType !== _JoystickEnum2.default.SpeedType.STOP && this.move();
      }
    });
    cc._RF.pop();
  }, {
    "./joystick/JoystickEnum": "JoystickEnum",
    "./joystick/JoystickEvent": "JoystickEvent"
  } ],
  Player: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8dd32uLvGJJ6b6GLXsJqGwx", "Player");
    "use strict";
    var _JoystickEnum = require("./joystick/JoystickEnum");
    var _JoystickEnum2 = _interopRequireDefault(_JoystickEnum);
    var _JoystickEvent = require("./joystick/JoystickEvent");
    var _JoystickEvent2 = _interopRequireDefault(_JoystickEvent);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        moveDir: {
          default: cc.v2(0, 1),
          displayName: "Move Dir",
          tooltip: "\u79fb\u52a8\u65b9\u5411"
        },
        _speedType: {
          default: _JoystickEnum2.default.SpeedType.STOP,
          displayName: "Speed Type",
          type: _JoystickEnum2.default.SpeedType,
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
      onLoad: function onLoad() {
        _JoystickEvent2.default.getInstance().on(_JoystickEnum2.default.JoystickEventType.TOUCH_START, this.onTouchStart, this);
        _JoystickEvent2.default.getInstance().on(_JoystickEnum2.default.JoystickEventType.TOUCH_MOVE, this.onTouchMove, this);
        _JoystickEvent2.default.getInstance().on(_JoystickEnum2.default.JoystickEventType.TOUCH_END, this.onTouchEnd, this);
      },
      onTouchStart: function onTouchStart() {},
      onTouchMove: function onTouchMove(event, data) {
        this._speedType = data.speedType;
        this.moveDir = data.moveDistance;
      },
      onTouchEnd: function onTouchEnd(event, data) {
        this._speedType = data.speedType;
      },
      move: function move() {
        this.node.angle = cc.misc.radiansToDegrees(Math.atan2(this.moveDir.y, this.moveDir.x)) - 90;
        var newPos = this.node.position.add(this.moveDir.mul(this._moveSpeed / 120));
        this.node.setPosition(newPos);
      },
      update: function update(dt) {
        switch (this._speedType) {
         case _JoystickEnum2.default.SpeedType.STOP:
          this._moveSpeed = this.stopSpeed;
          break;

         case _JoystickEnum2.default.SpeedType.NORMAL:
          this._moveSpeed = this.normalSpeed;
          break;

         case _JoystickEnum2.default.SpeedType.FAST:
          this._moveSpeed = this.fastSpeed;
        }
        this.move();
      }
    });
    cc._RF.pop();
  }, {
    "./joystick/JoystickEnum": "JoystickEnum",
    "./joystick/JoystickEvent": "JoystickEvent"
  } ],
  UI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b578d4RwmNB97QPmxn2E0ls", "UI");
    "use strict";
    var _JoystickEnum = require("./joystick/JoystickEnum");
    var _JoystickEnum2 = _interopRequireDefault(_JoystickEnum);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {},
      useFixedType: function useFixedType() {
        _JoystickEnum2.default.getInstance().emit(_JoystickEnum2.default.JoystickEventType.CHANGE_JOYSTICK_TYPE, _JoystickEnum2.default.JoystickType.FIXED);
      },
      useFollowType: function useFollowType() {
        _JoystickEnum2.default.getInstance().emit(_JoystickEnum2.default.JoystickEventType.CHANGE_JOYSTICK_TYPE, _JoystickEnum2.default.JoystickType.FOLLOW);
      }
    });
    cc._RF.pop();
  }, {
    "./joystick/JoystickEnum": "JoystickEnum"
  } ]
}, {}, [ "Player", "PlayerPhysics", "UI", "Joystick", "JoystickEnum", "JoystickEvent" ]);