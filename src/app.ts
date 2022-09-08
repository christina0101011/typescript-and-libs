import axios from "axios";


const form = document.querySelector('form');
const address = document.getElementById('address') as HTMLInputElement;
const GOOGLE_KEY = 'AIzaSyAvWgg5DExqqtJbTACyth3qHxtFqyfej-4';

function searchHandler(event: Event) {
  event.preventDefault();
  const addedAddress = address.value;
  axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' 
    + encodeURI(addedAddress) + '&key=' + GOOGLE_KEY)
  .then(response => {
    const coordinates = response.data?.results[0].geometry.location;
    const map = new google.maps.Map(document.getElementById('map')!, {
      center: coordinates,
      zoom: 15
    });
    new google.maps.Marker({
      position: coordinates,
      map: map,
    }); 
  })
  .catch(err => console.log(err))
}

form?.addEventListener('submit', searchHandler);
