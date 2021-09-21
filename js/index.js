let liste = $("#liste");
let details = $(".details");

//ma première callBack
function requeteListe(settings, id) {
    // console.log(id);
    // console.log(settings);
    for (let i in settings.results) {
        // console.log(settings.results[i].name);
        $("<button class='details' id='details" + i + "'>" + settings.results[i].name + "</button><br>").appendTo(liste);
        switch (id) {
            case "berry":
                $("#details" + i).click(() => {
                    // console.log(settings);
                    details.html("");
                    $.get(settings.results[i].url, requeteDetailBerry);
                    // console.log(settings.results[i]);
                });
                break;

            case "contest-type":
                $("#details" + i).click(() => {
                    // console.log(settings);
                    details.html("");
                    $.get(settings.results[i].url, requeteDetailContestType);
                    // console.log(settings.results[i]);
                });
                break;

            case "encounter-method":
                $("#details" + i).click(() => {
                    // console.log(settings);
                    details.html("");
                    $.get(settings.results[i].url, requeteDetailEncounters);
                    console.log(settings.results);
                });
                break
        }
    }
}

//Ma seconde callBack
function requeteDetailBerry(settings) {
    // console.log(settings);
    // console.log(settings.firmness.name);
    liste.html("");
    $("<h3>Name :" + settings.name + "</h3><br><p>taste :" + settings.firmness.name + "</p><p>Read more : " + settings.firmness.url + "</p>").appendTo(liste);
}

//Ma troisième callBack
function requeteDetailContestType(settings) {
    console.log(settings);
    liste.html("");
    $("<h3>" + settings.name + "</h3><br><p>Il s'agit de la statistique : " + settings.names[0].name + "</p>").appendTo(liste);
}

function requeteDetailEncounters(settings) {
    console.log(settings);
    liste.html("");
    $("<h3>" + settings.name + "</h3><br><p>On les rencontre dans : " + settings.names[1].name + "</p>").appendTo(liste);
}

$(".menu button").click(e => {
    liste.html("");
    $.get("https://pokeapi.co/api/v2/" + e.target.id, s => requeteListe(s, e.target.id));
});