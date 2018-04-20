define({
  "builder": {
    "layouts": {
      "tabTitle": "Com separadores",
      "tabDescr": "Apresente mapas e outro conteúdo utilizando separadores com um painel opcional para texto descritivo.",
      "tabItem": "Separador",
      "tabItems": "Separadores",
      "sideTitle": "Acordeão Lateral",
      "sideDescr": "Apresente mapas e outro conteúdo utilizando um controlo expansível que inclui texto descritivo.",
      "sideItem": "Entrada",
      "sideItems": "Entradas",
      "bulletTitle": "Com Marcas",
      "bulletDescr": "Apresente mapas e outro conteúdo utilizando marcas com um painel opcional para texto descritivo.",
      "bulletItem": "Marca",
      "bulletItems": "Marcas"
    },
    "common": {
      "lblStatus1": "Publicado",
      "lblStatus3": "Ocultado"
    },
    "settingsLayoutOptions": {
      "title": "Ópções de layout",
      "lblDescription": "Descrição",
      "lblLegend": "Posicionamento de legendas",
      "tooltipLegend": "Escolha onde pretende que a legenda do mapa seja apresentada. Pode ligar a legenda para qualquer mapa quando o adiciona ou configura.",
      "lblDropdown": "Pendente",
      "lblBelowDesc": "Abaixo da descrição",
      "lblOnPanel": "Como painel",
      "lblPanelDescAndLegend": "Painel de descrição e legenda",
      "lblPanelDescAndOrLegend": "Painel de descrição e/ou de legenda",
      "lblPanelDesc": "Painel de descrição",
      "lblPanelLegend": "Painel de legenda",
      "lblPanelAccordion": "Painel em acordeão",
      "cfgLeft": "Esquerda",
      "cfgRight": "Direita",
      "cfgSmall": "Pequeno",
      "cfgMedium": "Médio",
      "cfgLarge": "Grande",
      "lblNumbering": "Exibir números",
      "lblReverse": "Reverter a numeração",
      "canOverlapMap": "pode sobrepor-se à localização de mapa"
    },
    "settingsMapOptions": {
      "title": "Opções de mapa",
      "lblOverview": "Mapa de Vista Geral",
      "tooltipOverview": "Exibe um pequeno mapa de vista geral juntamente com o mapa principal.",
      "lblLocate": "Botão Localizar",
      "tooltipLocate": "Permita que os seus leitores visualizem a respetiva posição atual no mapa. Esta funcionalidade é suportada na maioria dos dispositivos e navegadores, mas o botão apenas é apresentado se partilhar a sua história como ligação HTTPS e a história não se encontrar incorporada.",
      "lblGeocoder": "Localizador (Finder) de Endereços, Locais e Elementos",
      "tooltipGeocoder": "Permita que os seus leitores procurem endereços, locais e/ou elementos no seu mapa. As opções de pesquisa podem ser configuradas na página do item de um mapa web, em Definições > Mapa Web > Aplicação > Encontrar Locais.",
      "lblSync": "Localizações de mapas sincronizadas",
      "tooltipSync": "Quando está ativa, a localização inicial do primeiro mapa na sua série será aplicada a todos os mapas e a navegação dos utilizadores em qualquer mapa irá refletir-se em todos os mapas. Desative a localização de cada mapa para que se mantenha independente."
    },
    "settingsThemeOptions": {
      "lblOrgTheme": "Tema da Organização",
      "lblModTheme": "Tema Atual"
    },
    "initPopup": {
      "title": "Bem-vindo a"
    },
    "addEditPopup": {
      "lblAdd": "Adicionar",
      "lblEdit": "Editar",
      "disabled": "Adicionar encontra-se desativado porque o número máximo permitido de LBL_LAYOUT foi atingido.",
      "titleAdd": "Adicionar",
      "titleEdit": "Editar",
      "stepMainStageNextTooltip": "Introduza o título e conteúdo do %LBL_LAYOUT%",
      "titlePlaceholder": "Título do %LBL_LAYOUT%..."
    },
    "textEditor": {
      "placeholder1": "Adicione texto, ligações e pequenos gráficos aqui.",
      "placeholder2": "Se for deixado em branco, o painel será ocultado.",
      "editorActionsTitle": "Story Actions",
      "editorActionsHelpDescr": "Crie ligações na sua narrativa que ajudam a contar a sua história. Uma Story Action pode ligar a outra secção ou alterar o ecrã principal. Por exemplo, pode configurar uma ação para mover o mapa para outra localização, alternar camadas entre ligado/desligado, ou alterar o recurso de media do ecrã principal para uma imagem, vídeo ou página web diferente.",
      "mainStageDisabled": "As Story Actions ficam desativadas quando o editor se encontra maximizado"
    },
    "organizePopup": {
      "title": "Organizar",
      "lblHeader": "Arraste e solte %LBL_LAYOUT% para organizar a sua história.",
      "lblColTitle": "Título",
      "lblColStatus": "Estado",
      "btnApplyWarning": "Confirme a eliminação do %NB% %LBL_LAYOUT%",
      "deleteTooltip": "Eliminar",
      "firstSectionExplain": "(A secção inicial não pode ser movida)"
    },
    "help": {
      "lblHelp": "Ajuda",
      "lblAdd": "Adicionar",
      "lblSettings": "Definições",
      "lblOrga": "Organizar",
      "lblEdit": "Edições",
      "lblPublish": "Partilha",
      "lblTips": "Dicas",
      "lblMore": "Quer saber mais?",
      "lblLink": "Visite o site web Esri Story Maps.",
      "content1Div1": "Para criar o seu %TPL_NAME%, utilize o botão Adicionar para adicionar o seu mapa ou outros conteúdos ao layout. Os outros conteúdos podem incluir imagens, vídeos ou páginas web ou código incorporados. Por exemplo, pode querer que os seus leitores visualizem uma imagem ou vídeo introdutório quando pela primeira vez iniciam o seu %TPL_NAME%, antes de começarem a explorar os seus mapas.",
      "content1Div2": "Quando clica no botão Adicionar surge uma caixa de diálogo que lhe permite escolher e configurar o mapa ou outros conteúdos que pretenda adicionar. Por exemplo, pode especificar a localização que pretende que o mapa exiba, ativar legendas, etc.",
      "content2Div1": "A caixa de diálogo Definições é onde pode alterar a aparência do seu %TPL_NAME%. É lá que altera o layout, escolhe um esquema de cores diferente, define onde a legenda do mapa irá aparecer, etc.",
      "content2Div2": "Pode ainda substituir o logo da Esri no cabeçalho do seu TPL_NAME pelo seu próprio logo para exibir a sua marca. Pode ainda especificar o site web que será aberto caso os seus utilizadores cliquem no seu logo, para que possam aceder a mais informações.",
      "content3Div1": "A caixa de diálogo Organizar permite-lhe gerir o seu %TPL_NAME%. Nesta caixa de diálogo pode alterar a ordem da série arrastando e soltando.",
      "content3Div2": "Pode também eliminar ou ocultar conteúdo. Ocultar é útil se estiver a preparar novo conteúdo que ainda não está pronto para ser incluído no seu mapa.",
      "content4Div1": "Encontrou um erro ou quer alterar o seu material? Não há problema. Procure o ícone de edição na aplicação para aplicar alterações ao seu conteúdo. Irá utilizar as funções de edição muitas vezes à medida que desenvolve o seu %TPL_NAME%!",
      "content5Div1": "Quando guarda o seu %TPL_NAME% este é privado. Utilize o botão Partilhar para o partilhar com outros. Pode partilhar o seu %TPL_NAME% publicamente para que qualquer pessoa possa aceder.",
      "content5Div2": "Dependendo da sua conta, pode também ter a opção de partilhar o seu %TPL_NAME% apenas com pessoas da sua organização, para que outros não possam aceder.",
      "content6Div1": "Por defeito, os mapas numa série são sincronizados para exibirem a mesma localização. Isto significa que a localização exibida no primeiro mapa será automaticamente aplicada a todos os outtros mapas e que se um leitor fizer zoom ou se mover para uma localização diferente no mapa que está a ver, estas ações serão aplicadas a todos os mapas.",
      "content6Div2": "Por exemplo, se a sua série exibir dados temáticos diferentes para uma mesma cidade, um leitor pode fazer zoom para o seu bairro e depois, simplesmente, alternar entre separadores para visualizar o mapa dessa área.",
      "content6Div3": "Para desativar a sincronização de localização, vá à caixa de diálogo Definições no separa dor Opções do Mapa.",
      "content6AltDiv1": "Por defeito, as localizações de mapa estão sincronizadas. Desativar a sincronização permite que cada mapa exiba uma localização difernte.",
      "content6AltDiv2": "Sincronização LIGADA",
      "content6AltDiv3": "Sincronização DESLIGADA",
      "content6AltDiv4": "Para desativar a sincronização de mapas, vá a Definições > Opções de Mapa e desmarque \"Sincronizar localizações de mapa\"."
    },
    "landing": {
      "lblAdd": "Que nome quer dar à sua série de mapas %LAYOUT_TITLE%?",
      "phAdd": "Introduza o seu título...",
      "lblOR": "Ou",
      "lblHelp": "Veja uma Apresentação",
      "quote0": "Existe sempre espaço para uma história que pode transportar-nos para outro lugar.",
      "quote1": "Contar histórias é a forma mais poderosa de colocar ideias no mundo nos dias que correm.",
      "quote2": "As histórias que contamos constroem, literalmente, o mundo. Se quer mudar o mundo, necessita de mudar a sua história. Esta verdade aplica-se tanto a indivíduos como a instituições.",
      "quote3": "A menor distância entre um ser humano e a verdade é uma história.",
      "quote4": "As pessoas não pretendem mais informação. Estão fartas de informação. Querem confiar em si, nos seus objetivos, no seu sucesso, na história que conta.",
      "quote5": "Acredito realmente que as pessoas procuram histórias que tenham significado real, histórias redentoras, inspiradoras e maiores do que um indivíduo.",
      "quote6": "Se pretende influenciar um indivíduo ou grupo para que adote um valor específico na sua vida, conte-lhe uma história envolvente.",
      "quote7": "Se me contar, é um ensaio. Se me mostrar, é uma história.",
      "quote8": "Se não conhecer as árvores, pode perder-se na floresta, mas se não conhecer as histórias, pode perder-se na vida.",
      "quote9": "As histórias representam a conversão criativa da própria vida numa experiência mais poderosa, mais clara, com mais significado. São a divisa do contacto humano.",
      "quote10": "Não existe maior desespero do que trazer uma história por contar dentro de si.",
      "quote11": "Talvez as histórias sejam apenas dados com alma.",
      "quote12": "As histórias são a mais poderosa das armas do arsenal de um líder.",
      "quote13": "Faz parte da natureza das histórias deixar de fora muito mais do que aquilo que incluem."
    }
  }
});