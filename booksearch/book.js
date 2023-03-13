// API: Application Programming Interface
// ㄴ Open API: 다양한 기업에서 공익의 목적 또는 다른 이유로 무료로 인터페이스를 이용할 수 있게 제공
// ㄴ Private API: 유료

// Open API
// ㄴ 공공 데이터 포털
// ㄴ 카카오 개발자 센터
// ㄴ 네이버 개발자 센터
// ㄴ ...

// ajax
// 비동기 방식으로 페이지의 일부 정보를 갱신할 수 있는 기술
// fetch()로도 구현 가능(일부 브라우저 또는 하위 버전의 스크립트에서 호환 X)
// -> jQuery.ajax() 메소드를 활용

let page = 1;

const container = document.querySelector(".container");
const pageList = document.querySelector(".page-list");

const query = document.querySelector(".query");
const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("submit", e => {
  e.preventDefault();
  if(query!=="") {

    searchRequest(query.value, page);
  }
});

function searchRequest(query)  {
  $.ajax({
    "url": `https://dapi.kakao.com/v3/search/book?query=${query}&page=${page}&size=10&target=title`,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Authorization": "KakaoAK 45866271ca1e7215ffd42d2dbd32f055"
    },
  }).done((response) => {
    console.log(response);
    let isEnd = response.meta.is_end;

    container.innerHTML = "";
    pageList.innerHTML = "";

    const size = response.documents.length;
    let paseSize = response.meta.total_count / size;

    if((response.meta.total_count % size)!=0) {
      paseSize += 1;
    }

    for(let i=0; i<size; i++) {
      const url = document.createElement("a");
      url.setAttribute("href", response.documents[i].url);

      const img = document.createElement("img");
      img.setAttribute("class", "book-img");
      img.setAttribute("src", response.documents[i].thumbnail);

      url.append(img);

      const title = document.createElement("h4");
      title.setAttribute("class", "book-title");
      title.innerText = response.documents[i].title;

      const description = document.createElement("p");
      description.setAttribute("class", "book-description");
      description.innerText = response.documents[i].contents.substring(0,50) + "...";

      const price = document.createElement("span");
      price.setAttribute("class", "price");
      price.innerText = response.documents[i].price;

      const info = document.createElement("p");
      info.setAttribute("class", "book-info");

      const author = document.createElement("span");
      author.setAttribute("class", "author");
      author.innerText = response.documents[i].authors;

      const publisher = document.createElement("span");
      publisher.setAttribute("class", "publisher");
      publisher.innerText = response.documents[i].publisher;

      info.append(author, " | " ,publisher);

      const resultCard = document.createElement("div");
      resultCard.setAttribute("class", "result-card");
      resultCard.append(url, title, description, price, info);

      container.append(resultCard);
    }
    
    for(let i=0; i<paseSize; i++) {
      const pageNum = document.createElement("a");
      pageNum.innerText = i + 1;
      pageList.append(pageNum);
    }
  });
}

pageList.addEventListener("click", e => {
  const pageNum = e.target.innerText;
  page = pageNum;
  
  searchRequest(query.value);
});
