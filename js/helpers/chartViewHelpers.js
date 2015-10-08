/*global d3*/
export class D3Chart {
  constructor(bardata) {
    this.bardata = bardata;
  }

  static renderChart(bardata) {
    // Add Margins
    var margin = { top: 20, right: 15, bottom: 20, left: 25};

    var height = 300 - margin.top - margin.bottom,
      width = 500 - margin.left - margin.right,
      barWidth = 75,
      barOffset = 25;

    var yScale = d3.scale.linear()
      .domain([0, d3.max(bardata)])
      .range([0, height]);

    var xScale = d3.scale.ordinal()
      .domain(d3.range(0, bardata.length))
      // .domain(['A', 'B', 'C', 'D', 'E'])
      .rangeBands([0, width], 0.2);

    var xAxisScale = d3.scale.ordinal()
      //.domain(d3.range(0, bardata.length))
      .domain(['A', 'B', 'C', 'D', 'E'])
      .rangeBands([0, width], 0.2);

    var tempColor;

    var svgContainer = d3.select('#barchart')
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .style('background', '#D6F5EF')
                .append('g')
                .attr('transform', 'translate('+ margin.left +', '+ margin.top +')');

    var bars = svgContainer.selectAll('rect')
                  .data(bardata)
                  .enter()
                  .append('rect');

    var barAttrs = bars
            .style('fill', '#2785A1')
            .attr('width', xScale.rangeBand())
            .attr('height', function(d) {
              return yScale(d);
            })
            .attr('x', function(d, i){
              return xScale(i);
            })
            .attr('y', function(d){
              return height - yScale(d);
            })
            .on('mouseover', function(d){
              tempColor = this.style.fill;
              d3.select(this)
              .style('opacity', .6)
              .style('fill', '#ffb889');
            })
            .on('mouseout', function(d){
              d3.select(this)
              .style('opacity', 1)
              .style('fill', tempColor);
            });

    var text = svgContainer.selectAll('text')
                  .data(bardata)
                  .enter()
                  .append('text');
    var textLabels = text
              .attr('x', function(d, i){
                return xScale(i) + 30;
              })
              .attr('y', function(d){
                return height - yScale(d) + 20;
              })
              .text( function(d) {return d;})
              .attr('font-family', 'sans-serif')
              .attr('font-size', '20px')
              .attr('fill', 'red');

    //vertial axis
    var vGuideScale = d3.scale.linear()
      .domain([0, d3.max(bardata)])
      .range([height, 0]);

    var vAxis = d3.svg.axis()
    .scale(vGuideScale)
    .orient('left')
    .ticks(10);

    var vGuide = d3.select('svg').append('g').attr('class', 'y-axis');
    vAxis(vGuide);
    vGuide.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
    vGuide.selectAll('path')
      .style({fill: 'none', stroke: '#000'});
    vGuide.selectAll('line')
      .style({stroke: '#000'});

    // horizontal axis
    var hAxis = d3.svg.axis()
      .scale(xAxisScale)
      .orient('bottom');
      //.tickValues([1, 2, 3, 4, 5]);

    var hGuide = d3.select('svg').append('g').attr('class', 'x-axis');
    hAxis(hGuide);
    hGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')');
    hGuide.selectAll('path')
      .style({fill: 'none', stroke: '#000'});
    hGuide.selectAll('line')
      .style({stroke: '#000'});
  } //end renderChart method

  static reRender(bardata) {

    var margin = { top: 20, right: 15, bottom: 20, left: 25};

    var height = 300 - margin.top - margin.bottom,
      width = 500 - margin.left - margin.right,
      barWidth = 75,
      barOffset = 25;

    var yScale = d3.scale.linear()
      .domain([0, d3.max(bardata)])
      .range([0, height]);

    var xScale = d3.scale.ordinal()
      .domain(d3.range(0, bardata.length))
      .rangeBands([0, width], 0.2);

    var tempColor;

    d3.select('#barchart')
      .selectAll('rect').data(bardata)
      .transition()
      .duration(1000)
      //.attr('width', barWidth)
      .attr('width', xScale.rangeBand())
      .attr('height', function(d) {
        return yScale(d);
      })
      .attr('x', function(d, i){
        return xScale(i);
      })
      .attr('y', function(d){
        return height - yScale(d);
      });

    var text = d3.select('#barchart')
      .selectAll('text')
      .data(bardata)
      .transition()
      .duration(1000)
      .attr('x', function(d, i){
        return xScale(i) + 25;
      })
      .attr('y', function(d){
        return height - yScale(d) + 20;
      })
      .text( function(d) {return d;})
      .attr('font-family', 'sans-serif')
      .attr('font-size', '20px')
      .attr('fill', 'white');


    var vGuideScale = d3.scale.linear()
      .domain([0, d3.max(bardata)])
      .range([height, 0]);

    var vAxis = d3.svg.axis()
    .scale(vGuideScale)
    .orient('left')
    .ticks(10);

    //For some reason I can't dete vGuide
    //var vGuide = d3.select('svg').append('g');
    var vGuide2 = d3.select('.y-axis');
    vAxis(vGuide2);
    //vGuide2.attr('transform', 'translate(25, 0)');
    vGuide2.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
    vGuide2.selectAll('path')
      .style({fill: 'none', stroke: '#000'});
    vGuide2.selectAll('line')
      .style({stroke: '#000'});

  }
} //end D3Chart class
