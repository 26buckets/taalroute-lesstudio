export type ProfielId = "bow" | "taalroute" | "erk" | "staatsexamen" | "zroute" | "mbo";
export type DidactischModelId = "vut" | "abcd" | "edi" | "taakgericht" | "terugplannen";

export const profielInfo = {
  bow: { label: "BOW Kwaliteitsprofiel", uitleg: "Doelgericht, activerend, praktijkgericht, toetsgericht en zichtbaar opgebouwd volgens VUT." },
  taalroute: { label: "Taalroute Profiel", uitleg: "Praktijkkern, werkbrug, digitale verlenging, hybride online deelname en taakgerichte afsluiting." },
  erk: { label: "ERK Niveauprofiel", uitleg: "Can do doelen, vaardigheidsontwikkeling en niveau passende output." },
  staatsexamen: { label: "NT2-examenprofiel", uitleg: "Examenvaardigheid, strategie, taakuitvoering, tijdsdruk en beoordelingscriteria." },
  zroute: { label: "Z-route Alfabeta+ profiel", uitleg: "Praktische taal, herhaling, mondelinge interactie, veiligheid en haalbare buitenschoolse opdrachten." },
  mbo: { label: "Beroepsgericht profiel", uitleg: "Beroepshandeling, vaktaal, werknemersvaardigheden, veiligheid en werkcontext." }
} as const;

export const profielAandacht: Record<ProfielId, string[]> = {
  bow: ["De docent bewaakt lesdoel, VUT, actieve deelname en feedback.", "De cursist oefent taal in een herkenbare praktijksituatie.", "De docent maakt voortgang en volgende stap zichtbaar.", "De les bevat begripcheck, differentiatie en praktijkleren."],
  taalroute: ["De docent verbindt thema, boek, ELO en praktijktaak.", "De cursist gebruikt kernwoorden en taalpatronen uit de methode.", "De les volgt de Taalroute opbouw van input naar toepassing.", "De terugblik sluit aan bij Wat kan ik nu."],
  erk: ["De docent kiest taal, steun en taak passend bij het ERK niveau.", "De cursist werkt aan een concreet can do doel.", "De docent maakt succescriteria zichtbaar.", "De taak laat groei naar zelfstandigheid zien."],
  staatsexamen: ["De docent verbindt de les aan taaktype, strategie en beoordelingscriteria.", "De cursist oefent met tijdsbewaking en duidelijke taakuitvoering.", "De feedback leidt tot verbetering van een examenonderdeel.", "Het huiswerk bereidt voor op een volgende examenoefening."],
  zroute: ["De docent gebruikt eenvoudige taal, beeldsteun en herhaling.", "De cursist oefent met voordoen, nadoen en korte zinnen.", "De taak past bij dagelijks leven of participatie.", "De buitenopdracht is kort, veilig en haalbaar."],
  mbo: ["De docent verbindt taal aan branche, vaktaal en werkcontext.", "De cursist oefent een beroepshandeling met praktische zinnen.", "De taak gaat over instructies, veiligheid, samenwerken of melden.", "De feedback richt zich op werktaal en werknemersvaardigheden."]
};

export const veldUitlegFallback = "Dit onderdeel helpt om de les concreet, controleerbaar en uitvoerbaar te maken.";
export const didactischeTipFallback = "Kies een korte aanpak die past bij doel, niveau en beschikbare lestijd.";

export const veldUitlegBank: Record<string, string> = {
  lesonderwerp: "Beschrijf kort waar de les over gaat. Bijvoorbeeld het thema, de taak of de vaardigheid die centraal staat.",
  groepsniveau: "Kies het niveau van de groep. Dit helpt om taal, taak en ondersteuning passend te maken.",
  standaard: "Kies het profiel waarmee je naar de les kijkt. Het profiel bepaalt welke kwaliteitspunten en suggesties belangrijk zijn.",
  didactischModel: "Kies hoe de les wordt opgebouwd. Het profiel bepaalt de kwaliteitsbril. Het didactisch model bepaalt de lesroute.",
  lesduur: "Kies hoeveel minuten de les duurt. De app gebruikt dit om de tijdsindeling logisch te verdelen.",
  aangepasteInstructies: "Gebruik dit veld voor extra afspraken, schoolregels, wensen of context die in deze les belangrijk is.",
  boekPaginas: "Beschrijf welk boek, thema, tekst, taak of welke pagina's centraal staan.",
  lesdoel: "Beschrijf concreet wat de cursist in deze les leert of oefent.",
  leeropbrengst: "Beschrijf wat de cursist aan het einde van de les kan laten zien, zeggen, schrijven of toepassen.",
  hoofdvaardigheid: "Kies de vaardigheid die in deze les centraal staat.",
  ondersteunendeVaardigheid: "Beschrijf welke vaardigheid de hoofdvaardigheid ondersteunt.",
  luisteren: "Beschrijf welke gesproken input cursisten verwerken.",
  lezen: "Beschrijf welke geschreven taal cursisten verwerken.",
  spreken: "Beschrijf hoe cursisten mondeling taal gebruiken.",
  schrijven: "Beschrijf wat cursisten schriftelijk produceren.",
  grammatica: "Beschrijf welke taalstructuur wordt geoefend en waarom die nodig is voor de taak.",
  uitspraak: "Beschrijf welke klank, klemtoon, verstaanbaarheid of spreekvloeiendheid aandacht krijgt.",
  receptieveInput: "Beschrijf welke input cursisten krijgen voordat zij zelf taal gebruiken.",
  productieveTaak: "Beschrijf wat cursisten zelf met taal produceren.",
  taalfocus: "Beschrijf welk taalaspect extra aandacht krijgt. Bijvoorbeeld woorden, zinnen, uitspraak, spelling of taalhandeling.",
  examenrelevantie: "Beschrijf hoe de les helpt richting toetsing, examen of beoordeling.",
  benodigdMateriaal: "Noteer wat de docent nodig heeft om de les uit te voeren.",
  vutVooruitkijken: "Beschrijf hoe je de les start met doel, context, voorkennis en verwachting.",
  vutUitvoeren: "Beschrijf wat cursisten actief doen tijdens de kern van de les.",
  vutTerugkijken: "Beschrijf hoe cursisten terugkijken op opbrengst en vervolgstap.",
  faseInput: "A Input betekent dat cursisten eerst taal ontvangen via tekst, audio, beeld, dialoog, voorbeeld of uitleg.",
  faseReproductie: "B Reproductie betekent dat cursisten nieuwe taal veilig herhalen, nazeggen, aanvullen of nadoen.",
  faseGestuurdeProductie: "C Gestuurde productie betekent dat cursisten de taal zelf gebruiken met steun, voorbeeld, stappenplan of taalhulp.",
  faseVrijeProductie: "D Vrije productie betekent dat cursisten de taal zelfstandiger toepassen in een herkenbare taak.",
  tijdsindeling: "Beschrijf de lesfasen met minuten. De indeling moet passen bij lesduur, profiel en didactisch model.",
  woordenschatactiviteit: "Beschrijf hoe woorden worden aangeboden, herhaald, gecontroleerd en actief gebruikt.",
  instructieDocent: "Beschrijf wat de docent uitlegt, voordoet of modelleert.",
  momentCursistAanHetWoord: "Beschrijf wanneer cursisten actief spreken in tweetallen, groepjes of klassikaal.",
  functioneleTaak: "Beschrijf een herkenbare taak waarin cursisten taal gebruiken voor een echte situatie.",
  checkOpBegrip: "Beschrijf hoe je controleert of cursisten uitleg, tekst, opdracht of instructie begrijpen.",
  werkvormActieveDeelname: "Beschrijf de werkvorm waardoor cursisten zichtbaar meedoen.",
  differentiatie: "Beschrijf hoe je rekening houdt met verschillen in niveau, tempo en steunbehoefte.",
  werkklimaat: "Beschrijf hoe je zorgt voor een veilige en rustige leeromgeving.",
  intercultureelKlimaat: "Beschrijf hoe je ruimte maakt voor verschillende achtergronden en ervaringen.",
  praktijklerenLes: "Beschrijf welke praktijksituatie in de les wordt geoefend.",
  praktijklerenBuitenLes: "Beschrijf welke korte opdracht cursisten buiten de les uitvoeren.",
  hybrideOpdracht: "Beschrijf hoe cursisten in de klas en online aan dezelfde taak werken.",
  onlineInteractie: "Beschrijf hoe online cursisten actief meedoen.",
  feedbackmoment: "Beschrijf wanneer en waarop cursisten feedback krijgen.",
  voortgangsbewaking: "Beschrijf hoe je ziet of cursisten vooruitgaan.",
  terugblikOpOpbrengst: "Beschrijf hoe cursisten aan het einde benoemen wat zij hebben geleerd of toegepast.",
  huiswerk: "Beschrijf huiswerk dat herhaalt en voorbereidt op de volgende les."
};

export const didactischeTipBank: Record<string, string[]> = {
  lesonderwerp: ["Maak het onderwerp herkenbaar voor cursisten.", "Kies liever een concrete taak dan een breed thema.", "Verbind het onderwerp aan boek, praktijk of examen."],
  groepsniveau: ["Controleer of taal, tempo en steun passen bij de groep.", "Plan extra taalhulp bij niveauverschillen.", "Laat de taak makkelijker of moeilijker worden zonder het doel te veranderen."],
  standaard: ["Gebruik het profiel als kwaliteitsbril, niet als extra formulier.", "Laat het profiel bepalen waar je scherper op let.", "Kies het profiel dat het best past bij het doel van deze les."],
  didactischModel: ["Kies het model voordat je de tijd verdeelt.", "Gebruik VUT als basis en kies ABCD, EDI of taakgericht als de les daarom vraagt.", "Laat het model zichtbaar terugkomen in de volgorde van activiteiten."],
  lesduur: ["Reserveer altijd tijd voor terugblik.", "Bij korte lessen hoort minder uitleg en meer focus.", "Bij lange lessen helpt een pauze of duidelijke overgang."],
  aangepasteInstructies: ["Zet hier alleen context die de les echt stuurt.", "Gebruik dit veld voor afspraken die anders vergeten worden.", "Maak extra instructies kort en uitvoerbaar."],
  boekPaginas: ["Koppel boekinhoud direct aan verwerking.", "Gebruik niet te veel pagina's in één les.", "Laat duidelijk worden welke tekst of taak de kern vormt."],
  lesdoel: ["Formuleer het doel vanuit gedrag van de cursist.", "Controleer of het doel aan het einde zichtbaar kan worden.", "Vermijd meerdere grote doelen in één les."],
  leeropbrengst: ["Maak de opbrengst kleiner dan het doel als dat nodig is.", "Kies iets wat cursisten echt kunnen tonen.", "Gebruik de opbrengst als basis voor de terugblik."],
  hoofdvaardigheid: ["Laat één vaardigheid echt centraal staan.", "Voorkom dat alle vaardigheden tegelijk hoofdvaardigheid worden.", "Koppel de hoofdvaardigheid aan de belangrijkste taak."],
  ondersteunendeVaardigheid: ["Kies alleen steun die de hoofdtaak helpt.", "Gebruik luisteren of lezen vaak als voorbereiding op spreken of schrijven.", "Maak de ondersteunende vaardigheid kort en functioneel."],
  luisteren: ["Laat cursisten gericht luisteren met een doel.", "Gebruik korte luistervragen voordat details komen.", "Herhaal input als het niveau daarom vraagt."],
  lezen: ["Laat cursisten eerst globaal lezen en daarna gericht zoeken.", "Kies een tekst die past bij taak en niveau.", "Koppel lezen aan spreken of schrijven."],
  spreken: ["Geef taalsteun voordat cursisten spreken.", "Plan genoeg wachttijd en herhaling.", "Laat cursisten eerst in tweetallen oefenen."],
  schrijven: ["Geef een voorbeeldtekst of zinsstarter.", "Maak het schrijfproduct kort en bruikbaar.", "Laat cursisten verbeteren op één duidelijk punt."],
  grammatica: ["Koppel grammatica aan betekenis en taak.", "Oefen vorm pas nadat de functie duidelijk is.", "Kies één taalstructuur per les."],
  uitspraak: ["Kies een uitspraakpunt dat de verstaanbaarheid helpt.", "Oefen kort, vaak en in betekenisvolle zinnen.", "Laat cursisten eerst horen en daarna nadoen."],
  receptieveInput: ["Input moet nodig zijn voor wat cursisten daarna doen.", "Gebruik beeld, voorbeeld of context om begrip te ondersteunen.", "Controleer input voordat cursisten produceren."],
  productieveTaak: ["Laat de productie een echte ontvanger of functie hebben.", "Bouw steun af als cursisten zelfstandiger worden.", "Geef feedback op begrijpelijkheid voordat je op details stuurt."],
  taalfocus: ["Kies één taalfocus die de taak beter maakt.", "Maak de taalfocus zichtbaar in voorbeeldzinnen.", "Laat cursisten de taalfocus meteen gebruiken."],
  examenrelevantie: ["Noem alleen examenrelevantie als de link concreet is.", "Koppel feedback aan criteria of strategie.", "Oefen eerst vaardigheid, daarna pas tijdsdruk."],
  benodigdMateriaal: ["Noteer ook digitale tools of online documenten.", "Controleer vooraf of online cursisten hetzelfde materiaal hebben.", "Houd materiaal eenvoudig en taakgericht."],
  vutVooruitkijken: ["Start kort en actief.", "Laat cursisten voorkennis ophalen voordat jij uitlegt.", "Maak doel en opbrengst zichtbaar in gewone taal."],
  vutUitvoeren: ["Wissel uitleg snel af met doen.", "Plan minstens één moment waarop iedereen actief taal gebruikt.", "Controleer begrip voordat cursisten zelfstandig werken."],
  vutTerugkijken: ["Laat cursisten zelf opbrengst benoemen.", "Gebruik de terugblik om huiswerk logisch te maken.", "Sluit af met één concrete vervolgstap."],
  faseInput: ["Input komt vóór productie.", "Maak input begrijpelijk met context en voorbeeld.", "Laat cursisten gericht zoeken naar woorden of zinnen."],
  faseReproductie: ["Reproductie geeft veiligheid voordat cursisten vrijer werken.", "Gebruik korte patronen en vaste zinnen.", "Laat cursisten hardop oefenen als spreken het doel is."],
  faseGestuurdeProductie: ["Geef steun, maar vraag wel eigen taalgebruik.", "Gebruik een stappenplan of taalkaart.", "Laat feedback direct tijdens het oefenen plaatsvinden."],
  faseVrijeProductie: ["Maak vrije productie niet te vroeg te vrij.", "Geef een herkenbare situatie en duidelijk doel.", "Beoordeel vooral of de boodschap overkomt."],
  tijdsindeling: ["Plan niet te veel onderdelen.", "Laat de meeste tijd naar oefenen en toepassen gaan.", "Reserveer altijd tijd voor feedback en terugblik."],
  woordenschatactiviteit: ["Ga van herkennen naar zelf gebruiken.", "Laat woorden terugkomen in de taak.", "Gebruik beeld, voorbeeldzin en herhaling."],
  instructieDocent: ["Houd uitleg kort en doe de taak voor.", "Controleer begrip voordat cursisten starten.", "Gebruik één stap tegelijk bij lage niveaus."],
  momentCursistAanHetWoord: ["Plan dit bewust, anders praat vooral de docent.", "Laat cursisten eerst veilig in tweetallen spreken.", "Geef online cursisten dezelfde spreekkans."],
  functioneleTaak: ["De taak moet lijken op taalgebruik buiten de les.", "Geef een doel, situatie en ontvanger.", "Laat cursisten de geoefende taal echt nodig hebben."],
  checkOpBegrip: ["Vraag niet alleen of alles duidelijk is.", "Laat cursisten tonen wat zij moeten doen.", "Gebruik de check vóór zelfstandig werken."],
  werkvormActieveDeelname: ["Kies een werkvorm waarin iedereen iets doet.", "Maak rollen of stappen duidelijk.", "Voorkom lange klassikale rondes."],
  differentiatie: ["Differentieer met steun, tijd of complexiteit.", "Maak een basisvariant en een uitbreidingsvariant.", "Laat sterke cursisten verdiepen zonder zwakkere cursisten kwijt te raken."],
  werkklimaat: ["Maak fouten normaal en bruikbaar.", "Zorg voor voorspelbare stappen.", "Gebruik duidelijke beurtverdeling."],
  intercultureelKlimaat: ["Vraag naar ervaringen zonder iemand te verplichten te delen.", "Gebruik verschillen als voorbeeld, niet als oordeel.", "Kies situaties die meerdere perspectieven toelaten."],
  praktijklerenLes: ["Maak de praktijksituatie zo concreet mogelijk.", "Laat cursisten oefenen met taal die buiten de les bruikbaar is.", "Gebruik echte formulieren, berichten of situaties als dat kan."],
  praktijklerenBuitenLes: ["Houd de buitenopdracht klein en veilig.", "Laat cursisten iets meenemen naar de volgende les.", "Geef een alternatief voor cursisten die de situatie niet kunnen uitvoeren."],
  hybrideOpdracht: ["Ontwerp online deelname vanaf het begin mee.", "Geef online cursisten een duidelijke rol.", "Werk met een gedeelde opbrengst voor klas en online."],
  onlineInteractie: ["Laat online cursisten vroeg reageren.", "Gebruik chat, microfoon of gedeeld document doelgericht.", "Controleer of online cursisten de instructie kunnen volgen."],
  feedbackmoment: ["Geef feedback terwijl cursisten nog kunnen verbeteren.", "Koppel feedback aan doel of succescriterium.", "Houd feedback kort en concreet."],
  voortgangsbewaking: ["Kies een klein bewijs van groei.", "Gebruik observatie, taakproduct of korte check.", "Noteer wat vervolgondersteuning vraagt."],
  terugblikOpOpbrengst: ["Laat cursisten een voorbeeld noemen.", "Gebruik dezelfde woorden als in het lesdoel.", "Maak de terugblik zichtbaar voor de volgende les."],
  huiswerk: ["Huiswerk moet haalbaar zijn zonder docent.", "Laat huiswerk herhalen én voorbereiden.", "Geef een korte opdracht die terugkomt in de volgende les."]
};

Object.assign(veldUitlegBank, {
  profielFocus: "Noteer welk profielaccent naast de BOW auditlijn extra belangrijk is.",
  themafase: "Kies waar de les zit in de methodeopbouw: orientatie, input, oefenen, toepassen, herhalen of toetsen.",
  praktijkkern: "Beschrijf de herkenbare praktijkkern van het thema.",
  werkbrug: "Beschrijf hoe de les een brug maakt naar werk, school, thuis of samenleving.",
  kernwoorden: "Noteer de belangrijkste woorden die cursisten moeten begrijpen en gebruiken.",
  taalpatronen: "Noteer vaste zinnen, routines of taalhandelingen die cursisten oefenen.",
  eloKoppeling: "Beschrijf welke digitale ELO-opdracht aansluit bij de les.",
  interactiveBook1: "Beschrijf de eerste online activiteit.",
  interactiveBook2: "Beschrijf de tweede online activiteit.",
  watKanIkNu: "Beschrijf wat de cursist na deze methode-stap concreet kan.",
  erkNiveau: "Noteer het ERK- of alfabetiseringsniveau waarop de taak is afgestemd.",
  canDoDoel: "Formuleer wat de cursist op dit niveau kan doen met taal.",
  mateVanSteun: "Beschrijf hoeveel steun de cursist krijgt bij de taak.",
  succescriteria: "Noteer waaraan je ziet dat de taak gelukt is.",
  differentiatieNiveau: "Beschrijf hoe de taak lichter of uitdagender wordt gemaakt.",
  bewijsVanOpbrengst: "Beschrijf welk product, gedrag of antwoord de opbrengst bewijst.",
  examenonderdeel: "Kies het examenonderdeel: lezen, luisteren, schrijven, spreken, KNM of ONA.",
  examenvaardigheid: "Beschrijf welke examenvaardigheid centraal staat.",
  examenstrategie: "Beschrijf de strategie die cursisten oefenen.",
  taaktype: "Beschrijf het type examen- of oefentaak.",
  tijdslimiet: "Noteer de beschikbare tijd of tijdsdruk.",
  beoordelingscriteria: "Beschrijf waarop de taak beoordeeld wordt.",
  oefenronde: "Beschrijf hoe cursisten eerst oefenen voordat zij verbeteren of presteren.",
  verbeteractie: "Beschrijf wat cursisten na feedback opnieuw proberen of verbeteren.",
  examenhuiswerk: "Beschrijf huiswerk dat direct voorbereidt op examenvaardigheid.",
  praktijksituatie: "Beschrijf de concrete situatie uit dagelijks leven of participatie.",
  eenvoudigLesdoel: "Formuleer het lesdoel in eenvoudige taal.",
  voordoen: "Beschrijf hoe de docent de taak voordoet.",
  samenOefenen: "Beschrijf hoe docent en cursisten samen oefenen.",
  mondelingeInteractie: "Beschrijf de korte spreek- of luisterinteractie.",
  beeldsteun: "Beschrijf welke afbeelding, kaart, pictogram of voorbeeldsteun wordt gebruikt.",
  herhalingsvorm: "Beschrijf hoe taal meerdere keren terugkomt.",
  praktijktaak: "Beschrijf de concrete handeling die cursisten uitvoeren.",
  buitenschoolseOpdracht: "Beschrijf de korte en veilige opdracht buiten de les.",
  terugblikEenvoudigeTaal: "Beschrijf de terugblik in woorden die passen bij de groep.",
  zrouteSteunlijn: "Beschrijf de steunlijn voor alfa A of cursisten die veel steun nodig hebben.",
  zrouteMiddenlijn: "Beschrijf de middenlijn voor alfa B of het basisniveau van de groep.",
  zroutePluslijn: "Beschrijf de pluslijn voor alfa C/A1 of cursisten die uitdaging aankunnen.",
  branche: "Noteer de branche of werksector.",
  werkcontext: "Beschrijf de werkplek of beroepssituatie.",
  beroepshandeling: "Beschrijf wat de cursist op de werkvloer doet.",
  vaktaal: "Noteer vakwoorden en vaste werkzinnen.",
  werknemersvaardigheid: "Beschrijf de werknemersvaardigheid die centraal staat.",
  instructietaal: "Beschrijf de taal van instructies, opdrachten of procedures.",
  samenwerking: "Beschrijf hoe cursisten samenwerken of overleggen.",
  veiligheid: "Beschrijf welk veiligheidsaspect in taal en handelen belangrijk is.",
  feedbackWerktaal: "Beschrijf feedback op werktaal, vaktaal of professioneel reageren.",
  transferWerkplek: "Beschrijf hoe de cursist de taal op stage of werkplek toepast."
});

Object.assign(didactischeTipBank, Object.fromEntries(Object.keys(veldUitlegBank).filter((key) => !didactischeTipBank[key]).map((key) => [key, [
  "Maak dit onderdeel concreet en uitvoerbaar.",
  "Koppel dit veld aan doel, niveau en taak.",
  "Laat de opbrengst zichtbaar worden in gedrag, taal of product."
]])));

export const lesVeldKeys = Object.keys(veldUitlegBank);

const veldBasis: Record<string, string> = {
  lesonderwerp: "De docent kiest een herkenbaar onderwerp dat past bij de groep.",
  groepsniveau: "De docent stemt taal, taak en steun af op het groepsniveau.",
  standaard: "De docent gebruikt het gekozen profiel als kwaliteitsbril voor de les.",
  didactischModel: "De docent bouwt de les op volgens het gekozen didactische model.",
  lesduur: "De docent verdeelt de lestijd over start, kern, toepassing, feedback en terugblik.",
  aangepasteInstructies: "De docent verwerkt extra afspraken of context in de voorbereiding.",
  boekPaginas: "De docent gebruikt het gekozen boek, thema, tekst of taak als basis.",
  lesdoel: "De cursist oefent doelgericht met taal die past bij niveau en context.",
  leeropbrengst: "De cursist laat aan het einde concreet zien wat hij heeft geleerd.",
  hoofdvaardigheid: "De cursist oefent de hoofdvaardigheid zichtbaar in de hoofdtaak.",
  ondersteunendeVaardigheid: "De cursist gebruikt een ondersteunende vaardigheid om de hoofdtaak beter uit te voeren.",
  luisteren: "De cursist verwerkt gesproken input die nodig is voor de taak.",
  lezen: "De cursist verwerkt geschreven taal die nodig is voor de taak.",
  spreken: "De cursist gebruikt mondelinge taal in een korte taak of interactie.",
  schrijven: "De cursist maakt een kort schriftelijk taalproduct.",
  grammatica: "De cursist oefent een taalstructuur die nodig is voor de taak.",
  uitspraak: "De cursist oefent verstaanbaarheid, klank, klemtoon of spreekvloeiendheid.",
  receptieveInput: "De cursist krijgt input voordat hij zelf taal produceert.",
  productieveTaak: "De cursist produceert taal met een duidelijk doel.",
  taalfocus: "De docent kiest een taalaspect dat extra aandacht krijgt.",
  examenrelevantie: "De docent verbindt de les aan toetsing, examen of beoordeling.",
  benodigdMateriaal: "De docent zet het materiaal klaar dat nodig is voor uitvoering.",
  vutVooruitkijken: "De docent start met doel, context, voorkennis en verwachting.",
  vutUitvoeren: "De cursist verwerkt input, oefent taal en past die toe.",
  vutTerugkijken: "De cursist kijkt terug op opbrengst en volgende stap.",
  faseInput: "De cursist ontvangt eerst betekenisvolle taalinput.",
  faseReproductie: "De cursist herhaalt nieuwe taal veilig met steun.",
  faseGestuurdeProductie: "De cursist gebruikt taal met voorbeeld, taalhulp of stappenplan.",
  faseVrijeProductie: "De cursist past taal zelfstandiger toe in een herkenbare taak.",
  tijdsindeling: "De docent plant de lesfasen met duidelijke minuten.",
  woordenschatactiviteit: "De cursist oefent woorden van betekenis naar actief gebruik.",
  instructieDocent: "De docent legt kort uit, doet voor en controleert begrip.",
  momentCursistAanHetWoord: "De cursist krijgt een zichtbaar spreekmoment.",
  functioneleTaak: "De cursist gebruikt taal in een herkenbare echte situatie.",
  checkOpBegrip: "De docent controleert of uitleg, tekst en opdracht begrepen zijn.",
  werkvormActieveDeelname: "De werkvorm zorgt dat cursisten zichtbaar meedoen.",
  differentiatie: "De docent past steun, tempo of uitdaging aan verschillen aan.",
  werkklimaat: "De docent zorgt voor rust, veiligheid en ruimte om te oefenen.",
  intercultureelKlimaat: "De docent maakt ruimte voor verschillende achtergronden en ervaringen.",
  praktijklerenLes: "De cursist oefent taal in een herkenbare praktijksituatie.",
  praktijklerenBuitenLes: "De cursist voert buiten de les een korte taalopdracht uit.",
  hybrideOpdracht: "De cursist werkt online of klassikaal aan dezelfde taak.",
  onlineInteractie: "De online cursist doet actief mee via chat, microfoon of gedeeld document.",
  feedbackmoment: "De docent geeft feedback op taalgebruik, begrip of taakuitvoering.",
  voortgangsbewaking: "De docent maakt zichtbaar of de cursist vooruitgaat.",
  terugblikOpOpbrengst: "De cursist benoemt wat hij heeft geleerd of toegepast.",
  huiswerk: "De cursist herhaalt de kern en bereidt de volgende les voor."
};

Object.keys(veldUitlegBank).forEach((veldKey) => {
  if (!veldBasis[veldKey]) veldBasis[veldKey] = "De docent maakt dit onderdeel concreet, uitvoerbaar en zichtbaar in de les.";
});

function vierBasiszinnen(veldKey: string) {
  const basis = veldBasis[veldKey];
  const stam = basis.replace(/\.$/, "");
  return [
    basis,
    `${stam} en koppelt dit aan het lesdoel.`,
    `${stam} met een korte en uitvoerbare opdracht.`,
    `${stam} en controleert de opbrengst aan het einde.`
  ];
}

export const basisDoelSuggesties: Record<string, string[]> = Object.fromEntries(
  lesVeldKeys.map((veldKey) => [veldKey, vierBasiszinnen(veldKey)])
);

function profielZinnen(profielId: ProfielId, veldKey: string) {
  return profielAandacht[profielId].map((zin) => `${veldBasis[veldKey]} ${zin}`);
}

const bow = {
  lesdoel: ["De cursist oefent doelgericht met taal die past bij het niveau en de praktijksituatie.", "De cursist weet wat hij oefent, waarom dit belangrijk is en hoe hij dit kan gebruiken.", "De cursist werkt toe naar een concrete taak waarin begrip en toepassing zichtbaar worden.", "De cursist gebruikt de taal uit deze les in een herkenbare situatie."],
  checkOpBegrip: ["De docent controleert met open vragen of cursisten de uitleg begrijpen.", "De cursist past de uitleg direct toe in een korte opdracht.", "De docent vraagt cursisten om in eigen woorden te zeggen wat zij moeten doen.", "De docent controleert begrip voordat cursisten zelfstandig verder werken."],
  feedbackmoment: ["De docent geeft korte feedback op taalgebruik, begrip en taakuitvoering.", "De cursist hoort wat goed gaat en wat de volgende stap is.", "Feedback wordt gekoppeld aan het lesdoel.", "De docent gebruikt observaties tijdens de werkvorm voor gerichte feedback."],
  voortgangsbewaking: ["De docent registreert kort wat de cursist al kan en waar extra oefening nodig is.", "De voortgang wordt zichtbaar via taakuitvoering, observatie of korte opbrengstcheck.", "De docent gebruikt de uitkomst van de les om vervolgondersteuning te bepalen.", "De cursist krijgt inzicht in de eigen ontwikkeling en volgende stap."]
};

const taalroute = {
  boekPaginas: ["Deze les sluit aan bij het thema, de kerntekst en de taak uit de methode.", "De les gebruikt de boektekst als input en verbindt die met mondelinge en schriftelijke verwerking.", "De les volgt de vaste Taalroute opbouw van input naar toepassing.", "De les bereidt voor op de ELO verwerking en de praktijktaak."],
  woordenschatactiviteit: ["De cursist herkent en gebruikt kernwoorden uit het thema.", "De woorden worden gekoppeld aan beeld, betekenis, voorbeeldzin en taak.", "De kernwoorden komen terug in boek, interactie, taak en ELO.", "De cursist gebruikt minimaal drie themawoorden actief in een zin of korte opdracht."],
  hybrideOpdracht: ["Online en klassikale cursisten werken aan dezelfde Taalroute taak.", "De online cursist gebruikt dezelfde kernwoorden en taalpatronen als de cursist in de klas.", "De hybride opdracht sluit aan bij de ELO en het boek.", "De opbrengst wordt kort gedeeld met de hele groep."],
  huiswerk: ["De cursist herhaalt woorden, zinnen of routines uit boek en ELO.", "Het huiswerk bereidt voor op de volgende Taalroute stap.", "De cursist maakt een korte opdracht die aansluit bij de werkbrug.", "De opdracht verbindt methode, ELO en praktijk."]
};

const erk = {
  lesdoel: ["De cursist werkt aan een can do doel dat past bij het gekozen ERK niveau.", "De cursist oefent een taalhandeling die past bij dit niveau en deze context.", "De cursist krijgt voldoende steun om de taak op dit niveau uit te voeren.", "De cursist laat zien wat hij zelfstandig of met steun kan begrijpen of produceren."],
  leeropbrengst: ["Aan het einde van de les kan de cursist een passende taak uitvoeren op het gekozen niveau.", "Aan het einde van de les kan de cursist met steun laten zien wat hij begrijpt of produceert.", "Aan het einde van de les is zichtbaar welke vaardigheid sterker is geworden.", "Aan het einde van de les kan de cursist benoemen wat de volgende stap is."],
  differentiatie: ["De docent past steun, tempo en taakcomplexiteit aan op het niveau van de cursist.", "Cursisten krijgen taalhulp of extra uitdaging passend bij hun niveau.", "De docent kijkt per vaardigheid wat de cursist al zelfstandig kan.", "De opdracht heeft een basisvariant en een uitbreidingsvariant."],
  productieveTaak: ["De cursist produceert taal die past bij het gekozen ERK niveau.", "De taak laat zien of de cursist het can do doel haalt.", "De productie is passend in lengte, complexiteit en zelfstandigheid.", "De docent beoordeelt de taak op begrijpelijkheid en niveaupassend taalgebruik."]
};

const staatsexamen = {
  examenrelevantie: ["De cursist oefent met een taaktype dat lijkt op een NT2-examenopdracht.", "De cursist gebruikt een passende examenstrategie.", "De cursist oefent met tijdsbewaking en duidelijke taakuitvoering.", "De docent koppelt feedback aan beoordelingscriteria."],
  tijdsindeling: ["De les bevat tijd voor instructie, oefenronde, uitvoering, feedback en verbetering.", "De cursist oefent eerst zonder tijdsdruk en daarna met beperkte tijd.", "De tijdsindeling maakt zichtbaar hoe examenstrategie wordt opgebouwd.", "De laatste fase wordt gebruikt voor correctie, reflectie en verbeteractie."],
  feedbackmoment: ["De docent geeft feedback op taakbegrip, strategie en antwoordkwaliteit.", "De feedback verwijst naar het beoordelingsmodel of de succescriteria.", "De cursist verbetert een onderdeel op basis van feedback.", "De docent benoemt concreet wat de cursist bij een volgende examenoefening moet doen."],
  huiswerk: ["De cursist maakt een korte examengerichte oefening ter voorbereiding op de volgende les.", "Het huiswerk richt zich op strategie, taakbegrip of taalverzorging.", "De cursist verbetert een eerdere opdracht met behulp van feedback.", "Het huiswerk sluit aan bij het geoefende examenonderdeel."]
};

const zroute = {
  lesdoel: ["De cursist oefent taal voor een concrete situatie uit dagelijks leven of participatie.", "De cursist kan met steun een korte vraag stellen of reactie geven.", "De cursist oefent een handeling die buiten de les direct herkenbaar is.", "De cursist gebruikt eenvoudige woorden en korte zinnen in een veilige setting."],
  werkvormActieveDeelname: ["De docent doet eerst voor en de cursist doet daarna mee.", "Cursisten oefenen in tweetallen met vaste zinnen en rolwisseling.", "De werkvorm gebruikt beeld, gebaar of voorbeeldkaart.", "De opdracht wordt meerdere keren herhaald met kleine variatie."],
  praktijklerenBuitenLes: ["De cursist kijkt buiten de les naar een herkenbare situatie en neemt een woord mee terug.", "De cursist probeert een korte vraag of zin uit in een veilige situatie.", "De cursist maakt een foto of notitie van een woord uit de omgeving.", "De opdracht is kort, duidelijk en zonder hoge taaldruk."],
  instructieDocent: ["De docent doet de opdracht zichtbaar voor en gebruikt korte taal.", "De docent ondersteunt met beeld, gebaar, herhaling en voorbeeldzin.", "De instructie bevat een duidelijke stap tegelijk.", "De docent controleert begrip door de cursist te laten nadoen."]
};

const mbo = {
  lesdoel: ["De cursist oefent taal die nodig is in een herkenbare werksituatie.", "De cursist gebruikt vaktaal en praktische zinnen voor een beroepshandeling.", "De cursist oefent met instructies, samenwerken of melden op de werkvloer.", "De cursist werkt toe naar een taak die past bij de gekozen branche."],
  functioneleTaak: ["De cursist voert een werkgerichte taak uit met passende vaktaal.", "De cursist vraagt hulp, geeft informatie door of reageert op een instructie.", "De taak lijkt op een situatie op stage, werk of praktijklocatie.", "De cursist gebruikt taal voor veiligheid, samenwerking of klantcontact."],
  praktijklerenLes: ["De les gebruikt een herkenbare situatie van de werkvloer.", "De cursist oefent taal die nodig is voor een beroepshandeling.", "De taak verbindt vaktaal met gedrag op de werkplek.", "De docent koppelt taal aan werknemersvaardigheden."],
  woordenschatactiviteit: ["De cursist oefent vaktaal die nodig is voor de beroepshandeling.", "De woorden worden gekoppeld aan materiaal, handeling, veiligheid of communicatie op de werkvloer.", "De cursist gebruikt vakwoorden in een instructie, melding of korte taak.", "De docent controleert of de cursist vaktaal begrijpt en functioneel gebruikt."]
};

const belangrijkeVelden: Record<ProfielId, string[]> = {
  bow: ["lesdoel", "leeropbrengst", "vutVooruitkijken", "vutUitvoeren", "vutTerugkijken", "tijdsindeling", "woordenschatactiviteit", "instructieDocent", "momentCursistAanHetWoord", "functioneleTaak", "checkOpBegrip", "werkvormActieveDeelname", "differentiatie", "werkklimaat", "intercultureelKlimaat", "praktijklerenLes", "praktijklerenBuitenLes", "hybrideOpdracht", "onlineInteractie", "feedbackmoment", "voortgangsbewaking", "terugblikOpOpbrengst", "huiswerk", "examenrelevantie"],
  taalroute: ["boekPaginas", "lesdoel", "leeropbrengst", "hoofdvaardigheid", "ondersteunendeVaardigheid", "receptieveInput", "productieveTaak", "taalfocus", "woordenschatactiviteit", "grammatica", "uitspraak", "functioneleTaak", "praktijklerenLes", "praktijklerenBuitenLes", "hybrideOpdracht", "onlineInteractie", "terugblikOpOpbrengst", "huiswerk", "examenrelevantie"],
  erk: ["groepsniveau", "lesdoel", "leeropbrengst", "hoofdvaardigheid", "ondersteunendeVaardigheid", "luisteren", "lezen", "spreken", "schrijven", "receptieveInput", "productieveTaak", "taalfocus", "functioneleTaak", "checkOpBegrip", "differentiatie", "feedbackmoment", "voortgangsbewaking", "terugblikOpOpbrengst", "huiswerk"],
  staatsexamen: ["lesdoel", "leeropbrengst", "hoofdvaardigheid", "ondersteunendeVaardigheid", "luisteren", "lezen", "spreken", "schrijven", "receptieveInput", "productieveTaak", "taalfocus", "examenrelevantie", "tijdsindeling", "instructieDocent", "functioneleTaak", "checkOpBegrip", "feedbackmoment", "voortgangsbewaking", "terugblikOpOpbrengst", "huiswerk"],
  zroute: ["lesdoel", "leeropbrengst", "luisteren", "spreken", "lezen", "schrijven", "receptieveInput", "productieveTaak", "woordenschatactiviteit", "uitspraak", "instructieDocent", "momentCursistAanHetWoord", "functioneleTaak", "checkOpBegrip", "werkvormActieveDeelname", "werkklimaat", "praktijklerenLes", "praktijklerenBuitenLes", "hybrideOpdracht", "onlineInteractie", "feedbackmoment", "terugblikOpOpbrengst", "huiswerk"],
  mbo: ["lesdoel", "leeropbrengst", "boekPaginas", "hoofdvaardigheid", "ondersteunendeVaardigheid", "luisteren", "lezen", "spreken", "schrijven", "receptieveInput", "productieveTaak", "woordenschatactiviteit", "taalfocus", "functioneleTaak", "checkOpBegrip", "werkvormActieveDeelname", "praktijklerenLes", "praktijklerenBuitenLes", "hybrideOpdracht", "onlineInteractie", "feedbackmoment", "voortgangsbewaking", "terugblikOpOpbrengst", "huiswerk", "examenrelevantie"]
};

const expliciet: Record<ProfielId, Record<string, string[]>> = { bow, taalroute, erk, staatsexamen, zroute, mbo };

export const profielDoelSuggesties: Record<ProfielId, Record<string, string[]>> = Object.fromEntries(
  (Object.keys(profielInfo) as ProfielId[]).map((profielId) => [
    profielId,
    Object.fromEntries(belangrijkeVelden[profielId].map((veldKey) => [veldKey, expliciet[profielId][veldKey] || profielZinnen(profielId, veldKey)]))
  ])
) as Record<ProfielId, Record<string, string[]>>;

export const didactischModelUitleg: Record<DidactischModelId, string[]> = {
  vut: ["Vooruitkijken betekent doel, context, voorkennis en verwachting activeren.", "Uitvoeren betekent input verwerken, oefenen, samenwerken, toepassen en feedback ontvangen.", "Terugkijken betekent opbrengst zichtbaar maken en verbinden aan vervolg of huiswerk."],
  abcd: ["A Input betekent dat de cursist taal eerst hoort, leest, ziet of krijgt voorgedaan.", "B Reproductie betekent dat de cursist taal veilig herhaalt of nadoet.", "C Gestuurde productie betekent dat de cursist taal gebruikt met steun.", "D Vrije productie betekent dat de cursist taal zelfstandiger toepast."],
  edi: ["Het model start met een duidelijk doel.", "De docent activeert voorkennis.", "De docent geeft expliciete instructie en doet voor.", "De docent controleert begrip.", "De cursist oefent begeleid en daarna zelfstandiger.", "De les sluit af met controle op opbrengst."],
  taakgericht: ["De les start met een herkenbare taak.", "De docent biedt taalsteun die nodig is voor de taak.", "De cursist voert de taak uit.", "De docent geeft feedback.", "De cursist verbetert of voert de taak opnieuw uit."],
  terugplannen: ["Begin met de eindtaak.", "Bepaal welke woorden, zinnen en vaardigheden nodig zijn.", "Bied input en oefening die voorbereiden op de taak.", "Laat cursisten de taak uitvoeren.", "Controleer of de eindtaak is gelukt."]
};

export const didactischModelSuggesties: Record<DidactischModelId, Record<string, string[]>> = {
  vut: {
    vutVooruitkijken: ["Vooruitkijken: doel, context, voorkennis en kernwoorden activeren.", "De les start met wat cursisten al weten en wat zij gaan leren.", "De docent maakt doel, aanpak en opbrengst kort zichtbaar.", "Cursisten voorspellen wat zij in deze les gaan doen en gebruiken."],
    vutUitvoeren: ["Uitvoeren: input verwerken, oefenen, samenwerken, toepassen en feedback ontvangen.", "Cursisten gebruiken de taal actief in oefeningen en taken.", "De docent controleert begrip tijdens de uitvoering.", "De kern van de les bevat instructie, verwerking en taakuitvoering."],
    vutTerugkijken: ["Terugkijken: opbrengst zichtbaar maken en verbinden aan vervolg of huiswerk.", "Cursisten benoemen wat zij nu beter kunnen.", "De docent koppelt opbrengst aan de volgende stap.", "De les eindigt met een korte check op doel en opbrengst."],
    tijdsindeling: ["De tijdsindeling volgt vooruitkijken, uitvoeren en terugkijken.", "De meeste tijd gaat naar oefenen en toepassen.", "De docent plant een korte check tijdens de uitvoering.", "De les eindigt met terugblik en huiswerk."],
    lesdoel: ["Het lesdoel wordt bij de start zichtbaar gemaakt.", "De cursist weet tijdens het uitvoeren waar hij naartoe werkt.", "Het doel komt terug in de terugblik.", "De docent verbindt doel, taak en opbrengst."],
    terugblikOpOpbrengst: ["Cursisten benoemen wat zij hebben geleerd.", "De docent laat cursisten het doel controleren.", "De groep verbindt opbrengst aan de volgende stap.", "De terugblik levert input voor huiswerk."],
    huiswerk: ["Het huiswerk sluit aan bij de opbrengst van de les.", "De cursist herhaalt wat tijdens uitvoeren is geoefend.", "De opdracht bereidt de volgende les kort voor.", "De docent koppelt huiswerk aan praktijkleren."]
  },
  abcd: {
    faseInput: ["A Input: de cursist hoort, leest, ziet of krijgt de nieuwe taal voorgedaan.", "De docent biedt betekenisvolle input voordat cursisten zelf produceren.", "De input bevat woorden, zinnen en voorbeelden die nodig zijn voor de taak.", "De cursist verwerkt de input met een korte begripcheck."],
    faseReproductie: ["B Reproductie: de cursist herhaalt, zegt na, vult aan of doet na met steun.", "De cursist oefent kernzinnen veilig voordat hij vrijer spreekt of schrijft.", "Reproductie helpt om vorm, betekenis en uitspraak vast te zetten.", "De docent laat cursisten werken met modelzinnen en korte patronen."],
    faseGestuurdeProductie: ["C Gestuurde productie: de cursist gebruikt de taal met steun van voorbeeld of stappenplan.", "De cursist past de taal toe in een gestructureerde opdracht.", "De docent geeft taalhulp en feedback tijdens het produceren.", "De opdracht vormt de brug tussen nadoen en zelfstandig gebruiken."],
    faseVrijeProductie: ["D Vrije productie: de cursist gebruikt de taal zelfstandiger in een herkenbare taak.", "De cursist maakt een eigen taalproduct of voert een functionele taak uit.", "De docent kijkt of de cursist de taal buiten het voorbeeld kan toepassen.", "De fase sluit af met feedback op begrijpelijkheid en volgende stap."],
    receptieveInput: ["De input bereidt voor op reproductie en productie.", "De cursist verwerkt woorden en zinnen voordat hij ze gebruikt.", "De docent kiest input die nodig is voor de eindtaak.", "De input wordt gecontroleerd met een korte begripcheck."],
    productieveTaak: ["De productieve taak groeit van gestuurd naar vrijer taalgebruik.", "De cursist gebruikt eerst steun en daarna eigen formulering.", "De docent geeft feedback op begrijpelijkheid en vorm.", "De taak laat zien of de taal inzetbaar is."],
    functioneleTaak: ["De functionele taak vormt de vrije productie.", "De cursist past de geoefende woorden en zinnen toe.", "De taak heeft een duidelijk doel en herkenbare context.", "De docent bespreekt wat de taak succesvol maakt."],
    feedbackmoment: ["Feedback sluit aan bij de overgang naar zelfstandiger productie.", "De docent geeft feedback op vorm, betekenis en taakuitvoering.", "De cursist gebruikt feedback om de productie te verbeteren.", "De feedback maakt de volgende stap concreet."],
    tijdsindeling: ["De planning bouwt van A input naar D vrije productie.", "Elke fase krijgt korte en duidelijke oefentijd.", "De meeste tijd gaat naar productie en toepassing.", "De les eindigt met feedback en terugblik."]
  },
  edi: {
    lesdoel: ["Het lesdoel wordt expliciet benoemd en gekoppeld aan succescriteria.", "De docent zegt wat cursisten gaan leren en hoe zij laten zien dat het lukt.", "Het doel is kort, concreet en zichtbaar tijdens de les.", "De les eindigt met controle of het doel is bereikt."],
    vutVooruitkijken: ["De docent activeert voorkennis voordat de instructie start.", "De docent benoemt doel, aanpak en succescriteria.", "Cursisten halen kort op wat zij al weten.", "De start maakt duidelijk welke stap vandaag centraal staat."],
    instructieDocent: ["De docent geeft expliciete instructie en doet de opdracht hardop denkend voor.", "De instructie bevat voordoen, samen oefenen en gecontroleerde verwerking.", "De docent modelleert de denkstappen voordat cursisten zelf werken.", "De uitleg is kort, duidelijk en wordt direct gecontroleerd."],
    checkOpBegrip: ["De docent controleert begrip tijdens en direct na de instructie.", "Cursisten geven een kort antwoord, voorbeeld of toepassing om begrip te tonen.", "De docent herhaalt of verduidelijkt voordat de groep zelfstandig verdergaat.", "De begripcheck bepaalt of extra begeleide oefening nodig is."],
    productieveTaak: ["De cursist oefent eerst begeleid en daarna zelfstandiger.", "De taak laat zien of de instructie is begrepen.", "De docent bouwt steun stap voor stap af.", "De cursist past het voorbeeld toe in eigen taalgebruik."],
    feedbackmoment: ["De docent geeft feedback tijdens begeleide oefening.", "De feedback richt zich op het succescriterium.", "De cursist verbetert de taak voordat hij zelfstandig verdergaat.", "De docent benoemt wat al lukt en wat nog oefening vraagt."],
    tijdsindeling: ["De planning bevat doel, instructie, begripcheck, begeleide oefening en verwerking.", "De docent plant begripcheck voor zelfstandige verwerking.", "De meeste tijd gaat naar begeleid oefenen en toepassen.", "De les eindigt met controle op opbrengst."],
    terugblikOpOpbrengst: ["De cursist controleert of het lesdoel is bereikt.", "De docent laat cursisten een voorbeeld van succes tonen.", "De terugblik gebruikt het succescriterium.", "De docent bepaalt op basis van opbrengst de volgende stap."]
  },
  taakgericht: {
    functioneleTaak: ["De les draait om een herkenbare taak met een duidelijk doel.", "Cursisten krijgen taalsteun die nodig is om de taak uit te voeren.", "De taak wordt uitgevoerd, besproken en waar mogelijk verbeterd.", "De taak lijkt op taalgebruik buiten de les."],
    receptieveInput: ["De input bereidt direct voor op de taak.", "Cursisten verzamelen woorden, zinnen en informatie die nodig zijn voor taakuitvoering.", "De docent biedt voorbeelden van taalgebruik in de taakcontext.", "De input blijft functioneel en taakgericht."],
    productieveTaak: ["De cursist produceert taal om de taak uit te voeren.", "De productie heeft een doel, ontvanger en herkenbare context.", "De docent geeft taalsteun voordat de taak start.", "De cursist verbetert de productie na feedback."],
    woordenschatactiviteit: ["De woorden komen uit de taakcontext.", "Cursisten oefenen woorden die zij direct nodig hebben.", "De docent koppelt woordenschat aan taakuitvoering.", "De cursist gebruikt nieuwe woorden tijdens de taak."],
    praktijklerenLes: ["De praktijkcontext vormt het vertrekpunt van de taak.", "De cursist oefent taal die buiten de les bruikbaar is.", "De docent gebruikt voorbeelden uit dagelijks leven, school of werk.", "De taak maakt de brug naar de praktijk zichtbaar."],
    werkvormActieveDeelname: ["Cursisten werken samen aan voorbereiding en uitvoering.", "Iedere cursist heeft een rol in de taak.", "De werkvorm vraagt overleg, keuze en toepassing.", "De groep bespreekt na afloop welke aanpak werkte."],
    feedbackmoment: ["Feedback gaat over taakuitvoering, begrijpelijkheid en bruikbare taal.", "De cursist verbetert de taak na feedback.", "De docent bespreekt welke taal hielp om de taak uit te voeren.", "De groep vergelijkt aanpakken en kiest wat werkt."],
    tijdsindeling: ["De planning bevat taakintroductie, taalsteun, uitvoering, feedback en verbetering.", "De meeste tijd gaat naar taak uitvoeren en verbeteren.", "De docent plant feedback direct na taakuitvoering.", "De terugblik verbindt de taak aan transfer."],
    terugblikOpOpbrengst: ["Cursisten benoemen welke taal hielp bij de taak.", "De docent bespreekt wat buiten de les bruikbaar is.", "De cursist kiest een verbeterpunt voor de volgende taak.", "De opbrengst wordt gekoppeld aan praktijkleren."]
  },
  terugplannen: {
    functioneleTaak: ["De eindtaak wordt eerst bepaald en daarna wordt de les teruggebouwd.", "De docent bepaalt welke woorden, zinnen en stappen nodig zijn om de eindtaak te halen.", "Alle oefeningen bereiden zichtbaar voor op de eindtaak.", "De les eindigt met uitvoering of voorbereiding van de eindtaak."],
    lesdoel: ["Het lesdoel wordt afgeleid van wat de cursist uiteindelijk moet kunnen doen.", "De docent formuleert het doel vanuit de eindtaak.", "De cursist weet welke taak hij aan het einde moet kunnen uitvoeren.", "Het doel maakt de route naar de eindtaak zichtbaar."],
    leeropbrengst: ["De opbrengst laat zien of de eindtaak haalbaar is.", "De cursist toont welke taal nodig is voor de eindtaak.", "De docent controleert de opbrengst aan de hand van de eindtaak.", "De cursist benoemt welke stap nog oefening vraagt."],
    receptieveInput: ["De input wordt gekozen omdat die nodig is voor de eindtaak.", "Cursisten herkennen taal die zij later gebruiken.", "De docent laat voorbeelden zien van succesvolle taakuitvoering.", "De input maakt de eisen van de eindtaak duidelijk."],
    woordenschatactiviteit: ["De woorden komen direct uit de eindtaak.", "Cursisten oefenen zinnen die nodig zijn voor uitvoering.", "De docent koppelt woordenschat aan taakstappen.", "De cursist gebruikt kernwoorden in de eindtaak."],
    productieveTaak: ["De productie bereidt direct voor op de eindtaak.", "De cursist oefent een deelhandeling voordat hij de eindtaak uitvoert.", "De docent geeft feedback op taal die nodig is voor de eindtaak.", "De productie wordt verbeterd richting eindtaak."],
    tijdsindeling: ["De planning start bij de eindtaak en bouwt terug naar input en oefening.", "Eerst wordt duidelijk wat de eindtaak vraagt, daarna volgt taalsteun en oefening.", "De meeste tijd gaat naar voorbereiding en uitvoering van de eindtaak.", "De terugblik controleert of de eindtaak haalbaar of bereikt is."],
    feedbackmoment: ["Feedback laat zien wat nog nodig is voor de eindtaak.", "De docent koppelt feedback aan taakstappen.", "De cursist verbetert een onderdeel van de eindtaak.", "De feedback bereidt transfer en huiswerk voor."],
    praktijklerenBuitenLes: ["De buitenopdracht oefent een deel van de eindtaak.", "De cursist probeert de benodigde taal buiten de les kort uit.", "De opdracht verzamelt input voor de volgende taakstap.", "De praktijkopdracht maakt transfer naar buiten de les zichtbaar."],
    huiswerk: ["Het huiswerk bereidt direct voor op de eindtaak.", "De cursist herhaalt woorden en zinnen die nodig zijn voor uitvoering.", "De opdracht oefent een kleine stap richting eindtaak.", "De cursist neemt bewijs of ervaring mee terug naar de les."]
  }
};

export const modelSpecifiekeVelden = Object.fromEntries(
  Object.entries(didactischModelSuggesties).map(([modelId, velden]) => [modelId, Object.keys(velden)])
) as Record<DidactischModelId, string[]>;

export const profielSpecifiekeVelden = belangrijkeVelden;

export const profielVeldSuggesties = profielDoelSuggesties;
export const doelenBank = profielDoelSuggesties;
export const lesstudioSuggestieVelden = lesVeldKeys;

export function uniekeSuggesties(suggesties: string[]) {
  return [...new Set(suggesties.map((suggestie) => suggestie.trim()).filter(Boolean))];
}

export function haalSuggesties(profielId: string, veldKey: string, didactischModelId = "vut") {
  const profiel = (profielId in profielInfo ? profielId : "bow") as ProfielId;
  const model = (didactischModelId in didactischModelSuggesties ? didactischModelId : "vut") as DidactischModelId;
  return uniekeSuggesties([
    ...(profielDoelSuggesties[profiel]?.[veldKey] || []),
    ...(didactischModelSuggesties[model]?.[veldKey] || []),
    ...(basisDoelSuggesties[veldKey] || []),
    ...(profielAandacht[profiel] || [])
  ]).slice(0, 6);
}

export function haalVeldUitleg(veldKey: string) {
  return veldUitlegBank[veldKey] || veldUitlegFallback;
}

export function haalDidactischeTips(veldKey: string, didactischModelId = "vut") {
  const model = (didactischModelId in didactischModelUitleg ? didactischModelId : "vut") as DidactischModelId;
  return uniekeSuggesties([
    ...(didactischeTipBank[veldKey] || []),
    ...(didactischModelUitleg[model] || [])
  ]).slice(0, 5);
}

export function maakSuggestieMenuTitel(profielId: string) {
  const profiel = (profielId in profielInfo ? profielId : "bow") as ProfielId;
  return `${profielInfo[profiel].label} suggesties`;
}
