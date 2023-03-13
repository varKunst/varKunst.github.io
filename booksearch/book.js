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
let pageSize = 0;

const container = document.querySelector(".container");
const pageList = document.querySelector(".page-list");

const query = document.querySelector(".query");
const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("submit", e => {
  e.preventDefault();
  if(query!=="") {
    page = 1;
    searchRequest(query.value);
  }
});

const nextBtn = document.getElementById("nextPage");

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
    pageSize = response.meta.total_count / size;

    if((response.meta.total_count % size)!=0) {
      pageSize += 1;
      pageSize = Math.floor(pageSize);
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
    
    const recentPage = document.createElement("input");
    recentPage.setAttribute("type", "text");
    recentPage.setAttribute("class", "recent-page");
    recentPage.setAttribute("value", page);

    const totalPage = document.createElement("span");
    totalPage.setAttribute("class", "total-page");
    totalPage.setAttribute("value", "total-page");
    totalPage.innerText = " / " + pageSize;
    
    const prevPage = document.createElement("img");
    prevPage.setAttribute("id", "prevPage");
    prevPage.setAttribute("class", "moveBtn");
    prevPage.setAttribute("src", "https://em-content.zobj.net/thumbs/240/apple/325/left-arrow_2b05-fe0f.png");

    const nextPage = document.createElement("img");
    nextPage.setAttribute("id", "nextPage");
    nextPage.setAttribute("class", "moveBtn");
    nextPage.setAttribute("src", "https://em-content.zobj.net/thumbs/240/apple/325/right-arrow_27a1-fe0f.png");

    if(page>1) {
      pageList.append(prevPage);
    }
    pageList.append(recentPage, totalPage);
    
    if(page<pageSize) {
      pageList.append(nextPage);
    }
  });
}

pageList.addEventListener("click", e => {
  let id = e.target.getAttribute("id");

  if(id=="nextPage") {
    page++;
    searchRequest(query.value);
  } else if(id=="prevPage") {
    page--;
    searchRequest(query.value);
  } 
});

