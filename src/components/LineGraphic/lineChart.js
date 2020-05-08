import * as d3 from 'd3'

function line () {
  let dataByVariable
  let time
  let svg
  let margin = {
    top: 10,
    right: 10,
    bottom: 30,
    left: 50
  }

  let width = 960
  let height = 450
  let chartWidth
  let chartHeight
  let xScale
  let yScale
  let xAxis
  let yAxis
  let grid = null

  let yTicks = 8
  let xTicks = 8
  const tickPadding = 5
  const shouldShowAllDataPoints = true

  // events
  const dispatcher = d3.dispatch(
    'legendMouseClick'
  )

  const colors = {
    susceptible: '#24DADA',
    exposed: '#FFD16A',
    asymptomatic: '#58D68D',
    infected: '#FF8181',
    quarantine: '#CCD1D1',
    hospitalized: '#DB96FF',
    uci: '#E74C3C',
    recovered: '#5AB3FF',
    death: '#656565'
  }

  const variabletoSpanish = {
    susceptible: 'Susceptibles',
    exposed: 'Expuestos',
    asymptomatic: 'Asintomáticos',
    infected: 'Infectados',
    quarantine: 'Cuarentena',
    hospitalized: 'Hospitalizados',
    uci: 'UCI',
    recovered: 'Recuperados',
    death: 'Fallecidos'
  }

  let legendEvent = false

  function exports (_selection) {
    _selection.each(function (_data) {
      if (!legendEvent) {
        dataByVariable = cleanData(_data)
      }

      legendEvent = false
      chartHeight = height - margin.top - margin.bottom
      chartWidth = width - margin.left - margin.right

      buildScales()
      buildSVG(this)
      buildAxes()
      drawAxes()
      drawLegend()
      drawLines()

      if (shouldShowAllDataPoints) {
        drawAllDataPoints()
      }

      drawControlVertical()

      events(_selection)
    })
  }

  function buildAxes () {
    xAxis = d3.axisBottom(xScale)
      .ticks(xTicks)
      .tickSize(10, 0)
      .tickPadding(tickPadding)

    yAxis = d3.axisLeft(yScale)
      .ticks(yTicks)
      .tickSize([0])
      .tickPadding(tickPadding)

    drawGridLines(xTicks, yTicks)
  }

  function buildScales () {
    xScale = d3
      .scaleLinear()
      .rangeRound([0, chartWidth])
      .domain([0, d3.max(time)])

    const data = dataByVariable.filter((d) => !d.disabled)

    yScale = d3
      .scaleLinear()
      .rangeRound([chartHeight, 0])
      .domain([0, d3.max(data, function (c) {
        return d3.max(c.values, function (d) {
          return d.value
        })
      })
      ])
  }

  function buildContainerGroups () {
    const container = svg
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
      .append('g').classed('chart-legend', true)
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
    svg.transition().attr('width', width).attr('height', height)
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

  function gradient (color, id) {
    svg.select('.chart-group')
      .append('defs')
      .append('linearGradient')
      .attr('id', id)
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%')

    const gradient = d3.select(`#${id}`)
      .selectAll('stop')
      .data([
        { offset: 0, color: color, opacity: 1 },
        { offset: 0.7, color: '#FFFFFF', opacity: 0.1 }
      ])
      .enter().append('stop')
      .attr('offset', (d) => d.offset)
      .attr('stop-color', (d) => d.color)
      .attr('stop-opacity', (d) => d.opacity)

    gradient
      .exit()
      .remove()
  }

  function drawLines () {
    svg.select('.chart-group')
      .selectAll('defs')
      .remove()

    svg.select('.chart-group')
      .selectAll('.variable')
      .remove()

    const line = d3.line()
      .x((d) => xScale(d.time))
      .y((d) => yScale(d.value))

    const area = d3.area()
      .x((d) => xScale(d.time))
      .y0((d) => yScale(d.value))
      .y1(height - margin.bottom - margin.top)

    const lines = svg
      .select('.chart-group')
      .selectAll('.line')
      .data(dataByVariable.filter((d) => !d.disabled))

    const areas = svg
      .select('.chart-group')
      .selectAll('.area')
      .data(dataByVariable.filter((d) => !d.disabled))

    lines.enter()
      .append('g')
      .attr('class', 'variable')
      .append('path')
      .attr('class', 'line')
      .merge(lines)
      .attr('d', (d) => line(d.values))
      .style('stroke', (d) => (colors[d.id]))

    areas.enter()
      .append('g')
      .attr('class', 'variable')
      .append('path')
      .attr('class', 'area')
      .merge(areas)
      .attr('d', (d) => area(d.values))
      .attr('fill', function (d) { gradient(colors[d.id], d.id); return `url(#${d.id})` })

    // Exit
    lines
      .exit()
      .transition()
      .style('opacity', 0)
      .remove()

    areas
      .exit()
      .transition()
      .style('opacity', 0)
      .remove()
  }

  function drawGridLines (xTicks, yTicks) {
    svg.select('.grid-lines-group')
      .selectAll('line')
      .remove()

    if (grid === 'horizontal' || grid === 'full') {
      svg.select('.grid-lines-group')
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
      svg.select('.grid-lines-group')
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

  function pointsXY (data) {
    time = xScale.ticks(xTicks)

    const dataset = data.map((d) => {
      return {
        id: d.id,
        values: d.values.filter((value) => time.includes(value.time))
      }
    })

    return dataset
  }

  function drawAllDataPoints () {
    svg.select('.chart-group')
      .selectAll('.data-points-container')
      .remove()

    const points = pointsXY(dataByVariable.filter((d) => !d.disabled))

    const allDataPoints = svg.select('.chart-group')
      .append('g')
      .classed('data-points-container', true)
      .selectAll('.points')
      .data(points)
      .enter()
      .append('g')
      .attr('class', 'points')
      .style('stroke', (d, i) => colors[d.id])

    allDataPoints
      .selectAll('circle')
      .data((d) => d.values)
      .enter()
      .append('circle')
      .classed('data-point-mark', true)
      .attr('r', 4)
      .style('stroke-width', 2)
      .style('cursor', 'pointer')
      .attr('cx', (d) => xScale(d.time))
      .attr('cy', (d) => yScale(d.value))
  }

  function drawLegend () {
    svg.select('.chart-legend')
      .selectAll('.legend')
      .remove()

    const legend = svg.select('.chart-legend')
      .append('g')
      .classed('legend', true)
      .selectAll('serie')
      .data(dataByVariable)
      .enter()
      .append('g')
      .classed('serie', true)
      .attr('transform', (d, i) => `translate(${-margin.left},${i * 38})`)
      .on('click', (d, i) => {
        dispatcher.call('legendMouseClick', this, d, i)
      })
      .classed('disabled', (d) => d.disabled)

    legend.append('rect')
      .attr('x', 1)
      .attr('y', 1)
      .attr('rx', 6)
      .attr('ry', 6)
      .attr('width', 22)
      .attr('height', 22)
      .style('fill', '#FFF')
      .style('stroke', (d, i) => colors[d.id])

    legend.append('rect')
      .attr('x', 4)
      .attr('y', 4)
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('width', 16)
      .attr('height', 16)
      .style('fill', (d, i) => colors[d.id])

    legend.append('text')
      .attr('x', 40)
      .attr('y', 16)
      .text((d, i) => variabletoSpanish[d.id])
  }

  function drawControlVertical () {
    svg.select('.chart-group')
      .selectAll('#control-line')
      .remove()

    svg.select('.chart-group')
      .append('div')
      .attr('id', 'control-line')
      .style('position', 'absolute')
      .style('z-index', '20')
      .style('width', '2px')
      .style('height', '419px')
      .style('top', '10px')
      .style('left', '74px')
      .style('background', '#FFF')
  }

  function cleanData (data) {
    let dataset = []
    data = Object.entries(data)

    data.forEach(function ([key, value]) {
      if (key === 'time') { time = value } else {
        dataset.push([key, value])
      }
    })

    dataset = dataset.map(([key, val]) => {
      return { id: key, values: val.map(function (x, i) { return { value: x, time: time[i] } }) }
    })

    return dataset
  }

  function events (selection) {
    dispatcher.on('legendMouseClick', function (d, i) {
      d.disabled = !d.disabled

      if (!dataByVariable.filter(function (d) { return !d.disabled }).length) {
        dataByVariable.forEach(function (d) {
          d.disabled = false
        })
      }

      legendEvent = true
      selection.call(exports)
    })
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
    const value = dispatcher.on.apply(dispatcher, arguments)

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

  exports.xTicks = function (_x) {
    if (!arguments.length) {
      return xTicks
    }
    xTicks = _x

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
