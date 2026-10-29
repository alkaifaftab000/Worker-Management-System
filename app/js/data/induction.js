// Induction (orientation) content – DUMMY for pilot, bilingual {en, hi}. Replace with ILJIN's official induction PPT.
// Slide kinds: "hero" | "points" | "stats" | "flow" | "grid"
const INDUCTION = [
  {
    id: "welcome", title: { en: "Welcome", hi: "स्वागत" }, icon: "👋", slides: [
      { kind: "hero", eyebrow: { en: "Day 1 · HR Induction", hi: "पहला दिन · HR इंडक्शन" },
        title: { en: "Welcome to ILJIN Electronics", hi: "इल्जिन इलेक्ट्रॉनिक्स में आपका स्वागत है" },
        text: { en: "An Amber Group company. This orientation introduces our company, our products, how we build them and how we stay safe at work.", hi: "एम्बर ग्रुप की कंपनी। इस ओरिएंटेशन में आप हमारी कंपनी, हमारे प्रोडक्ट, उन्हें कैसे बनाते हैं और काम पर सुरक्षित कैसे रहें – यह सब जानेंगे।" } },
      { kind: "points", title: { en: "Today's agenda", hi: "आज का एजेंडा" }, points: [
        { en: "About Amber Group & ILJIN", hi: "एम्बर ग्रुप और इल्जिन के बारे में" },
        { en: "Our products & customers", hi: "हमारे प्रोडक्ट और ग्राहक" },
        { en: "PCBA – how an electronic board is made", hi: "PCBA – इलेक्ट्रॉनिक बोर्ड कैसे बनता है" },
        { en: "Chips & semiconductors basics", hi: "चिप और सेमीकंडक्टर की बुनियादी जानकारी" },
        { en: "Safety, ESD & 5S", hi: "सुरक्षा, ESD और 5S" },
        { en: "Quality & your role", hi: "क्वालिटी और आपकी भूमिका" },
        { en: "Induction test (passing marks required)", hi: "इंडक्शन टेस्ट (पासिंग मार्क्स ज़रूरी)" },
      ]},
    ],
  },
  {
    id: "amber", title: { en: "Amber Group", hi: "एम्बर ग्रुप" }, icon: "🏢", slides: [
      { kind: "hero", eyebrow: { en: "Our parent group", hi: "हमारा पैरेंट ग्रुप" }, title: { en: "Amber Group", hi: "एम्बर ग्रुप" },
        text: { en: "Amber Enterprises India is a leading Indian manufacturer for the room air-conditioner and consumer durables industry, working as an OEM/ODM partner for many well-known brands.", hi: "एम्बर एंटरप्राइज़ेज़ इंडिया रूम AC और कंज़्यूमर ड्यूरेबल्स की एक बड़ी भारतीय निर्माता कंपनी है, जो कई जाने-माने ब्रांड्स के लिए OEM/ODM पार्टनर है।" } },
      { kind: "stats", title: { en: "Amber at a glance (indicative)", hi: "एम्बर एक नज़र में (अनुमानित)" }, stats: [
        { value: "30+", label: { en: "Years of manufacturing", hi: "साल का मैन्युफैक्चरिंग अनुभव" } },
        { value: "25+", label: { en: "Manufacturing plants", hi: "मैन्युफैक्चरिंग प्लांट" } },
        { value: "RAC", label: { en: "Room AC & components", hi: "रूम AC और कंपोनेंट्स" } },
        { value: "PCBA", label: { en: "Electronics via ILJIN", hi: "इल्जिन द्वारा इलेक्ट्रॉनिक्स" } },
      ]},
      { kind: "grid", title: { en: "Group businesses", hi: "ग्रुप के बिज़नेस" }, items: [
        { icon: "❄️", title: { en: "Consumer Durables", hi: "कंज़्यूमर ड्यूरेबल्स" }, text: { en: "Room ACs, indoor/outdoor units & components", hi: "रूम AC, इनडोर/आउटडोर यूनिट और कंपोनेंट्स" } },
        { icon: "🔌", title: { en: "Electronics", hi: "इलेक्ट्रॉनिक्स" }, text: { en: "PCBAs & electronic assemblies", hi: "PCBA और इलेक्ट्रॉनिक असेंबली" } },
        { icon: "🚆", title: { en: "Railway Subsystems", hi: "रेलवे सबसिस्टम" }, text: { en: "HVAC & systems for mobility", hi: "रेल के लिए HVAC और सिस्टम" } },
        { icon: "🧩", title: { en: "Components", hi: "कंपोनेंट्स" }, text: { en: "Motors, heat exchangers, plastics, sheet metal", hi: "मोटर, हीट एक्सचेंजर, प्लास्टिक, शीट मेटल" } },
      ]},
    ],
  },
  {
    id: "iljin", title: { en: "About ILJIN", hi: "इल्जिन के बारे में" }, icon: "⚡", slides: [
      { kind: "hero", eyebrow: { en: "Who we are", hi: "हम कौन हैं" }, title: { en: "ILJIN Electronics India", hi: "इल्जिन इलेक्ट्रॉनिक्स इंडिया" },
        text: { en: "ILJIN designs and manufactures printed circuit board assemblies (PCBAs) – the electronic 'brain' inside many products we use every day.", hi: "इल्जिन PCBA (प्रिंटेड सर्किट बोर्ड असेंबली) बनाती है – यह रोज़ इस्तेमाल होने वाले कई प्रोडक्ट्स का इलेक्ट्रॉनिक 'दिमाग' है।" } },
      { kind: "grid", title: { en: "Where our boards go", hi: "हमारे बोर्ड कहाँ लगते हैं" }, items: [
        { icon: "🏠", title: { en: "Home Appliances", hi: "घरेलू उपकरण" }, text: { en: "ACs, washing machines, refrigerators, microwaves", hi: "AC, वॉशिंग मशीन, फ्रिज, माइक्रोवेव" } },
        { icon: "💡", title: { en: "Lighting & Power", hi: "लाइटिंग और पावर" }, text: { en: "LED drivers, power supplies, chargers", hi: "LED ड्राइवर, पावर सप्लाई, चार्जर" } },
        { icon: "🚗", title: { en: "Automotive", hi: "ऑटोमोटिव" }, text: { en: "Growing segment – strict quality standards", hi: "बढ़ता क्षेत्र – सख्त क्वालिटी मानक" } },
        { icon: "🛡️", title: { en: "Defense & Industrial", hi: "डिफेंस और इंडस्ट्रियल" }, text: { en: "High-reliability electronics", hi: "उच्च भरोसेमंद इलेक्ट्रॉनिक्स" } },
      ]},
      { kind: "points", title: { en: "Our values", hi: "हमारे मूल्य" }, points: [
        { en: "Safety first – always", hi: "सुरक्षा सबसे पहले – हमेशा" },
        { en: "Quality is everyone's job", hi: "क्वालिटी सबकी ज़िम्मेदारी है" },
        { en: "Follow the Work Instruction (WI) every time", hi: "हर बार वर्क इंस्ट्रक्शन (WI) का पालन करें" },
        { en: "Respect, teamwork and discipline", hi: "सम्मान, टीमवर्क और अनुशासन" },
        { en: "Continuous improvement – share your ideas", hi: "लगातार सुधार – अपने आइडिया शेयर करें" },
      ]},
    ],
  },
  {
    id: "pcba", title: { en: "PCBA Process", hi: "PCBA प्रोसेस" }, icon: "🔧", slides: [
      { kind: "hero", eyebrow: { en: "What we make", hi: "हम क्या बनाते हैं" }, title: { en: "What is a PCBA?", hi: "PCBA क्या है?" },
        text: { en: "A PCB (Printed Circuit Board) is a bare board with copper tracks. When electronic components are mounted and soldered on it, it becomes a PCBA – Printed Circuit Board Assembly.", hi: "PCB (प्रिंटेड सर्किट बोर्ड) तांबे की लाइनों वाला खाली बोर्ड है। जब उस पर कंपोनेंट्स लगाकर सोल्डर किए जाते हैं, तो वह PCBA – प्रिंटेड सर्किट बोर्ड असेंबली बन जाता है।" } },
      { kind: "flow", title: { en: "SMT line – Surface Mount", hi: "SMT लाइन – सरफेस माउंट" }, steps: [
        { title: { en: "Solder Paste Printing", hi: "सोल्डर पेस्ट प्रिंटिंग" }, text: { en: "Paste applied through a stencil", hi: "स्टेंसिल से पेस्ट लगाना" } },
        { title: { en: "SPI", hi: "SPI" }, text: { en: "Solder paste inspection", hi: "सोल्डर पेस्ट की जाँच" } },
        { title: { en: "Pick & Place", hi: "पिक एंड प्लेस" }, text: { en: "Machines place tiny components", hi: "मशीन छोटे कंपोनेंट्स लगाती है" } },
        { title: { en: "Reflow Oven", hi: "रीफ्लो ओवन" }, text: { en: "Paste melts & solders parts", hi: "पेस्ट पिघलकर पार्ट्स जोड़ता है" } },
        { title: { en: "AOI", hi: "AOI" }, text: { en: "Automatic optical inspection", hi: "कैमरे से ऑटोमैटिक जाँच" } },
      ]},
      { kind: "flow", title: { en: "Through-hole, test & finish", hi: "थ्रू-होल, टेस्ट और फिनिश" }, steps: [
        { title: { en: "AI / Manual Insertion", hi: "AI / मैनुअल इंसर्शन" }, text: { en: "Leaded parts inserted", hi: "लीड वाले पार्ट्स लगाना" } },
        { title: { en: "Wave Soldering", hi: "वेव सोल्डरिंग" }, text: { en: "Board passes over molten solder", hi: "बोर्ड पिघले सोल्डर के ऊपर से गुज़रता है" } },
        { title: { en: "Touch-up & Inspection", hi: "टच-अप और जाँच" }, text: { en: "Manual correction & visual check", hi: "हाथ से सुधार और विज़ुअल चेक" } },
        { title: { en: "ICT / FCT", hi: "ICT / FCT" }, text: { en: "In-circuit & functional testing", hi: "इन-सर्किट और फंक्शनल टेस्टिंग" } },
        { title: { en: "Coating, Packing & OQC", hi: "कोटिंग, पैकिंग और OQC" }, text: { en: "Protect, pack and final quality", hi: "सुरक्षा, पैकिंग और फाइनल क्वालिटी" } },
      ]},
    ],
  },
  {
    id: "chips", title: { en: "Chips & Semiconductors", hi: "चिप और सेमीकंडक्टर" }, icon: "🔬", slides: [
      { kind: "hero", eyebrow: { en: "Basics", hi: "बुनियादी जानकारी" }, title: { en: "What is a semiconductor?", hi: "सेमीकंडक्टर क्या है?" },
        text: { en: "A semiconductor (mostly silicon) is a material that can control the flow of electricity. Chips (ICs) are made of millions of tiny switches built on silicon.", hi: "सेमीकंडक्टर (ज़्यादातर सिलिकॉन) ऐसा पदार्थ है जो बिजली के बहाव को कंट्रोल कर सकता है। चिप (IC) में सिलिकॉन पर बने लाखों छोटे स्विच होते हैं।" } },
      { kind: "grid", title: { en: "Components you will see on the line", hi: "लाइन पर दिखने वाले कंपोनेंट्स" }, items: [
        { icon: "🟫", title: { en: "IC / Chip", hi: "IC / चिप" }, text: { en: "The 'brain' – microcontroller, driver, memory", hi: "'दिमाग' – माइक्रोकंट्रोलर, ड्राइवर, मेमोरी" } },
        { icon: "▭", title: { en: "Resistor", hi: "रेज़िस्टर" }, text: { en: "Limits current – colour bands or SMD code", hi: "करंट कम करता है – कलर बैंड या SMD कोड" } },
        { icon: "🔋", title: { en: "Capacitor", hi: "कैपेसिटर" }, text: { en: "Stores charge – check polarity!", hi: "चार्ज स्टोर करता है – पोलैरिटी चेक करें!" } },
        { icon: "➡️", title: { en: "Diode / LED", hi: "डायोड / LED" }, text: { en: "Current flows one way – check direction", hi: "करंट एक ही दिशा में – दिशा चेक करें" } },
        { icon: "🔺", title: { en: "Transistor / MOSFET", hi: "ट्रांजिस्टर / MOSFET" }, text: { en: "Electronic switch / amplifier", hi: "इलेक्ट्रॉनिक स्विच / एम्प्लीफायर" } },
        { icon: "🔌", title: { en: "Connector", hi: "कनेक्टर" }, text: { en: "Joins board to wires & other boards", hi: "बोर्ड को तार और दूसरे बोर्ड से जोड़ता है" } },
      ]},
      { kind: "points", title: { en: "Handle components correctly", hi: "कंपोनेंट्स को सही तरीके से संभालें" }, points: [
        { en: "Always check part number & polarity against the WI", hi: "हमेशा WI से पार्ट नंबर और पोलैरिटी मिलाएं" },
        { en: "Moisture-sensitive chips stay in sealed / dry storage", hi: "नमी से खराब होने वाली चिप सील/ड्राई स्टोरेज में रखें" },
        { en: "Never touch IC pins with bare fingers", hi: "IC की पिन को कभी नंगी उंगलियों से न छुएं" },
        { en: "Dropped component = do not use, report to leader", hi: "गिरा हुआ कंपोनेंट इस्तेमाल न करें, लीडर को बताएं" },
      ]},
    ],
  },
  {
    id: "safety", title: { en: "Safety & ESD", hi: "सुरक्षा और ESD" }, icon: "🦺", slides: [
      { kind: "grid", title: { en: "Personal Protective Equipment (PPE)", hi: "व्यक्तिगत सुरक्षा उपकरण (PPE)" }, items: [
        { icon: "🥼", title: { en: "ESD Coat", hi: "ESD कोट" }, text: { en: "Must be worn & buttoned on the shop floor", hi: "फ्लोर पर पहनना और बटन बंद रखना ज़रूरी" } },
        { icon: "👟", title: { en: "ESD Shoes", hi: "ESD जूते" }, text: { en: "Antistatic footwear only", hi: "सिर्फ़ एंटी-स्टैटिक जूते" } },
        { icon: "⌚", title: { en: "Wrist Strap", hi: "रिस्ट स्ट्रैप" }, text: { en: "Test daily at the ESD tester", hi: "रोज़ ESD टेस्टर पर चेक करें" } },
        { icon: "🧤", title: { en: "Gloves / Finger Cots", hi: "दस्ताने / फिंगर कॉट" }, text: { en: "As per the work instruction", hi: "वर्क इंस्ट्रक्शन के अनुसार" } },
      ]},
      { kind: "hero", eyebrow: { en: "ESD – Electro Static Discharge", hi: "ESD – इलेक्ट्रो स्टैटिक डिस्चार्ज" },
        title: { en: "A spark you can't feel can kill a chip", hi: "जो करंट आप महसूस नहीं करते, वह चिप खराब कर सकता है" },
        text: { en: "Our body carries static charge. Touching a board without grounding can damage chips silently – the board may fail later at the customer. Always wear your wrist strap & work in the EPA.", hi: "हमारे शरीर में स्टैटिक चार्ज होता है। बिना ग्राउंडिंग के बोर्ड छूने से चिप चुपचाप खराब हो सकती है – और बोर्ड बाद में ग्राहक के पास फेल हो सकता है। हमेशा रिस्ट स्ट्रैप पहनें और EPA में काम करें।" } },
      { kind: "points", title: { en: "Emergency", hi: "आपातकाल" }, points: [
        { en: "Know your nearest fire exit & assembly point", hi: "नज़दीकी फायर एग्ज़िट और असेंबली पॉइंट जानें" },
        { en: "Report every injury or near-miss to your supervisor", hi: "हर चोट या खतरे की स्थिति सुपरवाइज़र को बताएं" },
        { en: "Do not operate a machine without training", hi: "बिना ट्रेनिंग के मशीन न चलाएं" },
        { en: "Fire alarm: stop work, leave calmly, don't use lifts", hi: "फायर अलार्म: काम रोकें, शांति से बाहर जाएं, लिफ्ट न लें" },
      ]},
    ],
  },
  {
    id: "quality", title: { en: "5S & Quality", hi: "5S और क्वालिटी" }, icon: "✅", slides: [
      { kind: "flow", title: { en: "5S at the workplace", hi: "कार्यस्थल पर 5S" }, steps: [
        { title: { en: "Sort", hi: "छँटाई (Sort)" }, text: { en: "Remove what is not needed", hi: "जो ज़रूरी नहीं, हटाएं" } },
        { title: { en: "Set in Order", hi: "व्यवस्थित करें" }, text: { en: "A place for everything", hi: "हर चीज़ की तय जगह" } },
        { title: { en: "Shine", hi: "सफ़ाई (Shine)" }, text: { en: "Keep it clean", hi: "जगह साफ़ रखें" } },
        { title: { en: "Standardize", hi: "मानकीकरण" }, text: { en: "Same way, every time", hi: "हर बार एक ही तरीका" } },
        { title: { en: "Sustain", hi: "बनाए रखें" }, text: { en: "Make it a habit", hi: "इसे आदत बनाएं" } },
      ]},
      { kind: "points", title: { en: "Your role in quality", hi: "क्वालिटी में आपकी भूमिका" }, points: [
        { en: "Follow the WI – no shortcuts", hi: "WI का पालन करें – कोई शॉर्टकट नहीं" },
        { en: "CTP/CTQ stations: extra care, every board", hi: "CTP/CTQ स्टेशन: हर बोर्ड पर ज़्यादा ध्यान" },
        { en: "Found a defect? Stop, tag it, inform your leader", hi: "डिफेक्ट मिला? रुकें, टैग करें, लीडर को बताएं" },
        { en: "Never pass a doubtful board to the next station", hi: "शक वाला बोर्ड कभी अगले स्टेशन पर न भेजें" },
        { en: "Record your work honestly in MES", hi: "MES में अपना काम ईमानदारी से दर्ज करें" },
      ]},
      { kind: "hero", eyebrow: { en: "Next step", hi: "अगला कदम" }, title: { en: "You're ready for the Induction Test", hi: "अब आप इंडक्शन टेस्ट के लिए तैयार हैं" },
        text: { en: "Pass the induction test to move to 3-day On-the-Job Training (OJT) on your assigned line. All the best!", hi: "इंडक्शन टेस्ट पास करने के बाद आपकी लाइन पर 3 दिन की ऑन-द-जॉब ट्रेनिंग (OJT) होगी। शुभकामनाएं!" } },
    ],
  },
];
