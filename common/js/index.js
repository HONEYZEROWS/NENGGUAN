$(function () {
	function formatDateTime(theDate) {
		var _hour = theDate.getHours();
		var _minute = theDate.getMinutes();
		var _second = theDate.getSeconds();
		var _year = theDate.getFullYear()
		var _month = theDate.getMonth();
		var _date = theDate.getDate();
		if(_hour < 10) {
			_hour = "0" + _hour;
		}
		if(_minute < 10) {
			_minute = "0" + _minute;
		}
		if(_second < 10) {
			_second = "0" + _second;
		}
		_month = _month + 1;
		if(_month < 10) {
			_month = "0" + _month;
		}
		if(_date < 10) {
			_date = "0" + _date;
		}
		return _year + "-" + _month + "-" + _date + " " + _hour + ":" + _minute + ":" + _second;

	}

	var second = new Date().getTime();
	var _end = formatDateTime(new Date());
	var _startD = formatDateTime(new Date(second - (1 * 24 * 60 * 60 * 1000)));
	var _startM = formatDateTime(new Date(second - (30 * 24 * 60 * 60 * 1000)));
	
	var deviceList = ['1#', '2#', '3#', '4#', '5#', '6#', '7#', '8#', '9#', '大堂', '北1', '北2', '南1', '南2', '放映室', '办公室'];
	
	$('#dev_date_YDL').click(function () {devList(_startD)})
	$('#dev_month_YDL').click(function () {devList(_startM)})
	$('#dev_date_YDL_BL').click(function () {devList(_startD)})
	$('#dev_date_YDL_Bl').click(function () {devList(_startM)})
	
	devList(_startM,30);

	function devList (start,day) {
		var eleAryE = [];
		var eleAry = [];
		var eleAryM = [];
		var eleAryM_ZM = [];
		var eleAryM_QT = [];
		var eleAryM_ZH = [];
		var sum = 0;
		var ele_BL_KT = 0;
		var ele_BL_ZM = 0;
		var ele_BL_QT = 0;
		var eleYGGL = [];
		var allZYD = [];
		var allZGL =[];
		var allSSGL = [];

		$.ajax({
			//要用post方式     
			type: "post",
			//方法所在页面和方法名     
			url: 'http://123.56.156.91:8089/getBzRecordList?params={%22deviceIds%22:%22267,269,275,281,285,283,277,265,263,261,279,273,291,271,287,289%22}',
			dataType: "jsonp",
			jsonp: "jsonpCallback",
			success: function(data) {

				var con1 = data.data;
			
				var device1 = [con1[3], con1[4], con1[7], con1[10], con1[12], con1[11], con1[8], con1[2], con1[1], con1[0], con1[9], con1[6], con1[15], con1[5], con1[13], con1[14]];

//				console.log(device1);
				var allele,allzgl;
				var sumall = 0;
				var sumallZgl = 0;
				for(var j = 0; j < 16; j++) {
					allele = parseInt(device1[j].bzRecord.data.split(",")[0]);
					eleAryE.push(allele);
					sumall += allele;
				};

				for(var j = 0; j < 16; j++) {
					allzgl  = parseFloat(device1[j].bzRecord.data.split(",")[1]);	
//					console.log(allzgl)
					allSSGL.push(allzgl);
					sumallZgl += allzgl;
					allZGL[j] = sumallZgl;
				}
		
				//开始时间用电量
				$.ajax({
					//要用post方式     
					type: "post",
					//方法所在页面和方法名     
					url: 'http://123.56.156.91:8089/getBzRecordList?params={%22deviceIds%22:%22267,269,275,281,285,283,277,265,263,261,279,273,291,271,287,289%22,%22syncTime%22:%22' + start + '%22}',
					dataType: "jsonp",
					jsonp: "jsonpCallback",
					success: function(data) {
						//console.log(data);
						var con1 = data.data;
		
						var device1 = [con1[3], con1[4], con1[7], con1[10], con1[12], con1[11], con1[8], con1[2], con1[1], con1[0], con1[9], con1[6], con1[15], con1[5], con1[13], con1[14]];
	
						var alleleM ,allYGGL,allZYDL;
						for(var j = 0; j < 16; j++) {
							alleleM = parseInt(device1[j].bzRecord.data.split(",")[0]);
							eleAryM.push(alleleM);
						}
				
						if(eleAry.length > 0 || eleAryM.length > 0) {
							for(var i = 0; i < 16; i++) {
								eleAry[i] = eleAryE[i] - eleAryM[i];
								eleAryM_ZM[i] = parseInt(eleAryE[i]/3 - eleAryM[i]/3);
								eleAryM_QT[i] = parseInt(eleAryE[i]/4 - eleAryM[i]/4);
								eleAryM_ZH[i] = parseInt(eleAry[i] + eleAryM_ZM[i] + eleAryM_QT[i]);			
								ele_BL_KT += eleAry[i];
								ele_BL_ZM += eleAryM_ZM[i]
								ele_BL_QT += eleAryM_QT[i]
								sum += parseInt(ele_BL_KT+ele_BL_ZM+ele_BL_QT)	
							}
						} else {
						}
						dev1(eleAry,eleAryM_ZM,eleAryM_QT,eleAryM_ZH)
						dev2(ele_BL_KT,ele_BL_ZM,ele_BL_QT)
						dev3(allZGL,allSSGL)
						//总用电量
						$('.ele_ZYD').html(sumall + 'KWH');
						$('.ele_RYD').html(parseInt(sum / day) + 'KWH');
					},
					error: function(err) {
					}
				});
			},
			error: function(err) {
			}
		});
		
	}
	
	function dev1 (ele_KT, ele_ZM, ele_QT,ele_ZH) {
		var myChart = echarts.init(document.getElementById('main'));
		option = {
			backgroundColor: 'rgba(0,0,0,0.05)',
			color: ['#32cd32','#0297fe', '#cddc39','#063335'],
	    	legend: {
				icon: 'rect',
				itemWidth: 14,
				itemHeight: 5,
				itemGap: 13,
				data: ['空调', '照明', '其他','总用电'],
				right: '4%',
				textStyle: {
					fontSize: 12,
					
				}
			},
		    calculable : true,
		    grid: {
				x: 40,
				y: 40,
				x2: 0,
				y2: 30,
				borderWidth: 1
			},
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    xAxis : [
		        {
		         	type : 'category',
		            data: deviceList,
		         	axisLabel: {
						interval: 0, //0是强制显示所有标签，1是隔一个显示
						//rotate: 45, //倾斜度 -90 至 90 默认为0  
						inside: false, //标签在网格外
						//margin:2, //标签与轴线的距离，默认是8 
					}	
		        }
		    ],
		    series : [
		        {
		            name:'空调',
		            type:'bar',
		            stack: '总量',
		            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
		            barWidth:30,
		            data:ele_KT
		        },
		        {
		            name:'照明',
		            type:'bar',
		            stack: '总量',
		            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
		            barWidth:30,
		            data:ele_ZM
		        },
		        {
		            name:'其他',
		            type:'bar',
		            stack: '总量',
		            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
		            barWidth:30,
		            data:ele_QT
		        }
		        ,
		          {
		            name:'总用电',
		            type:'line',
	//	            yAxisIndex: 1,
		            data:ele_ZH
		        }
		     
		    ]
		};
		                    
		myChart.setOption(option);
	}
	
	function dev2 (ele_BL_KT, ele_BL_ZM, ele_BL_QT,ele_BL_ZH) {
		var myChart1 = echarts.init(document.getElementById('main1'));
		option1 = {
			color: ['#32cd32','#0297fe', '#cddc39','#2196f3'],
			backgroundColor: 'rgba(0,0,0,0.05)',
		    legend: {
				icon: 'rect',
				itemWidth: 14,
				itemHeight: 5,
				itemGap: 13,
				data: ['空调', '照明', '其他'],
				right: '4%',
				textStyle: {
					fontSize: 12,
					
				}
			},
		   tooltip : {
//		        trigger: 'axis',
		        axisPointer : {         
		            type : 'shadow'     
		        }
		    },
		    calculable : true,
		    series : [
		        
		        {
		            name:'区域占比',
		            type:'pie',
		            radius : [30, 110],
		          	 center : ['50%', 160],
		            roseType : 'area',
		            x: '50%',               // for funnel
		            max: 40,                // for funnel
		            sort : 'ascending',     // for funnel
		            data:[
		                {value:ele_BL_KT, name:'空调'},
		                {value:ele_BL_ZM, name:'照明'},
		                {value:ele_BL_QT, name:'其他'},
		            ]
		        }
		    ]
		};
	                                   
	myChart1.setOption(option1);
	}
	
	function dev3 (eleZGL,eleSSGL) {
		var myChart2 = echarts.init(document.getElementById('main2'));
		option2 = {
			backgroundColor: 'rgba(0,0,0,0.1)',
			color: ['#4ec3c3', '#bda7e6', '#c5b52a', '#063335'],
			legend: {
				icon: 'rect',
				itemWidth: 14,
				itemHeight: 5,
				itemGap: 13,
				data: ['总功率','实时功率'],
				right: '4%',
				textStyle: {
					fontSize: 12,
				}
			},
	
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: 'rgba(80,141,255,0.59)'
					}, {
						offset: .34,
						color: 'rgba(56,155,255,0.38)'
					}, {
						offset: 1,
						color: 'rgba(38,197,254,0.05)'
					}])
				}
			},
			grid: {
				x: 40,
				y: 40,
				x2: 30,
				y2: 30,
				borderWidth: 1
			},
			axisLabel: {
				show: true,
				rotate: 0,
				margin: 8
			},
			xAxis: [{
				type: 'category',
				boundaryGap: false,
				axisLabel: {
					margin: 10,
					textStyle: {
						fontSize: 14
					}
				},
				splitLine: {
					show: false,
				
				},
				axisLabel: {
				
				},
				axisLine: {
				
					onZero: false
				},
				data: deviceList,
				axisLabel: {
					interval: 0, //0是强制显示所有标签，1是隔一个显示
					//rotate: 45, //倾斜度 -90 至 90 默认为0  
					inside: false, //标签在网格外
					//margin:2, //标签与轴线的距离，默认是8 
				}	
			}],
			yAxis: [{
				type: 'value',
				splitNumber:10,
				axisLine: {
			
				},
				axisLabel: {
					margin: 10,
					textStyle: {
						fontSize:12
					}
				},
				splitLine: {
					show: false,
			
				}
			}],
			series: [{
				name: '总功率',
				type: 'line',
				stack: 'A',
				data: eleZGL,
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(137, 189, 27, 0.3)'
						}, {
							offset: 0.8,
							color: 'rgba(137, 189, 27, 0)'
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
						shadowBlur: 10
					}
				},
							
			},
			{
				name: '实时功率',
				type: 'line',
				stack: 'B',
				data: eleSSGL,
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(0, 136, 212, 0.3)'
						}, {
							offset: 0.8,
							color: 'rgba(0, 136, 212, 0)'
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
						shadowBlur: 10
					}
				}					
			}]
		};	
		myChart2.setOption(option2);
};

	var myChart3 = echarts.init(document.getElementById('main3'));
	var option3 = {
		backgroundColor: 'rgba(0,0,0,0.05)',
		
		title: {
			"x": '50%',
			"y": '45%',
			textAlign: "center",
			"textStyle": {
				"fontWeight": 'normal',
				"fontSize": 24
			},
			"subtextStyle": {
				"fontWeight": 'bold',
				"fontSize": 24,
				"color": '#3ea1ff'
			}
		},
		series: [{
				"name": '负荷率',
				"type": 'pie',
				"radius": ['50%', '70%'],
				"avoidLabelOverlap": false,
				"startAngle": 225,
				"color": ["#32a8ff", "transparent"],
				"hoverAnimation": false,
				"legendHoverLink": false,
				"label": {
					"normal": {
						"show": false,
						"position": 'center'
					},
					"emphasis": {
						"show": true,
						"textStyle": {
							"fontSize": '30',
							"fontWeight": 'bold'
						}
					}
				},
				"labelLine": {
					"normal": {
						"show": false
					}
				},
				"data": [{
					"value": 75,
					"name": '1'
				}, {
					"value": 25,
					"name": '2'
				}]
			},
			{
				"name": '',
				"type": 'pie',
				"radius": ['52%', '68%'],
				"avoidLabelOverlap": false,
				"startAngle": 317,
				"color": ["#fff", "transparent"],
				"hoverAnimation": false,
				"legendHoverLink": false,
				"clockwise": false,
				"itemStyle": {
					"normal": {
						"borderColor": "transparent",
						"borderWidth": "20"
					},
					"emphasis": {
						"borderColor": "transparent",
						"borderWidth": "20"
					}
				},
				"z": 10,
				"label": {
					"normal": {
						"show": false,
						"position": 'center'
					},
					"emphasis": {
						"show": true,
						"textStyle": {
							"fontSize": '30',
							"fontWeight": 'bold'
						}
					}
				},
				"labelLine": {
					"normal": {
						"show": false
					}
				},
				"data": [{
					// "value": (100 - value1) * 266 / 360,
					"name": ''
				}, {
					// "value": 100 - (100 - value1) * 266 / 360,
					"name": ''
				}]
			}

		]
	};

	setInterval(function() {
		var value = parseInt(Math.random() * 55) + 30,
			value_ = (100 - value) * 266 / 360;
	
		option3.title.subtext = value + "%";
		option3.series[1].data[0].value = value_;
		option3.series[1].data[1].value = 100 - value_;
		myChart3.setOption(option3);
	}, 3000);
	myChart3.setOption(option3);
})