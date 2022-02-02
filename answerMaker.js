function copyText(text) {
    navigator.clipboard.writeText(text);
}

function printResult(result) {
    document.getElementById("resultText").innerText = result;
    if (document.getElementById("autoCopy").checked) {
        copyText(result);
    }
    return;
}

async function submit() {
    var language = document.getElementById("language").value;
    var codeInput = document.getElementById("code").value;
    var formattedCode;
    if (document.getElementById("format").checked) {
        formattedCode = `${JSON.stringify(String.raw`${codeInput}`)
            .slice(1, -1)
            .replace(/'/g, "\\'")}`;
    } else {
        formattedCode = codeInput.replace(/(?<!\\)'/g, "\\'");
    }
    printResult(`{lang: '${language}', solution: '${formattedCode}'},`);
}
