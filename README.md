![FSW Barber logo](./public/logo.png)


Este repositório contém o projeto desenvolvido durante o evento **Full Stack Week**.


## Preview da Aplicação
## Acesse


Link do  projeto em funcionamento: [FSW Barber](https://fsw-barber-omega-gold.vercel.app/)




![FSW Barber GIF](./public/FSW-Barber.gif)






## Tecnologias Utilizadas


[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React.js](https://img.shields.io/badge/React.js-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![ShadCN](https://img.shields.io/badge/ShadCN-FF6B6B?style=flat&logoColor=white)](https://ui.shadcn.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)






##  Componentes ShadCN


```plaintext
shadcn/
└── ui/
    ├── avatar.tsx       # Representa um avatar de usuário, usado para imagens de perfil.
    ├── badge.tsx        # Exibe pequenas etiquetas ou contadores, geralmente para notificações.
    ├── button.tsx       # Um botão clicável para ações do usuário.
    ├── calendar.tsx     # Um calendário para seleção de datas.
    ├── card.tsx         # Agrupa informações relacionadas de forma visual.
    ├── dialog.tsx       # Um modal para mostrar informações adicionais ou pedir confirmação.
    ├── form.tsx         # Captura dados de entrada do usuário.
    ├── input.tsx        # Campo de entrada para inserção de dados pelo usuário.
    ├── label.tsx        # Identifica campos de entrada ou outras partes da interface.
    ├── sheet.tsx        # Painel deslizante para informações ou controles adicionais.
    └── sonner.tsx       # Componente personalizado, possivelmente para notificações.
```
# Modelagem do Banco de Dados
```plaintext
+------------------+    +------------------+    +------------------+    +------------------+
|      User        |    |     Booking      |    |  Barbershop      |    |  Barbershop      |
+------------------+    +------------------+    |      Service     |    |                  |
| ID (PK)          |    | ID (PK)          |    +------------------+    +------------------+
| Name             |    | Service ID (FK)  |    | ID (PK)          |    | ID (PK)          |
| E-mail           |    | Barbershop ID (FK)|   | Barbershop ID (FK)|   | Name             |
+------------------+    | User ID (FK)     |    | Name             |    | Description      |
                        | Date             |    | Description      |    | Address          |
                        +------------------+    | Image URL        |    | Image URL        |
                                                 | Price            |    +------------------+
                                                 +------------------+


```
| Tabela               | Coluna           | Tipo         | Descrição                          |
|----------------------|------------------|--------------|------------------------------------|
| **User**             | ID               | Primary Key  | Identificador único do usuário     |
|                      | Name             | String       | Nome do usuário                    |
|                      | E-mail           | String       | E-mail do usuário                  |
|                      |                  |              |                                    |
| **Barbershop**       | ID               | Primary Key  | Identificador único da barbearia   |
|                      | Name             | String       | Nome da barbearia                  |
|                      | Description      | Text         | Descrição da barbearia             |
|                      | Address          | String       | Endereço da barbearia              |
|                      | Image URL        | String       | URL da imagem da barbearia         |
|                      |                  |              |                                    |
| **Barbershop Service** | ID             | Primary Key  | Identificador único do serviço     |
|                      | Barbershop ID    | Foreign Key  | ID da barbearia associada          |
|                      | Name             | String       | Nome do serviço                    |
|                      | Description      | Text         | Descrição do serviço               |
|                      | Image URL        | String       | URL da imagem do serviço           |
|                      | Price            | Decimal      | Preço do serviço                   |
|                      |                  |              |                                    |
| **Booking**          | ID               | Primary Key  | Identificador único do agendamento |
|                      | Service ID       | Foreign Key  | ID do serviço associado            |
|                      | Barbershop ID    | Foreign Key  | ID da barbearia associada          |
|                      | User ID          | Foreign Key  | ID do usuário associado            |
|                      | Date             | DateTime     | Data do agendamento                |


## Instalação


Para rodar o projeto localmente, siga os passos abaixo:


1. Clone o repositório:
    ```bash
    git clone git@github.com:danielstos/fsw-barber.git
    ```


2. Instale as dependências:
    ```bash
    npm install
    ```


3. Configure as variáveis de ambiente:
    ```plaintext
    DATABASE_URL=seu-database-url
    ```


4. Execute as migrações do banco de dados:
    ```bash
    npx prisma migrate dev
    ```


5. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```








<div style="display: flex; flex-wrap: wrap; gap: 10px;">
    <img src="./public/barber-preview00.jpeg" alt="FSW Barber PNG" width="160px"/>
    <img src="./public/barber-preview01.jpeg" alt="FSW Barber PNG" width="160px"/>
    <img src="./public/barber-preview02.jpeg" alt="FSW Barber PNG" width="160px"/>
    <img src="./public/barber-preview03.jpeg" alt="FSW Barber PNG" width="160px"/>
    <img src="./public/barber-preview04.jpeg" alt="FSW Barber PNG" width="160px"/>
</div>


## Contato


- **Nome**: Daniel Santos
- **LinkedIn**: [Daniel Stos](https://www.linkedin.com/in/daniel-stos/)
- **Repositório GitHub**: [fsw-barber](https://github.com/danielstos/fsw-barber)



