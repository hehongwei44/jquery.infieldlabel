### 综合概述###

一个兼容性强，模拟占位符的通用插件(ps:自带样式)

### 兼容性###

IE6+、Chrome、Firefox、Safari、Opera

### 框架依赖###

依赖框架：`jQuery`

### 模块支持###

官网只支持浏览器环境。

支持AMD、node和浏览器可以参考我修改后的代码,github地址为：https://github.com/hehongwei44/jquery.infieldlabel

### 使用介绍(以下是定制脚本的使用方法，不建议使用官网的用法)###
1.定义结构,大致的结构如下代码所示(建议采用)，其中带infieldlabel-开头的样式不能忽略。

    <div class="infieldlabel-cnt">
      <label for="field_id" class="infieldlabel-lbl">Label Text</label>
      <input type="text" name="field_id" value=""
    	id="field_id" class="infieldlabel-ipt">
    </div>
       
2.定义样式,样式是通过class名称关联的，不建议使用id或者tagname.
    
    .infieldlabel-cnt { position:relative }
    .infieldlabel-cnt .infieldlabel-lbl { position:absolute; top:0; left:0; cursor:text }
    .infieldlabel-cnt .infieldlabel-ipt { }
    
3.调用插件，插件提供了许多配置，可以参考源码中的配置说明，如果不传入参数的话，那么，就使用默认配置。
    
    $(".infieldlabel-lbl").inFieldLabels();
    
### 下载连接###

官网：https://github.com/jquery/jquery-mousewheel
定制：https://github.com/hehongwei44/jquery.infieldlabel

### 授权信息###

授权类型：MIT

授权类型信息：https://github.com/hehongwei44/jquery.infieldlabel/blob/master/LICENSE

### 更改日志###

官网：https://github.com/dcneiner/In-Field-Labels-jQuery-Plugin/#changelog
定制：https://github.com/hehongwei44/jquery.infieldlabel/blob/master/ChangeLog.md

### 其他补充###

给予了浏览器一致性的体验，兼容性也不错。如果您觉得通过value值模仿比较坑爹的话。那么我极力推荐，
由于官网插件更新的速度比较慢，所以我对该插件做了改造，当然授权协议还是和原来一样的。主要是减去了一些冗余
，重构了一些代码，建议大家使用我重构后的代码。



