### 泛型

在函数中我们可以使用泛型推导来定义一个灵活的类型 这个类型和传入类型一致 保证这个传入类型的基本类型约束 

```typescript

function demo<T extends number = 1> (args: T): void {}

demo()      // T 是1
demo(2)     // T 是2
demo<3>(3)  // T 是3

```

这里存在一个优先级 
1. 泛型传入类型
2. 参数传入类型
3. 泛型默认类型

有时候我们希望这里变成手动传入类型必须是手动传入的类型 也就是断开泛型推导的逻辑

官方文章可以看下 [文章](https://github.com/Microsoft/TypeScript/issues/14829)

简单来说就是使用`延迟计算`这是上面文章中提到的 (我猜其实就是ts在一部分情况下会延迟参数传递的类型赋值)

```typescript

// 文章中的一个方式
type NoInfer<T> = [T][T extends any ? 0 : never];

function demo<T extends number = 1> (args: NoInfer<T>): void {}

demo()      // T 是1
demo(2)     // T 是1
demo<3>(3)  // T 是3

```

其实这里只要是T经过extends就会开始开始停止参数的类型传递

```typescript

type NoInfer<T> = [T][T extends any ? 0 : never];

function demo<T = 3> (data:T extends 3 ? 1 : 2) {}

a(1)    // T 是3 

```

还有一个逻辑就是如果存在多个泛型时 只要传递了一个那这时候其他的都会直接跳过参数类型

```typescript

function demo<T = string, R = number> (arg1: T, arg2: R): void {}

demo(1, '1')                        // T 是 number R 是 string

demo<boolean>(true, '1')            // T 是 boolean R 是 number (这里第二个参数可能是不正确的 这里存在一个bug 官方已经记录)

demo<boolean, string>(true, '1')    // T 是 boolean R 是 string

```

这里第二个泛型在第一个有泛型存在参数的时候会停止和函数第二个参数存在联系

