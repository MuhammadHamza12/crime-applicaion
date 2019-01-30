// @ts-check
const nodemailer = require('nodemailer');
const cRModal = require('../../dataModule/cRModel');
const comRModal = require('../../dataModule/complaintsModal');
const missRModal = require('../../dataModule/missingReportModal');
const config = require('../../config');

function setComplaintReportStatus(req, res) {
  console.log(req.body);
  const {
    id,
    complaintStatus,
    emailtext,
    email,
  } = req.body;
  const searchId = {
    _id: id,
  };
  try {
    comRModal.findOneAndUpdate(searchId, {
      $set: {
        adminStatus: complaintStatus,
      },
    }, {
      new: true,
    }).then((success) => {
      if (success !== null) {
        console.log('successfully change object', success);

        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: config.accountID, // generated ethereal user
            pass: config.accountpass, // generated ethereal password
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        // setup email data with unicode symbols
        let mailOptions = {
          from: '"CrimeApp " <test@crimeApp.com>', // sender address
          to: `${email}`, // list of receivers
          subject: 'Admin Confirmation', // Subject line
          text: 'CrimeReporter', // plain text body
          html: `<b>Report Confimation </b> ${emailtext}} `, // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });

        res.status(200).json({
          message: 'we just send an email to you with a link to reset your password',
        });
      } else {
        console.log('might be null: ', success);
      }
    }).catch((err) => {
      console.log('error in updating status', err)
    });

  } catch (e) {
    console.log('network error');
    res.send({
      status: false,
      message: 'network error',
    });
  }
}

function setMissingReportStatus(req, res) {
  console.log('body data: ', req.body);
  const {
    email,
    id,
    MissingStatus,
    emailtext,
  } = req.body;
  const searchId = {
    _id: id,
  };
  try {
    missRModal.findOneAndUpdate(searchId, {
      $set: {
        adminStatus: MissingStatus,
      },
    }, {
      new: true,
    }).then((success) => {
      if (success !== null) {
        console.log('successfully change object', success);

        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: config.accountID, // generated ethereal user
            pass: config.accountpass, // generated ethereal password
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        // setup email data with unicode symbols
        let mailOptions = {
          from: '"CrimeApp " <test@crimeApp.com>', // sender address
          to: `${email}`, // list of receivers
          subject: 'Admin Confirmation', // Subject line
          text: 'CrimeReporter', // plain text body
          html: `<b>Report Confimation </b> ${emailtext}} `, // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });

        res.status(200).json({
          message: 'we just send an email to you with a link to reset your password',
        });
      } else {
        console.log('might be null: ', success);
      }
    }).catch((err) => {
      console.log('error in updating status', err)
    });

  } catch (e) {
    console.log('network error');
    res.send({
      status: false,
      message: 'network error',
    });
  }
}

function setCrimeReportStatus(req, res) {
  console.log(req.body);
  const {
    email,
    id,
    crimeStatus,
    emailtext,
  } = req.body;
  console.log('emailtext: ', emailtext);
  const searchId = {
    _id: id,
  };
  try {
    cRModal.findOneAndUpdate(searchId, {
      $set: {
        adminStatus: crimeStatus,
      },
    }, {
      new: true,
    }).then((success) => {
      if (success !== null) {
        console.log('successfully change object', success);

        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: config.accountID, // generated ethereal user
            pass: config.accountpass, // generated ethereal password
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        // setup email data with unicode symbols
        let mailOptions = {
          from: '"CrimeApp " <test@crimeApp.com>', // sender address
          to: `${email}`, // list of receivers
          subject: 'Admin Confirmation', // Subject line
          text: 'CrimeReporter', // plain text body
          html: `<b>Report Confimation </b> ${emailtext}. `, // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });

        res.status(200).json({
          message: 'we just send an email to you with a link to reset your password',
        });
      } else {
        console.log('might be null: ', success);
      }
    }).catch((err) => {
      console.log('error in updating status', err)
    });
  } catch (e) {
    console.log('network error');
    res.send({
      status: false,
      message: 'network error',
    });
  }
}

module.exports = {
  setCrimeReportStatus,
  setMissingReportStatus,
  setComplaintReportStatus,
};