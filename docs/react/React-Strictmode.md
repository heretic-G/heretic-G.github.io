严格模式

在dev中才可以开启 

这里还进行了log第二次的禁止输出

方法定义在`ConsolePatchingDev.js` 

会在update中判断mode是`StrictLegacyMode` dev中第一次是正常的调用render 第二次会try起来再调用一次 
然后在前后关闭开启log 截取个来看下 举例`updateFunctionComponent`

```javascript
  if (__DEV__) {
    ReactCurrentOwner.current = workInProgress;
    setIsRendering(true);
    // 第一次渲染
    nextChildren = renderWithHooks(/* 这里忽略了参数 */);
    hasId = checkDidRenderIdHook();
    if (
      debugRenderPhaseSideEffectsForStrictMode &&
      workInProgress.mode & StrictLegacyMode
    ) {
      // 这里会关闭log 如果整体逻辑是幂等的 那其实这里和之前应该除了多调用一次的时耗不会产生差异
      setIsStrictModeForDevtools(true);
      try {
        // dev 严格中会触发 第二次渲染
        nextChildren = renderWithHooks(/* 这里忽略了参数 */);
        hasId = checkDidRenderIdHook();
      } finally {
        // 这里会开启log
        setIsStrictModeForDevtools(false);
      }
    }
    setIsRendering(false);
  } else {
    // 正式第一次渲染
    nextChildren = renderWithHooks(/* 这里忽略了参数 */);
    hasId = checkDidRenderIdHook();
  }
```

- 识别不安全的生命周期组件
- 有关旧式字符串ref用法的警告
- 关于使用废弃的 findDOMNode 方法的警告
- 检测意外的副作用
- 检测过时的 context API