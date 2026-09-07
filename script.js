const API_URL = "http://192.168.56.10/api/livros";

const corpoTabela = document.getElementById("corpo-tabela");
const form = document.getElementById("form-livro");
const mensagem = document.getElementById("mensagem");
const btnAtualizar = document.getElementById("btn-atualizar");

async function carregarLivros() {
  try {
    const resposta = await fetch(API_URL);
    const livros = await resposta.json();
    corpoTabela.innerHTML = "";

    livros.forEach((livro) => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${livro.id}</td>
        <td>${livro.titulo}</td>
        <td>${livro.autor}</td>
        <td>${livro.ano_publicacao ?? "-"}</td>
        <td>${livro.disponivel ? "Sim" : "Não"}</td>
        <td><button class="btn-excluir" data-id="${livro.id}">Excluir</button></td>
      `;
      corpoTabela.appendChild(linha);
    });

    document.querySelectorAll(".btn-excluir").forEach((btn) => {
      btn.addEventListener("click", () => excluirLivro(btn.dataset.id));
    });
  } catch (erro) {
    mensagem.textContent = "Erro ao carregar livros: " + erro;
  }
}

async function excluirLivro(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    carregarLivros();
  } catch (erro) {
    mensagem.textContent = "Erro ao excluir livro: " + erro;
  }
}

form.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;
  const ano = document.getElementById("ano").value;

  try {
    const resposta = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo,
        autor,
        ano_publicacao: ano ? parseInt(ano) : null,
      }),
    });

    if (!resposta.ok) throw new Error("Falha ao cadastrar");

    mensagem.textContent = "Livro cadastrado com sucesso!";
    form.reset();
    carregarLivros();
  } catch (erro) {
    mensagem.textContent = "Erro ao cadastrar livro: " + erro;
  }
});

btnAtualizar.addEventListener("click", carregarLivros);

carregarLivros();