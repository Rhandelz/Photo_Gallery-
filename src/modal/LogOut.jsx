import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authSlice";

const LogOut = ({ show, setShow }) => {
  const navigate = useNavigate();

  const [logOuts, { isSuccess }] = useSendLogoutMutation();

  const hide = (e) => {
    e.stopPropagation();
    setShow(false);
  };

  const logout = async () => {
    await logOuts();
    navigate("/login", { replace: true });
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
            <Link to="/editinfo" className="a">
              settings
            </Link>
            <h1 className="a" onClick={logout}>
              logout
            </h1>
          </div>
        </motion.div>
      </AnimatePresence>
    )
  );
};

export default LogOut;
