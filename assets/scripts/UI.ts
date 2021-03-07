import { _decorator, Component } from "cc";
const { ccclass } = _decorator;

import { JoystickType, instance, SET_JOYSTICK_TYPE } from "./Joystick";

@ccclass("UI")
export class UI extends Component {
  /**
   * 使用固定摇杆
   */
  useFixedType() {
    instance.emit(SET_JOYSTICK_TYPE, JoystickType.FIXED);
  }

  /**
   * 使用跟随摇杆
   */
  useFollowType() {
    instance.emit(SET_JOYSTICK_TYPE, JoystickType.FOLLOW);
  }
}
