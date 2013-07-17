function graph7(lowyData) {

  var data = lowyData.elements
  //console.log(data)

  var arr = data;
  for (var key in arr) {
    data[key].values = [];
    for (var subkey in arr[key]) {
      if (subkey != "description" && subkey != "values") {
        //data[key].values.push(arr[key][subkey]);
        var currentValue = arr[key][subkey];

        data[key].values.push(currentValue);
      };
    }
  }

  //console.log(data)

  $('#graph7').highcharts({
    chart: {
      type: 'bar',
      borderWidth: 0,
      marginTop: 50,
      spacingBottom: 50,
      height: 500
    },
    title: {
      text: '',

    },
    colors: [
      '#006171',
      '#5f929f',
      '#9fbcc4',
      '#e47a4d',
      '#c5b1a7',
    ],
    xAxis: {
      categories: [
      	'Managing the Australian economy over time', 
      	'Managing foreign investment in Australia',
      	'Handling the arrival of asylum seekers by boat',
      	'Ensuring Australia’s national security is maintained',
      	'Maintaining a strong alliance with the United States',
      	'Managing Australia’s relations with China',
      	'Managing Australia’s relations with Asia',
      	'Managing Australia’s response to climate change'
      	],
      labels: {
        style: {
          color: '#c8c8c8',
          fontFamily: 'Open Sans',
        }
      }    
    },
    yAxis: {
      title: {
        text: 'Percent (%)',
        margin: 20,
        style: {
          color: '#c8c8c8',
          fontFamily: 'Open Sans',
          fontSize: '1.1em',
          fontWeight: 300,
        }
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }],
      labels: {
        style: {
          color: '#c8c8c8',
          fontFamily: 'Open Sans',
        }
      },
      min: 0,
      max: 100  
    },
    plotOptions: {
    	series: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
        }
      }
      
    },

    tooltip: {
      valueSuffix: '%',
      formatter: function () {
        return 'Title: <b>' + this.x +
          '</b> <br/>Percent: <b>' + this.y + '%</b>';
      }
    },
    legend: {
      align: 'bottom',
      verticalAlign: 'bottom',
      x: 50,
      y: 0,
      borderWidth: 0,
      useHTML: true,
      itemStyle: {
        color: '#c8c8c8',
        fontFamily: 'Open Sans',
        fontSize: '12px',
        width: 600
      }
    },
    series: [{
      name: data[0].description,
      data: data[0].values
    }, {
      name: data[1].description,
      data: data[1].values
    }, {
      name: data[2].description,
      data: data[2].values
    }, {
      name: data[3].description,
      data: data[3].values
    }, {
      name: data[4].description,
      data: data[4].values
    }],
    credits: {
      enabled: false
    }
  });




};