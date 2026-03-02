document.addEventListener("DOMContentLoaded", function () {
 
      
const form = document.querySelector(".form-group");
const input = document.getElementById("description");
const htmlCode = document.getElementById("html-code");
const cssCode = document.getElementById("css-code");
const preview = document.getElementById("preview-section");


form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const description = input.value.trim();

    if(!description) {
      return;
      }

setLoading(true);

try{
  // 4. Fazer uma requisição HTTP (POST) para a API do n8n, enviando o texto do formulário no corpo da requisição em formato JSON.

const response = await fetch("https://suppblogaffiliate.app.n8n.cloud/webhook/fundo-magico", {
method: "POST",
headers: {
  "Content-Type": "application/json"
},
body: JSON.stringify({description})
   });
// 5. Receber a resposta da API do n8n (esperando um JSON com o código HTML/CSS do background).
   const data = await response.json();

   // 6. Se a resposta for válida, exibir o código HTML/CSS retornado na tela:
	//    - Mostrar o HTML e o CSS gerado em uma área de preview.
	//    - Inserir o CSS retornado dinamicamente na página para aplicar o background.
   htmlCode.textContent = data.code || "";
   cssCode.textContent = data.style || "";

   preview.style.display = "block";
   preview.innerHTML = data.code || "";

   let styleTag = document.getElementById("dynamic-style");

   if(styleTag) {
    styleTag.remove();
   }

   if(data.style) {
    styleTag = document.createElement("style");
    styleTag.id = "dynamic-style";
    styleTag.textContent = data.style;
    document.head.appendChild(styleTag);
   }

}catch(error) {
  console.error("Erro ao gerar o Fundo Mágico", error);
  htmlCode.tesxtContent = "Não consegui gerar o HTML. Tente novamente.";
  cssCode.textContent = "Não consegui gerar o CSS. Tente novamente.";
  preview.innerHTML = "";

} finally {
  setLoading(false);

}


});

function setLoading(isLoading) {
  const button = document.getElementById("btn-text");

  if(isLoading) {
    button.innerHTML = "Gerando Background...";
  } else {
    button.innerHTML = "Gerar Background Mágico";
  }  
}


	
	
	// 7. Remover o indicador de carregamento após o recebimento da resposta.
});
