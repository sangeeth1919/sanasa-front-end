app.filter("extractFirstLetter", function () {
   return function (string) {

      if (!string) return '?'

      return string.charAt(0)
   }
});

app.filter("formatDate", function () {
   return function (date) {
      if (!date) return '-'

      return moment().parseZone(date).format('YYYY MMM DD')
   }
});

app.filter("formatTime", function () {
   return function (date) {
      if (!date) return '-'

      return moment(new Date(date).toUTCString()).format('hh:mm A')
   }
});

app.filter("formatDateTime", function () {
   return function (date) {
      if (!date) return '-'

      return moment.parseZone(date).format('YYYY MMM DD hh:mm A')
   }
});

app.filter("lastUpdated", function () {
   return function (date) {
      if (!date) return '-'

      return moment(date).fromNow()
   }
});

app.filter("convertToTitleCase", function () {
   return function (string) {
      if (!string) return '-'
      
      const result = string.replace(/([A-Z])/g, " $1");

      return result.charAt(0).toUpperCase() + result.slice(1);
   }
});

app.filter("calculateTotal", function () {
   return function (array, attr, obj) {
      if(obj) {
         let tempArray = []

         for (const key in array) {
            if (Object.hasOwnProperty.call(array, key)) {
               const element = array[key];
               tempArray.push(element)
            }
         }

         array = tempArray
      }

      if (!Array.isArray(array)) return '-'
      
      let total = 0;

      for (let i = 0; i < array.length; i++) {
         const element = array[i];
         total += parseFloat(element[attr])   
      }

      return total;
   }
});