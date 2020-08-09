import { SpeedType, instance } from "./Joystick";
const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerPhysics extends cc.Component {
  // from joystick
  @property({
    displayName: "Move Dir",
    tooltip: "移动方向",
  })
  moveDir = cc.v3(0, 1, 0);

  @property({
    displayName: "Speed Type",
    tooltip: "速度级别",
  })
  _speedType = SpeedType.STOP;

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

  _body: cc.RigidBody;

  onLoad() {
    cc.director.getPhysicsManager().enabled = true;

    this._body = this.node.getComponent(cc.RigidBody);

    instance.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    instance.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    instance.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
  }

  onTouchStart() {}

  onTouchMove(event: cc.Event.EventTouch, data) {
    this._speedType = data.speedType;
    this.moveDir = data.moveDistance;
  }

  onTouchEnd(event: cc.Event.EventTouch, data) {
    this._speedType = data.speedType;
  }

  /**
   * 移动
   */
  move() {
    this.node.angle =
      cc.misc.radiansToDegrees(Math.atan2(this.moveDir.y, this.moveDir.x)) - 90;
    this._body.applyForceToCenter(
      cc.v2(this.moveDir.x * 200, this.moveDir.y * 200),
      true
    );
  }

  update(dt) {
    switch (this._speedType) {
      case SpeedType.STOP:
        this._body.linearVelocity = cc.v2(0, 0);
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
    this._speedType !== SpeedType.STOP && this.move();
  }
}
