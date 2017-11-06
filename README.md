# 前言
> 最近在RN技术交流群中发现有不少同学在问渐变颜色的导航栏ReactNative怎么实现，有的同学说虽然实现了功能，但是滑动列表时，界面很卡顿。体验很差，正好之前开发个人RN项目[OneM](https://github.com/guangqiang-liu/OneM)中也使用到了这个效果，索性就直接开源一个导航栏渐变颜色的Demo共大家学习。

# 预览效果图
![gif](http://upload-images.jianshu.io/upload_images/6342050-322f593a9cbbe767.jpg?imageMogr2/auto-orient/strip)

# 技术要点
* `onScroll={this._onScroll.bind(this)}` ListView组件中的`onScroll` 函数是在列表滚动的就时候触发的，**注意：** 此函数调用频率极高
* `onEndReachedThreshold={20}` 此属性是用来控制ListView滚动时调用`onScroll`函数的频率
* `setNativeProps` 此属性是直接局部刷新页面UI，而不需要执行`this.setState({})`，大大的减少了`render()`函数的调用，极大的提高了列表滑动时的性能和用户体验。

# 注意点
* 最好不要在`onScroll`回调函数中执行`this.setState({})`，如果这样使用，列表页面渲染频率过高，导致列表滑动很卡顿，体验极差。

# 项目核心代码
```
_onScroll(event) {
    let y = event.nativeEvent.contentOffset.y
    let opacityPercent = y / 64
    if (y < 64) {
      this.navBar.setNativeProps({
        style: {opacity: opacityPercent}
      })
    } else {
      this.navBar.setNativeProps({
        style: {opacity: 1}
      })
    }
  }
```

# 简书详解地址
**[http://www.jianshu.com/p/2a63d1375f00](http://www.jianshu.com/p/2a63d1375f00)**

# 总结
> 此Demo项目导航栏渐变效果是按照天猫APP首页渐变导航栏开发的，同学们后期如果开发类似的功能，重新自定义UI即可。如果感觉文章对你有帮助，请 给个 **`star`** 给个 **`关注`** 谢谢。
