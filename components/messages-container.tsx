'use client'

import { useState } from "react";
import MessageCard from "./message-card";

const MessagesContainer = () => {

    const [messages, setMessages] = useState<MessageCardProps[]>([
    {
        content: 'Hello! How can I help you today?',
        id: 'Hello! How can I help you today?',
        role: 'ASSISTANT',
        type: 'text',
        fragment: null,
        createdAt: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
        isActiveFragment: false,
        onFragmentClick: () => {}
    },
    {
        content: 'I need help with my React project. Can you explain how to manage state?',
        id: 'I need help with my React project. Can you explain how to manage state?',
        role: 'USER',
        type: 'text',
        fragment: null,
        createdAt: new Date(Date.now() - 240000).toISOString(), // 4 minutes ago
        isActiveFragment: false,
        onFragmentClick: () => {}
    },
    {
        content: `I'd be happy to help you with React state management! There are several approaches you can use:

    1. **useState Hook** - For local component state
    2. **USEReducer Hook** - For complex state logic
    3. **Context API** - For sharing state across components
    4. **External libraries** - Like Redux, Zustand, or Jotai

    Which specific aspect would you like me to explain in more detail?`,
        role: 'ASSISTANT',
        id: 'sdfASSISTANT',
        type: 'text',
        fragment: 'state-management-summary',     // example fragment key (string or null, not boolean)
        createdAt: new Date(Date.now() - 180000).toISOString(), // 3 minutes ago
        isActiveFragment: true,
        onFragmentClick: () => {}
    },
    {
        content: '📄 Uploaded: project-requirements.pdf',
        id: 'sdfdfdfASSISTANT',
        role: 'USER',
        type: 'file',
        fragment: null,
        createdAt: new Date(Date.now() - 60000).toISOString(), // 1 minute ago
        isActiveFragment: false,
        onFragmentClick: () => {}
    },
    {
        content: `I've analyzed your project requirements document. Here are the key points I found:

    • Project timeline: 3 months
    • Technology stack: React, Node.js, PostgreSQL
    • Team size: 4 developers
    • Budget: $50,000

    The requirements look comprehensive. Would you like me to help you break down the tasks or create a development roadmap?`,
        id: 'sdfdfASSISTANT',
        role: 'ASSISTANT',
        type: 'ERROR',
        fragment: null,
        createdAt: new Date(Date.now() - 30000).toISOString(), // 30 seconds ago
        isActiveFragment: false,
        onFragmentClick: () => {}
    }
    ]);



    return (
        // container --> scrollable container --> padding for inner contente
        <div className="flex flex-col flex-1 min-h-0"> 
            <div className="flex-1 min-h-0 overflow-y-auto">
                <div className="pt-2 pr-1">
                    {messages.map((message) => (
                        <MessageCard
                            key={message.id}
                            content={message.content}
                            role={message.role}
                            fragment={message.fragment}
                            createdAt={message.createdAt}
                            isActiveFragment={false}
                            onFragmentClick={()=>{}}
                            type={message.type}
                        />
                    )

                    )}

                </div>

            </div>
        </div>
    )
}
export default MessagesContainer