"use strict";

import blogs from "./blogs.js";

const html = {
  article(blog) {
    const { img, title, subtitle, body } = blog;
    return `<div class="blog--container">
        <img
          class="img--blog"
          src="${img || "https://i.ibb.co/PT0G9HK/DH-banner-image.png"}"
        />
        <div class="header--article">
          <span class="title">${title}</span><br />
          <span class="subtitle">${subtitle}</span>
        </div>
        <span class="blog--content">${body}</span>
      </div>`;
  },

  insert(html, parent) {
    parent.insertAdjacentHTML("beforeend", html);
  },
};

const get = {
  byId(id, parent = document) {
    return parent.getElementById(id);
  },
  byClass(className, parent = document) {
    return parent.querySelector(`.${className}`);
  },
  allByClass(className, parent = document) {
    return parent.querySelectorAll(`.${className}`);
  },
};

const navBlogLink = get.byClass("blog-link-nav");

const App = {
  navLinks: get.allByClass("nav-link"),
  blogLink: get.byClass("blog-link"),
  sections: {
    home: get.byClass("home-page--container"),
    blogs: get.byClass("feed--container"),
  },
  feed: get.byClass("feed--container"),
  init() {
    for (let i = 0; i < blogs.length; i++)
      html.insert(html.article(blogs[i]), this.feed);
    this.addEventListeners();
  },
  addEventListeners() {
    this.navLinks.forEach((link) => {
      if (link.name !== "link") link.addEventListener("click", App.navClick);
    });
    this.blogLink.addEventListener("click", (e) =>
      App.navClick(e, navBlogLink)
    );
  },
  navClick(e, element = e.target) {
    console.log(element);
    App.navLinks.forEach((link) => {
      link === element
        ? link.classList.add("active")
        : link.classList.remove("active");
    });
    const otherEl = element.name === "home" ? "blogs" : "home";
    App.sections[element.name].classList.remove("hidden");
    App.sections[otherEl].classList.add("hidden");
  },
};

App.init();
