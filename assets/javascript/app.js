
/*     
     '( 
    "' //}
   ( ''"
   _||__ ____ ____ ____
  (o)___)}___}}___}}___}
  'U'0 0  0 0  0 0  0 0  
*/


$(document).ready(function(){ 

    var config = {                                                              // Firebase info            
        apiKey: "AIzaSyBv2sCzhibbjk_F5ug6VkH-r9V9Y5n8s-M",
        authDomain: "choochoo-b7192.firebaseapp.com",
        databaseURL: "https://choochoo-b7192.firebaseio.com",
        projectId: "choochoo-b7192",
        storageBucket: "",
        messagingSenderId: "517666581796"
    };

    firebase.initializeApp(config);                                             // Initialize Firebase

    var dataRef = firebase.database();                                          // Use the Firebase DB service                                    

    var trainName = "";                                                         // Variable to hold the train name (input 1)
    var dest = "";                                                              // Variable to hold the destination (input 2)
    var firstTt = 0;                                                            // Variable to hold the first train time (input 3)
    var freq = 0;                                                               // Variable to hold the frequency (input 4)
    
    function resetForm() {                                                      // Function to clear the form
        $(".formMe")[0].reset();
    };

    $(".pushMe").on("click", function(event) {                                  // When you push the 'Submit' button
        event.preventDefault();                                                 // Stop the default action

        trainName = $(".input1").val().trim();                                  // Store what is in input 1 in var trainName
        dest = $(".input2").val().trim();                                       // Store what is in input 2 in var dest
        firstTt = $(".input4").val().trim();                                    // Store what is in input 3 in var firstTt
        freq = $(".input3").val().trim();                                       // Store what is in input 4 in var freq

        dataRef.ref().push({                                                    // Push to Firebase
            name: trainName,                                                    // Push var TrainName to 'name'
            dest : dest,                                                        // Push var dest to 'dest'
            first: firstTt,                                                     // Push var firstTt to 'first'
            freq: freq,                                                         // Push var freq to 'freq'
            dateAdded: firebase.database.ServerValue.TIMESTAMP                  // Add a timestamp
        });
    
        resetForm();                                                            // Call the resetForm function to clear the form
    });

    dataRef.ref().limitToLast(500).on('child_added', function(snapshot) {     // Pull the last entry from firebase
        
        var storedName = snapshot.val().name;

        var storedDest = snapshot.val().dest;

        var storedFirst = snapshot.val().first;

        var storedFreq = snapshot.val().freq;

        console.log(storedName);                                   // Show me the value for 'name' at the console
        console.log(storedDest);                                   // Show me the value for 'dest' at the console
        console.log(storedFirst);                                  // Show me the value for 'first' at the console
        console.log(storedFreq);                                   // Show me the value for 'freq' at the console
    
    //    var tFrequency = 3;

        // Time is 3:30 AM
      //  var firstTime = "03:30";
    
        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(storedFirst, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);
    
        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
    
        // Time apart (remainder)
        var tRemainder = diffTime % storedFreq;
        console.log("TIME APART  " + tRemainder);
    
        // Minute Until Train
        var tMinutesTillTrain = storedFreq - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
     





















   

      //  $(".currentTrain").append("<tr class='trainChild'><td>" + snapshot.val().name + "</td><td>" + snapshot.val().dest + "</td><td>"+ snapshot.val().freq + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
        $(".currentTrain").append("<tr class='trainChild'><td>" + snapshot.val().name + "</td><td>" + snapshot.val().dest + "</td><td>"+ snapshot.val().freq + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
        



///////////////////////////////  UPDATE README  /////////////////////////////////////////
///////////////////////////////  UPDATE README  /////////////////////////////////////////
///////////////////////////////  UPDATE README  /////////////////////////////////////////
///////////////////////////////  UPDATE README  /////////////////////////////////////////



        }, function(errorObject) {                                              // Error handling
            console.log("Errors handled: " + errorObject.code);                 // Show me errors at the console
    });    
});

///////////////////   the drop   /////////////////////






