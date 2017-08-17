'use strict';

let Park = require('./data_loader');
let Templates = require('./templates');

let currentTime = new Date();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
let currentTotalMinutes = (hours*60) + minutes;

var Time = {
  loadOpenAttractions: function(){
    $('#accordion-wrapper').html('');
    Park.attractionsCall().then(function(data) {

      $(data).each((index, item)=>{
        if (item.times !== undefined) {
          let eachAttTimes = item.times;
          for (var i = 0; i < eachAttTimes.length; i++) {
            let newTime = eachAttTimes[i].replace(/\:/g, " ");
            let afternoonTimes = _.includes(newTime, "PM");
            let noonTimes = _.includes(newTime, "12");
            let afternoonMinutes = 0;
            let morningMinutes = 0;
            let theseMinutes;

            if (afternoonTimes) {

              newTime = newTime.replace(/\AM/g, "");
              newTime = newTime.replace(/\PM/g, "");

              let splitTime = newTime.split(" ");
              if (noonTimes) {
                splitTime[0] = Number(splitTime[0]*60);
                splitTime[1] = Number(splitTime[1]);

                let timeTotalMinutes = splitTime.reduce(function(sum, value){
                  return sum + value
                }, 0);
                afternoonMinutes = timeTotalMinutes;
              } else {
                splitTime[0] = Number(splitTime[0]*60 + 720);
                splitTime[1] = Number(splitTime[1]);

                let timeTotalMinutes = splitTime.reduce(function(sum, value){
                  return sum + value
                }, 0);
                afternoonMinutes = timeTotalMinutes;
              }

            } else {

              newTime = newTime.replace(/\AM/g, "");
              newTime = newTime.replace(/\PM/g, "");

              let splitTime = newTime.split(" ");
              splitTime[0] = Number(splitTime[0]*60);
              splitTime[1] = Number(splitTime[1]);

              let timeTotalMinutes = splitTime.reduce(function(sum, value){
                return sum + value
              }, 0);
              morningMinutes = timeTotalMinutes;
            }

            theseMinutes = afternoonMinutes + morningMinutes;

            if (theseMinutes - currentTotalMinutes <= 60 && theseMinutes - currentTotalMinutes > 0) {
              // *************************************
              // CALL THE WRITE T0 SIDEBAR FUNCTION
              // *************************************
              let accordion = `<div class="item" typeId=${item.type_id} areaId=${item.area_id}>
                               <a data-toggle="collapse" data-parent="#accordion-wrapper" href="#${item.id}" aria-expanded="true" aria-controls="${item.id}" class="attractionNameLink">${item.name}</a>
                               <p style="color:white">Starts in: ${theseMinutes - currentTotalMinutes} minutes</p>
                               <div id="${item.id}" class="collapse" role="tabpanel">
                                 <p class="areaNameDropDown"></p>
                                 <p class="mb-3">${item.description}</p>
                               </div>
                           </div>`;
              $('#accordion-wrapper').append(accordion);
            }
          }
        }
      })
      let currentEvents = $('.item');
      Time.addTypes(currentEvents);
      $("a.attractionNameLink").on("click", (e) => {
      let gridRow = $('.img-wrapper').find("img");
      $(gridRow).removeAttr('style');
        let accordionid = $(e.target).parent().attr("areaid");
         Park.areasCall().then(function(data) {
          let color = data[accordionid - 1].colorTheme;
          let imgwrap = $(".img-wrapper");
          imgwrap.each((index,item)=>{
            if(Number(item.id)===data[accordionid - 1].id){
              $(item).find('img').attr('style', `border: 3px solid #${color}`);
              let areaNamesss = $(item).children("a").html();
              let correctPTag = $(e.target).siblings("div").children(".areaNameDropDown").html(areaNamesss);
            }
          });
        });
      })
    })
  },

  addTypes: function(nowEvents){
    Park.attractionsTypeCall().then(function(data) {
      $(nowEvents).each((index, item) => {
        $(data).each((dataIndex, dataItem) => {
          if (Number($(item).attr("typeid")) === dataItem.id) {
            $(item).children("p").append(` | ${dataItem.name}`);
          }
        });
      });
    })
  }
};


module.exports = Time;
