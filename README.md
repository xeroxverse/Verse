# 🎮 AI Gaming Assistant

An intelligent AI-powered assistant designed to help you while gaming. Get real-time tips, strategies, game information, and assistance without leaving your game!

## Features

- 🎯 **Real-time Game Assistance**: Get instant help with game mechanics, strategies, and tips
- 🗣️ **Voice Interaction**: Communicate with the AI using text or voice commands
- 📊 **Game Stats Tracking**: Track your gaming sessions and performance
- 🎮 **Multi-Game Support**: Works with various games and genres
- 💡 **Smart Suggestions**: AI-powered recommendations based on your gameplay
- 🌐 **Web Interface**: Easy-to-use browser-based interface
- 🔊 **Text-to-Speech**: Hear responses while gaming

## Tech Stack

- **Backend**: Python with Flask
- **AI**: OpenAI GPT models
- **Frontend**: HTML, CSS, JavaScript
- **Speech**: Web Speech API for voice input

## Installation

1. Clone the repository:
```bash
git clone https://github.com/xeroxverse/Verse.git
cd Verse
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env and add your API keys
```

4. Run the application:
```bash
python app.py
```

5. Open your browser and navigate to `http://localhost:5000`

## Usage

1. **Start the assistant**: Run the application and open the web interface
2. **Ask questions**: Type or speak your gaming questions
3. **Get help**: Receive instant AI-powered assistance
4. **Track progress**: Monitor your gaming sessions

### Example Questions

- "What's the best strategy for early game in Minecraft?"
- "How do I build a good deck in Hearthstone?"
- "What are the best weapons in Valorant?"
- "Give me tips for improving my aim"
- "How do I counter this champion?"

## Configuration

Edit the `config.py` file to customize:
- AI model selection
- Response length
- Voice settings
- Game-specific configurations

## Project Structure

```
.
├── app.py                 # Main Flask application
├── assistant.py           # AI assistant core logic
├── config.py             # Configuration settings
├── requirements.txt      # Python dependencies
├── static/
│   ├── css/
│   │   └── style.css    # Styling
│   └── js/
│       └── main.js      # Frontend JavaScript
├── templates/
│   └── index.html       # Main web interface
└── README.md
```

## Features in Detail

### 🎯 Game-Specific Knowledge
The AI is trained to help with various gaming scenarios:
- Strategy games (RTS, TBS, MOBA)
- FPS games
- RPGs
- Survival games
- Battle Royale
- And more!

### 🗣️ Voice Commands
Use voice input for hands-free assistance while gaming:
- Hold hotkey and speak your question
- Get audio responses
- Continue gaming without interruption

### 📊 Session Tracking
- Track gaming sessions
- Save useful tips
- Review conversation history

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Built with ❤️ for gamers by gamers
