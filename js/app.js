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
  let allEvents = [
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
    // ---- MORE EVENTS WITH OFFSET COORDS ----
    {
      id: 9,
      type: "event",
      name: "Late-Night Study Jam",
      date: "Dec 14, 2025",
      time: "7:00 PM – 11:00 PM",
      place: "Dafoe Library – Main Floor",
      category: "Study",
      price: 0,
      lat: 49.8102931969276,
      lng: -97.13194199851485,
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop",
      description: "Coffee, snacks, quiet study zones, and peer supports for finals week."
    },
    {
      id: 11,
      type: "event",
      name: "Law Faculty Mixer",
      date: "Jan 10, 2026",
      time: "4:00 PM – 6:00 PM",
      place: "Robson Hall Atrium",
      category: "By Faculty",
      price: 0,
      lat: 49.811767633934465,
      lng: -97.13067261752954,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
      description: "Meet law faculty, network with upper-years, and learn about moot programs."
    },
    {
      id: 12,
      type: "event",
      name: "St. John’s College Holiday Dinner",
      date: "Dec 18, 2025",
      time: "6:00 PM – 9:00 PM",
      place: "St. John’s College Dining Hall",
      category: "Social",
      price: 15,
      lat: 49.81070405193883,    // +0.00020 north
      lng: -97.13650326517274,   // +0.00030 east
      image: "https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=1200&auto=format&fit=crop",
      description: "Festive dinner, raffle prizes, and a photo booth."
    },
    {
      id: 13,
      type: "event",
      name: "Campus Nature Walk",
      date: "Jan 5, 2026",
      time: "2:00 PM – 3:30 PM",
      place: "Red River Passage",
      category: "Fun",
      price: 0,
      lat: 49.80638511205691,
      lng: -97.1344229473885,
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
      description: "Guided nature walk exploring riverside trails and campus wildlife."
    },
    {
      id: 14,
      type: "event",
      name: "Science Lab Safety Workshop",
      date: "Jan 12, 2026",
      time: "1:00 PM – 3:00 PM",
      place: "Buller Building – Room 316",
      category: "Academic",
      price: 0,
      lat: 49.81068005596369,   // +0.00020 north
      lng: -97.1331811892718,   // +0.00030 east
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=1200&auto=format&fit=crop",
      description: "Mandatory training for new lab students and research assistants."
    },
    {
      id: 16,
      type: "event",
      name: "Education Faculty Book Swap",
      date: "Jan 22, 2026",
      time: "12:00 PM – 3:00 PM",
      place: "Education Building Lobby",
      category: "Fun",
      price: 0,
      lat: 49.80855924544929,    // +0.00030 north
      lng: -97.1366558846671,    // +0.00030 east
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
      description: "Swap textbooks, teaching resources, and classroom materials."
    },
    {
      id: 17,
      type: "event",
      name: "UMSU Winter Kickoff Concert",
      date: "Jan 25, 2026",
      time: "7:00 PM – 11:00 PM",
      place: "University Centre – Main Stage",
      category: "Social",
      price: 20,
      lat: 49.80964798942664,    // +0.00030 north
      lng: -97.13487313796218,   // +0.00030 east
      image: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?q=80&w=1200&auto=format&fit=crop",
      description: "Live bands, student DJs, and food stalls to kick off the semester."
    },
    {
      id: 18,
      type: "event",
      name: "Bison Athletics Fan Night",
      date: "Jan 29, 2026",
      time: "5:00 PM – 9:00 PM",
      place: "Investors Group Athletic Centre",
      category: "Athletics",
      price: 5,
      lat: 49.809370962072546,   // +0.00030 north
      lng: -97.13939121295969,   // +0.00030 east
      image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?q=80&w=1200&auto=format&fit=crop",
      description: "Cheer on the Bisons with giveaways, snacks, and halftime competitions."
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
    },
    // ---- LANDMARKS (FORT GARRY CAMPUS) ----
    {
      id: 202, type: "landmark",
      name: "Parker Building",
      place: "Parker Building",
      category: "Landmark",
      lat: "49.81129414840812", lng: "-97.13458337437977",
      description: "Physics and astronomy facilities."
    },
    {
      id: 203, type: "landmark",
      name: "Allen Physics Building",
      place: "Allen Physics Building",
      category: "Landmark",
      lat: "49.810694482530835", lng: "-97.13462933886967",
      description: "Physics research and teaching spaces."
    },
    {
      id: 204, type: "landmark",
      name: "Biological Sciences Building",
      place: "Biological Sciences Building",
      category: "Landmark",
      lat: "49.81020318554697", lng: "-97.13478394513517",
      description: "Biology teaching and research building."
    },
    {
      id: 205, type: "landmark",
      name: "Buller Biological Building",
      place: "Buller Building",
      category: "Landmark",
      lat: "49.81048005596369", lng: "-97.1334811892718",
      description: "Legacy biological sciences facility."
    },
    {
      id: 206, type: "landmark",
      name: "Machray Hall",
      place: "Machray Hall",
      category: "Landmark",
      lat: "49.81126226209069", lng: "-97.13324613971542",
      description: "Large academic building for multiple departments."
    },
    {
      id: 207, type: "landmark",
      name: "Duff Roblin Building",
      place: "Duff Roblin Building",
      category: "Landmark",
      lat: "49.811092681889036", lng: "-97.13231330218365",
      description: "Science and research building."
    },
    {
      id: 208, type: "landmark",
      name: "Human Ecology Building",
      place: "Human Ecology Building",
      category: "Landmark",
      lat: "49.81080889328371", lng: "-97.1320238008807",
      description: "Human ecology programs and research."
    },
    {
      id: 210, type: "landmark",
      name: "Elizabeth Dafoe Library",
      place: "Dafoe Library",
      category: "Landmark",
      lat: "49.81027551547644", lng: "-97.13165668039157",
      description: "Primary academic library at Fort Garry campus."
    },
    {
      id: 211, type: "landmark",
      name: "Fletcher Argue Building",
      place: "Fletcher Argue",
      category: "Landmark",
      lat: "49.80972177071916", lng: "-97.1312706786543",
      description: "Arts and humanities academic building."
    },
    {
      id: 212, type: "landmark",
      name: "Tier Building",
      place: "Tier Building",
      category: "Landmark",
      lat: "49.80920955117838", lng: "-97.13094901053992",
      description: "Large lecture theatre complex."
    },
    {
      id: 213, type: "landmark",
      name: "Isbister Building",
      place: "Isbister Building",
      category: "Landmark",
      lat: "49.809382598926824", lng: "-97.13042361928638",
      description: "Classrooms and offices for arts faculty."
    },
    {
      id: 215, type: "landmark",
      name: "University Centre",
      place: "University Centre",
      category: "Landmark",
      lat: "49.80934798942664", lng: "-97.13457313796218",
      description: "Campus hub with food, study space, and UMSU."
    },

    // Region 2 — North Campus (Colleges Zone)
    {
      id: 217, type: "landmark",
      name: "Robson Hall",
      place: "Robson Hall",
      category: "Landmark",
      lat: "49.81191594713587", lng: "-97.13050939745023",
      description: "Faculty of Law."
    },
    {
      id: 218, type: "landmark",
      name: "Chancellor’s Hall",
      place: "Chancellor’s Hall",
      category: "Landmark",
      lat: "49.81159075247775", lng: "-97.13296469234089",
      description: "Graduate student residence and offices."
    },
    {
      id: 219, type: "landmark",
      name: "University College",
      place: "University College",
      category: "Landmark",
      lat: "49.81139002618991", lng: "-97.13137779630983",
      description: "College with residences and study spaces."
    },
    {
      id: 221, type: "landmark",
      name: "St. Paul’s College",
      place: "St. Paul’s College",
      category: "Landmark",
      lat: "49.810026449716446", lng: "-97.13750021275398",
      description: "Catholic college with classrooms and dining."
    },
    {
      id: 222, type: "landmark",
      name: "St. John’s College",
      place: "St. John’s College",
      category: "Landmark",
      lat: "49.81050405193883", lng: "-97.13680326517274",
      description: "Anglican college with residences, classrooms."
    },
    {
      id: 223, type: "landmark",
      name: "St. Andrew’s College",
      place: "St. Andrew’s College",
      category: "Landmark",
      lat: "49.81090544199807", lng: "-97.14079131949572",
      description: "Ukrainian theological college."
    },

    // Region 3 — Agriculture & Science South Zone
    {
      id: 224, type: "landmark",
      name: "Agriculture Building",
      place: "Agriculture Building",
      category: "Landmark",
      lat: "", lng: "",
      description: "Faculty of Agricultural & Food Sciences."
    },
    {
      id: 225, type: "landmark",
      name: "Agricultural Engineering Building",
      place: "Agricultural Engineering Building",
      category: "Landmark",
      lat: "", lng: "",
      description: "Agriculture engineering facilities."
    },
    {
      id: 226, type: "landmark",
      name: "Dairy Science Building",
      place: "Dairy Science Building",
      category: "Landmark",
      lat: "49.80730603467831", lng: "-97.13391834411799",
      description: "Dairy science research centre."
    },
    {
      id: 227, type: "landmark",
      name: "Animal Science / Entomology Building",
      place: "Animal Science / Entomology Building",
      category: "Landmark",
      lat: "49.805942343148914", lng: "-97.13733874840113",
      description: "Animal science and entomology research labs."
    },
    {
      id: 228, type: "landmark",
      name: "Ellis Building",
      place: "Ellis Building",
      category: "Landmark",
      lat: "49.8048416707005", lng: "-97.13658818946753",
      description: "Engineering labs and facilities."
    },
    {
      id: 231, type: "landmark",
      name: "Central Energy Plant",
      place: "Central Energy Plant",
      category: "Landmark",
      lat: "", lng: "",
      description: "Campus heating and utilities."
    },
    {
      id: 232, type: "landmark",
      name: "Physical Plant / Energy Management",
      place: "Physical Plant",
      category: "Landmark",
      lat: "49.8066761108781", lng: "-97.13253517122608",
      description: "Campus maintenance and operations."
    },

    // Region 4 — Athletics Zone
    {
      id: 235, type: "landmark",
      name: "Investors Group Athletic Centre",
      place: "IGAC",
      category: "Landmark",
      lat: "49.809070962072546", lng: "-97.13969121295969",
      description: "Indoor athletic facility."
    },
    {
      id: 236, type: "landmark",
      name: "James Daly Fieldhouse",
      place: "James Daly Fieldhouse",
      category: "Landmark",
      lat: "49.80828185423737", lng: "-97.13917654397662",
      description: "Indoor track and sports training."
    },
    {
      id: 237, type: "landmark",
      name: "Joyce Fromson Pool",
      place: "Joyce Fromson Pool",
      category: "Landmark",
      lat: "49.80708432391311", lng: "-97.13791131605998",
      description: "Campus swimming facility."
    },

    // Region 5 — Education / Nursing Zone
    {
      id: 239, type: "landmark",
      name: "Helen Glass Centre for Nursing",
      place: "Helen Glass Centre",
      category: "Landmark",
      lat: "49.80905019624169", lng: "-97.13568108380012",
      description: "Nursing faculties and labs."
    },
    {
      id: 240, type: "landmark",
      name: "Education Building",
      place: "Education Building",
      category: "Landmark",
      lat: "49.80878716161319", lng: "-97.1365066986271",
      description: "Faculty of Education."
    },
    {
      id: 241, type: "landmark",
      name: "Agriculture Building",
      place: "Agriculture Building",
      category: "Landmark",
      lat: "49.806752071845814", lng: "-97.13512070910156",
      description: "Faculty of Agriculture."
    }

  ];

  allEvents = sortEventsByDate(allEvents); //gotta sort em once
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
  // ====================== [ Sort Events ] ======================
  // ========================================================
function sortEventsByDate(events) {
  return events.slice().sort((a, b) => {
    // Ignore landmarks
    if (a.type !== "event" && b.type !== "event") return 0;
    if (a.type !== "event") return 1;
    if (b.type !== "event") return -1;

    // Extract ONLY the start time
    // Handles: "-", "–", "—"
    const extractStartTime = (timeStr) => {
      if (!timeStr) return "12:00 AM"; // fallback so date still parses
      return timeStr.split(/[-–—]/)[0].trim();
    };

    // Build full datetime strings that JS CAN parse
    const dateA = new Date(`${a.date} ${extractStartTime(a.time)}`);
    const dateB = new Date(`${b.date} ${extractStartTime(b.time)}`);

    return dateA - dateB;
  });
}


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
    const sorted = sortEventsByDate(list);

    renderCarousel(sorted.filter((e) => e.type === "event"));
    addMarkers(sorted);
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
    // If not on Home, switch to Home first, then focus map
    if (!$('#home-page').is(':visible')) {
      showSection('home-page');

      // Small delay so the map DOM is visible before centering
      setTimeout(250);
    }
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
  // TODO: (Youssof) Implement social features here
  // Placeholder for future event feeds, post creation, etc.


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
      allEvents = sortEventsByDate(allEvents);
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
