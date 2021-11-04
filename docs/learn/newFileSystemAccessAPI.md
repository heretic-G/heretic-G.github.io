好的文章

* [The File System Access API: simplifying access to local files](https://web.dev/file-system-access/)
---
目前`new File System Access APIs`的API还不是很多

导致在模拟一些场景的时候有很多操作还不能像应用那样的原生


### FileSystemHandle

属性

	kind		文件还是文件夹
	name	名称
方法

	isSameEntry 和另一个handle是不是一致
	queryPermission 		查询权限			目前只有读、读和写
	requestPermission	如果没有会发起申请 	目前只有读、读和写
### FileSystemDirectoryHandle
属性

	继承FileSystemHandle
方法

	继承FileSystemHandle
	entries key是name value 是handle
	getFileHandle 
		参数	
			name
			options 
				create 没有的话创建吗
	getDirectoryHandle
		参数	
			name
			options 
				create 没有的话创建吗
	keys
	removeEntry

### FileSystemFileHandle
属性

	继承FileSystemHandle
方法

	继承FileSystemHandle
	getFile	
	createWritable 返回 FileSystemWritableFileStream 实例
### FileSystemWritableFileStream

### WritableStream

### window.showDirectoryPicker

选择一个文件夹 返回FileSystemDirectoryHandle 实例

参数

	id 		匹配目录
	startIn 	兜底目录

### window.showSaveFilePicker
选择一个文件 返回 FileSystemFileHandle 实例

参数

	id 		匹配目录
	startIn 	兜底目录
	enum WellKnownDirectory 
			desktop   documents   downloads   
			music   pictures   videos
	suggestedName 文件名称
	excludeAcceptAllOption
		Boolean 排除接受格式的选项(这里排除了就是不能选到all)
	types
		Array 
			description
			accept 
				object

### window.showOpenFilePicker
选择一个文件 返回 FileSystemFileHandle 实例

参数

	id 		匹配目录
	startIn 	兜底目录
	enum WellKnownDirectory 
			desktop   documents   downloads   
			music   pictures   videos
	multiple 
		Boolean 能否多选
	excludeAcceptAllOption
		Boolean 排除接受格式的选项(这里排除了就是不能选到all)
	types
		Array 
			description
			accept 
				object
```javascript
const params = {
	id: '',
	startIn: '',
  types: [
    {
      description: 'Images',
      accept: {
        'image/*': ['.png', '.gif', '.jpeg', '.jpg']
      }
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false
}
```

### getAsFileSystemHandle
基于file 获取handle

