

分析react的源码和整体的流程 我觉得不同的角度 得到的思考都会增加我自己的理解 

```javascript
const NoContext = 0b0000        
// 这个就是没有执行任何行为时的上下文标志
const BatchedContext = 0b0001   
// batchedUpdates 批量更新 这里会在非事务逻辑中合并更新操作 
function batchedUpdates<A, R>(fn: A => R, a: A): R {
    const prevExecutionContext = executionContext;
    executionContext |= BatchedContext;
    try {
        return fn(a);
    } finally {
        executionContext = prevExecutionContext;
        resetRenderTimer();
        flushSyncCallbacksOnlyInLegacyMode();
    }
}
// flushSync 同步操作 
// 清理effect 保存上下文
// flushControlled 具体不了解 看了下这和上面都差不多 保存上下文 设立新优先级 开始跑任务

const RenderContext = 0b0010    
// renderRootSync 
// renderRootConcurrent 

const CommitContext = 0b0100    
// commitRootImpl 
// flushPassiveEffectsImpl 

const RetryAfterError = 0b1000  
// recoverFromConcurrentError 

```





