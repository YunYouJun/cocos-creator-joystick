import JoystickEnum from 'JoystickEnum'
let JoystickEvent = require("JoystickEvent");

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

        joystickType: {
            default: JoystickEnum.JoystickType.FIXED,
            type: JoystickEnum.JoystickType,
            displayName: 'Touch Type',
            tooltip: '触摸类型',
        },

        directionType: {
            default: JoystickEnum.DirectionType.ALL,
            type: JoystickEnum.DirectionType,
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
        if (this.joystickType === JoystickEnum.JoystickType.FOLLOW) {
            this.node.opacity = 0;
        }
    },

    onEnable() {
        JoystickEvent.getInstance().on(JoystickEnum.JoystickEventType.CHANGE_JOYSTICK_TYPE, this._onChangeJoystickType, this);
    },

    onDisable() {
        JoystickEvent.getInstance().off(JoystickEnum.JoystickEventType.CHANGE_JOYSTICK_TYPE, this._onChangeJoystickType, this);
    },

    _onChangeJoystickType(type) {
        this.joystickType = type;
        this.node.opacity = type === JoystickEnum.JoystickType.FIXED ? 255 : 0;
    },

    _initTouchEvent() {
        // set the size of joystick node to control scale
        this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this);
    },

    _touchStartEvent(event) {
        JoystickEvent.getInstance().emit(JoystickEnum.JoystickEventType.TOUCH_START, "joystick touch start", 10);
        const touchPos = this.node.convertToNodeSpaceAR(event.getLocation());

        if (this.joystickType === JoystickEnum.JoystickType.FIXED) {
            this._stickPos = this.ring.getPosition();

            // 触摸点与圆圈中心的距离
            const distance = touchPos.sub(this.ring.getPosition()).mag();

            // 手指在圆圈内触摸,控杆跟随触摸点
            this._radius > distance && this.dot.setPosition(touchPos);

        } else if (this.joystickType === JoystickEnum.JoystickType.FOLLOW) {

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
        // 如果 touch start 位置和 touch move 相同，禁止移动
        if (this.joystickType === JoystickEnum.JoystickType.FOLLOW && this._touchLocation === event.getLocation()) {
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

            speedType = JoystickEnum.SpeedType.NORMAL;
        } else {
            // 控杆永远保持在圈内，并在圈内跟随触摸更新角度
            const x = this._stickPos.x + p.x * this._radius;
            const y = this._stickPos.y + p.y * this._radius;
            this.dot.setPosition(cc.v2(x, y));

            speedType = JoystickEnum.SpeedType.FAST;
        }

        JoystickEvent.getInstance().emit(JoystickEnum.JoystickEventType.TOUCH_MOVE, event, {speedType: speedType, moveDistance: p});
    },

    _touchEndEvent(event) {
        this.dot.setPosition(this.ring.getPosition());
        if (this.joystickType === JoystickEnum.JoystickType.FOLLOW) {
            this.node.opacity = 0;
        }

        JoystickEvent.getInstance().emit(JoystickEnum.JoystickEventType.TOUCH_END, event, {speedType: JoystickEnum.SpeedType.STOP});
    },

});
