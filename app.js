app.post('/ask', async (req, res) => {
  const message = req.body.message;

  let botResponse = "I'm still learning to respond!";

  try {
    // Request OpenAI API with the user's message
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        max_tokens: 150,
      }),
    });

    if (!response.ok) throw new Error('API response failed');

    const data = await response.json();
    botResponse = data.choices?.[0]?.message?.content?.trim() || 'Sorry, I couldn\'t understand that.';
  } catch (error) {
    botResponse = 'I\'m having trouble connecting to my brain. Try again later!';
    console.error('API Error:', error);
  }

  // Send back the bot's response
  res.json({ response: botResponse });
});
