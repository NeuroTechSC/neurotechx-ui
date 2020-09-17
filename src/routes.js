import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Display from "./views/Display";
import BlogPosts from "./views/BlogPosts";
import Tables from "./views/Tables";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/Display" />
  },
  {
    path: "/Display",
    layout: DefaultLayout,
    component: Display
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  },
  {
    path: "/Tables",
    layout: DefaultLayout,
    component: Tables
  }
];
