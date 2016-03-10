'use strict';

var expect = require('chai').expect;

describe('BasicChart', function() {

  var React,
      ReactTestUtils,
      BasicChart;

  before(() => {
    React = require('react');
    ReactTestUtils = require('react-addons-test-utils');
    BasicChart = require('../src/common/charts/BasicChart');
  });

  var titleClassName = 'rd3-chart-title';

  it('has headings if specified', function() {
    var chart = ReactTestUtils.renderIntoDocument(
      <BasicChart title={'foo'} />
    );

    var heading = ReactTestUtils.findRenderedDOMComponentWithClass(
      chart, titleClassName);

    expect(heading).to.exist;
  })

  it('has no headings if not specified', function() {
    var chart = ReactTestUtils.renderIntoDocument(
      <BasicChart />
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
