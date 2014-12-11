app.cfg = {
	//
	// General UI
	//
	
	// Maximum number of entries
	MAX_NB_ENTRIES: 15,
	
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
					header: "#28323A",
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
					media: "#FFFFFF", 
					// Map Controls background
					mapControls: "#DBD9DA",	
					// Map Controls text
					softText: "#444444", 
					// Map Controls buttons
					softBtn: "#444444", 
					// Esri logo "white" or "black"
					esriLogo: "white",
					esriLogoMobile: "black",
					tab: "#5F788B",
					tabActive: "#58ACCB",
					tabHover: "#49879E",
					tabText: "#FFFFFF",
					tabTextHover: "#FFFFFF",
					tabTextActive: "#FFFFFF"
				},
				{
					name: "tab-default-2", 
					group: "antique",
					themeMajor: "white", 
					header: "#726458",
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
					tab: "#9B9693",
					tabActive: "#BBA594",
					tabHover: "#A49181",
					tabText: "#FFFFFF",
					tabTextHover: "#FFFFFF",
					tabTextActive: "#FFFFFF"
				},
				{
					name: "tab-default-3", 
					group: "bright",
					themeMajor: "white", 
					header: "#6195BE",
					headerTitle: "#FFFFFF", 
					headerText: "#FFFFFF", 
					panel: "#FFFFFF", 
					text: "#333333", 
					textLink: "#555555", 
					media: "#FFFFFF", 
					mapControls: "#FFFFFF",	
					softText: "#444444", 
					softBtn: "#444444", 
					esriLogo: "white",
					esriLogoMobile: "black",
					tab: "#4A7698",
					tabActive: "#A4D1ED",
					tabHover: "#97CCF6",
					tabText: "#000000",
					tabTextHover: "#000000",
					tabTextActive: "#000000"
				},
				{
					name: "tab-default-4", 
					group: "dark",
					themeMajor: "black", 
					header: "#28323A",
					headerTitle: "#FFFFFF", 
					headerText: "#C5D5D5", 
					panel: "#000000", 
					text: "#D8D8D8", 
					textLink: "#CCCCCC", 
					media: "#8C8C8C", 
					mapControls: "#404040",	
					softText: "#C5D5D5", 
					softBtn: "#C5D5D5", 
					esriLogo: "white",
					esriLogoMobile: "white",
					tab: "#666666",
					tabActive: "#8C8C8C",
					tabHover: "#6D7072",
					tabText: "#FEE680",
					tabTextHover: "#FEE680",
					tabTextActive: "#FEE680"
				},
				{
					name: "tab-default-5", 
					group: "green",
					themeMajor: "white", 
                    header: "#3C4739",
                    headerTitle: "#D4E7C2", 
                    headerText: "#81997A", 
                    panel: "#D4E7C2", 
                    text: "#231F20", 
                    textLink: "#555555", 
                    media: "#FFFFFF", 
                    mapControls: "#D4E7C2",    
                    softText: "#444444", 
                    softBtn: "#444444", 
                    esriLogo: "white",
                    esriLogoMobile: "black",
                    tab: "#AFBF9F",
                    tabActive: "#D4E7C2",
                    tabHover: "#B4D895",
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
					header: "#28323A",
					headerTitle: "#FFFFFF", 
					headerText: "#D9D9D9", 
					panel: "#DBD9DA", 
					text: "#000000", 
					textLink: "#555555", 
					media: "#FFFFFF", 
					mapControls: "#DBD9DA",	
					softText: "#444444", 
					softBtn: "#444444", 
					esriLogo: "white", 
					esriLogoMobile: "black",
					// Arrow and entries separator
					accordionArrow: "#58ADCC",
					accordionArrowActive: "#FFFFFF",
					accordionArrowHover: "#9ACCDE",
					accordionNumber: "#5F788B",
					accordionTitle: "#000000"
				},
				{
					name: "accordion-default-2", 
					group: "antique",
					themeMajor: "white", 
					header: "#726458",
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
					accordionArrow: "#9B9693",
					accordionArrowActive: "#404040",
					accordionArrowHover: "#747474",
					accordionNumber: "#BCA594",
					accordionTitle: "#000000"
				},
				{
					name: "accordion-default-3", 
					group: "bright",
					themeMajor: "white", 
					header: "#6195BE",
					headerTitle: "#FFFFFF", 
					headerText: "#FFFFFF", 
					panel: "#FFFFFF", 
					text: "#333333", 
					textLink: "#555555", 
					media: "#FFFFFF", 
					mapControls: "#FFFFFF",	
					softText: "#444444", 
					softBtn: "#444444", 
					esriLogo: "white", 
					esriLogoMobile: "black",
					accordionArrow: "#ACDAFF",
					accordionArrowActive: "#4A7698",
					accordionArrowHover: "#73A0C4",
					accordionNumber: "#4E8DC1",
					accordionTitle: "#333333"
				},
				{
					name: "accordion-default-4", 
					group: "dark",
					themeMajor: "black", 
					header: "#28323A",
					headerTitle: "#FFFFFF", 
					headerText: "#C5D5D5", 
					panel: "#181818", 
					text: "#D8D8D8", 
					textLink: "#CCCCCC", 
					media: "#8C8C8C", 
					mapControls: "#404040",	
					softText: "#C5D5D5", 
					softBtn: "#C5D5D5",
					esriLogo: "white", 
					esriLogoMobile: "white",
					accordionArrow: "#8C8C8C",
					accordionArrowActive: "#FFFFFF",
					accordionArrowHover: "#C0C0C0",
					accordionNumber: "#E5FA84",
					accordionTitle: "#D8D8D8"
				},
				{
					name: "accordion-default-5", 
					group: "green",
                    themeMajor: "white", 
                    header: "#3C4739",
                    headerTitle: "#D4E7C2", 
                    headerText: "#81997A", 
                    panel: "#D4E7C2", 
                    text: "#231F20", 
                    textLink: "#555555", 
                    media: "#FFFFFF", 
                    mapControls: "#D4E7C2",    
                    softText: "#444444", 
                    softBtn: "#444444", 
                    esriLogo: "white",
                    esriLogoMobile: "black",
                	accordionArrow: "#231F20",
					accordionArrowActive: "#99B87E",
					accordionArrowHover: "#81997A",
					accordionNumber: "#3C4739",
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
					header: "#28323A",
					headerTitle: "#FFFFFF", 
					headerText: "#D9D9D9", 
					panel: "#DBD9DA", 
					text: "#000000", 
					textLink: "#555555", 
					media: "#FFFFFF", 
					mapControls: "#DBD9DA",	
					softText: "#444444", 
					softBtn: "#444444", 
					esriLogo: "white",
					esriLogoMobile: "black",
					tab: "#5F788B",
					tabActive: "#58ACCB",
					tabHover: "#49879E",
					tabText: "#FFFFFF",
					tabTextHover: "#FFFFFF",
					tabTextActive: "#FFFFFF"
				},
				{
					name: "bullet-default-2", 
					group: "antique",
					themeMajor: "white", 
					header: "#726458",
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
					tab: "#9B9693",
					tabActive: "#BBA594",
					tabHover: "#A49181",
					tabText: "#FFFFFF",
					tabTextHover: "#FFFFFF",
					tabTextActive: "#FFFFFF"
				},
				{
					name: "bullet-default-3", 
					group: "bright",
					themeMajor: "white", 
					header: "#6195BE",
					headerTitle: "#FFFFFF", 
					headerText: "#FFFFFF", 
					panel: "#FFFFFF", 
					text: "#333333", 
					textLink: "#555555", 
					media: "#FFFFFF", 
					mapControls: "#FFFFFF",	
					softText: "#444444", 
					softBtn: "#444444", 
					esriLogo: "white",
					esriLogoMobile: "black",
					tab: "#4A7698",
					tabActive: "#A4D1ED",
					tabHover: "#97CCF6",
					tabText: "#000000",
					tabTextHover: "#000000",
					tabTextActive: "#000000"
				},
				{
					name: "bullet-default-4", 
					group: "dark",
					themeMajor: "black", 
					header: "#28323A",
					headerTitle: "#FFFFFF", 
					headerText: "#C5D5D5", 
					panel: "#000000", 
					text: "#D8D8D8", 
					textLink: "#CCCCCC", 
					media: "#8C8C8C", 
					mapControls: "#404040",	
					softText: "#C5D5D5", 
					softBtn: "#C5D5D5", 
					esriLogo: "white",
					esriLogoMobile: "white",
					tab: "#666666",
					tabActive: "#8C8C8C",
					tabHover: "#6D7072",
					tabText: "#FEE680",
					tabTextHover: "#FEE680",
					tabTextActive: "#FEE680"
				},
				{
					name: "bullet-default-5", 
					group: "green",
                    themeMajor: "white", 
                    header: "#3C4739",
                    headerTitle: "#D4E7C2", 
                    headerText: "#81997A", 
                    panel: "#D4E7C2", 
                    text: "#231F20", 
                    textLink: "#555555", 
                    media: "#FFFFFF", 
                    mapControls: "#D4E7C2",    
                    softText: "#444444", 
                    softBtn: "#444444", 
                    esriLogo: "white",
                    esriLogoMobile: "black",
                    tab: "#AFBF9F",
                    tabActive: "#D4E7C2",
                    tabHover: "#B4D895",
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
	
	// Control the authorized data source (for initialization and import screen)
	AUTHORIZED_IMPORT_SOURCE: {
		flickr: true,
		facebook: true,
		picasa: true,
		youtube: true
	},
	
	// Online photo sharing services connection parameters
	FLICKR_API_KEY: "750b36a2ac65a72e03cf9cef06d79f45",
	// The Facebook ID is only valid on arcgis.com domain
	// If used on another domain, user will have an error in the Facebook popup after login
	// To use Facebook import on Portal for ArcGIS, create your own ID at https://developers.facebook.com/ 
	// or set AUTHORIZED_IMPORT_SOURCE.facebook to false
	FACEBOOK_APP_ID: "1403302059961274",
	
	//
	// Builder direct creation
	//
	
	// Text to be used as the browser page title during app creation
	TPL_NAME: "Map Series",
	WEBAPP_TAG: ["Story Map", "Map Series"],
	WEBAPP_KEYWORD_GENERIC: ["JavaScript", "Map", "Mapping Site", "Online Map", "Ready To Use", "selfConfigured", "Web Map"],
	WEBAPP_KEYWORD_APP: ["Story Map", "Story Maps", "MapSeries"],

	//
	// Portal configuration
	//
	
	// Optional array of server that will leverage CORS (for developement or specific cross domain deployment)
	CORS_SERVER: [],
	
	// Edit those to set a custom sharing or proxy URL
	// You have to edit those only if your webmap is deployed on Portal for ArcGIS instance and if you are not deploying the template on the Portal webserver
	// If you are using ArcGIS Online or deploying the template on a Portal instance, you don't have to edit those URL
	DEFAULT_SHARING_URL: "//www.arcgis.com/sharing/content/items",
	//DEFAULT_SHARING_URL: "//portal.internal.com/arcgis/sharing/content/items",
	DEFAULT_PROXY_URL: "//www.arcgis.com/sharing/proxy"
	//DEFAULT_PROXY_URL: "//portal.internal.com/arcgis/sharing/proxy"
};