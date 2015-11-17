define(
	 ({
		viewer: {
			common: {
				close: "Закрыть"
			},
			loading: {
				long: "История инициализируется.",
				long2: "Спасибо за ожидание",
				failButton: "Перезагрузить историю"
			},
			signin: {
				title: "Необходима авторизация",
				explainViewer: "Выполните вход под учетной записью на %PORTAL_LINK%, чтобы получить доступ к истории.",
				explainBuilder: "Выполните вход под учетной записью на %PORTAL_LINK%, чтобы настроить историю."
			},
			errors: {
				boxTitle: "Произошла ошибка",
				invalidConfig: "Некорректная настройка",
				invalidConfigNoApp: "Идентификатор картографического веб-приложения не указан в index.html.",
				unspecifiedConfigOwner: "Авторизованный владелец не настроен.",
				invalidConfigOwner: "Владелец истории не авторизован.",
				createMap: "Не удалось создать карту",
				invalidApp: "%TPL_NAME% не существует или недоступен.",
				appLoadingFail: "Произошла ошибка, %TPL_NAME% загружено некорректно.",
				notConfiguredDesktop: "История пока не настроена.",
				notConfiguredMobile: "Конструктор %TPL_NAME% не поддерживается при таком размере экрана.",
				notAuthorized: "Вы не авторизованы для доступа к истории.",
				noBuilderIE: "Конструктор не поддерживается в Internet Explorer версии до %VERSION%. %UPGRADE%",
				noViewerIE: "Эта история не поддерживается в Internet Explorer версии до %VERSION%. %UPGRADE%",
				upgradeBrowser: "<a href='http://browsehappy.com/' target='_blank'>Пожалуйста, обновите браузер</a>.",
				mapLoadingFail: "Произошла ошибка, карта загрузилась некорректно.",
				signOut: "Выйти"
			},
			mobileInfo: {
				legend: "Легенда",
				description: "Описание",
				lblLegendMobileError: "Легенда недоступна. Перезагрузите историю.",
				lblLegendMobileErrorExplain: "Легенда недоступна, если устройство было повернуто в положение Книжной страницы после того, как история была загружена."
			},
			mobileFooter: {
				swipeInvite: "Перелистните, чтобы просмотреть историю",
				lblNext: "Следующий",
				lblEnd: "Вы дошли до конца истории"
			},
			headerFromCommon: {
				storymapsText: "История на карте",
				builderButton: "Редактировать",
				facebookTooltip: "Разместить в Facebook",
				twitterTooltip: "Разместить в Twitter",
				bitlyTooltip: "Получить краткую ссылку",
				templateTitle: "Настроить заголовок шаблона",
				templateSubtitle: "Настроить подзаголовок шаблона",
				share: "Общий доступ",
				checking: "Проверка ресурсов истории",
				fix: "Исправить ошибки в истории",
				noerrors: "Ошибок не обнаружено"
			},
			overviewFromCommon: {
				title: "Обзорная карта"
			},
			legendFromCommon: {
				title: "Легенда"
			},
			shareFromCommon: {
				copy: "Скопировать",
				copied: "Скопировано",
				open: "Открыть",
				embed: "Встроить в веб-страницу",
				embedExplain: "Используйте следующий HTML-код для встраивания истории на веб-страницу.",
				size: "Размер (ширина/высота):"
			},
			locatorFromCommon: {
				error: "Местоположение недоступно"
			}
        }
    })
);