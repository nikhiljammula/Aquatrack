//let val = parseInt($("#a1").val(), 10);
function getValues() {
    var settings = {
        "url": "https://cqddtvdic5.execute-api.ap-south-1.amazonaws.com/get-values/simulated-values/levelalert",
        "method": "GET",
    };
    var temp = "";
    var dateTime;
    setInterval(() => {
        //alert("Updated just now");
        $.ajax(settings).done(function (response) {
            $("#alertTableBody").empty();
            for (i = 0; i < response.Items.length; i++) {
                dateTime = new Date(parseInt(response.Items[i].timestamp.N));
                temp = temp + `<tr>
                    <td>${response.Items[i].id.N}</td>
                    <td>${dateTime.getDate() + "-"+ (dateTime.getMonth()+1)  + "-" + dateTime.getFullYear() + "   "  + dateTime.getHours() + ":"  + dateTime.getMinutes() + ":" + dateTime.getSeconds()}</td>
                    <td>${response.Items[i].depth.N}</td>
                    <td>${response.Items[i].level.N}</td>
                    <td>${response.Items[i].vol.N}</td>
                </tr>`;
            }
            $("table").append(temp);
            temp = "";
        });
    }, 5000);

}
getValues();
