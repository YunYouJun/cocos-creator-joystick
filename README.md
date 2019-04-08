# cocos-creator-joystick

cocos-creator-joystick demo

Cocos Creator 虚拟摇杆 Demo

Online Address: <https://yunyoujun.github.io/cocos-creator-joystick/>

## Usage

Just import it ([joystick-demo.zip](https://raw.githubusercontent.com/YunYouJun/cocos-creator-joystick/master/dist/joystick-demo.zip)) or paste code.

> 文件 -> 资源导入...

You can replace image for your demand.

## Function

- Player
  - [x] rotation
  - [x] move
- Touch Place
  - [x] Full Screen
  - [ ] Half Screen
  - [ ] Only Joystick

### Player

| Argument | Type | Default | Description | Controled by Joystick |
| --- | --- | --- | --- | --- |
| moveDir | Vec2 | cc.v2(0, 1) // 竖直向上 | 移动方向 | √ |
| _speedType | SpeedType.STOP / SpeedType.NORMAL / SpeedType.FAST | SpeedType.NORMAL | 速度类型 | √ |
| _moveSpeed | cc.Integer | 0 | 移动速度 | × |
| stopSpeed | cc.Integer | 0 | 停止时速度 | x |
| normalSpeed | cc.Integer | 100 | 正常速度 | x |
| fastSpeed | cc.Integer | 200 | 加快时速度 | x |

## Dev

Issue or PR is welcome.

### Deploy

```sh
npm run deploy
```