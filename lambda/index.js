/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

// Story content with English and Hindi stories
const storyContent = {
    intro: "Welcome to the World of Stories. You can hear stories in English or Hindi. For English, you can choose stories about a fox, owl, turtle, or elephant. For Hindi stories, you can choose stories about a rabbit, lion, monkey, or peacock. What would you like to hear?",
    
    // English stories
    foxStory: "Once upon a time, there was a brave fox named Rusty. He lived in a beautiful forest and was known for his courage. One day, the forest was threatened by a terrible storm. While other animals hid in fear, Rusty ventured out to warn everyone and guide them to safety. Thanks to his bravery, all the animals survived. From that day on, Rusty was known as the hero of the forest. The moral of the story is: True courage means helping others even when you're afraid. The end.",
    
    owlStory: "Deep in an enchanted forest lived a wise old owl named Oliver. Animals would come from far and wide to seek his advice. One day, a dispute broke out between the rabbits and squirrels over food supplies. Oliver listened carefully to both sides and proposed a fair sharing system that benefited everyone. His wisdom brought peace back to the forest, and the animals lived in harmony once again. The moral of the story is: Listen to all sides before making a decision. The end.",
    
    turtleStory: "In the World of Stories pond lived a turtle named Terry. While all the other animals could run fast, Terry was very slow. The animals often teased him about his pace. One day, a race was organized. Many fast animals joined, but to everyone's surprise, Terry also entered. During the race, the fast animals got distracted by delicious berries and beautiful flowers along the way. But Terry kept moving steadily without stopping. By the time the others remembered the race, Terry had crossed the finish line! The moral of the story is: Slow and steady can win the race; persistence matters more than speed. The end.",
    
    elephantStory: "Ellie the elephant was the largest animal in the World of Stories. Despite her size, she was very gentle and kind. Some smaller animals feared her because she was so big. One summer, a terrible drought hit the forest. The river dried up, and many animals couldn't find water. Ellie remembered a hidden spring deep in the mountains. With her strong trunk, she dug a channel from the spring to the forest, creating a new stream for everyone. The animals realized they had misjudged Ellie. The moral of the story is: Don't judge others by their appearance; true kindness comes from within. The end.",
    
    // New English stories
    giraffeStory: "In the sunny savannah lived a young giraffe named Gerry who had the shortest neck among all giraffes. The other giraffes could reach the tastiest leaves at the top of the trees, but Gerry couldn't. Instead of feeling sad, Gerry learned to be resourceful. He discovered delicious berries and plants that grew close to the ground that no other giraffe bothered to try. One year, a terrible drought came, and all the leaves on the tall trees dried up. While other giraffes struggled to find food, Gerry taught them about the plants he had discovered. Thanks to Gerry, the entire herd survived the drought. The moral of the story is: Your unique challenges can become your greatest strengths. The end.",
    
    beaverStory: "By the river lived a beaver named Ben who loved to build. Every day, he worked on his dam, making it stronger and bigger than any other beaver dam. The other animals thought Ben was too obsessed with his work. 'Why not relax like us?' they asked. Ben just smiled and kept building. When spring came, heavy rains caused the river to flood. Many animal homes were in danger, but Ben's strong dam held back the rushing water and protected everyone downstream. The animals realized that Ben's hard work had saved them all. The moral of the story is: Diligence and preparation today can prevent disasters tomorrow. The end.",
    
    eagleStory: "High in the mountains lived an eagle named Eddie. Unlike other eagles who soared alone, Eddie believed in teamwork. He taught younger eagles to fly in formation, taking turns at the front where the wind resistance was strongest. Other adult eagles laughed at this idea. But during the long migration south, Eddie's team flew farther each day while using less energy. They arrived at the warm southern lands days before the others, claiming the best nesting spots. Soon, all the eagles adopted Eddie's formation flying technique. The moral of the story is: Innovation and teamwork can achieve what individual effort cannot. The end.",
    
    // Hindi stories
    rabbitStoryHindi: "एक बार की बात है, एक छोटा खरगोश था जिसका नाम था छोटू। छोटू बहुत घमंडी था और हमेशा अपनी तेज़ गति पर गर्व करता था। एक दिन उसने कछुए को धीमा चलते देखा और उसका मज़ाक उड़ाया। कछुए ने एक दौड़ का प्रस्ताव रखा जिसे छोटू ने हंसते हुए स्वीकार कर लिया। दौड़ के दिन, छोटू तेज़ी से आगे निकल गया और सोचा कि वह आराम कर सकता है। वह एक पेड़ के नीचे सो गया। इस बीच, कछुआ बिना रुके चलता रहा और अंत में दौड़ जीत गया। छोटू जब उठा तो देखा कि वह हार चुका था। इस कहानी का संदेश है: घमंड का अंत हमेशा पतन होता है और धैर्य और लगन से हर मुश्किल को पार किया जा सकता है। कहानी समाप्त।",
    
    lionStoryHindi: "जंगल में एक शेर राजा था जिसका नाम था शेरू। वह बहुत क्रोधी स्वभाव का था और हमेशा अन्य जानवरों पर चिल्लाता रहता था। एक दिन, वह एक गहरे गड्ढे में गिर गया और मदद के लिए चिल्लाने लगा। सभी जानवर उसकी आवाज़ सुन सकते थे, लेकिन किसी ने भी मदद नहीं की क्योंकि वे उससे डरते थे। तभी एक छोटी चींटी ने देखा और अन्य चींटियों को इकट्ठा किया। सैकड़ों चींटियों ने मिलकर एक लंबी रस्सी बनाई जिससे शेर बाहर निकल सका। शेर को अपनी गलती का अहसास हुआ और उसने अपने व्यवहार को बदलने का वादा किया। इस कहानी का संदेश है: दूसरों के साथ अच्छा व्यवहार करो, क्योंकि कभी भी आपको उनकी मदद की जरूरत पड़ सकती है। कहानी समाप्त।",
    
    monkeyStoryHindi: "एक जंगल में मिंकी नाम का एक बंदर रहता था। मिंकी बहुत चालाक था लेकिन हमेशा दूसरों की चीज़ें बिना पूछे ले लेता था। एक दिन उसने एक किसान की टोकरी से फल चुराए। भागते समय, वह एक पेड़ की टहनी से टकरा गया और सारे फल नीचे गिर गए। मिंकी बहुत शर्मिंदा हुआ। किसान ने उसे देखा और कहा, \"यदि तुम्हें फल चाहिए थे, तो तुम मुझसे पूछ सकते थे। मैं तुम्हें कुछ फल देने में ख़ुशी महसूस करता।\" मिंकी ने अपनी गलती मानी और माफी मांगी। उस दिन से, मिंकी ने कभी भी कुछ बिना पूछे नहीं लिया। इस कहानी का संदेश है: ईमानदारी हमेशा सबसे अच्छी नीति है। कहानी समाप्त।",
    
    peacockStoryHindi: "एक सुंदर मोर मयूर नाम का था जो अपने रंगीन पंखों पर बहुत गर्व करता था। वह अक्सर अन्य पक्षियों का मज़ाक उड़ाता था जो उतने सुंदर नहीं थे। एक दिन, एक भयंकर तूफान आया और मयूर के सभी सुंदर पंख भीग गए और भारी हो गए। वह उड़ नहीं सकता था और खतरे में था। एक साधारण दिखने वाला कौआ, जिसका नाम काकू था, ने मयूर को एक सुरक्षित स्थान पर पहुंचने में मदद की। मयूर को अहसास हुआ कि सुंदरता से ज्यादा अच्छा स्वभाव महत्वपूर्ण है। इस कहानी का संदेश है: बाहरी सौंदर्य से आंतरिक सौंदर्य अधिक महत्वपूर्ण है। कहानी समाप्त।",
    
    // New Hindi stories
    butterflyStoryHindi: "एक पेड़ पर एक छोटा कीड़ा रहता था। वह हमेशा सोचता था, 'मैं इतना छोटा और साधारण क्यों हूँ?' दूसरे जानवर उसे नहीं देखते थे। एक दिन, उसने अपने आप को एक कोकून में लपेट लिया और कई दिनों तक सोया रहा। जब वह जागा, तो वह एक सुंदर तितली बन चुका था, रंगीन पंखों के साथ। वह आकाश में उड़ सकता था और सभी जानवर उसकी सुंदरता की प्रशंसा करते थे। एक छोटी चींटी ने पूछा, 'तुम इतने सुंदर कैसे बन गए?' तितली ने मुस्कुराते हुए जवाब दिया, 'परिवर्तन में समय लगता है, और कभी-कभी हमें अंधेरे में भी इंतज़ार करना पड़ता है। लेकिन प्रकृति हमेशा अपना काम करती है।' इस कहानी का संदेश है: धैर्य रखें, हर कठिन समय के बाद सुंदर परिणाम आते हैं। कहानी समाप्त।",
    
    sunflowerStoryHindi: "एक बगीचे में कई सारे फूल थे। एक कोने में एक छोटा सूरजमुखी का पौधा उगा। अन्य फूलों ने उसे देखा और कहा, 'तुम हमारी तरह सुंदर नहीं हो, तुम्हारे पास अभी कोई फूल भी नहीं है।' सूरजमुखी ने कुछ नहीं कहा और हर दिन सूरज की ओर अपना चेहरा करके खड़ा रहता। वह धीरे-धीरे बड़ा होता गया। एक दिन, उस पर एक विशाल सुनहरा फूल खिल गया जो सूरज की तरह चमकता था। जल्द ही वह बगीचे का सबसे ऊंचा और सुंदर फूल बन गया। सभी फूल उससे प्रेरणा लेने लगे। इस कहानी का संदेश है: अपना ध्यान अपने लक्ष्य पर रखें, और सफलता आपको मिलेगी। कहानी समाप्त।",
    
    mountainStoryHindi: "एक छोटे से गाँव में एक पर्वतारोही रहता था। उसे ऊंचे पहाड़ों पर चढ़ना पसंद था। एक दिन उसने गाँव के बच्चों को बताया कि वह सबसे ऊंचे पहाड़ पर चढ़ेगा। कुछ लोगों ने उसका मज़ाक उड़ाया, 'वह पहाड़ बहुत खतरनाक है, कोई नहीं चढ़ सकता।' पर्वतारोही ने हर दिन थोड़ा-थोड़ा अभ्यास किया, हर दिन थोड़ा आगे बढ़ा। कई महीनों के बाद, एक सुबह वह पहाड़ की चोटी पर पहुंच गया। नीचे से गाँव वालों ने उसे देखा और चकित रह गए। एक बच्चे ने पूछा, 'आपने इतना मुश्किल काम कैसे किया?' पर्वतारोही ने कहा, 'मैंने एक बार में एक कदम उठाया, और कभी हार नहीं मानी।' इस कहानी का संदेश है: धैर्य और दृढ़ता से कोई भी लक्ष्य प्राप्त किया जा सकता है। कहानी समाप्त।",
    
    // Additional classic Hindi stories
    birbalStoryHindi: "मुगल काल में अकबर के दरबार में एक बुद्धिमान मंत्री रहते थे जिनका नाम था बीरबल। एक दिन राजा अकबर ने अपने दरबारियों से एक पेंटिंग दिखाई और पूछा, \"इस पेंटिंग में क्या गलत है?\" पेंटिंग में एक व्यक्ति नाव में बैठा हुआ था और मछली पकड़ रहा था। कोई भी गलती नहीं बता पाया। तब बीरबल ने कहा, \"महाराज, इस पेंटिंग में दिखाया गया व्यक्ति मूर्ख है, क्योंकि वह अपने साथ मछली पकड़ने के लिए जाल नहीं लाया है।\" राजा ने कहा, \"लेकिन शायद वह नाव में छिपा हुआ है?\" बीरबल ने मुस्कुराते हुए जवाब दिया, \"महाराज, यदि जाल छिपा हुआ होता, तो उस व्यक्ति के चेहरे पर इतनी चिंता क्यों दिखाई देती?\" अकबर बीरबल की बुद्धिमत्ता से प्रभावित हुए। इस कहानी का संदेश है: सिर्फ देखने से नहीं, गहराई से सोचने से समस्या का समाधान मिलता है। कहानी समाप्त।",
    
    tenaliStoryHindi: "विजयनगर साम्राज्य में, तेनाली रामन नाम के एक बुद्धिमान व्यक्ति रहते थे। राजा कृष्णदेव राय के दरबार में अन्य पंडित उनसे जलते थे। एक दिन, एक पंडित ने राजा को एक अजीब पेड़ दिया और दावा किया कि इसमें सोने के फल लगेंगे। राजा ने तेनाली रामन को पेड़ की देखभाल का काम सौंपा। कुछ महीनों बाद, राजा ने पेड़ के बारे में पूछा। तेनाली ने कहा, \"महाराज, वह पेड़ सूख गया।\" राजा बहुत नाराज़ हुए। तेनाली ने समझाया, \"महाराज, यदि एक साधारण पेड़ में सोने के फल लग सकते हैं, तो वह सूख क्यों नहीं सकता? दोनों ही असंभव हैं।\" राजा को अपनी गलती का एहसास हुआ और उन्होंने तेनाली की चतुराई की प्रशंसा की। इस कहानी का संदेश है: सच्चाई को पहचानने की क्षमता ही सच्ची बुद्धिमत्ता है। कहानी समाप्त।",
    
    panchtantraStoryHindi: "एक बार की बात है, जंगल में चार दोस्त रहते थे - हिरण, कौआ, चूहा और कछुआ। एक दिन, हिरण एक जाल में फंस गया जो शिकारियों ने बिछाया था। कौए ने उसे देखा और तुरंत चूहे और कछुए को बुलाया। चूहे ने अपने तेज़ दांतों से जाल को काटना शुरू किया, जबकि कौआ आसपास नज़र रखता रहा। अचानक, शिकारी आ गए! कछुआ, जो बहुत धीमा था, भागने में असमर्थ था। हिरण, चूहा और कौआ ने मिलकर एक योजना बनाई। हिरण ने शिकारियों को दूर तक खींचा, चूहे ने कछुए को अपनी पीठ पर लिया और कौआ उन्हें रास्ता दिखाता रहा। सभी दोस्त सुरक्षित बच निकले। इस कहानी का संदेश है: एकता में शक्ति होती है, और हर दोस्त की अपनी विशेष क्षमता होती है जो मुश्किल समय में काम आती है। कहानी समाप्त।",
    
    vikramBetaalStoryHindi: "प्राचीन काल में, राजा विक्रमादित्य बहुत न्यायप्रिय और साहसी थे। एक दिन एक योगी ने उनसे एक विशेष कार्य करने को कहा। उन्हें एक श्मशान से एक शव (बेताल) को लाना था। शर्त यह थी कि वे पूरे रास्ते एकदम चुप रहेंगे। जैसे ही राजा शव को अपने कंधे पर लेकर चलने लगे, बेताल ने एक कहानी सुनानी शुरू की और अंत में एक पहेली पूछी। राजा विक्रम को पहेली का उत्तर पता था, लेकिन अगर वे चुप रहते तो बेताल उन्हें मार डालता। राजा ने उत्तर दिया और बेताल वापस श्मशान चला गया। यह क्रम कई बार दोहराया गया। अंत में, बेताल ने राजा की बुद्धिमत्ता और साहस से प्रभावित होकर उन्हें योगी के षडयंत्र के बारे में बताया और उनकी जान बचाई। इस कहानी का संदेश है: ज्ञान और साहस मिलकर सबसे बड़े खतरों से भी बचा सकते हैं। कहानी समाप्त।"
};

// Add a session attributes interceptor
const SessionAttributesRequestInterceptor = {
    process(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        // Set a flag to know we're in the skill
        sessionAttributes.inSkillSession = true;
        
        // Ensure we don't lose the lastStory between requests
        if (!sessionAttributes.lastStory) {
            sessionAttributes.lastStory = null;
        }
        
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        console.log('Session attributes at start:', JSON.stringify(sessionAttributes));
    }
};

// Improved helper functions for story tracking
function getLastStory(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    console.log('Getting last story:', sessionAttributes.lastStory);
    return sessionAttributes.lastStory || null;
}

function setLastStory(handlerInput, storyKey) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    console.log('Setting last story to:', storyKey);
    sessionAttributes.lastStory = storyKey;
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        // Set a session flag so we know the user is in our skill
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.inSkillSession = true;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        const speakOutput = "Welcome to the World of Stories! I have many stories in both English and Hindi with important life lessons. To browse English stories, say 'English stories'. For Hindi stories, say 'Hindi stories'. When requesting Hindi stories, please include 'world of stories' before your request to prevent other skills from being triggered. What would you like to hear today?";

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// Instead of Hello World, we'll have a Fox Story Intent
const FoxStoryIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FoxStoryIntent';
    },
    handle(handlerInput) {
        setLastStory(handlerInput, 'foxStory');
        return handlerInput.responseBuilder
            .speak(storyContent.foxStory)
            .getResponse();
    }
};

// New intent for Owl Story
const OwlStoryIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'OwlStoryIntent';
    },
    handle(handlerInput) {
        setLastStory(handlerInput, 'owlStory');
        return handlerInput.responseBuilder
            .speak(storyContent.owlStory)
            .getResponse();
    }
};

// We'll keep the original HelloWorldIntent but modify it to be a story selector
const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = "Welcome to the World of Stories! I have stories in both English and Hindi. In English, I can tell you about a brave fox, a wise owl, a persistent turtle, or a kind elephant. In Hindi, I can tell you about a rabbit, a lion, a monkey, or a peacock. Each story has a valuable lesson. Which one would you like to hear?";

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// Adding new intent handlers for English stories
const TurtleStoryIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TurtleStoryIntent';
    },
    handle(handlerInput) {
        setLastStory(handlerInput, 'turtleStory');
        return handlerInput.responseBuilder
            .speak(storyContent.turtleStory)
            .getResponse();
    }
};

const ElephantStoryIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ElephantStoryIntent';
    },
    handle(handlerInput) {
        setLastStory(handlerInput, 'elephantStory');
        return handlerInput.responseBuilder
            .speak(storyContent.elephantStory)
            .getResponse();
    }
};

// Adding new intent handlers for Hindi stories
const RabbitStoryHindiIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RabbitStoryHindiIntent';
    },
    handle(handlerInput) {
        setLastStory(handlerInput, 'rabbitStoryHindi');
        return handlerInput.responseBuilder
            .speak(storyContent.rabbitStoryHindi)
            .getResponse();
    }
};

const LionStoryHindiIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LionStoryHindiIntent';
    },
    handle(handlerInput) {
        setLastStory(handlerInput, 'lionStoryHindi');
        return handlerInput.responseBuilder
            .speak(storyContent.lionStoryHindi)
            .getResponse();
    }
};

const MonkeyStoryHindiIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MonkeyStoryHindiIntent';
    },
    handle(handlerInput) {
        setLastStory(handlerInput, 'monkeyStoryHindi');
        return handlerInput.responseBuilder
            .speak(storyContent.monkeyStoryHindi)
            .getResponse();
    }
};

const PeacockStoryHindiIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PeacockStoryHindiIntent';
    },
    handle(handlerInput) {
        setLastStory(handlerInput, 'peacockStoryHindi');
        return handlerInput.responseBuilder
            .speak(storyContent.peacockStoryHindi)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'This is the World of Stories skill with stories in English and Hindi. For English stories, you can say phrases like "tell me the fox story" or "tell me the eagle story". For Hindi stories, always include "world of stories" before your request, like "world of stories mor ki kahani" or "world of stories akbar birbal ki kahani". This prevents other skills from being triggered. If you miss anything, just say "repeat that". Which would you like to hear?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn't map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = "Sorry, I didn't catch that. To make sure you're using this skill and not another one, always start by saying \"open world of stories\" and then make your request. For Hindi stories, be specific by saying \"tell me the world of stories rabbit story in Hindi\" or \"world of stories mor ki kahani\". For English stories, try \"tell me the fox story\". Which story would you like to hear?";

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// Add language selection intents
const EnglishStoriesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'EnglishStoriesIntent';
    },
    handle(handlerInput) {
        const speakOutput = "Great! For English stories, I can tell you about a brave fox, a wise owl, a persistent turtle, a kind elephant, a resourceful giraffe, a hardworking beaver, or a teamwork-loving eagle. Which one would you like to hear?";

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HindiStoriesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HindiStoriesIntent';
    },
    handle(handlerInput) {
        const speakOutput = "Great! For Hindi stories, I have animal stories about a rabbit, lion, monkey, or peacock. I also have stories about a butterfly, a sunflower, and a mountain climber. For classic Indian tales, try Akbar-Birbal, Tenali Raman, Panchtantra, or Vikram-Betaal. To make sure this skill responds and not others, say \"world of stories\" before your Hindi request, like \"world of stories mor ki kahani\" or \"world of stories akbar birbal ki kahani\". Which would you like to hear?";

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// Add a new intent to repeat the last story
const RepeatStoryIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'RepeatStoryIntent' ||
                Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.RepeatIntent');
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const lastStory = sessionAttributes.lastStory;
        
        console.log('Repeat handler called, last story is:', lastStory);
        
        if (lastStory && storyContent[lastStory]) {
            return handlerInput.responseBuilder
                .speak(`Let me repeat that story for you. ${storyContent[lastStory]}`)
                .getResponse();
        } else {
            return handlerInput.responseBuilder
                .speak("I'm sorry, I don't have any story to repeat yet. Would you like to hear a story about a fox, owl, turtle, or elephant? Or would you prefer a Hindi story?")
                .reprompt("Which story would you like to hear?")
                .getResponse();
        }
    }
};

// Add handlers for classic Hindi stories

const BirbalStoryIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'BirbalStoryIntent';
    },
    handle(handlerInput) {
        setLastStory(handlerInput, 'birbalStoryHindi');
        return handlerInput.responseBuilder
            .speak(storyContent.birbalStoryHindi)
            .getResponse();
    }
};

const TenaliStoryIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TenaliStoryIntent';
    },
    handle(handlerInput) {
        setLastStory(handlerInput, 'tenaliStoryHindi');
        return handlerInput.responseBuilder
            .speak(storyContent.tenaliStoryHindi)
            .getResponse();
    }
};

const PanchtantraStoryIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && 
               request.intent.name === 'PanchtantraStoryIntent';
    },
    handle(handlerInput) {
        // Verify we're in the skill session
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        // Set the last story for the repeat feature
        setLastStory(handlerInput, 'panchtantraStoryHindi');
        
        const speakOutput = storyContent.panchtantraStoryHindi;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const VikramStoryIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'VikramStoryIntent';
    },
    handle(handlerInput) {
        // Explicitly set the session attribute
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.lastStory = 'vikramBetaalStoryHindi';
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        console.log('Vikram story told, setting lastStory to:', sessionAttributes.lastStory);
        
        return handlerInput.responseBuilder
            .speak(storyContent.vikramBetaalStoryHindi)
            .getResponse();
    }
};

// Add handlers for the new English stories
const GiraffeStoryIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GiraffeStoryIntent';
    },
    handle(handlerInput) {
        setLastStory(handlerInput, 'giraffeStory');
        return handlerInput.responseBuilder
            .speak(storyContent.giraffeStory)
            .getResponse();
    }
};

const BeaverStoryIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'BeaverStoryIntent';
    },
    handle(handlerInput) {
        setLastStory(handlerInput, 'beaverStory');
        return handlerInput.responseBuilder
            .speak(storyContent.beaverStory)
            .getResponse();
    }
};

const EagleStoryIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'EagleStoryIntent';
    },
    handle(handlerInput) {
        setLastStory(handlerInput, 'eagleStory');
        return handlerInput.responseBuilder
            .speak(storyContent.eagleStory)
            .getResponse();
    }
};

// Add handlers for new Hindi stories
const ButterflyStoryHindiIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ButterflyStoryHindiIntent';
    },
    handle(handlerInput) {
        setLastStory(handlerInput, 'butterflyStoryHindi');
        return handlerInput.responseBuilder
            .speak(storyContent.butterflyStoryHindi)
            .getResponse();
    }
};

const SunflowerStoryHindiIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SunflowerStoryHindiIntent';
    },
    handle(handlerInput) {
        setLastStory(handlerInput, 'sunflowerStoryHindi');
        return handlerInput.responseBuilder
            .speak(storyContent.sunflowerStoryHindi)
            .getResponse();
    }
};

const MountainStoryHindiIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MountainStoryHindiIntent';
    },
    handle(handlerInput) {
        setLastStory(handlerInput, 'mountainStoryHindi');
        return handlerInput.responseBuilder
            .speak(storyContent.mountainStoryHindi)
            .getResponse();
    }
};

// Add a handler for developer information
const DeveloperInfoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DeveloperInfoIntent';
    },
    handle(handlerInput) {
        const speakOutput = "This World of Stories skill was created by Anupam Jain. He developed this skill to share engaging stories with important life lessons in both English and Hindi. Would you like to hear one of these stories now?";
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt("Would you like to hear an English story or a Hindi story?")
            .getResponse();
    }
};

// Add a response interceptor to save session state
const SessionAttributesResponseInterceptor = {
    process(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        // Log the session attributes at the end of the request
        console.log('Session attributes at end:', JSON.stringify(sessionAttributes));
        
        // Save the session attributes to ensure they persist
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        return;
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        EnglishStoriesIntentHandler,
        HindiStoriesIntentHandler,
        
        // Original English stories
        FoxStoryIntentHandler,
        OwlStoryIntentHandler,
        TurtleStoryIntentHandler,
        ElephantStoryIntentHandler,
        
        // New English stories
        GiraffeStoryIntentHandler,
        BeaverStoryIntentHandler,
        EagleStoryIntentHandler,
        
        // Original Hindi stories
        RabbitStoryHindiIntentHandler,
        LionStoryHindiIntentHandler,
        MonkeyStoryHindiIntentHandler,
        PeacockStoryHindiIntentHandler,
        
        // New Hindi stories
        ButterflyStoryHindiIntentHandler,
        SunflowerStoryHindiIntentHandler,
        MountainStoryHindiIntentHandler,
        
        // Original classic Hindi tales
        BirbalStoryIntentHandler,
        TenaliStoryIntentHandler,
        PanchtantraStoryIntentHandler,
        VikramStoryIntentHandler,
        
        DeveloperInfoIntentHandler,
        RepeatStoryIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        SessionAttributesRequestInterceptor)
    .addResponseInterceptors(
        SessionAttributesResponseInterceptor)
    .withCustomUserAgent('sample/story-teller/v1.0')
    .lambda();