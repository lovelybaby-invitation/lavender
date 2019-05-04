window.onload = function () {

  //상단 메뉴 이모지 컨트롤
  const main = document.getElementById('main');
  const profile = document.getElementById('profile');
  const photo = document.getElementById('photo');
  const location = document.getElementById('location');

  getTopFromEachElement();

  window.addEventListener('scroll', getTopFromEachElement);

  function getTopFromEachElement() {
    const mainTop = Math.abs(main.getBoundingClientRect().top);
    const profileTop = Math.abs(profile.getBoundingClientRect().top);
    const photoTop = Math.abs(photo.getBoundingClientRect().top);
    const locationTop = Math.abs(location.getBoundingClientRect().top);

    const minimum = Math.min(mainTop, profileTop, photoTop, locationTop);

    switch (minimum) {
      case mainTop: turnOnEmoji('main'); break;
      case profileTop: turnOnEmoji('profile'); break;
      case photoTop: turnOnEmoji('photo'); break;
      case locationTop: turnOnEmoji('location'); break;
    }
  }

  //다음 지도 api
  const container = document.getElementById('map');
  const options = {
    center: new daum.maps.LatLng(37.48696198627081, 127.03344609502346), //지도의 중심좌표.
	  level: 4 //지도의 레벨(확대, 축소 정도)
  };

  const map = new daum.maps.Map(container, options); //맵 생성

  const imageSrc = 'assets/img/marker.png', // 마커이미지의 주소입니다    
        imageSize = new daum.maps.Size(64, 69), // 마커이미지의 크기입니다
        imageOption = {offset: new daum.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        
  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  const markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption),
      markerPosition = new daum.maps.LatLng(37.48696198627081, 127.03344609502346); // 마커가 표시될 위치입니다

  // 마커를 생성합니다
  const marker = new daum.maps.Marker({
      position: markerPosition, 
      image: markerImage // 마커이미지 설정 
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map); 

  const iwContent = '<div style="padding:2px;">캠코양재타워 브라이드밸리</div>',
        iwPosition = new daum.maps.LatLng(37.48696198627081, 127.03344609502346); //인포윈도우 표시 위치입니다

  // 인포윈도우를 생성합니다
  const infowindow = new daum.maps.InfoWindow({
      position : iwPosition, 
      content : iwContent 
  });
    
  // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
  infowindow.open(map, marker); 

  // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
  const zoomControl = new daum.maps.ZoomControl();
  map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);

}

function turnOnEmoji(id) {
  const navs = document.querySelectorAll('.nav .nav-menu');
  for (let i = 0; i < navs.length; i++) {
    const nav = navs[i];
    if (nav.id === `nav-${id}`) {
      navs[i].classList.add('on');
    } else {
      navs[i].classList.remove('on');
    }
  }
}

// Get the modal
const modal = document.getElementById('myModal');
const modalImg = document.getElementById("img01");

// Get the image and insert it inside the modal - use its "alt" text as a caption
function imgPopUp(id) {
  let img = document.getElementById(id);
  modal.style.display = "flex";
  modalImg.src = img.src;
}

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}

const copyimg = document.getElementById('copy');
copyimg.onclick = function() {
  const address = "서울 강남구 강남대로 262 캠코양재타워 B1층";
  const el = document.createElement('textarea');
  el.value = address;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  alert("복사 완료! 조금 이따 봐요! :D ")
}