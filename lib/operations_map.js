var _ = require('underscore')._;
var util = require("util");

function literalizeArray(arr) {
  if (!_.isArray(arr)) { return arr; }

  return util.format('{%s}', arr.map(function (v) {
    if (v.search(/[,{}]/) !== -1) { return util.format('"%s"', v); }

    return v;
  }).join(','));
}

function mutatorIn(in) {
  return util.format('(%s)', in);
}

module.exports = {
  '=': {operator: '='},
  '!': {operator: '!='},
  '>': {operator: '>'},
  '<': {operator: '<'},
  '>=': {operator: '>='},
  '<=': {operator: '<='},
  '!=': {operator: '<>'},
  '<>': {operator: '<>'},
  'LIKE': {operator: 'LIKE'},
  'ILIKE': {operator: 'ILIKE'},
  'IN': {operator: 'IN', mutator: mutatorIn},
  '@>': {operator: '@>', mutator: literalizeArray},
  '<@': {operator: '<@', mutator: literalizeArray},
  '&&': {operator: '&&', mutator: literalizeArray}
};
