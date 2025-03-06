import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NotificationProps {
  text: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ text, onClose }) => {
  const [, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500); // Wait for exit animation
    }, 1000); // Stay visible for 1 second

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.5 }}
      className="notification"
    >
      {text}
    </motion.div>
  );
};

export default Notification;
