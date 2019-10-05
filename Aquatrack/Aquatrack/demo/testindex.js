function chart1() {

  am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("graph", am4plugins_forceDirected.ForceDirectedTree);

    var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());
    networkSeries.dataFields.linkWith = "linkWith";
    networkSeries.dataFields.name = "name";
    networkSeries.dataFields.id = "name";
    networkSeries.dataFields.value = "value";
    networkSeries.dataFields.children = "children";
    networkSeries.dataFields.color = "color";

    networkSeries.colors.list = [
      am4core.color("#A267DB"),
      am4core.color("#6671DB"),
      am4core.color("#00adb5")
    ];

    networkSeries.nodes.template.label.text = "{name}";
    networkSeries.fontSize = 15;
    networkSeries.linkWithStrength = 0;
    networkSeries.manyBodyStrength = -40;


    var nodeTemplate = networkSeries.nodes.template;
    nodeTemplate.tooltipText = "{name}";
    nodeTemplate.fillOpacity = 1;
    nodeTemplate.label.hideOversized = true;
    nodeTemplate.label.truncate = true;

    var linkTemplate = networkSeries.links.template;
    linkTemplate.strokeWidth = 2;
    linkTemplate.distance = 2;
    var linkHoverState = linkTemplate.states.create("hover");
    linkHoverState.strokeOpacity = 4;
    linkHoverState.strokeWidth = 5;

    nodeTemplate.events.on("over", function(event) {
      var dataItem = event.target.dataItem;
      dataItem.childLinks.each(function(link) {
        link.isHover = true;
      });
    });

    nodeTemplate.events.on("out", function(event) {
      var dataItem = event.target.dataItem;
      dataItem.childLinks.each(function(link) {
        link.isHover = false;
      });
    });

    networkSeries.data = [{
        "name": "Supplier-1",
        "value": 150,
        "linkWith": [
          "Supplier-3"
        ],
        "children": [{
            "name": "Consumer-1",
            "value": 80
          },
          {
            "name": "Consumer-2",
            "value": 100
          },
          {
            "name": "Consumer-3",
            "value": 60
          },
          {
            "name": "Consumer-4",
            "value": 40
          }
        ]
      },
      {
        "name": "Supplier-2",
        "value": 125,
        "linkWith": [
          "Supplier-1",
          "Supplier-3",
          "consumer-1"
        ],
        "children": [{
            "name": "Consumer-1",
            "value": 40
          },
          {
            "name": "Consumer-2",
            "value": 80
          },
          {
            "name": "Consumer-3",
            "value": 64
          },
          {
            "name": "Consumer-4",
            "value": 35
          },
          {
            "name": "Consumer-5",
            "value": 70
          },
          {
            "name": "Consumer-6",
            "value": 20
          },
          {
            "name": "Consumer-7",
            "value": 50
          }
        ]
      },
      {
        "name": "Supplier-3",
        "value": 216,
        "linkWith": [
          "Supplier-1",
          "Consumer-2"
        ],
        "children": [{
            "name": "Consumer-1",
            "value": 50
          },
          {
            "name": "Consumer-2",
            "value": 20
          },
          {
            "name": "Consumer-3",
            "value": 30
          },
          {
            "name": "Consumer-4",
            "value": 10
          },
          {
            "name": "Consumer-5",
            "value": 24
          },
          {
            "name": "Consumer-6",
            "value": 35
          }
        ]
      },

    ];


  });

}

chart1();

function chart2() {
  am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_dark);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Define marker path
    var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";

    // Create map instance
    var chart = am4core.create("bottom", am4maps.MapChart);
    var interfaceColors = new am4core.InterfaceColorSet();

    // Set map definition
    chart.geodata = am4geodata_worldLow;

    // Set projection
    chart.projection = new am4maps.projections.Mercator();

    // Add zoom control
    chart.zoomControl = new am4maps.ZoomControl();

    // Set initial zoom
    chart.homeZoomLevel = 5;
    chart.homeGeoPoint = {
      latitude: 21.7679,
      longitude: 78.8718
    };

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ["AQ"];
    polygonSeries.useGeodata = true;
    polygonSeries.mapPolygons.template.nonScalingStroke = true;


    // Add images
    var imageSeries = chart.series.push(new am4maps.MapImageSeries());
    var imageTemplate = imageSeries.mapImages.template;
    imageTemplate.tooltipText = "{title}";
    imageTemplate.nonScaling = true;

    var marker = imageTemplate.createChild(am4core.Sprite);
    marker.path = targetSVG;
    marker.horizontalCenter = "middle";
    marker.verticalCenter = "middle";
    marker.scale = 0.7;
    marker.fill = interfaceColors.getFor("alternativeBackground");

    imageTemplate.propertyFields.latitude = "latitude";
    imageTemplate.propertyFields.longitude = "longitude";
    imageSeries.data = [{
      "id": "Supplier-1",
      "svgPath": targetSVG,
      "title": "Madhya-Pradesh",
      "latitude": 21.7679,
      "longitude": 78.8718,
      "scale": 5
    }, {
      "id": "Consumer-1",
      "svgPath": targetSVG,
      "title": "Karnataka",
      "latitude": 14,
      "longitude": 75,
      "scale": 0.5
    }, {
      "id": "Consumer-2",
      "svgPath": targetSVG,
      "title": "Telangana",
      "latitude": 18,
      "longitude": 80,
      "scale": 0.5
    }, {
      "id": "Consumer-3",
      "svgPath": targetSVG,
      "title": "Tamilnadu",
      "latitude": 10,
      "longitude": 78,
      "scale": 0.5
    }, {
      "id": "Consumer-4",
      "svgPath": targetSVG,
      "title": "Odisha",
      "latitude": 20,
      "longitude": 84,
      "scale": 0.5
    }, {
      "id": "Supplier-2",
      "svgPath": targetSVG,
      "title": "Maharashtra",
      "latitude": 20,
      "longitude": 74,
      "scale": 0.5
    }, {
      "id": "Consumer-1",
      "svgPath": targetSVG,
      "title": "Kerla",
      "latitude": 11,
      "longitude": 76,
      "scale": 0.5
    },{
      "id": "Consumer-2",
      "svgPath": targetSVG,
      "title": "Gujrat",
      "latitude": 24,
      "longitude": 72,
      "scale": 0.5
    },{
      "id": "Consumer-3",
      "svgPath": targetSVG,
      "title": "Rajasthan",
      "latitude": 26,
      "longitude": 74,
      "scale": 0.5
    },{
      "id": "Consumer-4",
      "svgPath": targetSVG,
      "title": "Madhya-Pradesh",
      "latitude": 24,
      "longitude": 80,
      "scale": 0.5
    },{
      "id": "Consumer-5",
      "svgPath": targetSVG,
      "title": "Rajasthan",
      "latitude": 27,
      "longitude": 75,
      "scale": 0.5
    },{
      "id": "Consumer-6",
      "svgPath": targetSVG,
      "title": "Chattisgarh",
      "latitude": 19,
      "longitude": 81,
      "scale": 0.5
    }, {
      "id": "Consumer-6",
      "svgPath": targetSVG,
      "title": "Kolkata",
      "latitude": 22.5,
      "longitude": 88.5,
      "scale": 0.5
    }, {
      "id": "Consumer-1",
      "svgPath": targetSVG,
      "title": "Sikkim",
      "latitude": 27,
      "longitude": 88,
      "scale": 0.5
    },{
      "id": "Consumer-2",
      "svgPath": targetSVG,
      "title": "Bihar",
      "latitude": 25,
      "longitude": 87,
      "scale": 0.5
    },{
      "id": "Consumer-3",
      "svgPath": targetSVG,
      "title": "Bihar",
      "latitude": 25,
      "longitude": 84,
      "scale": 0.5
    },{
      "id": "Consumer-4",
      "svgPath": targetSVG,
      "title": "Uttar-Pradesh",
      "latitude": 27,
      "longitude": 83,
      "scale": 0.5
    },{
      "id": "Consumer-5",
      "svgPath": targetSVG,
      "title": "Uttar-Pradesh",
      "latitude": 26,
      "longitude": 82.5,
      "scale": 0.5
    },{
      "id": "Supplier-3",
      "svgPath": targetSVG,
      "title": "Uttarakhand",
      "latitude": 30,
      "longitude": 79,
      "scale": 10
      }

  ];

    // Add lines
    var lineSeries = chart.series.push(new am4maps.MapSplineSeries());
    lineSeries.dataFields.multiGeoLine = "multiGeoLine";

    var lineTemplate = lineSeries.mapLines.template;
    lineTemplate.nonScalingStroke = true;
    lineTemplate.arrow.nonScaling = true;
    lineTemplate.arrow.width = 4;
    lineTemplate.arrow.height = 6;
    lineTemplate.stroke = interfaceColors.getFor("alternativeBackground");
    lineTemplate.fill = interfaceColors.getFor("alternativeBackground");
    lineTemplate.line.strokeOpacity = 0.4;

    lineSeries.data = [{
      "multiGeoLine": [
        [{
          "latitude": 21.7679,
          "longitude": 78.8718,
          },
          {
            "latitude": 14,
            "longitude": 75,
          }
        ]
      ]
    }, {
      "multiGeoLine": [
        [{
          "latitude": 21.7679,
          "longitude": 78.8718,
          },
          {
            "latitude": 18,
            "longitude": 80,
          }
        ]
      ]
    }, {
      "multiGeoLine": [
        [{
          "latitude": 21.7679,
          "longitude": 78.8718,
          },
          {
            "latitude": 10,
            "longitude": 78,
          }
        ]
      ]
    }, {
      "multiGeoLine": [
        [{
          "latitude": 21.7679,
          "longitude": 78.8718,
          },
          {
            "latitude": 20,
            "longitude": 84,
          }
        ]
      ]
    }, {
      "multiGeoLine": [
        [{
          "latitude": 20,
          "longitude": 74,
          },
          {
            "latitude": 11,
            "longitude": 76,
          }
        ]
      ]
    }, {
      "multiGeoLine": [
        [{
          "latitude": 20,
          "longitude": 74,
          },
          {
            "latitude": 24,
            "longitude": 72,
          }
        ]
      ]
    }, {
      "multiGeoLine": [
        [{
          "latitude": 20,
          "longitude": 74,
          },
          {
            "latitude": 26,
            "longitude": 74,
          }
        ]
      ]
    }, {
      "multiGeoLine": [
        [{
          "latitude": 20,
          "longitude": 74,
          },
          {
            "latitude": 24,
            "longitude": 80,
          }
        ]
      ]
    }, {
      "multiGeoLine": [
        [{
          "latitude": 20,
          "longitude": 74,
          },
          {
            "latitude": 27,
            "longitude": 75,
          }
        ]
      ]
    }, {
      "multiGeoLine": [
        [{
          "latitude": 20,
          "longitude": 74,
          },
          {
            "latitude": 19,
            "longitude": 81,
          }
        ]
      ]
    }, {
      "multiGeoLine": [
        [{
          "latitude": 30,
          "longitude": 79,
          },
          {
            "latitude": 27,
            "longitude": 88,
          }
        ]
      ]
    },{
      "multiGeoLine": [
        [{
          "latitude": 30,
          "longitude": 79,
          },
          {
            "latitude": 25,
            "longitude": 87,
          }
        ]
      ]
    },{
      "multiGeoLine": [
        [{
          "latitude": 30,
          "longitude": 79,
          },
          {
            "latitude": 25,
            "longitude": 84,
          }
        ]
      ]
    },{
      "multiGeoLine": [
        [{
          "latitude": 30,
          "longitude": 79,
          },
          {
            "latitude": 27,
            "longitude": 83,
          }
        ]
      ]
    },{
      "multiGeoLine": [
        [{
          "latitude": 30,
          "longitude": 79,
          },
          {
            "latitude": 26,
            "longitude": 82.5,
          }
        ]
      ]
    },{
      "multiGeoLine": [
        [{
          "latitude": 30,
          "longitude": 79,
          },
          {
            "latitude": 22.5,
            "longitude": 88.5,
          }
        ]
      ]
    }];

  });
}

chart2();
