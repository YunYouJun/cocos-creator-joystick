const JoystickCommon = {
  TouchType: cc.Enum({
    DEFAULT: 0,
    FOLLOW: 1,
  }),

  DirectionType: cc.Enum({
    FOUR: 4,
    EIGHT: 8,
    ALL: 0,
  }),
};

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

    touchType: {
      default: JoystickCommon.TouchType.DEFAULT,
      type: JoystickCommon.TouchType,
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
      tooltip: '摇杆当前位置',
    },

    _touchLocation: {
      default: null,
      type: cc.Node,
      tooltip: '摇杆当前位置',

    },

    _angle: {
      default: 0,
      tooltip: '当前触摸的角度',
    },
  },

  init(player) {
    this.player = player;
  },

  onLoad() {
    this._radius = this.ring.width / 2;

    this._initTouchEvent();
    if (this.touchType == JoystickCommon.TouchType.FOLLOW) {
      this.node.opacity = 0;
    }
  },

  _initTouchEvent() {
    const self = this;

    self.node.on(cc.Node.EventType.TOUCH_START, self._touchStartEvent, self);
    self.node.on(cc.Node.EventType.TOUCH_MOVE, self._touchMoveEvent, self);
    self.node.on(cc.Node.EventType.TOUCH_END, self._touchEndEvent, self);
    self.node.on(cc.Node.EventType.TOUCH_CANCEL, self._touchEndEvent, self);
  },

  _touchStartEvent(event) {
    const touchPos = this.node.convertToNodeSpaceAR(event.getLocation());

    if (this.touchType === JoystickCommon.TouchType.DEFAULT) {
      this._stickPos = this.ring.getPosition();
      // 触摸点与圆圈中心的距离
      const distance = touchPos.mag();
      const posX = this.ring.getPosition().x + touchPos.x;
      const posY = this.ring.getPosition().y + touchPos.y;
      // 手指在圆圈内触摸,控杆跟随触摸点
      if (this._radius > distance) {
        this.dot.setPosition(cc.v2(posX, posY));
        return true;
      }
      return false;
    } else if (this.touchType === JoystickCommon.TouchType.FOLLOW) {
      // 记录摇杆位置，给touch move使用
      this._stickPos = touchPos;
      this.node.opacity = 255;
      this._touchLocation = event.getLocation();
      // 更改摇杆的位置
      this.ring.setPosition(touchPos);
      this.dot.setPosition(touchPos);
    }
  },

  _touchMoveEvent(event) {
    if (this.touchType === JoystickCommon.TouchType.FOLLOW) {
      // 如果touch start位置和touch move相同，禁止移动
      if (this._touchLocation.x == event.getLocation().x
        && this._touchLocation.y == event.getLocation().y) {
        return false;
      }
    }

    // 以圆圈为锚点获取触摸坐标
    const touchPos = this.ring.convertToNodeSpaceAR(event.getLocation());
    const distance = touchPos.mag();

    // 由于摇杆的postion是以父节点为锚点，所以定位要加上touch start时的位置
    const posX = this._stickPos.x + touchPos.x;
    const posY = this._stickPos.y + touchPos.y;

    const p = cc.v2(posX, posY).sub(this.ring.getPosition());
    const r = Math.atan2(p.y, p.x);

    if (this._radius > distance) {
      this.dot.setPosition(cc.v2(posX, posY));
    } else {
      // 控杆永远保持在圈内，并在圈内跟随触摸更新角度
      const x = this._stickPos.x + Math.cos(r) * this._radius;
      const y = this._stickPos.y + Math.sin(r) * this._radius;
      this.dot.setPosition(cc.v2(x, y));
    }
    // 更新角度
    this._angle = cc.misc.radiansToDegrees(r);
    this.player.moveAngle = this._angle;
    // 设置实际速度
    // this._setSpeed(cc.v2(posX, posY));

    // this.player.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(
    //     this.player.moveDir.x * this.player.moveSpeed,
    //     this.player.moveDir.y * this.player.moveSpeed
    // );
    // this.player.startMove();

    // ...
    this.player.setPosition(this.player.getPosition().add(cc.v2(p.x / 100, p.y / 100)));
  },

  _touchEndEvent() {
    this.dot.setPosition(this.ring.getPosition());
    if (this.touchType == JoystickCommon.TouchType.FOLLOW) {
      this.node.opacity = 0;
    }
    // this.player.stopMove();
  },

  // methods

  // 设置实际速度
  // _setSpeed(point) {
  //   // 触摸点和遥控杆中心的距离
  //   const distance = point.sub(this.ring.getPosition()).mag();
  //   // 如果半径
  //   if (distance < this._radius) {
  //     this.player.moveSpeed = this.player.normalSpeed;
  //   } else {
  //     this.player.speedUpFlag = true;
  //   }
  // },

  update() {
    // get move direction from rotation

    // console.log(this.player)
    // const rotation = this.player.node.getComponent(cc.RigidBody)
    //                    .getWorldRotation();
    // const radian = cc.misc.degreesToRadians(90 - rotation);
    // const dir = cc.v2(
    //     Math.cos(radian),
    //     Math.sin(radian)
    // );
    // this.player.moveDir = dir;
  },
});
