function MonthRow({
  index,
  amortizedCapital,
  interest,
  remainingCapital,
  monthlyRepayment,
}) {
  const warningClass =
    Math.round(amortizedCapital) < Math.round(interest) ? "warning" : "";
  return `
    <tr class="${warningClass}">
      <td>${index}</td>
      <td class="">${Math.round(amortizedCapital)}</td>
      <td class="">${Math.round(interest)}</td>
      <td class="">${Math.round(remainingCapital)}</td>
      <td class="">${Math.round(monthlyRepayment)}</td>
    </tr>`;
}

function TheadRow(headers) {
  const headerCells = headers.map((header) => `<th>${header}</th>`).join("");
  return `
    <thead>
      <tr>
        ${headerCells}
      </tr>
    </thead>`;
}

function TbodyRows({ amortization }) {
  const rows = amortization
    .map((data, index) => MonthRow({ ...data, index: index + 1 }))
    .join("");
  return `<tbody>${rows}</tbody>`;
}

function TfooterRows({ amortization }) {
  const totals = amortization.reduce(
    (
      acc,
      { amortizedCapital, interest, remainingCapital, monthlyRepayment }
    ) => {
      acc.amortizedCapital += amortizedCapital;
      acc.interest += interest;
      acc.remainingCapital = remainingCapital; // Only the last remaining capital is relevant
      acc.monthlyRepayment += monthlyRepayment;
      return acc;
    },
    {
      amortizedCapital: 0,
      interest: 0,
      remainingCapital: 0,
      monthlyRepayment: 0,
    }
  );

  return `
    <tfoot>
      <tr>
        <td>Total</td>
        <td>${Math.round(totals.amortizedCapital)}</td>
        <td>${Math.round(totals.interest)}</td>
        <td>${Math.round(totals.remainingCapital)}</td>
        <td>${Math.round(totals.monthlyRepayment)}</td>
      </tr>
    </tfoot>`;
}

function AmortizedTable({ amortization }) {
  const headers = [
    "#",
    "Amortized Capital",
    "Interest",
    "Remaining Capital",
    "Monthly Repayment",
  ];
  return `
    ${TheadRow(headers)}
    ${TbodyRows({ amortization })}
    ${TfooterRows({ amortization })}`;
}

export function fillTable(amortization) {
  const tableHTML = AmortizedTable({ amortization });
  document.getElementById("inputMonthly").innerHTML = tableHTML;
}
