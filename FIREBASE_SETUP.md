# Configuração do Firebase

## Passo 1: Criar Projeto Firebase

1. Acesse [firebase.google.com](https://firebase.google.com)
2. Clique em "Acessar Console"
3. Clique em "Criar um Projeto"
4. Nomeie como "ProgramaFolio"
5. Finalize a criação

## Passo 2: Configurar Firestore

1. No Console Firebase, clique em **Firestore Database** (no menu esquerdo)
2. Clique em **Criar banco de dados**
3. Selecione **Começar no modo de teste**
4. Escolha a região mais próxima (ex: `southamerica-east1`)

## Passo 3: Obter as Credenciais

1. Vá em **Configurações do Projeto** (ícone de engrenagem ⚙️)
2. Na aba **Geral**, procure por **Configuração**
3. Role para baixo até encontrar o bloco de código JavaScript com `firebaseConfig`
4. Copie as credenciais

Ele deve parecer assim:
```javascript
const firebaseConfig = {
    apiKey: "sua_api_key",
    authDomain: "seu-projeto.firebaseapp.com",
    projectId: "seu-projeto-id",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};
```

## Passo 4: Adicionar Credenciais ao Seu Projeto

1. Abra o arquivo `Jv/firebase-config.js`
2. Substitua as credenciais placeholder pelas suas credenciais reais
3. Salve o arquivo

## Passo 5: Testar

1. Abra seu site no navegador
2. Preencha e envie o formulário "Vamos trabalhar juntos"
3. No Console Firebase, vá em **Firestore Database** e você deve ver uma coleção chamada "mensagens" com seus dados

## Estrutura dos Dados

Cada mensagem será armazenada assim:
```
{
  nome: "Gabriel",
  email: "gabriel@email.com",
  mensagem: "Olá, estou interessado...",
  data: timestamp
}
```

## Notas de Segurança

Atualmente o banco está em "modo de teste" (sem autenticação). 
Para usar em produção, você deve configurar as regras de segurança no Firestore:

1. Vá em **Firestore Database** → **Regras**
2. Configure para aceitar apenas escritas autenticadas

Exemplo seguro:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /mensagens/{document=**} {
      allow write: if request.auth != null;
      allow read: if request.auth != null;
    }
  }
}
```
