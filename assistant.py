#!/usr/bin/env python3
"""
Gaming Assistant Core Logic
Handles AI interactions and game-specific knowledge
"""

import os
import json
from openai import OpenAI


class GamingAssistant:
    """AI-powered gaming assistant"""
    
    def __init__(self):
        """Initialize the assistant with OpenAI client"""
        # Load API configuration from environment
        self.api_key = os.getenv('OPENAI_API_KEY', '')
        self.api_base = os.getenv('OPENAI_BASE_URL', 'https://api.openai.com/v1')
        
        if not self.api_key:
            print("⚠️  Warning: OPENAI_API_KEY not found in environment")
            print("   The assistant may not function without valid credentials")
        
        try:
            self.client = OpenAI(
                api_key=self.api_key,
                base_url=self.api_base
            )
            self.ready = True
        except Exception as e:
            print(f"Error initializing OpenAI client: {e}")
            self.ready = False
        
        # System prompt for the gaming assistant
        self.system_prompt = """You are an expert AI gaming assistant designed to help gamers in real-time.

Your capabilities include:
- Providing game strategies, tips, and tricks
- Explaining game mechanics and systems
- Offering build recommendations and loadouts
- Suggesting tactics for different scenarios
- Answering questions about specific games
- Helping with troubleshooting game issues
- Sharing general gaming knowledge

Communication style:
- Be concise but informative
- Use gaming terminology appropriately
- Be enthusiastic and supportive
- Provide actionable advice
- Keep responses focused and relevant
- Use bullet points for multiple tips
- Be encouraging and positive

Remember: Gamers want quick, useful information they can apply immediately while playing."""

    def is_ready(self):
        """Check if the assistant is ready to use"""
        return self.ready and bool(self.api_key)
    
    def get_response(self, user_message, game_context='general', conversation_history=None):
        """
        Get AI response for user message
        
        Args:
            user_message: The user's question or message
            game_context: The game being played (optional)
            conversation_history: Previous conversation (optional)
        
        Returns:
            AI assistant's response as string
        """
        if not self.is_ready():
            return "❌ AI assistant is not configured. Please set up your OpenAI API credentials."
        
        try:
            # Build messages array
            messages = [
                {"role": "system", "content": self.system_prompt}
            ]
            
            # Add game context if provided
            if game_context and game_context != 'general':
                context_msg = f"The user is currently playing or asking about: {game_context}"
                messages.append({"role": "system", "content": context_msg})
            
            # Add conversation history (last 5 exchanges to keep context manageable)
            if conversation_history:
                recent_history = conversation_history[-5:]
                for exchange in recent_history:
                    messages.append({"role": "user", "content": exchange['user']})
                    messages.append({"role": "assistant", "content": exchange['assistant']})
            
            # Add current user message
            messages.append({"role": "user", "content": user_message})
            
            # Call OpenAI API
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages,
                temperature=0.7,
                max_tokens=500,
                top_p=0.9,
                frequency_penalty=0.3,
                presence_penalty=0.3
            )
            
            return response.choices[0].message.content.strip()
            
        except Exception as e:
            error_msg = str(e)
            print(f"Error getting AI response: {error_msg}")
            
            # Provide helpful error messages
            if "api_key" in error_msg.lower():
                return "❌ API key error. Please check your OpenAI API configuration."
            elif "rate_limit" in error_msg.lower():
                return "⏳ Rate limit reached. Please wait a moment and try again."
            elif "timeout" in error_msg.lower():
                return "⏱️ Request timeout. Please try again."
            else:
                return f"❌ Error: {error_msg}"
    
    def get_game_tips(self, game_name):
        """Get general tips for a specific game"""
        prompt = f"Provide 5 essential tips for playing {game_name}. Be concise and practical."
        return self.get_response(prompt, game_context=game_name)
    
    def analyze_situation(self, situation, game_name):
        """Analyze a specific gaming situation and provide advice"""
        prompt = f"In {game_name}, I'm in this situation: {situation}. What should I do?"
        return self.get_response(prompt, game_context=game_name)
