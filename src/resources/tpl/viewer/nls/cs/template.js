define(
	 ({
		viewer: {
			common: {
				close: "Zavřít"
			},
			loading: {
				long: "Aplikace se inicializuje",
				long2: "Děkujeme za strpení",
				failButton: "Znovu načíst aplikaci"
			},
			signin: {
				title: "Je vyžadováno ověření",
				explainViewer: "Pro přístup do aplikace se přihlaste pomocí účtu na %PORTAL_LINK%.",
				explainBuilder: "Chcete-li aplikaci nakonfigurovat, přihlaste se pomocí účtu na %PORTAL_LINK%."
			},
			errors: {
				boxTitle: "Došlo k chybě",
				invalidConfig: "Neplatná konfigurace",
				invalidConfigNoApp: "V souboru index.html není zadán identifikátor aplikace pro webové mapování.",
				unspecifiedConfigOwner: "Nebyl nakonfigurován autorizovaný vlastník.",
				invalidConfigOwner: "Vlastník aplikace není autorizován.",
				createMap: "Nelze vytvořit mapu",
				invalidApp: "%TPL_NAME% neexistuje nebo není dostupný.",
				appLoadingFail: "Něco se pokazilo, %TPL_NAME% se nenahrál správně.",
				notConfiguredDesktop: "Aplikace zatím není nakonfigurována.",
				notConfiguredMobile: "Nástroj pro tvorbu %TPL_NAME% není v tomto rozlišení obrazovky podporován.",
				notAuthorized: "Nemáte oprávnění k přístupu do této aplikace.",
				noBuilderIE: "Nástroj pro tvorbu není podporován v aplikaci Internet Explorer ve verzi nižší než %VERSION%. %UPGRADE%",
				noViewerIE: "Tato aplikace není podporována v prohlížeči Internet Explorer ve verzi nižší než %VERSION%. %UPGRADE%",
				upgradeBrowser: "<a href='http://browsehappy.com/' target='_blank'>Aktualizujte prohlížeč</a>.",
				mapLoadingFail: "Něco se pokazilo, mapa se nenahrála správně.",
				signOut: "Odhlásit"
			},
			mobileInfo: {
				legend: "Legenda",
				description: "Popis",
				lblLegendMobileError: "Legenda bohužel není k dispozici. Načtěte aplikaci znovu.",
				lblLegendMobileErrorExplain: "Legenda nebude k dispozici v případě, že je po načtení aplikace zařízení v režimu na výšku."
			},
			mobileFooter: {
				swipeInvite: "Procházejte příběhem potáhnutím prstem",
				lblNext: "Další",
				lblEnd: "Dosáhli jste konce příběhu"
			},
			headerFromCommon: {
				storymapsText: "Mapa s příběhem",
				builderButton: "Upravit",
				facebookTooltip: "Sdílet na Facebooku",
				twitterTooltip: "Sdílet na Twitteru",
				bitlyTooltip: "Získat krátký odkaz",
				templateTitle: "Zadejte název šablony",
				templateSubtitle: "Zadejte podnadpis šablony",
				share: "Sdílení"
			},
			overviewFromCommon: {
				title: "Mapa přehledu"
			},
			legendFromCommon: {
				title: "Legenda"
			},
			shareFromCommon: {
				copy: "Kopírovat",
				copied: "Zkopírováno",
				open: "Otevřít",
				embed: "Vložit do webové stránky",
				embedExplain: "Použijte následující kód HTML ke vložení aplikace do webové stránky.",
				size: "Velikost (šířka/výška):"
			}
        }
    })
);