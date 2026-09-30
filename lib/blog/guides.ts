export type GuideLink = {
  href: string;
  title: string;
  note: string;
};

export type GuideSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogGuide = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  lede: string;
  decision: string;
  sections: GuideSection[];
  table: {
    caption: string;
    headers: [string, string, string];
    rows: [string, string, string][];
  };
  posts: GuideLink[];
  faqs: { question: string; answer: string }[];
};

export const BLOG_GUIDES: BlogGuide[] = [
  {
    slug: "long-distance-mornings",
    title: "Long-distance mornings: the SyncUpAlarm guide cluster",
    description:
      "A hub for couples waking up across cities, bases, and time zones: wake windows, alarm math, and routines you can actually keep.",
    keywords: [
      "long distance morning routine",
      "wake up together different time zones",
      "military couple morning routine",
      "partner alarm long distance",
    ],
    lede: "Long-distance mornings fail when the plan lives in a chat thread. They hold when two people share one wake window, one ritual, and one fallback. This hub collects the SyncUpAlarm guides for that problem.",
    decision:
      "Start with the overlap you can both keep, not the earliest alarm either person can survive once. Convert the week in one pass, then lock the shared alarm instead of renegotiating every night.",
    sections: [
      {
        heading: "Who this cluster is for",
        paragraphs: [
          "Use these guides if you and another person are trying to start the day together while living in different cities, on different bases, or on a travel schedule. The audience includes couples, close friends, and households where one person is away for work.",
          "The pages do not treat distance as a motivation problem. They treat it as clock math plus a small ritual. If the overlap requires one person to cut sleep every day, the plan is wrong. The American Academy of Sleep Medicine and Sleep Research Society recommend that adults sleep 7 or more hours per night on a regular basis. That is a population guideline, not a personal prescription, and it is the guardrail for these routines.",
          "Send the page that matches the week you are actually in, not a generic couples article. A stable city-to-city routine, a base schedule that moves, and a travel-nurse rotation need different fallbacks. The shared wake agreement is the short version you forward after you pick the window. The longer guides explain the tradeoffs so the agreement is not a wish.",
        ],
      },
      {
        heading: "The decision these pages answer",
        paragraphs: [
          "The useful question is not “can we wake at the exact same minute?” It is “where is the smallest reliable overlap, and what happens when duty, a flight, or a bad night breaks it?” Exact sync helps for a call or a shared workout. A 10- to 20-minute window is kinder for ordinary days.",
          "A shared iPhone alarm is the source of truth after you choose that window. Texting the time each night creates memory debt. SyncUpAlarm is the App Store product for two iPhones that need the same wake plan. It coordinates logistics. It does not replace the conversation about whether the time is fair.",
        ],
      },
      {
        heading: "How to use the cluster",
        paragraphs: [
          "Read the playbook if you need the full routine. Read the time-zone page if the only blocker is conversion. Read the military or travel-nurse page if the schedule changes faster than a normal weekday. Then send the shared wake agreement to the other person so the rules are explicit.",
        ],
      },
      {
        heading: "Do the clock math once",
        paragraphs: [
          "Convert the week on a calendar while you are awake. Write both local times next to the same event, including the date if one of you crosses midnight. A shared 7 a.m. that is 10 p.m. for the other person is not a morning routine. It is a late-night call, and it should be labeled that way so nobody treats a miss as a character flaw.",
          "Daylight saving and travel are the usual surprises. One city springs forward and the overlap moves by an hour even though nobody changed the alarm. After a flight, the first two mornings are jet lag, not a new permanent schedule. Put those exceptions in the fallback instead of editing the standing alarm at midnight.",
          "Exact-minute sync is for a video call, a workout, or a flight. Ordinary days work better as a 10- to 20-minute window. The person who needs more sleep keeps a later edge of that window. The person who is already up can make coffee, send a short note, and wait. Parallel mornings still count when the clocks do not match.",
        ],
      },
      {
        heading: "Keep the ritual smaller than the distance",
        paragraphs: [
          "Distance makes people overbuild the morning. A thirty-minute video call every weekday sounds romantic and fails by Thursday. A two-minute check-in, a shared song, or a voice note after both alarms have fired is easier to keep. The ritual should survive a bad night. If it only works when both people slept perfectly, it is a performance, not a routine.",
          "Fairness is the real constraint. If one person is always the one cutting sleep, the plan is subsidizing the other person's schedule. Swap who accommodates, move the ritual to the evening, or drop it on the days the gap is too wide. The American Academy of Sleep Medicine guidance of 7 or more hours is a population recommendation, not a score you owe each other, and it is still the right reason to refuse a fantasy alarm.",
          "When the schedule is military duty or a travel-nurse rotation, stop pretending the week is stable. Use a primary window and a fallback window. Name who texts if the challenge is missed, and name the day you reset. Those pages in this cluster are templates for that kind of week. The shared wake agreement is the one-page version you can forward before you set anything.",
        ],
      },
    ],
    table: {
      caption: "Which long-distance guide to open",
      headers: ["Situation", "Start here", "Outcome"],
      rows: [
        ["Different cities, stable weeks", "Morning routine playbook", "One window and one ritual"],
        ["Clock confusion", "Time zone alarm math", "A weekly conversion, not daily math"],
        ["Bases or sudden duty changes", "Military couple routine", "Primary and fallback windows"],
        ["Rotating clinical weeks", "Travel nurse routine", "Reusable shift templates"],
      ],
    },
    posts: [
      {
        href: "/blog/long-distance-couple-morning-routine",
        title: "Long-distance couple morning routine",
        note: "The full playbook: window, ritual, boundary, and weekly reset.",
      },
      {
        href: "/blog/long-distance-alarm-time-zones",
        title: "Time zone alarm math",
        note: "Convert once, use windows, and stop doing clock math half-asleep.",
      },
      {
        href: "/blog/long-distance-couple-alarm-guide",
        title: "The 6 a.m. problem",
        note: "Why parallel mornings matter more than matching the exact minute.",
      },
      {
        href: "/blog/military-couple-alarm-sync",
        title: "Military couples on different bases",
        note: "Primary and fallback windows for schedules that move.",
      },
      {
        href: "/blog/travel-nurse-partner-alarm-routine",
        title: "Travel nurse and partner",
        note: "Early, night, and transition templates.",
      },
      {
        href: "/blog/one-person-traveling-partner-alarm",
        title: "When one of you is traveling",
        note: "Pause the shared plan for a short trip and name the day it returns.",
      },
      {
        href: "/blog/daylight-saving-shared-alarms",
        title: "Daylight saving checklist",
        note: "Confirm both phones the evening the clocks change.",
      },
      {
        href: "/blog/shared-wake-agreement",
        title: "Shared wake agreement",
        note: "The one-page rules you can send before you set the alarm.",
      },
    ],
    faqs: [
      {
        question: "Do long-distance couples need the same local wake time?",
        answer:
          "No. They need an overlap that respects both sleep needs. Exact-minute sync is for a shared call or event, not for every ordinary morning.",
      },
      {
        question: "What should we do when the time difference makes a shared morning unfair?",
        answer:
          "Shrink the ritual or move it. A voice note after one person wakes is better than a routine that regularly steals sleep.",
      },
      {
        question: "Is this medical advice?",
        answer:
          "No. These guides cover coordination. Persistent insomnia, breathing pauses, or unsafe sleepiness belong with a qualified clinician.",
      },
    ],
  },
  {
    slug: "iphone-alarms",
    title: "iPhone alarms for two people: the SyncUpAlarm guide cluster",
    description:
      "A hub for Clock, Sleep Schedule, AlarmKit, Partner Sync, and the difference between a personal alarm and a shared wake plan.",
    keywords: [
      "iPhone alarm guide",
      "sync alarms with partner iPhone",
      "AlarmKit partner alarm",
      "shared alarm app couples",
    ],
    lede: "An iPhone already has several alarm surfaces. Clock, Sleep Schedule, StandBy, Shortcuts, and third-party apps do different jobs. This hub explains which surface to use when two people need one wake plan.",
    decision:
      "Keep personal sleep settings in Health. Put the shared wake plan in one place both people can see. Do not split the real plan across a chat thread, two unlabeled Clock alarms, and a calendar event.",
    sections: [
      {
        heading: "Who this cluster is for",
        paragraphs: [
          "Use these guides if both people have iPhones and the morning depends on an alarm actually firing. That includes couples, roommates, and friends coordinating a workout, a flight, or a shift handoff.",
          "If one person uses Android, this cluster will not solve cross-platform sync. SyncUpAlarm is iPhone-only.",
          "The useful outcome is one visible plan. Clock, Sleep Schedule, StandBy, Shortcuts, and a third-party alarm can all be correct for a personal morning and still leave the other person guessing. Read this hub to decide which surface owns the shared wake time, then open the linked guide for the steps.",
        ],
      },
      {
        heading: "Personal alarms and shared alarms",
        paragraphs: [
          "Apple’s Clock app sets standard alarms that can repeat, use a sound, and include snooze. Apple also says those Clock alarms are separate from a wake-up alarm attached to a sleep schedule in Health. Sleep Schedule is the right layer for one person’s bedtime and Sleep Focus. It is a weak source of truth for two people, because each phone keeps its own schedule.",
          "Apple’s support article on setting alarms says Do Not Disturb, the Ring/Silent switch, and Silent mode do not affect the sound of built-in Clock alarms. If a Clock alarm is silent, check that the sound is not None and that Ringtone and Alerts volume is audible. StandBy disables alarm haptics, so an audible sound matters when the phone is charging on its side.",
          "AlarmKit is Apple’s developer framework for app alarms and countdowns, including repeating schedules and snooze. Partner Sync is the SyncUpAlarm feature that pairs two users, syncs the alarm, and adds a short wake challenge they choose. The challenge confirms that someone completed a wake step. It is not surveillance and it is not medical proof of alertness.",
        ],
      },
      {
        heading: "How to use the cluster",
        paragraphs: [
          "Read the complete iPhone alarm guide if you are unsure which Apple surface you are editing. Read the AlarmKit note if you want the platform distinction between notifications and alarms. Read Partner Sync if you want the paired workflow. Use the comparison guide when you are choosing between a dedicated app, a calendar, and texting.",
        ],
      },
      {
        heading: "Which Apple surface does which job",
        paragraphs: [
          "Clock is the built-in alarm. Apple documents repeating alarms, a chosen sound, and snooze, and it treats those alarms as separate from a wake-up alarm on a sleep schedule. Health Sleep Schedule is the right place for one person's bedtime, wind-down, and Sleep Focus. It is a weak shared plan because each iPhone keeps its own schedule. Editing yours does not edit theirs.",
          "StandBy turns the charging iPhone into a bedside display. Apple says alarm haptics are off in StandBy, so a silent vibration is not a backup. Check Ringtone and Alerts volume and pick an audible sound. Apple's alarm article also says Do Not Disturb, Silent mode, and the Ring/Silent switch do not mute the sound of built-in Clock alarms. If a Clock alarm is quiet, the usual causes are a sound set to None or a low alert volume, not Focus.",
          "Shortcuts can run a personal automation when an alarm is snoozed or stopped, including a wake-up alarm. That is useful for one phone: lights, a message, a checklist. It is not a shared source of truth. AlarmKit is the developer framework apps use for alarms and countdowns, including repeating schedules and snooze. Apple's WWDC session on the framework describes alarms that can break through silent mode and Focus, and relative schedules that adjust for time zone. A reminder notification is a different, easier-to-miss system.",
        ],
      },
      {
        heading: "Why two people need one visible plan",
        paragraphs: [
          "Texting the time creates memory debt. The message scrolls away, one person edits a Clock alarm, and the other still has yesterday's number. A calendar event can remind you that a call exists. It does not reliably wake a phone the way an alarm does, and it does not show whether the other person changed the time. The comparison guide in this cluster walks through dedicated apps, calendars, and text workflows without pretending they are the same tool.",
          "Partner Sync is the SyncUpAlarm path for two iPhones: pair, sync the alarm, and confirm you are awake with a short challenge you both chose. Memory match, an emoji, a tap pattern, or a tiny math prompt are the kinds of checks that fit the first groggy minute. The challenge is a wake step, not location tracking and not proof that someone is safe to drive.",
          "Test the real setup in the afternoon. Confirm sound, placement, and that both people see the same time before you depend on it. Then send the shared wake agreement so the snooze cap, fallback, and pause rule exist outside the app. The app can run a plan. It cannot invent the agreement.",
        ],
      },
    ],
    table: {
      caption: "Which iPhone alarm tool to use",
      headers: ["Need", "Tool", "Limit"],
      rows: [
        ["One personal alarm", "Clock", "The other person does not see edits"],
        ["Bedtime and Sleep Focus", "Health Sleep Schedule", "Still a personal schedule"],
        ["Bedside display", "StandBy", "Haptics are off; sound still matters"],
        ["Two people, one plan", "Partner Sync", "Both people need iPhone and consent"],
      ],
    },
    posts: [
      {
        href: "/blog/iphone-alarms-complete-guide",
        title: "Complete guide to iPhone alarms",
        note: "Clock, Sleep Schedule, Focus, StandBy, Shortcuts, and AlarmKit.",
      },
      {
        href: "/blog/alarmkit-partner-alarms-iphone",
        title: "What AlarmKit changes",
        note: "Why alarm behavior is different from a reminder notification.",
      },
      {
        href: "/blog/partner-sync-wake-challenge",
        title: "Partner Sync and wake challenges",
        note: "Paired alarms plus a short proof-of-awake step.",
      },
      {
        href: "/blog/partner-alarm-sync-iphone-guide",
        title: "How to sync alarms on iPhone",
        note: "Setup order, daytime test, and weekly maintenance.",
      },
      {
        href: "/blog/best-shared-alarm-apps-couples-2026",
        title: "Shared alarm options in 2026",
        note: "Dedicated apps, calendars, and text workflows compared.",
      },
      {
        href: "/blog/why-texting-alarm-times-doesnt-work",
        title: "Why texting alarm times fails",
        note: "Memory debt, no source of truth, and the replacement.",
      },
      {
        href: "/blog/calendar-vs-alarm-for-waking-up",
        title: "Calendar reminders vs alarms",
        note: "Use the calendar to plan and an alarm to wake.",
      },
      {
        href: "/blog/apple-watch-and-shared-wake-routines",
        title: "Apple Watch and shared mornings",
        note: "A wrist tap is personal. It does not sync two people.",
      },
      {
        href: "/blog/accessible-iphone-alarm-cues",
        title: "Alarm cues you can notice",
        note: "Sound, StandBy, headphones, and the limit of Flash for Alerts.",
      },
    ],
    faqs: [
      {
        question: "Does Focus mode block iPhone Clock alarms?",
        answer:
          "Apple says Do Not Disturb, Silent mode, and the Ring/Silent switch do not affect the sound of built-in Clock alarms. Third-party apps can behave differently.",
      },
      {
        question: "Should couples use Sleep Schedule as their shared alarm?",
        answer:
          "Use Sleep Schedule for personal sleep planning. Use one shared plan for the wake time both people agreed to.",
      },
      {
        question: "What is Partner Sync?",
        answer:
          "Partner Sync lets two SyncUpAlarm users sync an alarm and confirm they are awake with a short challenge they choose together.",
      },
    ],
  },
  {
    slug: "shared-wake-routines",
    title: "Shared wake routines: the SyncUpAlarm research and household cluster",
    description:
      "A hub for chronotypes, snooze rules, shift work, and what sleep research does and does not say about waking up together.",
    keywords: [
      "couples waking up together",
      "chronotypes couples",
      "snooze button science",
      "shift work shared alarm",
    ],
    lede: "Waking up together is a logistics problem with a research backdrop, not a relationship test. This hub separates what studies can support from the household rules that make a shared alarm fair.",
    decision:
      "Protect sleep first, then add the smallest shared ritual both people consented to. A shared alarm helps only after the wake window, snooze rule, and fallback are explicit.",
    sections: [
      {
        heading: "Who this cluster is for",
        paragraphs: [
          "Use these guides if the conflict is timing, snooze, or a schedule that does not match, including shift work and roommates. The research pages are educational. They are not diagnosis or treatment.",
          "Chronotype is preferred sleep timing, not a character trait. Social jetlag is the gap between that timing and external obligations. Couples research on sleep-wake concordance, including work by Wendy Troxel and colleagues, links shared sleep timing with relationship context. It does not say every couple must share an exact alarm.",
          "Use the research pages to choose a rule, then stop debating the studies at 6 a.m. A window, a snooze cap, and a pause condition are enough. The shared wake agreement is the page built to be forwarded. The other posts are there when you need the evidence or the household version for shifts and roommates.",
        ],
      },
      {
        heading: "What the evidence is allowed to say",
        paragraphs: [
          "Snooze research is narrower than the internet version. Sundelin, Landry, and Axelsson studied habitual snoozers and found a 30-minute snooze was not clearly harmful on the measures they tested, and it may ease the first minutes of waking for that group. Mattingly and colleagues found snoozing was common. Neither paper justifies unlimited alarms or waking someone else on a loop.",
          "Sleep inertia is the groggy period after waking. A shared challenge should stay short because people are not at full speed in that window. Implementation-intention research, including Gollwitzer and Sheeran’s meta-analysis, supports writing the when and how in advance. Supportive-accountability research supports clear expectations that the person helped define. That is the case for a wake agreement. It is not a case for pressure or monitoring.",
        ],
      },
      {
        heading: "How to use the cluster",
        paragraphs: [
          "Read chronotypes if the fight is lark versus owl. Read snooze science before you ban or allow snooze. Read the shift-work page if one person is asleep while the other is living loudly. Then write the rules down in the shared wake agreement and test them while you are both awake.",
        ],
      },
      {
        heading: "Turn the studies into a household rule",
        paragraphs: [
          "Troxel and colleagues have studied how couples' sleep lines up, including sleep-wake concordance and the way relationship context shows up in shared nights. That literature is a reason to take timing seriously. It is not a finding that matching an alarm improves a relationship, and it is not a reason to rank a night owl as less committed. Chronotype is preferred timing. Social jetlag is the strain of living against that timing for work or school. The practical move is the smallest overlap both people can keep.",
          "Snooze deserves a written cap, not a slogan. Sundelin, Landry, and Axelsson studied habitual snoozers and found a 30-minute snooze was not clearly harmful on the measures they tested, and it could ease the first minutes of waking for that group. Mattingly and colleagues found snoozing was common. Use those results to drop the blanket ban. Keep a limit anyway, because a second person's sleep is not one of the outcomes those papers measured.",
          "Sleep inertia is the groggy stretch after waking, and it is worse after short sleep or waking from deeper sleep. That is why a shared challenge should finish in seconds. Gollwitzer and Sheeran's work on implementation intentions supports writing the when and how ahead of time. Mohr, Cuijpers, and Lehman's supportive-accountability model supports expectations the person helped define. Together, those are an argument for a wake agreement both people can send. They are not an argument for streaks, guilt, or monitoring.",
        ],
      },
      {
        heading: "Shift work, roommates, and the first week",
        paragraphs: [
          "Opposite shifts are a noise problem as much as an alarm problem. The person who is asleep needs a quiet handoff: headphones, a closed door, vibration or a wearable for the person who must wake, and a ban on using the sleeper as a backup alarm. The shift-work guide covers those household rules. A shared alarm still helps on the days the windows overlap. It should stay off on the days it would steal sleep.",
          "Roommates and friends can use the same structure without the relationship framing. Agree on the window, the snooze cap, and what happens if someone misses it. Consent matters more when you do not share a life. Either person can pause the plan for illness, travel, or a short night and restart on a named day.",
          "The first week is a test, not a verdict. Change one variable at a time, and run the alarm in the afternoon before you trust it. If the routine fails, fix the window or the ritual before you blame the other person. When the rules are stable, put them in SyncUpAlarm so both iPhones follow the page you already sent.",
        ],
      },
    ],
    table: {
      caption: "Which routine guide to open",
      headers: ["Conflict", "Start here", "Rule to leave with"],
      rows: [
        ["Different body clocks", "Chronotypes", "A window, not a moral ranking"],
        ["Repeated snooze", "Snooze science", "A cap, agreed while awake"],
        ["Opposite shifts", "Shift work", "Noise limits and handoff windows"],
        ["No written rules", "Shared wake agreement", "Window, snooze, challenge, fallback, pause"],
      ],
    },
    posts: [
      {
        href: "/blog/chronotypes-couples-sleep-compatibility",
        title: "Chronotypes and couples",
        note: "Larks, owls, social jetlag, and realistic overlap.",
      },
      {
        href: "/blog/snooze-button-science",
        title: "The snooze button, according to science",
        note: "What studies found, and how couples should write the rule.",
      },
      {
        href: "/blog/couples-waking-up-together-research",
        title: "The science of waking up together",
        note: "Social rhythms and the limits of the evidence.",
      },
      {
        href: "/blog/shift-work-shared-morning-routine",
        title: "Shift work and shared alarms",
        note: "Household logistics when mornings do not line up.",
      },
      {
        href: "/blog/partner-alarm-first-week-checklist",
        title: "First-week checklist",
        note: "Test in the daytime and change one variable at a time.",
      },
      {
        href: "/blog/shared-wake-agreement",
        title: "Shared wake agreement",
        note: "The page built to be forwarded.",
      },
      {
        href: "/blog/when-not-to-sync-an-alarm",
        title: "When not to sync",
        note: "Unfair hours, missing consent, and how to pause.",
      },
      {
        href: "/blog/weekday-and-weekend-wake-rules",
        title: "Weekday and weekend rules",
        note: "Two named schedules so Friday is not a new fight.",
      },
      {
        href: "/blog/how-to-design-a-wake-challenge",
        title: "Design a wake challenge",
        note: "A seconds-long step you can finish while groggy.",
      },
      {
        href: "/blog/roommate-quiet-hours-agreement",
        title: "Roommate quiet hours",
        note: "A speaker rule for people who do not share a life.",
      },
    ],
    faqs: [
      {
        question: "Does waking up together improve a relationship?",
        answer:
          "It can reduce coordination friction when both people want the routine and the time is realistic. It is not therapy and it is not a requirement.",
      },
      {
        question: "Is snoozing always bad?",
        answer:
          "No. Recent studies of habitual snoozers do not support a blanket ban. Unplanned, repeated alarms that wake the other person are still a household problem.",
      },
      {
        question: "When should we get clinical help?",
        answer:
          "If either person has persistent insomnia, breathing pauses, or sleepiness that makes driving or work unsafe, talk with a qualified clinician.",
      },
    ],
  },
];

export function getGuideSlugs(): string[] {
  return BLOG_GUIDES.map((guide) => guide.slug);
}

export function getGuideBySlug(slug: string): BlogGuide | undefined {
  return BLOG_GUIDES.find((guide) => guide.slug === slug);
}
