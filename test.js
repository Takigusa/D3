// The svg
var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

// Map and projection
var path = d3.geoPath();
var projection = d3.geoMercator()
  .scale(50)
  .center([0,20])
  .translate([width / 2, height / 2]);

// Data and color scale
var data = [d3.map(),d3.map(),d3.map()]
var year = 0


var data2021 = d3.map();
var data2022 = d3.map();
var colorScale = d3.scaleThreshold()
  .domain([0, 7, 104, 423, 6906, 350000])
  .range(d3.schemeBlues[7]);

// Load external data and boot
d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
  .defer(d3.csv, "allyearcase.csv", function(d) { 
    //console.log(d)
    if (d.date==2020)
      data[0].set(d.code, +d.case); 
    else if (d.date==2021)
        data[1].set(d.code, +d.case);
    else if (d.date==2022)
            data[2].set(d.code, +d.case);
  })
//  .defer(d3.csv, "2020deathcase(x).csv", function(d) { data.set(d.code, +d.case); })

  //.defer(d3.csv, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", function(d) { data.set(d.code, +d.pop); })

  .await(ready);

function ready(error, topo) {

  console.log(topo)

      // Set a timer event to trigger every interval milliseconds
      let timer = setInterval(animate, 5000) 
  
      update()
    
 function update() {
  // Draw the map
  svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set the color of each country
      .attr("fill", function (d) {
        d.total = data[year].get(d.id) || 0;
        return colorScale(d.total);
      });
    }

function animate() {

  console.log("animate")


  year++
  //data = data2022

  if (year>2)
    year = 0
  update()
  }  
}

  function filterByValue(data, colName, value) {
    return data.filter(function(d){return d[colName] == value})
}