function graph3(AttitudeChina, ChineseInvestment) {

  var data1 = AttitudeChina.elements
  var data2 = ChineseInvestment.elements

  
  
  function dataModification(data){
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
  }
  dataModification(data1);
  dataModification(data2);


  $('#graph3').highcharts({
    chart: {
      type: 'column',
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
      categories: ['2009', '2010', '2011', '2012', '2013'],
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
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
        }
      }
    },

    tooltip: {
      valueSuffix: '%',
      formatter: function () {
        return 'Year: <b>' + this.x +
          '</b> <br/>Percent: <b>' + this.y + '%</b>';
      }
    },
    legend: {
      align: 'bottom',
      verticalAlign: 'bottom',
      x: 50,
      y: 60,
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
      name: data1[0].description,
      data: data1[0].values
    }, {
      name: data1[1].description,
      data: data1[1].values
    }, {
      name: data1[2].description,
      data: data1[2].values
    }, {
      name: data1[3].description,
      data: data1[3].values
    },{
	    name: data1[4].description,
      data: data1[4].values
    },{
	    type: 'spline',
	    name: data2[0].description,
      data: data2[0].values
    },{
	    type: 'spline',
	    name: data2[1].description,
      data: data2[1].values
    },{
	    type: 'spline',
	    name: data2[2].description,
      data: data2[2].values
    },{
	    type: 'spline',
	    name: data2[3].description,
      data: data2[3].values
    }
    ],
    credits: {
      enabled: false
    }
  });




};