import { getPollsters, groupByPollsters } from './queries.js';

console.log( await groupByPollsters() );