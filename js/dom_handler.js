function getTimeEntriesFromHTML(){
    const dataRows = document.querySelectorAll("div#controller > div.row > div.col-md-6:nth-child(2) > div.row:nth-child(3) table.table > tbody tr");
    let timeEntries = [];
    if(dataRows.length > 1){
      let hoursList = "";
      let datesList = "";
      dataRows.forEach(element => {
          let timeEntry = {"hour":"", "date":"", "type":""};
          let hourTd = element.querySelector('td:nth-child(3)');
          let dateTd = element.querySelector('td:nth-child(1)');
          let typeTd = element.querySelector('td:nth-child(4)');
          if(hourTd !== null && dateTd !== null && typeTd !== null){
              timeEntry.time = hourTd.textContent;
              timeEntry.date = dateTd.textContent;
              timeEntry.type = typeTd.textContent;
  
              timeEntries.push(timeEntry);
              
          }
          
      });
    }    
    console.log(timeEntries);
    return timeEntries;
    
}

function insertTimeReport(totalHoursByDate, totalHours = 0){
    let container = document.querySelector("div#controller > div.row > div.col-md-6:nth-child(2)");
    let div = document.createElement("div");
    div.classList.add("row");
    
    let html = ' <div class="col-xs-12" id="time-report-container" style="margin-bottom:20px;"><h3>Total time tracked:</h3>';

    totalHoursByDate.forEach(element => {
        html += '<p>' + element.date + ': <b>' + element.hours + ' Hrs</b></p>';    
    });

    if(totalHours > 0){
        html += '<p><b>TOTAL : ' + totalHours + ' Hrs</b></p>';
    }
    

    //html += '<button type="button" class="btn btn-brand-green" id="refresh-btn"><i class="fas fa-refresh"></i> Refresh</button></div>';

    html += '</div>';

    div.innerHTML = html;

    container.prepend(div);
}