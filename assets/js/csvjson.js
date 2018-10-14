//require('papaparse');

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
    //    for (var i = 0; i < csvFiles.length; i++) {
    //        Papa.parse(csvFiles[i].file, {
    Papa.parse(file, myConfig);
    //         {
    //            complete: function (results) {
    //                console.log("Finished:", results.data);
    //            }
    //        });
    //    }
}

function CJDone(results, file) {
    importNames (results.data);
//    console.log("Finished:", results.data);
}