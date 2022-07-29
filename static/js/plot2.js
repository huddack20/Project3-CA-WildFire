fireLocations = "https://raw.githubusercontent.com/ErinBuday/Project-3/main/wildfiresCleaned2.json"

function plot(year) {

    d3.json(fireLocations).then(function(data) {
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var hourNames = ["12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"];

        var monthCountsUndetermined = [0,0,0,0,0,0,0,0,0,0,0,0];
        var monthCountsUnknown = [0,0,0,0,0,0,0,0,0,0,0,0];
        var monthCountsHuman = [0,0,0,0,0,0,0,0,0,0,0,0];
        var monthCountsNatural = [0,0,0,0,0,0,0,0,0,0,0,0];

        var hourCountsUndetermined = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var hourCountsUnkown = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var hourCountsHuman = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var hourCountsNatural = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

        if (year === 0) {
            var yearName = "All Years";
        } else {
            var yearName = year;
        };
      

        
        for (var i=0; i < data.data.length; i++) {
            
            var fireMonth = data.data[i][1][1] -1;
            var fireHour = data.data[i][1][0];
            var fireYear = data.data[i][1][2];
            var fireCause = data.data[i][0];

            if (year === 0) {        
                if (fireCause === "Undetermined") {
                    monthCountsUndetermined[fireMonth] += 1;
                    hourCountsUndetermined[fireHour] += 1;
                } else if (fireCause === "Unknown") {
                    monthCountsUnknown[fireMonth] += 1;
                    hourCountsUnkown[fireHour] += 1;
                } else if (fireCause === "Human") {
                    monthCountsHuman[fireMonth] += 1;
                    hourCountsHuman[fireHour] += 1;
                } else if (fireCause === "Natural") {
                    monthCountsNatural[fireMonth] += 1;
                    hourCountsNatural[fireHour] += 1;
                };
            }; 

            if (year === fireYear) {
                if (fireCause === "Undetermined") {
                    monthCountsUndetermined[fireMonth] += 1;
                    hourCountsUndetermined[fireHour] += 1;
                } else if (fireCause === "Unknown") {
                    monthCountsUnknown[fireMonth] += 1;
                    hourCountsUnkown[fireHour] += 1;
                } else if (fireCause === "Human") {
                    monthCountsHuman[fireMonth] += 1;
                    hourCountsHuman[fireHour] += 1;
                } else if (fireCause === "Natural") {
                    monthCountsNatural[fireMonth] += 1;
                    hourCountsNatural[fireHour] += 1;
                };
            }
        }

        var traceMonthUnknown = {
            x: monthNames,
            y: monthCountsUnknown,
            name: "Unknown",
            type: "bar",
            marker: {
                color: "rgb(255,77,0)"
            }
        }

        var traceMonthHuman = {
            x: monthNames,
            y: monthCountsHuman,
            name: "Human",
            type: "bar",
            marker: {
                color: "rgb(255,154,0)"
            }
        }

        var traceMonthNatural = {
            x: monthNames,
            y: monthCountsNatural,
            name: "Natural",
            type: "bar",
            marker: {
                color: "rgb(255,193,0)"
            }
        }

        var traceMonthUndetermined = {
            x: monthNames,
            y: monthCountsUndetermined,
            name: "Undetermined",
            type: "bar",
            marker: {
                color: "rgb(255,0,0)"
            }
        }

        // Hour counts

        var traceHourUnknown = {
            x: hourNames,
            y: hourCountsUnkown,
            name: "Unknown",
            type: "bar",
            marker: {
                color: "rgb(255,77,0)"
            }
        }

        var traceHourHuman = {
            x: hourNames,
            y: hourCountsHuman,
            name: "Human",
            type: "bar",
            marker: {
                color: "rgb(255,154,0)"
            }
        }

        var traceHourNatural = {
            x: hourNames,
            y: hourCountsNatural,
            name: "Natural",
            type: "bar",
            marker: {
                color: "rgb(255,193,0)"
            }
        }

        var traceHourUndetermined = {
            x: hourNames,
            y: hourCountsUndetermined,
            name: "Undetermined",
            type: "bar",
            marker: {
                color: "rgb(255,0,0)"
            }
        }

        var traceDataMonthStacked = [traceMonthUndetermined, traceMonthUnknown, traceMonthHuman, traceMonthNatural];
        var traceDataHourStacked = [traceHourUndetermined, traceHourUnknown, traceHourHuman, traceHourNatural];

        var layoutStackedMonths = {
            title: `Number of Fire Incidents by Cause (${yearName})`,
            yaxis: {
                title: "Number of Incidents",
            },
            xaxis: {
                tickangle: -45,
                title: 'Months'
            },
            maring: {
                l: 100,
                r: 100,
                t: 100,
                b: 100,
            },
            barmode: "stack"

        }

        var layoutStackedHours = {
            yaxis: {
                title: "Number of Incidents",
            },
            xaxis: {
                tickangle: -45,
                title: 'Hours'
            },
            maring: {
                l: 100,
                r: 100,
                t: 100,
                b: 100,
            },
            barmode: "stack"

        };

        Plotly.newPlot("firesByMonth", traceDataMonthStacked, layoutStackedMonths);
        Plotly.newPlot("firesByHour", traceDataHourStacked, layoutStackedHours);
        console.log("Graphs made");
    });
};



function init() {
    plot(0)
    d3.json(fireLocations).then(function(data) {
        currentTime = new Date()
        currentTimeCount = 0
        var currentMonth = currentTime.getMonth();
        var currentHour = currentTime.getHours();

        var averageCount = data.data.length / 288;
        var fireGuageNumber = 0;

        for (var i=0; i < data.data.length; i++) {

            var fireMonth = data.data[i][1][1] -1;
            var fireHour = data.data[i][1][0];

            if (currentMonth === fireMonth && currentHour === fireHour) {
                currentTimeCount += 1;
            };         
        }

        if (currentTimeCount < (averageCount * 0.05)) {
            fireGuageNumber = 1;
        } else if (currentTimeCount < (averageCount * 0.659)) {
            fireGuageNumber = 2;
        } else if (currentTimeCount < (averageCount * 1.341)) {
            fireGuageNumber = 3;
        } else if (currentTimeCount < (averageCount * 1.95)) {
            fireGuageNumber = 4;
        } else {
            fireGuageNumber = 5;
        }

        var gauge_data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: fireGuageNumber,
                title: { text: "Current Fire Risk" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    bar: {
                        color: "white",
                        thickness: 0.2
                    },
                    axis: { range: [[null], 5] },
                    steps: [
                        { range: [0, 1], color: 'rgb(44, 186, 0)'},
                        { range: [1, 2], color: 'rgb(163, 255, 0)' },
                        { range: [2, 3], color: 'rgb(255, 244, 0)'},
                        { range: [3, 4], color: 'rgb(255, 167, 0)'},
                        { range: [4, 5], color: 'rgb(255,0,0)'}

                    ],
                    // threshold: {
                    //     line: { color: "white" },
                    // }
                }
            }
        ];

        // Define Plot layout
        var gauge_layout = { width: 500, height: 400, margin: { t: 0, b: 0 } };

        if (fireGuageNumber === 1) {
            var fireRisk = "very low risk";
        } else if (fireGuageNumber === 2) {
            var fireRisk = 'low risk';
        } else if (fireGuageNumber === 3) {
            var fireRisk = 'average risk';
        } else if (fireGuageNumber === 4) {
            var fireRisk = 'high risk';
        } else if (fireGuageNumber === 5) {
            var fireRisk = 'extremely high risk'
        }

        var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
        var timeName = currentTime.toLocaleTimeString('en-US', {hour: 'numeric',hour12: true});

        if (currentMonth <= 3) {
            monthDescription = "The winter months have the lowest frequency of fires, and most of them are human caused."
        } else if (currentMonth < 6) {
            monthDescription = "In spring frequency of fires increases steadily."
        } else if (currentMonth < 8) {
            if (currentMonth === 6) {
                monthDescription = "The summer sports the highes frequency of forest fires, peaking in July. Watch out on the 4th! The majority of naturaly occuring fires happen now."
            } else {
                monthDescription = "The summer sports the highes frequency of forest fires. The majority of naturaly occuring fires happen now."
            }
        } else if (currentMonth < 10) {
            monthDescription = "The frequency of fires steadily declines throughout the fall."
        }

        if (currentHour <= 6) {
            hourDescription = "Early morning experiences the fewest number of fires. The cause of most fires around this time is never found out."
        } else if (currentHour <= 11) {
            hourDescription = "Fire incidents rise steadily throughout the morning."
        } else if (currentHour <=5 ) {
            if (currentHour === 14) {
                if (currentMonth === 6) {
                    hourDescription = "The afternoon experiences the greatest number of fires. 2pm in July? Be careful."
                } else {
                    hourDescription = "The afternoon experiences the greatest number of fires, peaking around now."
                }
            } else {
                hourDescription = "The afternoon experiences the greatest number of fires, peaking around 2pm."
            }
        }else {
            hourDescription = "Rates of fire incidents fall steadily throughout the evening."
        }

        var guageBlurb = `
        <p>It is ${timeName} in the month of ${monthNames[currentMonth]} and the current fire assesment is ${fireRisk} ${monthDescription} ${hourDescription}`

        // Display plot
        Plotly.newPlot('gauge', gauge_data, gauge_layout);

        d3.select('#gaugeBlurb').html(guageBlurb);
    })
};

function optionChanged(value) {
    year = parseInt(value)
    plot(year)
};

init();