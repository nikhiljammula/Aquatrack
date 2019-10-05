 function chart2(response , id) {
  am4core.ready(function() {
  // Themes begin
  am4core.useTheme(am4themes_dark);
  am4core.useTheme(am4themes_animated);
  // Themes end

  // create chart
  var chart = am4core.create("topright", am4charts.GaugeChart);
  chart.innerRadius = am4core.percent(82);

  /**
   * Normal axis
   */

  var axis = chart.xAxes.push(new am4charts.ValueAxis());
  axis.min = 0;
  axis.max = 100;
  axis.strictMinMax = true;
  axis.renderer.radius = am4core.percent(80);
  axis.renderer.inside = true;
  axis.renderer.line.strokeOpacity = 1;
  axis.renderer.ticks.template.disabled = false;
  axis.renderer.ticks.template.strokeOpacity = 1;
  axis.renderer.ticks.template.length = 10;
  axis.renderer.grid.template.disabled = true;
  axis.renderer.labels.template.radius = 40;
  axis.renderer.labels.template.adapter.add("text", function(text) {
    return text + "%";
  });

  /**
   * Axis for ranges
   */

  var colorSet = new am4core.ColorSet();

  var axis2 = chart.xAxes.push(new am4charts.ValueAxis());
  axis2.min = 0;
  axis2.max = 100;
  axis2.renderer.innerRadius = 10;    //wait a moment
  axis2.strictMinMax = true;
  axis2.renderer.labels.template.disabled = true;
  axis2.renderer.ticks.template.disabled = true;
  axis2.renderer.grid.template.disabled = true;

  var range0 = axis2.axisRanges.create();
  range0.value = 0;
  range0.endValue = 50;
  range0.axisFill.fillOpacity = 1;
  range0.axisFill.fill = colorSet.getIndex(0);

  var range1 = axis2.axisRanges.create();
  range1.value = 50;
  range1.endValue = 100;
  range1.axisFill.fillOpacity = 1;
  range1.axisFill.fill = colorSet.getIndex(2);

  /**
   * Label
   */

  var label = chart.radarContainer.createChild(am4core.Label);
  label.isMeasured = false;
  label.fontSize = 45;
  label.x = am4core.percent(50);
  label.y = am4core.percent(100);
  label.horizontalCenter = "middle";
  label.verticalCenter = "bottom";



  /**
   * Hand
   */

  var hand = chart.hands.push(new am4charts.ClockHand());
  hand.axis = axis2;
  hand.innerRadius = am4core.percent(20);
  hand.startWidth = 10;
  hand.pin.disabled = true;
  hand.value = 50;

  hand.events.on("propertychanged", function(ev) {
    range0.endValue = ev.target.value;
    range1.value = ev.target.value;
    axis2.invalidate();
  });
  var value = response.Items[0].depth.N ;//response.Items[i].depth.N
  // alert("value in "+value + "id is " + id);
  var percent =0;
  switch(id)
  {
    case 1: percent = (value/14) * 100;
    break;
    case 2: percent = (value/10) * 100;
    break;
    case 3: percent = (value/8) * 100;
    break;
    case 4: percent = (value/16) * 100;
    break;

  }

  var animation = new am4core.Animation(hand, {
    property: "value",
    to: percent
  }, 1000, am4core.ease.cubicOut).start();
  label.text = percent+"%";
  // setInterval(function() {
  //   //ajax method for the last row or that particular id.........
  //   var value = Math.round(Math.random() * 100);
  //   label.text = value + "%";
  //
  // }, 2000);

  // });
}); // end am4core.ready()
}
chart2();

function chart3() {
  am4core.ready(function() {

    var settings = {
      "url": "https://cqddtvdic5.execute-api.ap-south-1.amazonaws.com/get-values/simulated-values/" + 3,
      "method": "GET",
    };

    var data = [];
    var chart = am4core.create("first", am4charts.XYChart);//Is the div name correct?

    var gradient = new am4core.LinearGradient();
    gradient.addColor(am4core.color("cyan"));
    gradient.addColor(am4core.color("teal"));

    $.ajax(settings).done(function(response) {
      var count = response.Items.length;
      for (i = 0; i < count ; i++) {
        if (i == 0) {
          data.push({
            "timestamp": moment(parseInt(response.Items[i].timestamp.N)).format("HH:mm:ss"), // new Date() , //moment(tabledata.Items[i].timestamp.N).format("DD-MM-YYYY h:mm:ss"), //tabledata.Items[i].timestamp.N,//moment(1439198499).format("DD-MM-YYYY HH:mm:ss")
            "level": response.Items[i].level.N,
            "lineColor": gradient
          });
        }
        else {
          data.push({
            "timestamp": moment(parseInt(response.Items[i].timestamp.N)).format("HH:mm:ss"),
            "level": response.Items[i].level.N
          });
        }
      }

      chart.data = data;

    });

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.ticks.template.disabled = true;
    categoryAxis.renderer.line.opacity = 0;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.dataFields.category = "timestamp";
    categoryAxis.startLocation = 0.4;
    categoryAxis.endLocation = 0.6;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.line.opacity = 0;
    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.min = 0;

    var lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.categoryX = "timestamp";
    lineSeries.dataFields.valueY = "level";
    lineSeries.tooltipText = "{valueY.value} metres";
    lineSeries.fillOpacity = 0.5;
    lineSeries.strokeWidth = 3;
    lineSeries.propertyFields.stroke = "lineColor";
    lineSeries.propertyFields.fill = "lineColor";

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panX";
    chart.cursor.lineX.opacity = 0;
    chart.cursor.lineY.opacity = 0;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.parent = chart.bottomAxesContainer;

  });
}

chart3();

function chart4() {
  am4core.ready(function() {

    var settings = {
      "url": "https://cqddtvdic5.execute-api.ap-south-1.amazonaws.com/get-values/simulated-values/" + 2,
      "method": "GET",
    };

    var data = [];
    var chart = am4core.create("ssecond", am4charts.XYChart);//the div name is correct: ssecond

    var gradient = new am4core.LinearGradient();
    gradient.addColor(am4core.color("cyan"));
    gradient.addColor(am4core.color("teal"));

    $.ajax(settings).done(function(response) {
      var count = response.Items.length;
      for (i = 0; i < count ; i++) {
        if (i == 0) {
          data.push({
            "timestamp": moment(parseInt(response.Items[i].timestamp.N)).format("HH:mm:ss"), // new Date() , //moment(tabledata.Items[i].timestamp.N).format("DD-MM-YYYY h:mm:ss"), //tabledata.Items[i].timestamp.N,//moment(1439198499).format("DD-MM-YYYY HH:mm:ss")
            "level": response.Items[i].level.N,
            "lineColor": gradient
          });
        }
        else {
          data.push({
            "timestamp": moment(parseInt(response.Items[i].timestamp.N)).format("HH:mm:ss"),
            "level": response.Items[i].level.N
          });
        }
      }

      chart.data = data;

    });

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.ticks.template.disabled = true;
    categoryAxis.renderer.line.opacity = 0;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.dataFields.category = "timestamp";
    categoryAxis.startLocation = 0.4;
    categoryAxis.endLocation = 0.6;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.line.opacity = 0;
    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.min = 0;

    var lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.categoryX = "timestamp";
    lineSeries.dataFields.valueY = "level";
    lineSeries.tooltipText = "{valueY.value} metres";
    lineSeries.fillOpacity = 0.5;
    lineSeries.strokeWidth = 3;
    lineSeries.propertyFields.stroke = "lineColor";
    lineSeries.propertyFields.fill = "lineColor";

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panX";
    chart.cursor.lineX.opacity = 0;
    chart.cursor.lineY.opacity = 0;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.parent = chart.bottomAxesContainer;

  });
}
chart4();

function chart5() {
  am4core.ready(function() {

    var settings = {
      "url": "https://cqddtvdic5.execute-api.ap-south-1.amazonaws.com/get-values/simulated-values/" + 3,
      "method": "GET",
    };

    var data = [];
    var chart = am4core.create("third", am4charts.XYChart);//Is the div name correct?

    var gradient = new am4core.LinearGradient();
    gradient.addColor(am4core.color("cyan"));
    gradient.addColor(am4core.color("teal"));

    $.ajax(settings).done(function(response) {
      var count = response.Items.length;
      for (i = 0; i < count ; i++) {
        if (i == 0) {
          data.push({
            "timestamp": moment(parseInt(response.Items[i].timestamp.N)).format("HH:mm:ss"), // new Date() , //moment(tabledata.Items[i].timestamp.N).format("DD-MM-YYYY h:mm:ss"), //tabledata.Items[i].timestamp.N,//moment(1439198499).format("DD-MM-YYYY HH:mm:ss")
            "level": response.Items[i].level.N,
            "lineColor": gradient
          });
        }
        else {
          data.push({
            "timestamp": moment(parseInt(response.Items[i].timestamp.N)).format("HH:mm:ss"),
            "level": response.Items[i].level.N
          });
        }
      }

      chart.data = data;

    });

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.ticks.template.disabled = true;
    categoryAxis.renderer.line.opacity = 0;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.dataFields.category = "timestamp";
    categoryAxis.startLocation = 0.4;
    categoryAxis.endLocation = 0.6;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.line.opacity = 0;
    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.min = 0;

    var lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.categoryX = "timestamp";
    lineSeries.dataFields.valueY = "level";
    lineSeries.tooltipText = "{valueY.value} metres";
    lineSeries.fillOpacity = 0.5;
    lineSeries.strokeWidth = 3;
    lineSeries.propertyFields.stroke = "lineColor";
    lineSeries.propertyFields.fill = "lineColor";

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panX";
    chart.cursor.lineX.opacity = 0;
    chart.cursor.lineY.opacity = 0;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.parent = chart.bottomAxesContainer;

  });
}
chart5();

function chart6() {
  am4core.ready(function() {

    var settings = {
      "url": "https://cqddtvdic5.execute-api.ap-south-1.amazonaws.com/get-values/simulated-values/" + 4,
      "method": "GET",
    };

    var data = [];
    var chart = am4core.create("forth", am4charts.XYChart);//Is the div name correct?

    var gradient = new am4core.LinearGradient();
    gradient.addColor(am4core.color("cyan"));
    gradient.addColor(am4core.color("teal"));

    $.ajax(settings).done(function(response) {
      var count = response.Items.length;
      for (i = 0; i < count ; i++) {
        if (i == 0) {
          data.push({
            "timestamp": moment(parseInt(response.Items[i].timestamp.N)).format("HH:mm:ss"), // new Date() , //moment(tabledata.Items[i].timestamp.N).format("DD-MM-YYYY h:mm:ss"), //tabledata.Items[i].timestamp.N,//moment(1439198499).format("DD-MM-YYYY HH:mm:ss")
            "level": response.Items[i].level.N,
            "lineColor": gradient
          });
        }
        else {
          data.push({
            "timestamp": moment(parseInt(response.Items[i].timestamp.N)).format("HH:mm:ss"),
            "level": response.Items[i].level.N
          });
        }
      }

      chart.data = data;

    });

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.ticks.template.disabled = true;
    categoryAxis.renderer.line.opacity = 0;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.dataFields.category = "timestamp";
    categoryAxis.startLocation = 0.4;
    categoryAxis.endLocation = 0.6;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.line.opacity = 0;
    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.min = 0;

    var lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.categoryX = "timestamp";
    lineSeries.dataFields.valueY = "level";
    lineSeries.tooltipText = "{valueY.value} metres";
    lineSeries.fillOpacity = 0.5;
    lineSeries.strokeWidth = 3;
    lineSeries.propertyFields.stroke = "lineColor";
    lineSeries.propertyFields.fill = "lineColor";

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panX";
    chart.cursor.lineX.opacity = 0;
    chart.cursor.lineY.opacity = 0;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.parent = chart.bottomAxesContainer;

  });

}
chart6();

function mainchart(response) {
  am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("mainchart", am4charts.XYChart);

    // Add data
    var now = moment();
    var count = response.Items.length;

    var data = [];
    for (i = count - 1; i >= 0; i--) {
      data.push({
        "timestamp": moment(parseInt(response.Items[i].timestamp.N)).format("DD-MM-YYYY HH:mm:ss"), // new Date() , //moment(tabledata.Items[i].timestamp.N).format("DD-MM-YYYY h:mm:ss"), //tabledata.Items[i].timestamp.N,//moment(1439198499).format("DD-MM-YYYY HH:mm:ss")
        "depth": response.Items[i].depth.N,
        "level": response.Items[i].level.N,
        "vol": response.Items[i].vol.N,
      });
    }
    chart.data = data;

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "timestamp";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
      if (target.dataItem && target.dataItem.index & 2 == 2) {
        return dy + 25;
      }
      return dy;
    });

    var valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis1.title.text = "Volume";

    var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.title.text = "Levels";
    valueAxis2.renderer.opposite = true;
    valueAxis2.renderer.grid.template.disabled = true;

    // Create series
    var series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.dataFields.valueY = "vol";
    series1.dataFields.categoryX = "timestamp";
    series1.yAxis = valueAxis1;
    series1.name = "Volume";
    series1.tooltipText = "{name}\n[bold font-size: 20]{valueY}M[/] litres";
    series1.fill = chart.colors.getIndex(0);
    series1.strokeWidth = 0;
    series1.clustered = false;
    series1.columns.template.width = am4core.percent(40);

    var series3 = chart.series.push(new am4charts.LineSeries());
    series3.dataFields.valueY = "depth";
    series3.dataFields.categoryX = "timestamp";
    series3.name = "Depth";
    series3.strokeWidth = 2;
    series3.tensionX = 0.7;
    series3.yAxis = valueAxis2;
    series3.tooltipText = "{name}\n[bold font-size: 20]{valueY}[/] metres";

    var bullet3 = series3.bullets.push(new am4charts.CircleBullet());
    bullet3.circle.radius = 3;
    bullet3.circle.strokeWidth = 2;
    bullet3.circle.fill = am4core.color("#fff");

    var series4 = chart.series.push(new am4charts.LineSeries());
    series4.dataFields.valueY = "level";
    series4.dataFields.categoryX = "timestamp";
    series4.name = "Level";
    series4.strokeWidth = 2.5;
    series4.tensionX = 0.7;
    series4.yAxis = valueAxis2;
    series4.tooltipText = "{name}\n[bold font-size: 20]{valueY}[/] metres";
    series4.stroke = chart.colors.getIndex(6).lighten(0.5);
    series4.strokeDasharray = "3,3";

    var bullet4 = series4.bullets.push(new am4charts.CircleBullet());
    bullet4.circle.radius = 3;
    bullet4.circle.strokeWidth = 2;
    bullet4.circle.fill = am4core.color("#fff");

    // Add cursor
    chart.cursor = new am4charts.XYCursor();

    // Add legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";

    // Add scrollbar
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series1);
    chart.scrollbarX.series.push(series3);
    chart.scrollbarX.parent = chart.bottomAxesContainer;

  });
}

function lastchart(){
  am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("foot", am4charts.XYChart);
chart.hiddenState.properties.opacity = 0;

chart.padding(0, 0, 0, 0);

chart.zoomOutButton.disabled = true;

var data = [];
var visits = 10;
var i = 0;

for (i = 0; i <= 30; i++) {
    visits -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
    data.push({ date: new Date().setSeconds(i - 30), value: visits });
}

chart.data = data;

var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.grid.template.location = 0;
dateAxis.renderer.minGridDistance = 30;
dateAxis.dateFormats.setKey("second", "ss");
dateAxis.periodChangeDateFormats.setKey("second", "[bold]h:mm a");
dateAxis.periodChangeDateFormats.setKey("minute", "[bold]h:mm a");
dateAxis.periodChangeDateFormats.setKey("hour", "[bold]h:mm a");
dateAxis.renderer.inside = true;
dateAxis.renderer.axisFills.template.disabled = true;
dateAxis.renderer.ticks.template.disabled = true;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.tooltip.disabled = true;
valueAxis.interpolationDuration = 500;
valueAxis.rangeChangeDuration = 500;
valueAxis.renderer.inside = true;
valueAxis.renderer.minLabelPosition = 0.05;
valueAxis.renderer.maxLabelPosition = 0.95;
valueAxis.renderer.axisFills.template.disabled = true;
valueAxis.renderer.ticks.template.disabled = true;

var series = chart.series.push(new am4charts.LineSeries());
series.dataFields.dateX = "date";
series.dataFields.valueY = "value";
series.interpolationDuration = 500;
series.defaultState.transitionDuration = 0;
series.tensionX = 0.8;

chart.events.on("datavalidated", function () {
    dateAxis.zoom({ start: 1 / 15, end: 1.2 }, false, true);
});

dateAxis.interpolationDuration = 500;
dateAxis.rangeChangeDuration = 500;

document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        if (interval) {
            clearInterval(interval);
        }
    }
    else {
        startInterval();
    }
}, false);

// add data
var interval;
function startInterval() {
    interval = setInterval(function() {
        visits =
            visits + Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
        var lastdataItem = series.dataItems.getIndex(series.dataItems.length - 1);
        chart.addData(
            { date: new Date(lastdataItem.dateX.getTime() + 1000), value: visits },
            1
        );
    }, 5000);
}

startInterval();

// all the below is optional, makes some fancy effects
// gradient fill of the series
series.fillOpacity = 1;
var gradient = new am4core.LinearGradient();
gradient.addColor(chart.colors.getIndex(0), 0.2);
gradient.addColor(chart.colors.getIndex(0), 0);
series.fill = gradient;

// this makes date axis labels to fade out
dateAxis.renderer.labels.template.adapter.add("fillOpacity", function (fillOpacity, target) {
    var dataItem = target.dataItem;
    return dataItem.position;
});

// need to set this, otherwise fillOpacity is not changed and not set
dateAxis.events.on("validated", function () {
    am4core.iter.each(dateAxis.renderer.labels.iterator(), function (label) {
        label.fillOpacity = label.fillOpacity;
    });
});

// this makes date axis labels which are at equal minutes to be rotated
dateAxis.renderer.labels.template.adapter.add("rotation", function (rotation, target) {
    var dataItem = target.dataItem;
    if (dataItem.date && dataItem.date.getTime() == am4core.time.round(new Date(dataItem.date.getTime()), "minute").getTime()) {
        target.verticalCenter = "middle";
        target.horizontalCenter = "left";
        return -90;
    }
    else {
        target.verticalCenter = "bottom";
        target.horizontalCenter = "middle";
        return 0;
    }
})

// bullet at the front of the line
var bullet = series.createChild(am4charts.CircleBullet);
bullet.circle.radius = 6;
bullet.fillOpacity = 1;
bullet.fill = chart.colors.getIndex(0);
bullet.isMeasured = false;

series.events.on("validated", function() {
    bullet.moveTo(series.dataItems.last.point);
    bullet.validatePosition();
});

}); // end am4core.ready()
}
lastchart();

//mainchart();
var dateTime;

function setTableValues(settings, response) {
  var temp = "";
  //response.Items.length    <td>${response.Items[i].id.N}</td>
  $.ajax(settings).done(function(response) {
    $("#idValues").empty();
    for (i = 0; i < 6; i++) {
      dateTime = new Date(parseInt(response.Items[i].timestamp.N));
      temp = temp + `<tr>
                  <td>${dateTime.getDate() + "-"+ (dateTime.getMonth()+1)  + "-" + dateTime.getFullYear() + "   "  + dateTime.getHours() + ":"  + dateTime.getMinutes() + ":" + dateTime.getSeconds()}</td>
                  <td>${response.Items[i].depth.N}</td>
                  <td>${response.Items[i].level.N}</td>
                  <td>${response.Items[i].vol.N}</td>
              </tr>`;
    }
    $("table").append(temp);
    temp = "";
  });


}

function getvalues(value) {
  alert(value);

  //let val = parseInt($("#a1").val(), 10);
  setInterval(() => {
    var settings = {
      "url": "https://cqddtvdic5.execute-api.ap-south-1.amazonaws.com/get-values/simulated-values/" + value,
      "method": "GET",
    };
    //let temp = ""

    $.ajax(settings).done(function(response) {
      console.log("table values "+response);
      mainchart(response);
      setTableValues(settings, response);
      chart2(response,value);
      chart3();
      chart4();
      chart5();
      chart6();
    });
  }, 15000);
}

$(function() {
  $('[data-toggle="popover"]').popover();
});
