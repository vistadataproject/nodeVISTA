(function(exports) {
   function init() {
      // Let's open a web socket
      var ws = new WebSocket("ws://" + config.host + ":" + config.admin.port);

      ws.onopen = function()
      {
         // Web Socket is connected, send data using send()
         console.log("WebSocket: MVDM Event Handler is connected...");
      };

      ws.onmessage = function (event)
      {
         displayMvdmEvent(event.data);
      };

      ws.onclose = function()
      {
         // websocket is closed.
         console.log("WebSocket: MVDM Event Handler connection is closed...");
      };
   }

   function displayMvdmEvent(eventStr) {
      var event = JSON.parse(eventStr);

      var eventData = event.data;

      var tableRow = '<tr>';
      tableRow += '<td>'+ eventData.timestamp + '</td>';
      tableRow += '<td>'+ eventData.domain + '</td>';
      tableRow += '<td>'+ eventData.type + '</td>';
      tableRow += '<td>'+ eventData.userId + '</td>';
      tableRow += '<td>'+ eventData.facilityId + '</td>';
      tableRow += '</tr>';

      $('#mvdm-event-table tbody').append(tableRow);
   }

   exports.init = init;
})(this.mvdmEventListner = {});


