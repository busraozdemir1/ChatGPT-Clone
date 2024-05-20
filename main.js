const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
console.log(chatContainer);

let userText = null;


// html elementi oluşturur
const createElement = (html, className) => {
    // yeni bir div oluşturma
    const chatDiv = document.createElement("div");
    // yeni oluşturduğumuz div e class ekleme
    chatDiv.classList.add("chat", className);
    // oluşturduğumuz div in içerisine dışardan gelen html parametresini gönderme 
    chatDiv.innerHTML = html;
    return chatDiv;
};
const getChatResponse = async (incomingChatDiv) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const pElement = document.createElement("p");
    console.log(pElement);

    const requestData = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant.",
            },
            {
                role: "user",
                content: `${userText}`,
            },
        ],
    };
    // api talebi için özellikleri ve verileri tanımlama
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(requestData),
    };

    try {
        const response = await (fetch(API_URL, requestOptions));
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

const showTypingAnimation = () => {
    const html = `
    <div class="chat-content">
                <div class="chat-details">
                    <img src="./images/chatbot.jpg" alt="" />
                    <div class="typing-animation">
                        <div class="typing-dot" style="--delay: 0.2s"></div>
                        <div class="typing-dot" style="--delay: 0.3s"></div>
                        <div class="typing-dot" style="--delay: 0.4s"></div>
                    </div>
                </div>
            </div>
    `;
    // yazma animasyonu ile gelen bir div oluşturun ve bunu chatContainer a ekle
    const incomingChatDiv = createElement(html, "incoming");
    chatContainer.appendChild(incomingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    getChatResponse(incomingChatDiv);
};

const handleOutGoingChat = () => {
    userText = chatInput.value.trim(); // chatInput un değerini alma ve fazladan boşlukları silme
    if (!userText) return; // chatInput un içi boşsa çalışma
    // console.log(userText);
    const html = `
    <div class="chat-content">
                <div class="chat-details">
                    <img src="./images/user.jpg" alt="" />
                    <p></p>
                </div>
            </div>
    `;
    // kullanıcının mesajını içeren bir div oluştur ve bunu chatcontainer yapısına akle
    const outgoingChatDiv = createElement(html, "outgoing");
    outgoingChatDiv.querySelector("p").textContent = userText;
    chatContainer.appendChild(outgoingChatDiv);
    setTimeout(showTypingAnimation, 500);
};



sendButton.addEventListener("click", handleOutGoingChat);