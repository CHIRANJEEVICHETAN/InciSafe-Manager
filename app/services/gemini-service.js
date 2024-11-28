import { GoogleGenerativeAI } from "@google/generative-ai";
import getConfig from "../../configs/config";

let genAI;
try {
  const config = getConfig();
  if (!config || !config.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY not found in config');
  } else {
    genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
  }
} catch (error) {
  console.error('Error initializing Gemini AI:', error);
}

export const transcribeAudio = async (base64Audio) => {
  try {
    console.log('Starting transcription process...');
    const apiKey = getConfig().GOOGLE_CLOUD_API_KEY;
    
    if (!apiKey) {
      console.error('Google Cloud API key is missing');
      return null;
    }

    // Create the request URL with the API key as a query parameter
    const url = `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`;
    
    console.log('Sending request to Google Cloud Speech-to-Text API...');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        config: {
          encoding: 'WEBM_OPUS',
          sampleRateHertz: 16000,
          languageCode: 'en-US',
          model: 'default',
          audioChannelCount: 1,
        },
        audio: {
          content: base64Audio
        }
      })
    });

    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));

    if (data.error) {
      console.error('API Error:', data.error);
      return null;
    }

    if (data.results && data.results[0]) {
      const transcript = data.results[0].alternatives[0].transcript;
      console.log('Successfully transcribed:', transcript);
      return transcript;
    }

    console.log('No transcription results found');
    return null;
  } catch (error) {
    console.error('Transcription error:', error);
    return null;
  }
};