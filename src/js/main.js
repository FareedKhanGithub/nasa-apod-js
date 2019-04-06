var apod = {    

  randomDate: function(start, end){
    let date = new Date(
      start.getTime() + Math.random() *
        (end.getTime() - start.getTime())             
    );

    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();

    if(m<10){
      m='0'+m;                     
    }

    if(d<10){
      d='0'+d;                 
    }

    return `${y}-${m}-${d}`;
  },


  buildDOM: function(result){
    document.querySelector('#apodTitle').innerHTML = result.title;

    if(result.media_type === 'video'){
      document.querySelector('#apodImg').style.display='none';       
      let avi = document.querySelector('#apodVideo > iframe');           
      avi.src=result.url;                                          
      document.querySelector('#apodVideo').style.display='block';                  
    }
    else{
      document.querySelector('#apodVideo').style.display='none';                       
      let ai = document.querySelector('#apodImg');                                 
      ai.src=result.url;
      ai.style.display='block';                                        
    }
    if(result.copyright!=undefined){
      document.querySelector('#apodCopyright').innerHTML = 'Copyright: ' + result.copyright;     
    }
    document.querySelector('#apodDate').innerHTML = 'Date: ' + result.date;                          
    document.querySelector('#apodDesc').innerHTML = result.explanation;                 
  },

  getRequest: function() {

      let date = this.randomDate(new Date(1995,5,16), new Date());              
      let key = 'xxx';                             
      var url = `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${date}`;           
      let ths = this;


      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);                  
      xhr.send();                          

      xhr.onload = function(){
        let result = JSON.parse(xhr.response);      

        ths.buildDOM(result);    
      }
  },

  init: function(){
    this.getRequest();                                     
  }
};

apod.init();                               

document.querySelector('#btnRandApod').addEventListener('click', function(){             
  apod.getRequest();                                        
});

