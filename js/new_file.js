//调用函数
$(document).ready(function(event) {
	var wrap = $('#wrap');
	var boxes = $('#wrap').children('div');
	//加载之后获取外框和盒子
	waterfall(wrap, boxes);
	//调用瀑布流函数
	$(this).scroll(function(event){
		appendBox(wrap);
	})
	//滚动追加盒子
});
//获取索引的函数
function getIndex(minHeight, everyHeight) {
	for(index in everyHeight) {
		if(everyHeight[index] == minHeight) {
			return index;

		}
	}
};
//设置追加盒子的样式避免重复渲染
var getStartNumber=0;
var setStyle=function(box,top,left,index){
	if(getStartNumber>=index){
		//判断这个盒子需不需要设置样式
		return false;
	};
	box.css({
		'position': 'absolute',
		'top': top,
		'left': left,
	})
	getStartNumber=index;
	//把刚设置完的索引更新
};

//瀑布流函数
var waterfall=function(wrap, boxes) {
	var windowWidth = $(window).width();
	//获取屏幕的宽度
	var boxesWidth = boxes.eq(0).width() + 40;
	//获取盒子的宽度，算margin，padding需加40
	var colsNumber = Math.floor(windowWidth / boxesWidth);
	//获取屏幕显示的列数
	wrap.width(boxesWidth * colsNumber);
	//设置外框的宽度

	var everyHeight = new Array();
	//定义一个数组并储存每一列的高度
	for(var i = 0; i < boxes.length; i++) {
		if(i < colsNumber) {
			everyHeight[i] = boxes.eq(i).height() + 40;
			
			//加上内边距外边距  存上每列高度
		} else {
			var minHeight = Math.min.apply(null, everyHeight)
			//就是说数组 没有min这个方法，但是Math对象可以求最小值，有min这个方法，就需要使用call/apply来改变执行环境
			var minIndex = getIndex(minHeight, everyHeight);
			//调用函数获取最小高度的索引
			var leftValue=boxes.eq(minIndex).position().left;
			//获取这一列距离左边的距离，相对于父元素
			
			setStyle(boxes.eq(i),minHeight,leftValue,i);
			everyHeight[minIndex] += boxes.eq(i).height() + 40;
			//更新高度
		};
		boxes.eq(i).hover(function(event){
			$(this).stop().animate({
				'opacity':'0.5'
			},1000);
		},function(event){
			$(this).stop().animate({
				'opacity':'1'
			},500);
			//加hover样式
		});
	};
};


//模拟json数据
var data=[{
	"src":"2.jpg",
	"title":"图片1"
},{
	"src":"3.jpg",
	"title":"图片2"
},{
	"src":"4.jpg",
	"title":"图片3"
},{
	"src":"5.jpg",
	"title":"图片4"
},{
	"src":"6.jpg",
	"title":"图片5"
},{
	"src":"12.jpg",
	"title":"图片6"
},{
	"src":"13.jpg",
	"title":"图片7"
}];
//追加盒子函数
function appendBox(wrap){
	if(getChect(wrap)){
	for(i in data){
		var innerString='<div ><img src="img/'+data[i].src+'" /><a href="#" target="_blank">'+data[i].title+'</a></div>';
	
		wrap.append(innerString);
	};
	}else{
		return false;
	};
	waterfall(wrap,wrap.children('div'));
	//再次获取新盒子然后运用瀑布流布局
	
};

//数据检验是否追加盒子
var getChect=function(wrap){
	var documentHeight=$(window).height();
	//获取文档高度
	var scrollHeight=$(window).scrollTop();
	//获取文档向上滚动高度
	var boxes=wrap.children('div');
	var lastBoxTop=boxes.eq(boxes.length-1).offset().top;
	//最后一个盒子所在列总高度
	var lastBoxHeight=boxes.eq(boxes.length-1).height()+20;
	//最后一个盒子高度
	var lastHeight=lastBoxHeight+lastBoxTop;
	
	return documentHeight+scrollHeight>=lastHeight ? true:false;
	//用滚动高度与列高度判断是否追加
	
	
}

