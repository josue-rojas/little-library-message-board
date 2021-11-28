import React from "react";
import styles from "./styles.module.css";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

const Header = () => {
  const location = useLocation();

  return (
    <div className={styles.header}>
      <div className={styles.links}>
        <ul>
          <li>
            <Link
              className={classNames({
                [styles.active]: location.pathname === "/"
              })}
              to="/"
            >
              New
            </Link>
          </li>
          <li>
            <Link
              className={classNames({
                [styles.active]: location.pathname === "/random"
              })}
              to={{ pathname: "/random", state: { refreshDate: false } }}
            >
              Random
            </Link>
          </li>
          <li>
            <Link
              className={classNames({
                [styles.active]: location.pathname === "/all"
              })}
              to={{ pathname: "/all", state: { refreshDate: false } }}
            >
              All
            </Link>
          </li>
          <li>
            <Link
              className={classNames({
                [styles.active]: location.pathname === "/about"
              })}
              to={{ pathname: "/about", state: { refreshDate: false } }}
              >
              About
            </Link>
          </li>
          <li>
            <a href="https://links.withcheesepls.com">
              #pelhamparkway
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
