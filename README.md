# cocos-creator-joystick

Cocos Creator 虚拟摇杆 Demo

Online Address: <https://yunyoujun.github.io/cocos-creator-joystick/>

## Usage

### By import

Just import it ([joystick-demo.zip](https://raw.githubusercontent.com/YunYouJun/cocos-creator-joystick/master/dist/joystick-demo.zip)).

> Cocos Creator 2.x -> 文件 -> 资源导入...

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
| joystickType | JoystickType.FIXED / JoystickType.FOLLOW | JoystickType.FIXED | 虚拟摇杆类型 | √ |
| player | cc.Node | - | 挂载要控制的玩家节点 | √ |
| ring | cc.Node | - | 摇杆背景节点 | √ |
| dot | cc.Node | - | 摇杆操纵点 | √ |

### Player

| Argument | Type | Default | Description | Controled by Joystick | Customizable |
| --- | --- | --- | --- | --- | --- |
| moveDir | Vec2 | cc.v2(0, 1) // 竖直向上 | 初始移动方向 | √ | √ |
| _speedType | SpeedType.STOP / SpeedType.NORMAL / SpeedType.FAST | SpeedType.NORMAL | 速度类型 | √ | × |
| _moveSpeed | cc.Integer | 0 | 移动速度 | × | × |
| stopSpeed | cc.Integer | 0 | 停止时速度 | × | √ |
| normalSpeed | cc.Integer | 100 | 正常速度 | × | √ |
| fastSpeed | cc.Integer | 200 | 加快时速度 | × | √ |

## Structure

> assets/script

| Filename | Description | Function |
| --- | --- | --- |
| Joystick.js | 虚拟摇杆脚本文件 | 存储 Joystick 主逻辑 |
| JoystickCommon.js | 公用变量文件 | 存储公用类型定义 |
| Player.js | 玩家脚本文件 | 挂载于玩家节点上，包含玩家必要属性。（可根据需要自行修改） |
| UI.js | UI | 提供在线预览页面，玩家切换摇杆类型功能。（不需要可直接删除） |

## Dev

Issue or PR is welcome.

### Build

```sh
npm run build
```

### Deploy

```sh
npm run deploy
```
