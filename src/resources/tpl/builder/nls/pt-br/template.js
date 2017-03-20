define({
  "builder": {
    "layouts": {
      "tabTitle": "Tabulado",
      "tabDescr": "Apresenta os mapas e outro conteúdo utilizando guias com um painel opcional para texto descritivo.",
      "tabItem": "Guia",
      "tabItems": "Guias",
      "sideTitle": "Lateral Expansível",
      "sideDescr": "Apresenta os mapas e outro conteúdo utilizando um controle expansível que inclui texto descritivo.",
      "sideItem": "Entrada",
      "sideItems": "Entradas",
      "bulletTitle": "Itens Listados",
      "bulletDescr": "Apresenta mapas e outro conteúdo utilizando itens listados com um painel opcional para texto descritivo.",
      "bulletItem": "Marcador",
      "bulletItems": "Pontos"
    },
    "common": {
      "lblStatus1": "Publicado",
      "lblStatus3": "Oculto"
    },
    "settingsLayoutOptions": {
      "title": "Opções de Layout",
      "lblDescription": "Descrição",
      "lblLegend": "Posicionamento da Legenda",
      "tooltipLegend": "Escolha onde você deseja que a legenda do mapa seja exibida. Você pode ativar a legenda para qualquer mapa ao adicioná-lo ou configurá-lo.",
      "lblDropdown": "Suspensão",
      "lblBelowDesc": "Abaixo da descrição",
      "lblOnPanel": "Como um painel",
      "lblPanelDescAndLegend": "Painel de legenda e descrição",
      "lblPanelDescAndOrLegend": "Painel de legenda e/ou descrição",
      "lblPanelDesc": "Painel de descrição",
      "lblPanelLegend": "Painel de legenda",
      "lblPanelAccordion": "Painel Expansível",
      "cfgLeft": "Esquerda",
      "cfgRight": "Direita",
      "cfgSmall": "Pequeno",
      "cfgMedium": "Médio",
      "cfgLarge": "Grande",
      "lblNumbering": "Exibir números",
      "lblReverse": "Inverter numeração",
      "canOverlapMap": "pode sobrepor locais do mapa"
    },
    "settingsMapOptions": {
      "title": "Opções do mapa",
      "lblOverview": "Mapa de Visão Geral",
      "tooltipOverview": "Exibe um pequeno mapa de visão geral junto com o principal mapa.",
      "lblLocate": "Botão Localizar",
      "tooltipLocate": "Permita que seus leitores visualizem sua localização atual no mapa. Esta feição é suportada na maioria dos dispositivos e navegadores, mas o botão aparece somente se você compartilhar sua história como um link de HTTPS e a história não estiver embutida.",
      "lblGeocoder": "Localizador de Feição, Lugar e Endereço",
      "tooltipGeocoder": "Permita que seus leitores procurem por endereços, lugares e/ou feições no seu mapa. As opções de pesquisa podem ser configuradas na página de item do mapa da web em Configurações > Mapa da Web > Aplicativo > Encontrar Locais.",
      "lblSync": "Sincronizar locais do mapa",
      "tooltipSync": "Quando habilitado, o local inicial do primeiro mapa na sua série será aplicado para todos os mapas, e a navegação por usuários em qualquer mapa será refletida em todos os mapas. Desabilite para cada local do mapa para permanecer independente."
    },
    "settingsThemeOptions": {
      "lblOrgTheme": "Tema da Organização",
      "lblModTheme": "Tema Atual"
    },
    "initPopup": {
      "title": "Bem-Vindo ao"
    },
    "addEditPopup": {
      "lblAdd": "Adicionar",
      "lblEdit": "Editar",
      "disabled": "Adicionar está desabilitado, pois o número máximo de %LBL_LAYOUT% permitido foi alcançado.",
      "titleAdd": "Adicionar",
      "titleEdit": "Editar",
      "stepMainStageNextTooltip": "Insira o título e conteúdo do %LBL_LAYOUT%",
      "titlePlaceholder": "Título do %LBL_LAYOUT%..."
    },
    "textEditor": {
      "placeholder1": "Adicione texto, links e pequenos gráficos aqui.",
      "placeholder2": "Se deixado em branco o painel será ocultado."
    },
    "organizePopup": {
      "title": "Organizar",
      "lblHeader": "Arraste e solte %LBL_LAYOUT% para organizar sua história.",
      "lblColTitle": "Título",
      "lblColStatus": "Status",
      "btnApplyWarning": "Confirmar exclusão de %NB% %LBL_LAYOUT%",
      "deleteTooltip": "Excluir",
      "firstSectionExplain": "(A seção local não pode ser movida)"
    },
    "help": {
      "lblHelp": "Ajuda",
      "lblAdd": "Adicionar",
      "lblSettings": "Configurações",
      "lblOrga": "Organizar",
      "lblEdit": "Edições",
      "lblPublish": "Compartilhar",
      "lblTips": "Dicas",
      "lblMore": "Deseja mais?",
      "lblLink": "Visite o site da web de Mapas Históricos da Esri.",
      "content1Div1": "Para criar seu %TPL_NAME%, utilize o botão Adicionar para adicionar cada mapa ou outro conteúdo no layout. O outro conteúdo pode incluir imagens, vídeos ou páginas da web ou código embutido. Por exemplo, você pode desejar que seus leitores visualizem uma imagem ou vídeo de introdução quando abrirem pela primeira vez seu  %TPL_NAME%, antes deles partirem para explorar seus mapas.",
      "content1Div2": "Ao clicar no botão Adicionar, um diálogo aparecerá permitindo a você escolher e configurar o mapa ou outro conteúdo que você deseja adicionar. Por exemplo, você pode especificar o local que deseja mostrar o mapa, ativar sua legenda, etc.",
      "content2Div1": "O diálogo de Configurações é onde você pode alterar o visual do seu %TPL_NAME%. Você altera o layout, escolhe um esquema de cores diferente, escolhe onde aparecerá a legenda do mapa, etc.",
      "content2Div2": "Você também pode substituir o logo da Esri no cabeçalho do seu %TPL_NAME% com seu próprio logo para refletir sua marca. Você também pode especificar o site da web que será iniciado se leitores clicarem no seu logo, de forma que possam obter mais informações.",
      "content3Div1": "O diálogo Organizar permite a você gerenciar seu %TPL_NAME%. Neste diálogo você pode alterar a ordem da série arrastando e soltando.",
      "content3Div2": "Você também pode excluir o conteúdo ou ocultá-lo. É útil se você estiver preparando um novo conteúdo que não está pronto para ser incluído ainda no mapa histórico.",
      "content4Div1": "Encontrou um erro ou deseja alterar o seu material? Não se preocupe. Procure o ícone de edição em todo o aplicativo para fazer alterações no seu conteúdo. Você utilizará as funções de edição várias vezes conforme desenvolver o seu %TPL_NAME%!",
      "content5Div1": "Ao salvar seu %TPL_NAME%, ele é inicialmente privado. Utilize o botão Compartilhar para compartilhá-lo com outros. Você pode compartilhar seu %TPL_NAME% publicamente, assim qualquer usuário poderá utilizá-lo.",
      "content5Div2": "Dependendo da sua conta, você pode também ter a opção para compartilhar seu %TPL_NAME% somente para pessoas dentro da sua organização, então outros não poderão acessá-lo.",
      "content6Div1": "Por padrão, os mapas em uma série são sincronizados para mostrar o mesmo local. Isto significa que o local mostrado no primeiro mapa será automaticamente aplicado para todos os outros mapas, e que se um leitor ampliar ou mover para um local diferente no mapa, ele será atualmente visualizado, isto também será aplicado aos outros mapas.",
      "content6Div2": "Por exemplo se a sua série mostrar diferentes dados temáticos para uma cidade, um leitor poderá ampliar no seu bairro e então simplesmente trocar entre as guias para visualizar os mapas desta área.",
      "content6Div3": "Para desativar a sincronização do local, vá até o diálogo Configurações e desmarque a configuração na guia Opções do Mapa.",
      "content6AltDiv1": "Por padrão, os locais dos mapas são sincronizados. Desativar a sincronização permite que cada mapa apareça em um local diferente.",
      "content6AltDiv2": "Sincronização ATIVADA",
      "content6AltDiv3": "Sincronização DESATIVADA",
      "content6AltDiv4": "Para desativar a sincronização, vá até Configurações > Opções do Mapa e desmarque \"Sincronizar locais do mapa\"."
    },
    "landing": {
      "lblAdd": "Como você deseja chamar sua Série de Mapa do %LAYOUT_TITLE%?",
      "phAdd": "Insira seu título...",
      "lblOR": "Ou",
      "lblHelp": "Obter uma Apresentação"
    }
  }
});