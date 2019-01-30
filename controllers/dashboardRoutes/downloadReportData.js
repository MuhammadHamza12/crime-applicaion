const {
  ObjectId,
} = require('mongodb').ObjectId;
const cRModal = require('../../dataModule/cRModel');
const comRModal = require('../../dataModule/complaintsModal');
const missRModal = require('../../dataModule/missingReportModal');

function downloadAllUsersComplaintReport(req, res) {
  comRModal.find().then((success) => {
    if (success !== null) {
      console.log('all missing reports are: ', success);
      res.send({
        status: true,
        data: success,
      });
    } else {
      console.log('ran in than, but with null success', success);
    }
  }).catch((err) => {
    console.log('error occur in sending data toward client!', err);
    res.send({
      status: false,
      data: err,
    });
  });
}

function downloadAllUsersMissingReport(req, res) {
  missRModal.find().then((success) => {
    if (success !== null) {
      console.log('all missing reports are: ', success);
      res.send({
        status: true,
        data: success,
      });
    } else {
      console.log('ran in than, but with null success', success);
    }
  }).catch((err) => {
    console.log('error occur in sending data toward client!', err);
    res.send({
      status: false,
      data: err,
    });
  });
}

function downloadAllUsersCrimeReports(req, res) {
  cRModal.find().then((success) => {
      if (success !== null) {
        console.log('all crime objects are: ', success);
        res.send({
          status: true,
          data: success,
        });
      } else {
        console.log('ran in success, but, getting data is null');
      }
    })
    .catch((err) => {
      res.send({
        status: false,
        err: 'error in sending data',
      });
      console.log('error occur in loading data from the server', err);
    });
}

function downloadAllComplaintReport(req, res) {
  console.log(req.body);
  const {
    userId,
  } = req.body;
  console.log('userID ', userId);
  comRModal.find({
      userDataId: ObjectId(userId),
    })
    .then((success) => {
      if (success !== null) {
        console.log('data with success', success);
        res.send({
          status: true,
          data: success,
        });
      } else {
        console.log('ran, in resolve but, it has null object', success);
      }
    })
    .catch((err) => {
      res.send({
        status: false,
        err: 'error in sending data',
      });
      console.log('error occur in sending data', err);
    });
}

function downloadAlllCrimeReport(req, res) {
  console.log(req.body);
  const {
    userId,
  } = req.body;
  console.log('userID ', userId);
  cRModal.find({
      userDataId: ObjectId(userId),
    })
    .then((success) => {
      if (success !== null) {
        console.log('data with success', success);
        res.send({
          status: true,
          data: success,
        });
      } else {
        console.log('ran, in resolve but, it has null object', success);
      }
    })
    .catch((err) => {
      res.send({
        status: true,
        err: 'error in sending data',
      });
      console.log('error occur in sending data', err);
    });
}

function downloadReportCount(req, res) {
  console.log(req.body);
  const {
    userId,
  } = req.body;
  console.log('userID ', userId);
  Promise.all([cRModal.count({
      userDataId: ObjectId(`${userId}`)
    }), comRModal.count({
      userDataId: ObjectId(`${userId}`)
    }), missRModal.count({
      userDataId: ObjectId(`${userId}`)
    })])
    .then((success) => {
      res.send({
        status: true,
        data: {
          totalcRModal: success[0],
          totalcomRModal: success[1],
          totalmissRModal: success[2],
        },
      });
    })
    .catch((err) => {
      res.send({
        status: false,
        err,
      });
    });
}

function downloadMissingReport(req, res) {
  console.log(req.body);
  const {
    userId,
  } = req.body;
  console.log('userID ', userId);
  missRModal.find({
      userDataId: ObjectId(userId),
    })
    .then((success) => {
      if (success !== null) {
        console.log('data with success', success);
        res.send({
          status: true,
          data: success,
        });
      } else {
        console.log('ran, in resolve but, it has null object', success);
      }
    })
    .catch((err) => {
      res.send({
        status: true,
        err: 'error in sending data',
      });
      console.log('error occur in sending data', err);
    });
}
module.exports = {
  downloadAlllCrimeReport,
  downloadReportCount,
  downloadMissingReport,
  downloadAllComplaintReport,
  downloadAllUsersCrimeReports,
  downloadAllUsersMissingReport,
  downloadAllUsersComplaintReport,
};