# Códigos de Status HTTP

## 🚀 Mais usados

**200 OK**
- **Significado**: Sucesso
- **Descrição**: Requisição bem-sucedida.

**201 Created**
- **Significado**: Recurso criado
- **Descrição**: Recurso criado com sucesso (ex: POST).

**204 No Content**
- **Significado**: Sem conteúdo
- **Descrição**: Requisição OK, mas sem corpo de resposta.

**400 Bad Request**
- **Significado**: Requisição inválida
- **Descrição**: Requisição malformada.

**401 Unauthorized**
- **Significado**: Não autorizado
- **Descrição**: Não autorizado (precisa de autenticação).

**403 Forbidden**
- **Significado**: Proibido
- **Descrição**: Sem permissão para acessar.

**404 Not Found**
- **Significado**: Não encontrado
- **Descrição**: Recurso não encontrado.

**500 Internal Server Error**
- **Significado**: Erro interno
- **Descrição**: Erro interno no servidor.

## 1xx - Informativo

**100 Continue**
- **Descrição**: O servidor recebeu os cabeçalhos, continue com o corpo da requisição.

**101 Switching Protocols**
- **Descrição**: Mudança de protocolo conforme solicitado pelo cliente.

## 2xx - Sucesso

**200 OK**
- **Descrição**: Requisição bem-sucedida.

**201 Created**
- **Descrição**: Recurso criado com sucesso (ex: POST).

**202 Accepted**
- **Descrição**: Requisição aceita para processamento, mas não concluída.

**204 No Content**
- **Descrição**: Requisição OK, mas sem corpo de resposta.

## 3xx - Redirecionamento

**301 Moved Permanently**
- **Descrição**: Recurso foi movido permanentemente.

**302 Found**
- **Descrição**: Redirecionamento temporário.

**304 Not Modified**
- **Descrição**: Conteúdo não foi modificado desde a última requisição.

## 4xx - Erro do Cliente

**400 Bad Request**
- **Descrição**: Requisição malformada.

**401 Unauthorized**
- **Descrição**: Não autorizado (precisa de autenticação).

**403 Forbidden**
- **Descrição**: Proibido – sem permissão para acessar.

**404 Not Found**
- **Descrição**: Recurso não encontrado.

**405 Method Not Allowed**
- **Descrição**: Método HTTP não permitido.

**409 Conflict**
- **Descrição**: Conflito (ex: dados duplicados).

**422 Unprocessable Entity**
- **Descrição**: Erro de validação semântica.

## 5xx - Erro do Servidor

**500 Internal Server Error**
- **Descrição**: Erro interno no servidor.

**501 Not Implemented**
- **Descrição**: Método não implementado.

**502 Bad Gateway**
- **Descrição**: Gateway recebeu resposta inválida.

**503 Service Unavailable**
- **Descrição**: Servidor fora do ar ou sobrecarregado.

**504 Gateway Timeout**
- **Descrição**: Timeout do gateway (sem resposta do servidor).

