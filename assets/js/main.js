var sDept = "";
//    var sMain = "";
// USA is the default
var sLocIntl = "any";
var sLocUSA = "any";

$(document).ready(function () {

    fillUSA(); // the default

    function handleFileSelect(evt) {
        var files = evt.target.files; // FileList object
        // files is a FileList of File objects.
        for (var i = 0, f; f = files[i]; i++) {
            csvJson(files[i]);
        }
        //        queryDB();
    }

    $('#files').change(function () {
        handleFileSelect(event);
    })

    $('#tag-dept').change(function () {
        sSelectedDept = $('#tag-dept').val();
        //        alert($('#tag-dept').val());
    });

    $('#tag-main').change(function () {
        sSelectedMain = $('#tag-main').val();
        //        alert($('#tag-dept').val());
    });

    //var FCData = require ("./database.js");
    //var fcData = new FCData();

    var aoResults = [{}];

    $('#search').click(function () {
        //        sMain = $('#tag-main').val();
        sDept = $('#tag-dept').val();
        if (sLocIntl != 'any' && sLocIntl != "none") {
            sLocIntl = $('#tag-loc').val();
        } else if (sLocIntl === 'any') {
            sLocIntl = 'intl';
        }
        if (sLocUSA != 'any' && sLocUSA != 'none') {
            sLocUSA = $('#tag-loc').val();
        } else if (sLocUSA === 'any') {
            sLocUSA = 'USA'; // just search for the "USA" prefix
        }
        if (sLocIntl === 'intl') {
            sLocUSA = 'any';
        }
        aoResults = queryDB(sDept, sLocUSA, sLocIntl); // shows the results
        //        console.log(aoResults);
    });

    $('.names').on('click', (function () {
        const id = event.target.id;
        const sPhone = aoResults[id].oContact['Phone1-Value'];
        getContact(sPhone).then(function (resolve, reject) {
            if (resolve.status == 404) {
                var sorry = document.createElement("p");
                sorry.textContent = 'Sorry.  No image.';
                document.getElementById(id).appendChild(sorry);
            } else {
                var img = document.createElement("img");
                img.src = resolve.avatar;
                img.id = "picture";
                img.width = '150';
                document.getElementById(id).appendChild(img);
                $('#picture').attr("style", "display:block");
            }
            var phone = document.createElement("p");
            phone.textContent = sPhone;
            document.getElementById(id).appendChild(phone);

        });
    }));

    $("#locUSA").click(function () {
        fillUSA();
        sLocUSA = 'any';
        sLocIntl = 'none';
    });

    $("#locIntl").click(function () {
        $("#tag-loc").empty();
        for (let i = 0; i < aTagsLocIntl.length; i++) {
            $("#tag-loc").append($("<option>")
                .val(aTagsLocIntl[i][0])
                .html(aTagsLocIntl[i][1] === '' ? aTagsLocIntl[i][0] : aTagsLocIntl[i][1])
            );
        }
        sLocIntl = 'any';
        sLocUSA = 'none';
    });


    //    document.getElementById('files').addEventListener('change', handleFileSelect, false);

    let aTagsMain = [
        ['.pp', 'Prodigium'],
        ['.coc', 'Cinema of Change'],
        ['.dis', "Don't know"],
        ['.ethn', 'Ethnicity'],
        ['.gender', 'gender'],
        ['.intellectual', 'intellectual'],
        ['.id', 'ideology'],
        ['.lang', 'Language spoken'],
        ['.loc', 'Location'],
        ['.net', 'Shared network'],
        ['..team', 'Prodigium worker'],
        ['.research', 'Researcher'],
        ['.sport', 'Sports pro']
    ];
    let aTagsDept = [
        ['any', 'any'],
        ['c', 'cinematography'],
        ['o', 'costume'],
        ['d', 'directorial'],
        ['e', 'editorial'],
        ['fx', 'physical effects'],
        ['m', 'makeup'],
        ['o', 'outfitting'],
        ['p', 'producing'],
        ['pd', 'production design'],
        ['w', 'writing']
    ];
    let aTagsLocIntl = [
        ['any', 'any'],
        ['Asia', ''],
        ['Australia', ''],
        ['Austria', ''],
        ['Brazil', ''],
        ['CANADA', 'Canada'],
        ['Canada_Ontario', ''],
        ['China', ''],
        ['europe', 'Europe'],
        ['France', ''],
        ['Georgia', ''],
        ['Germany', ''],
        ['hawaii', 'Hawaii'],
        ['India', ''],
        ['Israel', ''],
        ['Italy', ''],
        ['Japan', ''],
        ['Mexico', ''],
        ['Morocco', ''],
        ['Netherlands', ''],
        ['New-Zealand', 'New Zealand'],
        ['Nicaragua', ''],
        ['prague', 'Prague'],
        ['Quatar', ''],
        ['Quatar', ''],
        ['Russia', ''],
        ['Senegal', ''],
        ['Singapore', ''],
        ['South-Africa', 'South Africa'],
        ['Spain', ''],
        ['Sweden', ''],
        ['Turkey', ''],
        ['UK', ''],
        ['UK_London', "UK - London"],
        ['Zimbabwe', '']
    ];

    function fillUSA() {
        let aTagsLocUSA = [
            ['any', 'any'],
            ['ATL', 'Atlanta'],
            ['Atlanta', ''],
            ['austin', 'Austin'],
            ['chicago', 'Chicago'],
            ['Colorado', 'Colorado'],
            ['Colorado', ''],
            ['Dc', 'Washington DC'],
            ['Denver', ''],
            ['east-coast', 'East Coast'],
            ['eastcoast', 'East Coast'],
            ['eastcoast', 'East Coast'],
            ['FL', 'Florida'],
            ['houston', 'Houston'],
            ['las_vegas', 'Las Vegas'],
            ['LA', 'Los Angeles'],
            ['miami', 'Miami'],
            ['Midwest', 'MidWest'],
            ['midwest', 'MidWest'],
            ['minnesota', 'Minnesota'],
            ['Missouri', 'Missouri'],
            ['Nashville', 'Nashville'],
            ['Nebraska', 'Nebraska'],
            ['new_england', 'New England'],
            ['New_Mexico', 'New Mexico'],
            ['NYC', 'New York City'],
            ['Philadelphia', 'Philadelphia'],
            ['portland', 'Portland'],
            ['Seattle', ''],
            ['seattle', 'Seattle'],
            ['SF', 'San Francisco'],
            ['Utah', ''],
        ];

        $("#tag-loc").empty();
        for (let i = 0; i < aTagsLocUSA.length; i++) {
            $("#tag-loc").append($("<option>")
                .val(aTagsLocUSA[i][0])
                .html(aTagsLocUSA[i][1] === '' ? aTagsLocUSA[i][0] : aTagsLocUSA[i][1])
            );
        }
    }

    for (let i = 0; i < aTagsDept.length; i++) {
        $("#tag-dept").append($("<option>")
            .val(aTagsDept[i][0])
            .html(aTagsDept[i][1] === '' ? aTagsDept[i][0] : aTagsDept[i][1])
        );
    }
    // for (let i = 0; i < aTagsMain.length; i++) {
    //     $("#tag-main").append($("<option>")
    //         .val(aTagsMain[i][0])
    //         .html(aTagsMain[i][1] === '' ? aoTagsMain[i][0] : aoTagsMain[i][1])
    //     );
    // }

});