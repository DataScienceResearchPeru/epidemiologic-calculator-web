import * as d3 from 'd3'

function line () {
  let dataByVariable
  let dataByTime
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
  let tooltipWidth = 250
  let tooltipHeight = 48
  let chartWidth
  let chartHeight
  let xScale
  let yScale
  let xAxis
  let yAxis
  let grid = null
  let maskingRectangle
  let overlay
  let verticalMarkerContainer
  let tooltipContainer
  let tooltip
  let tooltipTitle
  let tooltipBody
  let tooltipDivider
  let verticalMarkerLine

  let yTicks = 8
  let xTicks = 8
  const tickPadding = 5
  const shouldShowAllDataPoints = true
  const showMaskingClip = false

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
    death: '#656565',
    real: '#1565C0'
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
    death: 'Fallecidos',
    real: 'Real'
  }

  let legendEvent = false

  function exports (_selection) {
    _selection.each(function (_data) {
      if (!legendEvent) {
        const values = cleanData(_data)
        dataByVariable = values.dataset
        dataByTime = values.dataSorted
      } else {
        const values = cleanData(_data, dataByVariable)
        dataByVariable = values.dataset
        dataByTime = values.dataSorted
      }

      chartHeight = height - margin.top - margin.bottom
      chartWidth = width - margin.left - margin.right

      buildScales()
      buildSVG(this)
      buildAxes()
      drawAxes()
      drawLegend()
      drawLines()

      if (showMaskingClip) {
        createMaskingClip()
      }

      drawHoverOverlay()
      drawVerticalMarker()
      drawContainerTooltip()
      addMouseEvents()

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
    svg.transition().duration(1000).attr('width', width).attr('height', height)
  }

  function drawAxes () {
    svg
      .select('.x-axis-group .axis.x')
      .transition()
      .duration(1000)
      .attr('transform', `translate(0,${chartHeight})`)
      .call(xAxis)

    svg
      .select('.y-axis-group .axis.y')
      .transition()
      .duration(750)
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
      .curve(d3.curveBasis)

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
      .transition()
      .duration(1000)
      .attr('d', (d) => line(d.values))
      .style('stroke', (d) => (colors[d.id]))

    areas.enter()
      .append('g')
      .attr('class', 'variable')
      .append('path')
      .attr('class', 'area')
      .merge(areas)
      .transition()
      .duration(1000)
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

  function drawHoverOverlay () {
    if (!overlay) {
      overlay = svg.select('.metadata-group')
        .append('rect')
        .attr('class', 'overlay')
        .attr('y1', 0)
        .attr('y2', height)
        .attr('height', chartHeight)
        .attr('width', chartWidth)
        .attr('fill', 'rgba(0, 0, 0, 0)')
        .style('display', 'none')
    }
  }

  function drawVerticalMarker () {
    if (!verticalMarkerContainer) {
      verticalMarkerContainer = svg.select('.metadata-group')
        .append('g')
        .attr('class', 'hover-marker vertical-marker-container')
        .attr('transform', 'translate(9999, 0)')

      verticalMarkerLine = verticalMarkerContainer.selectAll('path')
        .data([{
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 0
        }])
        .enter()
        .append('line')
        .classed('vertical-marker', true)
        .attr('x1', 0)
        .attr('y1', chartHeight)
        .attr('x2', 0)
        .attr('y2', 0)
    }
  }

  function drawContainerTooltip () {
    if (!tooltipContainer) {
      tooltipContainer = svg.select('.vertical-marker-container')
        .append('g')
        .attr('class', 'britechart britechart-tooltip')
        .style('visibility', 'hidden')

      tooltipContainer.append('g')
        .classed('tooltip-container-group select-disable', true)
        .attr('transform', 'translate(2, 2)')
        .append('g')
        .classed('tooltip-group', true)

      drawTooltip()
    }
  }

  function drawTooltip () {
    const tooltipTextContainer = svg.selectAll('.tooltip-group')
      .append('g')
      .classed('tooltip-text', true)

    tooltip = tooltipTextContainer
      .append('g')
      .classed('tooltip-text-container', true)
      .attr('x', -tooltipWidth / 4 + 8)
      .attr('y', 0)
      .attr('width', tooltipWidth)
      .attr('height', tooltipHeight)
      .attr('rx', 3)
      .attr('ry', 3)
      .style('fill', '#FFFFFF')
      .style('stroke', '#D2D6DF')
      .style('stroke-width', 1)

    tooltipTitle = tooltipTextContainer.append('text')
      .classed('tooltip-title', true)
      .attr('x', -tooltipWidth / 4 + 16)
      .attr('dy', '.35em')
      .attr('y', 16)
      .style('fill', '#6D717A')

    tooltipDivider = tooltipTextContainer.append('line')
      .classed('tooltip-divider', true)
      .attr('x1', -tooltipWidth / 4 + 16)
      .attr('x2', 265)
      .attr('y1', 31)
      .attr('y2', 31)
      .style('stroke', '#D2D6DF')

    tooltipBody = tooltipTextContainer.append('g')
      .classed('tooltip-body', true)
      .style('transform', 'translateY(8px)')
      .style('fill', '#282C35')
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

  function cleanData (data, disabled = []) {
    let dataset = []
    let dataSorted = []
    let days
    data = Object.entries(data)

    data.forEach(function ([key, value]) {
      if (key === 'time') { time = value } else if (key === 'days') { days = value } else {
        dataset.push([key, value])
      }
    })

    dataset = dataset.map(([key, val]) => {
      return {
        id: key,
        values:
          val.map(function (x, i) {
            return { value: x, time: key !== 'real' ? time[i] : days[i] }
          })
      }
    })

    if (disabled.length > 0) {
      disabled.forEach(function (d) {
        dataset.forEach(function (data) {
          if (d.id === data.id) {
            data.disabled = d.disabled
          }
        })
      })
    }

    dataset.forEach((data) => {
      data.values.forEach((x) => {
        dataSorted.push({ id: data.id, time: x.time, value: x.value, disabled: data.disabled })
      })
    })

    dataSorted = d3.nest()
      .key((d) => d.time)
      .entries(dataSorted)
      .map((d) => {
        return {
          time: parseInt(d.key),
          values: d.values
        }
      })

    return {
      dataset,
      dataSorted
    }
  }

  function createMaskingClip () {
    maskingRectangle = svg.append('rect')
      .attr('class', 'masking-rectangle')
      .attr('width', width)
      .attr('height', height)
      .attr('x', 0 + margin.left)
      .attr('y', 0)

    maskingRectangle.transition()
      .duration(1500)
      .ease(d3.easeQuadInOut)
      .attr('x', width)
      .on('end', () => maskingRectangle.remove())
  }

  function cleanDataPointHighlights () {
    verticalMarkerContainer.selectAll('.circle-container').remove()
  }

  function highlightDataPoints (dataPoint) {
    cleanDataPointHighlights()

    dataPoint.values.forEach((d, index) => {
      const marker = verticalMarkerContainer
        .append('g')
        .classed('circle-container', true)
        .append('circle')
        .classed('data-point-highlighter', true)
        .attr('cx', 12)
        .attr('cy', 0)
        .attr('r', 5)
        .style('stroke-width', 2)
        .style('stroke', colors[d.id])
        .style('cursor', 'pointer')

      const y = yScale(dataPoint.values[index].value)
      marker.attr('transform', `translate( ${(-12)}, ${y} )`)
    })
  }

  function getNearestDataPoint (mouseX) {
    const timeFromInvertedX = xScale.invert(mouseX)
    const bisect = d3.bisector(function (d) { return d.time }).left

    const dataEntryIndex = bisect(dataByTime, timeFromInvertedX, 0)
    const dataEntryForXPosition = dataByTime[dataEntryIndex]
    const previousDataEntryForXPosition = dataByTime[dataEntryIndex - 1]
    let nearestDataPoint

    if (previousDataEntryForXPosition && dataEntryForXPosition) {
      nearestDataPoint = findOutNearestTime(timeFromInvertedX, dataEntryForXPosition, previousDataEntryForXPosition)
    } else {
      nearestDataPoint = dataEntryForXPosition
    }

    return nearestDataPoint
  }

  function findOutNearestTime (x0, d0, d1) {
    return (x0 - d0.time) > (d1.time - x0) ? d0 : d1
  }

  function events (selection) {
    dispatcher.on('legendMouseClick', function (d, i) {
      d.disabled = !d.disabled

      legendEvent = true
      selection.call(exports)
    })
  }

  function addMouseEvents () {
    svg
      .on('mouseover', function (d) {
        handleMouseOver(this, d)
      })
      .on('mouseout', function (d) {
        handleMouseOut(this, d)
      })
      .on('mousemove', function (d) {
        handleMouseMove(this, d)
      })
  }

  function handleMouseOver (e, d) {
    overlay.style('display', 'block')
    verticalMarkerLine.classed('bc-is-active', true)
  }

  function handleMouseOut (e, d) {
    overlay.style('display', 'none')
    verticalMarkerLine.classed('bc-is-active', false)
    verticalMarkerContainer.attr('transform', 'translate(9999, 0)')
  }

  function handleMouseMove (e) {
    const [xPosition] = d3.mouse(e)
    const xPositionOffset = -margin.left
    let dataPoint = getNearestDataPoint(xPosition + xPositionOffset)
    let dataPointXPosition

    if (dataPoint) {
      dataPointXPosition = xScale(dataPoint.time)
      moveVerticalMarker(dataPointXPosition)
      dataPoint = {
        time: dataPoint.time,
        values: dataPoint.values.filter((d) => !d.disabled)
      }

      highlightDataPoints(dataPoint)
    }
  }

  function moveVerticalMarker (verticalMarkerXPosition) {
    verticalMarkerContainer.attr('transform', `translate(${verticalMarkerXPosition},0)`)
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
