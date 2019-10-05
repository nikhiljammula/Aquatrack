var i,
  j,
  s,
  N = 5,
  E = 4,
  g = {
    nodes: [],
    edges: []
  };

// Generate the graph:

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
var colora = rgbToHex(0, 255, 245);
var colorb = rgbToHex(255, 108, 0);
var colorc = rgbToHex(255, 0, 0);
var colord = rgbToHex(253, 205, 15);
var colore = rgbToHex(131, 253, 18);

var size_arr = [4, 3.2, 3, 3.5];
var color_arr = [colorc, colord, colore, colora];

var x_arr = [2,-4,-2,1];
var y_arr = [-2,1,-2,3];

g.nodes.push({
  id: 'n0',
  label: 'Supplier ',
  x: 0,
  y: 0,
  size: 5,
  color: colorb,
});

for (i = 1; i < N; i++)
  g.nodes.push({
    id: 'n' + i,
    label: 'Consumer ' + i,
    x: x_arr[i-1],
    y: y_arr[i-1],
    size: size_arr[i-1],
    color: color_arr[i-1]
  });

function Create2DArray(rows) {
  var arr = [];

  for (var i = 0; i < rows; i++) {
    arr[i] = [];
  }

  return arr;
}
var arr = Create2DArray(5);
arr[0][1] = 1;
arr[0][2] = 1;
arr[0][3] = 1;
arr[0][4] = 1;
for (i = 0; i < 5; i++) {
  for (j = 0; j < 5; j++) {
    if (arr[i][j] == 1) {
      g.edges.push({
        id: 'e' + i + j,
        source: 'n' + i,
        target: 'n' + j,
        color: color_arr[i+j-1],
      });
    }
  }
}
// Instantiate sigma:
s = new sigma({
  graph: g,
  container: 'part',
});

var something = function(id){
  return g[id];
};
console.log(something);
