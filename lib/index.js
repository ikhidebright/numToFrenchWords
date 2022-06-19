const staticWords = require("./config/staticWords");

/**
 * A recursive function
 * @param {number} val
 * @param {boolean} suffix
 * @returns string[]
 */

const numFr = (val, suffix = true) => {
  // val must be within a range of 0 - 1000000
  if (val < 0 || val >= 1000000) {
    throw Error("out of range");
  }
  const v = Math.floor(val);
  if (v < 100) {
    /*
    if val is below hundred get french word from the staticWords array
    */
    return staticWords[v];
  }

  if (v < 1000) {
    //   912 = 9 * 100 + 12
    const prev100 = Math.floor(v / 100);

    const next100 = v % 100;
    if (prev100 == 1) {
      // 100
      if (next100 == 0) return `cent`;
      // 123
      return `cent-${numFr(next100)}`;
    }
    //234
    return `${numFr(prev100, false)}-cent${
      prev100 > 1 && suffix ? "s" : ""
    }-${numFr(next100, true)}`;
  }
  // 123456 = 123 * 1000 + 456
  const prev1000 = Math.floor(v / 1000); // 123.456
  const next1000 = v % 1000;
  if (prev1000 == 1) {
    //1234
    //1000
    if (next1000 == 0) return `mille`;
    return `mille-${numFr(next1000, true)}`;
  }
  return `${numFr(prev1000, false)}-mille${suffix ? "s" : ""}-${numFr(
    next1000
  )}`;
};

module.exports = numFr;
