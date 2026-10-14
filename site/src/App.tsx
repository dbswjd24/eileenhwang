import { useCallback, useEffect, useRef, useState } from "react";

const img = (file: string) => `${import.meta.env.BASE_URL}img/${file}`;

type Category = "Product & design" | "Engineering" | "Designathon" | "Hackathon";

type Sprint = {
  event: string;
  team?: string;
  hmw: string;
  context: string;
  research: {
    label?: string;
    method: string;
    stats?: { value: string; label: string }[];
    images?: string[];
  };
  insights: string[];
  insightsLabel?: string;
  solutions: { insight: string; solution: string; detail: string; image?: string }[];
  solutionsLabel?: string;
  reflection?: string;
  reflectionLabel?: string;
};

type Project = {
  id: string;
  title: string;
  category: Category;
  year: string;
  role: string;
  summary: string;
  stats?: { value: string; label: string }[];
  cover: string;
  tone: "blue" | "coral" | "acid" | "lilac" | "ink";
  link?: { label: string; href: string };
  storeLink?: { label: string; href?: string };
  tags: string[];
  sprint: Sprint;
};

const projects: Project[] = [
  {
    id: "unetic",
    title: "Unetic, one home for every campus club",
    category: "Product & design",
    year: "2024 · Acquired",
    role: "Co-founder · Product & full-stack",
    summary:
      "A campus platform I co-founded that centralizes verified club information, so Berkeley students can discover, join, and engage with clubs without the friction. It grew to 3,000+ active students and was acquired by Sideshift.",
    stats: [
      { value: "3,000+", label: "active student users" },
      { value: "+50%", label: "engagement from iterative launches" },
      { value: "1st", label: "Korean Startup Competition" },
    ],
    cover: "unetic.png",
    tone: "blue",
    link: { label: "Visit unetic.org", href: "https://unetic.org" },
    tags: ["Product management", "User research", "UI/UX", "Full-stack"],
    sprint: {
      event: "Co-founder · Feb – Dec 2024 · Acquired by Sideshift",
      hmw: "How might we help students find the right campus club, and trust what they find, without digging through scattered sources?",
      context:
        "Club information lived across flyers, group chats, and outdated pages. Students struggled to find organizations that matched their interests, and club leaders had no single place to recruit, manage members, and communicate. Because anyone could post anything, trust was part of the problem too.",
      research: {
        method:
          "As a Golden Bear Orientation (GBO) leader, I surveyed incoming freshmen and transfer students at Berkeley about how they find and join clubs. I followed up with usability testing, user interviews, and journey mapping to find the biggest pain points, then iterated on multiple prototypes using their feedback.",
        stats: [
          { value: "80%", label: "of freshmen and transfers didn’t know what to look for, because club resources were scattered everywhere" },
        ],
      },
      insights: [
        "New students had no single place to start, so most of them didn’t know what to look for.",
        "Students looked for clubs by interest, workload, and fit. Long lists of club names overwhelmed them.",
        "Club operations (recruiting, membership, communication) were split across too many tools for leaders to keep up.",
        "Verification mattered: students needed confidence that clubs and members were real before engaging.",
      ],
      solutions: [
        {
          insight: "Students search by interest and fit",
          solution: "Club search with smart filters",
          detail: "Filter clubs by category, acceptance rate, interview status, roles, and workload, with detailed profiles showing preferred skills and contacts.",
          image: "unetic1.png",
        },
        {
          insight: "Club operations are scattered",
          solution: "Centralized club management",
          detail: "One platform for recruiting, member management, and communication, so leaders can focus on growing their community.",
        },
        {
          insight: "Students need to trust what they see",
          solution: "Student membership verification",
          detail: "Only verified Berkeley students can access and manage club information, keeping the community secure and trustworthy.",
        },
      ],
      reflectionLabel: "Outcome",
      reflection:
        "Unetic grew to 3,000+ active student users, and engagement rose 50% through iterative feature launches and continuous user feedback. Working with engineers, designers, and student stakeholders, I defined success metrics and sequenced releases by user impact and technical feasibility. Unetic placed 1st in the Korean Startup Competition and was acquired by Sideshift.",
    },
  },  {
    id: "audiolens",
    title: "AudioLens, YouTube tracklists to Spotify in one click",
    category: "Engineering",
    year: "2026",
    role: "Solo builder",
    summary:
      "A Chrome extension that detects timestamped tracklists in YouTube videos and turns them into Spotify playlists. If there’s no tracklist in the description, you can paste one in.",
    stats: [{ value: "EN + KR", label: "tracklist formats supported" }],
    cover: "audiolens.png",
    tone: "acid",
    link: { label: "View on GitHub", href: "https://github.com/dbswjd24/audiolens" },
    storeLink: { label: "Chrome Web Store" },
    tags: ["Chrome extension", "Spotify API", "OAuth", "JavaScript"],
    sprint: {
      event: "Personal project · Chrome extension",
      hmw: "How might we turn a tracklist buried in a YouTube video into a Spotify playlist, without searching for every song by hand?",
      context:
        "YouTube is one of the biggest places people discover music. DJ sets and curated mixes often list every song in the description, but saving them to Spotify means searching for each track one by one. When the tracklist lives in a comment or on a blog, it’s even harder.",
      research: {
        label: "Explore",
        method:
          "I mapped where tracklists actually live: timestamped YouTube descriptions, pinned comments, blog posts, and lists copied from Korean music apps like Melon, Genie, Bugs, and Flo.",
      },
      insights: [
        "Reading the video description directly is the fastest and most accurate path, so it should come first.",
        "Tracklists come in at least three formats, and Korean music apps put title and artist on separate lines with no separator.",
        "Artist and title order is often ambiguous, so the parser will never be perfect and users need an easy way to fix it.",
      ],
      insightsLabel: "What I learned",
      solutionsLabel: "Key decisions",
      solutions: [
        {
          insight: "Descriptions are the most reliable source",
          solution: "Scrape first, paste as fallback",
          detail: "A scraper reads the YouTube description automatically. When there’s no tracklist there, you can paste one from anywhere: timestamps, numbered lists, or plain lines all work.",
        },
        {
          insight: "Korean apps split title and artist",
          solution: "Two-line parser mode",
          detail: "A heuristic spots trailing durations on alternating lines and switches the parser into title/artist pair mode automatically.",
        },
        {
          insight: "Parsed order can be wrong",
          solution: "Editable rows with a swap button",
          detail: "Every row is editable with a ⇄ swap, which makes the extension robust without over-engineering the parser.",
        },
        {
          insight: "Spotify deprecated implicit grant",
          solution: "PKCE OAuth login",
          detail: "Secure sign-in without storing a client secret or exposing tokens in the URL.",
        },
      ],
      reflection:
        "I also tried reading tracklists from screenshots with OCR, but Manifest V3’s security rules made it unreliable, so I shipped copy and paste as the fallback instead. Same with the parser: once I added the swap button, I stopped trying to make it perfect. Letting people fix a row is faster than guessing right every time.",
    },
  },  {
    id: "filmedhere",
    title: "Filmed Here, the real places behind the screen",
    category: "Engineering",
    year: "2026",
    role: "Solo builder",
    summary:
      "An interactive map of real filming locations from movies and TV. Click a pin to see the poster, cast, rating, and the exact scene shot there.",
    stats: [{ value: "34", label: "hand-verified filming locations" }],
    cover: "filmedhere.jpg",
    tone: "ink",
    link: { label: "Visit the site", href: "https://filmed-here.vercel.app" },
    tags: ["Next.js", "Mapbox GL", "TMDB API", "TypeScript"],
    sprint: {
      event: "Personal project · Web app",
      hmw: "How might we let fans discover the real-world places behind their favorite movies and shows, and know exactly what was filmed there?",
      context:
        "Fans love visiting places they’ve seen on screen, from Full House’s Painted Ladies to Harry Potter’s Alnwick Castle. But filming location data online is scattered and inconsistent, and an address alone doesn’t tell you which scene you’re standing in.",
      research: {
        label: "Explore",
        method:
          "I first tried pulling filming locations from Wikidata with SPARQL queries to see whether live data could power the map.",
      },
      insights: [
        "Open data was too inconsistent for a good experience, with missing coordinates and vague or wrong locations.",
        "An address isn’t that exciting on its own. Fans want to know which scene happened where they’re standing.",
        "Discovery feels personal when it’s local. Learning your own city was in a movie is the hook.",
      ],
      insightsLabel: "What I learned",
      solutionsLabel: "Key decisions",
      solutions: [
        {
          insight: "Open data is unreliable",
          solution: "A hand-curated dataset",
          detail: "34 verified locations across six continents, stored as typed static data with coordinates and a TMDB lookup title.",
        },
        {
          insight: "Fans want the scene",
          solution: "Authored scene descriptions",
          detail: "Every pin describes the exact scene filmed there, paired with live poster, cast, and rating data from TMDB.",
        },
        {
          insight: "Local discovery is the hook",
          solution: "Filmed Near Me",
          detail: "Geolocation filters the map to filming spots within 100 km, plus search and saved favorites.",
        },
      ],
    },
  },  {
    id: "clearcollab",
    title: "ClearCollab, lowering the stakes of speaking up",
    category: "Designathon",
    year: "2025",
    role: "UI/UX designer",
    summary:
      "A GoodNotes Classroom concept that reduces participation anxiety for students and tool complexity for teachers.",
    cover: "goodnotes.png",
    tone: "lilac",
    tags: ["Invention Corps × GoodNotes", "User research", "Product strategy", "EdTech"],
    sprint: {
      event: "Invention Corps of Berkeley Designathon · sponsored by GoodNotes · Apr 2025",
      hmw: "How might we help students ask questions bravely and teachers lead digital collaboration confidently, without making the classroom more complicated?",
      context:
        "In many classrooms, students hesitate to ask questions out of fear of judgment, while teachers, especially those less comfortable with technology, struggle to manage digital collaboration without feeling overwhelmed. We saw one shared pain point with two sides, so any solution had to work for both.",
      research: {
        method:
          "We ran a survey on classroom collaboration (15 respondents), then gathered written testimonies to hear the problem in their own words.",
        stats: [
          { value: "60%", label: "named fear of asking questions as a key challenge" },
          { value: "55%", label: "said a private way to ask is essential" },
          { value: "40%", label: "asked for easier-to-use tech" },
        ],
        images: ["user1.png", "user2.png"],
      },
      insights: [
        "Fear of asking came up most among first-gen and neurodivergent students. They had questions and didn’t want to be seen asking them.",
        "A teacher told us, “I don’t know how to use the computer and often ask my children for help.” Any new tool had to teach itself.",
        "Students asked for anonymous questions and polls directly, which validated a low-exposure way to participate.",
      ],
      solutions: [
        {
          insight: "Students fear being judged in front of peers",
          solution: "Anonymous question submission",
          detail: "Students submit questions privately from their notes, with an optional anonymous toggle, so asking costs nothing socially.",
          image: "sol1.png",
        },
        {
          insight: "Teachers can’t triage dozens of questions live",
          solution: "AI question grouping",
          detail: "Similar questions cluster into groups such as “Confusion about Step 2 · 5 questions,” so teachers can address the pattern once.",
          image: "sol2.png",
        },
        {
          insight: "Tech-hesitant teachers avoid new features",
          solution: "In-context AI Help Assistant",
          detail: "Guided prompts answer “how do I…” questions inside GoodNotes, so teachers learn the tool while they use it.",
          image: "sol4.png",
        },
      ],
    },
  },
  {
    id: "food",
    title: "Food For Thought, mindful ordering with DoorDash",
    category: "Designathon",
    year: "2023",
    role: "UI/UX designer",
    summary:
      "Helping college students notice emotional and impulsive eating patterns without disrupting how they already order.",
    cover: "food.png",
    tone: "coral",
    tags: ["Design@Berkeley × DoorDash", "Health & wellness", "UI/UX", "Product strategy"],
    sprint: {
      event: "Design@Berkeley × UX@Berkeley Designathon · sponsored by DoorDash · Nov 2023",
      team: "Eileen Hwang, Sara Hui, Sophie Yoo, Rupinder Dhaliwal",
      hmw: "How might we help college students become more conscious of their eating habits without disrupting how they already order on DoorDash?",
      context:
        "College students rely on delivery between classes, clubs, and late nights, and stress often drives what they order. DoorDash makes ordering effortless, but nothing in the experience helps students step back and notice their patterns. We didn’t want to slow down checkout, so anything we added had to sit outside the ordering flow.",
      research: {
        method:
          "We built personas to capture two very different relationships college students have with food delivery.",
        images: ["food1.png", "food2.png"],
      },
      insights: [
        "Kristin, a busy freshman, wants nutritional value and a way to plan ahead, but dining-hall food leaves her bloated and late-night junk food is the default.",
        "Wade, a senior, eats emotionally as his mood shifts and has no way to look back on his indulgent cycles.",
        "Both want balanced food on a student budget, and neither had an easy way to see their own habits.",
      ],
      solutions: [
        {
          insight: "No way to look back on eating patterns",
          solution: "Dash Recap",
          detail: "A Spotify Wrapped-style recap of food groups, top orders, and the times you order most, available monthly to all-time.",
          image: "food3.png",
        },
        {
          insight: "Mood quietly drives what students order",
          solution: "Mood tracker with suggestions",
          detail: "A monthly mood report alongside orders, with mood-based suggestions for healthier options nearby.",
          image: "food5.png",
        },
        {
          insight: "Dietary needs get lost in a generic feed",
          solution: "Food preferences profile",
          detail: "Dietary restrictions, allergies, and nutrient must-haves set once to personalize recommendations.",
          image: "food4.png",
        },
      ],
    },
  },
  {
    id: "womp",
    title: "Womp, 3D design for every skill level",
    category: "Designathon",
    year: "2024",
    role: "UI/UX designer",
    summary:
      "A gamified 3D creation experience with guided and pro modes, so beginners build confidence while experts keep full control.",
    cover: "womp.png",
    tone: "acid",
    tags: ["Design@Berkeley × Womp", "3D design", "Gamification", "UI/UX"],
    sprint: {
      event: "Design@Berkeley Designathon · sponsored by Womp · Nov 2024",
      team: "Eileen Hwang, Stephany Jazmin Casillas, Anna Reck",
      hmw: "How might we better intuitively communicate that Womp simplifies 3D design for users with all skill levels?",
      context:
        "3D design is often seen as inaccessible. Most programs serve either experienced professionals or entry-level beginners, but not the spectrum in between. Womp wants to be powerful yet approachable, and the challenge was making that promise obvious to every user.",
      research: {
        method:
          "Through interviews and usability testing with beginner and experienced designers, we defined three personas along the skill spectrum.",
        images: ["womp5.png", "womp4.png", "womp3.png"],
      },
      insights: [
        "Beginner (Jamie, 24): overwhelmed by jargon and complex tools, and needs step-by-step guidance and templates to build confidence.",
        "Intermediate (Alex, 31): knows the basics and wants hints on harder steps, freedom to explore, and visible progress.",
        "Advanced (Taylor, 38): finds guidance unnecessary and wants minimal prompts, efficient tools, and full control.",
      ],
      solutions: [
        {
          insight: "There’s a gap between beginner and advanced users",
          solution: "Gamified skill levels",
          detail: "Beginner, intermediate, and advanced levels where difficulty rises as users progress, strengthening their Womp skills at each step.",
          image: "womp6.png",
        },
        {
          insight: "Learners need to see their progress",
          solution: "Individual achievements",
          detail: "Each completed level earns an achievement displayed on the user’s profile, with different badges for each skill tier.",
          image: "womp7.png",
        },
        {
          insight: "Beginners want guidance and pros want it gone",
          solution: "Guided mode and pro mode",
          detail: "Guided mode walks new users through building a model, while pro mode turns off explicit instructions and keeps hints optional.",
          image: "womp8.png",
        },
      ],
    },
  },
  {
    id: "pathpilot",
    title: "PathPilot, road trips planned by locals",
    category: "Hackathon",
    year: "2024",
    role: "UI/UX designer",
    summary:
      "A mobile app that blends multi-stop route planning with hidden gems from locals and trending spots from short-form content.",
    cover: "pathpilot.png",
    tone: "blue",
    link: { label: "View on GitHub", href: "https://github.com/idery325/Road-Trip" },
    tags: ["LikeLion Hackathon", "UI/UX", "Product management", "React"],
    sprint: {
      event: "LikeLion Hackathon · Jan 2024",
      hmw: "How might we help travelers quickly plan their own multi-stop road trip, guided by short-form content and local creators?",
      context:
        "Demand for independent road trips is growing, driven by autonomous vehicles, economic pressure, and a preference for traveling on your own terms. Yet in online communities, people in their 20s and 30s kept saying the same things: planning is stressful, it’s hard to find rest stops, and they don’t want to jump between multiple sites. No map app recommends and optimizes multi-stop routes.",
      research: {
        method:
          "We combined secondary research on travel planning with a journey map for two primary personas, tracking what they do and feel at each step from choosing a destination to confirming a route.",
        stats: [
          { value: "10 hr", label: "average time spent planning a trip" },
          { value: "25%", label: "report extreme stress while planning" },
          { value: "7 in 10", label: "search for travel ideas through short-form content" },
        ],
        images: ["design1.png", "design2.png"],
      },
      insights: [
        "Sophia (21, Berkeley student) takes short road trips to recharge, but doesn’t know where to find good stopovers along the way.",
        "Ryan (28, startup founder) travels to keep up with trends, but finding trending hotspots means digging through reels one by one.",
        "Gen Z favors personal taste over mainstream picks, so recommendations from local creators beat generic top-10 lists.",
      ],
      solutions: [
        {
          insight: "Multi-stop planning is stressful",
          solution: "Personalized route recommendations",
          detail: "Enter departure and destination, then set target arrival time, rest frequency, and meal times to get an optimized multi-stop route.",
          image: "design3.png",
        },
        {
          insight: "Hidden gems are hard to find",
          solution: "Stopovers from short-form content and locals",
          detail: "Recommended stops pull from reels hotspots, local creators’ hidden gems, and amenities, each tagged so travelers can build their own itinerary.",
        },
        {
          insight: "An MVP alone won’t sustain growth",
          solution: "Scalability and business model",
          detail: "Community collaboration for insider info, plus revenue from banner ads and featured local businesses pre-verified by creators.",
          image: "design4.png",
        },
      ],
    },
  },  {
    id: "smarttodo",
    title: "SmartTodo, a to-do list that prioritizes for you",
    category: "Engineering",
    year: "Side project",
    role: "Solo builder",
    summary:
      "A cross-platform desktop app that ranks tasks automatically by deadline, urgency, and category.",
    cover: "smarttodo.png",
    tone: "lilac",
    tags: ["Electron", "JavaScript", "Desktop app", "UX"],
    sprint: {
      event: "Personal project · Desktop app",
      hmw: "How might we help people focus on what matters most, without making them constantly re-prioritize their to-do list?",
      context:
        "Most to-do apps treat every task the same. As deadlines approach, users have to keep re-ranking their list by hand, which turns task management into another task.",
      research: {
        label: "Explore",
        method:
          "I built early versions, used them daily, and watched where the experience broke down for others trying them.",
      },
      insights: [
        "Manual priority settings add mental overhead and go stale as deadlines move.",
        "Early versions had too many configuration options, which overwhelmed users.",
        "A personal task list should feel private and work offline.",
      ],
      insightsLabel: "What I learned",
      solutionsLabel: "Key decisions",
      solutions: [
        {
          insight: "Manual priorities go stale",
          solution: "Automatic prioritization",
          detail: "Urgency is calculated from deadlines and categories and updates instantly as dates approach.",
        },
        {
          insight: "Too many options overwhelm",
          solution: "Fewer settings, smarter defaults",
          detail: "Simplified to categories, deadline filters, progress tracking, and dark mode.",
        },
        {
          insight: "Tasks should stay private",
          solution: "Local-first storage in Electron",
          detail: "Data stays on the device and works offline, and Electron makes it cross-platform without a backend.",
        },
      ],
    },
  },
];

const featuredIds = ["unetic", "clearcollab", "pathpilot", "audiolens"];
const byId = (id: string) => projects.find((project) => project.id === id)!;
const featuredProjects = featuredIds.map(byId);
const moreProjects = projects.filter((project) => !featuredIds.includes(project.id));

const experience = [
  {
    company: "Adobe",
    role: "Senior Product Consultant",
    period: "Sep – Dec 2025",
    bullets: [
      "Architected an AI-driven strategy for Adobe’s SDLC to streamline cross-functional collaboration and handoffs across product, design, and engineering teams",
      "Diagnosed workflow bottlenecks and communication gaps, then designed AI-powered solutions and process optimizations to eliminate redundancies and improve execution velocity",
      "Defined KPIs and implemented guidelines to operationalize AI capabilities, driving measurable gains in delivery speed, quality, and end-to-end pipeline visibility",
    ],
    highlights: ["AI strategy", "SDLC", "KPIs"],
  },
  {
    company: "ZEP",
    role: "Project Manager & Front-End Engineer",
    period: "Aug – Dec 2025",
    bullets: [
      "Led project strategy and engineering execution for ZEP & LikeLion by architecting structured, automation-ready quiz generation",
      "Engineered and validated a dataset pipeline, driving model experimentation and prompt stability for scalable content creation",
      "Owned end-to-end cross-functional delivery, coordinating Dockerized API layers and workflow automation scoping",
    ],
    highlights: ["Project lead", "Data pipeline", "Front-end"],
  },
  {
    company: "Dorsal.fyi",
    role: "Founding Product Manager · Acquired by Promise",
    period: "May – Aug 2025",
    bullets: [
      "Led the design and launch of a healthcare billing comparison platform, owning the product roadmap, feature prioritization, and cross-functional execution to improve pricing transparency and CRM integration workflows for healthcare providers",
      "Defined product requirements for insurance dispute workflows through user research, customer interviews, and support data analysis, translating insights into detailed PRDs aligned with business objectives and customer needs",
      "Partnered closely with engineering and design teams throughout development, balancing technical tradeoffs, refining product requirements, and delivering patient-first experiences while maintaining product delivery timelines from concept to launch",
    ],
    highlights: ["0→1 launch", "Healthcare", "Acquired"],
  },
  {
    company: "Unetic",
    role: "Co-Founder · Acquired by Sideshift",
    period: "Feb – Dec 2024",
    bullets: [
      "Co-founded a campus platform that grew to 3,000+ active student users, leading product strategy, roadmap planning, and frontend development while increasing engagement by 50% through iterative feature launches and continuous user feedback",
      "Conducted usability testing, user interviews, and journey mapping to identify customer pain points, prioritize product opportunities, and inform roadmap decisions through structured user research and behavioral insights",
      "Collaborated with engineers, designers, and student stakeholders to define success metrics, prioritize product launches, and sequence releases based on user impact, technical feasibility, and long-term product goals",
    ],
    highlights: ["Founder", "3,000+ users", "Acquired"],
  },
];

const links = {
  email: "eileenhwang@berkeley.edu",
  linkedin: "https://www.linkedin.com/in/eileenyj-hwang/",
  github: "https://github.com/dbswjd24",
};

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d={diagonal ? "M5 19 19 5M8 5h11v11" : "M5 12h14m-5-5 5 5-5 5"} />
    </svg>
  );
}

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const SCRAMBLE_CHARS = "!<>-_/[]{}=+*^?#01";

function Scramble({ text, playOnView = false, className = "" }: { text: string; playOnView?: boolean; className?: string }) {
  const [shown, setShown] = useState(text);
  const running = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  const run = useCallback(() => {
    if (running.current || reducedMotion()) return;
    running.current = true;
    let frame = 0;
    const total = text.length * 3;
    const timer = window.setInterval(() => {
      frame += 1;
      setShown(
        text
          .split("")
          .map((char, i) => {
            if (char === " " || i < frame / 3) return char;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join(""),
      );
      if (frame >= total) {
        window.clearInterval(timer);
        setShown(text);
        running.current = false;
      }
    }, 30);
  }, [text]);

  useEffect(() => {
    if (!playOnView || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [playOnView, run]);

  return (
    <span ref={ref} className={`scramble ${className}`} onMouseEnter={run} onClick={run} aria-label={text}>
      <span className="scramble-sizer" aria-hidden="true">{text}</span>
      <span className="scramble-text" aria-hidden="true">{shown}</span>
    </span>
  );
}

type FxKind = "blur" | "pixel" | "glitch";

function FxWord({ kind, children, autoplayDelay }: { kind: FxKind; children: string; autoplayDelay?: number }) {
  const [playing, setPlaying] = useState(false);

  const play = useCallback(() => {
    if (playing || reducedMotion()) return;
    setPlaying(true);
  }, [playing]);

  useEffect(() => {
    if (autoplayDelay === undefined || reducedMotion()) return;
    const id = window.setTimeout(() => setPlaying(true), autoplayDelay);
    return () => window.clearTimeout(id);
  }, [autoplayDelay]);

  return (
    <span
      className={`fx fx-${kind}${playing ? " playing" : ""}`}
      data-text={children}
      onMouseEnter={play}
      onClick={play}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) setPlaying(false);
      }}
    >
      {children}
    </span>
  );
}

function PixelFilters() {
  return (
    <svg className="fx-defs" aria-hidden="true" width="0" height="0">
      {[10, 6, 3].map((size) => (
        <filter id={`pixelate-${size}`} key={size} x="0" y="0" width="100%" height="100%">
          <feFlood x={size / 2} y={size / 2} height="1" width="1" />
          <feComposite width={size} height={size} />
          <feTile result="tiles" />
          <feComposite in="SourceGraphic" in2="tiles" operator="in" />
          <feMorphology operator="dilate" radius={size / 2} />
        </filter>
      ))}
    </svg>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`visual visual-shot tone-${project.tone}`}>
      <img src={img(project.cover)} alt={`${project.title.split(",")[0]} screenshot`} loading="lazy" />
    </div>
  );
}

function SprintStory({ sprint, name }: { sprint: Sprint; name: string }) {
  return (
    <div className="sprint">
      <blockquote className="hmw">
        <span>How might we</span>
        <p><em>How might we</em> {sprint.hmw.replace(/^How might we /, "")}</p>
      </blockquote>

      <section className="sprint-step">
        <div className="step-label"><b>01</b>Frame the problem</div>
        <div className="step-body">
          <p>{sprint.context}</p>
        </div>
      </section>

      <section className="sprint-step">
        <div className="step-label"><b>02</b>{sprint.research.label ?? "Research"}</div>
        <div className="step-body">
          <p>{sprint.research.method}</p>
          {sprint.research.stats && (
            <div className="sprint-stats">
              {sprint.research.stats.map((stat) => (
                <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
              ))}
            </div>
          )}
          {sprint.research.images && (
            <div className="case-gallery">
              {sprint.research.images.map((file) => (
                <img key={file} src={img(file)} alt={`${name} research`} loading="lazy" />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="sprint-step">
        <div className="step-label"><b>03</b>{sprint.insightsLabel ?? "What we learned"}</div>
        <div className="step-body">
          <ul className="insight-list">
            {sprint.insights.map((insight) => <li key={insight}>{insight}</li>)}
          </ul>
        </div>
      </section>

      <section className="sprint-step">
        <div className="step-label"><b>04</b>{sprint.solutionsLabel ?? "From insight to solution"}</div>
        <div className="step-body solution-list">
          {sprint.solutions.map((item) => (
            <article className="solution" key={item.solution}>
              <div className="solution-map">
                <span className="solution-insight">{item.insight}</span>
                <ArrowIcon />
                <h4>{item.solution}</h4>
              </div>
              <p>{item.detail}</p>
              {item.image && <img src={img(item.image)} alt={`${name}: ${item.solution}`} loading="lazy" />}
            </article>
          ))}
        </div>
      </section>

      {sprint.reflection && (
        <section className="sprint-step">
          <div className="step-label"><b>05</b>{sprint.reflectionLabel ?? "Reflection"}</div>
          <div className="step-body">
            <p className="reflection">{sprint.reflection}</p>
          </div>
        </section>
      )}
    </div>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}) {
  return (
    <article className="project-card">
      <button className="project-trigger" onClick={() => onOpen(project)} aria-label={`Open case study: ${project.title}`}>
        <div className="project-meta">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <ProjectVisual project={project} />
        <div className="project-copy">
          <h3>{project.title.split(", ")[0]}</h3>
          <p className="card-tagline">{project.title.split(", ").slice(1).join(", ")}</p>
          <p className="card-hmw"><span>How might we</span>{project.sprint.hmw.replace(/^How might we /, "")}</p>
          <span className="view-case">Read more <ArrowIcon diagonal /></span>
        </div>
      </button>
    </article>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [section, setSection] = useState("");

  useEffect(() => {
    const sections: [string, string][] = [
      ["about", "about"],
      ["work", "projects"],
      ["experience", "experience"],
    ];
    const update = () => {
      let current = "";
      for (const [id, path] of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = path;
      }
      setSection(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "";
    if (!activeProject) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeProject]);


  return (
    <main className="browser">
      <PixelFilters />
      <div className="browser-bar">
        <div className="traffic-lights" aria-hidden="true">
          <i className="light red" />
          <i className="light yellow" />
          <i className="light green" />
        </div>
        <div className="url-pill">
          <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
          allaboutme{section ? `/${section}` : ""}
        </div>
        <span className="browser-bar-spacer" aria-hidden="true" />
      </div>
      <nav className={`site-nav${menuOpen ? " open" : ""}`} aria-label="Primary navigation">
        <a className="wordmark" href="#top" onClick={() => setMenuOpen(false)}><Scramble text="Eileen Hwang" /><span aria-hidden="true">.</span></a>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="nav-links"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        <div className="nav-links" id="nav-links">
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href={`mailto:${links.email}`} onClick={() => setMenuOpen(false)}>Let’s talk <ArrowIcon diagonal /></a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="eyebrow">Product, design &amp; engineering at UC Berkeley</div>
        <h1>
          I bridge{" "}
          <span className="accent">
            <FxWord kind="blur" autoplayDelay={700}>design</FxWord>,{" "}
            <FxWord kind="pixel" autoplayDelay={1100}>code</FxWord>
          </span>
          <br />
          and <span className="accent"><FxWord kind="glitch" autoplayDelay={1500}>business</FxWord></span>.
        </h1>
        <div className="hero-bottom">
          <p>
            From the first user interview to the last line of code, I turn fuzzy problems
            into products people actually want to use.
          </p>
          <a className="circle-link" href="#work" aria-label="Explore selected work">
            <ArrowIcon />
          </a>
        </div>
        <div className="principle-strip" aria-label="Disciplines">
          <span>Product management</span>
          <span>UI/UX design</span>
          <span>Full-stack engineering</span>
          <span>Cross-functional delivery</span>
        </div>
      </section>

      <section className="about-section" id="about">
        <img className="about-photo" src={img("headshot.jpg")} alt="Portrait of Eileen Hwang" />
        <div className="about-copy">
          <span className="section-number">About</span>
          <h2><Scramble text="Hello, I’m Eileen." className="scramble-wrap" playOnView /></h2>
          <p>
            I build products from 0 to 1, and then from 1 to infinity, making engagement easier
            and processes simpler. With a multidisciplinary background spanning computer science,
            statistics, psychology, and design, I design intuitive,
            responsive, and visually considered applications, from the first user interview to
            a widely adopted platform.
          </p>
          <p>
            Working across product, design, and engineering teams sparked my interest in bridging
            technology and business. I bring technical skill and strategic thinking to experiences
            that resonate with users and move business goals forward.
          </p>
          <div className="about-links">
            <a href={`mailto:${links.email}`}>{links.email} <ArrowIcon diagonal /></a>
            <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowIcon diagonal /></a>
            <a href={links.github} target="_blank" rel="noreferrer">GitHub <ArrowIcon diagonal /></a>
          </div>
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <div>
            <span className="section-number">Projects</span>
            <h2>Things I’ve designed and built</h2>
          </div>
          <p>A startup, a designathon, a hackathon, and something I built on my own. More below.</p>
        </div>

        <div className={`project-grid${featuredProjects.length % 2 ? " odd" : ""}`}>
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onOpen={setActiveProject} />
          ))}
        </div>

        <div className="more-projects">
          <h3>More projects</h3>
          <ul>
            {moreProjects.map((project) => (
              <li key={project.id}>
                <button onClick={() => setActiveProject(project)}>
                  <span className="more-name">{project.title.split(", ")[0]}</span>
                  <span className="more-tagline">{project.title.split(", ").slice(1).join(", ")}</span>
                  <span className="more-meta">{project.category} · {project.year}</span>
                  <ArrowIcon diagonal />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="experience-section" id="experience">
        <div className="experience-intro">
          <span className="section-number">Experience</span>
          <h2>Where I’ve worked</h2>
          <p>
            Two startups I helped build, Unetic and Dorsal, were acquired. Most recently, I worked on
            AI workflow strategy at Adobe.
          </p>
        </div>
        <div className="experience-list">
          {experience.map((item) => (
            <article className="experience-row" key={item.company}>
              <div className="experience-company">
                <h3>{item.company}</h3>
                {item.role.split(" · ").map((part) => <span key={part}>{part}</span>)}
                <span className="experience-period">{item.period}</span>
              </div>
              <ul className="experience-bullets">{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <div>
          <span className="section-number">Contact</span>
          <h2>Say hi.</h2>
          <p className="footer-note">I’m always happy to talk about product, design, or anything on this page.</p>
        </div>
        <a href={`mailto:${links.email}`}>{links.email} <ArrowIcon diagonal /></a>
        <div className="footer-base">
          <span>Eileen Hwang · Product, design & engineering</span>
          <span className="footer-links">
            <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
          </span>
        </div>
      </footer>

      {activeProject && (
        <div className="case-overlay" role="dialog" aria-modal="true" aria-labelledby="case-title">
          <button className="case-backdrop" onClick={() => setActiveProject(null)} aria-label="Close case study" />
          <article className="case-panel wide">
            <button className="close-button" onClick={() => setActiveProject(null)} aria-label="Close case study">
              <span />
              <span />
            </button>
            <div className="case-hero">
              <div className="project-meta">
                <span>{activeProject.role}</span><span>{activeProject.category}</span><span>{activeProject.year}</span>
              </div>
              <h2 id="case-title">{activeProject.title.split(", ")[0]}</h2>
              <p className="case-tagline">{activeProject.title.split(", ").slice(1).join(", ")}</p>
              <p>{activeProject.summary}</p>
              <p className="case-event">
                {activeProject.sprint.event}
                {activeProject.sprint.team && <><br />Team: {activeProject.sprint.team}</>}
              </p>
              {activeProject.stats && (
                <div className="case-metrics">
                  {activeProject.stats.map((stat) => (
                    <div className="case-metric" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
                  ))}
                </div>
              )}
              {(activeProject.link || activeProject.storeLink) && (
                <div className="case-links">
                  {activeProject.link && (
                    <a className="case-link" href={activeProject.link.href} target="_blank" rel="noreferrer">
                      {activeProject.link.label} <ArrowIcon diagonal />
                    </a>
                  )}
                  {activeProject.storeLink &&
                    (activeProject.storeLink.href ? (
                      <a className="case-link" href={activeProject.storeLink.href} target="_blank" rel="noreferrer">
                        {activeProject.storeLink.label} <ArrowIcon diagonal />
                      </a>
                    ) : (
                      <span className="case-link case-link-pending">
                        {activeProject.storeLink.label} <em>Coming soon</em>
                      </span>
                    ))}
                </div>
              )}
            </div>
            <ProjectVisual project={activeProject} />
            <SprintStory sprint={activeProject.sprint} name={activeProject.title.split(",")[0]} />
            <div className="case-tags">{activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </article>
        </div>
      )}
    </main>
  );
}
