// Initialize Firebase

var config = {
    apiKey: "AIzaSyCsDh3ra7faSCJycuwelMipu-6biTdqFMM",
    authDomain: "rgb-rps.firebaseapp.com",
    databaseURL: "https://rgb-rps.firebaseio.com",
    projectId: "rgb-rps",
    storageBucket: "rgb-rps.appspot.com",
    messagingSenderId: "277284413470"
};
firebase.initializeApp(config);
const firestore = firebase.firestore();
// the next four lines stop a firebase error message
const settings = {
    timestampsInSnapshots: true
};
firestore.settings(settings);

const collRef = firestore.collection('Contacts');
var contactRef;
var aoDocs;
var aoDocsFinal;
var query;

collRef.get().then(function (snapshot) {
    $("#stats").append($("<p>")
        .html(snapshot.size + " contacts")
    );
});

query = collRef.where('oContact.GroupMembership', 'array-contains', "man");
query.get().then(snapshot => {
    $("#stats").append($("<p>")
        .html(snapshot.size + " males")
    );

});

query = collRef.where('oContact.GroupMembership', 'array-contains', "woman");
query.get().then(snapshot => {
    $("#name-list").append($("<p>")
        .html(snapshot.size + " females")
    );
});

function queryDB(tag1, tag2, tag3) {
    let bNoTags = false;
    aoDocs = [];
    aoDocsFinal = [];

    if (tag1 === 'any') {
        if (tag2 === 'any') {
            if (tag3 === 'any') {
                bNoTags = true;
            } else {
                tag1 = tag3;
            }
        } else {
            tag1 = tag2;
            tag2 = tag3;
        }
    }
    if (tag2 === 'any') {
        tag2 = tag3;
        tag3 = 'any';
    }

    if (bNoTags) {
        query = collRef;
    } else {
        // only one array-contains in a compound query  :-(
        query = collRef.where('oContact.GroupMembership', 'array-contains', tag1);
    }
    query.get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                let sArr;
                if (tag2 != 'any') {
                    //                    console.log ("T1: " + doc.data());
                    sArr = doc.data().oContact.GroupMembership;
                    if (sArr.indexOf(tag2) >= 0) {
                        aoDocs.push(doc.data());
                    }
                } else {
                    aoDocs.push(doc.data());
                }
            });
            for (let i = 0; i < aoDocs.length; i++) {
                //                console.log ("T2: " + aoDocs);
                if (tag3 != 'any') {
                    sArr = aoDocs[i].data().oContact.GroupMembership;
                    if (sArr.indexOf(tag3) >= 0) {
                        aoDocsFinal.push(aoDocs[i]);
                    }
                } else {
                    aoDocsFinal.push(aoDocs[i]);
                }
            }
            $('#name-list').empty();
            $("#stats").empty();
            if (aoDocsFinal.length > 0) {
                $("#name-list").append($('<p>')
                    .html(aoDocsFinal.length + " contacts found")
                );
                aoDocsFinal.forEach(function (value, index) {
                    if (aoDocsFinal[index].oContact != undefined && aoDocsFinal[index].oContact.GivenName != undefined) {
                        //                    console.log(aoDocsFinal[index].oContact.GivenName + " " + aoDocsFinal[index].oContact.FamilyName);
                        //                        $("#name-list").empty();
                        $("#name-list").append($('<p>')
                            .html(aoDocsFinal[index].oContact.GivenName + " " + aoDocsFinal[index].oContact.FamilyName)
                        );
                    }
                });
            } else {
                $("#name-list").append($("<p>")
                    .html("No matches")
                );
            }
        })
        .catch(err => {
            console.log("Get error " + err);
        });
}

//importNames();
//console.log("Done");

var arrayUnique = function (arr) {
    return arr.filter(function (item, index) {
        return arr.indexOf(item) >= index;
    });
};

function importNames(data) {
    var oContact = {};

    data && Object.keys(data).forEach(key => {
        const nestedContent = data[key];
        //    console.log (nestedContent);

        if (typeof nestedContent === "object") {
            contactRef = "";
            Object.keys(nestedContent).forEach(docTitle => {
                //                docTitle = docTitle.replace(/ /g, "");        // remove spaces
                //            console.log (docTitle);
                let sPropName = docTitle.replace(/ /g, '');
                if (docTitle === "Given Name") {
                    givenName = nestedContent[docTitle];
                    oContact.GivenName = givenName;
                    //                    console.log("GN: ", nestedContent[docTitle]);
                } else if (docTitle === "Family Name") {
                    // create the contact document
                    //                    console.log("FN: ", nestedContent[docTitle]);
                    contactRef = givenName + '_' + nestedContent[docTitle];
                    collRef.doc(contactRef).set({
                        name: contactRef
                    });
                    oContact.FamilyName = nestedContent[docTitle];
                } else if (docTitle === "Group Membership") {
                    let asFirstSplit = [];
                    let asSecondSplit = [];
                    let sValue = nestedContent[docTitle];
                    asFirstSplit = sValue.split(' ::: ');
                    for (let i = 0; i < asFirstSplit.length; i++) {
                        let sTemp;
                        //                        let asTemp = asFirstSplit[i].split ('_');
                        // look for .locn and add "intl" if it's not _USA
                        if (asFirstSplit[i].indexOf(".loc_U") < 0) {
                            sTemp = asFirstSplit[i].replace(".loc", "intl");
                        }
                        else {
                            sTemp = asFirstSplit[i];
                        }
//                        asSecondSplit = asSecondSplit.concat(asFirstSplit[i].split('_'));
                        asSecondSplit = asSecondSplit.concat(sTemp.split('_'));
                        //                        asSecondSplit.push (asFirstSplit[i].split ('_'));
                    }
//                    let asTemp = arrayUnique(asSecondSplit);
                    oContact[sPropName] = arrayUnique(asSecondSplit);
                } else {
                    let value = nestedContent[docTitle];
                    //get rid of %, and the comma after thousands
                    value = value.toString().replace(/[%,]/g, '');
                    //                    value = value.replace(/[%,]/g, '');
                    //all the values are numbers, so the following is OK
                    if ((contactRef != "") && (nestedContent[docTitle] != "")) {
                        oContact[sPropName] = value; // remove spaces
                        //                        collRef.doc(contactRef).update({
                        //                            [docTitle]: value
                        //                            [docTitle]: nestedContent[docTitle]
                        //                        }).then(function () {
                        // wait
                        //                        });
                    }
                }
            });
            // now put it into the databse
            if (contactRef != "") { // don't know how it is "", but at the end of the file ...
                collRef.doc(contactRef).set({
                    oContact
                });
            }
        }
    });
    return;
}