import { Store } from 'react-notifications-component'

export const notification = {
  title: "Error!",
  message: "Configurable",
  autoClose: 3000,
  type: "danger",
  insert: "top",
  container: "top-right",
  dismiss: {
    duration: 3000,
  },
  animationIn: ["animate_animated animate_flipInX"],
  animationOut: ["animate_animated animate_flipInX"],
};

export const showNotification = (message) => {
  Store.addNotification({
    ...notification, message
  })
}

