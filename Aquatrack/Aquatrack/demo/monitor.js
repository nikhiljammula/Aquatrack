function chart1() {
  am4core.ready(function() {

    am4core.useTheme(am4themes_animated);
    am4core.useTheme(am4themes_dark);

    var chart = am4core.create("topleft", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0;

    chart.data = [{
        node: "Empty",
        value: 2
      },
      {
        node: "Critical",
        value: 13
      },
      {
        node: "Moderate",
        value: 20
      },
      {
        node: "Sufficient",
        value: 45
      },
      {
        node: "Full",
        value: 10
      }
    ];
    chart.radius = am4core.percent(50);
    chart.innerRadius = am4core.percent(40);
    chart.startAngle = 180;
    chart.endAngle = 360;


    var series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "value";
    series.dataFields.category = "node";

    series.slices.template.cornerRadius = 5;
    series.slices.template.innerCornerRadius = 3;
    series.slices.template.draggable = true;
    series.slices.template.inert = true;
    series.alignLabels = false;
    series.labels.template.fill = am4core.color("white");

    series.hiddenState.properties.startAngle = 90;
    series.hiddenState.properties.endAngle = 90;

    series.colors.list = [
      am4core.color("#FF0000"),
      am4core.color("#FF6C00"),
      am4core.color("#FDCD0F"),
      am4core.color("#83FD12"),
      am4core.color("#00adb5")
    ];

    chart.legend = new am4charts.Legend();
    chart.legend.useDefaultMarker = true;
    chart.legend.labels.template.text = "[bold {color}]{name}[/]";


  });
}

chart1();

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
    }, {
      "time": "04:00",
      "water": Math.round(Math.random() * 100),
      "lineColor": gradient
    }, {
      "time": "05:00",
      "water": Math.round(Math.random() * 100),
    }, {
      "time": "06:00",
      "water": Math.round(Math.random() * 100),
    }, {
      "time": "07:00",
      "water": Math.round(Math.random() * 100),
      "lineColor": gradient
    }, {
      "time": "08:00",
      "water": Math.round(Math.random() * 100),
    }, {
      "time": "09:00",
      "water": Math.round(Math.random() * 100),
    }, {
      "time": "10:00",
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
    }, {
      "time": "04:00",
      "water": Math.round(Math.random() * 100),
      "lineColor": gradient
    }, {
      "time": "05:00",
      "water": Math.round(Math.random() * 100),
    }, {
      "time": "06:00",
      "water": Math.round(Math.random() * 100),
    }, {
      "time": "07:00",
      "water": Math.round(Math.random() * 100),
      "lineColor": gradient
    }, {
      "time": "08:00",
      "water": Math.round(Math.random() * 100),
    }, {
      "time": "09:00",
      "water": Math.round(Math.random() * 100),
    }, {
      "time": "10:00",
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
    }, {
      "time": "04:00",
      "water": Math.round(Math.random() * 100),
      "lineColor": gradient
    }, {
      "time": "05:00",
      "water": Math.round(Math.random() * 100),
    }, {
      "time": "06:00",
      "water": Math.round(Math.random() * 100),
    }, {
      "time": "07:00",
      "water": Math.round(Math.random() * 100),
      "lineColor": gradient
    }, {
      "time": "08:00",
      "water": Math.round(Math.random() * 100),
    }, {
      "time": "09:00",
      "water": Math.round(Math.random() * 100),
    }, {
      "time": "10:00",
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
    }, {
      "time": "04:00",
      "water": Math.round(Math.random() * 100),
      "lineColor": gradient
    }, {
      "time": "05:00",
      "water": Math.round(Math.random() * 100),
    }, {
      "time": "06:00",
      "water": Math.round(Math.random() * 100),
    }, {
      "time": "07:00",
      "water": Math.round(Math.random() * 100),
      "lineColor": gradient
    }, {
      "time": "08:00",
      "water": Math.round(Math.random() * 100),
    }, {
      "time": "09:00",
      "water": Math.round(Math.random() * 100),
    }, {
      "time": "10:00",
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

function chart7(){
  am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

// Create chart instance
var chart = am4core.create("midright", am4charts.XYChart);

chart.colors.step = 4;

// Add data
chart.data = [{
  "date": new Date(2018, 0, 1),
  "value": 450,
  "value2": 362,
  "value3": 699
}, {
  "date": new Date(2018, 0, 2),
  "value": 269,
  "value2": 450,
  "value3": 841
}, {
  "date": new Date(2018, 0, 3),
  "value": 700,
  "value2": 358,
  "value3": 699
}, {
  "date": new Date(2018, 0, 4),
  "value": 490,
  "value2": 367,
  "value3": 500
}, {
  "date": new Date(2018, 0, 5),
  "value": 500,
  "value2": 485,
  "value3": 369
}, {
  "date": new Date(2018, 0, 6),
  "value": 550,
  "value2": 354,
  "value3": 250
}, {
  "date": new Date(2018, 0, 7),
  "value": 420,
  "value2": 350,
  "value3": 600
}];

// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.grid.template.location = 0;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
function createSeries(field, name) {
  var series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = field;
  series.dataFields.dateX = "date";
  series.name = name;
  series.tooltipText = "{dateX}: [b]{valueY}[/]";
  series.strokeWidth = 3;
  series.tensionX = 0.9;

  var bullet = series.bullets.push(new am4charts.CircleBullet());
  bullet.circle.stroke = am4core.color("#fff");
  bullet.circle.strokeWidth = 0;

  return series;
}

var series1 = createSeries("value", "Consumer-1");
var series2 = createSeries("value2", "Consumer-2");
var series3 = createSeries("value3", "Consumer-3");

chart.legend = new am4charts.Legend();
chart.cursor = new am4charts.XYCursor();
});
}

chart7();

function mainchart(){
  am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("mainchart", am4charts.XYChart);

chart.colors.step = 5;
chart.maskBullets = false;

// Add data
chart.data = [{
    "date": "2012-01-01",
    "distance": 227,
    "townName": "New York",
    "townName2": "New York",
    "townSize": 12,
    "latitude": 40.71,
    "duration": 408
}, {
    "date": "2012-01-02",
    "distance": 371,
    "townName": "Washington",
    "townSize": 7,
    "latitude": 38.89,
    "duration": 482
}, {
    "date": "2012-01-03",
    "distance": 433,
    "townName": "Wilmington",
    "townSize": 3,
    "latitude": 34.22,
    "duration": 562
}, {
    "date": "2012-01-04",
    "distance": 345,
    "townName": "Jacksonville",
    "townSize": 3.5,
    "latitude": 30.35,
    "duration": 379
}, {
    "date": "2012-01-05",
    "distance": 480,
    "townName": "Miami",
    "townName2": "Miami",
    "townSize": 5,
    "latitude": 25.83,
    "duration": 501
}, {
    "date": "2012-01-06",
    "distance": 386,
    "townName": "Tallahassee",
    "townSize": 3.5,
    "latitude": 30.46,
    "duration": 443
}, {
    "date": "2012-01-07",
    "distance": 348,
    "townName": "New Orleans",
    "townSize": 5,
    "latitude": 29.94,
    "duration": 405
}, {
    "date": "2012-01-08",
    "distance": 238,
    "townName": "Houston",
    "townName2": "Houston",
    "townSize": 8,
    "latitude": 29.76,
    "duration": 309
}, {
    "date": "2012-01-09",
    "distance": 218,
    "townName": "Dalas",
    "townSize": 8,
    "latitude": 32.8,
    "duration": 287
}, {
    "date": "2012-01-10",
    "distance": 349,
    "townName": "Oklahoma City",
    "townSize": 5,
    "latitude": 35.49,
    "duration": 485
}, {
    "date": "2012-01-11",
    "distance": 603,
    "townName": "Kansas City",
    "townSize": 5,
    "latitude": 39.1,
    "duration": 890
}, {
    "date": "2012-01-12",
    "distance": 534,
    "townName": "Denver",
    "townName2": "Denver",
    "townSize": 9,
    "latitude": 39.74,
    "duration": 810
}, {
    "date": "2012-01-13",
    "townName": "Salt Lake City",
    "townSize": 6,
    "distance": 425,
    "duration": 670,
    "latitude": 40.75,
    "dashLength": 8,
    "alpha": 0.4
}, {
    "date": "2012-01-14",
    "distance": 470,
    "townName": "Hyderabad",
    "townSize": 7,
    "latitude": 38.89,
    "duration": 482
},{
    "date": "2012-01-15",
    "distance": 371,
    "townName": "Washington",
    "townSize": 7,
    "latitude": 38.89,
    "duration": 482
},{
    "date": "2012-01-16",
    "distance": 48,
    "townName": "Kolkata",
    "townSize": 9,
    "latitude": 38.89,
    "duration": 482
}, {
    "date": "2012-01-17",
    "distance": 124,
    "townName": "Bangalore",
    "townSize": 7,
    "latitude": 38.89,
    "duration": 482
},];

// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.grid.template.location = 0;
dateAxis.renderer.minGridDistance = 50;
dateAxis.renderer.grid.template.disabled = true;
dateAxis.renderer.fullWidthTooltip = true;

var distanceAxis = chart.yAxes.push(new am4charts.ValueAxis());
distanceAxis.title.text = "Distance";
distanceAxis.renderer.grid.template.disabled = true;

var durationAxis = chart.yAxes.push(new am4charts.DurationAxis());
durationAxis.title.text = "Duration";
durationAxis.baseUnit = "minute";
durationAxis.renderer.grid.template.disabled = true;
durationAxis.renderer.opposite = true;

durationAxis.durationFormatter.durationFormat = "hh'h' mm'min'";

var latitudeAxis = chart.yAxes.push(new am4charts.ValueAxis());
latitudeAxis.renderer.grid.template.disabled = true;
latitudeAxis.renderer.labels.template.disabled = true;

// Create series
var distanceSeries = chart.series.push(new am4charts.ColumnSeries());
distanceSeries.dataFields.valueY = "distance";
distanceSeries.dataFields.dateX = "date";
distanceSeries.yAxis = distanceAxis;
distanceSeries.tooltipText = "{valueY} miles";
distanceSeries.name = "Distance";
distanceSeries.columns.template.fillOpacity = 0.7;
distanceSeries.columns.template.propertyFields.strokeDasharray = "dashLength";
distanceSeries.columns.template.propertyFields.fillOpacity = "alpha";

var disatnceState = distanceSeries.columns.template.states.create("hover");
disatnceState.properties.fillOpacity = 0.9;

var durationSeries = chart.series.push(new am4charts.LineSeries());
durationSeries.dataFields.valueY = "duration";
durationSeries.dataFields.dateX = "date";
durationSeries.yAxis = durationAxis;
durationSeries.name = "Duration";
durationSeries.strokeWidth = 2;
durationSeries.propertyFields.strokeDasharray = "dashLength";
durationSeries.tooltipText = "{valueY.formatDuration()}";

var durationBullet = durationSeries.bullets.push(new am4charts.Bullet());
var durationRectangle = durationBullet.createChild(am4core.Rectangle);
durationBullet.horizontalCenter = "middle";
durationBullet.verticalCenter = "middle";
durationBullet.width = 7;
durationBullet.height = 7;
durationRectangle.width = 7;
durationRectangle.height = 7;

var durationState = durationBullet.states.create("hover");
durationState.properties.scale = 1.2;

var latitudeSeries = chart.series.push(new am4charts.LineSeries());
latitudeSeries.dataFields.valueY = "latitude";
latitudeSeries.dataFields.dateX = "date";
latitudeSeries.yAxis = latitudeAxis;
latitudeSeries.name = "Duration";
latitudeSeries.strokeWidth = 2;
latitudeSeries.propertyFields.strokeDasharray = "dashLength";
latitudeSeries.tooltipText = "Latitude: {valueY} ({townName})";

var latitudeBullet = latitudeSeries.bullets.push(new am4charts.CircleBullet());
latitudeBullet.circle.fill = am4core.color("#fff");
latitudeBullet.circle.strokeWidth = 2;
latitudeBullet.circle.propertyFields.radius = "townSize";

var latitudeState = latitudeBullet.states.create("hover");
latitudeState.properties.scale = 1.2;

var latitudeLabel = latitudeSeries.bullets.push(new am4charts.LabelBullet());
latitudeLabel.label.text = "{townName2}";
latitudeLabel.label.horizontalCenter = "left";
latitudeLabel.label.dx = 14;

// Add legend
chart.legend = new am4charts.Legend();

// Add cursor
chart.cursor = new am4charts.XYCursor();
chart.cursor.fullWidthLineX = true;
chart.cursor.xAxis = dateAxis;
chart.cursor.lineX.strokeOpacity = 0;
chart.cursor.lineX.fill = am4core.color("#000");
chart.cursor.lineX.fillOpacity = 0.1;

});
}

mainchart();

$(function () {
  $('[data-toggle="popover"]').popover();
});
