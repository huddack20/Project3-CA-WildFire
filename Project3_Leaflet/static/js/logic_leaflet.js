// Adding light mode tile layer to the map
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
	subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});


var baseMaps = {
	"Street": street,
	"Satellite": googleSat,
	"Topography": topo
};


// Hours and Months layers
var layers = {
        HOURS_1_3: new L.LayerGroup(),
	HOURS_3_6: new L.LayerGroup(),
	HOURS_6_9: new L.LayerGroup(),
	HOURS_9_12: new L.LayerGroup(),
	HOURS_12_15: new L.LayerGroup(),
	HOURS_15_18: new L.LayerGroup(),
	HOURS_18_21: new L.LayerGroup(),
	HOURS_21_24: new L.LayerGroup(),
	MONTHS_1_3: new L.LayerGroup(),
	MONTHS_3_6: new L.LayerGroup(),
	MONTHS_6_9: new L.LayerGroup(),
	MONTHS_9_12: new L.LayerGroup(),
};


// Create map object
var myMap = L.map("map", {
        center: [37.09, -120.71],
        zoom: 6,
	layers: [layers.HOURS_1_3, layers.HOURS_3_6, layers.HOURS_6_9, layers.HOURS_9_12, layers.HOURS_12_15, layers.HOURS_15_18, layers.HOURS_18_21,
		layers.HOURS_21_24, layers.MONTHS_1_3, layers.MONTHS_3_6, layers.MONTHS_6_9, layers.MONTHS_9_12] 
});

street.addTo(myMap);

var overlayMaps = {
        "HOURS_1_3": layers.HOURS_1_3,
	"HOURS_3_6": layers.HOURS_3_6,
	"HOURS_6_9": layers.HOURS_6_9,
	"HOURS_9_12": layers.HOURS_9_12,
	"HOURS_12_15": layers.HOURS_12_15,
	"HOURS_15_18": layers.HOURS_15_18,
	"HOURS_18_21": layers.HOURS_18_21,
	"HOURS_21_24": layers.HOURS_21_24,
	"MONTHS_1_3": layers.MONTHS_1_3,
        "MONTHS_3_6": layers.MONTHS_3_6,
        "MONTHS_6_9": layers.MONTHS_6_9,
        "MONTHS_9_12": layers.MONTHS_9_12
};

L.control.layers(baseMaps, overlayMaps, {
}).addTo(myMap);

// Store our API endpoint inside queryUrl

var url = "https://raw.githubusercontent.com/huddack20/project3-geojson-datafile/main/WFIGS_-_Current_Wildland_Fire_Locations.geojson"
//var url = "WFIGS_-_Wildland_Fire_Locations_Full_History.geojson"
// Historical Data -  var url = "https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/Fire_History_Perimeters_Public/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson"

d3.json(url).then(function(response) {

	function getColor(m) {
    		return m >= 23 ? "rgb(128, 0, 0)" :
           		m >= 22 ? "rgb(255, 127, 80)" :
           		m >= 21 ? "rgb(150, 128, 114)" :
           		m >= 20 ? "rgb(0, 0, 255)" :
           		m >= 19 ? "rgb(0, 255, 255)" :
           		m >= 18 ? "rgb(107, 142, 35)" :
           		m >= 17 ? "rgb(0, 100, 0)" :
           		m >= 16 ? "rgb(173, 255, 0)" :
           		m >= 15 ? "rgb(0, 128, 0)" :
           		m >= 14 ? "rgb(0, 255, 127)" :
			m >= 13 ? "rgb(255, 127, 80)" :
                        m >= 12 ? "rgb(0, 0, 0)" :
                        m >= 11 ? "rgb(255, 165, 0)" :
                        m >= 10 ? "rgb(255, 215, 0)" :
                        m >= 9 ? "rgb(255, 0, 0)" :
                        m >= 8 ? "rgb(199, 21, 133)" :
                        m >= 7 ? "rgb(0, 255, 255)" :
                        m >= 6 ? "rgb(0, 0, 255)" :
                        m >= 5 ? "rgb(107, 142, 35)" :
                        m >= 4 ? "rgb(0, 100, 0)" :
                        m >= 3 ? "rgb(173, 255, 0)" :
                        m >= 2 ? "rgb(0, 128, 0)" :
                        m >= 1 ? "rgb(0, 255, 127)" :
           		"rgb(0, 0, 0)";
        }

	 function getColorMonth(m) {
                return m === "Jan" ? "rgb(128, 0, 0)" :
                        m === "Mar" ? "rgb(255, 127, 80)" :
                        m === "Jun" ? "blue" :
                        m === "Sep" ? "rgb(0, 255, 127)" :
                        "rgb(0, 0, 0)";
        }


	function getRadius(r) {
		return r >= 23 ? r*1000 :
			r >= 22 ? r*1000 :
			r >= 21 ? r*1000 :
			r >= 20 ? r*1000 :
			r >= 19 ? r*1000 :
			r >= 18 ? r*1000 :
			r >= 17 ? r*1000 :
			r >= 16 ? r*1000 :
			r >= 15 ? r*1000 :
                       	r >= 14 ? r*1000 :
                       	r >= 13 ? r*1000 :
                       	r >= 12 ? r*1000 :
                       	r >= 11 ? r*1000 :
                       	r >= 10 ? r*1000 :
                       	r >= 9 ? r*1000 :
                       	r >= 8 ? r*1000 :
                       	r >= 7 ? r*1000 :
                       	r >= 6 ? r*1000 :
                       	r >= 5 ? r*1000 :
                       	r >= 4 ? r*1000 :
                       	r >= 3 ? r*1000 :
                       	r >= 2 ? r*1000 :
			r >= 1 ? r*1000 :
                       	r;

        }


        var monthFeatures = response.features;

  	for(var i=0; i < monthFeatures.length; i++) {

		// monthFeatures[i].properties.FireDiscoveryDateTime !== null
	
		if (monthFeatures[i].properties.POOState === "US-CA" && monthFeatures[i].properties.FireDiscoveryDateTime !== null) {

			var date = new Date(monthFeatures[i].properties.FireDiscoveryDateTime);

			var pstDate = date.toLocaleString('en-US', {timeZone: 'America/Los_Angeles',});

			var utcHours = date.getUTCHours();
			var pstHours = date.getUTCHours() - 7;
			var dates = date.getDate();

			if (pstHours < 0) {
				hours = pstHours + 24
			}
			else {
				hours = pstHours
			}

			var months = date.getMonth() + 1;
			
			console.log("UTS",monthFeatures[i].properties.FireDiscoveryDateTime);
			console.log("EST", date);
			console.log("PST", pstDate);
			console.log("PST Month", months);
			console.log("PST Date", dates);
			console.log("PST Hour", hours);
			console.log("--------");

			var coordinates = monthFeatures[i].geometry.coordinates;
			
       			var monthCoordinates = [];

			
			var countLA = 0


			if (hours < 3) {

				L.circle(
					[coordinates[1], coordinates[0]], {
						fillOpacity: 0.2,
						//fillColor: getColor(hours),
						color: "rgb(0, 255, 127)",
						weight: 0.5,
						radius: getRadius(12)
					}).addTo(layers.HOURS_1_3);
			}
			else if (hours < 6) {
                                L.circle(
                                        [coordinates[1], coordinates[0]], {
                                                fillOpacity: 0.75,
                                                //fillColor: getColor(hours),
                                                color: "rgb(173, 255, 0)",
                                                weight: 1.5,
                                                radius: getRadius(12)
                                        }).bindPopup("<h3>" + "County: " + monthFeatures[i].properties.POOCounty +
                                                "</h3><hr><p>" + pstDate +
                                                '<br>' + "Fire Cause: " + monthFeatures[i].properties.FireCause +
						'<br>' + "Incident Name: " + monthFeatures[i].properties.IncidentName +
                                                '<br>' + '[' + coordinates[1] + ', ' + coordinates[0] + ']' + "</p>").addTo(layers.HOURS_3_6);

                        }
			else if (hours < 9) {
                                L.circle(
                                        [coordinates[1], coordinates[0]], {
                                                fillOpacity: 0.75,
                                                //fillColor: getColor(hours),
                                                color: "rgb(0, 0, 255)",
                                                weight: 1.5,
                                                radius: getRadius(12)
                                        }).bindPopup("<h3>" + "County: " + monthFeatures[i].properties.POOCounty +
                                                "</h3><hr><p>" + pstDate +
						'<br>' + "Fire Cause: " + monthFeatures[i].properties.FireCause +
                                                '<br>' + "Incident Name: " + monthFeatures[i].properties.IncidentName +
                                                '<br>' + '[' + coordinates[1] + ', ' + coordinates[0] + ']' + "</p>").addTo(layers.HOURS_6_9);

                        }
			else if (hours < 12) {
                                L.circle(
                                        [coordinates[1], coordinates[0]], {
                                                fillOpacity: 0.75,
                                                //fillColor: getColor(hours),
                                                color: "rgb(255, 0, 0)",
                                                weight: 1.5,
                                                radius: getRadius(12)
                                        }).bindPopup("<h3>" + "County: " + monthFeatures[i].properties.POOCounty +
                                                "</h3><hr><p>" + pstDate +
						'<br>' + "Fire Cause: " + monthFeatures[i].properties.FireCause +
                                                '<br>' + "Incident Name: " + monthFeatures[i].properties.IncidentName +
                                                '<br>' + '[' + coordinates[1] + ', ' + coordinates[0] + ']' + "</p>").addTo(layers.HOURS_9_12);

                        }
			else if (hours < 15) {
                                L.circle(
                                        [coordinates[1], coordinates[0]], {
                                                fillOpacity: 1,
                                                //fillColor: getColor(hours),
                                                color: "rgb(0, 0, 0)",
                                                weight: 1.5,
                                                radius: getRadius(12)
                                        }).bindPopup("<h3>" + "County: " + monthFeatures[i].properties.POOCounty +
                                                "</h3><hr><p>" + pstDate +
						'<br>' + "Fire Cause: " + monthFeatures[i].properties.FireCause +
                                                '<br>' + "Incident Name: " + monthFeatures[i].properties.IncidentName +
                                                '<br>' + '[' + coordinates[1] + ', ' + coordinates[0] + ']' + "</p>").addTo(layers.HOURS_12_15);

                        }
			else if (hours < 18) {
				L.circle(
					[coordinates[1], coordinates[0]], {
						fillOpacity: 0.75,
                                                //fillColor: getColor(hours),
                                                color: "rgb(0, 128, 0)",
                                                weight: 1.5,
                                                radius: getRadius(12)
					}).bindPopup("<h3>" + "County: " + monthFeatures[i].properties.POOCounty +
                                                "</h3><hr><p>" + pstDate +
						'<br>' + "Fire Cause: " + monthFeatures[i].properties.FireCause +
                                                '<br>' + "Incident Name: " + monthFeatures[i].properties.IncidentName +
                                                '<br>' + '[' + coordinates[1] + ', ' + coordinates[0] + ']' + "</p>").addTo(layers.HOURS_15_18);

			}
			else if (hours < 21) {
                                L.circle(
                                        [coordinates[1], coordinates[0]], {
                                                fillOpacity: 0.75,
                                                //fillColor: getColor(hours),
                                                color: "rgb(107, 142, 35)",
                                                weight: 1.5,
                                                radius: getRadius(12)
                                        }).bindPopup("<h3>" + "County: " + monthFeatures[i].properties.POOCounty +
                                                "</h3><hr><p>" + pstDate +
						'<br>' + "Fire Cause: " + monthFeatures[i].properties.FireCause +
                                                '<br>' + "Incident Name: " + monthFeatures[i].properties.IncidentName +
                                                '<br>' + '[' + coordinates[1] + ', ' + coordinates[0] + ']' + "</p>").addTo(layers.HOURS_18_21);

                        }
			else {
                                L.circle(
                                        [coordinates[1], coordinates[0]], {
                                                fillOpacity: 0.75,
                                                //fillColor: getColor(hours),
                                                color: "rgb(150, 128, 114)",
                                                weight: 4.5,
                                                radius: getRadius(6)
                                        }).bindPopup("<h3>" + "County: " + monthFeatures[i].properties.POOCounty +
                                                "</h3><hr><p>" + pstDate +
						'<br>' + "Fire Cause: " + monthFeatures[i].properties.FireCause +
                                                '<br>' + "Incident Name: " + monthFeatures[i].properties.IncidentName +
                                                '<br>' + '[' + coordinates[1] + ', ' + coordinates[0] + ']' + "</p>").addTo(layers.HOURS_21_24);
                        }
		
			// Draw circles by month
			if (months < 3) {

                                L.circle(
                                        [coordinates[1], coordinates[0]], {
                                                //fillOpacity: 0.2,
                                                //fillColor: getColor(months),
                                                //color: "black",
                                                weight: 0.5,
                                                radius: getRadius(12)
                                        }).addTo(layers.MONTHS_1_3);
                        }
                        else if (months < 6) {
                                L.circle(
                                        [coordinates[1], coordinates[0]], {
                                                //fillOpacity: 0.75,
                                                //fillColor: getColor(months),
                                                //color: "violet",
                                                weight: 1.5,
                                                radius: getRadius(12)
                                        }).addTo(layers.MONTHS_3_6);

                        }
                        else if (months < 9) {
                                L.circle(
                                        [coordinates[1], coordinates[0]], {
                                                //fillOpacity: 0.25,
                                                //color: "blue",
                                                weight: 1.5,
                                                radius: getRadius(12)
                                        }).bindPopup("<h3>" + "County: " + monthFeatures[i].properties.POOCounty +
                                		"</h3><hr><p>" + pstDate +
						'<br>' + "Fire Cause: " + monthFeatures[i].properties.FireCause +
                                                '<br>' + "Incident Name: " + monthFeatures[i].properties.IncidentName +
                                		'<br>' + '[' + coordinates[1] + ', ' + coordinates[0] + ']' + "</p>").addTo(layers.MONTHS_6_9);

                        }
                        else {
                                L.circle(
                                        [coordinates[1], coordinates[0]], {
                                                //fillOpacity: 0.75,
                                                //fillColor: getColor(months),
                                                //color: "red",
                                                weight: 2.5,
                                                radius: getRadius(12)
                                        }).addTo(layers.MONTHS_9_12);

                        }


		};

	};

	// Legend Section getColor(grades[i])
	var legend = L.control({position: 'bottomright'});
        legend.onAdd = function(myMap) {

        	var div = L.DomUtil.create('div', 'info legend'),
			grades = [1, 3, 6, 9, 12, 15, 18, 21];

		div.innerHTML += "Time" + '<br>'

                for (var i=0; i<grades.length; i++) {
                        div.innerHTML +=
                                '<i style="background:' + getColor(grades[i]) + ' "></i> ' +
                                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');

                }
                return div;
	};
        legend.addTo(myMap);

	var legend1 = L.control({position: 'bottomleft'});
        legend1.onAdd = function(myMap) {

                var div = L.DomUtil.create('div', 'info legend'),
                        grades = ["Jan", "Mar", "Jun", "Sep"];

		div.innerHTML += "Month" + '<br>'

                for (var i=0; i<grades.length; i++) {
                        div.innerHTML +=
                                '<i style="background:' + getColorMonth(grades[i]) + ' "></i> ' +
                                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');

                }
                return div;
        };
        legend1.addTo(myMap);

});

