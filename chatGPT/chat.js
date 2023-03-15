// document.querySelector("#send").addEventListener("click", function() {
//   const input = document.querySelector("#input").value;
  
//   const content = document.querySelector(".chat-content");

//   const line = document.createElement("div");
//   line.setAttribute("class", "line mine");

//   const myMessage = document.createElement("span");
//   myMessage.setAttribute("class", "chat-box");
//   myMessage.innerText = `${input}`;

//   line.append(myMessage);
//   content.append(line);
// });
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
    max_tokens: 240,
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