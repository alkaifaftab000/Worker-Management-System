// Induction Test – questions from 01-HRD40-F-36 Test Paper (Common), grouped into sections
// answer = index of correct option. confirm: true = answer key NOT in the source sheet – verify with ILJIN HR
// Subjective questions are dummy additions – reviewed by HR, not auto-scored
const INDUCTION_TEST = {
  passPercent: 40,
  sections: [
    {
      id: "company", title: { en: "Company", hi: "कंपनी" }, icon: "🏢", questions: [
        { type: "mcq", marks: 5, q: "What is the full name of our company?", hi: "हमारी कंपनी का पूरा नाम क्या है?", answer: 0,
          options: ["IL JIN ELECTRONICS INDIA PVT. LTD", "IL JIN ELECTRO APPLIANCES PVT. LTD", "IL JIM ELECTRONICS PVT. LTD", "AMBER GROUP PVT. LTD"] },
        { type: "mcq", marks: 5, q: "Where is our company?", hi: "हमारी कंपनी कहाँ है?", answer: 0, confirm: true,
          options: ["Noida / नोएडा", "Greater Noida / ग्रेटर नोएडा", "Delhi / दिल्ली", "Noida Phase 2 / नोएडा चरण 2"] },
        { type: "mcq", marks: 5, q: "What product is manufactured in our company?", hi: "हमारी कंपनी में कौन से उत्पाद का निर्माण होता है?", answer: 2, confirm: true,
          options: ["PCB / पीसीबी", "Set Top Box / सेट टॉप बॉक्स", "Both A & B / ए और बी दोनों", "None of above / इनमें से कोई भी नहीं"] },
        { type: "mcq", marks: 5, q: "When was ILJIN founded in India?", hi: "भारत में इल्जिन की स्थापना कब हुई थी?", answer: 3, confirm: true,
          options: ["1994", "2001", "1988", "1996"] },
        { type: "mcq", marks: 5, q: "Who is the plant head of ILJIN?", hi: "इल्जिन का प्लांट हेड कौन है?", answer: 0, confirm: true,
          options: ["Mr. Jaswender Singh", "Mr. Avneet Singh Arora", "Mr. Mohit Sehgal", "Mr. Jasbir Singh"] },
        { type: "mcq", marks: 5, q: "What expectations does ILJIN have from its employees?", hi: "इल्जिन को अपने कर्मचारियों से क्या अपेक्षाएं हैं?", answer: 2,
          options: ["Keep learning and upgrading skill / सीखते रहें और कौशल को उन्नत करते रहें", "Do your work properly and do not misbehave with seniors / अपना काम ठीक से करें", "Both A & B / ए और बी दोनों", "Nothing / कुछ नहीं"] },
        { type: "text", q: "In your own words, what does our company make and who uses it?", hi: "अपने शब्दों में बताइए हमारी कंपनी क्या बनाती है?" },
      ],
    },
    {
      id: "safety", title: { en: "Safety & Emergency", hi: "सुरक्षा और आपातकाल" }, icon: "🦺", questions: [
        { type: "mcq", marks: 5, q: "How many emergency assembly points are there in our company?", hi: "हमारी कंपनी में कितने इमर्जेंसी असेंबली पॉइंट हैं?", answer: 2, confirm: true,
          options: ["1", "4", "2", "0"] },
        { type: "mcq", marks: 5, q: "On the shop floor, is it allowed to carry a mobile phone?", hi: "क्या फ्लोर पर मोबाइल फोन ले जाने की अनुमति है?", answer: 1,
          options: ["Yes / हाँ", "No / नहीं", "Sometime / कभी कभी", "None of above / इनमें से कोई भी नहीं"] },
        { type: "mcq", marks: 5, q: "How many types of fire are there?", hi: "अग्नि कितने प्रकार की होती है?", answer: 2, confirm: true,
          options: ["1", "6", "4", "3"] },
        { type: "mcq", marks: 5, q: "In which condition should we inform the line leader?", hi: "हमें किस स्थिति में लाइन लीडर को सूचित करना चाहिए?", answer: 3,
          options: ["Fire / आग", "Defect / दोष", "Unsafe / असुरक्षित", "All of above / ऊपर के सभी"] },
        { type: "mcq", marks: 5, q: "What to use in case of emergency?", hi: "आपातकालीन स्थिति में क्या उपयोग करें?", answer: 1,
          options: ["Goods lift", "Emergency exit / आपातकालीन निकास", "Stairs / सीढ़ियाँ", "Both A & C / ए और सी दोनों"] },
        { type: "mcq", marks: 5, q: "What is the full form of PPE?", hi: "PPE का पूर्ण रूप क्या है?", answer: 3,
          options: ["Personal professional equipments", "Personal protective equipmentes", "Personal protective equiped", "Personal protective equipment"] },
        { type: "text", q: "What will you do if you see a fire on the shop floor?", hi: "अगर आप फ्लोर पर आग देखें तो आप क्या करेंगे?" },
      ],
    },
    {
      id: "lean", title: { en: "6S & Lean", hi: "6S और लीन" }, icon: "✅", questions: [
        { type: "mcq", marks: 5, q: "What is the full form of 6S?", hi: "6S का फुल फॉर्म क्या है?", answer: 3,
          options: ["Sort, Set in order, Shine, Standardize, Soft, Safety", "Sort, Set, Shine, Standardize, Sustain, Safety", "Sort, Set in order, Shop, Standardize, Sustain, Safety", "Sort, Set in order, Shine, Standardize, Sustain, Safety"] },
        { type: "mcq", marks: 5, q: "Which is not in 4M?", hi: "4M में कौन सा नहीं है?", answer: 2,
          options: ["Machine / मशीन", "Material / सामग्री", "Motion / गति", "Method / तरीका"] },
        { type: "mcq", marks: 5, q: "What is the major waste in 7 wastes?", hi: "7 waste में प्रमुख waste क्या है?", answer: 0,
          options: ["Overproduction / अधिक उत्पादन", "Motion / गति", "Defect / दोष", "Transportation / परिवहन"] },
      ],
    },
    {
      id: "pcba", title: { en: "PCBA & ESD", hi: "PCBA और ESD" }, icon: "🔧", questions: [
        { type: "mcq", marks: 5, q: "What is the full form of SMT?", hi: "SMT का पूर्ण रूप क्या है?", answer: 0,
          options: ["Surface Mount Technology", "Surface Movement Technology", "Surface Mountain Technology", "Surface Mount Technically"] },
        { type: "mcq", marks: 5, q: "What is the full form of PCB?", hi: "PCB का पूर्ण रूप क्या है?", answer: 0,
          options: ["Printed Circuit Board", "Printing Circuit Board", "Personal Circuit Board", "Printed Circle Board"] },
        { type: "mcq", marks: 5, q: "We can't touch PCBA using wrist band?", hi: "हम wrist band का उपयोग करके पीसीबीए को नहीं छू सकते?", answer: 1,
          options: ["Yes / हाँ", "No / नहीं", "Sometime / कभी कभी", "None of above / इनमें से कोई भी नहीं"] },
        { type: "mcq", marks: 5, q: "What is the full form of ESD?", hi: "ESD का पूर्ण रूप क्या है?", answer: 0,
          options: ["Electro Static Discharge", "Electrical Static Discharge", "Electro Statical Discharge", "Electrode Static Charge"] },
        { type: "mcq", marks: 5, q: "Which of the following is not an ESD device?", hi: "निम्नलिखित में से कौन सा ESD डिवाइस नहीं है?", answer: 3,
          options: ["ESD gloves / ईएसडी दस्ताने", "Wrist band / कलाई का पट्टा", "ESD slipper / ईएसडी स्लीपर", "Pen / कलम"] },
        { type: "text", q: "Why must we wear a wrist strap before touching a PCBA?", hi: "PCBA छूने से पहले wrist strap क्यों पहनना ज़रूरी है?" },
      ],
    },
  ],
};
