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
<<<<<<< HEAD
  const xTicks = 8
  const tickPadding = 5
  const shouldShowAllDataPoints = false
=======
  let xTicks = 8
  const tickPadding = 5
  const shouldShowAllDataPoints = true
>>>>>>> 66e8a9b267447039566719d0936ac866ec56eaac

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
<<<<<<< HEAD
    death: '#404040'
=======
    death: '#656565'
>>>>>>> 66e8a9b267447039566719d0936ac866ec56eaac
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

    const data = dataByVariable.filter(function (d) {
      return !d.disabled
    })

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

<<<<<<< HEAD
=======
  function gradient (color, id) {
    svg.select('.chart-group')
      .append('defs')
      .append('linearGradient')
      .attr('id', id)
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%')

    d3.select(`#${id}`)
      .selectAll('stop')
      .data([
        { offset: 0, color: color, opacity: 1 },
        { offset: 0.7, color: '#FFFFFF', opacity: 0.1 }
      ])
      .enter().append('stop')
      .attr('offset', function (d) { return d.offset })
      .attr('stop-color', function (d) { return d.color })
      .attr('stop-opacity', function (d) { return d.opacity })
  }

>>>>>>> 66e8a9b267447039566719d0936ac866ec56eaac
  function drawLines () {
    const line = d3.line()
      .x(function (d) { return xScale(d.time) })
      .y(function (d) { return yScale(d.value) })

<<<<<<< HEAD
=======
    const area = d3.area()
      .x(function (d) { return xScale(d.time) })
      .y0(function (d) { return yScale(d.value) })
      .y1(height - margin.bottom - margin.top)

>>>>>>> 66e8a9b267447039566719d0936ac866ec56eaac
    const lines = svg
      .select('.chart-group')
      .selectAll('.line')
      .data(dataByVariable.filter(function (d) {
        return !d.disabled
      }))

<<<<<<< HEAD
=======
    const areas = svg
      .select('.chart-group')
      .selectAll('.area')
      .data(dataByVariable.filter(function (d) {
        return !d.disabled
      }))

>>>>>>> 66e8a9b267447039566719d0936ac866ec56eaac
    lines.enter()
      .append('g')
      .attr('class', 'variable')
      .append('path')
      .attr('class', 'line')
      .merge(lines)
      .attr('d', function (d) { return line(d.values) })
<<<<<<< HEAD
      .style('stroke', (d, i) => (colors[d.id]))
=======
      .style('stroke', (d) => (colors[d.id]))

    areas.enter()
      .append('g')
      .attr('class', 'variable')
      .append('path')
      .attr('class', 'area')
      .merge(areas)
      .attr('d', function (d) { return area(d.values) })
      .attr('fill', function (d) { gradient(colors[d.id], d.id); return `url(#${d.id})` })
>>>>>>> 66e8a9b267447039566719d0936ac866ec56eaac

    // Exit
    lines
      .exit()
      .style('opacity', 0)
      .remove()
<<<<<<< HEAD
=======

    areas
      .exit()
      .style('opacity', 0)
      .remove()
>>>>>>> 66e8a9b267447039566719d0936ac866ec56eaac
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

<<<<<<< HEAD
=======
  function pointsXY (data) {
    time = xScale.ticks(xTicks)

    const dataset = data.map((d) => {
      return {
        id: d.id,
        values: d.values.filter(function (value) {
          return time.includes(value.time)
        })
      }
    })

    return dataset
  }

>>>>>>> 66e8a9b267447039566719d0936ac866ec56eaac
  function drawAllDataPoints () {
    svg.select('.chart-group')
      .selectAll('.data-points-container')
      .remove()

<<<<<<< HEAD
=======
    const points = pointsXY(dataByVariable.filter(function (d) {
      return !d.disabled
    }))

>>>>>>> 66e8a9b267447039566719d0936ac866ec56eaac
    const allDataPoints = svg.select('.chart-group')
      .append('g')
      .classed('data-points-container', true)
      .selectAll('.points')
<<<<<<< HEAD
      .data(dataByVariable.filter(function (d) {
        return !d.disabled
      }))
      .enter()
      .append('g')
      .attr('class', 'points')
      .style('stroke', (d, i) => (colors[d.id]))
=======
      .data(points)
      .enter()
      .append('g')
      .attr('class', 'points')
      .style('stroke', (d, i) => colors[d.id])
>>>>>>> 66e8a9b267447039566719d0936ac866ec56eaac

    allDataPoints
      .selectAll('circle')
      .data(function (d) { return d.values })
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
      .classed('disabled', function (d) { return d.disabled })

    legend.append('rect')
      .attr('x', 1)
      .attr('y', 1)
      .attr('rx', 6)
      .attr('ry', 6)
      .attr('width', 21)
      .attr('height', 21)
      .style('fill', (d, i) => colors[d.id])
      .style('stroke', (d, i) => colors[d.id])

    legend.append('text')
      .attr('x', 40)
      .attr('y', 16)
      .text((d, i) => variabletoSpanish[d.id])
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

<<<<<<< HEAD
=======
  exports.xTicks = function (_x) {
    if (!arguments.length) {
      return xTicks
    }
    xTicks = _x

    return this
  }

>>>>>>> 66e8a9b267447039566719d0936ac866ec56eaac
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