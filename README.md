# ReactNative 仿2018豆瓣电影-Android
## 运行
 - 先确保你已安装好了React Native 所需的依赖环境 并且连接移动(虚拟)设备
 - 在根目录下执行 npm install
 - 在执行 react-native run-android
```
├── README.md
├── index.js
├── app.json
├── android
├── ios
├── package.json
├── src
│  │   ├── common
│  │   └── RenderList.js                                       影片排行组件
│  ├── components
│  │   ├── Detail.js                                        影片详情页
│  │   ├── HotList.js                                       热门列表
│  │   ├── Mine.js                                          我的模块
│  │   ├── PlayList.js                                      播放列表
│  │   ├── Search.js                                        搜索时触发的组件
│  │   ├── SearchInput.js                                   搜索框
│  │   ├── Seek.js                                          正在热映
│  │   ├── SoonList.js                                      找片
│  │   └── Star.js                                          评分组件
│  ├── img                                                  图片资源
│  └── index.js                                             navigation配置
└── yarn.lock
```
