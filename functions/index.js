const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.updUser = functions.firestore
.document('user/{userId}')
.onUpdate((chg, ctx)=>{
    const userId = ctx.params.userId;

    const newUserName = chg.after.data().userName;
    const newEmail = chg.after.data().userEmail;
    const newPhone = chg.after.data().userPhone;

    admin.auth().updateUser(userId, {
        email: newEmail,
        displayName: newUserName,
        phoneNumber: newPhone
    }).then((userRec)=>{
        console.log("Utilisateur modifier!", userRec)
    }).catch(err=>{
        console.log("Erreur de la modification")
    })
})