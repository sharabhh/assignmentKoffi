import axios from "axios";

async function calculate_profit(
  scheme_code,
  start_date,
  end_date,
  capital = 1000000.0
) {
  const apiData = await axios.get(`https://api.mfapi.in/mf/${scheme_code}`);
  const data = apiData.data.data;
  for (var i = 0; i < data.length; i++) {
    if (start_date === data[i].date) {
      var startDateVariable = data[i];
    }

    if (end_date === data[i].date) {
      var endDateVariable = data[i];
    }
  }

  // rounding off to 2 decimal places cause it was shown on the assignment page actual number is longer

  const units_alloted_onStart = roundOff(capital / startDateVariable.nav);
  const units_alloted_onEnd = roundOff(capital / endDateVariable.nav);
  const value_of_units_onEnd = roundOff(
    units_alloted_onStart * endDateVariable.nav
  );

  const netProfit = roundOff(value_of_units_onEnd - capital);
  console.log(netProfit);
}

function roundOff(value) {
  return Math.round(value * 100) / 100;
}
// function call
calculate_profit("101206", "26-07-2023", "18-10-2023", 1000000);
