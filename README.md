# wdui多页面应用项目模版

## 维护

clone项目后，切换到需要维护的分支

1、npm install 安装依赖，如果装了淘宝镜像的cnpm，建议用cnpm install，安装会特别快

```
//安装淘宝镜像
$ npm install -g cnpm --registry=https://registry.npm.taobao.org

//安装依赖，相当于npm install,但是cnpm install快很多
cnpm install

```


2、npm run dev 开发调试,访问相应的页面连接即可,比如http://localhost:8081/index1.html，http://localhost:8081/test.html

3、npm run build 打包发布，发布的文件夹是dest，打包好的文件都在这文件夹里面。可以多加一级目录方便后端部署发布，比如绩效平台家了一级achievement，这样发布的代码就是'dest/achievement'里面的文件。





## 项目配置总结

1、config/index.js，build的assetsPublicPath之前是'/'，打包出来的html引入js和css就使用了绝对路径，就会找不到资源，要改成'./',才会使用相对路径引入资源，正确引入资源

2、图片路径问题，大于限制大小的图片，会被打包到dest/static/img目录下，html引用的路径按照相对路径引入，但是css的路径会多两级相对路径，所以css提取的时候，要加publicPath: '../../‘ 往上走两级路径，相对路径才会正常。这样的路径重置，才能保证两处的地址是一致的。静态图片都放到static文件夹里面

静态资源文件的publicPath还可以配置成cdn的路径，前提是js/css/img按照配置的路径发布到cdn

3、dest里面如果要放一级目录，则修改assetsRoot目录就可以了了，参考代码如下，目录名称根据具体项目命名：

```
 assetsRoot: path.resolve(__dirname, '../dest/achievement'),
 
```

4、flexbile组件目前内联到了html，后续这个组件应该发到cdn，通过了路径引入会好维护一些

5、px2rem插件由postcss-px2rem替换成[postcss-plugins-px2rem](https://npm.taobao.org/package/postcss-plugins-px2rem)，原因postcss-px2rem由注释来标示转换规则，webpack执行压缩会去掉注释，或者是用vscode编辑器格式化代码，注释会换行，都会使换算不正确

postcss-plugins-px2rem的css书写说明：

（1）对字体大小不使用rem，使用dpx (dpr px) 这个单位,按照dpr来放大 1px, 2px, 3*px 大小的字体,再按照屏幕dpr缩小, 这样就达到了字体 不缩放, 各种屏幕的字体看起来都差不多,也与屏幕宽度无关


（2）边框一般不使用rem , 使用rpx (real px), 来表示物理像素


（3）默认情况下 px 被babel-plugin-px2rem或postcss-plugins-px2rem插件转化成rem

6、项目目录是基于vue-cli修改的，代码组织的还是很不错的，多页面的入口都放在build/utils来维护，放了很多公共方法，比如vue-loder里面的css的处理和css相关的loder共用了一个cssLoaders方法来生成，我改了下如果是css相关的loder，scss需要postcss处理px2rem，加了条件判断。而postcss的处理又是在.postcssrc.js进行配置

7、项目加入了mock和express代理，方便开发和联调

打开mock，需要把src/util/config.js的 DEBUG: true设置为true,发布的时候记得设置为false

mock数据放在src/util/mock.js


express代理设置config/index.js里的proxyTable

``` 
proxyTable: {
      '/core': 'http://172.16.180.242:9094'
    },

```





## wdui的两种使用配置

### 整体引入 wdui

```
import * as wdui from 'wdui' //整体引入
import 'wdui/lib/styles/theme-default/index.css' //引入样式文件
Vue.use(wdui)

```


### 按需引入 wdui 部分组件

首先在项目中安装 babel 插件：babel-plugin-component：

```
npm i babel-plugin-component --save-dev

```

随后修改项目的 babel 配置文件：.babelr，加入 babel-plugin-component 插件：

```
 "plugins": ["transform-runtime", [
    "babel-plugin-component",
    {
      "libraryName": "wdui",
      "style": false
    }
  ]]

```

因为wdui没有单个组件的样式，单个组件的样式都打包在单个组件的js中，所以配置babelrc的时候，style的引入味false，否则打包会报错引用不到单个组件的样式

引入组件就可以这样引入

```
import {Toast} from 'wdui'

```


或是直接补全组件引用的路径，引入组件也是可以的

```
import Toast from 'wdui/lib/toast'

```

以上两种es6的引入方式，都会被babel-plugin-component转化成commonjs的引入方式，即

```
var Toast = require('wdui/lib/toast')

```

按需引入需要初始化组件和方法，请按照下面的方式初始化

```
  Vue.component(Button.name, Button)
  Vue.component(Dialog.name, Dialog)
  Vue.use(Lazyload, {try: 3})
  Vue.component(Search.name, Search)
  Vue.component(Popup.name, Popup)
  Vue.component(Tooltip.name, Tooltip)
  Vue.component(Swipe.name, Swipe)
  Vue.component(SwipeItem.name, SwipeItem)
  Vue.component(Switch.name, Switch)
  Vue.component(Radio.name, Radio)
  Vue.component(RadioGroup.name, RadioGroup)
  Vue.component(Checkbox.name, Checkbox)
  Vue.component(CheckboxGroup.name, CheckboxGroup)
  Vue.component(Scroller.name, Scroller)
  Vue.component(Header.name, Header)
  Vue.component(Tabbar.name, Tabbar)
  Vue.component(TabItem.name, TabItem)
  Vue.component(TabContainer.name, TabContainer)
  Vue.component(TabContainerItem.name, TabContainerItem)
  Vue.component(Cell.name, Cell)
  Vue.component(Badge.name, Badge)
  Vue.component(Navbar.name, Navbar)

  Vue.$Toast = Vue.prototype.$Toast = Toast
  Vue.$ActionSheet = Vue.prototype.$ActionSheet = ActionSheet
  Vue.$ImagePreview = Vue.prototype.$ImagePreview = ImagePreview
  Vue.$MessageBox = Vue.prototype.$MessageBox = MessageBox
  Vue.$Picker = Vue.prototype.$Picker = Picker

```

对于h5页面，组件最好按需加载，项目中把整体加载注释掉了，保留了按需加载


### 换肤 
开发了两套肤色覆盖之前的红色皮肤，样式的使用方式，body加class="ddjf",页面按照以下引入对应的样式：


```

import './assets/green.scss'
// import './assets/blue.scss'

```













