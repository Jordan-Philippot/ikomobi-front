"use client";
import Link from "next/link";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { logout } from "@/redux/reducers/authReducer";

const Header = () => {
  // const dispatch = useAppDispatch();
  // const { user } = useAppSelector((state) => state.auth);

  return (
    <header>
      <nav>
        <Link href="/">Login</Link>
        {/* {user ? (
          <button onClick={() => dispatch(logout())}>Logout</button>
        ) : ( */}
        <Link href="/todos">To do</Link>
        {/* )} */}
      </nav>
    </header>
  );
};

export default Header;
