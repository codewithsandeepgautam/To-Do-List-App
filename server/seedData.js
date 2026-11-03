const TEMPLATES = [
  ['Finishing wireframe', 'Complete the low-fidelity screens for the mobile flow'],
  ['Meeting with team', 'Weekly sync: blockers, priorities and demos'],
  ['Buy a cat food', 'Dry food + two packs of wet food from the pet store'],
  ['Doing homework', 'Chapter 6 exercises and the practice worksheet'],
  ['Gym workout', 'Upper body day, 45 minutes'],
  ['Morning run', '5 km easy pace around the park'],
  ['Pay electricity bill', 'Due this week, pay via the utility app'],
  ['Grocery shopping', 'Vegetables, fruits, milk, eggs and bread'],
  ['Review pull requests', 'Go through open PRs and leave feedback'],
  ['Prepare presentation', 'Update slides with the latest numbers'],
  ['Call the bank', 'Ask about the new savings account options'],
  ['Doctor appointment', 'Routine check-up, carry previous reports'],
  ['Read 30 pages', 'Continue the current book before bed'],
  ['Clean the apartment', 'Vacuum, dust shelves and mop the floors'],
  ['Laundry', 'Wash, dry and fold clothes'],
  ['Write blog post', 'Draft an article on state management in React'],
  ['Fix login bug', 'Token refresh fails after the session expires'],
  ['Plan weekend trip', 'Book tickets and shortlist places to visit'],
  ['Client follow-up email', 'Send the updated proposal and timeline'],
  ['Learn Node.js streams', 'Watch the tutorial and build a small demo'],
  ['Water the plants', 'Balcony plants and the indoor ferns'],
  ['Team lunch', 'Reserve a table for six at noon'],
  ['Update resume', 'Add the latest project and refresh the summary'],
  ['Dentist appointment', 'Cleaning and a quick check-up'],
  ['Birthday gift for Riya', 'Pick a gift and get it wrapped'],
  ['Backup laptop files', 'Copy documents and photos to the external drive'],
  ['Design review', 'Walk through the Figma file with the designer'],
  ['Write unit tests', 'Cover the task service with Jest tests'],
  ['Renew car insurance', 'Compare quotes and renew before expiry'],
  ['Yoga session', '30 minute stretching and breathing routine'],
  ['Finishing daily commission', 'Wrap up the pending illustration work'],
  ['Deploy to staging', 'Merge the release branch and run smoke tests'],
  ['Meal prep', 'Cook and pack lunches for the next three days'],
  ['Online course lesson', 'Finish the module and submit the quiz'],
  ['Organize desk', 'Clear cables, files and old notes'],
];
const PRIORITIES = ['Low', 'Medium', 'High'];

function mulberry32(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const at = (day, hour, minute) => {
  const d = new Date(day);
  d.setHours(hour, minute, 0, 0);
  return d;
};

export function generateTasks(today = new Date(), { daysBack = 28, daysAhead = 21 } = {}) {
  const rand = mulberry32(2024);
  const base = new Date(today);
  base.setHours(0, 0, 0, 0);
  const tasks = [];

  for (let offset = -daysBack; offset <= daysAhead; offset++) {
    const day = new Date(base);
    day.setDate(base.getDate() + offset);

    const picks = offset === 0 ? [0, 1, 2, 30, 3, 4] : [];
    const target = offset === 0 ? picks.length : 2 + Math.floor(rand() * 4);
    while (picks.length < target) {
      const i = Math.floor(rand() * TEMPLATES.length);
      if (!picks.includes(i)) picks.push(i);
    }

    const hours = picks.map(() => 7 + Math.floor(rand() * 13)).sort((a, b) => a - b);
    picks.forEach((templateIndex, n) => {
      const [title, description] = TEMPLATES[templateIndex];
      const startMinute = rand() < 0.5 ? 0 : 30;
      const start = at(day, hours[n], startMinute);
      const end = new Date(start.getTime() + (30 + Math.floor(rand() * 4) * 30) * 60000);
      const todayDone = offset === 0 && (templateIndex === 2 || templateIndex === 30);

      tasks.push({
        title,
        description,
        dueAt: start,
        endsAt: end,
        priority: PRIORITIES[Math.floor(rand() * 3)],
        status: todayDone || (offset < 0 && rand() < 0.85) ? 'Completed' : 'In Progress',
      });
    });
  }
  return tasks;
}
