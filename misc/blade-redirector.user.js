// ==UserScript==
// @name         Blade ruby mailing list archive redirector
// @version      0.2.0
// @description  Redirect from blade.nagaokaut.ac.jp's ruby-core and ruby-dev mailing list archive that's no longer available to blade.ruby-lang.org that's the alternative.
// @author       unasuke (Yusuke Nakamura)
// @match        http://blade.nagaokaut.ac.jp/cgi-bin/scat.rb/ruby/ruby-core/*
// @match        http://blade.nagaokaut.ac.jp/cgi-bin/scat.rb/ruby/ruby-dev/*
// @match        http://blade.nagaokaut.ac.jp/cgi-bin/scat.rb/ruby/ruby-list/*
// @icon         https://avatars.githubusercontent.com/u/4487291?v=4
// @updateURL    https://github.com/unasuke/blade-redirector/raw/main/misc/blade-redirector.user.js
// @downloadURL  https://github.com/unasuke/blade-redirector/raw/main/misc/blade-redirector.user.js
// @supportURL   https://github.com/unasuke/blade-redirector
// ==/UserScript==

(function () {
  "use strict";

  const dialog = (url) => {
    const anchor = `<a href="${url}">${url}</a>`;
    const elem = document.createElement("div");
    elem.innerHTML = `Redirect to <pre style="display: inline-block">${anchor}</pre> after 3 seconds.`;
    elem.setAttribute("style", "font-size: 20px; font-weight: bold");
    return elem;
  };

  const location = document.location.pathname;

  if (
    location.startsWith("/cgi-bin/scat.rb/ruby/ruby-dev/") ||
    location.startsWith("/cgi-bin/scat.rb/ruby/ruby-core/") ||
    location.startsWith("/cgi-bin/scat.rb/ruby/ruby-list/")
  ) {
    const newPath = location.replace("/cgi-bin/scat.rb/ruby/", "");
    const newUrl = `https://blade.ruby-lang.org/${newPath}`;
    const htmlBody = document.getElementsByTagName("body")[0];
    setTimeout(() => {
      htmlBody.prepend(dialog(newUrl));
    }, 500);

    setTimeout(() => {
      window.location.assign(newUrl);
    }, 3500);
  }
})();
