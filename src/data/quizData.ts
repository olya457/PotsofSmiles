export type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
};

export type QuizLevel = {
  level: number;
  questions: QuizQuestion[];
};

export const quizLevels: QuizLevel[] = [
  {
    level: 1,
    questions: [
      {
        question: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter'],
        correctIndex: 1,
      },
      {
        question: 'Which animal is the largest on Earth?',
        options: ['Elephant', 'Blue Whale', 'Giraffe'],
        correctIndex: 1,
      },
      {
        question: 'Which ocean is the largest?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean'],
        correctIndex: 2,
      },
      {
        question: 'How many continents are there on Earth?',
        options: ['5', '6', '7'],
        correctIndex: 2,
      },
      {
        question: 'Which bird is known for not being able to fly?',
        options: ['Penguin', 'Eagle', 'Falcon'],
        correctIndex: 0,
      },
      {
        question: 'Which season comes after summer?',
        options: ['Spring', 'Autumn', 'Winter'],
        correctIndex: 1,
      },
      {
        question: 'What is the fastest land animal?',
        options: ['Cheetah', 'Lion', 'Horse'],
        correctIndex: 0,
      },
    ],
  },
  {
    level: 2,
    questions: [
      {
        question: 'Which metal is liquid at room temperature?',
        options: ['Mercury', 'Iron', 'Silver'],
        correctIndex: 0,
      },
      {
        question: 'Which animal is known as the king of the jungle?',
        options: ['Tiger', 'Lion', 'Leopard'],
        correctIndex: 1,
      },
      {
        question: 'How many sides does a hexagon have?',
        options: ['5', '6', '8'],
        correctIndex: 1,
      },
      {
        question: 'Which gas do plants absorb from the air?',
        options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide'],
        correctIndex: 2,
      },
      {
        question: 'Which continent is the largest?',
        options: ['Africa', 'Asia', 'Europe'],
        correctIndex: 1,
      },
      {
        question: 'Which instrument has keys, pedals, and strings?',
        options: ['Piano', 'Guitar', 'Violin'],
        correctIndex: 0,
      },
      {
        question: 'Which animal sleeps the most hours per day?',
        options: ['Koala', 'Dog', 'Horse'],
        correctIndex: 0,
      },
    ],
  },
  {
    level: 3,
    questions: [
      {
        question: 'Which planet has the most rings?',
        options: ['Saturn', 'Earth', 'Mars'],
        correctIndex: 0,
      },
      {
        question: 'Which animal is the tallest in the world?',
        options: ['Giraffe', 'Elephant', 'Camel'],
        correctIndex: 0,
      },
      {
        question: 'Which ocean lies between Africa and Australia?',
        options: ['Pacific Ocean', 'Indian Ocean', 'Arctic Ocean'],
        correctIndex: 1,
      },
      {
        question: 'How many legs does a spider have?',
        options: ['6', '8', '10'],
        correctIndex: 1,
      },
      {
        question: 'Which country is famous for the Eiffel Tower?',
        options: ['Italy', 'France', 'Spain'],
        correctIndex: 1,
      },
      {
        question: 'Which animal is known for changing color?',
        options: ['Chameleon', 'Frog', 'Snake'],
        correctIndex: 0,
      },
      {
        question: 'Which planet is closest to the Sun?',
        options: ['Mercury', 'Venus', 'Earth'],
        correctIndex: 0,
      },
    ],
  },
  {
    level: 4,
    questions: [
      {
        question: 'Which animal is the fastest bird in the world?',
        options: ['Falcon', 'Eagle', 'Owl'],
        correctIndex: 0,
      },
      {
        question: 'How many bones are in the human body?',
        options: ['206', '186', '226'],
        correctIndex: 0,
      },
      {
        question: 'Which desert is the largest hot desert?',
        options: ['Sahara', 'Gobi', 'Kalahari'],
        correctIndex: 0,
      },
      {
        question: 'Which animal is known for its black and white stripes?',
        options: ['Zebra', 'Tiger', 'Panda'],
        correctIndex: 0,
      },
      {
        question: 'Which planet is known for its giant red storm?',
        options: ['Jupiter', 'Neptune', 'Saturn'],
        correctIndex: 0,
      },
      {
        question: 'Which animal lives the longest on average?',
        options: ['Tortoise', 'Elephant', 'Whale'],
        correctIndex: 0,
      },
      {
        question: 'Which tree produces acorns?',
        options: ['Oak', 'Pine', 'Birch'],
        correctIndex: 0,
      },
    ],
  },
  {
    level: 5,
    questions: [
      {
        question: 'Which animal is the largest land animal?',
        options: ['Elephant', 'Rhino', 'Hippo'],
        correctIndex: 0,
      },
      {
        question: 'Which planet is known for its bright rings?',
        options: ['Saturn', 'Mars', 'Venus'],
        correctIndex: 0,
      },
      {
        question: 'Which animal can run the fastest among birds?',
        options: ['Ostrich', 'Penguin', 'Swan'],
        correctIndex: 0,
      },
      {
        question: 'Which ocean is the coldest?',
        options: ['Arctic Ocean', 'Atlantic Ocean', 'Pacific Ocean'],
        correctIndex: 0,
      },
      {
        question: 'Which animal is known for building dams?',
        options: ['Beaver', 'Otter', 'Seal'],
        correctIndex: 0,
      },
      {
        question: 'Which planet is called the Blue Planet?',
        options: ['Earth', 'Neptune', 'Uranus'],
        correctIndex: 0,
      },
      {
        question: 'Which animal has a trunk?',
        options: ['Elephant', 'Rhino', 'Camel'],
        correctIndex: 0,
      },
    ],
  },
  {
    level: 6,
    questions: [
      {
        question: 'Which planet is the largest in our solar system?',
        options: ['Jupiter', 'Saturn', 'Neptune'],
        correctIndex: 0,
      },
      {
        question: 'Which animal is known for having a very long neck?',
        options: ['Camel', 'Giraffe', 'Horse'],
        correctIndex: 1,
      },
      {
        question: 'Which ocean touches the west coast of North America?',
        options: ['Atlantic Ocean', 'Pacific Ocean', 'Indian Ocean'],
        correctIndex: 1,
      },
      {
        question: 'Which shape has three sides?',
        options: ['Triangle', 'Square', 'Pentagon'],
        correctIndex: 0,
      },
      {
        question: 'Which animal can sleep while standing?',
        options: ['Horse', 'Cat', 'Rabbit'],
        correctIndex: 0,
      },
      {
        question: 'Which bird is famous for its colorful tail feathers?',
        options: ['Peacock', 'Swan', 'Crow'],
        correctIndex: 0,
      },
      {
        question: 'Which natural satellite orbits Earth?',
        options: ['Mars', 'Moon', 'Venus'],
        correctIndex: 1,
      },
    ],
  },
  {
    level: 7,
    questions: [
      {
        question: 'Which animal is known for its black and white fur and eating bamboo?',
        options: ['Panda', 'Bear', 'Raccoon'],
        correctIndex: 0,
      },
      {
        question: 'Which planet is known as the evening star?',
        options: ['Venus', 'Mars', 'Saturn'],
        correctIndex: 0,
      },
      {
        question: 'Which continent is also a country?',
        options: ['Australia', 'Africa', 'Europe'],
        correctIndex: 0,
      },
      {
        question: 'Which animal is known for hopping?',
        options: ['Kangaroo', 'Wolf', 'Fox'],
        correctIndex: 0,
      },
      {
        question: 'How many days are in a leap year?',
        options: ['364', '365', '366'],
        correctIndex: 2,
      },
      {
        question: 'Which animal is famous for its shell and slow movement?',
        options: ['Tortoise', 'Lizard', 'Frog'],
        correctIndex: 0,
      },
      {
        question: 'Which ocean is between Europe and North America?',
        options: ['Pacific Ocean', 'Atlantic Ocean', 'Arctic Ocean'],
        correctIndex: 1,
      },
    ],
  },
  {
    level: 8,
    questions: [
      {
        question: 'Which animal is the largest bird in the world?',
        options: ['Ostrich', 'Eagle', 'Flamingo'],
        correctIndex: 0,
      },
      {
        question: 'Which planet is known for its strong blue color?',
        options: ['Neptune', 'Mars', 'Mercury'],
        correctIndex: 0,
      },
      {
        question: 'Which animal is famous for building large hives?',
        options: ['Bee', 'Ant', 'Wasp'],
        correctIndex: 0,
      },
      {
        question: 'Which country is known for the Great Wall?',
        options: ['Japan', 'China', 'Korea'],
        correctIndex: 1,
      },
      {
        question: 'Which animal has a very long trunk?',
        options: ['Elephant', 'Rhino', 'Hippo'],
        correctIndex: 0,
      },
      {
        question: 'Which sea creature has eight arms?',
        options: ['Octopus', 'Crab', 'Starfish'],
        correctIndex: 0,
      },
      {
        question: 'Which planet is known for its very hot surface?',
        options: ['Venus', 'Earth', 'Uranus'],
        correctIndex: 0,
      },
    ],
  },
  {
    level: 9,
    questions: [
      {
        question: 'Which animal can glide between trees?',
        options: ['Flying Squirrel', 'Monkey', 'Lemur'],
        correctIndex: 0,
      },
      {
        question: 'Which ocean is the smallest?',
        options: ['Arctic Ocean', 'Atlantic Ocean', 'Pacific Ocean'],
        correctIndex: 0,
      },
      {
        question: 'Which animal is known for its strong memory and large ears?',
        options: ['Elephant', 'Horse', 'Buffalo'],
        correctIndex: 0,
      },
      {
        question: 'Which bird is famous for delivering messages in the past?',
        options: ['Pigeon', 'Hawk', 'Crow'],
        correctIndex: 0,
      },
      {
        question: 'Which animal lives in the Arctic and has white fur?',
        options: ['Polar Bear', 'Brown Bear', 'Panda'],
        correctIndex: 0,
      },
      {
        question: 'Which planet is the farthest from the Sun?',
        options: ['Neptune', 'Saturn', 'Uranus'],
        correctIndex: 0,
      },
      {
        question: 'Which animal has a pouch for carrying its baby?',
        options: ['Kangaroo', 'Deer', 'Tiger'],
        correctIndex: 0,
      },
    ],
  },
  {
    level: 10,
    questions: [
      {
        question: 'Which animal is known for its stripes and powerful roar?',
        options: ['Tiger', 'Leopard', 'Cheetah'],
        correctIndex: 0,
      },
      {
        question: 'Which bird is famous for standing on one leg?',
        options: ['Flamingo', 'Duck', 'Eagle'],
        correctIndex: 0,
      },
      {
        question: 'Which ocean lies south of Asia?',
        options: ['Indian Ocean', 'Atlantic Ocean', 'Arctic Ocean'],
        correctIndex: 0,
      },
      {
        question: 'Which animal is known for changing colors to blend in?',
        options: ['Chameleon', 'Snake', 'Frog'],
        correctIndex: 0,
      },
      {
        question: 'Which animal is known for its long ears and fast hopping?',
        options: ['Rabbit', 'Fox', 'Cat'],
        correctIndex: 0,
      },
      {
        question: 'Which animal is famous for spinning webs?',
        options: ['Spider', 'Beetle', 'Ant'],
        correctIndex: 0,
      },
      {
        question: 'Which large animal is known for its black horns and thick skin?',
        options: ['Rhino', 'Buffalo', 'Moose'],
        correctIndex: 0,
      },
    ],
  },
  {
    level: 11,
    questions: [
      {
        question: 'Which animal is known for carrying its home on its back?',
        options: ['Snail', 'Worm', 'Frog'],
        correctIndex: 0,
      },
      {
        question: 'Which planet is famous for its large rings?',
        options: ['Jupiter', 'Saturn', 'Venus'],
        correctIndex: 1,
      },
      {
        question: 'Which bird is known for repeating sounds and words?',
        options: ['Parrot', 'Sparrow', 'Hawk'],
        correctIndex: 0,
      },
      {
        question: 'Which animal lives both on land and in water?',
        options: ['Frog', 'Camel', 'Horse'],
        correctIndex: 0,
      },
      {
        question: 'Which continent has the largest rainforest?',
        options: ['South America', 'Europe', 'Australia'],
        correctIndex: 0,
      },
      {
        question: 'Which animal is famous for its black mask around the eyes?',
        options: ['Raccoon', 'Panda', 'Otter'],
        correctIndex: 0,
      },
      {
        question: 'Which planet is called the Red Planet?',
        options: ['Mars', 'Mercury', 'Uranus'],
        correctIndex: 0,
      },
    ],
  },
  {
    level: 12,
    questions: [
      {
        question: 'Which animal is known for its long sticky tongue used to catch insects?',
        options: ['Chameleon', 'Frog', 'Lizard'],
        correctIndex: 1,
      },
      {
        question: 'Which bird cannot fly and lives in Antarctica?',
        options: ['Penguin', 'Eagle', 'Falcon'],
        correctIndex: 0,
      },
      {
        question: 'Which animal is famous for its slow movement and shell?',
        options: ['Turtle', 'Fox', 'Wolf'],
        correctIndex: 0,
      },
      {
        question: 'Which ocean is the deepest?',
        options: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean'],
        correctIndex: 0,
      },
      {
        question: 'Which animal is known for its loud howl at night?',
        options: ['Wolf', 'Dog', 'Hyena'],
        correctIndex: 0,
      },
      {
        question: 'Which planet is closest to the Sun?',
        options: ['Mercury', 'Earth', 'Mars'],
        correctIndex: 0,
      },
      {
        question: 'Which animal is known for its black and white fur pattern?',
        options: ['Panda', 'Tiger', 'Lion'],
        correctIndex: 0,
      },
    ],
  },
  {
    level: 13,
    questions: [
      {
        question: 'Which animal is famous for building dams in rivers?',
        options: ['Beaver', 'Otter', 'Seal'],
        correctIndex: 0,
      },
      {
        question: 'Which bird is known for running very fast instead of flying?',
        options: ['Ostrich', 'Crow', 'Parrot'],
        correctIndex: 0,
      },
      {
        question: 'Which animal has the longest teeth relative to its body?',
        options: ['Elephant', 'Narwhal', 'Beaver'],
        correctIndex: 2,
      },
      {
        question: 'Which planet is known as the Blue Planet?',
        options: ['Earth', 'Neptune', 'Uranus'],
        correctIndex: 0,
      },
      {
        question: 'Which animal is known for its striped orange fur?',
        options: ['Tiger', 'Leopard', 'Lynx'],
        correctIndex: 0,
      },
      {
        question: 'Which animal can inflate its body when threatened?',
        options: ['Pufferfish', 'Shark', 'Dolphin'],
        correctIndex: 0,
      },
      {
        question: 'Which animal is famous for sleeping during the winter season?',
        options: ['Bear', 'Wolf', 'Fox'],
        correctIndex: 0,
      },
    ],
  },
  {
    level: 14,
    questions: [
      {
        question: 'Which animal is known for carrying heavy loads in deserts?',
        options: ['Camel', 'Horse', 'Buffalo'],
        correctIndex: 0,
      },
      {
        question: 'Which sea creature is known for having a hard spiral shell?',
        options: ['Nautilus', 'Jellyfish', 'Squid'],
        correctIndex: 0,
      },
      {
        question: 'Which animal is famous for its powerful jump and pouch?',
        options: ['Kangaroo', 'Deer', 'Fox'],
        correctIndex: 0,
      },
      {
        question: 'Which bird is known for its pink color and standing on one leg?',
        options: ['Flamingo', 'Pelican', 'Seagull'],
        correctIndex: 0,
      },
      {
        question: 'Which animal is known for rolling into a ball when scared?',
        options: ['Hedgehog', 'Mouse', 'Squirrel'],
        correctIndex: 0,
      },
      {
        question: 'Which animal is the largest reptile in the world?',
        options: ['Crocodile', 'Lizard', 'Snake'],
        correctIndex: 0,
      },
      {
        question: 'Which animal is known for its thick armor-like shell?',
        options: ['Armadillo', 'Rabbit', 'Ferret'],
        correctIndex: 0,
      },
    ],
  },
  {
    level: 15,
    questions: [
      {
        question: 'Which animal is famous for its black and white stripes and horse-like body?',
        options: ['Zebra', 'Donkey', 'Antelope'],
        correctIndex: 0,
      },
      {
        question: 'Which animal is known for its extremely long tongue used to eat ants?',
        options: ['Anteater', 'Sloth', 'Koala'],
        correctIndex: 0,
      },
      {
        question: 'Which sea animal is known for producing pearls?',
        options: ['Oyster', 'Crab', 'Starfish'],
        correctIndex: 0,
      },
      {
        question: 'Which animal is famous for hanging upside down in trees?',
        options: ['Sloth', 'Monkey', 'Lemur'],
        correctIndex: 0,
      },
      {
        question: 'Which bird is known for its large colorful beak?',
        options: ['Toucan', 'Crow', 'Sparrow'],
        correctIndex: 0,
      },
      {
        question: 'Which animal is known for its excellent night vision and silent flight?',
        options: ['Owl', 'Eagle', 'Hawk'],
        correctIndex: 0,
      },
      {
        question: 'Which animal is famous for carrying nuts and storing them for winter?',
        options: ['Squirrel', 'Rabbit', 'Hedgehog'],
        correctIndex: 0,
      },
    ],
  },
];