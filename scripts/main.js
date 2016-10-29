// JavaScript for MLBDemo

var baseballObject;


// ***********************************
// AJAX XMLHttpRequest to get the JSON
// from the site defined by url
function getJSON(url) {
    var resp;
    var xmlHttp;

    resp = '';
    xmlHttp = new XMLHttpRequest();

    if (xmlHttp !== null) {
        xmlHttp.open("GET", url, false);
        xmlHttp.send(null);
        resp = xmlHttp.responseText;
    }

    return resp;
}

// ************************************
// onload event handler creates the URL
// for a given year month and day
function getBaseballData() {
     // year = "2015";
     // month = "03";
     // day = "06";
    var day = document.getElementById('day1').value;
    var month = document.getElementById('month1').value;
    var year = document.getElementById('year1').value;

    var tempURL = "http://gd2.mlb.com/components/game/mlb/year_" + year + "/month_" + month + "/day_" + day + "/master_scoreboard.json";

    var baseballJson = getJSON("http://gd2.mlb.com/components/game/mlb/year_" + year + "/month_" + month + "/day_" + day + "/master_scoreboard.json");

    //alert(baseballJson);
    baseballObject = JSON.parse(baseballJson);

     //output();
     // getToronto();
    
}

// function output() {
//     for (var i = 0; i < baseballObject.data.games.game.length; i++) {        
//         document.writeln(baseballObject.data.games.game[i].home_team_city);
//     }
// }


//Gets the data from getBaseballData();
//Uses the basballObject object to go through
//each of the parts of the games object
//If Toronto is found to be the city
//It will create the HTML and add the information to the div #toronto id
//Then runs the createContent() function
function getToronto(){
    getBaseballData();
    var creDiv = "<div class='results'>";
    var totalDiv = "";

    for(var i = 0; i<baseballObject.data.games.game.length; i++){
             var homeCity = baseballObject.data.games.game[i].home_team_name;
             var awayCity = baseballObject.data.games.game[i].away_team_name;
                 if(homeCity == 'Blue Jays' || awayCity == 'Blue Jays'){
                    totalDiv += creDiv + "<i class='fa fa-arrow-right' aria-hidden='true'></i>The home team is: " + homeCity + ". The away team is: " + awayCity;
                    document.getElementById("toronto").innerHTML = totalDiv;
                    break;
                 }//End if
     }//End  for
     createContent();
 }//End getData();


//Similar to getToronto(); but places all other games to the
//div #output
 function createContent() {
     var creDiv = "<div class='results'>";
     var totalDiv = "";
    
     for (var i = 0; i<baseballObject.data.games.game.length; i++){
        var homeCity = baseballObject.data.games.game[i].home_team_name;
        var awayCity = baseballObject.data.games.game[i].away_team_name;

        if(homeCity != 'Blue Jays' && awayCity != 'Blue Jays'){

         totalDiv += creDiv + "<i class='fa fa-arrow-right' aria-hidden='true'></i>The home team is: " + baseballObject.data.games.game[i].home_team_name + ". The away team is " + baseballObject.data.games.game[i].away_team_name;
         document.getElementById("output").innerHTML = totalDiv;
     }
     }
 }