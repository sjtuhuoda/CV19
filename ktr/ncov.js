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

function getCSV() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      showCSV(this);
    }
  };
  xhttp.open("GET", "/Assignment8-countries_1990_2015.csv", true);
  xhttp.send();
  
  return false;
}

function showCSV(csv) {
  //alert(", ,".split(','))
  table = csv.responseText;
  table = table.split("\r\n");
  table.pop(); table.pop(); table.pop(); table.pop(); table.pop(); table.pop();
  // 格式化为 属性名，属性码，国家名，国家码，各项数据
  for (i = 0; i < table.length && i < 3639; ++i) {
    table[i] = table[i].split("\"");
    

    //  , , , , NUMBERS
    if (table[i].length == 1) {
      table[i] = table[i][0].split(",");
      continue;
    }
    var SeriCod = Math.floor((i - 1) / 214);
    // "??,??", , , , NUMBERS
    if (table[i].length == 3 && (SeriCod == 4 || SeriCod == 5 || SeriCod == 9 || SeriCod == 10 || SeriCod == 15 || SeriCod == 16)) {
      var tem1 = table[i][1];
      var tem2 = table[i][2].split(",");
      tem2[0] = tem1;
      table[i] = tem2;
      continue;
    }
    //  , ,"??,??", , NUMBERS
    if (table[i].length == 3) {
      var tem1 = table[i][0].split(",");
      tem1[2] = table[i][1];
      var tem2 = table[i][2].split(",");
      tem2.shift();
      table[i] = tem1.concat(tem2);
      continue;
    }
    // "??,??", ,"??,??", , NUMBERS
    var tem1 = table[i][1];
    var tem2 = table[i][2].split(",");
    tem2 = tem2[1];
    var tem3 = table[i][3];
    var tem4 = table[i][4].split(",");
    tem4.shift();
    table[i] = (([tem1].concat([tem2])).concat([tem3])).concat(tem4);
    //if(i==1114)console.log(table[i]);

  }
  // 数据格式化，null
  for (i = 1; i < table.length && i < 3639; ++i) {
    for (j = 4; j < table[i].length; ++j) {
      if (table[i][j] == '..') table[i][j] = null;
      else {
        table[i][j] = Number(table[i][j]);
      }
    }
  }
  // 取属性名，并获得属性最大最小值
  for (i = 0; i < 17; ++i) {
    SeriesName.push(table[1 + i * 214][0]);
    SeriesCode.push(table[1 + i * 214][1]);
    if(i==2||i==4||i==10||i==14||i==15||i==16){
      maxV.push(100);
      minV.push(0);
      continue;
    }
    //获得该属性最大最小值
    var MV = table[1 + i * 214][4];
    var mV = table[1 + i * 214][4];
    for (j = 0; j < 214; ++j) {
      for (k = 4; k < table[0].length; ++k) {
        if (table[i * 214 + 1 + j][k] == null) continue;
        
        //最大值
        if (MV == null) {
          MV = table[i * 214 + 1 + j][k];
          
        }
        else {
          MV = (MV >= table[i * 214 + 1 + j][k]) ? MV : table[i * 214 + 1 + j][k];
        }
        //最小值
        if (mV == null) {
          mV = table[i * 214 + 1 + j][k];
        }
        else {
          mV = (mV <= table[i * 214 + 1 + j][k]) ? mV : table[i * 214 + 1 + j][k];
        }
      }
    }
    maxV.push(MV);
    minV.push(mV);

  }
  // 取国家名
  for (i = 0; i < 214; ++i) {
    CountryName.push(table[1 + i][2]);
    CountryCode.push(table[1 + i][3]);
  }
  console.log(CountryCode);
  console.log(SeriesCode);
  console.log(table);
  console.log(maxV);
  reDy=true;

  var mylist1 = '';
  var mylist2='';

  for (var i = 0; i < 17; ++i) {
    mylist1 += '<option value="' + SeriesName[i] + '"></option>';
  }
  for (var i = 0; i < 214; ++i) {
    mylist2 += '<option value="' + CountryName[i] + '"></option>';
  }

  document.getElementById('x').innerHTML=mylist1;
  document.getElementById('y').innerHTML=mylist1;
  document.getElementById('z').innerHTML=mylist1;
  document.getElementById('c').innerHTML=mylist2;

  var codelist=''
  codelist+='<tbody><tr><td>Series Code</td><td>Series Name</td></tr>';
  for(var i=0;i<17;++i){
    codelist+='<tr><td>'+SeriesCode[i]+'</td><td>'+SeriesName[i]+'</td></tr>';
  }
  codelist+="</tbody>";


  document.getElementById('codelist').innerHTML=codelist;

  radarBoth(40,2014);
  scatter(0,2,5);
  parallel([0,2,5]);
  


  return false;
}

function areapath() {
  myAreaPath = echarts.init(document.getElementById('areapath'));
  myAreaPath.clear();
  var base = +new Date(2019, 12, 1);
  var oneDay = 24 * 3600 * 1000;
  var date = [];

  var data = [Math.random() * 300];

  for (var i = 1; i < 150; i++) {
    var now = new Date(base += oneDay);
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
  }

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

function barstack(){
  myBarStack=echarts.init(document.getElementById('barstack'));
  myBarStack.clear();

  var base = +new Date(2019, 12, 1);
  var oneDay = 24 * 3600 * 1000;
  var date = [];
  var death=[];
  var cure=[];

  var data = [Math.random() * 300];

  for (var i = 1; i < 150; i++) {
    var now = new Date(base += oneDay);
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
    death.push(Math.round(Math.random()*100));
    cure.push(Math.round(Math.random()*100));
  }

  k_option_barstack = {
    color:k_color,
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['累计死亡', '累计治愈'],
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
            name: '累计死亡',
            type: 'bar',
            stack: '累计人数',
            data: death
        },
        {
            name: '累计治愈',
            type: 'bar',
            stack: '累计人数',
            data: cure
        }
    ]
};
myBarStack.setOption(k_option_barstack);
}

function agepie(){
  var agelist=['0~20','20~35','35~50','50~60','60以上']
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
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 335, name: agelist[0]},
                {value: 310, name: agelist[1]},
                {value: 234, name: agelist[2]},
                {value: 135, name: agelist[3]},
                {value: 1548, name: agelist[4]}
            ]
        },
        {
          name: '感染者年龄分布',
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
                  fontSize: '30',
                  fontWeight: 'bold'
              }
          },
          labelLine: {
              show: false
          },
          data: [
              {value: 613, name: agelist[0]},
              {value: 95, name: agelist[1]},
              {value: 334, name: agelist[2]},
              {value: 35, name: agelist[3]},
              {value: 560, name: agelist[4]}
          ]
      }
    ]
};
myAgePie.setOption(k_option_agepie);
}


function drawAll() {
  //getCSV();
  areapath();
  barstack();
  agepie();
}
$(document).ready(drawAll);
