(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _modelsPollRecordJs = require('./models/pollRecord.js');

var _viewsChartViewJs = require('./views/chartView.js');

var _viewsPollViewJs = require('./views/pollView.js');

_dotenv2['default'].load();
var pollInstance1 = new _modelsPollRecordJs.PollRecord({ id: 1 });

var instanceView = new _viewsChartViewJs.ChartView({ model: pollInstance1 });
instanceView.render();

var instancePollView = new _viewsPollViewJs.PollView({ model: pollInstance1 });
instancePollView.render();

},{"./models/pollRecord.js":3,"./views/chartView.js":4,"./views/pollView.js":5,"dotenv":8}],2:[function(require,module,exports){
/*global d3*/
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var D3Chart = (function () {
  function D3Chart(bardata) {
    _classCallCheck(this, D3Chart);

    this.bardata = bardata;
  }

  //end D3Chart class

  _createClass(D3Chart, null, [{
    key: 'renderChart',
    value: function renderChart(bardata) {
      // Add Margins
      var margin = { top: 20, right: 15, bottom: 20, left: 25 };

      var height = 300 - margin.top - margin.bottom,
          width = 500 - margin.left - margin.right,
          barWidth = 75,
          barOffset = 25;

      var yScale = d3.scale.linear().domain([0, d3.max(bardata)]).range([0, height]);

      var xScale = d3.scale.ordinal().domain(d3.range(0, bardata.length))
      // .domain(['A', 'B', 'C', 'D', 'E'])
      .rangeBands([0, width], 0.2);

      var xAxisScale = d3.scale.ordinal()
      //.domain(d3.range(0, bardata.length))
      .domain(['A', 'B', 'C', 'D', 'E']).rangeBands([0, width], 0.2);

      var tempColor;

      var svgContainer = d3.select('#barchart').append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).style('background', '#D6F5EF').append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

      var bars = svgContainer.selectAll('rect').data(bardata).enter().append('rect');

      var barAttrs = bars.style('fill', '#2785A1').attr('width', xScale.rangeBand()).attr('height', function (d) {
        return yScale(d);
      }).attr('x', function (d, i) {
        return xScale(i);
      }).attr('y', function (d) {
        return height - yScale(d);
      }).on('mouseover', function (d) {
        tempColor = this.style.fill;
        d3.select(this).style('opacity', .6).style('fill', '#ffb889');
      }).on('mouseout', function (d) {
        d3.select(this).style('opacity', 1).style('fill', tempColor);
      });

      var text = svgContainer.selectAll('text').data(bardata).enter().append('text');
      var textLabels = text.attr('x', function (d, i) {
        return xScale(i) + 30;
      }).attr('y', function (d) {
        return height - yScale(d) + 20;
      }).text(function (d) {
        return d;
      }).attr('font-family', 'sans-serif').attr('font-size', '20px').attr('fill', 'red');

      //vertial axis
      var vGuideScale = d3.scale.linear().domain([0, d3.max(bardata)]).range([height, 0]);

      var vAxis = d3.svg.axis().scale(vGuideScale).orient('left').ticks(10);

      var vGuide = d3.select('svg').append('g').attr('class', 'y-axis');
      vAxis(vGuide);
      vGuide.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
      vGuide.selectAll('path').style({ fill: 'none', stroke: '#000' });
      vGuide.selectAll('line').style({ stroke: '#000' });

      // horizontal axis
      var hAxis = d3.svg.axis().scale(xAxisScale).orient('bottom');
      //.tickValues([1, 2, 3, 4, 5]);

      var hGuide = d3.select('svg').append('g').attr('class', 'x-axis');
      hAxis(hGuide);
      hGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')');
      hGuide.selectAll('path').style({ fill: 'none', stroke: '#000' });
      hGuide.selectAll('line').style({ stroke: '#000' });
    }
    //end renderChart method

  }, {
    key: 'reRender',
    value: function reRender(bardata) {

      var margin = { top: 20, right: 15, bottom: 20, left: 25 };

      var height = 300 - margin.top - margin.bottom,
          width = 500 - margin.left - margin.right,
          barWidth = 75,
          barOffset = 25;

      var yScale = d3.scale.linear().domain([0, d3.max(bardata)]).range([0, height]);

      var xScale = d3.scale.ordinal().domain(d3.range(0, bardata.length)).rangeBands([0, width], 0.2);

      var tempColor;

      d3.select('#barchart').selectAll('rect').data(bardata).transition().duration(1000)
      //.attr('width', barWidth)
      .attr('width', xScale.rangeBand()).attr('height', function (d) {
        return yScale(d);
      }).attr('x', function (d, i) {
        return xScale(i);
      }).attr('y', function (d) {
        return height - yScale(d);
      });

      var text = d3.select('#barchart').selectAll('text').data(bardata).transition().duration(1000).attr('x', function (d, i) {
        return xScale(i) + 25;
      }).attr('y', function (d) {
        return height - yScale(d) + 20;
      }).text(function (d) {
        return d;
      }).attr('font-family', 'sans-serif').attr('font-size', '20px').attr('fill', 'white');

      var vGuideScale = d3.scale.linear().domain([0, d3.max(bardata)]).range([height, 0]);

      var vAxis = d3.svg.axis().scale(vGuideScale).orient('left').ticks(10);

      //For some reason I can't dete vGuide
      //var vGuide = d3.select('svg').append('g');
      var vGuide2 = d3.select('.y-axis');
      vAxis(vGuide2);
      //vGuide2.attr('transform', 'translate(25, 0)');
      vGuide2.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
      vGuide2.selectAll('path').style({ fill: 'none', stroke: '#000' });
      vGuide2.selectAll('line').style({ stroke: '#000' });
    }
  }]);

  return D3Chart;
})();

exports.D3Chart = D3Chart;

},{}],3:[function(require,module,exports){
(function (process){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var PollRecord = Backbone.Firebase.Model.extend({
  urlRoot: process.env.FIREBASE_URL
});
exports.PollRecord = PollRecord;

}).call(this,require('_process'))

},{"_process":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _helpersChartViewHelpersJs = require('../helpers/chartViewHelpers.js');

var ChartView = Backbone.View.extend({

  el: $('#barchart'),

  render: function render() {
    var that = this;
    this.model.fetch({
      success: function success() {
        // console.log('initial render');
        // console.log(that.model);
        var barData = that.model.get('data');
        var chart = _helpersChartViewHelpersJs.D3Chart.renderChart(barData);
        $(that.el).html(chart);
        //Have to use sync or it doesn't work when updated from pollView... not sure why
        that.model.on('sync', that.rerender, that);
        // that.model.on('change', that.rerender, that);
      }
    });
  },
  rerender: function rerender() {
    // console.log('rerender');
    var reBarData = this.model.get('data');
    _helpersChartViewHelpersJs.D3Chart.reRender(reBarData);
  }

});
exports.ChartView = ChartView;

},{"../helpers/chartViewHelpers.js":2}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var PollView = Backbone.View.extend({

  el: $('#poll'),
  events: {
    'click .btn': 'increment'
  },
  increment: function increment(e) {
    e.preventDefault();

    //Grab data-id for index of array
    var id = $(e.currentTarget).data('id');

    //Get the data
    // var theData = this.model.attributes.data;
    var theData = this.model.get('data');

    // theData[id]++;
    var newData = function newData(data, id) {
      data[id]++;
      return data;
    };

    var onlyData = newData(theData, id);

    //Must use save or else it doesnt sync correctly
    this.model.save('data', onlyData);
    // this.model.set(); This doesn't  work for some reason
  },

  render: function render() {
    var that = this;
    this.model.fetch({
      success: function success() {
        var answers = that.model.get('answers');
        var question = that.model.get('question');
        var template = _.template($('#polling-template').html());
        $(that.el).html(template({ answers: answers, question: question }));
      }
    });

    // var thePoll = '<div class='btn btn-default'>Vote</div>';
    // var answers  = {answers: ['one', 'two']};
    // var template = _.template($('#polling-template').html());
    // $(this.el).html(template({poop: answers}));
  }

});
exports.PollView = PollView;

},{}],6:[function(require,module,exports){

},{}],7:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],8:[function(require,module,exports){
(function (process){
'use strict'

var fs = require('fs')

module.exports = {
  /*
   * Main entry point into dotenv. Allows configuration before loading .env and .env.$NODE_ENV
   * @param {Object} options - valid options: path ('.env'), encoding ('utf8')
   * @returns {Boolean}
  */
  config: function (options) {
    var path = '.env'
    var encoding = 'utf8'
    var silent = false

    if (options) {
      if (options.silent) {
        silent = options.silent
      }
      if (options.path) {
        path = options.path
      }
      if (options.encoding) {
        encoding = options.encoding
      }
    }

    try {
      // specifying an encoding returns a string instead of a buffer
      var parsedObj = this.parse(fs.readFileSync(path, { encoding: encoding }))

      Object.keys(parsedObj).forEach(function (key) {
        process.env[key] = process.env[key] || parsedObj[key]
      })

      return true
    } catch(e) {
      if (!silent) {
        console.error(e)
      }
      return false
    }
  },

  /*
   * Parses a string or buffer into an object
   * @param {String|Buffer} src - source to be parsed
   * @returns {Object}
  */
  parse: function (src) {
    var obj = {}

    // convert Buffers before splitting into lines and processing
    src.toString().split('\n').forEach(function (line) {
      // matching "KEY' and 'VAL' in 'KEY=VAL'
      var keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/)
      // matched?
      if (keyValueArr != null) {
        var key = keyValueArr[1]

        // default undefined or missing values to empty string
        var value = keyValueArr[2] ? keyValueArr[2] : ''

        // expand newlines in quoted values
        var len = value ? value.length : 0
        if (len > 0 && value.charAt(0) === '\"' && value.charAt(len - 1) === '\"') {
          value = value.replace(/\\n/gm, '\n')
        }

        // remove any surrounding quotes and extra spaces
        value = value.replace(/(^['"]|['"]$)/g, '').trim()

        // is this value a variable?
        if (value.charAt(0) === '$') {
          var possibleVar = value.substring(1)
          value = obj[possibleVar] || process.env[possibleVar] || ''
        }
        // varaible can be escaped with a \$
        if (value.substring(0, 2) === '\\$') {
          value = value.substring(1)
        }

        obj[key] = value
      }
    })

    return obj
  }

}

module.exports.load = module.exports.config

}).call(this,require('_process'))

},{"_process":7,"fs":6}]},{},[1])


//# sourceMappingURL=build.js.map
