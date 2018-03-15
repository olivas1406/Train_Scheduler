
/*     
     '( 
    "' //}
   ( ''"
   _||__ ____ ____ ____
  (o)___)}___}}___}}___}
  'U'0 0  0 0  0 0  0 0  
*/


$(document).ready(function(){ 


  
  var config = {                                                            // Initialize Firebase
    apiKey: "AIzaSyBv2sCzhibbjk_F5ug6VkH-r9V9Y5n8s-M",
    authDomain: "choochoo-b7192.firebaseapp.com",
    databaseURL: "https://choochoo-b7192.firebaseio.com",
    projectId: "choochoo-b7192",
    storageBucket: "",
    messagingSenderId: "517666581796"
  };
  firebase.initializeApp(config);

  var dataRef = firebase.database();                                        // Use the Firebase DB service                                    

  $(".pushMe").on("click", function(event) {                                // When you push the 'Submit' button
    event.preventDefault();                                               // Stop the default action

    trainName = $(".input1").val().trim();                                // Store what is in input1 in var trainName
    dest = $(".input2").val().trim();                                     // Store what is in input2 in var dest
    firstTt = $(".input3").val().trim();                                  // Store what is in input3 in var firstTt
    freq = $(".input4").val().trim();                                     // Store what is in input4 in var freq

    console.log(trainName, dest, firstTt, freq);

    dataRef.ref().push({                                                  // Push this to Firebase
        name: trainName,                                                    // Push var TrainName to 'name'
        dest : dest,                                                        // Push var dest to 'dest'
        first: firstTt,                                                     // Push var firstTt to 'first'
        freq: freq,                                                         // Push var freq to 'freq'
        dateAdded: firebase.database.ServerValue.TIMESTAMP                  // Add a timestamp
      });
      resetForm();
    });

    function resetForm() {
        $(".formMe")[0].reset();
    }




});





