"use strict";
const { faker } = require("@faker-js/faker");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const documentSeeds = () => {
  const documents = [
    {
      name: "Math Refresher",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723534728486.pdf",
      summary:
        "This Maths Refresher Workbook 1 is designed to refresh your understanding of fundamental mathematical concepts, including number systems, decimals, fractions, percentages, exponents, and roots. It serves as a stepping stone for further mathematical exploration.\n\nThe workbook begins with an introduction to numbers, emphasizing the science of patterns and relationships related to quantity. It delves into the importance of place value and clarifies common mathematical terminology and symbols. The concept of directed numbers (positive and negative integers) is introduced, including their representation on a number line and how to perform addition and subtraction with them.\n\nThe booklet then moves on to practical skills like rounding and estimating, essential for everyday calculations and for detecting potential errors. It outlines the rules for rounding numbers and presents various methods of estimation. The concept of order of operations is discussed, using the acronyms BIMDAS or BOMDAS to illustrate the correct sequence for performing calculations.\n\nThe workbook explores the world of fractions, starting with their definition and terminology, including proper fractions, improper fractions, and mixed numbers. It covers converting between these forms and illustrates how to find equivalent fractions. The concepts of addition, subtraction, multiplication, and division of fractions are explained step-by-step, with clear examples and diagrams.\n\nThe next section delves into percentages, demonstrating their relationship to fractions and explaining how to calculate percentages and apply them to real-world problems. An activity on calculating final exam scores based on previous assessments demonstrates how percentages are used in academic settings.\n\nThe workbook then explores ratios, highlighting their connection to fractions and showcasing how to work with ratios in everyday situations, such as cooking and problem-solving. The use of ratios for proportions, particularly in medical contexts, is also explored.\n\nThe final section focuses on averages, introducing the three common measures of central tendency: mean, median, and mode. The workbook explains how to calculate each measure and explores their applications in data analysis.\n\nThe text concludes with unit conversions, emphasizing the importance of understanding the relationship between different units of measurement and how to perform conversions. The use of conversion factors or solution maps is demonstrated, and step-by-step methods for converting units are presented. A helpful metric conversion table and volume conversion table are provided, along with a step-by-step guide for using graphic visualization to convert units. The workbook concludes with a glossary of key mathematical terms for reference and a list of helpful websites for further exploration. \n",
      authorId: 1,
      folderId: 1,
      updatedAt: "2024-08-13T07:38:48.949Z",
      createdAt: "2024-08-13T07:38:48.949Z",
    },
    {
      name: "Fundamentals",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723534818240.pdf",
      summary:
        "This text provides an introduction to abstract mathematics, focusing on the essential skill of proving statements and understanding fundamental mathematical concepts. The book starts with Propositional Logic, a simplified system where proof rules are straightforward, laying the foundation for understanding proofs. \n\nIt then introduces sets and quantifiers, leading to First-Order Logic, the language of modern mathematics. Mastering proofs in First-Order Logic is crucial for success in advanced mathematics. \n\nThe book delves into sets and their operations like union, intersection, set difference, complement, and power sets, emphasizing the importance of sets as foundational building blocks. It also explores predicates, a way to express properties and relations between objects, and how they can be used to define subsets. \n\nFurthermore, the text discusses functions, their properties like one-to-one and onto, and operations like composition and inverse functions. It emphasizes the relationship between bijective functions and cardinality, which is the number of elements in a set. \n\nThe book then introduces equivalence relations, which allow for grouping similar objects together based on certain properties. It examines equivalence classes, modular arithmetic, and how equivalence relations correspond to partitions.\n\nFinally, the text explores the concept of proof by induction, a powerful technique for proving statements about natural numbers. It covers the Principle of Mathematical Induction, its variations, and the well-ordered property of natural numbers. The book concludes with applications of induction and the Pigeonhole Principle in Number Theory, Abstract Algebra, and Real Analysis, providing practical exercises to solidify the understanding of these concepts.\n\nThis textbook, offered under a Creative Commons license, aims to equip students with the necessary logical and mathematical tools to succeed in advanced mathematics courses. \n",
      authorId: 1,
      folderId: 1,
      updatedAt: "2024-08-13T07:40:18.575Z",
      createdAt: "2024-08-13T07:40:18.575Z",
    },
    {
      name: "Plants 101",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723535185009.pdf",
      summary:
        'This text is a table of contents and preface for a textbook titled "From Growing to Biology: Plants 1e" by Dr. Gokhan Hacisalihoglu. It provides an overview of the book\'s content and its relevance to understanding plant biology.\n\nThe book covers various aspects of plant biology, beginning with a foundational understanding of plant cells and tissues, and progressing through topics like root and shoot systems, systematics, algae, bryophytes, seedless plants, gymnosperms, angiosperms, plant hormones, genetics, plant nutrition, water and solute transport, secondary growth, photosynthesis, cellular respiration, indoor vertical farming, human nutrition from plants, seed germination, tea and coffee growing, sustainable agriculture, synthetic biology, and CRISPR gene editing in crops.\n\nThe textbook emphasizes a practical approach to plant biology, integrating horticultural information that is beneficial for both academia and industry growers. It includes engaging visuals, infographics, key vocabulary, and assessments to enhance student learning.\n\nThe author, Dr. Hacisalihoglu, a Professor of Biological Sciences at Florida A&M University, is an award-winning educator with expertise in plant biology and genetics. He aims to provide students with a comprehensive understanding of plant biology and empower them to excel in their studies.\n\nThe book concludes with chapters on growth mindset and grit, student learning, and how to study STEM subjects, addressing the broader context of academic success and personal growth for students pursuing STEM careers.\n\nOverall, "From Growing to Biology: Plants 1e" offers a comprehensive and engaging introduction to the diverse world of plants, catering to both academic and industry interests. It aims to equip students with the knowledge and skills necessary to understand and appreciate the importance of plants in our world.\n',
      authorId: 1,
      folderId: 2,
      updatedAt: "2024-08-13T07:46:27.267Z",
      createdAt: "2024-08-13T07:46:27.267Z",
    },
    {
      name: "Plant Part Worksheet",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723535263187.pdf",
      summary:
        "This lesson introduces students to the six basic plant parts: roots, stems, leaves, flowers, fruits, and seeds. It emphasizes the importance of plants in providing food, medicine, shelter, and oxygen, highlighting their crucial role in sustaining life on Earth.  \n\nThe lesson begins with a teacher demonstration using celery or a carnation to show how water and nutrients are transported through the stem to the leaves. Students then work in groups to observe and compare the root systems of carrots and grass plants, identifying the differences between taproots and fibrous roots.\n\nThey learn that leaves are responsible for photosynthesis, the process of converting light energy into plant food. The green pigment chlorophyll captures light energy and transforms it into glucose and oxygen. Students then discuss the role of flowers in plant reproduction, attracting pollinators to ensure fertilization and seed production.\n\nFruits, the fleshy coverings around seeds, serve as protection and attract animals for seed dispersal. Seeds themselves contain the embryo, which can develop into a new plant.  \n\nThe lesson concludes with extension activities, including a taste test with celery stalks soaked in salt or sugar solutions to demonstrate the transport of nutrients, a field trip to observe different leaf shapes, and suggestions for ELL adaptations.  \n\nThe lesson aligns with science standards for grades 2-4, focusing on life sciences, investigation, experimentation, and structure/function. The lesson also incorporates English language arts standards for speaking, listening, and writing. \n",
      authorId: 1,
      folderId: 2,
      updatedAt: "2024-08-13T07:47:43.693Z",
      createdAt: "2024-08-13T07:47:43.693Z",
    },
    {
      name: "Plants of Arizona",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723535338710.pdf",
      summary:
        'This field guide, "Recognizing Plant Families of the West," aims to help readers identify 54 common flowering plant families found in the western United States. The guide is organized into three groups: grasses and grass-like plants, monocotyledons, and eudicotyledons, with families arranged alphabetically.\n\nEach family page features identifying characteristics illustrated with photographs, followed by images of familiar western genera. Drawings and a glossary are included to aid in understanding flower terminology and ensuring accurate identification. \n\nThe guide emphasizes field recognition characters, enabling users to identify plants to the family level without using a flora\'s family key. It includes information on the ecology, ethnographic, and economic importance of the families, providing broader context and a deeper understanding of these plants.\n\nThe guide incorporates recent advances in DNA-based studies and follows the classification system developed by the Angiosperm Phylogeny Group. It aims to empower readers to confidently identify plants in the field and foster a deeper appreciation for the diversity of western plant life. \n\nIt also highlights the economic and cultural significance of many families, showcasing the various ways plants are used by humans, from food crops and medicines to ornamentals and even materials like wood and fiber.\n\nThe guide emphasizes the importance of responsible wild plant harvesting, cautioning readers about the potential toxicity of some species.  \n\n"Recognizing Plant Families of the West" serves as a valuable tool for anyone interested in exploring and understanding the rich plant life of the western United States. \n',
      authorId: 1,
      folderId: 2,
      updatedAt: "2024-08-13T07:49:01.532Z",
      createdAt: "2024-08-13T07:49:01.532Z",
    },
    {
      name: "The Art of War",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723535515648.pdf",
      summary:
        '"The Art of War," written by Sun Tzu in ancient China, is a seminal work on military strategy, still relevant in modern business.  This timeless text emphasizes the importance of planning and preparation, as well as the role of deception in achieving victory.  \n\nSun Tzu outlines five crucial factors influencing warfare: the Moral Law, Heaven, Earth, the Commander, and Method & Discipline. He stresses the importance of understanding both yourself and your enemy, advocating for careful analysis of strengths, weaknesses, and strategic opportunities. \n\nThe text emphasizes the importance of striking quickly and decisively, avoiding prolonged warfare, and utilizing the enemy\'s resources to your advantage. Sun Tzu advocates for a proactive approach, seeking to impose your will on the enemy, rather than reacting to their actions.  \n\nThe text delves into tactical dispositions, emphasizing the significance of maneuvering and utilizing the terrain to your advantage. Sun Tzu outlines various types of terrain and their strategic implications, highlighting the importance of adapting to the environment and utilizing natural advantages. \n\nSun Tzu also emphasizes the importance of energy and the ability to leverage combined strength. He compares the effective use of energy to a rolling stone gaining momentum, urging leaders to effectively utilize the collective strength of their army. \n\nThe text emphasizes the need for secrecy and deception, urging generals to conceal their true intentions and mislead their opponents. He advocates for the skillful use of spies, outlining five different types of spies and their respective roles in gathering intelligence. \n\n"The Art of War" is a profound and enduring work, offering valuable insights into strategy and leadership, applicable beyond the battlefield. It emphasizes the importance of planning, adaptability, and understanding both yourself and your opponent, as essential components for achieving success. \n',
      authorId: 1,
      folderId: 3,
      updatedAt: "2024-08-13T07:51:55.970Z",
      createdAt: "2024-08-13T07:51:55.970Z",
    },
    {
      name: "Conquering California",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723535575238.pdf",
      summary:
        "This book, \"Conquering California,\" recounts the story of how America seized California from Mexico during the 19th century. It delves into the Bear Flag Revolt, a rebellion instigated by American settlers against Mexican rule, and the subsequent California Campaign of the Mexican-American War.\n\nThe narrative begins with the influx of American settlers into Alta California, a vast territory encompassing present-day California, Nevada, and parts of other states. Mexico, burdened by internal strife, struggled to govern this distant land, allowing Alta California to become semi-autonomous. \n\nHowever, Mexico's efforts to restrict American immigration fueled resentment among the settlers. Captain John C. Fremont, an ambitious explorer and proponent of American expansion, was tasked by President James K. Polk with orchestrating a rebellion.\n\nFremont's cunning manipulation of American settlers and his calculated provocations against Mexican officials culminated in the Bear Flag Revolt, which began with the capture of Sonoma. The rebels, led by William Ide and Ezekiel \"Stuttering Zeke\" Merritt, hoisted the Bear Flag, a symbol of their short-lived republic.\n\nThe revolt faced numerous challenges, including a shortage of gunpowder and the escalating resistance of the Californios.  The Bear Flaggers' inexperience and questionable leadership resulted in their defeat at the hands of the U.S. Navy.\n\nThe narrative shifts to the California Campaign of the Mexican-American War. Commodore Robert Stockton, who succeeded Commodore John D. Sloat as commander of the Pacific Squadron, pursued a strategy of capturing key cities and ports.  \n\nThe siege of Los Angeles, however, proved more difficult. Captain Archibald Gillespie's harsh rule and the growing discontent of the Californio population led to a rebellion. The siege resulted in the capture of Los Angeles by General Jose Maria Flores.\n\nThe Battle of the Old Woman's Gun, a remarkable display of courage and ingenuity by a small band of Californios against a superior American force, highlighted the tenacity of the Mexican resistance.  General Stephen Kearny, commanding U.S. Army forces, arrived in California and faced a series of clashes with the Californios. The Battle of San Pasqual, a chaotic and bloody confrontation, underscored the ferocity of the Mexican lancers, who inflicted significant casualties on Kearny's troops.\n\nDespite their initial setbacks, the Americans ultimately prevailed in the California Campaign.  The Battle of Rio San Gabriel and the Battle of La Mesa, led by Stockton and Kearny, decisively broke the Californio resistance.\n\nThe Treaty of Cahuenga, negotiated between General Andres Pico and John C. Fremont, marked the end of hostilities and formalized California's annexation into the United States.\n\nThe book examines the aftermath of the conquest, outlining the fates of prominent individuals from both sides. The narrative concludes with a reflection on the historical significance of the Bear Flag Revolt and the California Campaign, highlighting the complex dynamics of westward expansion and the enduring legacy of this pivotal period in California's history. \n",
      authorId: 1,
      folderId: 3,
      updatedAt: "2024-08-13T07:52:55.817Z",
      createdAt: "2024-08-13T07:52:55.817Z",
    },
    {
      name: "Flights by the Wrights",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723535611925.pdf",
      summary:
        "This text recounts the Wright brothers' journey towards achieving the first successful powered flight. It starts by tracing their early fascination with flight, inspired by a childhood toy helicopter. They later delved into the study of aviation pioneers like Lilienthal, Chanute, and Langley. \n\nThe Wrights observed two distinct schools of thought: one focused on power flight and the other on soaring flight. They favored the latter, recognizing the elegance and efficiency of utilizing wind itself for lift. They then tackled the crucial issue of balancing and controlling a flyer, challenging the prevailing dihedral principle.\n\nInstead of relying on automatic self-righting mechanisms, the Wrights opted for a more controlled approach. They designed their machine to be as inert as possible to wind gusts, relying on operator-controlled warping of the wings and rudders to maintain equilibrium.\n\nTheir experimentation began in 1900 at Kitty Hawk, North Carolina, with gliders. They encountered numerous unexpected phenomena, challenging established scientific data and prompting them to conduct their own rigorous investigations. This led to the development of their own wind pressure tables, crucial for accurate calculations.\n\nIn 1903, they built their first powered flyer, a testament to their meticulous engineering and calculated design. The first flight, on December 17, 1903, lasted only 12 seconds but marked a momentous occasion – the first successful powered flight by a machine carrying a man. \n\nDespite setbacks and challenges, they continued to refine their designs and perfect their flying machine. Their dedication to innovation, coupled with relentless experimentation and a deep understanding of aerodynamics, ultimately led them to achieve their historic feat. \n",
      authorId: 1,
      folderId: 3,
      updatedAt: "2024-08-13T07:53:32.331Z",
      createdAt: "2024-08-13T07:53:32.331Z",
    },
    {
      name: "The Empress of Rome",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723535654129.pdf",
      summary:
        "This text delves into the lives and influence of the Empresses of Rome, from the founding of the Empire to the fall of the Western Roman Empire. It begins by examining the lives of Livia Drusilla, wife of Octavian, and Julia, daughter of Augustus, highlighting Livia’s role in shaping Octavian’s reign and Julia’s scandalous descent into debauchery.\n\nThe text then explores the turbulent reigns of Caligula, Claudius, and Nero, detailing their various wives and their impact on their emperors' rule. Messalina, wife of Claudius, stands out as a symbol of rampant corruption and excessive indulgence.\n\nThe story transitions to the reigns of the more virtuous emperors - Trajan, Hadrian, Antoninus Pius, and Marcus Aurelius - analyzing the influence of their respective wives, Plotina, Sabina, Faustina, and Lucilla. These empresses, despite their differing personalities, often served as advisors and supporters to their husbands.\n\nThe text further examines the rise and fall of various Empresses during the turbulent periods of Roman history, including the rise of Zenobia, Queen of Palmyra, and the tragic fates of Galeria Fundana, wife of Vitellius, and Domitia Longina, wife of Domitian. \n\nFinally, the text explores the lives of Helena, mother of Constantine, and Justina, wife of Valentinian I, highlighting their roles in the changing religious landscape of the Roman Empire. The text concludes with the story of Eudoxia, wife of Arcadius, and Pulcheria, sister of Theodosius II, highlighting their political influence and the ultimate decline of the Western Roman Empire. \n",
      authorId: 1,
      folderId: 3,
      updatedAt: "2024-08-13T07:54:14.630Z",
      createdAt: "2024-08-13T07:54:14.630Z",
    },
    {
      name: "Aesop's Fables",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723535763277.pdf",
      summary:
        'Aesop\'s Fables, a collection of classic short stories, offer timeless wisdom through engaging animal characters. The fables explore themes of greed, gratitude, deception, and the consequences of actions.\n\nIn "The Cock and the Pearl," a cock discovers a pearl but values a barleycorn more, illustrating that precious things hold value only to those who appreciate them. "The Wolf and the Lamb" highlights the tyrannical nature of those seeking excuses for cruelty, while "The Dog and the Shadow" warns against losing substance by chasing after illusions.\n\n"The Lion\'s Share" satirizes the dominance of the powerful, where the lion, despite sharing in the hunt\'s labor, claims the entire reward. "The Wolf and the Crane" contrasts gratitude and greed, showing how the wolf, after being helped by the crane, refuses to offer a proper reward.\n\n"The Man and the Serpent" reminds us that while injuries can be forgiven, they are rarely forgotten. In "The Town Mouse and the Country Mouse," the country mouse, despite enjoying simple meals in peace, learns the perils of city life when the town mouse\'s lavish feast is interrupted by barking dogs.\n\n"The Fox and the Crow" warns against flattery, as the fox uses his words to trick the crow into dropping her cheese. "The Sick Lion" criticizes cowardice, as animals, safe from the dying lion, insult his fading majesty.\n\n"The Ass and the Lapdog" showcases the absurdity of imitating others without understanding their context, while "The Lion and the Mouse" demonstrates the power of unexpected kindness, as the mouse saves the lion\'s life.\n\n"The Swallow and the Other Birds" emphasizes the importance of heeding warnings and addressing problems before they become too large. "The Frogs Desiring a King" warns against seeking change without considering the potential consequences, as the frogs\' desire for a king leads to their destruction.\n\n"The Mountains in Labour" illustrates the difference between expectation and reality, as the much-anticipated event results in a small mouse. "The Hares and the Frogs" reminds us that there is always someone worse off, offering a glimmer of hope in times of hardship.\n\n"The Wolf and the Kid" highlights the dangers of overconfidence, as the kid, safe on the rooftop, taunts the wolf only to be consumed in the end. "The Woodman and the Serpent" emphasizes the lack of gratitude in the wicked, as the woodman\'s kindness is met with the serpent\'s attempted attack.\n\n"The Bald Man and the Fly" advises against engaging with insignificant enemies, as dwelling on them only leads to self-inflicted harm. "The Fox and the Stork" illustrates the principle of reciprocity, as the fox\'s trickery is met with similar treatment by the stork.\n\nAesop\'s Fables provide valuable lessons for navigating life\'s complexities, reminding us to appreciate simple things, be cautious of flattery, avoid unnecessary risks, and always be mindful of the consequences of our actions. \n',
      authorId: 1,
      folderId: 4,
      updatedAt: "2024-08-13T07:56:03.578Z",
      createdAt: "2024-08-13T07:56:03.578Z",
    },
    {
      name: "A Christmas Carol",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723535808013.pdf",
      summary:
        "\"A Christmas Carol\" by Charles Dickens tells the story of Ebenezer Scrooge, a miserly old man who despises Christmas. His life takes a dramatic turn when he is visited by three spirits: the Ghost of Christmas Past, the Ghost of Christmas Present, and the Ghost of Christmas Yet to Come. \n\nThe Ghost of Christmas Past takes Scrooge on a journey through his own past, revealing memories of his childhood, his apprenticeship under the benevolent Fezziwig, and his lost love, Belle. These memories highlight Scrooge's transformation from a kind and generous young man to a bitter and greedy old man. \n\nThe Ghost of Christmas Present shows Scrooge the joy and generosity of Christmas as it unfolds in the present day. Scrooge witnesses the Christmas celebrations of his nephew, Fred, and the Cratchit family, including the heartwarming but tragic story of Tiny Tim. The spirit also exposes the plight of Ignorance and Want, warning Scrooge of the consequences of his callous indifference to those less fortunate.\n\nThe Ghost of Christmas Yet to Come takes Scrooge into a chilling future where he sees the consequences of his own actions. Scrooge witnesses his own death, unmourned and forgotten, and the misery of those he has wronged. The spirit's haunting vision forces Scrooge to confront his own mortality and the profound impact his choices have on others.\n\nHaunted by these visions, Scrooge undergoes a profound transformation. He vows to embrace Christmas spirit, become a more generous and compassionate person, and make amends for his past misdeeds. The story concludes with Scrooge embracing his newfound spirit of generosity, sharing his wealth with the Cratchit family, and becoming a kinder, more joyful man.\n\nDickens's timeless tale serves as a powerful reminder of the importance of compassion, generosity, and the true meaning of Christmas. Scrooge's journey highlights the transformative power of empathy and the enduring impact of our choices on others. \n",
      authorId: 1,
      folderId: 4,
      updatedAt: "2024-08-13T07:56:48.282Z",
      createdAt: "2024-08-13T07:56:48.282Z",
    },
    {
      name: "Alice in Wonderland",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723535854104.pdf",
      summary:
        "Alice's Adventures in Wonderland, a timeless classic by Lewis Carroll, takes readers on a fantastical journey through a world of whimsical characters and nonsensical logic. The story begins with Alice, a young girl, falling down a rabbit hole and finding herself in a surreal and enchanting land.\n\nHer adventure begins in a long, low hall filled with doors, each leading to a new and unexpected encounter. Alice's first encounter is with the White Rabbit, a perpetually late creature who carries a pocket watch. This strange meeting sparks Alice's curiosity and sets the stage for her extraordinary journey.\n\nAlice's adventures in Wonderland are marked by a series of transformations, both physical and mental. She encounters a talking Caterpillar who offers cryptic advice on how to alter her size, a Mad Hatter and March Hare who host a nonsensical tea party, and a Mock Turtle who recounts a sorrowful tale of his life in the sea.\n\nAlice's encounters with these eccentric characters are filled with riddles, illogical conversations, and absurd situations. She learns to navigate a world where words have different meanings, logic is fluid, and the rules are constantly changing.\n\nThrough her journey, Alice faces challenges and puzzles, such as the Queen of Hearts' croquet game, where the players are animals, the mallets are flamingos, and the arches are living soldiers. She encounters the Cheshire Cat, a mysterious creature that appears and disappears at will, leaving behind only its enigmatic grin.\n\nThe trial of the Knave of Hearts, accused of stealing the Queen's tarts, is a highlight of the story. Alice, who has grown to an immense size, becomes a witness and finds herself caught in the middle of a nonsensical legal proceedings, where logic and evidence are twisted and manipulated.\n\nAlice's adventures culminate in a chaotic courtroom scene where the King and Queen of Hearts preside over a nonsensical trial. Alice's sharp wit and rebellious nature challenge the authority of the Queen, leading to a confrontation that ultimately awakens her from her dream.\n\nAs Alice awakens from her dream, her sister reflects on the magical journey that Alice has experienced. She realizes that even as Alice grows older, the wonder and imagination of childhood will remain with her, inspiring her own stories and adventures in the future.\n",
      authorId: 1,
      folderId: 4,
      updatedAt: "2024-08-13T07:57:34.457Z",
      createdAt: "2024-08-13T07:57:34.457Z",
    },
    {
      name: "Frankenstein",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723535929725.pdf",
      summary:
        "Victor Frankenstein, a brilliant but driven scientist, embarks on a perilous voyage to the North Pole, fueled by an insatiable thirst for knowledge and a desire to surpass the achievements of his predecessors.  His journey takes a dramatic turn when he encounters a mysterious stranger, a man shattered by unimaginable misfortunes, who seeks a friend in the vast and desolate Arctic landscape.\n\nIntrigued by the stranger's haunting tale, Victor learns of his own tragic creation - a monstrous being born from ambition and hubris.  The creature, yearning for love and acceptance, is rejected by his creator and the world, driving him to a path of despair and vengeance.\n\nHaunted by the creature's crimes and the suffering he has inflicted upon those he loves, Victor is torn by guilt and remorse.  His own life becomes a living hell, and he seeks solace in the sublime beauty of nature, finding a fleeting sense of peace amidst the awe-inspiring grandeur of the Alps.\n\nDriven by a desperate hope to atone for his creation, Victor agrees to create a companion for the creature, believing it will appease his anger and end the cycle of destruction. However, the realization of the potential consequences of his actions - the creation of a race of monstrous beings - fills him with overwhelming dread.\n\nThe creature, relentless in his pursuit of Victor, follows him across Europe, leaving a trail of devastation in his wake.  The climax of their tumultuous journey unfolds in the icy wilderness of the Arctic, where Victor is forced to confront his creation once more.\n\nIn a final, desperate attempt to escape his tormentor, Victor boards a ship bound for England, seeking a refuge from the relentless pursuit of his monster.  The creature, however, appears once again, this time on Victor's wedding night, fulfilling his chilling prophecy.  In a moment of unimaginable horror, the creature murders Victor's beloved Elizabeth, driving him into a state of utter despair.\n\nHaunted by guilt and consumed by a burning desire for revenge, Victor relentlessly pursues his creation across continents.  He recounts his harrowing journey, filled with suffering, isolation, and encounters with the creature's relentless malice. \n\nVictor's pursuit leads him to the icy wasteland of the Arctic, where he finally confronts his creature.  In a desperate struggle, both men are left at the mercy of a raging storm, with Victor clinging to the hope of survival, knowing that his task remains unfinished.\n\nJust as Victor seems to have achieved his vengeance, the creature escapes, leaving him adrift on a shrinking ice floe, facing an agonizing death.  Victor, with his final breath, pleads with Walton to carry on his quest and destroy the creature, ensuring that his legacy of horror will not endure.\n\nThe narrative concludes with the creature's haunting final words, filled with self-loathing, remorse, and a longing for oblivion.  He vows to end his own existence, consumed by the guilt of his actions and the overwhelming burden of his existence.  Victor's creation, the monstrous embodiment of his ambition and the tragic consequences of his actions, disappears into the unforgiving wilderness, leaving behind a chilling testament to the dangers of unchecked scientific ambition. \n",
      authorId: 1,
      folderId: 4,
      updatedAt: "2024-08-13T07:58:50.159Z",
      createdAt: "2024-08-13T07:58:50.159Z",
    },
    {
      name: "Grimm's Fairy Tales",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723535985886.pdf",
      summary:
        "The Brothers Grimm's \"The Golden Bird\" follows the journey of a king's gardener's youngest son in search of a golden bird that steals golden apples from the royal garden. The son encounters a helpful fox who provides him with crucial advice, warning him of deceitful inns and a treacherous trap set within a castle. Despite the fox's warnings, the son's curiosity leads him to fall into the king's trap, facing the daunting task of finding a golden horse that can outrun the wind. \n\nThe fox again aids the son, guiding him towards the golden horse, but the son's desire for perfection leads him to choose a golden saddle instead of the instructed leather one, resulting in his capture. The final challenge involves securing a beautiful princess for the king, which the fox helps him accomplish by advising him to steal the princess away from the castle.\n\nHowever, the son's brothers, who had previously failed to find the golden bird, turn to robbery and steal the princess, the golden horse, and the bird. The son, with the fox's help, manages to retrieve the princess, the horse, and the bird, but his brothers attempt to kill him. Through cunning and the fox's continued guidance, the son exposes his brothers' treachery and ultimately becomes heir to the kingdom. The story concludes with the revelation that the fox is actually the princess's long-lost brother, transformed back to human form.\n\n\"The Golden Bird\" is a classic fairy tale that embodies themes of adventure, deception, and the importance of following good advice. The story teaches valuable lessons about the consequences of curiosity, the power of kindness, and the triumph of good over evil. \n",
      authorId: 1,
      folderId: 4,
      updatedAt: "2024-08-13T07:59:46.232Z",
      createdAt: "2024-08-13T07:59:46.232Z",
    },
    {
      name: "D&D Monstrous Races",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723536077471.pdf",
      summary:
        "This document presents detailed rules for playing every creature in the Monster Manual as player characters in Dungeons & Dragons 5th Edition. It aims to provide balanced options for diverse playstyles, from the powerful Balor demon to the humble badger.\n\nThe document introduces new rules for constructs and undead healing, clarifies monk interactions with natural weapons, and presents alternate rules for using templates for player characters. It also offers new mechanics for tiny creatures, including weapon limitations and carrying capacity adjustments.\n\nThe document provides extensive information on each creature, including its racial traits, suggestions for playing that race, and design notes detailing the balancing process. These notes offer insights into the BP (Build Point) system, a method used to assess the overall power level of each creature. \n\nThe BP system uses a target range of 8-10 BP for the first level of a race and 4-5 BP for additional levels.  This system allows for a more balanced approach to designing monstrous races, ensuring that they don't become overpowered.\n\nThe document also includes a detailed appendix with rules for creating and customizing your own races and templates, fostering further creativity and personalization within the game. It offers comprehensive guidelines for adjusting various aspects of creatures, such as ability score increases, special senses, movement modes, proficiencies, innate spellcasting, and unique special abilities.\n\nBy providing these rules, the document empowers Dungeon Masters to expand upon the character options available to their players, opening up exciting new avenues for roleplaying, strategy, and storytelling within the world of Dungeons & Dragons. \n",
      authorId: 1,
      folderId: 5,
      updatedAt: "2024-08-13T08:01:18.305Z",
      createdAt: "2024-08-13T08:01:18.305Z",
    },
    {
      name: "JS and TS Comparison",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723536135698.pdf",
      summary:
        "This research paper investigates the impact of TypeScript (TS), a type-safe superset of JavaScript (JS), on software quality. It challenges the common perception that TS applications automatically result in higher quality software compared to JS applications. To address this, the study analyzed 604 GitHub projects (299 JS and 305 TS) with over 16 million lines of code, focusing on four software quality facets: code quality, code understandability, bug proneness, and bug resolution time.\n\nThe analysis revealed that TS applications exhibited significantly better code quality and understandability than JS applications, as measured by code smells and cognitive complexity per line of code. However, contrary to expectations, TS applications did not significantly outperform JS applications in terms of bug proneness and bug resolution time.  In fact, TS projects had a higher bug fix commit ratio and longer bug resolution times compared to JS projects.\n\nFurthermore, the study examined the influence of the 'any' type, which bypasses type safety in TS, on software quality. It found that reducing the usage of 'any' in TS projects was correlated with improved code quality and understandability, but not with fewer bugs. This indicates that while TS offers potential benefits, it does not guarantee a direct reduction in bugs.\n\nThe paper suggests that the relationship between TS and software quality is more complex than assumed. Factors like project complexity and developer experience may play a significant role.  While TS can contribute to better code quality and understandability, its effectiveness in preventing and fixing bugs may be influenced by these factors. The study highlights the need for further research to understand the nuanced interplay between type systems, software quality, and other contributing factors. \n",
      authorId: 1,
      folderId: 5,
      updatedAt: "2024-08-13T08:02:16.065Z",
      createdAt: "2024-08-13T08:02:16.065Z",
    },
  ];

  return documents;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Documents";
    try {
      await queryInterface.bulkInsert(options, documentSeeds(), {});
    } catch (error) {
      console.error("Error while seeding documents:", error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Documents";
    return queryInterface.bulkDelete(options, null, {});
  },
  documentSeeds,
};
