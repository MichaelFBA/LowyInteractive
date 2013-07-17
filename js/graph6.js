function graph6(WhichRelationship, PossibleRelationship) {


  var data1 = WhichRelationship.elements
  var data2 = PossibleRelationship.elements
  //console.log(data1)

  createPie('#graph6-1', data1);
  createPie('#graph6-2', data2);

  function createPie(id, data) {

    $(id).highcharts({
      chart: {
        type: 'pie',
        borderWidth: 0,
        spacingBottom: 100,
        width:420,
        height: 500
      },
      title: {
        text: '',

      },
      plotOptions: {
      	showInLegend: true,
      	series:{
	      	 allowPointSelect: true
      	},
          pie: {
          	allowPointSelect: true,
            cursor: 'pointer',
          	startAngle: -40,
            shadow: false,
            center: ['50%', '50%'],
          }
        },
      colors: [
        '#006171',
        '#e47a4d',
        '#5f929f',
        '#9fbcc4',
        '#c5b1a7',
      ],
      
      tooltip: {
        valueSuffix: '%',
        formatter: function () {
          return 'Title: <b>' + this.point.name +
            '</b> <br/>Percent: <b>' + this.y + '%</b>';
        }
      },
      legend: {
      
    },
      series: [{
      	type: 'pie',
        name: ["test", "test2"],
        data: data,
        size: '70%',
        innerSize: '50%',
        dataLabels: {
        	enabled: true,
        	useHTML: false,
        	connectorPadding: 5,
        	crop:false,
        	style:{
        		width:'60px',
        	},
          formatter: function () {
            return this.point.name;
          }
        },
      }],
      credits: {
        enabled: false
      }
    });

  }
};