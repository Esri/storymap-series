app.cfg = {
	//
	// General UI
	//

	// Maximum number of entries
	MAX_NB_ENTRIES: 30,

	TIMEOUT_VIEWER_LOAD: 5000,
	TIMEOUT_VIEWER_REQUEST: 12000,
	TIMEOUT_BUILDER_REQUEST: 20000,

	// Control the social button configuration in builder
	// If disabled author won't be able to activate them
	// if disabled after the app has been created, this will override the settings
	HEADER_SOCIAL: {
		facebook: true,
		twitter: true,
		bitly: {
			enable: true,
			login: "esristorymaps",
			key: "R_14fc9f92e48f7c78c21db32bd01f7014"
		}
	},

	//
	// Layouts
	//

	// Size and position of represent the value relative to the Map
	LAYOUTS: [
		{
			id: "tab",
			thumbnail: "resources/tpl/builder/icons/builder-layout-tab.png",
			liveApp: "http://links.esri.com/storymaps/map_series_example_tabbed",
			sizes: { small: '20%', medium: '30%', large: '40%' },
			positions: ["left", "right"],
			themes: [
				{
					name: "tab-default-1",
					// Group of matching theme across layout
					group: "default",
					themeMajor: "white",
					// Header background
					header: "#283239",
					// Header title
					headerTitle: "#FFFFFF",
					// Header link&sharing
					headerText: "#D9D9D9",
					// Main Panel background
					panel: "#DBD9DA",
					// Description text
					text: "#000000",
					// Description link
					textLink: "#555555",
					// Media background
					media: "#8f999f",
					// Map Controls background
					mapControls: "#DBD9DA",
					// Map Controls text
					softText: "#444444",
					// Map Controls buttons
					softBtn: "#444444",
					// Esri logo "white" or "black"
					esriLogo: "white",
					esriLogoMobile: "black",
					tab: "#60788A",
					tabActive: "#69B9D2",
					tabHover: "#4B879D",
					tabText: "#FFFFFF",
					tabTextHover: "#FFFFFF",
					tabTextActive: "#FFFFFF"
				},
				{
					name: "tab-default-2",
					group: "antique",
					themeMajor: "white",
					header: "#283239",
					headerTitle: "#FFFFFF",
					headerText: "#D9D9D9",
					panel: "#FFF8E9",
					text: "#000000",
					textLink: "#555555",
					media: "#C9C1BA",
					mapControls: "#FFF8E9",
					softText: "#4D4D4D",
					softBtn: "#444444",
					esriLogo: "white",
					esriLogoMobile: "black",
					tab: "#7B7572",
					tabActive: "#BEAB94",
					tabHover: "#9E8772",
					tabText: "#FFFFFF",
					tabTextHover: "#FFFFFF",
					tabTextActive: "#FFFFFF"
				},
				{
					name: "tab-default-3",
					group: "bright",
					themeMajor: "white",
					header: "#6396BC",
					headerTitle: "#FFFFFF",
					headerText: "#FFFFFF",
					panel: "#FFFFFF",
					text: "#333333",
					textLink: "#555555",
					media: "#DBDBDB",
					mapControls: "#FFFFFF",
					softText: "#444444",
					softBtn: "#444444",
					esriLogo: "white",
					esriLogoMobile: "black",
					tab: "#4B7697",
					tabActive: "#A5D1EC",
					tabHover: "#6EA8D5",
					tabText: "#000000",
					tabTextHover: "#000000",
					tabTextActive: "#000000"
				},
				{
					name: "tab-default-4",
					group: "dark",
					themeMajor: "black",
					header: "#283239",
					headerTitle: "#FFFFFF",
					headerText: "#C5D5D5",
					panel: "#000000",
					text: "#D8D8D8",
					textLink: "#CCCCCC",
					media: "#B8B8B8",
					mapControls: "#404040",
					softText: "#C5D5D5",
					softBtn: "#C5D5D5",
					esriLogo: "white",
					esriLogoMobile: "white",
					tab: "#666666",
					tabActive: "#B8B8B8",
					tabHover: "#8D8F91",
					tabText: "#FEE680",
					tabTextHover: "#FEE680",
					tabTextActive: "#FEE680"
				},
				{
					name: "tab-default-5",
					group: "green",
					themeMajor: "white",
					header: "#3C4639",
					headerTitle: "#D4E6C3",
					headerText: "#81997A",
					panel: "#D4E6C3",
					text: "#231F20",
					textLink: "#555555",
					media: "#c6cdc0",
					mapControls: "#D4E6C3",
					softText: "#444444",
					softBtn: "#444444",
					esriLogo: "white",
					esriLogoMobile: "black",
					tab: "#9BAD8A",
					tabActive: "#D4E6C3",
					tabHover: "#B5D798",
					tabText: "#5B754C",
					tabTextHover: "#5B754C",
					tabTextActive: "#5B754C"
				}
			]
		},
		{
			id: "accordion",
			thumbnail: "resources/tpl/builder/icons/builder-layout-accordion.png",
			liveApp: "http://links.esri.com/storymaps/map_series_example_side_accordion",
			sizes: { small: '25%', medium: '35%', large: '45%' },
			positions: ["left", "right"],
			themes: [
				{
					name: "accordion-default-1",
					group: "default",
					themeMajor: "white",
					header: "#283239",
					headerTitle: "#FFFFFF",
					headerText: "#D9D9D9",
					panel: "#DBD9DA",
					text: "#000000",
					textLink: "#555555",
					media: "#8f999f",
					mapControls: "#DBD9DA",
					softText: "#444444",
					softBtn: "#444444",
					esriLogo: "white",
					esriLogoMobile: "black",
					// Arrow and entries separator
					accordionArrow: "#58ADCC",
					accordionArrowActive: "#FFFFFF",
					accordionArrowHover: "#9ACCDE",
					accordionNumber: "#60788A",
					accordionTitle: "#000000"
				},
				{
					name: "accordion-default-2",
					group: "antique",
					themeMajor: "white",
					header: "#283239",
					headerTitle: "#FFFFFF",
					headerText: "#D9D9D9",
					panel: "#FFF8E9",
					text: "#000000",
					textLink: "#555555",
					media: "#C9C1BA",
					mapControls: "#FFF8E9",
					softText: "#4D4D4D",
					softBtn: "#444444",
					esriLogo: "white",
					esriLogoMobile: "black",
					accordionArrow: "#7B7572",
					accordionArrowActive: "#404040",
					accordionArrowHover: "#747474",
					accordionNumber: "#BCA594",
					accordionTitle: "#000000"
				},
				{
					name: "accordion-default-3",
					group: "bright",
					themeMajor: "white",
					header: "#6396BC",
					headerTitle: "#FFFFFF",
					headerText: "#FFFFFF",
					panel: "#FFFFFF",
					text: "#333333",
					textLink: "#555555",
					media: "#DBDBDB",
					mapControls: "#FFFFFF",
					softText: "#444444",
					softBtn: "#444444",
					esriLogo: "white",
					esriLogoMobile: "black",
					accordionArrow: "#ACDAFF",
					accordionArrowActive: "#4B7697",
					accordionArrowHover: "#73A0C4",
					accordionNumber: "#4E8DC1",
					accordionTitle: "#333333"
				},
				{
					name: "accordion-default-4",
					group: "dark",
					themeMajor: "black",
					header: "#283239",
					headerTitle: "#FFFFFF",
					headerText: "#C5D5D5",
					panel: "#181818",
					text: "#D8D8D8",
					textLink: "#CCCCCC",
					media: "#B8B8B8",
					mapControls: "#404040",
					softText: "#C5D5D5",
					softBtn: "#C5D5D5",
					esriLogo: "white",
					esriLogoMobile: "white",
					accordionArrow: "#B8B8B8",
					accordionArrowActive: "#FFFFFF",
					accordionArrowHover: "#C0C0C0",
					accordionNumber: "#E5FA84",
					accordionTitle: "#D8D8D8"
				},
				{
					name: "accordion-default-5",
					group: "green",
					themeMajor: "white",
					header: "#3C4639",
					headerTitle: "#D4E6C3",
					headerText: "#81997A",
					panel: "#D4E6C3",
					text: "#231F20",
					textLink: "#555555",
					media: "#c6cdc0",
					mapControls: "#D4E6C3",
					softText: "#444444",
					softBtn: "#444444",
					esriLogo: "white",
					esriLogoMobile: "black",
					accordionArrow: "#231F20",
					accordionArrowActive: "#99B87E",
					accordionArrowHover: "#81997A",
					accordionNumber: "#3C4639",
					accordionTitle: "#5B754C"
				}
			]
		},
		{
			id: "bullet",
			thumbnail: "resources/tpl/builder/icons/builder-layout-bullet.png",
			liveApp: "http://links.esri.com/storymaps/map_series_example_bullets",
			sizes: { small: '20%', medium: '30%', large: '40%' },
			positions: ["left", "right"],
			themes: [
				{
					name: "bullet-default-1",
					group: "default",
					themeMajor: "white",
					header: "#283239",
					headerTitle: "#FFFFFF",
					headerText: "#D9D9D9",
					panel: "#DBD9DA",
					text: "#000000",
					textLink: "#555555",
					media: "#8f999f",
					mapControls: "#DBD9DA",
					softText: "#444444",
					softBtn: "#444444",
					esriLogo: "white",
					esriLogoMobile: "black",
					tab: "#60788A",
					tabActive: "#68B9D2",
					tabHover: "#4B879D",
					tabText: "#FFFFFF",
					tabTextHover: "#FFFFFF",
					tabTextActive: "#FFFFFF"
				},
				{
					name: "bullet-default-2",
					group: "antique",
					themeMajor: "white",
					header: "#5E5248",
					headerTitle: "#FFFFFF",
					headerText: "#D9D9D9",
					panel: "#FFF8E9",
					text: "#000000",
					textLink: "#555555",
					media: "#C9C1BA",
					mapControls: "#FFF8E9",
					softText: "#4D4D4D",
					softBtn: "#444444",
					esriLogo: "white",
					esriLogoMobile: "black",
					tab: "#7B7572",
					tabActive: "#BEAB94",
					tabHover: "#9E8772",
					tabText: "#FFFFFF",
					tabTextHover: "#FFFFFF",
					tabTextActive: "#FFFFFF"
				},
				{
					name: "bullet-default-3",
					group: "bright",
					themeMajor: "white",
					header: "#6396BC",
					headerTitle: "#FFFFFF",
					headerText: "#FFFFFF",
					panel: "#FFFFFF",
					text: "#333333",
					textLink: "#555555",
					media: "#DBDBDB",
					mapControls: "#FFFFFF",
					softText: "#444444",
					softBtn: "#444444",
					esriLogo: "white",
					esriLogoMobile: "black",
					tab: "#4B7697",
					tabActive: "#A5D1EC",
					tabHover: "#6EA8D5",
					tabText: "#000000",
					tabTextHover: "#000000",
					tabTextActive: "#000000"
				},
				{
					name: "bullet-default-4",
					group: "dark",
					themeMajor: "black",
					header: "#283239",
					headerTitle: "#FFFFFF",
					headerText: "#C5D5D5",
					panel: "#000000",
					text: "#D8D8D8",
					textLink: "#CCCCCC",
					media: "#B8B8B8",
					mapControls: "#404040",
					softText: "#C5D5D5",
					softBtn: "#C5D5D5",
					esriLogo: "white",
					esriLogoMobile: "white",
					tab: "#666666",
					tabActive: "#B8B8B8",
					tabHover: "#8D8F91",
					tabText: "#FEE680",
					tabTextHover: "#FEE680",
					tabTextActive: "#FEE680"
				},
				{
					name: "bullet-default-5",
					group: "green",
					themeMajor: "white",
					header: "#3C4639",
					headerTitle: "#D4E6C3",
					headerText: "#81997A",
					panel: "#D4E6C3",
					text: "#231F20",
					textLink: "#555555",
					media: "#c6cdc0",
					mapControls: "#D4E6C3",
					softText: "#444444",
					softBtn: "#444444",
					esriLogo: "white",
					esriLogoMobile: "black",
					tab: "#9BAD8A",
					tabActive: "#D4E6C3",
					tabHover: "#B5D798",
					tabText: "#5B754C",
					tabTextHover: "#5B754C",
					tabTextActive: "#5B754C"
				}
			]
		}
	],

	/*
	 * Builder
	 */

	HELP_URL: "http://links.esri.com/storymaps/map_series_app",
	HELP_URL_PORTAL: "#/Story_Map_Series/0193000000vs000000/",

	// Control the authorized data source (for initialization and import screen)
	AUTHORIZED_IMPORT_SOURCE: {
		flickr: true,
		facebook: true,
		picasa: true,
		youtube: true
	},

	// Online photo sharing services connection parameters
	FLICKR_API_KEY: "750b36a2ac65a72e03cf9cef06d79f45",
	// This Youtube key is valid for application running on arcgis.com and esri.com domains
	// If the application is deployed on Portal for ArcGIS or your own server, the Youtube api call
	//  won't be perfomed until you set the following flag and provide your own key
	YOUTUBE_DISABLE_ON_PORTAL: true,
	YOUTUBE_API_KEY: "AIzaSyDevTFP16nz6sA-akiOVi6wWXiplJnQ4qw",

	//
	// Builder direct creation
	//

	// Text to be used as the browser page title during app creation
	TPL_NAME: "Map Series",
	TPL_ID: "mapseries",
	WEBAPP_TAG: ["Story Map", "Map Series"],
	WEBAPP_KEYWORD_GENERIC: ["JavaScript", "Map", "Mapping Site", "Online Map", "Ready To Use", "selfConfigured", "Web Map"],
	WEBAPP_KEYWORD_APP: ["Story Map", "Story Maps", "MapSeries"],

	//
	// Portal configuration
	//

	// Optional array of servers that will leverage CORS (for development or specific cross domain deployment)
	CORS_SERVER: [],

	// Optional array of proxy rules
	PROXY_RULES: [
		/*{
			urlPrefix: "http://services.arcgis.com/",
			proxyUrl: "http://myserver.domain.com/DotNet/proxy.ash"
		}*/
	],

	BING_MAPS_KEY: "",
	HELPER_SERVICES: {
		geometry: {
			//url: location.protocol + "//utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer"
		},
		geocode: [
			/*
			{
				url: location.protocol + "//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
				name: "My Geocoder"
			}
			*/
		]
	},

	// Edit those to set a custom sharing or proxy URL
	// You have to edit those only if your webmap is deployed on Portal for ArcGIS instance and if you are not deploying the template on the Portal webserver
	// If you are using ArcGIS Online or deploying the template on a Portal instance, you don't have to edit those URL
	DEFAULT_SHARING_URL: "//www.arcgis.com/sharing/rest/content/items",
	//DEFAULT_SHARING_URL: "//portal.internal.com/arcgis/sharing/rest/content/items",
	DEFAULT_PROXY_URL: "//www.arcgis.com/sharing/proxy"
	//DEFAULT_PROXY_URL: "//portal.internal.com/arcgis/sharing/proxy"
};
