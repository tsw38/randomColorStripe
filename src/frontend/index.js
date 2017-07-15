const randomStripes = (()=>{
  let lastColorIndex    = 0;
  let currentColorIndex = 0;
  let windowQuery       = {};
  const colors          = ['pink','red','orange','light-orange','yellow','lime','green','sky-blue','blue','dark-blue'];

  let getRandomNumber = (max) => { return Math.floor(Math.random() * (max+1)); }
  let nonConsectiveColors = (newIndex) => {
    if(lastColorIndex === newIndex){
      return nonConsectiveColors(getRandomNumber(colors.length - 1))
    } else {
      lastColorIndex = newIndex;
      return newIndex;
    }
  }

  let generateStripes = (query) => {
    let stripeCount = (query && query.stripes && _.isNumber(parseInt(query.stripes,10))) ? parseInt(query.stripes,10) : 50;
    let updatedImage = (query && query.img && _.isString(query.img)) ? query.img : '';
    console.log(updatedImage);

    let defaultHelper = () => {
      for(let str = 0; str < stripeCount; str++){
        var $div = $("<div>");
        $div.addClass('stripe ' + colors[str%10] + ' _'+stripeCount);
        $div.css({
          'width':`calc(100%/${stripeCount})`,
          'z-index': (stripeCount - str),
        })
        $div.appendTo('#app');
      }
    }
    if(query && query.style){
      if(/random/.test(query.style)){
        for(let str = 0; str < stripeCount; str++){
          var $div = $("<div>");
          $div.addClass('stripe ' + colors[nonConsectiveColors(getRandomNumber(colors.length - 1))] + ' _'+stripeCount);
          $div.css({
            'width':`calc(100%/${stripeCount})`,
            'z-index': (stripeCount - str),
          });
          $div.appendTo('#app');
        }
      } else {
        defaultHelper();
      }
    } else {
      defaultHelper();
    }

    if(updatedImage.length){
      $.each($('.stripe'), function(index,elem){
        console.log($(elem).css('background', $(elem).css('background').replace(/\".+\"/,'"'+updatedImage+'"')));
        console.log($(elem).attr('style'));
      });
    }
  }


  let generateProperQuery = () => {
    windowQuery = window.location.search;
    if(windowQuery){
      windowQuery = windowQuery.replace(/\?/g,'').split("&");
      let temp = {};
      _.each(windowQuery, function(query){
        query = query.split("=");
        temp[query[0]] = query[1];
      });
      windowQuery = temp;
    }
  }




  const init = () =>{
    generateProperQuery();
    generateStripes(windowQuery);
  }
  return init();
})();
