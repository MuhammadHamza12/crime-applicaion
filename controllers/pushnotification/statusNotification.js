const publicVapidKey = 'BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo';
const privateVapidKey = '3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM';
const webpush = require('web-push');


webpush.setVapidDetails(
  'mailto:muhammadhamzahaneef@gmail.com',
  publicVapidKey,
  privateVapidKey,
);

//  Subscribe Route
function SubscribeRoute(req, res) {
  // Get pushSubscription object
  console.log(req.body);
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload

  const payload = JSON.stringify({
    title: 'First Notification',
  });

  //    Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
  console.log('push');
}

module.exports = {
  SubscribeRoute,
};
