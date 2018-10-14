// Initialize Firebase

//const data = require('./Contacts.json');
//var firebase = require('firebase');
//const admin = require('firebase-admin');

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

function queryDB() {
    let sVar = 'camera-op';
//    contactRef = 'Aaron_Alexis';
//    const query = collRef.where('Group Membership', 'array-contains', sVar);
//    const query = collRef.where('name', '==', contactRef);        // this works
    const query = collRef.where('oContact.Group Membership', 'array-contains', sVar);
    query.get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            console.log(doc.id, doc.data());
        });
    })
    .catch (err => {
        console.log ("Get error " + err);
    });
}

//importNames();
//console.log("Done");

var arrayUnique = function (arr) {
    return arr.filter(function(item, index){
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
                //            console.log (docTitle);
                if (docTitle === "Given Name") {
                    givenName = nestedContent[docTitle];
//                    console.log("GN: ", nestedContent[docTitle]);
                } else if (docTitle === "Family Name") {
                    // create the contact document
//                    console.log("FN: ", nestedContent[docTitle]);
                    contactRef = givenName + '_' + nestedContent[docTitle];
                    collRef.doc(contactRef).set({
                        name: contactRef
                    });
                }
                else if (docTitle === "Group Membership") {
                    let asFirstSplit = [];
                    let asSecondSplit = [];
                    let sValue = nestedContent[docTitle];
                    asFirstSplit = sValue.split (' ::: ');
                    for (let i = 0; i < asFirstSplit.length; i++) {
//                        let asTemp = asFirstSplit[i].split ('_');
                        asSecondSplit = asSecondSplit.concat (asFirstSplit[i].split ('_'));
//                        asSecondSplit.push (asFirstSplit[i].split ('_'));
                    }
                    let asTemp = arrayUnique (asSecondSplit);
                    oContact[docTitle] = arrayUnique(asSecondSplit);
                } else {
                    let value = nestedContent[docTitle];
                    //get rid of %, and the comma after thousands
                    value = value.toString().replace(/[%,]/g, '');
                    //all the values are numbers, so the following is OK
                    if ((contactRef != "") && (nestedContent[docTitle] != "")) {
                        oContact[docTitle] = value;
//                        collRef.doc(contactRef).update({
//                            [docTitle]: value
//                            [docTitle]: nestedContent[docTitle]
//                        }).then(function () {
                            // wait
//                        });
                    }
                }
            });
        }
        // now put them into the databse
        collRef.doc(contactRef).update ({
            oContact
        });
    });
    return;
}