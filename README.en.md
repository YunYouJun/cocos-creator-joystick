# cocos-creator-joystick

> Cocos Creator Joystick Demo

![GitHub package.json version](https://img.shields.io/github/package-json/v/YunYouJun/cocos-creator-joystick.svg?style=social)
[![Cocos Creator version](https://img.shields.io/badge/Cocos_Creator-v2.x-blue.svg?style=social)](https://www.cocos.com/creator)
![GitHub top language](https://img.shields.io/github/languages/top/YunYouJun/cocos-creator-joystick.svg?style=social&logo=javascript)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/YunYouJun/cocos-creator-joystick.svg?style=social&logo=visual-studio-code)

[中文文档](./README.md) | English Docs

Online Address: <https://yunyoujun.github.io/cocos-creator-joystick/>

The latest version has been rewritten with TypeScript, with a more friendly structure and comments. If you want to view the pure JavaScript version, please see the old version [v0.0.2](https://github.com/YunYouJun/cocos-creator-joystick/releases/tag/v0.0.2).

## Usage

### Downoload

[Releases](https://github.com/YunYouJun/cocos-creator-joystick/releases)

### By import

> Cocos Creator v2.x -> File -> Export assets ... -> Choose -> assets/demo.fire
> Cocos Creator v2.x -> File -> Import assets ...

### By git

```sh
git clone https://github.com/YunYouJun/cocos-creator-joystick.git
```

Open with `Cocos Creator 2.x`.

You can see it in `demo.fire` scene.

> Go through the main menu Developer -> VS Code Workflow -> Update VS Code API Source to complete the update about `creator.d.ts`.

## Function

- Joystick Type
  - [x] Fixed
  - [x] Follow
- Player
  - [x] rotation
  - [x] move
- Touch Place (custom Joystick width and height)
  - [x] Full Screen
  - [x] Half Screen
- Decoupling between nodes (only need to monitor Touch events, without mounting the Player node to Joystick, can control many Players)

### Joystick

| Argument     | Type                                     | Default            | Description              | Customizable |
| ------------ | ---------------------------------------- | ------------------ | ------------------------ | ------------ |
| joystickType | JoystickType.FIXED / JoystickType.FOLLOW | JoystickType.FIXED | types of joystick        | √            |
| ring         | cc.Node                                  | -                  | joystick background node | √            |
| dot          | cc.Node                                  | -                  | joystick control node    | √            |

### Player

| Argument    | Type                                               | Default                    | Description                   | Controled by Joystick | Customizable |
| ----------- | -------------------------------------------------- | -------------------------- | ----------------------------- | --------------------- | ------------ |
| rigidbody   | boolean                                            | false                      | Rigidbody (Physics) mode      | ×                     | x            |
| moveDir     | Vec2                                               | cc.v2(0, 1) // straight up | initial direction of movement | √                     | √            |
| \_speedType | SpeedType.STOP / SpeedType.NORMAL / SpeedType.FAST | SpeedType.NORMAL           | speed type                    | √                     | ×            |
| \_moveSpeed | cc.Integer                                         | 0                          | speed of movement             | ×                     | ×            |
| stopSpeed   | cc.Integer                                         | 0                          | speed when stop               | ×                     | √            |
| normalSpeed | cc.Integer                                         | 100                        | normal speed                  | ×                     | √            |
| fastSpeed   | cc.Integer                                         | 200                        | fast speed                    | ×                     | √            |

## Structure

> assets/script

| Filename    | Description     | Function                                                                                                     |
| ----------- | --------------- | ------------------------------------------------------------------------------------------------------------ |
| Joystick.js | Joystick Script | store joystick main logic (include some type definitions and global events listen)                           |
| Player.js   | Player Script   | listen events emitted by Joystick (You can customize it.)                                                    |
| UI.js       | UI              | provide switch joystick type function for online preview（You can delete it directly if you don't need it.） |

## Other

Star, [`Issues`](https://github.com/YunYouJun/cocos-creator-joystick/issues) and `Pull requests` are welcome.

[Recommended coding standards](https://docs.cocos.com/creator/manual/en/scripting/reference/coding-standards.html)

## Dev

### Build

```sh
npm run build
```

### Deploy

```sh
npm run deploy
```
