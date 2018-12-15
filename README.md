# EasyGen

[![Greenkeeper badge](https://badges.greenkeeper.io/bigslycat/easygen.svg)](https://greenkeeper.io/)

Generates frames (discrete values) from composite cubic Bezier curves. Based on
[BezierEasing](https://github.com/gre/bezier-easing).

```bash
npm install --save easygen
```

## EasyGen `constructor(initValue)`

`initValue` — First calculation value

## Easing `constructor(easingOptions, startValue, endValue)`

`easingOptions` — Options of
[bezier-easing](https://github.com/gre/bezier-easing)

```javascript
const EasyGen = require('easygen');

const oneEasing = new EasyGen.Easing([0.67, 0.06, 0.04, 0.93], 1, 10);
const chain = oneEasing.getChain(5);

console.log(chain); // [ 1,
                    //   1.8950008047504183,
                    //   8.045495715738127,
                    //   9.589620025413284,
                    //   10 ]

const compositeEasing = new EasyGen(1)
  .addKey([0.67, 0.06, 0.04, 0.93], 5)
  .addKey([0.72, 0.06, 0.31, 1.00], -5);

const compositeChain = compositeEasing.build(5, 8);

console.log(compositeChain);  // [ 1,
                              //   1.3977781354446304,
                              //   4.131331429216945,
                              //   4.817608900183682,
                              //   5,
                              //   4.727443000451421,
                              //   3.977362236859202,
                              //   2.0853628758066547,
                              //  -2.024517376660917,
                              //  -4.137403402729351,
                              //  -4.836005563128882,
                              //  -5 ]
```
