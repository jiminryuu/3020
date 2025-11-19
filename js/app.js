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

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {}).addTo(map);

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
            ${ev.date}${ev.time ? ' • ' + ev.time : ''}${ev.place ? ' • ' + ev.place : ''}
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

  // Static data for the little popularity chart
  const POPULAR_EVENTS_DATA = {
    everyone: [
      { key: 'runner',   name: '5k Run',        subtitle: 'Running Club',   count: 687 },
      { key: 'agri',     name: 'Agri Social',   subtitle: 'ASA',            count: 553 },
      { key: 'robotics', name: 'Robotics Meet',subtitle: 'UM Robotics',     count: 221 },
      { key: 'ieee',     name: 'IEEE Social',   subtitle: 'UMIEEE',         count: 97  },
    ],
    friends: [
      // smaller numbers + different order for "friends only"
      { key: 'robotics', name: 'Robotics Meet',subtitle: 'UM Robotics',     count: 42 },
      { key: 'agri',     name: 'Agri Social',   subtitle: 'ASA',            count: 31 },
      { key: 'runner',   name: '5k Run',        subtitle: 'Running Club',   count: 18 },
      { key: 'ieee',     name: 'IEEE Social',   subtitle: 'UMIEEE',         count: 12 },
    ]
  };

  function renderPopularEvents(mode = 'everyone') {
    const list = (POPULAR_EVENTS_DATA[mode] || POPULAR_EVENTS_DATA.everyone).slice();
    const $list = $('#popularEventsList');
    if (!$list.length) return;
  
    const max = list.reduce((m, e) => Math.max(m, e.count), 1);
    $list.empty();
  
    // sort by count so order changes when numbers change
    list.sort((a, b) => b.count - a.count).forEach((ev) => {
      // bars now between ~55% and ~95% of the row
      const width = 55 + (ev.count / max) * 40;
  
      const row = `
        <div class="group bg-slate-50/70 hover:bg-slate-100 transition rounded-lg px-3 py-2 space-y-2">
          <div class="flex items-center justify-between text-xs">
            <div class="font-semibold text-slate-800 truncate pr-4">
              ${ev.name}
            </div>
            <div class="text-[11px] text-slate-500 truncate text-right">
              ${ev.subtitle}
            </div>
          </div>
  
          <div class="flex items-center gap-2">
            <div class="flex-1 h-3.5 rounded-full bg-white/80 overflow-hidden">
              <div
                class="h-full rounded-full bg-gradient-to-r from-umGold to-umGoldDark group-hover:opacity-90 transition-all"
                style="width:${width}%">
              </div>
            </div>
            <div class="w-10 text-right text-xs font-semibold text-slate-600 group-hover:text-slate-900">
              ${ev.count}
            </div>
          </div>
        </div>
      `;
      $list.append(row);
    });
  }

  // initial render (everyone)
  renderPopularEvents('everyone');

  // change handler for the dropdown
  $(document).on('change', '#popularFilter', function () {
    renderPopularEvents(this.value);
  });


  // ---------- Simple Messages / Chat Popup ----------
  // In-memory fake threads just for prototype
  const MESSAGE_THREADS = {
    Sarah: [
      { from: "them", text: "Are you going to the Robotics Club event?" },
      { from: "me",   text: "I might, depends on my lab schedule 😅" },
    ],
    Chuka: [
      { from: "them", text: "Thanks for sharing the Runners photos!" },
      { from: "me",   text: "They turned out pretty nice tbh 🔥" },
    ],
  };

  let currentFriend = null;

  function renderMessageThread(friendName) {
    const $body = $("#messageThreadBody");
    $body.empty();

    const messages = MESSAGE_THREADS[friendName] || [];
    if (!messages.length) {
      $body.append(`
        <p class="text-xs text-slate-500 text-center mt-4">
          No messages yet. Say hi 👋
        </p>
      `);
      return;
    }

    messages.forEach((msg) => {
      const isMe = msg.from === "me";
      const alignment = isMe ? "justify-end" : "justify-start";
      const bubbleColor = isMe
        ? "bg-umGold text-umMaroon"
        : "bg-white text-slate-800 border border-slate-200";
      const radius = isMe
        ? "rounded-2xl rounded-br-sm"
        : "rounded-2xl rounded-bl-sm";

      $body.append(`
        <div class="flex ${alignment}">
          <div class="max-w-[75%] px-3 py-2 text-xs ${bubbleColor} ${radius} shadow-sm mb-1">
            ${msg.text}
          </div>
        </div>
      `);
    });

    // Scroll to bottom on open / new message
    $body.scrollTop($body[0].scrollHeight);
  }

  function openMessageModal(friendName) {
    currentFriend = friendName;
    $("#messageFriendName").text(friendName);
    renderMessageThread(friendName);
    $("#messageModal").removeClass("hidden");
  }

  function closeMessageModal() {
    $("#messageModal").addClass("hidden");
    currentFriend = null;
    $("#messageInput").val("");
  }

  // Click on a message card → open popup
  $(document).on("click", ".message-thread", function () {
    const friendName = $(this).data("friend");
    openMessageModal(friendName);
  });

  // Close button + click outside (overlay)
  $("#messageClose").on("click", closeMessageModal);
  $(document).on("click", "#messageModal", function (e) {
    if (e.target.id === "messageModal") {
      closeMessageModal();
    }
  });

  // Send message
  $("#messageSendBtn").on("click", function () {
    const text = ($("#messageInput").val() || "").trim();
    if (!text || !currentFriend) return;

    if (!MESSAGE_THREADS[currentFriend]) {
      MESSAGE_THREADS[currentFriend] = [];
    }
    MESSAGE_THREADS[currentFriend].push({ from: "me", text });

    $("#messageInput").val("");
    renderMessageThread(currentFriend);
  });

  // Press Enter to send (Shift+Enter = newline)
  $("#messageInput").on("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      $("#messageSendBtn").click();
    }
  });

  // ========================================================
  // ================= [ ACHIEVEMENTS PAGE ] =================
  // ========================================================
  // TODO: (Rodrigo) Implement achievements tracking / badges


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
