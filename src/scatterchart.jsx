'use strict';

var React = require('react');
var d3 = require('d3');
var common = require('./common');
var Chart = common.Chart;
var XAxis = common.XAxis;
var YAxis = common.YAxis;
var _ = require('lodash');

var Circle = React.createClass({

  propTypes: {
    cx: React.PropTypes.number,
    cy: React.PropTypes.number,
    r: React.PropTypes.number,
    fill: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      fill: '#1f77b4'
    };
  },

  render: function() {
    return (
      <circle
        cx={this.props.cx}
        cy={this.props.cy}
        r={this.props.r}
        fill={this.props.fill}
      />
    );
  }

});

var DataSeries = React.createClass({

  propTypes: {
    data: React.PropTypes.array,
    color: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      data: [],
      color: '#fff'
    };
  },

  render: function() {

    var circles = this.props.data.map(function(point, i) {
      return (<Circle cx={this.props.xScale(point.x)} cy={this.props.yScale(point.y)} r={this.props.pointRadius} fill={this.props.color} key={this.props.seriesName + i} />);
    }.bind(this));

    return (
      <g>
        {circles}
      </g>
    );
  }

});

var ScatterChart = React.createClass({

  propTypes: {
    margins: React.PropTypes.object,
    legendOffset: React.PropTypes.number,
    titleOffset: React.PropTypes.number,
    pointRadius: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    axesColor: React.PropTypes.string,
    title: React.PropTypes.string,
    colors: React.PropTypes.func,
    legend: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      margins: {top: 20, right: 30, bottom: 30, left: 30},
      legendOffset: 120,
      titleOffset: 56,
      pointRadius: 3,
      width: 400,
      height: 200,
      axesColor: '#000',
      title: '',
      colors: d3.scale.category20c()
    };
  },

  _calculateScales: function(props, chartWidth, chartHeight) {

    var allValues = _.flatten(_.values(this.props.data), true);
    var xValues = _.pluck(allValues, 'x');
    var yValues = _.pluck(allValues, 'y');

    var xScale = d3.scale.linear()
      .domain([d3.min([d3.min(xValues), 0]), d3.max(xValues)])
      .range([0, chartWidth]);

    var yScale = d3.scale.linear()
      .domain([d3.min([d3.min(yValues), 0]), d3.max(yValues)])
      .range([chartHeight, 0]);

    return {xScale: xScale, yScale: yScale};

  },

  render: function() {

    // Calculate inner chart dimensions
    var chartWidth, chartHeight;

    chartWidth = this.props.width - this.props.margins.left - this.props.margins.right;
    chartHeight = this.props.height - this.props.margins.top - this.props.margins.bottom;

    if (this.props.legend) {
      chartWidth = chartWidth - this.props.legendOffset;
    }

    if (this.props.title) {
      chartHeight = chartHeight - this.props.titleOffset;
    }

    var scales = this._calculateScales(this.props, chartWidth, chartHeight);

    var trans = "translate(" + this.props.margins.left + "," + this.props.margins.top + ")";

    var index = 0;
    var dataSeriesArray = [];
    for(var seriesName in this.props.data) {
      if (this.props.data.hasOwnProperty(seriesName)) {
        dataSeriesArray.push(
            <DataSeries
              xScale={scales.xScale}
              yScale={scales.yScale}
              seriesName={seriesName}
              data={this.props.data[seriesName]}
              width={chartWidth}
              height={chartHeight}
              color={this.props.colors(index)}
              pointRadius={this.props.pointRadius}
              key={seriesName}
            />
        );
        index++;
      }
    }

    return (
      <Chart width={this.props.width} height={this.props.height} title={this.props.title}>
        <g transform={trans}>
          {dataSeriesArray}
          <YAxis
            yAxisClassName="scatter y axis"
            yScale={scales.yScale}
            hideOrigin={true}
            margins={this.props.margins}
            yAxisTickCount={this.props.yAxisTickCount}
            width={chartWidth}
            height={chartHeight}
            stroke={this.props.axesColor}
          />
          <XAxis
            xAxisClassName="scatter x axis"
            strokeWidth="1"
            hideOrigin={true}
            xScale={scales.xScale}
            data={this.props.data}
            margins={this.props.margins}
            width={chartWidth}
            height={chartHeight}
            stroke={this.props.axesColor}
          />
        </g>
      </Chart>
    );
  }

});

exports.ScatterChart = ScatterChart;
