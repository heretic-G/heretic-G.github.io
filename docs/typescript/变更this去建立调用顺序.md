```typescript
/**
 * 1. 在编译阶段确保不能在设置 URL 和 请求方法之前调用 .send 方法
 * 2. 如果要求用户以特定顺序调用各方法，是不是更容易满足（提示：不返回this，应该返回什么）
 * 3. 在保证前两点的基础上，如果想让用户以任意顺序调用其他方法，应该如何修改设计呢？（提示：使用哪个TS特性可以在调用方法之后把方法的返回类型 ‘添加’ 到 this 类型上）
 */
type Method = "post" | "get" | "POST" | "GET";
interface RequestBuilderProps {
  url: string | null;
  method: Method | null;
  setMethods<T>(this: T, method: Method): 'setURL' extends keyof T ? Omit<T, 'setMethods'> : Omit<T, 'setMethods'> & send;
  setData(data: object): this;
  setURL<T>(this: T,url: string): 'setMethods' extends keyof T ? Omit<T, 'setURL'> : Omit<T, 'setURL'> & send;
}

interface send {
    send<T extends string>(
    value: T
  ): Promise<{ msg: string; data: object; code: number }>;
}
  
type asd = (RequestBuilderProps & send)

class RequestBuilder implements asd {
  url: string | null = null;
  method: Method | null = null;
  data: { [key: string]: any } | null = null;
  setURL<T>(this: T & RequestBuilderProps & send, url: string): 'setMethods' extends keyof T ? Omit<T, 'setURL'> : Omit<T, 'setURL'> & send {
    this.url = url;
    return this;
  }
  setMethods<T>(this: T & RequestBuilderProps & send, method: Method): 'setURL' extends keyof T ? Omit<T, 'setMethods'> : Omit<T, 'setMethods'> & send{
    this.method = method;
    return this;
  }
  setData(data: { [key: string]: any }) {
    this.data = data;
    return this;
  }
  send(value: string) {
    return new Promise<{ msg: string; data: object; code: number }>(
      (resolve, reject) => {
        resolve({
          msg: "",
          code: 200,
          data: {}
        });
      }
    );
  }
}

function create(): RequestBuilderProps {
    return new RequestBuilder()
}
const builder = create();
builder.setURL('')
builder.setMethods('post').setURL('').send('')
```

本质其实就是在操作this 这里的this来让链式可以去定义执行顺序 还是很有意思的 第一问解决了 好久没搞 感觉生疏了 先记录下 明天来优化和分析下这个流程 感觉应该可以优化

今天详细的分析了下 this这里在实现的时候 因为没有参数又用了泛型 所以这里ts在做静态分析的时候会落到unknow这里没有提示 实际的类型其实是需要等调用中去推断的

所以这里后面的&是为了实现的逻辑 然后返回的类型是在T之上去做剔除也就是剔除this上的属性 返回我们期望的属性 这里其实不影响变量空间 只是类型空间在开发中去提示开发者的用途

