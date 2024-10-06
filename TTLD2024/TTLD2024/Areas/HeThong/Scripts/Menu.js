
function layToanBoDuLieu() {
    NTS.loadDataCombo({
        name: "#selMenuCha",
        ajaxUrl: '/HeThong/Menu/LayDanhSachMenu',
        ajaxParam: '',
        columns: 2,
        indexValue: 0,
        indexText: 1,
        indexText1: 2,
        textChange: "text1",
        indexDefault: 1,
        textShowTatCa: '',
        showTatCa: !0
    });
}

function LayDanhSachIcon() {
    var res = ["fa-500px", "fa-address-book", "fa-address-book-o", "fa-address-card", "fa-address-card-o", "fa-adjust", "fa-adn", "fa-align-center", "fa-align-justify", "fa-align-left", "fa-align-right", "fa-amazon", "fa-ambulance", "fa-american-sign-language-interpreting", "fa-anchor", "fa-android", "fa-angellist", "fa-angle-double-down", "fa-angle-double-left", "fa-angle-double-right", "fa-angle-double-up", "fa-angle-down", "fa-angle-left", "fa-angle-right", "fa-angle-up", "fa-apple", "fa-archive", "fa-area-chart", "fa-arrow-circle-down", "fa-arrow-circle-left", "fa-arrow-circle-o-down", "fa-arrow-circle-o-left", "fa-arrow-circle-o-right", "fa-arrow-circle-o-up", "fa-arrow-circle-right", "fa-arrow-circle-up", "fa-arrow-down", "fa-arrow-left", "fa-arrow-right", "fa-arrow-up", "fa-arrows", "fa-arrows-alt", "fa-arrows-h", "fa-arrows-v", "fa-asl-interpreting", "fa-assistive-listening-systems", "fa-asterisk", "fa-at", "fa-audio-description", "fa-automobile", "fa-backward", "fa-balance-scale", "fa-ban", "fa-bandcamp", "fa-bank", "fa-bar-chart", "fa-bar-chart-o", "fa-barcode", "fa-bars", "fa-bath", "fa-bathtub", "fa-battery", "fa-battery-0", "fa-battery-1", "fa-battery-2", "fa-battery-3", "fa-battery-4", "fa-battery-empty", "fa-battery-full", "fa-battery-half", "fa-battery-quarter", "fa-battery-three-quarters", "fa-bed", "fa-beer", "fa-behance", "fa-behance-square", "fa-bell", "fa-bell-o", "fa-bell-slash", "fa-bell-slash-o", "fa-bicycle", "fa-binoculars", "fa-birthday-cake", "fa-bitbucket", "fa-bitbucket-square", "fa-bitcoin", "fa-black-tie", "fa-blind", "fa-bluetooth", "fa-bluetooth-b", "fa-bold", "fa-bolt", "fa-bomb", "fa-book", "fa-bookmark", "fa-bookmark-o", "fa-braille", "fa-briefcase", "fa-btc", "fa-bug", "fa-building", "fa-building-o", "fa-bullhorn", "fa-bullseye", "fa-bus", "fa-buysellads", "fa-cab", "fa-calculator", "fa-calendar", "fa-calendar-check-o", "fa-calendar-minus-o", "fa-calendar-o", "fa-calendar-plus-o", "fa-calendar-times-o", "fa-camera", "fa-camera-retro", "fa-car", "fa-caret-down", "fa-caret-left", "fa-caret-right", "fa-caret-square-o-down", "fa-caret-square-o-left", "fa-caret-square-o-right", "fa-caret-square-o-up", "fa-caret-up", "fa-cart-arrow-down", "fa-cart-plus", "fa-cc", "fa-cc-amex", "fa-cc-diners-club", "fa-cc-discover", "fa-cc-jcb", "fa-cc-mastercard", "fa-cc-paypal", "fa-cc-stripe", "fa-cc-visa", "fa-certificate", "fa-chain", "fa-chain-broken", "fa-check", "fa-check-circle", "fa-check-circle-o", "fa-check-square", "fa-check-square-o", "fa-chevron-circle-down", "fa-chevron-circle-left", "fa-chevron-circle-right", "fa-chevron-circle-up", "fa-chevron-down", "fa-chevron-left", "fa-chevron-right", "fa-chevron-up", "fa-child", "fa-chrome", "fa-circle", "fa-circle-o", "fa-circle-o-notch", "fa-circle-thin", "fa-clipboard", "fa-clock-o", "fa-clone", "fa-close", "fa-cloud", "fa-cloud-download", "fa-cloud-upload", "fa-cny", "fa-code", "fa-code-fork", "fa-codepen", "fa-codiepie", "fa-coffee", "fa-cog", "fa-cogs", "fa-columns", "fa-comment", "fa-comment-o", "fa-commenting", "fa-commenting-o", "fa-comments", "fa-comments-o", "fa-compass", "fa-compress", "fa-connectdevelop", "fa-contao", "fa-copy", "fa-copyright", "fa-creative-commons", "fa-credit-card", "fa-credit-card-alt", "fa-crop", "fa-crosshairs", "fa-css3", "fa-cube", "fa-cubes", "fa-cut", "fa-cutlery", "fa-dashboard", "fa-dashcube", "fa-database", "fa-deaf", "fa-deafness", "fa-dedent", "fa-delicious", "fa-desktop", "fa-deviantart", "fa-diamond", "fa-digg", "fa-dollar", "fa-dot-circle-o", "fa-download", "fa-dribbble", "fa-drivers-license", "fa-drivers-license-o", "fa-dropbox", "fa-drupal", "fa-edge", "fa-edit", "fa-eercast", "fa-eject", "fa-ellipsis-h", "fa-ellipsis-v", "fa-empire", "fa-envelope", "fa-envelope-o", "fa-envelope-open", "fa-envelope-open-o", "fa-envelope-square", "fa-envira", "fa-eraser", "fa-etsy", "fa-eur", "fa-euro", "fa-exchange", "fa-exclamation", "fa-exclamation-circle", "fa-exclamation-triangle", "fa-expand", "fa-expeditedssl", "fa-external-link", "fa-external-link-square", "fa-eye", "fa-eye-slash", "fa-eyedropper", "fa-fa", "fa-facebook", "fa-facebook-f", "fa-facebook-official", "fa-facebook-square", "fa-fast-backward", "fa-fast-forward", "fa-fax", "fa-feed", "fa-female", "fa-fighter-jet", "fa-file", "fa-file-archive-o", "fa-file-audio-o", "fa-file-code-o", "fa-file-excel-o", "fa-file-image-o", "fa-file-movie-o", "fa-file-o", "fa-file-pdf-o", "fa-file-photo-o", "fa-file-picture-o", "fa-file-powerpoint-o", "fa-file-sound-o", "fa-file-text", "fa-file-text-o", "fa-file-video-o", "fa-file-word-o", "fa-file-zip-o", "fa-files-o", "fa-film", "fa-filter", "fa-fire", "fa-fire-extinguisher", "fa-firefox", "fa-first-order", "fa-flag", "fa-flag-checkered", "fa-flag-o", "fa-flash", "fa-flask", "fa-flickr", "fa-floppy-o", "fa-folder", "fa-folder-o", "fa-folder-open", "fa-folder-open-o", "fa-font", "fa-font-awesome", "fa-fonticons", "fa-fort-awesome", "fa-forumbee", "fa-forward", "fa-foursquare", "fa-free-code-camp", "fa-frown-o", "fa-futbol-o", "fa-gamepad", "fa-gavel", "fa-gbp", "fa-ge", "fa-gear", "fa-gears", "fa-genderless", "fa-get-pocket", "fa-gg", "fa-gg-circle", "fa-gift", "fa-git", "fa-git-square", "fa-github", "fa-github-alt", "fa-github-square", "fa-gitlab", "fa-gittip", "fa-glass", "fa-glide", "fa-glide-g", "fa-globe", "fa-google", "fa-google-plus", "fa-google-plus-circle", "fa-google-plus-official", "fa-google-plus-square", "fa-google-wallet", "fa-graduation-cap", "fa-gratipay", "fa-grav", "fa-group", "fa-h-square", "fa-hacker-news", "fa-hand-grab-o", "fa-hand-lizard-o", "fa-hand-o-down", "fa-hand-o-left", "fa-hand-o-right", "fa-hand-o-up", "fa-hand-paper-o", "fa-hand-peace-o", "fa-hand-pointer-o", "fa-hand-rock-o", "fa-hand-scissors-o", "fa-hand-spock-o", "fa-hand-stop-o", "fa-handshake-o", "fa-hard-of-hearing", "fa-hashtag", "fa-hdd-o", "fa-header", "fa-headphones", "fa-heart", "fa-heart-o", "fa-heartbeat", "fa-history", "fa-home", "fa-hospital-o", "fa-hotel", "fa-hourglass", "fa-hourglass-1", "fa-hourglass-2", "fa-hourglass-3", "fa-hourglass-end", "fa-hourglass-half", "fa-hourglass-o", "fa-hourglass-start", "fa-houzz", "fa-html5", "fa-i-cursor", "fa-id-badge", "fa-id-card", "fa-id-card-o", "fa-ils", "fa-image", "fa-imdb", "fa-inbox", "fa-indent", "fa-industry", "fa-info", "fa-info-circle", "fa-inr", "fa-instagram", "fa-institution", "fa-internet-explorer", "fa-intersex", "fa-ioxhost", "fa-italic", "fa-joomla", "fa-jpy", "fa-jsfiddle", "fa-key", "fa-keyboard-o", "fa-krw", "fa-language", "fa-laptop", "fa-lastfm", "fa-lastfm-square", "fa-leaf", "fa-leanpub", "fa-legal", "fa-lemon-o", "fa-level-down", "fa-level-up", "fa-life-bouy", "fa-life-buoy", "fa-life-ring", "fa-life-saver", "fa-lightbulb-o", "fa-line-chart", "fa-link", "fa-linkedin", "fa-linkedin-square", "fa-linode", "fa-linux", "fa-list", "fa-list-alt", "fa-list-ol", "fa-list-ul", "fa-location-arrow", "fa-lock", "fa-long-arrow-down", "fa-long-arrow-left", "fa-long-arrow-right", "fa-long-arrow-up", "fa-low-vision", "fa-magic", "fa-magnet", "fa-mail-forward", "fa-mail-reply", "fa-mail-reply-all", "fa-male", "fa-map", "fa-map-marker", "fa-map-o", "fa-map-pin", "fa-map-signs", "fa-mars", "fa-mars-double", "fa-mars-stroke", "fa-mars-stroke-h", "fa-mars-stroke-v", "fa-maxcdn", "fa-meanpath", "fa-medium", "fa-medkit", "fa-meetup", "fa-meh-o", "fa-mercury", "fa-microchip", "fa-microphone", "fa-microphone-slash", "fa-minus", "fa-minus-circle", "fa-minus-square", "fa-minus-square-o", "fa-mixcloud", "fa-mobile", "fa-mobile-phone", "fa-modx", "fa-money", "fa-moon-o", "fa-mortar-board", "fa-motorcycle", "fa-mouse-pointer", "fa-music", "fa-navicon", "fa-neuter", "fa-newspaper-o", "fa-object-group", "fa-object-ungroup", "fa-odnoklassniki", "fa-odnoklassniki-square", "fa-opencart", "fa-openid", "fa-opera", "fa-optin-monster", "fa-outdent", "fa-pagelines", "fa-paint-brush", "fa-paper-plane", "fa-paper-plane-o", "fa-paperclip", "fa-paragraph", "fa-paste", "fa-pause", "fa-pause-circle", "fa-pause-circle-o", "fa-paw", "fa-paypal", "fa-pencil", "fa-pencil-square", "fa-pencil-square-o", "fa-percent", "fa-phone", "fa-phone-square", "fa-photo", "fa-picture-o", "fa-pie-chart", "fa-pied-piper", "fa-pied-piper-alt", "fa-pied-piper-pp", "fa-pinterest", "fa-pinterest-p", "fa-pinterest-square", "fa-plane", "fa-play", "fa-play-circle", "fa-play-circle-o", "fa-plug", "fa-plus", "fa-plus-circle", "fa-plus-square", "fa-plus-square-o", "fa-podcast", "fa-power-off", "fa-print", "fa-product-hunt", "fa-puzzle-piece", "fa-qq", "fa-qrcode", "fa-question", "fa-question-circle", "fa-question-circle-o", "fa-quora", "fa-quote-left", "fa-quote-right", "fa-ra", "fa-random", "fa-ravelry", "fa-rebel", "fa-recycle", "fa-reddit", "fa-reddit-alien", "fa-reddit-square", "fa-refresh", "fa-registered", "fa-remove", "fa-renren", "fa-reorder", "fa-repeat", "fa-reply", "fa-reply-all", "fa-resistance", "fa-retweet", "fa-rmb", "fa-road", "fa-rocket", "fa-rotate-left", "fa-rotate-right", "fa-rouble", "fa-rss", "fa-rss-square", "fa-rub", "fa-ruble", "fa-rupee", "fa-s15", "fa-safari", "fa-save", "fa-scissors", "fa-scribd", "fa-search", "fa-search-minus", "fa-search-plus", "fa-sellsy", "fa-send", "fa-send-o", "fa-server", "fa-share", "fa-share-alt", "fa-share-alt-square", "fa-share-square", "fa-share-square-o", "fa-shekel", "fa-sheqel", "fa-shield", "fa-ship", "fa-shirtsinbulk", "fa-shopping-bag", "fa-shopping-basket", "fa-shopping-cart", "fa-shower", "fa-sign-in", "fa-sign-language", "fa-sign-out", "fa-signal", "fa-signing", "fa-simplybuilt", "fa-sitemap", "fa-skyatlas", "fa-skype", "fa-slack", "fa-sliders", "fa-slideshare", "fa-smile-o", "fa-snapchat", "fa-snapchat-ghost", "fa-snapchat-square", "fa-snowflake-o", "fa-soccer-ball-o", "fa-sort", "fa-sort-alpha-asc", "fa-sort-alpha-desc", "fa-sort-amount-asc", "fa-sort-amount-desc", "fa-sort-asc", "fa-sort-desc", "fa-sort-down", "fa-sort-numeric-asc", "fa-sort-numeric-desc", "fa-sort-up", "fa-soundcloud", "fa-space-shuttle", "fa-spinner", "fa-spoon", "fa-spotify", "fa-square", "fa-square-o", "fa-stack-exchange", "fa-stack-overflow", "fa-star", "fa-star-half", "fa-star-half-empty", "fa-star-half-full", "fa-star-half-o", "fa-star-o", "fa-steam", "fa-steam-square", "fa-step-backward", "fa-step-forward", "fa-stethoscope", "fa-sticky-note", "fa-sticky-note-o", "fa-stop", "fa-stop-circle", "fa-stop-circle-o", "fa-street-view", "fa-strikethrough", "fa-stumbleupon", "fa-stumbleupon-circle", "fa-subscript", "fa-subway", "fa-suitcase", "fa-sun-o", "fa-superpowers", "fa-superscript", "fa-support", "fa-table", "fa-tablet", "fa-tachometer", "fa-tag", "fa-tags", "fa-tasks", "fa-taxi", "fa-telegram", "fa-television", "fa-tencent-weibo", "fa-terminal", "fa-text-height", "fa-text-width", "fa-th", "fa-th-large", "fa-th-list", "fa-themeisle", "fa-thermometer", "fa-thermometer-0", "fa-thermometer-1", "fa-thermometer-2", "fa-thermometer-3", "fa-thermometer-4", "fa-thermometer-empty", "fa-thermometer-full", "fa-thermometer-half", "fa-thermometer-quarter", "fa-thermometer-three-quarters", "fa-thumb-tack", "fa-thumbs-down", "fa-thumbs-o-down", "fa-thumbs-o-up", "fa-thumbs-up", "fa-ticket", "fa-times", "fa-times-circle", "fa-times-circle-o", "fa-times-rectangle", "fa-times-rectangle-o", "fa-tint", "fa-toggle-down", "fa-toggle-left", "fa-toggle-off", "fa-toggle-on", "fa-toggle-right", "fa-toggle-up", "fa-trademark", "fa-train", "fa-transgender", "fa-transgender-alt", "fa-trash", "fa-trash-o", "fa-tree", "fa-trello", "fa-tripadvisor", "fa-trophy", "fa-truck", "fa-try", "fa-tty", "fa-tumblr", "fa-tumblr-square", "fa-turkish-lira", "fa-tv", "fa-twitch", "fa-twitter", "fa-twitter-square", "fa-umbrella", "fa-underline", "fa-undo", "fa-universal-access", "fa-university", "fa-unlink", "fa-unlock", "fa-unlock-alt", "fa-unsorted", "fa-upload", "fa-usb", "fa-usd", "fa-user", "fa-user-circle", "fa-user-circle-o", "fa-user-md", "fa-user-o", "fa-user-plus", "fa-user-secret", "fa-user-times", "fa-users", "fa-vcard", "fa-vcard-o", "fa-venus", "fa-venus-double", "fa-venus-mars", "fa-viacoin", "fa-viadeo", "fa-viadeo-square", "fa-video-camera", "fa-vimeo", "fa-vimeo-square", "fa-vine", "fa-vk", "fa-volume-control-phone", "fa-volume-down", "fa-volume-off", "fa-volume-up", "fa-warning", "fa-wechat", "fa-weibo", "fa-weixin", "fa-whatsapp", "fa-wheelchair", "fa-wheelchair-alt", "fa-wifi", "fa-wikipedia-w", "fa-window-close", "fa-window-close-o", "fa-window-maximize", "fa-window-minimize", "fa-window-restore", "fa-windows", "fa-won", "fa-wordpress", "fa-wpbeginner", "fa-wpexplorer", "fa-wpforms", "fa-wrench", "fa-xing", "fa-xing-square", "fa-y-combinator", "fa-y-combinator-square", "fa-yahoo", "fa-yc", "fa-yc-square", "fa-yelp", "fa-yen", "fa-yoast", "fa-youtube", "fa-youtube-play", "fa-youtube-square"];
    //Load tất cả Icon mỗi khi người dùng load trang web
    /*   var res = NTS.getAjax('/HeThong/Menu/GetAllIconFromDatabase', {})*/
   /* var aceRes = ["bx-child", "bx-sushi", "bx-shower", "bx-rfid", "bx-universal-access", "bx-shield-minus", "bx-shield-plus", "bx-vertical-bottom", "bx-vertical-top", "bx-horizontal-right", "bx-horizontal-left", "bx-objects-vertical-bottom", "bx-objects-vertical-center", "bx-objects-vertical-top", "bx-objects-horizontal-right", "bx-objects-horizontal-center", "bx-objects-horizontal-left", "bx-color", "bx-reflect-horizontal", "bx-reflect-vertical", "bx-cart-add", "bx-cart-download", "bx-no-signal", "bx-signal-5", "bx-signal-4", "bx-signal-3", "bx-signal-2", "bx-signal-1", "bx-cheese", "bx-hard-hat", "bx-home-alt-2", "bx-lemon", "bx-cable-car", "bx-cricket-ball", "bx-male-female", "bx-baguette", "bx-fork", "bx-knife", "bx-circle-half", "bx-circle-three-quarter", "bx-circle-quarter", "bx-bowl-rice", "bx-bowl-hot", "bx-popsicle", "bx-cross", "bx-scatter-chart", "bx-money-withdraw", "bx-candles", "bx-math", "bx-party", "bx-leaf", "bx-injection", "bx-expand-vertical", "bx-expand-horizontal", "bx-collapse-vertical", "bx-collapse-horizontal", "bx-collapse-alt", "bx-qr", "bx-qr-scan", "bx-podcast", "bx-checkbox-minus", "bx-speaker", "bx-registered", "bx-phone-off", "bx-buildings", "bx-store-alt", "bx-bar-chart-alt-2", "bx-message-dots", "bx-message-rounded-dots", "bx-memory-card", "bx-wallet-alt", "bx-slideshow", "bx-message-square", "bx-message-square-dots", "bx-book-content", "bx-chat", "bx-edit-alt", "bx-mouse-alt", "bx-bug-alt", "bx-notepad", "bx-video-recording", "bx-shape-square", "bx-shape-triangle", "bx-ghost", "bx-mail-send", "bx-code-alt", "bx-grid", "bx-user-pin", "bx-run", "bx-copy-alt", "bx-transfer-alt", "bx-book-open", "bx-landscape", "bx-comment", "bx-comment-dots", "bx-pyramid", "bx-cylinder", "bx-lock-alt", "bx-lock-open-alt", "bx-left-arrow-alt", "bx-right-arrow-alt", "bx-up-arrow-alt", "bx-down-arrow-alt", "bx-shape-circle", "bx-cycling", "bx-dna", "bx-bowling-ball", "bx-search-alt-2", "bx-plus-medical", "bx-street-view", "bx-droplet", "bx-paint-roll", "bx-shield-alt-2", "bx-error-alt", "bx-square", "bx-square-rounded", "bx-polygon", "bx-cube-alt", "bx-cuboid", "bx-user-voice", "bx-accessibility", "bx-building-house", "bx-doughnut-chart", "bx-log-in-circle", "bx-log-out-circle", "bx-check-square", "bx-message-alt", "bx-message-alt-dots", "bx-no-entry", "bx-palette", "bx-basket", "bx-purchase-tag-alt", "bx-receipt", "bx-line-chart", "bx-map-pin", "bx-hive", "bx-band-aid", "bx-credit-card-alt", "bx-wifi-off", "bx-brightness-half", "bx-brightness", "bx-filter-alt", "bx-dialpad-alt", "bx-border-right", "bx-border-left", "bx-border-top", "bx-border-bottom", "bx-border-all", "bx-mobile-landscape", "bx-mobile-vibration", "bx-gas-pump", "bx-pie-chart-alt-2", "bx-time-five", "bx-briefcase-alt-2", "bx-brush-alt", "bx-customize", "bx-radio", "bx-printer", "bx-sort-a-z", "bx-sort-z-a", "bx-conversation", "bx-exit", "bx-extension", "bx-face", "bx-file-find", "bx-label", "bx-check-shield", "bx-border-radius", "bx-add-to-queue", "bx-archive-in", "bx-archive-out", "bx-alarm-add", "bx-space-bar", "bx-image-alt", "bx-image-add", "bx-fridge", "bx-dish", "bx-spa", "bx-cake", "bx-bolt-circle", "bx-tone", "bx-bitcoin", "bx-lira", "bx-ruble", "bx-rupee", "bx-euro", "bx-pound", "bx-won", "bx-yen", "bx-shekel", "bx-health", "bx-clinic", "bx-male", "bx-female", "bx-male-sign", "bx-female-sign", "bx-food-tag", "bx-food-menu", "bx-meh-alt", "bx-wink-tongue", "bx-happy-alt", "bx-cool", "bx-tired", "bx-smile", "bx-angry", "bx-happy-heart-eyes", "bx-dizzy", "bx-wink-smile", "bx-confused", "bx-sleepy", "bx-shocked", "bx-happy-beaming", "bx-meh-blank", "bx-laugh", "bx-upside-down", "bx-diamond", "bx-align-left", "bx-align-middle", "bx-align-right", "bx-arrow-back", "bx-bell-minus", "bx-bell-off", "bx-bell-plus", "bx-bell", "bx-bookmark", "bx-bookmarks", "bx-bullseye", "bx-camera-off", "bx-camera", "bx-captions", "bx-checkbox-checked", "bx-checkbox", "bx-checkbox-square", "bx-chevron-down", "bx-chevron-up", "bx-chevron-left", "bx-chevron-right", "bx-chevrons-down", "bx-chevrons-up", "bx-chevrons-right", "bx-chevrons-left", "bx-clipboard", "bx-code-curly", "bx-code", "bx-coffee", "bx-copy", "bx-copyright", "bx-down-arrow-circle", "bx-error-circle", "bx-error", "bx-exit-fullscreen", "bx-fast-forward-circle", "bx-fast-forward", "bx-first-page", "bx-folder-minus", "bx-folder-plus", "bx-folder", "bx-fullscreen", "bx-hide", "bx-image", "bx-info-circle", "bx-align-justify", "bx-key", "bx-last-page", "bx-left-arrow-circle", "bx-left-down-arrow-circle", "bx-left-indent", "bx-left-top-arrow-circle", "bx-menu", "bx-microphone", "bx-minus-circle", "bx-moon", "bx-pause-circle", "bx-pause", "bx-play-circle", "bx-play", "bx-plus-circle", "bx-question-mark", "bx-radio-circle-marked", "bx-radio-circle", "bx-rectangle", "bx-rewind", "bx-reset", "bx-right-arrow-circle", "bx-right-down-arrow-circle", "bx-right-indent", "bx-right-top-arrow-circle", "bx-rss", "bx-search", "bx-show", "bx-skip-next", "bx-skip-previous", "bx-stop-circle", "bx-stop", "bx-stopwatch", "bx-sync", "bx-time", "bx-toggle-left", "bx-toggle-right", "bx-trending-down", "bx-trending-up", "bx-up-arrow-circle", "bx-vertical-center", "bx-video", "bx-volume-full", "bx-volume-low", "bx-volume-mute", "bx-volume", "bx-x-circle", "x-circle", "bx-zoom-in", "bx-zoom-out", "bx-archive", "bx-at", "bx-bar-chart-alt", "bx-bar-chart-square", "bx-bar-chart", "bx-basketball", "bx-block", "bx-book-bookmark", "bx-book", "bx-bookmark-minus", "bx-bookmark-plus", "bx-briefcase", "bx-broadcast", "bx-building", "bx-bug", "bx-bluetooth", "bx-bulb", "bx-buoy", "bx-calendar-plus", "bx-calendar-check", "bx-calendar-minus", "bx-calendar-x", "bx-calendar", "bx-chart", "bx-cloud-download", "bx-cloud-upload", "bx-cloud", "bx-terminal", "bx-crosshair", "bx-compass", "bx-data", "bx-desktop", "bx-directions", "bx-dollar", "bx-dots-horizontal-rounded", "bx-dots-horizontal", "bx-dots-vertical-rounded", "bx-dots-vertical", "bx-download", "bx-envelope", "bx-gift", "bx-globe", "bx-devices", "bx-headphone", "bx-heart", "bx-home", "bx-laptop", "bx-layer", "bx-link-alt", "bx-link", "bx-list-plus", "bx-list-ul", "bx-list-minus", "bx-lock-open", "bx-lock", "bx-map-alt", "bx-map", "bx-message-rounded", "bx-message", "bx-mobile-alt", "bx-mobile", "bx-navigation", "bx-phone", "bx-pie-chart", "bx-send", "bx-sidebar", "bx-sitemap", "bx-spreadsheet", "bx-tab", "bx-tag", "bx-target-lock", "bx-tennis-ball", "bx-alarm", "bx-upload", "bx-usb", "bx-video-off", "bx-voicemail", "bx-wifi", "bx-window-open", "bx-window", "bx-windows", "bx-duplicate", "bx-table", "bx-x", "bx-adjust", "bx-album", "bx-anchor", "bx-award", "bx-bold", "bx-calculator", "bx-cart", "bx-check", "bx-cloud-drizzle", "bx-cloud-light-rain", "bx-cloud-lightning", "bx-cloud-rain", "bx-cloud-snow", "bx-cog", "bx-columns", "bx-credit-card", "bx-crop", "bx-cube", "bx-cut", "bx-detail", "bx-shield-quarter", "bx-edit", "bx-file", "bx-filter", "bx-font", "bx-git-branch", "bx-git-commit", "bx-git-compare", "bx-git-merge", "bx-git-pull-request", "bx-git-repo-forked", "bx-group", "bx-hash", "bx-heading", "bx-home-alt", "bx-italic", "bx-joystick", "bx-link-external", "bx-log-in", "bx-log-out", "bx-microphone-off", "bx-minus", "bx-mouse", "bx-move", "bx-music", "bx-notification", "bx-package", "bx-paragraph", "bx-paste", "bx-pencil", "bx-pin", "bx-plus", "bx-power-off", "bx-pulse", "bx-save", "bx-screenshot", "bx-select-multiple", "bx-share-alt", "bx-share", "bx-shield-alt", "bx-shield", "bx-shopping-bag", "bx-shuffle", "bx-sort", "bx-star", "bx-sun", "bx-text", "bx-trash", "bx-trophy", "bx-underline", "bx-user-check", "bx-user-circle", "bx-user-minus", "bx-user-plus", "bx-user-x", "bx-user", "bx-barcode", "bx-crown", "bx-dislike", "bx-down-arrow", "bx-export", "bx-first-aid", "bx-flag", "bx-history", "bx-joystick-alt", "bx-left-arrow", "bx-like", "bx-list-check", "bx-poll", "bx-radar", "bx-redo", "bx-reply-all", "bx-reply", "bx-repost", "bx-revision", "bx-right-arrow", "bx-subdirectory-left", "bx-subdirectory-right", "bx-support", "bx-timer", "bx-undo", "bx-up-arrow", "bx-phone-call", "bx-aperture", "bx-film", "bx-folder-open", "bx-task", "bx-server", "bx-battery", "bx-calendar-alt", "bx-import", "bx-ruler", "bx-horizontal-center", "bx-rotate-right", "bx-rename", "bx-collapse", "bx-phone-incoming", "bx-phone-outgoing", "bx-body", "bx-cast", "bx-chip", "bx-skip-next-circle", "bx-skip-previous-circle", "bx-hdd", "bx-store", "bx-globe-alt", "bx-upvote", "bx-downvote", "bx-news", "bx-pie-chart-alt", "bx-images", "bx-purchase-tag", "bx-pen", "bx-expand", "bx-paperclip", "bx-closet", "bx-tv", "bx-collection", "bx-station", "bx-wallet", "bx-briefcase-alt", "bx-hourglass", "bx-carousel", "bx-infinite", "bx-plug", "bx-notification-off", "bx-window-close", "bx-command", "bx-grid-alt", "bx-trash-alt", "bx-chalkboard", "bx-loader", "bx-slider", "bx-paper-plane", "bx-selection", "bx-world", "bx-dock-bottom", "bx-dock-right", "bx-dock-top", "bx-dock-left", "bx-layout", "bx-alarm-off", "bx-wrench", "bx-loader-circle", "bx-loader-alt", "bx-car", "bx-cart-alt", "bx-happy", "bx-meh", "bx-sad", "bx-slider-alt", "bx-certification", "bx-rocket", "bx-check-circle", "bx-bus", "bx-check-double", "bx-dumbbell", "bx-bot", "bx-area", "bx-bed", "bx-bath", "bx-train", "bx-taxi", "bx-movie", "bx-hotel", "bx-planet", "bx-list-ol", "bx-video-plus", "bx-menu-alt-left", "bx-menu-alt-right", "bx-box", "bx-restaurant", "bx-swim", "bx-water", "bx-wind", "bx-dialpad", "bx-handicap", "bx-font-size", "bx-code-block", "bx-photo-album", "bx-strikethrough", "bx-file-blank", "bx-highlight", "bx-font-color", "bx-fingerprint", "bx-transfer", "bx-circle", "bx-ball", "bx-football", "bx-dollar-circle", "bx-search-alt", "bx-analyse", "bx-disc", "bx-equalizer", "bx-stats", "bx-move-horizontal", "bx-move-vertical", "bx-grid-horizontal", "bx-grid-vertical", "bx-grid-small", "bx-badge", "bx-id-card", "bx-sort-up", "bx-sort-down", "bx-note", "bx-test-tube", "bx-help-circle", "bx-card", "bx-rewind-circle", "bx-magnet", "bx-calendar-event", "bx-caret-left", "bx-caret-up", "bx-caret-right", "bx-caret-down", "bx-show-alt", "bx-badge-check", "bx-rotate-left", "bx-brush", "bx-unlink", "bx-paint", "bx-joystick-button", "bx-font-family", "bx-repeat", "bx-walk", "bx-money", "bx-home-circle", "bx-location-plus", "bx-arch", "bx-atom", "bx-baseball", "bx-beer", "bx-bible", "bx-bomb", "bx-bus-school", "bx-cabinet", "bx-calendar-edit", "bx-coffee-togo", "bx-pointer", "bx-microchip", "bx-heart-circle", "bx-heart-square", "bx-home-heart", "bx-info-square", "bx-layer-plus", "bx-layer-minus", "bx-recycle", "bx-traffic-cone", "bx-wifi-2", "bx-wifi-1", "bx-wifi-0", "bx-mask", "bx-low-vision", "bx-been-here", "bx-current-location", "bx-arrow-from-top", "bx-arrow-from-bottom", "bx-arrow-from-left", "bx-arrow-from-right", "bx-arrow-to-right", "bx-arrow-to-left", "bx-arrow-to-top", "bx-arrow-to-bottom", "bx-book-reader", "bx-scan", "bx-calendar-week", "bx-glasses", "bx-glasses-alt", "bx-border-none", "bx-border-inner", "bx-dice-1", "bx-dice-2", "bx-dice-3", "bx-dice-4", "bx-dice-5", "bx-dice-6", "bx-webcam", "bx-spray-can", "bx-sticker", "bx-tachometer", "bx-game", "bx-abacus", "bx-alarm-snooze", "bx-alarm-exclamation", "bx-medal", "bx-task-x", "bx-barcode-reader", "bx-blanket", "bx-bone", "bx-bong", "bx-book-alt", "bx-book-heart", "bx-book-add", "bx-bracket", "bx-brain", "bx-border-outer", "bx-braille", "bx-window-alt", "bx-calendar-heart", "bx-wine", "bx-vial", "bx-color-fill", "bx-capsule", "bx-eraser", "bx-drink", "bx-cctv", "bx-chair", "bx-network-chart", "bx-vector", "bx-calendar-exclamation", "bx-calendar-star", "bx-camera-home", "bx-camera-movie", "bx-caret-right-circle", "bx-caret-left-circle", "bx-caret-up-circle", "bx-caret-down-circle", "bx-caret-right-square", "bx-caret-up-square", "bx-caret-left-square", "bx-caret-down-square", "bx-shield-x", "bx-line-chart-down", "bx-chevron-down-circle", "bx-chevron-up-circle", "bx-chevron-left-circle", "bx-chevron-right-circle", "bx-chevron-down-square", "bx-chevron-up-square", "bx-chevron-left-square", "bx-chevron-right-square", "bx-church", "bx-coin", "bx-coin-stack", "bx-unite", "bx-minus-front", "bx-intersect", "bx-exclude", "bx-minus-back", "bx-merge", "bx-trim", "bx-outline", "bx-meteor", "bx-refresh", "bx-home-smile", "bx-envelope-open", "bx-message-alt-add", "bx-message-alt-check", "bx-message-alt-error", "bx-message-alt-x", "bx-message-alt-minus", "bx-message-alt-edit", "bx-message-alt-detail", "bx-message-rounded-check", "bx-message-rounded-error", "bx-message-rounded-x", "bx-message-rounded-minus", "bx-message-rounded-edit", "bx-message-rounded-add", "bx-message-rounded-detail", "bx-message-check", "bx-message-error", "bx-message-x", "bx-message-minus", "bx-message-edit", "bx-message-add", "bx-message-detail", "bx-message-square-check", "bx-message-square-error", "bx-message-square-x", "bx-message-square-minus", "bx-message-square-edit", "bx-message-square-add", "bx-message-square-detail", "bx-comment-check", "bx-comment-error", "bx-comment-x", "bx-comment-edit", "bx-comment-minus", "bx-comment-add", "bx-comment-detail", "bx-cookie", "bx-credit-card-front", "bx-door-open", "bx-donate-heart", "bx-donate-blood", "bx-shape-polygon", "bx-bookmark-heart", "bx-sort-alt-2", "bx-category", "bx-category-alt", "bx-bookmark-alt", "bx-bookmark-alt-plus", "bx-bookmark-alt-minus", "bx-tag-alt", "bx-movie-play", "bx-expand-alt", "bx-library", "bx-trip"];*/
    for (var i = 0; i < res.length; ++i) {
        //Thêm icon vào container
        var element = ` <div class="fa-hover col-md-3 col-sm-4 faIcon ntsIcon"> <a data="fa ${res[i]}"><i class="fa ${res[i]}"></i>&ensp;${res[i]}</a> </div>`
        /*var element = `<div style="min-width:200px;max-width:200px;"><i class="${res[i].Icon} ntsIcon">  ${res[i].Icon}</i></div>`*/
        $('.box').append(element)
    }
    //for (var i = 0; i < aceRes.length; ++i) {
    //    //Thêm icon vào container
    //    var element = ` <div class="fa-hover col-md-3 col-sm-4 aceIcon ntsIcon"> <a data="bx ${aceRes[i]}"><i class="bx ${aceRes[i]}"></i>&ensp;${aceRes[i]}</a> </div>`
    //    /*var element = `<div style="min-width:200px;max-width:200px;"><i class="${res[i].Icon} ntsIcon">  ${res[i].Icon}</i></div>`*/
    //    $('#listIconACE').append(element)

    //}
}
//Hàm này dùng cho format column MenuCode trong table
function LayMaMenuCha(row) {
    //Tìm record nào có MenuID = row.MenuID_cha
    var MenuID_cha = row.getData().MenuID_cha;
    var MenuCode = NTS.getAjax('/HeThong/Menu/GetMenuCodeOfMenuParent', { MenuID_cha: MenuID_cha });
    //trả về MenuCode cho field
    return `${MenuCode}`
}
var mode = ""
var laModeNhanBan = false
var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().MenuID);
}

function updateFooterGrid1() {
    var el = document.getElementById("row-countg1");
    if (table != undefined) {
        var Grid = table;
        if (Grid.rowManager.activeRows.length > 0) {
            el.innerHTML = 'Dòng: ' + (Grid.rowManager.table.footerManager.links[0].page * Grid.rowManager.table.footerManager.links[0].size - Grid.rowManager.table.footerManager.links[0].size + 1) + ' - ' + (Grid.rowManager.table.footerManager.links[0].page * Grid.rowManager.table.footerManager.links[0].size - Grid.rowManager.table.footerManager.links[0].size + Grid.rowManager.displayRowsCount) + ' của ' + Grid.rowManager.activeRows.length + " - ";
        }
        else {
            el.innerHTML = 'Dòng: 0 - 0 của 0 - ';
        }
    }
}

$(document).on('click', '.tabulator-page', function () {
    updateFooterGrid1();
});
$(document).on('change', '.tabulator-page-size', function () {
    updateFooterGrid1();
});
$(document).on('click', '.tabulator-footer', function () {
    updateFooterGrid1();
});
$(document).ready(() => {
    //layToanBoDuLieu()
    LayDanhSachIcon()
    //$('#btnThemMoi').click(() => {
    //    
    //    TruocKhiThem()
    //})
    LoadDataTable();
    $('#btnBrowseIcon').click(() => {
        $('#mdTimKiemIcon').modal('show')
    })
    $(document).on('click', '.btnSuaGrid1', function () {
        var id = $(this).attr('data')
        var MenuCha_ID = $(this).attr('data-menucha-id')
        suaDuLieu(id, MenuCha_ID)
    })
    $('#txtTimKiemIcon').keyup(function () {
        var txtSearchValue = $(this).val()
        var iconType = "FA";
        TimKiemIcon(iconType, txtSearchValue)
    })
    $('#timKiemACE').keyup(function () {
        var txtSearchValue = $(this).val()
        var iconType = "Boxicon";
        TimKiemIcon(iconType, txtSearchValue)
    })
    $(document).on('click', '.btnXoaGrid1', function () {
        const id = $(this).attr('data')
        xoaDuLieu(id)
    })
    //Edit here
    $('.ntsIcon').click(function () {
        var icon = $(this).children('a').attr('data')
        GuiIconVeModal(icon)
        $('#mdTimKiemIcon').modal('hide')
    })
    $('#btnNhanBan').click(function () {
        //$('#_TabThongTinMenu_').addClass('active');
        //$('#_TabThongTinHDSD_').removeClass('active');
        var currentSelectedRowData = table.getSelectedData()
        NhanBan(currentSelectedRowData)
    })
})
$('#btnLuuVaDong').on('click', function () {
    LuuDuLieu();
});

function GuiIconVeModal(icon) {
    $('#txtIcon').val(icon)
}
function NhanBan(res) {
    if (res.length == 0) {
        NTS.canhbao("Chưa chọn dữ liệu nhân bản!");
        return false
    }
    else {
        layToanBoDuLieu();
        $('#selMenuCha').val(res[0].MenuID_cha).change()
        $('#txtMaMenuGuid').val('')
        $('#txtMaMenu').val(res[0].MenuCode)
        $('#txtTenMenu').val(res[0].TenMenu)
        $('#txtTieuDeChucNang').val(res[0].NoiDungTieuDe)
        $('#txtDuongDanTuyetDoi').val(res[0].DuongDanTuyetDoi)
        $('#txtDuongDan').val(res[0].DuongDan)
        $('#txtSapXep').val(res[0].SapXep)
        $('#txtIcon').val(res[0].Icon)
        $('#chkMenuButton').prop('checked', res[0].MenuButton)
        $('#chkMenuButtonCha').prop('checked', res[0].LaMenuCha_Button)
        $('#chkHienThi').prop('checked', res[0].HienThi)
        //$('#MoTa').val(res[0].MoTa)
        //if (res[0].CK_CacBuocTH != '') {
        //    CKEDITOR.instances.CK_CacBuocTH.setData(res[0].CacBuocThucHien)
        //}
        $('#tieuDeModal').text("Nhân bản thông tin menu")
        $('#mdThemMoi').modal('show');
        mode = "add"
        laModeNhanBan = true
    } 
}
function TimKiemIcon(iconType, txtSearchValue) {
    if (iconType == "FA") {
        $('.faIcon').each(function () {
            var childIcon = $(this).text()
            if (childIcon.indexOf(txtSearchValue) !== -1 && childIcon.toLowerCase().indexOf(txtSearchValue.toLowerCase()) !== -1) {
                $(this).show()
            }
            else {
                $(this).hide()
            }
        })
    }
    else if (iconType = "ACE") {
        $('.aceIcon').each(function () {
            var childIcon = $(this).text()
            if (childIcon.indexOf(txtSearchValue) !== -1 && childIcon.toLowerCase().indexOf(txtSearchValue.toLowerCase()) !== -1) {
                $(this).show()
            }
            else {
                $(this).hide()
            }
        })
    }
}
function xoaDuLieu(id) {
    if (!QuyenXoa()) {
        return false;
    }
    CanhBaoXoa(() => {
        var result = NTS.getAjax('/HeThong/Menu/XoaDuLieu', { id: id });
        if (!result.Err) {
            LoadDataTable()
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
}
function LuuDuLieu() {
    debugger
    const validate = new NTSValidate('#mdThemMoi');
    if (!validate.trim().check()) {
        return false;
    }
    if (mode === "add") {
        var param = new Array();
        param[0] = $('#txtMaMenu').val()
        param[1] = $('#txtTenMenu').val()
        param[2] = $('#txtDuongDan').val()
        param[3] = $('#txtIcon').val()
        param[4] = $('#selMenuCha').val()
        param[5] = $('#txtSapXep').val()
        param[6] = $('#chkMenuButton').prop('checked')
        param[7] = $('#chkMenuButtonCha').prop('checked')
        param[8] = $('#chkHienThi').prop('checked')
        param[9] = $('#txtDuongDanTuyetDoi').val()
        param[10] = $('#txtTieuDeChucNang').val()
        var responseStatus = NTS.getAjax('/HeThong/Menu/ThemMenu', { obj: param })
        if (laModeNhanBan) {
            switch (responseStatus) {
                case "Added":
                    NTS.thanhcong("Nhân bản dữ liệu thành công!");
                    LoadDataTable()
                    break;
                case "Error":
                    NTS.loi("Nhân bản dữ liệu thất bại!");
                    break;
            }
        }
        else {
            switch (responseStatus) {
                case "Added":
                    NTS.thanhcong("Thêm mới dữ liệu thành công!");
                    LoadDataTable()
                    break;
                case "Error":
                    NTS.loi("Thêm mới dữ liệu thất bại!");
                    break;
            }
        }
        laModeNhanBan = false;
    }
    else if (mode === "edit") {
        var param = new Array();
        param[0] = $('#txtMaMenu').val()
        param[1] = $('#txtTenMenu').val()
        param[2] = $('#txtDuongDan').val()
        param[3] = $('#txtIcon').val()
        param[4] = $('#selMenuCha').val()
        param[5] = $('#txtSapXep').val()
        param[6] = $('#chkMenuButton').prop('checked')
        param[7] = $('#chkMenuButtonCha').prop('checked')
        param[8] = $('#chkHienThi').prop('checked')
        param[9] = $('#txtDuongDanTuyetDoi').val()
        param[10] = $('#txtTieuDeChucNang').val()
        
        var id = $('#txtMaMenuGuid').val()
        var responseStatus = NTS.getAjax('/HeThong/Menu/CapNhatMenu', { obj: param, id: id })

        switch (responseStatus) {
            case "Edited":
                NTS.thanhcong("Cập nhật dữ liệu thành công!");
                LoadDataTable();
                break;
            case "Error":
                NTS.loi("Cập nhật dữ liệu thất bại!");
                break;
        }
    }
    $('#mdThemMoi').modal('hide')
}
function suaDuLieu(id) {
    if (!QuyenSua()) {
        return false;
    }
    
    $('#mdThemMoi').modal('show');
    $('#tieuDeModal').text('Cập nhật thông tin menu');
    mode = "edit"
    const res = NTS.getAjax('/HeThong/Menu/LayMenuTheoID', { MenuID: id })
    if (!res.Err && res.Result != null) {
        layToanBoDuLieu();
        
        $('#txtMaMenuGuid').val(id)
        $('#selMenuCha').value(res.Result[0].MenuID_cha)
        $('#txtMaMenuCha').val(res.Result[0].MenuID_cha)
        $('#txtMaMenu').val(res.Result[0].MenuCode)
        $('#txtTenMenu').val(res.Result[0].TenMenu)
        $('#txtTieuDeChucNang').val(res.Result[0].TenMenu)
        $('#txtDuongDanTuyetDoi').val(res.Result[0].DuongDanTuyetDoi)
        $('#txtDuongDan').val(res.Result[0].DuongDan)
        $('#txtSapXep').val(res.Result[0].SapXep)
        $('#txtIcon').val(res.Result[0].Icon)
        $('#txtIcon').val(res.Result[0].Icon)
        $('#chkMenuButton').prop('checked', res.Result[0].MenuButton)
        $('#chkMenuButtonCha').prop('checked', res.Result[0].LaMenuCha_Button)
        $('#chkHienThi').prop('checked', res.Result[0].HienThi)
        laModeNhanBan = false;
    }
}
function TruocKhiThem() {
    mode = "add"
    $('#mdThemMoi').modal('show');
    layToanBoDuLieu();
    $('#txtMaMenuGuid').val('')
    $('#txtMaMenu').val('')
    $('#txtTenMenu').val('')
    $('#txtTieuDeChucNang').val('')
    $('#txtDuongDanTuyetDoi').val('')
    //$('#DuongDanVideo').val('')
    $('#txtDuongDan').val('')
    $('#txtSapXep').val('')
    $('#txtIcon').val('')
    $('#chkMenuButton').prop('checked', false)
    $('#chkMenuButtonCha').prop('checked', false)
    $('#chkHienThi').prop('checked', false)
    $('#tieuDeModal').text('Thêm thông tin menu');
    //
    //if (CKEDITOR.instances.CK_CacBuocTH != undefined) {
    //    CKEDITOR.instances.CK_CacBuocTH.setData('');
    //}
    //if (CKEDITOR.instances.MoTa != undefined) {
    //    CKEDITOR.instances.MoTa.setData('');
    //}
    laModeNhanBan = false;
}

$(function () {
    $('[data-toggle="popover"]').popover();
});





function LoadDataTable() {
    table.clearData();
    const GetAll = NTS.getAjax("/HeThong/Menu/LayToanBoMenu", {});
    if (!GetAll.Err) {
        table.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}

var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().MenuID);
}
var table = new Tabulator("#Grid1", {
    responsiveLayout: false,
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    layout: "fitColumns", //fit columns to width of table (optional)
    selectable: 1,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: "550",
    HeaderVertAlign: "center",
    columns: [
        { title: '<i class="fa fa-ellipsis-h"></i>', headerHozAlign: "center", hozAlign: "center", formatter: fmThaoTac, width: 60, headerSort: false, frozen: true, vertAlign: "middle", print: false},
        { title: "MenuID", field: "MenuID", visible: false },
        { title: "GiaiDoanDuAnID", field: "GiaiDoanDuAnID", visible: false },
        { title: "MenuGroupID", field: "MenuGroupID", visible: false },
        {
            title: "Hình Icon", hozAlign: "center", formatter: (row) => {
                return `<i class='${row.getData().Icon} '></i>`;
            }, headerSort: false, width: 80, headerHozAlign: "center", vertAlign: "middle"
        },
        { title: "Menu Code", field: "MenuCode", hozAlign: "left", width: 120, headerHozAlign: "center", vertAlign: "middle"},
        { title: "Tên Menu", field: "TenMenu", hozAlign: "left", width: 300, headerHozAlign: "center", vertAlign: "middle", formatter: 'textarea' },
        { title: "Icon", field: "Icon", hozAlign: "left", width: 120, headerHozAlign: "center", vertAlign: "middle"},
        { title: "MenuID_cha", field: "MenuID_cha", visible: false },
        { title: "Menu Cha", field: "TenMenu_Cha", hozAlign: "left", width: 180, headerHozAlign: "center", vertAlign: "middle", formatter: 'textarea' },
        { title: "Đường Dẫn Rewrite", field: "DuongDan", hozAlign: "left", width: 300, headerHozAlign: "center", vertAlign: "middle"},
        { title: "Đường dẫn tuyệt đối", field: "DuongDanTuyetDoi", hozAlign: "left", width: 300, headerHozAlign: "center", vertAlign: "middle"},
        { title: "Sắp xếp", field: "SapXep", hozAlign: "center", width: 90, headerHozAlign: "center", vertAlign: "middle"},
        { title: "Mô tả", field: "MoTa", visible: false },
        { title: "Các bước thực hiện", field: "CacBuocThucHien", hozAlign: "left", width: 300, visible: false, headerHozAlign: "center", vertAlign: "middle" },
        {
            title: "Menu button", field: "MenuButton", hozAlign: "center", formatter: (cell) => {
                const value = cell.getValue();
                if (value)
                    return `<input type="checkbox" checked disabled='disabled'/>`;
                else
                    return `<input type="checkbox" disabled='disabled' />`;
            }, headerSort: false, width: 90, headerHozAlign: "center", vertAlign: "middle"
        },
        {
            title: "Menu button chính", field: "LaMenuCha_Button", hozAlign: "center", formatter: (cell) => {
                const value = cell.getValue();
                if (value)
                    return `<input type="checkbox" checked disabled='disabled'/>`;
                else
                    return `<input type="checkbox" disabled='disabled' />`;
            }, headerSort: false, width: 130, headerHozAlign: "center", vertAlign: "middle"
        },
        {
            title: "Hiển thị", field: "HienThi", hozAlign: "center", formatter: (cell) => {
                const value = cell.getValue();
                if (value)
                    return `<input type="checkbox" checked disabled='disabled'/>`;
                else
                    return `<input type="checkbox" disabled='disabled' />`;
            }, headerSort: false, width: 90, headerHozAlign: "center", vertAlign: "middle"
        },
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

table.on("rowDblClick", function (e, row) {
    suaDuLieu(row.getData().MenuID, row.getData().MenuCha_ID)
});
$(document).on('keyup', '#timKiem', function (e) {
    if (e.keyCode == '13') {
        table.setFilter(matchAny, { value: $(this).val() });
    }
});
$(document).on('click', '#btnThemMoi', function () {
    if (!QuyenThem()) {
        return false;
    }
    TruocKhiThem();
});



///////// PHÍM TẮT /////////
var hotKey = 0; // 1 thêm
$(document).on('keydown', function (e) {
    switch (e.keyCode) {
        case 113:
            if (hotKey == 0)
                $('#btnThemMoi').trigger('click');
            e.preventDefault();
            break;
        case 114:
            if (hotKey == 0)
                $('.nav-search-input').focus();
            e.preventDefault();
            break;
        case 115:
            if (hotKey == 1)
                $('#mdThemMoi').modal('hide');
            e.preventDefault();
            break;
        case 120:
            if (hotKey == 1)
                $('#btnLuuVaDong').trigger('click');
            e.preventDefault();
            break;
    }
});
$(document).on('shown.bs.modal', '#mdThemMoi', function () {
    hotKey = 1;
});
$(document).on('hidden.bs.modal', '#mdThemMoi', function () {
    hotKey = 0;
});


var dulieuloc = "";
$(document).on('keyup', '#timKiem', function (e) {
    if (e.keyCode == '13') {
        Search($(this).val());
    }
});
function Search(data) {
    if (data == '' || data == undefined) {
        data = $('#timKiem').value();
    }
    dulieuloc = data;
    table.setFilter(matchAny, {
        value: $('#timKiem').value()
    });
    updateFooterGrid1();
}
/// In và Xuất excel
$('#btnPrint').on('click', function () {
    table.print(false, true);
    return false;
});

$('#btnExport').on('click', async function () {
    const data = table.getData();
    const filteredData = data.filter(
        // lấy dữ liệu theo bộ lọc
        item => (item.MenuCode == null ? "" : item.MenuCode.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
            || (item.TenMeNu == null ? "" : item.TenMeNu.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
            || (item.DuongDan == null ? "" : item.DuongDan.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
            || (item.DuongDanTuyetDoi == null ? "" : item.DuongDanTuyetDoi.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
            || (item.MenuID_cha == null ? "" : item.MenuID_cha.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
            || (item.HienThi == null ? "" : item.HienThi.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
    );
    var chuoidulieu = JSON.stringify(filteredData).replaceAll('null', '""').replaceAll('true', '"Đang sử dụng"').replaceAll('false', '""');
    // cấu hình tên cột để xuất
    // thứ tự mảng này quết định thứ tự cột xuất ra
    var TenCot = [
        { 'datafil': 'MenuCode', 'TenCot': 'Mã', 'DoRong': '10', 'CanhLe': 'Left' },
        { 'datafil': 'TenMeNu', 'TenCot': 'Tên menu', 'DoRong': '40', 'CanhLe': 'Left' },
        { 'datafil': 'DuongDan', 'TenCot': 'Đường dẫn Rewrite', 'DoRong': '40', 'CanhLe': 'Left' },
        { 'datafil': 'DuongDanTuyetDoi', 'TenCot': 'Đường dẫn tuyệt đối', 'DoRong': '40', 'CanhLe': 'Left' },
        { 'datafil': 'TenMenu_Cha', 'TenCot': 'Menu cha', 'DoRong': '30', 'CanhLe': 'Left' },
        { 'datafil': 'SapXep', 'TenCot': 'Sắp xếp', 'DoRong': '10', 'CanhLe': 'Center' },
        { 'datafil': 'HienThi', 'TenCot': 'Hiển thị', 'DoRong': '17', 'CanhLe': 'Center' }]
    var result = await NTS.getAjaxAsync('/QuanLy/DungChung/XuatDataExcel', { Cot: JSON.stringify(TenCot), Data: chuoidulieu, TenFile: 'Danh sách menu' });
    if (result != "") {
        window.open(result);
    }
});