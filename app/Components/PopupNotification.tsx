"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import {motion, AnimatePresence} from "framer-motion"

interface NotificationProps {
    showMessage: string
  }

const PopupNotification = ({showMessage}:NotificationProps) => {
    console.log("recived from the client: ",showMessage)
    // const [messageRecived , setMessageRecived ] = useState("")




      const [notification, setNotification] = useState<{
        message: string;
        visible: boolean;
      }>({ message: "", visible: false });

          useEffect(() => {
            if(showMessage){
                setNotification({ message:showMessage, visible: true });
                setTimeout(() => {
                  setNotification({ message: "", visible: false });
                }, 3000);
            }
          },[showMessage])

  return (
     <AnimatePresence>
            {notification.visible && (
                <motion.div
                  className="fixed bottom-20 right-5 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  {notification.message}
                </motion.div>
              )}
          </AnimatePresence>
  )
}

export default PopupNotification
