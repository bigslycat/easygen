'use strict';

const Easing = require('./Easing');

class EasyGen {
  constructor(initValue) {
    this.easings = [];
    this.cache = [];
    this.startValue = initValue;
  }

  addKey(easingOptions, endValue) {
    this.easings.push(new Easing(easingOptions, this.startValue, endValue));
    this.startValue = endValue;
    return this;
  }

  build(...args) {
    const counts = Array.isArray(args[0]) ? args[0] : args;

    const commonEasing = counts.map((discreteValuesCount, index) => {
      if (!this.cache[index]) this.cache[index] = {};

      if (!this.cache[index][discreteValuesCount]) {
        this.cache[index][discreteValuesCount] = this.easings[index] ?
          this.easings[index].getChain(discreteValuesCount).slice(0, -1) : [];
      }

      return this.cache[index][discreteValuesCount];
    });

    const lastRequestedEasing = this.easings[this.easings.length - 1];
    const lastChain = lastRequestedEasing.getChain(counts.pop());

    return [].concat(...commonEasing, lastChain.slice(-1));
  }
}

EasyGen.Easing = Easing;

module.exports = EasyGen;
