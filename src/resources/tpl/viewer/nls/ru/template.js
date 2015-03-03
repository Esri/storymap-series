define(
	 ({
		viewer: {
			common: {
				close: "Закрыть"
			},
			loading: {
				long: "Инициализация приложения",
				long2: "Спасибо за ожидание",
				failButton: "Перезагрузить приложение"
			},
			signin: {
				title: "Необходима авторизация",
				explainViewer: "Выполните вход под учетной записью на %PORTAL_LINK%, чтобы получить доступ к приложению.",
				explainBuilder: "Выполните вход под учетной записью на %PORTAL_LINK%, чтобы настроить приложение."
			},
			errors: {
				boxTitle: "Произошла ошибка",
				invalidConfig: "Некорректная настройка",
				invalidConfigNoApp: "Идентификатор картографического веб-приложения не указан в index.html.",
				unspecifiedConfigOwner: "Авторизованный владелец не настроен.",
				invalidConfigOwner: "Владелец приложения не авторизован.",
				createMap: "Не удалось создать карту",
				invalidApp: "%TPL_NAME% не существует или недоступен.",
				appLoadingFail: "Произошла ошибка, %TPL_NAME% загружено некорректно.",
				notConfiguredDesktop: "Приложение пока не настроено.",
				notConfiguredMobile: "Конструктор %TPL_NAME% не поддерживается при таком разрешении экрана.",
				notAuthorized: "Вы не авторизованы для просмотра данного приложения",
				noBuilderIE: "Конструктор не поддерживается в Internet Explorer версии до %VERSION%. %UPGRADE%",
				noViewerIE: "Это приложение не поддерживается в Internet Explorer версии до %VERSION%. %UPGRADE%",
				upgradeBrowser: "<a href='http://browsehappy.com/' target='_blank'>Пожалуйста, обновите браузер</a>.",
				mapLoadingFail: "Произошла ошибка, карта загрузилась некорректно.",
				signOut: "Выйти"
			},
			mobileInfo: {
				legend: "Легенда",
				description: "Описание",
				lblLegendMobileError: "Легенда недоступна. Перезагрузите приложение.",
				lblLegendMobileErrorExplain: "Легенда недоступна, если устройство было повернуто в положение Книжной страницы после того, как приложение было загружено."
			},
			mobileFooter: {
				swipeInvite: "Перелистните, чтобы просмотреть историю",
				lblNext: "Следующий",
				lblEnd: "Вы дошли до конца истории"
			},
			headerFromCommon: {
				storymapsText: "История на карте",
				builderButton: "Редактировать",
				bitlyTooltip: "Получить короткую ссылку на приложение",
				templateTitle: "Настроить заголовок шаблона",
				templateSubtitle: "Настроить подзаголовок шаблона",
				share: "Общий доступ"
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
				embedExplain: "Используйте HTML-код, чтобы встроить приложение в веб-страницу.",
				size: "Размер (ширина/высота):"
			}
        }
    })
);