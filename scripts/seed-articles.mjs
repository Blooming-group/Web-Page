#!/usr/bin/env node
/**
 * scripts/seed-articles.mjs
 *
 * Seeds the 5 Thinking articles into Sanity CMS (project z040qeme, dataset: production).
 *
 * Prerequisites:
 *   1. Get a write token from https://www.sanity.io/manage/project/z040qeme/api
 *      → "Tokens" → "Add API token" → give it Editor (or above) permissions
 *   2. Export it:  export SANITY_WRITE_TOKEN=<your-token>
 *   3. Run:        node scripts/seed-articles.mjs
 *
 * The script is idempotent via createOrReplace — safe to re-run.
 */

import { createClient } from '@sanity/client'

const TOKEN = process.env.SANITY_WRITE_TOKEN
if (!TOKEN) {
  console.error(
    '\n  ✗ Missing SANITY_WRITE_TOKEN.\n' +
      '    Export your Sanity Editor token and re-run:\n' +
      '    export SANITY_WRITE_TOKEN=<token>\n'
  )
  process.exit(1)
}

const client = createClient({
  projectId: 'z040qeme',
  dataset: 'production',
  apiVersion: '2025-01-01',
  token: TOKEN,
  useCdn: false,
})

// ─── Portable Text helpers ───────────────────────────────────────────────────

let _counter = 0
const k = () => `k${++_counter}`

/** Plain paragraph */
const p = (text) => ({
  _type: 'block',
  _key: k(),
  style: 'normal',
  markDefs: [],
  children: [{ _type: 'span', _key: k(), text, marks: [] }],
})

/** H3 heading */
const h3 = (text) => ({
  _type: 'block',
  _key: k(),
  style: 'h3',
  markDefs: [],
  children: [{ _type: 'span', _key: k(), text, marks: [] }],
})

/** Paragraph with a bold lead span followed by plain text */
const boldP = (bold, rest) => ({
  _type: 'block',
  _key: k(),
  style: 'normal',
  markDefs: [],
  children: [
    { _type: 'span', _key: k(), text: bold, marks: ['strong'] },
    ...(rest ? [{ _type: 'span', _key: k(), text: rest, marks: [] }] : []),
  ],
})

/** Embedded CTA callout block */
const callout = (heading, body, ctaText) => ({
  _type: 'callout',
  _key: k(),
  heading,
  body,
  ctaText,
})

// ─── Article documents ───────────────────────────────────────────────────────

const articles = [
  // ── Article 1 ────────────────────────────────────────────────────────────
  {
    _id: 'article-the-deck-is-not-the-deliverable',
    _type: 'article',
    title: 'The deck is not the deliverable',
    slug: { _type: 'slug', current: 'the-deck-is-not-the-deliverable' },
    excerpt:
      'More than 70% of strategic initiatives fail — not because the strategy was wrong, but because execution broke down at the handoff. The consulting industry\u2019s structural flaw is separating the people who think from the people who build.',
    publishedAt: '2026-04-01T00:00:00Z',
    category: 'strategy',
    readTime: 7,
    featured: true,
    body: [
      p(
        `There is a moment in every consulting engagement where the strategy team presents their findings, the client nods, and both parties enter the phase everyone privately dreads: implementation.`
      ),
      p(
        `The strategy team moves on. An implementation partner is found, or worse, the client\u2019s internal team is expected to translate a 200-page document into operational change. The people who understood the problem are no longer in the room when it\u2019s time to solve it.`
      ),
      p(
        `This handoff is where most consulting value is destroyed. Not because the strategy was wrong. Because the connection between diagnosis and execution was severed by the structure of the engagement itself.`
      ),
      h3(`The numbers behind the gap`),
      p(
        `Gartner\u2019s research is direct: more than 70% of strategic initiatives fail to deliver expected outcomes. The cause, in the majority of cases, is not flawed thinking. It is execution that breaks down somewhere between the recommendation and the result.`
      ),
      p(
        `McKinsey\u2019s data reinforces this from the other direction: organisations that tightly link strategy to operations are 2.5 times more likely to outperform their peers financially. The value isn\u2019t in the strategy. The value is in the continuity between the strategy and the operation it changes.`
      ),
      p(
        `And yet the consulting industry is structurally designed to break that continuity. The business model separates thinking from building, because they are billed differently, staffed differently, and sold differently. The strategy engagement ends. The implementation engagement begins. Different team. Different contract. Different incentives.`
      ),
      h3(`Why the separation persists`),
      p(`The answer is economics, not incompetence.`),
      p(
        `Strategy work is high-margin. It requires senior people, short timelines, and intellectual capital that is expensive to develop. Implementation work is lower-margin, longer, and operationally complex. Most firms optimise for the first and outsource or deprioritise the second.`
      ),
      p(
        `The result is a predictable pattern. The client pays a premium for a diagnosis. The diagnosis is precise. The deck is impressive. But the recommendations assume an implementation capability that either doesn\u2019t exist internally or must be procured from a different provider who wasn\u2019t in the room during the diagnosis.`
      ),
      p(
        `Bain\u2019s research supports what most executives already suspect: companies that adopt execution-first models are three times more likely to sustain performance improvements beyond two years. The deck that sits in a shared drive sustains nothing. The system that runs in production does.`
      ),
      h3(`The deck economy`),
      p(
        `Here is what the industry doesn\u2019t discuss openly: for many firms, the deck is the product. Not the insight. The deck. The 200-slide document justifies the fee. The fee is the revenue. The deck is the packaging.`
      ),
      p(
        `This is not a conspiracy. It is a structural incentive. The metric that drives most consulting firms is not the quality of the client\u2019s decision. It is the quantity of the firm\u2019s output. Hours billed. Slides produced. Frameworks presented.`
      ),
      p(
        `For the client sitting across the table (the COO who has been here before, the department head who knows that last year\u2019s \u201cstrategic transformation\u201d produced a deck that nobody opened after month two), this is not news. It\u2019s experience.`
      ),
      h3(`What changes when thinking and building stay connected`),
      p(
        `When the same team diagnoses the problem and builds the solution, three things happen that cannot happen in a handoff model.`
      ),
      p(
        `First, the diagnosis becomes accountable. If the people who identify the problem are the same people who have to fix it, the diagnosis sharpens. There is no incentive to overstate the scope or recommend a solution that looks impressive in a presentation but collapses in production.`
      ),
      p(
        `Second, context survives. The most valuable insights from a diagnostic are not the ones that make it into the final deck. They are the offhand comments from the operations manager, the body language when the CFO talks about the last vendor, the thing said in minute 38 of the second session that reframed the entire problem. In a handoff model, that context evaporates. In a continuous model, it becomes the foundation.`
      ),
      p(
        `Third, speed compresses. The implementation doesn\u2019t wait for a separate scoping process, a new contract, and a new team\u2019s onboarding period. It starts when the diagnosis concludes, because the team already understands the constraints.`
      ),
      h3(`When separation makes sense`),
      p(`Intellectual honesty requires acknowledging that the integrated model has limits.`),
      p(
        `It works when the problem and the solution are within the same capability set. It doesn\u2019t work when the diagnosis reveals a problem that requires a type of expertise the diagnosing firm doesn\u2019t have: a regulatory restructuring, a change-management initiative that requires organisational psychologists, a technology migration that demands a specific vendor certification.`
      ),
      p(
        `In those cases, the handoff is not a flaw. It is a necessity. The relevant question is not \u201cdid the same team build it?\u201d but \u201cdid the people who understood the problem stay involved long enough to ensure the implementation addressed the right thing?\u201d`
      ),
      p(
        `The worst outcome is not a handoff. The worst outcome is a handoff where the diagnostic context is lost and the implementation team solves a problem that was clearly described in a deck but poorly understood in practice.`
      ),
      h3(`The test`),
      p(
        `The next time a firm presents a strategy, ask one question: \u201cWill the people in this room be involved when this gets built?\u201d`
      ),
      p(
        `If the answer is no (if the answer involves a different team, a different phase, a different contract), understand what you\u2019re buying. You may be buying a very good deck. But a deck is a description of work. It is not the work itself.`
      ),
      p(
        `The gap between the two is the most expensive line item that never appears on any invoice.`
      ),
    ],
  },

  // ── Article 2 ────────────────────────────────────────────────────────────
  {
    _id: 'article-what-ai-transformation-actually-means',
    _type: 'article',
    title: 'What \u201cAI transformation\u201d actually means at 80 employees',
    slug: {
      _type: 'slug',
      current: 'what-ai-transformation-actually-means-at-80-employees',
    },
    excerpt: `The AI conversation for growing European companies is dominated by enterprise case studies that don\u2019t translate and startup experiments that don\u2019t scale. Here is what the data actually shows about what works at this scale.`,
    publishedAt: '2026-04-08T00:00:00Z',
    category: 'ai-automation',
    readTime: 8,
    featured: false,
    body: [
      p(`The AI conversation has a scale problem.`),
      p(
        `Enterprise case studies describe deployments across tens of thousands of employees with dedicated data science teams and seven-figure budgets. Startup case studies describe ten-person companies that rebuilt their entire operation around ChatGPT in a weekend. Neither describes reality for a company with 60 to 150 employees, real revenue, existing systems, and a team that has a day job on top of whatever \u201cAI transformation\u201d is supposed to mean.`
      ),
      p(
        `If you run a company in that range, most of what you\u2019ve read about AI doesn\u2019t apply to you. Not because the technology doesn\u2019t work. It does. Because the context is wrong. The constraints are different. The decision framework is different. And the consequences of getting it wrong are different when you don\u2019t have a dedicated innovation budget to absorb the loss.`
      ),
      h3(`The adoption picture in Europe, honestly`),
      p(
        `Across 32 European countries, on average 20% of firms were using AI in 2025. In Scandinavia, the figure exceeded 35%. In parts of Eastern and Southern Europe, it was below 10%. Among small businesses specifically, Eurostat reports 17% adoption, compared with 55% for large enterprises.`
      ),
      p(
        `But the number that reveals the most is this: among those already using generative AI, only 29% report applying it to their core business activities. The rest use it at the periphery: drafting emails, summarising documents, generating marketing copy. Functional, perhaps. But not the operational change that justifies the investment or the board-level attention.`
      ),
      p(
        `Meanwhile, a 2025 S&P Global survey of over 1,000 enterprises found that 42% of organisations abandoned most of their AI initiatives that year, more than double the rate from the year before. The acceleration is in the wrong direction. And the cause, repeatedly, was not that the technology failed. It was that the initiatives were not connected to a specific operational problem worth solving.`
      ),
      h3(`What the data shows works at this scale`),
      p(
        `The companies that succeed with AI in the 60-to-150-employee range share patterns that are visible across the research and across the engagements we observe in the European mid-market.`
      ),
      boldP(
        `They start with a specific bottleneck, not with a technology.`,
        ` The question that works is \u201cwhat is consuming the most expensive time in our operation?\u201d Not \u201chow can we use AI?\u201d If you can\u2019t answer the first question with precision, the second question is premature. The technology is the last decision, not the first.`
      ),
      boldP(
        `They build for production from day one.`,
        ` Gartner\u2019s data shows that only 48% of AI projects make it from prototype to production, with an average gap of eight months. For a company at this scale, eight months of pilot without production value is not a learning experience. It\u2019s an unrecoverable cost. The firms that succeed scope narrowly and deploy for production immediately, with defined success metrics before any code is written.`
      ),
      boldP(
        `They measure in operational language, not in AI vocabulary.`,
        ` \u201cWe deployed a machine learning model\u201d is not a result. \u201cWe reduced pre-qualification time by 60% and reallocated two FTEs to closing-stage work\u201d is a result. The moment AI becomes the subject of the sentence instead of the tool in the sentence, the engagement has lost its way.`
      ),
      h3(`What consistently doesn\u2019t work`),
      boldP(
        `The \u201cAI strategy\u201d engagement.`,
        ` If someone proposes a six-month engagement to develop your AI strategy before deploying anything, they are selling you a planning exercise. At your scale, you don\u2019t need an AI strategy. You need a diagnosis of your operational bottlenecks, clarity on which ones are addressable with AI, and a production deployment within weeks.`
      ),
      boldP(
        `The horizontal rollout.`,
        ` \u201cLet\u2019s deploy Copilot to the entire company\u201d is the enterprise version of buying a gym membership. Without a specific use case, specific training, and specific measurement, horizontal AI deployment produces horizontal mediocrity. Usage data consistently shows that most enterprise AI licences are significantly underutilised within 90 days of deployment.`
      ),
      boldP(
        `The chatbot without integration depth.`,
        ` A chatbot deployed without being trained on your specific documentation, connected to your systems, and tested against your actual customer queries is a FAQ page with a text box. Your customers try it once, get a generic response, and never return.`
      ),
      h3(`The regulatory dimension, briefly`),
      p(
        `The EU AI Act reaches its major compliance milestone in August 2026. High-risk AI systems (in employment screening, credit assessment, critical infrastructure) will require conformity assessments, technical documentation, and human oversight.`
      ),
      p(
        `For most companies at this scale, the immediate impact is limited. The AI applications that make operational sense (process automation, knowledge systems, decision support) generally don\u2019t fall into the high-risk category. But transparency requirements apply broadly: if your customers interact with an AI system, they must be informed.`
      ),
      p(
        `The strategic implication: companies that deploy AI with proper documentation, clear boundaries, and honest disclosure now are building a compliance advantage that compounds with every regulatory cycle. The ones that deploy carelessly are accumulating liability they haven\u2019t accounted for.`
      ),
      callout(
        `Not sure where AI creates leverage in your operation?`,
        `That\u2019s the first question we answer in the diagnostic session. 45 minutes. We map your operational reality and identify where AI makes sense and where it doesn\u2019t. No pitch.`,
        `Book a diagnostic session`
      ),
      h3(`The real question`),
      p(
        `The question for a company your size is not \u201cshould we adopt AI?\u201d The market pressure has answered that.`
      ),
      p(
        `The question is whether you adopt it starting from a diagnosed operational problem, or starting from the technology and hoping to find a problem it solves. The first path produces measurable results. The second produces a pilot, a demo, a presentation to the board, and eventually a write-off.`
      ),
      p(
        `The difference between those two paths is not about AI literacy. It\u2019s about operational honesty: knowing what your real bottlenecks are before you decide how to address them.`
      ),
    ],
  },

  // ── Article 3 ────────────────────────────────────────────────────────────
  {
    _id: 'article-why-most-automation-projects-fail',
    _type: 'article',
    title: 'Why most automation projects fail before deployment',
    slug: {
      _type: 'slug',
      current: 'why-most-automation-projects-fail-before-deployment',
    },
    excerpt: `70% of automation projects don\u2019t deliver expected ROI. The cause is almost never the technology. It\u2019s a diagnosis problem: companies automate the process they can see instead of the bottleneck that actually costs them.`,
    publishedAt: '2026-04-15T00:00:00Z',
    category: 'operations',
    readTime: 6,
    featured: false,
    body: [
      p(`The pattern is remarkably consistent.`),
      p(
        `A company identifies a process that feels slow. They hire a vendor to automate it. The vendor automates it. Three months later, the company discovers that the process wasn\u2019t the bottleneck. It was a symptom of a bottleneck somewhere upstream that nobody mapped.`
      ),
      p(`The automation works perfectly. It just doesn\u2019t matter.`),
      h3(`The scale of the problem`),
      p(
        `Industry data converges around a figure that should stop anyone planning an automation initiative: roughly 70% of automation projects fail to deliver their expected ROI. Ernst & Young puts it more directly: up to 50% of initial RPA projects fail due to poor planning alone.`
      ),
      p(
        `These are not fringe statistics. A 2025 S&P Global survey of over 1,000 enterprises found that 42% abandoned most of their AI initiatives that year, more than double the previous year\u2019s rate.`
      ),
      p(
        `Businesses collectively spend over $12 billion annually on automation. If 70% underdelivers, approximately $8 billion a year is being spent on projects that won\u2019t produce what was promised. The technology works. The diagnosis doesn\u2019t.`
      ),
      h3(`The upstream problem`),
      p(
        `Most automation projects begin with a question that seems logical but is structurally flawed: \u201cWhich process should we automate?\u201d`
      ),
      p(
        `The question assumes the process as it currently exists is the right unit of analysis. It rarely is.`
      ),
      p(
        `Processes in growing companies don\u2019t evolve by design. They evolve by accumulation. A manual step added during a crisis in 2019 becomes permanent. An approval chain that made sense at 30 employees persists at 120. Data that should flow between systems lives in email threads because that was someone\u2019s workaround five years ago and nobody questioned it since. Research from Forrester indicates that 82% of organisations still use paper-based, manual routing of tasks supported by spreadsheets, even in 2025.`
      ),
      p(
        `Automating these processes as they exist is building speed on top of dysfunction. The automation runs faster. The dysfunction runs faster too.`
      ),
      p(
        `The failure pattern that destroys the most value is specifically this: automating a downstream process without understanding the upstream constraint that feeds it.`
      ),
      p(
        `A manufacturing company spends six months automating invoice processing. They automate four of nine steps successfully. The result: a hybrid process that is slower and more frustrating than the original, because the automated steps wait for manual steps to complete, creating new bottlenecks that didn\u2019t exist before. The technology worked. The invoice processing wasn\u2019t the bottleneck. The bottleneck was the procurement approval chain three steps upstream, which produced inconsistent data that the invoice process was designed to manually reconcile.`
      ),
      p(`The automation addressed the symptom. The disease was untouched.`),
      h3(`What the evidence shows works`),
      p(
        `The firms that consistently deliver on automation investments follow a sequence that the industry (for economic reasons) prefers to skip.`
      ),
      boldP(
        `Map the actual operation, not the documented one.`,
        ` Workflow diagrams are aspirational. They show how the process was designed, not how it works in practice. The real workflow lives in the habits, workarounds, and informal knowledge of the people doing the work. The only way to find it is to watch, not to read.`
      ),
      boldP(
        `Find the real constraint.`,
        ` The process that \u201cfeels slow\u201d is usually slow because it\u2019s waiting for something upstream. The real bottleneck is the constraint that, if removed, accelerates everything downstream. Finding it often requires asking uncomfortable questions about why things work the way they do. The answer frequently points to a decision that was never revisited, not a process that needs automation.`
      ),
      boldP(
        `Simplify before you automate.`,
        ` If a process has seven steps and three of them exist because of a workaround from five years ago, eliminate those three before building anything. An hour spent removing unnecessary steps can prevent six months of building the wrong automation.`
      ),
      boldP(
        `Define success before you start.`,
        ` \u201cIt should save time\u201d is not a metric. \u201cIt should reduce invoice processing from 4 hours per week to 30 minutes\u201d is a metric. The difference is accountability, and accountability is what separates the 30% that delivers from the 70% that doesn\u2019t.`
      ),
      h3(`The incentive problem`),
      p(
        `The automation industry (vendors, platforms, consulting firms) has an economic incentive to start building as quickly as possible. Discovery is low-margin. Diagnosis takes time. Revenue comes from implementation.`
      ),
      p(
        `This is not malice. It is structure. The vendor\u2019s business model is optimised for speed to deployment, not accuracy of diagnosis. The faster they start building, the faster they bill. The client pays for what ships, not for what was understood beforehand.`
      ),
      p(
        `The 70% failure rate is not a mystery. It is the predictable outcome of an industry that is economically incentivised to skip the step that determines whether the project succeeds.`
      ),
      p(
        `The companies that reverse this (understanding before implementation, diagnosis before prescription) don\u2019t just avoid the failure rate. They build systems that work because they were built on operational truth instead of documented assumption.`
      ),
      p(
        `The difference is not methodology. It is willingness to find the real problem before committing resources to solving the wrong one.`
      ),
    ],
  },

  // ── Article 4 ────────────────────────────────────────────────────────────
  {
    _id: 'article-knowledge-nobody-wrote-down',
    _type: 'article',
    title: `Your company\u2019s most valuable asset is the knowledge nobody wrote down`,
    slug: {
      _type: 'slug',
      current: 'your-companys-most-valuable-asset-is-the-knowledge-nobody-wrote-down',
    },
    excerpt: `42% of what your employees know exists only in their heads. When they leave, it leaves with them. Corporate intelligence systems turn that fragile asset into a permanent one.`,
    publishedAt: '2026-05-01T00:00:00Z',
    category: 'technology',
    readTime: 7,
    featured: false,
    body: [
      p(
        `There is a type of knowledge inside every established company that doesn\u2019t live in any document, any database, or any process manual.`
      ),
      p(
        `It lives in the heads of the people who have been there longest. The operations manager who knows why the third-quarter procurement cycle always breaks. The sales director who remembers which client relationships survived the 2020 restructuring and why. The finance lead who can look at a set of numbers and immediately spot the anomaly that a new hire would miss for six months.`
      ),
      p(
        `This knowledge is the company\u2019s most valuable and most fragile asset. It appreciates every year as the business grows. And it evaporates the day its carrier walks out the door.`
      ),
      h3(`The numbers`),
      p(
        `Research across multiple sources converges on a figure that deserves more attention than it gets: 42% of the expertise an employee applies in their role is unique to them and not shared with any colleague. Not documented. Not transferable. Not recoverable once they leave.`
      ),
      p(
        `The downstream costs are measurable. Data from Panopto shows that large companies lose an average of $47 million per year in productivity specifically from inefficient knowledge sharing. Knowledge workers (the people doing the thinking, not just the executing) spend an average of 5.3 hours per week waiting for information from colleagues or trying to recreate institutional knowledge that exists but was never captured.`
      ),
      p(
        `In a company of 80 people, even if only a third are in knowledge-intensive roles, those hours add up to a meaningful percentage of total senior capacity, quietly consumed by searching for information that should be findable. It doesn\u2019t appear on any budget line. It doesn\u2019t trigger any alarm. It just compounds, invisibly, year after year.`
      ),
      h3(`Why documentation doesn\u2019t solve it`),
      p(
        `The instinctive response to knowledge loss is documentation. Write it down. Build a wiki. Create a knowledge base. Mandate that departing employees document their processes before they leave.`
      ),
      p(
        `This has been tried extensively, and it fails for a specific reason: the most valuable knowledge is tacit, not explicit.`
      ),
      p(
        `Explicit knowledge is procedural. \u201cStep 1: Open the CRM. Step 2: Create a new contact record.\u201d Important, but not where the competitive advantage concentrates.`
      ),
      p(
        `Tacit knowledge is the judgment layer. Knowing that client X responds better to direct communication while client Y needs relationship-building first. Recognising a pattern in production data that signals a quality issue two weeks before it shows up in the metrics. The instinct, built over years, that tells a senior person \u201csomething is off here\u201d before they can articulate what.`
      ),
      p(
        `Tacit knowledge cannot be captured by asking someone to write it down. It is embedded in context, in experience, and in the specific conditions of the organisation. Documentation captures the what and the how. The why (where the real value lives) remains in someone\u2019s head until they leave.`
      ),
      h3(`What corporate intelligence systems do in practice`),
      p(
        `A corporate intelligence system (built on what the industry calls Retrieval-Augmented Generation, or RAG) does something traditional knowledge management never could: it learns from the organisation\u2019s accumulated data and makes it queryable in natural language.`
      ),
      p(`In practical terms, this changes the information dynamics of the entire company.`),
      p(
        `A new hire researching why a specific process broke last quarter can get an answer synthesised from email threads, meeting notes, and project documentation, context that would have taken weeks to piece together manually, if the right people were even still available to ask.`
      ),
      p(
        `A sales team preparing for a renewal conversation can query the system for the complete history of a client relationship, drawn from CRM records, correspondence, and internal notes, instead of relying on whoever happens to remember.`
      ),
      p(
        `A finance team noticing an anomaly can ask whether the pattern has appeared before and what happened next. The system searches historical data and surfaces precedents, giving the analyst access to institutional memory that might otherwise have left the company three years ago.`
      ),
      p(
        `These systems are not replacing human judgment. They are making it possible for human judgment to operate on complete information instead of partial memory.`
      ),
      h3(`The compounding effect`),
      p(
        `What makes this a strategic investment rather than an operational tool is the compounding property.`
      ),
      p(
        `Every document, every email summary, every project report, every client interaction that enters the system makes it more valuable. The knowledge base grows with the organisation. Unlike a human expert, it doesn\u2019t leave, forget, or retire.`
      ),
      p(
        `Over 18 to 24 months, a well-maintained corporate intelligence system accumulates enough context that it becomes genuinely difficult for a competitor to replicate. It is not just data. It is the company\u2019s specific institutional memory: structured, searchable, and permanent. A competitive asset built from the inside out.`
      ),
      callout(
        `Corporate intelligence is one of six capabilities Blooming deploys.`,
        `For companies with more than 50 employees, it\u2019s often the highest-leverage intervention. The diagnostic session tells you whether it makes sense for your operation.`,
        `Book a diagnostic session`
      ),
      h3(`The timing question`),
      p(
        `Every week that institutional knowledge goes uncaptured is a week where it depreciates: through turnover, through organisational change, through the simple passage of time that makes memories less precise.`
      ),
      p(
        `The companies that build these systems early don\u2019t just protect against knowledge loss. They create an asset that grows with every month of operation. The system gets smarter. The organisation gets faster. The decisions get better, because they\u2019re made on accumulated context, not on whatever the current team happens to remember.`
      ),
      p(
        `The knowledge is already in your company. It\u2019s in emails, in meeting notes, in the heads of your best people. The question is whether it stays accessible when those people decide to go.`
      ),
    ],
  },

  // ── Article 5 ────────────────────────────────────────────────────────────
  {
    _id: 'article-mid-market-gap-is-a-european-problem',
    _type: 'article',
    title: 'The mid-market gap is a European problem',
    slug: {
      _type: 'slug',
      current: 'the-mid-market-gap-is-a-european-problem',
    },
    excerpt: `European companies between \u20ac5M and \u20ac200M are making their most consequential technology decisions with less strategic support than any comparable tier in the US. The advisory infrastructure that exists across the Atlantic barely exists here.`,
    publishedAt: '2026-05-15T00:00:00Z',
    category: 'european-business',
    readTime: 7,
    featured: false,
    body: [
      p(
        `In the United States, a company doing $30M in revenue has access to a bench of specialised advisory firms that understand its scale, its constraints, and its pace. Firms that have built their model around this tier of the market, not as a stepping stone to larger clients, but as a deliberate strategic position.`
      ),
      p(
        `In Europe, the same company has two options. Pay for a consultancy built for a different type of client. Or work with a technology vendor that will build what you specify without questioning whether it\u2019s the right thing to build.`
      ),
      p(
        `The gap between those two options is not a market quirk. It is a structural absence, and it is shaping the technology decisions of an entire tier of the European economy.`
      ),
      h3(`The productivity divergence`),
      p(
        `The data tells a story that is harder to dismiss with each passing year. Since the mid-1990s, productivity in the US has grown by almost 90%. In the euro area, the figure is roughly 30%. The Draghi Report identified this divergence as one of Europe\u2019s defining economic challenges and pointed specifically to AI as a potential corrective.`
      ),
      p(
        `But the correction requires adoption. And adoption in Europe is lagging, not uniformly, but structurally.`
      ),
      p(
        `Across 32 European countries, 20% of firms were using AI in 2025. The range spans from over 35% in Scandinavia to under 10% in parts of Southern and Eastern Europe. Among workers, US adoption of generative AI reached 43% by early 2026, with 5.2% of total work hours involving AI. In Germany, France, and Italy, the share of work hours was less than a third of that.`
      ),
      p(
        `These are early-stage numbers. But early-stage gaps have a tendency to compound, as they did with previous waves of information technology, where the US consistently outpaced Europe and the productivity consequences persisted for decades.`
      ),
      h3(`Where the mid-market concentrates the problem`),
      p(
        `Large European companies are adopting AI at rates closer to their American peers. They have budgets, internal data teams, and access to advisory services.`
      ),
      p(
        `Small businesses, while lagging in adoption, often don\u2019t need deep strategic advisory to experiment with AI. Their operations are simple enough that off-the-shelf tools can be deployed without significant integration complexity.`
      ),
      p(
        `The mid-market (companies roughly between \u20ac5M and \u20ac200M) is where the problem concentrates. These organisations are operationally complex enough that AI adoption requires genuine strategic thinking: which processes to target, how to integrate with legacy systems, how to measure impact, how to build for production instead of pilots. But they are not large enough to attract the attention of the advisory firms that could provide that thinking.`
      ),
      p(
        `ECB survey data from late 2025 confirms the pattern. Firms making significant use of AI are more likely to expect increases in turnover and investment, but those firms are disproportionately large. The mid-market companies that stand to gain the most from operational AI are the ones least likely to have the support needed to adopt it correctly.`
      ),
      h3(`The advisory gap`),
      p(
        `The structural problem is specific. Major consultancies operate at a price point and delivery model built for Fortune 500 clients. Their minimum engagement size, staffing model, and timeline assume a client with a different set of needs.`
      ),
      p(
        `A European company at \u20ac30M in revenue does not need a 200-page strategic assessment. It needs a precise diagnosis and a fast deployment. But the major firms don\u2019t sell precision and speed to this tier. They sell scope and rigour to a different one.`
      ),
      p(
        `At the other end, technology vendors and agencies execute scope. They build what is specified. But they don\u2019t diagnose. They don\u2019t question the brief. They don\u2019t tell you that the automation you requested is addressing the wrong bottleneck or that the chatbot you want won\u2019t be used because it isn\u2019t integrated deeply enough. The mid-market client ends up in a position where nobody in the room has both the strategic perspective and the technical capability to challenge the decision before the money is committed.`
      ),
      p(
        `The World Economic Forum identified this directly: mid-market businesses \u201coften have weak IT infrastructure and systems compared to larger competitors\u201d, and up to 95% of AI pilots fail to scale. The missing ingredient is not capital or technology. It is the advisory layer between diagnosis and deployment that the US mid-market has and the European mid-market largely does not.`
      ),
      callout(
        `This gap is why Blooming exists.`,
        `Strategy and implementation for growing European companies, same team, from diagnosis to deployment. If you want to see how that changes the conversation, the diagnostic session is 45 minutes and costs nothing.`,
        `Book a diagnostic session`
      ),
      h3(`What has to change`),
      p(
        `The European mid-market doesn\u2019t need cheaper consulting. It doesn\u2019t need more AI vendors. It needs firms that combine strategic diagnosis with technical implementation, move at mid-market speed, and measure success in operational outcomes.`
      ),
      p(
        `Whether those firms emerge from the consulting world, the technology world, or from somewhere new doesn\u2019t particularly matter. What matters is that they exist, and that the companies that need them can find them before the gap between European and American mid-market productivity becomes structural and permanent.`
      ),
      p(
        `The Draghi Report called AI a window for Europe. That window is real. But windows don\u2019t open themselves. Someone has to do the work, and the companies doing $30M in Munich or Milan or Madrid deserve the same quality of strategic support that their counterparts in Minneapolis take for granted.`
      ),
    ],
  },
]

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(
    `\n  Seeding ${articles.length} articles into Sanity (project: z040qeme, dataset: production)...\n`
  )

  for (const article of articles) {
    try {
      const result = await client.createOrReplace(article)
      console.log(`  ✓ ${result.title}`)
    } catch (err) {
      console.error(`  ✗ Failed: ${article.title}`)
      console.error(`    ${err.message}`)
    }
  }

  console.log('\n  Done.\n')
}

main()
