import {useEffect, useRef, useState} from "react"

export default function AIChat() {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [chatId, setChatId] = useState("")
    const chatRef = useRef(null)

    const readStreamMessage = async (response) => {
        if (!response.ok || !response.body) {
                    throw new Error("No response body");
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder("utf-8");
                let finalText = "";

                while (true) {
                    const {done, value} = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, {stream: true});
                    finalText += chunk;

                    setMessages((prev) => {
                        const updated = [...prev];
                        updated[updated.length === 0 ? 0 : updated.length - 1] = {
                            role: "assistant",
                            content: finalText,
                        };
                        return updated;
                    });
                }
    }

    useEffect(() => {
    }, []);


    const handleSend = async () => {
        if (!input.trim()) return

        const userMessage = {role: "user", content: input}
        const updatedMessages = [...messages, userMessage]
        setMessages(updatedMessages)
        setInput("")

        let assistantMessage = {role: "assistant", content: ""}
        setMessages((prev) => [...prev, assistantMessage])

        try {
            const res = await fetch(`/api/assistant/add_message`, {
                method: "POST",
                body: JSON.stringify({chat_id: chatId, message: input}),
                headers: {"Content-Type": "application/json"},
            })

                await readStreamMessage(res)
        } catch (err) {
            console.error("Stream error:", err);
        }
    }

     const startChat = async () => {
            try {
                const res = await fetch(`/api/assistant/start_chat`, {method: "POST"})

                await readStreamMessage(res)

                setChatId(res.headers.get('chatId'))

            } catch (err) {
                console.error("Stream error:", err)
            }
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
                        <p className="whitespace-pre-line">{msg.content}</p>
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
                <button
                    onClick={startChat}
                    className="bg-indigo-600 text-white px-4 py-2 rounded"
                >
                    Start Chat
                </button>
            </div>
        </div>
    )
}
