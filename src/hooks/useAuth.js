import { useSelector } from "react-redux";
import { selectToken } from "../features/auth/auth";
import jwtDecoded from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectToken);

  if (token) {
    const decode = jwtDecoded(token);
    const { name, id, email } = decode.UserInfo;

    return { name, id, email };
  }

  return { name: "", id: "", email: "" };
};

export default useAuth;
