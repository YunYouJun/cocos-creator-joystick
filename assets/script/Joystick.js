import JoystickCommon from 'JoystickCommon'

cc.Class({
  extends: cc.Component,

  properties: {
    dot: {
      default: null,
      type: cc.Node,
      displayName: 'Dot',
      tooltip: '摇杆操纵点',
    },
    ring: {
      default: null,
      type: cc.Node,
      displayName: 'Ring',
      tooltip: '摇杆背景节点',
    },

    player: {
      default: null,
      type: cc.Node,
      displayName: 'Player',
      tooltip: '操控角色',
    },

    joystickType: {
      default: JoystickCommon.JoystickType.FIXED,
      type: JoystickCommon.JoystickType,
      displayName: 'Touch Type',
      tooltip: '触摸类型',
    },
    directionType: {
      default: JoystickCommon.DirectionType.ALL,
      type: JoystickCommon.DirectionType,
      displayName: 'Direction Type',
      tooltip: '方向类型',
    },

    _stickPos: {
      default: null,
      type: cc.Node,
      tooltip: '摇杆所在位置',
    },
    _touchLocation: {
      default: null,
      type: cc.Node,
      tooltip: '触摸位置',
    },
  },

  onLoad() {
    this._radius = this.ring.width / 2;
    this._initTouchEvent();
    // hide joystick when follow
    if (this.joystickType == JoystickCommon.JoystickType.FOLLOW) {
      this.node.opacity = 0;
    }
  },

  _initTouchEvent() {
    // set the size of joystick node to control scale
    const self = this;
    self.node.on(cc.Node.EventType.TOUCH_START, self._touchStartEvent, self);
    self.node.on(cc.Node.EventType.TOUCH_MOVE, self._touchMoveEvent, self);
    self.node.on(cc.Node.EventType.TOUCH_END, self._touchEndEvent, self);
    self.node.on(cc.Node.EventType.TOUCH_CANCEL, self._touchEndEvent, self);
  },

  _touchStartEvent(event) {
    const touchPos = this.node.convertToNodeSpaceAR(event.getLocation());

    if (this.joystickType === JoystickCommon.JoystickType.FIXED) {
      this._stickPos = this.ring.getPosition();

      // 触摸点与圆圈中心的距离
      const distance = touchPos.sub(this.ring.getPosition()).mag();

      // 手指在圆圈内触摸,控杆跟随触摸点
      if (this._radius > distance) {
        this.dot.setPosition(touchPos);
      }

    } else if (this.joystickType === JoystickCommon.JoystickType.FOLLOW) {

      // 记录摇杆位置，给 touch move 使用
      this._stickPos = touchPos;
      this.node.opacity = 255;
      this._touchLocation = event.getLocation();
      
      // 更改摇杆的位置
      this.ring.setPosition(touchPos);
      this.dot.setPosition(touchPos);
    }
  },

  _touchMoveEvent(event) {
    if (this.joystickType === JoystickCommon.JoystickType.FOLLOW) {
      // 如果 touch start 位置和 touch move 相同，禁止移动
      if (this._touchLocation === event.getLocation()) {
        return false;
      }
    }

    // 以圆圈为锚点获取触摸坐标
    const touchPos = this.ring.convertToNodeSpaceAR(event.getLocation());
    const distance = touchPos.mag();

    // 由于摇杆的 postion 是以父节点为锚点，所以定位要加上 touch start 时的位置
    const posX = this._stickPos.x + touchPos.x;
    const posY = this._stickPos.y + touchPos.y;

    // 归一化
    const p = cc.v2(posX, posY).sub(this.ring.getPosition()).normalize();

    if (this._radius > distance) {
      this.dot.setPosition(cc.v2(posX, posY));

      this.player._speedType = JoystickCommon.SpeedType.NORMAL;
    } else {
      // 控杆永远保持在圈内，并在圈内跟随触摸更新角度
      const x = this._stickPos.x + p.x * this._radius;
      const y = this._stickPos.y + p.y * this._radius;
      this.dot.setPosition(cc.v2(x, y));

      this.player._speedType = JoystickCommon.SpeedType.FAST;
    }

    this.player = this.player.getComponent('Player');
    this.player.moveDir = p;
  },

  _touchEndEvent() {
    this.dot.setPosition(this.ring.getPosition());
    if (this.joystickType == JoystickCommon.JoystickType.FOLLOW) {
      this.node.opacity = 0;
    }
    this.player._speedType = JoystickCommon.SpeedType.STOP;
  },

  // methods

  setPlayerSpeed() {
    this.player = this.player.getComponent('Player');
    this.player.moveDir = p;
    this.player.speedType = JoystickCommon.SpeedType.NORMAL;
  },
});
