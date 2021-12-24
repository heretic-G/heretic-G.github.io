今天才看到 Object.keys for in for of for await of 规范都约束了顺序...

特意回到老的规范看了下

    If an implementation defines a specific order of enumeration for the for-in 
    statement, that same enumeration order must be used in step 5 of this algorithm.

1. If the Type(O) is not Object, throw a TypeError exception.
2. Let n be the number of own enumerable properties of O
3. Let array be the result of creating a new Object as if by the expression new Array(n) where Array is the standard built-in constructor with that name.
4. Let index be 0.
5. For each own enumerable property of O whose name String is P 

    1. Call the [[DefineOwnProperty]] internal method of array with arguments ToString(index), the PropertyDescriptor {[[Value]]: P, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}, and false. 
    2. Increment index by 1.

6. Return array.

这里可以看到规范这里说如果实现方实现了顺序 在第5步中去实现 
规范这时还没有约束或者定义一个固定的顺序 也就是在逻辑上 object这类出来的我们要理解为无序

再看下新的 主要是OrdinaryOwnPropertyKeys


1. Let keys be a new empty List.
2. For each own property key P of O such that P is an array index, in ascending numeric index order, do
   a. Add P as the last element of keys.
3. For each own property key P of O such that Type(P) is String and P is not an array index, in ascending chronological order of property creation, do
   a. Add P as the last element of keys.
4. For each own property key P of O such that Type(P) is Symbol, in ascending chronological order of property creation, do
   a. Add P as the last element of keys.
5. Return keys.

这里看到显示index的 按照index顺序遍历 然后是string的 按照创建时间 然后按照 symbol的创建时间 

