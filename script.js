// var mymap = document.getElementById('mapSection');

document.addEventListener('DOMContentLoaded', function () {
	mymap = document.getElementById('mapSection');
    information = document.getElementById('information');

    latitudeInp = document.getElementById('latitudeInp');
	longitudeInp = document.getElementById('longitudeInp');
	AccuracyInp = document.getElementById('AccuracyInp');
    TimeStampInp = document.getElementById('TimeStampInp');

    var mySpans = document.getElementsByTagName('span');

    // mySpans[0].addEventListener('click', () => {
    //     // mymap.classList.remove('displaynone');
    //     // mymap.classList.add('displayed');
    //     if (mymap.classList == 'displaynone' && information.classList == 'displaynone') {
    //         mymap.classList.remove('displaynone');
    //         mymap.classList.add('displayed');
    //     } else if (mymap.classList == 'displaynone' && information.classList == 'displayed') {
    //         information.classList.remove('displayed');
    //         information.classList.add('displaynone');
    //         mymap.classList.add('displayed');
    //         mymap.classList.remove('displaynone');
    //     }
    // })

//     mySpans[1].addEventListener('click', () => {
//         if (mymap.classList == 'displaynone' && information.classList == 'displaynone') {
//             information.classList.remove('displaynone');
//             information.classList.add('displayed');
//         } else if (mymap.classList == 'displayed' &&information.classList == 'displaynone') {
// 					information.classList.add('displayed');
// 					information.classList.remove('displaynone');
// 					mymap.classList.remove('displayed');
// 					mymap.classList.add('displaynone');
//         } else {

//                 }
//     });

    mySpans[0].addEventListener('click', () => {
        mymap.classList.remove('displaynone');
        information.classList.add('displaynone');
    })

    mySpans[1].addEventListener('click', () => {
        mymap.classList.add('displaynone');
        information.classList.remove('displaynone');
    });

});



function getLocation() {
	if (navigator.geolocation) {
		// alert('wow it works');
		mymap.classList.toggle('displaynone');
		navigator.geolocation.getCurrentPosition(getCurrentPosition, errorHandler);
	} else {
		mapSection.innerText = "your browser doesn't support geolocation";
	}
}

function getCurrentPosition(position) {
	// alert('alright');
	console.log(position.coords.accuracy);
	// mymap = document.getElementById('mapSection'); //Uncaught ReferenceError: mymap is not define at getCurrentPosition >>>> replace load with DOMContentLoaded now you have a global variable

	console.log(position);
	lat = position.coords.latitude;
	lon = position.coords.longitude;
	accuracy = position.coords.accuracy;
	timestamp = position.timestamp;
	mymap.innerText = lat + ' , ' + lon;

	// detailedInfo(lat, lon, accuracy, timestamp);

	latitudeInp.value = lat;
	longitudeInp.value = lon;
	AccuracyInp.value = accuracy;

	var date_ob = new Date(timestamp);
	console.log('date object : ' + date_ob);
	TimeStampInp.value = date_ob;

	// using google API

	//1- create a new google object with LatLng
	var myLocation = new google.maps.LatLng(lat, lon);

	//2- create object of my map specifications
	var mySpecs = { zoom: 20, center: myLocation };

	//3-receive image of the map from google
	var myImg = new Image();
	myImg.src = new google.maps.Map(mymap, mySpecs);

	//4-display image
	mymap.appendChild(myImg);
}

// function detailedInfo(lat, lon, acc, ts) {
//     latitudeInp.value = lat
//     longitudeInp.value = lon;
//     AccuracyInp.value = acc;

//     var date_ob = new Date(ts);
//     console.log('date object : '+date_ob)
//     TimeStampInp.value = date_ob;
// }

function errorHandler(error) {
	// alert('oops');
	switch (error.code) {
		case error.PERMISSION_DENIED:
			mymap.innerText = 'PERMISSION_DENIED';
			break;
		case error.POSITION_UNAVAILABLE:
			mymap.innerText = 'POSITION_UNAVAILABLE';
			break;
		case error.TIMEOUT:
			mymap.innerText = 'TIMEOUT';
			break;
		case error.UNKNOWN_ERROR:
			mymap.innerText = 'UNKNOWN_ERROR';
			break;
	}
}
