   
const valueSubmit = document.querySelector(".valueSubmit")
const tickerField = document.getElementById("tickerFIeld")

const stockName = document.querySelector(".stockName")
const date = document.querySelector(".date")
const high = document.querySelector(".high")
const low = document.querySelector(".low")
var chart = null;
 async function getData(){
    
    
    let url = "https://api.marketstack.com/v1/eod?access_key=892d440376e42dbe7bc95a45174510f6&symbols="+String(document.getElementById("tickerField").value);
    
    const response = await fetch(url)
    const data = await  response.json()
    console.log(data.data);
    stockName.textContent = String(data.data[0].symbol)
    date.textContent = String(data.data[0].date)
    high.textContent = String(data.data[0].high)
    low.textContent = String(data.data[0].low)
    
    var highValues = [];
    var labels = [];
    for (let i = 0; i < 100; i++) {
        highValues.push(data.data[i].high);
        labels.push(data.data[i].date);
    }

    const dataVal ={
        labels : labels,
        datasets:[{
            data: highValues
        }]

    };

    const config = {
        type:'line',
        data: dataVal,
        options: {
            plugins: {
                legend:{
                   display: false
                },
                title:{
                    display: true,
                    text: 'Stock price of '+String(data.data[0].symbol)+' over past 100 days'
                }

            }
        }



    }
    if(chart != null){
        chart.destroy();
    }
    chart = new Chart(
        document.getElementById('lineChart'),
        config
    )
    
    

    
    



}
 
valueSubmit.addEventListener("click",getData)   


 
