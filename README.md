# huiyou

## 开发准备

```sh
yarn install
```

在 `chrome://extensions` 右上角启用开发者模式，点击「加载已解压的扩展程序」，将打包出的 `dist` 目录导入，即可在右上角和普通插件一样进行使用。

### Background 脚本开发

在 `src/background` 下编写代码，入口位于 `src/background/main.ts`。

编写完代码后

```sh
yarn build
```

在 `chrome://extensions` 重新加载插件即可进行预览。

### 气泡开发

在 `src/popup` 下编写代码，入口位于 `src/popup/main.ts`。

编写完代码后

```sh
yarn build
```

在 `chrome://extensions` 重新加载插件即可进行预览。

### 辅助页开发

在 `src/app` 下编写代码，入口位于 `src/app/main.ts`。

编写完代码后

```sh
yarn build
```

在 `chrome://extensions` 重新加载插件，点击右上角 browser action 图标即可进行预览。

### 选项页开发

在 `src/options` 下编写代码，入口位于 `src/main.ts`。

编写完代码后

```sh
yarn build
```

在 `chrome://extensions` 重新加载插件，右键点击右上角 browser action 图标 -> 选项 即可进行预览。
