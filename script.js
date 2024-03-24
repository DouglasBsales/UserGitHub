let divprojects = document.getElementById("divProjects");
let divPai = document.getElementById("divPai");
let divPaiAvatar = document.getElementById("avatarDiv");

function gitHubRepos() {
  let userGitHub = document.getElementById("user").value;

  fetch(`https://api.github.com/users/${userGitHub}/repos`).then(
    async (res) => {
      if (!res.ok) {
        throw new Error(res.status);
      }

      let data = await res.json();
      console.log(data);
      data.forEach((elemento) => {
        let projetos = document.createElement("div");
        projetos.innerHTML = `

        <div style="width: 1000px; display: flex; justify-content: space-between;  border-bottom: 1px solid #cccccc; padding: 20px 0px"
        id="projects"
        >
        <div>
            <a href="${
              elemento.html_url
            }" style="color: #0969da; font-size: 20px; font-weight: 700;  text-decoration: none;" target="_blank">
              ${elemento.name}
              <span
                style="
                  margin-left: 10px;
                  padding: 5px 10px;
                  color: #636C76;
                  border-radius: 20px;
                  border: 1px solid #cccccc;
                  text-align: center;
                  font-size: 12px;
                "
              >
                ${elemento.visibility}
              </span>
              </a>
              <p style="color: #636C76; font-size: 12px; padding-top: 10px; display: flex; align-items: center;">
                <span style="display: inline-block; width: 15px; height: 15px; border: 1px solid #cccccc; border-radius: 100%; margin-right: 6px; background-color: #0969da">
                    
                </span>
                ${elemento.language}
                <span style="color: #636C76; padding-left: 20px; font-size: 12px;">
                    ${Intl.DateTimeFormat("pt-br").format(
                      new Date(elemento.pushed_at)
                    )}
                </span>
              </p>
        </div>
        <div>
            <div style="display: flex; margin-bottom: -9px;">
                <p style="padding-left: 30px; border: 1px solid #cccccc; padding: 5px 20px; border-top-left-radius: 6px; background-color: #EEF1F4; border-bottom-left-radius: 6px; background-color: #EEF1F4; color: #636C76">Star</p>   
                <p style="width: 30px; border-top-right-radius: 6px; background-color: #EEF1F4; border-bottom-right-radius: 6px; border: 1px solid #cccccc; background-color: #EEF1F4;">

                </p>  
            </div>
        </div>
      </div>
        `;

        divprojects.appendChild(projetos);
      });
    }
  );
}

function getPerfil() {
  let userGitHub = document.getElementById("user").value;

  fetch(`https://api.github.com/users/${userGitHub}`).then(async (res) => {
    if (!res.ok) {
      throw new Error(alert("O usuário nao existe no github"));
    } else {
      gitHubRepos();
      divPai.classList.remove("invisible");
      divPai.classList.add("flex");
    }

    let data = await res.json();
    let opcao2 = data.bio != null ? data.bio : "O usuário nao possui uma bio";

    let avatar = document.createElement("div");
    avatar.innerHTML = `

    <img
          src="${data.avatar_url}"
          alt=""
          style="
            width: 350px;
            height: 350px;
            border: 1px solid #cccccc;
            border-radius: 100%;
            margin-top: 60px;
            margin-right: 50px;
          "
        />

        <div style="width: 350px">
          <a href="${data.html_url}"
            style="
              font-size: 32px;
              font-weight: 600;
              margin-bottom: -20px;
              color: #1f2328;
              text-decoration: none;
            "
            target="_blank"
          >
            ${data.name}
          </a>
          <p style="font-size: 26px; color: #636c76; font-weight: lighter">
            ${data.login}
          </p>
          <p style="width: 310px; color: #1f2328; font-size: 18px">
           ${opcao2}
          </p>
          <div style="display: flex; gap: 6px;">
            <p style="font-weight: bold">${data.followers}</p>
            <p style="color: #636c76">followers</p>
            <div style="margin-top: 12px;">.</div>
            <p style="font-weight: bold">${data.following}</p>
            <p style="color: #636c76">following </p>
          </div>
        </div>

    `;

    divPaiAvatar.appendChild(avatar);
  });
}

function limparCampo() {
  let userGitHub = document.getElementById("user").value;

  if (userGitHub.length === 0) {
    divPai.classList.remove("flex");
    divPai.classList.add("invisible");
    divprojects.innerHTML = "";
    divPaiAvatar.innerHTML = "";
    return;
  }
}

document.getElementById("user").addEventListener("keyup", limparCampo);
