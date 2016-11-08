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

    baseballObject = JSON.parse(baseballJson);

}

//Gets the data from getBaseballData();
//Uses the basballObject object to go through
//each of the parts of the games object
//If Toronto is found to be the city
//It will create the HTML and add the information to the div #toronto id
//Then runs the createContent() function
function getToronto(){
    getBaseballData();
    // i element connects to font awesome
    var creDiv = "<div class='results'><i class='fa fa-arrow-right' aria-hidden='true'></i>";
    var totalDiv = "";

    for(var i = 0; i<baseballObject.data.games.game.length; i++){
             var homeTeam = baseballObject.data.games.game[i].home_team_name;
             var awayTeam = baseballObject.data.games.game[i].away_team_name;
                 if(homeTeam == 'Blue Jays' || awayTeam == 'Blue Jays'){
                    totalDiv += creDiv + "The home team is: " + homeTeam + ". The away team is: " + awayTeam;
                    document.getElementById("toronto").innerHTML = totalDiv;
                    break;
                 }//End if
     }//End  for
     createContent();
 }//End getData();


//Similar to getToronto(); but places all other games to the
//div #output
 function createContent() {
    // i ele=memt connects with font awesome
     var creDiv = "<div class='results'><i class='fa fa-arrow-right' aria-hidden='true'></i>";
     var totalDiv = "";
    
     for (var i = 0; i<baseballObject.data.games.game.length; i++){
        var homeTeam = baseballObject.data.games.game[i].home_team_name;
        var awayTeam = baseballObject.data.games.game[i].away_team_name;

        if(homeTeam != 'Blue Jays' && awayTeam != 'Blue Jays'){

         totalDiv += creDiv + "The home team is: " + baseballObject.data.games.game[i].home_team_name + ". The away team is " + baseballObject.data.games.game[i].away_team_name;
         document.getElementById("output").innerHTML = totalDiv;
     }
     }
 }

 