let liste = $("#liste");
let details = $(".details");
function callBack(settings,id) {
    // console.log(id);
    // console.log(settings);
    for (let i in settings.results) {
        // console.log(settings.results[i].name);
        // $("<a class='details' href='" + settings.results[i].url + "'>" + settings.results[i].name + "</a><br>").appendTo(liste);
        $("<button class='details' id='details"+i+"'>" + settings.results[i].name + "</button><br>").appendTo(liste);
        if(id === "berry") {
            $("#details"+i).click( ()=> {
                // console.log(settings);
                details.html("");
                $.get(settings.results[i].url, callBack2);
                // console.log(settings.results[i]);
            });
        } else if(id === "contest-type") {
            $("#details"+i).click( ()=> {
                // console.log(settings);
                details.html("");
                $.get(settings.results[i].url, callBack3);
                // console.log(settings.results[i]);
            });
        }
    }
}

function callBack2(settings) {
    // console.log(settings);
    // console.log(settings.firmness.name);
    liste.html("");
    $("<h3>Name :"+settings.name+"</h3><br><p>taste :"+settings.firmness.name+"</p><p>Read more : "+settings.firmness.url+"</p>").appendTo(liste);
}

function callBack3(settings) {
    console.log(settings);
    $("<h3>"+settings.name+"</h3><br><p>Statistique principale : "+settings.names[0].name+"</p>").appendTo(liste);
}

$(".menu button").click(e => {
    
    liste.html("");
    $.get("https://pokeapi.co/api/v2/" + e.target.id, s=> callBack(s,e.target.id));
});