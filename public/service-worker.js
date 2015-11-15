(function () {
  'use strict';

  self.addEventListener('push', function(event) {

    fetch('http://localhost:3000/nearearthobjects/1.json').then(function(response) {
      response.json().then(function(data) {
        var title = data.name;
        var body = 'Its about to hit';
        var icon = 'https://tse1.mm.bing.net/th?id=A12a0afe14901d061809d3f13ab8997d7&w=182&h=183&c=7&rs=1&qlt=90&pid=3.1&rm=2';
        var tag = 'simple-push-demo-notification-tag';

        event.waitUntil(
          self.registration.showNotification(title, {
            body: body,
            icon: icon,
            tag: tag
          })
        );
      });
    });

  });


  self.addEventListener('notificationclick', function(event) {
    console.log('On notification click: ', event.notification.tag);
    // Android doesn’t close the notification when you click on it
    // See: http://crbug.com/463146
    event.notification.close();

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(clients.matchAll({
      type: "window"
    }).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url == '/' && 'focus' in client)
          return client.focus();
      }
      if (clients.openWindow)
        return clients.openWindow('/');
    }));

  });
})();
