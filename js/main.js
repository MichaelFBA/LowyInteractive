jQuery(document).ready(function($) {

//Activate Tabs
$('#myTab a:nth-child(5)').tab('show');

$('#myTab a').click(function (e) {
	e.preventDefault();
  $(this).tab('show');
})
//Displays the various graphs
$('#myTab a').on('shown', function (e,i) {
  //showInfo(lowyData);
  var countNo = $(this).parent().index() + 1;
  switch(countNo)
	{
	case 2:
	  graph2(lowyData.USAlliance);
	  break;
	case 3:
	  graph3(lowyData.AttitudeChina, lowyData.ChineseInvestment);
	  break;
	case 4:
	  graph4(lowyData.GlobalWarming);
	  break;
	case 5:
	  graph5(lowyData.EconomicOptimism);
	  break;
	case 6:
	  graph6(lowyData.WhichRelationship, lowyData.PossibleRelationship);
	  break;
	case 7:
	  graph7(lowyData.Election2013);
	  break;  
	default:
	}
})

/* Default HighCharts Settings */
Highcharts.setOptions({
	chart: {
		style: {
			color: '#c8c8c8',
			fontFamily: 'Open Sans'
		}
	}
});

//Google Fusion Table JSON (ie6 supported)
/*
var lowyData;
jQuery.support.cors = true;

$.ajax({
  type: "GET",
  cache: false,
  dataType: "jsonp",
  url: 'https://spreadsheets.google.com/feeds/list/0AvY46wTf1JOydG1hQUlnTmNubDRDcmpIbzZyZkFPUmc/2/public/values?alt=json',
  error:function(xhr, status, errorThrown) {
			alert(errorThrown+'\n'+status+'\n'+xhr.statusText);
	},
  success: function(data){
  	lowyData = data.feed.entry
  	console.log(data);
  }
}) 

*/
//Google Fusion Table JSON - Using Tabletop.js

var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=0AvY46wTf1JOydG1hQUlnTmNubDRDcmpIbzZyZkFPUmc&output=html';
var lowyData;
Tabletop.init( { 
	key: public_spreadsheet_url,
  callback: showInfo,
  debug: false,
  parseNumbers: true } )

function showInfo(data, tabletop) {
	//Assign value to lowydata so all other functions can read it
	lowyData = data;
	//console.log(data);
	//Initalise d3.js Initial Map
	graph1(lowyData.FellingsOtherCountries,lowyData.FeelingsTwo);
}

	
     

});