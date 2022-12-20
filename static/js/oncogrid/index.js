"use strict";

var donors			= [];
var genes			= [];
var observations 	= [];
var cnvObservations 	= [];
var ssmObservations 	= [];


var prjCds 			= [];
$("input[name=prjCds]").each(function(idx) { prjCds.push($(this).val()); });

var paramData = { prjCds : prjCds };
paramData = $.param(paramData, true);
$.ajax({
    type	: "GET",  
    url		: "/ngs/ngsData/sub/oncogridChart.json",
    data	: paramData,
    async	: false,
    dataType: "json",
    success	: function(dataList) {
    			donors = dataList.donors;
    			genes = dataList.genes;
    			observations = dataList.observations;
    } 
});
alert(donors.length);

/*
donors = [
		  {"id": "DO1", "age_diagnosis": 49, "alive": true,  "foobar": true},
		  {"id": "DO2", "age_diagnosis": 62, "alive": false, "foobar": true},
		  {"id": "DO3", "age_diagnosis": 1,  "alive": true,  "foobar": true},
		  {"id": "DO4", "age_diagnosis": 59, "alive": true,  "foobar": true},
		  {"id": "DO5", "age_diagnosis": 12, "alive": true,  "foobar": true},
		  {"id": "DO6", "age_diagnosis": 32, "alive": true,  "foobar": true},
		  {"id": "DO7", "age_diagnosis": 80, "alive": true,  "foobar": true}
];
genes = [
		 {"id": "ENSG00000141510", "symbol": "TP53",  "totalDonors": 40},
		 {"id": "ENSG00000157764", "symbol": "BRAF",  "totalDonors": 21},
		 {"id": "ENSG00000155657", "symbol": "TTN",   "totalDonors": 12},
		 {"id": "ENSG00000164796", "symbol": "CSMD3", "totalDonors": 4}
];
observations = [
			    {"id": "MU1",  "donorId": "DO1", "geneId": "ENSG00000157764"},
			    {"id": "MU11", "donorId": "DO1", "geneId": "ENSG00000157764"},
			    {"id": "MU2",  "donorId": "DO1", "geneId": "ENSG00000141510"},
			    {"id": "MU3",  "donorId": "DO3", "geneId": "ENSG00000141510"},
			    {"id": "MU3",  "donorId": "DO3", "geneId": "ENSG00000141510"},
			    {"id": "MU4",  "donorId": "DO3", "geneId": "ENSG00000157764"},
			    {"id": "MU5",  "donorId": "DO4", "geneId": "ENSG00000157764"},
			    {"id": "MU6",  "donorId": "DO4", "geneId": "ENSG00000164796"},
			    {"id": "MU7",  "donorId": "DO5", "geneId": "ENSG00000155657"},
			    {"id": "MU8",  "donorId": "DO5", "geneId": "ENSG00000157764"}
];

 */

var donorOpacity = function (d) {

	if( d.type === 'int' ) { 
		return d.value / 100;
	} else {
		return 1;
	}
};

var donorFill = function (d) {
	if( d.type === 'bool' ) {
		if( d.value === true ) {
			return '#abc';
		} else {
			return '#f00';
		}
	} else if( d.type == 'sex') {
		if( d.value === 'Male' ) {
			return '#a2bdfc';
		} else {
			return '#f2bdec';
		} 
	} else {
		return '#6d72c5';
	}
};

var geneOpacity = function (d) {
	alert(d.value);
	return d.value / 40;
};

var geneTracks = [
	{'name': 'Total Donors Affected', 'fieldName': 'totalDonors', 'type': 'int', 'group': 'Acrcho'},
];

var sortBool = function(field) {
	return function(a, b) {
		if( a[field] && !b[field] ) {
			return 1;
		} else if( !a[field] && b[field] ) {
			return -1;
		} else {
			return 0;
		}
	};
};

var sortInt = function(field) {
	return function(a, b) {
		return a[field] - b[field];
	};
};

var sortByString = function(field) {
	return function(a,b) {
		if( a[field] < b[field] ) return -1; 
		else if ( a[field] == b[field] ) return 0; 
		else return 1; 
	};
};


var donorTracks = [
  {'name': 'Age at Diagnosis', 'fieldName': 'age_diagnosis', 'group':'Clinical', 'type': 'int', 'sort': sortInt},
  {'name': 'Stage',            'fieldName': 'stage',         'group':'Clinical', 'type': 'int', 'sort': sortByString},
  {'name': 'Smoking',          'fieldName': 'smk',           'group':'Clinical', 'type': 'int', 'sort': sortByString},
  {'name': 'Gender',           'fieldName': 'gender',        'group':'Clinical', 'type': 'sex', 'sort': sortByString}
  /*{'name': 'Alive', 'fieldName': 'alive', 'type': 'bool', 'group':'Clinical','sort': sortBool},
  {'name': 'Foobar', 'fieldName': 'foobar', 'type': 'bool', 'group':'Data', 'sort': sortBool}*/
];


var params = {
		element			: '#grid-div',
		donors			: donors, 
		genes			: genes,
		observations	: observations,
		/*ssmObservations	: ssmObservations,
		cnvObservations	: cnvObservations,*/
		height: 450,
		width: 600,
		height			: 100,
		width			: 600,
		heatMap			: true, 
		trackHeight		: 20,			//ICGC, Clinical, Data Height 
		trackLegendLabel: '<i>?</i>',	//Track.js, TrackGrup.js Use
		donorTracks		: donorTracks,	//MainGrid.js Use
		donorOpacityFunc: donorOpacity,	//MainGrid.js Use
		donorFillFunc	: donorFill,	//MainGrid.js Use
		geneTracks		: geneTracks,	//MainGrid.js Use
		geneOpacityFunc	: geneOpacity	//MainGrid.js Use
};

var grid = new OncoGrid(params);
grid.render();

function removeCleanDonors() {
	var criteria = function (d) {
		return d.score === 0;
	};

	grid.removeDonors(criteria);
}

function toggleCrosshair() {
	grid.toggleCrosshair();
}

function toggleGridLines() {
	grid.toggleGridLines();
}

function resize() {
	var width = document.getElementById('width-resize').value;
	var height = document.getElementById('height-resize').value;

	grid.resize(width, height);
}