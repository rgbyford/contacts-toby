//var fetch = require('node-fetch');

var apiKey = "hcyo5tkTZ3DscDXQurTlBlpUrTMhUpv1";

function getContact(sPhone) {
    return (new Promise(function (resolve, reject) {
        fetch('https://api.fullcontact.com/v3/person.enrich', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "text/plain charset=utf-8"
            },
            body: JSON.stringify({
                //            only phone and e-mail will work - fullName does not
                "phone": sPhone
                // is fairly flexible I know that 1xxxyyyzzzz works, as does xxx-yyy-zzzz
                //            "email": "rgbyford@gmail.com"
            })
        }).then(res => res.json()).catch(err => console.log("E1: " + err)).then(data => {
//            console.log(data);
            resolve (data); // returns a promise with "data" as the "resolve"
        }).catch(err => console.log('E2: ' + err));
    }));
};

function addInfo() {
    fetch('https://api.fullcontact.com/v3/person.enrich', {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            // one to identify the contact, others to update
            "phone": "14128897490",
            "age": "65"
        })
    }).then(function (res) {
        return res.json();
    }).then(function (json) {
        console.log(json);
    });
}
//}
const clientId = 'FybJxut2EtRKshZJOAnABTOP76Mohn0Z';
const clientSecret = 'gy96gJfYWJquzF5V9sbtwoo4hH0h1CTL';
const redirectUri = 'http://localhost';

// var fullcontact = require('contacts-api-node')({
//     clientId: clientId,
//     clientSecret: clientSecret,
//     redirectUri: redirectUri,
//     scope: 'contacts.read, tags.read',
//     userAgent: 'RogerTest2'
// });

// console.log("FC oauth: " + fullcontact.oauth);
// console.log('AT: ' + fullcontact.oauth.urls.accessToken);
// var accessTkn = fullcontact.oauth.urls.accessToken;

// //testFunc();

// async function testFunc() {
//     // var realToken = await fetch(accessTkn).then(function (res) {
//     //     res.text().then(function (res2) {
//     //         console.log('R2: ' + res2);
//     //     });
//     // });

//     console.log('accessTkn: ', accessTkn);
//     const res = await fullcontact.contacts.contacts.search(accessTkn, {
//         query: "firstName: Roger"
//     }).then(function (res) {
//         console.log('Search result: ' + res);
//     }).catch(function (err) {
//         console.log('Search error: ' + err);
//     });
// }

//console.log ('Test: ' + test);

// fullcontact.contacts.account.get(accessToken)
// 	.then(res => {
// 		//2xx response
// 	})
// 	.catch(res => {
// 		//non-2xx response
//     });

// async function firstOAuth() {
//     var fetched = await fetch('https://app.fullcontact.com/oauth/authorize', {
//         method: 'POST',
//         headers: {
//             'clientId': clientId,
//             'clientSecret': clientSecret,
//             'redirectUri': redirectUri,
//             'scopes': 'contacts.read, tags.read'
//         }
//     }).then(function (res) {
//         console.log('Result: ' + res.size, res.timeout);
//         console.log ('Keys: ' + Object.keys(res));
//         console.log('Returned: ' + fetched);
//     }).catch(function (err) {
//         console.log("Error: " + err);
//     });
// }

// firstOAuth ();

//var ClientOAuth2 = require('client-oauth2');
// var thing = {};
// var code;

// auth is an access token, I believe
// var auth = new ClientOAuth2({
//     clientId: clientId,
//     clientSecret: clientSecret,
//     //  accessTokenUri: 'https://github.com/login/oauth/access_token',
//     //  authorizationUri: 'https://github.com/login/oauth/authorize',
//     redirectUri: 'http://localhost/',
//     scopes: ['contacts.read', 'tags.read']
// });


// async function getFromUri() {
//   thing = await fetch(redirectUri);
// }

// getFromUri().then(function (Response) {
// //     code = thing.Response;
//      console.log ("getFromUri");
//      console.log (Object.keys (thing));
// //     console.log (thing.body);
// });

//testContacts();

//console.log (redirectUri);

//console.log(auth);
//console.log ('Code: ' + Object.keys (auth.code));
//console.log ("CLient: ", auth.code.client);

// .then(function (res) {
//     console.log("OAuth result: ", res);
//     console.log("Oauth auth", auth);
// }).catch(function (err) {
//     console.log("OAuth error: ", err);
// });

//testContacts ();


// async function testContacts() {
//     console.log('testing');
//     const res = await fullcontact.oauth.exchangeAuthCode(code)
//         .then(function (test) {
//             //do something
//             console.log(res);
//             console.log(test);
//         }).catch(function (err) {
//             console.log('Error:' + err)
//         });
//     console.log("After then");
// }