document.querySelector(".send-btn").addEventListener("click", async function() {
  console.log("Button clicked!"); // Debugging line
  const input = document.querySelector(".input");
  const message = input.value.trim();
  const chatArea = document.querySelector(".chat-area");

  if (message) {
    // Add user message
    const userBubble = document.createElement("div");
    userBubble.className = "chat-bubble user";
    userBubble.textContent = message;
    chatArea.appendChild(userBubble);

    // Clear the input field
    input.value = "";

    // Default bot response
    let botResponse = "I'm still learning to respond!";

    // Handle specific grammar-related questions
    if (message.toLowerCase() === "what is a noun") {
      botResponse = `A **noun** is a word that names a person, place, thing, or idea.  
      - **Examples**:  
        - **Person**: John, teacher  
        - **Place**: city, school  
        - **Thing**: book, car  
        - **Idea**: love, freedom  
      Nouns can be further classified into several types like **Proper Noun**, **Common Noun**, **Abstract Noun**, and others.`;
    } else if (message.toLowerCase() === "what is a pronoun") {
      botResponse = `A **pronoun** is a word that takes the place of a noun.  
      - **Examples**:  
        - **Personal Pronoun**: I, you, he, she  
        - **Possessive Pronoun**: mine, yours, his  
        - **Reflexive Pronoun**: myself, yourself, himself  
      Pronouns help avoid repetition of nouns in sentences.`;
    } else if (message.toLowerCase() === "what is a verb") {
      botResponse = `A **verb** is a word that expresses an action or state of being.  
      - **Examples**:  
        - **Action Verb**: run, jump, write  
        - **State of being**: is, are, was, were  
      Verbs are crucial in forming sentences and convey the main action or state.`;
    } else if (message.toLowerCase() === "what is an adjective") {
      botResponse = `An **adjective** is a word that describes or modifies a noun.  
      - **Examples**:  
        - **Descriptive Adjective**: beautiful, tall, happy  
        - **Quantity Adjective**: many, few, several  
      Adjectives help to give more information about a noun in a sentence.`;
    } else if (message.toLowerCase() === "what is an adverb") {
      botResponse = `An **adverb** modifies a verb, adjective, or another adverb.  
      - **Examples**:  
        - **Adverb of Manner**: quickly, slowly  
        - **Adverb of Time**: now, later  
        - **Adverb of Frequency**: always, never  
      Adverbs help to describe how, when, where, or to what extent something happens.`;
    } else if (message.toLowerCase() === "what is a preposition") {
      botResponse = `A **preposition** shows the relationship between a noun and another word in the sentence.  
      - **Examples**:  
        - **Preposition of Time**: before, after, during  
        - **Preposition of Place**: in, on, under  
        - **Preposition of Direction**: to, from  
      Prepositions are used to link nouns or pronouns with other parts of the sentence.`;
    } else if (message.toLowerCase() === "what is a conjunction") {
      botResponse = `A **conjunction** joins words, phrases, or clauses.  
      - **Examples**:  
        - **Coordinating Conjunction**: and, but, or  
        - **Subordinating Conjunction**: because, although  
        - **Correlative Conjunction**: either...or, neither...nor  
      Conjunctions help in connecting different parts of the sentence.`;
    } else if (message.toLowerCase() === "what is an interjection") {
      botResponse = `An **interjection** is a word or phrase that expresses strong emotion.  
      - **Examples**:  
        - **Interjection of Happiness**: yay, hooray  
        - **Interjection of Surprise**: wow, oh  
        - **Interjection of Anger**: stop, hey  
      Interjections are often used as standalone expressions or in exclamatory sentences.`;
    } else {
      try {
        // Make API request to OpenAI
        const response = await fetch("https://api.openai.com/v1/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, // API key from ini.env file
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
            max_tokens: 150,
          }),
        });

        if (!response.ok) throw new Error("API response failed");

        const data = await response.json();
        botResponse = data.choices?.[0]?.message?.content?.trim() || "Sorry, I couldn't understand that.";
      } catch (error) {
        botResponse = "I'm having trouble connecting to my brain. Try again later!";
        console.error("API Error:", error);
      }
    }

    // Add bot response to the chat
    const botBubble = document.createElement("div");
    botBubble.className = "chat-bubble bot";
    botBubble.textContent = botResponse;
    chatArea.appendChild(botBubble);
  }
});
