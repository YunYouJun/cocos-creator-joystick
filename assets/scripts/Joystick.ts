import {
  _decorator,
  EventTarget,
  Component,
  Node,
  Enum,
  UIOpacity,
  UITransform,
  EventTouch,
  SystemEventType,
  Vec3,
  Vec2,
  Size,
  CCInteger,
} from "cc";
const { ccclass, property } = _decorator;

/**
 * 全局事件监听实例
 */
export const instance = new EventTarget();

export const SET_JOYSTICK_TYPE = "SET_JOYSTICK_TYPE";

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

export interface JoystickDataType {
  speedType: SpeedType;
  /**
   * 移动向量
   */
  moveVec: Vec3;
}

/**
 * 摇杆类
 */
@ccclass("Joystick")
export class Joystick extends Component {
  @property({
    type: Node,
    displayName: "Dot",
    tooltip: "摇杆操纵点",
  })
  dot: Node | null = null;

  @property({
    type: Node,
    displayName: "Ring",
    tooltip: "摇杆背景节点",
  })
  ring: Node | null = null;

  @property({
    type: Enum(JoystickType),
    displayName: "Touch Type",
    tooltip: "触摸类型",
  })
  joystickType = JoystickType.FIXED;

  @property({
    type: Enum(DirectionType),
    displayName: "Direction Type",
    tooltip: "方向类型",
  })
  directionType = DirectionType.ALL;

  @property({
    type: Vec3,
    tooltip: "摇杆所在位置",
  })
  _stickPos = new Vec3();

  @property({
    type: Vec2,
    tooltip: "触摸位置",
  })
  _touchLocation = new Vec2();

  @property({
    type: CCInteger,
    displayName: "Ring Radius",
    tooltip: "半径",
  })
  radius = 50;

  onLoad() {
    if (!this.dot) {
      console.warn("Joystick Dot is null!");
      return;
    }

    if (!this.ring) {
      console.warn("Joystick Ring is null!");
      return;
    }

    const uiTransform = this.ring.getComponent(UITransform);
    const size = this.radius * 2;
    const ringSize = new Size(size, size);
    uiTransform?.setContentSize(ringSize);
    this.ring
      .getChildByName("bg")!
      .getComponent(UITransform)
      ?.setContentSize(ringSize);

    this._initTouchEvent();
    // hide joystick when follow
    const uiOpacity = this.node.getComponent(UIOpacity);
    if (this.joystickType === JoystickType.FOLLOW && uiOpacity) {
      uiOpacity.opacity = 0;
    }
  }

  /**
   * 启用时
   */
  onEnable() {
    instance.on(SET_JOYSTICK_TYPE, this._onSetJoystickType, this);
  }

  /**
   * 禁用时
   */
  onDisable() {
    instance.off(SET_JOYSTICK_TYPE, this._onSetJoystickType, this);
  }

  /**
   * 改变摇杆类型
   * @param type
   */
  _onSetJoystickType(type: JoystickType) {
    this.joystickType = type;
    const uiOpacity = this.node.getComponent(UIOpacity);
    if (uiOpacity) {
      uiOpacity.opacity = type === JoystickType.FIXED ? 255 : 0;
    }
  }

  /**
   * 初始化触摸事件
   */
  _initTouchEvent() {
    // set the size of joystick node to control scale
    this.node.on(SystemEventType.TOUCH_START, this._touchStartEvent, this);
    this.node.on(SystemEventType.TOUCH_MOVE, this._touchMoveEvent, this);
    this.node.on(SystemEventType.TOUCH_END, this._touchEndEvent, this);
    this.node.on(SystemEventType.TOUCH_CANCEL, this._touchEndEvent, this);
  }

  /**
   * 触摸开始回调函数
   * @param event
   */
  _touchStartEvent(event: EventTouch) {
    if (!this.ring || !this.dot) return;

    instance.emit(SystemEventType.TOUCH_START, event);

    const location = event.getUILocation();
    const touchPos = new Vec3(location.x, location.y);

    if (this.joystickType === JoystickType.FIXED) {
      this._stickPos = this.ring.getPosition();

      // 相对中心的向量
      const moveVec = touchPos.subtract(this.ring.getPosition());
      // 触摸点与圆圈中心的距离
      const distance = moveVec.length();

      // 手指在圆圈内触摸,控杆跟随触摸点
      if (this.radius > distance) {
        this.dot.setPosition(moveVec);
      }
    } else if (this.joystickType === JoystickType.FOLLOW) {
      // 记录摇杆位置，给 touch move 使用
      this._stickPos = touchPos;
      this.node.getComponent(UIOpacity)!.opacity = 255;
      this._touchLocation = event.getUILocation();
      // 更改摇杆的位置
      this.ring.setPosition(touchPos);
      this.dot.setPosition(new Vec3());
    }
  }

  /**
   * 触摸移动回调函数
   * @param event
   */
  _touchMoveEvent(event: EventTouch) {
    if (!this.dot || !this.ring) return;

    // 如果 touch start 位置和 touch move 相同，禁止移动
    if (
      this.joystickType === JoystickType.FOLLOW &&
      this._touchLocation === event.getUILocation()
    ) {
      return false;
    }

    // 以圆圈为锚点获取触摸坐标
    const location = event.getUILocation();
    const touchPos = new Vec3(location.x, location.y);
    // move vector
    const moveVec = touchPos.subtract(this.ring.getPosition());
    const distance = moveVec.length();

    let speedType = SpeedType.NORMAL;
    if (this.radius > distance) {
      this.dot.setPosition(moveVec);
      speedType = SpeedType.NORMAL;
    } else {
      // 控杆永远保持在圈内，并在圈内跟随触摸更新角度
      this.dot.setPosition(moveVec.normalize().multiplyScalar(this.radius));
      speedType = SpeedType.FAST;
    }

    instance.emit(SystemEventType.TOUCH_MOVE, event, {
      speedType,
      moveVec: moveVec.normalize(),
    });
  }

  /**
   * 触摸结束回调函数
   * @param event
   */
  _touchEndEvent(event: EventTouch) {
    if (!this.dot || !this.ring) return;

    this.dot.setPosition(new Vec3());
    if (this.joystickType === JoystickType.FOLLOW) {
      this.node.getComponent(UIOpacity)!.opacity = 0;
    }

    instance.emit(SystemEventType.TOUCH_END, event, {
      speedType: SpeedType.STOP,
    });
  }
}
