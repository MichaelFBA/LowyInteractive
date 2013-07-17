function graph4(lowyData) {
  var data = lowyData.elements


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



  $('#graph4').highcharts({
    chart: {
      type: 'line',
      borderWidth: 0,
      marginTop: 50,
      spacingBottom: 100,
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
      categories: ['2006', '2008', '2009', '2010', '2011', '2012', '2013'],
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
    tooltip: {
      valueSuffix: '%',
      formatter: function () {
        return 'Year: <b>' + this.x +
          '</b> <br/>Percent: <b>' + this.y + '%</b>';
      }
    },
    legend: {
      layout: 'vertical',
      align: 'bottom',
      verticalAlign: 'bottom',
      x: 0,
      y: 60,
      borderWidth: 0,
      itemWidth: 600,
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
    }],
    credits: {
      enabled: false
		}
  });




};