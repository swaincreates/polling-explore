import dotenv from 'dotenv';
import { PollRecord } from './models/pollRecord.js';
import { ChartView } from './views/chartView.js';
import { PollView } from './views/pollView.js';

dotenv.load();
var pollInstance1 = new PollRecord({ id: 1 });

var instanceView = new ChartView({model: pollInstance1});
instanceView.render();

var instancePollView = new PollView({model: pollInstance1});
instancePollView.render();
