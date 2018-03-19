/*     
     '( 
    "' //}
   ( ''"
   _||__ ____ ____ ____
  (o)___)}___}}___}}___}
  'U'0 0  0 0  0 0  0 0  
*/

$(document).ready(function(){ 

    var config = {                                                                  // Firebase info            
        apiKey: "AIzaSyBv2sCzhibbjk_F5ug6VkH-r9V9Y5n8s-M",
        authDomain: "choochoo-b7192.firebaseapp.com",
        databaseURL: "https://choochoo-b7192.firebaseio.com",
        projectId: "choochoo-b7192",
        storageBucket: "",
        messagingSenderId: "517666581796"
    };

    firebase.initializeApp(config);                                                 // Initialize Firebase

    var dataRef = firebase.database();                                              // Use the Firebase DB service                                    

    var trainName = "";                                                             // Variable to hold the train name (input 1)
    var dest = "";                                                                  // Variable to hold the destination (input 2)
    var firstTt = 0;                                                                // Variable to hold the first train time (input 3)
    var freq = 0;                                                                   // Variable to hold the frequency (input 4)
    
    function resetForm() {                                                          // Function to clear the form
        $(".formMe")[0].reset();
    };

    $(".pushMe").on("click", function(event) {                                      // When you push the 'Submit' button
        event.preventDefault();                                                     // Stop the default action

        trainName = $(".input1").val().trim();                                      // Store what is in input 1 in var trainName
        dest = $(".input2").val().trim();                                           // Store what is in input 2 in var dest
        firstTt = $(".input4").val().trim();                                        // Store what is in input 3 in var firstTt
        freq = $(".input3").val().trim();                                           // Store what is in input 4 in var freq

        dataRef.ref().push({                                                        // Push to Firebase
            name: trainName,                                                        // Push var TrainName to 'name'
            dest : dest,                                                            // Push var dest to 'dest'
            first: firstTt,                                                         // Push var firstTt to 'first'
            freq: freq,                                                             // Push var freq to 'freq'
            dateAdded: firebase.database.ServerValue.TIMESTAMP                      // Add a timestamp
        });
    
        resetForm();                                                                // Call the resetForm function to clear the form
    });

    dataRef.ref().limitToLast(500).on('child_added', function(snapshot) {           // Pull from firebase
        
        var storedName = snapshot.val().name;                                       // Pull stored Train Name from firebase
        var storedDest = snapshot.val().dest;                                       // Pull stored Destination from firebase
        var storedFirst = snapshot.val().first;                                     // Pull stored First Train Time from firebase
        var storedFreq = snapshot.val().freq;                                       // Pull stored Frequency from firebase
        
        var firstTimeConverted = moment(storedFirst, "HH:mm").subtract(1, "years"); // First time
        console.log(firstTimeConverted);                                            // Show me the value at the console
        
        var currentTime = moment();                                                 // Get the current time
        console.log("Current Time: " + moment(currentTime).format("hh:mm"));        // Show me the value at the console
        
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");        // Get the difference between the first time and the current time
        console.log("Time Difference: " + diffTime);                                // Show me the value at the console
    
        var tRemainder = diffTime % storedFreq;                                     // Get the remainder between var diffTime and var storedFreq to determine the time apart
        console.log("Time Apart: " + tRemainder);                                   // Show me the value at the console
            
        var tMinutesTillTrain = storedFreq - tRemainder;                            // Get the time between trains by subtracting var tRemainder from var storedFreq
        console.log("Minutes Until Next Train: " + tMinutesTillTrain);              // Show me the value at the console
    
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");                 // Figure out the minutes until the next train
        console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));
        
                                                                                    // Push to the HTML
        $(".currentTrain").append("<tr class='trainChild'><td>" + snapshot.val().name + "</td><td>" + snapshot.val().dest + "</td><td>"+ snapshot.val().freq + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
        
        }, function(errorObject) {                                              // Error handling
            console.log("Errors handled: " + errorObject.code);                 // Show me errors at the console
    });   
    
  //  setInterval(function(){
   //    $(".currentTrain").load("dataRef.ref");
   //  }, 5000)                                                      /* time in milliseconds (ie 2 seconds)*/


});


