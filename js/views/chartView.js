import { D3Chart } from '../helpers/chartViewHelpers.js';

export var ChartView = Backbone.View.extend({

  el: $('#barchart'),

  render: function() {
    var that = this;
    this.model.fetch({
      success: function(){
        // console.log('initial render');
        // console.log(that.model);
        var barData = that.model.get('data');
        var chart = D3Chart.renderChart(barData);
        $(that.el).html(chart);
        //Have to use sync or it doesn't work when updated from pollView... not sure why
        that.model.on('sync', that.rerender, that);
        // that.model.on('change', that.rerender, that);
      }
    });
  },
  rerender: function(){
    // console.log('rerender');
    var reBarData = this.model.get('data');
    D3Chart.reRender(reBarData);
  }

});
