// Article series: "Student → Engineer" — practical, non-technical career guidance
// by Rany Boy Templado. Rendered by the Articles section and its reader modal.
//
// Each article body is an ordered list of blocks the reader renders:
//   { type: 'p',        text }                     paragraph
//   { type: 'h',        text }                     sub-heading
//   { type: 'callout',  text }                     highlighted key-takeaway / note
//   { type: 'list',     items: [] }                bullet list
//   { type: 'next',     text }                     "next in series" footer line

export const articleCategories = [
  { id: 'all', label: 'All Articles' },
  { id: 'career', label: 'Career Growth' },
  { id: 'community', label: 'Community' },
  { id: 'mentorship', label: 'Mentorship' },
  { id: 'mindset', label: 'Mindset' },
]

export const articles = [
  {
    id: 1,
    number: '01',
    title: 'The "Unspoken" Skills That Turn CS Students Into Hirable Engineers',
    category: 'career',
    categoryLabel: 'Career Growth / Advice',
    readTime: '5 min read',
    featured: true,
    takeaway:
      'Your degree proves you can learn. Your ability to communicate clearly, ask structured questions, and act on gaps is what proves you can be trusted with real systems.',
    excerpt:
      'School measures correct answers. Industry measures whether people can rely on you without babysitting. The four skills nobody graded me on mattered most.',
    body: [
      { type: 'p', text: 'School measures you on correct answers. Industry measures you on something quieter: can other people rely on you without babysitting you? I learned this the slow way—moving from support and data operations into SAP data migration, where a single misread requirement can push bad records into a production ledger. The code was rarely the hard part. The skills nobody graded me on were.' },
      { type: 'p', text: 'Here are the four that moved the needle most.' },
      { type: 'h', text: '1. Write so people don\u2019t have to ask' },
      { type: 'p', text: 'In a team, your writing is your interface. A vague README, a one-line "fixed it" ticket update, a pull request with no description—each one forces a teammate to stop their work and come find you. Multiply that across a sprint and you\u2019ve become a bottleneck without touching a keyboard.' },
      { type: 'list', items: [
        'READMEs that answer "how do I run this and what breaks it," not just "what it is."',
        'Ticket updates that state what you did, what\u2019s left, and what you\u2019re blocked on—so a lead can plan without a meeting.',
        'Pull requests that explain why the change exists, not just what changed. The diff already shows the what.',
      ] },
      { type: 'p', text: 'You don\u2019t need to be a good writer. You need to be a clear one. Short sentences. Concrete nouns. No mystery.' },
      { type: 'h', text: '2. The 30-minute rule for asking questions' },
      { type: 'p', text: 'Juniors get stuck between asking too soon (looking helpless) and asking too late (burning a day on something a senior could unblock in two minutes). The rule I give anyone I mentor: struggle productively for 30 minutes, then ask—but ask a structured question.' },
      { type: 'list', items: [
        'What I\u2019m trying to do.',
        'What I tried.',
        'What happened (the actual error or behavior).',
        'My best guess at the cause.',
      ] },
      { type: 'p', text: '"It\u2019s not working, can you help?" versus "I\u2019m mapping legacy customer records into the target structure; the load rejects rows with blank postal codes, and I think the target field is non-nullable—is that right?" The second respects everyone\u2019s time and, half the time, answers itself as you write it.' },
      { type: 'h', text: '3. Treat ambiguous requirements as the job' },
      { type: 'p', text: 'In school the rubric tells you what "done" means. In industry, requirements arrive half-formed or assumed-obvious by someone who\u2019s lived with the system for years. The move is to make your assumptions visible before you build on them: write down how you read the request, list the decisions you made, and send it back as a short "here\u2019s how I\u2019m reading this—correct me if I\u2019m off." You turn a guess into a checkpoint.' },
      { type: 'h', text: '4. Own the gaps nobody assigned' },
      { type: 'p', text: 'Every real project has holes: a flaky setup step, missing docs, a manual process everyone grumbles about but no one owns. The engineers who get trusted with bigger things are the ones who quietly close those gaps. It\u2019s not about doing extra—it\u2019s about demonstrating you see the system, not just your ticket. That\u2019s the shift from "student who completes tasks" to "engineer who improves things."' },
      { type: 'callout', text: 'The through-line: none of these are technical skills, all of them are engineering skills, and they share one root—reducing the load you put on the people around you.' },
      { type: 'next', text: 'Next: Building Network Equity—why joining tech communities and virtual meetups accelerates your growth.' },
    ],
  },
  {
    id: 2,
    number: '02',
    title: 'Building Network Equity: Why Joining Tech Communities & Virtual Meetups Accelerates Your Growth',
    category: 'community',
    categoryLabel: 'Community / Networking',
    readTime: '4 min read',
    featured: false,
    takeaway:
      'Skills compound in private. Network equity compounds in public. Build both before graduation—the network takes years to mature and you can\u2019t cram it later.',
    excerpt:
      'There\u2019s a value you can\u2019t code your way into alone: knowing people, being known, and sensing where the industry is heading. It rewards early deposits.',
    body: [
      { type: 'p', text: 'There\u2019s a kind of value you can\u2019t code your way into alone: knowing people, being known, and having a sense of where the industry is actually heading. I call it network equity—and like financial equity, it grows slowly, rewards early deposits, and is nearly impossible to build overnight when you suddenly need it.' },
      { type: 'p', text: 'Most students start building it the week they begin job hunting. That\u2019s years too late.' },
      { type: 'h', text: 'Communities teach the part solo study can\u2019t' },
      { type: 'p', text: 'You can learn syntax from a screen. You cannot learn collaboration from a screen. Clubs, hackathons, and meetups put you in the one environment school rarely simulates well: building something with people who don\u2019t share your brain.' },
      { type: 'list', items: [
        'Splitting work when no one assigned the split.',
        'Merging two people\u2019s code and resolving the mess.',
        'Explaining your idea fast enough that a teammate can run with it.',
        'Disagreeing on an approach and resolving it without the project stalling.',
      ] },
      { type: 'p', text: 'A hackathon weekend teaches more about collaboration under constraint than a semester of solo assignments. "Limited time, imperfect information, make it work" is the actual job.' },
      { type: 'h', text: 'Staying current without drowning' },
      { type: 'p', text: 'The field moves faster than any curriculum. In a good meetup or Discord you absorb—passively, over time—what tools teams actually reach for, which "hot" technologies are hype, and what problems people are genuinely fighting. You don\u2019t need to chase every trend; you need a feed of reality, and communities are the cheapest one available.' },
      { type: 'h', text: 'Network equity: the slow-compounding asset' },
      { type: 'p', text: 'The people who help you most are rarely the ones you met because you needed help. They\u2019re the ones you\u2019d known for a while. When a referral or opportunity shows up, it flows along relationships that already exist—which is exactly why you deposit early.' },
      { type: 'list', items: [
        'Show up consistently to one community, not sporadically to five.',
        'Be useful before you\u2019re needy—answer a question, share a resource, help at an event.',
        'Follow up. A single good conversation that\u2019s never continued is a dropped connection.',
      ] },
      { type: 'callout', text: 'Consistency beats intensity. A small, real presence over two years outperforms a frantic burst of LinkedIn requests the month before you graduate.' },
      { type: 'h', text: 'Philippine communities worth joining' },
      { type: 'p', text: 'You don\u2019t have to look far. These are active Filipino tech communities I\u2019d point any student toward—covering web, cloud, data, and developer tooling. Pick one that matches where you want to grow and show up consistently.' },
      { type: 'links', items: [
        { label: 'FWDP \u2014 Filipino Web Developers', note: 'Web development community', url: 'https://www.facebook.com/fwdpeers' },
        { label: 'GDG Cloud Manila', note: 'Google Developer Group \u00b7 cloud & dev', url: 'https://www.facebook.com/gdgcloudmanila' },
        { label: 'AWS User Group Philippines', note: 'AWS cloud community', url: 'https://www.facebook.com/awsugph' },
        { label: 'AWS Cloud Club (Student)', note: 'Student cloud community', url: 'https://www.facebook.com/groups/980298767865372' },
        { label: 'Data Engineering Pilipinas', note: 'Data engineering community', url: 'https://www.facebook.com/DataEngineeringPilipinas' },
        { label: 'Kiro Community', note: 'Developer tooling & agentic AI', url: 'https://www.facebook.com/kirocommunity' },
      ] },
      { type: 'next', text: 'Next: Seeking Mentors Early—how feedback loops shorten your learning curve.' },
    ],
  },
  {
    id: 3,
    number: '03',
    title: 'Seeking Mentors Early: How Feedback Loops Shorten Your Learning Curve in Engineering',
    category: 'mentorship',
    categoryLabel: 'Mentorship / Personal Development',
    readTime: '4 min read',
    featured: false,
    takeaway:
      'You can learn alone, but slowly and crookedly. A mentor\u2019s feedback loop corrects your direction before you\u2019ve walked a mile the wrong way.',
    excerpt:
      'Learning to build without feedback is like practicing a sport with your eyes closed. You get stronger—and quietly reinforce bad form you won\u2019t notice until it costs you.',
    body: [
      { type: 'p', text: 'Learning to build software without feedback is like practicing a sport with your eyes closed. You\u2019ll get stronger, but you\u2019ll also quietly reinforce bad form—and you won\u2019t know until it costs you. A mentor isn\u2019t someone who hands you answers. A mentor shortens the distance between a mistake and noticing it.' },
      { type: 'h', text: 'Why the loop matters more than the lesson' },
      { type: 'p', text: 'Any concept you need is online. Information isn\u2019t the bottleneck—correction is. Left alone, you might spend three weeks writing code a certain way, convinced it\u2019s fine, until it breaks or a reviewer winces. A mentor compresses those three weeks into a two-minute "don\u2019t do it that way, here\u2019s why." Multiply that across hundreds of small decisions and two engineers with identical talent diverge enormously based purely on how tight their feedback loops are.' },
      { type: 'h', text: 'From "passes the tests" to "clean and maintainable"' },
      { type: 'p', text: 'School rewards code that produces the right output. Industry needs code the next person can read, change, and trust six months later. That gap is invisible from the inside. A senior reviewing your work sees what you can\u2019t:' },
      { type: 'list', items: [
        'The clever shortcut that\u2019ll confuse everyone who touches it later.',
        'The missing error handling for the input you assumed would never happen.',
        'The structure that works now but won\u2019t survive the next requirement.',
      ] },
      { type: 'p', text: '"It passes" and "it\u2019s good" are different claims. Only someone with more scars than you can reliably tell you which one you\u2019ve achieved.' },
      { type: 'h', text: 'Mentors give direction, not just correction' },
      { type: 'p', text: 'Beyond code, mentors answer questions you don\u2019t know to ask. Which skills are worth your limited time? Is this role a launchpad or a dead end? Is this frustration normal? Someone who has walked your path sees the map you\u2019re still drawing. Correction improves your current step; direction improves which path you\u2019re on.' },
      { type: 'h', text: 'Where to find them' },
      { type: 'list', items: [
        'Senior engineers who answer your well-formed questions.',
        'Community leads running the meetup or Discord you already attend.',
        'Upperclassmen one or two years ahead—close enough to remember your exact struggles.',
      ] },
      { type: 'callout', text: 'Be worth mentoring: do the 30 minutes of trying first, ask structured questions, and act on advice then report back. Nobody invests in someone who doesn\u2019t use the investment.' },
      { type: 'next', text: 'Next: Burnout, Imposter Syndrome, and the Tech Journey—what they don\u2019t teach in college.' },
    ],
  },
  {
    id: 4,
    number: '04',
    title: 'Burnout, Imposter Syndrome, and the Tech Journey: What They Don\u2019t Teach in College',
    category: 'mindset',
    categoryLabel: 'Mindset / Career Strategy',
    readTime: '4 min read',
    featured: false,
    takeaway:
      'The technical path has a psychological cost nobody puts on the syllabus. Managing your pace and your head isn\u2019t soft—it\u2019s the discipline that keeps you in the game long enough to get good.',
    excerpt:
      'Curriculums cover algorithms. They skip the quiet stuff that ends careers early: the comparison spiral, the feeling you don\u2019t belong, and the grind that burns people out.',
    body: [
      { type: 'p', text: 'Curriculums cover data structures, algorithms, and system design. They don\u2019t cover the quiet stuff that actually ends careers early: the comparison spiral, the feeling that you don\u2019t belong, and the slow grind that burns people out before they reach their potential. I\u2019ve felt all three. So has every engineer I respect.' },
      { type: 'h', text: 'Stop running the comparison race on LinkedIn' },
      { type: 'p', text: 'Someone your age just posted a FAANG offer. Someone else shipped a side project with thousands of stars. Scroll long enough and the conclusion feels inevitable: everyone is ahead of me. But the feed is a highlight reel, not a timeline. You\u2019re comparing your unedited behind-the-scenes against everyone else\u2019s curated wins. The only honest comparison is you versus you three months ago.' },
      { type: 'h', text: 'Imposter syndrome is a side effect of growth' },
      { type: 'p', text: 'That sense you\u2019re a fraud about to be found out doesn\u2019t mean you\u2019re unqualified. It usually means you\u2019re aware of how much you don\u2019t know—a sign you\u2019re learning the real contours of the field.' },
      { type: 'list', items: [
        'Reframe the feeling: "I don\u2019t know enough" is the normal sensation of operating at the edge of your ability—exactly where growth happens.',
        'Keep a record of what you\u2019ve solved. Imposter syndrome has amnesia; a running list of wins is a factual counterweight to a feeling that lies.',
      ] },
      { type: 'h', text: 'Burnout: treating a marathon like a sprint' },
      { type: 'p', text: 'Burnout rarely comes from one hard week. It comes from running at sprint pace on a road with no finish line, until even things you loved feel like lead. Sustainable pace isn\u2019t laziness—it\u2019s engineering discipline applied to yourself.' },
      { type: 'list', items: [
        'Rest is part of the work, not a reward you earn after it.',
        'Consistency beats intensity—steady most days for a year crushes heroic all-nighters.',
        'Protect the off switch. If you can\u2019t stop thinking about work, you\u2019re closer to the edge, not more dedicated.',
      ] },
      { type: 'callout', text: 'Your biggest limiter won\u2019t be your intelligence—it\u2019ll be whether you keep a steady head and sustainable pace while comparison, self-doubt, and the grind try to knock you off course.' },
      { type: 'next', text: 'Next: From Classroom to Industry—building a proactive growth mindset before graduation.' },
    ],
  },
  {
    id: 5,
    number: '05',
    title: 'From Classroom to Industry: Building a Proactive Growth Mindset Before Graduation',
    category: 'mindset',
    categoryLabel: 'Professional Growth / Mindset',
    readTime: '3 min read',
    featured: false,
    takeaway:
      'School trains you to wait for instructions and meet them. Industry rewards the opposite. The students who adapt fastest start acting like owners before anyone hands them ownership.',
    excerpt:
      'The hardest adjustment from student to engineer isn\u2019t technical. It\u2019s the mindset flip school quietly trains out of you: from reacting to requirements to owning outcomes.',
    body: [
      { type: 'p', text: 'The hardest adjustment from student to engineer isn\u2019t technical. It\u2019s a mindset flip school spends years quietly training out of you: the shift from reacting to requirements to taking ownership of outcomes. The good news is you can start practicing it before you graduate, with the work already in front of you.' },
      { type: 'h', text: 'Stop waiting for the rubric' },
      { type: 'p', text: 'School runs on rubrics—exact criteria, meet them, get the grade. It accidentally teaches you to do nothing until someone defines "done." Industry has no rubric; the engineers who thrive define the target themselves and move. On your next project, don\u2019t just satisfy the assignment—ask who would use this, what breaks it, what would make it genuinely good, and build toward that.' },
      { type: 'h', text: 'Own your learning' },
      { type: 'p', text: 'A proactive mindset treats your education as yours to drive. Curriculum is a floor, not a ceiling.' },
      { type: 'list', items: [
        'Notice a gap in what you know and close it without being assigned to.',
        'Chase the "why does this actually work" past where the course stops.',
        'Pick up the tool or concept you keep hearing about in communities.',
      ] },
      { type: 'h', text: 'Ask smart questions' },
      { type: 'p', text: 'Proactive people don\u2019t ask fewer questions—they ask better ones. "How do I even start this?" offloads your thinking onto someone else. "I\u2019ve got the first part working but I\u2019m unsure whether this will scale—is there a better pattern?" invites a conversation between people who are both thinking.' },
      { type: 'h', text: 'Turn failures into portfolio stories' },
      { type: 'p', text: 'A project that broke, taught you something, and got fixed is worth more than one that worked on the first try. The working one proves you follow instructions; the broken-then-fixed one proves you can diagnose, adapt, and recover—which is most of what engineering is.' },
      { type: 'list', items: [
        'When something fails, capture what broke, why, and how you solved it.',
        'Those become the stories that make interviews real—evidence of judgment, not a list of technologies.',
      ] },
      { type: 'callout', text: 'You don\u2019t become a professional the day you\u2019re hired. You become one the day you start acting like the outcome is yours to own. Start before graduation—the title catches up to the mindset.' },
      { type: 'next', text: 'Series complete. Thanks for reading. \u2014 Rany Boy Templado' },
    ],
  },
]
