'use strict';

var expect = require('chai').expect;

describe('Legend', function() {

  var React,
      ReactTestUtils,
      Legend,
      generate;

  before(() => {
    React = require('react');
    ReactTestUtils = require('react-addons-test-utils');
    Legend = require('../src/common/Legend');
    generate = require('./utils/datagen').generateArrayOfPoints;
  });

  it('renders and tests legend component', function() {

    // Render a linechart using array data
    var data = [
      {
        name: "series1",
        values: generate(5)
      },
      {
        name: "series2",
        values: generate(5)
      }
    ];

    var legend = ReactTestUtils.renderIntoDocument(
      <Legend
        data={data}
        margins={{top: 10, right: 20, bottom: 30, left: 30}}
        width={90}
      />
    );

    // Verify that legend list exists
    var list = ReactTestUtils.findRenderedDOMComponentWithTag(
      legend, 'ul');
    expect(list).to.exist;

    // Verify that it has the proper number of list items
    var listItems = ReactTestUtils.scryRenderedDOMComponentsWithTag(
      legend, 'li');
    expect(listItems).to.have.length(2);
  });
});
