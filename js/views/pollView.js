export var PollView = Backbone.View.extend({

  el: $('#poll'),
  events: {
    'click .btn': 'increment'
  },
  increment: function(e) {
    e.preventDefault();

    //Grab data-id for index of array
    var id = $(e.currentTarget).data('id');

    //Get the data
    // var theData = this.model.attributes.data;
    var theData = this.model.get('data');

    // theData[id]++;
    var newData = function(data, id) {
      data[id]++;
      return data;
    };

    var onlyData = newData(theData, id);

    //Must use save or else it doesnt sync correctly
    this.model.save('data', onlyData);
    // this.model.set(); This doesn't  work for some reason


  },

  render: function() {
    var that = this;
    this.model.fetch({
      success: function(){
        var answers = that.model.get('answers');
        var question = that.model.get('question');
        var template = _.template($('#polling-template').html());
        $(that.el).html(template({answers: answers, question: question}));
      }
    });

    // var thePoll = '<div class='btn btn-default'>Vote</div>';
    // var answers  = {answers: ['one', 'two']};
    // var template = _.template($('#polling-template').html());
    // $(this.el).html(template({poop: answers}));
  }

});
