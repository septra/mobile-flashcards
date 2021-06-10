import { AsyncStorage } from "react-native"
import * as Notifications from 'expo-notifications';

const NOTIFICATION_KEY = 'mobile-flashcards:notifications'

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
      title: "Flashcards - Study Reminder",
      body: "Hi! Don't forget to study today!",
      ios: {
          sound: true,
      },
      android: {
          sound: true,
          priority: 'high',
          sticky: false,
          vibrate: true
      }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
          if (data === null) {
              Notifications.requestPermissionsAsync({
                  ios: {
                    allowAlert: true,
                    allowBadge: true,
                    allowSound: true,
                    allowAnnouncements: true,
                  },
                  android: {

                  }
              })
              .then(({status}) => {
                  if (status === 'granted') {
                      Notifications.cancelAllScheduledNotificationsAsync()

                      let tomorrow = new Date()
                      tomorrow.setDate(tomorrow.getDate() + 1)
                      tomorrow.setHours(20)
                      tomorrow.setMinutes(0)
                      tomorrow.setSeconds(0)

                      Notifications.scheduleNotificationAsync({
                          content: createNotification(),
                          trigger: {
                              hour: tomorrow.getHours(),
                              minute: tomorrow.getMinutes(),
                              repeats: true
                          }
                      })
                      AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                  }
              })
          }
      })
}