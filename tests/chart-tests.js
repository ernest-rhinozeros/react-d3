'use strict';

var expect = require('chai').expect;

describe('Chart', function() {

  var React;
  var Chart;
  // var generate;
  var TestUtils;

  before(() => {
    React = require('react/addons');
    Chart = require('../src/common/charts/Chart');
    // generate = require('./utils/datagen').generateArrayOfPoints;
    TestUtils = React.addons.TestUtils;
  });

  it('renders and tests basic chart component', function() {
    var BasicChart = require('../src/common/charts/BasicChart');

    var chart = TestUtils.renderIntoDocument(
      <Chart
        legend={false}
      />
    );

    var basicChart = TestUtils.scryRenderedComponentsWithType(
      chart, BasicChart);
    expect(basicChart).to.have.length(1);
  });

  it('renders and tests legend chart component', function() {
    var LegendChart = require('../src/common/charts/LegendChart');

    var legendChart = TestUtils.renderIntoDocument(
      <Chart
        legend={true}
      />
    );

    var legendChart = TestUtils.scryRenderedComponentsWithType(
      chart, LegendChart);
    expect(legendChart).to.have.length(1);
  });
});
