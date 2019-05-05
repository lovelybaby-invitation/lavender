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
    const src = `./assets/img/photo/thumb/${imageFileName}`;
    imageEl.src = src;
    imageEl.onclick = openImageModal;
    imageWrapperEl.appendChild(imageEl);
    imagesEl.appendChild(imageWrapperEl);
  });

  /**
   * 이미지 모달
   */
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-image");
  // 모달 열기
  function openImageModal(e) {
    modal.style.display = "flex";
    modalImg.src = e.target.src.replace('thumb', 'original');
  }
  // 모달 닫기
  const closeButton = document.getElementsByClassName("close")[0];
  closeButton.onclick = function () {
    modal.style.display = "none";
  };

  // 이미지 스와이프 이벤트
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

  /**
   * 지도
   */
  const map = new daum.maps.Map(
    document.getElementById("map"),
    {
      center: new daum.maps.LatLng(37.48696198627081, 127.03344609502346),
      level: 4 //지도의 레벨(확대, 축소 정도)
    }
  );
  map.setZoomable(false);
  map.setDraggable(false);

  new daum.maps.Marker({
    position: new daum.maps.LatLng(
      37.48696198627081,
      127.03344609502346
    ),
    image: new daum.maps.MarkerImage(
      "./assets/img/marker.png",
      new daum.maps.Size(64, 69),
      { offset: new daum.maps.Point(27, 69) }
    )
  }).setMap(map);
};
