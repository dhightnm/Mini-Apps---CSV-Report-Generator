$(document).ready((){

  $('form').on('submit', (event) => {
    event.preventDefault();
    var info = $('.text').val();
    var send = {
      text : info
    }
    $.ajax({
      url: 'http://127.0.0.1:8000/',
      type: 'POST',
      data: send,
      datatype: 'application/JSON',
      success: (data) => {
        console.log('Successful POST', data);
        $('.text').val('')
        handleData(data);
      },
      error: (err) => {
        console.log('Failed POST', err);
      }
    })
  });

  var handleData = (data) => {
    var items = Object.keys(data);
    for (let i = 0; i < items.length; i++){
      for (let j = 0; j < items.length; j++) {
        $(`.${items[i]}`).append(`<div>${data[items[i]][j]}</div>`);

      }
    }
    $('.csv').val('firstName, lastName, country, city, role, sales\n' + data.csv);
  }











});