import { JoystickType, instance } from "./Joystick";

const { ccclass } = cc._decorator;

@ccclass
export default class UI extends cc.Component {
  /**
   * 使用固定摇杆
   */
  useFixedType() {
    instance.emit("change_joystick_type", JoystickType.FIXED);
  }

  /**
   * 使用跟随摇杆
   */
  useFollowType() {
    instance.emit("change_joystick_type", JoystickType.FOLLOW);
  }
}
