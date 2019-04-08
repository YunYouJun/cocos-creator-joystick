import { JoystickType } from 'JoystickCommon'

cc.Class({
	extends: cc.Component,

	properties: {
		joystick: cc.Node
	},

	onLoad () {
		this.joystick = this.joystick.getComponent('Joystick')
	},

	useFixedType () {
		this.joystick.joystickType = JoystickType.FIXED;
		this.joystick.node.opacity = 255;
	},

	useFollowType () {
		this.joystick.joystickType = JoystickType.FOLLOW;
		this.joystick.node.opacity = 0;
	}
});
