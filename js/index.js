let liste = $("#liste");
let details = $(".details");

//Evènement click permettant d'afficher les listes des baies, encounters, evolutions, generations, objets, lieux, machines, attaques et évidemment les pokemons
$(".menu button").click(e => {
    liste.html("");
    $.get("https://pokeapi.co/api/v2/" + e.target.id, s => requeteListe(s, e.target.id));
});


//ma 1ère callBack
function requeteListe(settings, id) {
    for (let i in settings.results) {
        $("<button class='details' id='details" + i + "'>" + settings.results[i].name + "</button><br>").appendTo(liste);
        switch (id) {
            case "berry":
                $("#details" + i).click(() => {
                    details.html("");
                    $.get(settings.results[i].url, requeteDetailBerry);
                });
                break;

            case "contest-type":
                $("#details" + i).click(() => {
                    details.html("");
                    $.get(settings.results[i].url, requeteDetailContestType);
                });
                break;

            case "encounter-method":
                $("#details" + i).click(() => {
                    details.html("");
                    $.get(settings.results[i].url, requeteDetailEncounters);
                });
                break
        }
    }
}

//Ma 2ème callBack
function requeteDetailBerry(settings) {
    for (let b in settings) {
        liste.html("");
        $("<h3>Name :" + settings.name + "</h3><br><p>Firmness :" + settings.firmness.name + "</p><p>Item : " + settings.item.name + "</p>").appendTo(liste);
        console.log(settings);
    }
}

//Ma 3ème callBack
function requeteDetailContestType(settings) {
    liste.html("");
    $("<h3>" + settings.name + "</h3><br><p>Il s'agit de la statistique : " + settings.names[0].name + "</p>").appendTo(liste);
}

//Ma 4ème callBack
function requeteDetailEncounters(settings) {
    liste.html("");
    $("<h3>" + settings.name + "</h3><br><p>On les rencontre dans : " + settings.names[1].name + "</p>").appendTo(liste);
}

// function parse(object) {
//     JSON.parse(object);
// }