import * as d3 from 'd3'

function line () {
  let data
  let svg
  let margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
  }

  let width = 960
  let height = 500
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
  
  let yTicks = 5
  let tickPadding = 5
  let shouldShowAllDataPoints = true

  // events
  const dispatcher = d3.dispatch(
    'customMouseOver',
    'customMouseMove',
    'customMouseOut',
    'customMouseClick'
  )

  // extractors
  const getFrequency = ({ frequency }) => frequency
  const getTime = ({ time }) => time

  function exports (_selection) {
    _selection.each(function (_data){
      data = _data
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
      .ticks(5)
      .tickSize(10, 0)
      .tickPadding(tickPadding)

    yAxis = d3.axisLeft(yScale)
      .ticks(yTicks)
      .tickSize([0])
      .tickPadding(tickPadding)
    
    drawGridLines(5, yTicks)
  }

  function buildScales () {
    xScale = d3
      .scaleLinear()
      .rangeRound([0, chartWidth])
      .domain([0, d3.max(data, getTime)])

    yScale = d3
      .scaleLinear()
      .rangeRound([chartHeight, 0])
      .domain([0, d3.max(data, getFrequency)])
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
      // .attr('transform', `translate(${-xAxisPadding.left}, 0)`)
      .call(yAxis)
  }

  function drawLines () {

    // let lines = svg
    //   .select('.chart-group')
    //   .selectAll('.line')
    //   .data(data)
    
    // paths = lines.enter()
    //   .append('g')
    //   .append('path')
    //   .attr('class', 'line')
    //   .merge(lines)
    //   .attr('d', d3.line()
    //     .x(function ({ time }) { return xScale(time) })
    //     .y(function ({ frequency }) { return yScale(frequency) })
    //   )


    let lines = svg
      .select('.chart-group')
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#69b3a2')
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x(function ({ time }) { return xScale(time) })
        .y(function ({ frequency }) { return yScale(frequency) })
      )
     
      .on('mouseover', function (d) {
        dispatcher.call('customMouseOver', this, d)
      })
      .on('mousemove', function (d) {
        dispatcher.call('customMouseMove', this, d)
      })
      .on('mouseout', function (d) {
        dispatcher.call('customMouseOut', this, d)
      })
      .on('click', function (d) {
        dispatcher.call('customMouseClick', this, d)
      })

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

  function drawAllDataPoints () {
    svg.select('.chart-group')
      .selectAll('.data-points-container')
      .remove()
    
    let allDataPoints = svg.select('.chart-group')
      .append('g')
      .classed('data-points-container', true)
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .classed('data-point-mark', true)
      .attr('r', 5)
      .style('stroke-width', 2)
      .style('cursor', 'pointer')
      .attr('cx', (d) => xScale(d.time))
      .attr('cy', (d) => yScale(d.frequency))
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
