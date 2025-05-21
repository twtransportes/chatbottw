(function() {
    const messagesEl = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const quickQuestionsEl = document.getElementById('quick-questions');
  
    // Habilita o botão enviar apenas se houver texto
    messageInput.addEventListener('input', function() {
     sendBtn.disabled = this.value.trim().length === 0;
    });
  
    // Faz o scroll automático para a última mensagem
    function scrollToBottom() {
     messagesEl.scrollTop = messagesEl.scrollHeight;
    }
  
    // Adiciona mensagens ao chat
    function appendMessage(text, isUser = true) {
     const messageDiv = document.createElement('div');
     messageDiv.classList.add('message');
     if (isUser) {
      messageDiv.classList.add('user-message');
      messageDiv.setAttribute('aria-label', 'Sua mensagem: ' + text);
     } else {
      messageDiv.classList.add('bot-message');
      messageDiv.setAttribute('aria-label', 'Resposta do atendimento: ' + text);
     }
     messageDiv.textContent = text; // Usar textContent para segurança
     messagesEl.appendChild(messageDiv);
     scrollToBottom();
     return messageDiv;
    }
  
    // Simula a digitação do bot (REMOVIDO)
    // function simulateTyping(messageDiv, text, index = 0) {
    //  messageDiv.innerHTML = ''; // Limpa o conteúdo *apenas* para o bot
    //  if (index < text.length) {
    //   messageDiv.innerHTML += text.charAt(index);
    //   setTimeout(() => simulateTyping(messageDiv, text, index + 1), 20);
    //  } else {
    //   scrollToBottom();
    //  }
    // }
  
    // Respostas simuladas do bot
    function getBotResponse(userText) {
     const text = userText.toLowerCase().trim();
     let response = "Obrigado por entrar em contato! Nosso atendimento responderá em breve."; // Default
  
     if (!text) return "Desculpe, não entendi sua mensagem.";
  
     const responses = {
      'horário': "Nosso horário de atendimento é de Segunda a Sexta das 8h às 18h.",
      'rastrear': "Por favor, informe seu código de rastreamento para que possamos ajudar.",
      'tracking': "Por favor, informe seu código de rastreamento para que possamos ajudar.",
      'métodos de pagamento': "Aceitamos os seguintes métodos de pagamento: cartão de crédito, débito e transferência bancária.",
      'pagamento': "Aceitamos os seguintes métodos de pagamento: cartão de crédito, débito e transferência bancária.",
      'payment methods': "Aceitamos os seguintes métodos de pagamento: cartão de crédito, débito e transferência bancária.",
      'payment': "Aceitamos os seguintes métodos de pagamento: cartão de crédito, débito e transferência bancária.",
      'br987654321': "Obrigado! O rastreio é BR987654321 \n, do pedido 18175 e seu Status: Alguardando pagamento",
      'pedido': "Por favor, informe o número do pedido para que possamos ajudar.",
      'order': "Por favor, informe o número do pedido para que possamos ajudar.",
      '12345': "Obrigado! O pedido 12345, do código de rastreamento TRK98765 \nStatus: Em trânsito, \nUltima Atualização: 2025-05-02 00:30:00, \nLocalização: Centro de Distribuição Z1, \nPrevisão de entrega: previsto para entrega em 3 dias úteis.",
      'trk98765': "Obrigado! O pedido 12345, do código de rastreamento TRK98765 \n Seu Status: Em trânsito,\n Ultima Atualização: 2025-05-02 00:30:00,\n Localização: Centro de Distribuição Z1, \nPrevisão de entrega: previsto para entrega em 3 dias úteis.",
      '54321': "Por favor, informe o número do requerimento para que possamos ajudar.",
      'trk11223': "Por favor, informe o número do requerimento para que possamos ajudar.",
      '66778': "Obrigado! O pedido 66778, do código de rastreamento TRK22334 \nStatus: Aguardando retirada \nData de Entrega: 07/04/2025",
      'trk22334': "Obrigado! O pedido 66778, do código de rastreamento TRK22334 \nStatus: Aguardando retirada \nData de Entrega: 07/04/2025",
      'abc112233': "Obrigado! O requerimento ABC112233, do pedido 67890 \nSeu Status: Entregue, \n Ultima Atualização: 2025-05-01 04:17:00",
      '67890': "Obrigado! O requerimento ABC112233, do pedido 67890  \n Seu Status: Entregue, \nUltima Atualização: 2025-05-01 04:17:00",
      'prazo': "O prazo de entrega varia conforme o destino, normalmente entre 3 a 7 dias úteis.",
      'entrega': "O prazo de entrega varia conforme o destino, normalmente entre 3 a 7 dias úteis.",
      'preço': "Os preços variam conforme peso e distância. Por favor, consulte nosso site para mais detalhes.",
      'valor': "Os preços variam conforme peso e distância. Por favor, consulte nosso site para mais detalhes.",
      '99001': "Obrigado! O pedido 99001, do código de rastreamento TRK55667  \nSeu Status: Entregue, \nData de Entrega: 19/05/2025",
      'trk55667': "Obrigado! O pedido 99001, do código de rastreamento TRK55667  \nSeu Status: Entregue, \nData de Entrega: 19/05/2025",
      '33445': "O pedido 33445, pedido cancelado por falta de pagamento ❌😔",
      '22334': "O pedido 22334, está com pagamento pendente ⌛",
      '88990': "Obrigado! O pedido 88990, \n Status: Embalando \nPrevisão de entrega: previsto para entrega em 5 dias úteis.",
      '44556': "O pedido 44556 ⚠️, \nStatus: Devolvido \nData de Entrega: 30/04/2025",
      '11223': "Obrigado! O pedido 11223, teve pagamento aprovado ✅",
      'olá': "Olá! Bem-vindo à Transporte Rápido. Como posso ajudar você hoje?",
      'oi': "Olá! Bem-vindo à Transporte Rápido. Como posso ajudar você hoje?",
      'bom dia': "Olá! Bem-vindo à Transporte Rápido. Como posso ajudar você hoje?",
      'oie': "Olá! Bem-vindo à Transporte Rápido. Como posso ajudar você hoje?",
      'boa tarde': "Olá! Bem-vindo à Transporte Rápido. Como posso ajudar você hoje?",
  
     };
  
     for (const key in responses) {
      if (text.includes(key)) {
       response = responses[key];
       break;
      }
     }
  
     return response;
    }
  
    // Envio de mensagens pelo formulário
    document.getElementById('input-area').addEventListener('submit', function(e) {
     e.preventDefault();
     const userText = messageInput.value.trim();
     if (!userText) return;
  
     appendMessage(userText, true);
     messageInput.value = '';
     sendBtn.disabled = true;
  
     setTimeout(() => {
      const botReply = getBotResponse(userText);
      appendMessage(botReply, false); // Adiciona a mensagem do bot
      // simulateTyping(messageDiv, botReply); // Remove a simulação de digitação
     }, 800);
    });
  
    // Clique nos botões de perguntas rápidas
    quickQuestionsEl.addEventListener('click', (event) => {
     if (event.target.classList.contains('quick-btn')) {
      const quickQuestion = event.target.textContent;
      appendMessage(quickQuestion, true);
      sendBtn.disabled = true;
  
      setTimeout(() => {
       const botReply = getBotResponse(quickQuestion);
       appendMessage(botReply, false); // Adiciona a mensagem do bot
       // simulateTyping(messageDiv, botReply); // Remove a simulação de digitação
      }, 800);
     }
    });
  
    // Mensagem inicial do bot
    setTimeout(() => {
     appendMessage("Olá! Bem-vindo ao chat de atendimento da Transporte Rápido. Como podemos ajudá-lo?", false); // Adiciona a mensagem do bot
     // simulateTyping(messageDiv, "Olá! Bem-vindo ao chat de atendimento da Transporte Rápido. Como podemos ajudá-lo?"); // Remove a simulação de digitação
    }, 1000);
   })();