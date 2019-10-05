// function chart1() {
//   am4core.ready(function() {
//
//     am4core.useTheme(am4themes_animated);
//     am4core.useTheme(am4themes_dark);
//
//     var chart = am4core.create("topleft", am4charts.PieChart);
//     chart.hiddenState.properties.opacity = 0;
//
//     chart.data = [{
//         node: "Empty",
//         value: 2
//       },
//       {
//         node: "Critical",
//         value: 13
//       },
//       {
//         node: "Moderate",
//         value: 20
//       },
//       {
//         node: "Sufficient",
//         value: 45
//       },
//       {
//         node: "Full",
//         value: 10
//       }
//     ];
//     chart.radius = am4core.percent(50);
//     chart.innerRadius = am4core.percent(40);
//     chart.startAngle = 180;
//     chart.endAngle = 360;
//
//
//     var series = chart.series.push(new am4charts.PieSeries());
//     series.dataFields.value = "value";
//     series.dataFields.category = "node";
//
//     series.slices.template.cornerRadius = 5;
//     series.slices.template.innerCornerRadius = 3;
//     series.slices.template.draggable = true;
//     series.slices.template.inert = true;
//     series.alignLabels = false;
//     series.labels.template.fill = am4core.color("white");
//
//     series.hiddenState.properties.startAngle = 90;
//     series.hiddenState.properties.endAngle = 90;
//
//     series.colors.list = [
//       am4core.color("#FF0000"),
//       am4core.color("#FF6C00"),
//       am4core.color("#FDCD0F"),
//       am4core.color("#83FD12"),
//       am4core.color("#00adb5")
//     ];
//
//     chart.legend = new am4charts.Legend();
//     chart.legend.useDefaultMarker = true;
//     chart.legend.labels.template.text = "[bold {color}]{name}[/]";
//
//
//   });
// }
//
// chart1();

function chart2() {
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
  axis2.renderer.innerRadius = 10;
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
  label.text = "50%";


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

  setInterval(function() {
    //ajax method for the last row or that particular id.........
    var value = Math.round(Math.random() * 100);
    label.text = value + "%";
    var animation = new am4core.Animation(hand, {
      property: "value",
      to: value
    }, 1000, am4core.ease.cubicOut).start();
  }, 2000);

  // });
}

chart2();

function chart3() {
  am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("first", am4charts.XYChart);

    var data = [];

    var gradient = new am4core.LinearGradient();
    gradient.addColor(am4core.color("cyan"));
    gradient.addColor(am4core.color("teal"));

    chart.data = [{
      "time": "00:00",
      "water": Math.round(Math.random() * 100),
      "lineColor": gradient
    }, {
      "time": "01:00",
      "water": Math.round(Math.random() * 100),
    }, {
      "time": "02:00",
      "water": Math.round(Math.random() * 100),
    }, {
      "time": "03:00",
      "water": Math.round(Math.random() * 100),
    }];


    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.ticks.template.disabled = true;
    categoryAxis.renderer.line.opacity = 0;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.dataFields.category = "time";
    categoryAxis.startLocation = 0.4;
    categoryAxis.endLocation = 0.6;


    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.line.opacity = 0;
    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.min = 0;

    var lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.categoryX = "time";
    lineSeries.dataFields.valueY = "water";
    lineSeries.tooltipText = "water: {valueY.value}";
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

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("ssecond", am4charts.XYChart);

    var data = [];

    var gradient = new am4core.LinearGradient();
    gradient.addColor(am4core.color("cyan"));
    gradient.addColor(am4core.color("teal"));

    chart.data = [{
      "time": "00:00",
      "water": Math.round(Math.random() * 100),
      "lineColor": gradient
    }, {
      "time": "01:00",
      "water": Math.round(Math.random() * 100),
    }, {
      "time": "02:00",
      "water": Math.round(Math.random() * 100),
    }, {
      "time": "03:00",
      "water": Math.round(Math.random() * 100),
    }];


    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.ticks.template.disabled = true;
    categoryAxis.renderer.line.opacity = 0;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.dataFields.category = "time";
    categoryAxis.startLocation = 0.4;
    categoryAxis.endLocation = 0.6;


    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.line.opacity = 0;
    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.min = 0;

    var lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.categoryX = "time";
    lineSeries.dataFields.valueY = "water";
    lineSeries.tooltipText = "water: {valueY.value}";
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

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("third", am4charts.XYChart);

    var data = [];

    var gradient = new am4core.LinearGradient();
    gradient.addColor(am4core.color("cyan"));
    gradient.addColor(am4core.color("teal"));

    chart.data = [{
      "time": "00:00",
      "water": Math.round(Math.random() * 100),
      "lineColor": gradient
    }, {
      "time": "01:00",
      "water": Math.round(Math.random() * 100),
    }, {
      "time": "02:00",
      "water": Math.round(Math.random() * 100),
    }, {
      "time": "03:00",
      "water": Math.round(Math.random() * 100),
    }];


    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.ticks.template.disabled = true;
    categoryAxis.renderer.line.opacity = 0;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.dataFields.category = "time";
    categoryAxis.startLocation = 0.4;
    categoryAxis.endLocation = 0.6;


    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.line.opacity = 0;
    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.min = 0;

    var lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.categoryX = "time";
    lineSeries.dataFields.valueY = "water";
    lineSeries.tooltipText = "water: {valueY.value}";
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

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("forth", am4charts.XYChart);

    var data = [];

    var gradient = new am4core.LinearGradient();
    gradient.addColor(am4core.color("cyan"));
    gradient.addColor(am4core.color("teal"));

    chart.data = [{
      "time": "00:00",
      "water": Math.round(Math.random() * 100),
      "lineColor": gradient
    }, {
      "time": "01:00",
      "water": Math.round(Math.random() * 100),
    }, {
      "time": "02:00",
      "water": Math.round(Math.random() * 100),
    }, {
      "time": "03:00",
      "water": Math.round(Math.random() * 100),
    }];


    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.ticks.template.disabled = true;
    categoryAxis.renderer.line.opacity = 0;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.dataFields.category = "time";
    categoryAxis.startLocation = 0.4;
    categoryAxis.endLocation = 0.6;


    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.line.opacity = 0;
    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.min = 0;

    var lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.categoryX = "time";
    lineSeries.dataFields.valueY = "water";
    lineSeries.tooltipText = "water: {valueY.value}";
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

// function chart7() {
//   am4core.ready(function() {
//
//     // Themes begin
//     am4core.useTheme(am4themes_dark);
//     am4core.useTheme(am4themes_animated);
//     // Themes end
//
//     // Create chart instance
//     var chart = am4core.create("midright", am4charts.XYChart);
//
//     // Increase contrast by taking evey second color
//     chart.colors.step = 2;
//
//     // Add data
//     chart.data = generateChartData();
//
//     // Create axes
//     var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
//     dateAxis.renderer.minGridDistance = 50;
//
//     // Create series
//     function createAxisAndSeries(field, name, opposite, bullet) {
//       var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
//
//       var series = chart.series.push(new am4charts.LineSeries());
//       series.dataFields.valueY = field;
//       series.dataFields.dateX = "date";
//       series.strokeWidth = 2;
//       series.yAxis = valueAxis;
//       series.name = name;
//       series.tooltipText = "{name}: [bold]{valueY}[/]";
//       series.tensionX = 0.8;
//
//       var interfaceColors = new am4core.InterfaceColorSet();
//
//       switch (bullet) {
//         case "triangle":
//           var bullet = series.bullets.push(new am4charts.Bullet());
//           bullet.width = 12;
//           bullet.height = 12;
//           bullet.horizontalCenter = "middle";
//           bullet.verticalCenter = "middle";
//
//           var triangle = bullet.createChild(am4core.Triangle);
//           triangle.stroke = interfaceColors.getFor("background");
//           triangle.direction = "top";
//           triangle.width = 12;
//           triangle.height = 12;
//           break;
//         case "rectangle":
//           var bullet = series.bullets.push(new am4charts.Bullet());
//           bullet.width = 10;
//           bullet.height = 10;
//           bullet.horizontalCenter = "middle";
//           bullet.verticalCenter = "middle";
//
//           var rectangle = bullet.createChild(am4core.Rectangle);
//           rectangle.stroke = interfaceColors.getFor("background");
//           rectangle.width = 10;
//           rectangle.height = 10;
//           break;
//         default:
//           var bullet = series.bullets.push(new am4charts.CircleBullet());
//           bullet.circle.stroke = interfaceColors.getFor("background");
//           break;
//       }
//
//       valueAxis.renderer.line.stroke = series.stroke;
//       valueAxis.renderer.labels.template.fill = series.stroke;
//       valueAxis.renderer.opposite = opposite;
//       valueAxis.renderer.grid.template.disabled = true;
//     }
//
//     createAxisAndSeries("consumer1", "Consumer-1", false, "circle");
//     createAxisAndSeries("consumer2", "Consumer-2", true, "triangle");
//     createAxisAndSeries("consumer3", "Consumer-3", true, "rectangle");
//
//     // Add legend
//     chart.legend = new am4charts.Legend();
//
//     // Add cursor
//     chart.cursor = new am4charts.XYCursor();
//
//     // generate some random data, quite different range
//     function generateChartData() {
//       var chartData = [];
//       var firstDate = new Date();
//       firstDate.setDate(firstDate.getDate() - 100);
//       firstDate.setHours(0, 0, 0, 0);
//
//       var consumer1 = 100;
//       var consumer2 = 100;
//       var consumer3 = 100;
//
//       for (var i = 0; i < 5; i++) {
//         // we create date objects here. In your data, you can have date strings
//         // and then set format of your dates using chart.dataDateFormat property,
//         // however when possible, use date objects, as this will speed up chart rendering.
//         var newDate = new Date(firstDate);
//         newDate.setDate(newDate.getDate() + i);
//
//         consumer1 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
//         consumer2 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
//         consumer3 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
//
//         chartData.push({
//           date: newDate,
//           consumer1: consumer1,
//           consumer2: consumer2,
//           consumer3: consumer3
//         });
//       }
//       return chartData;
//     }
//
//   });
// }
//
// chart7();

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
    //console.log(":::::::::::::::::", new Date(1382086394000));
    var data = [];
    for (i = count - 1; i >= 0; i--) {
      console.log(new Date(parseInt(response.Items[i].timestamp.N)));
      data.push({
        //"id": tabledata.Items[i].id.N,
        "timestamp": moment(parseInt(response.Items[i].timestamp.N)).format("DD-MM-YYYY HH:mm:ss"), // new Date() , //moment(tabledata.Items[i].timestamp.N).format("DD-MM-YYYY h:mm:ss"), //tabledata.Items[i].timestamp.N,//moment(1439198499).format("DD-MM-YYYY HH:mm:ss")
        "depth": response.Items[i].depth.N,
        "level": response.Items[i].level.N,
        "vol": response.Items[i].vol.N,
      });
    }
    chart.data = data;
    // chart.data = [{
    //   "date": "2013-01-26",
    //   "duration": 1439198509,
    //   "market1": 87,
    //   "market2": 92,
    //   "sales1": 4,
    //   "sales2": 8
    // }, {
    //   "date": "2013-01-27",
    //   "duration": 1439198510,
    //   "market1": 84,
    //   "market2": 87,
    //   "sales1": 3,
    //   "sales2": 4
    // }, {
    //   "date": "2013-01-28",
    //   "duration": 1439198511,
    //   "market1": 83,
    //   "market2": 88,
    //   "sales1": 5,
    //   "sales2": 7
    // }, {
    //   "date": "2013-01-29",
    //   "duration": 1439198512,
    //   "market1": 84,
    //   "market2": 87,
    //   "sales1": 5,
    //   "sales2": 8
    // }, {
    //   "date": "2013-01-30",
    //   "duration": 1439198513,
    //   "market1": 81,
    //   "market2": 85,
    //   "sales1": 4,
    //   "sales2": 7
    // }];

    // Create axes
    // yAxis = chart.yAxes.push(new am4charts.DurationAxis());
    // yAxis.baseUnit = "second";
    // yAxis.title.text = "Duration";
    // var dateAxis = chart.xAxes.push(new am4charts.DurationAxis());
    // dateAxis.baseUnit = "second";
    // dateAxis.title.text = "Duration";
    //dateAxis.renderer.grid.template.location = 0;
    //dateAxis.renderer.minGridDistance = 30;

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

    // var series2 = chart.series.push(new am4charts.ColumnSeries());
    // series2.dataFields.valueY = "sales2";
    // series2.dataFields.categoryX = "timestamp";
    // series2.yAxis = valueAxis1;
    // series2.name = "Actual Sales";
    // series2.tooltipText = "{name}\n[bold font-size: 20]${valueY}M[/]";
    // series2.fill = chart.colors.getIndex(0).lighten(0.5);
    // series2.strokeWidth = 0;
    // series2.clustered = false;
    // series2.toBack();

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

//mainchart();
var dateTime;

function setTableValues(settings, response) {
  var temp = "";
  setInterval(() => {
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
  }, 2000);

}

function getvalues(value) {
  alert(value);
  //let val = parseInt($("#a1").val(), 10);
  var settings = {
    "url": "https://cqddtvdic5.execute-api.ap-south-1.amazonaws.com/get-values/simulated-values/" + value,
    "method": "GET",
  };
  //let temp = ""

  $.ajax(settings).done(function(response) {
    console.log(response);
    mainchart(response);
    setTableValues(settings, response);
    chart3(value);

  });

}

$(function() {
  $('[data-toggle="popover"]').popover();
});
