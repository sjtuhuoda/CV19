var k_color = ['#bcd3bb', '#e88f70', '#edc1a5', '#9dc5c8', '#e1e8c8', '#7b7c68', '#e5b5b5', '#f0b489', '#928ea8', '#bda29a'];

function getColor(idx) {
  var palette = [
    '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
    '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
    '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
    '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
  ]
  return palette[idx % palette.length];
}
/** Data should be a list. Indices of month and day start from 0. Vol is the number of days.*/
function areapath(data,year=2019,month=11,day=0,vol=150) {
  
  myAreaPath = echarts.init(document.getElementById('areapath'));
  myAreaPath.clear();
  var base = +new Date(year, month, day);
  var oneDay = 24 * 3600 * 1000;
  var date = [];

  //var data = [Math.random() * 300];

  for (var i = 1; i < vol; i++) {
    var now = new Date(base += oneDay);
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
    //data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
  }
  //console.log(data);
  k_option_areapath = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%'];
      }
    },
    title: {
      left: 'center',
      text: '经济运行情况',
      textStyle:{
        color:'#fff'
      }
      
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        }
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: date,
      axisLine:{
        lineStyle:{
          color:'#fff'
        }
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      axisLine:{
        lineStyle:{
          color:'#fff'
        }
      }
    },
    dataZoom: [{
      type: 'inside',
      start: 0,
      end: 100
    }, {
      start: 0,
      end: 10,
      borderColor: '#fff',
      handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      handleSize: '80%',
      handleStyle: {
        color: '#fff',
        shadowBlur: 3,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffsetX: 2,
        shadowOffsetY: 2
      }
    }],
    series: [
      {
        name: 'GDP or something else',
        type: 'line',
        smooth: true,
        symbol: 'none',
        sampling: 'average',
        itemStyle: {
          color: 'rgb(255, 70, 131)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgb(255, 158, 68)'
          }, {
            offset: 1,
            color: 'rgb(255, 70, 131)'
          }])
        },
        data: data
      }
    ]
  };
  myAreaPath.setOption(k_option_areapath);
}
/** Death, cure and prediction should be lists. Indices of month and day start from 0. Vol is the number of days.*/
function barstack(cure,cureperday,death,deathperday,prediction=[],year=2019,month=11,day=0,vol=150){
  myBarStack=echarts.init(document.getElementById('barstack'));
  myBarStack.clear();

  var base = +new Date(year, month, day);
  var oneDay = 24 * 3600 * 1000;
  var date = [];

  for (var i = 1; i < vol; i++) {
    var now = new Date(base += oneDay);
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
  }

  k_option_barstack = {
    color:k_color,
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: (function(){
          if(prediction.length==0){
            return ['累计治愈','累计死亡','新增治愈','新增死亡'];
          }
          else{
            return [ '累计治愈','累计死亡','新增治愈','新增死亡', '预测模型']
          }
        })(),
        textStyle:{
          color:'#fff'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: date,
          axisLine:{
            lineStyle:{
              color:'#fff'
            }
          }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '累计人数',
            axisLine:{
              lineStyle:{
                color:'#fff'
              }
            }
        },
        {
          type: 'value',
          name: '新增人数',
          axisLine:{
            lineStyle:{
              color:'#fff'
            }
          }
      }
    ],
    dataZoom: [{
      type: 'inside',
      start: 0,
      end: 100
    }, {
      start: 0,
      end: 10,
      handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      handleSize: '80%',
      handleStyle: {
        color: '#fff',
        shadowBlur: 3,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffsetX: 2,
        shadowOffsetY: 2
      }
    }],
    series: [
      {
        name: '累计治愈',
        type: 'bar',
        stack: '累计人数',
        data: cure
      },
      {
        name: '累计死亡',
        type: 'bar',
        stack: '累计人数',
        data: death
      },
      {
        name: '新增治愈',
        type: 'bar',
        yAxisIndex: 1,
        stack: '新增人数',
        data: cureperday
      },
      {
        name: '新增死亡',
        type: 'bar',
        yAxisIndex: 1,
        stack: '新增人数',
        data: deathperday
      },
      {
        name: '预测模型',
        type: 'line',
        data: prediction
      }
    ]
};
myBarStack.setOption(k_option_barstack);
}
/** 3 lists should be equal in length. */
function agepie(agelist,countryage,illage){
  //var agelist=['0~20','20~35','35~50','50~60','60以上']
  myAgePie=echarts.init(document.getElementById('agepie'));
  myAgePie.clear();
  k_option_agepie = {
    color:k_color,
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 10,
        data: agelist,
        textStyle:{
          color:'#fff'
        }
    },
    series: [
      {
        name: '国家/地区年龄分布',
        hoverAnimation:true,
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '14',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: (function () {
          var res = [];
          for (var i = 0; i < agelist.length; ++i) {
            res.push({ value: countryage[i], name: agelist[i] })
          }
          return res;
        })()

      },
      {
        name: '感染者年龄分布',
        hoverAnimation:true,
        type: 'pie',
        radius: ['30%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '14',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: (function () {
          var res = [];
          for (var i = 0; i < agelist.length; ++i) {
            res.push({ value: illage[i], name: agelist[i] })
          }
          return res;
        })()
      }
    ]
};
myAgePie.setOption(k_option_agepie);
}
/** The text in card */
function printtext(keys,content){
  var divinner='';
  for(var i=0;i<keys.length;i++){
    divinner+='<p>'+keys[i] + "\t\t" + content[i]+'</p>';
  }
  document.getElementById('cardtext').innerHTML=divinner;
}
/** form the event timeline. UNCOMPLETED*/
function eventrich(d,e,year=2019,month=11,day=0,vol=150){
  myEventRich=echarts.init(document.getElementById('eventrich'));
  myEventRich.clear();
  var base = +new Date(year, month, day);
  var oneDay = 24 * 3600 * 1000;
  var date = [];
  for (var i = 1; i < vol; i++) {
    var now = new Date(base += oneDay);
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
  }

  for(var i=0;i<d.length;++i){
    d[i]=d[i].split('-');
    d[i]=new Date(parseInt(d[i][0]),parseInt(d[i][1])-1,parseInt(d[i][2])-1);
  }
  console.log(d);
  k_option_eventrich = {
    xAxis: {
      type: 'category',
      data:['0']
      
  },
  yAxis: {
    inverse:true,
    type: 'time',
    data: date
  },
  series: [{
      data: d,
      type: 'line'
  }]
    /*
    ,dataZoom: [{
      type: 'inside',
      start: 0,
      end: 100
    }, {
      yAxisIndex: 0,
      start: 0,
      end: 100,
      handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      handleSize: '80%',
      handleStyle: {
        color: '#fff',
        shadowBlur: 3,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffsetX: 2,
        shadowOffsetY: 2
      }
    }]*/
  }
  myEventRich.setOption(k_option_eventrich);
}


function drawAll() {
  // for areapath
  var areapathdata = [Math.random() * 300]
  for (var i = 1; i < 150; ++i) {
    areapathdata.push(Math.round((Math.random() - 0.5) * 20 + areapathdata[i - 1]));
  }
  // for barstack
  var death=[10];
  var cure=[5];
  var deathperday=[0];
  var cureperday=[0];
  var prediction=[15];
  for (var i = 1; i < 150; i++) {
    deathperday.push(Math.round(Math.random()*50));
    death.push(deathperday[i]+death[i-1]);
    cureperday.push(Math.round(Math.random()*100));
    cure.push(cureperday[i]+cure[i-1]);
    prediction.push(Math.round(Math.random()*200)+prediction[i-1]);
  }
  // for agepie
  var agelist=['0~20','20~35','35~50','50~60','60以上'];
  var countryage=[656,359,348,523,523];
  var illage=[535,55,269,356,71];
  // for text
  var keys=['国家','面积','人口','GDP'];
  var content=['某国','100 km²','10,000,000','???']
  // for eventrich 
  var eventdate=['2019-12-4','2019-12-25','2020-2-16'];
  var event=['All work and no play makes Jack a dull boy.All work and no play makes Jack a dull boy.All work and no play makes Jack a dull boy.All work and no play makes Jack a dull boy.',
'All work and no play makes Jack a dull boy.All work and no play makes Jack a dull boy.All work and no play makes Jack a dull boy.All work and no play makes Jack a dull boy.',
'All work and no play makes Jack a dull boy.All work and no play makes Jack a dull boy.All work and no play makes Jack a dull boy.All work and no play makes Jack a dull boy.']

  areapath(areapathdata);
  barstack(cure,cureperday,death,deathperday,prediction);
  agepie(agelist,countryage,illage);
  printtext(keys,content);
  eventrich(eventdate,event);
}
$(document).ready(drawAll);
