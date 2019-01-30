const ComplaintModal = require('../../dataModule/complaintsModal');

function getComplaintData(req, res) {
  console.log(req.body);
  const {
    email,
    description,
    name,
    select,
    userDataId,
  } = req.body;
  const saveOBJ = {
    email,
    description,
    name,
    country: select,
    userDataId,
  };
  try {
    const complaintReport = new ComplaintModal(saveOBJ);
    complaintReport
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
  getComplaintData,
};
