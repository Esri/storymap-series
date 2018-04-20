define({
  "builder": {
    "layouts": {
      "tabTitle": "Tabbed",
      "tabDescr": "Presenta mapas y otro contenido usando pestañas con un panel opcional de texto descriptivo.",
      "tabItem": "Pestaña",
      "tabItems": "Pestañas",
      "sideTitle": "Side Accordion",
      "sideDescr": "Presenta mapas y otro contenido usando un control expandible que incluya texto descriptivo.",
      "sideItem": "Entrada",
      "sideItems": "Entradas",
      "bulletTitle": "Bulleted",
      "bulletDescr": "Presenta mapas y otro contenido usando viñetas con un panel opcional de texto descriptivo.",
      "bulletItem": "Viñeta",
      "bulletItems": "Viñetas"
    },
    "common": {
      "lblStatus1": "Publicado",
      "lblStatus3": "Oculto"
    },
    "settingsLayoutOptions": {
      "title": "Opciones de diseño",
      "lblDescription": "Descripción",
      "lblLegend": "Colocación de leyenda",
      "tooltipLegend": "Selecciona el lugar en el que deseas que se muestre la leyenda del mapa. Puedes activar la leyenda para cualquier mapa al agregarlo o configurarlo.",
      "lblDropdown": "Menú desplegable",
      "lblBelowDesc": "Debajo de la descripción",
      "lblOnPanel": "Como panel",
      "lblPanelDescAndLegend": "Panel de descripción y leyenda",
      "lblPanelDescAndOrLegend": "Panel de descripción y/o leyenda",
      "lblPanelDesc": "Panel de descripción",
      "lblPanelLegend": "Panel de leyenda",
      "lblPanelAccordion": "Panel expandible (Accordion)",
      "cfgLeft": "Izquierda",
      "cfgRight": "Derecha",
      "cfgSmall": "Pequeño",
      "cfgMedium": "Medio",
      "cfgLarge": "Grande",
      "lblNumbering": "Mostrar números",
      "lblReverse": "Invertir numeración",
      "canOverlapMap": "pueden superponer la ubicación del mapa"
    },
    "settingsMapOptions": {
      "title": "Opciones de mapa",
      "lblOverview": "Mapa de vista general",
      "tooltipOverview": "Muestra un pequeño mapa de vista general junto con el mapa principal.",
      "lblLocate": "Botón de localización",
      "tooltipLocate": "Permita que sus lectores vean su ubicación actual en el mapa. Esta característica se admite en la mayoría de los dispositivos y navegadores, pero el botón solo aparece si comparte su historia como vínculo HTTPS y la historia no se ha integrado.",
      "lblGeocoder": "Buscador de direcciones, lugares y entidades",
      "tooltipGeocoder": "Permita a sus lectores buscar direcciones, lugares y entidades en el mapa. Las opciones de búsqueda se pueden configurar en la página de elemento del mapa web en Configuración > Mapa web > Aplicación > Buscar ubicaciones.",
      "lblSync": "Sincronizar ubicaciones del mapa",
      "tooltipSync": "Cuando esté habilitada, la ubicación inicial del primer mapa de tu serie se aplicará a todos los mapas y la navegación de los usuarios en cualquier mapa se reflejará en todos los mapas. Deshabilita para conservar la ubicación independiente en cada mapa."
    },
    "settingsThemeOptions": {
      "lblOrgTheme": "Tema de la organización",
      "lblModTheme": "Tema actual"
    },
    "initPopup": {
      "title": "Bienvenido a"
    },
    "addEditPopup": {
      "lblAdd": "Agregar",
      "lblEdit": "Editar",
      "disabled": "Agregar está desactivado porque se ha alcanzado el número máximo de %LBL_LAYOUT% permitidos.",
      "titleAdd": "Agregar",
      "titleEdit": "Editar",
      "stepMainStageNextTooltip": "Introduce el título y contenido de %LBL_LAYOUT%",
      "titlePlaceholder": "Título de %LBL_LAYOUT%..."
    },
    "textEditor": {
      "placeholder1": "Agrega texto, vínculos y pequeños gráficos aquí.",
      "placeholder2": "Si se deja en blanco, el panel se ocultará.",
      "editorActionsTitle": "Story Actions",
      "editorActionsHelpDescr": "Cree vínculos en su narración que ayuden a contar su historia. Una Story Action puede vincularse a otra sección o cambiar el escenario principal. Por ejemplo, puede configurar una acción para mover el mapa a otra ubicación, activar o desactivar capas de mapa, o bien cambiar el medio del escenario principal por una imagen, vídeo, mapa o página web diferentes.",
      "mainStageDisabled": "Story Actions se deshabilitan cuando se maximiza el editor"
    },
    "organizePopup": {
      "title": "Organizar",
      "lblHeader": "Arrastra y suelta %LBL_LAYOUT% para organizar tu historia.",
      "lblColTitle": "Título",
      "lblColStatus": "Estado",
      "btnApplyWarning": "Confirmar la eliminación de %NB% %LBL_LAYOUT%",
      "deleteTooltip": "Eliminar",
      "firstSectionExplain": "(La sección de inicio no se puede mover)."
    },
    "help": {
      "lblHelp": "Ayuda",
      "lblAdd": "Agregar",
      "lblSettings": "Configuración",
      "lblOrga": "Organizar",
      "lblEdit": "Ediciones",
      "lblPublish": "Compartir",
      "lblTips": "Consejos",
      "lblMore": "¿Necesitas más información?",
      "lblLink": "Visita el sitio web de Esri Story Maps.",
      "content1Div1": "Para crear tu %TPL_NAME%, usa el botón Agregar para agregar cada mapa u otro contenido al diseño. El otro contenido puede incluir imágenes, vídeos o páginas web o código integrados. Por ejemplo, es posible que desees que tus lectores vean una imagen o vídeo introductorios cuando inicien por primera vez tu %TPL_NAME%, antes de que exploren tus mapas.",
      "content1Div2": "Al hacer clic en el botón Agregar, aparecerá un cuadro de diálogo que permite elegir y configurar el mapa u otro contenido que desees agregar. Por ejemplo, puedes especificar la ubicación que quieres que aparezca en el mapa, activar su leyenda, etc.",
      "content2Div1": "En el cuadro de diálogo Configuración, puedes cambiar el aspecto de tu %TPL_NAME%. Puedes cambiar el diseño, elegir un esquema de color diferente, elegir dónde aparecerá la leyenda del mapa, etc.",
      "content2Div2": "También puedes reemplazar el logotipo de Esri en el encabezado de tu %TPL_NAME% por tu propio logotipo para reflejar tu marca. Además, puedes especificar el sitio web que se abrirá si los lectores hacen clic en tu logotipo, de modo que puedan obtener más información.",
      "content3Div1": "El cuadro de diálogo Organizar te permite administrar tu %TPL_NAME%. En este cuadro de diálogo puedes cambiar el orden de la serie arrastrando y soltando.",
      "content3Div2": "También puedes eliminar contenido u ocultarlo. Ocultar resulta útil si preparas nuevo contenido que aún no puede incluirse en tu story map.",
      "content4Div1": "¿Has descubierto un error o deseas cambiar el material? No hay problema: busca el icono de edición en la aplicación para realizar cambios en el contenido. Usarás las funciones de edición muchas veces durante el desarrollo de tu %TPL_NAME%.",
      "content5Div1": "Cuando guardas tu %TPL_NAME%, esta es privada inicialmente. Utiliza el botón Compartir para compartirla con otros. Puedes compartir tu %TPL_NAME% públicamente de modo que cualquiera pueda acceder a ella.",
      "content5Div2": "En función de tu cuenta, es posible que también tengas la opción de compartir tu %TPL_NAME% solo con personas de tu organización, de modo que nadie más pueda acceder a ella.",
      "content6Div1": "De forma predeterminada, los mapas de una serie están sincronizados para mostrar la misma ubicación. Esto significa que la ubicación mostrada en el primer mapa se aplicará automáticamente a los demás mapas y que si un lector hace zoom o se desplaza a otra ubicación del mapa que está consultando, esta también se aplicará a los otros mapas.",
      "content6Div2": "Por ejemplo, si en tu serie aparecen distintos datos temáticos de una ciudad, un lector puede hacer zoom a su barrio y, a continuación, sencillamente alternar entre las pestañas para ver los mapas de esa área.",
      "content6Div3": "Para desactivar la sincronización de la ubicación, ve al cuadro de diálogo Configuración y desactiva esa configuración en la pestaña Opciones de mapa.",
      "content6AltDiv1": "De forma predeterminada, la ubicación de los mapas está sincronizada. La desactivación de la sincronización permite que cada mapa aparezca en una ubicación distinta.",
      "content6AltDiv2": "Sincronización ACTIVADA",
      "content6AltDiv3": "Sincronización DESACTIVADA",
      "content6AltDiv4": "Para desactivar la sincronización, ve a Configuración > Opciones de mapa y desactiva \"Sincronizar ubicaciones del mapa\""
    },
    "landing": {
      "lblAdd": "¿Cómo quieres llamar a tu serie de mapas de %LAYOUT_TITLE%?",
      "phAdd": "Introduce el título...",
      "lblOR": "O",
      "lblHelp": "Realiza una visita introductoria",
      "quote0": "Siempre se puede incluir una historia que pueda transportar a las personas a otro lugar.",
      "quote1": "Hoy en día, la narración de historias es la forma más eficaz de aportar ideas al mundo.",
      "quote2": "Las historias que contamos forman el mundo, literalmente. Si desea cambiar el mundo, debe cambiar su historia. Esta realidad vale tanto para individuos como para instituciones.",
      "quote3": "La distancia más corta entre una persona y la verdad es una historia.",
      "quote4": "La gente no quiere información; ya está hasta el cuello de información. Lo que quieren es fe: fe en usted, en sus objetivos, en su éxito, en la historia que usted cuenta.",
      "quote5": "Creo sinceramente que la gente busca historias que cuenten algo real; historias reveladoras, inspiradoras y que vayan más allá de la propia naturaleza del individuo.",
      "quote6": "Si desea influir en una persona o un grupo para que adopten un valor concreto en su vida diaria, cuénteles una historia atractiva.",
      "quote7": "Si me lo cuenta, es un ensayo; si me lo muestra, es una historia.",
      "quote8": "Si no conoce los árboles, puede perderse en el bosque; pero si no conoce las historias, puede perderse en la vida misma.",
      "quote9": "Las historias son la conversión creativa de la vida misma en una experiencia más potente, más clara y más significativa. Son la moneda del contacto humano.",
      "quote10": "No existe mayor agonía que la de cargar con una historia acallada.",
      "quote11": "Quizá las historias sean simplemente datos con alma.",
      "quote12": "Las historias son el arma más potente del arsenal de un líder.",
      "quote13": "Por su naturaleza, las historias dejan fuera más de lo que cuentan."
    }
  }
});