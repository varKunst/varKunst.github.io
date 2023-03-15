import { Configuration, OpenAIApi } from "https://cdn.skypack.dev/openai";
document.querySelector("#send").addEventListener("click", function() {
  let template = `
  <div class="line mine">
    <span class="chat-box">${document.querySelector("#input").value}</span>
  </div>`;
  document.querySelector(".chat-content").insertAdjacentHTML("beforeend", template);

  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${document.querySelector("#input").value}`,
    temperature: 0.9,
    max_tokens: 2000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
  }).then((result)=>{
    console.log(result.data.choices[0].text);
    template = `<div class="line bot">
      <span class="chat-box">${result.data.choices[0].text}</span>
      </div>`;
    document.querySelector(".chat-content").insertAdjacentHTML("beforeend", template);
  });
}) 