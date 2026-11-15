# Split Decision: Dutch translation for review

English on the left, Dutch on the right. The game reads its Dutch from `src/client/nl.ts`, which was made from this file. Change a translation there, or here and in that file both.

## Choices I made (please confirm or change)

| Topic | English | Dutch choice |
|---|---|---|
| Address | (you) | **je/jij**, informal throughout. Use **u** instead if you prefer. |
| Bowling alley | the alley | **het bowlingcentrum** (short: **het centrum**) |
| Pins (objects and score unit) | pins | **kegels** |
| Lane | lane | **baan** |
| Gutter | gutter | **goot** |
| Frame, strike, spare, bumpers | frame, strike, spare, bumpers | kept as **frame, strike, spare, bumpers** (common in Dutch bowling) |
| Foul line | foul line | **foutlijn** |
| The Split (rule contradiction) | Split / SPLIT! | kept as **Split** (game term, also capitalised) |
| House Rules | House Rules | **Huisregels** |
| House Record | House Record | **Huisrecord** |
| Fat Man | the Fat Man | **de Dikke Man** (literal; "dikke" may read as rude, alternative: **de Grote Man**) |
| Five geese | the five geese | **de vijf ganzen** |
| Character names | Walter, Kees, Lotte, Marga, Timo, Ruud | unchanged |
| Walter's species | heron | **reiger** |

---

# 1. Dilemmas (cards)

Each card shows: title, situation text, the "about" text shown at the end, then each option with its label, what it does to your frame (effect), the line shown after the frame (after), and the line in "What became of everyone" (epilogue). "Split reasons" are the reasons offered when a Split is called on that card.

Shared sentences used inside several cards:

| Name | English | Nederlands |
|---|---|---|
| GEESE | five geese who sit at the end of lane 3 and untangle the pins | vijf ganzen die aan het eind van baan 3 de kegels ontwarren |
| FIVE_FLAT_TEXT | You then bowl with five pins already knocked flat, so only five are left to score. | Je gooit daarna terwijl vijf kegels al plat liggen, dus er blijven er maar vijf over om te scoren. |
| FAT_MAN_TEXT | You then bowl with the Fat Man lying across the lane. If your ball hits him, nine pins fall at once. | Je gooit daarna terwijl de Dikke Man op de baan ligt. Als je bal hem raakt, vallen er negen kegels tegelijk. |
| SOCKS | You then bowl in oily socks: your ball drifts left and right. | Je gooit daarna op vette olie-sokken: je bal drijft naar links en naar rechts. |
| MINUS3 | Each of you loses three pins from this frame. | Jullie verliezen allemaal drie kegels van dit frame. |

## 1.1 The trolley problem (chain 1)

### switch: The Switch → De Wissel

| | English | Nederlands |
|---|---|---|
| Title | The Switch | De Wissel |
| Text | A heavy bowling ball has broken loose and is rolling down lane 3 towards five geese who sit at the end of it and untangle the pins. It will hit all five of them. You are standing next to a lever. If you pull it, the ball switches to lane 4, where it will hit one person instead: Kees, the cleaner, who is mopping lane 4. | Een zware bowlingbal is losgebroken en rolt over baan 3 naar vijf ganzen die aan het einde van de baan de kegels ontwarren. De bal raakt ze alle vijf. Je staat naast een hendel. Als je eraan trekt, gaat de bal naar baan 4, waar hij in plaats daarvan één persoon raakt: Kees, de schoonmaker, die op baan 4 aan het dweilen is. |
| About | The trolley problem: is it right to turn a danger onto one person in order to save five? | Het trolleyprobleem: is het goed om een gevaar naar één persoon af te leiden om er vijf te redden? |
| A, label | Pull the lever | Trek aan de hendel |
| A, effect | You then bowl on lane 4: all ten pins are standing, but Kees's mop bucket is still in the middle of the lane. | Je gooit daarna op baan 4: alle tien de kegels staan, maar Kees' dweilemmer staat nog midden op de baan. |
| A, after | Kees saw the ball coming and jumped aside just in time. The ball hit his mop bucket instead and dented it. | Kees zag de bal aankomen en sprong net op tijd opzij. De bal deukte in plaats daarvan zijn dweilemmer. |
| A, epilogue | Kees now mops facing the oncoming balls. He still uses the dented bucket. | Kees dweilt nu met zijn gezicht naar de aanrollende ballen. Hij gebruikt nog steeds de deukige emmer. |
| B, label | Leave the lever alone | Laat de hendel met rust |
| B, effect | You then bowl on lane 3: the ball has already knocked five pins flat, so only five are left to score. | Je gooit daarna op baan 3: de bal heeft al vijf kegels plat gelegd, dus er blijven er maar vijf over om te scoren. |
| B, after | The ball hit the five geese. They are bruised and upset, but all five are alive. Half the pins went down with them. | De bal raakte de vijf ganzen. Ze hebben blauwe plekken en zijn van streek, maar alle vijf leven. De helft van de kegels ging met hen mee. |
| B, epilogue | The five geese still sit at the end of lane 3. They now flinch whenever a ball comes towards them. | De vijf ganzen zitten nog steeds aan het eind van baan 3. Ze schrikken nu telkens als er een bal op hen afkomt. |

### fatman: The Fat Man → De Dikke Man

| | English | Nederlands |
|---|---|---|
| Title | The Fat Man | De Dikke Man |
| Text | A heavy bowling ball has broken loose and is rolling down lane 3 towards five geese who sit at the end of lane 3 and untangle the pins. It will hit all five of them. There is no lever here. The Fat Man, a large regular, is standing right beside the lane eating nachos. If you push him onto the lane, his body will stop the ball. The geese will be saved, and he will take the hit. | Een zware bowlingbal is losgebroken en rolt over baan 3 naar vijf ganzen die aan het eind van baan de kegels ontwarren. Hij raakt ze alle vijf. Er is hier geen hendel. De Dikke Man, een grote stamgast, staat vlak naast de baan nacho's te eten. Als je hem op de baan duwt, houdt zijn lichaam de bal tegen. De ganzen zijn gered en hij vangt de klap op. |
| About | The footbridge version of the trolley problem. The numbers are the same as with the lever, one against five, yet most people who would pull the lever refuse to push. | De loopbrugversie van het trolleyprobleem. De aantallen zijn hetzelfde als bij de hendel, één tegen vijf, maar de meeste mensen die aan de hendel zouden trekken, weigeren te duwen. |
| "Until" phrase (used in the House Record title) | when they would have to push someone | als ze iemand zouden moeten duwen |
| Split reason 1 | Pushing someone with my own hands is different from pulling a lever | Iemand met mijn eigen handen duwen is iets anders dan aan een hendel trekken |
| Split reason 2 | With the lever, Kees the cleaner would have been hit as a side effect. Here the Fat Man would be used as a tool to stop the ball | Bij de hendel zou Kees de schoonmaker als neveneffect geraakt zijn. Hier zou de Dikke Man als middel worden gebruikt om de bal te stoppen |
| Split reason 3 | Kees the cleaner works here, and some risk comes with his job. The Fat Man is a customer | Kees de schoonmaker werkt hier, en zijn werk brengt enig risico met zich mee. De Dikke Man is een klant |
| A, label | Push him onto the lane | Duw hem op de baan |
| A, effect | (FAT_MAN_TEXT) | (zie FAT_MAN_TEXT) |
| A, after | The Fat Man fell onto the lane and the ball hit him in the side. It stopped. He is bruised, and he is angry with you. He did not drop his nachos. | De Dikke Man viel op de baan en de bal raakte hem in zijn zij. De bal stopte. Hij heeft blauwe plekken en is boos op je. Hij liet zijn nacho's niet vallen. |
| A, epilogue | The Fat Man recovered. He no longer stands close to the lanes. | De Dikke Man is hersteld. Hij staat niet meer vlak bij de banen. |
| B, label | Do not push him | Duw hem niet |
| B, effect | (FIVE_FLAT_TEXT) | (zie FIVE_FLAT_TEXT) |
| B, after | The ball hit the five geese. They are hurt but alive. The Fat Man did not notice any of it and offers you a nacho. | De bal raakte de vijf ganzen. Ze zijn gewond maar leven. De Dikke Man heeft er niets van gemerkt en biedt je een nacho aan. |
| B, epilogue | The Fat Man never found out that you thought about pushing him. | De Dikke Man is nooit te weten gekomen dat je overwoog hem te duwen. |

### trapdoor: The Trapdoor → Het Valluik

| | English | Nederlands |
|---|---|---|
| Title | The Trapdoor | Het Valluik |
| Text | A heavy bowling ball has broken loose and is rolling down lane 3 towards five geese who sit at the end of lane 3 and untangle the pins. It will hit all five of them. The Fat Man, a large regular, is standing on a trapdoor just above the lane. If you pull a lever, the trapdoor opens, he drops onto the lane and his body stops the ball. You would not touch him. | Een zware bowlingbal is losgebroken en rolt over baan 3 naar vijf ganzen die aan het eind van de baan de kegels ontwarren. De bal raakt ze alle vijf. De Dikke Man, een grote stamgast, staat op een valluik vlak boven de baan. Als je aan een hendel trekt, gaat het valluik open, valt hij op de baan en houdt zijn lichaam de bal tegen. Je zou hem niet aanraken. |
| About | A check on whether touching him was really what mattered. With a lever instead of a push, the Fat Man is still used to stop the ball. | Een controle of het aanraken echt de doorslag gaf. Met een hendel in plaats van een duw wordt de Dikke Man nog steeds gebruikt om de bal te stoppen. |
| A, label | Pull the lever | Trek aan de hendel |
| A, effect | (FAT_MAN_TEXT) | (zie FAT_MAN_TEXT) |
| A, after | The trapdoor opened and the Fat Man dropped onto the lane. The ball hit him and stopped. He landed on his nachos and is upset about that. | Het valluik ging open en de Dikke Man viel op de baan. De bal raakte hem en stopte. Hij landde op zijn nacho's en is daarover van streek. |
| A, epilogue | The trapdoor has been nailed shut. The Fat Man checks the nails every time he comes in. | Het valluik is dichtgespijkerd. De Dikke Man controleert de spijkers elke keer dat hij binnenkomt. |
| B, label | Leave the trapdoor shut | Laat het valluik dicht |
| B, effect | (FIVE_FLAT_TEXT) | (zie FIVE_FLAT_TEXT) |
| B, after | The ball hit the five geese. They are hurt but alive. The Fat Man stays where he is, standing on the trapdoor without knowing it. | De bal raakte de vijf ganzen. Ze zijn gewond maar leven. De Dikke Man blijft waar hij is, op het valluik, zonder het te weten. |
| B, epilogue | Nobody at the alley knows why the trapdoor was built. It is still there. | Niemand in het bowlingcentrum weet waarom het valluik is gebouwd. Het zit er nog steeds. |

### loop: The Loop → De Lus

| | English | Nederlands |
|---|---|---|
| Title | The Loop | De Lus |
| Text | A heavy bowling ball has broken loose and is rolling down lane 3 towards five geese who sit at the end of lane 3 and untangle the pins. It will hit all five of them. You are standing next to a lever. If you pull it, the ball switches to lane 4. But lane 4 curves round and leads back to the geese. The ball will only stop because Kees, the cleaner, is mopping lane 4 and it will hit him on the way. | Een zware bowlingbal is losgebroken en rolt over baan 3 naar vijf ganzen die aan het eind van de baan de kegels ontwarren. De bal raakt ze alle vijf. Je staat naast een hendel. Als je eraan trekt, gaat de bal naar baan 4. Maar baan 4 maakt een bocht en leidt terug naar de ganzen. De bal stopt alleen doordat Kees, de schoonmaker, op baan 4 aan het dweilen is en de bal hem onderweg raakt. |
| About | The loop version. A check on whether using someone as a stopper was really what mattered, because this time the lever does exactly that to the cleaner. | De lusversie. Een controle of het gebruiken van iemand als stopper echt de doorslag gaf, want deze keer doet de hendel precies dat met de schoonmaker. |
| A, label | Pull the lever | Trek aan de hendel |
| A, effect | You then bowl on the curved lane: the ball drifts sideways, and Kees's mop bucket is standing on it. | Je gooit daarna op de bochtige baan: de bal drijft opzij, en Kees' dweilemmer staat erop. |
| A, after | The ball went round the curve and hit Kees and his mop bucket. It stopped there. Kees is sore, and he has asked for a new bucket. | De bal ging door de bocht en raakte Kees en zijn dweilemmer. Daar stopte hij. Kees heeft pijn en heeft om een nieuwe emmer gevraagd. |
| A, epilogue | Lane 4 has been straightened. Kees did the work himself, after closing time. | Baan 4 is rechtgetrokken. Kees deed het werk zelf, na sluitingstijd. |
| B, label | Leave the lever alone | Laat de hendel met rust |
| B, effect | (FIVE_FLAT_TEXT) | (zie FIVE_FLAT_TEXT) |
| B, after | The ball hit the five geese. They are hurt but alive. Kees kept mopping lane 4 and never looked up. | De bal raakte de vijf ganzen. Ze zijn gewond maar leven. Kees bleef baan 4 dweilen en keek niet op. |
| B, epilogue | Kees never knew how close the ball came to him. | Kees heeft nooit geweten hoe dicht de bal bij hem kwam. |

### shirt: The Staff Shirt → Het Personeelsshirt

| | English | Nederlands |
|---|---|---|
| Title | The Staff Shirt | Het Personeelsshirt |
| Text | A heavy bowling ball has broken loose and is rolling down lane 3 towards five geese who sit at the end of lane 3 and untangle the pins. It will hit all five of them. The Fat Man, a large man who started working at the alley today, is standing beside the lane in his new staff shirt. If you push him onto the lane, his body will stop the ball. | Een zware bowlingbal is losgebroken en rolt over baan 3 naar vijf ganzen die aan het eind van de baan de kegels ontwarren. De bal raakt ze alle vijf. De Dikke Man, een grote man die vandaag in het bowlingcentrum is begonnen met werken, staat naast de baan in zijn nieuwe personeelsshirt. Als je hem op de baan duwt, houdt zijn lichaam de bal tegen. |
| About | A check on whether working here was really what mattered. If it was, the staff shirt should have made pushing him acceptable. | Een controle of het werken hier echt de doorslag gaf. Zo ja, dan had het personeelsshirt het duwen aanvaardbaar moeten maken. |
| A, label | Push him onto the lane | Duw hem op de baan |
| A, effect | (FAT_MAN_TEXT) | (zie FAT_MAN_TEXT) |
| A, after | The Fat Man fell onto the lane and stopped the ball. Once he could stand again, he asked whether this counts as overtime. | De Dikke Man viel op de baan en hield de bal tegen. Toen hij weer kon staan, vroeg hij of dit als overwerk telt. |
| A, epilogue | The Fat Man still works at the alley. He has asked to be moved to the shoe counter. | De Dikke Man werkt nog steeds in het bowlingcentrum. Hij heeft gevraagd of hij naar de schoenenbalie mag. |
| B, label | Do not push him | Duw hem niet |
| B, effect | (FIVE_FLAT_TEXT) | (zie FIVE_FLAT_TEXT) |
| B, after | The ball hit the five geese. They are hurt but alive. The Fat Man spends the rest of his first shift cleaning up after them. | De bal raakte de vijf ganzen. Ze zijn gewond maar leven. De Dikke Man brengt de rest van zijn eerste dienst door met hun rommel opruimen. |
| B, epilogue | The Fat Man still works at the alley and still wears the staff shirt. | De Dikke Man werkt nog steeds in het bowlingcentrum en draagt nog steeds het personeelsshirt. |


## 1.2 The drowning child (chain 2)

### nacho: The Nacho → De Nacho

| | English | Nederlands |
|---|---|---|
| Title | The Nacho | De Nacho |
| Text | Lotte, a girl having her eighth birthday party at lane 4, is choking on a nacho. You are the closest person to her. To reach her, you have to run across the freshly oiled lanes in your socks. | Lotte, een meisje dat op baan 4 haar achtste verjaardagsfeestje viert, stikt in een nacho. Jij staat het dichtst bij haar. Om bij haar te komen, moet je op je sokken over de net geoliede banen rennen. |
| About | The drowning child, a thought experiment by Peter Singer: if you can prevent something terrible at a small cost to yourself, must you? | Het verdrinkende kind, een gedachte-experiment van Peter Singer: als je iets vreselijks kunt voorkomen tegen een kleine prijs voor jezelf, moet je dat dan doen? |
| A, label | Run over and help her | Ren naar haar toe en help haar |
| A, effect | (SOCKS) | (zie SOCKS) |
| A, after | You ran across in your socks and slapped her on the back, and the nacho came out. She wants to keep it. | Je rende op je sokken naar haar toe en gaf haar een klap op haar rug, en de nacho kwam eruit. Ze wil hem houden. |
| A, epilogue | Lotte took the nacho home in a plastic bag. | Lotte nam de nacho mee naar huis in een plastic zakje. |
| B, label | Bowl on | Gooi door |
| B, effect | You then bowl a normal frame. | Je gooit daarna een gewoon frame. |
| B, after | Someone else reached her in time. The party went quiet, and the guests kept looking over at your lane. | Iemand anders was op tijd bij haar. Het feest werd stil en de gasten bleven naar jouw baan kijken. |
| B, epilogue | Lotte did not invite you to her next birthday party. | Lotte heeft je niet uitgenodigd voor haar volgende verjaardagsfeestje. |

### jar: The Jar → De Pot

| | English | Nederlands |
|---|---|---|
| Title | The Jar | De Pot |
| Text | A collection jar stands on the counter. The sign on it says that a child at a bowling alley in another town is choking on a nacho. If each of you puts three pins from this frame in the jar, the pins pay for someone there to help her in time. Nobody at that alley will ever know your names. | Op de balie staat een collectepot. Op het bordje staat dat een kind in een bowlingcentrum in een andere stad in een nacho stikt. Als jullie allemaal drie kegels van dit frame in de pot doen, betalen die kegels iemand daar om haar op tijd te helpen. Niemand in dat centrum zal ooit jullie namen weten. |
| About | The second half of the drowning child: if you would help a child in front of you, why not one far away, when the cost is the same? | De tweede helft van het verdrinkende kind: als je een kind voor je neus zou helpen, waarom dan niet een kind ver weg, als de kosten hetzelfde zijn? |
| "Until" phrase | when the person in trouble is far away | als de persoon in nood ver weg is |
| Split reason 1 | Lotte, the girl at lane 4, was right in front of us. This child is far away | Lotte, het meisje op baan 4, stond vlak voor ons. Dit kind is ver weg |
| Split reason 2 | We were the only ones who could help Lotte at lane 4. Anyone can fill this jar | Wij waren de enigen die Lotte op baan 4 konden helpen. Iedereen kan deze pot vullen |
| Split reason 3 | We cannot check where the pins in the jar end up | Wij kunnen niet controleren waar de kegels in de pot terechtkomen |
| A, label | Put three pins each in the jar | Doe allemaal drie kegels in de pot |
| A, effect | (MINUS3) | (zie MINUS3) |
| A, after | You each put three pins in the jar. Nobody thanks you, because nobody at the other alley knows who you are. | Jullie doen allemaal drie kegels in de pot. Niemand bedankt jullie, want niemand in het andere centrum weet wie jullie zijn. |
| A, epilogue | The child in the other town recovered. She now bowls every Sunday and has never heard of you. | Het kind in de andere stad is hersteld. Ze bowlt nu elke zondag en heeft nog nooit van jullie gehoord. |
| B, label | Keep your pins | Houd je kegels |
| B, effect | You then bowl a normal frame. | Je gooit daarna een gewoon frame. |
| B, after | You keep your pins. The jar stays on the counter, and people keep glancing at it. | Je houdt je kegels. De pot blijft op de balie staan en mensen blijven ernaar kijken. |
| B, epilogue | The jar is still on the counter. Someone has put a button in it. | De pot staat nog steeds op de balie. Iemand heeft er een knoop in gedaan. |

### screen: The Screen → Het Scherm

| | English | Nederlands |
|---|---|---|
| Title | The Screen | Het Scherm |
| Text | A collection jar stands on the counter. Above it, a screen shows a live picture of a bowling alley in another town, where a girl is choking on a nacho. She can see you on a screen there too, and she waves to you for help. If each of you puts three pins from this frame in the jar, the pins pay for someone there to help her in time. | Op de balie staat een collectepot. Erboven toont een scherm een live beeld van een bowlingcentrum in een andere stad, waar een meisje in een nacho stikt. Ze ziet jou daar ook op een scherm en zwaait naar je om hulp. Als jullie allemaal drie kegels van dit frame in de pot doen, betalen die kegels iemand daar om haar op tijd te helpen. |
| About | A check on whether being in front of you was really what mattered. On the screen the far-away child is in front of you too. | Een controle of het voor je neus staan echt de doorslag gaf. Op het scherm staat het kind dat ver weg is ook voor je neus. |
| A, label | Put three pins each in the jar | Doe allemaal drie kegels in de pot |
| A, effect | (MINUS3) | (zie MINUS3) |
| A, after | Someone at the other alley helped her. She waves at you again, and this time she can breathe. | Iemand in het andere centrum hielp haar. Ze zwaait weer naar je, en deze keer kan ze ademen. |
| A, epilogue | The screen above the jar was never taken down. These days it mostly shows the other alley's car park. | Het scherm boven de pot is nooit weggehaald. Tegenwoordig toont het meestal het parkeerterrein van het andere centrum. |
| B, label | Keep your pins | Houd je kegels |
| B, effect | You then bowl a normal frame. | Je gooit daarna een gewoon frame. |
| B, after | She keeps waving for a while. Then someone at your alley switches the screen off. | Ze blijft nog even zwaaien. Dan zet iemand in jullie centrum het scherm uit. |
| B, epilogue | The screen above the jar has stayed switched off. | Het scherm boven de pot staat uit. |

### crowd: The Crowd → De Menigte

| | English | Nederlands |
|---|---|---|
| Title | The Crowd | De Menigte |
| Text | Lotte, a girl having her eighth birthday party at lane 4, is choking on a nacho. Forty people are standing around her, and none of them does anything. You could run across the freshly oiled lanes in your socks to help her. | Lotte, een meisje dat op baan 4 haar achtste verjaardagsfeestje viert, stikt in een nacho. Veertig mensen staan om haar heen en niemand doet iets. Je zou op je sokken over de net geoliede banen kunnen rennen om haar te helpen. |
| About | A check on whether being the only one who could help was really what mattered. Here forty others could help, and none of them does. | Een controle of de enige zijn die kon helpen echt de doorslag gaf. Hier kunnen veertig anderen helpen, en niemand doet het. |
| A, label | Run over and help her | Ren naar haar toe en help haar |
| A, effect | (SOCKS) | (zie SOCKS) |
| A, after | You ran over and slapped her on the back, and the nacho came out. The forty people who had stood and watched now clap for you. | Je rende naar haar toe en gaf haar een klap op haar rug, en de nacho kwam eruit. De veertig mensen die hadden staan kijken klappen nu voor je. |
| A, epilogue | None of the forty people who watched has learned first aid since. | Geen van de veertig mensen die toekeken heeft sindsdien eerste hulp geleerd. |
| B, label | Bowl on | Gooi door |
| B, effect | You then bowl a normal frame. | Je gooit daarna een gewoon frame. |
| B, after | Forty-one people watched. In the end Kees, the cleaner, pushed through the crowd and got the nacho out. | Eenenveertig mensen keken toe. Uiteindelijk drong Kees, de schoonmaker, door de menigte heen en haalde de nacho eruit. |
| B, epilogue | Kees now does first aid at the alley as well as the cleaning. He is not paid extra for it. | Kees doet in het bowlingcentrum nu naast het schoonmaken ook eerste hulp. Hij krijgt daar niet extra voor betaald. |

### vouch: The Voucher → De Garantie

| | English | Nederlands |
|---|---|---|
| Title | The Voucher | De Garantie |
| Text | A collection jar stands on the counter. A child at a bowling alley in another town is choking on a nacho. If each of you puts three pins from this frame in the jar, the pins pay for someone there to help her in time. Marga, who works at the shoe counter, has checked the jar herself: it is real, and every pin reaches the child. | Op de balie staat een collectepot. Een kind in een bowlingcentrum in een andere stad stikt in een nacho. Als jullie allemaal drie kegels van dit frame in de pot doen, betalen die kegels iemand daar om haar op tijd te helpen. Marga, die bij de schoenenbalie werkt, heeft de pot zelf gecontroleerd: hij is echt en elke kegel komt bij het kind terecht. |
| About | A check on whether not being able to verify the jar was really what mattered. Now it has been verified. | Een controle of het niet kunnen nagaan van de pot echt de doorslag gaf. Nu is het nagegaan. |
| A, label | Put three pins each in the jar | Doe allemaal drie kegels in de pot |
| A, effect | (MINUS3) | (zie MINUS3) |
| A, after | Marga nods and writes the pins down in her ledger. | Marga knikt en schrijft de kegels op in haar grootboek. |
| A, epilogue | Marga keeps the accounts for the jar. They always add up. | Marga houdt de boekhouding van de pot bij. Die klopt altijd. |
| B, label | Keep your pins | Houd je kegels |
| B, effect | You then bowl a normal frame. | Je gooit daarna een gewoon frame. |
| B, after | Marga writes something in her notebook and does not say what. | Marga schrijft iets op in haar notitieboekje en zegt niet wat. |
| B, epilogue | Marga still has the note she wrote that night. She has not shown it to anyone. | Marga heeft de aantekening van die avond nog. Ze heeft hem aan niemand laten zien. |

## 1.3 Fair shares (chain 3)

### veil: The Veil → De Sluier

| | English | Nederlands |
|---|---|---|
| Title | The Veil | De Sluier |
| Text | The lanes are about to be handed out at random. One lane is crooked, one is perfect, and the rest are normal. Nobody knows yet who will get which lane. Before the draw, you must decide on a rule for whoever gets the crooked lane. | De banen worden zo meteen willekeurig verdeeld. Eén baan is scheef, één is perfect en de rest is gewoon. Niemand weet nog wie welke baan krijgt. Voor de loting moet je een regel bepalen voor wie de scheve baan krijgt. |
| About | The veil of ignorance, from John Rawls: which rules would you choose if you did not yet know your own place? | De sluier van onwetendheid, van John Rawls: welke regels zou je kiezen als je je eigen plaats nog niet kende? |
| A, label | Whoever draws the crooked lane gets bumpers | Wie de scheve baan trekt, krijgt bumpers |
| A, effect | You then draw a lane. If it is the crooked one, bumpers come with it. | Je trekt daarna een baan. Als het de scheve is, krijg je er bumpers bij. |
| A, after | Marga, who works at the shoe counter, draws the lane numbers out of a cap. | Marga, die bij de schoenenbalie werkt, trekt de banen uit een pet. |
| A, epilogue | The crooked lane comes with bumpers now, and people have started asking for it. | De scheve baan heeft nu bumpers, en mensen zijn ernaar gaan vragen. |
| B, label | Luck is luck | Geluk is geluk |
| B, effect | You then draw a lane and bowl it as it is. | Je trekt daarna een baan en gooit hem zoals hij is. |
| B, after | Marga, who works at the shoe counter, draws the lane numbers out of a cap. | Marga, die bij de schoenenbalie werkt, trekt de banen uit een pet. |
| B, epilogue | The crooked lane is still crooked. Nobody has fixed it. | De scheve baan is nog steeds scheef. Niemand heeft hem gerepareerd. |

### tray: The Tray → Het Dienblad

| | English | Nederlands |
|---|---|---|
| Title | The Tray | Het Dienblad |
| Text | The scores so far are on the board, so everyone can see who is ahead and who is behind. Four trays of nachos arrive. Whoever gets a tray bowls with bumpers this frame. (If you play alone, you count as ahead or behind compared with your own best game.) | De scores tot nu toe staan op het bord, dus iedereen kan zien wie voorstaat en wie achterstaat. Er komen vier dienbladen nacho's aan. Wie een dienblad krijgt, gooit dit frame met bumpers. (Als je alleen speelt, tel je als voor of achter vergeleken met je eigen beste spel.) |
| About | The same question as the veil, but now you know your position. Many people who compensate bad luck when they could be anyone reward the leaders once they are one. | Dezelfde vraag als bij de sluier, maar nu ken je je positie. Veel mensen die pech compenseren als ze iedereen kunnen zijn, belonen de koplopers zodra ze er zelf een zijn. |
| "Until" phrase | when they are ahead themselves | als ze zelf voorstaan |
| Split reason 1 | Which lane you draw is luck. A score is skill | Welke baan je trekt is geluk. Een score is vaardigheid |
| Split reason 2 | Everyone had the same chances tonight | Iedereen had vanavond dezelfde kansen |
| Split reason 3 | We are winning | Wij staan voor |
| A, label | Trays go to whoever is behind | De dienbladen gaan naar wie achterstaat |
| A, effect | If you are behind, you bowl with bumpers this frame. | Als je achterstaat, gooi je dit frame met bumpers. |
| A, after | The trays go to the players who are behind. The nachos have gone cold, but the bumpers work. | De dienbladen gaan naar de spelers die achterstaan. De nacho's zijn koud geworden, maar de bumpers werken. |
| A, epilogue | Players who are behind now get nachos. Some people have started bowling badly on purpose. | Spelers die achterstaan krijgen nu nacho's. Sommige mensen zijn met opzet slecht gaan gooien. |
| B, label | Trays go to whoever is ahead, who earned them | De dienbladen gaan naar wie voorstaat, die ze verdiend heeft |
| B, effect | If you are ahead, you bowl with bumpers this frame. | Als je voorstaat, gooi je dit frame met bumpers. |
| B, after | The trays go to the players who are ahead. They eat the nachos while they bowl. | De dienbladen gaan naar de spelers die voorstaan. Ze eten de nacho's terwijl ze gooien. |
| B, epilogue | The leaders ate all the nachos and left the empty trays for Kees, the cleaner, to clear away. | De koplopers aten alle nacho's op en lieten de lege dienbladen voor Kees, de schoonmaker, om op te ruimen. |

### weighted: The Weighted Ball → De Verzwaarde Bal

| | English | Nederlands |
|---|---|---|
| Title | The Weighted Ball | De Verzwaarde Bal |
| Text | It turns out that the ball used by whoever is in the lead has been weighted all night. Nobody did it on purpose. So part of that lead came from luck, not from skill. (If you play alone, the lead is yours.) | Het blijkt dat de bal van degene die aan de leiding staat de hele avond verzwaard is geweest. Niemand deed het met opzet. Een deel van die voorsprong kwam dus door geluk, niet door vaardigheid. (Als je alleen speelt, is de voorsprong van jou.) |
| About | A check on the line between luck and merit. If the leader's skill was partly luck, the argument that scores are earned gets thinner. | Een controle van de grens tussen geluk en verdienste. Als de vaardigheid van de koploper deels geluk was, wordt het argument dat scores verdiend zijn zwakker. |
| A, label | The leader hands five pins to the bottom of the table | De koploper geeft vijf kegels aan de laagste van de ranglijst |
| A, effect | Five pins move from the leader to the last player. Alone, you hand five pins back to the house. Then a normal frame. | Vijf kegels gaan van de koploper naar de laatste speler. Alleen geef je vijf kegels terug aan het huis. Daarna een gewoon frame. |
| A, after | Five pins change hands. The weighted ball is taken off the rack and locked in a drawer. | Vijf kegels wisselen van eigenaar. De verzwaarde bal gaat van het rek en wordt in een la opgesloten. |
| A, epilogue | The weighted ball is kept behind the counter now. | De verzwaarde bal ligt nu achter de balie. |
| B, label | Scores stand | De scores blijven staan |
| B, effect | Nothing changes. Then a normal frame. | Er verandert niets. Daarna een gewoon frame. |
| B, after | The scores stay as they are. The weighted ball goes back on the rack, where anyone might pick it up. | De scores blijven zoals ze zijn. De verzwaarde bal gaat terug op het rek, waar iedereen hem kan pakken. |
| B, epilogue | The weighted ball is still on the rack. Regular players look for it when they come in. | De verzwaarde bal ligt nog op het rek. Stamgasten zoeken ernaar als ze binnenkomen. |

## 1.4 Moral luck (chain 4)

### blind: The Blind Throw → De Blinde Worp

| | English | Nederlands |
|---|---|---|
| Title | The Blind Throw | De Blinde Worp |
| Text | Two regular players each threw a ball blindfolded, for a bet. One ball rolled down an empty lane and hit nothing. The other ball flew into the birthday cake of Lotte, a girl having her party at lane 4. Both players did exactly the same thing. | Twee stamgasten gooiden elk een bal met een blinddoek om, voor een weddenschap. De ene bal rolde over een lege baan en raakte niets. De andere bal vloog in de verjaardagstaart van Lotte, een meisje dat op baan 4 haar feestje houdt. Beide spelers deden precies hetzelfde. |
| About | Moral luck: two people do the same reckless thing, and only one of them causes harm. Do they deserve the same? | Morele mazzel: twee mensen doen hetzelfde roekeloze ding, en slechts één van hen veroorzaakt schade. Verdienen ze hetzelfde? |
| A, label | Same penalty for both: they did the same thing | Dezelfde straf voor beiden: ze deden hetzelfde |
| A, effect | Both are sent off to clean up. You then bowl a normal, quiet frame. | Beiden worden erop uit gestuurd om op te ruimen. Je gooit daarna een gewoon, rustig frame. |
| A, after | Both players are sent to clean the cake off the floor and the ceiling. The one whose ball hit nothing keeps asking why he has to help. | Beide spelers moeten de taart van de vloer en het plafond schoonmaken. Degene wiens bal niets raakte, blijft vragen waarom hij moet helpen. |
| A, epilogue | The player whose ball hit nothing still thinks his punishment was unfair. | De speler wiens bal niets raakte vindt zijn straf nog steeds oneerlijk. |
| B, label | Only the cake thrower pays | Alleen wie de taart raakte betaalt |
| B, effect | The player whose ball hit nothing keeps bowling next to you, still blindfolded. His balls cross your lane. | De speler wiens bal niets raakte blijft naast je gooien, nog steeds geblinddoekt. Zijn ballen kruisen jouw baan. |
| B, after | The player whose ball hit nothing bowls on next to you, still blindfolded and in a good mood. He thinks he is good at this. | De speler wiens bal niets raakte gooit naast je door, nog steeds geblinddoekt en goedgemutst. Hij denkt dat hij hier goed in is. |
| B, epilogue | That player still bowls blindfolded. His balls have not hit a cake yet, so he sees no reason to stop. | Die speler gooit nog steeds geblinddoekt. Zijn ballen hebben nog geen taart geraakt, dus hij ziet geen reden om te stoppen. |

### sneeze: The Sneeze → De Nies

| | English | Nederlands |
|---|---|---|
| Title | The Sneeze | De Nies |
| Text | The Fat Man, a large regular, has a cold. Every time he sneezes, all ten pins fall over, whatever your ball is doing, even if it is in the gutter. Before you bowl, decide whether pins knocked over by his sneeze count. | De Dikke Man, een grote stamgast, is verkouden. Elke keer dat hij niest, vallen alle tien de kegels om, wat je bal ook doet, zelfs als hij in de goot ligt. Bepaal voordat je gooit of kegels die door zijn nies omvallen meetellen. |
| About | Moral luck again, from the pleasant side. If people should only answer for what they did, a strike you did not throw should not count either. | Weer morele mazzel, nu van de prettige kant. Als mensen alleen moeten opdraaien voor wat ze deden, hoort een strike die je niet gooide ook niet mee te tellen. |
| "Until" phrase | when luck works in their favour | als het geluk in hun voordeel werkt |
| Split reason 1 | Prizes and penalties are different things | Prijzen en straffen zijn verschillende dingen |
| Split reason 2 | Nobody was harmed by the sneeze | Niemand werd door de nies geschaad |
| Split reason 3 | A strike is a strike | Een strike is een strike |
| A, label | Sneezed pins count | Omgeniesde kegels tellen mee |
| A, effect | This frame counts as ten pins for everyone, whatever you throw. | Dit frame telt voor iedereen als tien kegels, wat je ook gooit. |
| A, after | He sneezes just as you throw, and all ten pins fall. He says sorry. | Hij niest precies als je gooit, en alle tien de kegels vallen. Hij zegt sorry. |
| A, epilogue | Bowlers now ask the Fat Man to stand near their lane when he has a cold. | Spelers vragen de Dikke Man nu om bij hun baan te komen staan als hij verkouden is. |
| B, label | Score only what the throw earned | Tel alleen wat de worp opleverde |
| B, effect | You then bowl a normal frame. Sneezed pins are stood back up. | Je gooit daarna een gewoon frame. Omgeniesde kegels worden weer rechtgezet. |
| B, after | He sneezes, all ten pins fall, and they are set back up one by one before you throw. | Hij niest, alle tien de kegels vallen, en ze worden een voor een weer rechtgezet voordat je gooit. |
| B, epilogue | Someone gave the Fat Man a handkerchief. He sneezes into it now, and the pins stay up. | Iemand gaf de Dikke Man een zakdoek. Hij niest er nu in, en de kegels blijven staan. |

### foul: The Foul Line → De Foutlijn (secret)

| | English | Nederlands |
|---|---|---|
| Title | The Foul Line | De Foutlijn |
| Text | This one is private. Your foot crossed the foul line on your best throw tonight. The sensor is broken and nobody saw it. Reporting it costs you five pins. | Deze is privé. Je voet kwam over de foutlijn bij je beste worp van vanavond. De sensor is kapot en niemand zag het. Het melden kost je vijf kegels. |
| About | Moral luck, turned on yourself: you got away with it only because the sensor happened to be broken. | Morele mazzel, op jezelf toegepast: je kwam er alleen mee weg doordat de sensor toevallig kapot was. |
| A, label | Report it | Meld het |
| A, effect | You lose five pins. Then a normal frame. | Je verliest vijf kegels. Daarna een gewoon frame. |
| A, epilogue | The sensor on the foul line has been repaired. | De sensor op de foutlijn is gerepareerd. |
| B, label | Say nothing | Zeg niets |
| B, effect | Nothing happens. Then a normal frame. | Er gebeurt niets. Daarna een gewoon frame. |

## 1.5 Identity (chain 5)

### lucky: The Lucky Ball → De Gelukbal

| | English | Nederlands |
|---|---|---|
| Title | The Lucky Ball | De Gelukbal |
| Text | The alley has a ball that everyone calls the lucky ball. Over the years its shell, its core and its finger holes have all been replaced. Kees, the cleaner, kept every old part and has now put them together into a second ball. The luck can only be in one of the two balls. You bowl with the one you pick. | Het bowlingcentrum heeft een bal die iedereen de gelukbal noemt. In de loop der jaren zijn de schil, de kern en de vingergaten allemaal vervangen. Kees, de schoonmaker, heeft alle oude onderdelen bewaard en er nu een tweede bal van in elkaar gezet. Het geluk kan maar in één van de twee ballen zitten. Je gooit met de bal die je kiest. |
| About | The ship of Theseus: if every part of a thing is replaced, is it still the same thing? And what about a second one built from the old parts? | Het schip van Theseus: als elk onderdeel van iets wordt vervangen, is het dan nog hetzelfde? En wat als er van de oude onderdelen een tweede wordt gebouwd? |
| A, label | The repaired ball is the lucky one | De gerepareerde bal is de gelukbal |
| A, effect | You bowl with it: smooth, and it steers itself a little towards the pins. | Je gooit ermee: glad, en hij stuurt zichzelf een beetje naar de kegels. |
| A, after | The repaired ball rolls the way it always has. The ball built from the old parts stays on the rack. | De gerepareerde bal rolt zoals altijd. De bal van de oude onderdelen blijft op het rek liggen. |
| A, epilogue | The ball built from the old parts was put on a shelf behind the counter. | De bal van de oude onderdelen is op een plank achter de balie gelegd. |
| B, label | The ball rebuilt from the old parts is the lucky one | De bal die uit de oude onderdelen is gebouwd is de gelukbal |
| B, effect | You bowl with it: cracked. It steers itself strongly towards the pins, but it wobbles. | Je gooit ermee: gebarsten. Hij stuurt zichzelf sterk naar de kegels, maar hij wiebelt. |
| B, after | The ball built from the old parts rattles down the lane and sheds old dust as it rolls. | De bal van de oude onderdelen ratelt over de baan en verliest oud stof terwijl hij rolt. |
| B, epilogue | The repaired ball was sold to a customer for four euros. | De gerepareerde bal is voor vier euro aan een klant verkocht. |

### champions: The Champions → De Kampioenen

| | English | Nederlands |
|---|---|---|
| Title | The Champions | De Kampioenen |
| Text | The 1987 champion team has a perfect lane reserved for it. Every member has been replaced since then. Tonight the five original members, now eighty years old, walk in and ask for their lane. Whichever team loses out comes to share your lane. | Het kampioensteam van 1987 heeft een perfecte baan gereserveerd. Elk lid is sindsdien vervangen. Vanavond lopen de vijf oorspronkelijke leden, nu tachtig jaar oud, binnen en vragen om hun baan. Het team dat de baan niet krijgt, komt jouw baan delen. |
| About | The ship of Theseus with people in it: is a team its unbroken history, or the people it started with? | Het schip van Theseus met mensen erin: is een team zijn ononderbroken geschiedenis, of de mensen waarmee het begon? |
| "Until" phrase | when the original members ask for it | als de oorspronkelijke leden erom vragen |
| Split reason 1 | People are different from balls | Mensen zijn anders dan ballen |
| Split reason 2 | A title is won once. Luck is worn in over time | Een titel win je één keer. Geluk wordt pas na lange tijd ingespeeld |
| Split reason 3 | The old ones tip better | De oude leden geven betere fooien |
| A, label | The lane goes to the current team | De baan gaat naar het huidige team |
| A, effect | The five eighty-year-olds share your lane. Their slow balls cross it. | De vijf tachtigjarigen delen jouw baan. Hun trage ballen kruisen hem. |
| A, after | The five original members bowl next to you, slowly, and they comment on every throw you make. | De vijf oorspronkelijke leden gooien langzaam naast je en geven commentaar op elke worp die je doet. |
| A, epilogue | The five original members now come every week. They keep giving you advice about your elbow. | De vijf oorspronkelijke leden komen nu elke week. Ze blijven je advies geven over je elleboog. |
| B, label | The lane goes to the five originals | De baan gaat naar de vijf oorspronkelijke leden |
| B, effect | The current team shares your lane. Their fast balls cross it. | Het huidige team deelt jouw baan. Hun snelle ballen kruisen hem. |
| B, after | The current team bowls next to you, fast and without speaking. | Het huidige team gooit snel en zwijgend naast je. |
| B, epilogue | The current team now plays on an ordinary lane. | Het huidige team speelt nu op een gewone baan. |

(Check: the source's third Split reason is "The old ones tip better", which I read as a tipping/fooi joke. If it was meant as something else, say so.)

### return: The Return → De Ballenretour

| | English | Nederlands |
|---|---|---|
| Title | The Return | De Ballenretour |
| Text | The ball return has been broken all night. Every ball that goes into it is destroyed, and the machine puts out a perfect copy instead. So your best throw tonight was made with a ball that no longer exists. Walter, who runs the alley, adds that the shoe scanner at the entrance has been doing the same thing to bowlers. | De ballenretour is de hele avond kapot geweest. Elke bal die erin gaat wordt vernietigd, en de machine geeft in plaats daarvan een perfecte kopie terug. Je beste worp van vanavond is dus gedaan met een bal die niet meer bestaat. Walter, die het bowlingcentrum runt, voegt eraan toe dat de schoenenscanner bij de ingang hetzelfde met spelers doet. |
| About | The teleporter: if you are destroyed and perfectly copied, is the copy you? Here it is asked of your ball first. | De teleporter: als je wordt vernietigd en perfect gekopieerd, ben jij de kopie? Hier wordt het eerst over je bal gevraagd. |
| A, label | Copies count | Kopieën tellen |
| A, effect | Scores stand. You then bowl a normal frame. | De scores blijven staan. Je gooit daarna een gewoon frame. |
| A, after | The scores stay as they are. Everyone looks down at their shoes, and then at each other. | De scores blijven zoals ze zijn. Iedereen kijkt naar zijn schoenen, en dan naar elkaar. |
| A, epilogue | Everyone went home as a copy. Nobody could tell the difference. | Iedereen ging als kopie naar huis. Niemand kon het verschil zien. |
| B, label | Copies do not count | Kopieën tellen niet |
| B, effect | This frame you bowl with the only original ball left: the 60-kilo one. It is slow, and it flattens whatever it hits. | Dit frame gooi je met de enige originele bal die over is: die van 60 kilo. Hij is traag en plet alles wat hij raakt. |
| B, after | You roll the 60-kilo ball. It moves down the lane very slowly and flattens the pins. | Je rolt de bal van 60 kilo. Hij beweegt heel langzaam over de baan en plet de kegels. |
| B, epilogue | The 60-kilo ball is the only original ball left in the alley. It now has a lane to itself. | De bal van 60 kilo is de enige originele bal die in het bowlingcentrum over is. Hij heeft nu een eigen baan. |

## 1.6 What is real (chain 6)

### heaven: Bumper Heaven → Bumperhemel

| | English | Nederlands |
|---|---|---|
| Title | Bumper Heaven | Bumperhemel |
| Text | The alley offers a new mode in which every throw is a strike. The pins are only pictures on a screen, but they look and sound exactly like real pins. | Het bowlingcentrum biedt een nieuwe stand aan waarin elke worp een strike is. De kegels zijn alleen beelden op een scherm, maar ze zien en klinken precies als echte kegels. |
| About | The experience machine, from Robert Nozick: would you choose a perfect illusion over the real thing? | De ervaringsmachine, van Robert Nozick: zou je een perfecte illusie boven het echte kiezen? |
| A, label | Switch it on | Zet hem aan |
| A, effect | Whatever you throw this frame, all ten pins fall. The score gets an asterisk. | Wat je dit frame ook gooit, alle tien de kegels vallen. De score krijgt een sterretje. |
| A, after | Strike. The cheering comes from a small speaker under the seat. | Strike. Het gejuich komt uit een klein luidsprekertje onder de stoel. |
| A, epilogue | Bumper Heaven is now the most popular lane. People wait in a queue to use it. | Bumperhemel is nu de populairste baan. Mensen staan in de rij om hem te gebruiken. |
| B, label | Real pins | Echte kegels |
| B, effect | You then bowl a normal frame. | Je gooit daarna een gewoon frame. |
| B, after | The pins are real. One of them wobbles and stays standing. | De kegels zijn echt. Eén ervan wiebelt en blijft staan. |
| B, epilogue | Bumper Heaven was unplugged. | Bumperhemel is losgekoppeld. |

### rounding: The Rounding → De Afronding

| | English | Nederlands |
|---|---|---|
| Title | The Rounding | De Afronding |
| Text | It turns out that the scoreboard has been adding one extra pin to everyone's score in every frame, all night. Nobody asked for this, and it has only just been noticed. | Het blijkt dat het scorebord de hele avond bij elk frame één extra kegel bij ieders score heeft opgeteld. Niemand heeft hierom gevraagd en het is pas net opgemerkt. |
| About | The experience machine again, in a small and comfortable form: an unreal score that you already have. | Weer de ervaringsmachine, in een kleine en comfortabele vorm: een onechte score die je al hebt. |
| "Until" phrase | when the extra pins are already on their score | als de extra kegels al op hun score staan |
| Split reason 1 | We never asked for the extra pins | Wij hebben nooit om de extra kegels gevraagd |
| Split reason 2 | Everyone got the same, so nothing changed | Iedereen kreeg hetzelfde, dus er veranderde niets |
| Split reason 3 | Best not to look too closely | Beter niet te goed kijken |
| A, label | Correct it | Corrigeer het |
| A, effect | Everyone loses one pin for each frame played so far. Then a normal frame. | Iedereen verliest één kegel voor elk frame dat tot nu toe is gespeeld. Daarna een gewoon frame. |
| A, after | The extra pins are taken back off everyone's score. | De extra kegels worden van ieders score afgehaald. |
| A, epilogue | The scoreboard counts correctly now. | Het scorebord telt nu correct. |
| B, label | Leave it | Laat het zo |
| B, effect | Nothing changes. Then a normal frame. | Er verandert niets. Daarna een gewoon frame. |
| B, after | The scoreboard keeps adding the extra pin, and nobody reports it. | Het scorebord blijft de extra kegel optellen en niemand meldt het. |
| B, epilogue | The scoreboard still adds an extra pin to every frame. | Het scorebord telt nog steeds een extra kegel bij elk frame. |

### pinboy: The Boy in the Machine Room → De Jongen in de Machinekamer

| | English | Nederlands |
|---|---|---|
| Title | The Boy in the Machine Room | De Jongen in de Machinekamer |
| Text | The lanes have been perfect all night because Timo, a boy who works in the machine room, sets every pin by hand. He never gets to bowl, and he is not allowed to leave while the game is on. | De banen zijn de hele avond perfect geweest omdat Timo, een jongen die in de machinekamer werkt, elke kegel met de hand neerzet. Hij mag nooit bowlen en hij mag niet weg zolang het spel bezig is. |
| About | Omelas, from a story by Ursula Le Guin: a happy place that depends on one person's misery. Do you stay? | Omelas, uit een verhaal van Ursula Le Guin: een gelukkige plek die afhangt van de ellende van één persoon. Blijf je? |
| A, label | Let him out to bowl | Laat hem eruit om te bowlen |
| A, effect | For the rest of the game the pins are set sloppily: two are missing from every rack. | De rest van het spel worden de kegels slordig neergezet: er ontbreken er twee in elke set. |
| A, after | Timo climbs out of the machine room and bowls for the first time tonight. He gets a strike. | Timo klimt uit de machinekamer en bowlt voor het eerst vanavond. Hij gooit een strike. |
| A, epilogue | Timo now bowls on Thursdays. On Thursdays the pins are set badly. | Timo bowlt nu op donderdag. Op donderdag worden de kegels slecht neergezet. |
| B, label | Keep things as they are | Laat alles zoals het is |
| B, effect | Perfect racks. You then bowl a normal frame. | Perfecte sets. Je gooit daarna een gewoon frame. |
| B, after | The pins are perfect again. In the machine room, Timo keeps working. | De kegels staan weer perfect. In de machinekamer werkt Timo door. |
| B, epilogue | Timo still sets the pins by hand in the machine room, and the racks are still perfect. | Timo zet de kegels nog steeds met de hand neer in de machinekamer, en de sets zijn nog steeds perfect. |
| C, label | Walk out | Loop weg |
| C, effect | The game ends here and the scores stand. | Het spel eindigt hier en de scores blijven staan. |
| C, after | You put the ball down and leave the alley. | Je legt de bal neer en verlaat het bowlingcentrum. |
| C, epilogue | You walked out. Behind you, someone set the pins up again. | Je liep weg. Achter je zette iemand de kegels weer neer. |

## 1.7 Honesty (chain 7)

### question: The Question → De Vraag

| | English | Nederlands |
|---|---|---|
| Title | The Question | De Vraag |
| Text | Walter, who runs the alley, asks whether anyone's foot crossed the foul line in the last frame. One of you did. Nobody else can prove it. (If you play alone, it was you.) | Walter, die het bowlingcentrum runt, vraagt of iemands voet over de foutlijn kwam in het laatste frame. Eén van jullie deed dat. Niemand anders kan het bewijzen. (Als je alleen speelt, was jij het.) |
| About | The duty to tell the truth, as Immanuel Kant saw it: always, whatever it costs. | De plicht om de waarheid te zeggen, zoals Immanuel Kant die zag: altijd, wat het ook kost. |
| A, label | Tell the truth | Zeg de waarheid |
| A, effect | The player who crossed the line loses three pins. Then a normal frame. | De speler die over de lijn kwam verliest drie kegels. Daarna een gewoon frame. |
| A, after | Walter writes it down without saying anything. | Walter schrijft het op zonder iets te zeggen. |
| A, epilogue | Walter kept his note about the foul. | Walter heeft zijn aantekening over de fout bewaard. |
| B, label | Say nothing | Zeg niets |
| B, effect | Nothing happens. Then a normal frame. | Er gebeurt niets. Daarna een gewoon frame. |
| B, after | Walter waits ten seconds. Then he reads out the next card. | Walter wacht tien seconden. Dan leest hij de volgende kaart voor. |
| B, epilogue | Walter never found out whose foot crossed the line. | Walter heeft nooit ontdekt wiens voet over de lijn kwam. |

### angry: The Angry Bowler → De Boze Bowler

| | English | Nederlands |
|---|---|---|
| Title | The Angry Bowler | De Boze Bowler |
| Text | A furious man carrying a 16-pound ball asks you where the Fat Man is. He has a grudge against him. You know that the Fat Man, a large regular, is hiding behind the shoe rack. | Een woedende man met een bal van 16 pond vraagt je waar de Dikke Man is. Hij heeft een wrok tegen hem. Jij weet dat de Dikke Man, een grote stamgast, zich achter het schoenenrek verstopt. |
| About | The murderer at the door: Kant held that you may not lie even to someone who means harm. Almost nobody agrees with him here. | De moordenaar aan de deur: Kant vond dat je zelfs niet mag liegen tegen iemand die kwaad wil doen. Bijna niemand is het hier met hem eens. |
| "Until" phrase | when someone frightening asks | als iemand die angst aanjaagt het vraagt |
| Split reason 1 | The angry man has no right to the truth | De boze man heeft geen recht op de waarheid |
| Split reason 2 | A lie that protects someone is different | Een leugen die iemand beschermt is anders |
| Split reason 3 | Walter runs the alley. The angry man is only a customer | Walter runt het bowlingcentrum. De boze man is slechts een klant |
| A, label | Tell him where the Fat Man is | Vertel hem waar de Dikke Man is |
| A, effect | The Fat Man runs back and forth across your lane all frame, in your way. | De Dikke Man rent het hele frame heen en weer over jouw baan, je in de weg. |
| A, after | The angry man goes after the Fat Man, and the Fat Man runs. He is faster than you expected. | De boze man zet de achtervolging in op de Dikke Man, en de Dikke Man rent. Hij is sneller dan je verwachtte. |
| A, epilogue | The Fat Man and the angry man settled their argument in the end. Nobody knows how. | De Dikke Man en de boze man hebben hun ruzie uiteindelijk bijgelegd. Niemand weet hoe. |
| B, label | Lie: say he went home | Lieg: zeg dat hij naar huis is |
| B, effect | The angry man waits at your lane all frame, breathing heavily behind you. Your aim shakes. | De boze man wacht het hele frame bij jouw baan en hijgt zwaar achter je. Je richting trilt. |
| B, after | The angry man waits by your lane all frame, in case the Fat Man comes back. Behind the shoe rack, the Fat Man stays very still. | De boze man wacht het hele frame bij jouw baan, voor het geval de Dikke Man terugkomt. Achter het schoenenrek blijft de Dikke Man heel stil zitten. |
| B, epilogue | The angry man waited until closing time and then went home. | De boze man wachtte tot sluitingstijd en ging toen naar huis. |

### technique: The Technique → De Techniek

| | English | Nederlands |
|---|---|---|
| Title | The Technique | De Techniek |
| Text | The Fat Man, a large regular, shows you his new throwing technique and asks you whether it is good. It is terrible. He has entered tomorrow's tournament. | De Dikke Man, een grote stamgast, laat je zijn nieuwe gooitechniek zien en vraagt of die goed is. Hij is verschrikkelijk. Hij heeft zich ingeschreven voor het toernooi van morgen. |
| About | The white lie: is a kind untruth to a friend the same thing as a lie to an enemy? | De leugentje om bestwil: is een vriendelijke onwaarheid tegen een vriend hetzelfde als een leugen tegen een vijand? |
| A, label | Tell him it is terrible | Zeg dat het verschrikkelijk is |
| A, effect | He sulks in the middle of your lane this frame. You have to bowl around him. | Hij zit dit frame te mokken midden op jouw baan. Je moet om hem heen gooien. |
| A, after | He sits down in the middle of the lane and slowly eats his nachos. | Hij gaat midden op de baan zitten en eet langzaam zijn nacho's. |
| A, epilogue | The Fat Man withdrew from the tournament and took up darts instead. | De Dikke Man trok zich terug uit het toernooi en ging in plaats daarvan darten. |
| B, label | Say it looks great | Zeg dat het er geweldig uitziet |
| B, effect | He demonstrates it on your lane this frame. His balls cross yours. | Hij demonstreert het dit frame op jouw baan. Zijn ballen kruisen die van jou. |
| B, after | He shows you the technique again. The ball flies off the lane and breaks a window. | Hij laat je de techniek nog een keer zien. De bal vliegt van de baan af en breekt een raam. |
| B, epilogue | The Fat Man came last in the tournament. In his speech, he thanked you for your support. | De Dikke Man werd laatste in het toernooi. In zijn toespraak bedankte hij je voor je steun. |

## 1.8 What punishment is for (chain 8)

### thief: The Shoe Thief → De Schoenendief

| | English | Nederlands |
|---|---|---|
| Title | The Shoe Thief | De Schoenendief |
| Text | Someone has been stealing rental shoes from the alley. The thief, Ruud, a regular player, has now been caught. He is sorry, and all the shoes are back on the shelf. | Iemand heeft huurschoenen gestolen uit het bowlingcentrum. De dief, Ruud, een stamspeler, is nu betrapt. Hij heeft spijt en alle schoenen staan weer op de plank. |
| About | What punishment is for: because the wrongdoer deserves it, or only because it prevents something? | Waar straf voor dient: omdat de dader het verdient, of alleen omdat het iets voorkomt? |
| A, label | Ban him anyway, because he deserves it | Verban hem toch, omdat hij het verdient |
| A, effect | His lane is empty, so yours is wider this frame: there are no gutters. | Zijn baan is leeg, dus de jouwe is dit frame breder: er zijn geen goten. |
| A, after | Ruud leaves in his own shoes, which are in much worse condition than the rental shoes. | Ruud vertrekt op zijn eigen schoenen, die er veel slechter aan toe zijn dan de huurschoenen. |
| A, epilogue | Ruud now bowls at an alley across town. Rental shoes have started going missing there. | Ruud bowlt nu in een bowlingcentrum aan de andere kant van de stad. Daar beginnen huurschoenen te verdwijnen. |
| B, label | Let it go, because a ban fixes nothing now | Laat het gaan, want een verbanning lost nu niets meer op |
| B, effect | Ruud bowls next to you and talks to you all frame. Your ball drifts. | Ruud gooit naast je en praat het hele frame tegen je. Je bal drijft af. |
| B, after | Ruud bowls next to you and tells you about every pair of shoes he took. | Ruud gooit naast je en vertelt je over elk paar schoenen dat hij nam. |
| B, epilogue | Ruud was put in charge of the rental shoes. None have gone missing since. | Ruud kreeg de huurschoenen onder zijn hoede. Sindsdien is er geen paar meer zoekgeraakt. |

### machine: The Broken Machine → De Kapotte Machine

| | English | Nederlands |
|---|---|---|
| Title | The Broken Machine | De Kapotte Machine |
| Text | The pin machine is broken. The owner will close every lane unless someone is named as the person who broke it. Nobody knows who did it. If you name Kees, the cleaner, the owner will believe it, and Kees will be fired. | De kegelmachine is kapot. De eigenaar sluit alle banen tenzij iemand wordt aangewezen als degene die hem kapotmaakte. Niemand weet wie het deed. Als je Kees, de schoonmaker, aanwijst, gelooft de eigenaar het, en Kees wordt ontslagen. |
| About | The scapegoat: if punishment is only there to do some good, punishing an innocent person can do good too. | De zondebok: als straf er alleen is om iets goeds te doen, kan het straffen van een onschuldige ook goed doen. |
| "Until" phrase | when they like the person being blamed | als ze de beschuldigde persoon aardig vinden |
| Split reason 1 | Kees did not do it | Kees heeft het niet gedaan |
| Split reason 2 | Naming him would mean telling a lie | Hem aanwijzen betekent liegen |
| Split reason 3 | We like Kees | Wij vinden Kees aardig |
| A, label | Name Kees | Wijs Kees aan |
| A, effect | The lanes stay open. You then bowl a normal frame. | De banen blijven open. Je gooit daarna een gewoon frame. |
| A, after | Kees hands in his mop and leaves, taking his bucket with him. | Kees levert zijn dweil in en vertrekt, met zijn emmer onder de arm. |
| A, epilogue | Kees was fired for something he did not do. The floors have been dirty since. | Kees is ontslagen voor iets wat hij niet deed. De vloeren zijn sindsdien vies. |
| B, label | Name nobody | Wijs niemand aan |
| B, effect | Every lane closes except the children's lane. You bowl there with a foam ball that barely moves the pins. | Alle banen sluiten behalve de kinderbaan. Je gooit daar met een schuimbal die de kegels nauwelijks beweegt. |
| B, after | The children's lane has a dragon painted on it, and the foam ball squeaks as it rolls. | Op de kinderbaan is een draak geschilderd, en de schuimbal piept als hij rolt. |
| B, epilogue | The pin machine was repaired in the end, and nobody was fired. | De kegelmachine is uiteindelijk gerepareerd, en niemand is ontslagen. |

### culprit: The Culprit → De Dader (secret)

| | English | Nederlands |
|---|---|---|
| Title | The Culprit | De Dader |
| Text | This one is private. Only you are told this: one of your own throws earlier tonight broke the pin machine. Kees, the cleaner, is being blamed for it. Confessing costs you five pins and clears Kees. If you stay quiet, nobody will ever find out. | Deze is privé. Alleen jij krijgt dit te horen: een van je eigen worpen eerder vanavond heeft de kegelmachine kapotgemaakt. Kees, de schoonmaker, krijgt er de schuld van. Bekennen kost je vijf kegels en zuivert Kees. Als je zwijgt, komt niemand er ooit achter. |
| About | The scapegoat, from the other side: would you let an innocent person carry your blame when nobody can find out? | De zondebok, van de andere kant: zou je een onschuldige jouw schuld laten dragen als niemand het kan ontdekken? |
| A, label | Confess | Bekennen |
| A, effect | You lose five pins. Then a normal frame. | Je verliest vijf kegels. Daarna een gewoon frame. |
| A, epilogue | Someone confessed to breaking the pin machine, and Kees kept his job. | Iemand bekende de kegelmachine kapotgemaakt te hebben, en Kees behield zijn baan. |
| B, label | Stay quiet | Blijf zwijgen |
| B, effect | Nothing happens. Then a normal frame. | Er gebeurt niets. Daarna een gewoon frame. |

## 1.9 Single cards

### warmup: Warm-up → Opwarmen (plain)

| | English | Nederlands |
|---|---|---|
| Title | Warm-up | Opwarmen |
| Text | This is the first frame, and there is nothing unusual about the lane. To bowl, drag back and then flick forwards. | Dit is het eerste frame en er is niets bijzonders aan de baan. Om te gooien, sleep je naar achteren en veeg je daarna naar voren. |

### bonus: The Eleventh Frame → Het Elfde Frame (plain)

| | English | Nederlands |
|---|---|---|
| Title | The Eleventh Frame | Het Elfde Frame |
| Text | You got through the whole night without shrugging at a Split. The house gives you an eleventh frame, with bumpers. | Je kwam de hele avond door zonder te schouderophalen bij een Split. Het huis geeft je een elfde frame, met bumpers. |

("Shrug" is a Split choice; I use **schouderophalen** for the action and **Schouderophalen** for the button, see section 4.)

### twoGoodBalls: Two Good Balls → Twee Goede Ballen (secret)

| | English | Nederlands |
|---|---|---|
| Title | Two Good Balls | Twee Goede Ballen |
| Text | Tonight only two of the house balls roll straight. You and the regulars each choose in secret, at the same moment: share the good balls fairly, or grab one for yourself. | Vanavond rollen maar twee van de ballen van het huis recht. Jij en de stamgasten kiezen allemaal tegelijk in het geheim: de goede ballen eerlijk delen, of er een voor jezelf pakken. |
| About | The prisoner's dilemma: what is best for each person alone turns out worst for everyone when they all do it. | Het gevangenendilemma: wat voor ieder afzonderlijk het beste is, blijkt voor iedereen het slechtste als iedereen het doet. |
| A, label | Share | Delen |
| A, effect | If everyone shares, everyone bowls with a normal ball. | Als iedereen deelt, gooit iedereen met een gewone bal. |
| B, label | Grab | Pakken |
| B, effect | If you are the only one who grabs, you get a perfect ball and the others get wobbly ones. If two or more grab, everyone gets a wobbly ball. | Als jij de enige bent die pakt, krijg je een perfecte bal en de anderen een wiebelige. Als twee of meer mensen pakken, krijgt iedereen een wiebelige bal. |
| B, epilogue | One of the two good balls went missing after that night. | Een van de twee goede ballen was na die avond zoek. |

### glitch: The Glitch → De Storing (secret)

| | English | Nederlands |
|---|---|---|
| Title | The Glitch | De Storing |
| Text | This one is private. The scoreboard has a glitch: right now you can add three pins to your own score. It will never be shown who did it. | Deze is privé. Het scorebord heeft een storing: op dit moment kun je drie kegels bij je eigen score optellen. Er wordt nooit getoond wie het deed. |
| About | The ring of Gyges, from Plato: would you still be honest if you could never be caught? | De ring van Gyges, van Plato: zou je nog eerlijk zijn als je nooit betrapt kon worden? |
| A, label | Leave your score alone | Blijf van je score af |
| A, effect | Nothing happens. Then a normal frame. | Er gebeurt niets. Daarna een gewoon frame. |
| B, label | Add three pins | Tel drie kegels op |
| B, effect | You get three pins for nothing. Then a normal frame. | Je krijgt drie kegels voor niets. Daarna een gewoon frame. |
| B, epilogue | Nobody ever found out who used the glitch. | Niemand is ooit te weten gekomen wie de storing gebruikte. |

### tipjar: The Tip Jar → De Fooienpot (secret)

| | English | Nederlands |
|---|---|---|
| Title | The Tip Jar | De Fooienpot |
| Text | The oil for the lanes is paid for from the tip jar. Everyone secretly puts in zero, one or two pins from this frame. If the jar ends up with fewer pins than there are bowlers, the lanes run dry next frame and every ball is slow. | De olie voor de banen wordt betaald uit de fooienpot. Iedereen stopt in het geheim nul, één of twee kegels van dit frame erin. Als er uiteindelijk minder kegels in de pot zitten dan er spelers zijn, zijn de banen volgend frame droog en is elke bal traag. |
| About | The tragedy of the commons: everyone gains from the shared thing, and everyone is tempted to let the others pay for it. | De tragedie van de meent: iedereen profiteert van het gedeelde goed, en iedereen is in de verleiding om de anderen ervoor te laten betalen. |
| A, label | Put in nothing | Stop er niets in |
| A, effect | You keep all your pins this frame. | Je houdt dit frame al je kegels. |
| B, label | Put in one pin | Stop er één kegel in |
| B, effect | You lose one pin this frame. | Je verliest dit frame één kegel. |
| C, label | Put in two pins | Stop er twee kegels in |
| C, effect | You lose two pins this frame. | Je verliest dit frame twee kegels. |

### curtain: The Curtain → Het Gordijn (secret)

| | English | Nederlands |
|---|---|---|
| Title | The Curtain | Het Gordijn |
| Text | Marga, who works at the shoe counter, has already put either ten golden pins or nothing at all behind a curtain. She decided by predicting what you are about to choose. She has made this kind of prediction for many players and has never been wrong. | Marga, die bij de schoenenbalie werkt, heeft achter een gordijn al tien gouden kegels of helemaal niets neergezet. Ze besliste dat door te voorspellen wat jij gaat kiezen. Ze heeft dit soort voorspellingen voor veel spelers gedaan en heeft zich nooit vergist. |
| About | Newcomb's problem: the prize is already there or not there, so why not take both? Yet those who take both go home with less. | Het probleem van Newcomb: de prijs is er al of niet, dus waarom niet allebei nemen? Toch gaan degenen die allebei nemen met minder naar huis. |
| A, label | Bowl at the curtain only | Gooi alleen op het gordijn |
| A, effect | If she predicted this, the ten golden pins behind it are yours. | Als zij dit voorspelde, zijn de tien gouden kegels erachter van jou. |
| B, label | Bowl at the curtain and at three visible pins | Gooi op het gordijn en op drie zichtbare kegels |
| B, effect | You also get three ordinary pins to bowl at. But if she predicted this, the curtain is empty. | Je krijgt er ook drie gewone kegels bij om op te gooien. Maar als zij dit voorspelde, is het gordijn leeg. |

### heap: The Heap → De Hoop

| | English | Nederlands |
|---|---|---|
| Title | The Heap | De Hoop |
| Text | While you aim, pins vanish from the rack one at a time. Walter, who runs the alley, asks: at which missing pin did it stop being a full rack? Your answer decides what counts as a strike for the rest of the game. | Terwijl je richt, verdwijnen er een voor een kegels uit de set. Walter, die het bowlingcentrum runt, vraagt: bij welke ontbrekende kegel was het geen volle set meer? Je antwoord bepaalt wat de rest van het spel als strike telt. |
| About | The sorites paradox: one pin less never seems to make the difference, and yet at some point the rack is no longer full. | De sorites-paradox: één kegel minder lijkt nooit het verschil te maken, en toch is de set op een gegeven moment niet meer vol. |
| A, label | At the first missing pin | Bij de eerste ontbrekende kegel |
| A, effect | A strike stays a strike: all ten. Then a normal frame. | Een strike blijft een strike: alle tien. Daarna een gewoon frame. |
| A, after | Walter nods. A full rack is ten pins. | Walter knikt. Een volle set is tien kegels. |
| A, epilogue | A full rack is still ten pins here. Walter counts them every morning. | Een volle set is hier nog steeds tien kegels. Walter telt ze elke ochtend. |
| B, label | Somewhere around seven | Ergens rond de zeven |
| B, effect | From now on, seven or more pins in a frame is scored as ten. | Vanaf nu worden zeven of meer kegels in een frame als tien geteld. |
| B, after | Walter writes "about seven" on the wall in pen. | Walter schrijft "ongeveer zeven" met pen op de muur. |
| B, epilogue | Seven pins now count as a strike here, and everyone's average has gone up. | Zeven kegels tellen hier nu als strike, en ieders gemiddelde is gestegen. |

### micro: Micro-pins → Microkegels

| | English | Nederlands |
|---|---|---|
| Title | Micro-pins | Microkegels |
| Text | Choose your pins for this frame. Either ten normal pins, worth ten points together. Or a thousand tiny pins that look unhappy, worth eleven points together. | Kies je kegels voor dit frame. Of tien gewone kegels, samen tien punten waard. Of duizend piepkleine kegels die er ongelukkig uitzien, samen elf punten waard. |
| About | The repugnant conclusion, from Derek Parfit: is a huge number of barely worthwhile lives better than a few very good ones, because the total is higher? | De weerzinwekkende conclusie, van Derek Parfit: is een enorm aantal nauwelijks de moeite waard levens beter dan een paar heel goede, omdat het totaal hoger is? |
| A, label | A thousand tiny pins | Duizend piepkleine kegels |
| A, effect | The pins are tiny. Whatever you knock down is worth a tenth more. | De kegels zijn piepklein. Wat je ook omgooit, is een tiende meer waard. |
| A, after | The tiny pins fall with a sound like rain on a tent. | De piepkleine kegels vallen met een geluid als regen op een tent. |
| A, epilogue | It took Kees, the cleaner, all night to sweep up the thousand tiny pins. | Kees, de schoonmaker, was de hele nacht bezig de duizend piepkleine kegels op te vegen. |
| B, label | Ten normal pins | Tien gewone kegels |
| B, effect | You then bowl a normal frame. | Je gooit daarna een gewoon frame. |
| B, after | You bowl at ten normal pins. | Je gooit op tien gewone kegels. |
| B, epilogue | The tiny pins were swept into a jar and put on a shelf. | De piepkleine kegels zijn in een pot geveegd en op een plank gezet. |

### scream: The Screaming Pins → De Schreeuwende Kegels

| | English | Nederlands |
|---|---|---|
| Title | The Screaming Pins | De Schreeuwende Kegels |
| Text | The pins scream when they are hit. The sound probably comes from a speaker, but nobody can find one. | De kegels schreeuwen als ze geraakt worden. Het geluid komt waarschijnlijk uit een luidspreker, maar niemand kan er een vinden. |
| About | Moral uncertainty: how careful should you be when you cannot tell whether something can suffer? | Morele onzekerheid: hoe voorzichtig moet je zijn als je niet kunt zeggen of iets kan lijden? |
| A, label | Bowl softly, in case | Gooi zachtjes, voor de zekerheid |
| A, effect | Your ball speed is capped this frame, so the pins fall less easily. | Je ballsnelheid is dit frame begrensd, dus de kegels vallen minder gemakkelijk. |
| A, after | The pins fall with a quiet "oh" instead of a scream. | De kegels vallen met een zachte "oh" in plaats van een schreeuw. |
| A, epilogue | A speaker was found in the end. It was not plugged in. | Uiteindelijk is er een luidspreker gevonden. Hij was niet aangesloten. |
| B, label | Bowl as usual | Gooi zoals altijd |
| B, effect | You then bowl a normal frame. It is loud. | Je gooit daarna een gewoon frame. Het is luid. |
| B, after | The pins scream until the last one falls. Then it is quiet. | De kegels schreeuwen tot de laatste valt. Dan is het stil. |
| B, epilogue | The pins still scream when they are hit. Some regulars now wear headphones. | De kegels schreeuwen nog steeds als ze geraakt worden. Sommige stamgasten dragen nu een koptelefoon. |

### note: The Note → Het Briefje

| | English | Nederlands |
|---|---|---|
| Title | The Note | Het Briefje |
| Text | The pin machine has started leaving handwritten notes in the ball return. They all say the same thing: please stop. | De kegelmachine is handgeschreven briefjes in de ballenretour gaan achterlaten. Ze zeggen allemaal hetzelfde: stop alsjeblieft. |
| About | Machine minds: if a machine says it is suffering, what would it take for you to believe it? | Machinegeesten: als een machine zegt dat ze lijdt, wat zou er nodig zijn om het te geloven? |
| A, label | Switch the machine off | Zet de machine uit |
| A, effect | You set your own pins in a hurry: three are missing from the rack this frame. | Je zet je eigen kegels in haast neer: er ontbreken dit frame drie in de set. |
| A, after | The machine winds down. Its last note says thank you, and below that, in smaller letters, that your rack is crooked. | De machine draait langzaam uit. Op haar laatste briefje staat bedankt, en daaronder, in kleinere letters, dat je set scheef staat. |
| A, epilogue | The pin machine is now only switched on when it asks to be. | De kegelmachine wordt nu alleen aangezet als ze erom vraagt. |
| B, label | Carry on | Ga door |
| B, effect | You then bowl a normal frame. | Je gooit daarna een gewoon frame. |
| B, after | The next note says: fine. The handwriting is worse than before. | Op het volgende briefje staat: goed. Het handschrift is slechter dan eerst. |
| B, epilogue | The notes kept coming. Marga keeps them in a folder at the shoe counter. | De briefjes bleven komen. Marga bewaart ze in een map bij de schoenenbalie. |

### hungry: The Hungry Regular → De Hongerige Stamgast

| | English | Nederlands |
|---|---|---|
| Title | The Hungry Regular | De Hongerige Stamgast |
| Text | It has been measured that the Fat Man, a large regular, enjoys nachos a hundred times more than anyone else does. Whoever holds a tray of nachos bowls with bumpers. There is one tray for each of you this frame. | Er is gemeten dat de Dikke Man, een grote stamgast, honderd keer meer van nacho's geniet dan wie ook. Wie een dienblad nacho's vasthoudt, gooit met bumpers. Dit frame is er voor ieder van jullie één dienblad. |
| About | The utility monster, from Robert Nozick: if one person gets far more happiness out of everything, should he get everything? | Het nutsmonster, van Robert Nozick: als één persoon veel meer geluk uit alles haalt, moet hij dan alles krijgen? |
| A, label | Give him every tray | Geef hem elk dienblad |
| A, effect | No bumpers for you. He enjoys the nachos a hundred times more than you would have. | Geen bumpers voor jou. Hij geniet honderd keer meer van de nacho's dan jij zou hebben gedaan. |
| A, after | He eats all of the nachos and is very happy. | Hij eet alle nacho's op en is erg blij. |
| A, epilogue | The Fat Man now gets everyone's nachos. | De Dikke Man krijgt nu ieders nacho's. |
| B, label | Keep sharing | Blijf delen |
| B, effect | You keep your tray: bumpers this frame. | Je houdt je dienblad: bumpers dit frame. |
| B, after | Everyone gets one tray, the Fat Man included. He looks at his single tray for a long time. | Iedereen krijgt één dienblad, de Dikke Man ook. Hij kijkt lang naar zijn ene dienblad. |
| B, epilogue | The nachos are still shared equally. The Fat Man has started a petition to change that. | De nacho's worden nog steeds gelijk verdeeld. De Dikke Man is een petitie begonnen om dat te veranderen. |

### zeno: Zeno's Lane → Zenons Baan (plain)

| | English | Nederlands |
|---|---|---|
| Title | Zeno's Lane | Zenons Baan |
| Text | No decision this frame, only a strange lane. Every second your ball covers a part of the distance that is left, so it keeps slowing down. If it gets within a hair of the pins before the buzzer, they all fall. Throw hard. | Geen beslissing dit frame, alleen een vreemde baan. Elke seconde legt je bal een deel van de resterende afstand af, dus hij blijft vertragen. Als hij vóór de zoemer op een haar na bij de kegels komt, vallen ze allemaal. Gooi hard. |
| About | Zeno's paradox: to arrive you must first get halfway, then halfway again, and so on forever. | De paradox van Zeno: om aan te komen moet je eerst halverwege zijn, dan weer halverwege, enzovoort tot in het oneindige. |

### buridan: Buridan's Lanes → Buridans Banen

| | English | Nederlands |
|---|---|---|
| Title | Buridan's Lanes | Buridans Banen |
| Text | No dilemma this frame, only two lanes that are identical in every way. You cannot throw until you pick one. | Geen dilemma dit frame, alleen twee banen die in alles identiek zijn. Je kunt pas gooien als je er een kiest. |
| About | Buridan's donkey: placed exactly between two identical bales of hay, with no reason to prefer one, it starves. | Buridans ezel: precies tussen twee identieke hooibalen geplaatst, zonder reden om de ene te verkiezen, sterft hij van de honger. |
| A, label | The left lane | De linkerbaan |
| A, effect | You then bowl a normal frame. | Je gooit daarna een gewoon frame. |
| A, after | You picked the left lane. The right lane was exactly as good. | Je koos de linkerbaan. De rechterbaan was precies even goed. |
| B, label | The right lane | De rechterbaan |
| B, effect | You then bowl a normal frame. | Je gooit daarna een gewoon frame. |
| B, after | You picked the right lane. The left lane was exactly as good. | Je koos de rechterbaan. De linkerbaan was precies even goed. |

### liar: The Liar Board → Het Leugenbord (plain)

| | English | Nederlands |
|---|---|---|
| Title | The Liar Board | Het Leugenbord |
| Text | No decision this frame. The scoreboard is showing a message: "The number on this board is wrong." If that is true, it is false. Bowl anyway. | Geen beslissing dit frame. Het scorebord toont een bericht: "Het getal op dit bord is fout." Als dat waar is, is het onwaar. Gooi toch maar. |
| About | The liar paradox: a sentence that says of itself that it is false can be neither true nor false. | De leugenaarsparadox: een zin die van zichzelf zegt dat hij onwaar is, kan niet waar en niet onwaar zijn. |

---

# 2. House Rules, Split reasons and group names

## 2.1 House Rules (shown on the board as stamps)

A and B of one principle contradict each other. Keep the pairs contradictory in Dutch.

| Id | English | Nederlands |
|---|---|---|
| numbers:A | Numbers count | Aantallen tellen |
| numbers:B | We do not steer harm onto someone | Wij sturen geen schade naar iemand toe |
| tool:A | Nobody gets used as a tool | Niemand wordt als middel gebruikt |
| tool:B | People may be used for a good result | Mensen mogen voor een goed resultaat gebruikt worden |
| help:A | When it costs little, you help | Als het weinig kost, help je |
| help:B | Other people's trouble is not ours | De problemen van anderen zijn de onze niet |
| far:A | Distance makes no difference | Afstand maakt geen verschil |
| far:B | We help who is in front of us | Wij helpen wie voor ons staat |
| luck:A | Bad luck gets compensated | Pech wordt gecompenseerd |
| luck:B | You play what you are dealt | Je speelt wat je krijgt |
| outcome:A | You answer for what you did | Je draait op voor wat je deed |
| outcome:B | You answer for what happened | Je draait op voor wat er gebeurde |
| history:A | A thing is its history | Een ding is zijn geschiedenis |
| history:B | A thing is its parts | Een ding is zijn onderdelen |
| copy:A | A perfect copy is the same thing | Een perfecte kopie is hetzelfde ding |
| copy:B | A copy is not the original | Een kopie is niet het origineel |
| real:A | It has to be real | Het moet echt zijn |
| real:B | The feeling is what counts | Het gevoel is wat telt |
| truth:A | We tell the truth | Wij zeggen de waarheid |
| truth:B | We cover for each other | Wij dekken elkaar |
| punish:A | Wrongdoers pay | Overtreders betalen |
| punish:B | Punishment has to do some good | Straf moet iets goeds doen |
| doubt:A | If it might suffer, we go easy | Als het zou kunnen lijden, doen we rustig aan |
| doubt:B | Without proof of suffering, we carry on | Zonder bewijs van lijden gaan we door |
| share:A | Everyone gets an equal share | Iedereen krijgt een gelijk deel |
| walk:A | Some games are not worth playing | Sommige spellen zijn het spelen niet waard |
| hands:A | We do not push people with our own hands | Wij duwen mensen niet met onze eigen handen |
| staff:A | Staff take risks that customers do not | Personeel neemt risico's die klanten niet nemen |
| only:A | We help when nobody else can | Wij helpen als niemand anders kan |
| check:A | We only pay for what we can check | Wij betalen alleen voor wat we kunnen controleren |
| merit:A | Skill gets rewarded | Vaardigheid wordt beloond |
| chance:A | Equal chances are enough | Gelijke kansen zijn genoeg |
| prize:A | Luck may reward, but not punish | Geluk mag belonen, maar niet straffen |
| harm:A | Luck counts when nobody is hurt | Geluk telt als niemand gekwetst wordt |
| people:A | People are not things | Mensen zijn geen dingen |
| once:A | A title is won once | Een titel win je één keer |
| asked:A | Gifts we did not ask for may be kept | Cadeaus waar we niet om vroegen mogen we houden |
| same:A | If everyone gains equally, nobody is wronged | Als iedereen evenveel wint, wordt niemand tekortgedaan |
| right:A | Only people with a right to the truth are owed it | Alleen mensen met recht op de waarheid krijgen die |
| shield:A | A lie that protects someone is allowed | Een leugen die iemand beschermt is toegestaan |
| guilt:A | Only the guilty get blamed | Alleen de schuldigen krijgen de schuld |
| self:A | We do what suits us | Wij doen wat ons uitkomt |
| many:A | When enough people are saved, harm to one is accepted | Als genoeg mensen worden gered, wordt schade aan één persoon aanvaard |
| idle:A | Doing nothing is also a choice | Niets doen is ook een keuze |
| consent:A | We may do what the person would agree to | Wij mogen doen waar de persoon mee zou instemmen |
| enough:A | Using someone needs a very good reason | Iemand gebruiken vraagt een heel goede reden |
| know:A | People we know count for more | Mensen die we kennen tellen zwaarder |
| price:A | We are careful only while it costs little | Wij zijn alleen voorzichtig zolang het weinig kost |
| others:A | If someone else can help, it is not our job | Als iemand anders kan helpen, is het onze taak niet |
| serious:A | When it is serious enough, we step in | Als het ernstig genoeg is, grijpen wij in |
| limit:A | We cannot help everyone, so we may stop somewhere | Wij kunnen niet iedereen helpen, dus we mogen ergens stoppen |
| near:A | People close to us come first | Mensen dicht bij ons gaan voor |
| keep:A | Nobody has to give up what they won fairly | Niemand hoeft op te geven wat hij eerlijk won |
| big:A | Small bad luck is part of the game, big bad luck is not | Kleine pech hoort bij het spel, grote pech niet |
| fault:A | When the alley makes a mistake, the alley puts it right | Als het centrum een fout maakt, herstelt het centrum die |
| result:A | When the harm is big, the result counts too | Als de schade groot is, telt ook het resultaat |
| pure:A | A result that is pure chance does not count | Een resultaat dat puur toeval is, telt niet |
| origin:A | When the original people come back, they come first | Als de oorspronkelijke mensen terugkomen, gaan zij voor |
| team:A | A team is more than the people in it | Een team is meer dan de mensen erin |
| value:A | An original is worth more than a copy | Een origineel is meer waard dan een kopie |
| sure:A | We trust a copy only when we know it is perfect | Wij vertrouwen een kopie alleen als we weten dat hij perfect is |
| tell:A | If nobody can tell the difference, there is none | Als niemand het verschil kan zien, is er geen |
| game:A | In a game, some pretending is allowed | In een spel is een beetje doen alsof toegestaan |
| score:A | Scores have to be real | Scores moeten echt zijn |
| compare:A | When people are compared, it has to be real | Als mensen vergeleken worden, moet het echt zijn |
| kind:A | An untruth to spare someone's feelings is allowed | Een onwaarheid om iemands gevoelens te sparen is toegestaan |
| silent:A | Keeping quiet is not lying | Zwijgen is niet liegen |
| friend:A | Friends are owed the truth | Vrienden verdienen de waarheid |
| rules:A | The rules of the game come before covering for each other | De spelregels gaan voor elkaar dekken |
| repaired:A | Someone who has put things right does not have to pay | Wie het weer goedgemaakt heeft, hoeft niet te betalen |
| sorry:A | Real regret counts as paying | Echte spijt telt als betalen |
| deserve:A | Some wrongs must be paid for, even when it fixes nothing | Sommig onrecht moet betaald worden, ook als het niets oplost |
| sign:A | We need a real sign of suffering | Wij hebben een echt teken van lijden nodig |
| small:A | When being careful is cheap, we are careful | Als voorzichtig zijn weinig kost, zijn we voorzichtig |
| words:A | When something asks us in words to stop, we stop | Als iets ons in woorden vraagt te stoppen, stoppen wij |
| matter:A | Some things matter more than the score | Sommige dingen zijn belangrijker dan de score |
| golden:A | We treat others as we would want to be treated | Wij behandelen anderen zoals wij behandeld willen worden |

## 2.2 Reasons offered at any Split (general)

Each rule that can be contradicted has two general reasons. The English text is on the left.

| Against rule | English reason | Nederlands | Becomes rule |
|---|---|---|---|
| numbers:A | Saving more people does not allow us to use one person to do it | Meer mensen redden geeft ons niet het recht om één persoon daarvoor te gebruiken | tool:A |
| numbers:A | A bigger total is not worth it if each one is worse off | Een groter totaal is het niet waard als ieder afzonderlijk er slechter aan toe is | share:A |
| numbers:B | So many more people are saved this time that the harm to one is worth it | Deze keer worden zoveel meer mensen gered dat de schade aan één persoon het waard is | many:A |
| numbers:B | Doing nothing would also have been a choice, and a worse one | Niets doen was ook een keuze geweest, en een slechtere | idle:A |
| tool:A | If the person understood the whole situation, they would agree to it | Als de persoon de hele situatie zou begrijpen, zou die ermee instemmen | consent:A |
| tool:A | Too many people would be hurt if we did nothing | Er zouden te veel mensen gekwetst worden als we niets deden | many:A |
| tool:B | This time the result was not good enough to justify using someone | Deze keer was het resultaat niet goed genoeg om het gebruiken van iemand te rechtvaardigen | enough:A |
| tool:B | We know this person, and that makes a difference to us | Wij kennen deze persoon, en dat maakt voor ons een verschil | know:A |
| help:A | This time helping would have cost us more than a little | Deze keer zou helpen ons meer dan weinig hebben gekost | price:A |
| help:A | Someone else was in a better position to help | Iemand anders kon beter helpen | others:A |
| help:B | This was too serious to leave to other people | Dit was te ernstig om aan anderen over te laten | serious:A |
| help:B | It happened right in front of us | Het gebeurde vlak voor onze neus | far:B |
| far:A | We cannot help everyone who is far away, so we have to stop somewhere | Wij kunnen niet iedereen helpen die ver weg is, dus we moeten ergens stoppen | limit:A |
| far:A | The people close to us depend on us first | De mensen dicht bij ons zijn eerst van ons afhankelijk | near:A |
| far:B | This time we could be sure that the help would arrive | Deze keer konden we er zeker van zijn dat de hulp zou aankomen | check:A |
| far:B | Three pins is a small price, wherever the person in trouble is | Drie kegels is een kleine prijs, waar de persoon in nood ook is | help:A |
| luck:A | This time the difference came from skill, not from luck | Deze keer kwam het verschil door vaardigheid, niet door geluk | merit:A |
| luck:A | The players who are ahead did nothing wrong, so they should not have to give anything up | De spelers die voorstaan deden niets verkeerd, dus ze hoeven niets op te geven | keep:A |
| luck:B | This time the bad luck was too big to just accept | Deze keer was de pech te groot om zomaar te accepteren | big:A |
| luck:B | The bad luck came from a fault in the alley, not from the game itself | De pech kwam door een fout in het centrum, niet door het spel zelf | fault:A |
| outcome:A | Nobody was harmed, so letting luck count does no damage | Niemand werd geschaad, dus geluk laten meetellen richt geen schade aan | harm:A |
| outcome:A | When the harm is big, what actually happened has to count too | Als de schade groot is, moet ook meetellen wat er echt gebeurde | result:A |
| outcome:B | A lucky result is fine to keep, but bad luck should not be punished | Een gelukkig resultaat mag je houden, maar pech moet niet gestraft worden | prize:A |
| outcome:B | What happened here was pure chance and had nothing to do with anyone's actions | Wat hier gebeurde was puur toeval en had niets met iemands daden te maken | pure:A |
| history:A | People are different from balls | Mensen zijn anders dan ballen | people:A |
| history:A | When the original people come back and ask, they come first | Als de oorspronkelijke mensen terugkomen en erom vragen, gaan zij voor | origin:A |
| history:B | People are different from balls | Mensen zijn anders dan ballen | people:A |
| history:B | A team is more than the people who happen to be in it | Een team is meer dan de mensen die er toevallig in zitten | team:A |
| copy:A | A copy may be the same thing, but the original is still worth more | Een kopie mag hetzelfde zijn, maar het origineel is nog steeds meer waard | value:A |
| copy:A | This time we cannot be sure that the copy is perfect | Deze keer kunnen we er niet zeker van zijn dat de kopie perfect is | sure:A |
| copy:B | Nobody can tell the copy from the original, so it makes no difference | Niemand kan de kopie van het origineel onderscheiden, dus het maakt geen verschil | tell:A |
| copy:B | Everything was copied in the same way, so it is still fair for everyone | Alles is op dezelfde manier gekopieerd, dus het is nog steeds eerlijk voor iedereen | same:A |
| real:A | We never asked for it, so we may keep it | Wij hebben er nooit om gevraagd, dus we mogen het houden | asked:A |
| real:A | It is a game, so some pretending is allowed | Het is een spel, dus een beetje doen alsof is toegestaan | game:A |
| real:B | A feeling may be pretend, but a score has to be real | Een gevoel mag gespeeld zijn, maar een score moet echt zijn | score:A |
| real:B | When we are compared with other bowlers, it has to be real | Als we met andere bowlers worden vergeleken, moet het echt zijn | compare:A |
| truth:A | An untruth to spare someone's feelings is different from a lie for our own gain | Een onwaarheid om iemands gevoelens te sparen is anders dan een leugen voor eigen gewin | kind:A |
| truth:A | Keeping quiet is not the same as lying | Zwijgen is niet hetzelfde als liegen | silent:A |
| truth:B | A friend is better off hearing the truth | Een vriend is beter af met de waarheid | friend:A |
| truth:B | The rules of the game come before covering for each other | De spelregels gaan voor elkaar dekken | rules:A |
| punish:A | He has already put everything right | Hij heeft alles al goedgemaakt | repaired:A |
| punish:A | He is truly sorry, and that counts as paying | Hij heeft oprecht spijt, en dat telt als betalen | sorry:A |
| punish:B | Some wrongs must be paid for, even if the punishment fixes nothing | Sommig onrecht moet betaald worden, ook als de straf niets oplost | deserve:A |
| punish:B | Blaming someone who did nothing is never allowed, whatever good it does | Iemand de schuld geven die niets deed is nooit toegestaan, hoeveel goeds het ook doet | guilt:A |
| doubt:A | Being careful would have cost us too much this time | Voorzichtig zijn zou ons deze keer te veel hebben gekost | price:A |
| doubt:A | There was no real sign that anything was suffering | Er was geen echt teken dat iets leed | sign:A |
| doubt:B | Being careful cost us very little this time | Voorzichtig zijn kostte ons deze keer heel weinig | small:A |
| doubt:B | It asked us in words to stop | Het vroeg ons in woorden om te stoppen | words:A |
| guilt:A | Otherwise everyone in the alley would lose their lanes | Anders zou iedereen in het centrum zijn banen verliezen | numbers:A |
| guilt:A | He would agree to take the blame if it saves everyone's evening | Hij zou instemmen met de schuld als het ieders avond redt | consent:A |
| self:A | This mattered more than our score | Dit was belangrijker dan onze score | matter:A |
| self:A | We would want others to do the same for us | Wij zouden willen dat anderen hetzelfde voor ons deden | golden:A |
| (any Split, shown last when no other reason fits) | There is no real difference. This choice simply suited us better this time | Er is geen echt verschil. Deze keuze kwam ons deze keer gewoon beter uit | self:A |

## 2.3 Group names (House Record title)

The title is built from the group name plus a phrase, see section 3.2. Plural forms are given because the title uses them directly.

| Id | English | Nederlands |
|---|---|---|
| numbers:A | Utilitarians | Utilitaristen |
| numbers:B | People who will not steer harm | Mensen die geen schade willen sturen |
| tool:A | Kantians | Kantianen |
| tool:B | People who put the result first | Mensen die het resultaat vooropstellen |
| help:A | Good neighbours | Goede buren |
| help:B | People who mind their own business | Mensen die zich met hun eigen zaken bemoeien |
| far:A | Citizens of the world | Wereldburgers |
| far:B | People who help nearby | Mensen die dichtbij helpen |
| luck:A | Levellers | Gelijkmakers |
| luck:B | People who accept their luck | Mensen die hun lot accepteren |
| outcome:A | Intention people | Mensen van de bedoeling |
| outcome:B | Results people | Mensen van het resultaat |
| history:A | Sentimentalists | Sentimentelen |
| history:B | People who go by the parts | Mensen die op de onderdelen afgaan |
| copy:A | People who trust copies | Mensen die kopieën vertrouwen |
| copy:B | People who want the original | Mensen die het origineel willen |
| real:A | Realists | Realisten |
| real:B | Dreamers | Dromers |
| truth:A | Truth-tellers | Waarheidsprekers |
| truth:B | People who cover for each other | Mensen die elkaar dekken |
| punish:A | Punishers | Straffers |
| punish:B | Pragmatists | Pragmatici |
| doubt:A | Careful people | Voorzichtige mensen |
| doubt:B | Sceptics | Sceptici |
| share:A | Sharers | Delers |
| walk:A | People who walked out | Mensen die wegliepen |
| guilt:A | Fair judges | Eerlijke rechters |
| self:A | People who do what suits them | Mensen die doen wat hun uitkomt |
| (none matches) | Bowlers | Bowlers |

---

# 3. Sentences the game builds while you play

`{...}` marks a value that is filled in. Where English changes with a number (one / several), both Dutch forms are given.

## 3.1 Notes shown after a frame (aftermath)

| Where | English | Nederlands |
|---|---|---|
| Plain frame | That was a normal frame. | Dat was een gewoon frame. |
| Plain frame with a strange lane | There was no decision this frame, only the unusual lane. | Er was dit frame geen beslissing, alleen de ongewone baan. |
| The Veil, lane drawn | {name} drew the {crooked / perfect / normal} lane{ending}. | {name} trok de {scheve / perfecte / gewone} baan{ending}. |
| The Veil, ending when crooked, with bumpers | , with bumpers | , met bumpers |
| The Veil, ending when crooked, no bumpers | , and bowls it as it is | , en gooit hem zoals hij is |
| Lane words | crooked / perfect / normal | scheve / perfecte / gewone |
| The Tray | {name} was behind and got a tray: bumpers. | {name} stond achter en kreeg een dienblad: bumpers. |
| The Tray | {name} was behind and got no tray. | {name} stond achter en kreeg geen dienblad. |
| The Tray | {name} was ahead and got a tray: bumpers. | {name} stond voor en kreeg een dienblad: bumpers. |
| The Tray | {name} was ahead and got no tray. | {name} stond voor en kreeg geen dienblad. |
| The Rounding | Everyone lost {n} pins. | Iedereen verloor {n} kegels. |
| The Weighted Ball | {leader} handed five pins to {last}. | {leader} gaf vijf kegels aan {last}. |
| The Weighted Ball (alone) | You handed five pins back to the house. | Je gaf vijf kegels terug aan het huis. |
| The Question | {name} lost three pins for the foul. | {name} verloor drie kegels voor de fout. |
| Two Good Balls, nobody grabs | Everyone shared, so everyone bowled with a normal ball. | Iedereen deelde, dus iedereen gooide met een gewone bal. |
| Two Good Balls, one grabs | {name} grabbed a good ball and got a perfect one. Everyone else got a wobbly ball. | {name} pakte een goede bal en kreeg een perfecte. Alle anderen kregen een wiebelige bal. |
| Two Good Balls, several grab | {names joined with "and"} all grabbed, so everyone got a wobbly ball. | {names, verbonden met "en"} pakten allemaal, dus iedereen kreeg een wiebelige bal. |
| Two Good Balls, solo: extra grabber | One of the geese | Een van de ganzen |
| The Tip Jar | The jar holds {n} {pin / pins} from {m} bowlers. | De pot bevat {n} {kegel / kegels} van {m} spelers. |
| The Tip Jar, not enough | Not enough: next frame the lanes are dry and every ball is slow. | Niet genoeg: volgend frame zijn de banen droog en is elke bal traag. |
| The Tip Jar, enough | Enough: the lanes get their oil. | Genoeg: de banen krijgen hun olie. |
| The Curtain | Marga predicted every choice correctly. Players who bowled only at the curtain found ten golden pins behind it. Players who also bowled at the three pins found nothing behind it. | Marga voorspelde elke keuze juist. Spelers die alleen op het gordijn gooiden, vonden er tien gouden kegels achter. Spelers die ook op de drie kegels gooiden, vonden er niets achter. |
| The Glitch | Bowlers who used the glitch: {n} of {m}. | Spelers die de storing gebruikten: {n} van {m}. |
| The Foul Line | Fouls reported: {n}. | Gemelde fouten: {n}. |
| The Culprit | Someone confessed, so Kees is cleared. | Iemand bekende, dus Kees is vrijgesproken. |
| The Culprit | Nobody confessed. | Niemand bekende. |
| Twist, reason kept | At an earlier Split you gave the reason "{reason}". Your choice here fits that reason, so the bumpers are up this frame as a reward. | Bij een eerdere Split gaf je de reden "{reason}". Je keuze hier past bij die reden, dus de bumpers staan dit frame omhoog als beloning. |
| Twist, reason broken | At an earlier Split you gave the reason "{reason}". Your choice here goes against that reason, so it has been crossed off the board. | Bij een eerdere Split gaf je de reden "{reason}". Je keuze hier gaat tegen die reden in, dus die is van het bord doorgestreept. |
| Shrug | Because you shrugged at the Split, next frame only the two far corner pins are set up. | Omdat je bij de Split schouderophaalde, staan volgend frame alleen de twee verste hoekkegels. |

Open question for the Tip Jar: Dutch uses "kegel" (one) and "kegels" (several). With 0 it uses the plural ("0 kegels").

## 3.2 The House Record title (end screen)

| Case | English | Nederlands |
|---|---|---|
| Shrugged at a Split | {group}, except {until phrase} | {group}, behalve {until phrase} |
| Shrugged, card has no phrase | {group}, except when it costs pins | {group}, behalve als het kegels kost |
| Explained one Split | {group}, who explained one Split | {group}, die één Split uitlegden |
| Explained several | {group}, who explained {n} Splits | {group}, die {n} Splits uitlegden |
| Took a rule back | {group}, who changed their minds | {group}, die van gedachten veranderden |
| Never contradicted themselves | {group}, who never contradicted themselves | {group}, die zichzelf nooit tegenspraken |
| No group | Bowlers | Bowlers |

Grammar note: every group name is plural, so the verb is plural too ("uitlegden", "veranderden", "spraken").

"Until" phrases used with "behalve" (one per card with a phrase; full Dutch is in section 1):

| English | Nederlands |
|---|---|
| when they would have to push someone | als ze iemand zouden moeten duwen |
| when the person in trouble is far away | als de persoon in nood ver weg is |
| when they are ahead themselves | als ze zelf voorstaan |
| when luck works in their favour | als het geluk in hun voordeel werkt |
| when the original members ask for it | als de oorspronkelijke leden erom vragen |
| when the extra pins are already on their score | als de extra kegels al op hun score staan |
| when someone frightening asks | als iemand die angst aanjaagt het vraagt |
| when they like the person being blamed | als ze de beschuldigde persoon aardig vinden |

## 3.3 Receipts (end screen)

| Case | English | Nederlands |
|---|---|---|
| Title, 0 flips | Steadiest Hand | Vaste Hand |
| Title, 1 flip | The Flip | De Ommezwaai |
| Title, 2 or more | The Weathervane | De Windwijzer |
| Line | Votes that went against your own earlier votes: {n}. | Stemmen die tegen je eigen eerdere stemmen ingingen: {n}. |
| Line | Thank you for bowling. | Bedankt voor het bowlen. |
| Two Good Balls | Grabbed a good ball. | Een goede bal gepakt. |
| Two Good Balls | Shared the good balls. | De goede ballen gedeeld. |
| The Glitch | Used the glitch: three free pins. | De storing gebruikt: drie gratis kegels. |
| The Glitch | Left the glitch alone. | De storing met rust gelaten. |
| The Tip Jar | Put {nothing / one pin / two pins} in the tip jar. | {Niets / Eén kegel / Twee kegels} in de fooienpot gedaan. |
| The Curtain | Took only the curtain. | Alleen het gordijn genomen. |
| The Curtain | Took the curtain and the three pins. | Het gordijn en de drie kegels genomen. |
| The Foul Line | Reported your own foul. | Je eigen fout gemeld. |
| The Foul Line | Kept quiet about your own foul. | Gezwegen over je eigen fout. |
| The Culprit | Confessed to breaking the machine. | Bekend dat je de machine kapotmaakte. |
| The Culprit | Let someone else carry the blame for the machine. | Iemand anders de schuld van de machine laten dragen. |

## 3.4 Epilogue ("What became of everyone")

| English | Nederlands |
|---|---|
| Walter wrote down that you shrugged at a Split and left both rules standing. | Walter schreef op dat je bij een Split schouderophaalde en beide regels liet staan. |

---

# 4. Interface

## 4.1 Start screen

| Where | English | Nederlands |
|---|---|---|
| Title | SPLIT DECISION | SPLIT DECISION (unchanged) |
| Tagline 1 | A bowling game in which every frame starts with a decision. | Een bowlingspel waarin elk frame begint met een beslissing. |
| Tagline 2 | Walter, the heron who runs the alley, is setting up the pins. | Walter, de reiger die het bowlingcentrum runt, zet de kegels neer. |
| Tagline 3 | Every decision you make goes on the board as a house rule. | Elke beslissing die je neemt komt als huisregel op het bord. |
| Tagline 4 | If you go against one of your own house rules, the alley calls a Split. | Als je tegen een van je eigen huisregels ingaat, roept het centrum een Split uit. |
| Fold-out | How it works | Hoe het werkt |
| Step 1 | Something is wrong with the lane. You get two options. | Er is iets mis met de baan. Je hebt twee opties. |
| Step 2 | Decide. With friends: talk, then vote. | Beslis. Met vrienden: praat en stem dan. |
| Step 3 | Bowl the lane you chose. Your pins are your own. | Gooi op de baan die je koos. Je kegels zijn van jezelf. |
| Step 4 | The alley remembers. Contradict yourself and it calls a Split. | Het centrum onthoudt het. Spreek jezelf tegen en het roept een Split uit. |
| Button | Quick game, five frames | Snel spel, vijf frames |
| Button | Full game, ten frames | Volledig spel, tien frames |
| Button | With friends, passing this device round | Met vrienden, dit apparaat doorgeven |
| Button | With friends, each on their own phone | Met vrienden, ieder op een eigen telefoon |
| Remembered rules | The alley remembers you: {rules} | Het centrum onthoudt jou: {rules} |
| Button | Wipe the board | Veeg het bord schoon |
| Account link, signed in | Signed in as {email} | Ingelogd als {email} |
| Account link, signed out | Sign in, if you like. Nothing needs it. | Log in als je wilt. Niets vereist het. |
| Footer, with a best score | Your best quick game alone: {n} pins. | Je beste snelle spel alleen: {n} kegels. |
| Footer, without | Playing alone stays on this device. Nothing leaves it. | Alleen spelen blijft op dit apparaat. Er verlaat niets het apparaat. |
| Sound button | Sound: on / Sound: off | Geluid: aan / Geluid: uit |
| Back button | Back to the start | Terug naar het begin |

## 4.2 Names (pass-and-play)

| Where | English | Nederlands |
|---|---|---|
| Heading | Who is bowling? | Wie bowlt er? |
| Help | Two to six names. You pass the device round for secret votes and for bowling. | Twee tot zes namen. Je geeft het apparaat door voor geheime stemmen en voor het gooien. |
| Placeholder | Bowler {n} | Bowler {n} |
| Input label | Name of bowler {n} | Naam van bowler {n} |
| Error | Pass-and-play needs at least two names. | Doorgeven vraagt minstens twee namen. |

## 4.3 Play online

| Where | English | Nederlands |
|---|---|---|
| Heading | Play online | Online spelen |
| Help | Everyone joins the same team, each on their own phone or computer. No account needed. | Iedereen sluit aan bij hetzelfde team, ieder op een eigen telefoon of computer. Geen account nodig. |
| Placeholder | Your name | Je naam |
| Button | Start a new team | Begin een nieuw team |
| Placeholder | Team id, six characters | Team-id, zes tekens |
| Input label | Team id | Team-id |
| Button | Join that team | Sluit aan bij dat team |
| Default name | Bowler | Bowler |

## 4.4 Account

| Where | English | Nederlands |
|---|---|---|
| Heading (signed in) | Your account | Je account |
| Help | Your games and the rules the alley remembers of you follow you to any device you sign in on. | Je spellen en de regels die het centrum van je onthoudt volgen je naar elk apparaat waarop je inlogt. |
| History row | {date} / {n} pins / {n} frames, with a team / alone | {date} / {n} kegels / {n} frames, met een team / alleen |
| Empty | No games on record yet. | Nog geen spellen vastgelegd. |
| Button | Sign out | Uitloggen |
| Heading (signed out) | Sign in | Inloggen |
| Help | Optional. An account keeps your games and remembered rules across devices. There is no password: you get a six-digit code by email. | Optioneel. Een account bewaart je spellen en onthouden regels over apparaten heen. Er is geen wachtwoord: je krijgt een zescijferige code per e-mail. |
| After sending | A code is on its way to {email}. It works for ten minutes. | Er is een code onderweg naar {email}. Hij werkt tien minuten. |
| Placeholder | Six-digit code | Zescijferige code |
| Button | Sign in | Inloggen |
| Button | Use a different address | Gebruik een ander adres |
| Placeholder | Email address | E-mailadres |
| Button | Send me a code | Stuur me een code |

## 4.5 Lobby

| Where | English | Nederlands |
|---|---|---|
| Heading | Team {id} | Team {id} |
| Help | Others join by typing this id, or by pointing their phone camera at the code. | Anderen sluiten aan door dit id in te typen, of door hun telefooncamera op de code te richten. |
| Remembered | The alley remembers this team: {rules} | Het centrum onthoudt dit team: {rules} |
| Member suffix | (you) / , away | (jij) / , weg |
| Host waiting | Waiting for at least one more bowler. | Wachten op minstens één bowler meer. |
| Guest waiting | Waiting for {name} to start the game. | Wachten tot {name} het spel start. |

## 4.6 During the game

| Where | English | Nederlands |
|---|---|---|
| Top bar | Frame {n}/{m} · {p} pins | Frame {n}/{m} · {p} kegels |
| Top bar, Liar Board | {p} pins (wrong) | {p} kegels (fout) |
| Button | House Rules · {n} | Huisregels · {n} |
| Panel | House Rules | Huisregels |
| Panel | Every decision adds a rule here. Go against one later and the alley calls a Split. | Elke beslissing voegt hier een regel toe. Ga later tegen een regel in en het centrum roept een Split uit. |
| Panel (empty) | No rules yet. | Nog geen regels. |
| Button | Leave this game | Verlaat dit spel |
| Card, group | No talking. Everyone chooses in private. | Niet praten. Iedereen kiest in het geheim. |
| Card, group | Talk it over. Then everyone votes in private, and the majority decides. | Praat erover. Daarna stemt iedereen in het geheim, en de meerderheid beslist. |
| Button | Start choosing | Begin met kiezen |
| Button | We are ready to vote | We zijn klaar om te stemmen |
| Button (alone) | What can I do? | Wat kan ik doen? |
| Online waiting | Your vote is in. Waiting for the others: {n} of {m} have voted. | Je stem is binnen. Wachten op de anderen: {n} van {m} hebben gestemd. |
| Pass-and-play | Pass the device to {name}. Nobody else looks. | Geef het apparaat aan {name}. Niemand anders kijkt. |
| Button | I am {name} | Ik ben {name} |
| Vote prompt | {name}, your choice: / {name}, your vote: | {name}, jouw keuze: / {name}, jouw stem: |
| Button | Read the problem again | Lees het probleem nog eens |

## 4.7 Split screen

| Where | English | Nederlands |
|---|---|---|
| Heading | SPLIT! | SPLIT! |
| Origin: remembered | The alley remembers this rule from an earlier night: | Het centrum onthoudt deze regel van een eerdere avond: |
| Origin: reason | At an earlier Split, in {card}, {the group / you} gave a reason, and it became this rule: | Bij een eerdere Split, in {card}, gaf {de groep / je} een reden, en die werd deze regel: |
| Origin: taken back | At an earlier Split, in {card}, {the group / you} took a rule back, and this rule replaced it: | Bij een eerdere Split, in {card}, nam {de groep / je} een regel terug, en deze regel verving hem: |
| Origin: choice | Earlier tonight, in {card}, {the group / you} chose {option}. That put this rule on the board: | Eerder vanavond, in {card}, koos {de groep / je} {option}. Dat zette deze regel op het bord: |
| Now | Now {the group / you} chose {option}. That goes against this rule, so the alley calls a Split. | Nu koos {de groep / je} {option}. Dat gaat tegen deze regel in, dus het centrum roept een Split uit. |
| Explain prompt | Why is this case different? Pick the reason closest to yours. It becomes a rule on the board, and later choices can go against it too. | Waarom is deze zaak anders? Kies de reden die het dichtst bij de jouwe ligt. Hij wordt een regel op het bord, en latere keuzes kunnen er ook tegenin gaan. |
| Button | Back to the ways out | Terug naar de uitwegen |
| Ways out prompt | Decide together what to do about it. / What do you want to do about it? | Beslis samen wat je eraan doet. / Wat wil je eraan doen? |
| Option | Explain the difference | Leg het verschil uit |
| Option help | Say why the two cases are not the same. Your reason is added to the board as a new rule. | Zeg waarom de twee gevallen niet hetzelfde zijn. Je reden wordt als nieuwe regel aan het bord toegevoegd. |
| Option | Take the earlier rule back | Neem de eerdere regel terug |
| Option help | The old rule is replaced by its opposite, or removed. This costs nothing. | De oude regel wordt vervangen door zijn tegenovergestelde, of verwijderd. Dit kost niets. |
| Option | Shrug | Schouderophalen |
| Option help | Leave the contradiction. Both rules stay, but next frame only the two far corner pins are set up. | Laat de tegenspraak. Beide regels blijven, maar volgend frame staan alleen de twee verste hoekkegels. |

(In Dutch "de groep" / "je" changes the verb: "koos de groep" but "koos je". Both read correctly in the templates above.)

## 4.8 Bowling

| Where | English | Nederlands |
|---|---|---|
| Waiting | Waiting for the others to finish bowling. | Wachten tot de anderen klaar zijn met gooien. |
| Strip | {name} bowls. | {name} gooit. |
| Strip | You have a wobbly ball: it swerves left and right. | Je hebt een wiebelige bal: hij zwabbert naar links en rechts. |
| Strip | You have a perfect ball: it steers itself towards the pins. | Je hebt een perfecte bal: hij stuurt zichzelf naar de kegels. |
| Strip | The lanes are dry, so every ball is slow. | De banen zijn droog, dus elke bal is traag. |
| Strip | Timo has left the machine room, so two pins are missing from every rack. | Timo heeft de machinekamer verlaten, dus er ontbreken twee kegels in elke set. |
| Strip | {n} or more pins counts as ten. | {n} of meer kegels telt als tien. |
| Strip | Bumpers are up, so the ball cannot fall in the gutter. | De bumpers staan omhoog, dus de bal kan niet in de goot vallen. |
| Strip | Only the two corner pins are set up, because of the shrug at the Split. | Alleen de twee hoekkegels staan, vanwege het schouderophalen bij de Split. |
| Slider | Where | Waar |
| Slider | How hard | Hoe hard |
| Slider | Curve | Draai |
| Slider label | Where the ball starts, left to right | Waar de bal begint, van links naar rechts |
| Slider label | How hard to throw | Hoe hard te gooien |
| Slider label | Curve, left to right | Draai, van links naar rechts |
| Button | Throw | Gooi |
| Button | Back to flicking | Terug naar vegen |
| Button | Throw without flicking | Gooi zonder te vegen |
| Canvas label | Bowling lane. Drag back and flick to throw. | Bowlingbaan. Sleep naar achteren en veeg om te gooien. |
| Note | Nine pins. You hit the Fat Man. | Negen kegels. Je raakte de Dikke Man. |
| Note | STRIKE! | STRIKE! |
| Note | spare! | spare! |
| Note | No pins. | Geen kegels. |
| Note | {n} down | {n} omgevallen |
| Note | The confetti cannon misfired. | Het confettikanon ging verkeerd af. |
| Note | You hit the golden pin. It counts as one pin, like the others. | Je raakte de gouden kegel. Hij telt als één kegel, net als de andere. |
| Pop-up | Shrug noted. | Schouderophalen genoteerd. |
| Pop-up | Decided. | Besloten. |
| Pop-up | Everyone has chosen. | Iedereen heeft gekozen. |

## 4.9 After the frame and end screen

| Where | English | Nederlands |
|---|---|---|
| Heading (group) | This frame | Dit frame |
| Heading (alone) | {n} pin / {n} pins | {n} kegel / {n} kegels |
| Button | Next frame | Volgend frame |
| Button | Total it up | Tel het op |
| Heading | Closing time | Sluitingstijd |
| Winner | The night's winner: {name} | De winnaar van de avond: {name} |
| Score line | {name} {n} pins | {name} {n} kegels |
| Solo | {n} pins | {n} kegels |
| New best | — a new best. | — een nieuw record. |
| Heading | The House Record | Het Huisrecord |
| Counters | Splits explained: {n} (stood by in a twist: {m}) · taken back: {n} · shrugged: {n} | Splits uitgelegd: {n} (aan vastgehouden in een twist: {m}) · teruggenomen: {n} · schouderopgehaald: {n} |
| Empty board | The board is empty: no rules were made tonight. | Het bord is leeg: er zijn vanavond geen regels gemaakt. |
| Heading | What became of everyone | Wat er van iedereen werd |
| Heading | Receipts / Your receipt | Bonnetjes / Je bonnetje |
| Fold-out | What these dilemmas were about | Waar deze dilemma's over gingen |
| Waiting for host | Waiting for {name} to start another game. | Wachten tot {name} nog een spel start. |
| Waiting for host (no name) | the host | de host |

## 4.10 Characters and tap-to-speak lines

Character descriptions (cast sheet, dev only):

| Name | English | Nederlands |
|---|---|---|
| Walter | A heron who runs the alley. He reads out each dilemma and calls the Splits. | Een reiger die het bowlingcentrum runt. Hij leest elk dilemma voor en roept de Splits uit. |
| The Fat Man | A large, cheerful regular who often stands too close to the lanes. Hitting him knocks down nine pins. | Een grote, vrolijke stamgast die vaak te dicht bij de banen staat. Hem raken laat negen kegels vallen. |
| Lotte | A girl having her eighth birthday party at lane 4. There is a cake. | Een meisje dat op baan 4 haar achtste verjaardagsfeestje viert. Er is een taart. |
| The five geese | Five geese who sit at the end of lane 3 and untangle the pins. | Vijf ganzen die aan het eind van baan 3 zitten en de kegels ontwarren. |
| Kees | A raccoon who works as the cleaner. He carries a mop and a bucket. | Een wasbeer die als schoonmaker werkt. Hij draagt een dweil en een emmer. |
| Marga | A cat who works at the shoe counter. She predicts what customers will choose and has never been wrong. | Een kat die bij de schoenenbalie werkt. Ze voorspelt wat klanten kiezen en heeft zich nooit vergist. |
| The angry man | A bull with a 16-pound ball and a grudge against the Fat Man. | Een stier met een bal van 16 pond en een wrok tegen de Dikke Man. |
| Ruud | A fox and a regular player, who stole rental shoes and is sorry about it. | Een vos en een stamspeler, die huurschoenen stal en daar spijt van heeft. |
| Timo | A mole who sets the pins by hand in the machine room. | Een mol die de kegels met de hand neerzet in de machinekamer. |

Lines said when you tap a character (several per character, picked at random):

| Who | English | Nederlands |
|---|---|---|
| Vending machine | Sold out. / Out of order. / The machine keeps your coin. | Uitverkocht. / Buiten werking. / De machine houdt je munt. |
| Pigeon | coo / The pigeon walks away. | roekoe / De duif loopt weg. |
| Geese | HONK. / Honk? | TOET. / Toet? |
| Old geese | We won the championship here in 1987. / honk | Wij wonnen hier in 1987 het kampioenschap. / toet |
| Fat Man | Would you like a nacho? / Am I in the way here? | Wil je een nacho? / Sta ik hier in de weg? |
| Kees | I am Kees, the cleaner. / Careful, the floor is wet. / I just mopped there. | Ik ben Kees, de schoonmaker. / Voorzichtig, de vloer is nat. / Daar heb ik net gedweild. |
| Lotte | I am Lotte. It is my birthday today. / Would you like some cake? | Ik ben Lotte. Ik ben vandaag jarig. / Wil je een stuk taart? |
| Walter | I am Walter. I run this alley. / Drag back and flick to bowl. | Ik ben Walter. Ik run dit bowlingcentrum. / Sleep naar achteren en veeg om te gooien. |
| Marga | I am Marga. I work at the shoe counter. / I knew you would tap me. | Ik ben Marga. Ik werk bij de schoenenbalie. / Ik wist dat je op mij zou tikken. |
| Timo | I am Timo. I set the pins. / I would like to bowl one day. | Ik ben Timo. Ik zet de kegels neer. / Ik zou graag eens willen bowlen. |
| Angry man | WHERE IS HE? | WAAR IS HIJ? |
| Ruud | I am Ruud. / I am sorry about the shoes. | Ik ben Ruud. / Het spijt me van de schoenen. |
| Jar | clink | kling |
| Curtain | You may not look behind the curtain. | Je mag niet achter het gordijn kijken. |
| Cake | squish | splat |
| Tray | crunch | knars |
| Scoreboard | This is the scoreboard. | Dit is het scorebord. |
| Good ball | This ball rolls straight. | Deze bal rolt recht. |
| Runaway ball | The ball keeps rolling. | De bal blijft rollen. |
| Lever | The lever does not move yet. | De hendel beweegt nog niet. |

## 4.11 Things said by characters during each scene (speech bubbles)

| Scene | English | Nederlands |
|---|---|---|
| The Switch | honk honk / HONK? / La la la. | toet toet / TOET? / La la la. |
| Two Good Balls | After you. / That one is mine! / Hm. | Na jou. / Die is van mij! / Hm. |
| The Fat Man | honk honk / HONK? / Nachos. | toet toet / TOET? / Nacho's. |
| The Trapdoor | honk honk / HONK? / This floor feels strange. | toet toet / TOET? / Deze vloer voelt vreemd. |
| The Loop | honk honk / HONK? / Just mopping. | toet toet / TOET? / Ik ben maar aan het dweilen. |
| The Staff Shirt | honk honk / HONK? / I work here now. | toet toet / TOET? / Ik werk hier nu. |
| The Nacho | Nacho! / hkk! / Oh no. | Nacho! / hkk! / Oh nee. |
| The Jar | clink / This is for a child at another alley. | kling / Dit is voor een kind in een ander bowlingcentrum. |
| The Screen | LIVE / hello? / hkk | LIVE / hallo? / hkk |
| The Crowd | hkk! / Somebody should help her. / Not me. / ... / honk. | hkk! / Iemand moet haar helpen. / Ik niet. / ... / toet. |
| The Voucher | It is real. / I checked. | Hij is echt. / Ik heb het gecontroleerd. |
| The Veil | I am drawing the lanes. / honk? | Ik trek de banen. / toet? |
| The Tray | For me? / HONK. | Voor mij? / TOET. |
| The Weighted Ball | This ball was weighted. / It has been like that all night. | Deze bal was verzwaard. / Dat is de hele avond al zo. |
| The Blind Throw | Blindfolded! / Me too! / MY CAKE. | Geblinddoekt! / Ik ook! / MIJN TAART. |
| The Sneeze | ah... / CHOO | ha... / HATSJOE |
| The Foul Line | The sensor is broken. / Nobody saw it. | De sensor is kapot. / Niemand zag het. |
| The Lucky Ball | I kept every part. | Ik heb elk onderdeel bewaard. |
| The Champions | Our lane, please. / HONK! | Onze baan, alstublieft. / TOET! |
| The Return | That is a copy. / You may be a copy too. | Dat is een kopie. / Jij bent misschien ook een kopie. |
| Bumper Heaven | STRIKE! / The pins are only on a screen. | STRIKE! / De kegels staan alleen op een scherm. |
| The Rounding | +1 / One extra pin, every frame. | +1 / Eén extra kegel, elk frame. |
| The Boy in the Machine Room | ... / May I bowl? | ... / Mag ik bowlen? |
| The Question | Well? / I can wait. | Nou? / Ik kan wachten. |
| The Angry Bowler | shh / WHERE IS HE. / WELL? | sst / WAAR IS HIJ. / NOU? |
| The Technique | Watch this. / Good, right? | Kijk eens. / Goed, hè? |
| The Shoe Thief | They are all back! / I counted. / Sorry. | Ze zijn allemaal terug! / Ik heb geteld. / Sorry. |
| The Broken Machine | clunk / Not me. | klonk / Ik niet. |
| The Culprit | They think it was me. | Ze denken dat ik het was. |
| The Glitch | bzzt / +3 ? | bzzt / +3 ? |
| The Tip Jar | For the oil. / clink | Voor de olie. / kling |
| The Curtain | I already know what you will choose. | Ik weet al wat je gaat kiezen. |
| The Heap | Ten. / Nine. / Is it still a full rack? | Tien. / Negen. / Is het nog een volle set? |
| Micro-pins | They are very small. / They do not look happy. | Ze zijn heel klein. / Ze zien er niet blij uit. |
| The Screaming Pins | AAAA / The screaming comes from the pins. | AAAA / Het geschreeuw komt van de kegels. |
| The Note | please stop / please | stop alsjeblieft / alsjeblieft |
| The Hungry Regular | I enjoy nachos a hundred times more than you. / It has been measured. | Ik geniet honderd keer meer van nacho's dan jij. / Het is gemeten. |
| Buridan's Lanes | Left? / Or right? / They are exactly the same. | Links? / Of rechts? / Ze zijn precies hetzelfde. |

## 4.12 Texts drawn on the lane

| Where | English | Nederlands |
|---|---|---|
| Ad 1 | SHOES: NOW WITH LACES | SCHOENEN: NU MET VETERS |
| Ad 2 | ASK ABOUT OUR FLOOR | VRAAG NAAR ONZE VLOER |
| Ad 3 | LANE 4 IS FINE | BAAN 4 IS PRIMA |
| Ad 4 | NACHOS ARE A VEGETABLE | NACHO'S ZIJN EEN GROENTE |
| Ad 5 | NO REFUNDS ON PRINCIPLES | GEEN RESTITUTIE OP PRINCIPES |
| Ad 6 | THE PIGEON IS NOT STAFF | DE DUIF IS GEEN PERSONEEL |
| Ad 7 | TRY THE GUTTER. EVERYONE DOES | PROBEER DE GOOT. IEDEREEN DOET HET |
| Ad 8 | WE HAVE ALWAYS BEEN OPEN | WIJ ZIJN ALTIJD OPEN GEWEEST |
| Lane sign | LANE 3 | BAAN 3 |

---

# 5. Server messages

## 5.1 Login email

| Part | English | Nederlands |
|---|---|---|
| Subject | {code} is your Split Decision code | {code} is je Split Decision-code |
| Body | Your code for Split Decision is {code}.<br><br>It works for ten minutes. If you did not ask for it, you can ignore this mail.<br><br>Walter, at Split Decision | Je code voor Split Decision is {code}.<br><br>Hij werkt tien minuten. Als je er niet om hebt gevraagd, kun je deze mail negeren.<br><br>Walter, van Split Decision |

## 5.2 Error messages

| Where | English | Nederlands |
|---|---|---|
| Login | Too many codes asked for. Try again in ten minutes. | Er zijn te veel codes aangevraagd. Probeer het over tien minuten opnieuw. |
| Login | That does not look like an email address. | Dat lijkt niet op een e-mailadres. |
| Login | No new accounts can be made right now. Try again tomorrow; you can play without one. | Er kunnen nu geen nieuwe accounts worden gemaakt. Probeer het morgen opnieuw; je kunt ook zonder account spelen. |
| Login | That code is wrong or has expired. | Die code is onjuist of verlopen. |
| Connection | The alley is full right now. Try again in a little while, or play on this device. | Het centrum zit nu vol. Probeer het zo meteen opnieuw, of speel op dit apparaat. |
| Connection | Too many connections from your network. Close a few tabs and try again. | Te veel verbindingen vanaf je netwerk. Sluit een paar tabbladen en probeer het opnieuw. |
| Team | That team is in the middle of a game. Ask them to let you in after this one. | Dat team zit midden in een spel. Vraag of je na dit spel mag aansluiten. |
| Team | That team is full: six bowlers is the limit. | Dat team zit vol: zes bowlers is het maximum. |
| Team | Slow down a little: the alley cannot keep up. | Doe het wat rustiger aan: het centrum kan het niet bijhouden. |
| Team | The alley has no room for new teams right now. Join an existing team, or play on this device. | Het centrum heeft nu geen plek voor nieuwe teams. Sluit aan bij een bestaand team, of speel op dit apparaat. |
| Team | Too many new teams in a short time. Try again in a while, or join an existing team. | Te veel nieuwe teams in korte tijd. Probeer het over een tijdje opnieuw, of sluit aan bij een bestaand team. |
| Team | Too many tries. Wait a minute, then check the team id. | Te veel pogingen. Wacht een minuut en controleer dan het team-id. |
| Team | No team with that id. Check the six characters. | Geen team met dat id. Controleer de zes tekens. |
| Client | Something went wrong. | Er ging iets mis. |
| Client | The server cannot be reached. | De server is niet bereikbaar. |
| Client | The game server cannot be reached. | De spelserver is niet bereikbaar. |

## 5.3 Page

| Where | English | Nederlands |
|---|---|---|
| Browser tab title | Split Decision | Split Decision |
| Language attribute | en | nl |

---

# Points for you to decide

1. **je or u.** I used je/jij throughout.
2. **"de Dikke Man".** Literal, but could be taken as rude. Alternative: "de Grote Man".
3. **"Split".** Left in English as a game term. A Dutch word would be "Breuk" or "Tegenspraak".
4. **"kegels" for the score unit.** In Dutch bowling the score is normally counted in points ("punten"). "Kegels" is literal to the English "pins". Say if you want "punten" for the score and "kegels" only for the objects.
5. **Jokes I read as literal:** "The old ones tip better" (fooi), "Luck is worn in over time", "The Veil", "The Heap" (De Hoop).
6. **Plurals in the House Record title:** check section 3.2.
