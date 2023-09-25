import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const UserModal = ({ show, setShow }) => {
  const hide = (e) => {
    e.stopPropagation();
    setShow(false);
  };
  return (
    show && (
      <AnimatePresence>
        <motion.div
          className="modal_logout"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={hide}
        >
          <div>
            <Link to="/account" className="a">
              account
            </Link>

            <Link to="/editinfo" className="a2">
              settings
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    )
  );
};

export default UserModal;
