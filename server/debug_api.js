
async function testGenerate() {
    try {
        console.log("Testing /api/generate...");
        const response = await fetch('http://127.0.0.1:5001/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userPrompt: "Create a login form",
                currentCode: "<Container></Container>"
            })
        });

        if (!response.ok) {
            const text = await response.text();
            console.error(`❌ HTTP error! status: ${response.status}`);
            console.error(`❌ Body: ${text}`);
            return;
        }

        const data = await response.json();
        console.log("✅ Success:", data);

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

testGenerate();
