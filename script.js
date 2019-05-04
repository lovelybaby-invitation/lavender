window.onload = function () {
  // pane
  const pane = {
    main: document.getElementById("main"),
    profile: document.getElementById("profile"),
    photo: document.getElementById("photo"),
    location: document.getElementById("location")
  }

  const progressBarEl = document.querySelector('.progress');

  // nav에 클릭 이벤트 걸기
  const navMenuEl = document.querySelectorAll('.nav-menu');
  for (let i = 0; i < navMenuEl.length; i++) {
    const menuEl = navMenuEl[i];
    menuEl.onclick = () => {
      pane[menuEl.id.slice(4)].scrollIntoView({ behavior: 'smooth' });
    }
  }

  // 상단 메뉴 이모지 컨트롤
  getTopFromEachElement();
  window.addEventListener("scroll", getTopFromEachElement);
  function getTopFromEachElement() {
    const mainTop = Math.abs(pane.main.getBoundingClientRect().top);
    const profileTop = Math.abs(pane.profile.getBoundingClientRect().top);
    const photoTop = Math.abs(pane.photo.getBoundingClientRect().top);
    const locationTop = Math.abs(pane.location.getBoundingClientRect().top);

    const minimum = Math.min(mainTop, profileTop, photoTop, locationTop);

    switch (minimum) {
      case mainTop: turnOnEmoji("main"); break;
      case profileTop: turnOnEmoji("profile"); break;
      case photoTop: turnOnEmoji("photo"); break;
      case locationTop: turnOnEmoji("location"); break;
    }

    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = document.documentElement.clientHeight;
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    // alert(document.body.scrollTop);
    progressBarEl.style.width = `${scrollTop / (scrollHeight - windowHeight) * 100}%`;
  }

  function turnOnEmoji(id) {
    const navs = document.querySelectorAll(".nav .nav-menu");
    for (let i = 0; i < navs.length; i++) {
      const nav = navs[i];
      if (nav.id === `nav-${id}`) {
        navs[i].classList.add("on");
      } else {
        navs[i].classList.remove("on");
      }
    }
  }

  /**
   * 이미지
   */
  const images = [
    "001.jpg",
    "002.jpg",
    "003.jpg",
    "004.jpg",
    "005.jpg",
    "006.jpg"
  ];

  // 이미지 추가
  const imagesEl = document.querySelector(".images");
  images.forEach(imageFileName => {
    const imageWrapperEl = document.createElement("div");
    imageWrapperEl.className = "image-wrapper";
    const imageEl = document.createElement("img");
    const src = `assets/img/${imageFileName}`;
    imageEl.src = src;
    imageEl.onclick = openImageModal;
    imageWrapperEl.appendChild(imageEl);
    imagesEl.appendChild(imageWrapperEl);
  });

  // 이미지 클릭
  function openImageModal(e) {
    modal.style.display = "flex";
    modalImg.src = e.target.src;
  }

  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("img01");

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // 이미지 스와이프
  const hammer = new Hammer(imagesEl);
  hammer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL })
  hammer.on('swipeleft swiperight', (ev) => {
    let direction = 1;
    switch (ev.type) {
      case 'swiperight': direction = -1; break;
    }
    slide(direction);
  });

  // 화살표 이벤트
  document.querySelector('.arrow.left').addEventListener('click', () => slide(-1));
  document.querySelector('.arrow.right').addEventListener('click', () => slide(1));

  function slide(direction) {
    imagesEl.scrollBy({ left: window.innerWidth * direction, behavior: 'smooth' });
  }






  //다음 지도 api
  const container = document.getElementById("map");
  const options = {
    center: new daum.maps.LatLng(37.48696198627081, 127.03344609502346), //지도의 중심좌표.
    level: 4 //지도의 레벨(확대, 축소 정도)
  };

  const map = new daum.maps.Map(container, options); //맵 생성

  const imageSrc = "assets/img/marker.png", // 마커이미지의 주소입니다
    imageSize = new daum.maps.Size(64, 69), // 마커이미지의 크기입니다
    imageOption = { offset: new daum.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  const markerImage = new daum.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption
  ),
    markerPosition = new daum.maps.LatLng(
      37.48696198627081,
      127.03344609502346
    ); // 마커가 표시될 위치입니다

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
    position: iwPosition,
    content: iwContent
  });

  // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
  infowindow.open(map, marker);
  map.setZoomable(false);
  map.setDraggable(false);
};

