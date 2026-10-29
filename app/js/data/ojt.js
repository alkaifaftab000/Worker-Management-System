// OJT (On-the-Job Training) – General + process-wise tabs. 3-day plan + test per tab.
// General test = 01-HRD40-F-36 "Test Paper-OJT" (answer key not in sheet; confirm: true where unsure).
// Process plans & tests are DUMMY for pilot – replace via "Upload Excel" on each tab.
const mcq = (q, hi, options, answer, marks = 2, extra = {}) => ({ type: "mcq", q, hi, options, answer, marks, ...extra });
const text = (q, hi) => ({ type: "text", q, hi });

const OJT = [
  {
    id: "general", title: { en: "General", hi: "सामान्य" }, icon: "📘",
    intro: { en: "Common OJT for every new worker before line-specific training.", hi: "लाइन ट्रेनिंग से पहले हर नए वर्कर के लिए सामान्य OJT।" },
    plan: [
      { day: 1, topics: [{ en: "Line tour & station layout", hi: "लाइन टूर और स्टेशन लेआउट" }, { en: "WI – how to read a work instruction", hi: "WI – वर्क इंस्ट्रक्शन कैसे पढ़ें" }, { en: "Red bin / OK–NG handling", hi: "रेड बिन / OK–NG हैंडलिंग" }] },
      { day: 2, topics: [{ en: "Self & sequential check", hi: "सेल्फ और सीक्वेंशियल चेक" }, { en: "PCB types, legend marking", hi: "PCB के प्रकार, लीजेंड मार्किंग" }, { en: "Missing / reverse component identification", hi: "मिसिंग / रिवर्स कंपोनेंट की पहचान" }] },
      { day: 3, topics: [{ en: "UPH, cycle time & bottleneck", hi: "UPH, साइकिल टाइम और बॉटलनेक" }, { en: "Work under supervision", hi: "सुपरविज़न में काम" }, { en: "OJT test", hi: "OJT टेस्ट" }] },
    ],
    test: { passPercent: 40, sections: [{ id: "general", title: { en: "OJT – General", hi: "OJT – सामान्य" }, icon: "📘", questions: [
      mcq("What is \"Self & Sequential\"?", "“Self & Sequential” क्या होता है ?", ["पहले अपना काम करना फिर अपने से पहली स्टेज का काम चेक करना।", "अपने से पहली स्टेज का काम चेक करना फिर अपना काम करना।"], 1, 2, { confirm: true }),
      mcq("Why is the WI displayed?", "“WI” क्यों लगाई जाती है?", ["केवल मॉडल चेक करने के लिए।", "मॉडल, पार्ट नंबर और component लोकेशन चेक करने के लिए।"], 1),
      mcq("Why is the red bin used?", "“रेड बिन” क्यों यूज की जाती है?", ["OK कंपोनेंट्स रखने के लिए।", "NG कंपोनेंट्स रखने के लिए।"], 1),
      mcq("What do you understand by UPH?", "UPH से आप क्या समझते है?", ["एक घंटे में निकलने वाला Production।", "एक Process मे लगने वाला सबसे कम समय।"], 0),
      mcq("What do you understand by bottleneck?", "Bottleneck से आप क्या समझते है?", ["एक Process मे लगने वाला सबसे ज़्यादा समय।", "एक Process मे लगने वाला सबसे कम समय।"], 0),
      mcq("Which of these is a double layer PCB?", "इनमे से double layer PCB कौन सा है?", ["FR-1", "FR-4"], 1),
      mcq("How will you identify a reversed component on the PCB?", "पीसीबी में रिवर्स लगे कंपोनेंट्स की पहचान कैसे करेंगे ?", ["लीजेंड मार्किंग से", "NG कंपोनेंट्स से"], 0),
      mcq("What material is the conveyor belt made of?", "Conveyor belt किस मटीरियल की बनी होती है", ["ESD", "Non-ESD"], 0),
      mcq("How will you identify a missing component on the PCB?", "पीसीबी में मिसिंग लगे कंपोनेंट्स की पहचान कैसे करेंगे ?", ["NG कंपोनेंट्स से", "WI या सैंपल से"], 1),
      mcq("What is the full form of WI?", "WI की फुल फॉर्म क्या होती है ?", ["Work instruction", "Work information"], 0),
      text("What will you do if you find an NG board?", "अगर आपको NG बोर्ड मिले तो आप क्या करेंगे?"),
    ]}]},
  },
  {
    id: "smt", title: { en: "SMT", hi: "SMT" }, icon: "🔧",
    intro: { en: "Surface Mount line – printing, pick & place, reflow, AOI.", hi: "सरफेस माउंट लाइन – प्रिंटिंग, पिक एंड प्लेस, रीफ्लो, AOI।" },
    plan: [
      { day: 1, topics: [{ en: "Solder paste handling & stencil", hi: "सोल्डर पेस्ट हैंडलिंग और स्टेंसिल" }, { en: "Feeder & reel loading", hi: "फीडर और रील लोडिंग" }] },
      { day: 2, topics: [{ en: "Reflow profile basics", hi: "रीफ्लो प्रोफाइल की जानकारी" }, { en: "AOI defects: shift, bridge, tombstone", hi: "AOI डिफेक्ट: शिफ्ट, ब्रिज, टॉम्बस्टोन" }] },
      { day: 3, topics: [{ en: "MSD handling & baking", hi: "MSD हैंडलिंग और बेकिंग" }, { en: "Supervised operation + test", hi: "सुपरविज़न में काम + टेस्ट" }] },
    ],
    test: { passPercent: 40, sections: [{ id: "smt", title: { en: "SMT", hi: "SMT" }, icon: "🔧", questions: [
      mcq("Solder paste must be brought to room temperature before use.", "सोल्डर पेस्ट को इस्तेमाल से पहले रूम टेम्परेचर पर लाना ज़रूरी है।", ["True / सही", "False / गलत"], 0),
      mcq("What does AOI stand for?", "AOI का फुल फॉर्म क्या है?", ["Automatic Optical Inspection", "Auto Output Inspection", "Assembly Online Inspection", "Automatic Order Input"], 0),
      mcq("A component standing on one end after reflow is called?", "रीफ्लो के बाद एक सिरे पर खड़ा कंपोनेंट क्या कहलाता है?", ["Bridge / ब्रिज", "Tombstone / टॉम्बस्टोन", "Shift / शिफ्ट", "Void / वॉइड"], 1),
      mcq("Before loading a reel, what must be verified?", "रील लोड करने से पहले क्या चेक करना ज़रूरी है?", ["Part number vs feeder list / पार्ट नंबर और फीडर लिस्ट", "Reel colour / रील का रंग", "Nothing / कुछ नहीं", "Operator name / ऑपरेटर का नाम"], 0),
      text("Explain why MSD (moisture sensitive) parts need special handling.", "MSD पार्ट्स को खास तरीके से क्यों रखा जाता है, समझाइए।"),
    ]}]},
  },
  {
    id: "ai", title: { en: "AI Insertion", hi: "AI इंसर्शन" }, icon: "📍",
    intro: { en: "Auto / manual insertion of leaded (through-hole) components.", hi: "लीड वाले (थ्रू-होल) कंपोनेंट्स का ऑटो / मैनुअल इंसर्शन।" },
    plan: [
      { day: 1, topics: [{ en: "Axial / radial components", hi: "एक्सियल / रेडियल कंपोनेंट्स" }, { en: "Polarity marks on PCB", hi: "PCB पर पोलैरिटी मार्क" }] },
      { day: 2, topics: [{ en: "Manual insertion sequence", hi: "मैनुअल इंसर्शन का क्रम" }, { en: "Lead bending & clinching", hi: "लीड बेंडिंग और क्लिंचिंग" }] },
      { day: 3, topics: [{ en: "Missing / wrong part checks", hi: "मिसिंग / गलत पार्ट की जाँच" }, { en: "Supervised operation + test", hi: "सुपरविज़न में काम + टेस्ट" }] },
    ],
    test: { passPercent: 40, sections: [{ id: "ai", title: { en: "AI Insertion", hi: "AI इंसर्शन" }, icon: "📍", questions: [
      mcq("Electrolytic capacitor polarity is identified by?", "इलेक्ट्रोलिटिक कैपेसिटर की पोलैरिटी कैसे पहचानें?", ["Stripe / minus mark / माइनस मार्क", "Colour of PCB / PCB का रंग", "Size only / सिर्फ़ साइज़", "Not needed / ज़रूरी नहीं"], 0),
      mcq("Diode band shows which side?", "डायोड पर बैंड किस साइड को दिखाता है?", ["Cathode / कैथोड", "Anode / एनोड"], 0),
      mcq("If a part does not match the WI, you should?", "अगर पार्ट WI से मेल नहीं खाता तो क्या करें?", ["Insert anyway / फिर भी लगा दें", "Stop & inform leader / रुकें और लीडर को बताएं"], 1),
      text("Name two components that have polarity.", "पोलैरिटी वाले दो कंपोनेंट्स के नाम लिखिए।"),
    ]}]},
  },
  {
    id: "soldering", title: { en: "Soldering", hi: "सोल्डरिंग" }, icon: "🔥",
    intro: { en: "Wave soldering, manual soldering and touch-up.", hi: "वेव सोल्डरिंग, मैनुअल सोल्डरिंग और टच-अप।" },
    plan: [
      { day: 1, topics: [{ en: "Soldering iron safety & temperature", hi: "सोल्डरिंग आयरन सुरक्षा और तापमान" }, { en: "Good vs bad joint", hi: "अच्छा और खराब जॉइंट" }] },
      { day: 2, topics: [{ en: "Wave solder pallet & flux", hi: "वेव सोल्डर पैलेट और फ्लक्स" }, { en: "Touch-up: bridge, dry joint", hi: "टच-अप: ब्रिज, ड्राई जॉइंट" }] },
      { day: 3, topics: [{ en: "Visual inspection standard", hi: "विज़ुअल इंस्पेक्शन स्टैंडर्ड" }, { en: "Supervised operation + test", hi: "सुपरविज़न में काम + टेस्ट" }] },
    ],
    test: { passPercent: 40, sections: [{ id: "soldering", title: { en: "Soldering", hi: "सोल्डरिंग" }, icon: "🔥", questions: [
      mcq("A good solder joint looks?", "अच्छा सोल्डर जॉइंट कैसा दिखता है?", ["Shiny & concave / चमकदार और अवतल", "Dull & ball shaped / फीका और गोल", "Cracked / दरार वाला", "Black / काला"], 0),
      mcq("Solder joining two pads that should be separate is called?", "दो अलग पैड को जोड़ने वाला सोल्डर क्या कहलाता है?", ["Bridge / ब्रिज", "Dry joint / ड्राई जॉइंट"], 0),
      mcq("Soldering iron must be kept?", "सोल्डरिंग आयरन कहाँ रखना चाहिए?", ["On the table / टेबल पर", "In its stand / स्टैंड में"], 1),
      text("What are the signs of a dry solder joint?", "ड्राई सोल्डर जॉइंट की पहचान क्या है?"),
    ]}]},
  },
  {
    id: "testing", title: { en: "Testing (ICT/FCT)", hi: "टेस्टिंग (ICT/FCT)" }, icon: "🧪",
    intro: { en: "In-circuit and functional testing of finished boards.", hi: "तैयार बोर्ड की इन-सर्किट और फंक्शनल टेस्टिंग।" },
    plan: [
      { day: 1, topics: [{ en: "ICT vs FCT", hi: "ICT और FCT में अंतर" }, { en: "Fixture loading & ESD", hi: "फिक्स्चर लोडिंग और ESD" }] },
      { day: 2, topics: [{ en: "Reading PASS / FAIL results", hi: "PASS / FAIL रिज़ल्ट पढ़ना" }, { en: "Fail tagging & MES entry", hi: "फेल टैगिंग और MES एंट्री" }] },
      { day: 3, topics: [{ en: "Golden sample check", hi: "गोल्डन सैंपल चेक" }, { en: "Supervised operation + test", hi: "सुपरविज़न में काम + टेस्ट" }] },
    ],
    test: { passPercent: 40, sections: [{ id: "testing", title: { en: "Testing", hi: "टेस्टिंग" }, icon: "🧪", questions: [
      mcq("FCT stands for?", "FCT का फुल फॉर्म क्या है?", ["Functional Circuit Test", "Functional Test", "Final Check Test", "Fast Circuit Test"], 1),
      mcq("A FAIL board should be?", "FAIL बोर्ड के साथ क्या करें?", ["Retested until pass / पास होने तक दोबारा टेस्ट", "Tagged & sent to repair / टैग करके रिपेयर भेजें"], 1),
      mcq("Golden sample is used to?", "गोल्डन सैंपल किसलिए इस्तेमाल होता है?", ["Verify tester is OK / टेस्टर सही है यह जाँचने", "Ship to customer / ग्राहक को भेजने"], 0),
      text("Why must every test result be entered in MES?", "हर टेस्ट रिज़ल्ट MES में क्यों डालना ज़रूरी है?"),
    ]}]},
  },
  {
    id: "assembly", title: { en: "Assembly & Packing", hi: "असेंबली और पैकिंग" }, icon: "📦",
    intro: { en: "Final assembly, coating, packing and OQC.", hi: "फाइनल असेंबली, कोटिंग, पैकिंग और OQC।" },
    plan: [
      { day: 1, topics: [{ en: "Screw torque & fitting", hi: "स्क्रू टॉर्क और फिटिंग" }, { en: "Label & barcode", hi: "लेबल और बारकोड" }] },
      { day: 2, topics: [{ en: "ESD packing material", hi: "ESD पैकिंग मटीरियल" }, { en: "Box quantity & stacking", hi: "बॉक्स क्वांटिटी और स्टैकिंग" }] },
      { day: 3, topics: [{ en: "OQC checklist", hi: "OQC चेकलिस्ट" }, { en: "Supervised operation + test", hi: "सुपरविज़न में काम + टेस्ट" }] },
    ],
    test: { passPercent: 40, sections: [{ id: "assembly", title: { en: "Assembly & Packing", hi: "असेंबली और पैकिंग" }, icon: "📦", questions: [
      mcq("PCBAs must be packed in?", "PCBA किसमें पैक करने चाहिए?", ["ESD bag / tray / ESD बैग / ट्रे", "Normal polythene / सामान्य पॉलीथीन"], 0),
      mcq("Wrong label on box – what to do?", "बॉक्स पर गलत लेबल हो तो क्या करें?", ["Ship anyway / फिर भी भेज दें", "Hold & inform leader / रोकें और लीडर को बताएं"], 1),
      mcq("OQC means?", "OQC का मतलब?", ["Outgoing Quality Control", "Online Quality Check"], 0),
      text("List two checks before closing a box.", "बॉक्स बंद करने से पहले के दो चेक लिखिए।"),
    ]}]},
  },
];
