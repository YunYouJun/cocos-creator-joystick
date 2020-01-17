let JoystickEvent = cc.Class({

    properties: {
        _event: null
    },

    ctor() {
        this._event = new cc.EventTarget();
    },

    on(eventType, callFunc, target) {
        this._event.on(eventType, callFunc, target);
    },

    off(eventType, callFunc, target) {
        this._event.off(eventType, callFunc, target);
    },

    /**
     *
     * @param eventType JoystickEnum.JoystickEventType
     * @param arg
     */
    emit(eventType, ...arg) {
        this._event.emit(eventType, ...arg)
    }

});

let _instance = null;
JoystickEvent.getInstance = function () {
    !_instance && (_instance = new JoystickEvent());

    return _instance;
};

module.extends = JoystickEvent;