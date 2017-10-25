$(function () {
	var _devId = window.location.search;
	_name = _devId.substring(_devId.length-1)
	_index = _devId.substring(18,_devId.length-7)
	_devId = _devId.substring(8,11)
	$('.all_ul>li').eq(_name).addClass('active more')
	$('.more>ul').addClass('Page')
	$('.Page li').eq(_index).addClass('active')
	// 将中国标准时间格式化为（2017-06-06 15:05:04）
	function formatDateTime(theDate) {
		var _hour = theDate.getHours();	
		var _minute = theDate.getMinutes();
		
		var _second = theDate.getSeconds();
		
		var _year = theDate.getFullYear()
		
		var _month = theDate.getMonth();
		
		var _date = theDate.getDate();
		
		if(_hour<10){_hour="0"+_hour ;}
		
		if(_minute<10){_minute="0"+_minute;  }
		
		if(_second<10){_second="0"+_second ; }
		
		_month = _month + 1;
		if(_month < 10){_month = "0" + _month;}
		
		if(_date<10){_date="0"+_date ; }
		
		return  _year + "-" + _month + "-" + _date + " " + _hour + ":" + _minute + ":" + _second ;	
	}
	var theDate = new Date();
	var _hour = theDate.getHours();
	var _minute = theDate.getMinutes();
	var _second = theDate.getSeconds();
	var _year = theDate.getFullYear();
	var _month = theDate.getMonth();
	var _date = theDate.getDate();
	if(_hour<10){_hour="0"+_hour  }
	if(_minute<10){_minute="0"+_minute  }
	if(_second<10){_second="0"+_second  }
	_month = _month + 1;
	if(_month < 10){_month = "0" + _month;}
	if(_date<10){_date="0"+_date  }
	var _endTime =  _year + "-" + _month + "-" + _date + "%20" + _hour + ":" + _minute + ":" + _second ;
	var second = new Date().getTime();
	
	var _startTime = formatDateTime(new Date(second-(24*60*60*1000)));
	
	//曲线加载
	devicehistoryslist(_devId, _startTime, _endTime)
	setInterval("devicehistoryslist(_devId, _startTime, _endTime)",90000);
	function devicehistoryslist(_devId, startdate, enddate) {
	    var _url = 'http://123.56.156.91:8081/AppInterface/queryAllBzRecord?params={%22deviceId%22:'+ _devId +',%22beginTime%22:%22' + startdate + '%22,%22endTime%22:%22' + enddate + '%22}';
	    //加载历史数据列表
	    $.ajax({
	        //要用post方式
	        type: "post",
	        //方法所在页面和方法名
	        url: _url,
	        //contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "jsonpCallback",
	        success: function (data) {
	        	//console.log(data);
	            if(data.data) {
	            	var arr1=[];var arr2=[];var arr3=[];var arr4=[];var arr5=[];var arr6=[];
	            	var arr7=[];var arr8=[];var arr9=[];var arr10=[];var arr11=[];var arr12=[];
	                
	                var data = data.data
	                var devZDN = parseInt(data[0].data.split(',')[0])
	                var datas = data.reverse()
	         	
	                var devGL = datas[0].data.split(',')[1]
	                var devGLYS = datas[0].data.split(',')[14]
	                if (_name != 0) {
	                	devZDN = parseInt(devZDN/3)
	                } else {
	                	devZDN = devZDN
	                }
	                
	                $('.topOne p').html(devZDN+'KWH')
	                $('.topTwo p').html(devGL+"KW")
	                $('.topThree p').html(devGLYS+"cosφ")
					var xlist = [];
	                for (var i = 0 ; i < datas.length; i++) {
	                    var datasArr = datas[i].data.split(",");
	                    xlist[i] = datas[i].syncTime;
	                    arr1[i] = datasArr[2];
	                    arr2[i] = datasArr[3];
	                    arr3[i] = datasArr[4];
	                    arr4[i] = datasArr[5];
	                    arr5[i] = datasArr[6];
	                    arr6[i] = datasArr[7];
	                    arr7[i] = datasArr[8];
	                    arr8[i] = datasArr[9];
	                    arr9[i] = datasArr[10];
	                    arr10[i] = datasArr[11];
	                    arr11[i] = datasArr[12];
	                    arr12[i] = datasArr[13];
               	 };
	         		
	         		dev1(xlist, arr1, arr2, arr3)
	         		dev2(xlist, arr4, arr5, arr6)
	         		dev3(xlist, arr7, arr8, arr9)
	           		dev4(xlist, arr10, arr11, arr12)
	            }else{
	                alert('此时间段没有数据');
	            }
	        },
	        error: function (err) {
	            alert('系统连接错误，请重试！');
	        }
	    });
	}
	
	
	function dev1 (xlist,data,data1,data2) {
		var myChart = echarts.init(document.getElementById('main'));
		option = {
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
				data: ['A相电压', 'B相电压', 'C相电压'],
				right: '4%',
				textStyle: {
					fontSize: 12,
				}
			},
			dataZoom: [
				{
					show: true,
					realtime: true,
					start: 0,
					end: 100,
					handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z'
				}
			],
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
				x: 50,
				y: 30,
				x2: 20,
				y2: 70,
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
				data :  xlist.map(function (str) {
						return str.replace(' ', '\n')
					})
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
				name: 'A相电压',
				type: 'line',
				stack: 'A',
				data: data,
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
				name: 'B相电压',
				type: 'line',
				stack: 'B',
				data: data1,
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
				name: 'C相电压',
				type: 'line',
				stack: 'C',
				data: data2,
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
		myChart.setOption(option);
	}


	function dev2 (xlist,data,data1,data2) {
		var myChart1 = echarts.init(document.getElementById('main1'));
		option1 = {
			backgroundColor: 'rgba(0,0,0,0.1)',
			color: ['#4ec3c3', '#bda7e6', '#c5b52a', '#063335'],
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
			tooltip: {
		        trigger: 'axis'
		    },
			dataZoom: [
				{
					show: true,
					realtime: true,
					start: 0,
					end: 100,
					handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z'
				}
			],
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
				x: 50,
				y: 30,
				x2: 20,
				y2: 70,
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
				data :  xlist.map(function (str) {
						return str.replace(' ', '\n')
					})
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
				data: data,
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
				data: data1,
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
				data: data2,
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
		myChart1.setOption(option1);
	}
	
	
	function dev3(xlist,data,data1,data2){
		var myChart2 = echarts.init(document.getElementById('main2'));
		var option2 = {
			backgroundColor: 'rgba(0,0,0,0.1)',
			grid: {
				x: 50,
				y: 30,
				x2: 20,
				y2: 70,
				borderWidth: 1
			},
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        left: 'right',
		        data: ['A相功率','B相功率', 'C相功率'],
		        inactiveColor: '#999',
		        textStyle: {
		            color: '#000'
		        }
		    },
		    dataZoom: [
						{
							show: true,
							realtime: true,
							start: 0,
							end: 100,
							handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z'
						}
				],
		    xAxis:  {
		        type: 'category',
		        boundaryGap: false,
		        data : xlist.map(function (str) {
						return str.replace(' ', '\n')
					}),
		    },
		    yAxis: [{
		        type: 'value',
		        name: '',
		        axisLabel: {
		            formatter: '{value}'
		        }
		    }],
		    series: [
		        {
		            name:'A相功率',
		            type:'line',
		            data: data,
		            itemStyle: {
		                normal: {
		                    color: 'rgb(255, 70, 131)'
		                }
		            }
		        },
		        {
		            name:'B相功率',
		            type:'line',
		            data: data1,
		            itemStyle: {
		                normal: {
		                    color: '#2388da'
		                }
		            }
		       },
		       {
		            name:'C相功率',
		            type:'line',
		            data: data2,
		            itemStyle: {
		                normal: {
		                    color: '#9C27B0'
		                }
		            }
		       }
		 ]};
		myChart2.setOption(option2);
	}
	
	function dev4(xlist,data,data1,data2){
		var myChart3 = echarts.init(document.getElementById('main3'));
		var option3 = {
			backgroundColor: 'rgba(0,0,0,0.1)',
			grid: {
				x: 50,
				y: 30,
				x2: 20,
				y2: 70,
				borderWidth: 1
			},
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        left: 'right',
		        data: ['A相功率因数','B相功率因数', 'C相功率因数'],
		        inactiveColor: '#999',
		        textStyle: {
		            color: '#000'
		        }
		    },
		    dataZoom: [
						{
							show: true,
							realtime: true,
							start: 0,
							end: 100,
							handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z'
						}
				],
		    xAxis:  {
		        type: 'category',
		        boundaryGap: false,
		        data : xlist.map(function (str) {
						return str.replace(' ', '\n')
					}),
		    },
		    yAxis: [{
		        type: 'value',
		        name: '',
		        axisLabel: {
		            formatter: '{value}'
		        }
		    }],
		    series: [
		        {
		            name:'A相功率因数',
		            type:'line',
		            data: data,
		            itemStyle: {
		                normal: {
		                    color: 'rgb(255, 70, 131)'
		                }
		            }
		        },
		        {
		            name:'B相功率因数',
		            type:'line',
		            data: data1,
		            itemStyle: {
		                normal: {
		                    color: '#2388da'
		                }
		            }
		       },
		       {
		            name:'C相功率因数',
		            type:'line',
		            data: data2,
		            itemStyle: {
		                normal: {
		                    color: '#9C27B0'
		                }
		            }
		       }
		 ]};
		myChart3.setOption(option3);
	}
})

