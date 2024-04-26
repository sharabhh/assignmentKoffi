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
// console.log('not inside');
    if (start_date == data[i].date) {
      // console.log('i reached inside');
      var startDateVariable = data[i];
    }

    if (end_date === data[i].date) {
      var endDateVariable = data[i];
    }

    if(i=== data.length -1){
      if(!startDateVariable){
        var simpleDate = start_date.replace(/-/g,'')
        var simpleYear = simpleDate[4] + simpleDate[5] + simpleDate[6] + simpleDate[7]
        var simpleMonth = simpleDate[2] + simpleDate[3]
        var simpleDay = simpleDate[0] + simpleDate[1]
        // console.log(simpleYear);
        var date = new Date(simpleYear,simpleMonth-1, simpleDay)
        date.setDate(date.getDate() + 1);
        console.log(date)
        var updated_date = date.toLocaleDateString()
        var updatedDate, updatedMonth, updatedYear
        if(updated_date.length===9){
          updatedMonth = 0 + updated_date[0]
          updatedDate = updated_date[2] + updated_date[3]
          updatedYear = updated_date[5] + updated_date[6] + updated_date[7] + updated_date[8]
          start_date = `${updatedDate}-${updatedMonth}-${updatedYear}`
          // console.log(updatedDate+updatedMonth+updatedYear);
        }else if(updated_date.length===10){
          updatedMonth = updated_date[0] + updated_date[1]
          updatedDate = updated_date[3] + updated_date[4]
          updatedYear = updated_date[6] + updated_date[7] + updated_date[8] +updated_date[9]
          
        }
        // console.log(start_date, data[4].date);
        i=0
      }
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


// currently the values are hardcoded
calculate_profit("101206", "25-03-2024", "26-03-2024", 1000000);
// 184.12