"use strict";
const { faker } = require("@faker-js/faker");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const documentSeeds = () => {
  const documents = [
    {
      id: 1,
      name: "Math Refresher",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723534728486.pdf",
      summary:
        "This booklet is a maths refresher designed to help students at James Cook University improve their understanding of fundamental mathematical concepts. It covers topics like numbers, decimals, fractions, percentages, exponents, roots, and logarithms. The booklet includes explanations, examples, and practice exercises for each topic, helping students build a solid foundation in basic mathematics. The booklet also includes helpful resources like conversion tables, glossary terms, and links to online tutorials. \n",
      authorId: 1,
      folderId: 1,
      updatedAt: "2024-08-13T07:38:48.949Z",
      createdAt: "2024-08-13T07:38:48.949Z",
    },

    {
      id: 2,
      name: "Fundamentals",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723534818240.pdf",
      summary:
        "This textbook, \"Proofs and Concepts: The Fundamentals of Abstract Mathematics,\" by Dave Witte Morris and Joy Morris, focuses on developing students' ability to construct rigorous mathematical proofs. It uses the language of Propositional Logic and First-Order Logic to lay the foundation for understanding proof techniques and fundamental concepts in abstract mathematics.  The book covers essential topics like sets, functions, equivalence relations, and proof by induction. It also includes sample problems from number theory, abstract algebra, and real analysis to challenge students' understanding and skill development.  The text emphasizes the importance of clear and convincing explanations in mathematical arguments, preparing students for success in advanced undergraduate mathematics courses and beyond. \n",
      authorId: 1,
      folderId: 1,
      updatedAt: "2024-08-13T07:40:18.575Z",
      createdAt: "2024-08-13T07:40:18.575Z",
    },
    {
      id: 3,
      name: "Plants 101",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723535185009.pdf",
      summary:
        '"From Growing to Biology: Plants 1e" is a comprehensive textbook covering plant biology from basic cell structures to advanced concepts like synthetic biology and CRISPR gene editing. It delves into the anatomy, morphology, physiology, and genetics of plants, providing insights into their growth, reproduction, and interactions with the environment.  The book also explores the history and evolution of plants, showcasing their importance in sustaining life on Earth and their potential for addressing global challenges like food security and climate change.  Lastly, it highlights the importance of developing growth mindset and grit to excel in STEM fields. \n',
      authorId: 1,
      folderId: 2,
      updatedAt: "2024-08-13T07:46:27.267Z",
      createdAt: "2024-08-13T07:46:27.267Z",
    },
    {
      id: 4,
      name: "Plant Part Worksheet",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723535263187.pdf",
      summary:
        "This lesson introduces students to the six basic parts of plants: roots, stems, leaves, flowers, fruits, and seeds. Students will learn about the functions of each part and how they contribute to the plant's survival. Through hands-on activities, they will examine different plants, observe the structures of their roots and leaves, and explore the transport of water through stems. By the end of the lesson, students will understand the importance of each plant part and how they work together. \n",
      authorId: 1,
      folderId: 2,
      updatedAt: "2024-08-13T07:47:43.693Z",
      createdAt: "2024-08-13T07:47:43.693Z",
    },
    {
      id: 5,
      name: "Plants of Arizona",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723535338710.pdf",
      summary:
        'This field guide, "Recognizing Plant Families of the West," aims to help readers identify 54 common flowering plant families found in the western United States. It focuses on illustrating key field recognition characters with photographs, enabling users to quickly narrow down potential families without needing a comprehensive flora. The guide features 54 families categorized into three groups: grasses and grass-like plants, monocotyledons, and eudicotyledons. Each family page includes general information, identifying characteristics with photographs, and images of familiar western genera, providing a comprehensive overview of these plants and their ecological significance. \n',
      authorId: 1,
      folderId: 2,
      updatedAt: "2024-08-13T07:49:01.532Z",
      createdAt: "2024-08-13T07:49:01.532Z",
    },
    {
      id: 6,
      name: "The Art of War",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723535515648.pdf",
      summary:
        '"The Art of War," written by Sun Tzu in the late 6th century BC, is an influential book on military strategy that remains relevant today. The book focuses on the importance of deception, planning, and understanding both your own strengths and weaknesses, as well as those of your enemy. Sun Tzu emphasizes the necessity of achieving victory without prolonged warfare, advocating for strategic maneuvers and the use of terrain to achieve decisive results. He also highlights the crucial role of intelligence gathering through various types of spies, recognizing that accurate information is vital for success in any military endeavor. \n',
      authorId: 1,
      folderId: 3,
      updatedAt: "2024-08-13T07:51:55.970Z",
      createdAt: "2024-08-13T07:51:55.970Z",
    },
    {
      id: 7,
      name: "Conquering California",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723535575238.pdf",
      summary:
        "This book chronicles the American conquest of California from Mexico, starting with the Bear Flag Revolt in 1846. It details how Captain John C. Fremont, acting on President Polk's orders, instigated a rebellion by American settlers against Mexican rule in California. The revolt was short-lived, lasting only 25 days, but it paved the way for the larger California Campaign of the Mexican-American War. The book goes on to describe the battles fought and the individuals involved, ultimately culminating in the Treaty of Cahuenga, which ended hostilities and formally ceded California to the United States. The text also highlights the lasting impact of the conquest on both the victors and the vanquished, including the California Gold Rush and the subsequent establishment of the state. \n",
      authorId: 1,
      folderId: 3,
      updatedAt: "2024-08-13T07:52:55.817Z",
      createdAt: "2024-08-13T07:52:55.817Z",
    },
    {
      id: 8,
      name: "Flights by the Wrights",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723535611925.pdf",
      summary:
        "Orville and Wilbur Wright, driven by childhood fascination with flight, embarked on their journey to conquer the skies. Inspired by pioneers like Lilienthal, they rejected established theories and relied on their own meticulous research and experimentation. After years of testing gliders and refining their understanding of aerodynamics, the brothers successfully built and flew the first heavier-than-air, self-propelled aircraft in 1903, forever changing the course of aviation history. Their groundbreaking achievement, achieved through a combination of scientific rigor and unwavering determination, laid the foundation for the modern era of flight. \n",
      authorId: 1,
      folderId: 3,
      updatedAt: "2024-08-13T07:53:32.331Z",
      createdAt: "2024-08-13T07:53:32.331Z",
    },
    {
      id: 9,
      name: "The Empress of Rome",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723535654129.pdf",
      summary:
        "This text is a historical account of the Empresses of Rome, focusing on their influence and impact on the Roman Empire. The text argues that the Empresses, despite some notable exceptions like Livia and Plotina, were generally less influential than their male counterparts. It explores the varied personalities of the Empresses, highlighting their strengths, weaknesses, and their roles in shaping the course of the Empire. Finally, the text emphasizes the decline of the Roman Empire, highlighting the role of women in this downfall, particularly their contributions to the corruption and instability that ultimately led to the Empire's collapse. \n",
      authorId: 1,
      folderId: 3,
      updatedAt: "2024-08-13T07:54:14.630Z",
      createdAt: "2024-08-13T07:54:14.630Z",
    },
    {
      id: 10,
      name: "Aesop's Fables",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723535763277.pdf",
      summary:
        'Planet eBook is a website that offers free eBooks of classic literature, including Aesop’s Fables. The collection features a variety of stories, such as "The Cock and the Pearl," "The Wolf and the Lamb," and "The Lion\'s Share." Each fable provides a moral lesson, encouraging readers to reflect on the consequences of their actions. For example, "The Dog and the Shadow" warns against losing something real in pursuit of something imagined. \n',
      authorId: 1,
      folderId: 4,
      updatedAt: "2024-08-13T07:56:03.578Z",
      createdAt: "2024-08-13T07:56:03.578Z",
    },
    {
      id: 11,
      name: "A Christmas Carol",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723535808013.pdf",
      summary:
        'This excerpt from Charles Dickens\' "A Christmas Carol" introduces Ebenezer Scrooge, a miserly and cold-hearted man who despises Christmas. He is visited by the ghost of his former business partner, Jacob Marley, who warns him of three spirits who will visit him to show him the errors of his ways. The first spirit, the Ghost of Christmas Past, takes Scrooge on a journey through his own past, revealing both joyful and painful memories that highlight the path he has taken. Scrooge is deeply affected by these experiences and begins to question his life choices. \n',
      authorId: 1,
      folderId: 4,
      updatedAt: "2024-08-13T07:56:48.282Z",
      createdAt: "2024-08-13T07:56:48.282Z",
    },
    {
      id: 12,
      name: "Alice in Wonderland",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723535854104.pdf",
      summary:
        "Alice's Adventures in Wonderland is a classic children's story by Lewis Carroll that follows the adventures of a young girl who falls down a rabbit hole into a fantastical world. The story begins with Alice getting bored and sleepy while sitting with her sister, and a white rabbit with a pocket watch prompts her to follow him down a rabbit hole.  Alice finds herself in a world of talking animals, playing croquet with flamingos and hedgehogs, attending a mad tea party, and even facing a trial for stealing tarts. Through these strange encounters, Alice learns about herself and the absurdity of the world around her.  The story ends with Alice waking up from her dream, leaving her sister to imagine the wonderful adventures her sister has had. \n",
      authorId: 1,
      folderId: 4,
      updatedAt: "2024-08-13T07:57:34.457Z",
      createdAt: "2024-08-13T07:57:34.457Z",
    },
    {
      id: 13,
      name: "Frankenstein",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723535929725.pdf",
      summary:
        "Victor Frankenstein, a young scientist consumed by a thirst for knowledge, creates a monstrous being, horrified by his creation, he abandons it, leading to a chain of tragic events. Driven by despair and a desire for revenge, the creature seeks to make Frankenstein responsible for his misery, demanding a companion. Frankenstein reluctantly agrees but later destroys the female creature he is creating, causing the monster to swear vengeance.  The story unfolds as Frankenstein recounts his ordeal to Robert Walton, a sea captain on a polar expedition. Haunted by his actions, Frankenstein chases the creature across the globe, seeking to stop his rampage and ultimately destroy him.  In the end, Frankenstein dies, consumed by remorse, while the creature vows to end his own existence and vanish from the world.  \n",
      authorId: 1,
      folderId: 4,
      updatedAt: "2024-08-13T07:58:50.159Z",
      createdAt: "2024-08-13T07:58:50.159Z",
    },
    {
      id: 14,
      name: "Grimm's Fairy Tales",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723535985886.pdf",
      summary:
        "The story of Snow-White and Rose-Red is about two sisters who are as good and happy as any children in the world.  They are often in the forest gathering berries and befriending wild animals.  One evening, a bear arrives at their cottage seeking shelter from the cold.  The sisters befriend the bear and play tricks on him, but he takes it all in good part.  When spring arrives, the bear reveals he is a king's son who was bewitched by a dwarf.  He is freed by the dwarf's death and marries Snow-White, while Rose-Red marries his brother. \n\nThis story demonstrates the importance of kindness, as the sisters’ good nature towards the bear ultimately leads to their happy ending.  It also highlights the theme of breaking curses through acts of courage and kindness, a common theme in fairy tales. \n",
      authorId: 1,
      folderId: 4,
      updatedAt: "2024-08-13T07:59:46.232Z",
      createdAt: "2024-08-13T07:59:46.232Z",
    },
    {
      id: 15,
      name: "D&D Monstrous Races",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723536077471.pdf",
      summary:
        "This document presents rules for playing every monster from the Monster Manual as a player character in Dungeons and Dragons 5th Edition. It includes new feats and backgrounds tailored for monstrous characters, analyses of officially published races, detailed rules for creating custom races, and new rules for tiny races and templates. The document strives for balance, with each race and template designed to fall within an acceptable power range while remaining thematic and fun to play.  The Race Builder appendix provides detailed rules for crafting custom races and templates. \n",
      authorId: 1,
      folderId: 5,
      updatedAt: "2024-08-13T08:01:18.305Z",
      createdAt: "2024-08-13T08:01:18.305Z",
    },
    {
      id: 16,
      name: "JS and TS Comparison",
      fileType: "pdf",
      fileUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723536135698.pdf",
      summary:
        'This study investigated the impact of TypeScript (TS) on software quality compared to JavaScript (JS) by analyzing 604 GitHub projects.  The results showed that TS applications exhibited significantly better code quality and understandability than JS applications. However, contrary to expectations, TS applications did not show significantly lower bug proneness or faster bug resolution times than JS applications. The study also found that reducing the use of the "any" type in TS applications was weakly correlated with improved code quality and understandability, but not with bug proneness. The study concludes that while TS has potential benefits, it does not automatically lead to fewer or easier-to-fix bugs, and more research is needed to understand the complex interplay between TS, software quality, and developer experience. \n',
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
