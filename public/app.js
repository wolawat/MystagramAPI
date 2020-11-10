const addImagestoGallery = (res) => {
  const gallery = document.querySelector(".gallery");
  let html = "";
  res.results.forEach((element) => {
    html += `
    <section class="photo">
    <header class="photo__header">
        <div class="photo__header-column">
           <img 
                class="photo__avatar"
                src="${element.user.profile_image.small}"
           />
         </div>
         <div class="photo__header-column">
             <span class="photo__username">${element.user.username}</span>
        </div>          
     </header>
     <div class="photo__file-container">
          <img 
               class="photo__file"
               src="${element.urls.full}"
          />
      </div>
      <div class="photo__info">
            <div class="photo__icons">
                 <span class="photo__icon">
                     <i class="fa fa-heart-o heart fa-lg"></i>
                 </span>
                <span class="photo__icon">
                     <i class="fa fa-comment-o fa-lg"></i>
                </span>
      </div>   
      <span class="photo__likes">${element.likes}likes</span>
      <div  class="photo__comments">     
                    <div  class="photo__comment">           
                        <span class="photo__comment-author">${element.user.username}</span>${element.alt_description}
                     </div>
                  </div>
        </div>
      </section>                  
    `;
  });
  gallery.innerHTML = html;
};

const callAPI = async (keyword) => {
  try {
    console.log("keyword --> ", keyword);
    const response = await fetch("/api/searchPhotos", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword }),
    });
    const res = await response.json();
    //check response return from our API
    console.log("response ----> ", res);
//6. Add images to gallery
    addImagestoGallery(res);
  } catch (error) {
    console.log("message error --->", error);
  }
};



const removeAllPhoto = () => {
  const galleryElement = document.querySelector(".gallery");
  galleryElement.innerHTML = "";
};
 

const searchPhoto = (event) => {
  const keyword = event.target.value;
  if (event.key === "Enter" && keyword) {
    removeAllPhoto();
    //5. Call API
    callAPI(keyword);
  }
};
const main = () => {
  const inputElement = document.querySelector(".search");
  inputElement.addEventListener("keydown", searchPhoto);
};

main();
;
