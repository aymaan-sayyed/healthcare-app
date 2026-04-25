import { useState } from "react";

function App() {
  const [tab, setTab] = useState("patient");
  const [name, setName] = useState("");
  const [issue, setIssue] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setName("");
    setIssue("");
    setSubmitted(false);
  };

  // 🔥 Improved chatbot
  const getBotReply = (msg) => {
    msg = msg.toLowerCase();

    if (msg.includes("fever")) return "Drink fluids, rest, and monitor temperature.";
    if (msg.includes("headache")) return "Try hydration and rest. Avoid screen strain.";
    if (msg.includes("covid")) return "Isolate and get tested. Wear a mask.";
    if (msg.includes("cough")) return "Drink warm fluids and monitor symptoms.";
    if (msg.includes("pain")) return "Please describe the type and location of pain.";
    if (msg.includes("stomach")) return "Avoid heavy food and stay hydrated.";
    if (msg.includes("injury")) return "Apply first aid and seek medical help if serious.";
    if (msg.includes("help")) return "A volunteer will contact you shortly.";

    return "Can you describe your symptoms more clearly?";
  };

  const sendMessage = (customMsg) => {
    const msgToSend = customMsg || message;
    if (!msgToSend) return;

    const reply = getBotReply(msgToSend);
    setChat([...chat, { user: msgToSend, bot: reply }]);
    setMessage("");
  };

  return (
    <div style={{ fontFamily: "Arial" }}>
      
      {/* HEADER */}
      <div style={{
        background: "#007bff",
        color: "white",
        padding: "15px",
        textAlign: "center",
        fontSize: "20px"
      }}>
        Jarurat Care - Healthcare Support
      </div>

      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Built for NGOs to quickly support patients and manage requests efficiently.
      </p>

      {/* MAIN */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px"
      }}>
        <div style={{
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          gap: "20px"
        }}>

          {/* FORM */}
          <div style={{
            flex: 1,
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}>
            <h3>Request Support</h3>

            {/* Tabs */}
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <button onClick={() => setTab("patient")}
                style={{ flex: 1, padding: "10px", background: tab==="patient"?"#007bff":"#ddd", color: tab==="patient"?"white":"black" }}>
                Patient
              </button>

              <button onClick={() => setTab("volunteer")}
                style={{ flex: 1, padding: "10px", background: tab==="volunteer"?"#007bff":"#ddd", color: tab==="volunteer"?"white":"black" }}>
                Volunteer
              </button>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                />

                <textarea
                  placeholder={tab === "patient" ? "Describe your issue" : "How can you help?"}
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  style={{ width: "100%", padding: "10px", height: "100px", marginBottom: "10px" }}
                />

                <button style={{ width: "100%", padding: "10px", background: "#007bff", color: "white" }}>
                  Submit
                </button>
              </form>
            ) : (
              <div>
                <p style={{ color: "green" }}>✅ Submitted successfully</p>
                <button onClick={resetForm} style={{ padding: "10px" }}>
                  Submit another request
                </button>
              </div>
            )}
          </div>

          {/* CHAT */}
          <div style={{
            flex: 1,
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}>
            <h3>AI Assistant</h3>

            {/* QUICK BUTTONS */}
            <div style={{ marginBottom: "10px" }}>
              <button onClick={() => sendMessage("fever")}>Fever</button>
              <button onClick={() => sendMessage("headache")}>Headache</button>
              <button onClick={() => sendMessage("covid")}>Covid</button>
              <button onClick={() => sendMessage("help")}>Help</button>
            </div>

            {/* CHAT BOX */}
            <div style={{
              height: "250px",
              overflowY: "auto",
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px"
            }}>
              {chat.map((c, i) => (
                <div key={i}>
                  <p><b>You:</b> {c.user}</p>
                  <p><b>Bot:</b> {c.bot}</p>
                  <hr />
                </div>
              ))}
            </div>

            {/* INPUT */}
            <div style={{ display: "flex" }}>
              <input
                type="text"
                placeholder="Ask something..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                style={{ flex: 1, padding: "10px" }}
              />
              <button onClick={() => sendMessage()} style={{ padding: "10px", background: "#007bff", color: "white" }}>
                Send
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default App;