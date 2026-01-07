
export enum ModuleType {
  HTML_CSS = 'HTML_CSS',
  PYTHON = 'PYTHON',
  JAVASCRIPT = 'JAVASCRIPT'
}

export enum Step {
  LESSON = 0,
  LIVE_PREVIEW = 1,
  PRACTICE = 2,
  ASSESSMENT = 3,
  SUMMARY = 4
}

export interface MCQ {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface SyllabusModule {
  id: ModuleType;
  title: string;
  topics: string[];
  lesson: {
    heading: string;
    content: string[];
    codeExample: string;
  };
  livePreview: {
    code: string;
    explanation: string;
  };
  practice: {
    instruction: string;
    validationRegex: RegExp;
    successMessage: string;
    errorMessage: string;
  };
  assessment: MCQ[];
  summary: {
    points: string[];
  };
}

export interface ModuleProgress {
  lessonViewed: boolean;
  practiceAttempted: boolean;
  assessmentSubmitted: boolean;
  score: number | null; // out of total questions
  timeSpentSeconds: number;
}

export const SYLLABUS: Record<ModuleType, SyllabusModule> = {
  [ModuleType.HTML_CSS]: {
    id: ModuleType.HTML_CSS,
    title: "HTML & CSS Layouts",
    topics: ["div and class", "Flexbox rows and columns", "Forms and inputs", "Images and links", "CSS Types"],
    lesson: {
      heading: "Structuring the Web with HTML & CSS",
      content: [
        "HTML uses elements like <div> to group content. By using classes, we can apply specific CSS styles to these groups.",
        "Flexbox is a layout tool that helps us arrange elements in rows or columns easily.",
        "Forms are used to collect user data using <input> tags.",
        "CSS can be Inline (in the tag), Internal (in <style> tags), or External (in a separate .css file)."
      ],
      codeExample: `<div class="container">\n  <div class="box">Item 1</div>\n  <div class="box">Item 2</div>\n</div>\n\n<style>\n.container {\n  display: flex;\n  flex-direction: row;\n  gap: 10px;\n}\n.box {\n  background: #4f81bd;\n  padding: 20px;\n  color: white;\n}\n</style>`
    },
    livePreview: {
      code: `<!DOCTYPE html>\n<html>\n<head>\n<style>\n  .navbar {\n    display: flex;\n    justify-content: space-between;\n    background: #1f3a5f;\n    padding: 15px;\n    color: white;\n  }\n  form {\n    margin-top: 20px;\n    padding: 10px;\n    border: 1px solid #d0d7de;\n  }\n</style>\n</head>\n<body>\n  <div class="navbar">\n    <span>My Website</span>\n    <a href="#" style="color: white">Home</a>\n  </div>\n  \n  <form>\n    <label>User Name:</label>\n    <input type="text" placeholder="Enter name">\n    <button type="submit">Submit</button>\n  </form>\n</body>\n</html>`,
      explanation: "In this preview, we see a Navbar created with Flexbox and a simple Form. The CSS is 'Internal' because it's inside the <style> tag."
    },
    practice: {
      instruction: "Create a simple form with a text input and a submit button. Use a <div> with a class 'form-container' to wrap them.",
      validationRegex: /<div.*class=["']form-container["'].*>[\s\S]*<input.*type=["']text["'].*>[\s\S]*<button.*>[\s\S]*<\/div>/i,
      successMessage: "Excellent! You structured your HTML correctly using a div class and input fields.",
      errorMessage: "Oops! Make sure you have a div with class 'form-container', an input, and a button inside it."
    },
    assessment: [
      {
        question: "Which tag is used to group content together in HTML?",
        options: ["<span>", "<div>", "<body>", "<section>"],
        correctIndex: 1
      },
      {
        question: "What CSS property turns a container into a flexible layout?",
        options: ["display: block", "display: flex", "layout: grid", "align: items"],
        correctIndex: 1
      },
      {
        question: "Which type of CSS is written inside a separate .css file?",
        options: ["Internal", "Inline", "External", "Linked"],
        correctIndex: 2
      },
      {
        question: "What does the <input> tag usually go inside of to collect user data?",
        options: ["<div>", "<a>", "<form>", "<img>"],
        correctIndex: 2
      },
      {
        question: "How do you specify a class in CSS?",
        options: ["#className", ".className", "@className", "*className"],
        correctIndex: 1
      }
    ],
    summary: {
      points: [
        "Learned how to use <div> and classes for grouping.",
        "Understood the basics of Flexbox for layouts.",
        "Practiced creating forms and input elements.",
        "Identified Inline, Internal, and External CSS types."
      ]
    }
  },
  [ModuleType.PYTHON]: {
    id: ModuleType.PYTHON,
    title: "Python Logic & Variables",
    topics: ["Variables (str, int, float)", "Math Operators", "If / Elif / Else"],
    lesson: {
      heading: "Programming Logic with Python",
      content: [
        "Variables store data. Python has different types: string (text), int (whole numbers), and float (decimal numbers).",
        "We can perform math using operators like + (add), - (subtract), * (multiply), / (divide), % (remainder), and ** (power).",
        "Decision making is done using 'if', 'elif', and 'else' statements."
      ],
      codeExample: `age = 15\nif age >= 18:\n    print("You are an adult")\nelse:\n    print("You are a student")`
    },
    livePreview: {
      code: `score = 85\n\nif score >= 90:\n    print("Grade: A")\nelif score >= 80:\n    print("Grade: B")\nelse:\n    print("Grade: C")\n\nresult = 10 * (5 + 2)\nprint("Calculation Result:", result)`,
      explanation: "This code uses an 'if/elif/else' structure to check a score variable. It also demonstrates math operators in the calculation."
    },
    practice: {
      instruction: "Create a variable named 'score' and set it to any number. Use if/else to print 'Pass' if the score is 50 or higher, otherwise print 'Fail'.",
      validationRegex: /score\s*=\s*\d+[\s\S]*if\s*score\s*>=\s*50[\s\S]*print\(.*\bPass\b.*\)[\s\S]*else[\s\S]*print\(.*\bFail\b.*\)/i,
      successMessage: "Great job! You used variables and conditional logic correctly.",
      errorMessage: "Check your variable name and the if condition logic (>= 50)."
    },
    assessment: [
      {
        question: "Which of the following represents a float in Python?",
        options: ["'10'", "10", "10.5", "True"],
        correctIndex: 2
      },
      {
        question: "Which operator is used to calculate the remainder of a division?",
        options: ["/", "*", "%", "**"],
        correctIndex: 2
      },
      {
        question: "How do you start a conditional check in Python?",
        options: ["while", "if", "for", "check"],
        correctIndex: 1
      },
      {
        question: "What is the correct way to write an 'otherwise if' in Python?",
        options: ["else if", "elseif", "elif", "case"],
        correctIndex: 2
      },
      {
        question: "Which operator calculates the power of a number?",
        options: ["^", "**", "*", "exp"],
        correctIndex: 1
      }
    ],
    summary: {
      points: [
        "Learned about string, integer, and float data types.",
        "Practiced using math operators for calculations.",
        "Mastered conditional statements (if/elif/else) for program flow."
      ]
    }
  },
  [ModuleType.JAVASCRIPT]: {
    id: ModuleType.JAVASCRIPT,
    title: "JavaScript & p5.js",
    topics: ["p5.js setup() and draw()", "mouseX and mouseY", "Arrays", "DOM Manipulation"],
    lesson: {
      heading: "Creative Coding and Interaction",
      content: [
        "p5.js uses setup() to initialize things once, and draw() to run code repeatedly in a loop.",
        "The mouseX and mouseY variables track the current position of the cursor.",
        "Arrays allow us to store multiple values in a single variable.",
        "DOM manipulation lets JavaScript change elements on a webpage directly."
      ],
      codeExample: `function setup() {\n  createCanvas(400, 400);\n}\n\nfunction draw() {\n  background(220);\n  circle(mouseX, mouseY, 50);\n}`
    },
    livePreview: {
      code: `let colors = ['red', 'green', 'blue'];\n\nfunction setup() {\n  createCanvas(200, 200);\n}\n\nfunction draw() {\n  background(255);\n  fill(colors[0]);\n  rect(mouseX, mouseY, 40, 40);\n}`,
      explanation: "This sketch uses an array of colors and the mouse position to draw a moving square. The setup() runs once, draw() runs 60 times per second."
    },
    practice: {
      instruction: "Write a p5.js script that creates a 400x400 canvas and draws an ellipse at the mouse position (mouseX, mouseY).",
      validationRegex: /function\s+setup\(\)[\s\S]*createCanvas\(400,\s*400\)[\s\S]*function\s+draw\(\)[\s\S]*ellipse\(mouseX,\s*mouseY/i,
      successMessage: "Excellent! You've mastered the basics of p5.js coordinate systems.",
      errorMessage: "Make sure you include setup() with createCanvas(400, 400) and draw() with the ellipse function."
    },
    assessment: [
      {
        question: "Which p5.js function runs only once at the start?",
        options: ["draw()", "setup()", "init()", "start()"],
        correctIndex: 1
      },
      {
        question: "Which variable tells you the current horizontal position of the mouse?",
        options: ["mouseHorizontal", "posX", "mouseX", "curX"],
        correctIndex: 2
      },
      {
        question: "How do you define an array in JavaScript?",
        options: ["let a = {1, 2}", "let a = [1, 2]", "let a = (1, 2)", "let a = <1, 2>"],
        correctIndex: 1
      },
      {
        question: "What is DOM manipulation?",
        options: ["Playing games in the browser", "Changing webpage elements with JS", "Storing data in a database", "Creating animations in Python"],
        correctIndex: 1
      },
      {
        question: "Which p5.js function repeats infinitely to create animation?",
        options: ["loop()", "animate()", "draw()", "repeat()"],
        correctIndex: 2
      }
    ],
    summary: {
      points: [
        "Understood the lifecycle of a p5.js sketch (setup and draw).",
        "Used real-time interaction with mouseX and mouseY.",
        "Worked with arrays to store multiple values.",
        "Explored basic DOM interaction concepts."
      ]
    }
  }
};
