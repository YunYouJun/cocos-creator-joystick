import { SpeedType } from 'JoystickCommon'

cc.Class({
  extends: cc.Component,
  properties: {

    // from joystick
    moveDir: {
      default: cc.v2(0, 1),
      displayName: 'Move Dir',
      tooltip: '移动方向',
    },
    _speedType: {
      default: SpeedType.STOP,
      displayName: 'Speed Type',
      type: SpeedType,
      tooltip: '速度级别'
    },

    // from self
    _moveSpeed: {
      default: 0,
      displayName: 'Move Speed',
      tooltip: '移动速度'
    },

    stopSpeed: {
      default: 0,
      type: cc.Integer,
      tooltip: '停止时速度'
    },
    normalSpeed: {
      default: 100,
      type: cc.Integer,
      tooltip: '正常速度'
    },
    fastSpeed: {
      default: 200,
      type: cc.Integer,
      tooltip: '最快速度'
    }

  },

  // methods
  move () {
    this.node.rotation = 90 - cc.misc.radiansToDegrees(
      Math.atan2(this.moveDir.y, this.moveDir.x)
    );
    let newPos = this.node.position.add(this.moveDir.mul(this._moveSpeed / 60));
    this.node.setPosition(newPos);
  },

  update (dt) {
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
    // console.log(this.moveDir)
    // console.log(this._moveSpeed)
  },
});
