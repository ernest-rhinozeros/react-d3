'use strict';

var expect = require('chai').expect;

describe('Chart', function() {

  var React,
      ReactTestUtils,
      Chart;

  before(() => {
    React = require('react');
    ReactTestUtils = require('react-addons-test-utils');
    Chart = require('../src/common/charts/Chart');
  });

  it('can be rendered', function() {
    var chart = React.createElement(Chart, null);
    var isChart = ReactTestUtils.isElementOfType(chart, Chart);
    var renderedChart = ReactTestUtils.renderIntoDocument(chart);

    expect(chart).to.exist;
    expect(isChart).to.be.true;
    expect(renderedChart).to.exist;
  });

  describe('BasicChart', function() {
    var BasicChart;

    before(() => {
      BasicChart = require('../src/common/charts/BasicChart');
    });

    it('renders without a legend', function() {
      var renderedChart = ReactTestUtils.renderIntoDocument(
        <Chart
          legend={false}
        />
      );

      var basicChart = ReactTestUtils.findRenderedComponentWithType(
        renderedChart, BasicChart
      );

      var isBasicChart= ReactTestUtils.isCompositeComponentWithType(
        basicChart, BasicChart
      );

      expect(basicChart).to.exist;
      expect(isBasicChart).to.be.true;
    });
  });

  describe('LegendChart', function() {
    var LegendChart;

    before(() => {
      LegendChart = require('../src/common/charts/LegendChart');
    });

    it('renders with a legend', function() {
      var renderedChart = ReactTestUtils.renderIntoDocument(
        <Chart
          legend={true}
        />
      );

      var legendChart = ReactTestUtils.findRenderedComponentWithType(
        renderedChart, LegendChart
      );

      var isLegendChart= ReactTestUtils.isCompositeComponentWithType(
        legendChart, BasicChart
      );

      expect(legendChart).to.exist;
      expect(isLegendChart).to.be.true;
    });
  });
});
