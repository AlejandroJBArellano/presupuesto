const form = document.getElementById("form");
form.children[2].addEventListener("click", e => {
    form.action = "/moreMoney"
})
form.children[form.children.length-1].addEventListener("click", e => {
    form.action = "/lessMoney"
})