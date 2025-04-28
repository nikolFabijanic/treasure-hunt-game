let map;
let markers = []; //array to store markers(checkpoints)

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 51.44083, lng: 5.47778 },  //center point of the map
    zoom: 17,
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false
  });

  x = navigator.geolocation;

  x.getCurrentPosition(success, failure);

  function success(position) {
    // latitude and longitude of user
    var myLat = position.coords.latitude;
    var myLong = position.coords.longitude;

    var coords = new google.maps.LatLng(myLat, myLong);

    map.setCenter({ lat: myLat, lng: myLong }); //centers map on the users location

    //marker for users location
    var marker = new google.maps.Marker({
      map: map,
      position: coords
    });

    //radius around the user
    const circle = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map,
      center: { lat: myLat, lng: myLong },
      radius: Math.sqrt(50) * 10
    });

    //array of markers
    const markerData = [
      [
        51.44300407605454,  //lat
        5.479514669719516,  //lng
        "img/ball.png",     //img url
        50,                 //width
        50,                 //height
      ],
      [
        51.44196146595439,
        5.4674849315745195,
        "img/shell.png",
        50,
        75,
      ],
      [
        51.44882190627606,
        5.490861430016141,
        "img/bucket.png",
        50,
        60
      ]
    ];

    var length = markerData.length;
    var pointsCount = 0; // variable to store points

    // displays markers on the map
    for (let i = 0; i < length; i++) {
      const currMarkerData = markerData[i];
      const marker = new google.maps.Marker({
        position: { lat: currMarkerData[0], lng: currMarkerData[1] },
        map,
        icon: {
          url: currMarkerData[2],
          scaledSize: new google.maps.Size(currMarkerData[3], currMarkerData[4])
        }
      });
      markers.push(marker);
      
      // when marker is clicked pointCount gets incremented by 100 and marker disappears
      marker.addListener('click', () => {
        var e = document.getElementsByClassName("points");
    
        e[0].style.display = 'block';
        setTimeout(() => {
          e[0].style.display = 'none';
          pointsCount += 100;
          document.getElementById('pointCount').innerHTML = pointsCount.toString();
          marker.setMap(null);
        }, 1000);
      });
    }
  }

  function failure() { }

  //overlay popup for instructions
  document.getElementById("Overlay").addEventListener("click", function () {
    var e = document.getElementsByClassName("modalbox");
    e[0].style.display = 'block';
  });
  document.getElementById("close").addEventListener("click", function () {
    var e = document.getElementsByClassName("modalbox");
    e[0].style.display = 'none';
  });
}

//overlay popup for redeeming a reward
document.getElementById("btn_redeem").addEventListener("click", function(){
  var e =document.getElementsByClassName("redeem");
  e[0].style.display = 'block';
    
});
document.getElementById("close").addEventListener("click", function(){
  var e =document.getElementsByClassName("redeem");
  e[0].style.display= 'none';
});

document.getElementById("not_now").addEventListener("click", function(){
  var e =document.getElementsByClassName("redeem");
  e[0].style.display= 'none';
});

//overlay popup for qr code
document.getElementById("btn_activate").addEventListener("click", function(){
  var e =document.getElementsByClassName("redeem");
  e[0].style.display= 'none';
  var qr_activate = document.getElementById("QR")
  qr_activate.style.display = 'block'
  
});
