define(
	 ({
		viewer: {
			common: {
				close: "Luk"
			},
			loading: {
				long: "Historien starter",
				long2: "Tak, fordi du venter",
				failButton: "Genindlæs historie"
			},
			signin: {
				title: "Godkendelse kræves",
				explainViewer: "Log ind med en konto på %PORTAL_LINK% for at få adgang til historien.",
				explainBuilder: "Log ind med en konto på %PORTAL_LINK% for at konfigurere historien."
			},
			errors: {
				boxTitle: "Der opstod en fejl",
				invalidConfig: "Ugyldig konfiguration",
				invalidConfigNoApp: "Webkortapplikation-identifikatoren er ikke angivet i index.html.",
				unspecifiedConfigOwner: "Der er ikke konfigureret en uautoriseret ejer.",
				invalidConfigOwner: "Historieejeren er ikke autoriseret.",
				createMap: "Kan ikke oprette kort",
				invalidApp: "%TPL_NAME% findes ikke, eller der er ikke adgang.",
				appLoadingFail: "Der er noget galt, for %TPL_NAME% blev ikke indlæst korrekt.",
				notConfiguredDesktop: "Historien er endnu ikke blevet konfigureret.",
				notConfiguredMobile: "%TPL_NAME%-builder-programmet understøttes ikke ved denne skærmstørrelse.",
				notAuthorized: "Du er ikke autoriseret til at få adgang til denne historie",
				noBuilderIE: "Builder-programmet understøttes ikke i Internet Explorer før version %VERSION%. %UPGRADE%",
				noViewerIE: "Denne historie understøttes ikke i Internet Explorer før version %VERSION%. %UPGRADE%",
				upgradeBrowser: "<a href='http://browsehappy.com/' target='_blank'>Opdatér din browser</a>.",
				mapLoadingFail: "Noget gik galt, kortet blev ikke indlæst korrekt.",
				signOut: "Log ud"
			},
			mobileInfo: {
				legend: "Signaturforklaring",
				description: "Beskrivelse",
				lblLegendMobileError: "Beklager, signaturforklaringen er utilgængelig. Indlæs historien igen.",
				lblLegendMobileErrorExplain: "Signaturforklaringen er ikke tilgængelig, når enheden roteres til stående tilstand, efter at historien er blevet indlæst."
			},
			mobileFooter: {
				swipeInvite: "Stryg med fingeren for at navigere historien",
				lblNext: "Næste",
				lblEnd: "Du er nået til slutningen af historien"
			},
			headerFromCommon: {
				storymapsText: "Et historiekort",
				builderButton: "Redigér",
				facebookTooltip: "Del på Facebook",
				twitterTooltip: "Del på Twitter",
				bitlyTooltip: "Hent et kort link",
				templateTitle: "Indstil skabelontitel",
				templateSubtitle: "Indstil skabelonundertitel",
				share: "Del",
				checking: "Kontrollerer dit historieindhold",
				fix: "Ret fejl i din historie",
				noerrors: "Ingen problemer registreret"
			},
			overviewFromCommon: {
				title: "Oversigtskort"
			},
			legendFromCommon: {
				title: "Signaturforklaring"
			},
			shareFromCommon: {
				copy: "Kopiér",
				copied: "Kopieret",
				open: "Åbn",
				embed: "Indlejr i webside",
				embedExplain: "Brug følgende HTML-kode til at indlejre historien i en webside.",
				size: "Størrelse (bredde/højde):"
			},
			locatorFromCommon: {
				error: "Placering er ikke tilgængelig"
			}
        }
    })
);