console.log("js is connected");

// 1. Find the elements on the page
const button = document.getElementById("analyze");
const goalDropdown = document.getElementById("goal");
const timeDropdown = document.getElementById("time");
const importanceDropdown = document.getElementById("importance");
const strengthsBox = document.getElementById("strengths");
const weaknessesBox = document.getElementById("weaknesses");
const opportunitiesBox = document.getElementById("opportunities");
const threatsBox = document.getElementById("threats");

// 2. The function: text in, clean list out
function parseItems(text) {
    const lines = text.split("\n");
    const cleaned = lines.filter(function (line) {
        return line;
    });
    return cleaned;
}

// 3. Run this every time Analyze is clicked
button.addEventListener("click", function () {
    console.log("Goal:", goalDropdown.value);
    console.log("Time:", timeDropdown.value);
    console.log("Importance:", importanceDropdown.value);

    const strengths = parseItems(strengthsBox.value);
    const weaknesses = parseItems(weaknessesBox.value);
    const opportunities = parseItems(opportunitiesBox.value);
    const threats = parseItems(threatsBox.value);

    console.log("Strengths:", strengths);
    console.log("Weaknesses:", weaknesses);
    console.log("Opportunities:", opportunities);
    console.log("Threats:", threats);
});