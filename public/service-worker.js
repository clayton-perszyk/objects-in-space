(function () {
  'use strict';

  self.addEventListener('push', function(event) {
    fetch('https://objects-in-space.herokuapp.com/todays-neos.json').then(function(response) {
      response.json().then(function(data) {
        var title = '';
        var body = 'Are about to hit';
        var icon = 'https://objects-in-space.herokuapp.com/icon-192x192.png';
        var tag = 'simple-push-demo-notification-tag';
        var names = [];
        data.forEach(function(item) {
          names.push(item.name);
        });
        if(names.length === 0) {
          title = "No NEOs Today";
          body = "You can reset today";
        } else if(names.length >= 3) {
          title = "There are " + names.length + " NEOs about to hit";
          body = "Run for the hills";
        } else {
          title = names.join(", ");
          body = "Are about to hit";
        }
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
        if (client.url == '/#/NEO?q=filtered' && 'focus' in client)
          return client.focus();
      }
      if (clients.openWindow)
        return clients.openWindow('/#/NEO?q=filtered');
    }));

  });
})();
