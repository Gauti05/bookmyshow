const nodemailer = require('nodemailer')



const sendEmail = (emails,subject,html)=>{

const emailIds = emails.join(" ,")

let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"gautamrawat52002@gmail.com",
        pass:"zebrnfrulsbyjcke"
    }
})

let mailDetails = {
    from : "gautamrawat52002@gmail.com",
   to: emailIds,
   subject:subject,
   html:html

}

transporter.sendMail(mailDetails, (err,data) =>{
    if(err){
        console.log("unable to send email", err)
    }
    else{
        console.log(`email sent succesfully to ${emailIds}`)
    }
})

}

module.exports = sendEmail;




// const nodemailer = require("nodemailer");



// const sendEmail = (emails,subject,html)=>{

//     const emailIds = emails.join(" ,");

//     let transporter = nodemailer.createTransport({
//         service:'gmail',
//         auth:{
//             user:"utkarsh.malik_1@scaler.com",
//             pass:"psuyqcmoakrmfzpe"
//         }
//     });

//     let mailDetails = {
//         from:"utkarsh.malik_1@scaler.com",
//         to:emailIds,
//         subject:subject,
//         html:html
//     }

//     transporter.sendMail(mailDetails,(err,data)=>{

//         if(err){
//             console.log("Unable to send email",err);
//         }
//         else{
//             console.log(`Email sent sucessfully to${emailIds}`);   
//         }
//     })


// }
