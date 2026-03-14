export type MoodStory = {
  title: string;
  text: string;
};

export type MoodCategory = {
  id: 'chill' | 'energetic' | 'curious' | 'calm';
  title: string;
  stories: MoodStory[];
};

export const moodStories: MoodCategory[] = [
  {
    id: 'chill',
    title: 'Chill',
    stories: [
      {
        title: 'The Quiet Hill',
        text: `On the edge of a small town stood a gentle green hill where the wind always moved slowly and the clouds seemed to pause for a moment before drifting away. People passed by it every day, but only a few ever climbed to the top.

One afternoon, a traveler named Elias decided to sit there for a while. He had been walking all day, thinking about plans, ideas, and things he needed to finish. But when he reached the top of the hill, something changed.

The air felt calm. The grass moved softly under the breeze. Somewhere in the distance a bird sang a quiet melody.

Elias sat down and watched the clouds move across the sky. For the first time that day, he stopped thinking about what came next. He simply watched.

Minutes passed, but they felt light and easy. The world below continued its busy rhythm, yet up on the hill everything moved gently.

When Elias finally stood up to continue his journey, he felt lighter. Nothing in the world had changed—but his mind had.

And sometimes, that is all a person truly needs.`,
      },
      {
        title: 'The Lake Without Ripples',
        text: `Deep in a quiet forest there was a lake so calm that its surface looked like glass. The trees around it leaned slightly over the water, as if they too wanted to see their reflection.

People from nearby villages sometimes visited the lake, but they always spoke quietly there. Somehow, the place invited silence.

One evening, a young artist named Mira came to the lake carrying a small notebook. She wanted to draw the forest, but the peaceful stillness surprised her.

Instead of drawing immediately, she sat on a wooden log near the water.

The lake reflected the sky perfectly. A few clouds floated slowly above, mirrored in the water like soft paintings.

Mira watched the reflections for a long time. Eventually she realized she had not opened her notebook at all.

And yet she didn’t feel like she had wasted the evening.

The quiet lake had given her something better than a drawing.

It had given her a moment where nothing needed to happen.`,
      },
      {
        title: 'The Small Wooden Bench',
        text: `In a quiet park near the center of the city stood a simple wooden bench under a large maple tree. People often walked past it quickly, heading somewhere else.

But every afternoon an elderly man named Thomas would come and sit there.

He didn’t bring a book. He didn’t use a phone. He simply sat and watched the park.

Children played nearby. Leaves moved gently in the wind. Sometimes a dog ran across the path chasing a ball.

Thomas liked the bench because it reminded him of something important.

Life didn’t always need to be rushed.

Some of the best moments were the ones where you simply sat still and watched the world move.

And every day, before leaving, Thomas would smile slightly—because the quiet bench had once again given him a peaceful hour.`,
      },
      {
        title: 'The Evening Window',
        text: `Lena had a favorite place in her home: the small window beside her desk.

In the evening, golden light from the sunset always filled the room, turning the walls warm and soft.

After finishing her work each day, Lena would sit near the window with a cup of tea. She would open it slightly so the evening air could enter the room.

Outside, the city slowly became quieter.

Cars moved more slowly. Street lights began to glow. The sky shifted from orange to deep blue.

Lena didn’t try to hurry the moment.

She simply watched the colors of the sky change.

And every evening she felt the same peaceful thought:

The day had done enough.

Now it was time to rest.`,
      },
      {
        title: 'The Cloud That Stayed',
        text: `High above the fields and rivers, one small cloud moved slower than all the others.

While the wind pushed most clouds quickly across the sky, this one drifted gently, taking its time.

Below, people were busy with their daily lives—walking, working, planning tomorrow.

But the small cloud had no hurry.

It floated over forests, hills, and quiet villages. Sometimes birds flew past it. Sometimes the sun painted its edges gold.

The cloud watched the world calmly.

And though it never stopped moving entirely, it reminded the sky of something simple:

Not everything needs to move quickly to reach somewhere beautiful.`,
      },
    ],
  },
  {
    id: 'energetic',
    title: 'Energetic',
    stories: [
      {
        title: 'The Day That Would Not Sit Still',
        text: `One bright morning, the town of Larkspur woke up earlier than usual. The sun climbed quickly over the rooftops, and the streets filled with movement.

A young inventor named Oliver had been waiting for this day all week. On his workbench stood a strange little machine made from gears, springs, and colorful buttons.

Oliver pressed the red button.

The machine buzzed, rattled, and suddenly began tossing tiny glowing sparks into the air. Each spark floated upward like a tiny star.

Oliver laughed and ran outside to show his friends.

Soon the sparks drifted through the streets, bouncing lightly between buildings and trees. Children chased them. Dogs barked excitedly. Even the birds seemed to fly faster.

The town felt alive in a new way.

No one stayed still for long that day. People built things, explored new paths, and tried ideas they had been postponing.

And by evening, Oliver realized something important.

Energy is contagious.

All it takes is one spark.`,
      },
      {
        title: 'The Wind That Loved Adventures',
        text: `Far beyond the hills lived a playful wind that refused to travel slowly.

Every morning it rushed through forests, danced across rivers, and spun through fields of tall grass.

One day the wind discovered a tiny village that looked very quiet.

Too quiet.

The wind whistled through the streets, lifting hats, rattling doors, and sending leaves swirling through the air.

At first the villagers were surprised.

But soon they started laughing. Children ran after the spinning leaves. Shopkeepers opened their doors wider. Musicians brought their instruments outside.

The whole village came alive.

By sunset the wind slowed down and rested behind the hills.

Looking back at the lively village, it smiled quietly.

Sometimes the world just needs a little push to start moving again.`,
      },
      {
        title: 'The Endless Staircase',
        text: `At the edge of a bustling city stood an old tower with a staircase that seemed to go on forever.

Most people climbed only halfway before turning back.

But one afternoon a curious runner named Kai decided to climb all the way to the top.

Step after step, Kai climbed higher. The staircase twisted and turned, and the city below slowly grew smaller.

At first it felt tiring.

But something strange happened.

With every step, Kai felt more excited.

The higher he climbed, the stronger his energy became.

Soon he was racing up the stairs two at a time.

When he finally reached the top, the wind rushed past and the entire city stretched out below like a living map.

Kai laughed loudly.

The climb had not taken his energy.

It had created it.`,
      },
      {
        title: 'The Festival of Motion',
        text: `Once every year, the village of Alder Grove held a special festival.

It was not about food or music or decorations.

It was about movement.

On that day, everyone tried something active. Some people ran races across the fields. Others danced in the square. Some climbed trees, while others flew bright kites high into the sky.

Even the oldest villagers joined in.

A baker carried trays of bread while walking on stilts. A painter created colorful murals while riding a bicycle.

The entire village moved like a lively river.

By the end of the festival, everyone was tired—but smiling.

Because they had remembered something simple.

Energy grows when it is shared.`,
      },
      {
        title: 'The Lightning That Wanted to Explore',
        text: `High above the mountains, a small lightning spark once wondered what the world below looked like.

Most lightning flashes lasted only a moment before disappearing.

But this spark was curious.

One evening during a storm, it leaped from the clouds and raced across the sky.

It darted between peaks, flashed across rivers, and illuminated entire valleys for a split second.

For that brief moment, everything seemed brighter and more alive.

When the storm finally faded, the spark returned to the clouds feeling proud.

It had only lasted a moment.

But that moment had filled the sky with energy.

And sometimes, one powerful flash is all it takes to wake the world.`,
      },
    ],
  },
  {
    id: 'curious',
    title: 'Curious',
    stories: [
      {
        title: 'The Door in the Tree',
        text: `In a quiet forest where the trees grew tall and old, a young wanderer named Lio liked to explore paths that most people ignored. He believed that every trail, no matter how small, had something interesting waiting at the end.

One afternoon, while walking between twisted roots and mossy stones, Lio noticed something strange. At the base of an enormous oak tree was a tiny wooden door.

It was no bigger than a backpack.

Lio knelt down and examined it. The door had no handle, only a small round carving that looked like a spiral.

“Who would build a door inside a tree?” he wondered.

Curiosity slowly replaced hesitation. Lio gently pushed the door.

It creaked open.

Inside was not darkness, but a warm golden glow. The tree was hollow and filled with tiny shelves, each holding curious objects—feathers of strange colors, small bottles of glowing dust, and maps drawn on leaves.

Someone had turned the inside of the tree into a tiny library of discoveries.

Lio spent the entire afternoon exploring the little room.

And as he left the forest later that day, he realized something wonderful:

Curiosity had opened a door that most people would have walked past.`,
      },
      {
        title: 'The Floating Lantern',
        text: `One evening, a girl named Arin was walking along the riverbank when she noticed something drifting slowly down the water.

It was a lantern.

But unlike ordinary lanterns, this one floated above the surface instead of touching it. Its warm light shimmered softly on the water.

Arin followed it.

The lantern drifted under bridges, past quiet houses, and through tall reeds that whispered in the wind.

Every time Arin thought it might disappear, the lantern brightened slightly, almost as if inviting her to continue.

Finally, the lantern stopped near a small wooden dock that Arin had never noticed before.

On the dock stood a tiny telescope pointing toward the stars.

Arin looked up.

The sky was full of constellations she had never taken the time to notice before.

That night she stayed there for hours, watching the sky slowly move.

And the floating lantern, its quiet guide, slowly faded once it had shown her where to look.`,
      },
      {
        title: 'The Library Without Books',
        text: `At the edge of a busy town stood a mysterious building called The Listening House.

People called it a library, but when visitors entered, they discovered something unusual.

There were no books.

Instead, the rooms were filled with strange objects: seashells, old compasses, glass jars with swirling colors, and stones polished smooth by the ocean.

Each object had a small note beside it that simply said:

“Pick it up. Ask a question.”

Visitors would choose an object and wonder about it.

Where did it come from?
Who found it?
What story did it carry?

The more questions they asked, the more they imagined, explored, and searched for answers.

One boy named Theo spent an entire afternoon there.

When he finally left, he laughed softly.

It wasn’t a library of answers.

It was a library of curiosity.`,
      },
      {
        title: 'The Star That Moved',
        text: `Late one night, a young mapmaker named Sora noticed something strange while studying the sky.

One star was moving.

At first, she thought her eyes were tired. But night after night, the same star shifted slightly across the sky.

Curious, Sora began marking its position on her maps.

Soon she realized the star was following a path.

It traveled above mountains, rivers, and distant deserts before slowly circling back again.

Sora spent weeks studying the mysterious star.

Eventually she discovered it wasn’t a star at all, but a distant satellite reflecting sunlight as it passed overhead.

But instead of feeling disappointed, Sora smiled.

Because the moving star had led her to learn something new about the sky.

Sometimes curiosity turns mystery into knowledge.`,
      },
      {
        title: 'The Path That Was Not on the Map',
        text: `Deep in a valley surrounded by mist, a traveler named Elen studied an old map that showed every road in the region.

Or at least, that’s what the map claimed.

While walking through the valley, Elen noticed a narrow path winding between two hills. But when she checked her map, the path wasn’t there.

That made her curious.

Most travelers would ignore a path not shown on a map.

But Elen decided to follow it.

The trail led through fields of wildflowers, over small wooden bridges, and finally to a quiet clearing where a waterfall spilled into a crystal pool.

It was one of the most beautiful places Elen had ever seen.

Later, she carefully added the path to her map.

And beside it she wrote a small note:

“Found by curiosity.”`,
      },
    ],
  },
  {
    id: 'calm',
    title: 'Calm',
    stories: [
      {
        title: 'The Quiet Garden',
        text: `Behind an old stone wall at the edge of a peaceful town grew a hidden garden that very few people knew about. Tall trees surrounded it, their branches gently swaying in the wind, while soft green grass covered the ground like a calm ocean.

A young woman named Elira discovered the garden one afternoon while walking through a narrow alley. A small wooden gate stood slightly open, and curiosity guided her inside.

The moment she stepped through the gate, the sounds of the busy town faded.

Inside the garden everything moved slowly. Bees hummed softly between flowers, leaves rustled quietly above, and a small fountain trickled water into a round stone basin.

Elira sat on a wooden bench and watched the sunlight move through the branches. Time seemed to stretch in a gentle way, like the slow drifting of clouds.

For a while, nothing happened.

And that was exactly what made the place special.

When Elira finally left the garden, she carried with her a quiet feeling that stayed long after she returned to the town’s busy streets.`,
      },
      {
        title: 'The Boat on the Lake',
        text: `In a valley surrounded by soft hills lay a calm blue lake that reflected the sky like a mirror.

Every evening, a small wooden boat drifted slowly across its surface. The boat belonged to an old fisherman named Aron, but he rarely used it for fishing anymore.

Instead, Aron liked to sit quietly in the middle of the lake and watch the sunset.

One evening, a traveler passing through the valley asked if she could join him on the boat.

Aron nodded and pushed the boat gently away from the shore.

They floated slowly across the water as the sky changed colors—gold, orange, and soft violet.

Neither of them spoke much.

The lake itself seemed to encourage silence.

When the sun finally disappeared behind the hills, the traveler smiled softly.

Some journeys, she realized, are not about reaching a place.

They are about drifting peacefully for a while.`,
      },
      {
        title: 'The Slow River',
        text: `A small river flowed through a wide meadow where tall grass danced quietly in the breeze.

Unlike the fast rivers in the mountains, this river moved slowly and calmly, winding its way through the land without any hurry.

Near its banks lived a boy named Tomas who often visited the river after a long day.

He liked to sit on a flat stone and watch the water pass by.

Sometimes leaves floated down the river like tiny boats. Sometimes a dragonfly skimmed the surface before disappearing into the reeds.

Tomas never tried to rush the river.

Instead, he watched how patiently it traveled, turning gently around stones and bending around curves in the land.

The river seemed to know something important:

Moving slowly does not mean moving without purpose.`,
      },
      {
        title: 'The Evening Light',
        text: `In a small village between the mountains stood a cottage with a wide window facing west.

Every evening, warm sunlight poured through that window, filling the room with a golden glow.

Inside lived a painter named Mira.

But instead of painting during the day, Mira preferred to sit quietly in the evening light.

She would place her brushes on the table and simply watch the colors of the sky change.

The mountains slowly darkened, the sky softened into pale blues and purples, and the first stars appeared.

Those quiet moments often inspired her more than hours of work.

Because sometimes creativity begins not with action, but with stillness.`,
      },
      {
        title: 'The Hill of Soft Wind',
        text: `Beyond a wide field stood a gentle hill where the wind always moved softly.

People from nearby villages sometimes climbed the hill when they needed a quiet place to think.

At the top grew a single large tree whose branches spread wide across the sky.

One afternoon, a traveler named Loran arrived there after many days on the road.

He placed his bag beneath the tree and lay down in the grass.

Above him, clouds moved slowly across the blue sky.

The wind carried the distant sound of birds and the faint scent of wildflowers.

Loran closed his eyes for a moment.

When he opened them again, the sun had moved slightly lower in the sky.

Yet he felt completely refreshed.

The hill had given him something simple but powerful:

A moment of calm in a moving world.`,
      },
    ],
  },
];