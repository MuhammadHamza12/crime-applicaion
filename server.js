const express = require('express');
const debug = require('debug')('server');
const path = require('path');
const chalk = require('chalk');
const CORS = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config');
const authentication = require('./controllers/tokenCheck');
const forgetPass = require('./controllers/forgetpass/forgetpass');

const PORT = process.env.PORT || 8080;
const app = express();
const user = require('./controllers/routes/users');
const loginuserRoute = require('./controllers/routes/loginRoute');
const checkTokenStatus = require('./controllers/statusTokenCheck');
const middleware = require('./controllers/middleware');
const crimeData = require('./controllers/dashboardRoutes/crimeReport');
const complaintReq = require('./controllers/dashboardRoutes/complaints');
const missingReportReq = require('./controllers/dashboardRoutes/missingReport');
const downloadReportCount = require('./controllers/dashboardRoutes/downloadReportData');
const setReportsStatus = require('./controllers/Admin-Routes/setStatusController');
const Auth = require('./controllers/routes/auth-routes');
const pushNotification = require('./controllers/pushnotification/statusNotification');


require('./dbconnection');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(CORS('*'));

app.use(express.static(path.join(__dirname, '/static')));
app.use('/auth', Auth);
app.use('/api/checkToken', authentication, checkTokenStatus.checkTokenStatus);
app.post('/api/resetToken', middleware, forgetPass.checkResetToken);
app.post('/api/forgetPass', forgetPass.userValidAuthentication);
app.post('/api/paswrdreset', forgetPass.saveUpdateUserObject);
app.post('/api/sendcrimeData', crimeData.getCrimeData);
app.post('/api/sendcomplaintData', complaintReq.getComplaintData);
app.post('/api/sendmissiingtData', missingReportReq.getMissingData);
app.post('/api/sendallcrimereports', downloadReportCount.downloadAlllCrimeReport);
app.post('/api/sendallmissingreports', downloadReportCount.downloadMissingReport);
app.post('/api/sendallcomplaintreports', downloadReportCount.downloadAllComplaintReport);
app.get('/api/getallusercomplaintdata', downloadReportCount.downloadAllUsersComplaintReport);
app.get('/api/getallusercrimedata', downloadReportCount.downloadAllUsersCrimeReports);
app.get('/api/getallusermissingdata', downloadReportCount.downloadAllUsersMissingReport);
app.put('/api/getCrimeStatusinfo', setReportsStatus.setCrimeReportStatus);
app.put('/api/getMissingStatusinfo', setReportsStatus.setMissingReportStatus);
app.put('/api/getComplaintStatusinfo', setReportsStatus.setComplaintReportStatus);
app.post('/api/reportCount', downloadReportCount.downloadReportCount);
app.post('/api/users', user.userPostRouter);
app.post('/api/auth', loginuserRoute.userLoginPostRequest);
app.post('/api/signtoken', user.signTokenMaker);
app.post('/api/subscribeNotification', pushNotification.SubscribeRoute);
app.get('/', (req, res) => {
  res.send('<h1>cime Serve sponding!</h1>');
});

app.get('*', (req, res) => {
  // res.sendfile('/static/index.html');
});

app.listen(PORT, () => {
  console.log(`listening on PORT:  ${chalk.green(PORT)} `);
});
