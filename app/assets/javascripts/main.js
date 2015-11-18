$(document).ready(function() {
  'use strict';

  var API_KEY = window.GoogleSamples.Config.gcmAPIKey;
  var GCM_ENDPOINT = 'https://android.googleapis.com/gcm/send';

  var isPushEnabled = false;


  // This method handles the removal of subscriptionId
  // in Chrome 44 by concatenating the subscription Id
  // to the subscription endpoint
  function endpointWorkaround(pushSubscription) {
    // Make sure we only mess with GCM
    if (pushSubscription.endpoint.indexOf('https://android.googleapis.com/gcm/send') !== 0) {
      return pushSubscription.endpoint;
    }

    var mergedEndpoint = pushSubscription.endpoint;
    // Chrome 42 + 43 will not have the subscriptionId attached
    // to the endpoint.
    if (pushSubscription.subscriptionId &&
      pushSubscription.endpoint.indexOf(pushSubscription.subscriptionId) === -1) {
      // Handle version 42 where you have separate subId and Endpoint
      mergedEndpoint = pushSubscription.endpoint + '/' +
        pushSubscription.subscriptionId;
    }
    return mergedEndpoint;
  }

  function sendSubscriptionToServer(subscription) {
    $.ajax({
        type: "POST",
        url: "/subscribed_users",
        data: {endpoint: subscription.endpoint.split('/')[5]},
        success: function(data){
        }
    });
    // For compatibly of Chrome 43, get the endpoint via
    // endpointWorkaround(subscription)
    var mergedEndpoint = endpointWorkaround(subscription);
  }

  function unsubscribe() {
    var notificationCheckbox = $('.notifications-checkbox');


    notificationCheckbox.disabled = true;

    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
      // To unsubscribe from push messaging, you need get the
      // subcription object, which you can call unsubscribe() on.
      serviceWorkerRegistration.pushManager.getSubscription().then(
        function(pushSubscription) {
          // Check we have a subscription to unsubscribe
          if (!pushSubscription) {
            // No subscription object, so set the state
            // to allow the user to subscribe to push
            isPushEnabled = false;
            notificationCheckbox.disabled = false;
            return;
          }

          // We have a subcription, so call unsubscribe on it
          pushSubscription.unsubscribe().then(function(successful) {
            notificationCheckbox.disabled = false;
            isPushEnabled = false;
          }).catch(function(e) {
            console.log('Unsubscription error: ', e);
            notificationCheckbox.disabled = false;
          });
        }).catch(function(e) {
          console.log('Error thrown while unsubscribing from ' +
            'push messaging.', e);

        });
    });
  }

  function subscribe() {
    // Disable the button so it can't be changed while
    // we process the permission request
    var notificationCheckbox = $('.notifications-checkbox');
    notificationCheckbox.disabled = true;


    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
      serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
        .then(function(subscription) {
          // The subscription was successful
          isPushEnabled = true;
          notificationCheckbox.disabled = false;

          return sendSubscriptionToServer(subscription);
        })
        .catch(function(e) {
          if (Notification.permission === 'denied') {
            // The user denied the notification permission which
            // means we failed to subscribe and the user will need
            // to manually change the notification permission to
            // subscribe to push messages
            console.log('Permission for Notifications was denied');
            notificationCheckbox.disabled = true;
          } else {
            // A problem occurred with the subscription, this can
            // often be down to an issue or lack of the gcm_sender_id
            // and / or gcm_user_visible_only
            console.log('Unable to subscribe to push.', e);
            notificationCheckbox.disabled = false;
          }
        });
    });
  }

  // Once the service worker is registered set the initial state
  function initialiseState() {
    // Are Notifications supported in the service worker?
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
      console.log('Notifications aren\'t supported.');
      return;
    }

    // Check the current Notification permission.
    // If its denied, it's a permanent block until the
    // user changes the permission
    if (Notification.permission === 'denied') {
      console.log('The user has blocked notifications.');
      return;
    }

    // Check if push messaging is supported
    if (!('PushManager' in window)) {
      console.log('Push messaging isn\'t supported.');
      return;
    }

    // We need the service worker registration to check for a subscription
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
      // Do we already have a push message subscription?
      serviceWorkerRegistration.pushManager.getSubscription()
        .then(function(subscription) {
          // Enable any UI which subscribes / unsubscribes from
          // push messages.
          var notificationCheckbox = $('.notifications-checkbox');
          notificationCheckbox.disabled = false;

          if (!subscription) {
            // We aren’t subscribed to push, so set UI
            // to allow the user to enable push
            return;
          }
          
          notificationCheckbox[0].checked = true;
          // Keep your server in sync with the latest subscription
          sendSubscriptionToServer(subscription);

          // Set your UI to show they have subscribed for
          // push messages
          isPushEnabled = true;
        })
        .catch(function(err) {
          console.log('Error during getSubscription()', err);
        });
    });
  }

  window.addEventListener('load', function() {
    var notificationCheckbox = $('.notifications-checkbox');
    notificationCheckbox.click(function() {
      if (isPushEnabled) {
        unsubscribe();
      } else {
        subscribe();
      }
    });

    // Check that service workers are supported, if so, progressively
    // enhance and add push messaging support, otherwise continue without it.
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register("service-worker.js")
      .then(initialiseState);
    } else {
      console.log('Service workers aren\'t supported in this browser.');
    }
  });
});
