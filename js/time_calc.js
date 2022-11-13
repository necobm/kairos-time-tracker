function mainTimeCalc(){
  let timeEntries = getTimeEntriesFromHTML();

  if(timeEntries.length === 0){
    alert("No tienes fichajes registrados");
  }

  let hoursByDate = calculateHours(timeEntries);

  let totalHoursByDate = calculateTotalHoursByDate(hoursByDate);

  console.log(hoursByDate);
  console.log(totalHoursByDate);

  insertTimeReport(totalHoursByDate);
}

function getHoursDiff(startDate, endDate){
    let hours = Math.round(
        Math.abs(endDate.getHours() - startDate.getHours()),
      );
      let minutes = Math.round(
        endDate.getMinutes() - startDate.getMinutes(),
      );
      let seconds = Math.round(
        Math.abs(endDate.getSeconds() - startDate.getSeconds()),
      );
      
      if(minutes < 0){
          minutes = 60 - Math.abs(minutes);
        hours--;
      }
      
      return hours + ':' + minutes + ':' + seconds;
}

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

function calculateHours(timeEntries){
   let hoursByDate = [];
   let currentDate = timeEntries[0].date;
   let dateTime1 = null;
   let dateTime2 = null;

   timeEntries.forEach(timeEntry => {
    if(currentDate !== timeEntry.date){
      currentDate = timeEntry.date;
      dateTime1 = dateTime2 = null;
    }
    
    if(timeEntry.type.search("Salida") != -1){
      dateTime2 = createDateTimeFromString(timeEntry.date, timeEntry.time);
    }

    if(timeEntry.type.search("Entrada") != -1){
      dateTime1 = createDateTimeFromString(timeEntry.date, timeEntry.time);
    }


    if(currentDate === timeEntry.date && dateTime1 != null && dateTime2 != null){
      // Calcular
      hoursByDate.push({
        "date": timeEntry.date,
        "hours": getHoursDiff(dateTime1, dateTime2)
      });
      dateTime1 = dateTime2 = null;
    }
      
   });

   return hoursByDate;
}

function calculateTotalHoursByDate(hoursByDate){
  let totalSeconds = 0;
  let currentDate = hoursByDate[0].date;
  let totalHoursByDate = [];
  hoursByDate.forEach( (element, index) => {
    let seconds = getSecondsFromTime(element.hours);
    if(currentDate != element.date || index == hoursByDate.length - 1){
      if(currentDate == element.date){
        totalSeconds += seconds;
      }
      totalHoursByDate.push({
        'date': currentDate,
        "hours": Number((totalSeconds / 3600).toFixed(2))
      });
      totalSeconds = 0;
      currentDate = element.date;
    }

    
    totalSeconds += seconds;
    
  });

  return totalHoursByDate;
}

function createDateTimeFromString(date, time){
  let dateArray = date.split('/');
  let timeArray = time.split(':');

  return new Date(
    parseInt(dateArray[2]), // Year
    parseInt(dateArray[1]), // Month
    parseInt(dateArray[0]), // Day
    parseInt(timeArray[0]), // Hour
    parseInt(timeArray[1]), // Minute
    parseInt(timeArray[2]) // Second
  )
}

function getSecondsFromTime(time){
  let timeArray = time.split(":");
  return parseInt(timeArray[0] * 3600) + parseInt(timeArray[1] * 60) + parseInt(timeArray[2]);
}