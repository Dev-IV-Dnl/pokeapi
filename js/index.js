const baseUrl = "https://pokeapi.co/api/v2/";
let liste = $("#liste");
let details = $(".details");

//Evènement click permettant d'afficher les listes des baies, encounters, evolutions, generations, objets, lieux, machines, attaques et évidemment les pokemons
$(".menu button").click(e => {
    liste.html("");
    $.get(baseUrl + e.target.id, s => requeteListe(s, e.target.id));
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
    // let parseDetails = JSON.stringify(settings);
    console.log(settings);
    liste.html("");
    // $("<h3>Name :" + settings.name + "</h3><br><p>Firmness :" + settings.firmness.name + "</p><p>Item : " + settings.item.name + "</p>").appendTo(liste);
    $("<div> Name : " + settings.name + "</div>").appendTo(liste);
    $("<div> firmness : " + settings.firmness.name + "</div>").appendTo(liste);
    // for(let f in settings.flavors) {
    //     $("<div> flavor : " + string(settings.flavors[f].flavor.name) + "</div>").appendTo(liste);
    // }
    let txtTmp = "<div> flavor : "
    for (let f = 0; f <= settings.flavors.length - 2; f++) {
        txtTmp += settings.flavors[f].flavor.name + ", ";
    }
    txtTmp += settings.flavors[4].flavor.name;
    txtTmp += "</div>"
    $(txtTmp).appendTo(liste);
    $("<div> Growth time : " + settings.growth_time + "</div>").appendTo(liste);
    $("<div> Item : " + settings.item.name + "</div>").appendTo(liste);
    $("<div> Max harvest : " + settings.max_harvest + "</div>").appendTo(liste);
    $("<div> Natural gift Power : " + settings.natural_gift_power + "</div>").appendTo(liste);

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

function string(object) {
    return JSON.stringify(object);
}