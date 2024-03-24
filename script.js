let divprojects = document.getElementById("divProjects");
let divPai = document.getElementById("divPai");
let divPaiAvatar = document.getElementById("avatarDiv");
let buttonPesquisar = document.getElementById("pesquisar");

function gitHubRepos() {
  let userGitHub = document.getElementById("user").value;

  fetch(`https://api.github.com/users/${userGitHub}/repos`).then(
    async (res) => {
      if (!res.ok) {
        throw new Error(res.status);
      }

      let data = await res.json();

      data.forEach((elemento) => {
        let projetos = document.createElement("div");
        let language =
          elemento.language != null
            ? elemento.language
            : "Não possui uma linguagem";
        projetos.innerHTML = `

        <div id="projects" class="w-[1000px] flex justify-between border-b border-[#cccccc]">
            <div class="flex py-[30px]">
              <div>
                <a href="${
                  elemento.html_url
                }" class=" text-xl font-bold" target="_blank" style="color: #0969DA">
                  ${elemento.name}
                </a>
                <div class="ml-[5px] py-[5px] px-[10px] border border-[#cccccc] inline-block rounded-[20px]">
                  <p class="color-[#cccccc] text-xs">${elemento.visibility}</p>
                </div>
                <div class="flex items-center gap-[10px] pt-[10px]">
                  <div class="flex items-center gap-[4px]">
                    <div class="w-[15px] h-[15px] border border-[#cccccc] rounded-[100%] bg-[#cccccc]"></div>
                    <p class="color-[#636C76] text-sm">${language}</p>
                  </div>
                  <div class="flex items-baseline justify-center gap-[3px]">
                    <i class="bi bi-star text-sm"></i>
                    <p class="color-[#636C76] text-xs">${
                      elemento.stargazers_count
                    }</p>
                  </div>
                  <div>
                    <p class="color-[#636c76] text-xs">
                      ${Intl.DateTimeFormat("pt-br").format(
                        new Date(elemento.pushed_at)
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="flex">
                <div class="flex bg-[#eef1f4] border border-[#cccccc] gap-[10px] items-baseline mt-[30px] pl-[10px] pr-[10px] py-[3px] rounded-s-lg">
                  <div><i class="bi bi-star text-sm"></i></div>
                  <p class="color: #636c76; text-xs">Star</p>
                </div>

                <div class="flex w-[30px] bg-[#eef1f4] border-b border-t border-r border-[#cccccc] justify-center mt-[30px] rounded-e-lg items-center">
                  <div>
                    <i class="bi bi-caret-down-fill text-xs"></i>
                  </div>
                </div>
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
    let bio = data.bio != null ? data.bio : "O usuário nao possui uma bio";

    let avatar = document.createElement("div");
    avatar.innerHTML = `

    <div class="flex justify-center">
            <img
              src="${data.avatar_url}"
              alt=""
              class="w-[350px] h-[350px] border border-[#cccccc] rounded-full"
            />
          </div>

          <div class="flex flex-col  items-center w-[350px]">
            <a
              href="${data.html_url}"
              class="text-[32px] font-600 color-[#1f2328]"
              target="_blank"
            >
              ${data.name}
            </a>
            <p class="text-[26px] color-[#636c76] font-light">${data.login}</p>
            <p class=" text-center color-[#1f2328] text-lg pb-[20px] font-light pt-[10px]">${bio}</p>
            <div class="flex gap-[6px] items-center">
              <p class="font-bold">${data.followers}</p>
              <p class="color-[#636c76]">followers</p>
              <div class="border border-[#000] rounded-full"></div>
              <p class="font-bold">${data.following}</p>
              <p class="color-[#636c76]">following</p>
            </div>
          </div>

    `;

    divPaiAvatar.appendChild(avatar);
    buttonPesquisar.setAttribute("disabled", "");
  });
}

function limparCampo() {
  let userGitHub = document.getElementById("user").value;

  if (userGitHub.length === 0) {
    divPai.classList.remove("flex");
    divPai.classList.add("invisible");
    divprojects.innerHTML = "";
    divPaiAvatar.innerHTML = "";
    buttonPesquisar.removeAttribute("disabled", "");
    return;
  }
}

document.getElementById("user").addEventListener("keyup", limparCampo);
