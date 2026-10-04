console.log("js is connected");

const button = document.getElementById("analyze");
const goalDropdown = document.getElementById("goal");
const timeDropdown = document.getElementById("time");
const importanceDropdown = document.getElementById("importance");
const strengthsBox = document.getElementById("strengths");
const weaknessesBox = document.getElementById("weaknesses");
const opportunitiesBox = document.getElementById("opportunities");
const threatsBox = document.getElementById("threats");

function parseItems(text) {
    const lines = text.split("\n");

    const cleaned = lines.filter(function (line) {
        return line.trim();
    });

    const items = cleaned.map(function (line) {
        const parts = line.split("/");
        const itemText = parts[0].trim();
        let itemScore = 3;
        if (parts[1]) {
            itemScore = Number(parts[1].trim());
        }
        return { text: itemText, score: itemScore };
    });

    return items;
}

function makePairs(strengths, opportunities) {
    const pairs = [];

    for (const s of strengths) {
        for (const o of opportunities) {
            pairs.push({
                strength: s.text,
                opportunity: o.text,
                score: s.score * o.score
            });
        }
    }

    return pairs;
}
function makeRiskPairs(weaknesses, threats) {
    const pairs = [];

    for (const w of weaknesses) {
        for (const t of threats) {
            pairs.push({
                weakness: w.text,
                threat: t.text,
                score: w.score * t.score
            });
        }
    }

    return pairs;
}

function sortByScore(list) {
    list.sort(function (a, b) {
        return b.score - a.score;
    });
    return list;
}


function getLimit(time) {
    if (time === "short") {
        return 2;
    } else if (time === "medium") {
        return 4;
    } else {
        return 6;
    }
}
function showResults(top, goal) {
    const resultsBox = document.getElementById("results");
    resultsBox.textContent = "";

    if (top.length === 0) {
        resultsBox.textContent = "Add items to both boxes first, then click Analyze.";
        return;
    }

    const list = document.createElement("ol");

    for (const item of top) {
        const li = document.createElement("li");

        if (goal === "output") {
            li.textContent = "Use " + item.strength + " to capture " + item.opportunity + " (score " + item.score + ")";
        } else {
            li.textContent = "Work on " + item.weakness + " to defend against " + item.threat + " (score " + item.score + ")";
        }

        list.appendChild(li);
    }

    resultsBox.appendChild(list);
}


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

       const limit = getLimit(timeDropdown.value);
    let top;

    if (goalDropdown.value === "output") {
        const pairs = makePairs(strengths, opportunities);
        top = sortByScore(pairs).slice(0, limit);
    } else {
        const pairs = makeRiskPairs(weaknesses, threats);
        top = sortByScore(pairs).slice(0, limit);
    }

    console.log("Top pairs:", top);
        showResults(top, goalDropdown.value);
});
