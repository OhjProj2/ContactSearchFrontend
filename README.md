
# ContactSearch

[![CI](https://github.com/OhjProj2/ContactSearchFrontend/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/OhjProj2/ContactSearchFrontend/actions/workflows/ci.yml)
[![Playwright Tests](https://github.com/OhjProj2/ContactSearchFrontend/actions/workflows/playwright.yml/badge.svg)](https://github.com/OhjProj2/ContactSearchFrontend/actions/workflows/playwright.yml)

ContactSearch is a website, made for easy contact information search on different sites. It uses AI to gather and structurize the information.

## Technologies

### Architecture

```mermaid
graph LR
    %% Style Definitions
    classDef user fill:#4a69bd,stroke:#fff,stroke-width:2px,color:#fff;
    classDef cicd fill:#8e44ad,stroke:#fff,stroke-width:1px,color:#fff;
    classDef prod fill:#e74c3c,stroke:#fff,stroke-width:1px,color:#fff;
    classDef frontend fill:#00a8ff,stroke:#fff,stroke-width:1px,color:#fff;
    classDef backend fill:#27ae60,stroke:#fff,stroke-width:1px,color:#fff;
    classDef external fill:#f39c12,stroke:#fff,stroke-width:1px,color:#fff;

    %% User
    User((User)):::user

    %% CI/CD - GitHub Actions
    subgraph CICD [CI/CD — GitHub Actions]
        direction TB
        FP[Frontend pipeline<br/>Vitest + Playwright]:::cicd
        BP[Backend pipeline<br/>pytest + Ruff]:::cicd
    end

    %% Production Environment
    subgraph Prod [Production Environment]
        direction TB
        RF[Render<br/>Frontend]:::prod
        CRB[CSC Rahti<br/>Backend]:::prod
    end

    %% Frontend - React + TypeScript
    subgraph FE [Frontend — React + TypeScript]
        UI[User Interface]:::frontend
    end

    %% Backend - FastAPI + Python
    subgraph BE [Backend — FastAPI + Python]
        direction TB
        LLM_INT[LLM Integration<br/>LangChain]:::backend
        RAPI[REST API]:::backend
        WC[Web Crawler<br/>Crawl4AI]:::backend
        
        RAPI --- LLM_INT
        RAPI --- WC
    end

    %% External Services
    subgraph Ext [External Services]
        direction TB
        Ollama[Ollama<br/>LLM Server]:::external
        DB[(MongoDB Atlas)]:::external
        Sites[Target Websites]:::external
    end

    %% Connections and Arrows
    User -- "URLs + roles + fields" --> UI
    UI -- "Results table + CSV" --> User

    FP -- "Deploy" --> RF
    BP -- "Docker build + push" --> CRB

    UI -- "HTTP/JSON" --> RAPI
    RAPI -- "Contact data" --> UI

    LLM_INT -- "Prompt + schema" --> Ollama
    Ollama -- "Structured JSON" --> LLM_INT

    RAPI -- "Saves & fetches" --> DB
    
    WC -- "Crawls sites" --> Sites
```

### Languages

- Typescript
- HTML
- CSS

### Libraries

- React
- HeroUI
- TailwindCSS
- Papaparser

### Testing

#### Unit / Component tests

- Vitest
- React Testing Library
- jest-dom
- jsdom

#### End-to-End tests

- Playwright

After installing dependencies, install browsers:

```bash
npx playwright install
```

Playwright tests simulate real user interactions in the browser.  
Backend API calls are mocked to ensure stable and fast test execution.

## Installation

You can install frontend with next steps:

Clone the project

```bash
  git clone https://github.com/OhjProj2/ContactSearchFrontend.git
```

Go to the project directory

```bash
  cd ContactSearchFrontend
```

Install dependencies

```bash
  npm install
```

## Run Locally

Start the server

```bash
  npm run dev
```

or

```bash
  npm run start
```

## Run Unit Tests Locally

```bash
npm test
```

## Run E2E Test Locally

- The frontend must be running locally (`npm run dev`)
- The backend is NOT required, as API calls are mocked using Playwright route interception

```bash
npx playwright test
```

## Authors

- [@Prshkv](https://www.github.com/Prshkv)
- [@eetuhellberg](https://www.github.com/eetuhellberg)
- [@Energyjoe](https://www.github.com/Energyjoe)
- [@Matimane](https://www.github.com/Matimane)
- [@VeeraElo](https://www.github.com/VeeraElo)

ContactSearch is licensed under [MIT license](./LICENSE.md).

