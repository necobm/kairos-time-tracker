function insertTimeReport(totalHoursByDate){
    let container = document.querySelector("div#controller > div.row > div.col-md-6:nth-child(2)");
    let div = document.createElement("div");
    div.classList.add("row");
    
    let html = ' <div class="col-xs-12" id="time-report-container" style="margin-bottom:20px;"><h3>Total time tracked:</h3>';

    totalHoursByDate.forEach(element => {
        html += '<p>' + element.date + ': <b>' + element.hours + ' Hrs</b></p>';    
    });
    

    //html += '<button type="button" class="btn btn-brand-green" id="refresh-btn"><i class="fas fa-refresh"></i> Refresh</button></div>';

    html += '</div>';

    div.innerHTML = html;

    container.prepend(div);
}