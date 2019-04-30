window.onload = function () {
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
}
