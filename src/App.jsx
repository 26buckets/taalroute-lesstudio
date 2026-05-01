import React, { useEffect, useMemo, useRef, useState } from "react";
import "@fontsource/poppins/latin-400.css";
import "@fontsource/poppins/latin-500.css";
import "@fontsource/poppins/latin-600.css";
import "@fontsource/poppins/latin-700.css";
import "@fontsource/poppins/latin-800.css";
import {
  basisDoelSuggesties,
  didactischModelUitleg,
  didactischModelSuggesties,
  didactischeTipBank,
  haalSuggesties as haalProfielSuggesties,
  haalDidactischeTips,
  haalVeldUitleg,
  lesstudioSuggestieVelden,
  maakSuggestieMenuTitel,
  profielInfo,
  profielAandacht,
  profielVeldSuggesties,
  veldUitlegBank
} from "./data/lesstudioData";

const NL = "\n";
const APP_LOGO_URL = "https://media.publit.io/file/taalroute/taalroute-logo/taalroute-lesstudio-logo4x.png";
const DOCUMENT_LOGO_URL = "https://media.publit.io/file/taalroute/taalroute-logo/logo-taalroute4x.png";
const FAVICON_URL = "https://media.publit.io/file/taalroute/taalroute-logo/flavicon-taalroute-v24x.png";
const BRAND = "#0090f2";
const LESSEN_STORAGE_KEY = "taalroute_lesstudio_opgeslagen_lessen_v1";

const groepsniveaus = ["", "Alfa A", "Alfa B", "Alfa C", "A0 NT2", "A1 NT2", "A2 NT2", "B1 NT2", "B2 NT2", "C1 NT2", "MBO 1", "MBO 2", "MBO 3", "MBO 4"];

const helpSecties = [
  {
    titel: "Wat doet Taalroute Lesstudio?",
    tekst: ["Taalroute Lesstudio helpt docenten om snel een duidelijke, doelgerichte en praktijkgerichte lesvoorbereiding te maken. Je kunt losse lesinformatie invullen of een volledige tekst plakken. De app zet deze informatie om naar een bewerkbaar lesplan, een volledige printversie en een compacte samenvatting."]
  },
  {
    titel: "Werk in drie stappen",
    tekst: ["Stap 1 Invullen: vul de basisgegevens in, kies een profiel, kies een didactisch model en plak of schrijf de lesinformatie.", "Stap 2 Aanpassen: controleer het lesplan, pas teksten aan en vul ontbrekende onderdelen aan.", "Stap 3 Downloaden en printen: bekijk de printversie, kies Volledig plan of Samenvatting, print de pagina of download een HTML bestand dat je los in de browser kunt openen."]
  },
  {
    titel: "Wat is een profiel?",
    tekst: ["Het profiel bepaalt vanuit welke kwaliteitsbril de les wordt opgebouwd. BOW blijft altijd actief als auditlijn. Elk profiel geeft andere velden en andere suggesties bij de plusknop.", "BOW Kwaliteitsprofiel: voor lessen waarin leskwaliteit, doelgerichtheid, VUT, actieve deelname, praktijkleren, feedback en voortgang zichtbaar moeten zijn.", "Taalroute Profiel: voor lessen die sterk moeten aansluiten op de Taalroute methode, het boek, de werkbrug, de ELO, kernwoorden en de praktijktaak.", "ERK Niveauprofiel: voor lessen waarin het taalniveau, de can do doelen, de hoofdvaardigheid, de mate van steun en de leeropbrengst centraal staan.", "NT2-examenprofiel: voor lessen die voorbereiden op examenvaardigheid, taaktype, strategie, tijdsbewaking en beoordelingscriteria.", "Z-route Praktijkprofiel: voor lessen met eenvoudige taal, herhaling, beeldsteun, voordoen, nadoen, mondelinge interactie en haalbare praktijkopdrachten.", "Beroepsgericht profiel: voor lessen waarin werktaal, vaktaal, beroepshandeling, veiligheid, samenwerken en werknemersvaardigheden centraal staan."]
  },
  {
    titel: "Wat is een didactisch model?",
    tekst: ["Het didactisch model bepaalt hoe de les wordt opgebouwd. Het profiel bepaalt waar je op let. Het didactisch model bepaalt de route van de les.", "VUT-model: de les wordt opgebouwd met vooruitkijken, uitvoeren en terugkijken.", "ABCD-model: de les wordt opgebouwd van input naar reproductie, gestuurde productie en vrije productie.", "EDI-model: de les wordt opgebouwd met expliciete instructie, voordoen, begripcheck, begeleide oefening en zelfstandige verwerking.", "Taakgericht model: de les wordt opgebouwd rond een herkenbare taak, met taalsteun, uitvoering, feedback en verbetering.", "Terugplannen vanuit de eindtaak: de les start bij de eindtaak. Daarna wordt teruggebouwd naar de woorden, zinnen, input en oefeningen die nodig zijn."]
  },
  {
    titel: "Knoppen en editor",
    tekst: ["? Vraagtekenknop: geeft korte uitleg over het veld waarin je werkt.", "💡 Lightbulb: toont didactische tips die passen bij het onderdeel.", "✓ Vinkje: opent de verbeterhulp om tekst concreter, praktijkgerichter of BOW-proof te maken.", "+ Plusknop: voegt passende suggesties toe op basis van profiel, didactisch model en veld.", "B Canvas-editor: maakt geselecteerde tekst dikgedrukt op stap 2.", "I Canvas-editor: maakt geselecteerde tekst cursief op stap 2.", "• Canvas-editor: maakt van geselecteerde tekst een opsomming.", "+ Canvas-editor: voegt een nieuwe regel toe aan het actieve tekstvlak."]
  },
  {
    titel: "Hoe werkt de lesduur?",
    tekst: ["De lesduur beïnvloedt automatisch de tijdsindeling. Bij een korte les maakt de app een compacte planning. Bij een langere les ontstaat er meer ruimte voor input, oefening, taak, feedback en terugblik.", "De tijdsindeling wordt getoond als compacte didactische route. Als je de tijdsindeling zelf aanpast, bewaart de app jouw eigen planning. Met de herstelknop kun je terug naar de automatische route."]
  },
  {
    titel: "Wat moet ik minimaal invullen?",
    tekst: ["Vul minimaal deze onderdelen in: Lesonderwerp, Groepsniveau, Profiel, Didactisch model, Lesduur, Lesdoel, Leeropbrengst, Hoofdvaardigheid, Taalfocus, VUT, Functionele taak, Check op begrip, Praktijkleren, Terugblik en Huiswerk.", "Als er nog weinig data is ingevuld, kun je starten met basisgegevens en daarna de plusknoppen gebruiken om goede startteksten toe te voegen."]
  },
  {
    titel: "Beste werkwijze",
    tekst: ["Begin met de basisgegevens. Kies daarna profiel en didactisch model. Gebruik de knoppen bij de velden als je uitleg, tips, verbeterhulp of suggesties nodig hebt. Controleer het lesplan op stap 2. Gebruik stap 3 voor printen of downloaden."]
  },
  {
    titel: "Printen en downloaden",
    tekst: ["Gebruik stap 3 voor de printversie. Kies Volledig plan voor het uitgebreide lesplan of Samenvatting voor de compacte leskaart. De iconknoppen rechts zijn voor printen, HTML downloaden en samenvatting downloaden.", "Als direct printen in de browser niet werkt, download dan het HTML bestand. Open dat bestand daarna los in Chrome of Edge en print vanuit de browser."]
  }
];

const helpTekstVoorTests = helpSecties.map((sectie) => `${sectie.titel}\n${sectie.tekst.join("\n")}`).join("\n\n");

const disclaimerSecties = [
  {
    titel: "Gebruik van de website",
    tekst: ["Taalroute Lesstudio helpt je bij het maken van een lesvoorbereiding. De app geeft suggesties, maar jij blijft zelf verantwoordelijk voor de inhoud van je les."]
  },
  {
    titel: "Controleer altijd zelf",
    tekst: ["Wij proberen de informatie en suggesties zo goed mogelijk te maken. Toch kan er iets ontbreken of niet goed passen bij jouw groep. Controleer daarom altijd zelf of het lesplan klopt, past bij het niveau en past bij de afspraken van je organisatie."]
  },
  {
    titel: "Geen garantie",
    tekst: ["Je kunt aan de informatie op deze website geen rechten ontlenen. Taalroute kan niet garanderen dat de website altijd zonder fouten werkt of altijd beschikbaar is."]
  },
  {
    titel: "Gebruik op eigen verantwoordelijkheid",
    tekst: ["Gebruik je de website, de suggesties, de printversie of een download? Dan doe je dat op eigen verantwoordelijkheid. Taalroute is niet aansprakelijk voor schade die ontstaat door het gebruik van de website of door een lesplan dat met de app is gemaakt."]
  },
  {
    titel: "Auteursrecht",
    tekst: ["De teksten, vormgeving, logo's en onderdelen van deze website horen bij Taalroute of bij partijen die toestemming hebben gegeven. Je mag je eigen lesplannen downloaden, printen en gebruiken voor je onderwijs. Je mag de app of onderdelen daarvan niet zomaar kopiëren, verkopen of verspreiden."]
  },
  {
    titel: "Didactische modellen en profielen",
    tekst: ["De didactische modellen, profielen, controles en suggesties in deze app zijn gemaakt op basis van eigen inzicht, praktijkervaring en onderwijsinhoudelijke keuzes van Taalroute.", "Als de app verwijst naar een model, profiel, methode, organisatie, keurmerk of examen, betekent dit niet automatisch dat Taalroute daarmee samenwerkt, daarvoor spreekt of daardoor is goedgekeurd.", "Namen van organisaties of systemen worden alleen gebruikt om duidelijk te maken waar een lesvoorbereiding op kan aansluiten. Er is geen verbondenheid, samenwerking, aanbeveling of goedkeuring, behalve als dat duidelijk en schriftelijk is vermeld."]
  },
  {
    titel: "Links en externe diensten",
    tekst: ["Soms gebruikt de website externe bestanden, zoals logo's of afbeeldingen. Taalroute is niet verantwoordelijk voor websites of diensten van anderen."]
  },
  {
    titel: "Wijzigingen",
    tekst: ["Taalroute mag de website, functies, teksten en deze disclaimer aanpassen. De nieuwste versie staat altijd in de app."]
  },
  {
    titel: "Recht",
    tekst: ["Op deze disclaimer is Nederlands recht van toepassing."]
  }
];

const disclaimerTekstVoorTests = disclaimerSecties.map((sectie) => `${sectie.titel}\n${sectie.tekst.join("\n")}`).join("\n\n");

const privacySecties = [
  {
    titel: "Gebruik geen persoonsgegevens",
    tekst: ["Vul geen namen, adressen, telefoonnummers, geboortedata, BSN-nummers of andere persoonsgegevens van cursisten in. Gebruik ook geen informatie waardoor iemand makkelijk herkenbaar is."]
  },
  {
    titel: "Maak voorbeelden anoniem",
    tekst: ["Wil je een situatie of voorbeeld gebruiken? Maak die dan anoniem. Schrijf bijvoorbeeld 'een cursist', 'de groep' of 'een deelnemer' in plaats van een naam."]
  },
  {
    titel: "Controleer het plakveld",
    tekst: ["Plak alleen lesinformatie die nodig is voor het maken van de les. Controleer tekst eerst voordat je die in de app plakt. Haal persoonsgegevens en gevoelige informatie weg."]
  },
  {
    titel: "Gevoelige informatie",
    tekst: ["Vul geen medische informatie, financiële problemen, verblijfsgegevens, privéproblemen of andere gevoelige informatie over cursisten in."]
  },
  {
    titel: "Eigen verantwoordelijkheid",
    tekst: ["Jij blijft zelf verantwoordelijk voor wat je invult, downloadt, print en deelt. Volg altijd de privacyregels van je organisatie."]
  }
];

const privacyTekstVoorTests = privacySecties.map((sectie) => `${sectie.titel}\n${sectie.tekst.join("\n")}`).join("\n\n");

function formatHelpTekst(tekst) {
  const patronen = [
    "Stap 1 Invullen", "Stap 2 Aanpassen", "Stap 3 Downloaden en printen",
    "BOW Kwaliteitsprofiel", "Taalroute Profiel", "ERK Niveauprofiel", "NT2-examenprofiel", "Z-route Praktijkprofiel", "Beroepsgericht profiel",
    "VUT-model", "ABCD-model", "EDI-model", "Taakgericht model", "Terugplannen vanuit de eindtaak",
    "vraagtekenknop", "vraagtekenknoppen", "plusknop", "plusknoppen", "BOW", "Volledig plan", "Samenvatting", "HTML bestand", "Chrome", "Edge", "Functionele taak"
  ];
  const delen = [tekst];
  [...patronen].sort((a, b) => b.length - a.length).forEach((patroon) => {
    for (let index = delen.length - 1; index >= 0; index -= 1) {
      const deel = delen[index];
      if (typeof deel !== "string" || !deel.includes(patroon)) continue;
      const gesplitst = deel.split(patroon);
      const nieuw = [];
      gesplitst.forEach((stuk, stukIndex) => {
        if (stuk) nieuw.push(stuk);
        if (stukIndex < gesplitst.length - 1) nieuw.push(<strong key={`${patroon}-${index}-${stukIndex}`}>{patroon}</strong>);
      });
      delen.splice(index, 1, ...nieuw);
    }
  });
  return delen;
}

const standaarden = {
  bow: {
    label: "BOW Kwaliteitsprofiel",
    uitleg: "Doelgericht, activerend, praktijkgericht, toetsgericht en zichtbaar opgebouwd volgens VUT.",
    eisen: ["Lesdoel", "Materiaalgebruik", "Praktijkgericht leren", "Activering", "Werkklimaat", "Structuur en VUT", "Differentiatie", "Feedback", "Vaardigheden", "Voortgangsbewaking"]
  },
  taalroute: {
    label: "Taalroute Profiel",
    uitleg: "Praktijkkern, werkbrug, digitale verlenging, hybride online deelname en taakgerichte afsluiting.",
    eisen: ["Praktijkkern", "Werkbrug", "Digitale verlenging", "Formatieve check", "Hybride online werkvorm", "Woordenschatlijn"]
  },
  erk: {
    label: "ERK Niveauprofiel",
    uitleg: "Can do doelen, vaardigheidsontwikkeling en niveau passende output.",
    eisen: ["Can do doel", "Receptieve input", "Productieve output", "Vaardigheid centraal", "Succescriteria"]
  },
  staatsexamen: {
    label: "NT2-examenprofiel",
    uitleg: "Examenvaardigheid, strategie, taakuitvoering, tijdsdruk en beoordelingscriteria.",
    eisen: ["Examenvaardigheid", "Strategie", "Examengerichte taak", "Feedback op criteria", "Examenhuiswerk"]
  },
  zroute: {
    label: "Z-route Praktijkprofiel",
    uitleg: "Praktische taal, herhaling, mondelinge interactie, veiligheid en haalbare buitenschoolse opdrachten.",
    eisen: ["Concrete praktijksituatie", "Herhaling", "Beeld of voordoen", "Spreektaak", "Haalbare buitenopdracht"]
  },
  mbo: {
    label: "Beroepsgericht profiel",
    uitleg: "Beroepshandeling, vaktaal, werknemersvaardigheden, veiligheid en werkcontext.",
    eisen: ["Beroepscontext", "Vaktaal", "Werkhandeling", "Samenwerken", "Feedback op werktaal"]
  }
};

const didactischeModellen = {
  vut: { label: "VUT-model", uitleg: "Vooruitkijken, uitvoeren en terugkijken als basisstructuur." },
  abcd: { label: "ABCD-model", uitleg: "Input, reproductie, gestuurde productie en vrije productie." },
  edi: { label: "EDI-model", uitleg: "Expliciete directe instructie met begripcheck en begeleide oefening." },
  taakgericht: { label: "Taakgericht model", uitleg: "Voorbereiden, taalsteun geven, taak uitvoeren, feedback geven en verbeteren." },
  terugplannen: { label: "Terugplannen vanuit de eindtaak", uitleg: "Begin bij wat de cursist uiteindelijk moet kunnen doen." }
};

const legeLes = {
  lesonderwerp: "",
  groepsniveau: "",
  standaard: "bow",
  didactischModel: "vut",
  lesduur: 90,
  extraProfielen: [],
  aangepasteInstructies: "",
  profielFocus: "",
  boekPaginas: "",
  themafase: "",
  praktijkkern: "",
  werkbrug: "",
  kernwoorden: "",
  taalpatronen: "",
  eloKoppeling: "",
  interactiveBook1: "",
  interactiveBook2: "",
  watKanIkNu: "",
  lesdoel: "",
  leeropbrengst: "",
  erkNiveau: "",
  canDoDoel: "",
  mateVanSteun: "",
  succescriteria: "",
  differentiatieNiveau: "",
  bewijsVanOpbrengst: "",
  hoofdvaardigheid: "",
  ondersteunendeVaardigheid: "",
  lezen: "",
  luisteren: "",
  spreken: "",
  schrijven: "",
  grammatica: "",
  uitspraak: "",
  receptieveInput: "",
  productieveTaak: "",
  taalfocus: "",
  examenonderdeel: "",
  examenvaardigheid: "",
  examenstrategie: "",
  taaktype: "",
  tijdslimiet: "",
  beoordelingscriteria: "",
  oefenronde: "",
  verbeteractie: "",
  examenhuiswerk: "",
  examenrelevantie: "",
  benodigdMateriaal: "",
  vutVooruitkijken: "",
  vutUitvoeren: "",
  vutTerugkijken: "",
  faseInput: "",
  faseReproductie: "",
  faseGestuurdeProductie: "",
  faseVrijeProductie: "",
  tijdsindeling: "",
  praktijksituatie: "",
  eenvoudigLesdoel: "",
  voordoen: "",
  samenOefenen: "",
  mondelingeInteractie: "",
  beeldsteun: "",
  herhalingsvorm: "",
  praktijktaak: "",
  buitenschoolseOpdracht: "",
  terugblikEenvoudigeTaal: "",
  zrouteSteunlijn: "",
  zrouteMiddenlijn: "",
  zroutePluslijn: "",
  branche: "",
  werkcontext: "",
  beroepshandeling: "",
  vaktaal: "",
  werknemersvaardigheid: "",
  instructietaal: "",
  samenwerking: "",
  veiligheid: "",
  feedbackWerktaal: "",
  transferWerkplek: "",
  woordenschatactiviteit: "",
  instructieDocent: "",
  momentCursistAanHetWoord: "",
  functioneleTaak: "",
  checkOpBegrip: "",
  werkvormActieveDeelname: "",
  differentiatie: "",
  werkklimaat: "",
  intercultureelKlimaat: "",
  praktijklerenLes: "",
  praktijklerenBuitenLes: "",
  hybrideOpdracht: "",
  onlineInteractie: "",
  feedbackmoment: "",
  voortgangsbewaking: "",
  terugblikOpOpbrengst: "",
  huiswerk: ""
};

const veldGroepen = [
  { id: "basis", titel: "Basisgegevens", omschrijving: "Doel, opbrengst, niveau en kern van de les.", velden: [["profielFocus", "Profiel focus", 2], ["boekPaginas", "Boek en inhoud", 4], ["lesdoel", "Lesdoel", 3], ["leeropbrengst", "Leeropbrengst", 3], ["hoofdvaardigheid", "Hoofdvaardigheid", 2], ["ondersteunendeVaardigheid", "Ondersteunende vaardigheid", 2]] },
  { id: "vaardigheden", titel: "Vaardigheden en taal", omschrijving: "Lezen, luisteren, spreken, schrijven, grammatica, uitspraak en woordenschat.", velden: [["lezen", "Lezen", 3], ["luisteren", "Luisteren", 3], ["spreken", "Spreken", 3], ["schrijven", "Schrijven", 3], ["woordenschatactiviteit", "Woordenschatactiviteit", 4], ["grammatica", "Grammatica", 3], ["uitspraak", "Uitspraak", 3], ["taalfocus", "Taalfocus", 3]] },
  { id: "taken", titel: "Taken en verwerking", omschrijving: "Input, output, functionele taak, spreken en actieve deelname.", velden: [["receptieveInput", "Receptieve input", 3], ["productieveTaak", "Productieve taak", 3], ["functioneleTaak", "Functionele taak", 4], ["momentCursistAanHetWoord", "Moment cursist aan het woord", 4], ["werkvormActieveDeelname", "Werkvorm actieve deelname", 4]] },
  { id: "vut", titel: "VUT en tijd", omschrijving: "Vooruitkijken, uitvoeren, terugkijken en planning.", velden: [["vutVooruitkijken", "VUT vooruitkijken", 3], ["vutUitvoeren", "VUT uitvoeren", 3], ["vutTerugkijken", "VUT terugkijken", 3], ["tijdsindeling", "Tijdsindeling", 6]] },
  { id: "didactiek", titel: "Didactische opbouw", omschrijving: "ABCD of ander didactisch model voor de opbouw van de les.", velden: [["faseInput", "A Input", 3], ["faseReproductie", "B Reproductie", 3], ["faseGestuurdeProductie", "C Gestuurde productie", 3], ["faseVrijeProductie", "D Vrije productie", 3]] },
  { id: "kwaliteit", titel: "BOW Kwaliteit", omschrijving: "Begrip, feedback, differentiatie, klimaat, voortgang en examenrelevantie.", velden: [["checkOpBegrip", "Check op begrip", 4], ["feedbackmoment", "Feedbackmoment", 4], ["differentiatie", "Differentiatie en maatwerk", 3], ["werkklimaat", "Werkklimaat en veiligheid", 3], ["intercultureelKlimaat", "Intercultureel klimaat", 3], ["voortgangsbewaking", "Voortgangsbewaking", 3], ["examenrelevantie", "Examenrelevantie", 3]] },
  { id: "praktijk", titel: "Praktijk en hybride online", omschrijving: "Praktijkleren, hybride online deelname, terugblik en huiswerk.", velden: [["praktijklerenLes", "Praktijkleren in de les", 3], ["praktijklerenBuitenLes", "Praktijkleren buiten de les", 3], ["hybrideOpdracht", "Hybride online opdracht", 3], ["onlineInteractie", "Online interactiemoment", 3], ["terugblikOpOpbrengst", "Terugblik op opbrengst", 3], ["huiswerk", "Huiswerk ter voorbereiding", 4]] },
  { id: "methode", titel: "Taalroute methode", omschrijving: "Themafase, praktijkkern, werkbrug, kernwoorden, taalpatronen en methodeopbouw.", velden: [["themafase", "Themafase", 2], ["praktijkkern", "Praktijkkern", 3], ["werkbrug", "Werkbrug", 3], ["kernwoorden", "Kernwoorden", 3], ["taalpatronen", "Taalpatronen", 3], ["watKanIkNu", "Wat kan ik nu", 3]] },
  { id: "elo", titel: "ELO en online activiteiten", omschrijving: "Digitale verlenging en methodekoppeling.", velden: [["eloKoppeling", "ELO koppeling", 3], ["interactiveBook1", "Online Activiteit 1", 3], ["interactiveBook2", "Online Activiteit 2", 3]] },
  { id: "erk", titel: "ERK niveau", omschrijving: "Can do doel, mate van steun, succescriteria en bewijs van opbrengst.", velden: [["erkNiveau", "ERK niveau", 2], ["canDoDoel", "Can do doel", 3], ["mateVanSteun", "Mate van steun", 2], ["succescriteria", "Succescriteria", 3], ["differentiatieNiveau", "Differentiatie naar niveau", 3], ["bewijsVanOpbrengst", "Bewijs van opbrengst", 3]] },
  { id: "examen", titel: "Examenvoorbereiding", omschrijving: "Onderdeel, taaktype, strategie, tijdsdruk, criteria en verbetering.", velden: [["examenonderdeel", "Examenonderdeel", 2], ["examenvaardigheid", "Examenvaardigheid", 2], ["taaktype", "Taaktype", 3], ["examenstrategie", "Examenstrategie", 3], ["tijdslimiet", "Tijdslimiet", 2], ["beoordelingscriteria", "Beoordelingscriteria", 3], ["oefenronde", "Oefenronde", 3], ["verbeteractie", "Herkansing of verbetering", 3], ["examenhuiswerk", "Examenhuiswerk", 3]] },
  { id: "zroute", titel: "Z-route drie lijnen", omschrijving: "Steunlijn, middenlijn en pluslijn met praktijk, beeldsteun en herhaling.", velden: [["praktijksituatie", "Praktijksituatie", 3], ["eenvoudigLesdoel", "Eenvoudig lesdoel", 2], ["voordoen", "Voordoen", 3], ["samenOefenen", "Samen oefenen", 3], ["mondelingeInteractie", "Mondelinge interactie", 3], ["beeldsteun", "Beeldsteun", 3], ["herhalingsvorm", "Herhaling", 3], ["praktijktaak", "Praktijktaak", 3], ["buitenschoolseOpdracht", "Buitenschoolse opdracht", 3], ["terugblikEenvoudigeTaal", "Terugblik in eenvoudige taal", 3], ["zrouteSteunlijn", "Steunlijn", 4], ["zrouteMiddenlijn", "Middenlijn", 4], ["zroutePluslijn", "Pluslijn", 4]] },
  { id: "werk", titel: "Beroepsgericht leren", omschrijving: "Branche, werkcontext, beroepshandeling, vaktaal en transfer naar werk.", velden: [["branche", "Branche", 2], ["werkcontext", "Werkcontext", 3], ["beroepshandeling", "Beroepshandeling", 3], ["vaktaal", "Vaktaal", 3], ["werknemersvaardigheid", "Werknemersvaardigheid", 3], ["instructietaal", "Instructietaal", 3], ["samenwerking", "Samenwerking", 3], ["veiligheid", "Veiligheid", 3], ["feedbackWerktaal", "Feedback op werktaal", 3], ["transferWerkplek", "Transfer naar werkplek", 3]] }
];

const profielVeldGroepen = {
  bow: ["basis", "vut", "taken", "kwaliteit", "praktijk", "vaardigheden"],
  taalroute: ["basis", "methode", "elo", "vaardigheden", "taken", "praktijk"],
  erk: ["basis", "erk", "vaardigheden", "taken", "kwaliteit"],
  staatsexamen: ["basis", "examen", "vaardigheden", "taken", "kwaliteit", "praktijk"],
  zroute: ["basis", "zroute", "vaardigheden", "taken", "praktijk", "kwaliteit"],
  mbo: ["basis", "werk", "vaardigheden", "taken", "praktijk", "kwaliteit"]
};

const weergaveModi = {
  bow: {
    label: "Alleen BOW",
    titel: "Compacte modus",
    uitleg: "Snel een auditwaardige basisles maken."
  },
  profiel: {
    label: "Profielvelden",
    titel: "Uitgebreide modus",
    uitleg: "Werk met BOW plus de velden die passen bij je gekozen profiel."
  },
  alles: {
    label: "Alles",
    titel: "Volledige modus",
    uitleg: "Gebruik alle onderdelen als je de les heel precies wilt uitwerken."
  }
};

const verplichteBowVelden = new Set([
  "lesdoel",
  "leeropbrengst",
  "hoofdvaardigheid",
  "ondersteunendeVaardigheid",
  "woordenschatactiviteit",
  "taalfocus",
  "receptieveInput",
  "productieveTaak",
  "functioneleTaak",
  "momentCursistAanHetWoord",
  "werkvormActieveDeelname",
  "vutVooruitkijken",
  "vutUitvoeren",
  "vutTerugkijken",
  "tijdsindeling",
  "checkOpBegrip",
  "feedbackmoment",
  "differentiatie",
  "praktijklerenLes",
  "praktijklerenBuitenLes",
  "terugblikOpOpbrengst",
  "huiswerk"
]);

const voorbeeldNiveaus = {
  alfaB: {
    label: "Alfa B",
    onderwerp: "Naar de dokter: ik heb pijn",
    niveauzin: "met veel steun, beeld en korte zinnen",
    woorden: "dokter, huisarts, pijn, hoofd, buik, rug, afspraak, vandaag, morgen, naam, tijd",
    taak: "De cursist zegt in een rollenspel waar hij pijn heeft en vraagt om een afspraak bij de huisarts.",
    opbrengst: "De cursist kan met steun zeggen: Ik heb pijn. Ik wil een afspraak. Mijn naam is...",
    schrijven: "De cursist schrijft naam, klacht, datum en tijd van de afspraak over op een afspraakkaartje."
  },
  a1: {
    label: "A1 NT2",
    onderwerp: "Naar de dokter: een klacht vertellen",
    niveauzin: "met voorbeeldzinnen en taalhulp",
    woorden: "huisarts, assistent, afspraak maken, klacht, pijn, koorts, hoesten, ochtend, middag, herhalen",
    taak: "De cursist voert een kort gesprek met de assistent: klacht noemen, afspraak vragen en tijd controleren.",
    opbrengst: "De cursist kan een eenvoudige klacht vertellen, een afspraak maken en belangrijke gegevens controleren.",
    schrijven: "De cursist schrijft een korte afspraaknotitie met naam, klacht, datum en tijd."
  },
  a2: {
    label: "A2 NT2",
    onderwerp: "Naar de dokter: afspraak maken of verzetten",
    niveauzin: "zelfstandig in een bekende situatie",
    woorden: "klacht beschrijven, afspraak verzetten, verhinderd, voorkeur, bevestigen, gegevens controleren",
    taak: "De cursist belt de huisartsenpraktijk, beschrijft kort de klacht en maakt of verzet een afspraak.",
    opbrengst: "De cursist kan een klacht kort uitleggen, een afspraak maken of wijzigen en controleren of de informatie klopt.",
    schrijven: "De cursist schrijft een kort bericht om een afspraak bij de dokter te bevestigen of te verzetten."
  },
  b1: {
    label: "B1 NT2",
    onderwerp: "Naar de dokter: klacht uitleggen en vervolgafspraak maken",
    niveauzin: "zelfstandig met passende uitleg en controlevragen",
    woorden: "klacht toelichten, symptomen, sinds wanneer, ernst, advies vragen, vervolgafspraak, medicatie, doorverwijzing",
    taak: "De cursist belt de huisartsenpraktijk, legt de klacht met enkele details uit, vraagt om advies en maakt of bevestigt een vervolgafspraak.",
    opbrengst: "De cursist kan een klacht duidelijk toelichten, relevante details geven, advies vragen en gemaakte afspraken controleren.",
    schrijven: "De cursist schrijft een korte samenvatting van de klacht en een bericht om de vervolgafspraak te bevestigen."
  }
};

function voorbeeldNiveauKey(niveau) {
  const laag = String(niveau || "").toLowerCase();
  if (laag.includes("alfa b")) return "alfaB";
  if (laag.includes("b1")) return "b1";
  if (laag.includes("a2")) return "a2";
  return "a1";
}

function maakVoorbeeldLes(profielId = "taalroute", niveau = "") {
  const niveauKey = voorbeeldNiveauKey(niveau);
  const voorbeeld = voorbeeldNiveaus[niveauKey];
  const basis = {
    lesonderwerp: voorbeeld.onderwerp,
    groepsniveau: niveau || voorbeeld.label,
    lesduur: 90,
    didactischModel: "vut",
    profielFocus: "Doelgerichtheid, activering, praktijkleren, woordenschat, feedback en zichtbare opbrengst.",
    boekPaginas: "Taalroute thema Gezondheid. Gebruik een korte dialoog bij de huisartsenpraktijk, woordkaartjes met lichaamsdelen/klachten, afspraakkaart, klok/agenda en een eenvoudig formulier met afspraakgegevens.",
    lesdoel: `De cursist kan ${voorbeeld.niveauzin} aan de dokter of assistent vertellen welke klacht hij heeft en een afspraak voorbereiden, oefenen en uitvoeren.`,
    leeropbrengst: `${voorbeeld.opbrengst}${NL}De cursist laat dit zien door een gesprek te voeren, gegevens te controleren en een korte afspraaknotitie te maken.`,
    hoofdvaardigheid: "Spreken",
    ondersteunendeVaardigheid: "Luisteren en schrijven ondersteunen de spreektaak.",
    lezen: `De cursist leest een korte afspraakkaart en markeert naam, klacht, datum, tijd en plaats.${NL}Daarna leest de cursist een kort voorbeeldgesprek: "Ik heb pijn in mijn buik. Ik wil graag een afspraak."`,
    luisteren: `De cursist luistert naar een korte dialoog tussen assistent en patient bij de huisarts.${NL}Luisterdoel: hoor je de klacht, naam, dag en tijd?`,
    spreken: `De cursist oefent eerst vaste zinnen klassikaal, daarna in tweetallen met rolkaartjes.${NL}Tweede ronde: rollen wisselen en een extra controlezin gebruiken.`,
    schrijven: `${voorbeeld.schrijven}${NL}De cursist controleert de notitie met een klasgenoot: datum, tijd en reden compleet?`,
    woordenschatactiviteit: `Kernwoorden aanbieden, uitspreken, koppelen aan beeld en actief gebruiken: ${voorbeeld.woorden}.${NL}Werkvorm: wijs het lichaamsdeel aan, kies de klachtkaart, zeg de zin "Ik heb pijn in mijn..." en gebruik het woord in het rollenspel.`,
    grammatica: `Vraagzinnen en vaste formuleringen: Ik heb pijn in..., Ik voel me niet goed, Ik wil graag een afspraak, Kan ik vandaag komen?${NL}Let op woordvolgorde bij vraagzinnen en korte ik-zinnen.`,
    uitspraak: "Oefenen met verstaanbaar uitspreken van klachtwoorden, lichaamsdelen, datum, tijd en de zin: Kunt u dat herhalen?",
    taalfocus: `Taalhandelingen: groeten, klacht noemen, afspraak vragen, tijd controleren en bedanken.${NL}Zinsbouw: korte ik-zinnen, klachtzinnen en vraagzinnen.`,
    receptieveInput: `Voorbeelddialoog, afspraakkaart, woordkaartjes, kalender/klok, korte mondelinge instructie en een voorbeeld op het bord.${NL}De docent modelt eerst het hele gesprek.`,
    productieveTaak: `De cursist voert een kort gesprek met de assistent en noteert de afspraakgegevens.${NL}Product: mondeling rollenspel plus ingevulde afspraaknotitie met klacht.`,
    functioneleTaak: `${voorbeeld.taak}${NL}De taak heeft een duidelijk doel: een afspraak krijgen en de gegevens goed controleren.`,
    momentCursistAanHetWoord: "Cursisten oefenen minimaal twee rondes in tweetallen: assistent en patient. Iedere cursist stelt minimaal een vraag en geeft minimaal een antwoord.",
    werkvormActieveDeelname: "Woordkaartjes sorteren, luistervraag beantwoorden, dialoog aanvullen, rolwissel, korte feedbackronde en exit-zin.",
    benodigdMateriaal: "Woordkaartjes met lichaamsdelen en klachten, pictogrammen dokter/telefoon/kalender/klok, voorbeeldgesprek, rolkaartjes, afspraakkaart, bord en eventueel audio of docentmodel.",
    instructieDocent: `1. Toon het lesdoel en de praktijksituatie.${NL}2. Doe het gesprek hardop voor.${NL}3. Markeer de vaste zinnen op het bord.${NL}4. Laat cursisten eerst nazeggen, daarna kiezen en toepassen.${NL}5. Geef korte feedback op verstaanbaarheid en volledigheid.`,
    vutVooruitkijken: `Lesdoel tonen, voorkennis activeren en praktijksituatie zichtbaar maken: Wat zeg je als je naar de dokter moet?${NL}Kernwoorden met beeld introduceren en twee voorbeeldzinnen op het bord zetten: Ik heb pijn. Ik wil een afspraak.`,
    vutUitvoeren: `Input: korte dialoog luisteren/lezen.${NL}Oefenen: woorden, zinnen en uitspraak.${NL}Toepassen: rollenspel in tweetallen met afspraakkaart.${NL}Feedback: docent luistert gericht mee en geeft één verbeterpunt.`,
    vutTerugkijken: `Cursisten noemen wat zij nu kunnen zeggen en welke woorden zij buiten de les gaan gebruiken.${NL}Exit: iedere cursist zegt of schrijft één afspraakzin.`,
    tijdsindeling: maakAutomatischeTijdsindeling(90, "vut"),
    faseInput: "De docent biedt een herkenbare dialoog en kernwoorden aan met beeld, bordzinnen en luistervraag.",
    faseReproductie: "Cursisten zeggen kernzinnen na, vullen ontbrekende woorden in en oefenen vraag-antwoord in vaste volgorde.",
    faseGestuurdeProductie: "Cursisten gebruiken rolkaartjes en taalhulp om het gesprek in tweetallen te voeren.",
    faseVrijeProductie: "Cursisten passen de situatie aan: andere klacht, andere dag, andere tijd, afspraak verzetten of extra vraag stellen.",
    checkOpBegrip: `De docent laat cursisten de opdracht in eigen woorden herhalen en controleert met open vragen:${NL}Wat is je klacht? Wat vraag je aan de assistent? Welke informatie moet je opschrijven? Hoe controleer je de tijd?`,
    feedbackmoment: "Tijdens en na de rollenspellen geeft de docent korte feedback op verstaanbaarheid, volledigheid, passende zinnen en controleren van gegevens.",
    differentiatie: `Steun: woordkaart, afbeelding, voorbeeldzin en samen voordoen.${NL}Midden: rolkaart met kernwoorden.${NL}Plus: afspraak verzetten, reden geven of extra vraag stellen.`,
    werkklimaat: "Veilig oefenen met vaste zinnen, eerst samen en daarna in tweetallen. Fouten worden gebruikt als oefenkans.",
    intercultureelKlimaat: "Ruimte voor verschillen: wanneer bel je zelf, wanneer helpt iemand anders?",
    voortgangsbewaking: "De docent noteert per cursist: met veel steun, met taalhulp of zelfstandig. Let op kernzinnen, uitspraak en gegevens controleren.",
    examenrelevantie: "Voorbereiding op spreken, luisteren, praktische taakuitvoering, informatie vragen en korte schriftelijke notitie.",
    praktijklerenLes: "Herkenbare situatie: bellen of aan de balie van de huisarts zeggen wat er aan de hand is en een afspraak maken. Cursisten oefenen met fictieve gegevens op kaartjes.",
    praktijklerenBuitenLes: "Kijk thuis naar een medicijndoosje, afspraakkaart of gezondheidsbrief zonder persoonsgegevens te delen. Noteer twee woorden die met dokter of gezondheid te maken hebben.",
    hybrideOpdracht: "Online cursist oefent via breakout of chat met dezelfde rolkaart.",
    onlineInteractie: "Online deelnemer stelt minimaal een vraag en geeft afspraakgegevens terug.",
    terugblikOpOpbrengst: "Iedere cursist zegt een zin die hij of zij nu kan gebruiken. Daarna kruist de cursist aan: dit kan ik met hulp, dit kan ik bijna zelf, dit kan ik zelf.",
    huiswerk: `Herhaal de kernwoorden en schrijf datum en tijd van een voorbeeldafspraak op.${NL}Voorbereiding volgende les: neem een vraag mee die je aan een assistent, balie of docent kunt stellen. Gebruik geen echte persoonsgegevens.`
  };
  const profielVoorbeelden = {
    taalroute: {
      themafase: "toepassen",
      praktijkkern: `Gezondheid: naar de dokter gaan, een klacht noemen en contact maken met de huisarts of assistent.${NL}De cursist oefent taal die direct bruikbaar is bij bellen, baliecontact of hulp vragen.`,
      werkbrug: `Van boekdialoog over de dokter naar eigen gesprek met klacht en afspraakgegevens.${NL}Eerst herkenning in boek/ELO, daarna oefenen met eigen klachtkaart en afspraaknotitie.`,
      kernwoorden: voorbeeld.woorden,
      taalpatronen: `Ik heb pijn in mijn buik/hoofd/rug.${NL}Ik voel me niet goed.${NL}Ik wil graag een afspraak maken.${NL}Wanneer kan ik komen?${NL}Kunt u dat herhalen?${NL}Dat is goed, dank u wel.`,
      watKanIkNu: "Ik kan een eenvoudige klacht vertellen, een afspraak maken, gegevens controleren en een korte afspraaknotitie maken.",
      eloKoppeling: `Nieuwe woorden: kernwoorden gezondheid.${NL}Luister en lees: korte dialoog assistent-patient.${NL}Doe de taak: afspraak maken met rolkaart.${NL}Minitoets: woorden en afspraakgegevens herkennen.`,
      interactiveBook1: "Luister naar de dialoog, sleep de woorden naar de juiste betekenis en kies de juiste afspraakgegevens.",
      interactiveBook2: "Oefen de zinnen, kies de juiste reactie en spreek de voorbeeldzinnen hardop na."
    },
    erk: {
      erkNiveau: voorbeeld.label,
      canDoDoel: `De cursist kan ${voorbeeld.niveauzin} een eenvoudige klacht bij de dokter noemen, een afspraak maken en belangrijke gegevens controleren.`,
      mateVanSteun: niveauKey === "a2" ? "zelfstandig in bekende situatie" : "met taalhulp",
      succescriteria: `De cursist:${NL}- noemt naam en klacht${NL}- vraagt om een afspraak${NL}- begrijpt of kiest een dag/tijd${NL}- controleert de afspraak${NL}- sluit passend af.`,
      differentiatieNiveau: `Alfa B: met beeld, nadoen en korte vaste zin.${NL}A1: met taalhulp en rolkaart.${NL}A2: met extra reden, wijziging of controlevraag.`,
      bewijsVanOpbrengst: "Ingevulde afspraaknotitie, observatie van het rollenspel en korte zelfcheck na afloop."
    },
    staatsexamen: {
      examenonderdeel: "spreken",
      examenvaardigheid: "kort reageren en informatie vragen",
      taaktype: "rollenspel met praktische vraag bij de huisartsenpraktijk",
      examenstrategie: `Antwoord plannen: wie ben ik, wat is mijn klacht, wat wil ik, wanneer kan ik?${NL}Sleutelwoorden gebruiken.${NL}Tijd bewaken.${NL}Controleren: Kunt u dat herhalen? Dus de afspraak is...`,
      tijdslimiet: "2 minuten voorbereiding, 2 minuten gesprek",
      beoordelingscriteria: `Begrijpelijkheid: is de klacht duidelijk?${NL}Volledigheid: naam, klacht, dag/tijd en controle.${NL}Passende reactie: beleefd vragen en afsluiten.${NL}Strategie: herhalen of controleren bij twijfel.`,
      oefenronde: `Ronde 1 zonder tijdsdruk met taalhulp.${NL}Ronde 2 met korte voorbereiding.${NL}Ronde 3 met één beoordelingscriterium als focus.`,
      verbeteractie: "Cursist kiest één verbeterpunt, past de taalsteun aan en voert het gesprek opnieuw.",
      examenhuiswerk: "Oefen drie vaste zinnen hardop, schrijf een afspraaknotitie en onderstreep de woorden die je nodig hebt voor het gesprek."
    },
    zroute: {
      praktijksituatie: "Bellen of langsgaan bij de huisarts: zeggen waar je pijn hebt en een afspraak maken.",
      eenvoudigLesdoel: "Ik kan zeggen: ik heb pijn. Ik wil een afspraak.",
      voordoen: `De docent doet het gesprek langzaam voor met afbeelding, kaartjes en gebaren.${NL}Daarna wijst de docent de belangrijke woorden aan.`,
      samenOefenen: `De groep zegt de zinnen na.${NL}Daarna oefenen cursisten met docentsteun en daarna in tweetallen.`,
      mondelingeInteractie: "Vraag en antwoord met vaste beurtwisseling: assistent vraagt, cursist antwoordt, cursist controleert.",
      beeldsteun: "Pictogram huisarts, telefoon, kalender en klok.",
      herhalingsvorm: `Voorzeggen, nazeggen, aanwijzen, kaart kiezen, rol wisselen en nog een keer proberen.${NL}Elke ronde gebruikt dezelfde kernzinnen.`,
      praktijktaak: voorbeeld.taak,
      buitenschoolseOpdracht: "Kijk thuis naar een afspraakkaart of agenda en neem een voorbeeld mee.",
      terugblikEenvoudigeTaal: "Ik kan zeggen: ik heb pijn. Ik kan mijn naam zeggen. Ik kan een tijd zeggen.",
      zrouteSteunlijn: `Met afbeelding, nadoen en vaste zinnen: Ik heb pijn. Ik wil een afspraak.${NL}Docent of maatje helpt met woordkaart.`,
      zrouteMiddenlijn: `Met rolkaart zelf naam, klacht en tijd zeggen.${NL}Cursist controleert de tijd met een voorbeeldzin.`,
      zroutePluslijn: `Zelf een extra klachtzin of vraag stellen, of de afspraak verzetten.${NL}Cursist legt kort uit waarom een ander moment nodig is.`
    },
    mbo: {
      branche: "zorg",
      werkcontext: "Balie, zorgpraktijk of telefonisch contact met client/patient in een huisartsenpraktijk.",
      beroepshandeling: `Klacht kort uitvragen, afspraak aannemen, gegevens controleren en doorgeven.${NL}Werkhandeling: vriendelijk openen, vraag verhelderen, klacht noteren, afspraak bevestigen.`,
      vaktaal: "afspraak, client, patient, agenda, beschikbaar, bevestigen, verzetten.",
      werknemersvaardigheid: "klantvriendelijk reageren",
      instructietaal: `Vraag door, herhaal de gegevens en sluit netjes af.${NL}Gebruik: Goedemorgen, waarmee kan ik u helpen? Ik herhaal de afspraak even.`,
      samenwerking: "Cursisten oefenen in rollen: medewerker, client/patient en observator. De observator let op werktaal en klantvriendelijkheid.",
      veiligheid: "Geen privegegevens hardop delen; oefen met fictieve namen en fictieve telefoonnummers.",
      feedbackWerktaal: `Feedback op beleefde formulering, duidelijk spreken, gegevens controleren en rustig blijven bij onduidelijkheid.${NL}Verbeterzin wordt opnieuw geoefend.`,
      transferWerkplek: "Gebruik dezelfde zinnen bij stage, vrijwilligerswerk, baliewerk of telefonisch contact op de werkplek."
    }
  };
  return {
    ...basis,
    ...profielVoorbeelden.taalroute,
    ...profielVoorbeelden.erk,
    ...profielVoorbeelden.staatsexamen,
    ...profielVoorbeelden.zroute,
    ...profielVoorbeelden.mbo,
    aangepasteInstructies: `Voorbeeldles over naar de dokter op ${voorbeeld.label}. Alle profielvelden zijn op de achtergrond gevuld; de docent kan in Alleen BOW starten en later profielvelden of alles openen.`,
    ...(profielVoorbeelden[profielId] || {})
  };
}

const labelNaarVeld = {
  Les: "lesonderwerp",
  Lesonderwerp: "lesonderwerp",
  Thema: "lesonderwerp",
  "Boek / pagina's": "boekPaginas",
  "Boek / pagina’s": "boekPaginas",
  "Boek en inhoud": "boekPaginas",
  Lesdoel: "lesdoel",
  Leeropbrengst: "leeropbrengst",
  Hoofdvaardigheid: "hoofdvaardigheid",
  "Ondersteunende vaardigheid": "ondersteunendeVaardigheid",
  Luisteren: "luisteren",
  Lezen: "lezen",
  Spreken: "spreken",
  Schrijven: "schrijven",
  Grammatica: "grammatica",
  Uitspraak: "uitspraak",
  "Productieve taak": "productieveTaak",
  "Receptieve input": "receptieveInput",
  Taalfocus: "taalfocus",
  Examenrelevantie: "examenrelevantie",
  Tijdsindeling: "tijdsindeling",
  Woordenschatactiviteit: "woordenschatactiviteit",
  "Functionele taak": "functioneleTaak",
  "Check op begrip": "checkOpBegrip",
  Differentiatie: "differentiatie",
  Werkklimaat: "werkklimaat",
  "Intercultureel klimaat": "intercultureelKlimaat",
  Huiswerk: "huiswerk"
};

const suggesties = {
  lesdoel: [
    "De cursist kan de taal uit deze les gebruiken in een herkenbare situatie uit dagelijks leven, school, werk of samenleving.",
    "De cursist werkt toe naar een concrete taak waarin begrip, taalgebruik en toepassing zichtbaar worden."
  ],
  leeropbrengst: [
    "Aan het einde van de les kan de cursist minimaal drie kernwoorden actief gebruiken in een passende zin.",
    "Aan het einde van de les kan de cursist de geoefende taal toepassen in een korte mondelinge of schriftelijke taak."
  ],
  checkOpBegrip: [
    "De docent controleert begrip voordat cursisten zelfstandig verder werken.",
    "De cursist past de uitleg direct toe in een korte oefening of voorbeeldzin."
  ],
  functioneleTaak: [
    "De cursist voert een herkenbare taak uit die lijkt op een situatie buiten de les.",
    "De taak heeft een duidelijk doel, een ontvanger en een concreet taalproduct."
  ],
  huiswerk: [
    "Het huiswerk herhaalt de kernwoorden en bereidt kort voor op de volgende les.",
    "De cursist maakt een korte praktijkopdracht buiten de les en neemt de opbrengst mee terug."
  ]
};

const veldUitleg = {
  lesdoel: "Beschrijf concreet wat de cursist in deze les leert of oefent.",
  leeropbrengst: "Beschrijf wat de cursist aan het einde van de les kan laten zien, zeggen, schrijven of toepassen.",
  functioneleTaak: "Beschrijf een herkenbare taak buiten de les, zoals iets vragen, uitleggen, invullen, melden of reageren.",
  checkOpBegrip: "Beschrijf hoe je controleert of cursisten uitleg, tekst, opdracht of instructie begrijpen.",
  didactischModel: "Het profiel bepaalt de kwaliteitsbril; het didactische model bepaalt de lesopbouw."
};

function schoonTekst(tekst) {
  return String(tekst || "").replace(/\r\n?/g, NL).split(NL).map((regel) => regel.trimEnd()).join(NL).trim();
}

function browserStorageBeschikbaar() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function maakLesId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `les-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function lesTitel(form) {
  return String(form?.lesonderwerp || "").trim() || "Naamloze les";
}

function lesThema(form) {
  return String(form?.praktijkkern || form?.boekPaginas || form?.profielFocus || form?.lesonderwerp || "").trim();
}

function lesProfielLabel(form) {
  return profielInfo[form?.standaard || "bow"]?.label || "BOW Kwaliteitsprofiel";
}

function formatDatumTijd(waarde) {
  if (!waarde) return "Nog niet bewerkt";
  try {
    return new Intl.DateTimeFormat("nl-NL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(waarde));
  } catch {
    return String(waarde);
  }
}

function normaliseerLesItem(item) {
  if (!item || !item.form) return null;
  const form = { ...legeLes, ...item.form, extraProfielen: Array.isArray(item.form.extraProfielen) ? item.form.extraProfielen : [] };
  return {
    id: item.id || maakLesId(),
    titel: item.titel || lesTitel(form),
    niveau: item.niveau || form.groepsniveau || "",
    profiel: item.profiel || form.standaard || "bow",
    thema: item.thema || lesThema(form),
    aangemaaktOp: item.aangemaaktOp || new Date().toISOString(),
    bijgewerktOp: item.bijgewerktOp || item.aangemaaktOp || new Date().toISOString(),
    form
  };
}

function leesOpgeslagenLessen() {
  if (!browserStorageBeschikbaar()) return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(LESSEN_STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.map(normaliseerLesItem).filter(Boolean) : [];
  } catch {
    return [];
  }
}

function schrijfOpgeslagenLessen(lessen) {
  if (!browserStorageBeschikbaar()) return;
  window.localStorage.setItem(LESSEN_STORAGE_KEY, JSON.stringify(lessen));
}

function esc(waarde) {
  return String(waarde || "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function stripCanvasOpmaak(tekst = "") {
  return String(tekst || "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^\s*-\s+/gm, "");
}

function renderInlineOpmaak(tekst = "") {
  return esc(tekst)
    .replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
}

function renderCanvasTekst(tekst = "") {
  const regels = String(tekst || "").split(/\r?\n/);
  let html = "";
  let lijstOpen = false;
  const sluitLijst = () => {
    if (lijstOpen) {
      html += "</ul>";
      lijstOpen = false;
    }
  };

  regels.forEach((regel) => {
    if (/^\s*-\s+/.test(regel)) {
      if (!lijstOpen) {
        html += "<ul>";
        lijstOpen = true;
      }
      html += `<li>${renderInlineOpmaak(regel.replace(/^\s*-\s+/, ""))}</li>`;
      return;
    }
    if (regel.trim()) {
      sluitLijst();
      html += `<p>${renderInlineOpmaak(regel)}</p>`;
      return;
    }
    sluitLijst();
  });

  sluitLijst();
  return html || "<p></p>";
}

function voegSamen(...delen) {
  return delen.filter((deel) => String(deel || "").trim()).join(NL + NL);
}

function actieveProfielen(form) {
  return [...new Set(["bow", form.standaard || "bow", ...(Array.isArray(form.extraProfielen) ? form.extraProfielen : [])])].filter((id) => profielInfo[id]);
}

function profielLabels(ids) {
  return ids.map((id) => profielInfo[id]?.label).filter(Boolean).join(" + ");
}

function veldGroepenVoorProfielen(form) {
  const ids = actieveProfielen(form);
  const groepIds = [...new Set(ids.flatMap((id) => profielVeldGroepen[id] || []).filter(Boolean))];
  return groepIds.map((id) => veldGroepen.find((groep) => groep.id === id)).filter(Boolean);
}

function filterGroepVelden(groepen, veldSet) {
  return groepen.map((groep) => ({
    ...groep,
    velden: groep.velden.filter(([key]) => veldSet.has(key))
  })).filter((groep) => groep.velden.length > 0);
}

function veldGroepenVoorWeergave(form, weergave = "profiel") {
  if (weergave === "alles") return veldGroepen;
  if (weergave === "bow") return filterGroepVelden(veldGroepenVoorProfielen({ ...form, standaard: "bow", extraProfielen: [] }), verplichteBowVelden);
  return veldGroepenVoorProfielen(form);
}

function isBowVeld(key) {
  return verplichteBowVelden.has(key);
}

const verbeterVelden = new Set([
  "lesdoel",
  "leeropbrengst",
  "functioneleTaak",
  "checkOpBegrip",
  "praktijklerenLes",
  "praktijklerenBuitenLes",
  "huiswerk",
  "taalfocus",
  "productieveTaak"
]);

function isVageTekst(waarde) {
  const laag = String(waarde || "").toLowerCase();
  return !waarde || ["oefenen met", "werken aan", "kennismaken met", "begrijpen", "behandelen", "leren over"].some((term) => laag.includes(term));
}

const verbeterVeldLabels = {
  lesdoel: "lesdoel",
  leeropbrengst: "leeropbrengst",
  functioneleTaak: "functionele taak",
  checkOpBegrip: "check op begrip",
  praktijklerenLes: "praktijkleren in de les",
  praktijklerenBuitenLes: "praktijkleren buiten de les",
  huiswerk: "huiswerk",
  taalfocus: "taalfocus",
  productieveTaak: "productieve taak"
};

function verbeterWaarschuwingVoorVeld(veldKey, waarde) {
  const tekst = String(waarde || "").trim();
  const laag = tekst.toLowerCase();
  const label = verbeterVeldLabels[veldKey] || "veld";
  if (!tekst) return `Dit ${label} is nog leeg. Kies een passende startzin of voeg eerst eigen informatie toe.`;
  if (isVageTekst(tekst)) return `Dit ${label} lijkt nog algemeen. Maak zichtbaar wie wat doet, met welke steun en in welke praktijksituatie.`;
  if (veldKey === "functioneleTaak" && !["rol", "resultaat", "situatie", "gesprek", "formulier", "notitie", "bericht"].some((term) => laag.includes(term))) {
    return "De functionele taak kan sterker met een duidelijke rol, praktijksituatie en zichtbaar resultaat.";
  }
  if (veldKey === "checkOpBegrip" && !["vraag", "controle", "laat", "herhaal", "toepas", "wijs", "check"].some((term) => laag.includes(term))) {
    return "De check op begrip kan sterker door cursisten iets te laten herhalen, aanwijzen of toepassen.";
  }
  if (veldKey === "huiswerk" && !["volgende les", "voorbereid", "praktijk", "zoek", "noteer", "neem mee", "luister"].some((term) => laag.includes(term))) {
    return "Huiswerk wordt sterker als het ook voorbereidt op de volgende les of een kleine praktijkopdracht bevat.";
  }
  return "";
}

const verbeterContexten = {
  gezondheid: {
    woorden: ["dokter", "huisarts", "pijn", "klacht", "afspraak", "medicijn", "gezondheid", "assistente", "ziek"],
    situatie: "doktersituatie",
    taak: "een klacht noemen en een afspraak vragen",
    input: "een afspraakkaart, klachtkaart of kort gesprek bij de huisarts",
    praktijk: "bellen of langsgaan bij de huisartsenpraktijk"
  },
  zorg: {
    woorden: ["zorg", "client", "bewoner", "patient", "verzorging", "rapporteren", "zorgplan", "medicatie", "wassen"],
    situatie: "zorgsituatie",
    taak: "informatie doorgeven, hulp vragen en zorgvuldig reageren",
    input: "een zorginstructie, rapportage of overdrachtsgesprek",
    praktijk: "een korte overdracht of vraag op de zorgplek"
  },
  geld: {
    woorden: ["geld", "rekening", "betalen", "pinpas", "contant", "budget", "toeslag", "huur", "kosten", "factuur"],
    situatie: "situatie rond geld en betalen",
    taak: "bedragen begrijpen, betalen en een vraag stellen over kosten",
    input: "een rekening, bon, betaalverzoek of budgetoverzicht",
    praktijk: "een betaling doen of een vraag stellen over geld"
  },
  boodschappen: {
    woorden: ["boodschappen", "supermarkt", "aanbieding", "recept", "ingrediënt", "pak", "liter", "kilo"],
    situatie: "situatie in de supermarkt",
    taak: "producten zoeken, prijzen vergelijken en om hulp vragen",
    input: "een boodschappenlijst, aanbieding, recept of prijskaartje",
    praktijk: "boodschappen doen en een vraag stellen in de winkel"
  },
  digitaal: {
    woorden: ["digitaal", "online", "app", "email", "e-mail", "wachtwoord", "inloggen", "bericht", "website", "qr"],
    situatie: "digitale situatie",
    taak: "een digitaal bericht begrijpen, inloggen of online informatie invullen",
    input: "een e-mail, appscherm, website of digitaal formulier",
    praktijk: "een eenvoudige digitale handeling uitvoeren"
  },
  werk: {
    woorden: ["werk", "collega", "leidinggevende", "dienst", "taak", "veiligheid", "pauze", "rooster", "werknemer"],
    situatie: "werksituatie",
    taak: "een taak bespreken, hulp vragen en iets doorgeven",
    input: "een werkinstructie, rooster of kort overleg",
    praktijk: "een gesprek met een collega of leidinggevende"
  },
  werkzoeken: {
    woorden: ["solliciteren", "vacature", "cv", "motivatie", "werk zoeken", "uitzendbureau", "gesprek", "ervaring"],
    situatie: "situatie rond werk zoeken",
    taak: "informatie over werk begrijpen, ervaring noemen en een vraag stellen",
    input: "een vacature, cv, sollicitatieformulier of gesprek",
    praktijk: "reageren op een vacature of gesprek bij werk zoeken"
  },
  schoonmaak: {
    woorden: ["schoonmaak", "schoonmaken", "doek", "emmer", "middel", "stofzuigen", "vloer", "hygiëne"],
    situatie: "schoonmaaksituatie",
    taak: "een werkinstructie begrijpen en veilig uitvoeren",
    input: "een schoonmaakinstructie, pictogram of taaklijst",
    praktijk: "een schoonmaaktaak bespreken of uitvoeren"
  },
  logistiek: {
    woorden: ["logistiek", "magazijn", "pakket", "order", "scanner", "pallet", "laden", "lossen", "voorraad"],
    situatie: "logistieke werksituatie",
    taak: "een opdracht begrijpen, locatie noemen en iets melden",
    input: "een orderlijst, scannertekst of magazijninstructie",
    praktijk: "een taak in magazijn of logistiek uitvoeren"
  },
  horeca: {
    woorden: ["horeca", "restaurant", "keuken", "bestelling", "menu", "klant", "tafel", "reservering"],
    situatie: "horecasituatie",
    taak: "een bestelling opnemen, iets uitleggen of klantvriendelijk reageren",
    input: "een menu, bestelling, reservering of klantgesprek",
    praktijk: "een kort gesprek met gast, klant of collega"
  },
  techniek: {
    woorden: ["techniek", "machine", "gereedschap", "storing", "reparatie", "meten", "onderdeel", "monteren"],
    situatie: "technische werksituatie",
    taak: "een instructie begrijpen, materiaal benoemen en een probleem melden",
    input: "een technische instructie, veiligheidskaart of werkbon",
    praktijk: "een technische taak bespreken of uitvoeren"
  },
  groen: {
    woorden: ["groen", "tuin", "plant", "maaien", "snoeien", "onkruid", "gereedschap", "buitenwerk"],
    situatie: "groen- of buitendienstsituatie",
    taak: "een buitentaak begrijpen, materiaal benoemen en veilig werken",
    input: "een taaklijst, pictogram of mondelinge instructie",
    praktijk: "een groen- of buitentaak uitvoeren"
  },
  administratie: {
    woorden: ["administratie", "document", "map", "bestand", "gegevens", "kopie", "afspraak", "registreren"],
    situatie: "administratieve situatie",
    taak: "gegevens controleren, ordenen en een korte vraag stellen",
    input: "een document, lijst, e-mail of administratief formulier",
    praktijk: "een eenvoudige administratieve taak uitvoeren"
  },
  gemeente: {
    woorden: ["gemeente", "formulier", "aanvraag", "balie", "afspraak", "paspoort", "brief", "loket"],
    situatie: "situatie bij de gemeente",
    taak: "informatie vragen en gegevens invullen",
    input: "een formulier, brief of baliegesprek",
    praktijk: "een afspraak of vraag bij de gemeente"
  },
  formulieren: {
    woorden: ["formulier", "invullen", "gegevens", "handtekening", "aanvraag", "bewijs", "document", "kopie"],
    situatie: "situatie met formulieren en gegevens",
    taak: "gegevens begrijpen, invullen en controleren",
    input: "een formulier, aanvraag of instructiebrief",
    praktijk: "een formulier invullen of hulp vragen bij gegevens"
  },
  brieven: {
    woorden: ["brief", "post", "bericht", "kenmerk", "datum", "antwoord", "officieel", "instantie"],
    situatie: "situatie met brieven en berichten",
    taak: "belangrijke informatie vinden en passend reageren",
    input: "een brief, e-mail of officieel bericht",
    praktijk: "een brief begrijpen en een vervolgstap kiezen"
  },
  school: {
    woorden: ["school", "docent", "oudergesprek", "huiswerk", "les", "opleiding", "cursus"],
    situatie: "schoolsituatie",
    taak: "informatie vragen, afspraken begrijpen en reageren",
    input: "een schoolbericht, rooster of gesprek met de docent",
    praktijk: "een vraag stellen op school of in de cursus"
  },
  kinderopvang: {
    woorden: ["kinderopvang", "opvang", "leidster", "brengen", "halen", "kinderdagverblijf", "bso"],
    situatie: "situatie bij de kinderopvang",
    taak: "informatie geven over een kind, iets melden en afspraken controleren",
    input: "een opvangbericht, formulier of kort gesprek",
    praktijk: "contact met kinderopvang of bso"
  },
  vervoer: {
    woorden: ["bus", "trein", "tram", "metro", "halte", "kaartje", "reis", "vertraging", "ov"],
    situatie: "vervoerssituatie",
    taak: "reisinformatie vragen en een keuze maken",
    input: "een dienstregeling, route-app of omroepbericht",
    praktijk: "een reis plannen of hulp vragen onderweg"
  },
  afspraken: {
    woorden: ["afspraak", "agenda", "datum", "tijd", "verzetten", "annuleren", "bevestigen", "uitnodiging"],
    situatie: "situatie rond afspraken maken",
    taak: "een afspraak maken, verzetten, bevestigen of controleren",
    input: "een agenda, uitnodiging, afspraakkaart of telefoongesprek",
    praktijk: "een afspraak plannen of wijzigen"
  },
  telefoneren: {
    woorden: ["bellen", "telefoon", "telefoneren", "voicemail", "opnemen", "terugbellen", "nummer"],
    situatie: "telefonische situatie",
    taak: "zich voorstellen, reden noemen en een vraag stellen",
    input: "een telefoongesprek, voicemail of belscript",
    praktijk: "een kort telefoongesprek voeren"
  },
  winkel: {
    woorden: ["winkel", "kassa", "prijs", "bon", "ruilen", "betalen", "product", "klant"],
    situatie: "winkelsituatie",
    taak: "iets vragen, kopen, betalen of ruilen",
    input: "een bon, prijskaartje of kort klantgesprek",
    praktijk: "een gesprek in de winkel"
  },
  vrijeTijd: {
    woorden: ["vrije tijd", "sport", "club", "activiteit", "hobby", "bibliotheek", "zwembad", "vereniging"],
    situatie: "vrijetijdssituatie",
    taak: "informatie vragen, inschrijven of een activiteit bespreken",
    input: "een poster, website, rooster of kort gesprek",
    praktijk: "meedoen aan een activiteit of informatie vragen"
  },
  familie: {
    woorden: ["familie", "vriend", "afspreken", "bezoek", "feest", "uitnodiging", "verjaardag"],
    situatie: "sociale situatie met familie of vrienden",
    taak: "een afspraak maken, reageren op een uitnodiging of iets vertellen",
    input: "een bericht, uitnodiging of kort gesprek",
    praktijk: "een sociaal gesprek voeren of bericht beantwoorden"
  },
  wonen: {
    woorden: ["wonen", "huur", "woning", "reparatie", "huisbaas", "energie", "meter", "adres"],
    situatie: "woonsituatie",
    taak: "een probleem melden en een afspraak maken",
    input: "een woonbrief, reparatieverzoek of telefoongesprek",
    praktijk: "contact met verhuurder of woningcorporatie"
  },
  buurt: {
    woorden: ["buurt", "buren", "wijk", "activiteit", "afval", "overlast", "bibliotheek"],
    situatie: "buurtsituatie",
    taak: "informatie vragen en reageren op een bericht",
    input: "een wijkbericht, poster of kort gesprek",
    praktijk: "een vraag stellen in de buurt"
  },
  opvoeding: {
    woorden: ["kind", "ouder", "opvang", "schoolarts", "opvoeding", "ziek melden", "afmelden"],
    situatie: "situatie rond kind en opvoeding",
    taak: "informatie geven, iets melden en een afspraak maken",
    input: "een bericht van school, opvang of zorg",
    praktijk: "contact met school, opvang of zorgverlener"
  },
  examen: {
    woorden: ["examen", "toets", "lezen", "luisteren", "schrijven", "spreken", "strategie", "tijd"],
    situatie: "examensituatie",
    taak: "een taak uitvoeren met passende strategie en tijdsbewaking",
    input: "een examentekst, audio, schrijfopdracht of spreektaak",
    praktijk: "gericht oefenen met een examenvorm"
  }
};

const verbeterNiveauLijnen = [
  { match: ["alfa a"], steun: "met veel beeld, voordoen en nazeggen", bewijs: "door aan te wijzen, na te zeggen en samen te oefenen" },
  { match: ["alfa b"], steun: "met voorbeeldzinnen, beeld en een taalkaart", bewijs: "door een korte zin te zeggen of over te nemen" },
  { match: ["alfa c", "a1"], steun: "met vaste zinnen en taalhulp", bewijs: "door een korte bekende taaltaak uit te voeren" },
  { match: ["a2"], steun: "redelijk zelfstandig in een bekende situatie", bewijs: "door een taak met enkele eigen zinnen uit te voeren" },
  { match: ["b1"], steun: "zelfstandig met meer nuance", bewijs: "door informatie toe te lichten, te reageren en door te vragen" }
];

const verbeterContextLabels = {
  gezondheid: "gezondheid",
  zorg: "zorg",
  geld: "geld en betalen",
  boodschappen: "boodschappen",
  digitaal: "digitale zaken",
  werk: "werk",
  werkzoeken: "werk zoeken",
  schoonmaak: "schoonmaak",
  logistiek: "logistiek",
  horeca: "horeca",
  techniek: "techniek",
  groen: "groen",
  administratie: "administratie",
  gemeente: "gemeente",
  formulieren: "formulieren",
  brieven: "brieven en berichten",
  school: "school",
  kinderopvang: "kinderopvang",
  vervoer: "vervoer",
  afspraken: "afspraken maken",
  telefoneren: "telefoneren",
  winkel: "winkel",
  vrijeTijd: "vrije tijd",
  familie: "familie en afspraken",
  wonen: "wonen",
  buurt: "buurt",
  opvoeding: "opvoeding",
  examen: "examen"
};

const verbeterContextTaalsteun = {
  gezondheid: { woorden: ["klacht", "afspraak", "medicijn"], zinnen: ["Ik heb pijn.", "Ik wil graag een afspraak."] },
  zorg: { woorden: ["client", "zorgplan", "doorgeven"], zinnen: ["Ik geef dit door.", "Kunt u mij helpen?"] },
  geld: { woorden: ["rekening", "bedrag", "betalen"], zinnen: ["Hoeveel moet ik betalen?", "Ik heb een vraag over de rekening."] },
  boodschappen: { woorden: ["prijs", "aanbieding", "product"], zinnen: ["Waar kan ik dit vinden?", "Hoeveel kost dit?"] },
  digitaal: { woorden: ["inloggen", "wachtwoord", "bericht"], zinnen: ["Ik kan niet inloggen.", "Waar moet ik klikken?"] },
  werk: { woorden: ["taak", "rooster", "leidinggevende"], zinnen: ["Wat moet ik doen?", "Ik heb hulp nodig."] },
  werkzoeken: { woorden: ["vacature", "ervaring", "sollicitatie"], zinnen: ["Ik heb ervaring met...", "Ik wil solliciteren."] },
  schoonmaak: { woorden: ["taaklijst", "middel", "veilig"], zinnen: ["Welke taak doe ik eerst?", "Welk middel moet ik gebruiken?"] },
  logistiek: { woorden: ["order", "scanner", "magazijn"], zinnen: ["Waar moet dit pakket heen?", "De scanner werkt niet."] },
  horeca: { woorden: ["bestelling", "menu", "klant"], zinnen: ["Wat wilt u bestellen?", "Ik vraag het aan mijn collega."] },
  techniek: { woorden: ["storing", "gereedschap", "onderdeel"], zinnen: ["Er is een storing.", "Welk gereedschap heb ik nodig?"] },
  groen: { woorden: ["taak", "gereedschap", "veilig"], zinnen: ["Wat moet ik snoeien?", "Ik werk veilig met dit gereedschap."] },
  administratie: { woorden: ["gegevens", "document", "kopie"], zinnen: ["Welke gegevens ontbreken?", "Ik maak een kopie."] },
  gemeente: { woorden: ["formulier", "afspraak", "balie"], zinnen: ["Ik heb een afspraak.", "Kunt u mij helpen met dit formulier?"] },
  formulieren: { woorden: ["gegevens", "handtekening", "aanvraag"], zinnen: ["Waar moet ik tekenen?", "Welke gegevens moet ik invullen?"] },
  brieven: { woorden: ["datum", "kenmerk", "antwoord"], zinnen: ["Wat moet ik doen?", "Voor wanneer moet ik reageren?"] },
  school: { woorden: ["rooster", "huiswerk", "docent"], zinnen: ["Wat is het huiswerk?", "Ik heb een vraag over de les."] },
  kinderopvang: { woorden: ["brengen", "halen", "kind"], zinnen: ["Ik kom mijn kind ophalen.", "Mijn kind is vandaag ziek."] },
  vervoer: { woorden: ["halte", "vertraging", "kaartje"], zinnen: ["Welke bus moet ik nemen?", "Hoe laat vertrekt de trein?"] },
  afspraken: { woorden: ["datum", "tijd", "verzetten"], zinnen: ["Kan ik de afspraak verzetten?", "Welke datum komt uit?"] },
  telefoneren: { woorden: ["bellen", "terugbellen", "bericht"], zinnen: ["Met wie spreek ik?", "Kunt u mij terugbellen?"] },
  winkel: { woorden: ["bon", "ruilen", "kassa"], zinnen: ["Kan ik dit ruilen?", "Mag ik de bon?"] },
  vrijeTijd: { woorden: ["activiteit", "inschrijven", "rooster"], zinnen: ["Wanneer begint de activiteit?", "Kan ik mij inschrijven?"] },
  familie: { woorden: ["afspraak", "uitnodiging", "bezoek"], zinnen: ["Dank je voor de uitnodiging.", "Hoe laat kom je?"] },
  wonen: { woorden: ["reparatie", "huur", "woning"], zinnen: ["Ik wil een reparatie melden.", "Wanneer kan iemand komen?"] },
  buurt: { woorden: ["wijk", "activiteit", "overlast"], zinnen: ["Waar is de activiteit?", "Ik wil iets melden."] },
  opvoeding: { woorden: ["kind", "school", "afmelden"], zinnen: ["Mijn kind is ziek.", "Ik wil mijn kind afmelden."] },
  examen: { woorden: ["strategie", "tijd", "antwoord"], zinnen: ["Ik lees eerst de vraag.", "Ik controleer mijn antwoord."] },
  algemeen: { woorden: ["vraag", "antwoord", "afspraak"], zinnen: ["Kunt u dat herhalen?", "Ik begrijp het."] }
};

function taalsteunVoorContext(id) {
  return verbeterContextTaalsteun[id] || verbeterContextTaalsteun.algemeen;
}

function taalsteunVoorContextEnNiveau(id, niveau = "A1 NT2") {
  const basis = taalsteunVoorContext(id);
  const laag = String(niveau || "").toLowerCase();
  if (laag.includes("b1")) {
    return {
      woorden: [...basis.woorden, "toelichten", "doorvragen"],
      zinnen: [...basis.zinnen, "Kunt u uitleggen wat de volgende stap is?", "Ik wil graag controleren of ik het goed begrijp."]
    };
  }
  if (laag.includes("a2")) {
    return {
      woorden: [...basis.woorden, "afspraak", "controle"],
      zinnen: [...basis.zinnen, "Kunt u dat herhalen?", "Ik controleer de afspraak."]
    };
  }
  if (laag.includes("alfa a") || laag.includes("alfa b") || laag.includes("alfa c") || laag.includes("a1")) {
    return {
      woorden: basis.woorden.slice(0, 3),
      zinnen: basis.zinnen.map((zin) => zin.length > 36 ? zin.split(",")[0].replace(/[.?;:]?$/, ".") : zin).slice(0, 2)
    };
  }
  return basis;
}

function bepaalVerbeterNiveau(niveau = "A1 NT2", forceA1 = false) {
  const bron = forceA1 ? "A1 NT2" : String(niveau || "A1 NT2");
  const laag = bron.toLowerCase();
  return verbeterNiveauLijnen.find((lijn) => lijn.match.some((term) => laag.includes(term))) || verbeterNiveauLijnen[2];
}

function scoreVerbeterContexten(tekst = "") {
  const laag = String(tekst || "").toLowerCase();
  return Object.entries(verbeterContexten)
    .map(([id, context]) => ({
      id,
      context,
      label: verbeterContextLabels[id] || id,
      score: context.woorden.filter((woord) => laag.includes(woord)).length
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label));
}

function bepaalVerbeterContextInfo(tekst = "") {
  const scores = scoreVerbeterContexten(tekst);
  const gevonden = scores[0];
  if (gevonden?.score) return { ...gevonden, alternatieven: scores.slice(1, 4) };
  return {
    id: "algemeen",
    label: "algemene praktijksituatie",
    score: 0,
    alternatieven: [],
    context: {
      situatie: "herkenbare praktijksituatie",
      taak: "passende taal gebruiken om informatie te vragen, te geven of te controleren",
      input: "een tekst, gesprek, voorbeeld of opdracht uit de praktijk",
      praktijk: "een korte toepassing buiten of binnen de les"
    }
  };
}

function contextInfoOpId(id, fallbackTekst = "") {
  if (!id || id === "auto") return bepaalVerbeterContextInfo(fallbackTekst);
  if (id === "algemeen") return bepaalVerbeterContextInfo("");
  const context = verbeterContexten[id];
  return context
    ? { id, label: verbeterContextLabels[id] || id, score: 1, alternatieven: scoreVerbeterContexten(fallbackTekst).filter((item) => item.id !== id).slice(0, 3), context }
    : bepaalVerbeterContextInfo(fallbackTekst);
}

function bepaalVerbeterContext(tekst = "") {
  return bepaalVerbeterContextInfo(tekst).context;
}

function verbeterRecept(veldKey, context, niveauLijn, a1Lijn) {
  const recepten = {
    lesdoel: {
      verbeter: `De cursist kan ${niveauLijn.steun} ${context.taak} in een ${context.situatie}.`,
      concreet: `De cursist kan ${niveauLijn.steun} informatie vragen, antwoord geven en controleren of hij de afspraak of opdracht begrijpt.`,
      a1: `De cursist kan ${a1Lijn.steun} een korte zin gebruiken in een ${context.situatie}.`,
      praktijk: `De cursist oefent taal die nodig is voor ${context.praktijk}.`,
      bow: `De cursist kan ${niveauLijn.steun} in een herkenbare ${context.situatie} een functionele taaltaak uitvoeren en de opbrengst laten zien.`
    },
    leeropbrengst: {
      verbeter: `Aan het einde van de les laat de cursist zien dat hij ${context.taak}.`,
      concreet: `De opbrengst is zichtbaar doordat de cursist een korte mondelinge of schriftelijke reactie geeft.`,
      a1: `De cursist gebruikt enkele kernwoorden en een vaste voorbeeldzin passend bij de situatie.`,
      praktijk: `De cursist past de geoefende taal toe in ${context.praktijk}.`,
      bow: `De opbrengst is concreet zichtbaar via taakuitvoering, feedback en korte terugblik.`
    },
    functioneleTaak: {
      verbeter: `De cursist voert een herkenbare taak uit: ${context.taak} in een ${context.situatie}.`,
      concreet: `De taak heeft een rol, doel en resultaat: taal gebruiken, reactie krijgen en de uitkomst controleren.`,
      a1: `De cursist gebruikt een rolkaart, beeldsteun en vaste zinnen om de taak stap voor stap uit te voeren.`,
      praktijk: `De taak lijkt op ${context.praktijk}.`,
      bow: `De functionele taak is herkenbaar, actief, praktijkgericht en levert zichtbaar taalgebruik op.`
    },
    checkOpBegrip: {
      verbeter: `De docent controleert of cursisten begrijpen wat zij moeten doen, welke taal zij nodig hebben en wat het resultaat is.`,
      concreet: `Cursisten herhalen de opdracht in eigen woorden of wijzen aan welke stap eerst komt.`,
      a1: `De docent gebruikt beeld, keuzevragen en korte open vragen: Wat zeg je? Wat doe je eerst?`,
      praktijk: `De begripcheck gaat over de echte taak: ${context.taak}.`,
      bow: `De begripcheck vindt plaats voor de taak start en opnieuw tijdens de verwerking.`
    },
    praktijklerenLes: {
      verbeter: `Cursisten oefenen in de les met ${context.input}.`,
      concreet: `De les gebruikt een realistische situatie, rollen, taalsteun en een duidelijk resultaat.`,
      a1: `De cursist oefent met beeld, kernwoorden en korte voorbeeldzinnen.`,
      praktijk: `De les bereidt direct voor op ${context.praktijk}.`,
      bow: `Praktijkleren is zichtbaar doordat cursisten taal gebruiken in een herkenbare context.`
    },
    praktijklerenBuitenLes: {
      verbeter: `De cursist voert buiten de les een korte, veilige opdracht uit rond ${context.praktijk}.`,
      concreet: `De cursist observeert, verzamelt of noteert enkele woorden of zinnen zonder persoonsgegevens te delen.`,
      a1: `De cursist zoekt of wijst drie woorden aan die passen bij de situatie.`,
      praktijk: `De opdracht verbindt de les met taalgebruik buiten de klas.`,
      bow: `De buitenopdracht is kort, haalbaar, veilig en gekoppeld aan de volgende les.`
    },
    huiswerk: {
      verbeter: `Herhaal de kernwoorden en bereid een korte taak voor rond ${context.situatie}.`,
      concreet: `Maak twee of drie zinnen af en neem een vraag mee voor de volgende les.`,
      a1: `Oefen vijf woorden en twee vaste zinnen met beeld of voorbeeld.`,
      praktijk: `Het huiswerk bereidt voor op ${context.praktijk}.`,
      bow: `Het huiswerk herhaalt, bereidt voor en stimuleert veilig praktijkleren buiten de les.`
    },
    taalfocus: {
      verbeter: `Taalfocus: woorden, zinnen en taalhandelingen die nodig zijn om ${context.taak}.`,
      concreet: `Werk aan vaste formuleringen voor vragen stellen, antwoord geven, herhalen en controleren.`,
      a1: `Focus op korte ik-zinnen, eenvoudige vraagzinnen en vaste voorbeeldzinnen.`,
      praktijk: `De taalfocus ondersteunt taalgebruik in een ${context.situatie}.`,
      bow: `De taalfocus is gekoppeld aan het lesdoel en helpt de functionele taak uitvoeren.`
    },
    productieveTaak: {
      verbeter: `De cursist produceert taal door mondeling of schriftelijk te laten zien dat hij ${context.taak}.`,
      concreet: `Product: een korte reactie, notitie, ingevuld onderdeel of rollenspel met duidelijk resultaat.`,
      a1: `De cursist zegt of schrijft enkele vaste zinnen met taalhulp.`,
      praktijk: `De cursist maakt taal die bruikbaar is in ${context.praktijk}.`,
      bow: `De productieve taak maakt zichtbaar wat de cursist zelf met taal kan doen.`
    }
  };
  return recepten[veldKey] || recepten.lesdoel;
}

function profielVerbeterOptie(profielIds = [], context, niveauLijn) {
  const ids = Array.isArray(profielIds) && profielIds.length ? profielIds : ["bow"];
  const profielId = ids.find((id) => id !== "bow") || "bow";
  const opties = {
    bow: {
      label: "Maak BOW-proof",
      tekst: `De les maakt zichtbaar dat cursisten ${niveauLijn.steun} ${context.taak}, met een concreet lesdoel, actieve deelname, begripcheck, feedback en terugblik.`
    },
    taalroute: {
      label: "Maak methodegericht",
      tekst: `Koppel de taak aan de Taalroute opbouw: praktijkkern, kernwoorden, taalpatronen, werkbrug en een online vervolgactiviteit rond ${context.situatie}.`
    },
    erk: {
      label: "Maak niveaugericht",
      tekst: `Formuleer dit als can-do: de cursist kan ${niveauLijn.steun} ${context.taak}; succes is zichtbaar in een passende taak op het gekozen niveau.`
    },
    staatsexamen: {
      label: "Maak examengericht",
      tekst: `Maak de taak examengericht met duidelijke strategie, taaktype, tijdsbewaking en feedback op criteria binnen een ${context.situatie}.`
    },
    zroute: {
      label: "Maak eenvoudig en haalbaar",
      tekst: `Maak de taak praktisch en veilig: voordoen, samen oefenen, beeldsteun, herhaling en een korte haalbare toepassing rond ${context.praktijk}.`
    },
    mbo: {
      label: "Maak beroepsgericht",
      tekst: `Koppel de taal aan werk: vaktaal, beroepshandeling, veiligheid, samenwerken en passend reageren in een ${context.situatie}.`
    }
  };
  return opties[profielId] || opties.bow;
}

function verbeterZinnenVoorVeld(veldKey, waarde = "", niveau = "A1 NT2", contextTekst = "", contextId = "auto", profielIds = ["bow"]) {
  if (!verbeterVelden.has(veldKey)) return [];
  const context = contextInfoOpId(contextId, `${contextTekst} ${waarde}`).context;
  const niveauLijn = bepaalVerbeterNiveau(niveau);
  const set = verbeterRecept(veldKey, context, niveauLijn, bepaalVerbeterNiveau(niveau, true));
  const profielOptie = profielVerbeterOptie(profielIds, context, niveauLijn);
  return [
    { label: veldKey === "lesdoel" ? "Verbeter dit lesdoel" : "Verbeter dit veld", tekst: set.verbeter },
    { label: "Maak dit concreter", tekst: set.concreet },
    { label: "Maak dit op A1", tekst: set.a1 },
    { label: "Maak dit praktijkgerichter", tekst: set.praktijk },
    { label: "Maak dit BOW-proof", tekst: set.bow },
    profielOptie
  ].map((item) => ({
    ...item,
    waarschuwing: verbeterWaarschuwingVoorVeld(veldKey, waarde)
  }));
}

const bowMustHaves = [
  { key: "lesdoel", label: "Lesdoel" },
  { key: "leeropbrengst", label: "Leeropbrengst" },
  { key: "vutVooruitkijken", label: "VUT vooruitkijken" },
  { key: "vutUitvoeren", label: "VUT uitvoeren" },
  { key: "vutTerugkijken", label: "VUT terugkijken" },
  { key: "tijdsindeling", label: "Tijdsindeling" },
  { key: "momentCursistAanHetWoord", label: "Cursist aan het woord" },
  { key: "functioneleTaak", label: "Functionele taak" },
  { key: "checkOpBegrip", label: "Check op begrip" },
  { key: "woordenschatactiviteit", label: "Woordenschat" },
  { key: "werkvormActieveDeelname", label: "Actieve deelname" },
  { key: "praktijklerenLes", label: "Praktijkleren in de les" },
  { key: "praktijklerenBuitenLes", label: "Praktijkleren buiten de les" },
  { key: "feedbackmoment", label: "Feedbackmoment" },
  { key: "terugblikOpOpbrengst", label: "Terugblik" },
  { key: "huiswerk", label: "Huiswerk" }
];

const bowKwaliteitsVerdieping = [
  { key: "hoofdvaardigheid", label: "Hoofdvaardigheid" },
  { key: "ondersteunendeVaardigheid", label: "Ondersteunende vaardigheid" },
  { key: "receptieveInput", label: "Receptieve input" },
  { key: "productieveTaak", label: "Productieve taak" },
  { key: "taalfocus", label: "Taalfocus" },
  { key: "differentiatie", label: "Differentiatie" },
  { key: "werkklimaat", label: "Werkklimaat" },
  { key: "voortgangsbewaking", label: "Voortgangsbewaking" }
];

const bowExtraAuditpunten = [
  { key: "benodigdMateriaal", label: "Materiaalgebruik" },
  { key: "instructieDocent", label: "Instructie docent" },
  { key: "werkklimaat", label: "Veilig werkklimaat" },
  { key: "differentiatie", label: "Differentiatie" },
  { key: "voortgangsbewaking", label: "Voortgangsbewaking" },
  { keys: ["lezen", "luisteren", "spreken", "schrijven"], label: "Vier vaardigheden" },
  { keys: ["woordenschatactiviteit", "uitspraak", "grammatica"], label: "Woordenschat, uitspraak en grammatica" },
  { key: "praktijklerenBuitenLes", label: "Praktijkgericht leren buiten de les" },
  { keys: ["hybrideOpdracht", "onlineInteractie"], label: "Hybride/online deelname" }
];

function scoreItemAanwezig(form, item) {
  const keys = item.keys || [item.key];
  return keys.every((key) => Boolean(String(form[key] || "").trim()));
}

function maakScoreSectie(id, titel, uitleg, items, form) {
  const scoreItems = items.map((item) => ({ ...item, aanwezig: scoreItemAanwezig(form, item) }));
  const aanwezig = scoreItems.filter((item) => item.aanwezig).length;
  return {
    id,
    titel,
    uitleg,
    items: scoreItems,
    aanwezig,
    totaal: scoreItems.length,
    percentage: Math.round((aanwezig / scoreItems.length) * 100),
    ontbrekend: scoreItems.filter((item) => !item.aanwezig)
  };
}

function maakBowKwaliteitsscore(form) {
  const secties = [
    maakScoreSectie("must", "1. BOW must-haves", "De harde basis voor een auditwaardige les.", bowMustHaves, form),
    maakScoreSectie("verdieping", "2. Kwaliteitsverdieping", "Didactische kwaliteit die de les sterker en beter verantwoord maakt.", bowKwaliteitsVerdieping, form),
    maakScoreSectie("audit", "3. Extra auditpunten", "Belangrijke aandachtspunten uit toezicht en kwaliteitskader.", bowExtraAuditpunten, form)
  ];
  const items = secties.flatMap((sectie) => sectie.items);
  const aanwezig = items.filter((item) => item.aanwezig).length;
  const percentage = Math.round((aanwezig / items.length) * 100);
  const ontbrekend = items.filter((item) => !item.aanwezig);
  const mustHaveSectie = secties[0];
  const mustHavesCompleet = mustHaveSectie.aanwezig === mustHaveSectie.totaal;
  const allesCompleet = aanwezig === items.length;
  const waarschuwingPrioriteit = ["checkOpBegrip", "functioneleTaak", "lesdoel", "vutVooruitkijken", "vutUitvoeren", "vutTerugkijken", "praktijklerenLes", "huiswerk"];
  const waarschuwingItems = [...ontbrekend].sort((a, b) => {
    const aIndex = waarschuwingPrioriteit.includes(a.key) ? waarschuwingPrioriteit.indexOf(a.key) : 99;
    const bIndex = waarschuwingPrioriteit.includes(b.key) ? waarschuwingPrioriteit.indexOf(b.key) : 99;
    return aIndex - bIndex;
  });
  const status = allesCompleet ? "Volledig audit-klaar" : mustHavesCompleet ? "Audit-klaar" : "Niet audit-klaar";
  const statusType = allesCompleet ? "klaar" : mustHavesCompleet ? "bijna" : "concept";
  return {
    items,
    aanwezig,
    totaal: items.length,
    percentage,
    mustHaveAanwezig: mustHaveSectie.aanwezig,
    mustHaveTotaal: mustHaveSectie.totaal,
    ontbrekend,
    status,
    statusType,
    secties,
    waarschuwingen: waarschuwingItems.slice(0, 4).map((item) => `${item.label} ontbreekt`)
  };
}

const voorbeeldControleVelden = Object.keys(legeLes).filter((key) => !["standaard", "extraProfielen"].includes(key));

function gecombineerdeSuggesties(profielIds, veldKey, didactischModelId) {
  const ids = Array.isArray(profielIds) && profielIds.length ? profielIds : ["bow"];
  return [...new Set(ids.flatMap((id) => haalProfielSuggesties(id, veldKey, didactischModelId)))].slice(0, 8);
}

function pasVerbeterSuggestieToe(waarde, suggestie, modus = "toevoegen") {
  const huidig = String(waarde || "").trim();
  if (modus === "vervangen" || !huidig) return suggestie;
  return huidig.includes(suggestie) ? huidig : `${huidig}${NL}${suggestie}`;
}

function maakBestandsnaam(titel, extensie = "html") {
  const veilig = String(titel || "lesplan").trim().replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "").toLowerCase();
  const metTaalroute = veilig.startsWith("taalroute") ? veilig : `taalroute_${veilig || "lesplan"}`;
  return `${metTaalroute}.${extensie}`;
}

function detecteerType(tekst) {
  const laag = String(tekst || "").toLowerCase();
  if (laag.includes("verwachtingen per les") || laag.includes("vut moet zichtbaar zijn")) return "standaard";
  if (["les:", "lesdoel:", "leeropbrengst:", "hoofdvaardigheid:", "tijdsindeling:", "huiswerk:"].some((label) => laag.includes(label))) return "les";
  return "onbekend";
}

function parseGelabeldeLes(tekst) {
  const nieuw = { ...legeLes };
  let huidigVeld = "";
  schoonTekst(tekst).split(NL).forEach((lijn) => {
    const index = lijn.indexOf(":");
    if (index > 0) {
      const label = lijn.slice(0, index).trim();
      const waarde = lijn.slice(index + 1).trim();
      const veld = labelNaarVeld[label];
      if (veld) {
        huidigVeld = veld;
        nieuw[veld] = waarde;
        return;
      }
    }
    if (huidigVeld && lijn.trim()) nieuw[huidigVeld] = [nieuw[huidigVeld], lijn.trim()].filter(Boolean).join(NL);
  });
  return nieuw;
}

function controleerBowDekken(tekst) {
  const laag = String(tekst || "").toLowerCase();
  const controles = [
    ["Lesdoel", ["lesdoel", "doel"]],
    ["Materiaalgebruik", ["materiaal", "boek", "werkblad", "digitale"]],
    ["Praktijkleren", ["praktijk", "dagelijks leven", "werk", "samenleving"]],
    ["Activering", ["actieve deelname", "tweetal", "groepje", "samenwerken"]],
    ["VUT", ["vut", "vooruitkijken", "uitvoeren", "terugkijken"]],
    ["Feedback", ["feedback", "terugkoppeling", "begripcheck"]],
    ["Vaardigheden", ["lezen", "luisteren", "spreken", "schrijven"]],
    ["Hybride online", ["hybride", "online", "breakout", "chat"]]
  ];
  return controles.map(([naam, termen]) => ({ naam, aanwezig: termen.some((term) => laag.includes(term)) }));
}

function maakTijdsregel(start, duur, activiteit) {
  return `${start} tot ${start + duur} min, ${activiteit}`;
}

function verdeelDuurInBlokken(totaal, gewichten) {
  const minimum = totaal < gewichten.length * 5 ? 1 : 5;
  let blokken = gewichten.map((gewicht) => Math.max(minimum, Math.round((totaal * gewicht) / 5) * 5));
  let verschil = totaal - blokken.reduce((som, blok) => som + blok, 0);
  let index = blokken.length - 1;
  let pogingen = 0;
  while (verschil !== 0 && pogingen < 500) {
    const stap = Math.abs(verschil) < 5 ? verschil : verschil > 0 ? 5 : -5;
    if (blokken[index] + stap >= minimum) {
      blokken[index] += stap;
      verschil -= stap;
    }
    index = index <= 0 ? blokken.length - 1 : index - 1;
    pogingen += 1;
  }
  return blokken;
}

function maakAutomatischeTijdsindeling(lesduur = 90, didactischModel = "vut") {
  const totaal = Number(lesduur) || 90;
  const heeftPauze = totaal >= 120;
  const lestijd = heeftPauze ? totaal - 10 : totaal;
  if (lestijd <= 30) {
    const compacteSchemas = {
      abcd: ["vooruitkijken en A input", "B reproductie en C gestuurde productie", "D vrije productie en terugblik"],
      edi: ["lesdoel, voorkennis en instructie", "begripcheck en begeleide oefening", "zelfstandige verwerking en terugblik"],
      taakgericht: ["taak introduceren en taalsteun aanbieden", "taak voorbereiden en taak uitvoeren", "feedback, verbeteren en transfer"],
      terugplannen: ["eindtaak tonen en benodigde taal ophalen", "input aanbieden en gericht oefenen", "eindtaak uitvoeren, feedback en transfer"],
      vut: ["vooruitkijken en input", "woordenschat, oefening en functionele taak", "feedback en terugblik"]
    };
    const labels = compacteSchemas[didactischModel] || compacteSchemas.vut;
    let minuut = 0;
    return verdeelDuurInBlokken(lestijd, [0.28, 0.48, 0.24]).map((duur, index) => {
      const regel = maakTijdsregel(minuut, duur, labels[index]);
      minuut += duur;
      return regel;
    }).join(NL);
  }
  const schema = {
    abcd: {
      gewichten: [0.08, 0.2, 0.18, 0.2, 0.2, 0.07, 0.07],
      labels: ["vooruitkijken", "A input", "B reproductie", "C gestuurde productie", "D vrije productie", "feedback", "terugblik"]
    },
    edi: {
      gewichten: [0.14, 0.22, 0.12, 0.2, 0.22, 0.1],
      labels: ["lesdoel en voorkennis", "expliciete instructie en voordoen", "begripcheck", "begeleide oefening", "zelfstandige verwerking", "feedback en terugblik"]
    },
    taakgericht: {
      gewichten: [0.1, 0.16, 0.14, 0.28, 0.12, 0.12, 0.08],
      labels: ["taak introduceren", "taalsteun aanbieden", "taak voorbereiden", "taak uitvoeren", "feedback", "taak verbeteren of herhalen", "terugblik en transfer"]
    },
    terugplannen: {
      gewichten: [0.1, 0.14, 0.18, 0.18, 0.24, 0.1, 0.06],
      labels: ["eindtaak tonen", "benodigde taal ophalen", "input aanbieden", "gericht oefenen", "eindtaak uitvoeren", "feedback", "transfer en huiswerk"]
    },
    vut: {
      gewichten: [0.1, 0.16, 0.14, 0.18, 0.22, 0.1, 0.1],
      labels: ["vooruitkijken", "input", "woordenschat en taalfocus", "instructie en oefening", "functionele taak", "feedback", "terugblik"]
    }
  };
  const { gewichten, labels } = schema[didactischModel] || schema.vut;
  let minuut = 0;
  const regels = [];
  verdeelDuurInBlokken(lestijd, gewichten).forEach((duur, index) => {
    if (heeftPauze && index === Math.ceil(labels.length / 2)) {
      regels.push(maakTijdsregel(minuut, 10, "pauze"));
      minuut += 10;
    }
    const regel = maakTijdsregel(minuut, duur, labels[index]);
    minuut += duur;
    regels.push(regel);
  });
  return regels.join(NL);
}

function isAutomatischeTijdsindeling(tekst) {
  const schoon = schoonTekst(tekst);
  if (!schoon) return true;
  for (let duur = 15; duur <= 180; duur += 15) {
    for (const model of Object.keys(didactischeModellen)) {
      if (schoon === maakAutomatischeTijdsindeling(duur, model)) return true;
    }
  }
  return false;
}

function parseTijdregels(tekst) {
  return String(tekst || "").split(NL).map((regel) => regel.trim()).filter(Boolean).map((regel) => {
    const komma = regel.indexOf(",");
    const dubbelePunt = regel.indexOf(":");
    const knip = komma > 0 ? komma : dubbelePunt > 0 ? dubbelePunt : -1;
    if (knip > 0) return { tijd: regel.slice(0, knip).trim(), activiteit: regel.slice(knip + 1).trim() };
    return { tijd: "Stap", activiteit: regel };
  });
}

function tijdFaseMeta(activiteit = "", index = 0) {
  const laag = activiteit.toLowerCase();
  if (laag.includes("vooruit") || laag.includes("lesdoel") || laag.includes("voorkennis") || laag.includes("eindtaak tonen")) return { fase: "Vooruitkijken", functie: "Richting geven, voorkennis activeren en doel zichtbaar maken." };
  if (laag.includes("input") || laag.includes("instructie") || laag.includes("voordoen") || laag.includes("taalsteun")) return { fase: "Input en instructie", functie: "Taal aanbieden, voordoen en begrip voorbereiden." };
  if (laag.includes("woordenschat") || laag.includes("taalfocus") || laag.includes("reproductie") || laag.includes("gericht oefenen")) return { fase: "Taalsteun", functie: "Woorden, zinnen en patronen veilig oefenen." };
  if (laag.includes("begeleide") || laag.includes("gestuurde") || laag.includes("oefening") || laag.includes("taak voorbereiden")) return { fase: "Begeleid oefenen", functie: "Samen oefenen met steun, voorbeelden en directe feedback." };
  if (laag.includes("functionele") || laag.includes("taak uitvoeren") || laag.includes("vrije productie") || laag.includes("zelfstandige verwerking") || laag.includes("eindtaak uitvoeren")) return { fase: "Toepassen", functie: "Cursisten gebruiken taal actief in een betekenisvolle taak." };
  if (laag.includes("feedback") || laag.includes("begripcheck") || laag.includes("verbeter")) return { fase: "Check en feedback", functie: "Begrip, uitvoering en taalgebruik kort controleren en verbeteren." };
  if (laag.includes("terug") || laag.includes("transfer") || laag.includes("huiswerk")) return { fase: "Terugkijken", functie: "Opbrengst zichtbaar maken en verbinden aan vervolg of praktijk." };
  if (laag.includes("pauze")) return { fase: "Pauze", functie: "Korte onderbreking in een langere les." };
  return { fase: `Fase ${index + 1}`, functie: "Didactische stap in de lesroute." };
}

function tijdRouteHtml(tekst, compact = false) {
  if (compact) {
    return `<div class="miniRouteTable">${parseTijdregels(tekst).map((regel, index) => {
      const meta = tijdFaseMeta(regel.activiteit, index);
      return `<div class="miniRouteRow"><span>${esc(regel.tijd)}</span><b>${esc(meta.fase)}</b><p>${renderInlineOpmaak(regel.activiteit)}</p></div>`;
    }).join("")}</div>`;
  }
  return `<div class="${compact ? "miniRoute" : "printRoute"}">${parseTijdregels(tekst).map((regel, index) => {
    const meta = tijdFaseMeta(regel.activiteit, index);
    return `<div class="routeStep"><div class="routeTime">${esc(regel.tijd)}</div><div class="routeDot">${String(index + 1).padStart(2, "0")}</div><div class="routeContent"><b>${esc(meta.fase)}</b><p>${renderInlineOpmaak(regel.activiteit)}</p>${compact ? "" : `<small>${esc(meta.functie)}</small>`}</div></div>`;
  }).join("")}</div>`;
}

function maakSecties(form) {
  const actieveIds = actieveProfielen(form);
  const model = didactischeModellen[form.didactischModel] || didactischeModellen.vut;
  const modelUitleg = didactischModelUitleg[form.didactischModel] || didactischModelUitleg.vut;
  const didactiekInhoud = voegSamen(
    form.faseInput && `A Input${NL}${form.faseInput}`,
    form.faseReproductie && `B Reproductie${NL}${form.faseReproductie}`,
    form.faseGestuurdeProductie && `C Gestuurde productie${NL}${form.faseGestuurdeProductie}`,
    form.faseVrijeProductie && `D Vrije productie${NL}${form.faseVrijeProductie}`
  ) || `${model.label}${NL}${modelUitleg.join(NL)}`;
  const vaardigheden = voegSamen(
    form.lezen && `Lezen: ${form.lezen}`,
    form.luisteren && `Luisteren: ${form.luisteren}`,
    form.spreken && `Spreken: ${form.spreken}`,
    form.schrijven && `Schrijven: ${form.schrijven}`,
    form.grammatica && `Grammatica: ${form.grammatica}`,
    form.uitspraak && `Uitspraak: ${form.uitspraak}`
  );
  return [
    { id: "meta", titel: "Lesgegevens", inhoud: [`Groepsniveau: ${form.groepsniveau || "Nog niet gekozen"}`, `Lesduur: ${form.lesduur} minuten`, `Profielen: ${profielLabels(actieveIds)}`, `BOW auditlijn: altijd actief`, `Didactisch model: ${model.label}`].join(NL) },
    { id: "instructies", titel: "Aangepaste instructies", inhoud: form.aangepasteInstructies },
    { id: "focus", titel: "Profiel focus", inhoud: form.profielFocus },
    { id: "boek", titel: "Boek en inhoud", inhoud: form.boekPaginas },
    { id: "methode", titel: "Taalroute methodeopbouw", inhoud: voegSamen(
      form.themafase && `Themafase: ${form.themafase}`,
      form.praktijkkern && `Praktijkkern${NL}${form.praktijkkern}`,
      form.werkbrug && `Werkbrug${NL}${form.werkbrug}`,
      form.kernwoorden && `Kernwoorden${NL}${form.kernwoorden}`,
      form.taalpatronen && `Taalpatronen${NL}${form.taalpatronen}`,
      form.eloKoppeling && `ELO koppeling${NL}${form.eloKoppeling}`,
      form.interactiveBook1 && `Online Activiteit 1${NL}${form.interactiveBook1}`,
      form.interactiveBook2 && `Online Activiteit 2${NL}${form.interactiveBook2}`,
      form.watKanIkNu && `Wat kan ik nu${NL}${form.watKanIkNu}`
    ) },
    { id: "erk", titel: "ERK niveauprofiel", inhoud: voegSamen(
      form.erkNiveau && `ERK niveau: ${form.erkNiveau}`,
      form.canDoDoel && `Can do doel${NL}${form.canDoDoel}`,
      form.mateVanSteun && `Mate van steun: ${form.mateVanSteun}`,
      form.succescriteria && `Succescriteria${NL}${form.succescriteria}`,
      form.differentiatieNiveau && `Differentiatie naar niveau${NL}${form.differentiatieNiveau}`,
      form.bewijsVanOpbrengst && `Bewijs van opbrengst${NL}${form.bewijsVanOpbrengst}`
    ) },
    { id: "examenblok", titel: "NT2-examenvoorbereiding", inhoud: voegSamen(
      form.examenonderdeel && `Examenonderdeel: ${form.examenonderdeel}`,
      form.examenvaardigheid && `Examenvaardigheid: ${form.examenvaardigheid}`,
      form.taaktype && `Taaktype${NL}${form.taaktype}`,
      form.examenstrategie && `Examenstrategie${NL}${form.examenstrategie}`,
      form.tijdslimiet && `Tijdslimiet: ${form.tijdslimiet}`,
      form.beoordelingscriteria && `Beoordelingscriteria${NL}${form.beoordelingscriteria}`,
      form.oefenronde && `Oefenronde${NL}${form.oefenronde}`,
      form.verbeteractie && `Herkansing of verbetering${NL}${form.verbeteractie}`,
      form.examenhuiswerk && `Examenhuiswerk${NL}${form.examenhuiswerk}`
    ) },
    { id: "zrouteblok", titel: "Z-route praktijklijnen", inhoud: voegSamen(
      form.praktijksituatie && `Praktijksituatie${NL}${form.praktijksituatie}`,
      form.eenvoudigLesdoel && `Eenvoudig lesdoel${NL}${form.eenvoudigLesdoel}`,
      form.voordoen && `Voordoen${NL}${form.voordoen}`,
      form.samenOefenen && `Samen oefenen${NL}${form.samenOefenen}`,
      form.mondelingeInteractie && `Mondelinge interactie${NL}${form.mondelingeInteractie}`,
      form.beeldsteun && `Beeldsteun${NL}${form.beeldsteun}`,
      form.herhalingsvorm && `Herhaling${NL}${form.herhalingsvorm}`,
      form.praktijktaak && `Praktijktaak${NL}${form.praktijktaak}`,
      form.buitenschoolseOpdracht && `Buitenschoolse opdracht${NL}${form.buitenschoolseOpdracht}`,
      form.terugblikEenvoudigeTaal && `Terugblik in eenvoudige taal${NL}${form.terugblikEenvoudigeTaal}`,
      form.zrouteSteunlijn && `Steunlijn${NL}${form.zrouteSteunlijn}`,
      form.zrouteMiddenlijn && `Middenlijn${NL}${form.zrouteMiddenlijn}`,
      form.zroutePluslijn && `Pluslijn${NL}${form.zroutePluslijn}`
    ) },
    { id: "werkblok", titel: "Beroepsgericht profiel", inhoud: voegSamen(
      form.branche && `Branche: ${form.branche}`,
      form.werkcontext && `Werkcontext${NL}${form.werkcontext}`,
      form.beroepshandeling && `Beroepshandeling${NL}${form.beroepshandeling}`,
      form.vaktaal && `Vaktaal${NL}${form.vaktaal}`,
      form.werknemersvaardigheid && `Werknemersvaardigheid${NL}${form.werknemersvaardigheid}`,
      form.instructietaal && `Instructietaal${NL}${form.instructietaal}`,
      form.samenwerking && `Samenwerking${NL}${form.samenwerking}`,
      form.veiligheid && `Veiligheid${NL}${form.veiligheid}`,
      form.feedbackWerktaal && `Feedback op werktaal${NL}${form.feedbackWerktaal}`,
      form.transferWerkplek && `Transfer naar werkplek${NL}${form.transferWerkplek}`
    ) },
    { id: "doel", titel: "Lesdoel", inhoud: form.lesdoel },
    { id: "opbrengst", titel: "Leeropbrengst", inhoud: form.leeropbrengst },
    { id: "vaardigheid", titel: "Hoofdvaardigheid en ondersteunende vaardigheid", inhoud: voegSamen(form.hoofdvaardigheid && `Hoofdvaardigheid: ${form.hoofdvaardigheid}`, form.ondersteunendeVaardigheid && `Ondersteunende vaardigheid: ${form.ondersteunendeVaardigheid}`) },
    { id: "vier", titel: "Vaardigheden en grammatica", inhoud: vaardigheden },
    { id: "input", titel: "Receptieve input", inhoud: form.receptieveInput },
    { id: "productie", titel: "Productieve taak", inhoud: form.productieveTaak },
    { id: "taalfocus", titel: "Taalfocus", inhoud: form.taalfocus },
    { id: "materiaal", titel: "Benodigd materiaal", inhoud: form.benodigdMateriaal },
    { id: "vut", titel: "VUT lesopbouw", inhoud: voegSamen(form.vutVooruitkijken && `Vooruitkijken${NL}${form.vutVooruitkijken}`, form.vutUitvoeren && `Uitvoeren${NL}${form.vutUitvoeren}`, form.vutTerugkijken && `Terugkijken${NL}${form.vutTerugkijken}`) },
    { id: "didactiek", titel: "Didactische opbouw", inhoud: didactiekInhoud },
    { id: "tijd", titel: "Tijdsindeling", inhoud: form.tijdsindeling || maakAutomatischeTijdsindeling(form.lesduur, form.didactischModel) },
    { id: "woordenschat", titel: "Woordenschatactiviteit", inhoud: form.woordenschatactiviteit },
    { id: "taak", titel: "Functionele taak", inhoud: form.functioneleTaak },
    { id: "begrip", titel: "Check op begrip", inhoud: form.checkOpBegrip },
    { id: "werkvorm", titel: "Werkvorm actieve deelname", inhoud: form.werkvormActieveDeelname },
    { id: "differentiatie", titel: "Differentiatie en maatwerk", inhoud: form.differentiatie },
    { id: "klimaat", titel: "Werkklimaat en intercultureel klimaat", inhoud: voegSamen(form.werkklimaat, form.intercultureelKlimaat) },
    { id: "praktijk", titel: "Praktijkleren", inhoud: voegSamen(form.praktijklerenLes && `In de les${NL}${form.praktijklerenLes}`, form.praktijklerenBuitenLes && `Buiten de les${NL}${form.praktijklerenBuitenLes}`) },
    { id: "hybride", titel: "Hybride/online", inhoud: voegSamen(form.hybrideOpdracht, form.onlineInteractie) },
    { id: "examen", titel: "Examen", inhoud: form.examenrelevantie },
    { id: "feedback", titel: "Feedback en voortgang", inhoud: voegSamen(form.feedbackmoment, form.voortgangsbewaking) },
    { id: "terugblik", titel: "Terugblik op opbrengst", inhoud: form.terugblikOpOpbrengst },
    { id: "huiswerk", titel: "Huiswerk ter voorbereiding", inhoud: form.huiswerk }
  ].filter((sectie) => String(sectie.inhoud || "").trim());
}

function downloadBestand(inhoud, bestandsnaam, type) {
  const blob = new Blob([inhoud], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = bestandsnaam;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function downloadBlob(blob, bestandsnaam) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = bestandsnaam;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function wachtOpIframe(frame) {
  return new Promise((resolve) => {
    frame.onload = () => resolve();
  });
}

async function downloadPdfVanHtml(html, bestandsnaam) {
  const [{ jsPDF }, html2canvasModule] = await Promise.all([
    import("jspdf"),
    import("html2canvas")
  ]);
  const html2canvas = html2canvasModule.default;
  const frame = document.createElement("iframe");
  frame.style.position = "fixed";
  frame.style.left = "-10000px";
  frame.style.top = "0";
  frame.style.width = "210mm";
  frame.style.height = "297mm";
  frame.style.border = "0";
  frame.setAttribute("aria-hidden", "true");
  document.body.appendChild(frame);

  try {
    const geladen = wachtOpIframe(frame);
    const doc = frame.contentWindow?.document;
    if (!doc) throw new Error("PDF venster kon niet worden gemaakt.");
    doc.open();
    doc.write(html);
    doc.close();
    await geladen;
    await doc.fonts?.ready;
    await Promise.all(Array.from(doc.images).map((img) => img.complete ? Promise.resolve() : new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve;
    })));

    const paginas = Array.from(doc.querySelectorAll(".page"));
    if (!paginas.length) throw new Error("Geen samenvattingpagina's gevonden.");
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
    for (let index = 0; index < paginas.length; index += 1) {
      const canvas = await html2canvas(paginas[index], {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        windowWidth: paginas[index].scrollWidth
      });
      if (index > 0) pdf.addPage("a4", "portrait");
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.96), "JPEG", 0, 0, 210, 297, undefined, "FAST");
    }
    pdf.save(bestandsnaam);
  } finally {
    if (frame.parentNode) frame.parentNode.removeChild(frame);
  }
}

function printHtml(inhoud) {
  const frame = document.createElement("iframe");
  frame.style.position = "fixed";
  frame.style.right = "0";
  frame.style.bottom = "0";
  frame.style.width = "0";
  frame.style.height = "0";
  frame.style.border = "0";
  frame.setAttribute("aria-hidden", "true");
  document.body.appendChild(frame);
  const doc = frame.contentWindow?.document;
  if (!doc) {
    document.body.removeChild(frame);
    return;
  }
  doc.open();
  doc.write(inhoud);
  doc.close();
  frame.onload = () => {
    frame.contentWindow?.focus();
    frame.contentWindow?.print();
    setTimeout(() => {
      if (frame.parentNode) frame.parentNode.removeChild(frame);
    }, 1000);
  };
}

function maakHtml(titel, secties) {
  const sectieHtml = secties.map((sectie, index) => {
    const inhoud = sectie.id === "tijd"
      ? tijdRouteHtml(sectie.inhoud)
      : renderCanvasTekst(sectie.inhoud);
    return `<section><span>${String(index + 1).padStart(2, "0")}</span><h2>${renderInlineOpmaak(sectie.titel)}</h2>${inhoud}</section>`;
  }).join("");
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(stripCanvasOpmaak(titel))}</title><style>${printCss}</style></head><body><article><header><img src="${DOCUMENT_LOGO_URL}" alt="Taalroute"><h1>${renderInlineOpmaak(titel)}</h1></header>${sectieHtml}</article></body></html>`;
}

function sectieInhoud(secties, id) {
  return secties.find((sectie) => sectie.id === id)?.inhoud || "";
}

function compactTekst(tekst, max = 360) {
  const schoon = stripCanvasOpmaak(tekst).replace(/\s+/g, " ").trim();
  return schoon.length > max ? `${schoon.slice(0, max).trim()}...` : schoon;
}

function schoneSamenvattingTekst(tekst) {
  return stripCanvasOpmaak(tekst).replace(/\.{3,}|…/g, " (aanvullen)").replace(/\s+/g, " ").trim();
}

function samenvattingBronTekst(tekst) {
  return String(tekst || "").replace(/\.{3,}|…/g, " (aanvullen)").trim();
}

function tekstOfVerwijzing(inhoud, max = 220) {
  const tekst = schoneSamenvattingTekst(inhoud);
  return tekst.length > max ? "Volledige tekst staat bij Uitgebreide onderdelen." : tekst;
}

function kaart(titel, inhoud, volledig = false) {
  const platteTekst = schoneSamenvattingTekst(inhoud);
  const bronTekst = samenvattingBronTekst(inhoud);
  if (!platteTekst) return "";
  const tekst = volledig || platteTekst.length <= 320 ? bronTekst : "Volledige tekst staat bij Uitgebreide onderdelen.";
  return `<section class="summaryCard"><h2>${renderInlineOpmaak(titel)}</h2><div class="cardText">${renderCanvasTekst(tekst)}</div></section>`;
}

function bowAuditKaart(titel, inhoud, fallback = "Nog aanvullen in de lesvoorbereiding.", opties = {}) {
  const { volledig = false, max = 220 } = opties;
  const basisBronTekst = samenvattingBronTekst(inhoud || fallback);
  const basisTekst = schoneSamenvattingTekst(inhoud || fallback);
  const tekst = volledig || basisTekst.length <= max ? basisBronTekst : "Volledige tekst staat bij Uitgebreide onderdelen.";
  const gevuld = Boolean(String(inhoud || "").trim());
  const extraClass = !volledig && gevuld && basisTekst.length > max ? " hasMore" : "";
  return `<article class="bowItem ${gevuld ? "isFilled" : "isMissing"}${extraClass}"><b>${renderInlineOpmaak(titel)}</b><div class="cardText">${renderCanvasTekst(tekst)}</div></article>`;
}

const samenvattingBasisIds = ["doel", "opbrengst", "vut", "tijd", "taak", "werkvorm", "woordenschat", "begrip", "feedback", "terugblik", "praktijk", "differentiatie", "klimaat", "hybride", "examen", "huiswerk"];
const samenvattingExtraOpties = [
  { id: "vaardigheid", label: "Hoofdvaardigheid" },
  { id: "vier", label: "Vaardigheden en grammatica" },
  { id: "input", label: "Receptieve input" },
  { id: "productie", label: "Productieve taak" },
  { id: "taalfocus", label: "Taalfocus" },
  { id: "materiaal", label: "Materiaal" },
  { id: "didactiek", label: "Didactische opbouw" },
  { id: "methode", label: "Taalroute profiel" },
  { id: "erk", label: "ERK niveauprofiel" },
  { id: "examenblok", label: "NT2-examenvoorbereiding" },
  { id: "zrouteblok", label: "Z-route praktijklijnen" },
  { id: "werkblok", label: "Beroepsgericht profiel" }
];

function maakSamenvattingPrintControle(secties, extraIds = []) {
  const controleIds = [...new Set([...samenvattingBasisIds, ...extraIds])];
  const onderdelen = controleIds.map((id) => ({
    id,
    titel: secties.find((sectie) => sectie.id === id)?.titel || id,
    inhoud: sectieInhoud(secties, id)
  })).filter((item) => String(item.inhoud || "").trim());
  const totaalTekens = onderdelen.reduce((totaal, item) => totaal + String(item.inhoud).length, 0);
  const langeOnderdelen = onderdelen.filter((item) => String(item.inhoud).length > 300);
  const extraPaginaNodig = totaalTekens > 2600 || langeOnderdelen.length > 0;
  return {
    totaalTekens,
    langeOnderdelen,
    extraPaginaNodig,
    titel: extraPaginaNodig ? "Extra pagina toegevoegd" : "Vaste 2 pagina's",
    tekst: extraPaginaNodig
      ? "De samenvatting bevat veel tekst. De app voegt automatisch een extra pagina toe, zodat inhoud niet half wegvalt."
      : "De samenvatting past naar verwachting op twee vaste pagina's. Controleer altijd het voorbeeld voor je print."
  };
}

function maakSamenvattingHtml(titel, secties, extraIds = []) {
  const meta = sectieInhoud(secties, "meta");
  const tijd = sectieInhoud(secties, "tijd");
  const printControle = maakSamenvattingPrintControle(secties, extraIds);
  const extraSecties = samenvattingExtraOpties
    .filter((optie) => extraIds.includes(optie.id))
    .map((optie) => secties.find((sectie) => sectie.id === optie.id))
    .filter((sectie) => sectie && String(sectie.inhoud || "").trim());
  const doelTekst = schoneSamenvattingTekst(sectieInhoud(secties, "doel"));
  const introTekst = doelTekst.length > 260
    ? "Doelgerichte lesvoorbereiding met BOW auditlijn. Lange onderdelen zijn volledig opgenomen bij Uitgebreide onderdelen."
    : (doelTekst || "Doelgerichte lesvoorbereiding met BOW auditlijn en profielgerichte accenten.");
  const bowBasis = [
    ["Lesdoel", sectieInhoud(secties, "doel")],
    ["Leeropbrengst", sectieInhoud(secties, "opbrengst")],
    ["VUT lesopbouw", sectieInhoud(secties, "vut")],
    ["Tijdsindeling", tijd]
  ].map(([label, inhoud]) => bowAuditKaart(label, inhoud)).join("");
  const bowActief = [
    ["Cursist aan het woord", sectieInhoud(secties, "werkvorm") || sectieInhoud(secties, "taak")],
    ["Functionele taak", sectieInhoud(secties, "taak")],
    ["Woordenschat", sectieInhoud(secties, "woordenschat")],
    ["Check op begrip", sectieInhoud(secties, "begrip")],
    ["Feedback en voortgang", sectieInhoud(secties, "feedback")],
    ["Terugblik op opbrengst", sectieInhoud(secties, "terugblik")]
  ].map(([label, inhoud]) => bowAuditKaart(label, inhoud)).join("");
  const bowPraktijk = [
    ["Praktijkleren", sectieInhoud(secties, "praktijk")],
    ["Differentiatie", sectieInhoud(secties, "differentiatie")],
    ["Werkklimaat", sectieInhoud(secties, "klimaat")],
    ["Hybride/online", sectieInhoud(secties, "hybride")],
    ["Examenrelevantie", sectieInhoud(secties, "examen")],
    ["Huiswerk", sectieInhoud(secties, "huiswerk")]
  ].map(([label, inhoud]) => bowAuditKaart(label, inhoud)).join("");
  const extraPaginas = printControle.extraPaginaNodig
    ? printControle.langeOnderdelen.reduce((paginas, item, index) => {
        const paginaIndex = Math.floor(index / 3);
        paginas[paginaIndex] = paginas[paginaIndex] || [];
        paginas[paginaIndex].push(item);
        return paginas;
      }, []).map((items, index) => `<section class="page extraPage">
          <header><img src="${DOCUMENT_LOGO_URL}" alt="Taalroute"><span>BOW auditlijn</span></header>
          <section class="bowBlock footerSafe">
            <h2>Uitgebreide onderdelen${index > 0 ? ` ${index + 1}` : ""}</h2>
            <div class="bowGrid extraBowGrid">
              ${items.map((item) => bowAuditKaart(item.titel, item.inhoud, "Nog aanvullen in de lesvoorbereiding.", { volledig: true })).join("")}
            </div>
          </section>
          <footer><span>www.taalroute.nl</span><img src="${FAVICON_URL}" alt=""></footer>
        </section>`).join("")
    : "";
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(titel)} samenvatting</title><style>${samenvattingCss}</style></head><body>
    <main>
      <section class="page coverPage">
        <header><img src="${DOCUMENT_LOGO_URL}" alt="Taalroute"><span>Lesstudio samenvatting</span></header>
        <div class="hero">
          <h1>${renderInlineOpmaak(titel || "Taalroute lesplan")}</h1>
          <p>${esc(introTekst)}</p>
        </div>
        <div class="metaGrid">
          ${meta.split(NL).filter(Boolean).slice(0, 4).map((regel) => `<div><b>${esc(regel.split(":")[0])}</b><span>${esc(regel.includes(":") ? regel.slice(regel.indexOf(":") + 1).trim() : regel)}</span></div>`).join("")}
        </div>
        <section class="program firstProgram">
          <h2>Didactische lesroute</h2>
          ${tijdRouteHtml(tijd, true)}
        </section>
        <section class="bowBlock compactBow"><h2>BOW kerncontrole</h2><div class="bowGrid">${bowBasis}</div></section>
        <footer><span>www.taalroute.nl</span><img src="${FAVICON_URL}" alt=""></footer>
      </section>
      <section class="page detailPage">
        <header><img src="${DOCUMENT_LOGO_URL}" alt="Taalroute"><span>BOW auditlijn</span></header>
        <section class="bowBlock"><h2>Activering, taak en feedback</h2><div class="bowGrid">${bowActief}</div></section>
        <section class="bowBlock"><h2>Praktijk, maatwerk en borging</h2><div class="bowGrid">${bowPraktijk}</div></section>
        ${extraSecties.length ? `<div class="twoCol footerSafe summaryExtraGrid">${extraSecties.map((sectie) => kaart(sectie.titel, sectie.inhoud)).join("")}</div>` : ""}
        <footer><span>www.taalroute.nl</span><img src="${FAVICON_URL}" alt=""></footer>
      </section>
      ${extraPaginas}
    </main>
  </body></html>`;
}

function pdfEscape(tekst) {
  return String(tekst || "").replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)").replace(/\r?\n/g, " ");
}

function pdfVeiligeTekst(tekst) {
  return String(tekst || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, "");
}

function pdfTekst(tekst) {
  return pdfEscape(pdfVeiligeTekst(tekst));
}

function wrapPdfTekst(tekst, maxTekens) {
  const woorden = pdfVeiligeTekst(tekst).replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  const regels = [];
  let regel = "";
  woorden.forEach((woord) => {
    const poging = regel ? `${regel} ${woord}` : woord;
    if (poging.length > maxTekens && regel) {
      regels.push(regel);
      regel = woord;
    } else {
      regel = poging;
    }
  });
  if (regel) regels.push(regel);
  return regels;
}

function maakSamenvattingPdfBlob(titel, secties) {
  const breedte = 595.28;
  const hoogte = 841.89;
  const marge = 42;
  const blauw = "0 0.565 0.949";
  const donker = "0.07 0.20 0.29";
  const grijs = "0.20 0.35 0.43";
  const paginas = [];
  let inhoud = [];
  let y = hoogte - 44;

  const nieuw = () => {
    inhoud = [];
    y = hoogte - 44;
    inhoud.push(`${blauw} rg 0 ${hoogte - 22} ${breedte} 22 re f`);
    inhoud.push(`${blauw} RG 1 w ${marge} 52 m ${breedte - marge} 52 l S`);
    inhoud.push(`BT /F2 10 Tf ${blauw} rg ${marge} 29 Td (www.taalroute.nl) Tj ET`);
    inhoud.push(`BT /F2 10 Tf ${blauw} rg ${breedte - marge - 52} 29 Td (Taalroute) Tj ET`);
    paginas.push(inhoud);
  };
  const checkRuimte = (nodig = 44) => {
    if (y - nodig < 72) nieuw();
  };
  const tekst = (waarde, x, size = 9, font = "F1", kleur = donker, maxTekens = 76, leading = size + 4) => {
    const regels = wrapPdfTekst(waarde, maxTekens);
    regels.forEach((regel) => {
      checkRuimte(leading + 2);
      inhoud.push(`BT /${font} ${size} Tf ${kleur} rg ${x} ${y} Td (${pdfTekst(regel)}) Tj ET`);
      y -= leading;
    });
  };
  const kop = (waarde) => {
    checkRuimte(38);
    inhoud.push(`${blauw} rg ${marge} ${y - 4} 6 20 re f`);
    inhoud.push(`BT /F2 14 Tf ${blauw} rg ${marge + 14} ${y} Td (${pdfTekst(waarde)}) Tj ET`);
    y -= 24;
  };
  const item = (label, waarde) => {
    const compact = compactTekst(waarde || "Nog aanvullen in de lesvoorbereiding.", 220);
    checkRuimte(48);
    inhoud.push(`0.96 0.99 1 rg ${marge} ${y - 30} ${breedte - marge * 2} 38 re f`);
    inhoud.push(`0.78 0.92 1 RG 0.7 w ${marge} ${y - 30} ${breedte - marge * 2} 38 re S`);
    inhoud.push(`BT /F2 9 Tf ${blauw} rg ${marge + 10} ${y - 5} Td (${pdfTekst(label)}) Tj ET`);
    wrapPdfTekst(compact, 86).slice(0, 2).forEach((regel, index) => {
      inhoud.push(`BT /F1 8 Tf ${grijs} rg ${marge + 10} ${y - 18 - index * 10} Td (${pdfTekst(regel)}) Tj ET`);
    });
    y -= 46;
  };

  nieuw();
  inhoud.push(`BT /F2 24 Tf ${donker} rg ${marge} ${y} Td (${pdfTekst(titel || "Taalroute lesplan")}) Tj ET`);
  y -= 32;
  tekst(compactTekst(sectieInhoud(secties, "doel") || "Doelgerichte lesvoorbereiding met BOW auditlijn en profielgerichte accenten.", 260), marge, 10, "F1", grijs, 92, 14);
  y -= 8;

  kop("Lesgegevens");
  sectieInhoud(secties, "meta").split(NL).filter(Boolean).forEach((regel) => tekst(regel, marge + 10, 9, "F2", grijs, 90, 12));
  y -= 4;

  kop("Didactische lesroute");
  parseTijdregels(sectieInhoud(secties, "tijd")).forEach((regel, index) => {
    const meta = tijdFaseMeta(regel.activiteit, index);
    item(`${regel.tijd} - ${meta.fase}`, regel.activiteit);
  });

  kop("BOW kerncontrole");
  item("Lesdoel", sectieInhoud(secties, "doel"));
  item("Leeropbrengst", sectieInhoud(secties, "opbrengst"));
  item("VUT lesopbouw", sectieInhoud(secties, "vut"));
  item("Tijdsindeling", sectieInhoud(secties, "tijd"));

  nieuw();
  kop("Activering, taak en feedback");
  item("Cursist aan het woord", sectieInhoud(secties, "werkvorm") || sectieInhoud(secties, "taak"));
  item("Functionele taak", sectieInhoud(secties, "taak"));
  item("Woordenschat", sectieInhoud(secties, "woordenschat"));
  item("Check op begrip", sectieInhoud(secties, "begrip"));
  item("Feedback en voortgang", sectieInhoud(secties, "feedback"));
  item("Terugblik op opbrengst", sectieInhoud(secties, "terugblik"));

  kop("Praktijk, maatwerk en borging");
  item("Praktijkleren", sectieInhoud(secties, "praktijk"));
  item("Differentiatie", sectieInhoud(secties, "differentiatie"));
  item("Werkklimaat", sectieInhoud(secties, "klimaat"));
  item("Hybride/online", sectieInhoud(secties, "hybride"));
  item("Examenrelevantie", sectieInhoud(secties, "examen"));
  item("Huiswerk", sectieInhoud(secties, "huiswerk"));

  const objecten = [];
  const paginaRefs = [];
  const addObj = (body) => {
    objecten.push(body);
    return objecten.length;
  };
  const font1 = addObj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const font2 = addObj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  const pagesId = paginas.length * 2 + 3;
  paginas.forEach((regels, index) => {
    const stream = regels.join("\n");
    const contentId = addObj(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
    const pageId = addObj(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${breedte} ${hoogte}] /Resources << /Font << /F1 ${font1} 0 R /F2 ${font2} 0 R >> >> /Contents ${contentId} 0 R >>`);
    paginaRefs[index] = `${pageId} 0 R`;
  });
  addObj(`<< /Type /Pages /Kids [${paginaRefs.join(" ")}] /Count ${paginaRefs.length} >>`);
  const catalogId = addObj(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objecten.forEach((body, index) => {
    offsets[index + 1] = pdf.length;
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objecten.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objecten.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new Blob([pdf], { type: "application/pdf" });
}

function Label({ children, verplicht = false }) {
  return <label className="label">{children} {verplicht ? <span>*</span> : null}</label>;
}

function Knop({ children, onClick, variant = "primary", disabled = false }) {
  return <button type="button" disabled={disabled} onClick={onClick} className={`btn ${variant}`}>{children}</button>;
}

function RichtingIcon({ richting = "right" }) {
  return <span className={`triangleIcon ${richting}`} aria-hidden="true" />;
}

function PrintIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 8V3h10v5" />
      <path d="M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
      <path d="M7 14h10v7H7z" />
      <path d="M17 12h.01" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v11" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

function SummaryIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h8l4 4v14H7z" />
      <path d="M15 3v5h4" />
      <path d="M10 12h6" />
      <path d="M10 16h4" />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h8l4 4v14H7z" />
      <path d="M15 3v5h4" />
      <path d="M8.5 16h7" />
      <path d="M8.5 12h2.5a1.5 1.5 0 0 1 0 3H8.5v-3Z" />
      <path d="M14 12v4" />
      <path d="M14 12h2" />
      <path d="M14 14h1.5" />
    </svg>
  );
}

function RestoreIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 12a9 9 0 0 1 15.1-6.6" />
      <path d="M18 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15.1 6.6" />
      <path d="M6 21v-5h5" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 17v-6" />
      <path d="M12 7h.01" />
      <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
    </svg>
  );
}

function OpenLesIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5h14v14H5z" />
      <path d="M9 15 15 9" />
      <path d="M10 9h5v5" />
    </svg>
  );
}

function CopyLesIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 8h10v12H8z" />
      <path d="M6 16H4V4h10v2" />
    </svg>
  );
}

function TrashLesIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M6 7l1 14h10l1-14" />
      <path d="M9 7V4h6v3" />
    </svg>
  );
}

function IconActieKnop({ label, onClick, children }) {
  return <button type="button" className="iconActieKnop" onClick={onClick} aria-label={label} title={label}>{children}</button>;
}

function DownloadActieKnop({ label, sublabel, onClick, children, disabled = false }) {
  const titel = sublabel ? `${label} ${sublabel}` : label;
  return (
    <button type="button" className="downloadActieKnop" onClick={onClick} disabled={disabled} aria-label={titel} title={titel}>
      <span className="downloadActieIcon">{children}</span>
      <span><strong>{label}</strong>{sublabel ? <small>{sublabel}</small> : null}</span>
    </button>
  );
}

function LightbulbIcon() {
  return (
    <svg className="lightbulbIcon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 19h6" />
      <path d="M10 22h4" />
      <path d="M8.2 14.2c-1.4-1.1-2.2-2.7-2.2-4.5C6 6.5 8.7 4 12 4s6 2.5 6 5.7c0 1.8-.8 3.4-2.2 4.5-.8.6-1.3 1.5-1.4 2.5H9.6c-.1-1-.6-1.9-1.4-2.5Z" />
      <path d="M10 17h4" />
    </svg>
  );
}

function Tekstvak({ value, onChange, rows = 4, placeholder = "" }) {
  return <textarea className="field textarea" rows={rows} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />;
}

function pasCanvasOpmaakToe(waarde, actie) {
  const tekst = String(waarde || "");
  if (actie === "bold") return tekst ? `**${tekst}**` : "**tekst**";
  if (actie === "italic") return tekst ? `*${tekst}*` : "*tekst*";
  if (actie === "bullet") return tekst.split(NL).map((regel) => regel.trim() ? `- ${regel.replace(/^[-•]\s*/, "")}` : regel).join(NL);
  if (actie === "regel") return tekst ? `${tekst}${NL}` : "";
  return tekst;
}

function CanvasToolbar({ label, value, onChange }) {
  const acties = [
    ["bold", "B", "Maak tekst dikgedrukt"],
    ["italic", "I", "Maak tekst cursief"],
    ["bullet", "•", "Maak opsomming"],
    ["regel", "+", "Nieuwe regel"]
  ];
  return (
    <div className="canvasEditorToolbar" aria-label={`Editor opties voor ${label}`}>
      <span>{label}</span>
      {acties.map(([actie, teken, aria]) => (
        <button key={actie} type="button" onClick={() => onChange(pasCanvasOpmaakToe(value, actie))} aria-label={aria} title={aria}>{teken}</button>
      ))}
    </div>
  );
}

function pasCanvasSelectieToe(waarde, actie, selectieStart = 0, selectieEinde = 0) {
  const tekst = String(waarde || "");
  const start = Math.max(0, Math.min(selectieStart, tekst.length));
  const einde = Math.max(start, Math.min(selectieEinde, tekst.length));
  const selectie = tekst.slice(start, einde);
  const vervang = (nieuweTekst) => `${tekst.slice(0, start)}${nieuweTekst}${tekst.slice(einde)}`;
  if (actie === "bold") return vervang(`**${selectie || "tekst"}**`);
  if (actie === "italic") return vervang(`*${selectie || "tekst"}*`);
  if (actie === "bullet" && selectie) return vervang(selectie.split(NL).map((regel) => regel.trim() ? `- ${regel.replace(/^[-•]\s*/, "")}` : regel).join(NL));
  if (actie === "bullet") return tekst.split(NL).map((regel) => regel.trim() ? `- ${regel.replace(/^[-•]\s*/, "")}` : regel).join(NL);
  if (actie === "regel") return tekst ? `${tekst}${NL}` : "";
  return tekst;
}

function CanvasBlockToolbar({ label, velden, className = "" }) {
  const acties = [
    ["bold", "B", "Maak selectie dikgedrukt"],
    ["italic", "I", "Maak selectie cursief"],
    ["bullet", "•", "Maak selectie een opsomming"],
    ["regel", "+", "Nieuwe regel"]
  ];
  const pasToe = (actie) => {
    const actief = document.activeElement;
    const canvasKey = actief?.dataset?.canvasKey;
    const doel = velden.find((veld) => veld.key === canvasKey) || velden[0];
    const start = actief?.selectionStart ?? String(doel.value || "").length;
    const einde = actief?.selectionEnd ?? start;
    doel.onChange(pasCanvasSelectieToe(doel.value, actie, start, einde));
  };
  return (
    <div className={`canvasEditorToolbar canvasBlockToolbar ${className}`.trim()} aria-label={`Editor opties voor ${label}`}>
      <span>{label}</span>
      {acties.map(([actie, teken, aria]) => (
        <button key={actie} type="button" onMouseDown={(event) => { event.preventDefault(); pasToe(actie); }} aria-label={aria} title={aria}>{teken}</button>
      ))}
    </div>
  );
}

function CanvasFloatingToolbar({ actiefVeld }) {
  const acties = [
    ["bold", "B", "Maak selectie dikgedrukt"],
    ["italic", "I", "Maak selectie cursief"],
    ["bullet", "•", "Maak selectie een opsomming"],
    ["regel", "+", "Nieuwe regel"]
  ];
  const pasToe = (actie) => {
    if (!actiefVeld) return;
    const actief = document.activeElement;
    const start = actief?.selectionStart ?? String(actiefVeld.value || "").length;
    const einde = actief?.selectionEnd ?? start;
    actiefVeld.onChange(pasCanvasSelectieToe(actiefVeld.value, actie, start, einde));
  };
  return (
    <div className="canvasEditorToolbar canvasFloatingToolbar" aria-label="Vaste editor opties voor het canvas">
      <span>Editor</span>
      {acties.map(([actie, teken, aria]) => (
        <button key={actie} type="button" disabled={!actiefVeld} onMouseDown={(event) => { event.preventDefault(); pasToe(actie); }} aria-label={aria} title={aria}>{teken}</button>
      ))}
    </div>
  );
}

function AutoGrowTextarea({ value, onChange, className = "", rows = 1, ariaLabel, canvasKey, onCanvasFocus }) {
  const ref = useRef(null);
  useEffect(() => {
    const veld = ref.current;
    if (!veld) return;
    veld.style.height = "auto";
    veld.style.height = `${veld.scrollHeight}px`;
  }, [value]);
  return (
    <textarea
      ref={ref}
      className={`canvasTextarea ${className}`.trim()}
      rows={rows}
      aria-label={ariaLabel}
      data-canvas-key={canvasKey}
      value={value}
      onFocus={() => onCanvasFocus?.(canvasKey)}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

function TijdsindelingEditor({ value, onChange, didactischModelId, lesduur }) {
  const inhoud = value || maakAutomatischeTijdsindeling(lesduur, didactischModelId);
  const model = didactischeModellen[didactischModelId] || didactischeModellen.vut;
  const regels = parseTijdregels(inhoud);
  const updateRegel = (index, patch) => {
    const nieuw = [...regels];
    nieuw[index] = { ...nieuw[index], ...patch };
    onChange(nieuw.map((regel) => `${regel.tijd}: ${regel.activiteit}`).join(NL));
  };
  return (
    <div className="tijdEditor">
      <div className="tijdEditorHeader">
        <span>{model.label}</span>
        <button type="button" className="tijdHerstelKnop" onClick={() => onChange(maakAutomatischeTijdsindeling(lesduur, didactischModelId))} aria-label="Herstel route" title="Herstel route"><RestoreIcon /></button>
      </div>
      <div className="tijdEditorRoute">
        {regels.map((regel, index) => {
          const meta = tijdFaseMeta(regel.activiteit, index);
          return (
            <div className="tijdEditorStap" key={`${regel.tijd}-${index}`}>
              <div className="tijdEditorNummer">{String(index + 1).padStart(2, "0")}</div>
              <div className="tijdEditorVelden">
                <small>{meta.fase}</small>
                <input value={regel.tijd} aria-label="Tijdvak" onChange={(event) => updateRegel(index, { tijd: event.target.value })} />
                <input value={regel.activiteit} aria-label="Activiteit" onChange={(event) => updateRegel(index, { activiteit: event.target.value })} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function VeldActies({ profielId, profielIds, didactischModelId, veldKey, waarde, niveau, contextTekst, onChange }) {
  const [suggestiesOpen, setSuggestiesOpen] = useState(false);
  const [uitlegOpen, setUitlegOpen] = useState(false);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [verbeterOpen, setVerbeterOpen] = useState(false);
  const [verbeterContextId, setVerbeterContextId] = useState("auto");
  const [verbeterNiveau, setVerbeterNiveau] = useState("auto");
  const [verbeterInvoegModus, setVerbeterInvoegModus] = useState("toevoegen");
  const [laatsteVerbeterWaarde, setLaatsteVerbeterWaarde] = useState(null);
  const opties = gecombineerdeSuggesties(profielIds || [profielId], veldKey, didactischModelId);
  const uitleg = haalVeldUitleg(veldKey);
  const tips = haalDidactischeTips(veldKey, didactischModelId);
  const gekozenVerbeterNiveau = verbeterNiveau === "auto" ? niveau : verbeterNiveau;
  const verbeterOpties = verbeterZinnenVoorVeld(veldKey, waarde, gekozenVerbeterNiveau, contextTekst, verbeterContextId, profielIds || [profielId]);
  const verbeterContextInfo = verbeterOpties.length ? contextInfoOpId(verbeterContextId, `${contextTekst} ${waarde}`) : null;
  const verbeterTaalsteun = verbeterContextInfo ? taalsteunVoorContextEnNiveau(verbeterContextInfo.id, gekozenVerbeterNiveau) : null;
  const verbeterProfielId = (Array.isArray(profielIds) ? profielIds : [profielId]).find((id) => id !== "bow") || "bow";
  const toggleMenu = (menu) => {
    setUitlegOpen((open) => menu === "uitleg" ? !open : false);
    setTipsOpen((open) => menu === "tips" ? !open : false);
    setSuggestiesOpen((open) => menu === "suggesties" ? !open : false);
    setVerbeterOpen((open) => menu === "verbeter" ? !open : false);
  };
  return (
    <div className="veldActies">
      {isBowVeld(veldKey) ? (
        <span className="bowActieBadge" aria-label="Onderdeel van BOW audit" title="Onderdeel van BOW audit">
          <span className="bowAuditText">auditlijn</span>
        </span>
      ) : null}
      <button type="button" className="uitlegKnop" onClick={() => toggleMenu("uitleg")} aria-label={`Uitleg over ${veldKey}`} title="Uitleg">?</button>
      <button type="button" className="tipKnop" onClick={() => toggleMenu("tips")} aria-label={`Didactische tip over ${veldKey}`} title="Didactische tip"><LightbulbIcon /></button>
      {verbeterOpties.length ? <button type="button" className="verbeterKnop" onClick={() => toggleMenu("verbeter")} aria-label="Verbeterhulp openen" title="Verbeterhulp">✓</button> : null}
      {opties.length ? <button type="button" className="plusSuggestieKnop" onClick={() => toggleMenu("suggesties")} aria-label="Suggestie toevoegen" title="Suggestie toevoegen">+</button> : null}
      {uitlegOpen ? (
        <div className="uitlegMenu">
          <strong>Wat betekent dit?</strong>
          <p>{uitleg}</p>
        </div>
      ) : null}
      {tipsOpen ? (
        <div className="tipMenu">
          <strong>Didactische tip</strong>
          {tips.map((tip) => <p key={tip}>{tip}</p>)}
        </div>
      ) : null}
      {suggestiesOpen ? (
        <div className="suggesties">
          <strong>{profielIds?.length > 1 ? "Gecombineerde profiel suggesties" : maakSuggestieMenuTitel(profielId)}</strong>
          {opties.map((optie) => (
            <button key={optie} type="button" onClick={() => {
              onChange(waarde.includes(optie) ? waarde : waarde ? `${waarde}${NL}${optie}` : optie);
              setSuggestiesOpen(false);
            }}>{optie}</button>
          ))}
        </div>
      ) : null}
      {verbeterOpen ? (
        <div className="verbeterMenu">
          <strong>Verbeterhulp</strong>
          {verbeterOpties[0]?.waarschuwing ? <p>{verbeterOpties[0].waarschuwing}</p> : null}
          {verbeterOpties.map((optie) => (
            <button key={optie.label} type="button" onClick={() => {
              setLaatsteVerbeterWaarde(waarde);
              onChange(pasVerbeterSuggestieToe(waarde, optie.tekst, verbeterInvoegModus));
              setVerbeterOpen(false);
            }}><span>{optie.label}</span><small>{optie.tekst}</small></button>
          ))}
          {verbeterContextInfo ? (
            <div className="verbeterContextInfo">
              <b>Herkende context: {verbeterContextInfo.label}</b>
              <small>{verbeterContextInfo.score ? "Gebaseerd op woorden in lesonderwerp, kernwoorden en dit veld." : "Geen duidelijke context herkend. De app gebruikt een veilige algemene praktijksituatie."}</small>
              {laatsteVerbeterWaarde !== null ? (
                <button type="button" className="verbeterHerstelKnop" onClick={() => {
                  onChange(laatsteVerbeterWaarde);
                  setLaatsteVerbeterWaarde(null);
                  setVerbeterOpen(false);
                }}>Herstel laatste Verbeterhulp</button>
              ) : null}
              <label className="verbeterContextSelect">
                <span>Context wijzigen</span>
                <select value={verbeterContextId} onChange={(event) => setVerbeterContextId(event.target.value)}>
                  <option value="auto">Automatisch herkend</option>
                  <option value="algemeen">Algemene praktijksituatie</option>
                  {Object.keys(verbeterContexten).map((id) => (
                    <option key={id} value={id}>{verbeterContextLabels[id] || id}</option>
                  ))}
                </select>
              </label>
              <label className="verbeterContextSelect">
                <span>Niveau wijzigen</span>
                <select value={verbeterNiveau} onChange={(event) => setVerbeterNiveau(event.target.value)}>
                  <option value="auto">Automatisch: {niveau || "A1 NT2"}</option>
                  <option value="Alfa A">Alfa A</option>
                  <option value="Alfa B">Alfa B</option>
                  <option value="Alfa C">Alfa C</option>
                  <option value="A1 NT2">A1 NT2</option>
                  <option value="A2 NT2">A2 NT2</option>
                  <option value="B1 NT2">B1 NT2</option>
                </select>
              </label>
              <label className="verbeterContextSelect">
                <span>Invoegen als</span>
                <select value={verbeterInvoegModus} onChange={(event) => setVerbeterInvoegModus(event.target.value)}>
                  <option value="toevoegen">Toevoegen</option>
                  <option value="vervangen">Vervangen</option>
                </select>
              </label>
              {verbeterTaalsteun ? (
                <div className="verbeterTaalsteun">
                  <span>Kernwoorden: {verbeterTaalsteun.woorden.join(", ")}</span>
                  <span>Voorbeeldzinnen: {verbeterTaalsteun.zinnen.join(" / ")}</span>
                  <span>Profielaccent: {profielInfo[verbeterProfielId]?.label || "BOW Kwaliteitsprofiel"}</span>
                  <span>Niveauaccent: {gekozenVerbeterNiveau || "A1 NT2"}</span>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function parseHelpKnopTekst(tekst) {
  const match = String(tekst || "").match(/^(\S+)\s+([^:]+):\s*(.+)$/);
  if (!match) return { icoon: "", label: "", omschrijving: tekst };
  return { icoon: match[1], label: match[2], omschrijving: match[3] };
}

function HelpKnopRegel({ tekst }) {
  const { icoon, label, omschrijving } = parseHelpKnopTekst(tekst);
  const knopClass = label.includes("Canvas-editor")
    ? "editor"
    : icoon?.includes("💡") ? "tip" : icoon?.includes("✓") ? "check" : icoon?.includes("+") ? "plus" : icoon?.includes("?") ? "vraag" : "editor";
  return (
    <div className="helpKnopRegel">
      <div className={`helpKnopIcoon ${knopClass}`} aria-hidden="true">{icoon}</div>
      <div className="helpKnopTekst">
        <strong className="helpKnopNaam">{label}</strong>
        <p className="helpKnopOmschrijving">{formatHelpTekst(omschrijving || tekst)}</p>
      </div>
    </div>
  );
}

function HelpModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const sluitMetEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", sluitMetEscape);
    return () => window.removeEventListener("keydown", sluitMetEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="helpOverlay" onMouseDown={onClose}>
      <section className="helpModal" role="dialog" aria-modal="true" aria-labelledby="helpTitel" aria-describedby="helpBeschrijving" onMouseDown={(event) => event.stopPropagation()}>
        <div className="helpModalHeader">
          <div>
            <p id="helpBeschrijving">Uitleg voor docenten</p>
            <h2 id="helpTitel">Hulp bij Taalroute Lesstudio</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Sluiten">Sluiten</button>
        </div>
        <div className="helpModalBody">
          {helpSecties.map((sectie) => (
            <article className="helpSectie" key={sectie.titel}>
              <h3>{sectie.titel}</h3>
              {sectie.tekst.map((alinea) => sectie.titel === "Knoppen en editor"
                ? <HelpKnopRegel tekst={alinea} key={alinea} />
                : <p className={alinea.startsWith("Stap ") ? "helpStapRegel" : alinea.includes(":") ? "helpHighlight" : ""} key={alinea}>{formatHelpTekst(alinea)}</p>)}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function DisclaimerModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const sluitMetEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", sluitMetEscape);
    return () => window.removeEventListener("keydown", sluitMetEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="helpOverlay" onMouseDown={onClose}>
      <section className="helpModal disclaimerModal" role="dialog" aria-modal="true" aria-labelledby="disclaimerTitel" aria-describedby="disclaimerBeschrijving" onMouseDown={(event) => event.stopPropagation()}>
        <div className="helpModalHeader">
          <div>
            <p id="disclaimerBeschrijving">Voor gebruik van deze website</p>
            <h2 id="disclaimerTitel">Disclaimer</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Sluiten">Sluiten</button>
        </div>
        <div className="helpModalBody disclaimerBody">
          {disclaimerSecties.map((sectie) => (
            <article className="helpSectie" key={sectie.titel}>
              <h3>{sectie.titel}</h3>
              {sectie.tekst.map((alinea) => <p key={alinea}>{formatHelpTekst(alinea)}</p>)}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function PrivacyModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const sluitMetEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", sluitMetEscape);
    return () => window.removeEventListener("keydown", sluitMetEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="helpOverlay" onMouseDown={onClose}>
      <section className="helpModal disclaimerModal" role="dialog" aria-modal="true" aria-labelledby="privacyTitel" aria-describedby="privacyBeschrijving" onMouseDown={(event) => event.stopPropagation()}>
        <div className="helpModalHeader">
          <div>
            <p id="privacyBeschrijving">Veilig omgaan met lesinformatie</p>
            <h2 id="privacyTitel">Privacy</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Sluiten">Sluiten</button>
        </div>
        <div className="helpModalBody disclaimerBody">
          {privacySecties.map((sectie) => (
            <article className="helpSectie" key={sectie.titel}>
              <h3>{sectie.titel}</h3>
              {sectie.tekst.map((alinea) => <p key={alinea}>{formatHelpTekst(alinea)}</p>)}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function AppHeader({ stap, setStap, onHelp, onDisclaimer, onPrivacy }) {
  const [infoOpen, setInfoOpen] = useState(false);
  const kies = (actie) => {
    setInfoOpen(false);
    actie();
  };
  return (
    <header className="appHeader">
      <a className="brand" href="https://www.taalroute.nl" target="_blank" rel="noreferrer" aria-label="Ga naar taalroute.nl">
        <img src={APP_LOGO_URL} alt="Taalroute" />
      </a>
      <nav>
        {[["1", "Invullen"], ["2", "Aanpassen"], ["3", "Downloaden"]].map(([nummer, label]) => (
          <button key={nummer} type="button" className={stap === Number(nummer) ? "active" : ""} onClick={() => setStap(Number(nummer))}><span>{nummer}</span>{label}</button>
        ))}
      </nav>
      <div className="headerActies">
        <button type="button" className="infoMenuKnop" onClick={() => setInfoOpen((open) => !open)} aria-label="Open informatie menu" aria-expanded={infoOpen} title="Info"><InfoIcon /><span>Info</span></button>
        {infoOpen ? (
          <div className="infoMenu">
            <button type="button" onClick={() => kies(onHelp)}>Help</button>
            <button type="button" onClick={() => kies(onPrivacy)}>Privacy</button>
            <button type="button" onClick={() => kies(onDisclaimer)}>Disclaimer</button>
          </div>
        ) : null}
      </div>
    </header>
  );
}

function MijnLessenPaneel({ lessen, actieveLesId, onOpslaan, onLaden, onDupliceren, onVerwijderen }) {
  const [zoekterm, setZoekterm] = useState("");
  const [niveauFilter, setNiveauFilter] = useState("");
  const [profielFilter, setProfielFilter] = useState("");
  const niveaus = [...new Set(lessen.map((les) => les.niveau).filter(Boolean))].sort();
  const profielen = [...new Set(lessen.map((les) => les.profiel).filter(Boolean))].sort();
  const zoek = zoekterm.trim().toLowerCase();
  const gefilterdeLessen = lessen
    .filter((les) => !niveauFilter || les.niveau === niveauFilter)
    .filter((les) => !profielFilter || les.profiel === profielFilter)
    .filter((les) => {
      if (!zoek) return true;
      return [les.titel, les.niveau, lesProfielLabel(les.form), les.thema, les.form?.lesdoel, les.form?.kernwoorden]
        .join(" ")
        .toLowerCase()
        .includes(zoek);
    })
    .sort((a, b) => new Date(b.bijgewerktOp).getTime() - new Date(a.bijgewerktOp).getTime());

  return (
    <section className="panel savedLessonsPanel">
      <div className="savedLessonsHeader">
        <div>
          <h2>Mijn lessen</h2>
          <p>Bewaar lessen lokaal, zoek ze later terug en maak snel een kopie.</p>
        </div>
        <Knop onClick={onOpslaan}>{actieveLesId ? "Les bijwerken" : "Les opslaan"}</Knop>
      </div>
      <div className="savedLessonFilters">
        <input className="field" value={zoekterm} onChange={(event) => setZoekterm(event.target.value)} placeholder="Zoek op thema, lesdoel of woord" />
        <select className="field" value={niveauFilter} onChange={(event) => setNiveauFilter(event.target.value)}>
          <option value="">Alle niveaus</option>
          {niveaus.map((niveau) => <option key={niveau} value={niveau}>{niveau}</option>)}
        </select>
        <select className="field" value={profielFilter} onChange={(event) => setProfielFilter(event.target.value)}>
          <option value="">Alle profielen</option>
          {profielen.map((profielId) => <option key={profielId} value={profielId}>{profielInfo[profielId]?.label || profielId}</option>)}
        </select>
      </div>
      <div className="savedLessonList">
        {gefilterdeLessen.length ? gefilterdeLessen.map((les) => (
          <article className={`savedLessonItem ${les.id === actieveLesId ? "active" : ""}`} key={les.id}>
            <div>
              <strong>{les.titel}</strong>
              <span>{les.niveau || "Geen niveau"} · {lesProfielLabel(les.form)}</span>
              <small>Laatst bewerkt: {formatDatumTijd(les.bijgewerktOp)}</small>
            </div>
            <div className="savedLessonActions">
              <button type="button" onClick={() => onLaden(les.id)} aria-label={`Open ${les.titel}`} title="Openen"><OpenLesIcon /></button>
              <button type="button" onClick={() => onDupliceren(les.id)} aria-label={`Dupliceer ${les.titel}`} title="Dupliceren"><CopyLesIcon /></button>
              <button type="button" className="danger" onClick={() => onVerwijderen(les.id)} aria-label={`Verwijder ${les.titel}`} title="Verwijderen"><TrashLesIcon /></button>
            </div>
          </article>
        )) : (
          <div className="savedLessonEmpty">
            <strong>Nog geen lessen gevonden</strong>
            <span>Sla je huidige les op of pas de zoekfilters aan.</span>
          </div>
        )}
      </div>
    </section>
  );
}

function Invullen({ form, setForm, naarResultaat, onPrivacy, lessen, actieveLesId, onLesOpslaan, onLesLaden, onLesDupliceren, onLesVerwijderen, onNieuweLes }) {
  const [bulkTekst, setBulkTekst] = useState("");
  const [melding, setMelding] = useState("");
  const [openGroepen, setOpenGroepen] = useState({ basis: true });
  const [weergave, setWeergave] = useState("bow");
  const [voorbeeldOpen, setVoorbeeldOpen] = useState(false);
  const [openScoreDelen, setOpenScoreDelen] = useState({});
  const profiel = profielInfo[form.standaard] || profielInfo.bow;
  const profielIds = actieveProfielen(form);
  const zichtbareGroepen = veldGroepenVoorWeergave(form, weergave);
  const zichtbareVelden = zichtbareGroepen.reduce((totaal, groep) => totaal + groep.velden.length, 0);
  const ingevuldeVelden = Object.entries(form).filter(([key, value]) => !["standaard", "extraProfielen", "didactischModel", "lesduur"].includes(key) && String(value || "").trim()).length;
  const bowScore = maakBowKwaliteitsscore(form);

  const update = (key, value) => setForm((vorig) => ({ ...vorig, [key]: value }));
  const updateLesduur = (lesduur) => setForm((vorig) => ({
    ...vorig,
    lesduur,
    tijdsindeling: isAutomatischeTijdsindeling(vorig.tijdsindeling) ? maakAutomatischeTijdsindeling(lesduur, vorig.didactischModel) : vorig.tijdsindeling
  }));
  const updateDidactischModel = (didactischModel) => setForm((vorig) => ({
    ...vorig,
    didactischModel,
    tijdsindeling: isAutomatischeTijdsindeling(vorig.tijdsindeling) ? maakAutomatischeTijdsindeling(vorig.lesduur, didactischModel) : vorig.tijdsindeling
  }));
  const toggleExtraProfiel = (profielId) => setForm((vorig) => {
    const huidig = Array.isArray(vorig.extraProfielen) ? vorig.extraProfielen : [];
    const extraProfielen = huidig.includes(profielId) ? huidig.filter((id) => id !== profielId) : [...huidig, profielId];
    return { ...vorig, extraProfielen };
  });
  const vulVoorbeeldles = (niveau = form.groepsniveau) => {
    const voorbeeld = maakVoorbeeldLes(form.standaard, niveau);
    setForm((vorig) => ({ ...vorig, ...voorbeeld, standaard: vorig.standaard, extraProfielen: vorig.extraProfielen }));
    setOpenGroepen((vorig) => ({
      ...vorig,
      basis: true,
      vut: true,
      taken: true,
      kwaliteit: true,
      praktijk: true,
      ...(profielVeldGroepen[form.standaard] || []).reduce((acc, id) => ({ ...acc, [id]: true }), {})
    }));
    setWeergave("bow");
    setVoorbeeldOpen(false);
    setMelding(`Voorbeeldles ingevuld voor ${profielInfo[form.standaard]?.label || "het gekozen profiel"} op ${voorbeeld.groepsniveau}.`);
  };
  const verwerkBulk = () => {
    const schoon = schoonTekst(bulkTekst);
    if (!schoon) return setMelding("Plak eerst tekst in het bulkveld.");
    if (detecteerType(schoon) === "les") {
      const parsed = parseGelabeldeLes(schoon);
      const gevuld = Object.fromEntries(Object.entries(parsed).filter(([, value]) => String(value || "").trim()));
      setForm((vorig) => ({ ...vorig, ...gevuld }));
      setMelding("Lesgegevens herkend en verdeeld over de velden.");
      return;
    }
    update("aangepasteInstructies", voegSamen(form.aangepasteInstructies, schoon));
    setMelding("Tekst toegevoegd aan aangepaste instructies. Gebruik labels zoals Lesdoel: om automatisch te verdelen.");
  };

  return (
    <div className="layoutInput">
      <div className="leftPanels">
        <section className="panel pastePanel">
          <h2>Snel plakken</h2>
          <p>Plak een standaardtekst of gelabelde lesinformatie. De app zet de inhoud automatisch op de juiste plaats.</p>
          <button type="button" className="privacyWarning" onClick={onPrivacy} aria-label="Open privacy informatie" title="Privacy">Privacy</button>
          <Tekstvak rows={9} value={bulkTekst} onChange={setBulkTekst} placeholder="Les: Thema 2&#10;Lesdoel: ...&#10;Hoofdvaardigheid: ..." />
          <div className="btnRow pasteActies">
            <Knop onClick={verwerkBulk}>Tekst verdelen</Knop>
            <Knop variant="secondary" onClick={onNieuweLes}>Leegmaken</Knop>
            <div className="voorbeeldKeuze">
              <Knop variant="secondary" onClick={() => setVoorbeeldOpen((open) => !open)}>Voorbeeldles</Knop>
              {voorbeeldOpen ? (
                <div className="voorbeeldMenu">
                  <strong>Kies niveau</strong>
                  {Object.entries(voorbeeldNiveaus).map(([id, item]) => (
                    <button key={id} type="button" onClick={() => vulVoorbeeldles(item.label)}>{item.label}</button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          {melding ? <div className="message pasteMelding">{melding}</div> : null}
        </section>

        <MijnLessenPaneel
          lessen={lessen}
          actieveLesId={actieveLesId}
          onOpslaan={() => {
            const les = onLesOpslaan();
            setMelding(les ? `Les opgeslagen: ${les.titel}` : "Les kon niet worden opgeslagen.");
          }}
          onLaden={(id) => {
            const les = onLesLaden(id);
            if (les) setMelding(`Les geopend: ${les.titel}`);
          }}
          onDupliceren={(id) => {
            const les = onLesDupliceren(id);
            if (les) setMelding(`Kopie gemaakt: ${les.titel}`);
          }}
          onVerwijderen={(id) => {
            const les = onLesVerwijderen(id);
            if (les) setMelding(`Les verwijderd: ${les.titel}`);
          }}
        />

        <section className="panel">
          <h2>Lesdetails</h2>
          <div className="fieldBlock"><Label verplicht>Lesonderwerp</Label><input className="field" value={form.lesonderwerp} onChange={(event) => update("lesonderwerp", event.target.value)} /></div>
          <div className="grid2">
            <div className="fieldBlock"><Label verplicht>Groepsniveau</Label><select className="field" value={form.groepsniveau} onChange={(event) => update("groepsniveau", event.target.value)}>{groepsniveaus.map((niveau) => <option key={niveau || "empty"} value={niveau}>{niveau || "Selecteer"}</option>)}</select></div>
            <div className="fieldBlock"><Label verplicht>Hoofdprofiel</Label><select className="field" value={form.standaard} onChange={(event) => update("standaard", event.target.value)}>{Object.entries(profielInfo).map(([id, item]) => <option key={id} value={id}>{item.label}</option>)}</select></div>
          </div>
          <div className="fieldBlock">
            <Label>Combineren met extra profiel</Label>
            <div className="profileChecks">
              <span>BOW auditlijn staat altijd aan</span>
              {Object.entries(profielInfo).filter(([id]) => id !== "bow" && id !== form.standaard).map(([id, item]) => (
                <label key={id}><input type="checkbox" checked={form.extraProfielen.includes(id)} onChange={() => toggleExtraProfiel(id)} />{item.label}</label>
              ))}
            </div>
          </div>
          <div className="fieldBlock"><Label verplicht>Didactisch model</Label><select className="field" value={form.didactischModel} onChange={(event) => updateDidactischModel(event.target.value)}>{Object.entries(didactischeModellen).map(([id, item]) => <option key={id} value={id}>{item.label}</option>)}</select></div>
          <div className="fieldBlock"><Label>Lesduur: {form.lesduur} minuten</Label><input type="range" min="15" max="180" step="15" value={form.lesduur} onChange={(event) => updateLesduur(Number(event.target.value))} /></div>
          <div className="profile"><strong>{profielLabels(profielIds)}</strong><p>BOW is altijd de auditlijn. Het gekozen profiel bepaalt de extra velden, suggesties en accenten.</p><p>{profielInfo[form.standaard]?.uitleg || profiel.uitleg}</p></div>
          <div className="btnRow"><Knop onClick={naarResultaat}>Bekijk resultaat</Knop></div>
        </section>
      </div>

      <section className="panel wide">
        <div className="stats">
          <div><strong>{ingevuldeVelden}</strong><span>velden ingevuld</span></div>
          <div><strong>{bowScore.percentage}%</strong><span>BOW audit-klaar</span></div>
          <div><strong>{form.lesduur}</strong><span>minuten</span></div>
        </div>
        <section className={`bowScoreKaart ${bowScore.statusType}`}>
          <div className="bowScoreKop">
            <div>
              <span className="bowMiniLogo">BOW</span>
              <strong>{bowScore.status}</strong>
              <small>{bowScore.mustHaveAanwezig}/{bowScore.mustHaveTotaal} BOW auditlijn · {bowScore.aanwezig}/{bowScore.totaal} totaal</small>
            </div>
            <b>{bowScore.percentage}%</b>
          </div>
          <div className="bowVoortgang" aria-label={`BOW voortgang ${bowScore.percentage} procent`}>
            <span style={{ width: `${bowScore.percentage}%` }} />
          </div>
          <div className="bowScoreDelen">
            {bowScore.secties.map((sectie) => (
              <section className="bowScoreDeel" key={sectie.id}>
                <button type="button" onClick={() => setOpenScoreDelen((vorig) => ({ ...vorig, [sectie.id]: !vorig[sectie.id] }))}>
                  <span><strong>{sectie.titel}</strong><small>{sectie.uitleg}</small></span>
                  <em>{sectie.aanwezig}/{sectie.totaal}</em>
                </button>
                {openScoreDelen[sectie.id] ? (
                  <div className="bowChecklist">
                    {sectie.items.map((item) => (
                      <span key={item.key || item.label} className={item.aanwezig ? "ok" : "mist"}>{item.aanwezig ? "✓" : "!"} {item.label}</span>
                    ))}
                  </div>
                ) : null}
              </section>
            ))}
          </div>
        </section>
        <div className="weergavePaneel">
          <div>
            <strong>{weergaveModi[weergave].titel}</strong>
            <span>{weergaveModi[weergave].uitleg}</span>
            <small>{zichtbareVelden} velden zichtbaar</small>
          </div>
          <div className="weergaveKnoppen" aria-label="Kies hoeveel velden zichtbaar zijn">
            {Object.entries(weergaveModi).map(([id, modus]) => (
              <button key={id} type="button" className={weergave === id ? "active" : ""} onClick={() => setWeergave(id)}>
                {modus.label}
              </button>
            ))}
          </div>
        </div>
        {zichtbareGroepen.map((groep) => (
          <section className="accordion" key={groep.id}>
            <button type="button" onClick={() => setOpenGroepen((vorig) => ({ ...vorig, [groep.id]: !vorig[groep.id] }))}>
              <span>
                <strong>{groep.titel}{groep.velden.some(([key]) => isBowVeld(key)) ? <i className="bowGroepBadge" aria-label="BOW auditlijn"><span>BOW</span></i> : null}</strong>
                <small>{groep.omschrijving}</small>
              </span>
              <em>{groep.velden.filter(([key]) => String(form[key] || "").trim()).length}/{groep.velden.length}</em>
            </button>
            {openGroepen[groep.id] ? <div className="accordionBody">{groep.velden.map(([key, label, rows]) => (
              <div key={key} className={`fieldBlock ${isBowVeld(key) ? "bowField" : ""}`}>
                <div className="fieldLabelRow">
                  <div>
                    <Label>{label}</Label>
                  </div>
                  <VeldActies profielId={form.standaard} profielIds={profielIds} didactischModelId={form.didactischModel} veldKey={key} waarde={form[key]} niveau={form.groepsniveau} contextTekst={[form.lesonderwerp, form.profielFocus, form.praktijkkern, form.kernwoorden, form.vaktaal, form.werkcontext, form.praktijksituatie, form.boekPaginas, form.aangepasteInstructies, form[key]].join(" ")} onChange={(waarde) => update(key, waarde)} />
                </div>
                {key === "tijdsindeling"
                  ? <TijdsindelingEditor value={form[key]} lesduur={form.lesduur} didactischModelId={form.didactischModel} onChange={(waarde) => update(key, waarde)} />
                  : <Tekstvak value={form[key]} rows={rows} onChange={(waarde) => update(key, waarde)} />}
              </div>
            ))}</div> : null}
          </section>
        ))}
      </section>
    </div>
  );
}

function Resultaat({ titel, setTitel, secties, setSecties, naarInvullen, naarDownload }) {
  const [actiefCanvasKey, setActiefCanvasKey] = useState("");
  const updateSectie = (id, key, waarde) => setSecties((vorig) => vorig.map((sectie) => sectie.id === id ? { ...sectie, [key]: waarde } : sectie));
  const canvasVelden = [
    { key: "titel", value: titel, onChange: setTitel },
    ...secties.flatMap((sectie) => {
      const velden = [{ key: `${sectie.id}-titel`, value: sectie.titel, onChange: (waarde) => updateSectie(sectie.id, "titel", waarde) }];
      if (sectie.id === "tijd") {
        parseTijdregels(sectie.inhoud).forEach((regel, regelIndex) => {
          velden.push({
            key: `${sectie.id}-${regelIndex}-activiteit`,
            value: regel.activiteit,
            onChange: (waarde) => {
              const regels = parseTijdregels(sectie.inhoud);
              regels[regelIndex] = { ...regels[regelIndex], activiteit: waarde };
              updateSectie(sectie.id, "inhoud", regels.map((item) => `${item.tijd}: ${item.activiteit}`).join(NL));
            }
          });
        });
      } else {
        velden.push({ key: `${sectie.id}-inhoud`, value: sectie.inhoud, onChange: (waarde) => updateSectie(sectie.id, "inhoud", waarde) });
      }
      return velden;
    })
  ];
  const actiefVeld = canvasVelden.find((veld) => veld.key === actiefCanvasKey) || null;
  return (
    <div className="result">
      <div className="toolbar resultaatToolbar"><Knop variant="secondary" onClick={naarInvullen}><RichtingIcon richting="left" />stap 1</Knop><Knop onClick={naarDownload}>stap 3<RichtingIcon richting="right" /></Knop></div>
      <div className="canvasHint">
        <strong>Canvas</strong>
        <span>Klik in een tekstvlak om de tekst direct aan te passen. Vlakken groeien automatisch mee, zodat tekst niet wordt afgebroken.</span>
      </div>
      <article className="lessonDoc">
        <header className="cover">
          <img src={DOCUMENT_LOGO_URL} alt="Taalroute" />
          <div className="headerTriangle" aria-hidden="true" />
          <AutoGrowTextarea className="canvasTitle" rows={1} ariaLabel="Titel van het canvas" canvasKey="titel" value={titel} onChange={setTitel} onCanvasFocus={setActiefCanvasKey} />
        </header>
        {secties.map((sectie, index) => (
          <section className="lessonSection" key={sectie.id}>
            <CanvasBlockToolbar
              label="Editor"
              className="canvasSectionToolbar"
              velden={sectie.id === "tijd" ? [
                { key: `${sectie.id}-titel`, value: sectie.titel, onChange: (waarde) => updateSectie(sectie.id, "titel", waarde) }
              ] : [
                { key: `${sectie.id}-titel`, value: sectie.titel, onChange: (waarde) => updateSectie(sectie.id, "titel", waarde) },
                { key: `${sectie.id}-inhoud`, value: sectie.inhoud, onChange: (waarde) => updateSectie(sectie.id, "inhoud", waarde) }
              ]}
            />
            <div className="canvasSectionRail">
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <AutoGrowTextarea className="sectionTitle" rows={1} ariaLabel={`Kop ${sectie.titel}`} canvasKey={`${sectie.id}-titel`} value={sectie.titel} onChange={(waarde) => updateSectie(sectie.id, "titel", waarde)} onCanvasFocus={setActiefCanvasKey} />
            {sectie.id === "tijd" ? (
              <div className="timeline">{parseTijdregels(sectie.inhoud).map((regel, regelIndex) => {
                const meta = tijdFaseMeta(regel.activiteit, regelIndex);
                const updateTijdregel = (patch) => {
                  const regels = parseTijdregels(sectie.inhoud);
                  regels[regelIndex] = { ...regels[regelIndex], ...patch };
                  updateSectie(sectie.id, "inhoud", regels.map((item) => `${item.tijd}: ${item.activiteit}`).join(NL));
                };
                return (
                  <div className="timelineCard" key={regelIndex}>
                    <CanvasBlockToolbar
                      label="Editor"
                      className="canvasSectionToolbar timelineCardToolbar"
                      velden={[{ key: `${sectie.id}-${regelIndex}-activiteit`, value: regel.activiteit, onChange: (waarde) => updateTijdregel({ activiteit: waarde }) }]}
                    />
                    <div className="timelineRail">
                      <div className="timelineIndex">{String(regelIndex + 1).padStart(2, "0")}</div>
                    </div>
                    <div className="timelineMain">
                      <div className="timelineTop">
                        <input aria-label="Tijd" value={regel.tijd} onChange={(event) => updateTijdregel({ tijd: event.target.value })} />
                        <strong>{meta.fase}</strong>
                      </div>
                      <AutoGrowTextarea rows={1} value={regel.activiteit} ariaLabel={`Activiteit ${regelIndex + 1}`} canvasKey={`${sectie.id}-${regelIndex}-activiteit`} onChange={(waarde) => updateTijdregel({ activiteit: waarde })} onCanvasFocus={setActiefCanvasKey} />
                      <small>{meta.functie}</small>
                    </div>
                  </div>
                );
              })}</div>
            ) : (
              <>
                <AutoGrowTextarea rows={3} value={sectie.inhoud} ariaLabel={`Tekst ${sectie.titel}`} canvasKey={`${sectie.id}-inhoud`} onChange={(waarde) => updateSectie(sectie.id, "inhoud", waarde)} onCanvasFocus={setActiefCanvasKey} />
              </>
            )}
          </section>
        ))}
      </article>
    </div>
  );
}

function Downloaden({ titel, secties, naarResultaat }) {
  const html = useMemo(() => maakHtml(titel || "Taalroute lesplan", secties), [titel, secties]);
  const [samenvattingExtraIds, setSamenvattingExtraIds] = useState([]);
  const [samenvattingMenuOpen, setSamenvattingMenuOpen] = useState(false);
  const samenvattingDropdownRef = useRef(null);
  const samenvattingHtml = useMemo(() => maakSamenvattingHtml(titel || "Taalroute lesplan", secties, samenvattingExtraIds), [titel, secties, samenvattingExtraIds]);
  const [voorbeeld, setVoorbeeld] = useState("volledig");
  const [pdfBezig, setPdfBezig] = useState(false);
  const actiefHtml = voorbeeld === "samenvatting" ? samenvattingHtml : html;
  const basisNaam = titel || "taalroute_lesplan";
  const isSamenvatting = voorbeeld === "samenvatting";
  const printControle = useMemo(() => maakSamenvattingPrintControle(secties, samenvattingExtraIds), [secties, samenvattingExtraIds]);
  const beschikbareExtraOpties = useMemo(() => samenvattingExtraOpties.filter((optie) => String(sectieInhoud(secties, optie.id) || "").trim()), [secties]);
  const toggleSamenvattingExtra = (id) => {
    setSamenvattingExtraIds((vorig) => vorig.includes(id) ? vorig.filter((item) => item !== id) : [...vorig, id]);
  };
  useEffect(() => {
    if (!samenvattingMenuOpen) return undefined;
    const sluitBijBuitenklik = (event) => {
      if (samenvattingDropdownRef.current && !samenvattingDropdownRef.current.contains(event.target)) {
        setSamenvattingMenuOpen(false);
      }
    };
    const sluitMetEscape = (event) => {
      if (event.key === "Escape") setSamenvattingMenuOpen(false);
    };
    document.addEventListener("mousedown", sluitBijBuitenklik);
    window.addEventListener("keydown", sluitMetEscape);
    return () => {
      document.removeEventListener("mousedown", sluitBijBuitenklik);
      window.removeEventListener("keydown", sluitMetEscape);
    };
  }, [samenvattingMenuOpen]);
  const downloadSamenvattingPdf = async () => {
    setPdfBezig(true);
    try {
      await downloadPdfVanHtml(samenvattingHtml, maakBestandsnaam(`${basisNaam}_samenvatting`, "pdf"));
    } catch (error) {
      window.alert("De PDF kon niet worden gemaakt. Probeer de samenvatting te printen of download de HTML-versie.");
      console.error(error);
    } finally {
      setPdfBezig(false);
    }
  };
  return (
    <div className="download">
      <div className="downloadPaneel">
        <div className="downloadTerug">
          <Knop variant="secondary" onClick={naarResultaat}><RichtingIcon richting="left" />stap 2</Knop>
        </div>
        <div className="downloadKeuze" aria-label="Kies document">
          <button type="button" className={voorbeeld === "volledig" ? "active" : ""} onClick={() => setVoorbeeld("volledig")}>
            <strong>Volledig plan</strong>
            <span>Alles voor de lesvoorbereiding</span>
          </button>
          <button type="button" className={isSamenvatting ? "active" : ""} onClick={() => setVoorbeeld("samenvatting")}>
            <strong>Samenvatting</strong>
            <span>Compacte leskaart</span>
          </button>
        </div>
        <div className="downloadActies" aria-label="Downloadacties">
          <DownloadActieKnop label="Print" sublabel={isSamenvatting ? "samenvatting" : "volledig plan"} onClick={() => printHtml(actiefHtml)}><PrintIcon /></DownloadActieKnop>
          {isSamenvatting ? (
            <>
              <DownloadActieKnop label={pdfBezig ? "PDF..." : "PDF"} sublabel="samenvatting" onClick={downloadSamenvattingPdf} disabled={pdfBezig}><PdfIcon /></DownloadActieKnop>
              <DownloadActieKnop label="HTML" sublabel="samenvatting" onClick={() => downloadBestand(samenvattingHtml, maakBestandsnaam(`${basisNaam}_samenvatting`), "text/html;charset=utf-8")}><SummaryIcon /></DownloadActieKnop>
            </>
          ) : (
            <DownloadActieKnop label="HTML" sublabel="volledig plan" onClick={() => downloadBestand(html, maakBestandsnaam(basisNaam), "text/html;charset=utf-8")}><DownloadIcon /></DownloadActieKnop>
          )}
        </div>
        {isSamenvatting ? (
          <div className={`printControle ${printControle.extraPaginaNodig ? "isWarning" : "isOk"}`} role="status">
            <strong>{printControle.titel}</strong>
            <span>{printControle.tekst}</span>
          </div>
        ) : null}
        {isSamenvatting && beschikbareExtraOpties.length ? (
          <div className="samenvattingSamenstellen">
            <strong>Compacte leskaart samenstellen</strong>
            <span>BOW auditlijn blijft vast. Extra onderdelen komen in dezelfde PDF-opmaak.</span>
            <div className="samenvattingDropdown" ref={samenvattingDropdownRef}>
              <button type="button" onClick={() => setSamenvattingMenuOpen((open) => !open)} aria-expanded={samenvattingMenuOpen} aria-haspopup="listbox">
                <span>{samenvattingExtraIds.length ? `${samenvattingExtraIds.length} extra onderdelen geselecteerd` : "Kies extra onderdelen"}</span>
                <b>{samenvattingMenuOpen ? "▲" : "▼"}</b>
              </button>
              {samenvattingMenuOpen ? (
                <div className="samenvattingDropdownMenu" role="listbox" aria-label="Extra onderdelen voor compacte leskaart">
                  {beschikbareExtraOpties.map((optie) => (
                    <label key={optie.id}>
                      <input type="checkbox" checked={samenvattingExtraIds.includes(optie.id)} onChange={() => toggleSamenvattingExtra(optie.id)} />
                      {optie.label}
                    </label>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
      <iframe title="Printvoorbeeld" srcDoc={actiefHtml} />
    </div>
  );
}

function draaiZelftests() {
  const veldKeys = Object.keys(legeLes).filter((key) => key !== "extraProfielen");
  const profielKeys = Object.keys(profielInfo);
  const downloadHtml = maakHtml("Test", maakSecties({ ...legeLes, lesonderwerp: "Test", didactischModel: "abcd" }));
  const samenvattingHtml = maakSamenvattingHtml("Test", maakSecties({ ...legeLes, lesonderwerp: "Test", didactischModel: "abcd" }));
  const opmaakHtml = maakHtml("Opmaak", [{ id: "doel", titel: "Opmaak", inhoud: `Dit is **vet** en *cursief*.${NL}- eerste punt` }]);
  const opmaakSamenvattingHtml = maakSamenvattingHtml("Opmaak", [{ id: "meta", titel: "Lesgegevens", inhoud: "Groepsniveau: A1 NT2" }, { id: "doel", titel: "Lesdoel", inhoud: "Dit is **vet**" }]);
  const lesOpslagTest = normaliseerLesItem({ form: { ...legeLes, lesonderwerp: "Dokter", groepsniveau: "A1 NT2", standaard: "taalroute" } });
  const voorbeeldSamenvattingBasis = maakSamenvattingHtml("Voorbeeld", maakSecties(maakVoorbeeldLes("taalroute", "A1 NT2")));
  const voorbeeldSamenvattingMetExtra = maakSamenvattingHtml("Voorbeeld", maakSecties(maakVoorbeeldLes("taalroute", "A1 NT2")), ["vier", "taalfocus"]);
  const langeSecties = maakSecties({ ...maakVoorbeeldLes("taalroute", "B1 NT2"), lesdoel: "Lange printcontrole ".repeat(260), functioneleTaak: "Uitgebreide taakbeschrijving ".repeat(160), praktijklerenLes: "Praktijkleren met veel toelichting ".repeat(160), huiswerk: "Huiswerk met veel toelichting ".repeat(160) });
  const langeSamenvattingHtml = maakSamenvattingHtml("Lange test", langeSecties);
  const helpUiTekst = `${helpTekstVoorTests}\nHelp\nSluiten`;
  const disclaimerUiTekst = `${disclaimerTekstVoorTests}\nDisclaimer\nSluiten`;
  const privacyUiTekst = `${privacyTekstVoorTests}\nPrivacy\nSluiten`;
  const dubbeleSuggestie = ((waarde, suggestie) => waarde.includes(suggestie) ? waarde : `${waarde}${NL}${suggestie}`)("Bestaand", "Bestaand");

  return [
    { naam: "Alle velden hebben specifieke uitleg", geslaagd: veldKeys.every((key) => Boolean(veldUitlegBank[key])) },
    { naam: "Alle velden hebben didactische tips", geslaagd: veldKeys.every((key) => (didactischeTipBank[key] || []).length >= 3) },
    { naam: "Alle velden hebben minimaal vier basissuggesties", geslaagd: veldKeys.every((key) => (basisDoelSuggesties[key] || []).length >= 4) },
    { naam: "Alle profielen hebben suggesties voor lesdoel", geslaagd: profielKeys.every((key) => haalProfielSuggesties(key, "lesdoel", "vut").length >= 4) },
    { naam: "Alle profielen hebben suggesties voor functioneleTaak", geslaagd: profielKeys.every((key) => haalProfielSuggesties(key, "functioneleTaak", "taakgericht").length >= 4) },
    { naam: "Alle profielen hebben suggesties voor huiswerk", geslaagd: profielKeys.every((key) => haalProfielSuggesties(key, "huiswerk", "terugplannen").length >= 4) },
    { naam: "Elk didactisch model heeft suggesties", geslaagd: Object.values(didactischModelSuggesties).every((velden) => Object.keys(velden).length > 0) },
    { naam: "Alle velden geven via plusknop suggesties", geslaagd: profielKeys.every((profielKey) => lesstudioSuggestieVelden.every((veldKey) => haalProfielSuggesties(profielKey, veldKey, "vut").length >= 4)) },
    { naam: "Plusmenu titel gebruikt profielnaam", geslaagd: maakSuggestieMenuTitel("taalroute") === "Taalroute Profiel suggesties" },
    { naam: "ABCD tijdsindeling bevat A input en D vrije productie", geslaagd: maakAutomatischeTijdsindeling(90, "abcd").includes("A input") && maakAutomatischeTijdsindeling(90, "abcd").includes("D vrije productie") },
    { naam: "EDI tijdsindeling bevat begripcheck en begeleide oefening", geslaagd: maakAutomatischeTijdsindeling(90, "edi").includes("begripcheck") && maakAutomatischeTijdsindeling(90, "edi").includes("begeleide oefening") },
    { naam: "Taakgericht tijdsindeling bevat taak uitvoeren en taalsteun", geslaagd: maakAutomatischeTijdsindeling(90, "taakgericht").includes("taak uitvoeren") && maakAutomatischeTijdsindeling(90, "taakgericht").includes("taalsteun") },
    { naam: "Terugplannen tijdsindeling bevat eindtaak en transfer", geslaagd: maakAutomatischeTijdsindeling(90, "terugplannen").includes("eindtaak") && maakAutomatischeTijdsindeling(90, "terugplannen").includes("transfer") },
    { naam: "Suggesties worden niet dubbel toegevoegd", geslaagd: dubbeleSuggestie === "Bestaand" },
    { naam: "Downloads krijgen taalroute in bestandsnaam", geslaagd: maakBestandsnaam("les huisarts") === "taalroute_les_huisarts.html" && maakBestandsnaam("taalroute plan") === "taalroute_plan.html" && maakBestandsnaam("les huisarts", "pdf") === "taalroute_les_huisarts.pdf" },
    { naam: "Samenvatting PDF gebruikt dezelfde pagina-opbouw", geslaagd: samenvattingHtml.includes('class="page coverPage"') && samenvattingHtml.includes('class="page detailPage"') },
    { naam: "Compacte leskaart houdt BOW auditlijn vast en extra onderdelen kiesbaar", geslaagd: voorbeeldSamenvattingBasis.includes("BOW kerncontrole") && !voorbeeldSamenvattingBasis.includes("Vaardigheden en grammatica") && voorbeeldSamenvattingMetExtra.includes("Vaardigheden en grammatica") && voorbeeldSamenvattingMetExtra.includes("Taalfocus") },
    { naam: "Samenvatting voegt extra inhoudspagina toe bij veel tekst", geslaagd: maakSamenvattingPrintControle(langeSecties).extraPaginaNodig && langeSamenvattingHtml.includes("Uitgebreide onderdelen") && langeSamenvattingHtml.includes('class="page extraPage"') && !langeSamenvattingHtml.includes("Deze pagina is automatisch toegevoegd") },
    { naam: "Samenvatting kapt teksten niet af met punten", geslaagd: !langeSamenvattingHtml.includes("...") },
    { naam: "Canvas-opmaak wordt gerenderd in pagina 3", geslaagd: opmaakHtml.includes("<strong>vet</strong>") && opmaakHtml.includes("<em>cursief</em>") && opmaakHtml.includes("<li>eerste punt</li>") && !opmaakHtml.includes("**vet**") },
    { naam: "Samenvatting neemt canvas-opmaak over", geslaagd: opmaakSamenvattingHtml.includes("<strong>vet</strong>") && !opmaakSamenvattingHtml.includes("**vet**") },
    { naam: "Lesopslag bewaart metadata voor zoeken", geslaagd: lesOpslagTest.titel === "Dokter" && lesOpslagTest.niveau === "A1 NT2" && lesOpslagTest.profiel === "taalroute" && Boolean(lesOpslagTest.bijgewerktOp) },
    { naam: "Extra samenvattingpagina gebruikt dezelfde BOW kaartstijl", geslaagd: langeSamenvattingHtml.includes('class="bowGrid extraBowGrid"') && !langeSamenvattingHtml.includes("extraGrid") },
    { naam: "Download HTML bevat geen Lingua Academy", geslaagd: !downloadHtml.includes("Lingua Academy") },
    { naam: "Download HTML bevat geen Taalroute service", geslaagd: !downloadHtml.includes("Taalroute service") },
    { naam: "Vraagtekenknop, tipknop en plusknop blijven even groot", geslaagd: appCss.includes(".veldActies > button { width: 30px; height: 30px;") && appCss.includes(".tipKnop") }
    ,{ naam: "Pagina 3 bevat Didactische opbouw", geslaagd: downloadHtml.includes("Didactische opbouw") },
    { naam: "Samenvatting bevat Taalroute website en favicon", geslaagd: samenvattingHtml.includes("www.taalroute.nl") && samenvattingHtml.includes(FAVICON_URL) },
    { naam: "Samenvatting gebruikt geen printbare labeltekst", geslaagd: !samenvattingHtml.includes("Printbare 2 pagina") },
    { naam: "BOW staat altijd in de lesgegevens", geslaagd: maakSecties({ ...legeLes, standaard: "mbo" })[0].inhoud.includes("BOW auditlijn: altijd actief") },
    { naam: "Compacte modus toont minder velden", geslaagd: veldGroepenVoorWeergave({ ...legeLes, standaard: "taalroute" }, "bow").reduce((totaal, groep) => totaal + groep.velden.length, 0) < veldGroepenVoorWeergave({ ...legeLes, standaard: "taalroute" }, "profiel").reduce((totaal, groep) => totaal + groep.velden.length, 0) },
    { naam: "Alles modus toont alle veldgroepen", geslaagd: veldGroepenVoorWeergave({ ...legeLes, standaard: "taalroute" }, "alles").length === veldGroepen.length },
    { naam: "Compacte modus bevat verplichte BOW velden", geslaagd: ["lesdoel", "functioneleTaak", "checkOpBegrip", "huiswerk"].every((key) => veldGroepenVoorWeergave({ ...legeLes, standaard: "taalroute" }, "bow").some((groep) => groep.velden.some(([veldKey]) => veldKey === key))) },
    { naam: "BOW velden worden zichtbaar gemarkeerd", geslaagd: isBowVeld("lesdoel") && isBowVeld("checkOpBegrip") && !isBowVeld("branche") },
    { naam: "BOW score onder 16 must-haves is rood", geslaagd: maakBowKwaliteitsscore(legeLes).status === "Niet audit-klaar" && maakBowKwaliteitsscore(legeLes).statusType === "concept" && maakBowKwaliteitsscore(legeLes).percentage === 0 },
    { naam: "BOW score bevat drie lagen", geslaagd: maakBowKwaliteitsscore(legeLes).secties.length === 3 && maakBowKwaliteitsscore(legeLes).secties[1].titel.includes("Kwaliteitsverdieping") },
    { naam: "BOW score 16/16 auditlijn is oranje audit-klaar", geslaagd: (() => { const score = maakBowKwaliteitsscore({ ...legeLes, ...Object.fromEntries(bowMustHaves.map((item) => [item.key, "ingevuld"])) }); return score.mustHaveAanwezig === 16 && score.mustHaveTotaal === 16 && score.status === "Audit-klaar" && score.statusType === "bijna"; })() },
    { naam: "BOW score 33/33 is groen volledig audit-klaar", geslaagd: (() => { const score = maakBowKwaliteitsscore(maakVoorbeeldLes("taalroute", "A1 NT2")); return score.aanwezig === score.totaal && score.status === "Volledig audit-klaar" && score.statusType === "klaar"; })() },
    { naam: "BOW score toont waarschuwingen", geslaagd: maakBowKwaliteitsscore({ ...maakVoorbeeldLes("taalroute", "A1 NT2"), checkOpBegrip: "" }).waarschuwingen.includes("Check op begrip ontbreekt") },
    { naam: "Verbeterhulp is zichtbaar als gekleurde knop", geslaagd: appCss.includes(".veldActies > button.verbeterKnop") && appCss.includes("#16a34a") },
    { naam: "Verbeterhulp geeft lesdoel feedback", geslaagd: verbeterZinnenVoorVeld("lesdoel", "Oefenen met dokterwoorden", "A1 NT2").some((item) => item.label === "Maak dit BOW-proof" && item.tekst.includes("doktersituatie")) },
    { naam: "Verbeterhulp herkent vage lesdoelen", geslaagd: verbeterZinnenVoorVeld("lesdoel", "Oefenen met dokterwoorden", "A1 NT2")[0].waarschuwing.includes("algemeen") },
    { naam: "Verbeterhulp waarschuwt per kernveld", geslaagd: verbeterZinnenVoorVeld("functioneleTaak", "Oefenen met bellen", "A1 NT2")[0].waarschuwing.includes("functionele taak") && verbeterZinnenVoorVeld("huiswerk", "Maak opdracht 4", "A1 NT2")[0].waarschuwing.includes("Huiswerk") && verbeterZinnenVoorVeld("checkOpBegrip", "", "A1 NT2")[0].waarschuwing.includes("nog leeg") },
    { naam: "Verbeterhulp blijft beperkt tot kernvelden", geslaagd: verbeterZinnenVoorVeld("branche", "zorg", "A1 NT2").length === 0 },
    { naam: "Verbeterhulp herkent werkcontext zonder voorbeeldles", geslaagd: verbeterZinnenVoorVeld("functioneleTaak", "Oefenen met melden aan leidinggevende", "B1 NT2").some((item) => item.tekst.includes("werksituatie") || item.tekst.includes("leidinggevende")) },
    { naam: "Verbeterhulp gebruikt algemene praktijkcontext als niets herkend wordt", geslaagd: verbeterZinnenVoorVeld("huiswerk", "Oefen de woorden", "A1 NT2").some((item) => item.tekst.includes("herkenbare praktijksituatie")) },
    { naam: "Verbeterhulp bevat brede contextbank", geslaagd: Object.keys(verbeterContexten).length >= 25 },
    { naam: "Verbeterhulp heeft taalsteun per context", geslaagd: [...Object.keys(verbeterContexten), "algemeen"].every((id) => (taalsteunVoorContext(id).woorden || []).length >= 3 && (taalsteunVoorContext(id).zinnen || []).length >= 2) },
    { naam: "Verbeterhulp past taalsteun aan op niveau", geslaagd: taalsteunVoorContextEnNiveau("geld", "A1 NT2").woorden.length === 3 && taalsteunVoorContextEnNiveau("geld", "B1 NT2").zinnen.some((zin) => zin.includes("volgende stap")) },
    { naam: "Verbeterhulp herkent geld, telefoneren en logistiek", geslaagd: verbeterZinnenVoorVeld("lesdoel", "rekening betalen met pinpas", "A2 NT2").some((item) => item.tekst.includes("geld")) && verbeterZinnenVoorVeld("functioneleTaak", "telefoneren en voicemail inspreken", "A1 NT2").some((item) => item.tekst.includes("telefonische situatie")) && verbeterZinnenVoorVeld("taalfocus", "order pakken met scanner in magazijn", "A2 NT2").some((item) => item.tekst.includes("logistieke werksituatie")) },
    { naam: "Verbeterhulp toont herkende contextlabel", geslaagd: bepaalVerbeterContextInfo("rekening betalen met pinpas").label === "geld en betalen" && bepaalVerbeterContextInfo("").label === "algemene praktijksituatie" },
    { naam: "Verbeterhulp kan context handmatig overschrijven", geslaagd: verbeterZinnenVoorVeld("lesdoel", "rekening betalen met pinpas", "A2 NT2", "", "telefoneren").some((item) => item.tekst.includes("telefonische situatie")) && contextInfoOpId("werk", "").label === "werk" },
    { naam: "Verbeterhulp voegt profielgerichte opties toe", geslaagd: verbeterZinnenVoorVeld("lesdoel", "werkbrug en kernwoorden", "A1 NT2", "", "auto", ["bow", "taalroute"]).some((item) => item.label === "Maak methodegericht") && verbeterZinnenVoorVeld("lesdoel", "examen lezen strategie", "A2 NT2", "", "auto", ["bow", "staatsexamen"]).some((item) => item.label === "Maak examengericht") && verbeterZinnenVoorVeld("lesdoel", "vaktaal veiligheid", "A2 NT2", "", "auto", ["bow", "mbo"]).some((item) => item.label === "Maak beroepsgericht") },
    { naam: "Verbeterhulp past formulering aan op gekozen niveau", geslaagd: verbeterZinnenVoorVeld("lesdoel", "telefoneren", "A1 NT2", "", "telefoneren")[0].tekst.includes("vaste zinnen") && verbeterZinnenVoorVeld("lesdoel", "telefoneren", "B1 NT2", "", "telefoneren")[0].tekst.includes("zelfstandig met meer nuance") },
    { naam: "Verbeterhulp kan toevoegen of vervangen", geslaagd: pasVerbeterSuggestieToe("Bestaande tekst", "Nieuwe suggestie", "toevoegen") === `Bestaande tekst${NL}Nieuwe suggestie` && pasVerbeterSuggestieToe("Bestaande tekst", "Nieuwe suggestie", "vervangen") === "Nieuwe suggestie" && pasVerbeterSuggestieToe("Nieuwe suggestie", "Nieuwe suggestie", "toevoegen") === "Nieuwe suggestie" },
    { naam: "Verbeterhulp heeft herstelroute", geslaagd: appCss.includes(".verbeterHerstelKnop") && appCss.includes(".verbeterHerstelKnop:hover") },
    { naam: "Voorbeeldles past zich aan niveau aan", geslaagd: maakVoorbeeldLes("taalroute", "Alfa B").groepsniveau === "Alfa B" && maakVoorbeeldLes("taalroute", "A2 NT2").lesonderwerp.includes("dokter") && maakVoorbeeldLes("taalroute", "B1 NT2").lesonderwerp.includes("vervolgafspraak") },
    { naam: "Voorbeeldles past zich aan profiel aan", geslaagd: Boolean(maakVoorbeeldLes("zroute", "Alfa B").zrouteSteunlijn) && Boolean(maakVoorbeeldLes("mbo", "A2 NT2").vaktaal) && Boolean(maakVoorbeeldLes("staatsexamen", "A1 NT2").beoordelingscriteria) },
    { naam: "Alle voorbeeldlessen vullen alle inhoudelijke velden", geslaagd: ["Alfa B", "A1 NT2", "A2 NT2", "B1 NT2"].every((niveau) => voorbeeldControleVelden.every((key) => String(maakVoorbeeldLes("bow", niveau)[key] || "").trim())) },
    { naam: "Voorbeeldles bevat uitgebreide didactiek", geslaagd: Boolean(maakVoorbeeldLes("taalroute", "A1 NT2").instructieDocent) && Boolean(maakVoorbeeldLes("taalroute", "A1 NT2").faseGestuurdeProductie) && maakVoorbeeldLes("taalroute", "A1 NT2").vutUitvoeren.includes("Toepassen") },
    { naam: "Voorbeeldles is concreet over de dokter", geslaagd: maakVoorbeeldLes("taalroute", "A1 NT2").lesdoel.includes("dokter") && maakVoorbeeldLes("taalroute", "A1 NT2").woordenschatactiviteit.includes("lichaamsdeel") },
    { naam: "Helptekst bevat kernonderdelen", geslaagd: ["Taalroute Lesstudio", "Werk in drie stappen", "Wat is een profiel", "Wat is een didactisch model", "Knoppen en editor", "Vraagtekenknop", "Plusknop", "Hoe werkt de lesduur", "Printen en downloaden"].every((tekst) => helpTekstVoorTests.includes(tekst)) },
    { naam: "Helpformatter maakt meervoudige knopwoorden volledig vet", geslaagd: formatHelpTekst("Gebruik de vraagtekenknoppen en plusknoppen.").filter((deel) => typeof deel !== "string").map((deel) => deel.props.children).join("|") === "vraagtekenknoppen|plusknoppen" },
    { naam: "Help UI bevat Help en Sluiten", geslaagd: helpUiTekst.includes("Help") && helpUiTekst.includes("Sluiten") },
    { naam: "Helptekst bevat geen oude naamgeving", geslaagd: !["Lesbouwer", "Lesplanbouwer", "Lingua Academy", "Taalroute service"].some((tekst) => helpTekstVoorTests.includes(tekst)) },
    { naam: "Disclaimer bevat B1 kernpunten", geslaagd: ["Gebruik van de website", "Controleer altijd zelf", "Geen garantie", "Gebruik op eigen verantwoordelijkheid", "Auteursrecht", "Didactische modellen en profielen", "Wijzigingen"].every((tekst) => disclaimerTekstVoorTests.includes(tekst)) },
    { naam: "Disclaimer benoemt geen verbondenheid", geslaagd: disclaimerTekstVoorTests.includes("geen verbondenheid") && disclaimerTekstVoorTests.includes("basis van eigen inzicht") },
    { naam: "Disclaimer UI bevat Disclaimer en Sluiten", geslaagd: disclaimerUiTekst.includes("Disclaimer") && disclaimerUiTekst.includes("Sluiten") },
    { naam: "Disclaimer bevat geen oude naamgeving", geslaagd: !["Lesbouwer", "Lesplanbouwer", "Lingua Academy", "Taalroute service"].some((tekst) => disclaimerTekstVoorTests.includes(tekst)) }
    ,{ naam: "Privacytekst bevat kernwaarschuwingen", geslaagd: ["Gebruik geen persoonsgegevens", "Maak voorbeelden anoniem", "Controleer het plakveld", "Gevoelige informatie", "Eigen verantwoordelijkheid"].every((tekst) => privacyTekstVoorTests.includes(tekst)) },
    { naam: "Privacy UI bevat Privacy en Sluiten", geslaagd: privacyUiTekst.includes("Privacy") && privacyUiTekst.includes("Sluiten") },
    { naam: "Privacytekst bevat geen oude naamgeving", geslaagd: !["Lesbouwer", "Lesplanbouwer", "Lingua Academy", "Taalroute service"].some((tekst) => privacyTekstVoorTests.includes(tekst)) }
  ];
}

export default function Lesstudio() {
  const [stap, setStap] = useState(1);
  const [form, setForm] = useState(legeLes);
  const [opgeslagenLessen, setOpgeslagenLessen] = useState(() => leesOpgeslagenLessen());
  const [actieveLesId, setActieveLesId] = useState("");
  const [editorTitel, setEditorTitel] = useState("Nieuw Taalroute lesplan");
  const [editorSecties, setEditorSecties] = useState([]);
  const [helpOpen, setHelpOpen] = useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const zelftests = useMemo(() => draaiZelftests(), []);
  const zelftestsGeslaagd = zelftests.every((test) => test.geslaagd);

  useEffect(() => {
    schrijfOpgeslagenLessen(opgeslagenLessen);
  }, [opgeslagenLessen]);

  const bewaarLessen = (updater) => {
    setOpgeslagenLessen((vorig) => (typeof updater === "function" ? updater(vorig) : updater));
  };

  const slaLesOp = () => {
    const nu = new Date().toISOString();
    const bestaand = actieveLesId ? opgeslagenLessen.find((les) => les.id === actieveLesId) : null;
    const les = {
      id: bestaand?.id || maakLesId(),
      titel: lesTitel(form),
      niveau: form.groepsniveau || "",
      profiel: form.standaard || "bow",
      thema: lesThema(form),
      aangemaaktOp: bestaand?.aangemaaktOp || nu,
      bijgewerktOp: nu,
      form: { ...form, extraProfielen: Array.isArray(form.extraProfielen) ? [...form.extraProfielen] : [] }
    };
    bewaarLessen((vorig) => bestaand ? vorig.map((item) => item.id === les.id ? les : item) : [les, ...vorig]);
    setActieveLesId(les.id);
    return les;
  };

  const laadLes = (id) => {
    const les = opgeslagenLessen.find((item) => item.id === id);
    if (!les) return null;
    setForm({ ...legeLes, ...les.form, extraProfielen: Array.isArray(les.form.extraProfielen) ? [...les.form.extraProfielen] : [] });
    setActieveLesId(les.id);
    setEditorTitel(lesTitel(les.form));
    setEditorSecties([]);
    setStap(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
    return les;
  };

  const dupliceerLes = (id) => {
    const les = opgeslagenLessen.find((item) => item.id === id);
    if (!les) return null;
    const nu = new Date().toISOString();
    const kopieForm = { ...legeLes, ...les.form, lesonderwerp: `${lesTitel(les.form)} kopie`, extraProfielen: Array.isArray(les.form.extraProfielen) ? [...les.form.extraProfielen] : [] };
    const kopie = {
      id: maakLesId(),
      titel: lesTitel(kopieForm),
      niveau: kopieForm.groepsniveau || "",
      profiel: kopieForm.standaard || "bow",
      thema: lesThema(kopieForm),
      aangemaaktOp: nu,
      bijgewerktOp: nu,
      form: kopieForm
    };
    bewaarLessen((vorig) => [kopie, ...vorig]);
    setForm(kopieForm);
    setActieveLesId(kopie.id);
    setEditorTitel(kopie.titel);
    setEditorSecties([]);
    setStap(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
    return kopie;
  };

  const verwijderLes = (id) => {
    const les = opgeslagenLessen.find((item) => item.id === id);
    if (!les) return null;
    const akkoord = window.confirm(`Weet je zeker dat je "${les.titel}" wilt verwijderen?`);
    if (!akkoord) return null;
    bewaarLessen((vorig) => vorig.filter((item) => item.id !== id));
    if (actieveLesId === id) {
      setActieveLesId("");
      setForm(legeLes);
      setEditorTitel("Nieuw Taalroute lesplan");
      setEditorSecties([]);
      setStap(1);
    }
    return les;
  };

  const nieuweLes = () => {
    setForm(legeLes);
    setActieveLesId("");
    setEditorTitel("Nieuw Taalroute lesplan");
    setEditorSecties([]);
  };

  const maakResultaat = (volgendeStap) => {
    setEditorTitel(form.lesonderwerp || "Nieuw Taalroute lesplan");
    setEditorSecties(maakSecties(form));
    setStap(volgendeStap);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nav = (nieuweStap) => {
    if (nieuweStap === 1) setStap(1);
    if (nieuweStap === 2) {
      if (stap === 3 && editorSecties.length) setStap(2);
      else maakResultaat(2);
    }
    if (nieuweStap === 3) {
      if (stap === 2 && editorSecties.length) setStap(3);
      else maakResultaat(3);
    }
  };

  return (
    <main className="appRoot">
      <style>{appCss}</style>
      {!zelftestsGeslaagd ? <div className="testMelding">Interne datacheck vraagt aandacht.</div> : null}
      <AppHeader stap={stap} setStap={nav} onHelp={() => setHelpOpen(true)} onPrivacy={() => setPrivacyOpen(true)} onDisclaimer={() => setDisclaimerOpen(true)} />
      <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <DisclaimerModal open={disclaimerOpen} onClose={() => setDisclaimerOpen(false)} />
      {stap === 1 ? <Invullen form={form} setForm={setForm} naarResultaat={() => maakResultaat(2)} onPrivacy={() => setPrivacyOpen(true)} lessen={opgeslagenLessen} actieveLesId={actieveLesId} onLesOpslaan={slaLesOp} onLesLaden={laadLes} onLesDupliceren={dupliceerLes} onLesVerwijderen={verwijderLes} onNieuweLes={nieuweLes} /> : null}
      {stap === 2 ? <Resultaat titel={editorTitel} setTitel={setEditorTitel} secties={editorSecties} setSecties={setEditorSecties} naarInvullen={() => setStap(1)} naarDownload={() => setStap(3)} /> : null}
      {stap === 3 ? <Downloaden titel={editorTitel} secties={editorSecties} naarResultaat={() => setStap(2)} /> : null}
    </main>
  );
}

const appCss = `
:root { color-scheme: light; --tr-blue: ${BRAND}; --tr-blue-dark: #006fbd; --tr-blue-deep: #063a5a; --tr-blue-soft: #e6f5ff; --tr-blue-pale: #f4fbff; --tr-line: #b9e5ff; --tr-line-soft: #d9efff; --tr-text: #12324a; --tr-muted: #526b7d; --tr-surface: rgba(255,255,255,.96); --tr-shadow: 0 24px 70px rgba(8,58,89,.16); --app-header-height: 88px; --body-box-min-height: 86px; font-family: "Poppins", "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif; }
* { box-sizing: border-box; }
body { margin: 0; }
.appRoot { position: relative; min-height: 100vh; background:
  linear-gradient(90deg, rgba(7,58,90,.12) 0 18px, transparent 18px),
  radial-gradient(circle at 16% 0%, rgba(0,144,242,.22), transparent 32%),
  radial-gradient(circle at 86% 8%, rgba(71,184,255,.18), transparent 28%),
  linear-gradient(180deg, #f7fcff 0%, #eef8ff 46%, #e7f3fb 100%);
  color: var(--tr-text); padding-top: calc(var(--app-header-height) + 22px); font-family: inherit; font-feature-settings: "kern"; text-rendering: geometricPrecision; }
.appRoot::before { content: ""; position: fixed; left: 0; top: 0; bottom: 0; width: 18px; z-index: 0; background: linear-gradient(180deg, rgba(5,47,73,.96) 0%, rgba(0,111,189,.86) 100%); box-shadow: inset -1px 0 0 rgba(255,255,255,.18); pointer-events: none; opacity: .92; }
.appRoot::after { content: ""; position: fixed; left: 6px; top: 118px; width: 6px; height: 128px; z-index: 0; background: rgba(255,255,255,.42); pointer-events: none; opacity: .8; }
.appHeader { position: fixed; inset: 0 0 auto; z-index: 10; height: var(--app-header-height); background: rgba(255,255,255,.98); backdrop-filter: blur(14px); border-bottom: 1px solid rgba(185,229,255,.88); box-shadow: 0 14px 44px rgba(8,58,89,.14); padding: 14px 26px 14px 42px; display: grid; grid-template-columns: 236px 1fr 96px; gap: 18px; align-items: center; }
.brand { display: flex; align-items: center; justify-content: flex-start; width: fit-content; text-decoration: none; }
.brand:focus-visible { outline: 0; box-shadow: 0 0 0 4px rgba(0,144,242,.16); }
.brand img { width: 150px; height: auto; object-fit: contain; }
.appHeader nav { display: flex; gap: 7px; justify-self: end; padding: 5px; background: #f4fbff; border: 1px solid var(--tr-line-soft); }
.appHeader nav button { width: 156px; height: 48px; border: 1px solid transparent; background: transparent; color: var(--tr-blue-dark); font-weight: 850; cursor: pointer; font-family: inherit; transition: background-color .15s ease, color .15s ease, border-color .15s ease, box-shadow .15s ease; }
.appHeader nav button:hover { background: white; border-color: var(--tr-line-soft); }
.appHeader nav button.active { background: var(--tr-blue); color: white; border-color: var(--tr-blue); box-shadow: 0 10px 24px rgba(0,144,242,.18); }
.appHeader nav span { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; margin-right: 8px; background: white; color: var(--tr-blue-dark); border: 1px solid var(--tr-line-soft); }
.appHeader nav .active span { background: white; color: var(--tr-blue); }
.headerActies { position: relative; justify-self: end; display: flex; align-items: center; }
.infoMenuKnop { width: 86px; height: 48px; display: inline-flex; align-items: center; justify-content: center; gap: 7px; border: 1px solid var(--tr-blue); background: var(--tr-blue); color: white; font-family: inherit; font-size: 13px; font-weight: 900; cursor: pointer; box-shadow: 0 10px 24px rgba(0,144,242,.18); }
.infoMenuKnop:hover { background: var(--tr-blue-dark); border-color: var(--tr-blue-dark); }
.infoMenuKnop:focus-visible { outline: 0; box-shadow: 0 0 0 4px rgba(0,144,242,.18), 0 8px 20px rgba(0,144,242,.16); }
.infoMenuKnop svg { width: 19px; height: 19px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.infoMenu { position: absolute; right: 0; top: calc(100% + 8px); z-index: 12; min-width: 180px; background: white; border: 1px solid var(--tr-line); box-shadow: 0 18px 50px rgba(0,75,122,.20); padding: 8px; }
.infoMenu button { width: 100%; border: 0; background: white; color: var(--tr-text); padding: 11px 12px; text-align: left; font-family: inherit; font-weight: 850; cursor: pointer; }
.infoMenu button:hover { background: var(--tr-blue-pale); color: var(--tr-blue-dark); }
.helpOverlay { position: fixed; inset: 0; z-index: 30; display: grid; place-items: center; padding: 24px; background: rgba(6, 43, 68, .42); }
.helpModal { width: min(920px, 100%); max-height: min(840px, calc(100vh - 48px)); display: flex; flex-direction: column; background: white; border: 1px solid var(--tr-line); box-shadow: 0 28px 90px rgba(0, 47, 80, .28); }
.helpModalHeader { display: flex; align-items: flex-start; justify-content: space-between; gap: 18px; padding: 22px 24px; background: linear-gradient(180deg, white 0%, var(--tr-blue-pale) 100%); border-bottom: 1px solid var(--tr-line); }
.helpModalHeader p { margin: 0 0 4px; color: var(--tr-blue); font-size: 12px; font-weight: 900; letter-spacing: .06em; text-transform: uppercase; }
.helpModalHeader h2 { margin: 0; color: var(--tr-text); font-size: 28px; line-height: 1.15; }
.helpModalHeader button { border: 1px solid var(--tr-blue); background: var(--tr-blue); color: white; padding: 10px 14px; font-family: inherit; font-weight: 900; cursor: pointer; }
.helpModalHeader button:hover { background: var(--tr-blue-dark); border-color: var(--tr-blue-dark); }
.helpModalBody { overflow: auto; padding: 20px 24px 24px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
.disclaimerBody { grid-template-columns: 1fr; }
.helpSectie { border: 1px solid #d7efff; background: #fbfdff; padding: 16px; }
.helpSectie h3 { margin: 0 0 10px; color: var(--tr-blue-dark); font-size: 17px; line-height: 1.25; }
.helpSectie p { margin: 0 0 9px; color: #35596d; font-size: 13px; line-height: 1.55; }
.helpSectie p:last-child { margin-bottom: 0; }
.helpSectie strong { color: var(--tr-blue-dark); font-weight: 900; }
.helpSectie .helpStapRegel { padding: 10px 11px; border: 1px solid #b9e5ff; border-left: 4px solid var(--tr-blue); background: #f4fbff; color: #12324a; }
.helpHighlight { background: white; border-left: 4px solid var(--tr-blue); padding: 8px 10px; }
.helpKnopRegel { display: flex; align-items: flex-start; gap: 12px; background: white; border: 1px solid #d7efff; border-left: 4px solid var(--tr-blue); padding: 10px 12px; color: #35596d; font-size: 13px; line-height: 1.45; }
.helpKnopTekst { min-width: 0; flex: 1 1 auto; display: block; padding-top: 1px; }
.helpKnopNaam { display: block; margin: 0 0 3px; color: var(--tr-blue-dark); font-size: 13px; font-weight: 900; line-height: 1.15; }
.helpKnopOmschrijving { margin: 0 !important; color: #35596d; font-size: 13px; line-height: 1.45; }
.helpKnopIcoon { flex: 0 0 30px; width: 30px; height: 30px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--tr-blue); background: white; color: var(--tr-blue); font-size: 15px; font-weight: 1000; line-height: 1; }
.helpKnopIcoon.plus { background: var(--tr-blue); color: white; }
.helpKnopIcoon.tip { background: #fff7ed; border-color: #f59e0b; color: #f59e0b; }
.helpKnopIcoon.check { background: #ecfdf5; border-color: #86efac; color: #16a34a; }
.helpKnopIcoon.editor { background: #f4fbff; color: var(--tr-blue-dark); }
.layoutInput { position: relative; z-index: 1; max-width: 1440px; margin: 0 auto; padding: 0 28px 72px 42px; display: grid; grid-template-columns: minmax(330px, 420px) minmax(620px, 1fr); column-gap: 18px; row-gap: 12px; align-items: start; }
.leftPanels { grid-column: 1; display: flex; flex-direction: column; gap: 12px; align-self: start; position: sticky; top: calc(var(--app-header-height) + 22px); max-height: calc(100vh - var(--app-header-height) - 34px); overflow: auto; padding-right: 2px; }
.panel { background: var(--tr-surface); border: 1px solid rgba(185,229,255,.92); border-radius: 6px; padding: 22px; min-height: var(--body-box-min-height); box-shadow: var(--tr-shadow); }
.pastePanel { position: relative; padding-top: 48px; }
.panel.wide { grid-column: 2; grid-row: 1; }
.panel h2 { margin: 0 0 8px; color: var(--tr-text); font-size: 22px; font-weight: 850; letter-spacing: 0; }
.panel p { margin: 0 0 18px; color: var(--tr-muted); line-height: 1.5; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.fieldBlock { margin-bottom: 16px; }
.fieldBlock.bowField { border-left: 3px solid #b9e5ff; padding-left: 12px; }
.fieldLabelRow { display: flex; justify-content: space-between; align-items: center; gap: 10px; min-height: 30px; margin: 0 0 8px; }
.fieldLabelRow .label { margin: 0; line-height: 30px; }
.label { display: block; margin: 0 0 8px; font-weight: 750; font-size: 14px; }
.label span { color: var(--tr-blue); }
.field { width: 100%; border: 1px solid #ccecff; border-radius: 5px; padding: 12px 14px; font-size: 15px; color: var(--tr-text); outline: none; background: white; font-family: inherit; }
.field:focus { border-color: var(--tr-blue); box-shadow: 0 0 0 4px rgba(0,144,242,.14); }
.textarea { resize: vertical; min-height: 88px; line-height: 1.55; }
.tijdEditor { border: 1px solid var(--tr-line); border-radius: 5px; background: white; overflow: hidden; }
.tijdEditorHeader { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 9px 12px; background: var(--tr-blue-pale); border-bottom: 1px solid var(--tr-line); }
.tijdEditorHeader span { color: var(--tr-blue-dark); font-weight: 900; }
.tijdHerstelKnop { width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--tr-blue); background: var(--tr-blue); color: white; cursor: pointer; box-shadow: 0 6px 16px rgba(0,144,242,.16); }
.tijdHerstelKnop:hover { background: var(--tr-blue-dark); border-color: var(--tr-blue-dark); }
.tijdHerstelKnop svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.tijdEditorRoute { display: grid; gap: 0; }
.tijdEditorStap { display: grid; grid-template-columns: 34px 1fr; gap: 9px; padding: 8px 10px; border-bottom: 1px solid #e6f5ff; }
.tijdEditorStap:last-child { border-bottom: 0; }
.tijdEditorNummer { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; background: var(--tr-blue); color: white; font-size: 11px; font-weight: 1000; margin-top: 1px; }
.tijdEditorVelden { display: grid; grid-template-columns: 118px 132px 1fr; gap: 7px; align-items: center; }
.tijdEditorVelden input { min-width: 0; border: 1px solid #d7efff; background: #fff; color: var(--tr-text); padding: 7px 9px; font-family: inherit; font-size: 13px; }
.tijdEditorVelden input:first-child { color: var(--tr-blue-dark); font-weight: 900; }
.tijdEditorVelden small { display: inline-flex; align-items: center; justify-content: center; min-height: 30px; color: var(--tr-blue-dark); background: #e6f5ff; border: 1px solid #d7efff; font-size: 11px; font-weight: 900; padding: 5px 7px; text-align: center; }
input[type="range"] { width: 100%; accent-color: var(--tr-blue); }
.btnRow, .toolbar { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
.pasteActies { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); align-items: stretch; }
.pasteActies .btn { width: 100%; min-height: 44px; padding-inline: 10px; }
.voorbeeldKeuze { position: relative; display: inline-flex; }
.pasteActies .voorbeeldKeuze { width: 100%; }
.voorbeeldMenu { position: absolute; left: 0; right: 0; top: calc(100% + 8px); z-index: 8; width: 100%; min-width: 0; background: white; border: 1px solid var(--tr-line); box-shadow: 0 18px 50px rgba(0,75,122,.18); padding: 6px; }
.voorbeeldMenu strong { display: block; padding: 6px 8px 9px; color: var(--tr-blue-dark); font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: .04em; border-bottom: 1px solid #eef8ff; margin-bottom: 4px; }
.voorbeeldMenu button { display: block; width: 100%; border: 0; background: white; color: var(--tr-text); padding: 9px 8px; text-align: left; font-family: inherit; font-size: 13px; font-weight: 800; cursor: pointer; }
.voorbeeldMenu button:hover, .voorbeeldMenu button:focus-visible { background: var(--tr-blue-pale); color: var(--tr-blue-dark); outline: 0; }
.btn { border: 1px solid transparent; border-radius: 5px; padding: 11px 16px; font-weight: 800; cursor: pointer; box-shadow: 0 8px 20px rgba(0,144,242,.14); font-size: 14px; font-family: inherit; transition: background-color .15s ease, border-color .15s ease, color .15s ease, transform .15s ease; }
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
.btn.primary { background: var(--tr-blue); color: white; }
.btn.secondary { background: white; border-color: var(--tr-line); color: var(--tr-blue-dark); }
.btn:hover { transform: translateY(-1px); }
.triangleIcon { display: inline-block; width: 0; height: 0; flex: 0 0 auto; }
.triangleIcon.right { border-top: 6px solid transparent; border-bottom: 6px solid transparent; border-left: 9px solid currentColor; }
.triangleIcon.left { border-top: 6px solid transparent; border-bottom: 6px solid transparent; border-right: 9px solid currentColor; }
.iconActieKnop { width: 46px; height: 46px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--tr-blue); background: var(--tr-blue); color: white; cursor: pointer; box-shadow: 0 8px 20px rgba(0,144,242,.18); }
.iconActieKnop:hover { background: var(--tr-blue-dark); border-color: var(--tr-blue-dark); }
.iconActieKnop:focus-visible { outline: 0; box-shadow: 0 0 0 4px rgba(0,144,242,.18), 0 8px 20px rgba(0,144,242,.18); }
.iconActieKnop svg { width: 22px; height: 22px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.downloadPaneel { position: relative; z-index: 1; display: grid; grid-template-columns: auto minmax(300px, 1fr) minmax(260px, auto); gap: 12px; align-items: stretch; margin-bottom: 18px; background: var(--tr-surface); border: 1px solid var(--tr-line); border-radius: 6px; padding: 12px; box-shadow: var(--tr-shadow); }
.downloadTerug { display: flex; align-items: center; }
.downloadKeuze { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; padding: 5px; background: var(--tr-blue-pale); border: 1px solid var(--tr-line); border-radius: 5px; }
.downloadKeuze button { border: 1px solid transparent; border-radius: 4px; background: transparent; color: var(--tr-blue-dark); padding: 8px 10px; font-family: inherit; text-align: left; cursor: pointer; }
.downloadKeuze button.active { background: var(--tr-blue); color: white; box-shadow: 0 8px 20px rgba(0,144,242,.16); }
.downloadKeuze strong { display: block; font-size: 13px; font-weight: 900; margin-bottom: 1px; }
.downloadKeuze span { display: block; font-size: 10px; line-height: 1.3; font-weight: 700; opacity: .86; }
.downloadActies { display: grid; grid-template-columns: repeat(3, minmax(88px, 1fr)); gap: 6px; align-items: stretch; }
.downloadActieKnop { min-height: 46px; display: flex; align-items: center; gap: 7px; border: 1px solid var(--tr-blue); border-radius: 5px; background: white; color: var(--tr-blue-dark); padding: 6px 8px; font-family: inherit; cursor: pointer; box-shadow: 0 8px 20px rgba(0,144,242,.12); }
.downloadActieKnop:hover { border-color: var(--tr-blue-dark); background: var(--tr-blue-pale); }
.downloadActieKnop:disabled { cursor: progress; opacity: .72; }
.downloadActieKnop:focus-visible { outline: 0; box-shadow: 0 0 0 4px rgba(0,144,242,.18), 0 8px 20px rgba(0,144,242,.14); }
.downloadActieKnop strong { display: block; font-size: 12px; font-weight: 1000; line-height: 1.1; text-align: left; }
.downloadActieKnop small { display: block; margin-top: 1px; font-size: 9px; line-height: 1.1; font-weight: 800; text-align: left; color: #526b7d; }
.downloadActieIcon { width: 28px; height: 28px; flex: 0 0 28px; display: inline-flex; align-items: center; justify-content: center; background: var(--tr-blue); color: white; }
.downloadActieIcon svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.printControle { grid-column: 2 / -1; display: grid; grid-template-columns: auto 1fr; gap: 8px; align-items: center; padding: 8px 10px; border: 1px solid #c7eaff; background: #f4fbff; color: var(--tr-blue-dark); font-size: 11.5px; line-height: 1.35; }
.printControle strong { font-size: 12px; font-weight: 900; }
.printControle span { color: #526b7d; font-weight: 650; }
.printControle.isWarning { border-color: #fed7aa; background: #fff7ed; color: #9a3412; }
.printControle.isWarning span { color: #9a3412; }
.samenvattingSamenstellen { grid-column: 2 / -1; padding: 10px; border: 1px solid #c7eaff; background: white; }
.samenvattingSamenstellen > strong { display: block; color: var(--tr-blue-dark); font-size: 12px; font-weight: 900; margin-bottom: 2px; }
.samenvattingSamenstellen > span { display: block; color: #526b7d; font-size: 11px; font-weight: 650; line-height: 1.35; margin-bottom: 8px; }
.samenvattingDropdown { position: relative; }
.samenvattingDropdown > button { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 8px; border: 1px solid var(--tr-blue); background: #f4fbff; color: var(--tr-blue-dark); padding: 8px 10px; font-family: inherit; font-size: 12px; font-weight: 900; cursor: pointer; text-align: left; }
.samenvattingDropdown > button:hover, .samenvattingDropdown > button:focus-visible { background: var(--tr-blue); color: white; outline: 2px solid #b9e5ff; outline-offset: 2px; }
.samenvattingDropdown > button b { font-size: 10px; line-height: 1; }
.samenvattingDropdownMenu { position: absolute; left: 0; right: 0; top: calc(100% + 6px); z-index: 12; display: grid; gap: 4px; max-height: 260px; overflow: auto; padding: 6px; border: 1px solid #c7eaff; background: white; box-shadow: 0 18px 50px rgba(0,75,122,.18); }
.samenvattingSamenstellen label { display: flex; align-items: center; gap: 7px; padding: 8px 9px; border: 1px solid #d7efff; background: #f8fcff; color: var(--tr-blue-dark); font-size: 11px; font-weight: 800; cursor: pointer; }
.samenvattingSamenstellen label:hover { background: var(--tr-blue-pale); border-color: #b9e5ff; }
.samenvattingSamenstellen input { accent-color: var(--tr-blue); }
.message { margin-top: 14px; padding: 12px 14px; background: var(--tr-blue-soft); border: 1px solid var(--tr-line); color: var(--tr-blue-dark); font-weight: 800; line-height: 1.5; }
.pasteMelding { margin-top: 9px; padding: 7px 9px; font-size: 11.5px; font-weight: 700; line-height: 1.35; text-align: center; background: #f4fbff; color: #526b7d; }
.privacyWarning { position: absolute; top: 12px; right: 12px; display: inline-flex; align-items: center; justify-content: center; padding: 6px 10px; border: 1px solid var(--tr-blue); background: var(--tr-blue); color: white; font-family: inherit; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: .05em; cursor: pointer; box-shadow: 0 6px 16px rgba(0,144,242,.14); }
.privacyWarning:hover { background: var(--tr-blue-dark); border-color: var(--tr-blue-dark); }
.privacyWarning:focus-visible { outline: 0; box-shadow: 0 0 0 4px rgba(0,144,242,.18), 0 6px 16px rgba(0,144,242,.14); }
.profile { background: linear-gradient(180deg, #f4fbff 0%, #eaf7ff 100%); border: 1px solid var(--tr-line); border-radius: 6px; padding: 16px; margin: 16px 0; }
.profile strong { display: block; color: var(--tr-blue-dark); margin-bottom: 4px; }
.profileChecks { display: grid; gap: 8px; padding: 12px; border: 1px solid var(--tr-line); border-radius: 5px; background: var(--tr-blue-pale); }
.profileChecks span { display: block; color: var(--tr-blue-dark); font-size: 13px; font-weight: 900; }
.profileChecks label { display: flex; gap: 8px; align-items: center; font-size: 13px; font-weight: 700; color: var(--tr-text); }
.profileChecks input { accent-color: var(--tr-blue); }
.savedLessonsPanel { padding: 18px; }
.savedLessonsHeader { display: grid; grid-template-columns: 1fr auto; gap: 12px; align-items: start; margin-bottom: 12px; }
.savedLessonsHeader h2 { margin-bottom: 4px; font-size: 20px; }
.savedLessonsHeader p { margin: 0; font-size: 12.5px; line-height: 1.4; }
.savedLessonsHeader .btn { min-height: 40px; padding: 10px 12px; white-space: nowrap; }
.savedLessonFilters { display: grid; grid-template-columns: 1fr 132px 132px; gap: 7px; margin-bottom: 10px; }
.savedLessonFilters .field { min-width: 0; padding: 9px 10px; font-size: 12.5px; }
.savedLessonList { display: grid; gap: 7px; max-height: 300px; overflow: auto; padding-right: 2px; }
.savedLessonItem { display: grid; grid-template-columns: 1fr auto; gap: 10px; align-items: center; border: 1px solid #d7efff; border-radius: 5px; background: #fbfdff; padding: 10px; }
.savedLessonItem.active { border-color: var(--tr-blue); background: #f4fbff; box-shadow: inset 3px 0 0 var(--tr-blue); }
.savedLessonItem strong { display: block; color: var(--tr-text); font-size: 13px; line-height: 1.25; margin-bottom: 3px; }
.savedLessonItem span, .savedLessonItem small { display: block; color: #526b7d; font-size: 11px; line-height: 1.35; font-weight: 650; }
.savedLessonActions { display: flex; gap: 5px; align-items: center; }
.savedLessonActions button { width: 30px; height: 30px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--tr-line); background: white; color: var(--tr-blue-dark); padding: 0; font-family: inherit; cursor: pointer; }
.savedLessonActions svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.savedLessonActions button:hover { background: var(--tr-blue); border-color: var(--tr-blue); color: white; }
.savedLessonActions button.danger { color: #b91c1c; border-color: #fecaca; }
.savedLessonActions button.danger:hover { background: #dc2626; border-color: #dc2626; color: white; }
.savedLessonEmpty { border: 1px dashed var(--tr-line); background: #f8fcff; padding: 12px; }
.savedLessonEmpty strong, .savedLessonEmpty span { display: block; }
.savedLessonEmpty strong { color: var(--tr-blue-dark); font-size: 13px; }
.savedLessonEmpty span { color: #526b7d; font-size: 12px; margin-top: 3px; }
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 18px; }
.stats div { background: linear-gradient(180deg, #ffffff 0%, #f4fbff 100%); border: 1px solid #d7efff; border-radius: 6px; padding: 18px; box-shadow: 0 10px 28px rgba(8,58,89,.06); }
.stats strong { display: block; font-size: 28px; color: var(--tr-blue); }
.stats span { display: block; color: #61798a; font-weight: 800; font-size: 13px; margin-top: 4px; }
.bowScoreKaart { margin: 0 0 14px; padding: 14px; border: 1px solid var(--tr-line); border-radius: 6px; background: white; box-shadow: 0 14px 38px rgba(8,58,89,.10); }
.bowScoreKaart.concept { border-left: 4px solid #dc2626; border-right: 4px solid #dc2626; }
.bowScoreKaart.bijna { border-left: 4px solid #f59e0b; border-right: 4px solid #f59e0b; }
.bowScoreKaart.klaar { border-left: 4px solid #16a34a; border-right: 4px solid #16a34a; }
.bowScoreKop { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 10px; }
.bowScoreKop > div { display: grid; grid-template-columns: auto 1fr; column-gap: 8px; row-gap: 2px; align-items: center; min-width: 0; }
.bowMiniLogo { display: inline-flex; align-items: center; justify-content: center; min-width: 36px; height: 20px; padding: 0 7px; background: #eef8ff; border: 1px solid #ccecff; color: #5f9fc4; font-size: 9px; font-weight: 900; letter-spacing: .02em; }
.bowScoreKop strong { color: var(--tr-text); font-size: 18px; font-weight: 900; line-height: 1.1; }
.bowScoreKop small { grid-column: 2; color: #61798a; font-size: 11px; font-weight: 700; line-height: 1.3; }
.bowScoreKop b { color: var(--tr-blue); font-size: 26px; line-height: 1; }
.bowVoortgang { height: 8px; background: #e6f5ff; border: 1px solid #ccecff; overflow: hidden; margin-bottom: 11px; }
.bowVoortgang span { display: block; height: 100%; background: linear-gradient(90deg, var(--tr-blue), #47b8ff); transition: width .2s ease; }
.bowScoreKaart.concept .bowScoreKop b { color: #dc2626; }
.bowScoreKaart.bijna .bowScoreKop b { color: #f59e0b; }
.bowScoreKaart.klaar .bowScoreKop b { color: #16a34a; }
.bowScoreKaart.concept .bowVoortgang span { background: #dc2626; }
.bowScoreKaart.bijna .bowVoortgang span { background: #f59e0b; }
.bowScoreKaart.klaar .bowVoortgang span { background: #16a34a; }
.bowScoreDelen { display: grid; gap: 7px; margin-bottom: 10px; }
.bowScoreDeel { border: 1px solid #e2f3ff; border-radius: 5px; background: #f8fcff; overflow: hidden; }
.bowScoreDeel > button { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 10px; border: 0; background: transparent; padding: 9px 10px; color: var(--tr-text); font-family: inherit; cursor: pointer; text-align: left; }
.bowScoreDeel > button strong { display: block; color: var(--tr-blue-dark); font-size: 13px; font-weight: 900; line-height: 1.2; }
.bowScoreDeel > button small { display: block; margin-top: 2px; color: #61798a; font-size: 11px; font-weight: 600; line-height: 1.3; }
.bowScoreDeel > button em { flex: 0 0 auto; min-width: 46px; padding: 5px 7px; background: #e6f5ff; border: 1px solid #ccecff; color: var(--tr-blue-dark); font-style: normal; font-size: 11px; font-weight: 900; text-align: center; }
.bowChecklist { display: flex; flex-wrap: wrap; gap: 6px; padding: 0 10px 10px; }
.bowChecklist span { display: inline-flex; align-items: center; gap: 4px; padding: 5px 7px; border: 1px solid #e2f3ff; background: #f8fcff; color: #526b7d; font-size: 11px; font-weight: 750; line-height: 1; }
.bowChecklist span.ok { color: #166534; background: #f0fdf4; border-color: #bbf7d0; }
.bowChecklist span.mist { color: #9a3412; background: #fff7ed; border-color: #fed7aa; }
.weergavePaneel { display: grid; grid-template-columns: minmax(220px, 1fr) minmax(390px, 470px); gap: 16px; align-items: center; margin: 0 0 14px; padding: 14px 16px; border: 1px solid var(--tr-line); border-radius: 6px; background: white; box-shadow: 0 10px 30px rgba(8,58,89,.06); }
.weergavePaneel strong { display: block; color: var(--tr-blue-dark); font-size: 15px; font-weight: 900; margin-bottom: 2px; }
.weergavePaneel span { display: block; color: #526b7d; font-size: 12px; line-height: 1.4; font-weight: 600; }
.weergavePaneel small { display: block; margin-top: 3px; color: #7b92a1; font-size: 11px; line-height: 1.3; font-weight: 600; }
.weergaveKnoppen { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); align-self: stretch; background: #f8fcff; border: 1px solid var(--tr-line); border-radius: 5px; overflow: hidden; }
.weergaveKnoppen button { min-width: 0; min-height: 42px; border: 0; border-right: 1px solid var(--tr-line); background: transparent; color: var(--tr-blue-dark); padding: 9px 10px; font-family: inherit; font-size: 12px; font-weight: 900; cursor: pointer; white-space: nowrap; transition: background-color .15s ease, color .15s ease; }
.weergaveKnoppen button:last-child { border-right: 0; }
.weergaveKnoppen button:hover { background: var(--tr-blue-pale); }
.weergaveKnoppen button.active { background: var(--tr-blue); color: white; }
.weergaveKnoppen button.active:hover { background: var(--tr-blue-dark); }
.weergaveKnoppen button:focus-visible { outline: 0; box-shadow: inset 0 0 0 2px rgba(0,111,189,.28); }
.accordion { border: 1px solid #d7efff; border-radius: 6px; margin-bottom: 12px; background: white; overflow: hidden; box-shadow: 0 10px 28px rgba(8,58,89,.05); }
.accordion > button { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 14px; padding: 15px 18px; border: 0; background: linear-gradient(180deg, #ffffff 0%, var(--tr-blue-pale) 100%); cursor: pointer; color: var(--tr-text); text-align: left; font-family: inherit; }
.accordion > button:hover { background: linear-gradient(180deg, #ffffff 0%, #eaf7ff 100%); }
.accordion > button span { min-width: 0; }
.accordion > button strong { display: block; color: var(--tr-text); font-size: 17px; font-weight: 850; line-height: 1.2; letter-spacing: 0; }
.bowGroepBadge { display: inline-flex; align-items: center; margin-left: 8px; padding: 0; background: transparent; border: 0; font-style: normal; line-height: 1; vertical-align: middle; }
.bowGroepBadge span { display: inline-flex; align-items: center; justify-content: center; min-width: 36px; height: 20px; padding: 0 7px; background: #eef8ff; border: 1px solid #ccecff; color: #5f9fc4; font-size: 9px; font-weight: 900; letter-spacing: .02em; }
.accordion small { display: block; color: #526b7d; font-size: 12.5px; font-weight: 500; margin-top: 5px; line-height: 1.4; letter-spacing: 0; }
.accordion em { flex: 0 0 auto; min-width: 48px; text-align: center; font-style: normal; color: var(--tr-blue-dark); background: #dff4ff; border: 1px solid #b9e5ff; padding: 6px 9px; font-size: 12px; font-weight: 900; line-height: 1; }
.accordionBody { padding: 18px; }
.veldActies { position: relative; display: flex; align-items: center; gap: 6px; height: 30px; }
.veldActies > button { width: 30px; height: 30px; border: 1px solid var(--tr-line); background: white; color: var(--tr-blue-dark); font-weight: 1000; cursor: pointer; }
.bowActieBadge { position: relative; display: inline-flex; align-items: center; justify-content: center; min-width: 54px; height: 24px; color: #5f9fc4; line-height: 1; }
.bowAuditText { display: inline-flex; align-items: center; height: 18px; padding: 0 6px; background: #eef8ff; border: 1px solid #ccecff; color: #5f9fc4; font-size: 9px; font-weight: 800; letter-spacing: 0; }
.bowActieBadge:hover::after, .bowActieBadge:focus-visible::after { content: "Onderdeel van BOW audit"; position: absolute; right: 0; top: calc(100% + 7px); z-index: 9; min-width: 150px; padding: 7px 9px; background: white; border: 1px solid var(--tr-line); box-shadow: 0 12px 30px rgba(0,75,122,.18); color: var(--tr-blue-dark); font-size: 11px; font-weight: 800; line-height: 1.2; text-align: center; }
.veldActies > button.plusSuggestieKnop { background: var(--tr-blue); border-color: var(--tr-blue); color: white; }
.veldActies > button.uitlegKnop { background: white; color: var(--tr-blue); border-color: var(--tr-blue); }
.veldActies > button.tipKnop { background: #fff7ed; color: #f59e0b; border-color: #f59e0b; display: inline-flex; align-items: center; justify-content: center; padding: 0; }
.veldActies > button.plusSuggestieKnop:hover, .veldActies > button.plusSuggestieKnop:focus-visible { background: var(--tr-blue-dark); border-color: var(--tr-blue); color: white; outline: 0; }
.veldActies > button.uitlegKnop:hover, .veldActies > button.uitlegKnop:focus-visible { background: var(--tr-blue); color: white; border-color: var(--tr-blue); outline: 0; }
.veldActies > button.tipKnop:hover, .veldActies > button.tipKnop:focus-visible { background: #f59e0b; color: white; border-color: #f59e0b; outline: 0; }
.veldActies > button.verbeterKnop { background: #ecfdf5; color: #16a34a; border-color: #86efac; box-shadow: inset 0 0 0 1px rgba(22,163,74,.08); }
.veldActies > button.verbeterKnop:hover, .veldActies > button.verbeterKnop:focus-visible { background: #16a34a; color: white; border-color: #86efac; outline: 0; }
.lightbulbIcon { width: 18px; height: 18px; display: block; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.uitlegMenu { position: absolute; right: 36px; top: 36px; z-index: 6; width: min(360px, 78vw); background: white; border: 1px solid var(--tr-line); box-shadow: 0 18px 50px rgba(0,75,122,.20); padding: 12px; }
.tipMenu { position: absolute; right: 0; top: 36px; z-index: 7; width: min(390px, 78vw); background: white; border: 1px solid var(--tr-line); box-shadow: 0 18px 50px rgba(0,75,122,.20); padding: 12px; }
.verbeterMenu { position: absolute; right: 0; top: 36px; z-index: 8; width: min(460px, 82vw); background: white; border: 1px solid var(--tr-line); box-shadow: 0 18px 50px rgba(0,75,122,.20); padding: 10px; }
.uitlegMenu strong, .tipMenu strong, .suggesties strong, .verbeterMenu strong { display: block; color: var(--tr-blue-dark); font-size: 13px; text-transform: uppercase; letter-spacing: .04em; padding: 4px 6px 10px; border-bottom: 1px solid #eef8ff; margin-bottom: 8px; }
.uitlegMenu p { margin: 0; color: var(--tr-text); font-size: 13px; line-height: 1.5; }
.tipMenu p { margin: 0 0 8px; color: var(--tr-text); font-size: 13px; line-height: 1.5; }
.tipMenu p:last-child { margin-bottom: 0; }
.suggesties { position: absolute; right: 0; top: 36px; z-index: 5; width: min(440px, 78vw); background: white; border: 1px solid var(--tr-line); box-shadow: 0 18px 50px rgba(0,75,122,.20); padding: 10px; }
.suggesties button { display: block; width: 100%; border: 0; border-bottom: 1px solid #eef8ff; background: white; padding: 10px; text-align: left; cursor: pointer; line-height: 1.45; color: var(--tr-text); }
.verbeterMenu p { margin: 0 0 8px; padding: 8px 9px; background: #fff7ed; border: 1px solid #fed7aa; color: #9a3412; font-size: 12px; font-weight: 800; line-height: 1.35; }
.verbeterContextInfo { margin: 0 0 8px; padding: 8px 9px; border: 1px solid #c7eaff; background: #f4fbff; }
.verbeterContextInfo b { display: block; color: var(--tr-blue-dark); font-size: 12px; font-weight: 900; margin-bottom: 3px; }
.verbeterContextInfo small { display: block; color: #526b7d; font-size: 11.5px; font-weight: 650; line-height: 1.35; }
.verbeterHerstelKnop { width: 100%; margin-top: 8px; border: 1px solid #b9e5ff; background: white; color: var(--tr-blue-dark); padding: 7px 8px; font-family: inherit; font-size: 12px; font-weight: 900; text-align: center; cursor: pointer; }
.verbeterHerstelKnop:hover, .verbeterHerstelKnop:focus-visible { background: var(--tr-blue); color: white; border-color: var(--tr-blue); outline: 2px solid #b9e5ff; outline-offset: 2px; }
.verbeterContextSelect { display: grid; grid-template-columns: 1fr; gap: 4px; margin-top: 8px; }
.verbeterContextSelect span { color: var(--tr-blue-dark); font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: .03em; }
.verbeterContextSelect select { width: 100%; border: 1px solid #b9e5ff; background: white; color: var(--tr-blue-dark); padding: 7px 8px; font-family: inherit; font-size: 12px; font-weight: 800; }
.verbeterContextSelect select:focus { outline: 2px solid #b9e5ff; outline-offset: 2px; border-color: var(--tr-blue); }
.verbeterTaalsteun { display: grid; gap: 3px; margin-top: 7px; padding-top: 7px; border-top: 1px solid #d7efff; }
.verbeterTaalsteun span { display: block; color: #35596d; font-size: 11.5px; line-height: 1.35; font-weight: 700; }
.verbeterMenu button { display: block; width: 100%; border: 0; border-bottom: 1px solid #eef8ff; background: white; padding: 10px; text-align: left; cursor: pointer; color: var(--tr-text); }
.verbeterMenu button:hover { background: var(--tr-blue-pale); }
.verbeterMenu .verbeterHerstelKnop:hover, .verbeterMenu .verbeterHerstelKnop:focus-visible { background: var(--tr-blue-dark); color: white; border-color: var(--tr-blue-dark); }
.verbeterMenu button span { display: block; color: var(--tr-blue-dark); font-size: 12px; font-weight: 900; margin-bottom: 4px; }
.verbeterMenu button small { display: block; color: #526b7d; font-size: 12px; line-height: 1.4; font-weight: 600; }
.testMelding { position: fixed; left: 24px; bottom: 24px; z-index: 20; background: #fff7ed; border: 1px solid #fed7aa; color: #9a3412; padding: 10px 12px; font-weight: 800; }
.result, .download { position: relative; z-index: 1; max-width: 1280px; margin: 0 auto; padding: 0 28px 72px 42px; }
.toolbar { justify-content: flex-end; min-height: var(--body-box-min-height); margin-bottom: 22px; background: var(--tr-surface); border: 1px solid var(--tr-line); border-radius: 6px; padding: 16px; box-shadow: var(--tr-shadow); }
.resultaatToolbar { justify-content: space-between; }
.canvasHint { max-width: 900px; margin: -8px auto 14px; display: grid; grid-template-columns: auto 1fr; gap: 10px; align-items: center; padding: 11px 14px; border: 1px solid var(--tr-line); border-radius: 6px; background: white; box-shadow: 0 12px 34px rgba(8,58,89,.08); }
.canvasHint strong { color: var(--tr-blue); font-size: 13px; font-weight: 1000; text-transform: uppercase; letter-spacing: .04em; }
.canvasHint span { color: #526b7d; font-size: 12px; font-weight: 650; line-height: 1.4; }
.lessonDoc { position: relative; max-width: 900px; margin: 0 auto; background: white; border: 1px solid var(--tr-line); border-radius: 6px; box-shadow: 0 28px 90px rgba(8,58,89,.18); overflow: visible; }
.cover { background: linear-gradient(135deg, #0090f2 0%, #0077ca 70%, #005c9d 100%); color: white; padding: 42px 50px; position: relative; overflow: visible; }
.cover img { width: 150px; background: white; padding: 8px 10px; margin-bottom: 18px; position: relative; z-index: 1; }
.headerTriangle { position: absolute; right: 0; top: 0; width: 0; height: 0; border-top: 126px solid transparent; border-bottom: 126px solid transparent; border-left: 188px solid rgba(255,255,255,.13); transform: translate(22px, -16px); pointer-events: none; }
.cover .canvasTitle { width: 100%; border: 0; outline: 0; background: rgba(255,255,255,.08); color: white; font-size: 42px; font-weight: 1000; line-height: 1.12; position: relative; z-index: 1; padding: 8px 0; resize: none; overflow: hidden; white-space: pre-wrap; overflow-wrap: anywhere; }
.lessonSection { position: relative; margin: 28px 42px; padding: 24px 26px 24px 78px; border: 1px solid #d7efff; background: linear-gradient(180deg, white 0%, #f7fcff 100%); }
.canvasSectionRail { position: absolute; left: 24px; top: 24px; display: grid; gap: 6px; justify-items: start; }
.canvasSectionRail > span { width: 36px; height: 36px; background: var(--tr-blue); color: white; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 1000; }
.canvasEditorToolbar { display: inline-flex; align-items: center; gap: 3px; width: fit-content; margin: 0 0 8px; padding: 3px; border: 1px solid #d7efff; background: #f8fcff; color: var(--tr-blue-dark); position: relative; z-index: 2; }
.cover .canvasEditorToolbar { background: rgba(255,255,255,.95); border-color: rgba(255,255,255,.7); color: var(--tr-blue-dark); }
.canvasEditorToolbar span { display: inline-flex; align-items: center; width: auto; height: 22px; padding: 0 6px; background: transparent; color: #5f7890; font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: .03em; }
.canvasEditorToolbar button { width: 24px; height: 22px; border: 0; background: white; color: var(--tr-blue-dark); font-family: inherit; font-size: 12px; font-weight: 1000; cursor: pointer; }
.canvasEditorToolbar button:hover, .canvasEditorToolbar button:focus-visible { background: var(--tr-blue); color: white; outline: 0; }
.canvasEditorToolbar button:disabled { opacity: .45; cursor: default; }
.canvasEditorToolbar button:nth-of-type(2) { font-style: italic; }
.canvasFloatingToolbar { position: absolute; top: 12px; right: 12px; z-index: 5; margin: 0; box-shadow: 0 12px 28px rgba(0,75,122,.16); }
.canvasSectionToolbar { position: absolute; top: 10px; right: 10px; z-index: 4; margin: 0; box-shadow: 0 10px 24px rgba(0,75,122,.12); }
.sectionTitle { width: 100%; margin: 0 0 12px; border: 0; background: transparent; color: var(--tr-blue-dark); font-size: 21px; font-weight: 900; outline: none; font-family: inherit; line-height: 1.25; resize: none; overflow: hidden; white-space: pre-wrap; overflow-wrap: anywhere; }
.canvasTextarea { width: 100%; min-height: 120px; resize: none; border: 0; padding: 0; background: transparent; color: var(--tr-text); font-size: 15px; line-height: 1.75; outline: none; font-family: inherit; white-space: pre-wrap; overflow: hidden; overflow-wrap: anywhere; }
.timeline { display: grid; gap: 12px; }
.timelineCard { position: relative; display: grid; grid-template-columns: 124px 1fr; gap: 14px; align-items: stretch; background: white; border: 1px solid var(--tr-line); padding: 12px; }
.timelineRail { display: grid; align-content: start; justify-items: start; gap: 6px; }
.timelineIndex { width: 44px; min-height: 100%; background: var(--tr-blue); color: white; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 1000; }
.timelineMain { display: grid; gap: 8px; }
.timelineTop { display: grid; grid-template-columns: 150px 1fr; gap: 10px; align-items: center; }
.timelineTop input { width: 100%; border: 1px solid var(--tr-line); color: var(--tr-blue-dark); font-weight: 900; padding: 9px 10px; font-family: inherit; }
.timelineTop strong { color: var(--tr-blue-dark); font-size: 14px; }
.timeline .canvasEditorToolbar { margin: 0; }
.timeline .canvasTextarea { background: var(--tr-blue-pale); border: 1px solid #d7efff; padding: 10px; min-height: 58px; font-size: 14px; line-height: 1.5; }
.timeline small { color: #61798a; font-size: 12px; line-height: 1.45; }
.download iframe { width: 100%; min-height: 1200px; border: 1px solid var(--tr-line); border-radius: 6px; background: white; box-shadow: 0 24px 80px rgba(0,75,122,.14); }
@media (max-width: 1050px) {
  :root { --app-header-height: 136px; }
  .appRoot { padding-top: calc(var(--app-header-height) + 10px); }
  .appRoot::before, .appRoot::after { display: none; }
  .appHeader { grid-template-columns: 1fr auto; gap: 10px; padding: 12px 16px; align-content: center; }
  .brand { justify-self: center; }
  .brand img { width: 128px; }
  .appHeader nav { grid-column: 1 / -1; grid-row: 2; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; justify-self: stretch; }
  .appHeader nav button { width: 100%; height: 48px; padding: 0 8px; font-size: 13px; }
  .appHeader nav span { width: 22px; height: 22px; margin-right: 5px; }
  .headerActies { grid-column: 2; grid-row: 1; }
  .infoMenuKnop { width: 78px; height: 42px; font-size: 13px; }
  .helpModalBody { grid-template-columns: 1fr; }
  .layoutInput { grid-template-columns: 1fr; padding-inline: 16px; }
  .leftPanels { position: static; max-height: none; overflow: visible; padding-right: 0; }
  .leftPanels, .panel.wide { grid-column: auto; grid-row: auto; }
  .result, .download { padding-inline: 16px; }
  .downloadPaneel { grid-template-columns: 1fr; }
  .downloadTerug { justify-content: flex-start; }
  .downloadActies { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .printControle { grid-column: 1; }
  .samenvattingSamenstellen { grid-column: 1; }
}
@media (max-width: 650px) {
  :root { --app-header-height: 112px; --body-box-min-height: 0; }
  .appRoot { padding-top: calc(var(--app-header-height) + 8px); }
  .appHeader { padding: 10px 12px; }
  .brand img { width: 112px; }
  .infoMenuKnop { width: 68px; height: 36px; font-size: 12px; }
  .infoMenuKnop svg { width: 16px; height: 16px; }
  .infoMenu { min-width: 155px; }
  .appHeader nav button { height: 40px; font-size: 12px; }
  .appHeader nav span { display: none; }
  .layoutInput, .result, .download { padding-inline: 10px; padding-bottom: 36px; }
  .panel { padding: 16px; box-shadow: 0 14px 34px rgba(0,75,122,.15); }
  .panel h2 { font-size: 20px; }
  .pastePanel { padding-top: 58px; }
  .privacyWarning { left: auto; right: 12px; }
  .grid2, .stats, .timelineCard, .timelineTop { grid-template-columns: 1fr; }
  .savedLessonsHeader, .savedLessonItem, .savedLessonFilters { grid-template-columns: 1fr; }
  .savedLessonActions { align-items: center; justify-content: flex-start; }
  .savedLessonActions button { flex: 0 0 30px; }
  .stats { gap: 8px; }
  .stats div { padding: 12px; }
  .stats strong { font-size: 23px; }
  .bowScoreKaart { padding: 11px; }
  .bowScoreKop { align-items: stretch; }
  .bowScoreKop strong { font-size: 16px; }
  .bowScoreKop b { font-size: 22px; }
  .bowChecklist { max-height: 116px; overflow: auto; }
  .bowScoreDeel > button { align-items: flex-start; }
  .weergavePaneel { grid-template-columns: 1fr; padding: 10px; }
  .weergaveKnoppen { grid-template-columns: 1fr; }
  .weergaveKnoppen button { width: 100%; }
  .accordion > button { padding: 13px 14px; align-items: flex-start; }
  .accordion > button strong { font-size: 16px; }
  .accordion small { font-size: 12px; }
  .accordion em { white-space: nowrap; }
  .accordionBody { padding: 14px; }
  .fieldLabelRow { align-items: flex-start; }
  .tijdEditorHeader { align-items: stretch; flex-direction: column; }
  .tijdHerstelKnop { width: 100%; }
  .tijdEditorStap { grid-template-columns: 1fr; gap: 8px; }
  .tijdEditorNummer { width: 100%; height: 28px; }
  .tijdEditorVelden { grid-template-columns: 1fr; }
  .veldActies { flex-shrink: 0; }
  .uitlegMenu, .tipMenu, .suggesties, .verbeterMenu { right: 0; width: min(330px, 88vw); }
  .toolbar { justify-content: stretch; padding: 10px; gap: 8px; }
  .toolbar .btn { flex: 1 1 145px; min-height: 42px; padding: 10px 12px; }
  .toolbar .iconActieKnop { flex: 1 1 52px; height: 44px; }
  .downloadPaneel { padding: 8px; gap: 8px; }
  .downloadKeuze { grid-template-columns: 1fr; }
  .downloadActies { grid-template-columns: 1fr; }
  .downloadActieKnop { min-height: 44px; }
  .printControle { grid-template-columns: 1fr; }
  .samenvattingDropdownMenu { position: static; margin-top: 6px; box-shadow: none; }
  .lessonDoc { max-width: none; }
  .cover { padding: 28px 22px; }
  .cover img { width: 118px; margin-bottom: 14px; }
  .cover .canvasTitle { font-size: 28px; }
  .lessonSection { margin: 14px 10px; padding: 18px 16px 18px 58px; }
  .canvasSectionRail { left: 14px; top: 18px; }
  .canvasSectionRail > span { width: 30px; height: 30px; font-size: 11px; }
  .canvasSectionRail .canvasEditorToolbar span, .timelineRail .canvasEditorToolbar span { display: none; }
  .canvasSectionRail .canvasEditorToolbar button, .timelineRail .canvasEditorToolbar button { width: 22px; }
  .sectionTitle { font-size: 18px; }
  .canvasTextarea { font-size: 14px; line-height: 1.6; }
  .timelineIndex { width: 34px; height: 32px; min-height: 32px; }
  .timelineCard { grid-template-columns: 1fr; padding: 10px; gap: 8px; }
  .timelineRail { grid-template-columns: auto 1fr; align-items: center; }
  .timelineTop input { padding: 8px; }
  .download iframe { min-height: 70vh; box-shadow: 0 14px 34px rgba(0,75,122,.15); }
  .helpOverlay { padding: 10px; align-items: start; }
  .helpModal { max-height: calc(100vh - 20px); }
  .helpModalHeader { padding: 16px; }
  .helpModalHeader h2 { font-size: 22px; }
  .helpModalHeader button { padding: 9px 11px; }
  .helpModalBody { padding: 14px; gap: 10px; }
  .helpSectie { padding: 13px; }
}
@media (max-width: 420px) {
  .appHeader nav { gap: 6px; }
  .appHeader nav button { font-size: 11px; padding: 0 4px; }
  .btn { width: 100%; }
  .pasteActies { grid-template-columns: 1fr; }
  .voorbeeldKeuze { width: 100%; }
  .voorbeeldMenu { width: 100%; }
  .profileChecks { padding: 10px; }
  .suggesties button { padding: 9px 8px; font-size: 13px; }
}
@media print { .appHeader, .toolbar, .downloadPaneel { display: none !important; } .appRoot, .result, .download { padding: 0 !important; background: white !important; } .download iframe { display: none; } .lessonDoc { box-shadow: none; border: 0; max-width: none; } }
`;

const printCss = `
body { margin: 0; background: #f4fbff; color: #12324a; font-family: Arial, sans-serif; }
article { max-width: 860px; margin: 24px auto; background: white; border: 1px solid #b9e5ff; padding: 36px; }
header { border: 1px solid #b9e5ff; border-bottom: 5px solid #0090f2; padding: 28px; margin-bottom: 24px; }
header img { width: 150px; display: block; margin-bottom: 18px; }
h1 { color: #0090f2; font-size: 34px; line-height: 1.08; margin: 14px 0 0; }
section { position: relative; border: 1px solid #d7efff; background: #f8fcff; margin: 18px 0; padding: 20px 22px 20px 70px; break-inside: avoid; }
section span { position: absolute; left: 20px; top: 20px; width: 34px; height: 34px; background: #0090f2; color: white; display: flex; align-items: center; justify-content: center; font-weight: 1000; }
h2 { color: #006fbd; margin: 0 0 10px; font-size: 20px; }
p { margin: 0 0 8px; line-height: 1.6; white-space: pre-wrap; }
strong { font-weight: 800; }
em { font-style: italic; }
ul { margin: 0 0 8px 18px; padding: 0; line-height: 1.6; }
li { margin: 0 0 4px; }
table { width: 100%; border-collapse: collapse; }
td { border: 1px solid #b9e5ff; padding: 10px; vertical-align: top; }
td:first-child { width: 150px; color: #006fbd; font-weight: 900; }
.printRoute { display: grid; gap: 10px; }
.routeStep { display: grid; grid-template-columns: 118px 34px 1fr; gap: 10px; align-items: stretch; break-inside: avoid; }
.routeTime { border: 1px solid #b9e5ff; background: white; color: #006fbd; font-weight: 900; padding: 10px; font-size: 12px; }
.routeDot { background: #0090f2; color: white; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 1000; }
.routeContent { border: 1px solid #d7efff; background: white; padding: 10px 12px; }
.routeContent b { display: block; color: #006fbd; margin-bottom: 4px; }
.routeContent p { margin: 0 0 4px; }
.routeContent small { color: #61798a; line-height: 1.45; }
@media print { body { background: white; } article { margin: 0; border: 0; max-width: none; } }
`;

const samenvattingCss = `
@page { size: A4; margin: 0; }
* { box-sizing: border-box; }
body { margin: 0; background: #eef8ff; color: #102f45; font-family: "Poppins", Arial, sans-serif; }
main { width: 210mm; margin: 0 auto; background: white; }
.page { position: relative; width: 210mm; min-height: 297mm; padding: 16mm 18mm 25mm; overflow: visible; break-after: page; page-break-after: always; background: linear-gradient(180deg, #ffffff 0%, #f4fbff 100%); }
.page:last-child { break-after: auto; page-break-after: auto; }
.page::before { content: ""; position: absolute; inset: 0 auto auto 0; width: 100%; height: 8mm; background: #0090f2; }
header { display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 1; margin-bottom: 11mm; }
header img { width: 43mm; height: auto; }
header span { color: #006fbd; font-size: 9pt; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; }
.hero { width: 76%; margin-bottom: 8mm; }
.kicker { color: #0090f2; font-size: 10pt; font-weight: 900; text-transform: uppercase; letter-spacing: .08em; margin: 0 0 4mm; }
h1 { color: #083a59; font-size: 25pt; line-height: 1.05; margin: 0 0 4mm; letter-spacing: 0; }
.hero p:not(.kicker) { color: #35596d; font-size: 10pt; line-height: 1.45; margin: 0; }
.metaGrid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3mm; margin: 0 0 5mm; }
.metaGrid div, .summaryCard, .program, .bowBlock, .auditLine { background: white; border: 1px solid #c7eaff; box-shadow: 0 5mm 18mm rgba(0, 93, 157, .08); }
.metaGrid div { padding: 3.3mm; min-height: 16mm; }
.metaGrid b { display: block; color: #0090f2; font-size: 8pt; text-transform: uppercase; margin-bottom: 2mm; }
.metaGrid span { display: block; color: #12324a; font-size: 8.5pt; line-height: 1.3; font-weight: 700; }
.twoCol, .contentGrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 5mm; }
.summaryCard { padding: 4.5mm; min-height: 27mm; }
h2 { color: #006fbd; font-size: 12pt; line-height: 1.2; margin: 0 0 3mm; }
p { color: #35596d; font-size: 8.8pt; line-height: 1.45; margin: 0; }
.cardText p { margin: 0 0 1.2mm; }
.cardText p:last-child { margin-bottom: 0; }
.cardText strong { font-weight: 900; color: inherit; }
.cardText em { font-style: italic; }
.cardText ul { margin: 0 0 1.2mm 3.8mm; padding: 0; color: #35596d; }
.cardText li { margin: 0 0 .8mm; line-height: 1.25; }
.detailPage header { margin-bottom: 7mm; }
.contentGrid { margin-bottom: 6mm; }
.contentGrid .summaryCard { min-height: 33mm; }
.program { padding: 4.5mm; margin-bottom: 5mm; }
.firstProgram { margin: 0 0 5mm; padding: 4.2mm; }
table { width: 100%; border-collapse: collapse; font-size: 8.6pt; }
td { border-top: 1px solid #d8f1ff; padding: 2.4mm 2mm; vertical-align: top; line-height: 1.35; }
td:first-child { width: 29mm; color: #006fbd; font-weight: 900; }
.printRoute, .miniRoute { display: grid; gap: 2.4mm; }
.routeStep { display: grid; grid-template-columns: 25mm 7mm 1fr; gap: 2.5mm; align-items: stretch; break-inside: avoid; }
.routeTime { border: 1px solid #c7eaff; background: #f4fbff; color: #006fbd; font-size: 8pt; font-weight: 900; padding: 2.2mm; line-height: 1.25; }
.routeDot { background: #0090f2; color: white; display: flex; align-items: center; justify-content: center; font-size: 7pt; font-weight: 1000; }
.routeContent { border: 1px solid #d8f1ff; background: white; padding: 2.4mm 3mm; }
.routeContent b { display: block; color: #006fbd; font-size: 8.7pt; margin-bottom: 1mm; }
.routeContent p { margin: 0; color: #35596d; font-size: 8.2pt; line-height: 1.32; }
.routeContent small { display: block; margin-top: 1mm; color: #61798a; font-size: 7.4pt; line-height: 1.3; }
.miniRoute { gap: 1.35mm; }
.miniRoute .routeStep { grid-template-columns: 22mm 6mm 1fr; gap: 1.8mm; }
.miniRoute .routeTime { font-size: 7.4pt; padding: 1.8mm; }
.miniRoute .routeContent { padding: 1.5mm 2mm; }
.miniRoute .routeContent b { font-size: 8pt; margin-bottom: .6mm; }
.miniRoute .routeContent p { font-size: 7.6pt; line-height: 1.22; }
.miniRouteTable { display: grid; gap: 1mm; }
.miniRouteRow { display: grid; grid-template-columns: 24mm 32mm 1fr; gap: 2mm; align-items: center; border: 1px solid #d8f1ff; background: white; padding: 1.5mm 2mm; break-inside: avoid; }
.miniRouteRow span { color: #006fbd; font-size: 7.3pt; font-weight: 900; line-height: 1.2; }
.miniRouteRow b { color: #006fbd; background: #e6f5ff; border: 1px solid #d8f1ff; padding: 1.3mm 1.6mm; text-align: center; font-size: 7.1pt; line-height: 1.15; }
.miniRouteRow p { color: #35596d; font-size: 7.4pt; line-height: 1.22; margin: 0; }
.bowBlock { padding: 3.6mm; margin-bottom: 3.6mm; break-inside: avoid; }
.compactBow { margin-bottom: 0; }
.bowGrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2.1mm; }
.bowItem { border: 1px solid #d8f1ff; background: #fbfdff; padding: 2.3mm; min-height: 20mm; break-inside: avoid; }
.compactBow .bowItem { min-height: 18mm; }
.bowItem b { display: block; color: #006fbd; font-size: 8pt; margin-bottom: 1mm; }
.bowItem .cardText { color: #35596d; font-size: 7.2pt; line-height: 1.25; }
.bowItem .cardText p { color: inherit; font-size: inherit; line-height: inherit; }
.bowItem.isMissing { background: #f8fbfd; border-style: dashed; }
.bowItem.isMissing .cardText { color: #7a8b96; }
.bowItem.hasMore { background: #f4fbff; border-color: #b9e5ff; }
.footerSafe { margin-bottom: 3mm; }
.printNote { border: 1px solid #fed7aa; background: #fff7ed; color: #9a3412; padding: 3mm; font-size: 8.2pt; line-height: 1.4; font-weight: 750; }
.extraBowGrid { grid-template-columns: 1fr; }
.extraBowGrid .bowItem { min-height: 0; }
.extraBowGrid .bowItem .cardText { font-size: 7.4pt; line-height: 1.32; }
.auditLine { padding: 6mm; }
.auditLine ul { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2mm; padding: 0; margin: 0; list-style: none; }
.auditLine li { background: #e6f5ff; color: #006fbd; padding: 3mm; font-size: 8.4pt; font-weight: 800; text-align: center; }
footer { position: absolute; left: 0; right: 0; bottom: 0; z-index: 10; height: 17mm; display: flex; align-items: center; justify-content: space-between; color: #006fbd; font-size: 9pt; font-weight: 800; background: white; border-top: 1px solid #c7eaff; padding: 0 18mm; box-shadow: 0 -3mm 10mm rgba(0, 93, 157, .06); }
footer img { width: 7mm; height: 7mm; object-fit: contain; }
@media print {
  html, body { width: 210mm; margin: 0; background: white; }
  main { width: 210mm; margin: 0; }
  .page { width: 210mm; min-height: 297mm; margin: 0; box-shadow: none; overflow: visible; break-after: page; page-break-after: always; }
  .page:last-child { break-after: auto; page-break-after: auto; }
}
`;
