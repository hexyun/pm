# Vue stage view

该组件主要解决大量图片展示的问题， 并且在图片选中和查看时候提供交互能力 [demo]

## 特性

- [x] 界面支持拖拽
- [ ] 图片懒加载
- [ ] 大图（详情）支持拖拽
- [ ] 大图（详情）支持上下切换图

## 安装

```
yarn add vue-stage-view
npm install vue-stage-view
```

## 使用
```vue
<stage-view :list="list" key="url"></stage-view>
```

### props说明

- list 图片数组， 其中为对象形式
- key 图片地址对应的字段

[具体使用可参考](./examples)
       
## 开发和贡献

目前主要用于vue1.0项目中，感兴趣可升级为2.0版本，甚至以后3.0版本

## 版本规范

### 分支规范 

- master 为 vue1.0版本
- 2.x 为 vue2.x版本
- 3.x 为 vue3.x版本

### npm包规范

- 2.x 为vue2.x版本

## 文件说明

```
├── __test__  测试dist包运行
├── assets 资源文件
├── build build脚本
├── dist 生产环境目录
├── docs 预览demo目录
├── examples 预览demo源码，便于本地开发
├── src 核心源代码
```
