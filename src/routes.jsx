import React from "react";
import { Switch, Route } from "react-router-dom";
import New from "pages/New";
import SinglePost from "pages/SinglePost";
import NoMatch from "pages/NoMatch";
import Random from "pages/Random";
import AllPost from "pages/AllPost";
import About from "pages/About";

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/new">
          <New />
        </Route>
        <Route exact path="/post/:id">
          <SinglePost />
        </Route>
        <Route exact path="/random">
          <Random />
        </Route>
        <Route exact path="/all">
          <AllPost />
        </Route>
        <Route exact path="/">
          <About />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}
