'use strict';

var expect = require('chai').expect;

describe('LegendChart', function() {

  var React,
      ReactTestUtils,
      LegendChart,
      Legend,
      generate;

  before(() => {
    React = require('react');
    ReactTestUtils = require('react-addons-test-utils');
    LegendChart = require('../src/common/charts/LegendChart');
    Legend = require('../src/common/Legend');
    generate = require('./utils/datagen').generateArrayOfPoints;
  });

  var legendChartRendersCorrect = function(dom) {
    var legendChart = ReactTestUtils.findRenderedComponentWithType(
      dom, LegendChart);

    var isLegendChart = ReactTestUtils.isCompositeComponentWithType(
      legendChart, LegendChart);

    expect(legendChart).to.exist;
    expect(isLegendChart).to.be.true;
  };

  var titleClassName = 'rd3-chart-title';

  it('can be rendered and contains a legend by default', function() {
    var dom = ReactTestUtils.renderIntoDocument(
      <LegendChart />
    );

    legendChartRendersCorrect(dom);

    var legend = ReactTestUtils.findRenderedComponentWithType(
      dom, Legend);

    var isLegend = ReactTestUtils.isCompositeComponentWithType(
      legend, Legend);

    expect(legend).to.exist;
    expect(isLegend).to.be.true;
  });

  it('contains a legend if specified', function() {
    var dom = ReactTestUtils.renderIntoDocument(
      <LegendChart
        legend={true}
      />
    );

    legendChartRendersCorrect(dom);

    var legend = ReactTestUtils.findRenderedComponentWithType(
      dom, Legend);

    var isLegend = ReactTestUtils.isCompositeComponentWithType(
      legend, Legend);

    expect(legend).to.exist;
    expect(isLegend).to.be.true;
  });

  it('does not contain legend if not specified', function() {
    var dom = ReactTestUtils.renderIntoDocument(
      <LegendChart
        legend={false}
      />
    );

    legendChartRendersCorrect(dom);

    var legend = ReactTestUtils.scryRenderedComponentsWithType(
      dom, Legend);

    expect(legend).to.have.length(0);
  });

  it('has headings if specified', function() {
    var chart = ReactTestUtils.renderIntoDocument(
      <LegendChart title={'foo'} />
    );

    var heading = ReactTestUtils.findRenderedDOMComponentWithClass(
      chart, titleClassName);

    expect(heading).to.exist;
  })

  it('has no headings if not specified', function() {
    var chart = ReactTestUtils.renderIntoDocument(
      <LegendChart />
    );

    var getHeading = function() {
      return ReactTestUtils.findRenderedDOMComponentWithClass(
        chart, titleClassName);
    };

    var expectedErrorMessage = 'Did not find exactly one match (found: 0) for class:' + titleClassName;

    expect(getHeading).to.throw(Error);
    expect(getHeading).to.throw(expectedErrorMessage);
  });
});
