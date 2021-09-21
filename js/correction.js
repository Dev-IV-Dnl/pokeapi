$(".menu>*").click(e=> {
    console.log(e.target.id);
    $.get("url", (data))
})