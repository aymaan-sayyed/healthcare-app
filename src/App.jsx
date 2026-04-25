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

  const getBotReply = (msg) => {
    msg = msg.toLowerCase();

    if (msg.includes("fever")) return "Drink fluids, rest, and monitor temperature.";
    if (msg.includes("headache")) return "Try hydration and rest.";
    if (msg.includes("covid")) return "Isolate and get tested.";
    if (msg.includes("cough")) return "Drink warm fluids.";
    if (msg.includes("help")) return "A volunteer will contact you.";

    return "Can you explain your symptoms more clearly?";
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
        fontSize: "18px"
      }}>
        Jarurat Care - Healthcare Support
      </div>

      <p style={{ textAlign: "center", padding: "10px" }}>
        Helping NGOs support patients faster.
      </p>

      {/* MAIN CONTAINER */}
      <div style={{
        display: "flex",
        flexDirection: "column",   // 🔥 KEY CHANGE
        gap: "20px",
        padding: "10px",
        maxWidth: "900px",
        margin: "auto"
      }}>

        {/* FORM */}
        <div style={{
          background: "white",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <h3>Request Support</h3>

          <div style={{ display: "flex", marginBottom: "10px" }}>
            <button onClick={() => setTab("patient")} style={{ flex: 1 }}>
              Patient
            </button>
            <button onClick={() => setTab("volunteer")} style={{ flex: 1 }}>
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
                placeholder="Describe your issue"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                style={{ width: "100%", padding: "10px", height: "100px" }}
              />

              <button style={{ width: "100%", marginTop: "10px" }}>
                Submit
              </button>
            </form>
          ) : (
            <div>
              <p style={{ color: "green" }}>Submitted successfully</p>
              <button onClick={resetForm}>Submit another</button>
            </div>
          )}
        </div>

        {/* CHAT */}
        <div style={{
          background: "white",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <h3>AI Assistant</h3>

          <div style={{
            height: "200px",
            overflowY: "auto",
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px"
          }}>
            {chat.map((c, i) => (
              <div key={i}>
                <p><b>You:</b> {c.user}</p>
                <p><b>Bot:</b> {c.bot}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex" }}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              style={{ flex: 1 }}
            />
            <button onClick={() => sendMessage()}>Send</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;