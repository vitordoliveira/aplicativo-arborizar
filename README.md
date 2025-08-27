# 🌳 Aplicativo Arborizar

Este repositório contém o código-fonte do **Aplicativo Arborizar**, uma plataforma gamificada para engajar estudantes no plantio e monitoramento de árvores em Caraguatatuba.

## Visão Geral

O projeto utiliza uma arquitetura de microsserviços para separar as responsabilidades do sistema, garantindo escalabilidade e manutenibilidade.

---

## 🏗️ Arquitetura

- **Estilo Arquitetural**: Microsserviços + Arquitetura Orientada a Eventos (EDA)
- **Comunicação Assíncrona**: RabbitMQ
- **Containerização**: Docker
- **Orquestração**: Kubernetes

### Microsserviços

- `/identity-service`: Gestão de Usuários, Alunos, Professores e Autenticação.
- `/geo-service`: Gestão de Plantios, Monitoramentos e Espécies.
- `/gamification-service`: Lógica de missões, insígnias, pontos e ranking.
- `/notification-service`: (Futuro) Envio de notificações.

---

## 🚀 Tecnologias Principais

- **Backend**: Node.js, NestJS, TypeScript
- **Frontend (App)**: React Native
- **Frontend (Admin)**: React.js
- **Banco de Dados**: PostgreSQL com PostGIS
- **ORM**: TypeORM

---

## ⚙️ Como Rodar o Projeto (Instruções Futuras)

*(Esta seção será preenchida conforme avançamos)*

1. Clone o repositório.
2. Configure as variáveis de ambiente.
3. Execute `docker-compose up -d`.