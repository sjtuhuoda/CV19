var k_color = ['#bcd3bb', '#e88f70', '#edc1a5', '#9dc5c8', '#e1e8c8', '#7b7c68', '#e5b5b5', '#f0b489', '#928ea8', '#bda29a'];
var k_color__ = ['#edc1a5','#bcd3bb', '#e88f70',  '#9dc5c8', '#e1e8c8', '#7b7c68', '#e5b5b5', '#f0b489', '#928ea8', '#bda29a'];
var k_color_ = ['#bcd3bb', '#e88f70', '#edc1a5', '#9dc5c8', '#e1e8c8','#bcd3bb', '#e88f70', '#edc1a5', '#9dc5c8', '#e1e8c8', '#7b7c68', '#e5b5b5', '#f0b489', '#928ea8', '#bda29a'];
var k_illdis=['Slovenia','Austria','Canada','Czechia','Germany','Hungary','Italy','Singapore','covid_age_distribution']
var k_units=['',' k',' km²',' per km²','%']

k_areapath=[]

k_death_name=[];
k_death=[];
k_deathperday=[];
k_cure_name=[];
k_cure=[];
k_cureperday=[];
k_confirm=[];
k_pre=[];

k_agediv=[];
k_agedis=[];
k_ill_countryname=[];
k_ill_divdis=[];

k_text_key=[];
k_text_value=[];

k_event=[];

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
function areapath(data, year = 2020, month = 0, day = 0, vol = 150) {

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
      text: '政策松紧程度',
      textStyle: {
        color: '#fff'
      }

    },


    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: date,
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      axisLine: {
        lineStyle: {
          color: '#fff'
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
        name: '松紧程度得分',
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
function barstack(cure, cureperday, death, deathperday, confirm, prediction, year = 2020, month = 0, day = 21, vol = 125) {
  myBarStack = echarts.init(document.getElementById('barstack'));
  myBarStack.clear();

  var base = +new Date(year, month, day);
  var oneDay = 24 * 3600 * 1000;
  var date = [];

  for (var i = 1; i < vol; i++) {
    var now = new Date(base += oneDay);
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
  }

  k_option_barstack = {
    title:{
      show:false,
      text:'疫情发展统计图',
      left:'center',
      textStyle:{
        color:'#fff'
      }
    },
    color: k_color__,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      selected: {
        '累计治愈': true,
        '累计死亡': true,
        '现存确诊': true,
        '新增治愈': false,
        '新增死亡': false,
        'SEIR预测累计确诊': true
      },
      data: (function () {
        if (prediction.length == 0) {
          return ['现存确诊','累计治愈', '累计死亡', '新增治愈', '新增死亡'];
        }
        else {
          return ['现存确诊','累计治愈', '累计死亡', '新增治愈', '新增死亡', 'SEIR预测累计确诊']
        }
      })(),
      textStyle: {
        color: '#fff'
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
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '累计人数',
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      },
      {
        type: 'value',
        name: '新增人数',
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      }
    ],
    dataZoom: [
      {
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        top: '90%',
        start: 0,
        end: 100
      },
      {
        type: 'slider',
        show: true,
        yAxisIndex: [0],
        left: '0%',
        start: 0,
        end: 5
      },
      {
        type: 'inside',
        xAxisIndex: [0],
        start: 0,
        end: 100
      },
      {
        type: 'inside',
        yAxisIndex: [0],
        start: 0,
        end: 10
      }
    ],
    series: [
      {
        name: '现存确诊',
        type: 'bar',
        stack: '累计人数',
        data: confirm
      },
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
        name: 'SEIR预测累计确诊',
        type: 'line',
        data: prediction
      }
    ]
  };
  myBarStack.setOption(k_option_barstack);
  myBarStack.on('legendselectchanged',function(param){
    console.log(param);
    if(param.name=='累计治愈' ){
      if(param.selected['累计治愈']==true){
        k_option_barstack.legend.selected['累计治愈'] = true;
        k_option_barstack.legend.selected['新增治愈'] = false;
        k_option_barstack.legend.selected['新增死亡'] = false;
      }
      else{
        k_option_barstack.legend.selected['累计治愈'] = false;
      }
    }
    if(param.name=='累计死亡'){
      if(param.selected['累计死亡']==true){
        k_option_barstack.legend.selected['累计死亡'] = true;
        k_option_barstack.legend.selected['新增治愈'] = false;
        k_option_barstack.legend.selected['新增死亡'] = false;
      }
      else{
        k_option_barstack.legend.selected['累计死亡'] = false;
      }
    }
    if(param.name=='现存确诊'){
      if(param.selected['现存确诊']==true){
        k_option_barstack.legend.selected['现存确诊'] = true;
        k_option_barstack.legend.selected['新增治愈'] = false;
        k_option_barstack.legend.selected['新增死亡'] = false;
      }
      else{
        k_option_barstack.legend.selected['现存确诊'] = false;
      }
    }
    if(param.name=='新增治愈'){
      if(param.selected['新增治愈']==true){
        k_option_barstack.legend.selected['累计治愈'] = false;
        k_option_barstack.legend.selected['累计死亡'] = false;
        k_option_barstack.legend.selected['现存确诊'] = false;
        k_option_barstack.legend.selected['SEIR预测累计确诊'] = false;
        k_option_barstack.legend.selected['新增治愈'] = true;
      }
      else{
        k_option_barstack.legend.selected['新增治愈'] = false;
      }
    }
    if(param.name=='新增死亡'){
      if(param.selected['新增死亡']==true){
        k_option_barstack.legend.selected['累计治愈'] = false;
        k_option_barstack.legend.selected['累计死亡'] = false;
        k_option_barstack.legend.selected['现存确诊'] = false;
        k_option_barstack.legend.selected['SEIR预测累计确诊'] = false;
        k_option_barstack.legend.selected['新增死亡'] = true;
      }
      else{
        k_option_barstack.legend.selected['新增死亡'] = false;
      }
    }
    if(param.name=='SEIR预测累计确诊'){
      if(param.selected['SEIR预测累计确诊']==true){
        k_option_barstack.legend.selected['新增治愈'] = false;
        k_option_barstack.legend.selected['新增死亡'] = false;
        k_option_barstack.legend.selected['SEIR预测累计确诊']=true;
      }
      else{
        k_option_barstack.legend.selected['SEIR预测累计确诊'] = false;
      }
    }
    this.setOption(k_option_barstack);

  })
}
/** 3 lists should be equal in length. */
function agepie(agelist, countryage, illage) {
  //var agelist=['0~20','20~35','35~50','50~60','60以上']
  console.log(agelist)
  myAgePie = echarts.init(document.getElementById('agepie'));
  myAgePie.clear();
  k_option_agepie = {
    title:{
      show:true,
      x: '55%',
      y:'top',
      z:1,
      text:'年龄分布',
      textStyle:{
        color:'#fff'
      }
    },
    color: k_color_,
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {d}%'
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      left: 10,
      data: agelist,
      textStyle: {
        color: '#fff'
      }
    },
    series: [
      {
        name: '国家/地区年龄分布',
        hoverAnimation: true,
        type: 'pie',
        left:'30%',
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
        hoverAnimation: true,
        type: 'pie',
        left:'30%',
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
            res.push({ value: illage[i], name: agelist[i+5] })
          }
          return res;
        })()
      }
    ]
  };
  myAgePie.setOption(k_option_agepie);
}
/** The text in card */
function printtext(keys, content) {
  var divinner = '<table><tbody>';
  for (var i = 0; i < keys.length; i++) {
    divinner += '<tr><td>' + keys[i] + "</td><td>" + content[i] + k_units[i] + '</td></tr>';
  }
  divinner+='</tbody></table>';
  document.getElementById('cardtext').innerHTML = divinner;
}
/** form the event timeline. UNCOMPLETED*/
function eventrich(da, ev, year = 2020, month = 0, day = 0, vol = 150) {
  myEventRich = echarts.init(document.getElementById('eventrich'));
  myEventRich.clear();
  var d=JSON.parse(JSON.stringify(da));
  var e=JSON.parse(JSON.stringify(ev));
  var base = +new Date(year, month, day);
  var oneDay = 24 * 3600 * 1000;
  var date = [];
  for (var i = 1; i < vol; i++) {
    var now = new Date(base += oneDay);
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
  }

  for (var i = 0; i < d.length; ++i) {
    d[i] = d[i].split('/');
    d[i] = new Date(parseInt(d[i][0]), parseInt(d[i][1]) - 1, parseInt(d[i][2]) - 1);
  }
  //console.log(d);
  k_option_eventrich = {
    title: {
      left: "90%",
      top: "20%",
      text: '政\n策\n时\n间\n轴',
      textStyle: {
        color: '#fff'
      }

    },
    xAxis: {
      show : false,
      type: 'category',
      data: ['0','1','2','3','4','5']

    },
    yAxis: {
      show : false,
      inverse: true,
      type: 'time',
      data: d,
      splitLine:{
        show:false
      }
    },
    series: [{
      data: (function(){
        var li=[];
        for(var i=0;i<d.length;++i){
          li.push([0,d[i],e[i]])
        }
        return li;
      })(),
      type: 'line',
      symbolSize:10,
      lineStyle:{
        width:4
      }

    }],
    tooltip:{
      formatter:function(param){
        //console.log(param);
        return param.data[1].toDateString()+'<br/>'+ param.data[2];
      },
      extraCssText:'width:250px;white-space:normal;',
      position:'right'
    }
  }
  myEventRich.setOption(k_option_eventrich);
}
function card_drawAll(cname) {
  //console.log(k_agedis);
  var card_index=k_death_name.indexOf(cname);


  // for areapath
  /*
  var areapathdata = [Math.random() * 300]
  for (var i = 1; i < 150; ++i) {
    areapathdata.push(Math.round((Math.random() - 0.5) * 20 + areapathdata[i - 1]));
  }
  */
  var areapathdata=k_areapath[card_index];
  // for barstack

  /*
  var death = [10];
  var cure = [5];
  var deathperday = [0];
  var cureperday = [0];
  var prediction = [15];
  for (var i = 1; i < 150; i++) {
    deathperday.push(Math.round(Math.random() * 50));
    death.push(deathperday[i] + death[i - 1]);
    cureperday.push(Math.round(Math.random() * 100));
    cure.push(cureperday[i] + cure[i - 1]);
    prediction.push(Math.round(Math.random() * 200) + prediction[i - 1]);
  }
  */
  var death=k_death[card_index];
  var cure=k_cure[card_index];
  var deathperday=k_deathperday[card_index];
  var cureperday=k_cureperday[card_index];
  var confirm=k_confirm[card_index];
  var prediction=k_pre[card_index];


  // for agepie
  //var agelist = ['0~20', '20~35', '35~50', '50~60', '60以上'];
  //var countryage = [656, 359, 348, 523, 523];
  var agelist=k_agediv;
  var countryage=k_agedis[card_index];
  //console.log(countryage);
  var illage = [, , , , ];

  if(k_ill_countryname.indexOf(cname)!=-1){
    var cind=k_ill_countryname.indexOf(cname);
    agelist=agelist.concat(k_ill_divdis[cind][0]);
    illage=k_ill_divdis[cind][1];
  }

  // for text
  //var keys = ['国家', '面积', '人口', 'GDP'];
  //var content = ['某国', '100 km²', '10,000,000', '???']
  var keys=k_text_key;
  var content=k_text_value[card_index];

  // for eventrich
  /*
  var eventdate = ['2019-12-4', '2019-12-25', '2020-2-16'];
  var event = ['All work and no play makes Jack a dull boy.All work and no play makes Jack a dull boy.',
    'All work and no play makes Jack a dull boy.All work and no play makes Jack a dull boy.All work and no play makes Jack a dull boy.All work and no play makes Jack a dull boy.',
    'All work and no play makes Jack a dull boy.All work and no play makes Jack a dull boy.All work and no play makes Jack a dull boy.All work and no play makes Jack a dull boy.'];
  */
  var eventdate=k_event[card_index][0];
  var event=k_event[card_index][1];

  areapath(areapathdata);
  barstack(cure, cureperday, death, deathperday,confirm, prediction);
  agepie(agelist, countryage, illage);
  printtext(keys, content);
  eventrich(eventdate, event);
}

function readfile(filename, mainfunc) {
  var csvdata;
  var url = "http://127.0.0.1:5000/" + filename;
  console.log(url)
  $.ajax({
    "type" : "get",
    "url" : url,
    dataType:'jsonp',
    jsonp: "invoker", //指定参数名称
    jsonpCallback: filename, //指定回调函数
    "success" : function(data) {
      // 参数为json类型的对象
      // console.log(data[filename]);
      csvdata = data[filename];
      for (var i in csvdata) {
        mainfunc(csvdata[i]);
      }
    },
    "error" : function() {
      alert("communication failed");
    }
  });
}

function readcsvcard(){

  // for areapath
  readfile("time_series_stringency", function (csvdata) {
      k_areapath.push(Object.values(csvdata).slice(1));
  });

    // for barstack
  readfile("time_series_covid_19_deaths", function (csvdata) {
    k_death_name.push(csvdata['Country/Region']);
    k_death.push(Object.values(csvdata).slice(3));
  });


  readfile("time_series_covid_19_deaths_everyday", function (csvdata) {
    k_deathperday.push([0].concat(Object.values(csvdata).slice(3)));
  });


  readfile("time_series_covid_19_recovered", function (csvdata) {
    k_cure_name.push(csvdata['Country/Region']);
    k_cure.push(Object.values(csvdata).slice(3));
  });


  readfile("time_series_covid_19_recovered_everyday", function (csvdata) {
    k_cureperday.push([0].concat(Object.values(csvdata).slice(3)));
  });

  readfile("time_series_covid_19_confirm_now", function (csvdata) {
    //k_confirm.push(data['Country/Region']);
    k_confirm.push(Object.values(csvdata).slice(3));
  });

  readfile("SEIR_prediction", function (csvdata) {
    k_pre.push(Object.values(csvdata).slice(1));
  });


  // for agepie
  k_agediv=['0~4','5~14','15~24','25~64','65+']
  readfile("age_distribution", function (csvdata) {
    //console.log(Object.values(csvdata).slice(1));
    k_agedis.push(Object.values(csvdata).slice(1));
  })



  for(var i=0;i<9;++i){
    readfile('covid_age_distribution'+i.toString(), function (csvdata) {
      var ori=Object.values(csvdata);
      var oriind=Object.keys(csvdata);
      if(ori[0]=='')return;
      k_ill_countryname.push(ori[0]);
      //console.log(ori[0]);
      ori=ori.slice(1,ori.length);
      oriind=oriind.slice(1,oriind.length-1);
      k_ill_divdis.push([oriind,ori]);
    })
  }


  // for text
  k_text_key=['Country/Region','Population','Area','Density','Population GrowthRate'];
  readfile("area_and_pop", function (csvdata) {
    k_text_value.push(Object.values(csvdata).slice(0,5));
  });


  // for eventrich
  readfile("time_series_event", function (csvdata) {
    var dateofthiscountry=[];
    var eventofthiscountry=[];
    var ori=Object.values(csvdata).slice(1);
    var oriind=Object.keys(csvdata).slice(1);
    for(var i=0;i<ori.length;++i){
      if(ori[i]=='')continue;
      else{
        dateofthiscountry.push(oriind[i]);
        eventofthiscountry.push(ori[i]);
      }
    }
    // console.log([dateof/thiscountry,eventofthiscountry])
    k_event.push([dateofthiscountry,eventofthiscountry]);
  // console.log(k_event);

  });


}

function k_begin(){
  readcsvcard();
}

$(document).ready(k_begin);
