const randomStripes = (()=>{
  const stripeCount     = 50;
  let lastColorIndex    = 0;
  let currentColorIndex = 0;
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

  let generateStripes = (type) => {
    switch(type){
      case 'random':
        for(let str = 0; str < stripeCount; str++){
          var $div = $("<div>");
          $div.addClass('stripe ' + colors[nonConsectiveColors(getRandomNumber(colors.length - 1))] + ' _'+stripeCount);
          $div.css({
            'width':`calc(100%/${stripeCount})`,
            'z-index': (stripeCount - str)
          })
          $div.appendTo('#app');
        }
        break;
      default:
        for(let str = 0; str < stripeCount; str++){
          var $div = $("<div>");
          $div.addClass('stripe ' + colors[str%10] + ' _'+stripeCount);
          $div.css({
            'width':`calc(100%/${stripeCount})`,
            'z-index': (stripeCount - str)
          })
          $div.appendTo('#app');
        }
        break;
    }

  }







  const init = () =>{
    generateStripes('random');
  }
  return init();
})();
