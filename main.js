import { fillTable } from "./dom.js";
import { calculateAmortization } from "./amortization.js";

const MONTHS_IN_YEAR = 12;

function parseInput(value) {
  return Math.abs(parseFloat(value)) || 0;
}

function getValues(form) {
  const formData = new FormData(form);
  const values = {};

  for (const [key, value] of formData.entries()) {
    values[key] = parseInput(value);
  }

  values.months = values.years * MONTHS_IN_YEAR;
  values.monthlyRate = values.rate / 100 / MONTHS_IN_YEAR;

  return values;
}

document.getElementById("amortizationForm").addEventListener("input", function (event) {
  const form = event.currentTarget; // Use currentTarget to get the form element
  const values = getValues(form);
  const { amount, monthlyRate, months, years } = values;
  const { amortizationM } = calculateAmortization(amount, monthlyRate, months, years);
  fillTable(amortizationM);
});
