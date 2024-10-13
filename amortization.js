export function calculateMonthlyRepayment(amount, monthlyRate, months) {
  let monthlyRepayment;
  if (monthlyRate) {
    monthlyRepayment =
      (amount * monthlyRate) / (1 - Math.pow(1 / (1 + monthlyRate), months));
  } else {
    monthlyRepayment = amount / months;
  }
  return monthlyRepayment;
}

export function calculateAmortization(amount, monthlyRate, months, years) {
  const monthlyRepayment = calculateMonthlyRepayment(amount, monthlyRate, months);
  let balance = amount;
  const amortizationM = [];
  for (let y = 0; y < years; y++) {
    for (let m = 0; m < 12; m++) {
      const interestM = balance * monthlyRate;
      const amountM = monthlyRepayment - interestM;
      balance -= amountM;
      amortizationM.push({
        monthlyRepayment,
        amortizedCapital: amountM,
        interest: interestM,
        remainingCapital: balance,
      });
    }
  }
  return { amortizationM };
}
