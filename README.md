# cocos-creator-joystick

> Cocos Creator 虚拟摇杆样例

![GitHub package.json version](https://img.shields.io/github/package-json/v/YunYouJun/cocos-creator-joystick.svg?style=social)
[![Cocos Creator version](https://img.shields.io/badge/Cocos_Creator-v2.x-blue.svg?style=social)](https://www.cocos.com/creator)
![GitHub top language](https://img.shields.io/github/languages/top/YunYouJun/cocos-creator-joystick.svg?style=social&logo=javascript)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/YunYouJun/cocos-creator-joystick.svg?style=social&logo=visual-studio-code)

中文文档 | [English Docs](./README.en.md)

在线预览: <https://yunyoujun.github.io/cocos-creator-joystick/>

## 使用

### 通过文件导入

下载 [dist/joystick-demo.zip](https://raw.githubusercontent.com/YunYouJun/cocos-creator-joystick/master/dist/joystick-demo.zip) 并通过 `Cocos Creator` 导入。

> Cocos Creator v2.x -> 文件 -> 资源导入...

### 通过 Git

```sh
git clone https://github.com/YunYouJun/cocos-creator-joystick.git
```

将其作为项目，通过 `Cocos Creator v2.x` 打开。

你可以在 `demo` 场景中查看样例。

## 功能

- 虚拟摇杆类型
  - [x] 固定
  - [x] 跟随
- 玩家
  - [x] 旋转
  - [x] 移动
- 触摸感应位置
  - [x] 全屏感应
  - [x] 半屏
  - [x] 只感应 Joystick 所在范围

### 虚拟摇杆

| 属性 | 类型 | 默认值 | 描述 | 可自定义 |
| --- | --- | --- | --- | --- |
| joystickType | JoystickType.FIXED / JoystickType.FOLLOW | JoystickType.FIXED | 虚拟摇杆类型 | √ |
| player | cc.Node | - | 挂载要控制的玩家节点 | √ |
| ring | cc.Node | - | 摇杆背景节点 | √ |
| dot | cc.Node | - | 摇杆操纵点 | √ |

### 玩家

| 属性 | 类型 | 默认值 | 描述 | 由虚拟摇杆控制 | 可自定义 |
| --- | --- | --- | --- | --- | --- |
| moveDir | Vec2 | cc.v2(0, 1) // 竖直向上 | 初始移动方向 | √ | √ |
| _speedType | SpeedType.STOP / SpeedType.NORMAL / SpeedType.FAST | SpeedType.NORMAL | 速度类型 | √ | × |
| _moveSpeed | cc.Integer | 0 | 移动速度 | × | × |
| stopSpeed | cc.Integer | 0 | 停止时速度 | × | √ |
| normalSpeed | cc.Integer | 100 | 正常速度 | × | √ |
| fastSpeed | cc.Integer | 200 | 加快时速度 | × | √ |

## 项目结构

> 逻辑文件均位于 `assets/script` 目录下

| 文件名 | 描述 | 功能 |
| --- | --- | --- |
| Joystick.js | 虚拟摇杆脚本文件 | 存储 Joystick 主逻辑 |
| JoystickEnum.js | 虚拟摇杆枚举文件 | 存储摇杆类型定义、事件定义 |
| JoystickEvent.js | 虚拟摇杆事件类 | 存储摇杆事件管理器 |
| Player.js | 玩家脚本文件 | 可根据需求通过JoystickEvent监听JoystickEnum.JoystickEventType。（可根据需要自行修改） |
| PlayerPhysics.js | 玩家脚本文件 | 可根据需求通过JoystickEvent监听JoystickEnum.JoystickEventType。（可根据需要自行修改） |
| UI.js | UI | 提供在线预览页面，玩家切换摇杆类型功能。（不需要可直接删除） |

## 其他

欢迎 `Star`, [`Issues`](https://github.com/YunYouJun/cocos-creator-joystick/issues), `Pull requests` 。

## 开发

### 构建

```sh
npm run build
```

### 部署

```sh
npm run deploy
```
