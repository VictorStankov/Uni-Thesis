import {useRef, useState} from "react"

export default function AIChat() {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [chatId, setChatId] = useState(() => {

        fetch(`/api/assistant/start_chat`, {
            method: "POST",
        })
            .then(r => r.json())
            .then(data => {
                setChatId(data.chat_id)
                localStorage.setItem("chatSession", data.chat_id)

                setMessages(
                    [{
                        role: "assistant",
                        content: data.response,
                    }]
                )

            })
    })
    const chatRef = useRef(null)


    const handleSend = async () => {
        if (!input.trim()) return

        const userMessage = {role: "user", content: input}
        const updatedMessages = [...messages, userMessage]
        setMessages(updatedMessages)
        setInput("")

        let assistantMessage = {role: "assistant", content: ""}
        setMessages((prev) => [...prev, assistantMessage])

        await fetch(`/api/assistant/add_message`, {
            method: "POST",
            body: JSON.stringify({chat_id: chatId, message: input}),
            headers: {"Content-Type": "application/json"},
        }).then(r => r.json())
            .then(data => {
                setMessages((prev) =>
                    [...prev, {role: "assistant", content: data.response}]
                )
            })
    }

    return (
        <div className="p-4 max-w-xl mx-auto">
            <div
                ref={chatRef}
                className="h-80 overflow-y-auto border rounded-md p-4 space-y-2 bg-white shadow"
            >
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`p-2 rounded ${
                            msg.role === "user"
                                ? "bg-blue-100 text-right"
                                : "bg-gray-100 text-left"
                        }`}
                    >
                        {msg.content}
                    </div>
                ))}
            </div>
            <div className="flex mt-4 gap-2">
                <input
                    className="flex-1 border p-2 rounded"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me about a car..."
                />
                <button
                    onClick={handleSend}
                    className="bg-indigo-600 text-white px-4 py-2 rounded"
                >
                    Send
                </button>
            </div>
        </div>
    )
}
