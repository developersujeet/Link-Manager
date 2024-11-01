let body = document.querySelector('body');
let Url = document.querySelector("#url");
let btn = document.querySelector("#btn");
let nameField = document.querySelector("#link-name");
const linkList = document.getElementById('link-list');

document.addEventListener("DOMContentLoaded", () => {
  loadTask();
});

document.getElementById('link-form').addEventListener('submit', function(event) {
  event.preventDefault();
});

btn.addEventListener("click", () => {
  if (nameField.value !== '' && Url.value !== "") {
    addLink();
  } else {
    alert("Invalid Link! Cannot add.");
  }
  nameField.value = "";
  Url.value = "";
});

const addLink = () => {
  let link = Url.value.trim();
  if (!link.startsWith('http://') && !link.startsWith('https://')) {
    link = 'https://' + link.toLowerCase();
  }
  if (!link.includes(".")) {
    if (!link.endsWith('.com') && !link.endsWith('.io')) {
      link = link + '.com';
    }
  }
  const name = nameField.value;
  const links = getLinks();
  links.push({ name, url: link });
  saveLink(links);
  renderLink();
};

const deleteLink = (index) => {
  const links = getLinks();
  links.splice(index, 1);
  saveLink(links);
  renderLink();
};

const saveLink = (links) => {
  localStorage.setItem("links", JSON.stringify(links));
};

const getLinks = () => {
  return JSON.parse(localStorage.getItem("links")) || [];
};

const renderLink = () => {
  linkList.innerHTML = '';
  const links = getLinks();
  links.forEach((link, index) => {
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${new URL(link.url).hostname}&sz=40`;
    const div = document.createElement('div');
    div.innerHTML = `<div class="link-item">
      <img src="${faviconUrl}" alt="favicon" class="favicon">
      <a href="${link.url}" target="_blank">${link.name}</a>
      <button class="delete" data-index="${index}">Delete</button>
    </div>`;
    linkList.appendChild(div);
  });

  document.querySelectorAll(".delete").forEach(button => {
    button.addEventListener("click", function() {
      const index = this.getAttribute("data-index");
      deleteLink(index);
    });
  });
};

const loadTask = () => {
  renderLink();
};