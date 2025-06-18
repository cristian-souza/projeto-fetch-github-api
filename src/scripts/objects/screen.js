const screen = {
    userProfile: document.querySelector(".profile-data"),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                    <div class="data">
                        <h1>${user.name ?? "Não possui nome cadastrado 🙁"}</h1>
                        <p>${user.bio ?? "Não possui bio cadastrado 🙁"}</p>
                        <p>Seguidores: 👥${user.followers}</p>
                        <p>Seguino: 👤${user.following}</p>
                    </div>
                </div>`

        let repositoriesItens = ''
        user.repositories.forEach(
            (repo) =>
            (repositoriesItens += `<li>
          <a href="${repo.html_url}" target="_blank">${repo.name}
                                    <div class="contadores">
                                      <p>🍴${repo.fork_count ?? "0"}</p>
                                      <p>🌟${repo.stargazers_count}</p>
                                      <p>👀${repo.watchers_count}</p>
                                      <p>👨‍💻${repo.language ?? "❌"}</p>
                                    </div></a>
          </li>`)
        )

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                        <h2>Repositórios</h2>
                                        <ul>${repositoriesItens}</ul>
                                     </div>`;
        }

        let eventsItens = ''
        user.events.forEach(event => {
            if (event.type === "PushEvent") {
                const repoName = event.repo.name
                const messages = event.payload.commits?.map(commit => commit.message).join("<br>")
                eventsItens += `<li><strong>${repoName}</strong> - ${messages}</li>`
            } else if (event.type === "CreateEvent") {
                const repoName = event.repo.name
                eventsItens += `<li><strong>${repoName}</strong> - Sem mensagem de commit</li>`
            }
        })

        if (user.events.length > 0) {
            this.userProfile.innerHTML += `
        <div class="events section"> 
            <h2>Eventos</h2>
            <ul>${eventsItens}</ul>
        </div>`
        } 
    },
    renderNotFound() {
        this.userProfile.innerHTML = `<h3>Usuário não encontrado</h3>`;
    },
}

export { screen };

