import { SpeedType } from "./Joystick";
const { ccclass, property } = cc._decorator;

import { instance } from "./Joystick";

@ccclass
export default class Player extends cc.Component {
  // from joystick
  @property({
    displayName: "Move Dir",
    tooltip: "移动方向",
  })
  moveDir = cc.v2(0, 1);

  @property({
    displayName: "Speed Type",
    tooltip: "速度级别",
  })
  _speedType: SpeedType = SpeedType.STOP;

  // from self
  @property({
    type: cc.Integer,
    displayName: "Move Speed",
    tooltip: "移动速度",
  })
  _moveSpeed = 0;

  @property({
    type: cc.Integer,
    displayName: "Speed When Stop",
    tooltip: "停止时速度",
  })
  stopSpeed = 0;

  @property({
    type: cc.Integer,
    tooltip: "正常速度",
  })
  normalSpeed = 100;

  @property({
    type: cc.Integer,
    tooltip: "最快速度",
  })
  fastSpeed = 200;

  onLoad() {
    instance.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    instance.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    instance.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
  }

  onTouchStart() {}

  onTouchMove(event, data) {
    this._speedType = data.speedType;
    this.moveDir = data.moveDistance;
  }

  onTouchEnd(event, data) {
    this._speedType = data.speedType;
  }

  // methods
  move() {
    this.node.angle =
      cc.misc.radiansToDegrees(Math.atan2(this.moveDir.y, this.moveDir.x)) - 90;
    const oldPos = cc.v2();
    this.node.getPosition(oldPos);
    const newPos = oldPos.add(this.moveDir.mul(this._moveSpeed / 120));
    this.node.setPosition(newPos);
  }

  update(dt) {
    switch (this._speedType) {
      case SpeedType.STOP:
        this._moveSpeed = this.stopSpeed;
        break;
      case SpeedType.NORMAL:
        this._moveSpeed = this.normalSpeed;
        break;
      case SpeedType.FAST:
        this._moveSpeed = this.fastSpeed;
        break;
      default:
        break;
    }
    this.move();
  }
}
