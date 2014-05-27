# fis-command-doc #
基于FIS开发的能够生成API文档的功能模块
## dependencies ##
FIS: 1.7.0+

yuidocjs: 0.3.50
## 配置 ##
在fis-conf.js里的settings设置yuidoc的options项，目前支持输入路径（paths）和输出路径(outdir)的配置
```
settings: {
	yuidoc:{
		options:{
			paths:'trunk',
			outdir:'api'
		}				
	}
}
```

