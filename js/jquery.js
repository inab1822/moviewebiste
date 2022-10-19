$(document).ready(function(){

function idSave(){
    let idInfo = localStorage.getItem('Id')
    console.log(idInfo)
    if(idInfo){
        $('.ID').find('input').val(idInfo);
        //input에 있는 것은 text가 아니라 value이다
    }else{
        $('.ID').find('input').val('');
    }
}
function reload(){
    let checked = $("input:checkbox[name='idSave']").is(':checked')
    console.log(checked)
    if($('#ckBox').checked === true){
        idSave();
    }else{}
    window.scrollTo(0,0)
}

    $('.nav').on('click',function(){
        $('.navBox').css('left',0+'px')
    });

    $('.navBox .close').on('click',function(){
        $('.navBox').css('left',-100+'%')
    })

    $('.regist').on('click',function(e){
        e.preventDefault();
        let idLength = $('.ID').find('input').val();
        let pwLength = $('.PASSWORD').find('input').val();
        console.log(idLength)
        
        if(idLength.length === 0 || pwLength.length === 0){
            alert('아이디 또는 비밀번호를 입력하세요')
        }else if(idLength.length >0 && idLength.length < 6){
            alert('아이디는 최소 6자리 이상으로 입력하세요')
        }else if(pwLength.length >0 && pwLength.length <9){
            alert('비밀번호는 최소 9자리 이상으로 입력하세요')
        }else{
            localStorage.setItem('Id',idLength)
            $(this).parents('.loginPage').fadeOut('slow')
        }
       
    })
    $('button.user').on('click',function(){
        $('.userBox').slideToggle();
    })

    $('.srcicon').on('click',function(){
        $('.srcBox').slideToggle();
    })



    let key = 'api_key=961d2e531ab267675e3b02f11529ca96';
    let base = 'https://api.themoviedb.org/3';
    let lang = "&language=ko-KR"
    let apiUrl = base + '/discover/movie?sort_by=popularity.desc&' + key + lang;
    let dramaUrl = base + '/discover/movie?with_genres=18&primary_release_year=2014&' + key + lang;
    console.log(dramaUrl)


    $('.srcBox form').on('submit',function(e){
        e.preventDefault();
    // 검색기능
    let searchKeyword = $(this).find('input').val();
    console.log(searchKeyword)
    let srcUrl = base + '/search/movie?query=' + searchKeyword + '&' + key + lang;
    fetch(srcUrl)
        .then(function(res){
            return res.json();
        })
        .then(function(data){
            console.log(data);
            let results = data.results;
            console.log(results)
            

            function src(){
                for(i=0; i<results.length; i++){
                var movieName = data.results[i].title;
                var moviePost = data.results[i].poster_path;
                console.log(moviePost)
                list = `<div class="swiper-slide">
                            <img src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2${moviePost}">
                            <div class="bName">${movieName}</div>
                        </div>`
                $('.src.swiper-wrapper').append(list)
                
                }
                var swiper = new Swiper(".srcResult", {
                slidesPerView: 4,
                spaceBetween: 20,
      
                });
            }

            if($('.swiper-slide').text() === ''){
                src();
            }else{
                $('.src.swiper-wrapper').text('');
                src();
            }
            // let list = `<li>${moviName}</li>`

            let moviegenre = data.results[0].genre_ids
            console.log(moviegenre)

        })
        .catch(function(arr){
            console.log(arr)
        })
    });

    reload();
});