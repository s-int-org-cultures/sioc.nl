function load() {
  var page = getPageFromUrl();

  applySettings(page);
  applyContent(page);  
  applyMenu(page);
}

function applySettings(page_to_load) {
  fetch(`pages/pages.json`).then(function(response) {
    return response.json();
  }).then(function(page_configs) {
    var page = page_configs.pages.find((page) => {
      if (page.name == page_to_load) return page;
    });
    document.title = (page) ? page.title : "Page not found";
  });
}

function applyContent(page_to_load) {
  fetch(`pages/${page_to_load}.html`).then(function(response) {
    return response.text();
  }).then(function(content) {
    document.getElementById("content").innerHTML = content || '<h1>Page not found</h1>';
  });
}

function applyMenu(page_to_load) {
  fetch(`pages/pages.json`).then(function(response) {
    return response.json();
  }).then(function(page_configs) {
    page_configs.pages.forEach((page) => {
      if (!page.hide) {
        var active = (page.name === page_to_load) ? active = 'class="active"' : '';
        document.getElementById("menu").innerHTML += `<li ${active}><a href="/?page=${page.name}">${page.name}</a></li>`
      }
    });
  });
}

function getPageFromUrl() {
  var page = 'home';
  var query_string = window.location.href.split('?').pop();
  query_string.split('&').forEach((data) => {
    var item = {
      key: data.split('=')[0],
      value: data.split('=')[1]
    }
    if (item.key === 'page') page = item.value;
  });
  return page;
}