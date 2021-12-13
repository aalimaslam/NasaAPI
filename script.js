const API_KEY = "yV9LriXmfXVkd8yC7BdgXX2CD76Lgut8x6rrr4QW";
const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`;

const $ = s =>document.querySelector(s);
const $$ = s =>document.querySelectorAll(s);

const request = new XMLHttpRequest()
const container = $(".container")
request.open("GET",URL);

request.onload = ()=>{
    response = JSON.parse(request.response)
    response = response.photos;

    for(let i = 0; i<response.length; i+=9 ){

        const card = document.createElement("div");
        card.className = "card";

        const imageContainer = document.createElement("div");
        imageContainer.className = "image-container";
        
        const img = document.createElement("img");
        img.src = response[i].img_src;

        const textContainer = document.createElement("div");
        textContainer.className = "text-container";

        const h1 = document.createElement("h1");
        h1.className = "name";
        h1.innerText = response[i]["camera"]["name"]

        const small = document.createElement("small");
        small.innerText = `Taken by ${response[i]["camera"]["full_name"]}`;

        const additionalInfoContainer = document.createElement("div");
        additionalInfoContainer.className = "additional-info";

        
        const launchDate = document.createElement("div");
        launchDate.className = "launch-date";
        launchDate.innerText = `Launch Date : ${response[i]["rover"]["launch_date"]}`
        
        const landingDate = document.createElement("div");
        landingDate.className = "landing-date";
        landingDate.innerText = `Landing Date : ${response[i]["rover"]["landing_date"]}`
        
        card.appendChild(imageContainer)
        card.appendChild(textContainer)
        textContainer.appendChild(h1)
        textContainer.appendChild(small)
        textContainer.appendChild(additionalInfoContainer);
        additionalInfoContainer.appendChild(launchDate)
        additionalInfoContainer.appendChild(landingDate)
        imageContainer.appendChild(img)
        container.appendChild(card)


        card.addEventListener("click",()=>{
            showPopup(
                response[i]["camera"]["name"], `Launch Date : ${response[i]["rover"]["launch_date"]}`, `Landing Date : ${response[i]["rover"]["landing_date"]}` , response[i].img_src
            )
        })

    }



}
request.send();
const popupName = $(".takenBy");
const popupLaunchDate = $("#launchDate");
const popupLandingDate = $("#landingDate");
const popupImg = $(".popup-container img");
const popup = $(".popup");

function showPopup(name,launchDate,landingDate,imageSrc){
        popup.style.opacity = "1";
        popup.style.height = "100%";
        popup.style.width = "100%";

        popup.style.visibility = "visible";
        popup.style.pointerEvents = "all";
        popupName.innerText = name;
        popupLaunchDate.innerText = launchDate;
        popupLandingDate.innerText = landingDate;
        popupImg.src = imageSrc;
}

const closeBtn = $(".closeBtn");

closeBtn.addEventListener("click",()=>{
        popup.style.opacity = "0";
        popup.style.height = "0%";
        popup.style.width = "0%";
})