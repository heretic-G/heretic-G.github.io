eagerState 是用来做bailOut提前优化的 

正常bailOut的流程是在render后发现不需要变化 就阻止了后续的commit和子组件的一系列行为 这里如果多次阻止其实会存在性能浪费

eagerState就是为了能更早的知道不需要变更的行为而引入的东西 

这里实际是存了上一次的eagerState和eagerReducer (reducer 这里其实就是basicStateReducer 这里并未看到其他的reducer的可能)

然后使用新的state扔到reducer然后看出来的结果和eagerState是否一致 (这里会存在的问题是 如果是引用类型肯定是不同的 会导致eagerState无法生效 所以在使用上期望useState都是原始类型 以保证这里的优化可以提前生效)

还有一个点是eagerState不会在第一次生效或者说在切换Fiber 树时 因为上一次发生过更新 导致实际的上面挂载这lane 这里在进入eagerState中 会判断新老Fiber的lane是不是都是NoLane 才会进入到计算比较流程

所以在0 -> 1 -> 1 -> 1 的变化流程中 第一次变化发生变更 第二次变化虽然一致但是之前切换后的Fiber lane不是NoLane 所以这里会到bailOut跳出
第二次才会命中eagerState的优化流程 暂时没想到这里的情况是防止那种情况出现优化错误的场景