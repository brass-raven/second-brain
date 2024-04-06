"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/scripts/sandbox.ts
var sandbox_exports = {};
__export(sandbox_exports, {
  parseEquation: () => parseEquation
});
module.exports = __toCommonJS(sandbox_exports);
var digitSearch = /^\s*(\d+)\s*$/;
var variableSearch = /^\s*\[\s*([a-zA-Z]+)\s*\]\s*$/;
var operatorSearch = /^\s*([*/\-+])\s*/;
var multDivSearch = /^\s*(.*?)\s*([*/])\s*(.*?)\s*$/;
var addSubSearch = /^\s*(.*?)\s*([+-])\s*(.*?)\s*$/;
function parseEquation(equation) {
  console.log("equation", equation);
  equation = equation.trim();
  if (equation.startsWith("(")) {
    let depth = 1;
    let i = 1;
    for (; depth > 0 && i < equation.length; ++i) {
      if (equation[i] === "(") {
        depth += 1;
      } else if (equation[i] === ")") {
        depth -= 1;
      }
    }
    if (depth) {
      throw new Error("Equation is missing a ')'");
    }
    const leftEquation = equation.slice(1, i - 1);
    const rightEquation = equation.slice(i + 1);
    const match = operatorSearch.exec(rightEquation);
    return {
      left: parseEquation(leftEquation),
      right: parseEquation(rightEquation.slice(match?.[0].length)),
      type: match?.[1] ?? "*"
    };
  } else if (addSubSearch.test(equation)) {
    const match = addSubSearch.exec(equation);
    return {
      left: parseEquation(match[1]),
      right: parseEquation(match[3]),
      type: match[2]
    };
  } else if (multDivSearch.test(equation)) {
    const match = multDivSearch.exec(equation);
    return {
      left: parseEquation(match[1]),
      right: parseEquation(match[3]),
      type: match[2]
    };
  } else if (equation.startsWith("[")) {
    const match = variableSearch.exec(equation);
    if (!match) {
      throw new Error("Equation is missing a ']'" + equation);
    }
    return {
      name: match[1],
      type: "var"
    };
  } else if (digitSearch.test(equation)) {
    return parseInt(digitSearch.exec(equation)[1]);
  }
  throw new Error(`Unable to parse equation '${equation}'`);
}
console.log(
  JSON.stringify(
    parseEquation("([length] + 5 * [width]) [depth]"),
    null,
    2
  )
);
