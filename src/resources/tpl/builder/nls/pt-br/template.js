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
      "placeholder2": "Se deixado em branco o painel será ocultado.",
      "editorActionsTitle": "Ações da História",
      "editorActionsHelpDescr": "Cria links na sua narrativa que ajudam a contar sua história. Uma Ação da História pode vincular outra seção ou alterar a fase principal. Por exemplo, você pode configurar uma ação para mover o mapa para outro local, ativar ou desativar camadas do mapa, ou alterar a mídia da fase principal para uma imagem, vídeo, mapa ou página da web diferente.",
      "mainStageDisabled": "As Ações da História são desativadas quando o editor é maximizado"
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
      "content4Div1": "Encontrou um erro ou deseja alterar seu material? Sem problemas. Procure o ícone de edição em todo o aplicativo para fazer alterações em seu conteúdo. Você usará as funções de edição muitas vezes enquanto desenvolver seu %TPL_NAME%!",
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
      "lblHelp": "Obter uma Apresentação",
      "quote0": "Sempre há espaço para uma história que pode transportar pessoas para outro lugar.",
      "quote1": "A narrativa é o caminho mais eficaz para expor as idéias no mundo de hoje.",
      "quote2": "As histórias que nós literalmente contamos fazem o mundo. Se você desejar mudar o mundo, você precisa mudar sua história. Esta verdade se aplica ambos para indivíduos e instituições.",
      "quote3": "A menor distância entre um ser humano e a verdade é uma história.",
      "quote4": "As pessoas não querem mais informações. Elas estão atentas a informações. Elas desejam fé–fé em você, em seus objetivos, em seu sucesso, na história que você conta.",
      "quote5": "Eu acredito verdadeiramente que as pessoas estão procurando por histórias que realmente dizem algo–histórias que são remissórias, inspiradoras e maiores que um individual.",
      "quote6": "Se você desejar influenciar um individuo ou um grupo para seguir um valor particular em suas vidas diariamente, conte uma história atrativa.",
      "quote7": "Se você me contar, é uma composição. Se você me mostrar, é uma história.",
      "quote8": "Se você não conhece as árvores, pode estar perdido na floresta, mas se não conhece as histórias, pode estar perdido na vida.",
      "quote9": "As histórias são a conversão criativa da vida propriamente em uma experiência mais significante mais eficiente e limpa. Elas são a moeda corrente de contato humano.",
      "quote10": "Não há agonia maior que carrega uma história não contada dentro de você.",
      "quote11": "Talvez as histórias são apenas dados com uma alma.",
      "quote12": "A história é a única arma eficiente em um arsenal do líder.",
      "quote13": "É a natureza das histórias omitir muito mais que elas incluem."
    }
  }
});