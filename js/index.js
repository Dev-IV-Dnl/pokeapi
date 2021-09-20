let liste = $("#liste")

$(".menu button").click((e) =>{
    console.log("click");
    liste.html("");
    $.get("https://pokeapi.co/api/v2/" + e.target.id, callBack)
});
function callBack(settings) {
    console.log(settings);
    for(let i = 0; i < settings.results.length; i++) {
        console.log(settings.results[i].name);
        $("<a href='"+settings.results[i].url+"'>"+settings.results[i].name+"</a><br>").appendTo(liste);
    }
}