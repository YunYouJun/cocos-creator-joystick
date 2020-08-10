# cocos-creator-joystick

> Cocos Creator 虚拟摇杆样例

![GitHub package.json version](https://img.shields.io/github/package-json/v/YunYouJun/cocos-creator-joystick.svg?style=social)
[![Cocos Creator version](https://img.shields.io/badge/Cocos_Creator-v2.4.x-blue.svg?style=social)](https://www.cocos.com/creator)
![GitHub top language](https://img.shields.io/github/languages/top/YunYouJun/cocos-creator-joystick.svg?style=social&logo=typescript)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/YunYouJun/cocos-creator-joystick.svg?style=social&logo=visual-studio-code)

中文文档 | [English Docs](./README.en.md)

在线预览: [cocos-creator-joystick](https://yunyoujun.github.io/cocos-creator-joystick)

最新版本已使用 TypeScript 重写，更友好的结构与注释。如果您想要查看纯 JavaScript 版本，请见旧版本 [v0.0.2](https://github.com/YunYouJun/cocos-creator-joystick/releases/tag/v0.0.2)。

## 使用

### 下载

[Releases](https://github.com/YunYouJun/cocos-creator-joystick/releases)

### 通过文件导入

> Cocos Creator v2.x -> 文件 -> 资源导出... -> 选择 -> assets/demo.fire
> Cocos Creator v2.x -> 文件 -> 资源导入...

### 通过 Git

```sh
git clone https://github.com/YunYouJun/cocos-creator-joystick.git
```

将其作为项目，通过 `Cocos Creator v2.4.x` 打开。

你可以在 `demo` 场景中查看样例。

> 主菜单：开发者 -> VS Code 工作流 -> 更新 VS Code 智能提示数据 来更新已有项目的 `creator.d.ts` 文件。

## 功能

- 虚拟摇杆类型
  - [x] 固定
  - [x] 跟随
- 玩家
  - [x] 旋转
  - [x] 移动
- 触摸感应位置（自定义 Joystick 宽高）
  - [x] 全屏感应
  - [x] 半屏感应
- 节点间解耦（只需要监听 Touch 事件，而无需挂载 Player 节点至 Joystick，可控制任意多个 Player）

### 虚拟摇杆

| 属性         | 类型                                     | 默认值             | 描述         | 可自定义 |
| ------------ | ---------------------------------------- | ------------------ | ------------ | -------- |
| joystickType | JoystickType.FIXED / JoystickType.FOLLOW | JoystickType.FIXED | 虚拟摇杆类型 | √        |
| ring         | cc.Node                                  | -                  | 摇杆背景节点 | √        |
| dot          | cc.Node                                  | -                  | 摇杆操纵点   | √        |

### 玩家

| 属性        | 类型                                               | 默认值                  | 描述             | 由虚拟摇杆控制 | 可自定义 |
| ----------- | -------------------------------------------------- | ----------------------- | ---------------- | -------------- | -------- |
| rigidbody   | boolean                                            | false                   | 刚体（物理）模式 | ×              | x        |
| moveDir     | Vec2                                               | cc.v2(0, 1) // 竖直向上 | 初始移动方向     | √              | √        |
| \_speedType | SpeedType.STOP / SpeedType.NORMAL / SpeedType.FAST | SpeedType.NORMAL        | 速度类型         | √              | ×        |
| \_moveSpeed | cc.Integer                                         | 0                       | 移动速度         | ×              | ×        |
| stopSpeed   | cc.Integer                                         | 0                       | 停止时速度       | ×              | √        |
| normalSpeed | cc.Integer                                         | 100                     | 正常速度         | ×              | √        |
| fastSpeed   | cc.Integer                                         | 200                     | 加快时速度       | ×              | √        |

## 项目结构

> 逻辑文件均位于 `assets/script` 目录下

| 文件名      | 描述             | 功能                                                         |
| ----------- | ---------------- | ------------------------------------------------------------ |
| Joystick.js | 虚拟摇杆脚本文件 | 存储 Joystick 主逻辑 （包含一些类型定义与全局监听实例）      |
| Player.js   | 玩家脚本文件     | 监听 Joystick 发射的事件（可根据需要自行修改删除）           |
| UI.js       | UI               | 提供在线预览页面，玩家切换摇杆类型功能。（不需要可直接删除） |

## 其他

欢迎 `Star`, [`Issues`](https://github.com/YunYouJun/cocos-creator-joystick/issues), `Pull requests` 。

[推荐编码规范](https://docs.cocos.com/creator/manual/zh/scripting/reference/coding-standards.html)

## 开发

### 构建

```sh
npm run build
```

### 部署

```sh
npm run deploy
```

### Todo

- [ ] Keep half screen layout (now is fixed width)
- [ ] How about set dot as a child of ring?
