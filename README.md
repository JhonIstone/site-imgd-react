#Site Web em React

Site baseado no fandom da banda norte americana Imagine Dragons.
O site foi feito baseado na banda Imagine Dragons mas tentando deixar o mais genericos possivel, sendo necessario apenenas a troca de imagens e algumas caracteristicas especificas da banda em questão para tornar o site viavel para qualquer outra banda, ou ate para outros propositos.
O site foi feito com o intuito me ajudar a estudar e praticar as tecnologias front-end com o React Js como tecnogia principal e é a segunda versão do meu primeiro contato com javascript e front-end na primeira versão do site, disponivel em: https://github.com/JhonIstone/ProjetoSiteIMGD

Para este web site foram utilizados as tecnologias: ReactJs, Javascript, Html, Css, Bootstrap, swiperjs, Firebase (para persistencia de dados e autenticação de usuarios).
Para visitar o site -> https://imaginedragonsfas.netlify.app/

## Paginas

### Login

Na tela de login os usuarios ja cadastrados podem fazer login para obter acesso aos recursos do site, atraves do seu email e senha.

### Registro

Na tela de registro de usuario usuarios não cadastrados podem se cadastrar informando seu nome, email e senha, tendo assim acesso aos recursos do site.

### / ou Musicas

#### Header fixo
O header fixo é um painel onde fica a barra de navegação do site, um carousel bootstrap com algumas frases, alem do local para deslogar do usuario, com seu nome.
Na barra de navegação estão os links para as paginas de Musicas, Fotos e Noticias da banda.

O header é um componente react que esta presente em todas as paginas do site (musicas, fotos, noticias)

### Slide Musicas
Quando o usuario tem uma musica cadastrada é adicionado o component de SliderMusic que retorna uma SwiperSlider do swiperjs onde o usuario pode dar play em frame de video da musica, retirado do yotube, através do icone de X é possivel tambem deletar a musica e clicando no titulo da musica voce é levado a pagina da musica, onde voce encontra a letra, e algumas informações sobre a musica, é feito para ser um local onde os usuarios possam acompanhar a letra da musica enquanto escutam.

Cada nova musica pode ser inserida a seu respectivo album atraves do formulario acionado pelo botao "Adicionar Musica"
Cada usuario tem sua base de dados de musica pessoal!

### /Fotos

A pagina de fotos traz uma biblioteca compartilhada com todos os usuarios com fotos da banda, outras fotos podem ser adicionadas livremente pelos usuarios.

### /Noticias

A pagina de noticias trás outro ambiente compartilhado de frames extraidos das redes sociais (instagram, twitter) onde os usuarios podem postar noticias, memes e etc relacionados a banda.

## Footer
O footer trás alguma informações de contato do desenvolvedor do site.
