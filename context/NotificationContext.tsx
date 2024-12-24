// "use client";
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// interface NotificationContextType {
//   showNotification: (message: string) => void;
// }

// const NotificationContext = createContext<NotificationContextType | undefined>(
//   undefined
// );

// export const NotificationProvider = ({ children }: { children: ReactNode }) => {
//   const [notification, setNotification] = useState<{
//     message: string;
//     visible: boolean;
//   }>({ message: "", visible: false });

//   const showNotification = (message: string) => {
//     setNotification({ message, visible: true });
//     setTimeout(() => {
//       setNotification({ message: "", visible: false });
//     }, 4000);
//   };
//   console.log(notification.message);

//   return (
//     <NotificationContext.Provider value={{ showNotification }}>
//       {children}
//       <AnimatePresence>
//         {notification.visible && (
//             <motion.div
//               className="fixed bottom-5 right-5 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//               transition={{ duration: 0.5 }}
//             >
//               {notification.message}
//             </motion.div>
//           )}
//       </AnimatePresence>
//     </NotificationContext.Provider>
//   );
// };

// export const useNotification = () => {
//   const context = useContext(NotificationContext);
//   if (context === undefined) {
//     throw new Error(
//       "useNotification must be used within a NotificationProvider"
//     );
//   }
//   return context;
// };
