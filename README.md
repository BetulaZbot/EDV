# 使用说明

``` javascript
npm run dev (（更新package包,自动读取注入components）启动)
npm run dev2 (（不更新package包,不自动读取注入components,需手动修改client）启动)
```

## 模块化系统

### 1. 模块调用后台接口

> #### VIEW/VAR
>
>``` javascript
>let worker = await $P.import('ElementName','WORKER');
>let rst = await worker.commit('WorkerName:FunctionName',param);
>```
>
>#### WORKER
>
>``` javascript
>let rst = await this.curl('COMMON:QUERY:FULLSEOURL', param);
>return rst;
>```
>
### 2. A模块调用B模块后台接口

>#### A:VIEW/VAR
>
>``` javascript
>let worker = await $P.import('B-ElementName','WORKER');
>let rst = await worker.commit('WorkerName:FunctionName',param);
>```
>
>#### B: WORKER
>
>``` javascript
>let rst = await this.curl('COMMON:QUERY:FULLSEOURL', param);
>```
>
### 3. A模块等待B模块接口被触发

>#### A:VIEW/VAR
>
>``` javascript
>let worker = await $P.import('B-ElementName','WORKER');
>//record会一直等待直到接口被触发才会返回数据，如果接口已经触发过，则数据会立即返回
>let rst = await worker.record('WorkerName:FunctionName',param);
>```
>
>#### B: WORKER
>
>``` javascript
>//worker中只有被recordRst修饰过的函数救过才能被record
>@recordRst()
>let rst = await this.curl('COMMON:QUERY:FULLSEOURL', param);
>```
>
### 4. A模块监听B模块接口被触发

>#### A:VIEW
>
>``` javascript
>let worker = await $P.import('B-ElementName','WORKER');
>//on会一直监听接口，每次接口被触发都会
>worker.on('WorkerName:FunctionName',()=>{
>//TODO
>}));
>//subscribe可以手动注销监听
>let remove = worker.subscribe('WorkerName:FunctionName',()=>{
>//TODO
>}));
>remove();
>```
>
>#### A:VIEW的修饰器写法
>
>``` javascript
>//subscribe会在组件销毁时释放
>@setListene("subscribe@B-ElementName:fullSeoUrl:getSeoLinks")
>fun1(res) {
>    //TODO
>}
>//on不会释放放
>@setListene("on@B-ElementName:fullSeoUrl:getSeoLinks")
>fun2(res) {
>    //TODO
>}
>```

### 5. B模块提供操作接口

>#### A:VIEW
>
>``` javascript
>let worker = await $P.import('B-ElementName','WORKER');
>worker.commit('WorkerName:FunctionName',()=>{
>    //TODO
>}))
>```

## 状态管理器

### 1.基本使用

``` javascript
import { db, table, setState } from 'core-dbjs'
//班级
class Class extends table {
    name
    num
    fun(){
        //指向父亲节点
        this.$PARENT
        //指向根节点
        this.$THIS
    }

}

//学校
class School extends db {
    //可以添加任意属性,这些属性都可以在VIEW层通过props获取到
    name
    location
    constructor(name, updateView) {
        super(name, updateView);
        //声明所属的表,被声明的表对应的对象将会以数组的形式存储
        this.initTables(['Class'])
        //给表新建一个对象
        let mClass = new Class();
        //将对象保存到库
        this.save(mClass);
        //删除这个对象
        this.delete(mClass);
        //返回一个数组,数组中数据可以直接在UI层使用
        this.selectFrom("Class").findAll(true);
        //返回一个数组,数组中对象都是被实例化的Class,不可以直接在UI层使用
        this.selectFrom("Class").findAll();
        //排序
        this.selectFrom("Class").orderBy('num',false).findAll();
        //条件查找
        this.selectFrom("Class").where('name == "一班"').orderBy('num',false).findAll();
        //返回一个对象
        this.selectFrom("Class").findFirst(true);
        this.selectFrom("Class").findLast(false);

    }
    //这些方法的结果无法在UI层使用,this.props.fun1 = null
    fun1(){
        return 1;
    }
    get param1(){
        return 1;
    }
    //这些方法的结果可以在UI层使用,this.props.fun2 = 1;
    @setState()
    fun2(){
        return 1;
    }
    //这些方法的结果可以在UI层使用,this.props.param3 = 1;
    @setState("param2 as param3")
    get param2(){
        return 1;
    }
}
```

### 2.VIEW层修改根节点的数据

``` javascript
 this.props.dispatch({name:0})
```

### 3.VIEW层调用根节点的func1,入参是param

``` javascript
 this.props.dispatch(param,func1)
```

### 4.VIEW层调用子节点的func1,入参是param

``` javascript
 this.props.dispatch(param,func1,Class1)
```

## 脚手架的使用

### 1.全局安装脚手架

``` bash
 npm i core-bin -g
```

### 2.在项目根目录打开终端

### 3.生成ts模块

``` bash
 core-bin create --name=demo --dir=src --type=ts
  or
 npm run create:js -- --name=xxx
```

### 3.生成js模块

``` bash
 core-bin create --name=demo --dir=src
   or
 npm run create:ts -- --name=xxx
```

## 路由问题

目前路由jump方法控制，props.history目前在view层未被实现

``` javascript
//jump和props.history路由使用是有区别的
//A跳到B时,使用jump会先改动hash,其后才会执行A,B页面的生命周期钩子
//A跳到B时,使用props.history会先执行A,B页面的生命周期钩子,其后才会改动hash
$Platform.jump('/path');
//回退，同jump
$Platform.goBack();
```

例如：页面A的url为

``` javascript
/A?pageid=1&param=2
```

当用户在页面A进行点击下一页操作时,应该主动修改路由

``` javascript
//跳到A页参数,携带参数为2,此时页面hash会变成/A?pageid=2,参数param丢失
$Platform.jump('/A',{pageid:2});
//修改本页参数,携带参数为2,此时页面hash会变成/A?pageid=2&param=2,参数param不会丢失
$Platform.changeUrlParam({pageid:2});
```

路由变化的监听

``` javascript
//VIEW下/A?pageid=1&param=2
import { setListener } from 'core-event'
//监听当前url变化
@setListener("subscribe@hashchange:/A")
jumpToNextPage(data) {
    //获取pageid
    let pageid = data.pageid;//2
    //执行查询刷新
    ...
}
//用户点击下一页操作
$Platform.changeUrlParam({pageid:2});

```

路由监听备注！！！

#### 1.A页为首页且第一次加载时，无路由变化，监听不会执行

#### 2.用户通过点击react路由组件触发的B页跳到A页，路由由/A变成/B，因为A页面的生命周期钩子于hash变化前执行，监听函数已经被注册，故此次变化会触发监听函数

#### 3.通过$platformt.jump方法或者浏览器返回触发的B页跳到A页，路由由/A变成/B，因为A页面的生命周期钩子于hash变化后执行，变化时监听函数未被注册，故此次监听不会被执行

## 本地Mock使用
脚手架支持版本为core-bin@0.0.8

0.0.8之前版本创建的模块必须手动修改以下两个文件

config/index.js

``` javascript
export const remote =  {
    "COMMON:QUERY:DEMO": 'json!SYS@GET:/path',
}
//0.0.8之前版本创建的模块应该添加如下代码
export const mock = async () => {
    return (await import('./mock.js')).mock
}
```

config/mock.js
``` javascript
//0.0.8之前版本创建的模块应该手动添加此文件
export const mock =  {
    //若果"COMMON:QUERY:DEMO"接口在此文件中有配置,则开发环境下所有"COMMON:QUERY:DEMO"请求都会返回{}
    "COMMON:QUERY:DEMO": {},
}
```