"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Phone, PhoneOff } from "lucide-react";

interface Message {
  role: "ai" | "va";
  content: string;
  timestamp: string;
}

interface VASimulatorChatProps {
  onSessionStart: () => void;
  onSessionEnd: () => void;
}

export function VASimulatorChat({ onSessionStart, onSessionEnd }: VASimulatorChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startSession = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/simulation/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        setMessages([
          {
            role: "ai",
            content: data.initialMessage,
            timestamp: new Date().toISOString(),
          },
        ]);
        setCurrentSessionId(data.sessionId);
        setIsActive(true);
        onSessionStart();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to start session");
      }
    } catch (error) {
      console.error("Error starting session:", error);
      alert("Failed to start session");
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !currentSessionId || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    setIsLoading(true);

    // Add user message to UI immediately
    const newMessage: Message = {
      role: "va",
      content: userMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);

    try {
      const response = await fetch("/api/simulation/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: currentSessionId,
          message: userMessage,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
      } else {
        const error = await response.json();
        alert(error.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  const endSession = async () => {
    if (!currentSessionId) return;

    try {
      await fetch("/api/simulation/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: currentSessionId,
          action: "end",
        }),
      });

      setIsActive(false);
      setMessages([]);
      setCurrentSessionId(null);
      onSessionEnd();
    } catch (error) {
      console.error("Error ending session:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isActive) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Phone className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">AI Call Simulation</h3>
          <p className="text-gray-600 max-w-md">
            Practice handling customer objections with our AI-powered simulation. You&apos;ll be presented
            with realistic scenarios to improve your skills.
          </p>
        </div>
        <Button
          onClick={startSession}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
        >
          {isLoading ? "Starting..." : "Start Simulation"}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-semibold text-gray-900">Live Call Simulation</span>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={endSession}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <PhoneOff className="h-4 w-4 mr-2" />
            End Call
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "va" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.role === "va" ? "bg-blue-600 text-white" : "bg-white text-gray-900 border"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${message.role === "va" ? "text-blue-100" : "text-gray-500"}`}>
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-900 border px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your response..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
