getRandomId = function (idStorage, minValue, maxValue) {
         var id,
             min = minValue || 1,
             max = maxValue || 1000;
         do {
             id = Math.floor(Math.random() * (max - min + 1)) + min;
         } while (idStorage.indexOf(id) >= 0)
         return id;
}

