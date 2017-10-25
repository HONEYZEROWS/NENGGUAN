$(function() {	
	var _name = window.location.search.substring(6)
	
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
			
	var deviceList = ['1#', '2#', '3#', '4#', '5#', '6#', '7#', '8#', '9#', '大堂', '北1', '北2', '南1', '南2', '放映室', '办公室']

	devList(_startM);

	$('#dev_date_YDL').click( function () {devList(_startD);})	
	$('#dev-month_YDL').click( function () {devList(_startM)})
	$('#dev_date_SSDL').click( function () {devList(_startD);})
	$('#dev-month_SSDL').click( function () {devList(_startM)})
	$('#dev_date_ZSJ').click(function () {devList(_startD);})
	$('#dev_month_ZSJ').click(function () {devList(_startM);})
//	$('#dev_date_AxDY').click(function () {devList(_startD);})
//	$('#dev_month_AxDY').click(function () {devList(_startM);})
//	$('#dev_date_AxDL').click(function () {devList(_startD);})
//	$('#dev_month_AxDL').click(function () {devList(_startM);})
//	$('#dev_date_AxGL').click(function () {devList(_startD);})
//	$('#dev_month_AxGL').click(function () {devList(_startM);})
//	$('#dev_date_GL').click(function () {devList(_startD);});
//	$('#dev_month_GL').click(function () {devList(_startM);})
//	$('#dev_date_SSAxDY').click(function () {devList(_startD);})
//	$('#dev_month_SSAxDY').click(function () {devList(_startM);})
//	$('#dev_date_SSAxDL').click(function () {devList(_startD);})
//	$('#dev_month_SSAxDL').click(function () {devList(_startM);})
//	$('#dev_date_SSAxGL').click(function () {devList(_startD);});
//	$('#dev_month_SSAxGL').click(function () {devList(_startM);})
	function devList (start) {
		var eleAryE = [];
		var eleAry = [];
		var eleAryM = [];
		var sum = 0;
		var eleYGGL = [];
		var eleGLYS = [];
		var allZYD = [];
		var eleAxDY = [];
		var eleBxDY = [];
		var eleCxDY = [];
		var eleAxDL = [];
		var eleBxDL = [];
		var eleCxDL = [];
		var eleAxGL = [];
		var eleBxGL = [];
		var eleCxGL = [];
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

				console.log(device1);
				var allele;
				var sumall = 0;
				for(var j = 0; j < 16; j++) {
					allele = parseInt(device1[j].bzRecord.data.split(",")[0]);
					eleAryE.push(allele);
					sumall += allele;
				}
				
				for(var j = 0; j < 16; j++) {
					allYGGL = parseFloat(device1[j].bzRecord.data.split(",")[1]).toFixed(1);
					eleYGGL.push(allYGGL);
				}
				
				for(var j = 0; j < 16; j++) {
					allGLYS = parseInt(device1[j].bzRecord.data.split(",")[14]);
					eleGLYS.push(allGLYS);
				}
				
				
				for(var j = 0; j < 16; j++) {
					allAxDY = parseFloat(device1[j].bzRecord.data.split(",")[2]);
					eleAxDY.push(allAxDY);
				}
				
				
				for(var j = 0; j < 16; j++) {
					allBxDY = parseFloat(device1[j].bzRecord.data.split(",")[3]);
					eleBxDY.push(allBxDY);
				}
				
				for(var j = 0; j < 16; j++) {
					allCxDY = parseFloat(device1[j].bzRecord.data.split(",")[4]);
					eleCxDY.push(allCxDY);
				}
				
				for(var j = 0; j < 16; j++) {
					allAxDL = parseFloat(device1[j].bzRecord.data.split(",")[5]);
					eleAxDL.push(allAxDL);
				}

				for(var j = 0; j < 16; j++) {
					allBxDL = parseFloat(device1[j].bzRecord.data.split(",")[6]);
					eleBxDL.push(allBxDL);
				}
			
				for(var j = 0; j < 16; j++) {
					allCxDL = parseFloat(device1[j].bzRecord.data.split(",")[7]);
					eleCxDL.push(allCxDL);
				}
				
				for(var j = 0; j < 16; j++) {
					allAxGL = parseFloat(device1[j].bzRecord.data.split(",")[8]);
					eleAxGL.push(allAxGL);
				}

				for(var j = 0; j < 16; j++) {
					allBxGL = parseFloat(device1[j].bzRecord.data.split(",")[9]);
					eleBxGL.push(allBxGL);
				}
				
				for(var j = 0; j < 16; j++) {
					allCxGL = parseFloat(device1[j].bzRecord.data.split(",")[10]);

					eleCxGL.push(allCxGL);
				}
				
				dev4(eleYGGL)
				dev5(eleAxDY,eleBxDY,eleCxDY)
				
				dev7(eleAxDL,eleBxDL,eleCxDL)
				dev9(eleAxDL,eleBxDL,eleCxDL)
				
				dev6(eleAxDY,eleBxDY,eleCxDY)
				dev8(eleAxGL,eleBxGL,eleCxGL)
				dev10(eleAxGL,eleBxGL,eleCxGL)
				
		
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
		
//						console.log(device1);
						
						var alleleM ,allYGGL,allHLYS,allZYDL,allAxDY,allBxDY,allCxDY,allAxDL,allBxDL,allCxDL,allAxGL,allBxGL,allCxGL;
						for(var j = 0; j < 16; j++) {
							alleleM = parseInt(device1[j].bzRecord.data.split(",")[0]);
							eleAryM.push(alleleM);
						}
						
						
						
//						for(var j = 0; j < 16; j++) {
//							allGLYS = parseInt(device1[j].bzRecord.data.split(",")[14]);
//							eleGLYS.push(allGLYS);
//						}
						
						
//						for(var j = 0; j < 16; j++) {
//							allAxDY = parseFloat(device1[j].bzRecord.data.split(",")[2]);
//							allAxDY = allAxDY.toFixed(1);
//							sumSSAxDY += parseInt(allAxDY/16);
//							eleAxDY.push(allAxDY);
//						}
//						
//						
//						for(var j = 0; j < 16; j++) {
//							allBxDY = parseFloat(device1[j].bzRecord.data.split(",")[3]);
//							allBxDY = allBxDY.toFixed(1);
//							sumSSBxDY += parseInt(allBxDY/16);
//							eleBxDY.push(allBxDY);
//						}
//						
//						for(var j = 0; j < 16; j++) {
//							allCxDY = parseFloat(device1[j].bzRecord.data.split(",")[4]);
//							allCxDY = allCxDY.toFixed(1);
//							sumSSCxDY += parseInt(allCxDY/16);
//							eleCxDY.push(allCxDY);
//						}
						
//						for(var j = 0; j < 16; j++) {
//							allAxDL = parseFloat(device1[j].bzRecord.data.split(",")[5]);
//							allAxDL = allAxDL.toFixed(1);
//							sumSSAxDL += parseInt(allAxDL/16);
//							eleAxDL.push(allAxDL);
//						}

//						for(var j = 0; j < 16; j++) {
//							allBxDL = parseFloat(device1[j].bzRecord.data.split(",")[6]);
//							allBxDL = allBxDL.toFixed(1);
//							sumSSBxDL += parseInt(allBxDL/16);
//							eleBxDL.push(allBxDL);
//						}
//						
//						for(var j = 0; j < 16; j++) {
//							allCxDL = parseFloat(device1[j].bzRecord.data.split(",")[7]);
//							allCxDL = allCxDL.toFixed(1);
//							sumSSCxDL += parseInt(allCxDL/16);
//							eleCxDL.push(allCxDL);
//						}
//						
//						for(var j = 0; j < 16; j++) {
//							allAxGL = parseFloat(device1[j].bzRecord.data.split(",")[8]);
//							allAxGL = allAxGL.toFixed(1);
//							sumSSAxGL += parseInt(allAxGL/16);
//							eleAxGL.push(allAxGL);
//						}
//
//						for(var j = 0; j < 16; j++) {
//							allBxGL = parseFloat(device1[j].bzRecord.data.split(",")[9]);
//							allBxGL = allBxGL.toFixed(1);
//							sumSSBxGL += parseInt(allBxGL/16);
//							eleBxGL.push(allBxGL);
//						}
//						
//						for(var j = 0; j < 16; j++) {
//							allCxGL = parseFloat(device1[j].bzRecord.data.split(",")[10]);
//							allCxGL = allCxGL.toFixed(1);
//							sumSSCxGL += parseInt(allCxGL/16);
//							eleCxGL.push(allCxGL);
//						}
						
						if(eleAry.length > 0 || eleAryM.length > 0) {
							for(var i = 0; i < 16; i++) {
								if (_name == 'ZM') {
									eleAry[i] = parseInt(eleAryE[i]/3 - eleAryM[i]/3);			
								} else if(_name == 'QT') {
									eleAry[i] = parseInt(eleAryE[i]/4 - eleAryM[i]/4);
								} else {
									eleAry[i] = parseInt(eleAryE[i] - eleAryM[i]);
								}
									sum += eleAry[i]
									allZYD.push(sum)
								}
						} else {}
						
						allZYDL = allZYD.pop();
	
					
						dev1(eleAry);
						dev3(eleAry,eleYGGL,eleGLYS,allZYD);
						
						
						var sort = eleAry.sort(function(a, b) {
							return a - b;
						})
//						console.log(sum)
						//总用电量
						$('#main1 p').html(sum + 'KWH');
					},
					error: function(err) {
					}
				});
			},
			error: function(err) {
			}
		});
		
	}

	function dev1(dev_M) {
		var myChart = echarts.init(document.getElementById('main'));
		var option = {
			backgroundColor: 'rgba(0,0,0,0.1)',
			color: ['#32cd32', '#0297fe', '#cddc39', '#0f4e52'],
			legend: {
				icon: 'rect',
				itemWidth: 14,
				itemHeight: 5,
				itemGap: 13,
				data: ['用电量', '用电量'],
				right: '4%',
				textStyle: {
					fontSize: 12,
	
				}
			},
			
			calculable: true,
			grid: {
				x: 40,
				y: 40,
				x2: 0,
				y2: 30,
				borderWidth: 1
			},
			yAxis: [{
				type: 'value'
			}],
			xAxis: [{
				type: 'category',
				data: deviceList,
				axisLabel: {
					interval: 0, //0是强制显示所有标签，1是隔一个显示
					//rotate: 45, //倾斜度 -90 至 90 默认为0  
					inside: false, //标签在网格外
					//margin:2, //标签与轴线的距离，默认是8 
				}	
			}],	
			series: [{
					name: '用电量',
					type: 'bar',
					stack: '总量',
					itemStyle: {
						normal: {
							label: {
								show: true,
								position: 'top'
							}
						}
					},
					barWidth: 30,
					data: dev_M
				},
	
				{
					name: '总用电量',
					type: 'line',
					//	            yAxisIndex: 1,
					data: dev_M
				}
	
			]
		};
	
		myChart.setOption(option);
	}

	function dev3 (dev_dLJ,dev_SSGL,dev_GLYS,dev_ZYDL) {
		var myChart2 = echarts.init(document.getElementById('main2'));
		option2 = {
			backgroundColor: 'rgba(0,0,0,0.1)',
			color: ['#32cd32', '#0297fe', '#cddc39', '#4265a5'],
			tooltip: {
		        trigger: 'axis'
		    },
			legend: {
				icon: 'rect',
				itemWidth: 14,
				itemHeight: 5,
				itemGap: 13,
				data: ['累计用电量', '总功率', '功率因数', '总用电量'],
				right: '4%',
				textStyle: {
					fontSize: 12,
	
				}
			},
			calculable: true,
			grid: {
				x: 40,
				y: 40,
				x2: 0,
				y2: 30,
				borderWidth: 1
			},
			yAxis: [{
				type: 'value'
			}],
			xAxis: [{
				type: 'category',
				data: deviceList,
				axisLabel: {
					interval: 0, //0是强制显示所有标签，1是隔一个显示
					//rotate: 45, //倾斜度 -90 至 90 默认为0  
					inside: false, //标签在网格外
					//margin:2, //标签与轴线的距离，默认是8 
				}	
			}],
			series: [{
					name: '累计用电量',
					type: 'line',
					smooth: true,
					itemStyle: {
						normal: {
							areaStyle: {
								type: 'default'
							}
						}
					},
					data: dev_dLJ
				},
				{
					name: '总功率',
					type: 'line',
					smooth: true,
					itemStyle: {
						normal: {
							areaStyle: {
								type: 'default'
							}
						}
					},
					data: dev_SSGL
				},
				{
					name: '功率因数',
					type: 'line',
					smooth: true,
					itemStyle: {
						normal: {
							areaStyle: {
								type: 'default'
							}
						}
					},
					data: dev_GLYS
				},
				{
					name: '总用电量',
					type: 'line',
					smooth: true,
					//	            itemStyle: {normal: {areaStyle: {type: 'default'}}},
					data: dev_ZYDL
				}
			]
		};
		myChart2.setOption(option2);
	}

	function dev4 (dev_SSGL) {
		var myChart3 = echarts.init(document.getElementById('main3'));
		option3 = {
			backgroundColor: 'rgba(0,0,0,0.1)',
			color: ['#32cd32', '#0297fe', '#cddc39', '#4265a5'],
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    calculable : true,
		    series : [
		        {
		            name:'总功率',
		            type:'pie',
		            radius : [30, 110],
		            center : ['50%','50%'],
		            roseType : 'area',
		            x: '50%',               // for funnel
		            max: 40,                // for funnel
		            sort : 'ascending',     // for funnel
		            data:[
		                {value:dev_SSGL[0], name:'1#'},
		                {value:dev_SSGL[1], name:'2#'},
		                {value:dev_SSGL[2], name:'3#'},
		                {value:dev_SSGL[3], name:'4#'},
		                {value:dev_SSGL[4], name:'5#'},
		                {value:dev_SSGL[5], name:'6#'},
		                {value:dev_SSGL[6], name:'7#'},
		                {value:dev_SSGL[7], name:'8#'},
		                {value:dev_SSGL[8], name:'9#'},
		                {value:dev_SSGL[9], name:'大堂'},
		                {value:dev_SSGL[10], name:'北1'},
		                {value:dev_SSGL[11], name:'北2'},
		                {value:dev_SSGL[12], name:'南1'},
		                {value:dev_SSGL[13], name:'南2'},
		                {value:dev_SSGL[14], name:'放映室'},
		                {value:dev_SSGL[15], name:'办公室'}
		            ]
		        }
		    ]
		};
		                    
		myChart3.setOption(option3);
	}
	
	function dev5 (eleAxDY,eleBxDY,eleCxDY) {
		var myChart4 = echarts.init(document.getElementById('main4'));
		option4 = {
			backgroundColor: 'rgba(0,0,0,0.1)',
			color: ['#32cd32', '#0297fe', '#cddc39', '#063335'],
			legend: {
				icon: 'rect',
				itemWidth: 14,
				itemHeight: 5,
				itemGap: 13,
				data: ['A相电压', 'B相电压', 'C相电压'],
				right: '4%',
				textStyle: {
					fontSize: 12,
	
				}
			},
			tooltip: {
		        trigger: 'axis'
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
				data:deviceList,
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
				min: '210',
				max: '250',
				axisLabel: {
					margin: 10,
					textStyle: {
						fontSize: 14
					}
				},
				splitLine: {
					show: false,
			
				}
			}],
			series: [{
				name: 'A相电压',
				type: 'line',
				stack: 'A',
				data: eleAxDY
			},
			{
				name: 'B相电压',
				type: 'line',
				stack: 'B',
				data: eleBxDY
			},
			{
				name: 'C相电压',
				type: 'line',
				stack: 'C',
				data: eleCxDY
			}]
		};
		myChart4.setOption(option4);
	}
	
	function dev6 (eleSSAxDY,eleSSBxDY,eleSSCxDY) {
		var myChart5 = echarts.init(document.getElementById('main5'));
	    var	option5 = {
			backgroundColor: 'rgba(0,0,0,0.1)',
			color: ['#32cd32', '#0297fe', '#cddc39', '#063335'],
			tooltip: {
		        trigger: 'axis'
		    },
			legend: {
				icon: 'rect',
				itemWidth: 14,
				itemHeight: 5,
				itemGap: 13,
				selectedMode:false,  //图例禁止点击
				data: ['A相电压', 'B相电压', 'C相电压'],
				right: '4%',
				textStyle: {
	                 color: '#707070',
	                 fontStyle: 'normal',
	                 fontWeight: 'normal',
	                 fontFamily: 'sans-serif',
	                 fontSize: 11,
	             },
			},
		    series : [
		        {
		            name:'A相电压',
		            type:'gauge',
		            z: 3,
		            min:0,
		            max:220,
		            radius : '55%',
		            splitNumber:4,
		            axisLine: {          
		                lineStyle: {     
		                    width: 4,
		                    color: [[0.2, '#32cd32'], [0.8, '#5865e6'], [1, '#63869e']]
		                }
		            },
		            axisTick: {         
		                length :14,       
		                lineStyle: {      
		                    color: 'auto'
		                }
		            },
		            axisLabel: { 
	                    textStyle: { 
	                      	fontSize : 8,
	                        shadowColor: '#fff', 
	                        shadowBlur: 10
	                    }
	                },
		            splitLine: {        
		                length :16,       
		                lineStyle: {     
		                    color: 'auto'
		                }
		            },
		            title : {
		                textStyle: {     
		                    fontWeight: 'bolder',
		                    fontSize: 10,
		                    fontStyle: 'italic'
		                }
		            },
		            detail : {
		                textStyle: {      
		                	fontSize : 22,
		                    fontWeight: 'bolder'
		                }
		            },
		            data:[{value: eleSSAxDY}]
		        },
		        {
		            name:'B相电压',
		            type:'gauge',
		            center : ['25%', '55%'], 
		            radius : '50%',
		            min:0,
		            max:200,
		            endAngle: 65,
		            splitNumber:4,
		            axisLine: {          
		                lineStyle: {     
		                    width: 3,
		                    color: [[0.2, '#63869e'], [0.8, '#0297fe'], [1, '#32cd32']]
		                }
		            },
		            axisLabel: { 
	                    textStyle: { 
	                      	fontSize : 6,
	                        shadowColor: '#fff', 
	                        shadowBlur: 10
	                    }
	                },
		            axisTick: {          
		                length :12,    
		                lineStyle: {      
		                    color: 'auto'
		                }
		            },
		            splitLine: {         
		                length :14,       
		                lineStyle: {      
		                    color: 'auto'
		                }
		            },
		            pointer: {
		                width:5
		            },
		            title : {
		                offsetCenter: [0, '-30%'],      
		            },
		            detail : {
		                textStyle: {  
		                	fontSize : 18,
		                    fontWeight: 'bolder'
		                }
		            },
		            data:[{value: eleSSBxDY}]
		        },
		         {
		            name:'C相电压',
		            type:'gauge',
		            center : ['75%', '55%'],   
		            radius : '50%',
		            min:0,
		            max:200,
		            startAngle:115,
		            splitNumber:4,
		            axisLine: {          
		                lineStyle: {      
		                    width: 3,
		                    color: [[0.2, '#32cd32'], [0.8, '#0297fe'], [1, '#63869e']]
		                }
		            },
		            axisTick: {         
		                length :12,        
		                lineStyle: {    
		                    color: 'auto'
		                }
		            },
		            splitLine: {         
		                length :14,        
		                lineStyle: {    
		                    color: 'auto'
		                }
		            },
	                axisLabel: { 
	                    textStyle: { 
	                      	fontSize : 6,
	                        shadowColor: '#fff', 
	                        shadowBlur: 10
	                    }
	                },
		            pointer: {
		                width:5
		            },
		            detail : {
		                textStyle: { 
		                	fontSize : 18,
		                    fontWeight: 'bolder'
		                }
		            },
		            data:[{value: eleSSCxDY}]
		        }
		    ]
		};
	           
		myChart5.setOption(option5);
	}
	
	function dev7 (eleAxDL,eleBxDL,eleCxDL) {
		var myChart6 = echarts.init(document.getElementById('main6'));
		option6 = {
			backgroundColor: 'rgba(0,0,0,0.1)',
			color: ['#4ec3c3', '#bda7e6', '#c5b52a', '#063335'],
			tooltip: {
		        trigger: 'axis'
		    },
			legend: {
				icon: 'rect',
				itemWidth: 14,
				itemHeight: 5,
				itemGap: 13,
				data: ['A相电流', 'B相电流', 'C相电流'],
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
						fontSize: 14
					}
				},
				splitLine: {
					show: false,
			
				}
			}],
			series: [{
				name: 'A相电流',
				type: 'line',
				stack: 'A',
				data: eleAxDL,
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
				name: 'B相电流',
				type: 'line',
				stack: 'B',
				data: eleBxDL,
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
				},						
			},
			{
				name: 'C相电流',
				type: 'line',
				stack: 'C',
				data: eleCxDL,
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(219, 50, 51, 0.3)'
						}, {
							offset: 0.8,
							color: 'rgba(219, 50, 51, 0)'
						}], false),
						shadowColor: 'rgba(0, 0, 0, 0.1)',
						shadowBlur: 10
					}
				},
				itemStyle: {
					
				},
			}]
		};
		myChart6.setOption(option6);
	}
	
	function dev9 (eleSSAxDL,eleSSBxDL,eleSSCxDL) {
		var myChart7 = echarts.init(document.getElementById('main7'));
	    var	option7 = {
			backgroundColor: 'rgba(0,0,0,0.1)',
			color: ['#32cd32', '#0297fe', '#cddc39', '#063335'],
			
			legend: {
				icon: 'rect',
				itemWidth: 14,
				itemHeight: 5,
				itemGap: 13,
				selectedMode:false,  //图例禁止点击
				data: ['A相电流', 'B相电流', 'C相电流'],
				right: '4%',
				textStyle: {
	                 color: '#707070',
	                 fontStyle: 'normal',
	                 fontWeight: 'normal',
	                 fontFamily: 'sans-serif',
	                 fontSize: 11,
	             },
			},
		    series : [
		        {
		            name:'A相电流',
		            type:'gauge',
		            z: 3,
		            min:0,
		            max:220,
		            radius : '55%',
		            splitNumber:4,
		            axisLine: {          
		                lineStyle: {     
		                    width: 4,
		                    color: [[0.2, '#32cd32'], [0.8, '#5865e6'], [1, '#63869e']]
		                }
		            },
		            axisTick: {         
		                length :14,       
		                lineStyle: {      
		                    color: 'auto'
		                }
		            },
		            axisLabel: { 
	                    textStyle: { 
	                      	fontSize : 8,
	                        shadowColor: '#fff', 
	                        shadowBlur: 10
	                    }
	                },
		            splitLine: {        
		                length :16,       
		                lineStyle: {     
		                    color: 'auto'
		                }
		            },
		            title : {
		                textStyle: {     
		                    fontWeight: 'bolder',
		                    fontSize: 10,
		                    fontStyle: 'italic'
		                }
		            },
		            detail : {
		                textStyle: {      
		                	fontSize : 22,
		                    fontWeight: 'bolder'
		                }
		            },
		            data:[{value: eleSSAxDL}]
		        },
		        {
		            name:'B相电流',
		            type:'gauge',
		            center : ['25%', '55%'], 
		            radius : '50%',
		            min:0,
		            max:200,
		            endAngle: 65,
		            splitNumber:4,
		            axisLine: {          
		                lineStyle: {     
		                    width: 3,
		                    color: [[0.2, '#63869e'], [0.8, '#0297fe'], [1, '#32cd32']]
		                }
		            },
		            axisLabel: { 
	                    textStyle: { 
	                      	fontSize : 6,
	                        shadowColor: '#fff', 
	                        shadowBlur: 10
	                    }
	                },
		            axisTick: {          
		                length :12,    
		                lineStyle: {      
		                    color: 'auto'
		                }
		            },
		            splitLine: {         
		                length :14,       
		                lineStyle: {      
		                    color: 'auto'
		                }
		            },
		            pointer: {
		                width:5
		            },
		            title : {
		                offsetCenter: [0, '-30%'],      
		            },
		            detail : {
		                textStyle: {  
		                	fontSize : 18,
		                    fontWeight: 'bolder'
		                }
		            },
		            data:[{value: eleSSBxDL}]
		        },
		         {
		            name:'C相电流',
		            type:'gauge',
		            center : ['75%', '55%'],   
		            radius : '50%',
		            min:0,
		            max:200,
		            startAngle:115,
		            splitNumber:4,
		            axisLine: {          
		                lineStyle: {      
		                    width: 3,
		                    color: [[0.2, '#32cd32'], [0.8, '#0297fe'], [1, '#63869e']]
		                }
		            },
		            axisTick: {         
		                length :12,        
		                lineStyle: {    
		                    color: 'auto'
		                }
		            },
		            splitLine: {         
		                length :14,        
		                lineStyle: {    
		                    color: 'auto'
		                }
		            },
	                axisLabel: { 
	                    textStyle: { 
	                      	fontSize : 6,
	                        shadowColor: '#fff', 
	                        shadowBlur: 10
	                    }
	                },
		            pointer: {
		                width:5
		            },
		            detail : {
		                textStyle: { 
		                	fontSize : 18,
		                    fontWeight: 'bolder'
		                }
		            },
		            data:[{value: eleSSCxDL}]
		        }
		    ]
		};
		
	                          
		myChart7.setOption(option7);
	}
	
	function dev8 (eleAxGL,eleBxGL,eleCxGL) {
		var myChart8 = echarts.init(document.getElementById('main8'));
		option8 = {
			backgroundColor: 'rgba(0,0,0,0.1)',
			color: ['#4ec3c3', '#bda7e6', '#c5b52a', '#063335'],
			legend: {
				icon: 'rect',
				itemWidth: 14,
				itemHeight: 5,
				itemGap: 13,
				data: ['A相功率', 'B相功率', 'C相功率'],
				right: '4%',
				textStyle: {
					fontSize: 12,
				}
			},
			tooltip: {
		        trigger: 'axis'
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
						fontSize: 14
					}
				},
				splitLine: {
					show: false,
			
				}
			}],
			series: [{
				name: 'A相功率',
				type: 'line',
				stack: 'A',
				data: eleAxGL						
			},
			{
				name: 'B相功率',
				type: 'line',
				stack: 'B',
				data: eleBxGL					
			},
			{
				name: 'C相功率',
				type: 'line',
				stack: 'C',
				data: eleCxGL

			}]
		};
		myChart8.setOption(option8);
	}
	
	function dev10 (eleSSAxGL,eleSSBxGL,eleSSCxGL) {
		var myChart9 = echarts.init(document.getElementById('main9'));
	    var	option9 = {
			backgroundColor: 'rgba(0,0,0,0.1)',
			color: ['#32cd32', '#0297fe', '#cddc39', '#063335'],
			legend: {
				icon: 'rect',
				itemWidth: 14,
				itemHeight: 5,
				itemGap: 13,
				selectedMode:false,  //图例禁止点击
				data: ['A相功率', 'B相功率', 'C相功率'],
				right: '4%',
				textStyle: {
	                 color: '#707070',
	                 fontStyle: 'normal',
	                 fontWeight: 'normal',
	                 fontFamily: 'sans-serif',
	                 fontSize: 11,
	             },
			},
		    series : [
		        {
		            name:'A相功率',
		            type:'gauge',
		            z: 3,
		            min:0,
		            max:220,
		            radius : '55%',
		            splitNumber:4,
		            axisLine: {          
		                lineStyle: {     
		                    width: 4,
		                    color: [[0.2, '#32cd32'], [0.8, '#5865e6'], [1, '#63869e']]
		                }
		            },
		            axisTick: {         
		                length :14,       
		                lineStyle: {      
		                    color: 'auto'
		                }
		            },
		            axisLabel: { 
	                    textStyle: { 
	                      	fontSize : 8,
	                        shadowColor: '#fff', 
	                        shadowBlur: 10
	                    }
	                },
		            splitLine: {        
		                length :16,       
		                lineStyle: {     
		                    color: 'auto'
		                }
		            },
		            title : {
		                textStyle: {     
		                    fontWeight: 'bolder',
		                    fontSize: 10,
		                    fontStyle: 'italic'
		                }
		            },
		            detail : {
		                textStyle: {      
		                	fontSize : 22,
		                    fontWeight: 'bolder'
		                }
		            },
		            data:[{value: eleSSAxGL}]
		        },
		        {
		            name:'B相功率',
		            type:'gauge',
		            center : ['25%', '55%'], 
		            radius : '50%',
		            min:0,
		            max:200,
		            endAngle: 65,
		            splitNumber:4,
		            axisLine: {          
		                lineStyle: {     
		                    width: 3,
		                    color: [[0.2, '#63869e'], [0.8, '#0297fe'], [1, '#32cd32']]
		                }
		            },
		            axisLabel: { 
	                    textStyle: { 
	                      	fontSize : 6,
	                        shadowColor: '#fff', 
	                        shadowBlur: 10
	                    }
	                },
		            axisTick: {          
		                length :12,    
		                lineStyle: {      
		                    color: 'auto'
		                }
		            },
		            splitLine: {         
		                length :14,       
		                lineStyle: {      
		                    color: 'auto'
		                }
		            },
		            pointer: {
		                width:5
		            },
		            title : {
		                offsetCenter: [0, '-30%'],      
		            },
		            detail : {
		                textStyle: {  
		                	fontSize : 18,
		                    fontWeight: 'bolder'
		                }
		            },
		            data:[{value: eleSSBxGL}]
		        },
		         {
		            name:'C相功率',
		            type:'gauge',
		            center : ['75%', '55%'],   
		            radius : '50%',
		            min:0,
		            max:200,
		            startAngle:115,
		            splitNumber:4,
		            axisLine: {          
		                lineStyle: {      
		                    width: 3,
		                    color: [[0.2, '#32cd32'], [0.8, '#0297fe'], [1, '#63869e']]
		                }
		            },
		            axisTick: {         
		                length :12,        
		                lineStyle: {    
		                    color: 'auto'
		                }
		            },
		            splitLine: {         
		                length :14,        
		                lineStyle: {    
		                    color: 'auto'
		                }
		            },
	                axisLabel: { 
	                    textStyle: { 
	                      	fontSize : 6,
	                        shadowColor: '#fff', 
	                        shadowBlur: 10
	                    }
	                },
		            pointer: {
		                width:5
		            },
		            detail : {
		                textStyle: { 
		                	fontSize : 18,
		                    fontWeight: 'bolder'
		                }
		            },
		            data:[{value: eleSSCxGL}]
		        }
		    ]
		};
	                  
		myChart9.setOption(option9);
	}
})

