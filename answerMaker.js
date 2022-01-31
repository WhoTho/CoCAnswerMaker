function copyText(text) {
    navigator.clipboard.writeText(text);
}

function clearResults() {
    try {
        var div = document.getElementById("results");

        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
        return;
    } catch (err) {
        console.log(err);
        return;
    }
}

function printResult(result) {
    var div = document.getElementById("results");
    var showAll = document.createElement("div");
    showAll.innerText = result;
    div.appendChild(showAll);
    if (document.getElementById("autoCopy").checked) {
        copyText(result);
    }
    return;
}

async function submit() {
    await clearResults();
    var language = document.getElementById("language").value;
    var codeInput = document.getElementById("code").value;
    var formattedCode = `${JSON.stringify(String.raw`${codeInput}`)
        .slice(1, -1)
        .replace(/'/g, "\\'")}`;
    printResult(`{lang: '${language}', solution: '${formattedCode}'},`);
}
