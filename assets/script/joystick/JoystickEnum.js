export default {
    JoystickType: cc.Enum({
        FIXED: 0,
        FOLLOW: 1,
    }),

    DirectionType: cc.Enum({
        FOUR: 4,
        EIGHT: 8,
        ALL: 0,
    }),

    SpeedType: cc.Enum({
        STOP: 0,
        NORMAL: 1,
        FAST: 2
    }),

    JoystickEventType: cc.Enum({
        TOUCH_START: "touchStart",
        TOUCH_MOVE: "touchMove",
        TOUCH_END: "touchEnd",

        CHANGE_JOYSTICK_TYPE: "changeJoystickType"
    }),
};
