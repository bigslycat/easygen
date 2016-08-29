'use strict';

const bezierEasing = require('bezier-easing');

module.exports = class Easing {
  constructor(easingOptions, startValue, endValue) {
    this.calc = bezierEasing(...easingOptions);
    this.chains = {};

    this.startValue = startValue;
    this.endValue = endValue;
    this.commonOffset = endValue - startValue;
  }

  getChain(discreteValuesCount) {
    return this.chains[discreteValuesCount] || (
      this.chains[discreteValuesCount] = this.generate(discreteValuesCount)
    );
  }

  generate(discreteValuesCount) {
    const chain = [];

    const coefficientIncrement = 1 / (discreteValuesCount - 1);

    for (let i = 0; i < discreteValuesCount; i++) {
      const coefficientOffset = this.calc(coefficientIncrement * i);
      const offset = this.commonOffset * coefficientOffset;

      chain.push(this.startValue + offset);
    }

    return chain;
  }
};
