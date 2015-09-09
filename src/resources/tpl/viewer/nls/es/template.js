define(
	 ({
		viewer: {
			common: {
				close: "Cerrar"
			},
			loading: {
				long: "La aplicación se está inicializando",
				long2: "Gracias por esperar",
				failButton: "Volver a cargar la aplicación"
			},
			signin: {
				title: "Se requiere autenticación",
				explainViewer: "Inicia sesión con una cuenta en %PORTAL_LINK% para acceder a la aplicación.",
				explainBuilder: "Inicia sesión con una cuenta en %PORTAL_LINK% para configurar la aplicación."
			},
			errors: {
				boxTitle: "Se ha producido un error",
				invalidConfig: "Configuración no válida",
				invalidConfigNoApp: "No se ha especificado el identificador de la aplicación de representación cartográfica en la red en index.html.",
				unspecifiedConfigOwner: "El propietario autorizado no se ha configurado.",
				invalidConfigOwner: "El propietario de la aplicación no está autorizado.",
				createMap: "No se puede crear el mapa",
				invalidApp: "No se puede acceder a %TPL_NAME% o no existe.",
				appLoadingFail: "Se ha producido un error, %TPL_NAME% no se cargó correctamente.",
				notConfiguredDesktop: "La aplicación no se ha configurado todavía.",
				notConfiguredMobile: "El builder de %TPL_NAME% no es compatible con esta resolución de pantalla.",
				notAuthorized: "No tienes autorización para acceder a esta aplicación",
				noBuilderIE: "El builder no es compatible con versiones de Internet Explorer anteriores a la %VERSION%. %UPGRADE%",
				noViewerIE: "Esta aplicación no es compatible con versiones de Internet Explorer anteriores a la %VERSION%. %UPGRADE%",
				upgradeBrowser: "<a href='http://browsehappy.com/' target='_blank'>Actualiza tu navegador</a>.",
				mapLoadingFail: "Se ha producido un error, el mapa no se cargó correctamente.",
				signOut: "Cerrar sesión"
			},
			mobileInfo: {
				legend: "Leyenda",
				description: "Descripción",
				lblLegendMobileError: "Lo sentimos, la leyenda no está disponible. Vuelve a cargar la aplicación.",
				lblLegendMobileErrorExplain: "La leyenda no está disponible cuando el dispositivo se rota a modo vertical una vez cargada la aplicación."
			},
			mobileFooter: {
				swipeInvite: "Desliza para navegar por la historia",
				lblNext: "Siguiente",
				lblEnd: "Has llegado al final de la historia"
			},
			headerFromCommon: {
				storymapsText: "Un story map",
				builderButton: "Editar",
				facebookTooltip: "Compartir en Facebook",
				twitterTooltip: "Compartir en Twitter",
				bitlyTooltip: "Obtén un vínculo corto",
				templateTitle: "Establecer título de plantilla",
				templateSubtitle: "Establecer subtítulo de plantilla",
				share: "Compartir"
			},
			overviewFromCommon: {
				title: "Mapa de vista general"
			},
			legendFromCommon: {
				title: "Leyenda"
			},
			shareFromCommon: {
				copy: "Copiar",
				copied: "Copiado",
				open: "Abrir",
				embed: "Integrar en página web",
				embedExplain: "Usa el siguiente código HTML para integrar la aplicación en una página web.",
				size: "Tamaño (ancho/alto):"
			}
        }
    })
);