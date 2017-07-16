const randomStripes = (()=>{
  let lastColorIndexes = [0,0,0,0];
  let windowQuery      = {};
  const colors         = ['pink','red','orange','light-orange','yellow','lime','green','sky-blue','blue','dark-blue'];

  let getRandomNumber = (max) => { return Math.floor(Math.random() * (max+1)); }


  let nonConsectiveColors = (newIndex) => {
    if(lastColorIndexes[0] === newIndex || lastColorIndexes[1] === newIndex || lastColorIndexes[2] === newIndex || lastColorIndexes[3] === newIndex){
      return nonConsectiveColors(getRandomNumber(colors.length - 1))
    } else {
      lastColorIndexes[3] = lastColorIndexes[2];
      lastColorIndexes[2] = lastColorIndexes[1];
      lastColorIndexes[1] = lastColorIndexes[0];
      lastColorIndexes[0] = newIndex;
      return newIndex;
    }
  }

  let generateStripes= (query) => {
    let stripeCount  = (query && query.stripes && _.isNumber(parseInt(query.stripes,10))) ? parseInt(query.stripes,10) : 50;
    let updatedImage = (query && query.img && _.isString(query.img)) ? query.img : '';
    let noBackground = (query && query.background && _.isString(query.background)) ? query.background : '';

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
        lastColorIndexes = lastColorIndexes.map((index) => {return getRandomNumber(colors.length - 1); }); //start indexes as random
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

    if(noBackground.length && /false/.test(noBackground)){
      $.each($('.stripe'), function(index,elem){
        $(elem).css('background', $(elem).css('background').replace(/\".+\"/,'""'));
      });
    } else if(updatedImage.length){
      $.each($('.stripe'), function(index,elem){
        $(elem).css('background', $(elem).css('background').replace(/\".+\"/,'"'+updatedImage+'"'));
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
