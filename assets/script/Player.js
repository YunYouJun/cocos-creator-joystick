import JoystickEnum from "./joystick/JoystickEnum";
import JoystickEvent from "./joystick/JoystickEvent";

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
            default: JoystickEnum.SpeedType.STOP,
            displayName: 'Speed Type',
            type: JoystickEnum.SpeedType,
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

    onLoad() {
        JoystickEvent.getInstance().on(JoystickEnum.JoystickEventType.TOUCH_START, this.onTouchStart, this);
        JoystickEvent.getInstance().on(JoystickEnum.JoystickEventType.TOUCH_MOVE, this.onTouchMove, this);
        JoystickEvent.getInstance().on(JoystickEnum.JoystickEventType.TOUCH_END, this.onTouchEnd, this);
    },

    onTouchStart() {

    },

    onTouchMove(event, data) {
        this._speedType = data.speedType;
        this.moveDir = data.moveDistance;
    },

    onTouchEnd(event, data) {
        this._speedType = data.speedType;
    },

    // methods
    move() {
        this.node.angle = cc.misc.radiansToDegrees(
            Math.atan2(this.moveDir.y, this.moveDir.x)
        ) - 90;
        let newPos = this.node.position.add(this.moveDir.mul(this._moveSpeed / 120));
        this.node.setPosition(newPos);
    },

    update(dt) {
        switch (this._speedType) {
            case JoystickEnum.SpeedType.STOP:
                this._moveSpeed = this.stopSpeed;
                break;
            case JoystickEnum.SpeedType.NORMAL:
                this._moveSpeed = this.normalSpeed;
                break;
            case JoystickEnum.SpeedType.FAST:
                this._moveSpeed = this.fastSpeed;
                break;
            default:
                break;
        }
        this.move();
    },
});
