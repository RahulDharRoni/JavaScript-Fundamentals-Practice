// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

function getLearnerData(course, ag, submissions) {
  const learners = {}; // To store learner data

  // Helper function to check if a submission is late
  function isLate(submissionDate, dueDate) {
    return new Date(submissionDate) > new Date(dueDate);
  }

  // Process each submission
  submissions.forEach(({ learner_id, assignment_id, submission }) => {
    const assignment = ag.assignments.find((a) => a.id === assignment_id);
    if (!assignment) return; // Ignore submissions not in the assignment group

    const { due_at, points_possible } = assignment;
    let score = submission.score;

    // Apply late penalty (assuming 10% per day, adjust as needed)
    if (isLate(submission.submitted_at, due_at)) {
      score = Math.max(0, score - points_possible * 0.1); // Deduct 10%
    }

    const percentage = score / points_possible;

    if (!learners[learner_id]) {
      learners[learner_id] = {
        id: learner_id,
        totalScore: 0,
        totalPossible: 0,
      };
    }

    learners[learner_id][assignment_id] = percentage;
    learners[learner_id].totalScore += score;
    learners[learner_id].totalPossible += points_possible;
  });

  // Convert learner data into an array with averages
  return Object.values(learners).map((learner) => ({
    id: learner.id,
    avg: learner.totalScore / learner.totalPossible,
    ...Object.fromEntries(
      Object.entries(learner).filter(
        ([key]) =>
          key !== "id" && key !== "totalScore" && key !== "totalPossible"
      )
    ),
  }));
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result); ////
