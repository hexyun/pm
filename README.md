### 任务列表2的数据逻辑

task更新数据》mergeData合并缓存》mergedDataCopy深拷贝》taskListSortControl，根据mergedDataCopy排序，排序结果是mergedData》updateVisibleData更新视图

### 需要注意
如果更改数据的同时进行了排序（添加，删除），那就不用更改mergedData，排序方法会自动更改，如果没有进行排序就都需要更改*（任务完成等状态），组件内部方法changeGetItem/changeGetChildrenItem是封装好用来更改指定id和子级的方法，直接调用就会更改两个数据

### 关于排序
默认排序如果不需要回复滚动条，就不需要传参数，需要回复滚动条就传个default

### 关于缓存
最多存储5个列表数据，防止缓存爆掉，先入先出

### 关于负责人修改
没有更改的内容不会触发修改事件

### 关于滚动
添加删除在没有超过屏幕范围是不会触发自动滚动，超出范围会自动滚动到中间位置
