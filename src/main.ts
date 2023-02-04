(() => {
  const dialog = (url: string) => {
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
