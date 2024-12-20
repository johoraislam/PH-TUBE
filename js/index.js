//get time hour minutes second

function getTimeString(time){
    const hour = parseInt(time/3600);
    
    let second = time % 3600;
    const minutes = parseInt(second/60);
    second = second % 60;

    return `${hour} hour ${minutes} min ${second} sec ago`}


// fatch ,load and display categories data on html

// create data load categories function

const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    const data = await res.json()
    displayCategories(data.categories);

}

// create function categories load videos   

const loadVideos = async (searchText='') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    const data = await res.json()
    displayVideosCrud(data.videos);

}

//show categoris data with btn

const loadCategoriseVideoData = async(id) => {
    // alert(id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    const data = await res.json()
    displayVideosCrud(data.category);
}


// load videos details

const loadVideosDataDetails = async(videoId)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
    const data = await res.json()
   displayDetailsUi(data.video);
}

const displayDetailsUi =(videoUi)=>{
    // console.log(videoUi)
    const detailsContaint = document.getElementById('modal-containt')

    detailsContaint.innerHTML=`
    <img src="${videoUi.thumbnail}"/>
    <p>${videoUi.description} </p>
    `

    document.getElementById('showModalBtn').click()
}

// displayCategories data 


const displayCategories = (data) => {
    const categoryCont = document.getElementById('categories')

    data.forEach((item) => {
        // console.log(item)

        const buttonContainer = document.createElement('div')
        buttonContainer.innerHTML  =`<button onclick="loadCategoriseVideoData (${item.category_id})" class="btn">${item.category}<button/>`
        
        categoryCont.append(buttonContainer)
    });

}





// display video on ui

const displayVideosCrud = (videos) => {
    // console.log(videos)
    const videoCurd = document.getElementById('video-curd')
    videoCurd.innerHTML=''
    

    if(videos.length ==0){
        videoCurd.classList.remove('grid') 
        videoCurd.innerHTML =`<div class="min-h-[100%] w-full flex flex-col gap-5 mx-auto items-center">
        <img src="../assets/Icon.png"/>
        <h2 class="text-center font-bold text-xl">NO CONTAINT HERE IN THIS CATEGORY<h2/>
        <div/>`;
        return;
    }
    else{videoCurd.classList.add('grid') }

    videos.forEach((video) => {
        // console.log(video)
        const curd = document.createElement('div')
        curd.classList = "card card-compact"
        curd.innerHTML = `
        <figure class="w-[200px] relative">
    <img
      src=${video.thumbnail}
      class="h-full w-full object-cover"/>

      ${video.others.posted_date?.length==0
        ?"":`<span class="absolute right-2 text-xs bottom-0 rounded-md text-yellow-100 bg-slate-600 px-1">${getTimeString(video.others.posted_date)}<span/>`}
      
      
       
  </figure>
  <div class="py-2 px-0 flex gap-2">

    <div class=" ">
      <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].
        profile_picture
        }/>
    </div>
    <div class=" ">
      <h2 class="font-bold">${video.title}</h2>
      <div class="flex gap-2">
      <p class="text-gray-400">${video.authors[0].profile_name}</p>
      ${video.authors[0].verified===true?'<img class="w-5 h-5" src="../assets/icons8-verify-48.png"/>':''}
      
    </div>
      
    <p><button onclick="loadVideosDataDetails('${video.video_id}')" class="btn btn-sm text-yellow-50 bg-orange-400">details</button></p>
    </div>
    
  
</div>`

        videoCurd.appendChild(curd)


    })
}

document.getElementById('search').addEventListener('keyup',(e)=>{
    console.log(e.target.value)
})



loadCategories()
loadVideos()
