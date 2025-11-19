// ==========================================================
//  U of M Events Prototype — Frontend Only (no backend)
//  Runs by double-clicking index.html in Chrome
// ==========================================================

$(function () {

  // ========================================================
  // =============== [ GLOBAL CONSTANTS / THEME ] ============
  // ========================================================
  const UM_CENTER = [49.80904997497455, -97.13507647198949];
  const MAP_BOUNDS = [
    [49.8035383838543, -97.14326909388527], // SW
    [49.814699396910946, -97.12366396101163] // NE
  ];
  const PLACEHOLDER_IMG =
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop";


  // ========================================================
  // ================== [ GLOBAL DATA STATE ] ================
  // ========================================================
  const allEvents = [
    // ---- EVENTS ----
    {
      id: 1,
      type: "event",
      name: "Computer Science Club Meetup",
      date: "Nov 15, 2025",
      time: "6:00 PM – 8:00 PM",
      place: "EITC Atrium",
      category: "Social",
      price: 0,
      lat: 49.80822604584501,
      lng: -97.13444651096358,
      image: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=1200&auto=format&fit=crop",
      description: "Lightning talks, networking, and pizza for CS students."
    },
    {
      id: 2,
      type: "event",
      name: "U of M Career Fair",
      date: "Nov 20, 2025",
      time: "6:00 PM – 8:00 PM",
      place: "UMSU University Centre",
      category: "Jobs",
      price: 0,
      lat: 49.809108826518546,
      lng: -97.13425395814758,
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&auto=format&fit=crop",
      description: "Employers recruiting for internships and entry positions."
    },
    {
      id: 3,
      type: "event",
      name: "Science Faculty Coffee Chat",
      date: "Nov 25, 2025",
      time: "6:00 PM – 8:00 PM",
      place: "Armes Building Lobby",
      category: "By Faculty",
      price: 0,
      lat: 49.81098511470793,
      lng: -97.13382960431287,
      image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop",
      description: "Casual meet-and-greet with Science faculty and students."
    },
    {
      id: 4,
      type: "event",
      name: "Campus Fun Run 5K",
      date: "Nov 30, 2025",
      time: "6:00 PM – 8:00 PM",
      place: "Main Quad",
      category: "Fun",
      price: 10,
      lat: 49.80876956369388,
      lng: -97.13203300087609,
      image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop",
      description: "Join a friendly 5K around Fort Garry campus. All levels welcome."
    },
    {
      id: 5,
      type: "event",
      name: "Engineering Project Showcase",
      date: "Dec 3, 2025",
      time: "6:00 PM – 8:00 PM",
      place: "Engineering Building",
      category: "By Faculty",
      price: 0,
      lat: 49.80833336513949,
      lng: -97.13357218053686,
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
      description: "Student projects and demos from various engineering teams."
    },
    {
      id: 6,
      type: "event",
      name: "Resume & LinkedIn Workshop",
      date: "Dec 6, 2025",
      time: "6:00 PM – 8:00 PM",
      place: "Dafoe Library - 2nd Floor Study Area",
      category: "Co-op",
      price: 0,
      lat: 49.81018198918353,
      lng: -97.13142145152993,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
      description: "Hands-on polishing session for co-op applications."
    },
    {
      id: 7,
      type: "event",
      name: "Tech Job Fair: Startup Edition",
      date: "Dec 10, 2025",
      time: "6:00 PM – 8:00 PM",
      place: "University Centre 202",
      category: "Jobs",
      price: 0,
      lat: 49.80937538849832,
      lng: -97.13443600975893,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
      description: "Meet local startups hiring interns and new grads."
    },
    {
      id: 8,
      type: "event",
      name: "Student Art Showcase",
      date: "Dec 12, 2025",
      time: "6:00 PM – 8:00 PM",
      place: "ART Lab",
      category: "Fun",
      price: 5,
      lat: 49.80760289685259,
      lng: -97.13200775285695,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1200&auto=format&fit=crop",
      description: "Annual gallery featuring multidisciplinary student work."
    },

    // ---- LANDMARKS ----
    {
      id: 101,
      type: "landmark",
      name: "EITC Building",
      place: "EITC",
      category: "Landmark",
      lat: 49.808440684196036,
      lng: -97.13404569108376,
      description: "Engineering and Information Technology Centre."
    },
    {
      id: 102,
      type: "landmark",
      name: "University Centre (UMSU)",
      place: "UMSU",
      category: "Landmark",
      lat: 49.80853069354384,
      lng: -97.13386318990044,
      description: "Student union and event hub."
    }
  ];

  // ========================================================
  // ================= [ GLOBAL STATE HANDLERS ] =============
  // ========================================================
  let map;

  // for home page
  let markers = [];
  const markerById = Object.create(null);
  let registered = new Set(JSON.parse(localStorage.getItem('registeredEventIds') || '[]'));
  function saveRegistered() {
    localStorage.setItem('registeredEventIds', JSON.stringify([...registered]));
  }
  ////


  // ========================================================
  // ======================= [ INIT ] ========================
  // ========================================================
  initNav();
  initMap();

  map.whenReady(() => {
    map.invalidateSize();
    addMarkers(allEvents);
    renderLegend();
  });

  renderAll(allEvents);
  bindUI();
  renderRegistered();


  // ========================================================
  // ===================== [ NAVIGATION ] ====================
  // ========================================================
  function initNav() {
    showSection('home-page');
    $('.page-link[data-target="home-page"]').addClass('ring-2 ring-umGold');
  }

  function showSection(id) {
    $('.page-section').addClass('hidden');
    $('#' + id).removeClass('hidden');

    // Reset all button states
    $('.page-link').removeClass('active ring-2 ring-umGold scale-[1.03]');

    // Highlight the current one
    const $btn = $(`.page-link[data-target="${id}"]`);
    $btn.addClass('active ring-2 ring-umGold scale-[1.03]');

    if (id === 'home-page' && map) {
      setTimeout(() => map.invalidateSize(), 100);
    }
  }



  // ========================================================
  // ====================== [ HOME PAGE ] ====================
  // ========================================================

  // ---------- Map ----------
  function initMap() {
    map = L.map('map', {
      center: UM_CENTER,
      zoom: 16,
      minZoom: 15,
      maxZoom: 18,
      maxBounds: MAP_BOUNDS
    });

    L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {}).addTo(map);

    // Click to log coordinates (for debugging)
    map.on('click', (e) => {
      console.log(`Clicked at Latitude: ${e.latlng.lat}, Longitude: ${e.latlng.lng}`);
    });
  }

  function clearMarkers() {
    markers.forEach((m) => map.removeLayer(m));
    markers = [];
    for (const k in markerById) delete markerById[k];
  }

  function addMarkers(events) {
    clearMarkers();

    events.forEach((ev) => {
      if (!ev.lat || !ev.lng) return;

      const icon = L.icon({
        iconUrl:
          ev.type === 'landmark'
            ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png'
            : 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      const popup = `
        <div style="min-width:220px">
          <div style="font-weight:600;margin-bottom:4px">${ev.name}</div>
          <div style="font-size:13px;color:#64748b">
            ${ev.date ? ev.date : ''}${ev.time ? ' • ' + ev.time : ''}${ev.place ? ' • ' + ev.place : ''}
          </div>
          <div style="margin-top:6px;font-size:13px;color:#334155">${ev.description || ''}</div>
          ${ev.type === 'event'
          ? `<div style="margin-top:8px;text-align:right">
               <button class="more-info-btn"
                 data-id="${ev.id}"
                 style="padding:6px 10px;background:#FFD100;color:#7A0019;border-radius:8px;border:none;cursor:pointer;font-weight:600">
                 More info
               </button>
             </div>`
          : ``}
        </div>
      `;

      const marker = L.marker([ev.lat, ev.lng], { icon }).addTo(map);
      marker.bindPopup(popup);
      markers.push(marker);
      markerById[ev.id] = marker;
    });
  }
  function renderLegend() {
    const $box = $('#legendBox').empty();

    // Marker icons matching Leaflet defaults
    const eventIcon = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
    const landmarkIcon = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png";

    // Basic marker legend
    const legendItems = [
      { label: "Event", icon: eventIcon },
      { label: "Landmark", icon: landmarkIcon }
    ];

    // Render all items
    legendItems.forEach(item => {
      if (item.icon) {
        $box.append(`
        <div class="flex items-center gap-2">
          <img src="${item.icon}" class="w-4 h-6" />
          <span>${item.label}</span>
        </div>
      `);
      } else if (item.color) {
        $box.append(`
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full" style="background:${item.color}"></div>
          <span>${item.label}</span>
        </div>
      `);
      }
    });
  }

  // ---------- Map ----------


  // ---------- Rendering ----------
  function renderAll(list) {
    renderCarousel(list.filter((e) => e.type === 'event'));
    addMarkers(list);
  }

  function renderCarousel(events) {
    const $wrap = $('#eventCarousel').empty();
    events.forEach((ev) => {
      const img = ev.image && ev.image.trim() ? ev.image : PLACEHOLDER_IMG;
      const $card = $(`
        <div class="min-w-[260px] w-full h-[33vh] bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden flex flex-col"
             data-id="${ev.id}">
          <img src="${img}" class="w-full h-[50%] object-cover rounded-t-xl flex-shrink-0" alt="">
          <div class="p-3 flex flex-col justify-between flex-1 overflow-hidden">
            <div class="flex items-start justify-between gap-2">
              <div class="overflow-hidden">
                <div class="font-semibold text-slate-800 text-base truncate">${ev.name}</div>
                <div class="text-sm text-slate-500 leading-tight">${ev.date}${ev.time ? ` • ${ev.time}` : ''} • ${ev.place}</div>
              </div>
              <div class="text-umMaroon font-bold text-sm">$${ev.price}</div>
            </div>
          </div>
        </div>
      `);
      $wrap.append($card);
    });
  }


  // ---------- Registered Events ----------
  function renderRegistered() {
    const $list = $('#registeredList').empty();
    const items = [...registered]
      .map((id) => allEvents.find((e) => e.id == id))
      .filter(Boolean);

    if (!items.length) {
      $('#registeredEmpty').removeClass('hidden');
      return;
    }

    $('#registeredEmpty').addClass('hidden');
    items.forEach((ev) => {
      const $li = $(`
        <li class="w-full flex flex-col gap-2 border border-slate-200 rounded-lg p-4 mb-3 bg-white shadow-md hover:shadow-lg transition-all">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div class="flex-1 min-w-[60%] overflow-hidden">
              <div class="font-semibold text-slate-800 text-sm sm:text-base">${ev.name}</div>
              <div class="text-xs text-slate-500 mt-0.5">
                ${ev.date}${ev.time ? ` • ${ev.time}` : ''} • ${ev.place}
              </div>
            </div>
            <button class="more-info-btn flex items-center bg-slate-100 hover:bg-slate-200 rounded-md px-3 py-1 text-xs font-medium transition-all flex-shrink-0" data-id="${ev.id}" >
              More Info
            </button>
            <button class="btn-unreg text-umMaroon text-xs font-semibold hover:underline self-start mt-1" data-id="${ev.id}">
              Unregister
            </button>
          </div>
        </li>
      `);
      $list.append($li);
    });
  }


  // ---------- Filters & Search ----------
  function getActiveFilters() {
    const cats = $('.filter:checked').map(function () {
      return $(this).val();
    }).get();
    const q = ($('#searchBar').val() || '').trim().toLowerCase();
    return { cats, q };
  }

  function applyFilters() {
    const { cats, q } = getActiveFilters();
    let list = allEvents.slice();

    if (cats.length)
      list = list.filter((e) => e.type === 'landmark' || cats.includes(e.category));

    if (q) {
      const match = (s) => (s || '').toLowerCase().includes(q);
      list = list.filter(
        (e) => match(e.name) || match(e.place) || match(e.description)
      );
    }

    renderAll(list);
  }


  // ---------- Modal ----------
  function openModal(evId) {
    const ev = allEvents.find((x) => x.id == evId);
    if (!ev) return;

    $('#modalTitle').text(ev.name);
    $('#modalMeta').text(
      `${ev.category} • ${ev.place} • ${ev.date}${ev.time ? ` • ${ev.time}` : ''}${ev.price !== undefined ? ` • $${ev.price}` : ''}`
    );
    $('#modalDesc').text(ev.description || '');
    const img = ev.image && ev.image.trim() ? ev.image : PLACEHOLDER_IMG;
    $('#modalImage').attr('src', img);

    // ensure normal event buttons are visible
    $('#modalRegister').removeClass('hidden');
    $('#modalCenter').removeClass('hidden');

    $('#eventModal').removeClass('hidden');
    $('body').addClass('modal-open');

    const mk = markerById[evId];
    if (mk) {
      map.setView(mk.getLatLng(), 17);
      mk.openPopup();
    }

    $('#modalRegister').data('id', evId);
    $('#modalCenter').data('id', evId);
  }

  function closeModal() {
    $('#eventModal').addClass('hidden');
    $('body').removeClass('modal-open');
  }

  function showToast(msg = "Registered! See you there 🎉") {
    const $t = $('#toast');
    $t.text(msg).removeClass('hidden');
    setTimeout(() => $t.addClass('hidden'), 1800);
  }

  // ========================================================
  // ==================== [ SOCIAL PAGE ] ====================
  // ========================================================
  // TODO: (Youssof) Implement social features here
  // Placeholder for future event feeds, post creation, etc.


  // ========================================================
  // ================= [ ACHIEVEMENTS PAGE ] =================
  // ========================================================
  // TODO: (Rodrigo) Implement achievements tracking / badges

  // Use the same event modal to show details for the "Best Attendee" reward
  function openBestAttendeeDetails() {
    const title = "Best Attendee";
    const meta = "Achievement • Earned by attending lots of different events on campus";
    const desc =
      "Level up this badge by going to more events across different categories. " +
      "Tip: mix morning, evening, academic, and fun events to climb faster.";

    $('#modalTitle').text(title);
    $('#modalMeta').text(meta);
    $('#modalDesc').text(desc);
    $('#modalImage').attr('src', PLACEHOLDER_IMG);

    // hide event-specific buttons for the reward view
    $('#modalRegister').addClass('hidden');
    $('#modalCenter').addClass('hidden');

    $('#eventModal').removeClass('hidden');
    $('body').addClass('modal-open');
  }


  // ========================================================
  // ==================== [ CREATE PAGE ] ====================
  // ========================================================
  // TODO: (Will) Implement event creation form / preview logic
  // ========================================================
  // ==================== [ CREATE PAGE ] ====================
  // ========================================================
  (function initCreatePage() {
    let createMap;
    let createMarker;

    function initCreateMap() {
      createMap = L.map('createMap', {
        center: UM_CENTER,
        zoom: 16,
        minZoom: 15,
        maxZoom: 18,
        maxBounds: MAP_BOUNDS
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {}).addTo(createMap);

      // Allow user to click to place marker
      createMap.on('click', function (e) {
        const { lat, lng } = e.latlng;
        if (createMarker) {
          createMap.removeLayer(createMarker);
        }
        createMarker = L.marker([lat, lng]).addTo(createMap);
        $('#eventLat').val(lat.toFixed(6));
        $('#eventLng').val(lng.toFixed(6));
      });
    }

    // Initialize map once the section becomes visible
    $(document).on('click', '[data-target="create-page"]', function () {
      setTimeout(() => {
        if (!createMap) initCreateMap();
        setTimeout(() => createMap.invalidateSize(), 100);
      }, 200);
    });

    // Collect form data
    function collectEventData() {
      return {
        name: $('#eventName').val(),
        date: $('#eventDate').val(),
        time: $('#eventTime').val(),
        place: $('#eventPlace').val(),
        category: $('#eventCategory').val(),
        price: Number($('#eventPrice').val()),
        image: $('#eventImage').val(),
        description: $('#eventDesc').val(),
        lat: parseFloat($('#eventLat').val()),
        lng: parseFloat($('#eventLng').val()),
        type: 'event',
      };
    }

    // Render card preview (same as carousel)
    function renderPreview(ev) {
      if (!ev.name) {
        $('#previewCard').html('<p class="italic text-slate-500">Enter event info and click Preview.</p>');
        return;
      }
      const img = ev.image || PLACEHOLDER_IMG;
      $('#previewCard').html(`
      <div class="min-w-[260px] w-full h-[33vh] bg-white rounded-xl shadow overflow-hidden flex flex-col">
        <img src="${img}" class="w-full h-[50%] object-cover rounded-t-xl" alt="">
        <div class="p-3 flex flex-col justify-between flex-1 overflow-hidden">
          <div class="flex items-start justify-between gap-2">
            <div class="overflow-hidden text-left">
              <div class="font-semibold text-slate-800 text-base truncate">${ev.name}</div>
              <div class="text-sm text-slate-500 leading-tight">${ev.date} • ${ev.time} • ${ev.place}</div>
            </div>
            <div class="text-umMaroon font-bold text-sm">$${ev.price}</div>
          </div>
          <p class="text-slate-600 text-sm mt-2 line-clamp-2">${ev.description}</p>
        </div>
      </div>
    `);
    }

    // Preview button
    $('#previewEventBtn').on('click', function () {
      const data = collectEventData();
      renderPreview(data);
    });

    // Submit handler
    $('#createEventForm').on('submit', function (e) {
      e.preventDefault();
      const data = collectEventData();

      if (!data.lat || !data.lng) {
        alert('Please click on the map to set a location.');
        return;
      }

      data.id = Date.now(); // unique ID
      allEvents.push(data);
      renderAll(allEvents);
      showToast('Event Created!');
      $('#createEventForm')[0].reset();
      $('#previewCard').html('<p class="italic text-slate-500">Event added successfully!</p>');
      if (createMarker) {
        createMap.removeLayer(createMarker);
        createMarker = null;
      }
    });
  })();

  // ========================================================
  // =================== [ PROFILE PAGE ] ====================
  // ========================================================
  // TODO: (Vassilly) Implement profile data rendering / editing



  // ---------- UI Bindings FOR ALL TO MODIFY----------
  function bindUI() {
    // Navigation
    $(document).on('click', '.page-link', function () {
      showSection($(this).data('target'));
    });

    // Filters / Search
    $(document).on('change', '.filter', applyFilters);
    $('#searchBar').on('input', applyFilters);

    // Carousel
    $('#nextBtn').click(() => $('#eventCarousel').animate({ scrollLeft: '+=320' }, 260));
    $('#prevBtn').click(() => $('#eventCarousel').animate({ scrollLeft: '-=320' }, 260));

    // Event Cards
    $(document).on('click', '#eventCarousel [data-id]', function () {
      openModal($(this).data('id'));
    });

    // Popup "More Info"
    $(document).on('click', '.more-info-btn', function () {
      openModal($(this).data('id'));
    });

    // Modal Controls
    $('#modalClose').click(closeModal);
    $(document).on('click', '#eventModal', function (e) {
      if (e.target.id === 'eventModal') closeModal();
    });

    // Reward info button (Achievements page)
    $(document).on('click', '.reward-info-btn', function () {
      openBestAttendeeDetails();
    });

    // Modal Actions
    $('#modalRegister').click(function () {
      const id = Number($(this).data('id'));
      if (!registered.has(id)) {
        registered.add(id);
        saveRegistered();
        renderRegistered();
        showToast("Registered! See you there 🎉");
      } else {
        showToast("Already registered.");
      }
      closeModal();
    });

    // Sidebar "Unregister"
    $(document).on('click', '.btn-unreg', function () {
      const id = Number($(this).data('id'));
      if (registered.has(id)) {
        registered.delete(id);
        saveRegistered();
        renderRegistered();
        showToast("Unregistered.");
      }
    });

    // Registered List → Modal
    $(document).on('click', '.btn-moreinfo', function () {
      openModal(Number($(this).data('id')));
    });

    // Center on Map
    $('#modalCenter').click(function () {
      const id = $(this).data('id');

      // Always close modal first to avoid overlaying the map
      closeModal();

      // If not on Home, switch to Home first, then focus map
      if (!$('#home-page').is(':visible')) {
        showSection('home-page');

        // Small delay so the map DOM is visible before centering
        setTimeout(() => centerOnMap(id), 250);
      } else {
        centerOnMap(id);
      }
    });

    // Helper: center map on a given event marker safely
    function centerOnMap(id) {
      const mk = markerById[id];
      if (mk && map) {
        map.setView(mk.getLatLng(), 17);
        mk.openPopup();
      } else {
        console.warn("Marker not found for ID:", id);
      }
    }

  }


});
