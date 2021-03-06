document.addEventListener("DOMContentLoaded", ()=> {
    "use strict";

    const btnAdd = document.querySelector(".post__btn"),
          btnFormAdd = document.querySelector(".post__btn-form"),
          btnClearAll = document.querySelector(".post__clear"),
          rowCards = document.querySelector(".card-deck"),
          formAdd = document.querySelector(".formAdd"),
          textFieldImage = document.getElementById("post__image"),
          textFieldTitle = document.getElementById("post__title"),
          textFieldDesc = document.getElementById("post__desc");
         

    const posts = JSON.parse(localStorage.getItem("myPost")) || [];

    const toStorage = () => {
        localStorage.setItem("myPost",  JSON.stringify(posts));
      };

    const addPost = (dataImage, dataTitle, dataDesc)=> {
        const col = document.createElement("div"),
         div = document.createElement("div"),
         card_body = document.createElement("div"),
         card_footer = document.createElement("div"),
         img = document.createElement("img"),
         title = document.createElement("h5"),
         desc = document.createElement("p"),
         smalltext = document.createElement("small");

        div.classList.add("card");
        img.classList.add("card-img-top");
        card_body.classList.add("card-body");
        title.classList.add("card-title");
        desc.classList.add("card-text");
        card_footer.classList.add("card-footer");
        smalltext.classList.add("text-muted");
        col.classList.add("col-xl-4");

        div.appendChild(img);
        div.appendChild(card_body);
        div.appendChild(card_footer);
        card_body.appendChild(title);
        card_body.appendChild(desc);
        card_footer.appendChild(smalltext);
        col.appendChild(div);

        img.src = dataImage;
        desc.textContent = dataDesc;
        title.textContent = dataTitle;

        let date = new Date();
        
        smalltext.textContent = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        rowCards.appendChild(col);
    };

    if(posts.length != 0) {
        posts.forEach(value => {
            addPost(value.image, value.title, value.desc);
        });      
    }

    btnAdd.addEventListener("click", () => {
        formAdd.style.display = "block";      
    });

    btnFormAdd.addEventListener("click", (event) => {
        event.preventDefault();
        formAdd.style.display = "none";   

        let random = "https://i.ytimg.com/vi/69C0ga-GloU/maxresdefault.jpg";
        const obj = {};
              
        addPost(textFieldImage.value != "" ? textFieldImage.value:random, textFieldTitle.value, textFieldDesc.value);
             
        obj["image"] = textFieldImage.value != "" ? textFieldImage.value:random;
        obj["title"] =  textFieldTitle.value;
        obj["desc"] =  textFieldDesc.value;
        
        posts.push(obj);   
        toStorage();
    });

    btnClearAll.addEventListener("click",()=>{
        localStorage.clear();
        location.reload();
    });

});