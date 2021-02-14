# huiyou - 成为第一位观众

huiyou（洄游）是一个 Chrome 扩展程序，会在您浏览B站(bilibili.com)视频的间隙，偶尔推送还没有人被其他人观看过的视频。

[Chrome Web Store 安装](https://chrome.google.com/webstore/detail/huiyou/gddhijfllpcfllahgnkdanllecbcilph)

![preview](https://github.com/CLDXiang/huiyou.js/blob/main/docs/img/huiyou.jpg?raw=true)

## 初衷

1. 作为推荐系统的反面，使您能在庞杂的热门推荐信息流中暂时脱出身，在获得片刻宁静的同时，也成为了世界上除制作者外唯一一位观看过这个作品的观众。
2. 为认真用视频记录自己生活的创作者提供一点微不足道的帮助，为 TA 们的视频找到第一位观众。

## 功能

huiyou 会在您观看了一定数量视频后的某个间隙（视频关闭或暂停时）在 B 站页面右上角短暂地浮出一个小窗口，为您随机（有少许过滤条件）推送一个播放量为 0 的生活区 VLOG 视频，您点击浮窗就能前往对应视频页面，成为这个视频的第一位观众。

此外 huiyou 还提供了一些额外功能：

- 历史记录：您可以点击右上角的 huiyou 图标查看最近的推送记录，其中会展示最近向您推送过的视频，帮助您在不小心错过浮窗之后能再找出推送的视频。
- 用户自定义选项：您可以右键点击右上角的 huiyou 图标 -> 选项进入自定义选项页面，其中可以对 huiyou 的推送相关的参数、功能等进行调整。

huiyou 不会收集和上传您的任何个人数据。

## 开发相关

### 准备

```sh
yarn install
```

在 `chrome://extensions` 右上角启用开发者模式，点击「加载已解压的扩展程序」，将打包出的 `dist` 目录导入，即可在右上角和普通插件一样进行使用。

### 开发

```sh
yarn dev
```

修改代码后，在 `chrome://extensions` 重新加载插件即可进行预览。

### 打包

```sh
yarn build
```

将得到的 `dist` 目录压缩打包即可发布。
