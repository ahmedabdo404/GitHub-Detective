//#region  variables
let search = document.getElementById("search");
let details = document.getElementsByClassName("details")[0];
let projLen = document.getElementsByClassName("project-len")[0];
let repos = []
//#endregion


//#region Events
// fetching api
submit.onclick = () => {
  getApiData()
}

userName.onkeyup = (e) => {
  if (e.key === "Enter")
    getApiData()
}

// searching repos
search.onkeyup = (e) => {
  // console.log(e.target.value);
  let searchVal = e.target.value;
  let filteredArr = repos.filter(repo => repo.name.toLowerCase().includes(searchVal.toLowerCase()))
  showRecords(filteredArr);
}
//#endregion


//#region Functions
function getApiData() {
  fetch(`https://api.github.com/users/${userName.value}/repos`)
    .then(response => response.json())
    .then(data => {
      if (data.length != 0 && userName.value != "") {
        repos = data;
        search.classList.remove("d-none");
        showRecords(repos);
      } else if (userName.value == "") {
        clear();
        details.innerHTML = `Empty User name field`;
      }
      else {
        clear();
        details.innerHTML = `${userName.value} is not defined`;
      }
    })
    .catch(reject => {
      clear();
      details.innerHTML = `Something went wrong, User Not Found(${reject})`;
    }
    )
}


//clear function
function clear() {
  search.classList.add("d-none");
  projLen.innerHTML = "";
}

//display function
function showRecords(Array) {
  if (Array.length != 0) {
    user = Array[0].owner.login
    details.innerHTML = "";
    projLen.innerHTML = `${user} has ${Array.length} Projects`;
    for (const [i, c] of Array.entries()) {
      details.innerHTML += `
    <div class="content col-12 col-md-6 ">
      <h4>Repo: ${i + 1}</h4>
      <h6>Repo ID: ${c.id}</h6>
      <h6>Repo Name: ${c.name}</h6>
      <h6>Repo URL: <a class="btn btn-link p-0 mb-1" href="${c.html_url}" target="_blank">${c.html_url}</a></h6>
      <h6>Repo Visibility: ${c.visibility}</h6>
      <h6>Repo description: ${c.description ? c.description : "None"}</h6>
      <h6>Repo Most written language: ${c.language ? c.language : "Unkonwn"}</h6>
    </div>`;
    }
  } else {
    projLen.innerHTML = `${user} has ${Array.length} Projects`;
    details.innerHTML = "";
  }
}
//#endregion
