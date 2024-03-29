

存在两个堆 taskQueue timerQueue
```javascript
// 正常的一个task id是自增的
// callback 就是 需要执行的任务
// priorityLevel 分五级 ImmediatePriority UserBlockingPriority IdlePriority LowPriority NormalPriority
// 对应的五个timeout时间  -1  250 5000 10000  最大数(这里含义就是没有限制)
// startTime 对应当前时间+delay
// expirationTime 对应startTime+timeout
// sortIndex 这里在存在delay的时候是startTime 如果不是延时是expirationTime
var newTask = {
    id: taskIdCounter++,
    callback,
    priorityLevel,
    startTime,
    expirationTime,
    sortIndex: -1,
  };
```

正常来说都是封装的task推入堆 这里有两个判断一个是延时任务 一个是非延时任务

如果只存在延时任务 会设置一个延时定时 到时间后会把到期延时尽可能多的往task中扔 

如果task存在任务 并且当前没有运行任务 scheduledHostCallback为flushWork 然后一个deadLine 直接开启workLoop
那这里重点就是workLoop
```javascript
function workLoop(hasTimeRemaining, initialTime) {
  let currentTime = initialTime;
  advanceTimers(currentTime); // 延时任务到期扔到task
  currentTask = peek(taskQueue); 取出最上面的
  while (
    currentTask !== null &&
    !(enableSchedulerDebugging && isSchedulerPaused)
  ) {
    if (
      currentTask.expirationTime > currentTime &&
      (!hasTimeRemaining || shouldYieldToHost())
    ) {
      // 任务没过期需要断开
      break;
    }
    // 如果不存在callback 直接说明上次跑完了 
    const callback = currentTask.callback;
    if (typeof callback === 'function') {
      // 存在callback说明是需要继续的
      currentTask.callback = null;
      currentPriorityLevel = currentTask.priorityLevel;
      const didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
      // 算下时间 继续跑
      const continuationCallback = callback(didUserCallbackTimeout);
      currentTime = getCurrentTime();
      // 还有fun就是没跑完 没跑完 存起来 跑完直接扔掉task
      if (typeof continuationCallback === 'function') {
        currentTask.callback = continuationCallback;
      } else {
        if (currentTask === peek(taskQueue)) {
          pop(taskQueue);
        }
      }
      advanceTimers(currentTime);
    } else {
      pop(taskQueue);
    }
    currentTask = peek(taskQueue);
  }
  // 无论是当前没跑完还是task还存在任务都是true 这里会交出控制前到host上
  if (currentTask !== null) {
    return true;
  } else {
    const firstTimer = peek(timerQueue);
    if (firstTimer !== null) {
      requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
    }
    return false;
  }
}
```
这里有一个点是task需要自己存在中断去做返回 不然loop也抢不走

在运行的时候会记录运行开始时间 然后去比对 这里比对存在4个值 

frameInterval continuousInputInterval maxInterval needsPaint

- 第一个是5ms 这个是5ms以内一定不退出直接继续运行 即使这里存在需要渲染 5ms 也不影响一些内容也就是上一次的渲染和当前也就是5ms 以内 不会导致帧数降低很多
- 第二个大于5ms需要渲染 直接跳出 先去渲染 这里保证了react在整体占用时间只会在必须渲染中占据5ms 也保证了渲染帧数
- 第三个50ms 这里依赖了一个host的新的api navigator.scheduling.isInputPending 也保证不会一直断开 如果没有输入行为就占据50ms可以不跳出
- 第四个300ms这里也是依赖的新api不过这里传递了一些参数 不过我没找到这些参数的含义是什么 估计也是一些浏览器提供的行为判断 应该比输入行为更低的行为 最长可以300ms 超过300必须交出控制权一次

这里交出也是一些更低优先级的任务可以执行 还有就是如果这里不存在事件一地断开的成本 timeout是1ms以上 一般在1.3 一个MessageChannel大概可能0.3-0.7
这里一般的占比已经低于3% 正常如果一个行为的时间低到1%一下 就可以认为他不占时间 你可以看各种在设计上面都差不多类似我们要限制占地 又要限制大小
都是尽量让占比在3%一下或者更低1%一些的时候就可以了

哦对了还有个 forceFrameRate 基于帧数去调整间隔的 这个只是第一个frameInterval的时间设置 不过目前还想没有对外暴露出来 

看下几个重点的fun

flushWork 开启刷出work

workLoop 这里是决定运行谁 是不是要跳出 

advanceTimers 把timer 扔到task

unstable_scheduleCallback 添加work的

requestHostTimeout 延时任务这里

requestHostCallback 正常开始这里

schedulePerformWorkUntilDeadline 控制权交出的fun 优先SetImmediate > MessageChannel > setTimeout

isMessageLoopRunning 是不是有任务在跑

scheduledHostCallback 实际这里的callback 就是flushWork


[图片来自于](https://www.yuque.com/docs/share/8c167e39-1f5e-4c6d-8004-e57cf3851751)
![img.png](img.png)