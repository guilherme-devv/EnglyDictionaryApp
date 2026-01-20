# English Dictionary Challenge - Coodesh

Eu desenvolvi esta aplicação moderna e de alta performance em React Native para consulta de definições de palavras em inglês, gerenciamento de favoritos e acompanhamento do histórico de buscas.

Eu construí este projeto seguindo a arquitetura **MVVM (Model-View-ViewModel)** para garantir código limpo, facilidade de manutenção e escalabilidade.


## 🚀 Tecnologias Utilizadas

- **React Native & Expo**: Desenvolvimento multiplataforma.
- **TypeScript**: Garantindo segurança de tipos e melhor experiência de desenvolvimento.
- **Zustand**: Gerenciamento de estado global para sincronização em tempo real entre as telas.
- **Axios**: Busca de dados da API com tratamento estruturado.
- **Async Storage**: Persistência local para favoritos e histórico.
- **Expo Audio**: Reprodução de áudio para pronúncias das palavras.
- **Lucide React Native**: Iconografia moderna e consistente.
- **Skeleton Loaders**: Experiência de usuário (UX) aprimorada com estados de carregamento estruturados.


## 🧠 Meu Processo de Investigação e Desenvolvimento

Eu dividi o processo de desenvolvimento em várias fases principais, priorizando a qualidade do código e a experiência do usuário:

### 1. Análise Arquitetural (MVVM)
Eu identifiquei que a base de código inicial tinha lógica de negócio fortemente acoplada aos componentes de UI. Para resolver isso, eu migrei para **MVVM**:
- **Models**: Defini a estrutura de dados da API de Dicionário.
- **ViewModels**: Centralizei a lógica de busca de palavras, gerenciamento de paginação e manipulação de favoritos/histórico.
- **Services**: Abstraí o acesso a dados (API, Storage, Áudio) em classes especializadas.

### 2. Gerenciamento de Estado (Integração com Zustand)
Para resolver o problema onde favoritar uma palavra não atualizava imediatamente outras telas, eu implementei o **Zustand**.
- **Fonte Única de Verdade**: Criei `useFavoritesStore` e `useHistoryStore` para gerenciar o estado global.
- **UI Reativa**: Configurei todas as telas para observarem essas stores, permitindo atualizações instantâneas sem a necessidade de recarregamento manual.

### 3. Experiência do Usuário e Refinamento
- **Skeleton Loaders**: Substituí os indicadores de carregamento genéricos por placeholders específicos de cada tela (`WordItemSkeleton`, `DetailSkeleton`) para reduzir o tempo de espera percebido.
- **Limpeza de Código**: Removi todos os `console.log` e comentários, substituindo saídas de depuração por `Alert.alert()` para fornecer feedback significativo ao usuário em caso de erros.
- **Otimização**: Apliquei "Guard Clauses" e padrões modernos de JS (optional chaining, nullish coalescing) para reduzir a complexidade de `if/else` em cerca de 40%.

### 4. Tratamento Robusto de Erros
Eu integrei uma lógica de parsing de erros estruturada para a API de Dicionário, permitindo que o app exiba informações detalhadas (Título, Mensagem, Resolução) em vez de alertas genéricos de falha.


## 🛠️ Instalação e Uso

### Pré-requisitos
- Node.js (Versão 22+ recomendada)
- App Expo Go no seu dispositivo móvel (iOS/Android)

### Passos

1. **Clone o repositório**:
   ```bash
   git clone <url-do-repositorio>
   cd EnglyDictionaryApp
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npx expo start
   ```

4. **Rode no dispositivo**:
   Escaneie o QR code exibido no terminal com a câmera do seu celular (iOS) ou pelo app Expo Go (Android).

---

## 📝 Estrutura do Projeto
```text
src/
├── models/              # Estruturas de dados
├── viewmodels/          # Camada de lógica de negócio
├── services/            # Acesso a API, Storage e Áudio
├── stores/              # Estado global com Zustand
├── components/          # UI Reutilizável (Componentes Atômicos)
├── config/              # Constantes e configuração de API
└── hooks/               # Integração com React (useViewModel, etc)
```

---

> [!IMPORTANT]
> This is a challenge by **Coodesh**.
