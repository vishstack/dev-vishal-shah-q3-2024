document.addEventListener('DOMContentLoaded', function() {
  var promoBannersContainer = document.getElementById('promo-banners');
  
  // Sample data, replace with data from schema
  var banners = [
    {
      backgroundColor: '#ffcc00',
      textColor: '#000',
      message: 'Your 15% off discount code WELCOME15 will auto-apply at checkout.',
      utmMedium: 'social',
      discountCode: 'WELCOME15',
      createdAt: '2024-07-11T10:00:00Z'
    },
    {
      backgroundColor: '#00ccff',
      textColor: '#fff',
      message: 'Special offer for newsletter subscribers!',
      utmMedium: 'newsletter',
      discountCode: 'NEWSLETTER10',
      createdAt: '2024-07-10T09:00:00Z'
    }
    // Add more banners as needed
  ];

  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  var utmMedium = getUrlParameter('utm_medium');
  var discountCode = getUrlParameter('discount');

  var matchedBanners = banners.filter(function(banner) {
    return banner.utmMedium === utmMedium || banner.discountCode === discountCode;
  });

  if (matchedBanners.length > 0) {
    // Sort matched banners by creation date to show the most recent one
    matchedBanners.sort(function(a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    var mostRecentBanner = matchedBanners[0];

    var promoBanner = document.createElement('div');
    promoBanner.style.backgroundColor = mostRecentBanner.backgroundColor;
    promoBanner.style.color = mostRecentBanner.textColor;
    promoBanner.innerHTML = `
      <p>${mostRecentBanner.message}</p>
      <button class="close-banner">Close</button>
    `;
    promoBannersContainer.appendChild(promoBanner);

    promoBanner.style.display = 'block';

    var closeButton = promoBanner.querySelector('.close-banner');
    closeButton.addEventListener('click', function() {
      promoBanner.style.display = 'none';
      localStorage.setItem(`promoBannerDismissed_${mostRecentBanner.createdAt}`, 'true');
    });

    if (localStorage.getItem(`promoBannerDismissed_${mostRecentBanner.createdAt}`) !== 'true') {
      promoBanner.style.display = 'block';
    }
  }
});