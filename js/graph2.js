function graph2(lowyData) {

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

  $('#graph2').highcharts({
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
      '#eb9b7a',
      '#e47a4d',
      '#c5b1a7',
    ],
    xAxis: [{
      categories: ['2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005'],
      reversed: true,
      labels: {
        style: {
          color: '#c8c8c8',
          fontFamily: 'Open Sans',
        }
      }
    }, { // mirror axis on right side
      opposite: true,
      reversed: true,
      categories: ['2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005'],
      linkedTo: 0,
      labels: {
        style: {
          color: '#c8c8c8',
          fontFamily: 'Open Sans',
        }
      }
    }],
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
        },
        formatter: function () {
          return (Math.abs(this.value)) + '%';
        }
      },
      min: -100,
      max: 100
    },
    plotOptions: {
      series: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          formatter: function () {
            return (Math.abs(this.y))
          },
          style: {
            color: '#ffffff',
          }
        }
      }

    },
    tooltip: {
      valueSuffix: '%',
      formatter: function () {
        return '<b>' + this.series.name + '</b><br/>' + 'Year: <b>' + this.x +
          '</b> <br/>Percent: <b>' + Math.abs(this.y) + '%</b>';
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
      data: data[0].values,
      legendIndex: 1
    }, {
      name: data[1].description,
      data: data[1].values,
      legendIndex: 2
    }, {
      name: data[3].description,
      data: data[3].values,
      legendIndex: 4
    }, {
      name: data[2].description,
      data: data[2].values,
      legendIndex: 3
    }],
    credits: {
      enabled: false
    }
  });




};