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
        o = b;
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
  Joystick: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "73162lxt5BLxbtr/vpxLfXd", "Joystick");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.JoystickType = exports.SpeedType = exports.DirectionType = exports.instance = void 0;
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    exports.instance = new cc.EventTarget();
    var DirectionType;
    (function(DirectionType) {
      DirectionType[DirectionType["FOUR"] = 0] = "FOUR";
      DirectionType[DirectionType["EIGHT"] = 1] = "EIGHT";
      DirectionType[DirectionType["ALL"] = 2] = "ALL";
    })(DirectionType = exports.DirectionType || (exports.DirectionType = {}));
    var SpeedType;
    (function(SpeedType) {
      SpeedType[SpeedType["STOP"] = 0] = "STOP";
      SpeedType[SpeedType["NORMAL"] = 1] = "NORMAL";
      SpeedType[SpeedType["FAST"] = 2] = "FAST";
    })(SpeedType = exports.SpeedType || (exports.SpeedType = {}));
    var JoystickType;
    (function(JoystickType) {
      JoystickType[JoystickType["FIXED"] = 0] = "FIXED";
      JoystickType[JoystickType["FOLLOW"] = 1] = "FOLLOW";
    })(JoystickType = exports.JoystickType || (exports.JoystickType = {}));
    var Joystick = function(_super) {
      __extends(Joystick, _super);
      function Joystick() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.dot = null;
        _this.ring = null;
        _this.joystickType = JoystickType.FIXED;
        _this.directionType = DirectionType.ALL;
        _this._stickPos = null;
        _this._touchLocation = null;
        _this._radius = 0;
        return _this;
      }
      Joystick.prototype.onLoad = function() {
        this._radius = this.ring.width / 2;
        this._initTouchEvent();
        this.joystickType === JoystickType.FOLLOW && (this.node.opacity = 0);
      };
      Joystick.prototype.onEnable = function() {
        exports.instance.on("set_joystick_type", this._onSetJoystickType, this);
      };
      Joystick.prototype.onDisable = function() {
        exports.instance.off("set_joystick_type", this._onSetJoystickType, this);
      };
      Joystick.prototype._onSetJoystickType = function(type) {
        this.joystickType = type;
        this.node.opacity = type === JoystickType.FIXED ? 255 : 0;
      };
      Joystick.prototype._initTouchEvent = function() {
        this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this);
      };
      Joystick.prototype._touchStartEvent = function(event) {
        exports.instance.emit(cc.Node.EventType.TOUCH_START, event);
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        if (this.joystickType === JoystickType.FIXED) {
          this._stickPos = this.ring.getPosition();
          var distance = touchPos.sub(this.ring.getPosition()).mag();
          this._radius > distance && this.dot.setPosition(touchPos);
        } else if (this.joystickType === JoystickType.FOLLOW) {
          this._stickPos = touchPos;
          this.node.opacity = 255;
          this._touchLocation = event.getLocation();
          this.ring.setPosition(touchPos);
          this.dot.setPosition(touchPos);
        }
      };
      Joystick.prototype._touchMoveEvent = function(event) {
        if (this.joystickType === JoystickType.FOLLOW && this._touchLocation === event.getLocation()) return false;
        var touchPos = this.ring.convertToNodeSpaceAR(event.getLocation());
        var distance = touchPos.mag();
        var posX = this._stickPos.x + touchPos.x;
        var posY = this._stickPos.y + touchPos.y;
        var p = cc.v2(posX, posY).sub(this.ring.getPosition()).normalize();
        var speedType;
        if (this._radius > distance) {
          this.dot.setPosition(cc.v2(posX, posY));
          speedType = SpeedType.NORMAL;
        } else {
          var x = this._stickPos.x + p.x * this._radius;
          var y = this._stickPos.y + p.y * this._radius;
          this.dot.setPosition(cc.v2(x, y));
          speedType = SpeedType.FAST;
        }
        exports.instance.emit(cc.Node.EventType.TOUCH_MOVE, event, {
          speedType: speedType,
          moveDistance: p
        });
      };
      Joystick.prototype._touchEndEvent = function(event) {
        this.dot.setPosition(this.ring.getPosition());
        this.joystickType === JoystickType.FOLLOW && (this.node.opacity = 0);
        exports.instance.emit(cc.Node.EventType.TOUCH_END, event, {
          speedType: SpeedType.STOP
        });
      };
      __decorate([ property({
        type: cc.Node,
        displayName: "Dot",
        tooltip: "\u6447\u6746\u64cd\u7eb5\u70b9"
      }) ], Joystick.prototype, "dot", void 0);
      __decorate([ property({
        type: cc.Node,
        displayName: "Ring",
        tooltip: "\u6447\u6746\u80cc\u666f\u8282\u70b9"
      }) ], Joystick.prototype, "ring", void 0);
      __decorate([ property({
        type: cc.Enum(JoystickType),
        displayName: "Touch Type",
        tooltip: "\u89e6\u6478\u7c7b\u578b"
      }) ], Joystick.prototype, "joystickType", void 0);
      __decorate([ property({
        type: cc.Enum(DirectionType),
        displayName: "Direction Type",
        tooltip: "\u65b9\u5411\u7c7b\u578b"
      }) ], Joystick.prototype, "directionType", void 0);
      __decorate([ property({
        type: cc.Node,
        tooltip: "\u6447\u6746\u6240\u5728\u4f4d\u7f6e"
      }) ], Joystick.prototype, "_stickPos", void 0);
      __decorate([ property({
        type: cc.Node,
        tooltip: "\u89e6\u6478\u4f4d\u7f6e"
      }) ], Joystick.prototype, "_touchLocation", void 0);
      __decorate([ property({
        tooltip: "\u534a\u5f84"
      }) ], Joystick.prototype, "_radius", void 0);
      Joystick = __decorate([ ccclass ], Joystick);
      return Joystick;
    }(cc.Component);
    exports.default = Joystick;
    cc._RF.pop();
  }, {} ],
  Player: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ba452nnVcJMPYIauwJ4Favx", "Player");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Joystick_1 = require("./Joystick");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Joystick_2 = require("./Joystick");
    var Player = function(_super) {
      __extends(Player, _super);
      function Player() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.rigidbody = false;
        _this.moveDir = cc.v2(0, 1);
        _this._speedType = Joystick_1.SpeedType.STOP;
        _this._moveSpeed = 0;
        _this.stopSpeed = 0;
        _this.normalSpeed = 100;
        _this.fastSpeed = 200;
        return _this;
      }
      Player.prototype.onLoad = function() {
        if (this.rigidbody) {
          cc.director.getPhysicsManager().enabled = true;
          this._body = this.getComponent(cc.RigidBody);
        }
        Joystick_2.instance.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        Joystick_2.instance.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        Joystick_2.instance.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
      };
      Player.prototype.onTouchStart = function() {};
      Player.prototype.onTouchMove = function(event, data) {
        this._speedType = data.speedType;
        this.moveDir = data.moveDistance;
      };
      Player.prototype.onTouchEnd = function(event, data) {
        this._speedType = data.speedType;
      };
      Player.prototype.move = function() {
        this.node.angle = cc.misc.radiansToDegrees(Math.atan2(this.moveDir.y, this.moveDir.x)) - 90;
        if (this.rigidbody) this._body.applyForceToCenter(cc.v2(200 * this.moveDir.x, 200 * this.moveDir.y), true); else {
          var oldPos = cc.v2();
          this.node.getPosition(oldPos);
          var newPos = oldPos.add(this.moveDir.mul(this._moveSpeed / 120));
          this.node.setPosition(newPos);
        }
      };
      Player.prototype.update = function(dt) {
        switch (this._speedType) {
         case Joystick_1.SpeedType.STOP:
          this._moveSpeed = this.stopSpeed;
          break;

         case Joystick_1.SpeedType.NORMAL:
          this._moveSpeed = this.normalSpeed;
          break;

         case Joystick_1.SpeedType.FAST:
          this._moveSpeed = this.fastSpeed;
        }
        this._speedType !== Joystick_1.SpeedType.STOP && this.move();
      };
      __decorate([ property({
        displayName: "\u521a\u4f53\u6a21\u5f0f",
        tooltip: "\u4e0d\u4f1a\u7acb\u5373\u505c\u6b62"
      }) ], Player.prototype, "rigidbody", void 0);
      __decorate([ property({
        displayName: "Move Dir",
        tooltip: "\u79fb\u52a8\u65b9\u5411"
      }) ], Player.prototype, "moveDir", void 0);
      __decorate([ property({
        displayName: "Speed Type",
        tooltip: "\u901f\u5ea6\u7ea7\u522b"
      }) ], Player.prototype, "_speedType", void 0);
      __decorate([ property({
        type: cc.Integer,
        displayName: "Move Speed",
        tooltip: "\u79fb\u52a8\u901f\u5ea6"
      }) ], Player.prototype, "_moveSpeed", void 0);
      __decorate([ property({
        type: cc.Integer,
        displayName: "Stop Speed",
        tooltip: "\u505c\u6b62\u65f6\u901f\u5ea6"
      }) ], Player.prototype, "stopSpeed", void 0);
      __decorate([ property({
        type: cc.Integer,
        tooltip: "\u6b63\u5e38\u901f\u5ea6"
      }) ], Player.prototype, "normalSpeed", void 0);
      __decorate([ property({
        type: cc.Integer,
        tooltip: "\u6700\u5feb\u901f\u5ea6"
      }) ], Player.prototype, "fastSpeed", void 0);
      Player = __decorate([ ccclass ], Player);
      return Player;
    }(cc.Component);
    exports.default = Player;
    cc._RF.pop();
  }, {
    "./Joystick": "Joystick"
  } ],
  UI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "df968oG9ClOtaKssOzeyetw", "UI");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Joystick_1 = require("./Joystick");
    var ccclass = cc._decorator.ccclass;
    var UI = function(_super) {
      __extends(UI, _super);
      function UI() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      UI.prototype.useFixedType = function() {
        Joystick_1.instance.emit("set_joystick_type", Joystick_1.JoystickType.FIXED);
      };
      UI.prototype.useFollowType = function() {
        Joystick_1.instance.emit("set_joystick_type", Joystick_1.JoystickType.FOLLOW);
      };
      UI = __decorate([ ccclass ], UI);
      return UI;
    }(cc.Component);
    exports.default = UI;
    cc._RF.pop();
  }, {
    "./Joystick": "Joystick"
  } ],
  test: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "44402v5pTtKh6Qwn8ysQABR", "test");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = "hello";
        return _this;
      }
      NewClass.prototype.start = function() {};
      __decorate([ property(cc.Label) ], NewClass.prototype, "label", void 0);
      __decorate([ property ], NewClass.prototype, "text", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ]
}, {}, [ "Joystick", "Player", "UI", "test" ]);