# cocos-creator-joystick

> Cocos Creator Joystick Demo

![GitHub package.json version](https://img.shields.io/github/package-json/v/YunYouJun/cocos-creator-joystick.svg?style=social)
[![Cocos Creator version](https://img.shields.io/badge/Cocos_Creator-v2.x-blue.svg?style=social)](https://www.cocos.com/creator)
![GitHub top language](https://img.shields.io/github/languages/top/YunYouJun/cocos-creator-joystick.svg?style=social&logo=javascript)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/YunYouJun/cocos-creator-joystick.svg?style=social&logo=visual-studio-code)

[中文文档](./README.md) | English Docs

Online Address: <https://yunyoujun.github.io/cocos-creator-joystick/>

## Usage

### By import

Just import it ([joystick-demo.zip](https://raw.githubusercontent.com/YunYouJun/cocos-creator-joystick/master/dist/joystick-demo.zip)) by `Cocos Creator`.

> Cocos Creator 2.x -> File -> Import assets ...

### By git

```sh
git clone https://github.com/YunYouJun/cocos-creator-joystick.git
```

Open with `Cocos Creator 2.x`.

You can see it in `demo.fire` scene.

## Function

- Joystick Type
  - [x] Fixed
  - [x] Follow
- Player
  - [x] rotation
  - [x] move
- Touch Place
  - [x] Full Screen
  - [ ] Half Screen
  - [ ] Only Joystick

### Joystick

| Argument | Type | Default | Description | Customizable |
| --- | --- | --- | --- | --- |
| joystickType | JoystickType.FIXED / JoystickType.FOLLOW | JoystickType.FIXED | types of joystick | √ |
| player | cc.Node | - | mount the player node to control | √ |
| ring | cc.Node | - | joystick background node | √ |
| dot | cc.Node | - | joystick control node | √ |

### Player

| Argument | Type | Default | Description | Controled by Joystick | Customizable |
| --- | --- | --- | --- | --- | --- |
| moveDir | Vec2 | cc.v2(0, 1) // straight up | initial direction of movement | √ | √ |
| _speedType | SpeedType.STOP / SpeedType.NORMAL / SpeedType.FAST | SpeedType.NORMAL | speed type | √ | × |
| _moveSpeed | cc.Integer | 0 | speed of movement  | × | × |
| stopSpeed | cc.Integer | 0 | speed when stop | × | √ |
| normalSpeed | cc.Integer | 100 | normal speed | × | √ |
| fastSpeed | cc.Integer | 200 | fast speed | × | √ |

## Structure

> assets/script

| Filename | Description | Function |
| --- | --- | --- |
| Joystick.js | Joystick Script | store joystick main logic |
| JoystickCommon.js | Common Variable Script | store common variable |
| Player.js | Player Script | mount on the player node, include required attribute of player (You can customize it.) |
| UI.js | UI | provide switch joystick type function for online preview（You can delete it directly if you don't need it.） |

## Other

Star, [`Issues`](https://github.com/YunYouJun/cocos-creator-joystick/issues) and `Pull requests` are welcome.

## Dev

### Build

```sh
npm run build
```

### Deploy

```sh
npm run deploy
```
