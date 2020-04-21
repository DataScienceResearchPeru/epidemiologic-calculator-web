import * as d3 from 'd3'

function line () {
  let dataByVariable
  let time
  let svg
  let margin = {
    top: 10,
    right: 10,
    bottom: 30,
    left: 80
  }

  let width = 960
  let height = 450
  let chartWidth
  let chartHeight
  let xScale
  let yScale
  let xAxis
  let yAxis
  let paths

  let grid = null
  let verticalGridLines
  let horizontalGridLines
  
  let yTicks = 8
  let tickPadding = 5
  let shouldShowAllDataPoints = true

  // events
  const dispatcher = d3.dispatch(
    'customMouseOver',
    'customMouseMove',
    'customMouseOut',
    'customMouseClick'
  )

  const colors = {
    'susceptible': '#24DADA',
    'exposed': '#FFD16A',
    'asymptomatic': '#FF8181',
    'infected': '#DB96FF',
    'quarantine': '#5AB3FF',
    'hospitalized': '#5AB3FF',
    'uci': '#5AB3FF',
    'recovered': '#5AB3FF',
    'death': '#404040'
  }

  function exports (_selection) {
    _selection.each(function (_data){
      dataByVariable = cleanData(_data)
      chartHeight = height - margin.top - margin.bottom
      chartWidth = width - margin.left - margin.right
      buildScales()
      buildSVG(this)
      buildAxes()
      drawAxes()
      drawLines()

      if (shouldShowAllDataPoints) {
        drawAllDataPoints()
      }
    })
  }

  function buildAxes () {
    xAxis = d3.axisBottom(xScale)
      .ticks(time.length)
      .tickSize(10, 0)
      .tickPadding(tickPadding)

    yAxis = d3.axisLeft(yScale)
      .ticks(yTicks)
      .tickSize([0])
      .tickPadding(tickPadding)
    
    drawGridLines(time.length, yTicks)
  }

  function buildScales () {
    xScale = d3
      .scaleLinear()
      .rangeRound([0, chartWidth])
      .domain([0, d3.max(time)])

    yScale = d3
      .scaleLinear()
      .rangeRound([chartHeight, 0])
      .domain([0, d3.max(dataByVariable, function (c) {
        return d3.max(c.values, function (d) {
          return d.value })
      })
      ])
  }

  function buildContainerGroups () {
    let container = svg
      .append('g')
      .classed('container-group', true)
      .attr('transform', `translate(${margin.left},${margin.top})`)

    container
      .append('g').classed('x-axis-group', true)
      .append('g').classed('axis x', true)
    container
      .append('g').classed('y-axis-group', true)
      .append('g').classed('axis y', true)
    container
      .append('g').classed('grid-lines-group', true)
    container
      .append('g').classed('chart-group', true)
    container
      .append('g').classed('metadata-group', true)
  }

  function buildSVG (container) {
    if (!svg) {
      svg = d3
        .select(container)
        .append('svg')
        .classed('line-chart', true)

      buildContainerGroups()
    }
    svg.attr('width', width).attr('height', height)
  }

  function drawAxes () {
    svg
      .select('.x-axis-group .axis.x')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(xAxis)

    svg
      .select('.y-axis-group .axis.y')
      .call(yAxis)
  }

  function drawLines () {
    const line = d3.line()
      .x(function (d) { return xScale(d.time) })
      .y(function (d) { return yScale(d.value) })

    let lines = svg
      .select('.chart-group')
      .selectAll('.line')
      .data(dataByVariable)
    
    paths = lines.enter()
      .append('g')
      .attr('class', 'variable')
      .append('path')
      .attr('class', 'line')
      .merge(lines)
      .attr('d', function (d) { return line(d.values) })
      .style('stroke', (d, i) => (colors[d.id]))

    // Exit
    lines
      .exit()
      .style('opacity', 0)
      .remove()
  }

  function drawGridLines (xTicks, yTicks){
    svg.select('.grid-lines-group')
      .selectAll('line')
      .remove()
    
    if (grid === 'horizontal' || grid === 'full') {
      horizontalGridLines = svg.select('.grid-lines-group')
        .selectAll('line.horizontal-grid-line')
        .data(yScale.ticks(yTicks))
        .enter()
        .append('line')
        .attr('class', 'horizontal-grid-line')
        .attr('x1', 0)
        .attr('x2', chartWidth)
        .attr('y1', (d) => yScale(d))
        .attr('y2', (d) => yScale(d))
    }

    if (grid === 'vertical' || grid === 'full') {
      verticalGridLines = svg.select('.grid-lines-group')
        .selectAll('line.vertical-grid-line')
        .data(xScale.ticks(xTicks))
        .enter()
        .append('line')
        .attr('class', 'vertical-grid-line')
        .attr('y1', 0)
        .attr('y2', chartHeight)
        .attr('x1', (d) => xScale(d))
        .attr('x2', (d) => xScale(d))
    }
  }

  function drawAllDataPoints (thisk) {
    svg.select('.chart-group')
      .selectAll('.data-points-container')
      .remove()

    let allDataPoints = svg.select('.chart-group')
      .append('g')
      .classed('data-points-container', true)
      .selectAll('.points')
      .data(dataByVariable)
      .enter()
      .append('g')
      .attr('class', 'points')
      .style('stroke', (d, i) => (colors[d.id]))

    allDataPoints
      .selectAll('circle')
      .data(function (d) {return d.values})
      .enter()  
      .append('circle')
      .classed('data-point-mark', true)
      .attr('r', 4)
      .style('stroke-width', 2)
      .style('cursor', 'pointer')
      .attr('cx', (d) => xScale(d.time))
      .attr('cy', (d) => yScale(d.value))
  }

  function cleanData (data) {
    let dataset = []
    data = Object.entries(data)

    data.forEach(function ( [key, value] ) {
      if (key === 'time') { time = value }
      else {
        dataset.push([key,value])
      }
    })

    dataset = dataset.map(([ key, val ]) => { 
      return {id: key, values: val.map(function (x, i){ return { value: x, time: time[i]  } }) }  
    })

    return dataset
  }

  exports.height = function (_x) {
    if (!arguments.length) {
      return height
    }
    height = _x

    return this
  }

  exports.margin = function (_x) {
    if (!arguments.length) {
      return margin
    }
    margin = {
      ...margin,
      ..._x
    }

    return this
  }

  exports.on = function () {
    let value = dispatcher.on.apply(dispatcher, arguments)

    return value === dispatcher ? exports : value
  }

  exports.width = function (_x) {
    if (!arguments.length) {
      return width
    }
    width = _x

    return this
  }

  exports.yTicks = function (_x) {
    if (!arguments.length) {
      return yTicks
    }
    yTicks = _x

    return this
  }

  exports.grid = function (_x) {
    if (!arguments.length) {
      return grid
    }
    grid = _x

    return this
  }

  return exports
    
}

export default line