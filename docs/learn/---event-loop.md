学习笔记

题外话: WindowProxy 这个玩意是一个很nb的玩意 他让别人在访问的时候能够自始至终获取到 而不会因为内部变化导致失效

event loop 每一个代理都存在一个对于他唯一的event loop 其实也就是可以多个代理公用一个但是一个代理只能关联一个

task 存在多个queue 存在优先级 防止饿死有超时设置 一次一个

microtask 就是job 每次运行到没有

步骤流程

1.看看有没有task queues 没有直接去microtasks

2.设置oldestTask 是task queues的第一个 并从queues移除掉

3.运行任务设置为oldestTask

4.taskStartTime 为高精度时间

5.执行oldestTask 步骤

6.running task 设置为null

7.Microtasks 检查点(具体放后面)

8.hasARenderingOpportunity 为false

9.设置now为高精度时间

10.报告下task运行时间
