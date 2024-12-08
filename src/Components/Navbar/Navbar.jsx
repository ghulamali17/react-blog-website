import React from "react";
import { Container, Logo, LogOutBtn } from "../index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Navbar() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <div>
      <Container>
        <nav className="h-16 flex justify-around items-center">
          <div className="logo">
            <Logo />
          </div>
          <ul className="flex gap-3 ml-auto">
            {navItems.map(
              (item) =>
                item.active && (
                  <li
                    key={item.slug}
                    className="hover:text-purple-500 hover:cursor-pointer"
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogOutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </div>
  );
}

export default Navbar;
