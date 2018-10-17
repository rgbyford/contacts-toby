//var file = File.createFromFileName("path/to/some/file");

//var csvFiles = document.querySelectorAll(".csv");

var myConfig = {
    delimiter: "", // auto-detect
    newline: "", // auto-detect
    quoteChar: '"',
    escapeChar: '"',
    header: true,
    trimHeaders: false,
    dynamicTyping: false,
    preview: 0,
    encoding: "",
    worker: false,
    comments: false,
    step: undefined,
    complete: CJDone,
    error: undefined,
    download: false,
    skipEmptyLines: false,
    chunk: undefined,
    fastMode: undefined,
    beforeFirstChunk: undefined,
    withCredentials: undefined,
    transform: undefined
};

function csvJson(file) {
    Papa.parse(file, myConfig);
}

function CJDone(results, file) {
    importNames (results.data);
}