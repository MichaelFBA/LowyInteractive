function graph1(lowyData, lowyData2) {

  var data = lowyData.elements;
  var isoCountry = [
  ['Great Britain',826],
  ['Ireland',372],
  ['Germany',276],
  ['United States',840],
  ['Singapore',702],
  ['Japan',392],
  ['Fiji',242],
	['Brazil',76],
	['Vietnam',704],
	['Papua New Guinea',598],
	['Malaysia',458],
	['India',356],
	['Sri Lanka',144],
	['China',156],
	['Indonesia',360],
	['Israel',376],
	['Burma (Myanmar)',104],
	['Iran',364],
	['North Korea',408]
	];
	var isoNo = [826,372,276,840,702,392,242,76,704,598,458,356,144,156,360,376,104,364,408];
  //console.log(data);

// ----------------------------------------------------------
// A short snippet for detecting versions of IE in JavaScript
// without resorting to user-agent sniffing
// ----------------------------------------------------------
// If you're not in IE (or IE version is less than 5) then:
//     ie === undefined
// If you're in IE (>=5) then you can determine which version:
//     ie === 7; // IE7
// Thus, to detect IE:
//     if (ie) {}
// And to detect the version:
//     ie === 6 // IE6
//     ie > 7 // IE8, IE9 ...
//     ie < 9 // Anything less than IE9
// ----------------------------------------------------------
	
	var ie = (function(){
 
    var undef,
        v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');
 
    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );
 
    return v > 4 ? v : undef;
 
}());
	
	if(ie > 9 || ie === undefined){
		
	
	
  /* Parse Time */
  var parseDate = d3.time.format("%Y").parse;

  /* Transform Data */
  data = data.map(function (d) {
    return {
      country: d.country,
      date: new Date(d.year.toString()),
      value: d.value
    };
  });


  data = d3.nest().key(function (d) {
    return d.country;
  }).entries(data);
  /* Stage size */
  var margin = {
    top: 10,
    right: 20,
    bottom: 30,
    left: 20
  },
    width = 260
    height = 200


  /* Colours */
  var color = d3.scale.category20();

  /* Axis */
  var x = d3.time.scale()
    .domain([d3.min(data, function (d) {
        return d3.min(d.values, function (d) {
          return d.date;
        });
      }),
      d3.max(data, function (d) {
        return d3.max(d.values, function (d) {
          return d.date;
        });
      })
    ])
    .range([0, width])

  var y = d3.scale.linear()
    .domain([0, d3.max(data, function (d) {
      return d3.max(d.values, function (d) {
        return d.value;
      });
    })])
    .range([height, 0]);


  var color = d3.scale.category10()
    .domain(d3.keys(data[0]).filter(function (key) {
      return key === "country";
    }));

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  /* Line Graph */
  var line = d3.svg.line()
  //.interpolate("basis")
  .x(function (d) {
    return x(d.date);
  })
    .y(function (d) {
      return y(d.value);
    });

/* Remove 0 lines
  line.defined(function (d) {
    return d.value > 0
  });
*/


  /* Geo Map */

  var projection = d3.geo.mercator()
    .scale((width + 1) / 2 / Math.PI)
    .translate([width / 2, height / 1.5])
    .precision(.1)
    .rotate([-155, 0]);

  var svg = d3.select("#graph1").append("svg")
    .attr("width", width)
    .attr("height", height)

  var path = d3.geo.path()
    .projection(projection);

  var g = svg.append("g")
    .attr('width', width + 50)
    .attr('class', 'map')

  // load and display the World
  d3.json("./json/world-50m.json", function (error, worldmap) {
  
   	var mapPath = g.selectAll("path")
      .data(topojson.feature(worldmap, worldmap.objects.countries).features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr('class',function(d,i){
      	if( isoNo.indexOf(d.id) == -1 ){
		      	return "color2fill";
	      	}else{
		      	return "color1fill";
	      	}
	    })
    
    
/*     Click Events */
    mapPath.on("click", function(d) {
    
    
    	//Change map colour
	    var isSelected = d3.select(this).classed("color2fill");
	    //Highlight line
			var countryIso = d3.select(this).data();
			var indexNo = isoNo.indexOf(countryIso[0].id);
	    //Show / Hide series line
    	showHideChart(countryIso[0].id);
	    
	    if(isSelected){
		    d3.select(this).classed( "color2fill", false).classed( "color1fill", true);
		    	
	    }else{
	    	d3.select(this).classed( "color1fill", false).classed( "color2fill", true);
			}
			
			
			if(indexNo != -1){
				if(isSelected){
					d3.selectAll('.countries').select('path').filter(function(d) { return d.key === isoCountry[indexNo][0].toString() })
						.classed("hide",false)					
						.transition()
						.style("stroke-width", 1)
						.duration(250);
					
					d3.selectAll('.countries').selectAll('circle').filter(function(d) { return d.country === isoCountry[indexNo][0].toString() })					
						.transition()
						.attr("r", 3.5)
						.duration(250)
				}else{
					d3.selectAll('.countries').select('path').filter(function(d) { return d.key === isoCountry[indexNo][0].toString() })					
						.transition()
						.style("stroke-width", 0)
						.duration(250)
						.each("end",function() { 
					    d3.select(this).classed("hide",true);  
					   });
					d3.selectAll('.countries').selectAll('circle').filter(function(d) { return d.country === isoCountry[indexNo][0].toString() })					
						.transition()
						.attr("r", 0)
						.duration(250)
				}
			}
			
          
		});

     })


};
 
      

/* New Graph */
var data2 = lowyData2.elements;

  var arr = data2;
  for (var key in arr) {
    data2[key].values = [];
    for (var subkey in arr[key]) {
      if (subkey != "description" && subkey != "values") {
        //data[key].values.push(arr[key][subkey]);
        var currentValue = arr[key][subkey];
				if (currentValue == "null") {
        	data2[key].values.push(null);
				}else{
        	data2[key].values.push(currentValue);
				}
      };
    }
  }

//console.log(data2);


$('#graph1-1').highcharts({
    chart: {
      type: 'line',
      defaultSeriesType: 'spline',
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
      categories: ['2006','2007', '2008', '2009', '2010', '2011', '2012', '2013'],
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
        },
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
        return 'Country: <b>' + this.series.name +
          '</b> <br/>Year: <b>' + this.x +
          '</b> <br/>Percent: <b>' + this.y + '%</b>';
      }
    },
    legend: {
      align: 'bottom',
      verticalAlign: 'bottom',
      x: 0,
      y: 60,
      borderWidth: 0,
      useHTML: true,
      itemStyle: {
        color: '#c8c8c8',
        fontFamily: 'Open Sans',
        fontSize: '12px',
      }
    },
    series: [{
    	id: 	isoNo[0],
      name: data2[0].description,
      data: data2[0].values
    }, {
    	id: 	isoNo[1],
      name: data2[1].description,
      data: data2[1].values
    }, {
    	id: 	isoNo[2],
      name: data2[2].description,
      data: data2[2].values
    }, {
      id: 	isoNo[3],
      name: data2[3].description,
      data: data2[3].values
    }, {
      id: 	isoNo[4],
      name: data2[4].description,
      data: data2[4].values
    }, {
      id: 	isoNo[5],
      name: data2[5].description,
      data: data2[5].values
    }, {
      id: 	isoNo[6],
      name: data2[6].description,
      data: data2[6].values
    }, {
      id: 	isoNo[7],
      name: data2[7].description,
      data: data2[7].values
    }, {
      id: 	isoNo[8],
      name: data2[8].description,
      data: data2[8].values
    }, {
      id: 	isoNo[9],
      name: data2[9].description,
      data: data2[9].values
    }, {
      id: 	isoNo[10],
      name: data2[10].description,
      data: data2[10].values
    }, {
      id: 	isoNo[11],
      name: data2[11].description,
      data: data2[11].values
    }, {
      id: 	isoNo[12],
      name: data2[12].description,
      data: data2[12].values
    }, {
      id: 	isoNo[13],
      name: data2[13].description,
      data: data2[13].values
    }, {
      id: 	isoNo[14],
      name: data2[14].description,
      data: data2[14].values
    }, {
      id: 	isoNo[15],
      name: data2[15].description,
      data: data2[15].values
    }, {
      id: 	isoNo[16],
      name: data2[16].description,
      data: data2[16].values
    }, {
      id: 	isoNo[17],
      name: data2[17].description,
      data: data2[17].values
    }, {
      id: 	isoNo[18],
      name: data2[18].description,
      data: data2[18].values
    }],
    credits: {
      enabled: false
		}
  });


var chart = $('#graph1-1').highcharts();
            
function showHideChart(indexNo){
	var series = chart.get(indexNo);
    if (series.visible) {
        series.hide();
    } else {
        series.show();
    }
}    


};