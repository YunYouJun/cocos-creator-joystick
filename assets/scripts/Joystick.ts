const { ccclass, property } = cc._decorator;

/**
 * 全局事件监听实例
 */
export const instance = new cc.EventTarget();

/**
 * 方向类型
 */
export enum DirectionType {
  FOUR,
  EIGHT,
  ALL,
}

/**
 * 速度类型
 */
export enum SpeedType {
  STOP,
  NORMAL,
  FAST,
}

/**
 * 摇杆类型
 */
export enum JoystickType {
  FIXED,
  FOLLOW,
}

/**
 * 摇杆类
 */
@ccclass
export default class Joystick extends cc.Component {
  @property({
    type: cc.Node,
    displayName: "Dot",
    tooltip: "摇杆操纵点",
  })
  dot = null;

  @property({
    type: cc.Node,
    displayName: "Ring",
    tooltip: "摇杆背景节点",
  })
  ring = null;

  @property({
    displayName: "Touch Type",
    tooltip: "触摸类型",
  })
  joystickType = JoystickType.FIXED;

  @property({
    displayName: "Direction Type",
    tooltip: "方向类型",
  })
  directionType = DirectionType.ALL;

  @property({
    type: cc.Node,
    tooltip: "摇杆所在位置",
  })
  _stickPos = null;

  @property({
    type: cc.Node,
    tooltip: "触摸位置",
  })
  _touchLocation = null;

  @property({
    tooltip: "半径",
  })
  _radius = 0;

  onLoad() {
    this._radius = this.ring.width / 2;
    this._initTouchEvent();
    // hide joystick when follow
    if (this.joystickType === JoystickType.FOLLOW) {
      this.node.opacity = 0;
    }
  }

  /**
   * 启用时
   */
  onEnable() {
    instance.on("change_joystick_type", this._onChangeJoystickType, this);
  }

  /**
   * 禁用时
   */
  onDisable() {
    instance.off("change_joystick_type", this._onChangeJoystickType, this);
  }

  /**
   * 改变摇杆类型
   * @param type
   */
  _onChangeJoystickType(type: JoystickType) {
    this.joystickType = type;
    this.node.opacity = type === JoystickType.FIXED ? 255 : 0;
  }

  /**
   * 初始化触摸事件
   */
  _initTouchEvent() {
    // set the size of joystick node to control scale
    this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartEvent, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndEvent, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this);
  }

  /**
   * 触摸开始回调函数
   * @param event
   */
  _touchStartEvent(event: cc.Event.EventTouch) {
    instance.emit(cc.Node.EventType.TOUCH_START, event);

    const touchPos = this.node.convertToNodeSpaceAR(event.getLocation());

    if (this.joystickType === JoystickType.FIXED) {
      this._stickPos = this.ring.getPosition();

      // 触摸点与圆圈中心的距离
      const distance = touchPos.sub(this.ring.getPosition()).mag();

      // 手指在圆圈内触摸,控杆跟随触摸点
      this._radius > distance && this.dot.setPosition(touchPos);
    } else if (this.joystickType === JoystickType.FOLLOW) {
      // 记录摇杆位置，给 touch move 使用
      this._stickPos = touchPos;
      this.node.opacity = 255;
      this._touchLocation = event.getLocation();

      // 更改摇杆的位置
      this.ring.setPosition(touchPos);
      this.dot.setPosition(touchPos);
    }
  }

  /**
   * 触摸移动回调函数
   * @param event
   */
  _touchMoveEvent(event: cc.Event.EventTouch) {
    // 如果 touch start 位置和 touch move 相同，禁止移动
    if (
      this.joystickType === JoystickType.FOLLOW &&
      this._touchLocation === event.getLocation()
    ) {
      return false;
    }

    // 以圆圈为锚点获取触摸坐标
    const touchPos = this.ring.convertToNodeSpaceAR(event.getLocation());
    const distance = touchPos.mag();

    // 由于摇杆的 postion 是以父节点为锚点，所以定位要加上 touch start 时的位置
    const posX = this._stickPos.x + touchPos.x;
    const posY = this._stickPos.y + touchPos.y;

    // 归一化
    const p = cc.v2(posX, posY).sub(this.ring.getPosition()).normalize();

    let speedType;

    if (this._radius > distance) {
      this.dot.setPosition(cc.v2(posX, posY));

      speedType = SpeedType.NORMAL;
    } else {
      // 控杆永远保持在圈内，并在圈内跟随触摸更新角度
      const x = this._stickPos.x + p.x * this._radius;
      const y = this._stickPos.y + p.y * this._radius;
      this.dot.setPosition(cc.v2(x, y));

      speedType = SpeedType.FAST;
    }

    instance.emit(cc.Node.EventType.TOUCH_MOVE, event, {
      speedType: speedType,
      moveDistance: p,
    });
  }

  /**
   * 触摸结束回调函数
   * @param event
   */
  _touchEndEvent(event: cc.Event.EventTouch) {
    this.dot.setPosition(this.ring.getPosition());
    if (this.joystickType === JoystickType.FOLLOW) {
      this.node.opacity = 0;
    }

    instance.emit(cc.Node.EventType.TOUCH_END, event, {
      speedType: SpeedType.STOP,
    });
  }
}
