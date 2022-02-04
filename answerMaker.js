var autoCopy, autoFormat, autoClear, removeComments, removeWhitespaces, autoDetectLanguage, multipleAnswers;

function copyText(text) {
    navigator.clipboard.writeText(text);
}

function printResults(results) {
    document.getElementById("resultText").innerText = results.join("</br>");
    if (autoCopy) {
        copyText(results.join("\n"));
    }
    return;
}

function setOptionVaribles() {
    var options = [
        "autoCopy",
        "autoFormat",
        "autoClear",
        "removeComments",
        "removeWhitespaces",
        "autoDetectLanguage",
        "multipleAnswers",
    ];
    options.forEach((v) => {
        window[v] = document.getElementById(v).checked;
    });
    return;
}

function detectLanguage(text) {
    var python = text.includes("input") + text.includes("open(0)");
    var ruby = text.includes("gets") + text.includes("`dd`") + text.includes("*$<");
    if (python > 0 && ruby == 0) return "Python";
    if (ruby > 0 && python == 0) return "Ruby";
    alert("Unknown language");
    return "Unknown";
}

async function submit() {
    setOptionVaribles();

    var language = document.getElementById("language").value;
    var codeInput = document.getElementById("code").value;

    if (!autoFormat && multipleAnswers) {
        alert("You cannot have formating off with multiple answers");
        return;
    }

    var answerList = [];
    var languageList = [];

    if (autoFormat) {
        var formattedCode = `${JSON.stringify(String.raw`${codeInput}`)
            .slice(1, -1)
            .replace(/'/g, "\\'")}`;
        if (removeComments) {
            formattedCode = formattedCode.replace(/\\n# /g, "\\n");
        }
        if (multipleAnswers) {
            var formattedSplit = formattedCode.split("\\n\\n");
            formattedSplit.forEach((code) => {
                var lang = detectLanguage(code);
                if (lang === "Python" && removeWhitespaces) code = code.replace(/    /g, " ");
                answerList.push(code.replace(/(\\n)*$/, ""));
                languageList.push(lang);
            });
        } else {
            var lang = detectLanguage(formattedCode);
            if (lang === "Python" && removeWhitespaces) formattedCode = formattedCode.replace(/    /g, " ");
            answerList.push(formattedCode);
            languageList.push(lang);
        }
    } else {
        answerList.push(codeInput.replace(/(?<!\\)'/g, "\\'"));
        languageList.push(detectLanguage(codeInput));
    }

    //`{lang: '${language}', solution: '${formattedCode}'},`
    var finalList = [];
    answerList.forEach((ans, i) => {
        finalList.push(`{lang: '${languageList[i]}', solution: '${ans}'},`);
    });
    printResults(finalList);

    if (autoClear) document.getElementById("code").value = "";
}
