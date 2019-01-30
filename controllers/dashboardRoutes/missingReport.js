const MissingReportModal = require('../../dataModule/missingReportModal');

function getMissingData(req, res) {
  console.log(req.body);
  const {
    email,
    missingname,
    date,
    description,
    name,
    select,
    userDataId,
  } = req.body;
  const saveOBJ = {
    email,
    description,
    name,
    missingname,
    date,
    country: select,
    userDataId,
  };
  try {
    const missingReport = new MissingReportModal(saveOBJ);
    missingReport
      .save()
      .then((success) => {
        if (success !== null) {
          console.log('object Saved successfully: ', success);
          res.status(200).json({
            status: true,
            message: 'successfully send',
          });
        } else {
          console.log('then, ran but , it has some issue', success);
        }
      })
      .catch((err) => {
        console.log('error in object saving :', err);
      });
  } catch (e) {
    console.log('network problem');
  }
}

module.exports = {
  getMissingData,
};
