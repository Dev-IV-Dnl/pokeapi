const baseUrl = "https://pokeapi.co/api/v2/";
let liste = $("#liste");
let details = $("#details");

//Evènement click permettant d'afficher les listes des baies, encounters, evolutions, generations, objets, lieux, machines, attaques et évidemment les pokemons
$(".menu button").click(e => {
    liste.html("");
    requeteListe(baseUrl + e.target.id, e.target.id);
    //   $.get(baseUrl + e.target.id, s => requeteListe(s, e.target.id));
});


//ma 1ère callBack
function requeteListe(url, id) {
    $.get(url, settings => {
        details.html("");
        let monOffset = new URL(url).searchParams.get("offset") || 0;
        console.log(monOffset, url, settings);
        for (let i in settings.results) {
            if (settings.results[i].name === undefined) {
                $("<button class='details' id='details" + i + "'>" + (+i + (+monOffset) + 1) + "</button><br>").appendTo(liste);
            } else {
                $("<button class='details' id='details" + i + "'>" + (+i + (+monOffset) + 1) + " : " + settings.results[i].name + "</button><br>").appendTo(liste);
            }

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
                    break;

                case "evolution-chain":
                    $("#details" + i).click(() => {
                        details.html("");
                        $.get(settings.results[i].url, requeteDetailEvolutions);
                    });
                    break;

                case "generation":
                    $("#details" + i).click(() => {
                        details.html("");
                        $.get(settings.results[i].url, requeteDetailGenerations);
                    });
                    break;
            }
        }
        if (settings.next !== null) {
            $("<button id='next'>Page suivante</button><br>").appendTo(liste);
            $("#next").click(() => {
                liste.html("");
                let monUrlSuivante = new URL(settings.next);
                monUrlSuivante.searchParams.set("limit", 20);
                requeteListe(monUrlSuivante.toString(), id);
            });
        }
        if (settings.previous !== null) {
            $("<button id='previous'>Page précédente</button><br>").appendTo(liste);
            $("#previous").click(() => {
                liste.html("");
                let monUrlPrecedente = new URL(settings.previous);
                monUrlPrecedente.searchParams.set("limit", 20);
                requeteListe(monUrlPrecedente.toString(), id);
            });
        }
    })
}

//Ma Berry callBack
function requeteDetailBerry(settings) {
    console.log(settings);
    liste.html("");
    $("<div> Name : " + settings.name + "</div>").appendTo(details);
    $("<div> firmness : " + settings.firmness.name + "</div>").appendTo(details);
    let txtTmp = "<div> flavor : ";
    for (let f = 0; f <= settings.flavors.length - 2; f++) {
        txtTmp += settings.flavors[f].flavor.name + ", ";
    }
    txtTmp += settings.flavors[4].flavor.name;
    txtTmp += "</div>"
    $(txtTmp).appendTo(details);
    $("<div> Growth time : " + settings.growth_time + "</div>").appendTo(details);
    $("<div> Item : " + settings.item.name + "</div>").appendTo(details);
    $("<div> Max harvest : " + settings.max_harvest + "</div>").appendTo(details);
    $("<div> Natural gift Power : " + settings.natural_gift_power + "</div>").appendTo(details);
    $("<div> Natural gift type : " + settings.natural_gift_type.name + "</div>").appendTo(details);
    $("<div> Size : " + settings.size + "</div>").appendTo(details);
    $("<div> Smoothness : " + settings.smoothness + "</div>").appendTo(details);
    $("<div> Soil dryness : " + settings.soil_dryness + "</div>").appendTo(details);
}

//Ma Contest-type callBack
function requeteDetailContestType(settings) {
    console.log(settings);
    liste.html("");
    $("<h3>" + settings.name + "</h3><br><p>Il s'agit de la statistique : " + settings.names[0].name + "</p>").appendTo(details);
}

//Ma Encounters callBack
function requeteDetailEncounters(settings) {
    console.log(settings);
    liste.html("");
    $("<h3>" + settings.name + "</h3><br><p>On les rencontre dans : " + settings.names[1].name + "</p>").appendTo(details);
}

//Ma Evolutions callBack
function requeteDetailEvolutions(settings) {
    console.log(settings);
    liste.html("");
    $("<h3>" + settings.chain.species.name + "</h3><br><p>Evolue en : " + settings.chain.evolves_to[0].species.name + "</p>").appendTo(details);
}

//Ma Generations callBack
function requeteDetailGenerations(settings) {
    console.log(settings);
    liste.html("");
    $("<h3>" + settings.chain.species.name + "</h3><br><p>Evolue en : " + settings.chain.evolves_to[0].species.name + "</p>").appendTo(details);
}

function string(object) {
    return JSON.stringify(object);
}